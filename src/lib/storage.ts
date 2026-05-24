"use client";

import { useSyncExternalStore } from "react";
import type { Ticket, TicketFormInput } from "@/types";

const TICKETS_KEY = "film-stub:tickets";
const TICKETS_CHANGED_EVENT = "film-stub:tickets-changed";
const EMPTY_TICKETS: Ticket[] = [];
let cachedRaw: string | null = null;
let cachedTickets: Ticket[] = [];

function canUseStorage() {
  return typeof window !== "undefined" && Boolean(window.localStorage);
}

export function readTickets(): Ticket[] {
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

export function writeTickets(tickets: Ticket[]) {
  if (!canUseStorage()) {
    return;
  }
  window.localStorage.setItem(TICKETS_KEY, JSON.stringify(tickets));
  window.dispatchEvent(new Event(TICKETS_CHANGED_EVENT));
}

export function createTicket(input: TicketFormInput): Ticket {
  const ticket: Ticket = {
    ...input,
    id: crypto.randomUUID(),
    ticketNo: createTicketNo(input.watchDate),
    createdAt: new Date().toISOString()
  };

  writeTickets([ticket, ...readTickets()]);
  return ticket;
}

export function getTicket(id: string) {
  return readTickets().find((ticket) => ticket.id === id);
}

export function upsertTicket(ticket: Ticket) {
  const nextTickets = readTickets().filter((item) => item.id !== ticket.id);
  writeTickets([ticket, ...nextTickets]);
}

function createTicketNo(date: string) {
  const compactDate = date.replaceAll("-", "");
  const suffix = Math.floor(10000 + Math.random() * 90000);
  return `YJ${compactDate}-${suffix}`;
}

export function useTickets() {
  return useSyncExternalStore(subscribeTickets, readTickets, () => EMPTY_TICKETS);
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
