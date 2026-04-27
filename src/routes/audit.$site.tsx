import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ExternalLink,
  Download,
  Link2,
  Share2,
  Monitor,
  Smartphone,
  Sparkles,
  ChevronRight,
  Filter,
  AlertTriangle,
  AlertCircle,
  CheckCircle2,
  Info,
  Lock,
} from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/audit/$site")({
  head: ({ params }) => ({
    meta: [
      { title: `Site Audit · ${params.site} — GEO & SEO Checker` },
      {
        name: "description",
        content: `Full SEO + AI Search audit report for ${params.site}. Site health, AI visibility, technical SEO, performance and security.`,
      },
    ],
  }),
  component: AuditPage,
});

function AuditPage() {
  const { site } = Route.useParams();
  return (
    <AppShell breadcrumbs={[{ label: "Site Audit", to: "/" }, { label: site }]}>
      <div className="mx-auto max-w-[1400px] px-4 py-6 md:px-6 lg:px-8">
        <AuditHeader site={site} />
        <AuditTabs />
        <ScoreRow />
        <StatsRow />
        <ThematicReports />
        <CoreVisibility />
      </div>
    </AppShell>
  );
}

/* --------------------------- Header --------------------------- */

function AuditHeader({ site }: { site: string }) {
  return (
    <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
          <Link2 className="h-4 w-4 text-muted-foreground" />
        </div>
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
            Site Audit
          </p>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-semibold tracking-tight">{site}</h1>
            <a
              href={`https://${site}`}
              target="_blank"
              rel="noreferrer"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
          <div className="mt-1 flex items-center gap-3 text-[12px] text-muted-foreground">
            <span className="flex items-center gap-1">
              <Monitor className="h-3 w-3" /> Desktop
            </span>
            <span className="opacity-50">·</span>
            <span>92 checks</span>
            <span className="opacity-50">·</span>
            <span>Last run 2 minutes ago</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" className="gap-1.5">
          <Download className="h-3.5 w-3.5" /> PDF
        </Button>
        <Button variant="outline" size="sm" className="gap-1.5">
          <Link2 className="h-3.5 w-3.5" /> Copy link
        </Button>
        <Button variant="outline" size="sm" className="gap-1.5">
          <Share2 className="h-3.5 w-3.5" /> Share
        </Button>
        <Button
          size="sm"
          className="gap-1.5 bg-gradient-to-r from-primary to-primary-glow text-primary-foreground shadow-[var(--shadow-glow)] hover:opacity-95"
        >
          <Sparkles className="h-3.5 w-3.5" /> AI Copilot
        </Button>
      </div>
    </div>
  );
}

/* --------------------------- Tabs --------------------------- */

