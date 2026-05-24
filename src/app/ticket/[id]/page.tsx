"use client";

import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { Download, Share2, ShoppingBag } from "lucide-react";
import { toPng } from "html-to-image";
import { AppShell } from "@/components/AppShell";
import { EmptyState } from "@/components/EmptyState";
import { PageHeader } from "@/components/PageHeader";
import { TicketPreview } from "@/components/TicketPreview";
import { fetchMovieById, fetchTemplateById } from "@/lib/catalog";
import { getTicket } from "@/lib/storage";
import type { Movie, Ticket, TicketTemplate } from "@/types";

export default function TicketDetailPage() {
  const params = useParams<{ id: string }>();
  const [message, setMessage] = useState("");
  const [ticket, setTicket] = useState<Ticket | undefined>();
  const [movie, setMovie] = useState<Movie | undefined>();
  const [template, setTemplate] = useState<TicketTemplate | undefined>();
  const [loading, setLoading] = useState(true);
  const exportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadTicket() {
      const nextTicket = await getTicket(params.id);
      const [nextMovie, nextTemplate] = nextTicket
        ? await Promise.all([fetchMovieById(nextTicket.movieId), fetchTemplateById(nextTicket.templateId)])
        : [undefined, undefined];

      if (!cancelled) {
        setTicket(nextTicket);
        setMovie(nextMovie);
        setTemplate(nextTemplate);
        setLoading(false);
      }
    }

    void loadTicket();

    return () => {
      cancelled = true;
    };
  }, [params.id]);

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

  if (loading) {
    return (
      <AppShell>
        <PageHeader title="票根详情" showBack showMenu />
        <EmptyState title="正在读取票根" description="正在从云端读取票根详情。" />
      </AppShell>
    );
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
