"use client";

import { useEffect } from "react";
import { migrateLocalTicketsToSupabase } from "@/lib/storage";
import { hasSupabaseConfig } from "@/lib/supabase/env";
import { createClient } from "@/lib/supabase/client";

export function LocalTicketMigration() {
  useEffect(() => {
    if (!hasSupabaseConfig()) {
      return;
    }

    const supabase = createClient();
    let cancelled = false;

    async function runMigration() {
      if (!cancelled) {
        await migrateLocalTicketsToSupabase().catch(() => undefined);
      }
    }

    void runMigration();

    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange(() => {
      void runMigration();
    });

    return () => {
      cancelled = true;
      subscription.unsubscribe();
    };
  }, []);

  return null;
}
