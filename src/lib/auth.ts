"use client";

import { useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { hasSupabaseConfig } from "@/lib/supabase/env";
import { createClient } from "@/lib/supabase/client";

export function useAuthUser() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(hasSupabaseConfig());

  useEffect(() => {
    if (!hasSupabaseConfig()) {
      return;
    }

    const supabase = createClient();
    void supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
      setLoading(false);
    });

    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return { user, loading };
}

export async function signOut() {
  if (!hasSupabaseConfig()) {
    return;
  }

  const supabase = createClient();
  await supabase.auth.signOut();
}
