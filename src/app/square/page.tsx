import { Flame, LockKeyhole, Share2 } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { BottomNav } from "@/components/BottomNav";
import { PageHeader } from "@/components/PageHeader";
import { PrimaryButton } from "@/components/PrimaryButton";

export default function SquarePage() {
  return (
    <>
      <AppShell>
        <PageHeader title="广场" showBack={false} />
        <section className="mt-12">
          <div className="grid h-24 w-24 place-items-center rounded-full border border-gold/35 bg-gold/10 text-gold">
            <Flame className="h-12 w-12 fill-gold/20" />
          </div>
          <h1 className="mt-8 font-display text-5xl font-bold leading-tight text-parchment">
            热门票根
            <br />
            即将开放
          </h1>
          <p className="mt-6 text-lg leading-8 text-white/58">
            这里会展示公开分享的精选票根。第一版先把私人收藏和生成体验做好，后续接入公开链接、点赞和二维码分享。
          </p>
        </section>

        <div className="mt-10 space-y-4">
          <div className="soft-card rounded-2xl p-5">
            <div className="flex items-center gap-4 text-xl text-parchment">
              <Share2 className="h-7 w-7 text-gold" />
              分享入口预留
            </div>
            <p className="mt-3 text-base leading-7 text-white/52">
              票根详情页已支持浏览器分享和链接复制，公开广场将在持久化数据后开启。
            </p>
          </div>
          <div className="soft-card rounded-2xl p-5">
            <div className="flex items-center gap-4 text-xl text-parchment">
              <LockKeyhole className="h-7 w-7 text-gold" />
              公开开关预留
            </div>
            <p className="mt-3 text-base leading-7 text-white/52">
              Ticket 数据已包含 isPublic 字段，后续可直接迁移到 Supabase 的公开票根列表。
            </p>
          </div>
        </div>

        <PrimaryButton href="/search" className="mt-10">先生成一张票根</PrimaryButton>
      </AppShell>
      <BottomNav />
    </>
  );
}