function AuditTabs() {
  return (
    <div className="mb-6 border-b border-border">
      <nav className="flex flex-wrap items-center gap-1">
        {[
          { name: "Overview", active: true },
          { name: "Issues", count: 3 },
          { name: "Crawled Pages" },
          { name: "Statistics" },
          { name: "Compare Crawls" },
          { name: "Progress" },
          { name: "JS Impact" },
        ].map((t) => (
          <button
            key={t.name}
            className={cn(
              "relative flex items-center gap-1.5 px-3 py-2.5 text-[13px] font-medium transition-colors",
              t.active
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {t.name}
            {t.count !== undefined && (
              <span className="rounded-full bg-destructive/15 px-1.5 py-0.5 text-[10px] font-semibold text-destructive">
                {t.count}
              </span>
            )}
            {t.active && (
              <span className="absolute inset-x-2 -bottom-px h-[2px] rounded-full bg-primary" />
            )}
          </button>
        ))}
      </nav>
    </div>
  );
}

/* --------------------------- Score row --------------------------- */

function ScoreRow() {
  return (
    <div className="grid gap-4 lg:grid-cols-4">
      <ScoreGauge title="Site Health" score={88} subtitle="Top 10% sites: 92" cta="Open full report →" />
      <ScoreGauge
        title="AI Search Health"
        score={88}
        subtitle="Top 10% sites: 85"
        cta="10 passed · 3 warnings · 0 failed"
        accent="success"
      />
      <CrawledPagesCard />
      <BlockedFromAICard />
    </div>
  );
}

function ScoreGauge({
  title,
  score,
  subtitle,
  cta,
  accent = "primary",
}: {
  title: string;
  score: number;
  subtitle: string;
  cta: string;
  accent?: "primary" | "success";
}) {
  // Gauge: 180deg semicircle. radius=70, circumference of half = π*70 ≈ 219.9
  const radius = 70;
  const circ = Math.PI * radius;
  const dash = (score / 100) * circ;
  const stroke = accent === "primary" ? "var(--primary)" : "var(--success)";

  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-[var(--shadow-soft)]">
      <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
        {title}
      </p>
      <div className="mt-3 flex flex-col items-center">
        <div className="relative">
          <svg width="170" height="100" viewBox="0 0 170 100">
            <path
              d={`M 15 90 A ${radius} ${radius} 0 0 1 155 90`}
              fill="none"
              stroke="var(--muted)"
              strokeWidth="10"
              strokeLinecap="round"
            />
            <path
              d={`M 15 90 A ${radius} ${radius} 0 0 1 155 90`}
              fill="none"
              stroke={stroke}
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={`${dash} ${circ}`}
              style={{ transition: "stroke-dasharray 0.8s ease-out" }}
            />
          </svg>
          <div className="absolute inset-x-0 bottom-1.5 text-center">
            <div className="text-3xl font-semibold tabular-nums">{score}</div>
            <div className={cn("text-[11px] font-medium", accent === "primary" ? "text-primary" : "text-success")}>
              Good
            </div>
          </div>
        </div>
        <p className="mt-2 text-[11px] text-muted-foreground">{subtitle}</p>
        <button className="mt-2 text-[12px] font-medium text-primary hover:underline">{cta}</button>
      </div>
    </div>
  );
}

function CrawledPagesCard() {
  const rows = [
    { label: "Healthy", value: 0, color: "bg-success" },
    { label: "Have issues", value: 1, color: "bg-warning" },
    { label: "Broken", value: 0, color: "bg-destructive" },
    { label: "Redirects", value: 0, color: "bg-info" },
    { label: "Blocked", value: 0, color: "bg-muted-foreground" },
  ];
  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-[var(--shadow-soft)]">
      <div className="flex items-center justify-between">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
          Crawled Pages
        </p>
        <span className="text-[11px] text-muted-foreground">1 page</span>
      </div>
      <div className="mt-3 flex h-1.5 overflow-hidden rounded-full bg-muted">
        <div className="h-full w-full bg-warning" />
      </div>
      <ul className="mt-3 space-y-1.5">
        {rows.map((r) => (
          <li key={r.label} className="flex items-center justify-between text-[12px]">
            <span className="flex items-center gap-2">
              <span className={cn("h-2 w-2 rounded-full", r.color)} />
              <span className="text-muted-foreground">{r.label}</span>
            </span>
            <span className="font-medium tabular-nums">{r.value}</span>
          </li>
        ))}
      </ul>
      <button className="mt-3 text-[12px] font-medium text-primary hover:underline">
        View 21 issues →
      </button>
    </div>
  );
}

function BlockedFromAICard() {
  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-[var(--shadow-soft)]">
      <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
        Blocked from AI Search
      </p>
      <div className="mt-6 flex flex-col items-center justify-center text-center">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-success/15 text-success">
          <CheckCircle2 className="h-5 w-5" />
        </div>
        <p className="mt-3 text-[13px] leading-relaxed text-muted-foreground">
          No robots.txt detected — AI crawlers are allowed by default.
        </p>
      </div>
    </div>
  );
}

/* --------------------------- Stats row --------------------------- */

function StatsRow() {
  return (
    <div className="mt-4 grid gap-4 md:grid-cols-3">
      <StatCard
        tone="destructive"
        label="Errors"
        value={2}
        sub="Failed checks"
        icon={AlertCircle}
      />
      <StatCard
        tone="warning"
        label="Warnings"
        value={19}
        sub="Check warnings"
        icon={AlertTriangle}
      />
      <StatCard
        tone="success"
        label="Passed"
        value={71}
        sub="Automated checks"
        icon={CheckCircle2}
      />
    </div>
  );
}

