import { Link } from "@tanstack/react-router";
import { Search, Bell, HelpCircle, ChevronRight } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { Separator } from "@/components/ui/separator";

interface Crumb {
  label: string;
  to?: string;
}

interface AppTopbarProps {
  breadcrumbs?: Crumb[];
}

export function AppTopbar({ breadcrumbs = [] }: AppTopbarProps) {
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-2 border-b border-border bg-background/80 px-3 backdrop-blur-md">
      <SidebarTrigger className="text-muted-foreground hover:text-foreground" />
      <Separator orientation="vertical" className="h-5" />

      <nav className="flex items-center gap-1.5 text-sm">
        {breadcrumbs.map((c, i) => (
          <div key={i} className="flex items-center gap-1.5">
            {i > 0 && <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/50" />}
            {c.to ? (
              <Link
                to={c.to}
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                {c.label}
              </Link>
            ) : (
              <span className="font-medium text-foreground">{c.label}</span>
            )}
          </div>
        ))}
      </nav>

      <div className="ml-auto flex items-center gap-1.5">
        <div className="relative hidden md:block">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            placeholder="Search…  ⌘K"
            className="h-8 w-64 rounded-md border border-border bg-muted/40 pl-8 pr-3 text-[13px] outline-none transition-colors placeholder:text-muted-foreground focus:border-ring focus:bg-background"
          />
        </div>
        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
          <HelpCircle className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
          <Bell className="h-4 w-4" />
        </Button>
        <ThemeToggle className="h-8 w-8" />
        <Separator orientation="vertical" className="mx-1 h-5" />
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary/60 text-[11px] font-semibold text-primary-foreground">
          YK
        </div>
      </div>
    </header>
  );
}
