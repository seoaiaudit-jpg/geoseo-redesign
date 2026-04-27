import { SemrushSidebar } from "@/components/semrush-sidebar";
import { SemrushTopbar } from "@/components/semrush-topbar";

interface SemrushShellProps {
  children: React.ReactNode;
  active?: "home" | "seo" | "ai" | "traffic" | "local" | "content" | "social" | "ad" | "ai-pr" | "reports" | "app";
}

export function SemrushShell({ children, active = "seo" }: SemrushShellProps) {
  return (
    <div className="flex min-h-screen w-full bg-muted/30">
      <SemrushSidebar active={active} />
      <div className="flex min-w-0 flex-1 flex-col">
        <SemrushTopbar />
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
