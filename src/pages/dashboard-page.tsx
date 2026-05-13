import { useMemo, useState } from "react"
import {
  Apple,
  BarChart3,
  CalendarCheck2,
  ChevronRight,
  Dumbbell,
  Flame,
  Home,
  Menu,
  Target,
  Trophy,
} from "lucide-react"
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis } from "recharts"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Skeleton } from "@/components/ui/skeleton"
import { ThemeToggle } from "@/components/theme-toggle"
import { weeklyActivity } from "@/data/mock"
import { cn } from "@/lib/utils"

const sidebarItems = [
  { icon: Home, label: "Overview" },
  { icon: Dumbbell, label: "Workouts" },
  { icon: Apple, label: "Nutrition" },
  { icon: BarChart3, label: "Analytics" },
]

const todayWorkout = [
  "Dynamic warmup - 8 min",
  "Barbell squat - 4 x 8",
  "Push press - 4 x 10",
  "Rower intervals - 12 min",
]

export function DashboardPage() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [loading] = useState(false)
  const [tasks, setTasks] = useState<boolean[]>([false, false, false, false])

  const completed = useMemo(() => tasks.filter(Boolean).length, [tasks])

  if (loading) {
    return (
      <div className="w-full px-4 py-8 md:px-6">
        <div className="grid gap-5 md:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-28" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-secondary/40">
      <div className="flex w-full">
        <aside className="sticky top-0 hidden h-screen w-72 border-r border-border bg-background px-4 py-6 lg:block">
          <div className="mb-10 flex items-center justify-between">
            <p className="text-xl font-bold">FitTrack</p>
            <ThemeToggle />
          </div>
          <nav className="space-y-2">
            {sidebarItems.map(({ icon: Icon, label }, index) => (
              <button
                type="button"
                key={label}
                className={cn(
                  "flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm transition",
                  index === 0 ? "bg-primary text-primary-foreground" : "hover:bg-secondary",
                )}
              >
                <Icon className="h-4 w-4" />
                {label}
              </button>
            ))}
          </nav>
        </aside>

        <div className="w-full p-4 md:p-6">
          <header className="mb-6 flex items-center justify-between rounded-2xl border bg-background p-4">
            <div className="flex items-center gap-3">
              <button className="lg:hidden" type="button" onClick={() => setMenuOpen((prev) => !prev)}>
                <Menu />
              </button>
              <Avatar>
                <AvatarFallback>AN</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm text-muted-foreground">Welcome back</p>
                <p className="font-semibold">Anant 👋</p>
              </div>
            </div>
            <ThemeToggle />
          </header>

          {menuOpen ? (
            <div className="mb-6 grid grid-cols-2 gap-2 lg:hidden">
              {sidebarItems.map(({ icon: Icon, label }) => (
                <Button key={label} variant="outline" className="justify-start gap-2">
                  <Icon className="h-4 w-4" /> {label}
                </Button>
              ))}
            </div>
          ) : null}

          <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {[
              { label: "Calories Burned", value: "2,860", icon: Flame, trend: "+12%" },
              { label: "Workouts This Week", value: "6", icon: Dumbbell, trend: "+2" },
              { label: "Streak Days", value: "24", icon: Trophy, trend: "+4" },
              { label: "Goal Progress", value: "78%", icon: Target, trend: "+8%" },
            ].map(({ label, value, icon: Icon, trend }) => (
              <Card key={label}>
                <CardContent className="space-y-3 p-5">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">{label}</p>
                    <Icon className="h-4 w-4 text-primary" />
                  </div>
                  <p className="text-3xl font-bold">{value}</p>
                  <Badge variant="secondary">{trend} vs last week</Badge>
                </CardContent>
              </Card>
            ))}
          </section>

          <section className="mt-6 grid gap-6 xl:grid-cols-3">
            <Card className="xl:col-span-2">
              <CardHeader>
                <CardTitle>Weekly activity</CardTitle>
                <CardDescription>Minutes trained per day</CardDescription>
              </CardHeader>
              <CardContent className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={weeklyActivity}>
                    <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <Tooltip />
                    <Bar dataKey="minutes" fill="hsl(var(--primary))" radius={[10, 10, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Today's workout</CardTitle>
                <CardDescription>
                  {completed}/{todayWorkout.length} completed
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {todayWorkout.length === 0 ? (
                  <div className="rounded-xl border border-dashed p-4 text-center text-sm text-muted-foreground">
                    No workout scheduled yet. Add one and stay on track.
                  </div>
                ) : (
                  todayWorkout.map((task, index) => (
                    <label key={task} className="flex cursor-pointer items-center gap-3 rounded-xl border p-3">
                      <Checkbox
                        checked={tasks[index]}
                        onCheckedChange={(checked) =>
                          setTasks((prev) => prev.map((item, i) => (i === index ? Boolean(checked) : item)))
                        }
                      />
                      <span className={cn("text-sm", tasks[index] ? "line-through text-muted-foreground" : "")}>{task}</span>
                    </label>
                  ))
                )}
              </CardContent>
            </Card>
          </section>

          <section className="mt-6 grid gap-3 sm:grid-cols-3">
            <Button className="justify-between">
              <span className="flex items-center gap-2">
                <Dumbbell className="h-4 w-4" />
                Start Workout
              </span>
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button variant="secondary" className="justify-between">
              <span className="flex items-center gap-2">
                <Apple className="h-4 w-4" />
                Log Meal
              </span>
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button variant="outline" className="justify-between">
              <span className="flex items-center gap-2">
                <CalendarCheck2 className="h-4 w-4" />
                View Progress
              </span>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </section>
        </div>
      </div>
    </div>
  )
}
