import { Link } from "@tanstack/react-router";
import { Search, HelpCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";

export function SemrushTopbar() {
  return (
    <header className="sticky top-0 z-20 flex h-14 items-center gap-4 border-b border-border bg-background px-4 md:px-6">
      <Link to="/" className="hidden text-[15px] font-bold tracking-tight md:block">
        <span className="bg-gradient-to-br from-primary to-primary-glow bg-clip-text text-transparent">
          GEO &amp; SEO
        </span>
        <span className="text-foreground"> Checker</span>
      </Link>

      <div className="relative mx-auto w-full max-w-2xl">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="search"
          placeholder="Enter domain, keyword or URL"
          className="h-9 w-full rounded-md border border-border bg-muted/40 pl-9 pr-10 text-[13px] outline-none transition-colors placeholder:text-muted-foreground focus:border-ring focus:bg-background"
        />
        <kbd className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 rounded border border-border bg-background px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
          ⌘K
        </kbd>
      </div>

      <div className="ml-auto flex items-center gap-2">
        <Button
          size="sm"
          className="hidden h-8 gap-1.5 bg-success px-3 text-success-foreground hover:bg-success/90 md:inline-flex"
        >
          Start free trial
        </Button>
        <Button variant="ghost" size="sm" className="hidden h-8 text-muted-foreground md:inline-flex">
          Pricing
        </Button>
        <Button variant="ghost" size="sm" className="hidden h-8 text-muted-foreground md:inline-flex">
          Enterprise
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
          <HelpCircle className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
          <Send className="h-4 w-4" />
        </Button>
        <ThemeToggle className="h-8 w-8" />
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary-glow text-[11px] font-semibold text-primary-foreground">
          YK
        </div>
      </div>
    </header>
  );
}
