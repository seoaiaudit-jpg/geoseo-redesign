import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BarChart3,
  Sparkles,
  TrendingUp,
  ShieldCheck,
  Zap,
  Globe,
  CheckCircle2,
  Quote,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/theme-toggle";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "GEO & SEO Checker — AI Visibility & SEO Audit Suite" },
      {
        name: "description",
        content:
          "Run a complete SEO + AI Search audit in seconds. Site health, GEO/AI citations, competitor compare, position tracking — one suite.",
      },
    ],
  }),
  component: LandingPage,
});

function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <Hero />
      <LogosStrip />
      <FeatureGrid />
      <ProductPreview />
      <TestimonialBand />
      <PricingTeaser />
      <SiteFooter />
    </div>
  );
}

/* ----------------------------- Header ----------------------------- */

function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-6 px-4 md:px-6">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground shadow-[var(--shadow-glow)]">
            <BarChart3 className="h-4 w-4" />
          </div>
          <span className="text-[15px] font-semibold tracking-tight">GEO &amp; SEO Checker</span>
        </Link>

        <nav className="ml-6 hidden items-center gap-1 md:flex">
          {[
            { label: "Tools", to: "/tools" },
            { label: "Pricing", to: "/pricing" },
            { label: "Docs", to: "/docs" },
            { label: "Blog", to: "/blog" },
          ].map((l) => (
            <a
              key={l.label}
              href={l.to}
              className="rounded-md px-3 py-2 text-[13px] font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <ThemeToggle className="h-9 w-9" />
          <Button variant="ghost" size="sm" className="hidden md:inline-flex">
            Log in
          </Button>
          <Button asChild size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
            <Link to="/audit/$site" params={{ site: "mriacrm.com" }}>
              Start free audit
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}

/* ------------------------------ Hero ------------------------------ */

function Hero() {
  return (
    <section
      className="relative overflow-hidden border-b border-border/60"
      style={{ backgroundImage: "var(--gradient-hero)" }}
    >
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-20 md:px-6 lg:grid-cols-[1.1fr_1fr] lg:py-28">
        <div className="flex flex-col justify-center">
          <Badge
            variant="outline"
            className="mb-5 w-fit gap-1.5 border-primary/30 bg-primary/5 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-primary"
          >
            <Sparkles className="h-3 w-3" /> New · AI Visibility scoring
          </Badge>
          <h1 className="text-balance text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl">
            The{" "}
            <span className="bg-gradient-to-br from-primary to-primary-glow bg-clip-text text-transparent">
              SEO &amp; AI Search
            </span>{" "}
            audit suite for the next era of search.
          </h1>
          <p className="mt-5 max-w-xl text-pretty text-[15px] leading-relaxed text-muted-foreground md:text-base">
            Audit any site in 60 seconds. Get an actionable SEO score, AI Search Health, citation
            tracking and prioritized fixes — all in one beautifully built workspace.
          </p>

          <form
            className="mt-8 flex w-full max-w-xl flex-col gap-2 rounded-xl border border-border bg-card p-2 shadow-[var(--shadow-elevated)] sm:flex-row"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="flex flex-1 items-center gap-2 px-3">
              <Globe className="h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Enter a domain (e.g. yoursite.com)"
                className="h-10 flex-1 bg-transparent text-[14px] outline-none placeholder:text-muted-foreground"
              />
            </div>
            <Button
              type="submit"
              className="h-10 gap-1.5 bg-primary px-5 text-primary-foreground hover:bg-primary/90"
            >
              Run audit <ArrowRight className="h-4 w-4" />
            </Button>
          </form>

          <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-[12px] text-muted-foreground">
            {["No card required", "92 SEO checks", "AI Search ready", "PDF export"].map((f) => (
              <li key={f} className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-success" />
                {f}
              </li>
            ))}
          </ul>
        </div>

        <HeroPreview />
      </div>
    </section>
  );
}

function HeroPreview() {
  return (
    <div className="relative">
      <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-primary/20 via-transparent to-primary/10 blur-2xl" />
      <div className="relative overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-elevated)]">
        <div className="flex items-center gap-1.5 border-b border-border bg-muted/40 px-3 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-destructive/60" />
          <span className="h-2.5 w-2.5 rounded-full bg-warning/60" />
          <span className="h-2.5 w-2.5 rounded-full bg-success/60" />
          <span className="ml-3 truncate text-[11px] text-muted-foreground">
            geoseochecker.com / audit / yoursite.com
          </span>
        </div>
        <div className="grid gap-3 p-4 md:grid-cols-2">
          <ScoreCard label="Site Health" score={88} accent="primary" />
          <ScoreCard label="AI Search Health" score={92} accent="success" />
          <MiniStat label="Errors" value="2" tone="destructive" />
          <MiniStat label="Warnings" value="19" tone="warning" />
          <div className="md:col-span-2 rounded-lg border border-border bg-background p-3">
            <div className="mb-2 flex items-center justify-between text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
              <span>Thematic reports</span>
              <span>7 categories</span>
            </div>
            <div className="space-y-2">
              {[
                { name: "Technical SEO", value: 92 },
                { name: "Performance", value: 100 },
                { name: "Lighthouse", value: 95 },
                { name: "Security", value: 78 },
              ].map((r) => (
                <div key={r.name} className="flex items-center gap-3 text-[12px]">
                  <span className="w-28 text-muted-foreground">{r.name}</span>
                  <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-primary to-primary-glow"
                      style={{ width: `${r.value}%` }}
                    />
                  </div>
                  <span className="w-9 text-right font-medium">{r.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ScoreCard({
  label,
  score,
  accent,
}: {
  label: string;
  score: number;
  accent: "primary" | "success";
}) {
  const color = accent === "primary" ? "text-primary" : "text-success";
  return (
    <div className="rounded-lg border border-border bg-background p-3">
      <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </p>
      <div className="mt-1 flex items-baseline gap-1.5">
        <span className={`text-3xl font-semibold tabular-nums ${color}`}>{score}</span>
        <span className="text-[11px] text-muted-foreground">Good</span>
      </div>
      <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-muted">
        <div
          className={`h-full rounded-full ${
            accent === "primary"
              ? "bg-gradient-to-r from-primary to-primary-glow"
              : "bg-gradient-to-r from-success to-success/70"
          }`}
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  );
}

function MiniStat({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone: "destructive" | "warning";
}) {
  const color =
    tone === "destructive"
      ? "text-destructive bg-destructive/10"
      : "text-warning bg-warning/10";
  return (
    <div className="flex items-center justify-between rounded-lg border border-border bg-background p-3">
      <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </span>
      <span className={`rounded-md px-2 py-0.5 text-sm font-semibold tabular-nums ${color}`}>
        {value}
      </span>
    </div>
  );
}

/* ---------------------------- Logos strip ---------------------------- */

function LogosStrip() {
  const items = ["Acme", "Northwind", "Globex", "Initech", "Umbrella", "Soylent", "Stark Ind."];
  return (
    <section className="border-b border-border/60 py-8">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <p className="text-center text-[11px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">
          Trusted by SEO teams worldwide
        </p>
        <div className="mt-5 flex flex-wrap items-center justify-center gap-x-10 gap-y-3">
          {items.map((i) => (
            <span
              key={i}
              className="text-sm font-semibold tracking-tight text-muted-foreground/60 grayscale"
            >
              {i}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------- Features ---------------------------- */

function FeatureGrid() {
  const features = [
    {
      icon: BarChart3,
      title: "92-point Site Audit",
      desc: "Technical SEO, Lighthouse, Mobile, Security and Advanced SEO checks in one report.",
    },
    {
      icon: Sparkles,
      title: "AI Search Health",
      desc: "Score how visible your site is to ChatGPT, Perplexity, Google AI Overviews and others.",
    },
    {
      icon: TrendingUp,
      title: "Position Tracking",
      desc: "Daily SERP tracking with share-of-voice across keywords and devices.",
    },
    {
      icon: Quote,
      title: "AI Citations",
      desc: "See which prompts surface your brand and which sources LLMs cite instead of you.",
    },
    {
      icon: ShieldCheck,
      title: "Compare Crawls",
      desc: "Diff two crawls to find regressions before they ship to production.",
    },
    {
      icon: Zap,
      title: "AI Copilot",
      desc: "Ask questions about any audit in plain English. Get fix-it scripts on demand.",
    },
  ];
  return (
    <section className="border-b border-border/60 py-20" style={{ backgroundImage: "var(--gradient-mesh)" }}>
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <Badge variant="outline" className="mb-4 border-primary/30 bg-primary/5 text-primary">
            Everything in one suite
          </Badge>
          <h2 className="text-balance text-3xl font-semibold tracking-tight md:text-4xl">
            Built for the way modern SEO works
          </h2>
          <p className="mt-3 text-[15px] text-muted-foreground">
            Classic SEO is no longer enough. We combine deep technical audits with AI Search
            visibility — so your site wins on Google and on every AI answer engine.
          </p>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div
              key={f.title}
              className="group relative rounded-xl border border-border bg-card p-5 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-[var(--shadow-elevated)]"
            >
              <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <f.icon className="h-4.5 w-4.5" />
              </div>
              <h3 className="text-[15px] font-semibold tracking-tight">{f.title}</h3>
              <p className="mt-1.5 text-[13px] leading-relaxed text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------- Product preview ------------------------ */

function ProductPreview() {
  return (
    <section className="border-b border-border/60 py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <Badge variant="outline" className="mb-4 border-success/40 bg-success/10 text-success">
              The workspace
            </Badge>
            <h2 className="text-balance text-3xl font-semibold tracking-tight md:text-4xl">
              A dashboard your team will actually open every morning
            </h2>
            <p className="mt-3 text-[15px] text-muted-foreground">
              A familiar Ahrefs-style sidebar, a fast command palette, and reports that load in
              under a second. Designed for daily use, not for screenshots.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                "Grouped tools with badges (Pro, Soon, New)",
                "Light and dark theme — toggle instantly",
                "Keyboard-first navigation (⌘K everywhere)",
                "Per-project workspaces and roles",
              ].map((b) => (
                <li key={b} className="flex items-start gap-2.5 text-[14px]">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex gap-3">
              <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Link to="/audit/$site" params={{ site: "mriacrm.com" }}>
                  Open live demo <ArrowRight className="ml-1.5 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline">Watch tour</Button>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-6 rounded-3xl bg-gradient-to-tr from-primary/15 to-success/10 blur-3xl" />
            <div className="relative overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-elevated)]">
              <div className="grid grid-cols-[160px_1fr] min-h-[360px]">
                <aside className="border-r border-sidebar-border bg-sidebar p-3 text-[11px]">
                  <div className="mb-3 flex items-center gap-2">
                    <div className="h-5 w-5 rounded-md bg-primary" />
                    <span className="font-semibold text-sidebar-foreground">SEO Checker</span>
                  </div>
                  {[
                    ["Workspace", ["Dashboard"]],
                    ["SEO Tools", ["Site Audit", "Position Tracking", "Bulk Audit"]],
                    ["AI Visibility", ["AI Analysis", "AI Citations"]],
                  ].map(([label, items]) => (
                    <div key={label as string} className="mb-3">
                      <p className="px-1 pb-1 text-[9px] font-semibold uppercase tracking-wider text-sidebar-foreground/40">
                        {label as string}
                      </p>
                      {(items as string[]).map((i, idx) => (
                        <div
                          key={i}
                          className={`flex items-center gap-1.5 rounded px-1.5 py-1 ${
                            idx === 0 && label === "SEO Tools"
                              ? "bg-sidebar-accent text-sidebar-foreground"
                              : "text-sidebar-foreground/70"
                          }`}
                        >
                          <span className="h-1 w-1 rounded-full bg-current opacity-60" />
                          <span>{i}</span>
                        </div>
                      ))}
                    </div>
                  ))}
                </aside>
                <div className="grid gap-2 p-3 text-[11px]">
                  <div className="flex items-center justify-between rounded-md border border-border bg-background p-2">
                    <span className="font-medium">Site Audit · yoursite.com</span>
                    <span className="rounded bg-success/15 px-1.5 py-0.5 font-semibold text-success">
                      88 Good
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <ScoreCard label="Site Health" score={88} accent="primary" />
                    <ScoreCard label="AI Search" score={92} accent="success" />
                  </div>
                  <div className="rounded-md border border-border bg-background p-2">
                    <div className="mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                      Issues
                    </div>
                    {["Missing alt text", "Slow LCP on mobile", "Robots.txt not detected"].map((i) => (
                      <div key={i} className="flex items-center justify-between border-t border-border py-1">
                        <span>{i}</span>
                        <ArrowRight className="h-3 w-3 text-muted-foreground" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* --------------------------- Testimonials --------------------------- */

function TestimonialBand() {
  return (
    <section className="border-b border-border/60 py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            {
              q: "We replaced two tools with GEO & SEO Checker. AI Visibility alone is worth the price.",
              a: "Maria K.",
              t: "Head of SEO, Mria CRM",
            },
            {
              q: "Best site audit UX I've used since Ahrefs. My team actually opens it daily.",
              a: "Anton S.",
              t: "Growth Lead",
            },
            {
              q: "The compare-crawls feature caught a regression on the day we launched a redesign.",
              a: "Vlad R.",
              t: "Tech SEO Consultant",
            },
          ].map((t) => (
            <figure
              key={t.a}
              className="rounded-xl border border-border bg-card p-5 shadow-[var(--shadow-soft)]"
            >
              <blockquote className="text-[14px] leading-relaxed">“{t.q}”</blockquote>
              <figcaption className="mt-4 flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary-glow text-[11px] font-semibold text-primary-foreground">
                  {t.a
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div className="text-[12px]">
                  <div className="font-semibold">{t.a}</div>
                  <div className="text-muted-foreground">{t.t}</div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------- Pricing teaser ------------------------- */

function PricingTeaser() {
  return (
    <section className="py-20" style={{ backgroundImage: "var(--gradient-hero)" }}>
      <div className="mx-auto max-w-3xl px-4 text-center md:px-6">
        <h2 className="text-balance text-3xl font-semibold tracking-tight md:text-4xl">
          Start free. Upgrade when you outgrow it.
        </h2>
        <p className="mt-3 text-muted-foreground">
          One free audit per day, forever. Pro plans unlock position tracking, AI citations and team
          workspaces.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Button
            size="lg"
            className="gap-1.5 bg-primary text-primary-foreground hover:bg-primary/90"
            asChild
          >
            <Link to="/audit/$site" params={{ site: "mriacrm.com" }}>
              Run free audit <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button size="lg" variant="outline">
            See pricing
          </Button>
        </div>
      </div>
    </section>
  );
}

function SiteFooter() {
  return (
    <footer className="border-t border-border bg-muted/30 py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 text-[13px] text-muted-foreground md:flex-row md:px-6">
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded bg-primary text-primary-foreground">
            <BarChart3 className="h-3 w-3" />
          </div>
          <span>© 2026 GEO &amp; SEO Checker. All rights reserved.</span>
        </div>
        <div className="flex gap-5">
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
          <a href="#">Status</a>
          <a href="#">Contact</a>
        </div>
      </div>
    </footer>
  );
}
