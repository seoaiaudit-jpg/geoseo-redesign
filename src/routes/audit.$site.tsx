import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ChevronDown,
  Download,
  Share2,
  Settings,
  RefreshCw,
  Info,
  AlertCircle,
  AlertTriangle,
  ChevronRight,
  Zap,
  Sparkles,
  ExternalLink,
  Monitor,
  FileText,
  GitCompare,
  TrendingUp,
  Code2,
  BarChart3,
  Search,
  CheckCircle2,
  XCircle,
  Clock,
  Filter,
} from "lucide-react";
import { useState } from "react";
import { SemrushShell } from "@/components/semrush-shell";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

type TabKey =
  | "overview"
  | "issues"
  | "crawled"
  | "statistics"
  | "compare"
  | "progress"
  | "jsimpact";

export const Route = createFileRoute("/audit/$site")({
  head: ({ params }) => ({
    meta: [
      { title: `Site Audit · ${params.site} — GEO & SEO Checker` },
      {
        name: "description",
        content: `Complete SEO + AI Search audit for ${params.site}. Site Health, Crawled Pages, AI Search Health and prioritized issues.`,
      },
    ],
  }),
  component: AuditPage,
});

function AuditPage() {
  const { site } = Route.useParams();
  const [tab, setTab] = useState<TabKey>("overview");
  return (
    <SemrushShell active="seo">
      <Breadcrumbs site={site} />
      <NotificationBanner />

      <div className="px-6 pb-10">
        <AuditHeader site={site} />
        <AuditTabs active={tab} onChange={setTab} />
        {tab === "overview" && (
          <>
            <OverviewGrid site={site} />
            <ChartsRow />
            <IssuesTable />
          </>
        )}
        {tab === "issues" && <IssuesView />}
        {tab === "crawled" && <CrawledPagesView />}
        {tab === "statistics" && <StatisticsView />}
        {tab === "compare" && <CompareCrawlsView />}
        {tab === "progress" && <ProgressView />}
        {tab === "jsimpact" && <JSImpactView />}
      </div>
    </SemrushShell>
  );
}

/* ----------------------------- Breadcrumbs ----------------------------- */

function Breadcrumbs({ site }: { site: string }) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-border bg-background px-6 py-3 text-[12px]">
      <nav className="flex items-center gap-1.5 text-muted-foreground">
        <Link to="/" className="hover:text-foreground">
          Home
        </Link>
        <ChevronRight className="h-3 w-3 opacity-50" />
        <span className="hover:text-foreground">SEO</span>
        <ChevronRight className="h-3 w-3 opacity-50" />
        <span className="font-medium text-foreground">Site Audit</span>
      </nav>
      <div className="flex items-center gap-3 text-[12px]">
        <button className="text-primary hover:underline">Help center</button>
        <button className="text-primary hover:underline">Send feedback</button>
      </div>
    </div>
  );
}

/* ----------------------------- Banner ----------------------------- */

function NotificationBanner() {
  return (
    <div className="mx-6 mt-4 flex items-start gap-3 rounded-md border border-info/30 bg-info/8 px-4 py-3 text-[13px]">
      <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-info/20 text-info">
        <Info className="h-3 w-3" />
      </div>
      <p className="flex-1 text-foreground/90">
        You have changed the scope of issues you want to check. To view the updated Site Health and
        other data, please rerun your campaign.
      </p>
      <button className="text-foreground/40 hover:text-foreground" aria-label="Dismiss">
        ×
      </button>
    </div>
  );
}

/* ----------------------------- Header ----------------------------- */

function AuditHeader({ site }: { site: string }) {
  return (
    <div className="mt-5 flex flex-wrap items-start justify-between gap-3">
      <div>
        <div className="flex items-center gap-3">
          <h1 className="text-[22px] font-semibold tracking-tight text-foreground">
            Site Audit:
          </h1>
          <button className="flex items-center gap-1.5 text-[22px] font-semibold tracking-tight text-primary hover:underline">
            {site}
            <ChevronDown className="h-4 w-4" />
          </button>
          <a
            href={`https://${site}`}
            target="_blank"
            rel="noreferrer"
            className="text-muted-foreground hover:text-foreground"
          >
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
        <div className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-[12px] text-muted-foreground">
          <span>{site}</span>
          <span className="opacity-50">·</span>
          <span>Updated: Mon, Apr 27, 2026</span>
          <span className="opacity-50">·</span>
          <span className="flex items-center gap-1">
            <Monitor className="h-3 w-3" /> Desktop
          </span>
          <span className="opacity-50">·</span>
          <span>JS rendering: Disabled</span>
          <span className="opacity-50">·</span>
          <span className="flex items-center gap-1">
            Pages crawled:{" "}
            <span className="flex items-center gap-1 font-semibold text-warning">
              <AlertTriangle className="h-3 w-3" />
              100/100
            </span>
          </span>
          <span className="opacity-50">·</span>
          <span>
            Excluded checks: <span className="font-semibold text-foreground">1</span>
          </span>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Button
          size="sm"
          className="h-8 gap-1.5 bg-primary text-primary-foreground hover:bg-primary/90"
        >
          <RefreshCw className="h-3.5 w-3.5" />
          Rerun campaign
        </Button>
        <Button variant="outline" size="sm" className="h-8 gap-1.5">
          <span className="flex h-3.5 w-3.5 items-center justify-center rounded-sm bg-info text-[8px] font-bold text-info-foreground">
            L
          </span>
          Looker Studio
        </Button>
        <Button variant="outline" size="sm" className="h-8 gap-1.5">
          <Download className="h-3.5 w-3.5" />
          PDF
        </Button>
        <Button variant="outline" size="sm" className="h-8 gap-1.5">
          <Download className="h-3.5 w-3.5" />
          Export
        </Button>
        <Button variant="outline" size="sm" className="h-8 gap-1.5">
          <Share2 className="h-3.5 w-3.5" />
          Share
        </Button>
        <Button variant="outline" size="icon" className="h-8 w-8">
          <Settings className="h-3.5 w-3.5" />
        </Button>
      </div>
    </div>
  );
}

/* ----------------------------- Tabs ----------------------------- */

