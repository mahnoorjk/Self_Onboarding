"use client"

import React, { useState, useEffect, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Calendar,
  CheckCircle,
  Circle,
  Clock,
  Target,
  Trophy,
  Star,
  PlayCircle,
  BookOpen,
  Settings,
  Zap,
  Award,
  TrendingUp,
  ChevronRight,
  Users,
  Lightbulb,
  Rocket,
  Database,
  Flame,
  Crown,
  Gift,
  Sparkles,
  ArrowUp,
  CalendarDays,
  MessageSquare,
  Phone,
  Lock,
  Unlock,
  Wrench,
  FileText,
  DollarSign,
  BarChart3,
  UserPlus,
  Package,
  Clipboard,
  PieChart,
  Building2,
  Building,
  Receipt,
  MapPin,
  Store,
} from "lucide-react"

interface OnboardingTask {
  id: string
  title: string
  description: string
  type: "wizard" | "tutorial" | "practice" | "milestone" | "bonus" | "video" | "manual"
  day: number
  week: number
  completed: boolean
  priority: "critical" | "high" | "medium" | "low"
  estimatedTime: string
  category: string
  points: number
  prerequisites?: string[]
  rewards?: string[]
  difficulty: "beginner" | "intermediate" | "advanced"
  leftPanelSection?: string // Which left panel section this task unlocks
  unlocks?: string[] // What sections this task unlocks
  realJobData?: {
    jobId?: string
    customerName?: string
    jobType?: string
    status?: string
    requiresWIP?: boolean
  }
}

// Define left panel sections that need to be unlocked
interface LeftPanelSection {
  id: string
  name: string
  icon: any
  unlocked: boolean
  requiredTasks: string[]
  description: string
  subsections: string[]
}

interface LearningPath {
  hasWIPJobs: boolean
  totalJobs: number
  pathType: "hybrid" | "standard" | "accelerated"
  estimatedCompletion: number // days
}

interface Achievement {
  id: string
  title: string
  description: string
  icon: any
  unlocked: boolean
  points: number
  unlockedDate?: string
  rarity: "common" | "rare" | "epic" | "legendary"
  category: string
}

interface DailyStreak {
  current: number
  longest: number
  lastActiveDay: number
}

interface WeeklyGoal {
  week: number
  title: string
  description: string
  targetTasks: number
  completedTasks: number
  bonusPoints: number
  completed: boolean
}

interface OnboardingCallSchedule {
  selectedDate: string
  selectedTime: string
  rescheduleRequest: boolean
  rescheduleComment: string
  isScheduled: boolean
}

interface ThirtyDayOnboardingSectionProps {
  isLoggingJobCompleted?: boolean
  isCreatingCustomerCompleted?: boolean
  isInitialOnboardingCompleted?: boolean
  workInProgressData?: {
    hasWIPJobs: boolean
    totalJobs: number
    counts?: {
      inProgress: number
      scheduled: number
      onHold: number
      awaitingParts: number
    }
  }
}

const onboardingTasks: OnboardingTask[] = [
  // Week 1 (Days 1-7) - Foundation & Setup
  {
    id: "1",
    title: "Welcome & Account Setup",
    description: "Complete your profile and initial account configuration",
    type: "wizard",
    day: 1,
    week: 1,
    completed: false,
    priority: "critical",
    estimatedTime: "10 min",
    category: "Setup & Learning",
    points: 150,
    rewards: ["Profile Badge", "Welcome Bonus"],
    difficulty: "beginner",
  },
  {
    id: "2",
    title: "Platform Overview Tutorial",
    description: "Interactive walkthrough of Joblogic's main features",
    type: "tutorial",
    day: 1,
    week: 1,
    completed: false,
    priority: "critical",
    estimatedTime: "15 min",
    category: "Setup & Learning",
    points: 100,
    prerequisites: ["1"],
    difficulty: "beginner",
  },
  {
    id: "3",
    title: "Company Profile Creation",
    description: "Set up your company details, logo, and branding",
    type: "wizard",
    day: 2,
    week: 1,
    completed: false,
    priority: "high",
    estimatedTime: "20 min",
    category: "Setup & Learning",
    points: 200,
    rewards: ["Company Badge"],
    difficulty: "beginner",
  },
  {
    id: "4",
    title: "Learn Basic Navigation",
    description: "Learn to efficiently navigate through all sections",
    type: "tutorial",
    day: 2,
    week: 1,
    completed: false,
    priority: "medium",
    estimatedTime: "12 min",
    category: "Setup & Learning",
    points: 75,
    difficulty: "beginner",
  },
  {
    id: "5",
    title: "Business Information Setup",
    description: "Configure work types, services, and operational details",
    type: "wizard",
    day: 3,
    week: 1,
    completed: false,
    priority: "high",
    estimatedTime: "25 min",
    category: "Setup & Learning",
    points: 250,
    prerequisites: ["3"],
    difficulty: "intermediate",
  },
  {
    id: "6",
    title: "Industry Configuration",
    description: "Customize settings specific to your industry",
    type: "wizard",
    day: 4,
    week: 1,
    completed: false,
    priority: "high",
    estimatedTime: "30 min",
    category: "Setup & Learning",
    points: 300,
    prerequisites: ["5"],
    rewards: ["Industry Expert Badge"],
    difficulty: "intermediate",
  },
  {
    id: "7",
    title: "First Customer Creation",
    description: "Add your first customer with complete details",
    type: "practice",
    day: 5,
    week: 1,
    completed: false,
    priority: "high",
    estimatedTime: "15 min",
    category: "Operations",
    points: 150,
    rewards: ["Customer Champion Badge"],
    difficulty: "beginner",
  },
  {
    id: "8",
    title: "Team & Permissions Setup",
    description: "Configure user roles and access permissions",
    type: "wizard",
    day: 6,
    week: 1,
    completed: false,
    priority: "medium",
    estimatedTime: "20 min",
    category: "Operations",
    points: 200,
    difficulty: "intermediate",
  },
  {
    id: "9",
    title: "Week 1 Foundation Milestone",
    description: "Complete all foundation setup tasks",
    type: "milestone",
    day: 7,
    week: 1,
    completed: false,
    priority: "critical",
    estimatedTime: "Review",
    category: "Milestones",
    points: 500,
    prerequisites: ["1", "3", "5", "6"],
    rewards: ["Foundation Master Badge", "Week 1 Champion"],
    difficulty: "beginner",
  },

  // Week 2 (Days 8-14) - Core Operations
  {
    id: "10",
    title: "Data Import Preparation",
    description: "Learn about data formats and import requirements",
    type: "tutorial",
    day: 8,
    week: 2,
    completed: false,
    priority: "high",
    estimatedTime: "18 min",
    category: "Setup & Learning",
    points: 125,
    difficulty: "intermediate",
  },
  {
    id: "11",
    title: "Customer Data Import",
    description: "Import your existing customer database",
    type: "wizard",
    day: 9,
    week: 2,
    completed: false,
    priority: "high",
    estimatedTime: "35 min",
    category: "Operations",
    points: 300,
    prerequisites: ["10"],
    rewards: ["Data Master Badge"],
    difficulty: "intermediate",
  },
  {
    id: "12",
    title: "Create Your First Job",
    description: "Create your first complete job with all details",
    type: "practice",
    day: 10,
    week: 2,
    completed: false,
    priority: "critical",
    estimatedTime: "25 min",
    category: "Operations",
    points: 200,
    prerequisites: ["7"],
    rewards: ["Job Creator Badge"],
    difficulty: "intermediate",
  },
  {
    id: "13",
    title: "Advanced Job Management",
    description: "Learn scheduling, tracking, and job lifecycle management",
    type: "tutorial",
    day: 11,
    week: 2,
    completed: false,
    priority: "high",
    estimatedTime: "22 min",
    category: "Setup & Learning",
    points: 150,
    prerequisites: ["12"],
    difficulty: "intermediate",
  },
  {
    id: "14",
    title: "Integration Setup",
    description: "Connect accounting software and third-party tools",
    type: "wizard",
    day: 12,
    week: 2,
    completed: false,
    priority: "medium",
    estimatedTime: "40 min",
    category: "Growth & Automation",
    points: 250,
    rewards: ["Integration Expert Badge"],
    difficulty: "advanced",
  },
  {
    id: "15",
    title: "Template Customization",
    description: "Customize invoices, quotes, and communication templates",
    type: "practice",
    day: 13,
    week: 2,
    completed: false,
    priority: "medium",
    estimatedTime: "30 min",
    category: "Growth & Automation",
    points: 175,
    difficulty: "intermediate",
  },
  {
    id: "16",
    title: "Week 2 Operations Milestone",
    description: "Master core operational features",
    type: "milestone",
    day: 14,
    week: 2,
    completed: false,
    priority: "critical",
    estimatedTime: "Review",
    category: "Milestones",
    points: 600,
    prerequisites: ["11", "12", "13"],
    rewards: ["Operations Master Badge", "Week 2 Champion"],
    difficulty: "intermediate",
  },

  // Week 3 (Days 15-21) - Advanced Features & Automation
  {
    id: "17",
    title: "Workflow Automation Setup",
    description: "Configure automated workflows and notifications",
    type: "wizard",
    day: 15,
    week: 3,
    completed: false,
    priority: "high",
    estimatedTime: "45 min",
    category: "Growth & Automation",
    points: 350,
    prerequisites: ["16"],
    rewards: ["Automation Wizard Badge"],
    difficulty: "advanced",
  },
  {
    id: "18",
    title: "Advanced Reporting Tutorial",
    description: "Master custom reports and analytics dashboards",
    type: "tutorial",
    day: 16,
    week: 3,
    completed: false,
    priority: "high",
    estimatedTime: "25 min",
    category: "Growth & Automation",
    points: 200,
    difficulty: "advanced",
  },
  {
    id: "19",
    title: "Custom Dashboard Creation",
    description: "Build personalized dashboards for your business metrics",
    type: "practice",
    day: 17,
    week: 3,
    completed: false,
    priority: "medium",
    estimatedTime: "35 min",
    category: "Growth & Automation",
    points: 250,
    prerequisites: ["18"],
    rewards: ["Dashboard Designer Badge"],
    difficulty: "advanced",
  },
  {
    id: "20",
    title: "Mobile App Configuration",
    description: "Set up and optimize mobile applications for field work",
    type: "practice",
    day: 18,
    week: 3,
    completed: false,
    priority: "medium",
    estimatedTime: "20 min",
    category: "Operations",
    points: 150,
    rewards: ["Mobile Master Badge"],
    difficulty: "intermediate",
  },
  {
    id: "21",
    title: "Advanced Customization Workshop",
    description: "Deep dive into custom fields, forms, and workflows",
    type: "wizard",
    day: 19,
    week: 3,
    completed: false,
    priority: "medium",
    estimatedTime: "50 min",
    category: "Growth & Automation",
    points: 300,
    prerequisites: ["17"],
    difficulty: "advanced",
  },
  {
    id: "22",
    title: "Connect with Other Systems",
    description: "Advanced integration techniques and API usage",
    type: "tutorial",
    day: 20,
    week: 3,
    completed: false,
    priority: "low",
    estimatedTime: "30 min",
    category: "Growth & Automation",
    points: 200,
    prerequisites: ["14"],
    difficulty: "advanced",
  },
  {
    id: "23",
    title: "Week 3 Advanced Features Milestone",
    description: "Master advanced automation and customization",
    type: "milestone",
    day: 21,
    week: 3,
    completed: false,
    priority: "critical",
    estimatedTime: "Review",
    category: "Milestones",
    points: 750,
    prerequisites: ["17", "19", "21"],
    rewards: ["Advanced User Badge", "Week 3 Champion"],
    difficulty: "advanced",
  },

  // Week 4 (Days 22-30) - Optimization & Mastery
  {
    id: "24",
    title: "Performance Analytics Deep Dive",
    description: "Analyze business performance and identify optimization opportunities",
    type: "practice",
    day: 22,
    week: 4,
    completed: false,
    priority: "high",
    estimatedTime: "40 min",
    category: "Growth & Automation",
    points: 300,
    prerequisites: ["19"],
    rewards: ["Analytics Expert Badge"],
    difficulty: "advanced",
  },
  {
    id: "25",
    title: "Optimization Strategies Workshop",
    description: "Learn advanced optimization techniques for maximum efficiency",
    type: "tutorial",
    day: 24,
    week: 4,
    completed: false,
    priority: "medium",
    estimatedTime: "25 min",
    category: "Growth & Automation",
    points: 200,
    difficulty: "advanced",
  },
  {
    id: "26",
    title: "Team Training & Onboarding",
    description: "Train team members and create onboarding processes",
    type: "practice",
    day: 26,
    week: 4,
    completed: false,
    priority: "medium",
    estimatedTime: "60 min",
    category: "Operations",
    points: 350,
    rewards: ["Team Leader Badge"],
    difficulty: "intermediate",
  },
  {
    id: "27",
    title: "Understand Your Business Reports",
    description: "Create complex multi-dimensional reports and forecasts",
    type: "practice",
    day: 27,
    week: 4,
    completed: false,
    priority: "medium",
    estimatedTime: "45 min",
    category: "Growth & Automation",
    points: 275,
    prerequisites: ["24"],
    difficulty: "advanced",
  },
  {
    id: "28",
    title: "System Optimization & Fine-tuning",
    description: "Final system optimization and performance tuning",
    type: "wizard",
    day: 29,
    week: 4,
    completed: false,
    priority: "high",
    estimatedTime: "50 min",
    category: "Growth & Automation",
    points: 400,
    prerequisites: ["25"],
    rewards: ["Optimization Master Badge"],
    difficulty: "advanced",
  },
  {
    id: "29",
    title: "30-Day Journey Complete! 🎉",
    description: "Congratulations! You're now ready to manage your business efficiently!",
    type: "milestone",
    day: 30,
    week: 4,
    completed: false,
    priority: "critical",
    estimatedTime: "Celebration",
    category: "Milestones",
    points: 1000,
    prerequisites: ["23", "28"],
    rewards: ["Joblogic Master Badge", "30-Day Champion", "Exclusive Access"],
    difficulty: "advanced",
  },

  // Bonus Tasks (Available throughout)
  {
    id: "bonus1",
    title: "Community Engagement",
    description: "Join the Joblogic community and share your experience",
    type: "bonus",
    day: 7,
    week: 1,
    completed: false,
    priority: "low",
    estimatedTime: "15 min",
    category: "Growth & Automation",
    points: 100,
    rewards: ["Community Member Badge"],
    difficulty: "beginner",
  },
  {
    id: "bonus2",
    title: "Feature Feedback Champion",
    description: "Provide detailed feedback on 5 different features",
    type: "bonus",
    day: 14,
    week: 2,
    completed: false,
    priority: "low",
    estimatedTime: "30 min",
    category: "Growth & Automation",
    points: 200,
    rewards: ["Feedback Champion Badge"],
    difficulty: "beginner",
  },
  {
    id: "bonus3",
    title: "Power User Challenge",
    description: "Complete 10 advanced tasks in a single day",
    type: "bonus",
    day: 21,
    week: 3,
    completed: false,
    priority: "low",
    estimatedTime: "Variable",
    category: "Milestones",
    points: 500,
    rewards: ["Power User Badge", "Speed Demon"],
    difficulty: "advanced",
  },
]

