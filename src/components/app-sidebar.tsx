import { Link, useLocation } from "@tanstack/react-router";
import {
  BarChart3,
  LayoutDashboard,
  Search,
  TrendingUp,
  Layers,
  Sparkles,
  Quote,
  GitCompare,
  Users,
  FileText,
  KeyRound,
  Plus,
  LogIn,
  Rocket,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type NavItem = {
  title: string;
  url: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: "PRO" | "SOON" | "NEW";
  locked?: boolean;
};

type NavGroup = {
  label: string;
  items: NavItem[];
};

const groups: NavGroup[] = [
  {
    label: "Workspace",
    items: [{ title: "Dashboard", url: "/dashboard", icon: LayoutDashboard }],
  },
  {
    label: "SEO Tools",
    items: [
      { title: "Site Audit", url: "/audit/mriacrm.com", icon: BarChart3 },
      { title: "Position Tracking", url: "/position-tracking", icon: TrendingUp, locked: true },
      { title: "Bulk Audit", url: "/bulk-audit", icon: Layers, badge: "SOON", locked: true },
    ],
  },
  {
    label: "AI Visibility",
    items: [
      { title: "AI Analysis", url: "/ai-analysis", icon: Sparkles, locked: true },
      { title: "AI Citations", url: "/ai-citations", icon: Quote, badge: "SOON", locked: true },
    ],
  },
  {
    label: "Competitors",
    items: [
      { title: "Compare Sites", url: "/compare", icon: GitCompare, locked: true },
      { title: "Competitors", url: "/competitors", icon: Users, badge: "SOON", locked: true },
    ],
  },
  {
    label: "Reports",
    items: [
      { title: "Reports", url: "/reports", icon: FileText, locked: true },
      { title: "Keywords", url: "/keywords", icon: KeyRound, locked: true },
    ],
  },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();

  const isActive = (url: string) =>
    location.pathname === url || location.pathname.startsWith(url + "/");

  return (
    <Sidebar collapsible="icon" className="border-r-0">
      <SidebarHeader className="border-b border-sidebar-border px-3 py-4">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground shadow-[var(--shadow-glow)]">
            <BarChart3 className="h-4 w-4" />
          </div>
          {!collapsed && (
            <div className="flex flex-col leading-tight">
              <span className="text-[13px] font-semibold tracking-tight text-sidebar-foreground">
                GEO &amp; SEO Checker
              </span>
              <span className="text-[10px] uppercase tracking-wider text-sidebar-foreground/50">
                Visibility Suite
              </span>
            </div>
          )}
        </Link>
      </SidebarHeader>

      <SidebarContent className="px-2 py-3">
        {!collapsed && (
          <div className="px-1 pb-3">
            <Button
              size="sm"
              className="w-full justify-start gap-2 bg-primary text-primary-foreground shadow-sm hover:bg-primary/90"
            >
              <Plus className="h-4 w-4" />
              New Audit
            </Button>
          </div>
        )}
        {collapsed && (
          <div className="flex justify-center pb-3">
            <Button
              size="icon"
              className="h-8 w-8 bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        )}

        {groups.map((group) => (
          <SidebarGroup key={group.label} className="px-0 py-1">
            {!collapsed && (
              <SidebarGroupLabel className="px-3 text-[10px] font-semibold uppercase tracking-[0.08em] text-sidebar-foreground/40">
                {group.label}
              </SidebarGroupLabel>
            )}
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => {
                  const active = isActive(item.url);
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        asChild
                        tooltip={item.title}
                        className={cn(
                          "group/item relative h-9 gap-2.5 rounded-md px-2.5 text-[13px] font-medium text-sidebar-foreground/75 transition-colors",
                          "hover:bg-sidebar-accent hover:text-sidebar-foreground",
                          active &&
                            "bg-sidebar-accent text-sidebar-foreground before:absolute before:left-0 before:top-1.5 before:bottom-1.5 before:w-[3px] before:rounded-r-full before:bg-sidebar-primary",
                        )}
                      >
                        <Link to={item.url}>
                          <item.icon className="h-4 w-4 shrink-0" />
                          {!collapsed && (
                            <>
                              <span className="flex-1 truncate">{item.title}</span>
                              {item.badge && (
                                <Badge
                                  variant="outline"
                                  className={cn(
                                    "h-4 border-sidebar-border bg-sidebar-accent px-1.5 text-[9px] font-semibold uppercase tracking-wider text-sidebar-foreground/60",
                                    item.badge === "PRO" && "border-primary/40 text-primary",
                                    item.badge === "NEW" && "border-success/40 text-success",
                                  )}
                                >
                                  {item.badge}
                                </Badge>
                              )}
                              {item.locked && !item.badge && (
                                <svg
                                  className="h-3 w-3 text-sidebar-foreground/30"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                >
                                  <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                                </svg>
                              )}
                            </>
                          )}
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border p-3">
        {!collapsed ? (
          <div className="space-y-2">
            <Button
              size="sm"
              className="w-full justify-center gap-2 bg-warning text-warning-foreground hover:bg-warning/90"
            >
              <Rocket className="h-3.5 w-3.5" />
              Upgrade plan
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="w-full justify-center gap-2 text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
            >
              <LogIn className="h-3.5 w-3.5" />
              Log in
            </Button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <Button
              size="icon"
              className="h-8 w-8 bg-warning text-warning-foreground hover:bg-warning/90"
            >
              <Rocket className="h-3.5 w-3.5" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              className="h-8 w-8 text-sidebar-foreground/70 hover:bg-sidebar-accent"
            >
              <LogIn className="h-3.5 w-3.5" />
            </Button>
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}

export { Search };