function AuditTabs({
  active,
  onChange,
}: {
  active: TabKey;
  onChange: (t: TabKey) => void;
}) {
  const tabs: { key: TabKey; name: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { key: "overview", name: "Overview", icon: BarChart3 },
    { key: "issues", name: "Issues", icon: AlertCircle },
    { key: "crawled", name: "Crawled Pages", icon: FileText },
    { key: "statistics", name: "Statistics", icon: BarChart3 },
    { key: "compare", name: "Compare Crawls", icon: GitCompare },
    { key: "progress", name: "Progress", icon: TrendingUp },
    { key: "jsimpact", name: "JS Impact", icon: Code2 },
  ];
  return (
    <div className="mt-5 flex items-center justify-between border-b border-border">
      <nav className="flex flex-wrap items-center gap-1">
        {tabs.map((t) => {
          const isActive = t.key === active;
          return (
            <button
              key={t.key}
              onClick={() => onChange(t.key)}
              className={cn(
                "relative flex items-center gap-1.5 px-3 py-3 text-[14px] font-medium transition-colors",
                isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground",
              )}
            >
              <t.icon className="h-3.5 w-3.5" />
              {t.name}
              {isActive && (
                <span className="absolute inset-x-3 -bottom-px h-[2px] rounded-full bg-primary" />
              )}
            </button>
          );
        })}
      </nav>
      <Button
        size="sm"
        variant="outline"
        className="h-8 gap-1.5 border-primary/40 bg-primary/5 text-primary hover:bg-primary/10"
      >
        <Sparkles className="h-3.5 w-3.5" />
        Copilot
        <span className="ml-1 rounded-full bg-primary px-1.5 py-px text-[9px] font-bold text-primary-foreground">
          AI 1
        </span>
      </Button>
    </div>
  );
}

/* ----------------------------- Overview grid ----------------------------- */

function OverviewGrid({ site }: { site: string }) {
  return (
    <section className="mt-6 grid gap-4 lg:grid-cols-4">
      <SiteHealthCard />
      <CrawledPagesCard />
      <AISearchHealthCard />
      <BlockedFromAICard />
    </section>
  );
}

/* ---------- Site Health card with delta ---------- */

function SiteHealthCard() {
  return (
    <article className="rounded-lg border border-border bg-card p-5 shadow-[var(--shadow-soft)]">
      <CardTitle title="Site Health" />
      <Gauge value={81} color="info" />
      <ul className="mt-4 space-y-2 text-[13px]">
        <li className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-info" />
            <span className="text-muted-foreground">Your site</span>
          </span>
          <span className="font-semibold tabular-nums">81%</span>
        </li>
        <li className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <ChevronDown className="h-3 w-3 text-muted-foreground" />
            <span className="text-muted-foreground">Top-10% websites</span>
            <ChevronDown className="h-3 w-3 text-muted-foreground" />
          </span>
          <span className="font-semibold tabular-nums">92%</span>
        </li>
      </ul>
    </article>
  );
}

/* ---------- Crawled pages card ---------- */

