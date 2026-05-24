"use client";

import { useCallback, useEffect, useState } from "react";
import type { Ticket, TicketFormInput } from "@/types";
import { hasSupabaseConfig } from "@/lib/supabase/env";
import { createClient } from "@/lib/supabase/client";
import { ticketFromRow, ticketInputToRow, ticketToInsert } from "@/lib/supabase/mappers";

const TICKETS_KEY = "film-stub:tickets";
const TICKETS_CHANGED_EVENT = "film-stub:tickets-changed";
let cachedRaw: string | null = null;
let cachedTickets: Ticket[] = [];

function canUseStorage() {
  return typeof window !== "undefined" && Boolean(window.localStorage);
}

export function readLocalTickets(): Ticket[] {
  if (!canUseStorage()) {
    return [];
  }

  try {
    const raw = window.localStorage.getItem(TICKETS_KEY);
    if (raw === cachedRaw) {
      return cachedTickets;
    }
    cachedRaw = raw;
    if (!raw) {
      cachedTickets = [];
      return cachedTickets;
    }
    const parsed = JSON.parse(raw) as Ticket[];
    cachedTickets = Array.isArray(parsed) ? parsed : [];
    return cachedTickets;
  } catch {
    cachedTickets = [];
    return cachedTickets;
  }
}

export function writeLocalTickets(tickets: Ticket[]) {
  if (!canUseStorage()) {
    return;
  }
  window.localStorage.setItem(TICKETS_KEY, JSON.stringify(tickets));
  window.dispatchEvent(new Event(TICKETS_CHANGED_EVENT));
}

function createLocalTicket(input: TicketFormInput): Ticket {
  const ticket: Ticket = {
    ...input,
    id: crypto.randomUUID(),
    ticketNo: createTicketNo(input.watchDate),
    createdAt: new Date().toISOString()
  };

  writeLocalTickets([ticket, ...readLocalTickets()]);
  return ticket;
}

export async function createTicket(input: TicketFormInput): Promise<Ticket> {
  if (!hasSupabaseConfig()) {
    return createLocalTicket(input);
  }

  const supabase = createClient();
  const {
    data: { user },
    error: userError
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error("请先登录后再生成票根。");
  }

  const { data, error } = await supabase
    .from("tickets")
    .insert(ticketInputToRow(input, user.id, createTicketNo(input.watchDate)))
    .select("*")
    .single();

  if (error) {
    throw new Error(error.message);
  }

  window.dispatchEvent(new Event(TICKETS_CHANGED_EVENT));
  return ticketFromRow(data);
}

export async function getTicket(id: string): Promise<Ticket | undefined> {
  if (!hasSupabaseConfig()) {
    return readLocalTickets().find((ticket) => ticket.id === id);
  }

  const supabase = createClient();
  const { data, error } = await supabase.from("tickets").select("*").eq("id", id).maybeSingle();

  if (error || !data) {
    return undefined;
  }

  return ticketFromRow(data);
}

function createTicketNo(date: string) {
  const compactDate = date.replaceAll("-", "");
  const suffix = Math.floor(10000 + Math.random() * 90000);
  return `YJ${compactDate}-${suffix}`;
}

export function useTickets(options: { publicOnly?: boolean } = {}) {
  const { publicOnly = false } = options;
  const [tickets, setTickets] = useState<Ticket[]>(() =>
    hasSupabaseConfig() ? [] : publicOnly ? readLocalTickets().filter((ticket) => ticket.isPublic) : readLocalTickets()
  );
  const [loading, setLoading] = useState(hasSupabaseConfig());
  const [error, setError] = useState("");

  const loadTickets = useCallback(async () => {
    setLoading(true);
    setError("");

    if (!hasSupabaseConfig()) {
      setTickets(publicOnly ? readLocalTickets().filter((ticket) => ticket.isPublic) : readLocalTickets());
      setLoading(false);
      return;
    }

    const supabase = createClient();
    const {
      data: { user }
    } = await supabase.auth.getUser();

    if (!publicOnly && !user) {
      setTickets([]);
      setLoading(false);
      return;
    }

    let query = supabase.from("tickets").select("*").order("created_at", { ascending: false });

    if (publicOnly) {
      query = query.eq("is_public", true);
    } else if (user) {
      query = query.eq("user_id", user.id);
    }

    const { data, error: ticketsError } = await query;
    if (ticketsError) {
      setError(ticketsError.message);
      setTickets([]);
    } else {
      setTickets((data ?? []).map(ticketFromRow));
    }

    setLoading(false);
  }, [publicOnly]);

  useEffect(() => {
    const loadTimer = window.setTimeout(() => {
      void loadTickets();
    }, 0);

    if (!hasSupabaseConfig()) {
      const unsubscribeLocal = subscribeTickets(loadTickets);
      return () => {
        window.clearTimeout(loadTimer);
        unsubscribeLocal();
      };
    }

    const supabase = createClient();
    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange(() => {
      void loadTickets();
    });
    window.addEventListener(TICKETS_CHANGED_EVENT, loadTickets);

    return () => {
      window.clearTimeout(loadTimer);
      subscription.unsubscribe();
      window.removeEventListener(TICKETS_CHANGED_EVENT, loadTickets);
    };
  }, [loadTickets]);

  return { tickets, loading, error, refresh: loadTickets };
}

export async function migrateLocalTicketsToSupabase() {
  if (!canUseStorage() || !hasSupabaseConfig()) {
    return { imported: 0, skipped: 0 };
  }

  const supabase = createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    return { imported: 0, skipped: 0 };
  }

  const migrationKey = `film-stub:tickets-migrated:${user.id}`;
  if (window.localStorage.getItem(migrationKey)) {
    return { imported: 0, skipped: readLocalTickets().length };
  }

  const tickets = readLocalTickets();
  if (tickets.length === 0) {
    window.localStorage.setItem(migrationKey, new Date().toISOString());
    return { imported: 0, skipped: 0 };
  }

  const { error } = await supabase.from("tickets").upsert(
    tickets.map((ticket) => ticketToInsert(ticket, user.id)),
    { onConflict: "id" }
  );

  if (error) {
    throw new Error(error.message);
  }

  window.localStorage.setItem(migrationKey, new Date().toISOString());
  window.dispatchEvent(new Event(TICKETS_CHANGED_EVENT));
  return { imported: tickets.length, skipped: 0 };
}

function subscribeTickets(onStoreChange: () => void) {
  if (!canUseStorage()) {
    return () => undefined;
  }

  window.addEventListener(TICKETS_CHANGED_EVENT, onStoreChange);
  window.addEventListener("storage", onStoreChange);

  return () => {
    window.removeEventListener(TICKETS_CHANGED_EVENT, onStoreChange);
    window.removeEventListener("storage", onStoreChange);
  };
}
