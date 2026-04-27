import { Link, useLocation } from "@tanstack/react-router";
import {
  Home,
  Search as SearchIcon,
  Sparkles,
  BarChart2,
  MapPin,
  FileText,
  MessageCircle,
  Target,
  Volume2,
  LineChart,
  LayoutGrid,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

/* ============================================================
 * Semrush-style two-level navigation
 * - Narrow icon rail (left)
 * - Secondary panel with grouped section links (right of rail)
 * - Secondary panel can collapse via chevron button
 * ============================================================ */

type RailKey =
  | "home"
  | "seo"
  | "ai"
  | "traffic"
  | "local"
  | "content"
  | "social"
  | "ad"
  | "ai-pr"
  | "reports"
  | "app";

interface RailItem {
  key: RailKey;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const railItems: RailItem[] = [
  { key: "home", label: "Home", icon: Home },
  { key: "seo", label: "SEO", icon: SearchIcon },
  { key: "ai", label: "AI", icon: Sparkles },
  { key: "traffic", label: "Traffic & Market", icon: BarChart2 },
  { key: "local", label: "Local", icon: MapPin },
  { key: "content", label: "Content", icon: FileText },
  { key: "social", label: "Social", icon: MessageCircle },
  { key: "ad", label: "Ad", icon: Target },
  { key: "ai-pr", label: "AI PR", icon: Volume2 },
  { key: "reports", label: "Reports", icon: LineChart },
  { key: "app", label: "App Center", icon: LayoutGrid },
];

interface SecondarySection {
  label: string;
  items: { title: string; url: string; soon?: boolean; pro?: boolean }[];
}

const secondaryNav: Record<RailKey, { title: string; sections: SecondarySection[] }> = {
  home: {
    title: "Home",
    sections: [{ label: "Workspace", items: [{ title: "Dashboard", url: "/" }] }],
  },
  seo: {
    title: "SEO",
    sections: [
      { label: "", items: [{ title: "Dashboard", url: "/dashboard" }] },
      {
        label: "Site Performance",
        items: [
          { title: "Site Audit", url: "/audit/mriacrm.com" },
          { title: "Position Tracking", url: "/position-tracking" },
        ],
      },
      {
        label: "Competitive Analysis",
        items: [
          { title: "Domain Overview", url: "/domain-overview" },
          { title: "Organic Rankings", url: "/organic-rankings" },
          { title: "Top Pages", url: "/top-pages" },
          { title: "Compare Domains", url: "/compare-domains" },
          { title: "Keyword Gap", url: "/keyword-gap" },
          { title: "Backlink Gap", url: "/backlink-gap" },
        ],
      },
      {
        label: "Keyword Research",
        items: [
          { title: "Keyword Overview", url: "/keyword-overview" },
          { title: "Keyword Magic Tool", url: "/keyword-magic" },
          { title: "Keyword Strategy Builder", url: "/keyword-strategy" },
        ],
      },
      {
        label: "Content Ideas",
        items: [
          { title: "SEO Writing Assistant", url: "/seo-writing" },
          { title: "Topic Research", url: "/topic-research" },
          { title: "SEO Content Template", url: "/seo-template" },
        ],
      },
      {
        label: "Link Building",
        items: [
          { title: "Backlinks", url: "/backlinks" },
          { title: "Referring Domains", url: "/referring-domains" },
          { title: "Backlink Audit", url: "/backlink-audit" },
        ],
      },
      {
        label: "Extras",
        items: [
          { title: "Log File Analyzer", url: "/log-analyzer" },
          { title: "Listing Management", url: "/listings" },
        ],
      },
    ],
  },
  ai: {
    title: "AI Visibility",
    sections: [
      {
        label: "AI Search",
        items: [
          { title: "AI Overview", url: "/ai-overview" },
          { title: "AI Citations", url: "/ai-citations", soon: true },
          { title: "Prompt Tracker", url: "/prompts", soon: true },
        ],
      },
      {
        label: "Optimization",
        items: [
          { title: "Schema for AI", url: "/schema-ai", pro: true },
          { title: "llms.txt Builder", url: "/llms-txt" },
        ],
      },
    ],
  },
  traffic: {
    title: "Traffic & Market",
    sections: [
      {
        label: "Market",
        items: [
          { title: "Market Explorer", url: "/market" },
          { title: "Traffic Analytics", url: "/traffic" },
        ],
      },
    ],
  },
  local: {
    title: "Local",
    sections: [
      {
        label: "Local SEO",
        items: [
          { title: "Map Rank Tracker", url: "/map-rank" },
          { title: "Review Management", url: "/reviews" },
        ],
      },
    ],
  },
  content: {
    title: "Content",
    sections: [
      {
        label: "Create",
        items: [
          { title: "ContentShake AI", url: "/contentshake" },
          { title: "Topic Research", url: "/content/topics" },
        ],
      },
    ],
  },
  social: {
    title: "Social",
    sections: [
      {
        label: "Manage",
        items: [
          { title: "Social Poster", url: "/social/poster" },
          { title: "Social Tracker", url: "/social/tracker" },
        ],
      },
    ],
  },
  ad: {
    title: "Advertising",
    sections: [
      {
        label: "Paid",
        items: [
          { title: "PPC Keyword Tool", url: "/ppc" },
          { title: "Ad Builder", url: "/ad-builder" },
        ],
      },
    ],
  },
  "ai-pr": {
    title: "AI PR",
    sections: [
      { label: "Outreach", items: [{ title: "Brand Monitoring", url: "/brand-monitoring" }] },
    ],
  },
  reports: {
    title: "Reports",
    sections: [
      {
        label: "Build",
        items: [
          { title: "My Reports", url: "/reports" },
          { title: "Looker Studio", url: "/looker" },
        ],
      },
    ],
  },
  app: {
    title: "App Center",
    sections: [{ label: "Apps", items: [{ title: "Browse Apps", url: "/apps" }] }],
  },
};

interface SemrushSidebarProps {
  active?: RailKey;
}

export function SemrushSidebar({ active = "seo" }: SemrushSidebarProps) {
  const [selected, setSelected] = useState<RailKey>(active);
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const secondary = secondaryNav[selected];

  const isActive = (url: string) =>
    location.pathname === url || location.pathname.startsWith(url + "/");

  return (
    <TooltipProvider delayDuration={150}>
      <aside className="sticky top-0 z-30 flex h-screen shrink-0 border-r border-sidebar-border bg-sidebar text-sidebar-foreground">
        {/* Icon rail */}
        <div className="flex w-[68px] shrink-0 flex-col items-center border-r border-sidebar-border py-3">
          <Link to="/" className="mb-3 flex h-9 w-9 items-center justify-center">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-gradient-to-br from-primary to-primary-glow text-primary-foreground">
              <BarChart2 className="h-4 w-4" />
            </div>
          </Link>

          <div className="flex w-full flex-col items-center gap-0.5 overflow-y-auto px-1.5">
            {railItems.map((item) => {
              const isActiveItem = item.key === selected;
              return (
                <Tooltip key={item.key}>
                  <TooltipTrigger asChild>
                    <button
                      onClick={() => {
                        setSelected(item.key);
                        if (collapsed) setCollapsed(false);
                      }}
                      className={cn(
                        "group flex w-full flex-col items-center gap-0.5 rounded-md px-1 py-2 text-[10px] font-medium leading-tight transition-colors",
                        isActiveItem
                          ? "bg-sidebar-accent text-sidebar-foreground"
                          : "text-sidebar-foreground/60 hover:bg-sidebar-accent/60 hover:text-sidebar-foreground",
                      )}
                    >
                      <item.icon
                        className={cn(
                          "h-[18px] w-[18px] transition-colors",
                          isActiveItem && "text-primary",
                        )}
                      />
                      <span className="text-center text-[9.5px]">{item.label}</span>
                    </button>
                  </TooltipTrigger>
                  <TooltipContent side="right">{item.label}</TooltipContent>
                </Tooltip>
              );
            })}
          </div>
        </div>

        {/* Secondary panel */}
        {!collapsed && (
          <div className="relative flex w-[230px] flex-col">
            <div className="flex items-center justify-between border-b border-sidebar-border px-4 pb-3 pt-4">
              <h2 className="text-[13px] font-semibold tracking-tight text-sidebar-foreground">
                {secondary.title}
              </h2>
              <button
                onClick={() => setCollapsed(true)}
                className="flex h-6 w-6 items-center justify-center rounded-md text-sidebar-foreground/50 hover:bg-sidebar-accent hover:text-sidebar-foreground"
                aria-label="Collapse sidebar"
              >
                <ChevronsLeft className="h-4 w-4" />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto px-2 py-3">
              {secondary.sections.map((section, idx) => (
                <div key={idx} className="mb-3">
                  {section.label && (
                    <div className="px-2.5 pb-1.5 pt-1 text-[10px] font-semibold uppercase tracking-[0.06em] text-sidebar-foreground/40">
                      {section.label}
                    </div>
                  )}
                  <ul className="space-y-0.5">
                    {section.items.map((it) => {
                      const active = isActive(it.url);
                      return (
                        <li key={it.title}>
                          <Link
                            to={it.url}
                            className={cn(
                              "group relative flex items-center gap-2 rounded-md px-2.5 py-1.5 text-[13px] transition-colors",
                              active
                                ? "bg-sidebar-accent font-semibold text-sidebar-foreground"
                                : "text-sidebar-foreground/75 hover:bg-sidebar-accent/60 hover:text-sidebar-foreground",
                            )}
                          >
                            {active && (
                              <span className="absolute inset-y-1.5 left-0 w-[2px] rounded-r-full bg-primary" />
                            )}
                            <span className="flex-1 truncate">{it.title}</span>
                            {it.soon && (
                              <span className="rounded border border-sidebar-border px-1 py-px text-[8.5px] font-semibold uppercase tracking-wider text-sidebar-foreground/50">
                                Soon
                              </span>
                            )}
                            {it.pro && (
                              <span className="rounded border border-primary/40 bg-primary/15 px-1 py-px text-[8.5px] font-semibold uppercase tracking-wider text-primary">
                                Pro
                              </span>
                            )}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </nav>
          </div>
        )}

        {collapsed && (
          <button
            onClick={() => setCollapsed(false)}
            className="absolute -right-3 top-5 z-10 flex h-6 w-6 items-center justify-center rounded-full border border-border bg-background text-muted-foreground shadow-sm hover:text-foreground"
            aria-label="Expand sidebar"
          >
            <ChevronsRight className="h-3.5 w-3.5" />
          </button>
        )}
      </aside>
    </TooltipProvider>
  );
}