function CrawledPagesCard() {
  const rows = [
    { label: "Healthy", value: 10, color: "bg-success", text: "text-success" },
    { label: "Broken", value: 1, color: "bg-destructive", text: "text-destructive" },
    { label: "Have issues", value: 72, color: "bg-warning", text: "text-warning" },
    { label: "Redirects", value: 3, color: "bg-info", text: "text-info" },
    { label: "Blocked", value: 14, color: "bg-muted-foreground/60", text: "text-muted-foreground" },
  ];
  const total = 100;
  return (
    <article className="rounded-lg border border-border bg-card p-5 shadow-[var(--shadow-soft)]">
      <CardTitle title="Crawled Pages" />
      <div className="mt-3 flex items-baseline gap-2">
        <span className="text-[28px] font-semibold tabular-nums text-info">{total}</span>
        <span className="text-[12px] text-muted-foreground">no changes</span>
      </div>
      <div className="mt-3 flex h-2 overflow-hidden rounded-full">
        {rows.map((r) => (
          <div
            key={r.label}
            className={cn("h-full", r.color)}
            style={{ width: `${r.value}%` }}
          />
        ))}
      </div>
      <ul className="mt-4 space-y-2 text-[13px]">
        {rows.map((r) => (
          <li key={r.label} className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <span className={cn("h-2 w-2 rounded-full", r.color)} />
              <span className="text-foreground/80">{r.label}</span>
            </span>
            <span className="font-semibold tabular-nums">{r.value}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}

/* ---------- AI Search Health card ---------- */

function AISearchHealthCard() {
  return (
    <article className="rounded-lg border border-border bg-card p-5 shadow-[var(--shadow-soft)]">
      <div className="flex items-center justify-between">
        <CardTitle title="AI Search Health" />
        <Badge
          variant="outline"
          className="border-primary/40 bg-primary/10 px-1.5 py-0 text-[9px] font-semibold uppercase tracking-wider text-primary"
        >
          beta
        </Badge>
      </div>
      <Gauge value={74} color="warning" />
      <div className="mt-3 rounded-md bg-warning/10 px-3 py-2 text-[12px] text-foreground/80">
        Reach 80% for better website optimization in AI search
      </div>
      <div className="mt-3 flex items-center justify-between text-[12px]">
        <button className="text-primary hover:underline">How it works</button>
        <span className="font-medium text-warning">208 issues</span>
      </div>
    </article>
  );
}

/* ---------- Blocked from AI Search card ---------- */

function BlockedFromAICard() {
  const bots = [
    { name: "ChatGPT-User", value: 4, icon: "🤖" },
    { name: "OAI-SearchBot", value: 4, icon: "🟢" },
    { name: "Googlebot", value: 4, icon: "🔵" },
    { name: "Google-Extended", value: 4, icon: "✦" },
    { name: "PerplexityBot", value: 2, icon: "🟣" },
  ];
  const max = 10;
  return (
    <article className="rounded-lg border border-border bg-card p-5 shadow-[var(--shadow-soft)]">
      <CardTitle title="Blocked from AI Search" />
      <p className="mt-2 text-[12px] text-muted-foreground">
        Pages crawled: <span className="font-semibold text-foreground">100</span>
      </p>
      <ul className="mt-3 space-y-2.5">
        {bots.map((b) => (
          <li key={b.name} className="flex items-center gap-3 text-[12px]">
            <span className="w-4 text-center">{b.icon}</span>
            <span className="flex-1 truncate text-foreground/80">{b.name}</span>
            <span className="w-5 text-right font-semibold tabular-nums">{b.value}</span>
            <div className="h-1.5 w-16 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-destructive/70"
                style={{ width: `${(b.value / max) * 100}%` }}
              />
            </div>
          </li>
        ))}
      </ul>
      <button className="mt-3 text-[12px] font-medium text-primary hover:underline">
        Show more
      </button>
      <div className="mt-3 border-t border-border pt-2.5">
        <button className="text-[12px] font-medium text-primary hover:underline">
          How to unblock pages
        </button>
      </div>
    </article>
  );
}

/* ---------- Card title with info icon ---------- */

function CardTitle({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-1.5">
      <h3 className="text-[15px] font-semibold tracking-tight text-foreground">{title}</h3>
      <Info className="h-3.5 w-3.5 text-muted-foreground/60" />
    </div>
  );
}

/* ---------- Gauge SVG semicircle ---------- */

function Gauge({
  value,
  color,
}: {
  value: number;
  color: "info" | "warning" | "success" | "destructive";
}) {
  const radius = 70;
  const circ = Math.PI * radius;
  const dash = (value / 100) * circ;
  const stroke =
    color === "info"
      ? "var(--info)"
      : color === "warning"
        ? "var(--warning)"
        : color === "success"
          ? "var(--success)"
          : "var(--destructive)";
  const textColor =
    color === "info"
      ? "text-info"
      : color === "warning"
        ? "text-warning"
        : color === "success"
          ? "text-success"
          : "text-destructive";

  // Indicator dot at end of arc
  const angle = Math.PI * (1 - value / 100); // 0..π
  const cx = 95 + Math.cos(angle) * radius;
  const cy = 90 - Math.sin(angle) * radius;

  return (
    <div className="relative mx-auto mt-3 w-fit">
      <svg width="190" height="110" viewBox="0 0 190 110">
        <path
          d={`M 25 90 A ${radius} ${radius} 0 0 1 165 90`}
          fill="none"
          stroke="var(--muted)"
          strokeWidth="14"
          strokeLinecap="round"
        />
        <path
          d={`M 25 90 A ${radius} ${radius} 0 0 1 165 90`}
          fill="none"
          stroke={stroke}
          strokeWidth="14"
          strokeLinecap="round"
          strokeDasharray={`${dash} ${circ}`}
          style={{ transition: "stroke-dasharray 0.8s ease-out" }}
        />
        <circle cx={cx} cy={cy} r="6" fill={stroke} />
        <circle cx={cx} cy={cy} r="3" fill="var(--background)" />
      </svg>
      <div className="absolute inset-x-0 bottom-1 text-center">
        <div className={cn("text-[34px] font-semibold leading-none tabular-nums", textColor)}>
          {value}%
        </div>
        <div className="mt-0.5 text-[11px] text-muted-foreground">no changes</div>
      </div>
    </div>
  );
}

/* ----------------------------- Charts row ----------------------------- */

function ChartsRow() {
  return (
    <section className="mt-6 grid gap-4 lg:grid-cols-[1fr_2fr]">
      <ErrorsWarningsCard />
      <IssuesPreviewCard />
    </section>
  );
}

function ErrorsWarningsCard() {
  return (
    <article className="rounded-lg border border-border bg-card p-5 shadow-[var(--shadow-soft)]">
      <div>
        <div className="flex items-center gap-1.5">
          <h3 className="text-[15px] font-semibold tracking-tight">Errors</h3>
          <Info className="h-3.5 w-3.5 text-muted-foreground/60" />
        </div>
        <div className="mt-1 text-[28px] font-semibold tabular-nums text-destructive">40</div>
        <Sparkline color="destructive" points={[20, 32, 28, 35, 30, 38, 40]} />
      </div>
      <div className="mt-5 border-t border-border pt-4">
        <div className="flex items-center gap-1.5">
          <h3 className="text-[15px] font-semibold tracking-tight">Warnings</h3>
          <Info className="h-3.5 w-3.5 text-muted-foreground/60" />
        </div>
        <div className="mt-1 text-[28px] font-semibold tabular-nums text-warning">696</div>
        <Sparkline color="warning" points={[400, 510, 480, 600, 580, 650, 696]} />
      </div>
      <div className="mt-5 border-t border-border pt-4">
        <div className="flex items-center gap-1.5">
          <h3 className="text-[15px] font-semibold tracking-tight">Notices</h3>
          <Info className="h-3.5 w-3.5 text-muted-foreground/60" />
        </div>
        <div className="mt-1 text-[28px] font-semibold tabular-nums text-info">1.4K</div>
        <Sparkline color="info" points={[800, 950, 1100, 1050, 1200, 1300, 1400]} />
      </div>
    </article>
  );
}

function Sparkline({
  points,
  color,
}: {
  points: number[];
  color: "destructive" | "warning" | "info";
}) {
  const max = Math.max(...points);
  const min = Math.min(...points);
  const range = max - min || 1;
  const w = 280;
  const h = 60;
  const step = w / (points.length - 1);
  const path = points
    .map((p, i) => {
      const x = i * step;
      const y = h - ((p - min) / range) * (h - 8) - 4;
      return `${i === 0 ? "M" : "L"}${x},${y}`;
    })
    .join(" ");
  const areaPath = `${path} L${w},${h} L0,${h} Z`;
  const stroke =
    color === "destructive"
      ? "var(--destructive)"
      : color === "warning"
        ? "var(--warning)"
        : "var(--info)";
  const fill =
    color === "destructive"
      ? "oklch(from var(--destructive) l c h / 0.12)"
      : color === "warning"
        ? "oklch(from var(--warning) l c h / 0.12)"
        : "oklch(from var(--info) l c h / 0.12)";

  // last point
  const lastX = (points.length - 1) * step;
  const lastY = h - ((points[points.length - 1] - min) / range) * (h - 8) - 4;

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="mt-2 h-14 w-full">
      <path d={areaPath} fill={fill} />
      <path d={path} fill="none" stroke={stroke} strokeWidth="2" />
      <circle cx={lastX} cy={lastY} r="3" fill={stroke} />
    </svg>
  );
}

function IssuesPreviewCard() {
  return (
    <article className="rounded-lg border border-border bg-card shadow-[var(--shadow-soft)]">
      <div className="flex items-center justify-between border-b border-border px-5 py-4">
        <div className="flex items-center gap-1.5">
          <h3 className="text-[15px] font-semibold tracking-tight">Top issues</h3>
          <Info className="h-3.5 w-3.5 text-muted-foreground/60" />
        </div>
        <button className="text-[12px] font-medium text-primary hover:underline">
          View all 208 →
        </button>
      </div>
      <ul className="divide-y divide-border">
        {[
          {
            sev: "destructive",
            icon: Zap,
            title: "Invalid structured data items",
            count: 36,
            unit: "pages",
          },
          {
            sev: "warning",
            icon: AlertTriangle,
            title: "Missing meta description",
            count: 20,
            unit: "pages",
          },
          {
            sev: "warning",
            icon: AlertTriangle,
            title: "Low word count",
            count: 12,
            unit: "pages",
          },
          {
            sev: "info",
            icon: Info,
            title: "Llms.txt not found",
            count: 1,
            unit: "page",
            tag: "AI Search",
          },
          {
            sev: "info",
            icon: Info,
            title: "Content not optimized",
            count: 1,
            unit: "page",
            tag: "AI Search",
          },
        ].map((i, idx) => (
          <li
            key={idx}
            className="grid grid-cols-[auto_1fr_auto_auto] items-center gap-4 px-5 py-3 text-[13px] hover:bg-muted/40"
          >
            <div
              className={cn(
                "flex h-6 w-6 items-center justify-center rounded",
                i.sev === "destructive" && "bg-destructive/15 text-destructive",
                i.sev === "warning" && "bg-warning/15 text-warning",
                i.sev === "info" && "bg-info/15 text-info",
              )}
            >
              <i.icon className="h-3.5 w-3.5" />
            </div>
            <div className="flex items-center gap-2 min-w-0">
              <span className="truncate font-medium text-foreground">{i.title}</span>
              {i.tag && (
                <span className="rounded border border-primary/30 bg-primary/10 px-1.5 py-px text-[10px] font-semibold text-primary">
                  {i.tag}
                </span>
              )}
            </div>
            <button className="font-semibold text-primary hover:underline whitespace-nowrap">
              {i.count} {i.unit}
            </button>
            <button className="text-primary hover:underline whitespace-nowrap">How to fix</button>
          </li>
        ))}
      </ul>
    </article>
  );
}

/* ----------------------------- Issues table ----------------------------- */

function IssuesTable() {
  const issues = [
    {
      sev: "error",
      title: "Pages have duplicate content",
      count: 8,
      unit: "pages",
      tag: null,
      diff: "+2",
    },
    {
      sev: "error",
      title: "Pages returned 4xx status code",
      count: 14,
      unit: "pages",
      tag: null,
      diff: "+5",
    },
    {
      sev: "error",
      title: "Pages have broken internal links",
      count: 18,
      unit: "pages",
      tag: null,
      diff: "0",
    },
    {
      sev: "warning",
      title: "Pages have multiple H1 tags",
      count: 24,
      unit: "pages",
      tag: null,
      diff: "-1",
    },
    {
      sev: "warning",
      title: "Pages don't have an h1 heading",
      count: 9,
      unit: "pages",
      tag: null,
      diff: "0",
    },
    {
      sev: "warning",
      title: "Llms.txt is missing key directives",
      count: 1,
      unit: "page",
      tag: "AI Search",
      diff: "0",
    },
    {
      sev: "notice",
      title: "Pages have only one incoming internal link",
      count: 32,
      unit: "pages",
      tag: null,
      diff: "+12",
    },
    {
      sev: "notice",
      title: "Sitemap.xml not indicated in robots.txt",
      count: 1,
      unit: "site",
      tag: null,
      diff: "0",
    },
  ];

  return (
    <section className="mt-6 rounded-lg border border-border bg-card shadow-[var(--shadow-soft)]">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-5 py-4">
        <div>
          <h2 className="text-[15px] font-semibold tracking-tight">All issues</h2>
          <p className="mt-0.5 text-[12px] text-muted-foreground">
            208 issues across all categories — sort by severity to fix the most impactful first.
          </p>
        </div>
        <div className="flex items-center gap-2 text-[12px]">
          <select className="h-8 rounded-md border border-border bg-background px-2 text-[12px] outline-none focus:border-ring">
            <option>All categories</option>
            <option>Crawlability</option>
            <option>HTTPS</option>
            <option>AI Search</option>
            <option>Performance</option>
          </select>
          <select className="h-8 rounded-md border border-border bg-background px-2 text-[12px] outline-none focus:border-ring">
            <option>Sort: Severity</option>
            <option>Sort: Pages affected</option>
            <option>Sort: Recently changed</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-[auto_1fr_120px_120px_140px] items-center gap-4 border-b border-border bg-muted/30 px-5 py-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
        <div></div>
        <div>Issue</div>
        <div className="text-right">Pages</div>
        <div className="text-right">Change</div>
        <div className="text-right pr-1">Action</div>
      </div>

      <ul>
        {issues.map((i, idx) => (
          <li
            key={idx}
            className="grid grid-cols-[auto_1fr_120px_120px_140px] items-center gap-4 border-b border-border px-5 py-3 text-[13px] last:border-0 hover:bg-muted/40"
          >
            <SeverityBadge sev={i.sev as "error" | "warning" | "notice"} />
            <div className="flex items-center gap-2 min-w-0">
              <span className="truncate font-medium text-foreground">{i.title}</span>
              {i.tag && (
                <span className="rounded border border-primary/30 bg-primary/10 px-1.5 py-px text-[10px] font-semibold text-primary">
                  {i.tag}
                </span>
              )}
            </div>
            <button className="text-right font-semibold text-primary hover:underline">
              {i.count} {i.unit}
            </button>
            <div
              className={cn(
                "text-right font-medium tabular-nums",
                i.diff.startsWith("+") && "text-destructive",
                i.diff.startsWith("-") && "text-success",
                i.diff === "0" && "text-muted-foreground",
              )}
            >
              {i.diff === "0" ? "—" : i.diff}
            </div>
            <div className="flex items-center justify-end gap-3">
              <button className="text-primary hover:underline whitespace-nowrap">
                How to fix
              </button>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </div>
          </li>
        ))}
      </ul>

      <div className="flex items-center justify-between border-t border-border px-5 py-3 text-[12px] text-muted-foreground">
        <span>Showing 8 of 208 issues</span>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="sm" className="h-7 px-2">
            Previous
          </Button>
          <Button variant="ghost" size="sm" className="h-7 w-7 px-0 bg-muted text-foreground">
            1
          </Button>
          <Button variant="ghost" size="sm" className="h-7 w-7 px-0">
            2
          </Button>
          <Button variant="ghost" size="sm" className="h-7 w-7 px-0">
            3
          </Button>
          <Button variant="ghost" size="sm" className="h-7 px-2">
            Next
          </Button>
        </div>
      </div>
    </section>
  );
}

function SeverityBadge({ sev }: { sev: "error" | "warning" | "notice" }) {
  const map = {
    error: { label: "Error", cls: "bg-destructive/15 text-destructive", icon: AlertCircle },
    warning: { label: "Warning", cls: "bg-warning/15 text-warning", icon: AlertTriangle },
    notice: { label: "Notice", cls: "bg-info/15 text-info", icon: Info },
  }[sev];
  const Icon = map.icon;
  return (
    <div
      className={cn(
        "flex h-6 items-center gap-1 rounded px-2 text-[10px] font-semibold uppercase tracking-wider",
        map.cls,
      )}
    >
      <Icon className="h-3 w-3" />
      {map.label}
    </div>
  );
}

/* ============================================================
 * Tab views
 * ============================================================ */

/* ---------------- Issues view ---------------- */

function IssuesView() {
  const categories = [
    { name: "All issues", count: 208, active: true },
    { name: "Crawlability", count: 42 },
    { name: "HTTPS", count: 8 },
    { name: "International SEO", count: 12 },
    { name: "Core Web Vitals", count: 18 },
    { name: "AI Search", count: 24 },
    { name: "Markup", count: 36 },
    { name: "Content", count: 41 },
    { name: "Internal Linking", count: 27 },
  ];
  const issues = [
    { sev: "error", title: "5XX errors", count: 3, unit: "pages", cat: "Crawlability", diff: "+1" },
    { sev: "error", title: "4xx status code pages", count: 14, unit: "pages", cat: "Crawlability", diff: "+5" },
    { sev: "error", title: "Duplicate title tags", count: 8, unit: "pages", cat: "Markup", diff: "0" },
    { sev: "error", title: "Broken internal links", count: 18, unit: "pages", cat: "Internal Linking", diff: "0" },
    { sev: "error", title: "Invalid structured data", count: 36, unit: "pages", cat: "Markup", diff: "+3" },
    { sev: "warning", title: "Missing meta descriptions", count: 20, unit: "pages", cat: "Content", diff: "-2" },
    { sev: "warning", title: "Multiple H1 tags", count: 24, unit: "pages", cat: "Markup", diff: "-1" },
    { sev: "warning", title: "Low word count", count: 12, unit: "pages", cat: "Content", diff: "0" },
    { sev: "warning", title: "Llms.txt missing directives", count: 1, unit: "page", cat: "AI Search", diff: "0" },
    { sev: "warning", title: "Large CLS on key pages", count: 6, unit: "pages", cat: "Core Web Vitals", diff: "+1" },
    { sev: "notice", title: "Orphaned pages", count: 4, unit: "pages", cat: "Internal Linking", diff: "0" },
    { sev: "notice", title: "Only one incoming internal link", count: 32, unit: "pages", cat: "Internal Linking", diff: "+12" },
    { sev: "notice", title: "Sitemap not in robots.txt", count: 1, unit: "site", cat: "Crawlability", diff: "0" },
  ];
  return (
    <section className="mt-6 grid gap-4 lg:grid-cols-[240px_1fr]">
      {/* Category sidebar */}
      <aside className="rounded-lg border border-border bg-card p-2 shadow-[var(--shadow-soft)]">
        <div className="px-2 py-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
          Categories
        </div>
        <ul className="space-y-0.5">
          {categories.map((c) => (
            <li key={c.name}>
              <button
                className={cn(
                  "flex w-full items-center justify-between rounded-md px-2.5 py-1.5 text-[13px] transition-colors",
                  c.active
                    ? "bg-primary/10 font-semibold text-primary"
                    : "text-foreground/80 hover:bg-muted",
                )}
              >
                <span>{c.name}</span>
                <span className="text-[11px] tabular-nums text-muted-foreground">{c.count}</span>
              </button>
            </li>
          ))}
        </ul>
      </aside>

      {/* Issues list */}
      <div className="rounded-lg border border-border bg-card shadow-[var(--shadow-soft)]">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-5 py-4">
          <div className="flex items-center gap-2">
            <h2 className="text-[15px] font-semibold tracking-tight">All issues</h2>
            <Badge variant="secondary" className="text-[10px]">208</Badge>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
              <input
                placeholder="Search issues..."
                className="h-8 w-56 rounded-md border border-border bg-background pl-8 pr-2 text-[12px] outline-none focus:border-ring"
              />
            </div>
            <Button variant="outline" size="sm" className="h-8 gap-1.5">
              <Filter className="h-3.5 w-3.5" /> Filters
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-[auto_1fr_140px_100px_100px_120px] items-center gap-4 border-b border-border bg-muted/30 px-5 py-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
          <div></div>
          <div>Issue</div>
          <div>Category</div>
          <div className="text-right">Pages</div>
          <div className="text-right">Change</div>
          <div className="text-right pr-1">Action</div>
        </div>

        <ul>
          {issues.map((i, idx) => (
            <li
              key={idx}
              className="grid grid-cols-[auto_1fr_140px_100px_100px_120px] items-center gap-4 border-b border-border px-5 py-3 text-[13px] last:border-0 hover:bg-muted/40"
            >
              <SeverityBadge sev={i.sev as "error" | "warning" | "notice"} />
              <span className="truncate font-medium text-foreground">{i.title}</span>
              <span className="truncate text-muted-foreground">{i.cat}</span>
              <button className="text-right font-semibold text-primary hover:underline">
                {i.count}
              </button>
              <div
                className={cn(
                  "text-right font-medium tabular-nums",
                  i.diff.startsWith("+") && "text-destructive",
                  i.diff.startsWith("-") && "text-success",
                  i.diff === "0" && "text-muted-foreground",
                )}
              >
                {i.diff === "0" ? "—" : i.diff}
              </div>
              <div className="flex items-center justify-end gap-2">
                <button className="text-primary hover:underline whitespace-nowrap">Why</button>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ---------------- Crawled Pages view ---------------- */

function CrawledPagesView() {
  const pages = [
    { url: "/", status: 200, health: 92, issues: 1, crawl: "1.2s", size: "142 KB", type: "HTML" },
    { url: "/pricing", status: 200, health: 88, issues: 2, crawl: "1.6s", size: "98 KB", type: "HTML" },
    { url: "/features", status: 200, health: 76, issues: 4, crawl: "2.1s", size: "186 KB", type: "HTML" },
    { url: "/blog/seo-guide-2026", status: 200, health: 81, issues: 3, crawl: "1.4s", size: "120 KB", type: "HTML" },
    { url: "/blog/ai-search-optimization", status: 200, health: 64, issues: 6, crawl: "1.9s", size: "172 KB", type: "HTML" },
    { url: "/old-product", status: 404, health: 0, issues: 1, crawl: "0.3s", size: "—", type: "HTML" },
    { url: "/legacy-page", status: 301, health: 0, issues: 0, crawl: "0.4s", size: "—", type: "Redirect" },
    { url: "/contact", status: 200, health: 94, issues: 0, crawl: "0.9s", size: "62 KB", type: "HTML" },
    { url: "/about", status: 200, health: 89, issues: 1, crawl: "1.1s", size: "84 KB", type: "HTML" },
    { url: "/docs", status: 200, health: 72, issues: 5, crawl: "2.6s", size: "240 KB", type: "HTML" },
  ];
  return (
    <section className="mt-6 space-y-4">
      <div className="grid gap-4 md:grid-cols-4">
        <MiniStat label="Total crawled" value="100" accent="info" />
        <MiniStat label="Healthy" value="10" accent="success" />
        <MiniStat label="Broken (4xx/5xx)" value="3" accent="destructive" />
        <MiniStat label="With issues" value="72" accent="warning" />
      </div>

      <div className="rounded-lg border border-border bg-card shadow-[var(--shadow-soft)]">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-5 py-4">
          <h2 className="text-[15px] font-semibold tracking-tight">Crawled pages</h2>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
              <input
                placeholder="Filter by URL..."
                className="h-8 w-64 rounded-md border border-border bg-background pl-8 pr-2 text-[12px] outline-none focus:border-ring"
              />
            </div>
            <Button variant="outline" size="sm" className="h-8 gap-1.5">
              <Download className="h-3.5 w-3.5" /> Export
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-[1fr_80px_100px_90px_90px_90px_100px] items-center gap-4 border-b border-border bg-muted/30 px-5 py-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
          <div>URL</div>
          <div className="text-right">Status</div>
          <div className="text-right">Health</div>
          <div className="text-right">Issues</div>
          <div className="text-right">Crawl</div>
          <div className="text-right">Size</div>
          <div className="text-right">Type</div>
        </div>

        <ul>
          {pages.map((p, idx) => (
            <li
              key={idx}
              className="grid grid-cols-[1fr_80px_100px_90px_90px_90px_100px] items-center gap-4 border-b border-border px-5 py-2.5 text-[13px] last:border-0 hover:bg-muted/40"
            >
              <button className="truncate text-left font-medium text-primary hover:underline">
                {p.url}
              </button>
              <div className="text-right">
                <span
                  className={cn(
                    "inline-flex h-5 items-center rounded px-1.5 text-[10px] font-semibold",
                    p.status === 200 && "bg-success/15 text-success",
                    p.status === 301 && "bg-info/15 text-info",
                    p.status === 404 && "bg-destructive/15 text-destructive",
                  )}
                >
                  {p.status}
                </span>
              </div>
              <div className="text-right">
                <div className="ml-auto flex w-24 items-center gap-1.5">
                  <Progress value={p.health} className="h-1.5 flex-1" />
                  <span className="w-8 text-right text-[11px] tabular-nums text-muted-foreground">
                    {p.health}
                  </span>
                </div>
              </div>
              <div className="text-right tabular-nums text-foreground/80">{p.issues}</div>
              <div className="text-right tabular-nums text-muted-foreground">{p.crawl}</div>
              <div className="text-right tabular-nums text-muted-foreground">{p.size}</div>
              <div className="text-right text-muted-foreground">{p.type}</div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ---------------- Statistics view ---------------- */

function StatisticsView() {
  const depth = [
    { level: "Click depth 0", count: 1, pct: 1 },
    { level: "Click depth 1", count: 24, pct: 24 },
    { level: "Click depth 2", count: 38, pct: 38 },
    { level: "Click depth 3", count: 22, pct: 22 },
    { level: "Click depth 4+", count: 15, pct: 15 },
  ];
  const status = [
    { code: "2xx Success", count: 82, color: "bg-success" },
    { code: "3xx Redirects", count: 3, color: "bg-info" },
    { code: "4xx Errors", count: 14, color: "bg-destructive" },
    { code: "5xx Errors", count: 1, color: "bg-destructive/70" },
  ];
  return (
    <section className="mt-6 grid gap-4 lg:grid-cols-2">
      <article className="rounded-lg border border-border bg-card p-5 shadow-[var(--shadow-soft)]">
        <CardTitle title="Pages by click depth" />
        <p className="mt-1 text-[12px] text-muted-foreground">
          How deep users need to click from the homepage to reach each page.
        </p>
        <ul className="mt-4 space-y-3">
          {depth.map((d) => (
            <li key={d.level} className="text-[13px]">
              <div className="flex items-center justify-between">
                <span className="text-foreground/80">{d.level}</span>
                <span className="font-semibold tabular-nums">{d.count}</span>
              </div>
              <Progress value={d.pct} className="mt-1 h-1.5" />
            </li>
          ))}
        </ul>
      </article>

      <article className="rounded-lg border border-border bg-card p-5 shadow-[var(--shadow-soft)]">
        <CardTitle title="HTTP status codes" />
        <p className="mt-1 text-[12px] text-muted-foreground">
          Distribution of HTTP responses across crawled pages.
        </p>
        <div className="mt-4 flex h-2 overflow-hidden rounded-full">
          {status.map((s) => (
            <div key={s.code} className={cn("h-full", s.color)} style={{ width: `${s.count}%` }} />
          ))}
        </div>
        <ul className="mt-4 space-y-2 text-[13px]">
          {status.map((s) => (
            <li key={s.code} className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <span className={cn("h-2 w-2 rounded-full", s.color)} />
                <span className="text-foreground/80">{s.code}</span>
              </span>
              <span className="font-semibold tabular-nums">{s.count}</span>
            </li>
          ))}
        </ul>
      </article>

      <article className="rounded-lg border border-border bg-card p-5 shadow-[var(--shadow-soft)] lg:col-span-2">
        <CardTitle title="Page load performance" />
        <div className="mt-4 grid gap-4 md:grid-cols-4">
          <MiniStat label="Avg. load time" value="1.6s" accent="info" />
          <MiniStat label="Fastest page" value="0.3s" accent="success" />
          <MiniStat label="Slowest page" value="4.8s" accent="destructive" />
          <MiniStat label="Avg. page size" value="142 KB" accent="warning" />
        </div>
      </article>
    </section>
  );
}

/* ---------------- Compare Crawls ---------------- */

function CompareCrawlsView() {
  const metrics = [
    { name: "Site Health", a: 78, b: 81, unit: "%", better: "up" },
    { name: "Total issues", a: 232, b: 208, unit: "", better: "down" },
    { name: "Errors", a: 48, b: 40, unit: "", better: "down" },
    { name: "Warnings", a: 724, b: 696, unit: "", better: "down" },
    { name: "Notices", a: 1300, b: 1400, unit: "", better: "down" },
    { name: "Crawled pages", a: 100, b: 100, unit: "", better: "same" },
    { name: "Avg. load time", a: 1.9, b: 1.6, unit: "s", better: "down" },
  ];
  return (
    <section className="mt-6 space-y-4">
      <div className="flex flex-wrap items-center gap-3 rounded-lg border border-border bg-card p-4 shadow-[var(--shadow-soft)]">
        <span className="text-[12px] text-muted-foreground">Compare:</span>
        <select className="h-8 rounded-md border border-border bg-background px-2 text-[13px] outline-none focus:border-ring">
          <option>Apr 20, 2026 (crawl #14)</option>
          <option>Apr 13, 2026 (crawl #13)</option>
        </select>
        <span className="text-muted-foreground">vs</span>
        <select className="h-8 rounded-md border border-border bg-background px-2 text-[13px] outline-none focus:border-ring">
          <option>Apr 27, 2026 (crawl #15)</option>
          <option>Apr 20, 2026 (crawl #14)</option>
        </select>
      </div>

      <div className="rounded-lg border border-border bg-card shadow-[var(--shadow-soft)]">
        <div className="grid grid-cols-[1.4fr_1fr_1fr_1fr_120px] items-center gap-4 border-b border-border bg-muted/30 px-5 py-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
          <div>Metric</div>
          <div className="text-right">Apr 20</div>
          <div className="text-right">Apr 27</div>
          <div className="text-right">Change</div>
          <div className="text-right">Status</div>
        </div>
        <ul>
          {metrics.map((m) => {
            const diff = +(m.b - m.a).toFixed(2);
            const improved =
              (m.better === "up" && diff > 0) || (m.better === "down" && diff < 0);
            const worse =
              (m.better === "up" && diff < 0) || (m.better === "down" && diff > 0);
            return (
              <li
                key={m.name}
                className="grid grid-cols-[1.4fr_1fr_1fr_1fr_120px] items-center gap-4 border-b border-border px-5 py-3 text-[13px] last:border-0 hover:bg-muted/40"
              >
                <span className="font-medium text-foreground">{m.name}</span>
                <span className="text-right tabular-nums text-muted-foreground">
                  {m.a}
                  {m.unit}
                </span>
                <span className="text-right tabular-nums font-semibold text-foreground">
                  {m.b}
                  {m.unit}
                </span>
                <span
                  className={cn(
                    "text-right tabular-nums font-medium",
                    improved && "text-success",
                    worse && "text-destructive",
                    !improved && !worse && "text-muted-foreground",
                  )}
                >
                  {diff > 0 ? `+${diff}` : diff}
                  {m.unit}
                </span>
                <div className="text-right">
                  {improved && (
                    <span className="inline-flex items-center gap-1 rounded bg-success/15 px-2 py-0.5 text-[11px] font-semibold text-success">
                      <CheckCircle2 className="h-3 w-3" /> Improved
                    </span>
                  )}
                  {worse && (
                    <span className="inline-flex items-center gap-1 rounded bg-destructive/15 px-2 py-0.5 text-[11px] font-semibold text-destructive">
                      <XCircle className="h-3 w-3" /> Worse
                    </span>
                  )}
                  {!improved && !worse && (
                    <span className="inline-flex items-center gap-1 rounded bg-muted px-2 py-0.5 text-[11px] font-semibold text-muted-foreground">
                      No change
                    </span>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

/* ---------------- Progress ---------------- */

function ProgressView() {
  const history = [
    { date: "Feb 1", health: 62 },
    { date: "Feb 15", health: 65 },
    { date: "Mar 1", health: 68 },
    { date: "Mar 15", health: 71 },
    { date: "Apr 1", health: 74 },
    { date: "Apr 13", health: 76 },
    { date: "Apr 20", health: 78 },
    { date: "Apr 27", health: 81 },
  ];
  const max = 100;
  const w = 800;
  const h = 220;
  const step = w / (history.length - 1);
  const path = history
    .map((p, i) => {
      const x = i * step;
      const y = h - (p.health / max) * (h - 20) - 10;
      return `${i === 0 ? "M" : "L"}${x},${y}`;
    })
    .join(" ");
  const area = `${path} L${w},${h} L0,${h} Z`;

  return (
    <section className="mt-6 space-y-4">
      <div className="grid gap-4 md:grid-cols-4">
        <MiniStat label="Current health" value="81%" accent="info" delta="+3" />
        <MiniStat label="30-day change" value="+7pt" accent="success" />
        <MiniStat label="Issues fixed" value="48" accent="success" />
        <MiniStat label="New issues" value="24" accent="destructive" />
      </div>

      <article className="rounded-lg border border-border bg-card p-5 shadow-[var(--shadow-soft)]">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle title="Site Health over time" />
            <p className="mt-1 text-[12px] text-muted-foreground">Tracked across last 8 crawls</p>
          </div>
          <select className="h-8 rounded-md border border-border bg-background px-2 text-[12px] outline-none focus:border-ring">
            <option>Last 90 days</option>
            <option>Last 30 days</option>
            <option>All time</option>
          </select>
        </div>
        <svg viewBox={`0 0 ${w} ${h}`} className="mt-4 h-56 w-full">
          {[0, 25, 50, 75, 100].map((g) => {
            const y = h - (g / max) * (h - 20) - 10;
            return (
              <g key={g}>
                <line x1="0" y1={y} x2={w} y2={y} stroke="var(--border)" strokeDasharray="3 3" />
                <text x="4" y={y - 2} fontSize="10" fill="var(--muted-foreground)">
                  {g}%
                </text>
              </g>
            );
          })}
          <path d={area} fill="oklch(from var(--info) l c h / 0.14)" />
          <path d={path} fill="none" stroke="var(--info)" strokeWidth="2.5" />
          {history.map((p, i) => {
            const x = i * step;
            const y = h - (p.health / max) * (h - 20) - 10;
            return (
              <g key={p.date}>
                <circle cx={x} cy={y} r="4" fill="var(--info)" />
                <circle cx={x} cy={y} r="2" fill="var(--background)" />
                <text
                  x={x}
                  y={h - 2}
                  fontSize="10"
                  textAnchor="middle"
                  fill="var(--muted-foreground)"
                >
                  {p.date}
                </text>
              </g>
            );
          })}
        </svg>
      </article>

      <article className="rounded-lg border border-border bg-card shadow-[var(--shadow-soft)]">
        <div className="border-b border-border px-5 py-4">
          <CardTitle title="Recent activity" />
        </div>
        <ul className="divide-y divide-border">
          {[
            { when: "Apr 27", type: "fixed", text: "Fixed 8 duplicate title issues" },
            { when: "Apr 24", type: "new", text: "3 new 4xx errors appeared" },
            { when: "Apr 20", type: "fixed", text: "Fixed 12 missing meta descriptions" },
            { when: "Apr 18", type: "fixed", text: "Improved page load on /blog" },
            { when: "Apr 13", type: "new", text: "2 new broken internal links" },
          ].map((a, i) => (
            <li key={i} className="flex items-center gap-3 px-5 py-3 text-[13px]">
              <Clock className="h-3.5 w-3.5 text-muted-foreground" />
              <span className="w-16 text-muted-foreground">{a.when}</span>
              <span
                className={cn(
                  "inline-flex h-5 items-center rounded px-1.5 text-[10px] font-semibold uppercase",
                  a.type === "fixed" && "bg-success/15 text-success",
                  a.type === "new" && "bg-destructive/15 text-destructive",
                )}
              >
                {a.type}
              </span>
              <span className="flex-1 text-foreground/85">{a.text}</span>
            </li>
          ))}
        </ul>
      </article>
    </section>
  );
}

/* ---------------- JS Impact ---------------- */

function JSImpactView() {
  const pages = [
    { url: "/", htmlLinks: 42, jsLinks: 58, delta: 16, risk: "medium" },
    { url: "/features", htmlLinks: 28, jsLinks: 71, delta: 43, risk: "high" },
    { url: "/pricing", htmlLinks: 24, jsLinks: 26, delta: 2, risk: "low" },
    { url: "/blog", htmlLinks: 62, jsLinks: 64, delta: 2, risk: "low" },
    { url: "/docs", htmlLinks: 14, jsLinks: 88, delta: 74, risk: "high" },
    { url: "/dashboard", htmlLinks: 3, jsLinks: 54, delta: 51, risk: "high" },
  ];
  return (
    <section className="mt-6 space-y-4">
      <div className="rounded-lg border border-info/30 bg-info/5 p-4 text-[13px]">
        <div className="flex items-start gap-3">
          <Code2 className="mt-0.5 h-4 w-4 shrink-0 text-info" />
          <div>
            <div className="font-semibold text-foreground">JS Impact Analysis</div>
            <p className="mt-1 text-muted-foreground">
              Compares content available to crawlers with JS rendering disabled vs. enabled.
              Large gaps mean AI and search bots may miss your content.
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <MiniStat label="Pages analyzed" value="100" accent="info" />
        <MiniStat label="High JS dependency" value="24" accent="destructive" />
        <MiniStat label="Content hidden w/o JS" value="38%" accent="warning" />
        <MiniStat label="Avg. link delta" value="+31" accent="warning" />
      </div>

      <div className="rounded-lg border border-border bg-card shadow-[var(--shadow-soft)]">
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <h2 className="text-[15px] font-semibold tracking-tight">JS rendering impact by page</h2>
          <Button variant="outline" size="sm" className="h-8 gap-1.5">
            <RefreshCw className="h-3.5 w-3.5" /> Re-render with JS
          </Button>
        </div>
        <div className="grid grid-cols-[1.5fr_1fr_1fr_100px_100px] items-center gap-4 border-b border-border bg-muted/30 px-5 py-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
          <div>URL</div>
          <div className="text-right">HTML-only links</div>
          <div className="text-right">Rendered links</div>
          <div className="text-right">Δ</div>
          <div className="text-right">Risk</div>
        </div>
        <ul>
          {pages.map((p) => (
            <li
              key={p.url}
              className="grid grid-cols-[1.5fr_1fr_1fr_100px_100px] items-center gap-4 border-b border-border px-5 py-3 text-[13px] last:border-0 hover:bg-muted/40"
            >
              <button className="truncate text-left font-medium text-primary hover:underline">
                {p.url}
              </button>
              <div className="text-right tabular-nums text-muted-foreground">{p.htmlLinks}</div>
              <div className="text-right tabular-nums font-semibold">{p.jsLinks}</div>
              <div
                className={cn(
                  "text-right tabular-nums font-semibold",
                  p.delta > 20 && "text-destructive",
                  p.delta > 5 && p.delta <= 20 && "text-warning",
                  p.delta <= 5 && "text-success",
                )}
              >
                +{p.delta}
              </div>
              <div className="text-right">
                <span
                  className={cn(
                    "inline-flex h-5 items-center rounded px-2 text-[10px] font-semibold uppercase",
                    p.risk === "high" && "bg-destructive/15 text-destructive",
                    p.risk === "medium" && "bg-warning/15 text-warning",
                    p.risk === "low" && "bg-success/15 text-success",
                  )}
                >
                  {p.risk}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ---------------- Shared bits ---------------- */

function MiniStat({
  label,
  value,
  accent,
  delta,
}: {
  label: string;
  value: string;
  accent: "info" | "success" | "warning" | "destructive";
  delta?: string;
}) {
  const textColor =
    accent === "info"
      ? "text-info"
      : accent === "success"
        ? "text-success"
        : accent === "warning"
          ? "text-warning"
          : "text-destructive";
  return (
    <div className="rounded-lg border border-border bg-card p-4 shadow-[var(--shadow-soft)]">
      <div className="text-[12px] text-muted-foreground">{label}</div>
      <div className="mt-1 flex items-baseline gap-2">
        <div className={cn("text-[24px] font-semibold tabular-nums", textColor)}>{value}</div>
        {delta && <div className="text-[12px] font-medium text-success">{delta}</div>}
      </div>
    </div>
  );
}
