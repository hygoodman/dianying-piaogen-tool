import { Film } from "lucide-react";
import { PrimaryButton } from "./PrimaryButton";

type EmptyStateProps = {
  title: string;
  description: string;
  actionHref?: string;
  actionLabel?: string;
};

export function EmptyState({ title, description, actionHref, actionLabel }: EmptyStateProps) {
  return (
    <div className="soft-card flex min-h-72 flex-col items-center justify-center rounded-2xl px-8 py-10 text-center">
      <Film className="h-12 w-12 text-gold" strokeWidth={1.4} />
      <h2 className="mt-5 text-2xl font-semibold text-parchment">{title}</h2>
      <p className="mt-3 text-base leading-7 text-white/58">{description}</p>
      {actionHref && actionLabel ? (
        <PrimaryButton href={actionHref} className="mt-8 h-14 text-xl">
          {actionLabel}
        </PrimaryButton>
      ) : null}
    </div>
  );
}
