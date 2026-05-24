"use client";

import { FormEvent, Suspense, useState } from "react";
import { Eye, EyeOff, LockKeyhole, LogIn, Mail, UserPlus, UserRound } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { AppShell } from "@/components/AppShell";
import { PageHeader } from "@/components/PageHeader";
import { PrimaryButton } from "@/components/PrimaryButton";
import { hasSupabaseConfig } from "@/lib/supabase/env";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  return (
    <Suspense fallback={<LoginShellFallback />}>
      <LoginContent />
    </Suspense>
  );
}

function LoginShellFallback() {
  return (
    <AppShell>
      <PageHeader title="账号登录" showBack />
      <p className="mt-12 text-lg text-white/58">正在准备登录表单。</p>
    </AppShell>
  );
}

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") ?? "/me";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("");
    setError("");

    if (!hasSupabaseConfig()) {
      setError("还没有配置 Supabase 环境变量，请先完成云端项目配置。");
      return;
    }

    if (!email.trim()) {
      setError("请输入邮箱地址。");
      return;
    }

    if (password.length < 6) {
      setError("密码至少需要 6 位。");
      return;
    }

    setSubmitting(true);
    const supabase = createClient();
    const { error: authError } =
      mode === "login"
        ? await supabase.auth.signInWithPassword({
            email: email.trim(),
            password
          })
        : await supabase.auth.signUp({
            email: email.trim(),
            password,
            options: {
              data: {
                display_name: email.trim().split("@")[0]
              }
            }
          });

    setSubmitting(false);

    if (authError) {
      setError(authError.message);
      return;
    }

    setStatus(mode === "login" ? "登录成功，正在进入。" : "注册成功，正在进入。");
    router.replace(next.startsWith("/") ? next : "/me");
  }

  return (
    <AppShell>
      <PageHeader title="账号登录" showBack />

      <section className="mt-12">
        <div className="grid h-20 w-20 place-items-center rounded-full border border-gold/35 bg-gold/10 text-gold">
          <UserRound className="h-10 w-10" />
        </div>
        <h1 className="mt-8 font-display text-5xl font-bold leading-tight text-parchment">登录后收藏票根</h1>
        <p className="mt-5 text-lg leading-8 text-white/58">使用邮箱和密码登录，收藏会同步到 Supabase 数据库。</p>
      </section>

      <form onSubmit={handleSubmit} className="mt-10 space-y-5">
        <div className="grid grid-cols-2 rounded-xl border border-white/10 bg-white/[0.05] p-1">
          <button
            type="button"
            onClick={() => {
              setMode("login");
              setError("");
              setStatus("");
            }}
            className={`h-11 rounded-lg text-base font-medium ${mode === "login" ? "bg-ember text-parchment" : "text-white/55"}`}
          >
            登录
          </button>
          <button
            type="button"
            onClick={() => {
              setMode("signup");
              setError("");
              setStatus("");
            }}
            className={`h-11 rounded-lg text-base font-medium ${mode === "signup" ? "bg-ember text-parchment" : "text-white/55"}`}
          >
            注册
          </button>
        </div>

        <label className="soft-card flex h-16 items-center gap-4 rounded-xl px-5 text-white/70">
          <Mail className="h-7 w-7 text-gold" strokeWidth={1.5} />
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="输入邮箱地址"
            className="min-w-0 flex-1 bg-transparent text-lg text-white outline-none placeholder:text-white/35"
            autoComplete="email"
          />
        </label>

        <label className="soft-card flex h-16 items-center gap-4 rounded-xl px-5 text-white/70">
          <LockKeyhole className="h-7 w-7 text-gold" strokeWidth={1.5} />
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder={mode === "login" ? "输入密码" : "设置密码，至少 6 位"}
            className="min-w-0 flex-1 bg-transparent text-lg text-white outline-none placeholder:text-white/35"
            autoComplete={mode === "login" ? "current-password" : "new-password"}
          />
          <button
            type="button"
            aria-label={showPassword ? "隐藏密码" : "显示密码"}
            onClick={() => setShowPassword((current) => !current)}
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-white/55 transition hover:bg-white/5 hover:text-gold"
          >
            {showPassword ? <EyeOff className="h-6 w-6" strokeWidth={1.6} /> : <Eye className="h-6 w-6" strokeWidth={1.6} />}
          </button>
        </label>

        {error ? <p className="rounded-xl bg-ember/15 px-4 py-3 text-sm text-red-100">{error}</p> : null}
        {status ? <p className="rounded-xl bg-gold/10 px-4 py-3 text-sm text-gold">{status}</p> : null}

        <PrimaryButton type="submit" disabled={submitting}>
          <span className="inline-flex items-center justify-center gap-2">
            {mode === "login" ? <LogIn className="h-5 w-5" /> : <UserPlus className="h-5 w-5" />}
            {submitting ? "处理中" : mode === "login" ? "登录" : "注册并登录"}
          </span>
        </PrimaryButton>
      </form>
    </AppShell>
  );
}