function StatCard({
  tone,
  label,
  value,
  sub,
  icon: Icon,
}: {
  tone: "destructive" | "warning" | "success";
  label: string;
  value: number;
  sub: string;
  icon: React.ComponentType<{ className?: string }>;
}) {
  const map = {
    destructive: {
      bg: "bg-destructive/8 border-destructive/25",
      pill: "bg-destructive/15 text-destructive",
      num: "text-destructive",
    },
    warning: {
      bg: "bg-warning/8 border-warning/30",
      pill: "bg-warning/15 text-warning",
      num: "text-warning",
    },
    success: {
      bg: "bg-success/8 border-success/30",
      pill: "bg-success/15 text-success",
      num: "text-success",
    },
  }[tone];

  return (
    <div className={cn("relative overflow-hidden rounded-xl border p-5", map.bg)}>
      <div className="flex items-start justify-between">
        <div>
          <p className={cn("text-[10px] font-semibold uppercase tracking-wider", map.num)}>
            {label}
          </p>
          <p className={cn("mt-1.5 text-3xl font-semibold tabular-nums", map.num)}>{value}</p>
          <p className="mt-1 text-[12px] text-muted-foreground">{sub}</p>
        </div>
        <div className={cn("rounded-lg p-2", map.pill)}>
          <Icon className="h-4 w-4" />
        </div>
      </div>
    </div>
  );
}

/* --------------------------- Thematic --------------------------- */

function ThematicReports() {
  const reports = [
    { name: "Technical SEO", value: 92, status: "Healthy", tone: "success", icon: "🔍" },
    { name: "Performance", value: 100, status: "Healthy", tone: "success", icon: "⚡" },
    { name: "Lighthouse SEO", value: 95, status: "Healthy", tone: "success", icon: "💡" },
    { name: "Security", value: 78, status: "Healthy", tone: "warning", icon: "🛡️" },
    { name: "Mobile", value: 100, status: "Healthy", tone: "success", icon: "📱" },
    { name: "Advanced SEO", value: null, status: "Upgrade to unlock", tone: "locked", icon: "📊" },
    { name: "AI Visibility", value: null, status: "Upgrade to unlock", tone: "locked", icon: "✨" },
  ];

  return (
    <section className="mt-8">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-[15px] font-semibold tracking-tight">Thematic Reports</h2>
          <p className="text-[12px] text-muted-foreground">
            92 checks across all categories · 3 actionable issues listed below
          </p>
        </div>
        <span className="text-[11px] text-muted-foreground">7 categories</span>
      </div>
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {reports.map((r) => (
          <ThematicCard key={r.name} {...r} />
        ))}
      </div>
    </section>
  );
}

function ThematicCard({
  name,
  value,
  status,
  tone,
  icon,
}: {
  name: string;
  value: number | null;
  status: string;
  tone: string;
  icon: string;
}) {
  const locked = tone === "locked";
  const barColor =
    tone === "success" ? "bg-success" : tone === "warning" ? "bg-warning" : "bg-destructive";

  return (
    <div
      className={cn(
        "group rounded-xl border border-border bg-card p-4 shadow-[var(--shadow-soft)] transition-all hover:border-primary/40 hover:shadow-[var(--shadow-elevated)]",
        locked && "opacity-90",
      )}
    >
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2 text-[13px] font-semibold">
          <span className="text-base leading-none">{icon}</span>
          <span>{name}</span>
        </div>
        {locked ? (
          <Lock className="h-3.5 w-3.5 text-muted-foreground" />
        ) : (
          <span
            className={cn(
              "text-base font-semibold tabular-nums",
              tone === "success" ? "text-success" : "text-warning",
            )}
          >
            {value}%
          </span>
        )}
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-muted">
        {!locked ? (
          <div
            className={cn("h-full rounded-full", barColor)}
            style={{ width: `${value}%` }}
          />
        ) : (
          <div className="h-full w-1/4 rounded-full bg-muted-foreground/30" />
        )}
      </div>
      <p
        className={cn(
          "mt-2.5 text-[12px]",
          locked ? "text-muted-foreground" : "text-muted-foreground",
        )}
      >
        {status}
      </p>
    </div>
  );
}

/* --------------------------- Core visibility --------------------------- */

