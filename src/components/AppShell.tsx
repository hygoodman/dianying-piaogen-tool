import { clsx } from "clsx";

type AppShellProps = {
  children: React.ReactNode;
  className?: string;
};

export function AppShell({ children, className }: AppShellProps) {
  return <section className={clsx("page-pad", className)}>{children}</section>;
}
