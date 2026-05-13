import type { LucideIcon } from "lucide-react"
import {
  Activity,
  Dumbbell,
  Flame,
  HeartPulse,
  Leaf,
  Sparkles,
  StretchHorizontal,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react"

export const featureCards: { title: string; description: string; icon: LucideIcon }[] = [
  {
    title: "Workout Tracking",
    description: "Log every set with smart plans designed to keep your streak alive.",
    icon: Dumbbell,
  },
  {
    title: "Nutrition Plans",
    description: "Personalized macro guidance and daily meal ideas from your goals.",
    icon: Leaf,
  },
  {
    title: "Progress Analytics",
    description: "See trends, plateaus, and breakthrough moments with rich insights.",
    icon: TrendingUp,
  },
  {
    title: "Wellness Community",
    description: "Join accountability circles and celebrate milestones with your squad.",
    icon: Users,
  },
]

export const testimonials = [
  {
    name: "Ananya Kapoor",
    role: "Product Designer",
    quote:
      "FitTrack made consistency effortless. The onboarding feels premium and the dashboard keeps me focused every morning.",
    rating: 5,
  },
  {
    name: "Rahul Mehta",
    role: "Software Engineer",
    quote:
      "My streak went from 4 days to 43 days. The micro interactions and progress system are seriously addictive.",
    rating: 5,
  },
  {
    name: "Priya Sharma",
    role: "Marketing Lead",
    quote:
      "Nutrition and workouts finally feel connected. The app gives me clarity without overwhelming me.",
    rating: 5,
  },
]

export const pricingTiers = [
  {
    name: "Free",
    price: "$0",
    subtitle: "Get started with essentials",
    cta: "Start Free",
    features: ["Basic workout tracker", "Daily streak counter", "Limited analytics"],
    popular: false,
  },
  {
    name: "Pro",
    price: "$19",
    subtitle: "For ambitious routines",
    cta: "Get Pro",
    features: ["Advanced analytics", "Nutrition recommendations", "Goal automation", "Community challenges"],
    popular: true,
  },
  {
    name: "Elite",
    price: "$39",
    subtitle: "Coach-level performance",
    cta: "Go Elite",
    features: ["Everything in Pro", "Priority support", "Weekly AI coaching", "Custom plan generator"],
    popular: false,
  },
]

export const fitnessGoals = [
  { value: "lose_weight", label: "Lose Weight", icon: Flame },
  { value: "build_muscle", label: "Build Muscle", icon: Dumbbell },
  { value: "stay_active", label: "Stay Active", icon: Activity },
  { value: "improve_flexibility", label: "Improve Flexibility", icon: StretchHorizontal },
  { value: "eat_healthier", label: "Eat Healthier", icon: Leaf },
  { value: "reduce_stress", label: "Reduce Stress", icon: Sparkles },
]

export const activityLevels = [
  {
    value: "sedentary",
    title: "Sedentary",
    description: "Desk job with minimal movement.",
    icon: HeartPulse,
  },
  {
    value: "light",
    title: "Lightly Active",
    description: "1-2 workouts each week.",
    icon: Zap,
  },
  {
    value: "moderate",
    title: "Moderately Active",
    description: "3-4 workouts per week.",
    icon: Activity,
  },
  {
    value: "very_active",
    title: "Very Active",
    description: "5+ workouts per week.",
    icon: Flame,
  },
  {
    value: "athlete",
    title: "Athlete",
    description: "Performance focused training.",
    icon: TrendingUp,
  },
]

export const weeklyActivity = [
  { day: "Mon", minutes: 28 },
  { day: "Tue", minutes: 42 },
  { day: "Wed", minutes: 35 },
  { day: "Thu", minutes: 58 },
  { day: "Fri", minutes: 48 },
  { day: "Sat", minutes: 64 },
  { day: "Sun", minutes: 30 },
]
