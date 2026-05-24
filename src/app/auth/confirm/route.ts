import type { EmailOtpType } from "@supabase/supabase-js";
import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const tokenHash = requestUrl.searchParams.get("token_hash");
  const type = requestUrl.searchParams.get("type") as EmailOtpType | null;
  const next = requestUrl.searchParams.get("next") ?? "/me";
  const redirectUrl = new URL(next.startsWith("/") ? next : "/me", requestUrl.origin);
  const supabase = await createClient();

  if (!supabase) {
    return NextResponse.redirect(new URL("/login?error=missing-config", requestUrl.origin));
  }

  if (code) {
    await supabase.auth.exchangeCodeForSession(code);
  } else if (tokenHash && type) {
    await supabase.auth.verifyOtp({ type, token_hash: tokenHash });
  }

  return NextResponse.redirect(redirectUrl);
}
