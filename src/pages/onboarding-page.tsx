import { useMemo, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { CheckCircle2, ChevronLeft, ChevronRight, Sparkles, Upload, UserRound } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { useForm, useWatch } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { activityLevels, fitnessGoals } from "@/data/mock"
import { cn } from "@/lib/utils"

const schema = z
  .object({
    fullName: z.string().min(2, "Please enter your full name"),
    email: z.string().email("Please enter a valid email"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Use at least one uppercase letter")
      .regex(/[0-9]/, "Use at least one number"),
    confirmPassword: z.string(),
    dob: z.string().min(1, "Date of birth is required"),
    gender: z.enum(["male", "female", "non_binary"]),
    unit: z.enum(["kg", "lbs"]),
    height: z.number().min(120, "Height is too low").max(230, "Height is too high"),
    weight: z.number().min(30, "Weight is too low").max(250, "Weight is too high"),
    goals: z.array(z.string()).min(1, "Select at least one goal").max(3, "Choose up to 3 goals"),
    activityLevel: z.string().optional(),
    avatar: z.string().optional(),
    username: z.string().optional(),
    bio: z.string().optional(),
    notifications: z.object({
      reminders: z.boolean(),
      progress: z.boolean(),
      community: z.boolean(),
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

type OnboardingValues = z.infer<typeof schema>

const totalSteps = 5

const defaultValues: OnboardingValues = {
  fullName: "",
  email: "",
  password: "",
  confirmPassword: "",
  dob: "",
  gender: "male",
  unit: "kg",
  height: 170,
  weight: 68,
  goals: [],
  activityLevel: "",
  avatar: "",
  username: "",
  bio: "",
  notifications: {
    reminders: true,
    progress: true,
    community: false,
  },
}

export function OnboardingPage() {
  const [step, setStep] = useState(1)
  const [completed, setCompleted] = useState(false)
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    control,
    setValue,
    trigger,
    formState: { errors, isValid },
  } = useForm<OnboardingValues>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues,
  })

  const watchedValues = useWatch({ control, defaultValue: defaultValues })
  const values: OnboardingValues = {
    ...defaultValues,
    ...watchedValues,
    goals: watchedValues.goals ?? defaultValues.goals,
    notifications: {
      ...defaultValues.notifications,
      ...watchedValues.notifications,
    },
  }
  const progress = (step / totalSteps) * 100

  const passwordScore = useMemo(() => {
    let score = 0
    if (values.password.length >= 8) score += 34
    if (/[A-Z]/.test(values.password)) score += 33
    if (/[0-9]/.test(values.password)) score += 33
    return score
  }, [values.password])

  const validateStep = async () => {
    if (step === 1) {
      return trigger(["fullName", "email", "password", "confirmPassword"])
    }
    if (step === 2) {
      return trigger(["dob", "gender", "height", "weight"])
    }
    if (step === 3) {
      return trigger(["goals"])
    }
    return true
  }

  const nextStep = async () => {
    const canContinue = await validateStep()
    if (!canContinue) return
    setStep((prev) => Math.min(totalSteps, prev + 1))
  }

  const prevStep = () => setStep((prev) => Math.max(1, prev - 1))

  const skipStep = () => {
    if (step === 5) {
      onSubmit()
      return
    }
    if (step === 4) {
      setStep((prev) => Math.min(totalSteps, prev + 1))
    }
  }

  const onSubmit = () => {
    setCompleted(true)
    window.setTimeout(() => navigate("/dashboard"), 2500)
  }

  const toggleGoal = (goal: string) => {
    const exists = values.goals.includes(goal)
    if (exists) {
      setValue(
        "goals",
        values.goals.filter((g) => g !== goal),
        { shouldValidate: true },
      )
      return
    }
    if (values.goals.length < 3) {
      setValue("goals", [...values.goals, goal], { shouldValidate: true })
    }
  }

  const canContinue = () => {
    if (step === 1) {
      return Boolean(values.fullName && values.email && values.password && values.confirmPassword)
    }
    if (step === 2) {
      return Boolean(values.dob && values.gender && values.height && values.weight)
    }
    if (step === 3) {
      return values.goals.length > 0
    }
    return true
  }

  if (completed) {
    return (
      <div className="flex min-h-screen items-center justify-center p-4">
        <Card className="w-full max-w-xl border-primary/40 bg-primary/10 text-center">
          <CardContent className="space-y-6 p-10">
            <motion.div
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary/20"
            >
              <CheckCircle2 className="h-10 w-10 text-primary" />
            </motion.div>
            <h2 className="text-3xl font-bold">Welcome to FitTrack!</h2>
            <p className="text-muted-foreground">Your personalized dashboard is getting ready...</p>
            <div className="flex justify-center gap-2 text-primary">
              <Sparkles className="h-6 w-6" />
              <Sparkles className="h-8 w-8" />
              <Sparkles className="h-6 w-6" />
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_20%_20%,hsl(var(--primary)/0.2),transparent_30%),radial-gradient(circle_at_80%_15%,hsl(var(--accent)/0.2),transparent_30%)] px-4 py-6">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-5">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-lg font-bold">
            FitTrack
          </Link>
          <Badge variant="secondary">Step {step} of 5</Badge>
        </div>
        <div className="space-y-2">
          <Progress value={progress} />
          <p className="text-sm text-muted-foreground">Your profile powers smarter plans and recommendations.</p>
        </div>

        <Card className="glass-card border-border/60">
          <CardHeader>
            <CardTitle className="text-2xl">Create your account</CardTitle>
            <CardDescription>Beautiful onboarding, personalized in under 2 minutes.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ x: 30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -30, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-5"
                >
                  {step === 1 ? (
                    <>
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="fullName">Full name</Label>
                          <Input id="fullName" placeholder="Anant Sharma" {...register("fullName")} />
                          {errors.fullName ? <p className="text-sm text-destructive">{errors.fullName.message}</p> : null}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input id="email" type="email" placeholder="you@email.com" {...register("email")} />
                          {errors.email ? <p className="text-sm text-destructive">{errors.email.message}</p> : null}
                        </div>
                      </div>
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="password">Password</Label>
                          <Input id="password" type="password" {...register("password")} />
                          <div className="h-2 rounded-full bg-secondary">
                            <div
                              className={cn(
                                "h-2 rounded-full transition-all",
                                passwordScore < 40 ? "bg-destructive" : passwordScore < 70 ? "bg-yellow-500" : "bg-emerald-500",
                              )}
                              style={{ width: `${passwordScore}%` }}
                            />
                          </div>
                          {errors.password ? <p className="text-sm text-destructive">{errors.password.message}</p> : null}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="confirmPassword">Confirm password</Label>
                          <Input id="confirmPassword" type="password" {...register("confirmPassword")} />
                          {errors.confirmPassword ? (
                            <p className="text-sm text-destructive">{errors.confirmPassword.message}</p>
                          ) : null}
                        </div>
                      </div>
                      <Button type="button" variant="outline" className="w-full">
                        Continue with Google
                      </Button>
                    </>
                  ) : null}

                  {step === 2 ? (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="dob">Date of birth</Label>
                        <Input id="dob" type="date" {...register("dob")} />
                        {errors.dob ? <p className="text-sm text-destructive">{errors.dob.message}</p> : null}
                      </div>

                      <div className="space-y-2">
                        <Label>Gender</Label>
                        <div className="grid gap-2 sm:grid-cols-3">
                          {[
                            { value: "male", label: "Male" },
                            { value: "female", label: "Female" },
                            { value: "non_binary", label: "Non-binary" },
                          ].map((item) => (
                            <button
                              key={item.value}
                              type="button"
                              onClick={() => setValue("gender", item.value as OnboardingValues["gender"], { shouldValidate: true })}
                              className={cn(
                                "rounded-xl border p-3 text-sm transition",
                                values.gender === item.value ? "border-primary bg-primary/10" : "border-border hover:border-primary/40",
                              )}
                            >
                              {item.label}
                            </button>
                          ))}
                        </div>
                        {errors.gender ? <p className="text-sm text-destructive">{errors.gender.message}</p> : null}
                      </div>

                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <Label htmlFor="height">Height (cm)</Label>
                            <span className="text-sm text-muted-foreground">{values.height} cm</span>
                          </div>
                          <Input id="height" type="range" min={120} max={230} {...register("height", { valueAsNumber: true })} />
                          {errors.height ? <p className="text-sm text-destructive">{errors.height.message}</p> : null}
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <Label htmlFor="weight">Weight ({values.unit})</Label>
                            <div className="flex rounded-lg border">
                              <button
                                className={cn("px-3 py-1 text-xs", values.unit === "kg" ? "bg-secondary" : "")}
                                type="button"
                                onClick={() => setValue("unit", "kg", { shouldValidate: true })}
                              >
                                kg
                              </button>
                              <button
                                className={cn("px-3 py-1 text-xs", values.unit === "lbs" ? "bg-secondary" : "")}
                                type="button"
                                onClick={() => setValue("unit", "lbs", { shouldValidate: true })}
                              >
                                lbs
                              </button>
                            </div>
                          </div>
                          <Input id="weight" type="number" {...register("weight", { valueAsNumber: true })} />
                          {errors.weight ? <p className="text-sm text-destructive">{errors.weight.message}</p> : null}
                        </div>
                      </div>
                    </>
                  ) : null}

                  {step === 3 ? (
                    <>
                      <div className="space-y-2">
                        <Label>Select 1-3 fitness goals</Label>
                        <div className="grid gap-3 sm:grid-cols-2">
                          {fitnessGoals.map(({ value, label, icon: Icon }) => {
                            const selected = values.goals.includes(value)
                            return (
                              <button
                                key={value}
                                type="button"
                                onClick={() => toggleGoal(value)}
                                className={cn(
                                  "flex items-center justify-between rounded-2xl border p-4 text-left transition",
                                  selected ? "border-primary bg-primary/10" : "hover:border-primary/40",
                                )}
                              >
                                <span className="flex items-center gap-3">
                                  <Icon className="h-5 w-5 text-primary" />
                                  <span className="font-medium">{label}</span>
                                </span>
                                {selected ? <CheckCircle2 className="h-5 w-5 text-primary" /> : null}
                              </button>
                            )
                          })}
                        </div>
                        {errors.goals ? <p className="text-sm text-destructive">{errors.goals.message}</p> : null}
                      </div>
                    </>
                  ) : null}

                  {step === 4 ? (
                    <div className="space-y-3">
                      <Label>Choose your activity level</Label>
                      {activityLevels.map(({ value, title, description, icon: Icon }) => (
                        <button
                          key={value}
                          type="button"
                          onClick={() => setValue("activityLevel", value, { shouldValidate: true })}
                          className={cn(
                            "flex w-full items-start gap-3 rounded-xl border p-4 text-left transition",
                            values.activityLevel === value ? "border-primary bg-primary/10" : "hover:border-primary/40",
                          )}
                        >
                          <Icon className="mt-0.5 h-5 w-5 text-primary" />
                          <div>
                            <p className="font-medium">{title}</p>
                            <p className="text-sm text-muted-foreground">{description}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  ) : null}

                  {step === 5 ? (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="avatar">Profile avatar</Label>
                        <label
                          htmlFor="avatar"
                          className="flex cursor-pointer flex-col items-center gap-3 rounded-2xl border border-dashed border-border p-6 transition hover:border-primary/40"
                        >
                          {values.avatar ? (
                            <img src={values.avatar} alt="Avatar preview" className="h-20 w-20 rounded-full object-cover" />
                          ) : (
                            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-secondary">
                              <UserRound className="h-8 w-8 text-muted-foreground" />
                            </div>
                          )}
                          <div className="text-center text-sm text-muted-foreground">
                            <Upload className="mx-auto mb-1 h-4 w-4" />
                            Upload avatar
                          </div>
                        </label>
                        <input
                          id="avatar"
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(event) => {
                            const file = event.target.files?.[0]
                            if (!file) return
                            const reader = new FileReader()
                            reader.onload = () => setValue("avatar", reader.result as string)
                            reader.readAsDataURL(file)
                          }}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="username">Username</Label>
                        <Input id="username" placeholder="@anantfit" {...register("username")} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="bio">Short bio (optional)</Label>
                        <Textarea id="bio" placeholder="Fitness lover, 5am training club." {...register("bio")} />
                      </div>
                      <div className="space-y-4 rounded-2xl border p-4">
                        <p className="text-sm font-medium">Notification preferences</p>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="reminders">Workout reminders</Label>
                          <Switch
                            id="reminders"
                            checked={values.notifications.reminders}
                            onCheckedChange={(checked) =>
                              setValue("notifications.reminders", checked, { shouldValidate: true })
                            }
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="progress">Weekly progress reports</Label>
                          <Switch
                            id="progress"
                            checked={values.notifications.progress}
                            onCheckedChange={(checked) =>
                              setValue("notifications.progress", checked, { shouldValidate: true })
                            }
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="community">Community updates</Label>
                          <Switch
                            id="community"
                            checked={values.notifications.community}
                            onCheckedChange={(checked) =>
                              setValue("notifications.community", checked, { shouldValidate: true })
                            }
                          />
                        </div>
                      </div>
                    </div>
                  ) : null}
                </motion.div>
              </AnimatePresence>

              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border/70 pt-5">
                <div className="flex items-center gap-2">
                  <Button type="button" variant="outline" onClick={prevStep} disabled={step === 1}>
                    <ChevronLeft className="mr-1 h-4 w-4" />
                    Back
                  </Button>
                  {step === 4 || step === 5 ? (
                    <button type="button" onClick={skipStep} className="text-sm text-muted-foreground underline">
                      Skip for now
                    </button>
                  ) : null}
                </div>

                {step < 5 ? (
                  <Button type="button" onClick={nextStep} disabled={!canContinue()}>
                    Continue <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                ) : (
                  <Button type="submit" disabled={!isValid}>
                    Complete Setup
                  </Button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