const achievements: Achievement[] = [
  {
    id: "first_steps",
    title: "First Steps",
    description: "Complete your very first onboarding task",
    icon: Star,
    unlocked: false,
    points: 50,
    rarity: "common",
    category: "Setup & Learning",
  },
  {
    id: "quick_learner",
    title: "Quick Learner",
    description: "Complete 3 tasks in your first day",
    icon: Lightbulb,
    unlocked: false,
    points: 100,
    rarity: "common",
    category: "Setup & Learning",
  },
  {
    id: "week_warrior",
    title: "Week Warrior",
    description: "Complete all critical tasks in Week 1",
    icon: Trophy,
    unlocked: false,
    points: 300,
    rarity: "rare",
    category: "Milestones",
  },
  {
    id: "streak_master",
    title: "Streak Master",
    description: "Maintain a 7-day completion streak",
    icon: Flame,
    unlocked: false,
    points: 250,
    rarity: "rare",
    category: "Milestones",
  },
  {
    id: "data_master",
    title: "Data Master",
    description: "Successfully import and organize all your data",
    icon: Database,
    unlocked: false,
    points: 200,
    rarity: "rare",
    category: "Operations",
  },
  {
    id: "automation_expert",
    title: "Automation Expert",
    description: "Set up 5 automated workflows",
    icon: Zap,
    unlocked: false,
    points: 400,
    rarity: "epic",
    category: "Growth & Automation",
  },
  {
    id: "perfectionist",
    title: "Perfectionist",
    description: "Complete every single task with 100% accuracy",
    icon: Crown,
    unlocked: false,
    points: 500,
    rarity: "epic",
    category: "Milestones",
  },
  {
    id: "speed_demon",
    title: "Speed Demon",
    description: "Complete 5 tasks in under 2 hours",
    icon: Rocket,
    unlocked: false,
    points: 300,
    rarity: "rare",
    category: "Milestones",
  },
  {
    id: "mentor",
    title: "Mentor",
    description: "Help train 3 team members successfully",
    icon: Users,
    unlocked: false,
    points: 350,
    rarity: "epic",
    category: "Operations",
  },
  {
    id: "innovator",
    title: "Innovator",
    description: "Create 3 custom workflows or templates",
    icon: Sparkles,
    unlocked: false,
    points: 400,
    rarity: "epic",
    category: "Growth & Automation",
  },
  {
    id: "onboarding_legend",
    title: "Onboarding Legend",
    description: "Complete the entire 30-day journey with excellence",
    icon: Award,
    unlocked: false,
    points: 1500,
    rarity: "legendary",
    category: "Milestones",
  },
]

const weeklyGoals: WeeklyGoal[] = [
  {
    week: 1,
    title: "Get Started",
    description: "Set up your business basics and add your first data",
    targetTasks: 6,
    completedTasks: 0,
    bonusPoints: 200,
    completed: false,
  },
  {
    week: 2,
    title: "Daily Operations",
    description: "Learn to manage jobs, customers, and team members",
    targetTasks: 5,
    completedTasks: 0,
    bonusPoints: 300,
    completed: false,
  },
  {
    week: 3,
    title: "Going Digital",
    description: "Use mobile features and automate routine tasks",
    targetTasks: 4,
    completedTasks: 0,
    bonusPoints: 400,
    completed: false,
  },
  {
    week: 4,
    title: "Business Growth",
    description: "Track performance and plan for business expansion",
    targetTasks: 3,
    completedTasks: 0,
    bonusPoints: 500,
    completed: false,
  },
]

// Generate available time slots for the next 7 days
const generateTimeSlots = () => {
  const slots = []
  const today = new Date()

  for (let i = 1; i <= 7; i++) {
    const date = new Date(today)
    date.setDate(today.getDate() + i)

    // Skip weekends for business calls
    if (date.getDay() !== 0 && date.getDay() !== 6) {
      const dateStr = date.toISOString().split("T")[0]
      const dayName = date.toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" })

      slots.push({
        date: dateStr,
        dayName,
        times: ["09:00 AM", "10:00 AM", "11:00 AM", "02:00 PM", "03:00 PM", "04:00 PM"],
      })
    }
  }

  return slots
}

