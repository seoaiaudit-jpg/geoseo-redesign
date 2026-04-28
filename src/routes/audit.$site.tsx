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

function AuditTabs() {
  const tabs = [
    { name: "Overview", active: true },
    { name: "Issues" },
    { name: "Crawled Pages" },
    { name: "Statistics" },
    { name: "Compare Crawls" },
    { name: "Progress" },
    { name: "JS Impact" },
  ];
  return (
    <div className="mt-5 flex items-center justify-between border-b border-border">
      <nav className="flex flex-wrap items-center gap-1">
        {tabs.map((t) => (
          <button
            key={t.name}
            className={cn(
              "relative px-3 py-3 text-[14px] font-medium transition-colors",
              t.active
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {t.name}
            {t.active && (
              <span className="absolute inset-x-3 -bottom-px h-[2px] rounded-full bg-primary" />
            )}
          </button>
        ))}
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
