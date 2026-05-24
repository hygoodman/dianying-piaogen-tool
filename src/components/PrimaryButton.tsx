import Link from "next/link";
import { Ticket } from "lucide-react";
import { clsx } from "clsx";

type PrimaryButtonProps = {
  children: React.ReactNode;
  href?: string;
  type?: "button" | "submit";
  onClick?: () => void;
  disabled?: boolean;
  icon?: React.ReactNode;
  className?: string;
};

export function PrimaryButton({
  children,
  href,
  type = "button",
  onClick,
  disabled,
  icon,
  className
}: PrimaryButtonProps) {
  const content = (
    <>
      <span className="absolute -left-3 top-1/2 h-6 w-6 -translate-y-1/2 rounded-full bg-[#080706]" />
      <span className="absolute -right-3 top-1/2 h-6 w-6 -translate-y-1/2 rounded-full bg-[#080706]" />
      <span className="relative flex items-center justify-center gap-4">
        {icon ?? <Ticket className="h-7 w-7" />}
        {children}
      </span>
    </>
  );
  const sharedClassName = clsx(
    "relative flex h-16 w-full items-center justify-center overflow-hidden rounded-lg border border-red-500/55 bg-ember/90 px-6 text-2xl font-semibold text-parchment shadow-glow transition active:scale-[0.99] disabled:opacity-55",
    "before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,.18),transparent_28%),linear-gradient(135deg,rgba(255,255,255,.08),transparent)]",
    className
  );

  if (href) {
    return (
      <Link href={href} className={sharedClassName}>
        {content}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={sharedClassName}>
      {content}
    </button>
  );
}
