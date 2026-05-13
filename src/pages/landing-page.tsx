import { useEffect, useMemo, useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight, Check, Menu, PlayCircle, Star, X } from "lucide-react"
import { Link } from "react-router-dom"

import { ThemeToggle } from "@/components/theme-toggle"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { featureCards, pricingTiers, testimonials } from "@/data/mock"
import { cn } from "@/lib/utils"

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Pricing", href: "#pricing" },
]

export function LandingPage() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [testimonialIndex, setTestimonialIndex] = useState(0)

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    const id = window.setInterval(() => {
      setTestimonialIndex((prev) => (prev + 1) % testimonials.length)
    }, 4000)
    return () => window.clearInterval(id)
  }, [])

  const activeTestimonial = testimonials[testimonialIndex]
  const usersCount = useMemo(() => "1.2M+", [])

  return (
    <div className="relative overflow-x-clip">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_10%_10%,hsl(var(--primary)/0.18),transparent_42%),radial-gradient(circle_at_90%_20%,hsl(var(--accent)/0.2),transparent_40%)]" />
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-300",
          isScrolled ? "bg-background/80 shadow-sm backdrop-blur-xl" : "bg-transparent",
        )}
      >
        <div className="container flex h-16 items-center justify-between">
          <Link to="/" className="text-lg font-bold tracking-tight">
            FitTrack
          </Link>
          <nav className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="hidden items-center gap-3 md:flex">
            <ThemeToggle />
            <Button asChild variant="outline">
              <Link to="/onboarding">Sign In</Link>
            </Button>
            <Button asChild>
              <Link to="/onboarding">Get Started</Link>
            </Button>
          </div>
          <button
            type="button"
            className="md:hidden"
            aria-label="Open menu"
            onClick={() => setMenuOpen(true)}
          >
            <Menu />
          </button>
        </div>
      </header>

      {menuOpen ? (
        <div className="fixed inset-0 z-[60] bg-background/80 backdrop-blur-sm md:hidden">
          <div className="absolute right-0 top-0 h-full w-[82%] max-w-sm border-l border-border bg-background p-6">
            <div className="mb-10 flex items-center justify-between">
              <span className="text-lg font-semibold">Menu</span>
              <button type="button" aria-label="Close menu" onClick={() => setMenuOpen(false)}>
                <X />
              </button>
            </div>
            <div className="space-y-5">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="block text-lg font-medium"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
            </div>
            <div className="mt-10 grid gap-3">
              <Button asChild className="w-full">
                <Link to="/onboarding">Get Started Free</Link>
              </Button>
              <Button asChild variant="outline" className="w-full">
                <Link to="/dashboard">View Dashboard</Link>
              </Button>
            </div>
          </div>
        </div>
      ) : null}

      <main className="space-y-24 pb-20 pt-28 md:space-y-28">
        <section className="container">
          <div className="grid items-center gap-14 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-7"
            >
              <Badge className="rounded-full px-4 py-2 text-sm">Trusted by {usersCount} athletes & beginners</Badge>
              <h1 className="text-balance text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
                Build the strongest version of yourself with FitTrack.
              </h1>
              <p className="max-w-xl text-lg text-muted-foreground">
                Premium fitness and wellness experience with adaptive workouts, nutrition intelligence, and progress
                clarity designed for modern life.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <Button asChild size="lg">
                  <Link to="/onboarding" className="gap-2">
                    Get Started Free <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="gap-2">
                  <PlayCircle className="h-4 w-4" /> Watch Demo
                </Button>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                {[...Array(5)].map((_, index) => (
                  <Star key={index} className="h-4 w-4 fill-primary text-primary" />
                ))}
                Rated 4.9/5 by 12,000+ reviews
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="glass-card relative p-6"
            >
              <div className="absolute -left-7 top-9 hidden rounded-2xl border border-border/50 bg-background/80 p-4 shadow-xl md:block">
                <p className="text-xs text-muted-foreground">Workout Completion</p>
                <p className="mt-1 text-2xl font-bold">93%</p>
              </div>
              <div className="absolute -bottom-5 -right-5 hidden rounded-2xl border border-border/50 bg-background/80 p-4 shadow-xl md:block">
                <p className="text-xs text-muted-foreground">Streak</p>
                <p className="mt-1 text-2xl font-bold">24 Days</p>
              </div>
              <div className="space-y-4 rounded-2xl border border-white/20 bg-gradient-to-br from-primary/10 via-background to-accent/10 p-5">
                <div className="h-56 rounded-xl bg-[radial-gradient(circle_at_20%_20%,hsl(var(--primary)/0.4),transparent_30%),radial-gradient(circle_at_80%_30%,hsl(var(--accent)/0.35),transparent_30%),radial-gradient(circle_at_50%_80%,hsl(var(--primary)/0.2),transparent_40%)]" />
                <div className="grid grid-cols-3 gap-3">
                  <div className="rounded-xl bg-background/80 p-3 text-center">
                    <p className="text-xs text-muted-foreground">Calories</p>
                    <p className="text-lg font-bold">586</p>
                  </div>
                  <div className="rounded-xl bg-background/80 p-3 text-center">
                    <p className="text-xs text-muted-foreground">Workouts</p>
                    <p className="text-lg font-bold">6</p>
                  </div>
                  <div className="rounded-xl bg-background/80 p-3 text-center">
                    <p className="text-xs text-muted-foreground">Hydration</p>
                    <p className="text-lg font-bold">2.4L</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="container">
          <div className="rounded-3xl border border-border/60 bg-card/50 p-6 md:p-8">
            <p className="text-center text-sm text-muted-foreground">
              Trusted by global teams from
              <span className="mx-3 font-semibold text-foreground">Nike</span>
              <span className="mx-3 font-semibold text-foreground">Fitbit</span>
              <span className="mx-3 font-semibold text-foreground">WHOOP</span>
              <span className="mx-3 font-semibold text-foreground">Cult</span>
              <span className="mx-3 font-semibold text-foreground">Anytime Fitness</span>
            </p>
          </div>
        </section>

        <section id="features" className="container space-y-10">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold sm:text-4xl">Everything you need in one elegant platform</h2>
            <p className="mt-3 text-muted-foreground">
              FitTrack combines training, nutrition, and accountability into one premium workflow.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {featureCards.map(({ title, description, icon: Icon }, index) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
              >
                <Card className="h-full transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl">
                  <CardContent className="space-y-4 p-6">
                    <div className="inline-flex rounded-2xl bg-primary/10 p-3 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-lg font-semibold">{title}</h3>
                    <p className="text-sm text-muted-foreground">{description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        <section id="how-it-works" className="container space-y-10">
          <div className="mx-auto max-w-xl text-center">
            <h2 className="text-3xl font-bold sm:text-4xl">How it works</h2>
            <p className="mt-3 text-muted-foreground">Start your transformation in three smooth steps.</p>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {[
              { title: "Sign Up", desc: "Create your account in minutes.", num: "01" },
              { title: "Set Goals", desc: "Tell us what success means to you.", num: "02" },
              { title: "Track Progress", desc: "See real wins every single week.", num: "03" },
            ].map((step, idx) => (
              <div key={step.title} className="relative">
                <Card className="h-full border-dashed border-primary/30 bg-primary/5">
                  <CardContent className="space-y-3 p-6">
                    <p className="text-sm font-semibold text-primary">{step.num}</p>
                    <h3 className="text-xl font-semibold">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">{step.desc}</p>
                  </CardContent>
                </Card>
                {idx < 2 ? (
                  <div className="absolute right-0 top-1/2 hidden h-px w-8 -translate-y-1/2 bg-primary/50 md:block lg:w-12" />
                ) : null}
              </div>
            ))}
          </div>
        </section>

        <section id="testimonials" className="container space-y-10">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl font-bold sm:text-4xl">Loved by people who stay consistent</h2>
              <p className="mt-3 text-muted-foreground">Results powered by better design and smarter guidance.</p>
            </div>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((item, idx) => (
              <Card
                key={item.name}
                className={cn(
                  "transition-all",
                  idx === testimonialIndex ? "border-primary/60 shadow-glow" : "opacity-80",
                )}
              >
                <CardContent className="space-y-4 p-6">
                  <div className="flex items-center gap-1">
                    {[...Array(item.rating)].map((_, index) => (
                      <Star key={index} className="h-4 w-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">"{item.quote}"</p>
                  <div>
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-xs text-muted-foreground">{item.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <Card className="border-primary/40 bg-primary/5 md:hidden">
            <CardContent className="space-y-3 p-5">
              <p className="font-semibold">{activeTestimonial.name}</p>
              <p className="text-sm text-muted-foreground">{activeTestimonial.quote}</p>
            </CardContent>
          </Card>
        </section>

        <section id="pricing" className="container space-y-10">
          <div className="mx-auto max-w-xl text-center">
            <h2 className="text-3xl font-bold sm:text-4xl">Pricing that scales with your goals</h2>
            <p className="mt-3 text-muted-foreground">Simple plans. Cancel anytime. Upgrade whenever you are ready.</p>
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            {pricingTiers.map((tier) => (
              <Card key={tier.name} className={cn("relative", tier.popular ? "border-primary shadow-glow" : "")}>
                {tier.popular ? (
                  <Badge className="absolute right-5 top-5 bg-primary text-primary-foreground">Popular</Badge>
                ) : null}
                <CardContent className="space-y-5 p-7">
                  <div>
                    <h3 className="text-xl font-semibold">{tier.name}</h3>
                    <p className="text-sm text-muted-foreground">{tier.subtitle}</p>
                  </div>
                  <p className="text-4xl font-bold">
                    {tier.price}
                    <span className="text-sm font-medium text-muted-foreground"> /month</span>
                  </p>
                  <ul className="space-y-3">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm">
                        <Check className="h-4 w-4 text-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full" variant={tier.popular ? "default" : "outline"}>
                    {tier.cta}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="container">
          <div className="rounded-3xl border border-primary/30 bg-gradient-to-r from-primary/20 via-background to-accent/20 p-8 md:p-12">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold sm:text-4xl">Ready to transform your routine?</h2>
              <p className="mt-3 text-muted-foreground">Get personalized plans and start your first week free.</p>
              <div className="mx-auto mt-6 flex max-w-md flex-col gap-3 sm:flex-row">
                <Input placeholder="Enter your email" aria-label="Email address" />
                <Button className="sm:min-w-36">Get Started</Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border/60 py-10">
        <div className="container grid gap-6 md:grid-cols-3">
          <div>
            <p className="text-lg font-bold">FitTrack</p>
            <p className="mt-2 text-sm text-muted-foreground">Fitness & wellness, beautifully connected.</p>
          </div>
          <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
            <a href="#features" className="hover:text-foreground">
              Features
            </a>
            <a href="#pricing" className="hover:text-foreground">
              Pricing
            </a>
            <a href="#testimonials" className="hover:text-foreground">
              Testimonials
            </a>
            <a href="#" className="hover:text-foreground">
              Terms
            </a>
          </div>
          <div className="space-y-2 text-sm text-muted-foreground md:text-right">
            <p>Newsletter</p>
            <div className="flex gap-2 md:justify-end">
              <Input className="max-w-44" placeholder="Email" />
              <Button variant="secondary">Join</Button>
            </div>
            <p>© {new Date().getFullYear()} FitTrack. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