function CoreVisibility() {
  const issues = [
    {
      sev: "warning",
      title: "Robots.txt is missing",
      desc: "We recommend adding a robots.txt file to control crawling and surface your sitemap.",
    },
    {
      sev: "destructive",
      title: "Two pages return 5xx errors",
      desc: "Server errors are blocking indexing on /pricing and /contact. Investigate logs.",
    },
    {
      sev: "warning",
      title: "Largest Contentful Paint above 2.5s on mobile",
      desc: "Optimize the hero image and defer non-critical scripts to improve LCP.",
    },
  ];

  return (
    <section className="mt-8 grid gap-4 lg:grid-cols-[1.4fr_1fr]">
      <div className="rounded-xl border border-border bg-card p-5 shadow-[var(--shadow-soft)]">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-[15px] font-semibold tracking-tight">Core visibility &amp; SEO</h2>
          <Button variant="ghost" size="sm" className="gap-1.5 text-muted-foreground">
            <Filter className="h-3.5 w-3.5" /> Filter
          </Button>
        </div>
        <Tabs defaultValue="ai">
          <TabsList className="bg-muted/50">
            <TabsTrigger value="ai">AI Visibility</TabsTrigger>
            <TabsTrigger value="seo">Classic SEO</TabsTrigger>
            <TabsTrigger value="tech">Technical</TabsTrigger>
          </TabsList>
          <TabsContent value="ai" className="mt-4">
            <ScoreLineRow label="AI Visibility" score={88} />
            <ScoreLineRow label="LLM Citations" score={62} tone="warning" />
            <ScoreLineRow label="Schema for AI" score={94} tone="success" />
            <ScoreLineRow label="Answer extractability" score={71} tone="warning" />
          </TabsContent>
          <TabsContent value="seo" className="mt-4">
            <ScoreLineRow label="On-page SEO" score={92} />
            <ScoreLineRow label="Meta &amp; titles" score={88} />
            <ScoreLineRow label="Internal links" score={76} tone="warning" />
          </TabsContent>
          <TabsContent value="tech" className="mt-4">
            <ScoreLineRow label="Crawlability" score={95} tone="success" />
            <ScoreLineRow label="Indexability" score={89} />
            <ScoreLineRow label="HTTPS / Security" score={78} tone="warning" />
          </TabsContent>
        </Tabs>
      </div>

      <div className="rounded-xl border border-border bg-card p-5 shadow-[var(--shadow-soft)]">
        <div className="mb-3 flex items-start justify-between">
          <div>
            <h2 className="text-[15px] font-semibold tracking-tight">Priority issues</h2>
            <p className="text-[12px] text-muted-foreground">
              3 improvements to ship — upgrade for guided fixes on each.
            </p>
          </div>
          <Link
            to="/"
            className="text-[12px] font-medium text-primary hover:underline whitespace-nowrap"
          >
            View report →
          </Link>
        </div>
        <ul className="space-y-2">
          {issues.map((i) => (
            <li
              key={i.title}
              className={cn(
                "rounded-lg border p-3 transition-colors hover:bg-muted/40",
                i.sev === "destructive"
                  ? "border-destructive/30 bg-destructive/5"
                  : "border-warning/30 bg-warning/5",
              )}
            >
              <div className="flex items-start gap-2.5">
                <div
                  className={cn(
                    "mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md",
                    i.sev === "destructive"
                      ? "bg-destructive/15 text-destructive"
                      : "bg-warning/15 text-warning",
                  )}
                >
                  {i.sev === "destructive" ? (
                    <AlertCircle className="h-3.5 w-3.5" />
                  ) : (
                    <AlertTriangle className="h-3.5 w-3.5" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-medium">{i.title}</p>
                  <p className="mt-0.5 text-[12px] leading-relaxed text-muted-foreground">
                    {i.desc}
                  </p>
                </div>
                <ChevronRight className="mt-1 h-4 w-4 shrink-0 text-muted-foreground" />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function ScoreLineRow({
  label,
  score,
  tone = "primary",
}: {
  label: string;
  score: number;
  tone?: "primary" | "success" | "warning";
}) {
  const colorMap = {
    primary: "bg-gradient-to-r from-primary to-primary-glow",
    success: "bg-success",
    warning: "bg-warning",
  };
  return (
    <div className="flex items-center gap-3 border-b border-border py-2.5 last:border-0">
      <span className="w-44 text-[13px] text-foreground">{label}</span>
      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
        <div className={cn("h-full rounded-full", colorMap[tone])} style={{ width: `${score}%` }} />
      </div>
      <span className="w-10 text-right text-[13px] font-semibold tabular-nums">{score}</span>
    </div>
  );
}