export function ThirtyDayOnboardingSection({ 
  isLoggingJobCompleted = false, 
  isCreatingCustomerCompleted = false,
  isInitialOnboardingCompleted = false,
  workInProgressData
}: ThirtyDayOnboardingSectionProps = {}) {
  // New state for left panel sections and learning path
  const [unlockedSections, setUnlockedSections] = useState<string[]>(["dashboard"]) // Dashboard starts unlocked
  const [learningPath, setLearningPath] = useState<LearningPath | null>(null)
  
  const [tasks, setTasks] = useState<OnboardingTask[]>(onboardingTasks)
  const [userAchievements, setUserAchievements] = useState<Achievement[]>(achievements)
  const [currentDay, setCurrentDay] = useState(1)
  const [totalPoints, setTotalPoints] = useState(0)
  const [showPopup, setShowPopup] = useState(false)
  const [popupContent, setPopupContent] = useState<any>(null)
  const [dailyStreak, setDailyStreak] = useState<DailyStreak>({ current: 0, longest: 0, lastActiveDay: 0 })
  const [goals, setGoals] = useState<WeeklyGoal[]>(weeklyGoals)
  const [experienceLevel, setExperienceLevel] = useState(1)
  const [experiencePoints, setExperiencePoints] = useState(0)
  const [callSchedule, setCallSchedule] = useState<OnboardingCallSchedule>({
    selectedDate: "",
    selectedTime: "",
    rescheduleRequest: false,
    rescheduleComment: "",
    isScheduled: false,
  })
  const [showCompletionDialog, setShowCompletionDialog] = useState(false)
  const [hasShownWizardCompletionPopup, setHasShownWizardCompletionPopup] = useState(false)

  // Auto-progression state
  const [autoProgression, setAutoProgression] = useState(false)
  const [progressionSpeed, setProgressionSpeed] = useState(1500)
  const [simulationMode, setSimulationMode] = useState<"realistic" | "accelerated" | "custom">("realistic")

  // Define left panel sections for progressive unlocking with weekly structure
  const leftPanelSections: LeftPanelSection[] = [
    {
      id: "dashboard",
      name: "Dashboard",
      description: "Master your business overview with key metrics",
      icon: BarChart3,
      unlocked: true, // Always starts unlocked
      requiredTasks: [],
      subsections: ["overview", "metrics", "kpis"]
    },
    // Week 1 (Days 2-7): Real Data Entry
    {
      id: "customers",
      name: "Customer Management",
      description: "Build and maintain your customer database",
      icon: Users,
      unlocked: false,
      requiredTasks: ["get-started-wizard"], // Unlocks after Get Started wizard
      subsections: ["add", "manage", "history"]
    },
    {
      id: "sites",
      name: "Sites & Locations",
      description: "Manage customer sites and service locations",
      icon: MapPin,
      unlocked: false,
      requiredTasks: ["organize-existing-customers", "create-first-customer"],
      subsections: ["sites", "locations", "mapping"]
    },
    {
      id: "jobs",
      name: "Jobs Management",
      description: "Create, manage, and track work orders efficiently",
      icon: FileText,
      unlocked: false,
      requiredTasks: ["create-site-for-customer"],
      subsections: ["create", "manage", "track"]
    },
    {
      id: "quotes",
      name: "Quotes & Estimates",
      description: "Create professional quotes and estimates",
      icon: FileText,
      unlocked: false,
      requiredTasks: ["create-first-job"],
      subsections: ["create", "send", "convert"]
    },
    {
      id: "invoicing",
      name: "Invoicing",
      description: "Generate and manage invoices seamlessly",
      icon: Receipt,
      unlocked: false,
      requiredTasks: ["cash-flow-tutorial"],
      subsections: ["generate", "send", "track"]
    },
    // Week 2 (Days 8-14): Workforce & Work Orders
    {
      id: "engineers",
      name: "Engineers & Team",
      description: "Manage your workforce and assignments",
      icon: Users,
      unlocked: false,
      requiredTasks: ["week1-mastery-check"],
      subsections: ["team", "assignments", "mobile"]
    },
    {
      id: "assets",
      name: "Asset Management",
      description: "Track equipment and assets at customer sites",
      icon: Package,
      unlocked: false,
      requiredTasks: ["add-first-engineer"],
      subsections: ["equipment", "maintenance", "tracking"]
    },
    // Week 3 (Days 15-21): Forms, Invoices, Reports
    {
      id: "forms",
      name: "Forms & Documentation",
      description: "Create and manage digital forms",
      icon: FileText,
      unlocked: false,
      requiredTasks: ["add-asset-to-site"],
      subsections: ["create", "submit", "reports"]
    },
    {
      id: "reports",
      name: "Reports & Analytics",
      description: "Generate insights with comprehensive reporting",
      icon: TrendingUp,
      unlocked: false,
      requiredTasks: ["submit-job-form"],
      subsections: ["revenue", "jobs", "performance"]
    },
    // Week 4 (Days 22-30): Mastery + Configuration
    {
      id: "settings",
      name: "Settings & Configuration",
      description: "Customize your system preferences",
      icon: Settings,
      unlocked: false,
      requiredTasks: ["view-first-report"],
      subsections: ["notifications", "branding", "mobile"]
    },
    {
      id: "marketplace",
      name: "Marketplace & Integrations",
      description: "Explore integrations and marketplace apps",
      icon: Store,
      unlocked: false,
      requiredTasks: ["customize-notifications"],
      subsections: ["integrations", "apps", "marketplace"]
    }
  ]

  // Initialize adaptive tasks on component mount
  useEffect(() => {
    // Create initial learning path for standard users
    const initialLearningPath: LearningPath = {
      pathType: "standard",
      estimatedCompletion: 30,
      hasWIPJobs: false,
      totalJobs: 0
    }

    setLearningPath(initialLearningPath)
    
    // Generate initial adaptive tasks
    const adaptiveTasks = generateAdaptiveTasks(initialLearningPath, null)
    setTasks(adaptiveTasks)
  }, [])

  // Initialize learning path and adaptive tasks
  useEffect(() => {
    // Always create a learning path, with or without WIP data
    let hasActiveJobs = false
    let totalJobs = 0
    let hasCustomers = false // Will be updated when customer data is available
    let hasQuotes = false // Will be updated when quote data is available
    let totalItems = 0

    if (workInProgressData) {
      hasActiveJobs = workInProgressData.hasWIPJobs
      totalJobs = workInProgressData.totalJobs
      totalItems = totalJobs + (workInProgressData.counts?.inProgress || 0)
    }

    let pathType: "hybrid" | "standard" | "accelerated"
    let estimatedDays: number

    if (totalItems === 0) {
      pathType = "standard"
      estimatedDays = 30
    } else if (totalItems > 10) {
      pathType = "accelerated"
      estimatedDays = 14
    } else {
      pathType = "hybrid"
      estimatedDays = 21
    }

    const newLearningPath: LearningPath = {
      pathType,
      estimatedCompletion: estimatedDays,
      hasWIPJobs: hasActiveJobs,
      totalJobs
    }

    setLearningPath(newLearningPath)
    
    // Always generate adaptive tasks (will include WIP tasks if applicable)
    const adaptiveTasks = generateAdaptiveTasks(newLearningPath, workInProgressData)
    setTasks(adaptiveTasks)
  }, [workInProgressData])

  // Handle wizard completion - mark the get-started-wizard task as completed
  useEffect(() => {
    if (isInitialOnboardingCompleted && tasks.length > 0) {
      const wizardTask = tasks.find(t => t.id === "get-started-wizard")
      
      if (wizardTask && !wizardTask.completed) {
        // Mark the task as completed
        setTasks(prev => prev.map(task => 
          task.id === "get-started-wizard" ? { ...task, completed: true } : task
        ))
        
        // Unlock customers section since wizard is complete
        setUnlockedSections(prev => {
          if (!prev.includes("customers")) {
            return [...prev, "customers"]
          }
          return prev
        })

        // Award points for wizard completion
        setTotalPoints(prev => prev + 100) // Award 100 points for wizard completion
        setExperiencePoints(prev => prev + 100)
        
        // Only show congratulations popup once
        if (!hasShownWizardCompletionPopup) {
          setPopupContent({
            type: "wizard_complete",
            title: "🎉 Get Started Wizard Complete!",
            message: "Great job! You've completed the essential setup.",
            description: "The Customer Management section is now unlocked. Ready to add your first customer?"
          })
          setShowPopup(true)
          setHasShownWizardCompletionPopup(true)
        }
      } else if (wizardTask && wizardTask.completed) {
        // Wizard task already completed, just ensure customers section is unlocked
        // Don't show popup again
        setUnlockedSections(prev => {
          if (!prev.includes("customers")) {
            return [...prev, "customers"]
          }
          return prev
        })
      }
    }
  }, [isInitialOnboardingCompleted, tasks, hasShownWizardCompletionPopup])

  // Helper function to generate milestones based on learning path
  const generateMilestones = (
    pathType: "hybrid" | "standard" | "accelerated",
    hasJobs: boolean,
    hasCustomers: boolean,
    hasQuotes: boolean
  ): string[] => {
    const baseMilestones = [
      "Complete initial setup",
      "Master dashboard navigation",
      "Set up your business profile"
    ]

    if (pathType === "hybrid") {
      if (hasJobs) baseMilestones.push("Process your existing jobs")
      if (hasCustomers) baseMilestones.push("Organize your customer database")
      if (hasQuotes) baseMilestones.push("Convert quotes to jobs")
    }

    baseMilestones.push(
      "Complete first end-to-end workflow",
      "Set up team collaboration",
      "Generate your first reports",
      "Achieve operational proficiency"
    )

    return baseMilestones
  }

  // Generate adaptive tasks based on work-in-progress data and weekly structure
  const generateAdaptiveTasks = (learningPath: LearningPath, wipData: any): OnboardingTask[] => {
    const adaptiveTasks: OnboardingTask[] = []
    
    // DAY 1: Get Started Wizard (Priority - Must Complete Day 1)
    adaptiveTasks.push({
      id: "get-started-wizard",
      title: "Complete Get Started Wizard",
      description: "Essential setup for your Joblogic account - takes just 10 minutes!",
      type: "wizard",
      day: 1,
      week: 1,
      completed: false,
      priority: "critical",
      estimatedTime: "10 min",
      leftPanelSection: "dashboard",
      unlocks: ["customers"],
      realJobData: { requiresWIP: false },
      points: 100,
      category: "Setup & Learning",
      difficulty: "beginner"
    })

    // WEEK 1 (Days 2-7): Real Data Entry
    if (learningPath.hasWIPJobs) {
      // For users with existing work
      adaptiveTasks.push({
        id: "organize-existing-customers",
        title: "Organize Your Existing Customers",
        description: `You have ${learningPath.totalJobs} jobs! Let's organize your customer data first.`,
        type: "tutorial",
        day: 2,
        week: 1,
        completed: false,
        priority: "critical",
        estimatedTime: "15 min",
        leftPanelSection: "customers",
        unlocks: ["sites"],
        realJobData: { requiresWIP: true },
        points: 75,
        category: "Operations",
        difficulty: "beginner"
      })
    } else {
      // For new users
      adaptiveTasks.push({
        id: "create-first-customer",
        title: "Add Your First Customer",
        description: "Start by adding your first customer — we'll walk you through it step by step.",
        type: "tutorial",
        day: 2,
        week: 1,
        completed: false,
        priority: "critical",
        estimatedTime: "10 min",
        leftPanelSection: "customers",
        unlocks: ["sites"],
        realJobData: { requiresWIP: false },
        points: 75,
        category: "Operations",
        difficulty: "beginner"
      })
    }

    // Core Week 1 Tasks
    adaptiveTasks.push(
      {
        id: "create-site-for-customer",
        title: "Add a Site to Your Customer",
        description: "Create a service location where you'll perform work.",
        type: "practice",
        day: 3,
        week: 1,
        completed: false,
        priority: "high",
        estimatedTime: "8 min",
        leftPanelSection: "sites",
        unlocks: ["jobs"],
        realJobData: { requiresWIP: false },
        points: 60,
        category: "Operations",
        difficulty: "beginner"
      },
      {
        id: "create-first-job",
        title: "Log Your First Job",
        description: "Create a work order for your customer - the heart of your business!",
        type: "practice",
        day: 4,
        week: 1,
        completed: false,
        priority: "critical",
        estimatedTime: "12 min",
        leftPanelSection: "jobs",
        unlocks: ["quotes", "invoicing"],
        realJobData: { requiresWIP: false },
        points: 100,
        category: "Operations",
        difficulty: "beginner"
      },
      {
        id: "cash-flow-tutorial",
        title: "Turn Jobs into Cash (Quote or Invoice)",
        description: "Learn how to create quotes or invoices - essential for getting paid!",
        type: "tutorial",
        day: 5,
        week: 1,
        completed: false,
        priority: "high",
        estimatedTime: "15 min",
        leftPanelSection: "quotes",
        unlocks: [],
        realJobData: { requiresWIP: false },
        points: 80,
        category: "Operations",
        difficulty: "beginner"
      },
      {
        id: "week1-mastery-check",
        title: "Week 1 Mastery: Customer → Site → Job → Money",
        description: "Verify you can complete the basic workflow from customer to cash.",
        type: "milestone",
        day: 7,
        week: 1,
        completed: false,
        priority: "high",
        estimatedTime: "5 min",
        leftPanelSection: "dashboard",
        unlocks: ["engineers"],
        realJobData: { requiresWIP: false },
        points: 150,
        category: "Milestones",
        difficulty: "beginner"
      }
    )

    // WEEK 2 (Days 8-14): Workforce & Work Orders
    adaptiveTasks.push(
      {
        id: "add-first-engineer",
        title: "Add Your First Engineer/Team Member",
        description: "Set up your team - even if it's just you for now!",
        type: "practice",
        day: 8,
        week: 2,
        completed: false,
        priority: "high",
        estimatedTime: "8 min",
        leftPanelSection: "engineers",
        unlocks: ["assets"],
        realJobData: { requiresWIP: false },
        points: 70,
        category: "Operations",
        difficulty: "beginner"
      },
      {
        id: "assign-job-to-engineer",
        title: "Assign a Job to an Engineer",
        description: "Learn how to dispatch work orders to your team.",
        type: "practice",
        day: 9,
        week: 2,
        completed: false,
        priority: "medium",
        estimatedTime: "10 min",
        leftPanelSection: "engineers",
        unlocks: [],
        realJobData: { requiresWIP: false },
        points: 60,
        category: "Operations",
        difficulty: "beginner"
      },
      {
        id: "mobile-app-tutorial",
        title: "Download & Set Up Mobile App",
        description: "Essential for small teams - manage jobs on the go!",
        type: "tutorial",
        day: 10,
        week: 2,
        completed: false,
        priority: "high",
        estimatedTime: "12 min",
        leftPanelSection: "engineers",
        unlocks: [],
        realJobData: { requiresWIP: false },
        points: 80,
        category: "Setup & Learning",
        difficulty: "beginner"
      },
      {
        id: "add-asset-to-site",
        title: "Add an Asset to a Customer Site",
        description: "Track equipment you service - boilers, AC units, etc.",
        type: "practice",
        day: 12,
        week: 2,
        completed: false,
        priority: "medium",
        estimatedTime: "10 min",
        leftPanelSection: "assets",
        unlocks: [],
        realJobData: { requiresWIP: false },
        points: 50,
        category: "Operations",
        difficulty: "intermediate"
      }
    )

    // WEEK 3 (Days 15-21): Forms, Invoices, Reports
    adaptiveTasks.push(
      {
        id: "submit-job-form",
        title: "Submit a Form from a Job",
        description: "Use digital forms to capture job details and customer signatures.",
        type: "practice",
        day: 15,
        week: 3,
        completed: false,
        priority: "high",
        estimatedTime: "15 min",
        leftPanelSection: "forms",
        unlocks: ["reports"],
        realJobData: { requiresWIP: false },
        points: 70,
        category: "Growth & Automation",
        difficulty: "intermediate"
      },
      {
        id: "view-first-report",
        title: "View Your First Business Report",
        description: "Check your Open Jobs or Revenue report - see your business at a glance!",
        type: "practice",
        day: 17,
        week: 3,
        completed: false,
        priority: "medium",
        estimatedTime: "8 min",
        leftPanelSection: "reports",
        unlocks: [],
        realJobData: { requiresWIP: false },
        points: 60,
        category: "Growth & Automation",
        difficulty: "beginner"
      },
      {
        id: "generate-invoice-from-job",
        title: "Generate Invoice from Completed Job",
        description: "Complete the cycle - turn a finished job into money in the bank!",
        type: "practice",
        day: 19,
        week: 3,
        completed: false,
        priority: "critical",
        estimatedTime: "12 min",
        leftPanelSection: "invoicing",
        unlocks: [],
        realJobData: { requiresWIP: false },
        points: 100,
        category: "Operations",
        difficulty: "intermediate"
      }
    )

    // WEEK 4 (Days 22-30): Mastery + Configuration
    adaptiveTasks.push(
      {
        id: "customize-notifications",
        title: "Set Up Your Notification Preferences",
        description: "Configure email and mobile notifications that work for your business.",
        type: "practice",
        day: 22,
        week: 4,
        completed: false,
        priority: "medium",
        estimatedTime: "10 min",
        leftPanelSection: "settings",
        unlocks: ["marketplace"],
        realJobData: { requiresWIP: false },
        points: 50,
        category: "Setup & Learning",
        difficulty: "beginner"
      },
      {
        id: "brand-customization",
        title: "Add Your Company Branding",
        description: "Make invoices and quotes look professional with your logo and colors.",
        type: "practice",
        day: 24,
        week: 4,
        completed: false,
        priority: "medium",
        estimatedTime: "15 min",
        leftPanelSection: "settings",
        unlocks: [],
        realJobData: { requiresWIP: false },
        points: 60,
        category: "Growth & Automation",
        difficulty: "intermediate"
      },
      {
        id: "explore-marketplace",
        title: "Explore Marketplace Integration",
        description: "Optional: Check out integrations that could help your business grow.",
        type: "tutorial",
        day: 26,
        week: 4,
        completed: false,
        priority: "low",
        estimatedTime: "10 min",
        leftPanelSection: "marketplace",
        unlocks: [],
        realJobData: { requiresWIP: false },
        points: 40,
        category: "Growth & Automation",
        difficulty: "intermediate"
      },
      {
        id: "journey-completion",
        title: "🎉 Complete Your Joblogic Journey",
        description: "Congratulations! You've mastered the essential workflows for your business.",
        type: "milestone",
        day: 30,
        week: 4,
        completed: false,
        priority: "high",
        estimatedTime: "5 min",
        leftPanelSection: "dashboard",
        unlocks: [],
        realJobData: { requiresWIP: false },
        points: 200,
        category: "Milestones",
        difficulty: "beginner"
      }
    )

    // Add WIP-specific tasks if user has work in progress
    if (learningPath.hasWIPJobs && wipData) {
      // Integrate WIP tasks into the learning path at strategic points
      const wipSpecificTasks: OnboardingTask[] = [
        {
          id: "wip-status-update-week1",
          title: "Update Your Job Status (Real Data Practice)",
          description: `Practice with your ${wipData.totalJobs} existing jobs - update their status in Joblogic`,
          type: "practice",
          day: 3,
          week: 1,
          completed: false,
          priority: "high",
          estimatedTime: "20 min",
          category: "Operations",
          points: 150,
          difficulty: "beginner",
          leftPanelSection: "jobs",
          unlocks: [],
          realJobData: {
            requiresWIP: true,
            jobType: "status_update"
          }
        },
        {
          id: "wip-customer-cleanup",
          title: "Clean Up Customer Data (From Your Jobs)",
          description: "Review and organize customer information from your existing work",
          type: "practice",
          day: 4,
          week: 1,
          completed: false,
          priority: "medium",
          estimatedTime: "15 min",
          category: "Operations",
          points: 100,
          difficulty: "beginner",
          leftPanelSection: "customers",
          unlocks: [],
          realJobData: {
            requiresWIP: true,
            jobType: "customer_data"
          }
        }
      ]

      // Add conditional WIP tasks based on data
      if (wipData.counts?.scheduled && wipData.counts.scheduled > 0) {
        wipSpecificTasks.push({
          id: "wip-scheduling-practice",
          title: "Schedule Your Pending Jobs",
          description: `Organize ${wipData.counts.scheduled} scheduled jobs in Joblogic`,
          type: "practice",
          day: 10,
          week: 2,
          completed: false,
          priority: "high",
          estimatedTime: "25 min",
          category: "Operations",
          points: 125,
          difficulty: "intermediate",
          leftPanelSection: "engineers",
          unlocks: [],
          realJobData: {
            requiresWIP: true,
            jobType: "scheduling"
          }
        })
      }

      if (wipData.counts?.inProgress && wipData.counts.inProgress > 0) {
        wipSpecificTasks.push({
          id: "wip-progress-tracking",
          title: "Track Progress on Active Jobs",
          description: `Update progress for ${wipData.counts.inProgress} active jobs`,
          type: "practice",
          day: 12,
          week: 2,
          completed: false,
          priority: "medium",
          estimatedTime: "20 min",
          category: "Operations",
          points: 100,
          difficulty: "intermediate",
          leftPanelSection: "jobs",
          unlocks: [],
          realJobData: {
            requiresWIP: true,
            jobType: "progress_tracking"
          }
        })
      }

      // Add WIP tasks to the main adaptive tasks array
      adaptiveTasks.push(...wipSpecificTasks)
    }

    return adaptiveTasks
  }

  // Function to handle section unlocking when tasks are completed
  const handleTaskCompletion = (taskId: string) => {
    const task = tasks.find(t => t.id === taskId)
    if (!task || task.completed) return

    // Update task completion
    setTasks(prev => prev.map(t => 
      t.id === taskId ? { ...t, completed: true } : t
    ))

    // Check if this task unlocks any sections
    if (task.unlocks && task.unlocks.length > 0) {
      const newUnlockedSections = [...unlockedSections]
      task.unlocks.forEach(sectionId => {
        if (!newUnlockedSections.includes(sectionId)) {
          newUnlockedSections.push(sectionId)
        }
      })
      setUnlockedSections(newUnlockedSections)

      // Show unlock notification with small business context
      if (task.unlocks.length > 0) {
        const unlockedSection = leftPanelSections.find(s => s.id === task.unlocks![0])
        if (unlockedSection) {
          setPopupContent({
            type: "section_unlock",
            title: "🎉 New Feature Unlocked!",
            message: `You've unlocked ${unlockedSection.name}!`,
            description: getSmallBusinessUnlockMessage(unlockedSection.id),
            icon: unlockedSection.icon
          })
          setShowPopup(true)
        }
      }
    }

    // Special handling for weekly milestone completions
    handleWeeklyMilestones(task)

    // Award points
    setTotalPoints(prev => prev + task.points)
    setExperiencePoints(prev => prev + task.points)

    // Check for level up
    const newLevel = Math.floor(experiencePoints / 1000) + 1
    if (newLevel > experienceLevel) {
      setExperienceLevel(newLevel)
      setPopupContent({
        type: "level_up",
        title: "🌟 Level Up!",
        message: `Congratulations! You've reached Level ${newLevel}!`,
        description: "Keep building your business with Joblogic!"
      })
      setShowPopup(true)
    }
  }

  // Small business focused unlock messages
  const getSmallBusinessUnlockMessage = (sectionId: string): string => {
    const messages: Record<string, string> = {
      customers: "Now you can build your customer database - the foundation of your business!",
      sites: "Add service locations where you'll do work - essential for field service.",
      jobs: "Create work orders - this is where you'll track all your service calls!",
      quotes: "Start sending professional quotes to win more business.",
      invoicing: "Turn completed jobs into money - the most important part!",
      engineers: "Add your team members (even if it's just you for now).",
      assets: "Track equipment you service - great for recurring maintenance contracts.",
      forms: "Go paperless with digital forms - save time and look professional.",
      reports: "See how your business is performing with key metrics.",
      settings: "Customize Joblogic to work exactly how your business needs.",
      marketplace: "Explore integrations to connect with tools you already use."
    }
    return messages[sectionId] || "Keep growing your business!"
  }

  // Handle weekly milestone completions and unlock next week's features
  const handleWeeklyMilestones = (task: OnboardingTask) => {
    if (task.id === "week1-mastery-check") {
      // Week 1 completed - unlock Week 2 features
      const week2Sections = ["engineers", "assets"]
      setUnlockedSections(prev => [...prev, ...week2Sections])
      
      setPopupContent({
        type: "weekly_milestone",
        title: "🚀 Week 1 Complete!",
        message: "You've mastered the basics: Customer → Site → Job → Money!",
        description: "Week 2 unlocked: Let's set up your team and equipment tracking."
      })
      setShowPopup(true)
    } else if (task.week === 2 && task.type === "practice" && task.leftPanelSection === "assets") {
      // Week 2 completion trigger
      checkWeekCompletion(2)
    } else if (task.leftPanelSection === "reports" && task.week === 3) {
      // Week 3 completion trigger
      checkWeekCompletion(3)
    } else if (task.id === "journey-completion") {
      // Final completion
      setPopupContent({
        type: "journey_complete",
        title: "🎊 Congratulations!",
        message: "You've completed your Joblogic journey!",
        description: "You're now ready to run your field service business efficiently. Our team will follow up to help you optimize further."
      })
      setShowPopup(true)
    }
  }

  // Check if a week is completed and unlock next week
  const checkWeekCompletion = (weekNumber: number) => {
    const weekTasks = tasks.filter(t => t.week === weekNumber)
    const completedWeekTasks = weekTasks.filter(t => t.completed)
    
    if (completedWeekTasks.length >= Math.ceil(weekTasks.length * 0.75)) { // 75% completion threshold
      if (weekNumber === 2) {
        setUnlockedSections(prev => [...prev, "forms", "reports"])
        showWeekCompletionPopup(2, "Week 3 unlocked: Time to go digital with forms and reports!")
      } else if (weekNumber === 3) {
        setUnlockedSections(prev => [...prev, "settings", "marketplace"])
        showWeekCompletionPopup(3, "Final week unlocked: Customize and integrate!")
      }
    }
  }

  // Show week completion popup
  const showWeekCompletionPopup = (weekNumber: number, message: string) => {
    setPopupContent({
      type: "weekly_milestone",
      title: `🎯 Week ${weekNumber} Complete!`,
      message: "Great progress on building your business systems!",
      description: message
    })
    setShowPopup(true)
  }

  // Function to check if a section is unlocked
  const isSectionUnlocked = (sectionId: string): boolean => {
    // Dashboard is always unlocked
    if (sectionId === "dashboard") return true
    
    // Find the section configuration
    const section = leftPanelSections.find(s => s.id === sectionId)
    if (!section) return false
    
    // If no required tasks, unlock by default
    if (!section.requiredTasks || section.requiredTasks.length === 0) return true
    
    // Check if any of the required tasks are completed
    // For sections that have multiple options (like sites requiring either customer task)
    const hasCompletedRequiredTask = section.requiredTasks.some(taskId => {
      const task = tasks.find(t => t.id === taskId)
      return task && task.completed
    })
    
    return hasCompletedRequiredTask
  }

  // Function to get section progress based on completed tasks
  const getSectionProgress = (sectionId: string): number => {
    const sectionTasks = tasks.filter(task => task.leftPanelSection === sectionId)
    if (sectionTasks.length === 0) return 0
    
    const completedTasks = sectionTasks.filter(task => task.completed)
    return Math.round((completedTasks.length / sectionTasks.length) * 100)
  }

  // Smart personalization messages based on user's progress and WIP data
  const getPersonalizationMessage = (): string | null => {
    const completedTasks = tasks.filter(t => t.completed)
    const hasCustomers = completedTasks.some(t => t.leftPanelSection === "customers")
    const hasJobs = completedTasks.some(t => t.leftPanelSection === "jobs")
    const hasInvoices = completedTasks.some(t => t.leftPanelSection === "invoicing")
    
    // WIP-specific messages get priority - encourage learning through real data
    if (workInProgressData?.hasWIPJobs) {
      if (currentDay <= 3) {
        return `📊 You have ${workInProgressData.totalJobs} existing jobs! Let's update them in Joblogic - you'll learn the system while organizing your real work.`
      }
      
      if (currentDay <= 5 && !hasInvoices && workInProgressData.counts?.inProgress) {
        return "💰 Perfect timing to learn invoicing! Use your in-progress jobs to practice creating invoices - real data, real learning."
      }
      
      if (currentDay <= 7 && workInProgressData.counts?.scheduled && workInProgressData.counts.scheduled > 0) {
        return "📅 You have scheduled jobs waiting! Let's organize them properly in Joblogic's scheduling system."
      }
    }
    
    // Smart recommendations based on progress
    if (currentDay === 1 && !completedTasks.some(t => t.id === "get-started-wizard")) {
      return "🚀 Start with the Get Started Wizard - it only takes 10 minutes and unlocks everything else!"
    }
    
    if (hasCustomers && !hasJobs && currentDay <= 5) {
      return "👏 Great start with customers! Next: Create a site and job for that customer to complete the workflow."
    }
    
    if (hasJobs && !hasInvoices && currentDay >= 5) {
      return "💰 You have jobs but haven't created invoices yet. This is how you get paid - let's set that up!"
    }
    
    if (learningPath?.hasWIPJobs && currentDay <= 3) {
      return `📋 You have ${learningPath.totalJobs} existing jobs! Focus on organizing them first - it'll make everything else easier.`
    }
    
    if (currentWeek === 2 && !completedTasks.some(t => t.id === "mobile-app-tutorial")) {
      return "📱 Small teams need mobility! Set up the mobile app this week - manage jobs from anywhere."
    }
    
    if (currentWeek === 3 && !completedTasks.some(t => t.leftPanelSection === "forms")) {
      return "📝 Go digital with forms! They'll save you hours and make you look more professional to customers."
    }
    
    return null
  }

  // Effect to sync task completion with get started wizard progress
  useEffect(() => {
    setTasks(prevTasks => 
      prevTasks.map(task => {
        // Mark initial onboarding related tasks as completed when initial onboarding is done
        if (isInitialOnboardingCompleted && !task.completed) {
          if (task.id === "1") { // Welcome & Account Setup
            return { ...task, completed: true }
          }
          if (task.id === "2") { // Platform Overview Tutorial
            return { ...task, completed: true }
          }
          if (task.id === "3") { // Company Profile Creation
            return { ...task, completed: true }
          }
          if (task.id === "5") { // Business Information Setup
            return { ...task, completed: true }
          }
          if (task.id === "6") { // Industry Configuration
            return { ...task, completed: true }
          }
        }
        
        // Mark "First Customer Creation" task as completed when customer is created in get started wizard
        if (task.id === "7" && isCreatingCustomerCompleted && !task.completed) {
          return { ...task, completed: true }
        }
        
        // Mark "Job Creation Mastery" task as completed when job is logged in get started wizard
        if (task.id === "12" && isLoggingJobCompleted && !task.completed) {
          return { ...task, completed: true }
        }
        
        return task
      })
    )
  }, [isLoggingJobCompleted, isCreatingCustomerCompleted, isInitialOnboardingCompleted])

  // Effect to detect early completions and show encouragement
  useEffect(() => {
    detectEarlyCompletions()
  }, [tasks, currentDay])

  // State for early completion tracking and encouragement
  const [earlyCompletions, setEarlyCompletions] = useState<string[]>([])
  const [showEncouragementModal, setShowEncouragementModal] = useState(false)
  const [encouragementContent, setEncouragementContent] = useState<any>(null)
  const [lastEncouragementDay, setLastEncouragementDay] = useState<number>(-1)

  // Function to detect early completions and provide encouragement
  const detectEarlyCompletions = () => {
    const today = currentDay
    const completedTasksToday = tasks.filter(task => 
      task.completed && 
      task.day > today && 
      !earlyCompletions.includes(task.id)
    )
    
    if (completedTasksToday.length > 0) {
      const newEarlyCompletions = completedTasksToday.map(task => task.id)
      setEarlyCompletions(prev => [...prev, ...newEarlyCompletions])
      
      // Show encouragement for early completion
      showEarlyCompletionEncouragement(completedTasksToday)
    }
  }

  const showEarlyCompletionEncouragement = (completedTasks: OnboardingTask[]) => {
    // Add cooldown - don't show encouragement more than once per day
    if (lastEncouragementDay === currentDay) {
      return
    }
    
    // Add randomization - only show encouragement 30% of the time for regular early completions
    const daysAhead = Math.min(...completedTasks.map(task => task.day - currentDay))
    let showChance = 0.3 // Default 30% chance
    
    // Increase chance for exceptional early completions
    if (daysAhead >= 3) {
      showChance = 0.6 // 60% chance for 3+ days ahead
    }
    if (daysAhead >= 5) {
      showChance = 0.8 // 80% chance for 5+ days ahead
    }
    if (completedTasks.length >= 3) {
      showChance = 0.7 // 70% chance for completing 3+ tasks early
    }
    
    // Roll the dice
    if (Math.random() > showChance) {
      return
    }
    
    const encouragementMessages = [
      {
        title: "🚀 Ahead of Schedule!",
        message: `Amazing! You're ${daysAhead} day${daysAhead > 1 ? 's' : ''} ahead of schedule! Your dedication is paying off.`,
        points: completedTasks.reduce((sum, task) => sum + task.points, 0) * 1.5, // Bonus points
        badge: "Early Bird Champion"
      },
      {
        title: "⭐ Outstanding Progress!",
        message: `Incredible work! You've completed future tasks ${daysAhead} day${daysAhead > 1 ? 's' : ''} early. Keep this momentum going!`,
        points: completedTasks.reduce((sum, task) => sum + task.points, 0) * 1.2,
        badge: "Progress Pioneer"
      },
      {
        title: "🎯 Exceptional Achievement!",
        message: `You're crushing it! Completing tasks ahead of time shows real commitment to mastering JobLogic.`,
        points: completedTasks.reduce((sum, task) => sum + task.points, 0) * 1.3,
        badge: "Overachiever"
      }
    ]
    
    const randomEncouragement = encouragementMessages[Math.floor(Math.random() * encouragementMessages.length)]
    
    setEncouragementContent({
      ...randomEncouragement,
      completedTasks,
      daysAhead
    })
    setShowEncouragementModal(true)
    setLastEncouragementDay(currentDay) // Set cooldown
    
    // Add bonus points
    setTotalPoints(prev => prev + Math.floor(randomEncouragement.points))
  }

  // Check for early completions whenever tasks change
  useEffect(() => {
    detectEarlyCompletions()
  }, [tasks, currentDay])

  // Calculate progress metrics with proper reactivity to task changes
  const progressMetrics = useMemo(() => {
    const completedTasks = tasks.filter((task) => task.completed).length
    const totalTasks = tasks.length
    const overallProgress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0
    const isJourneyComplete = currentDay >= 30 && tasks.filter((t) => t.type !== "bonus").every((task) => task.completed)

    return {
      completedTasks,
      totalTasks,
      overallProgress,
      isJourneyComplete
    }
  }, [tasks, currentDay])

  const { completedTasks, totalTasks, overallProgress, isJourneyComplete } = progressMetrics

  const weekMetrics = useMemo(() => {
    const currentWeek = Math.ceil(currentDay / 7)
    const weekTasks = tasks.filter((task) => task.week === currentWeek && task.type !== "bonus")
    const completedWeekTasks = weekTasks.filter((task) => task.completed).length
    const weekProgress = weekTasks.length > 0 ? (completedWeekTasks / weekTasks.length) * 100 : 0

    return {
      currentWeek,
      weekTasks,
      completedWeekTasks,
      weekProgress
    }
  }, [tasks, currentDay])

  const { currentWeek, weekTasks, weekProgress } = weekMetrics

  const taskFilters = useMemo(() => {
    const todaysTasks = tasks.filter((task) => task.day === currentDay)
    const availableTasks = tasks.filter((task) => {
      if (task.day > currentDay) return false
      if (task.prerequisites) {
        return task.prerequisites.every((prereqId) => tasks.find((t) => t.id === prereqId)?.completed)
      }
      return true
    })
    const upcomingTasks = tasks.filter((task) => task.day > currentDay && task.day <= currentDay + 3)

    return {
      todaysTasks,
      availableTasks,
      upcomingTasks
    }
  }, [tasks, currentDay])

  const { todaysTasks, availableTasks, upcomingTasks } = taskFilters

  // Experience level calculation
  const experienceThresholds = [0, 500, 1200, 2000, 3000, 4500, 6500, 9000, 12000, 16000, 21000]
  const currentLevelThreshold = experienceThresholds[experienceLevel - 1] || 0
  const nextLevelThreshold =
    experienceThresholds[experienceLevel] || experienceThresholds[experienceThresholds.length - 1]
  const levelProgress =
    ((experiencePoints - currentLevelThreshold) / (nextLevelThreshold - currentLevelThreshold)) * 100

  // Enhanced task completion with better feedback
  const toggleTaskCompletion = (taskId: string) => {
    const task = tasks.find(t => t.id === taskId)
    if (!task) return

    if (!task.completed) {
      // Complete the task using our new handler
      handleTaskCompletion(taskId)
      
      // Keep existing functionality for streaks and goals
      if (dailyStreak.lastActiveDay !== currentDay) {
        setDailyStreak((prev) => ({
          current: prev.lastActiveDay === currentDay - 1 ? prev.current + 1 : 1,
          longest: Math.max(prev.longest, prev.lastActiveDay === currentDay - 1 ? prev.current + 1 : 1),
          lastActiveDay: currentDay,
        }))
      }

      // Update weekly goals
      setGoals((prev) =>
        prev.map((goal) => {
          if (goal.week === task.week && task.type !== "bonus") {
            const newCompletedTasks = goal.completedTasks + 1
            const isGoalCompleted = newCompletedTasks >= goal.targetTasks && !goal.completed
            if (isGoalCompleted) {
              setTotalPoints((prevPoints) => prevPoints + goal.bonusPoints)
              setExperiencePoints((prevExp) => prevExp + goal.bonusPoints)
            }
            return {
              ...goal,
              completedTasks: newCompletedTasks,
              completed: isGoalCompleted || goal.completed,
            }
          }
          return goal
        }),
      )

      checkAchievements(taskId, task)
      checkLevelUp()
      showTaskCompletionFeedback(task, task.points)

      // Check for early completions and show encouragement
      setTimeout(() => detectEarlyCompletions(), 500)

      // Check if journey is complete after this task
      setTimeout(() => {
        const updatedTasks = tasks.map((t) => (t.id === taskId ? { ...t, completed: true } : t))
        const isComplete = currentDay >= 30 && updatedTasks.filter((t) => t.type !== "bonus").every((t) => t.completed)
        if (isComplete) {
          setTimeout(() => setShowCompletionDialog(true), 1000)
        }
      }, 100)
    } else {
      // Toggle completion off (uncomplete task)
      setTasks(prev => prev.map(t => 
        t.id === taskId ? { ...t, completed: false } : t
      ))
      setTotalPoints(prev => prev - task.points)
      setExperiencePoints(prev => prev - task.points)
    }
  }

  const checkLevelUp = () => {
    const newLevel =
      experienceThresholds.findIndex(
        (threshold, index) =>
          index === experienceThresholds.length - 1 || experiencePoints < experienceThresholds[index + 1],
      ) + 1

    if (newLevel > experienceLevel) {
      setExperienceLevel(newLevel)
      showLevelUpPopup(newLevel)
    }
  }

  const showLevelUpPopup = (level: number) => {
    setPopupContent({
      type: "levelup",
      title: "Level Up!",
      level,
      rewards: [`Level ${level} Badge`, "Bonus XP Multiplier"],
    })
    setShowPopup(true)
  }

  const checkAchievements = (completedTaskId: string, completedTask: OnboardingTask) => {
    const completedCount = tasks.filter((t) => t.completed).length + 1

    // First Steps
    if (completedCount === 1) {
      unlockAchievement("first_steps")
    }

    // Quick Learner
    const todayCompletedTasks = tasks.filter((t) => t.day === currentDay && t.completed).length + 1
    if (todayCompletedTasks >= 3 && currentDay === 1) {
      unlockAchievement("quick_learner")
    }

    // Week Warrior
    const week1CriticalTasks = tasks.filter((t) => t.week === 1 && t.priority === "critical")
    const completedWeek1Critical = week1CriticalTasks.filter((t) => t.completed).length
    if (
      completedTask.week === 1 &&
      completedTask.priority === "critical" &&
      completedWeek1Critical === week1CriticalTasks.length - 1
    ) {
      unlockAchievement("week_warrior")
    }

    // Streak Master
    if (dailyStreak.current >= 7) {
      unlockAchievement("streak_master")
    }

    // Data Master
    const dataTasks = tasks.filter((t) => t.category === "Data")
    const completedDataTasks = dataTasks.filter((t) => t.completed).length
    if (completedTask.category === "Data" && completedDataTasks === dataTasks.length - 1) {
      unlockAchievement("data_master")
    }

    // Speed Demon
    const recentTasks = tasks.filter((t) => t.completed && t.day >= currentDay - 1).length
    if (recentTasks >= 5) {
      unlockAchievement("speed_demon")
    }

    // Perfectionist
    if (completedCount === totalTasks) {
      unlockAchievement("perfectionist")
      unlockAchievement("onboarding_legend")
    }
  }

  const unlockAchievement = (achievementId: string) => {
    setUserAchievements((prev) =>
      prev.map((achievement) => {
        if (achievement.id === achievementId && !achievement.unlocked) {
          const bonusPoints = achievement.points
          setTotalPoints((prevPoints) => prevPoints + bonusPoints)
          setExperiencePoints((prevExp) => prevExp + bonusPoints)
          showAchievementPopup(achievement)
          return { ...achievement, unlocked: true, unlockedDate: new Date().toLocaleDateString() }
        }
        return achievement
      }),
    )
  }

  const showAchievementPopup = (achievement: Achievement) => {
    setPopupContent({
      type: "achievement",
      title: "Achievement Unlocked!",
      achievement,
    })
    setShowPopup(true)
  }

  const showTaskCompletionFeedback = (task: OnboardingTask, points: number) => {
    setPopupContent({
      type: "completion",
      title: "Task Completed!",
      task,
      points,
    })
    setShowPopup(true)
    setTimeout(() => setShowPopup(false), 2500)
  }

  const showTaskDetails = (task: OnboardingTask) => {
    setPopupContent({
      type: "task",
      title: "Task Details",
      task,
    })
    setShowPopup(true)
  }

  const handleScheduleCall = () => {
    if (callSchedule.selectedDate && callSchedule.selectedTime) {
      setCallSchedule((prev) => ({ ...prev, isScheduled: true }))
      setShowCompletionDialog(false)

      // Show confirmation
      setPopupContent({
        type: "callScheduled",
        title: "Onboarding Call Scheduled!",
        date: callSchedule.selectedDate,
        time: callSchedule.selectedTime,
      })
      setShowPopup(true)
    }
  }

  const handleRescheduleRequest = () => {
    setCallSchedule((prev) => ({
      ...prev,
      rescheduleRequest: true,
      isScheduled: true,
    }))
    setShowCompletionDialog(false)

    // Show confirmation
    setPopupContent({
      type: "rescheduleRequested",
      title: "Reschedule Request Submitted",
      comment: callSchedule.rescheduleComment,
    })
    setShowPopup(true)
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical":
        return "bg-red-500 text-white border-red-600"
      case "high":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "low":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return "bg-green-100 text-green-700"
      case "intermediate":
        return "bg-yellow-100 text-yellow-700"
      case "advanced":
        return "bg-red-100 text-red-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const getTaskCardStyling = (task: OnboardingTask) => {
    const isEarlyCompletion = task.completed && task.day > currentDay && earlyCompletions.includes(task.id)
    const isRegularCompletion = task.completed && !isEarlyCompletion
    
    if (isEarlyCompletion) {
      return "bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-400 shadow-lg ring-2 ring-yellow-200 ring-opacity-50"
    } else if (isRegularCompletion) {
      return "bg-green-50 border-green-200"
    } else {
      return "hover:border-teal-300"
    }
  }

  const getTaskBadges = (task: OnboardingTask) => {
    const badges = []
    
    if (task.completed && task.day > currentDay && earlyCompletions.includes(task.id)) {
      const daysAhead = task.day - currentDay
      badges.push(
        <Badge 
          key="early" 
          className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-0 shadow-sm animate-pulse"
        >
          🚀 {daysAhead} day{daysAhead > 1 ? 's' : ''} early!
        </Badge>
      )
    }
    
    if (task.completed) {
      badges.push(
        <Badge key="completed" className="bg-green-100 text-green-800 border-green-200">
          ✅ Completed
        </Badge>
      )
    }
    
    return badges
  }

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "common":
        return "border-gray-300 bg-gray-50"
      case "rare":
        return "border-blue-300 bg-blue-50"
      case "epic":
        return "border-purple-300 bg-purple-50"
      case "legendary":
        return "border-yellow-300 bg-yellow-50"
      default:
        return "border-gray-300 bg-gray-50"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "wizard":
        return <Settings className="w-4 h-4" />
      case "tutorial":
        return <PlayCircle className="w-4 h-4" />
      case "practice":
        return <Target className="w-4 h-4" />
      case "milestone":
        return <Trophy className="w-4 h-4" />
      case "bonus":
        return <Gift className="w-4 h-4" />
      default:
        return <BookOpen className="w-4 h-4" />
    }
  }

  // Auto-progression with realistic simulation
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (autoProgression && currentDay < 30) {
      interval = setInterval(() => {
        setCurrentDay((prev) => {
          const newDay = Math.min(30, prev + 1)

          // Simulate realistic task completion based on mode
          const dayTasks = availableTasks.filter((t) => t.day === newDay)
          let completionRate = 0.7 // Default realistic rate

          if (simulationMode === "accelerated") completionRate = 0.9
          if (simulationMode === "custom") completionRate = 0.5

          dayTasks.forEach((task) => {
            if (!task.completed && Math.random() < completionRate) {
              // Add realistic delay for task completion
              setTimeout(() => {
                if (!task.completed) {
                  toggleTaskCompletion(task.id)
                }
              }, Math.random() * 2000)
            }
          })

          return newDay
        })
      }, progressionSpeed)
    }
    return () => clearInterval(interval)
  }, [autoProgression, currentDay, progressionSpeed, simulationMode, availableTasks])

  const timeSlots = generateTimeSlots()

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="ghost"
            className="w-full justify-start text-left h-7 text-xs text-slate-300 hover:text-white hover:bg-slate-600 relative group"
          >
            <div className="w-2 h-2 rounded-full mr-3 bg-gradient-to-r from-orange-400 to-red-500 animate-pulse" />
            <div className="flex flex-col items-start">
              <span className="text-xs font-medium">30-Day Journey</span>
              <span className="text-[10px] text-slate-400">
                Level {experienceLevel} • Day {currentDay}
              </span>
            </div>
            <div className="ml-auto flex items-center gap-1">
              <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs px-1.5 py-0.5">
                {Math.round(overallProgress)}%
              </Badge>
              {dailyStreak.current > 0 && (
                <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs px-1 py-0.5">
                  🔥{dailyStreak.current}
                </Badge>
              )}
            </div>
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-6xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-teal-500 to-blue-600 rounded-lg flex items-center justify-center">
                <Calendar className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-xl font-bold">30-Day Business Setup Journey</div>
                <div className="text-sm text-gray-600 font-normal">
                  Level {experienceLevel} • {experiencePoints.toLocaleString()} XP • Day {currentDay} of 30
                </div>
              </div>
            </DialogTitle>
          </DialogHeader>

          <Tabs defaultValue="dashboard" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
              <TabsTrigger value="today">Today</TabsTrigger>
              <TabsTrigger value="progress">Progress</TabsTrigger>
              <TabsTrigger value="achievements">Achievements</TabsTrigger>
              <TabsTrigger value="testing">Testing</TabsTrigger>
            </TabsList>

            <TabsContent value="dashboard" className="space-y-6">
              {/* Welcome Introduction for Small Business Owners */}
              <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
                <CardContent className="p-6">
                  <div className="text-center space-y-3">
                    <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto">
                      <Rocket className="w-8 h-8 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-blue-900">
                      Welcome to Your 30-Day Business Setup! 👋
                    </h2>
                    <p className="text-blue-800 max-w-2xl mx-auto leading-relaxed">
                      This simple, step-by-step journey will help you set up Joblogic to manage your business efficiently. 
                      No technical experience needed - just follow along at your own pace!
                    </p>
                    <div className="flex items-center justify-center gap-4 text-sm text-blue-700 bg-blue-100 rounded-lg p-3 max-w-xl mx-auto">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>5-15 min per task</span>
                      </div>
                      <div className="w-px h-4 bg-blue-300"></div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>Perfect for 1-5 person teams</span>
                      </div>
                      <div className="w-px h-4 bg-blue-300"></div>
                      <div className="flex items-center gap-1">
                        <Award className="w-4 h-4" />
                        <span>Earn rewards as you learn!</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              {/* Journey Complete Message */}
              {isJourneyComplete && (
                <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Trophy className="w-6 h-6 text-green-600" />🎉 Congratulations! Your 30-Day Journey is Complete!
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <p className="text-green-700">
                        You've successfully completed your self-onboarding journey with Joblogic! Our onboarding team
                        will be reaching out to discuss your experience and help you take the next steps.
                      </p>
                      {!callSchedule.isScheduled && (
                        <Button
                          onClick={() => setShowCompletionDialog(true)}
                          className="bg-green-600 hover:bg-green-700 text-white"
                        >
                          <Phone className="w-4 h-4 mr-2" />
                          Schedule Your Onboarding Call
                        </Button>
                      )}
                      {callSchedule.isScheduled && !callSchedule.rescheduleRequest && (
                        <div className="bg-green-100 p-3 rounded-lg">
                          <p className="text-green-800 font-medium">
                            ✅ Your onboarding call is scheduled for{" "}
                            {new Date(callSchedule.selectedDate).toLocaleDateString()} at {callSchedule.selectedTime}
                          </p>
                        </div>
                      )}
                      {callSchedule.rescheduleRequest && (
                        <div className="bg-blue-100 p-3 rounded-lg">
                          <p className="text-blue-800 font-medium">
                            📅 Your reschedule request has been submitted. Our team will contact you soon to arrange a
                            suitable time.
                          </p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Level Progress */}
              <Card className="bg-gradient-to-r from-teal-50 to-blue-50 border-teal-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Crown className="w-5 h-5 text-teal-600" />
                    Experience Level {experienceLevel}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress to Level {experienceLevel + 1}</span>
                      <span>{Math.round(levelProgress)}%</span>
                    </div>
                    <Progress value={levelProgress} className="h-3 bg-white" />
                    <div className="text-xs text-gray-600">
                      {experiencePoints.toLocaleString()} / {nextLevelThreshold.toLocaleString()} XP
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Key Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-green-600" />
                      Overall Progress
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="text-2xl font-bold text-green-700">{Math.round(overallProgress)}%</div>
                      <Progress value={overallProgress} className="h-2" />
                      <p className="text-xs text-green-600">
                        {completedTasks} of {totalTasks} tasks
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-blue-600" />
                      Current Week
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="text-2xl font-bold text-blue-700">Week {currentWeek}</div>
                      <Progress value={weekProgress} className="h-2" />
                      <p className="text-xs text-blue-600">
                        Day {currentDay} • {Math.round(weekProgress)}% complete
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Flame className="w-4 h-4 text-orange-600" />
                      Daily Streak
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="text-2xl font-bold text-orange-700">{dailyStreak.current}</div>
                      <div className="text-xs text-orange-600">Longest: {dailyStreak.longest} days</div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Star className="w-4 h-4 text-purple-600" />
                      Total Points
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="text-2xl font-bold text-purple-700">{totalPoints.toLocaleString()}</div>
                      <div className="text-xs text-purple-600">
                        {userAchievements.filter((a) => a.unlocked).length} achievements
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Work-in-Progress Learning Path */}
              {learningPath && (
                <Card className="bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-200">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Rocket className="w-5 h-5 text-indigo-600" />
                      Your Small Business Journey: {learningPath.pathType === "hybrid" ? "🔄 Hybrid" : learningPath.pathType === "accelerated" ? "⚡ Accelerated" : "📚 Standard"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">
                          {learningPath.hasWIPJobs ? 
                            `Working with ${learningPath.totalJobs} existing jobs - we'll help you organize them!` : 
                            "Starting fresh - perfect! We'll build your business systems step by step."
                          }
                        </span>
                        <Badge variant="outline" className="text-xs">
                          ~{learningPath.estimatedCompletion} days
                        </Badge>
                      </div>
                      {learningPath.hasWIPJobs && (
                        <div className="bg-white p-3 rounded-lg border border-indigo-200">
                          <p className="text-sm text-indigo-700">
                            💡 Great! We'll use your existing work to teach you the system in real-time.
                          </p>
                        </div>
                      )}
                      {!learningPath.hasWIPJobs && (
                        <div className="bg-white p-3 rounded-lg border border-indigo-200">
                          <p className="text-sm text-indigo-700">
                            🚀 Perfect for small businesses: We'll start with your first customer and build from there!
                          </p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Work in Progress Integration */}
              {workInProgressData && workInProgressData.hasWIPJobs && (
                <Card className="bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Database className="w-5 h-5 text-amber-600" />
                      Your Work in Progress
                      <Badge variant="outline" className="ml-2 bg-amber-100 text-amber-700 border-amber-300">
                        {workInProgressData.totalJobs} Jobs to Update
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {/* WIP Overview */}
                      <div className="bg-amber-100 p-4 rounded-lg border border-amber-200">
                        <div className="flex items-start gap-3">
                          <Clipboard className="w-5 h-5 text-amber-700 mt-0.5" />
                          <div>
                            <h4 className="font-medium text-amber-900 text-sm mb-2">Learn by Doing with Your Real Work!</h4>
                            <p className="text-amber-800 text-sm mb-3">
                              You have {workInProgressData.totalJobs} existing jobs. Let's use them to learn Joblogic! 
                              Each update teaches you the system while organizing your real business data.
                            </p>
                            {workInProgressData.counts && (
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                <div className="bg-white p-2 rounded border border-amber-200">
                                  <div className="text-lg font-bold text-amber-700">{workInProgressData.counts.inProgress || 0}</div>
                                  <div className="text-xs text-amber-600">In Progress</div>
                                </div>
                                <div className="bg-white p-2 rounded border border-amber-200">
                                  <div className="text-lg font-bold text-amber-700">{workInProgressData.counts.scheduled || 0}</div>
                                  <div className="text-xs text-amber-600">Scheduled</div>
                                </div>
                                <div className="bg-white p-2 rounded border border-amber-200">
                                  <div className="text-lg font-bold text-amber-700">{workInProgressData.counts.onHold || 0}</div>
                                  <div className="text-xs text-amber-600">On Hold</div>
                                </div>
                                <div className="bg-white p-2 rounded border border-amber-200">
                                  <div className="text-lg font-bold text-amber-700">{workInProgressData.counts.awaitingParts || 0}</div>
                                  <div className="text-xs text-amber-600">Awaiting Parts</div>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Progress motivation */}
                      <div className="bg-gradient-to-r from-amber-100 to-orange-100 p-3 rounded-lg border border-amber-200">
                        <div className="flex items-center gap-2 mb-2">
                          <Star className="w-4 h-4 text-amber-600" />
                          <span className="font-medium text-amber-900 text-sm">WIP Learning Benefits</span>
                        </div>
                        <ul className="text-xs text-amber-800 space-y-1">
                          <li>✓ Learn by updating your real jobs - no dummy data!</li>
                          <li>✓ Organize your existing work while mastering the system</li>
                          <li>✓ See immediate value as your business gets more organized</li>
                          <li>✓ Faster onboarding - you already know your business context</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Weekly Progress Overview */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-blue-600" />
                    4-Week Business Setup Plan
                    <Badge variant="outline" className="ml-2">
                      Week {currentWeek} of 4
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      {[
                        {
                          week: 1,
                          title: "Getting Started",
                          description: "Customer → Site → Job → Money",
                          sections: ["customers", "sites", "jobs", "quotes", "invoicing"],
                          color: "green",
                          days: "Days 1-7"
                        },
                        {
                          week: 2,
                          title: "Your Team & Equipment",
                          description: "Team setup & equipment tracking",
                          sections: ["engineers", "assets"],
                          color: "blue",
                          days: "Days 8-14"
                        },
                        {
                          week: 3,
                          title: "Going Digital",
                          description: "Mobile forms, reports & billing",
                          sections: ["forms", "reports"],
                          color: "purple",
                          days: "Days 15-21"
                        },
                        {
                          week: 4,
                          title: "Growing Your Business",
                          description: "Optimize settings & connect apps",
                          sections: ["settings", "marketplace"],
                          color: "orange",
                          days: "Days 22-30"
                        }
                      ].map((weekInfo) => {
                        const weekTasks = tasks.filter(t => t.week === weekInfo.week)
                        const completedTasks = weekTasks.filter(t => t.completed).length
                        const weekProgress = weekTasks.length > 0 ? (completedTasks / weekTasks.length) * 100 : 0
                        const isCurrentWeek = currentWeek === weekInfo.week
                        const isUnlocked = weekInfo.week === 1 || weekInfo.week <= currentWeek || weekProgress > 0
                        
                        // Define color classes explicitly for Tailwind compilation
                        const getWeekColorClasses = (color: string, isCurrentWeek: boolean, isUnlocked: boolean) => {
                          if (isCurrentWeek) {
                            switch (color) {
                              case "green":
                                return "bg-green-50 border-green-200 ring-2 ring-green-300"
                              case "blue":
                                return "bg-blue-50 border-blue-200 ring-2 ring-blue-300"
                              case "purple":
                                return "bg-purple-50 border-purple-200 ring-2 ring-purple-300"
                              case "orange":
                                return "bg-orange-50 border-orange-200 ring-2 ring-orange-300"
                              default:
                                return "bg-gray-50 border-gray-200 ring-2 ring-gray-300"
                            }
                          } else if (isUnlocked) {
                            return "bg-gray-50 border-gray-200"
                          } else {
                            return "bg-gray-100 border-gray-300 opacity-60"
                          }
                        }
                        
                        const getBadgeColorClasses = (color: string, isCurrentWeek: boolean, isUnlocked: boolean) => {
                          if (isCurrentWeek) {
                            switch (color) {
                              case "green":
                                return "bg-green-500 text-white"
                              case "blue":
                                return "bg-blue-500 text-white"
                              case "purple":
                                return "bg-purple-500 text-white"
                              case "orange":
                                return "bg-orange-500 text-white"
                              default:
                                return "bg-gray-500 text-white"
                            }
                          } else if (isUnlocked) {
                            return "bg-gray-500 text-white"
                          } else {
                            return "bg-gray-400 text-gray-200"
                          }
                        }
                        
                        const getTextColorClasses = (color: string, isCurrentWeek: boolean) => {
                          if (isCurrentWeek) {
                            switch (color) {
                              case "green":
                                return "text-green-600"
                              case "blue":
                                return "text-blue-600"
                              case "purple":
                                return "text-purple-600"
                              case "orange":
                                return "text-orange-600"
                              default:
                                return "text-gray-600"
                            }
                          } else {
                            return "text-gray-500"
                          }
                        }
                        
                        return (
                          <Card
                            key={weekInfo.week}
                            className={`relative transition-all duration-300 ${getWeekColorClasses(weekInfo.color, isCurrentWeek, isUnlocked)}`}
                          >
                            <CardContent className="p-4">
                              <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                  <Badge 
                                    className={getBadgeColorClasses(weekInfo.color, isCurrentWeek, isUnlocked)}
                                  >
                                    Week {weekInfo.week}
                                  </Badge>
                                  {weekProgress === 100 && (
                                    <CheckCircle className="w-5 h-5 text-green-600" />
                                  )}
                                  {!isUnlocked && (
                                    <Lock className="w-4 h-4 text-gray-400" />
                                  )}
                                </div>
                                
                                <div>
                                  <h3 className={`font-medium text-sm ${
                                    isUnlocked ? "text-gray-900" : "text-gray-500"
                                  }`}>
                                    {weekInfo.title}
                                  </h3>
                                  <p className={`text-xs mt-1 ${
                                    isUnlocked ? "text-gray-600" : "text-gray-400"
                                  }`}>
                                    {weekInfo.description}
                                  </p>
                                  <p className={`text-xs mt-1 font-medium ${getTextColorClasses(weekInfo.color, isCurrentWeek)}`}>
                                    {weekInfo.days}
                                  </p>
                                </div>

                                {isUnlocked && (
                                  <div className="space-y-2">
                                    <div className="flex justify-between text-xs">
                                      <span>Progress</span>
                                      <span>{Math.round(weekProgress)}%</span>
                                    </div>
                                    <Progress value={weekProgress} className="h-1.5" />
                                    <div className="text-xs text-gray-500">
                                      {completedTasks}/{weekTasks.length} tasks
                                    </div>
                                  </div>
                                )}

                                {!isUnlocked && (
                                  <div className="text-xs text-gray-500">
                                    Complete previous week to unlock
                                  </div>
                                )}
                              </div>
                            </CardContent>
                          </Card>
                        )
                      })}
                    </div>
                    
                    {/* Smart Personalization Messages */}
                    {getPersonalizationMessage() && (
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <div className="flex items-start gap-3">
                          <Lightbulb className="w-5 h-5 text-blue-600 mt-0.5" />
                          <div>
                            <h4 className="font-medium text-blue-900 text-sm">Smart Recommendation</h4>
                            <p className="text-blue-700 text-sm mt-1">{getPersonalizationMessage()}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Business Setup Progress - Simplified */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building className="w-5 h-5 text-blue-600" />
                    Your Business Setup Progress
                    <Badge variant="outline" className="ml-2 bg-blue-50 text-blue-700 border-blue-200">
                      {leftPanelSections.filter(s => isSectionUnlocked(s.id)).length}/{leftPanelSections.length} Ready
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {/* Progress overview bar */}
                    <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-blue-800">Setup Progress</span>
                        <span className="text-sm text-blue-700">{Math.round((leftPanelSections.filter(s => isSectionUnlocked(s.id)).length / leftPanelSections.length) * 100)}%</span>
                      </div>
                      <Progress value={(leftPanelSections.filter(s => isSectionUnlocked(s.id)).length / leftPanelSections.length) * 100} className="h-2" />
                    </div>
                    
                    {/* Compact list view */}
                    <div className="space-y-2">
                      {leftPanelSections.filter(section => section.id !== 'dashboard').map((section) => {
                        const isUnlocked = isSectionUnlocked(section.id)
                        const progress = getSectionProgress(section.id)
                        
                        return (
                          <div
                            key={section.id}
                            className={`flex items-center justify-between p-3 rounded-lg border transition-all ${
                              isUnlocked 
                                ? "bg-green-50 border-green-200" 
                                : "bg-gray-50 border-gray-200"
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              {isUnlocked ? (
                                <CheckCircle className="w-5 h-5 text-green-600" />
                              ) : (
                                <Circle className="w-5 h-5 text-gray-400" />
                              )}
                              <div>
                                <h3 className={`font-medium text-sm ${
                                  isUnlocked ? "text-green-800" : "text-gray-600"
                                }`}>
                                  {section.name}
                                </h3>
                                {!isUnlocked && (
                                  <p className="text-xs text-gray-500">Complete tasks to unlock</p>
                                )}
                              </div>
                            </div>
                            
                            <div className="text-right">
                              {isUnlocked ? (
                                <Badge variant="outline" className="bg-green-100 text-green-700 border-green-300 text-xs">
                                  Ready
                                </Badge>
                              ) : (
                                <Badge variant="outline" className="text-gray-500 text-xs">
                                  Locked
                                </Badge>
                              )}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Weekly Goals */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-5 h-5 text-teal-600" />
                    Weekly Goals
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {goals.map((goal) => (
                      <Card
                        key={goal.week}
                        className={`${goal.completed ? "bg-green-50 border-green-200" : goal.week === currentWeek ? "bg-blue-50 border-blue-200" : ""}`}
                      >
                        <CardContent className="p-4">
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <h4 className="font-medium text-sm">{goal.title}</h4>
                              {goal.completed && <CheckCircle className="w-4 h-4 text-green-600" />}
                            </div>
                            <p className="text-xs text-gray-600">{goal.description}</p>
                            <div className="space-y-1">
                              <div className="flex justify-between text-xs">
                                <span>Progress</span>
                                <span>
                                  {goal.completedTasks}/{goal.targetTasks}
                                </span>
                              </div>
                              <Progress value={(goal.completedTasks / goal.targetTasks) * 100} className="h-1.5" />
                            </div>
                            <Badge variant="outline" className="text-xs">
                              +{goal.bonusPoints} bonus points
                            </Badge>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Achievements */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-yellow-600" />
                    Recent Achievements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {userAchievements
                      .filter((a) => a.unlocked)
                      .slice(-6)
                      .map((achievement) => (
                        <div
                          key={achievement.id}
                          className={`p-3 rounded-lg border ${getRarityColor(achievement.rarity)}`}
                        >
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                              <achievement.icon className="w-4 h-4 text-white" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-medium text-sm truncate">{achievement.title}</h4>
                              <p className="text-xs text-gray-600 truncate">{achievement.description}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="today" className="space-y-4">
              <div className="space-y-6">
                {/* Journey Complete Message for Today Tab */}
                {isJourneyComplete && (
                  <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
                    <CardContent className="p-6 text-center">
                      <Trophy className="w-16 h-16 text-green-600 mx-auto mb-4" />
                      <h3 className="text-xl font-bold text-green-800 mb-2">🎉 Journey Complete!</h3>
                      <p className="text-green-700 mb-4">
                        Congratulations! You've completed your 30-day self-onboarding journey. No more tasks remaining -
                        you're all set!
                      </p>
                      <p className="text-sm text-green-600">
                        A Joblogic onboarding specialist will be in touch to discuss your next steps.
                      </p>
                    </CardContent>
                  </Card>
                )}

                {!isJourneyComplete && (
                  <div>
                    {/* Today's Overview */}
                    <Card className="bg-gradient-to-r from-teal-50 to-blue-50 border-teal-200">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Calendar className="w-5 h-5 text-teal-600" />
                          Day {currentDay} Overview
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-teal-700">{todaysTasks.length}</div>
                            <div className="text-sm text-teal-600">Tasks Available</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-blue-700">
                              {todaysTasks.filter((t) => t.completed).length}
                            </div>
                            <div className="text-sm text-blue-600">Completed</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-purple-700">
                              {todaysTasks.reduce((sum, t) => sum + (t.completed ? t.points : 0), 0)}
                            </div>
                            <div className="text-sm text-purple-600">Points Earned</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Wizard Completion Acknowledgment */}
                    {isInitialOnboardingCompleted && (
                      <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
                        <CardContent className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                              <CheckCircle className="w-6 h-6 text-white" />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-semibold text-green-800">🎉 Get Started Wizard Complete!</h4>
                              <p className="text-sm text-green-700">
                                Excellent! You've completed the essential setup. The Customer Management section is now unlocked.
                              </p>
                            </div>
                            <Badge className="bg-green-500 text-white">
                              +100 XP
                            </Badge>
                          </div>
                        </CardContent>
                      </Card>
                    )}

                    {/* WIP Progress Tracking */}
                    {workInProgressData && workInProgressData.hasWIPJobs && (
                      <Card className="bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200">
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <Database className="w-5 h-5 text-amber-600" />
                            Work in Progress Update Status
                            <Badge variant="outline" className="ml-2 bg-amber-100 text-amber-700 border-amber-300">
                              {tasks.filter(t => t.realJobData?.requiresWIP && t.completed).length}/{tasks.filter(t => t.realJobData?.requiresWIP).length} Updated
                            </Badge>
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            <div className="bg-amber-100 p-3 rounded-lg border border-amber-200">
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium text-amber-800">WIP Learning Progress</span>
                                <span className="text-sm text-amber-700">
                                  {Math.round((tasks.filter(t => t.realJobData?.requiresWIP && t.completed).length / Math.max(tasks.filter(t => t.realJobData?.requiresWIP).length, 1)) * 100)}%
                                </span>
                              </div>
                              <Progress 
                                value={(tasks.filter(t => t.realJobData?.requiresWIP && t.completed).length / Math.max(tasks.filter(t => t.realJobData?.requiresWIP).length, 1)) * 100} 
                                className="h-2" 
                              />
                              <p className="text-xs text-amber-700 mt-2">
                                📊 You're learning Joblogic by organizing your real business data - double the value!
                              </p>
                            </div>
                            
                            {/* Quick WIP actions */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                              <div className="bg-white p-3 rounded border border-amber-200">
                                <div className="text-lg font-bold text-amber-700">{workInProgressData.totalJobs}</div>
                                <div className="text-xs text-amber-600">Total Jobs</div>
                              </div>
                              <div className="bg-white p-3 rounded border border-amber-200">
                                <div className="text-lg font-bold text-amber-700">
                                  {tasks.filter(t => t.realJobData?.requiresWIP && t.completed).length}
                                </div>
                                <div className="text-xs text-amber-600">WIP Tasks Done</div>
                              </div>
                              <div className="bg-white p-3 rounded border border-amber-200">
                                <div className="text-lg font-bold text-amber-700">
                                  +{tasks.filter(t => t.realJobData?.requiresWIP && t.completed).reduce((sum, t) => sum + t.points, 0)}
                                </div>
                                <div className="text-xs text-amber-600">Bonus Points</div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )}

                    {/* Today's Tasks */}
                    <div>
                      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <Target className="w-5 h-5 text-teal-600" />
                        Today's Priority Tasks (Day {currentDay})
                        <Badge variant="outline" className="ml-2 bg-teal-50 text-teal-700 border-teal-200">
                          {(() => {
                            const allTodayTasks = tasks.filter(task => 
                              (task.day === currentDay) || 
                              (task.day < currentDay && !task.completed && task.priority === 'critical')
                            )
                            const completedToday = allTodayTasks.filter(t => t.completed).length
                            return `${completedToday}/${allTodayTasks.length} Done`
                          })()}
                        </Badge>
                      </h3>
                      {(() => {
                        // Get today's tasks plus any overdue critical tasks
                        const todayPriorityTasks = tasks.filter(task => 
                          (task.day === currentDay) || 
                          (task.day < currentDay && !task.completed && task.priority === 'critical')
                        )
                        
                        return todayPriorityTasks.length > 0 ? (
                          <div className="space-y-3">
                            {todayPriorityTasks.map((task) => (
                              <Card
                                key={task.id}
                                className={`cursor-pointer hover:shadow-lg transition-all duration-200 ${
                                  task.completed ? "bg-green-50 border-green-200" : 
                                  task.day < currentDay ? "bg-red-50 border-red-200" :
                                  "hover:border-teal-300 bg-teal-50 border-teal-200"
                                } ${getTaskCardStyling(task)}`}
                                onClick={() => showTaskDetails(task)}
                              >
                                <CardContent className="p-4">
                                  <div className="flex items-start justify-between">
                                    <div className="flex items-start gap-4 flex-1">
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        className="p-0 h-6 w-6 mt-1"
                                        onClick={(e) => {
                                          e.stopPropagation()
                                          toggleTaskCompletion(task.id)
                                        }}
                                      >
                                        {task.completed ? (
                                          <CheckCircle className="w-6 h-6 text-green-600" />
                                        ) : (
                                          <div className={`w-6 h-6 border-2 rounded-full transition-colors ${
                                            task.day < currentDay 
                                              ? 'border-red-400 hover:border-red-600' 
                                              : 'border-gray-300 hover:border-teal-500'
                                          }`} />
                                        )}
                                      </Button>
                                      <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                          {task.day < currentDay && !task.completed && (
                                            <Badge className="bg-red-100 text-red-700 border-red-200">
                                              Overdue (Day {task.day})
                                            </Badge>
                                          )}
                                          {task.day === currentDay && (
                                            <Badge className="bg-teal-100 text-teal-700 border-teal-200">
                                              Today
                                            </Badge>
                                          )}
                                          {getTypeIcon(task.type)}
                                          <h4
                                            className={`font-semibold ${task.completed ? "line-through text-gray-500" : ""}`}
                                          >
                                            {task.title}
                                          </h4>
                                          {getTaskBadges(task)}
                                        </div>
                                        <p className="text-sm text-gray-600 mb-2">{task.description}</p>
                                        <div className="flex items-center gap-2 flex-wrap">
                                          <Badge className={getPriorityColor(task.priority)} variant="outline">
                                            {task.priority}
                                          </Badge>
                                          <Badge className={getDifficultyColor(task.difficulty)} variant="outline">
                                            {task.difficulty}
                                          </Badge>
                                          <Badge variant="outline">{task.estimatedTime}</Badge>
                                          <Badge variant="outline" className="bg-yellow-50 text-yellow-700">
                                            {task.points} pts
                                          </Badge>
                                          {task.realJobData?.requiresWIP && (
                                            <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                                              Real Data
                                            </Badge>
                                          )}
                                        </div>
                                        {task.prerequisites && task.prerequisites.length > 0 && (
                                          <div className="mt-2 text-xs text-gray-500">
                                            Prerequisites: {task.prerequisites.join(", ")}
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                    <ChevronRight className="w-5 h-5 text-gray-400 mt-2" />
                                  </div>
                                </CardContent>
                              </Card>
                            ))}
                          </div>
                        ) : (
                          <Card>
                            <CardContent className="p-8 text-center">
                              <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
                              <h3 className="text-lg font-semibold text-gray-700 mb-2">All Caught Up!</h3>
                              <p className="text-gray-600">No tasks scheduled for today. You're ahead of schedule!</p>
                            </CardContent>
                          </Card>
                        )
                      })()}
                    </div>

                    {/* Available Tasks - All tasks from current week that are accessible */}
                    <div>
                      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <Clock className="w-5 h-5 text-blue-600" />
                        Available This Week (Week {currentWeek})
                        <Badge variant="outline" className="ml-2 bg-blue-50 text-blue-700 border-blue-200">
                          {weekTasks.filter(t => t.completed).length}/{weekTasks.length} Completed
                        </Badge>
                      </h3>
                      <div className="space-y-3">
                        {(() => {
                          // Get all tasks from current week that are available (not future-locked)
                          const currentWeekAvailableTasks = tasks.filter(task => {
                            if (task.week !== currentWeek) return false
                            
                            // Check if task is available (not blocked by prerequisites or day restrictions)
                            if (task.day > currentDay + 7) return false // Don't show tasks more than a week ahead
                            
                            // Check prerequisites for uncompleted tasks
                            if (!task.completed && task.prerequisites) {
                              return task.prerequisites.every((prereqId) => 
                                tasks.find((t) => t.id === prereqId)?.completed
                              )
                            }
                            
                            return true
                          })
                          
                          return currentWeekAvailableTasks.length > 0 ? (
                            currentWeekAvailableTasks.map((task) => (
                              <Card
                                key={task.id}
                                className={`cursor-pointer hover:shadow-md transition-shadow hover:border-blue-300 ${getTaskCardStyling(task)} ${
                                  task.completed 
                                    ? 'border-green-200 bg-green-50' 
                                    : task.day <= currentDay 
                                      ? 'border-blue-200 bg-blue-50' 
                                      : 'border-gray-200'
                                }`}
                                onClick={() => showTaskDetails(task)}
                              >
                                <CardContent className="p-4">
                                  <div className="flex items-start justify-between">
                                    <div className="flex items-start gap-4 flex-1">
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        className="p-0 h-6 w-6 mt-1"
                                        onClick={(e) => {
                                          e.stopPropagation()
                                          toggleTaskCompletion(task.id)
                                        }}
                                      >
                                        {task.completed ? (
                                          <CheckCircle className="w-6 h-6 text-green-600" />
                                        ) : (
                                          <div className="w-6 h-6 border-2 border-gray-300 rounded-full hover:border-blue-500 transition-colors" />
                                        )}
                                      </Button>
                                      <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${
                                            task.day <= currentDay 
                                              ? 'bg-blue-100 text-blue-700' 
                                              : 'bg-gray-100 text-gray-600'
                                          }`}>
                                            D{task.day}
                                          </div>
                                          {getTypeIcon(task.type)}
                                          <h4 className={`font-semibold ${task.completed ? "line-through text-gray-500" : ""}`}>
                                            {task.title}
                                          </h4>
                                          {task.completed && (
                                            <Badge className="bg-green-100 text-green-700 border-green-200">
                                              ✅ Completed
                                            </Badge>
                                          )}
                                          {!task.completed && task.day <= currentDay && (
                                            <Badge className="bg-green-100 text-green-700 border-green-200">
                                              Ready Now
                                            </Badge>
                                          )}
                                          {!task.completed && task.day > currentDay && (
                                            <Badge variant="outline" className="bg-yellow-50 text-yellow-700">
                                              Available Early
                                            </Badge>
                                          )}
                                          {getTaskBadges(task)}
                                        </div>
                                        <p className="text-sm text-gray-600 mb-2">{task.description}</p>
                                        <div className="flex items-center gap-2 flex-wrap">
                                          <Badge className={getPriorityColor(task.priority)} variant="outline">
                                            {task.priority}
                                          </Badge>
                                          <Badge className={getDifficultyColor(task.difficulty)} variant="outline">
                                            {task.difficulty}
                                          </Badge>
                                          <Badge variant="outline">{task.estimatedTime}</Badge>
                                          <Badge variant="outline" className="bg-yellow-50 text-yellow-700">
                                            {task.points} pts
                                          </Badge>
                                          {task.realJobData?.requiresWIP && (
                                            <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                                              Real Data
                                            </Badge>
                                          )}
                                        </div>
                                        {task.prerequisites && task.prerequisites.length > 0 && (
                                          <div className="mt-2 text-xs text-gray-500">
                                            Prerequisites: {task.prerequisites.join(", ")}
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                    <ChevronRight className="w-5 h-5 text-gray-400 mt-2" />
                                  </div>
                                </CardContent>
                              </Card>
                            ))
                          ) : (
                            <Card>
                              <CardContent className="p-6 text-center">
                                <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-3" />
                                <h4 className="text-md font-semibold text-gray-700 mb-1">Week {currentWeek} Complete!</h4>
                                <p className="text-sm text-gray-600">All tasks for this week are done. Great progress!</p>
                              </CardContent>
                            </Card>
                          )
                        })()}
                      </div>
                    </div>

                    {/* Coming Up - Tasks from next week */}
                    <div>
                      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <ArrowUp className="w-5 h-5 text-purple-600" />
                        Coming Up Next Week (Week {Math.min(currentWeek + 1, 4)})
                        {currentWeek >= 4 && (
                          <Badge variant="outline" className="ml-2 bg-green-50 text-green-700 border-green-200">
                            Final Week!
                          </Badge>
                        )}
                      </h3>
                      <div className="space-y-2">
                        {(() => {
                          const nextWeek = Math.min(currentWeek + 1, 4)
                          const nextWeekTasks = tasks.filter(task => task.week === nextWeek).slice(0, 6)
                          
                          return nextWeekTasks.length > 0 ? (
                            nextWeekTasks.map((task) => (
                              <Card
                                key={task.id}
                                className={`cursor-pointer hover:shadow-md transition-shadow opacity-75 hover:opacity-100 ${getTaskCardStyling(task)}`}
                                onClick={() => showTaskDetails(task)}
                              >
                                <CardContent className="p-3">
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                      <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                                        <span className="text-xs font-medium text-purple-700">D{task.day}</span>
                                      </div>
                                      <div className="flex-1">
                                        <div className="flex items-center gap-2">
                                          {getTypeIcon(task.type)}
                                          <h4 className="font-medium text-sm">{task.title}</h4>
                                          {task.priority === 'critical' && (
                                            <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                                              Critical
                                            </Badge>
                                          )}
                                          {task.realJobData?.requiresWIP && (
                                            <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                                              Real Data
                                            </Badge>
                                          )}
                                          {getTaskBadges(task)}
                                        </div>
                                        <p className="text-xs text-gray-600">{task.description}</p>
                                      </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <Badge variant="outline" className="flex items-center gap-1">
                                        <Clock className="w-3 h-3" />
                                        {task.estimatedTime}
                                      </Badge>
                                      <Badge variant="outline" className="bg-purple-50 text-purple-700">
                                        {task.points} pts
                                      </Badge>
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>
                            ))
                          ) : (
                            <Card>
                              <CardContent className="p-6 text-center">
                                <Trophy className="w-12 h-12 text-gold-500 mx-auto mb-3" />
                                <h4 className="text-md font-semibold text-gray-700 mb-1">Journey Almost Complete!</h4>
                                <p className="text-sm text-gray-600">You're on the final stretch. Keep up the great work!</p>
                              </CardContent>
                            </Card>
                          )
                        })()}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="progress" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Task Categories Progress */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Progress by Category</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {useMemo(() => {
                        // Get all unique categories from tasks and sort them
                        const allCategories = [...new Set(tasks.map(t => t.category))].sort()
                        
                        return allCategories.map((category) => {
                          const categoryTasks = tasks.filter((t) => t.category === category)
                          const completed = categoryTasks.filter((t) => t.completed).length
                          const progress = categoryTasks.length > 0 ? (completed / categoryTasks.length) * 100 : 0

                          return (
                            <div key={category}>
                              <div className="flex justify-between text-sm mb-2">
                                <span className="font-medium capitalize">{category}</span>
                                <span className="text-gray-600">
                                  {completed}/{categoryTasks.length}
                                </span>
                              </div>
                              <Progress value={progress} className="h-3" />
                              <div className="text-xs text-gray-500 mt-1">{Math.round(progress)}% complete</div>
                            </div>
                          )
                        })
                      }, [tasks])}
                    </div>
                  </CardContent>
                </Card>

                {/* Task Types Progress */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Progress by Type</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {useMemo(() => {
                        // Get all unique types from tasks and sort them
                        const allTypes = [...new Set(tasks.map(t => t.type))].sort()
                        
                        return allTypes.map((type) => {
                          const typeTasks = tasks.filter((t) => t.type === type)
                          const completed = typeTasks.filter((t) => t.completed).length
                          const progress = typeTasks.length > 0 ? (completed / typeTasks.length) * 100 : 0

                          return (
                            <div key={type}>
                              <div className="flex justify-between text-sm mb-2">
                                <span className="font-medium capitalize flex items-center gap-2">
                                  {getTypeIcon(type)}
                                  {type}
                                </span>
                                <span className="text-gray-600">
                                  {completed}/{typeTasks.length}
                                </span>
                              </div>
                              <Progress value={progress} className="h-3" />
                              <div className="text-xs text-gray-500 mt-1">{Math.round(progress)}% complete</div>
                            </div>
                          )
                        })
                      }, [tasks])}
                    </div>
                  </CardContent>
                </Card>

                {/* 30-Day Calendar */}
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle className="text-lg">30-Day Progress Calendar</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-7 gap-2 mb-4">
                      {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                        <div key={day} className="text-center text-xs font-medium text-gray-500 p-2">
                          {day}
                        </div>
                      ))}
                    </div>
                    <div className="grid grid-cols-7 gap-2">
                      {Array.from({ length: 30 }, (_, i) => {
                        const day = i + 1
                        const dayTasks = tasks.filter((t) => t.day === day && t.type !== "bonus")
                        const completed = dayTasks.filter((t) => t.completed).length
                        const total = dayTasks.length
                        const isToday = day === currentDay
                        const isPast = day < currentDay
                        const isFuture = day > currentDay
                        const completionRate = total > 0 ? (completed / total) * 100 : 0

                        return (
                          <div
                            key={day}
                            className={`
                              relative w-12 h-12 rounded-lg text-sm flex flex-col items-center justify-center font-medium cursor-pointer transition-all
                              ${isToday ? "bg-teal-600 text-white ring-2 ring-teal-300 shadow-lg" : ""}
                              ${isPast && completionRate === 100 ? "bg-green-500 text-white" : ""}
                              ${isPast && completionRate > 0 && completionRate < 100 ? "bg-yellow-500 text-white" : ""}
                              ${isPast && completionRate === 0 ? "bg-red-200 text-red-700" : ""}
                              ${isFuture ? "bg-gray-100 text-gray-500 hover:bg-gray-200" : ""}
                              ${total === 0 ? "bg-gray-50 text-gray-300" : ""}
                            `}
                            title={`Day ${day}: ${completed}/${total} tasks completed (${Math.round(completionRate)}%)`}
                            onClick={() => setCurrentDay(day)}
                          >
                            <span className="text-xs">{day}</span>
                            {total > 0 && (
                              <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2">
                                <div className="flex gap-0.5">
                                  {Array.from({ length: Math.min(total, 3) }, (_, i) => (
                                    <div
                                      key={i}
                                      className={`w-1 h-1 rounded-full ${i < completed ? "bg-white" : "bg-white/30"}`}
                                    />
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        )
                      })}
                    </div>
                    <div className="flex items-center justify-center gap-6 mt-6 text-xs">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-green-500 rounded"></div>
                        <span>Completed</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-yellow-500 rounded"></div>
                        <span>Partial</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-teal-600 rounded"></div>
                        <span>Today</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-red-200 rounded"></div>
                        <span>Missed</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-gray-100 rounded"></div>
                        <span>Future</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="achievements" className="space-y-6">
              {/* Achievement Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200">
                  <CardContent className="p-4 text-center">
                    <Trophy className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-yellow-700">
                      {userAchievements.filter((a) => a.unlocked).length}
                    </div>
                    <div className="text-sm text-yellow-600">Unlocked</div>
                  </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
                  <CardContent className="p-4 text-center">
                    <Star className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-blue-700">
                      {userAchievements.filter((a) => a.unlocked && a.rarity === "rare").length}
                    </div>
                    <div className="text-sm text-blue-600">Rare</div>
                  </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
                  <CardContent className="p-4 text-center">
                    <Crown className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-purple-700">
                      {userAchievements.filter((a) => a.unlocked && a.rarity === "epic").length}
                    </div>
                    <div className="text-sm text-purple-600">Epic</div>
                  </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-amber-50 to-yellow-50 border-amber-200">
                  <CardContent className="p-4 text-center">
                    <Award className="w-8 h-8 text-amber-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-amber-700">
                      {userAchievements.filter((a) => a.unlocked && a.rarity === "legendary").length}
                    </div>
                    <div className="text-sm text-amber-600">Legendary</div>
                  </CardContent>
                </Card>
              </div>

              {/* Achievement Categories */}
              <div className="space-y-6">
                {[
                  "Getting Started",
                  "Learning",
                  "Weekly Goals",
                  "Consistency",
                  "Data Management",
                  "Automation",
                  "Excellence",
                  "Efficiency",
                  "Leadership",
                  "Innovation",
                  "Ultimate Achievement",
                ].map((category) => {
                  const categoryAchievements = userAchievements.filter((a) => a.category === category)
                  if (categoryAchievements.length === 0) return null

                  return (
                    <Card key={category}>
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                          <Sparkles className="w-5 h-5 text-purple-600" />
                          {category}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {categoryAchievements.map((achievement) => (
                            <Card
                              key={achievement.id}
                              className={`transition-all duration-200 ${
                                achievement.unlocked
                                  ? `${getRarityColor(achievement.rarity)} shadow-md`
                                  : "opacity-60 grayscale"
                              }`}
                            >
                              <CardContent className="p-4">
                                <div className="flex items-start gap-3">
                                  <div
                                    className={`w-12 h-12 rounded-full flex items-center justify-center ${
                                      achievement.unlocked
                                        ? "bg-gradient-to-br from-yellow-400 to-orange-500 text-white shadow-lg"
                                        : "bg-gray-200 text-gray-400"
                                    }`}
                                  >
                                    <achievement.icon className="w-6 h-6" />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                      <h4 className="font-semibold text-sm truncate">{achievement.title}</h4>
                                      <Badge
                                        variant="outline"
                                        className={`text-xs ${
                                          achievement.rarity === "legendary"
                                            ? "bg-yellow-100 text-yellow-800 border-yellow-300"
                                            : achievement.rarity === "epic"
                                              ? "bg-purple-100 text-purple-800 border-purple-300"
                                              : achievement.rarity === "rare"
                                                ? "bg-blue-100 text-blue-800 border-blue-300"
                                                : "bg-gray-100 text-gray-800 border-gray-300"
                                        }`}
                                      >
                                        {achievement.rarity}
                                      </Badge>
                                    </div>
                                    <p className="text-xs text-gray-600 mb-2 line-clamp-2">{achievement.description}</p>
                                    <div className="flex items-center justify-between">
                                      <Badge
                                        variant="outline"
                                        className="text-xs bg-yellow-50 text-yellow-700 border-yellow-200"
                                      >
                                        {achievement.points} pts
                                      </Badge>
                                      {achievement.unlocked && (
                                        <div className="flex items-center gap-1">
                                          <CheckCircle className="w-4 h-4 text-green-600" />
                                          {achievement.unlockedDate && (
                                            <span className="text-xs text-gray-500">{achievement.unlockedDate}</span>
                                          )}
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </TabsContent>

            <TabsContent value="testing" className="space-y-6">
              {/* Testing Controls */}
              <Card className="border-2 border-dashed border-blue-300 bg-blue-50">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Settings className="w-5 h-5 text-blue-600" />
                    Testing & Simulation Controls
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Day Navigation */}
                  <div>
                    <h4 className="font-semibold mb-3">Day Navigation</h4>
                    <div className="flex flex-wrap gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setCurrentDay(Math.max(1, currentDay - 1))}
                        disabled={currentDay <= 1}
                      >
                        ← Previous Day
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setCurrentDay(Math.min(30, currentDay + 1))}
                        disabled={currentDay >= 30}
                      >
                        Next Day →
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          const day = Math.floor(Math.random() * 30) + 1
                          setCurrentDay(day)
                        }}
                      >
                        🎲 Random Day
                      </Button>
                      <div className="flex items-center gap-2">
                        <span className="text-sm">Jump to:</span>
                        <select
                          value={currentDay}
                          onChange={(e) => setCurrentDay(Number(e.target.value))}
                          className="text-sm border rounded px-2 py-1"
                        >
                          {Array.from({ length: 30 }, (_, i) => (
                            <option key={i + 1} value={i + 1}>
                              Day {i + 1}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Auto-Progression */}
                  <div>
                    <h4 className="font-semibold mb-3">Auto-Progression</h4>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <Button
                          size="sm"
                          variant={autoProgression ? "default" : "outline"}
                          onClick={() => setAutoProgression(!autoProgression)}
                        >
                          {autoProgression ? "⏸️ Stop" : "▶️ Start"} Auto-Progression
                        </Button>
                        <select
                          value={simulationMode}
                          onChange={(e) => setSimulationMode(e.target.value as any)}
                          className="text-sm border rounded px-2 py-1"
                        >
                          <option value="realistic">Realistic (70% completion)</option>
                          <option value="accelerated">Accelerated (90% completion)</option>
                          <option value="custom">Custom (50% completion)</option>
                        </select>
                        <select
                          value={progressionSpeed}
                          onChange={(e) => setProgressionSpeed(Number(e.target.value))}
                          className="text-sm border rounded px-2 py-1"
                        >
                          <option value={500}>Fast (0.5s)</option>
                          <option value={1000}>Normal (1s)</option>
                          <option value={1500}>Realistic (1.5s)</option>
                          <option value={2000}>Slow (2s)</option>
                        </select>
                      </div>
                      <div className="text-sm text-blue-600">
                        {autoProgression ? `Auto-progressing in ${simulationMode} mode...` : "Auto-progression stopped"}
                      </div>
                    </div>
                  </div>

                  {/* Bulk Actions */}
                  <div>
                    <h4 className="font-semibold mb-3">Bulk Actions</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          const tasksToComplete = tasks.filter((t) => t.day <= currentDay && !t.completed)
                          tasksToComplete.forEach((task, index) => {
                            setTimeout(() => toggleTaskCompletion(task.id), index * 200)
                          })
                        }}
                      >
                        Complete All Past
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          const week1Tasks = tasks.filter((t) => t.week === 1 && !t.completed)
                          week1Tasks.forEach((task, index) => {
                            setTimeout(() => toggleTaskCompletion(task.id), index * 300)
                          })
                        }}
                      >
                        Complete Week 1
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          const tutorialTasks = tasks.filter((t) => t.type === "tutorial" && !t.completed)
                          tutorialTasks.forEach((task, index) => {
                            setTimeout(() => toggleTaskCompletion(task.id), index * 250)
                          })
                        }}
                      >
                        Complete Tutorials
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          const milestones = tasks.filter((t) => t.type === "milestone" && !t.completed)
                          milestones.forEach((task, index) => {
                            setTimeout(() => toggleTaskCompletion(task.id), index * 500)
                          })
                        }}
                      >
                        Complete Milestones
                      </Button>
                    </div>
                  </div>

                  {/* Scenario Testing */}
                  <div>
                    <h4 className="font-semibold mb-3">Scenario Testing</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <Button
                        size="sm"
                        variant="outline"
                        className="justify-start bg-transparent"
                        onClick={() => {
                          setCurrentDay(3)
                          const earlyTasks = tasks.filter((t) => t.day <= 3).slice(0, 2)
                          earlyTasks.forEach((task, index) => {
                            setTimeout(() => toggleTaskCompletion(task.id), index * 400)
                          })
                        }}
                      >
                        🆕 New User (Day 3, 2 tasks)
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="justify-start bg-transparent"
                        onClick={() => {
                          setCurrentDay(15)
                          const halfTasks = tasks.slice(0, Math.floor(tasks.length * 0.6))
                          halfTasks.forEach((task, index) => {
                            if (!task.completed && Math.random() > 0.3) {
                              setTimeout(() => toggleTaskCompletion(task.id), index * 100)
                            }
                          })
                        }}
                      >
                        🔥 Active User (Day 15, 60% complete)
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="justify-start bg-transparent"
                        onClick={() => {
                          setCurrentDay(25)
                          const mostTasks = tasks.slice(0, Math.floor(tasks.length * 0.85))
                          mostTasks.forEach((task, index) => {
                            if (!task.completed) {
                              setTimeout(() => toggleTaskCompletion(task.id), index * 80)
                            }
                          })
                        }}
                      >
                        ⚡ Power User (Day 25, 85% complete)
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="justify-start bg-transparent"
                        onClick={() => {
                          setCurrentDay(30)
                          tasks.forEach((task, index) => {
                            if (!task.completed) {
                              setTimeout(() => toggleTaskCompletion(task.id), index * 60)
                            }
                          })
                        }}
                      >
                        🏆 Champion (Day 30, 100% complete)
                      </Button>
                    </div>
                  </div>

                  {/* Reset Options */}
                  <div>
                    <h4 className="font-semibold mb-3">Reset Options</h4>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setTasks(onboardingTasks.map((t) => ({ ...t, completed: false })))
                          setUserAchievements(
                            achievements.map((a) => ({ ...a, unlocked: false, unlockedDate: undefined })),
                          )
                          setGoals(weeklyGoals.map((g) => ({ ...g, completedTasks: 0, completed: false })))
                          setTotalPoints(0)
                          setExperiencePoints(0)
                          setExperienceLevel(1)
                          setDailyStreak({ current: 0, longest: 0, lastActiveDay: 0 })
                          setCurrentDay(1)
                          setCallSchedule({
                            selectedDate: "",
                            selectedTime: "",
                            rescheduleRequest: false,
                            rescheduleComment: "",
                            isScheduled: false,
                          })
                          setShowCompletionDialog(false)
                        }}
                      >
                        🔄 Complete Reset
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setCurrentDay(1)
                        }}
                      >
                        📅 Reset Day Only
                      </Button>
                    </div>
                  </div>

                  {/* Current Status */}
                  <div className="pt-4 border-t border-blue-200">
                    <h4 className="font-semibold mb-2">Current Status</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="font-medium">Day:</span> {currentDay}/30
                      </div>
                      <div>
                        <span className="font-medium">Level:</span> {experienceLevel}
                      </div>
                      <div>
                        <span className="font-medium">XP:</span> {experiencePoints.toLocaleString()}
                      </div>
                      <div>
                        <span className="font-medium">Streak:</span> {dailyStreak.current} days
                      </div>
                      <div>
                        <span className="font-medium">Tasks:</span> {completedTasks}/{totalTasks}
                      </div>
                      <div>
                        <span className="font-medium">Points:</span> {totalPoints.toLocaleString()}
                      </div>
                      <div>
                        <span className="font-medium">Achievements:</span>{" "}
                        {userAchievements.filter((a) => a.unlocked).length}/{userAchievements.length}
                      </div>
                      <div>
                        <span className="font-medium">Progress:</span> {Math.round(overallProgress)}%
                      </div>
                      <div>
                        <span className="font-medium">Journey:</span> {isJourneyComplete ? "Complete" : "In Progress"}
                      </div>
                      <div>
                        <span className="font-medium">Call:</span> {callSchedule.isScheduled ? "Scheduled" : "Pending"}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Journey Completion Dialog */}
          <Dialog open={showCompletionDialog} onOpenChange={setShowCompletionDialog}>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Trophy className="w-6 h-6 text-green-600" />🎉 Congratulations! Your Journey is Complete!
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-6">
                <div className="text-center">
                  <p className="text-lg text-gray-700 mb-4">
                    You've successfully completed your 30-day self-onboarding journey with Joblogic!
                  </p>
                  <p className="text-gray-600">
                    A representative from our onboarding team will be reaching out to discuss your journey and help you
                    maximize your Joblogic experience.
                  </p>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-lg flex items-center gap-2">
                    <CalendarDays className="w-5 h-5 text-blue-600" />
                    Schedule Your Onboarding Call
                  </h3>

                  {!callSchedule.rescheduleRequest ? (
                    <div className="space-y-4">
                      <p className="text-sm text-gray-600">
                        Please select your preferred date and time for a follow-up call with our team:
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {timeSlots.map((slot) => (
                          <Card
                            key={slot.date}
                            className={`cursor-pointer transition-all ${
                              callSchedule.selectedDate === slot.date
                                ? "border-blue-500 bg-blue-50"
                                : "hover:border-gray-300"
                            }`}
                          >
                            <CardContent className="p-3">
                              <h4 className="font-medium text-sm mb-2">{slot.dayName}</h4>
                              <div className="grid grid-cols-2 gap-1">
                                {slot.times.map((time) => (
                                  <Button
                                    key={time}
                                    size="sm"
                                    variant={
                                      callSchedule.selectedDate === slot.date && callSchedule.selectedTime === time
                                        ? "default"
                                        : "outline"
                                    }
                                    className="text-xs h-7"
                                    onClick={() =>
                                      setCallSchedule((prev) => ({
                                        ...prev,
                                        selectedDate: slot.date,
                                        selectedTime: time,
                                      }))
                                    }
                                  >
                                    {time}
                                  </Button>
                                ))}
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>

                      <div className="flex justify-between items-center pt-4">
                        <Button
                          variant="outline"
                          onClick={() => setCallSchedule((prev) => ({ ...prev, rescheduleRequest: true }))}
                        >
                          <MessageSquare className="w-4 h-4 mr-2" />
                          Request Different Time
                        </Button>
                        <Button
                          onClick={handleScheduleCall}
                          disabled={!callSchedule.selectedDate || !callSchedule.selectedTime}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          Confirm Schedule
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <p className="text-sm text-gray-600">
                        If you're unavailable during the next week or need a different time, please let us know your
                        preferred schedule:
                      </p>

                      <div className="space-y-3">
                        <Label htmlFor="reschedule-comment">
                          Please describe your availability or preferred timing:
                        </Label>
                        <Textarea
                          id="reschedule-comment"
                          placeholder="e.g., I'm available after [date], prefer mornings, on vacation until [date], etc."
                          value={callSchedule.rescheduleComment}
                          onChange={(e) =>
                            setCallSchedule((prev) => ({
                              ...prev,
                              rescheduleComment: e.target.value,
                            }))
                          }
                          rows={3}
                        />
                      </div>

                      <div className="flex justify-between items-center pt-4">
                        <Button
                          variant="outline"
                          onClick={() => setCallSchedule((prev) => ({ ...prev, rescheduleRequest: false }))}
                        >
                          ← Back to Schedule
                        </Button>
                        <Button
                          onClick={handleRescheduleRequest}
                          disabled={!callSchedule.rescheduleComment.trim()}
                          className="bg-blue-600 hover:bg-blue-700"
                        >
                          Submit Request
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </DialogContent>
          </Dialog>

          {/* Popup */}
          <Dialog open={showPopup && popupContent && popupContent.type} onOpenChange={setShowPopup}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="text-lg font-semibold">
                  {popupContent?.type === "completion" && "Task Completed!"}
                  {popupContent?.type === "achievement" && "Achievement Unlocked!"}
                  {popupContent?.type === "levelup" && "Level Up!"}
                  {popupContent?.type === "level_up" && "Level Up!"}
                  {popupContent?.type === "callScheduled" && "Call Scheduled!"}
                  {popupContent?.type === "rescheduleRequested" && "Reschedule Request Submitted"}
                  {popupContent?.type === "task" && popupContent.task?.title}
                  {popupContent?.type === "wizard_complete" && popupContent.title}
                  {popupContent?.type === "section_unlock" && popupContent.title}
                  {popupContent?.type === "weekly_milestone" && popupContent.title}
                  {popupContent?.type === "journey_complete" && popupContent.title}
                  {!popupContent?.type && "Notification"}
                </DialogTitle>
              </DialogHeader>
              
              {popupContent?.type === "completion" && (
                <div className="text-center p-6">
                  <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                  <p className="text-gray-600 mb-4">
                    You've completed "{popupContent.task.title}" and earned {popupContent.points} points!
                  </p>
                  <Button onClick={() => setShowPopup(false)}>Close</Button>
                </div>
              )}

              {popupContent?.type === "achievement" && (
                <div className="text-center p-6">
                  <Award className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
                  <p className="text-gray-600 mb-4">
                    You've unlocked the "{popupContent.achievement.title}" achievement!
                  </p>
                  <Button onClick={() => setShowPopup(false)}>Close</Button>
                </div>
              )}

              {(popupContent?.type === "levelup" || popupContent?.type === "level_up") && (
                <div className="text-center p-6">
                  <ArrowUp className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                  <p className="text-gray-600 mb-4">
                    {popupContent.message || `Congratulations! You've reached Level ${popupContent.level}!`}
                  </p>
                  {popupContent.description && (
                    <p className="text-sm text-gray-500 mb-4">{popupContent.description}</p>
                  )}
                  <Button onClick={() => setShowPopup(false)}>Close</Button>
                </div>
              )}

              {popupContent?.type === "wizard_complete" && (
                <div className="text-center p-6">
                  <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                  <p className="text-gray-600 mb-4">{popupContent.message}</p>
                  {popupContent.description && (
                    <p className="text-sm text-gray-500 mb-4">{popupContent.description}</p>
                  )}
                  <Button onClick={() => setShowPopup(false)}>Continue</Button>
                </div>
              )}

              {popupContent?.type === "section_unlock" && (
                <div className="text-center p-6">
                  <Unlock className="w-12 h-12 text-purple-500 mx-auto mb-4" />
                  <p className="text-gray-600 mb-4">{popupContent.message}</p>
                  {popupContent.description && (
                    <p className="text-sm text-gray-500 mb-4">{popupContent.description}</p>
                  )}
                  <Button onClick={() => setShowPopup(false)}>Awesome!</Button>
                </div>
              )}

              {popupContent?.type === "weekly_milestone" && (
                <div className="text-center p-6">
                  <Trophy className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
                  <p className="text-gray-600 mb-4">{popupContent.message}</p>
                  {popupContent.description && (
                    <p className="text-sm text-gray-500 mb-4">{popupContent.description}</p>
                  )}
                  <Button onClick={() => setShowPopup(false)}>Continue</Button>
                </div>
              )}

              {popupContent?.type === "journey_complete" && (
                <div className="text-center p-6">
                  <Crown className="w-12 h-12 text-purple-500 mx-auto mb-4" />
                  <p className="text-gray-600 mb-4">{popupContent.message}</p>
                  {popupContent.description && (
                    <p className="text-sm text-gray-500 mb-4">{popupContent.description}</p>
                  )}
                  <Button onClick={() => setShowPopup(false)}>Celebrate!</Button>
                </div>
              )}

              {popupContent?.type === "callScheduled" && (
                <div className="text-center p-6">
                  <CalendarDays className="w-12 h-12 text-green-500 mx-auto mb-4" />
                  <p className="text-gray-600 mb-4">
                    Your onboarding call has been scheduled for {new Date(popupContent.date).toLocaleDateString()} at{" "}
                    {popupContent.time}.
                  </p>
                  <p className="text-sm text-gray-500 mb-4">
                    You'll receive a calendar invitation and reminder email shortly.
                  </p>
                  <Button onClick={() => setShowPopup(false)}>Close</Button>
                </div>
              )}

              {popupContent?.type === "rescheduleRequested" && (
                <div className="text-center p-6">
                  <MessageSquare className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                  <p className="text-gray-600 mb-4">
                    Thank you for letting us know your availability. Our onboarding team will contact you within 24
                    hours to arrange a suitable time.
                  </p>
                  {popupContent.comment && (
                    <div className="bg-gray-50 p-3 rounded-lg mb-4">
                      <p className="text-sm text-gray-700">Your message: "{popupContent.comment}"</p>
                    </div>
                  )}
                  <Button onClick={() => setShowPopup(false)}>Close</Button>
                </div>
              )}

              {popupContent?.type === "task" && (
                <div className="p-6">
                  <p className="text-gray-700">{popupContent.task.description}</p>
                  <div className="mt-4 space-y-2">
                    <div>
                      <span className="font-medium">Type:</span> {popupContent.task.type}
                    </div>
                    <div>
                      <span className="font-medium">Day:</span> {popupContent.task.day}
                    </div>
                    <div>
                      <span className="font-medium">Week:</span> {popupContent.task.week}
                    </div>
                    <div>
                      <span className="font-medium">Priority:</span> {popupContent.task.priority}
                    </div>
                    <div>
                      <span className="font-medium">Estimated Time:</span> {popupContent.task.estimatedTime}
                    </div>
                    <div>
                      <span className="font-medium">Category:</span> {popupContent.task.category}
                    </div>
                    <div>
                      <span className="font-medium">Points:</span> {popupContent.task.points}
                    </div>
                  </div>
                  <Button className="mt-6" onClick={() => setShowPopup(false)}>
                    Close
                  </Button>
                </div>
              )}
            </DialogContent>
          </Dialog>
        </DialogContent>
      </Dialog>

      {/* Encouragement Modal */}
      <Dialog open={!!encouragementContent} onOpenChange={() => setEncouragementContent(null)}>
        <DialogContent className="max-w-md mx-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-green-600">
              Amazing Progress!
            </DialogTitle>
          </DialogHeader>
          <div className="p-6 text-center">
            <div className="mb-4">
              <span className="text-6xl">🎉</span>
            </div>
            <div className="text-gray-700 space-y-3">
              <p className="text-lg font-medium">{encouragementContent?.message}</p>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                <p className="text-sm text-yellow-800">
                  <strong>Bonus Points Earned:</strong> +{encouragementContent?.bonusPoints} points
                </p>
                <p className="text-xs text-yellow-600 mt-1">
                  You're {encouragementContent?.daysEarly} days ahead of schedule! 🚀
                </p>
              </div>
            </div>
            <Button 
              className="mt-6 bg-green-600 hover:bg-green-700" 
              onClick={() => setEncouragementContent(null)}
            >
              Keep Going! 💪
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
