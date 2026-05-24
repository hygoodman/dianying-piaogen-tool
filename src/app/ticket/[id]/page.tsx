"use client";

import { useMemo, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { Download, Share2, ShoppingBag } from "lucide-react";
import { toPng } from "html-to-image";
import { AppShell } from "@/components/AppShell";
import { EmptyState } from "@/components/EmptyState";
import { PageHeader } from "@/components/PageHeader";
import { TicketPreview } from "@/components/TicketPreview";
import { movies } from "@/data/movies";
import { getTemplateById } from "@/lib/movie";
import { useTickets } from "@/lib/storage";

export default function TicketDetailPage() {
  const params = useParams<{ id: string }>();
  const tickets = useTickets();
  const [message, setMessage] = useState("");
  const exportRef = useRef<HTMLDivElement>(null);

  const ticket = useMemo(() => tickets.find((item) => item.id === params.id), [params.id, tickets]);
  const movie = useMemo(() => (ticket ? movies.find((item) => item.id === ticket.movieId) : undefined), [ticket]);
  const template = ticket ? getTemplateById(ticket.templateId) : undefined;

  async function saveImage() {
    if (!exportRef.current || !ticket) {
      return;
    }
    const dataUrl = await toPng(exportRef.current, {
      cacheBust: true,
      pixelRatio: 2,
      backgroundColor: "transparent"
    });
    const link = document.createElement("a");
    link.download = `${ticket.ticketNo}.png`;
    link.href = dataUrl;
    link.click();
    setMessage("图片已生成，浏览器会自动保存。");
  }

  async function shareTicket() {
    const shareData = {
      title: "我的电影票根",
      text: movie ? `我收藏了《${movie.title}》的电影票根` : "我的电影票根",
      url: window.location.href
    };
    if (navigator.share) {
      await navigator.share(shareData);
      return;
    }
    await navigator.clipboard.writeText(window.location.href);
    setMessage("分享链接已复制。");
  }

  if (!ticket || !movie || !template) {
    return (
      <AppShell>
        <PageHeader title="票根详情" showBack showMenu />
        <EmptyState title="票根不存在" description="这张票根可能已被删除，请回到收藏列表查看。" actionHref="/me" actionLabel="查看收藏" />
      </AppShell>
    );
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_50%_15%,rgba(145,20,12,.55),transparent_18rem),linear-gradient(180deg,#160403,#050403)]">
      <AppShell className="pb-32">
        <PageHeader title="票根详情" showBack showMenu />
        <TicketPreview ticket={ticket} movie={movie} template={template} exportRef={exportRef} />
        {message ? <p className="mt-4 text-center text-sm text-gold">{message}</p> : null}
      </AppShell>
      <div className="fixed bottom-8 left-1/2 z-40 grid w-full max-w-[var(--app-max)] -translate-x-1/2 grid-cols-3 gap-3 px-7">
        <ActionButton active icon={<ShoppingBag />} label="已收藏" />
        <ActionButton icon={<Share2 />} label="分享" onClick={shareTicket} />
        <ActionButton icon={<Download />} label="保存图片" onClick={saveImage} />
      </div>
    </div>
  );
}

function ActionButton({
  icon,
  label,
  active,
  onClick
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex h-14 items-center justify-center gap-2 rounded-lg border border-white/10 px-2 text-base text-white backdrop-blur-xl ${
        active ? "bg-gold/55" : "bg-white/[0.12]"
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}
