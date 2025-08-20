"use client"

import { CardDescription } from "@/components/ui/card"
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  CheckCircle,
  Clock,
  Play,
  BookOpen,
  Users,
  Settings,
  BarChart3,
  FileText,
  Calendar,
  Star,
  Award,
  Target,
  Video,
  HelpCircle,
  ChevronDown,
  ChevronRight,
  Zap,
  TrendingUp,
  Shield,
  Wrench,
  GraduationCap,
  Database,
  ArrowRight,
} from "lucide-react"

const tutorialCategories = [
  {
    title: "Everyday Essentials",
    description: "Quick actions for users managing jobs and customer interactions daily.",
    icon: Zap,
    color: "text-emerald-600",
    bgColor: "bg-emerald-50",
    borderColor: "border-emerald-200",
    items: [
      // { title: "How to Log Job?", type: "tutorial", duration: "3-4 min", featured: true },
      // { title: "How to add Customer?", type: "tutorial", duration: "2-3 min", featured: true },
      { title: "Find a Customer, Site or Job Quickly", type: "tutorial", duration: "2 min" },
      { title: "Use the Planner to View & Schedule Jobs", type: "tutorial", duration: "3 min" },
      { title: "Edit or Reassign a Job", type: "tutorial", duration: "2 min" },
      { title: "Pin Important Notes to a Job", type: "tutorial", duration: "2 min" },
    ],
  },
  {
    title: "Customer, Site & Asset Management",
    description: "Maintain your customer and asset database with confidence.",
    icon: Users,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    items: [
      { title: "Edit a Customer", type: "tutorial", duration: "2 min" },
      { title: "How Sites Link to Customers", type: "tutorial", duration: "3 min" },
      { title: "Link Assets to Sites", type: "tutorial", duration: "3 min" },
      { title: "Finding a Site or Asset Fast", type: "tutorial", duration: "2 min" },
      { title: "Edit Asset Info (Model, Serial, Type)", type: "tutorial", duration: "2-3 min" },
      { title: "Add Notes to a Customer or Site", type: "tutorial", duration: "2 min" },
    ],
  },
  {
    title: "Quote & Invoice Refresher",
    description: "Everything you need to manage quotes and billing smoothly.",
    icon: FileText,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200",
    items: [
      { title: "Change a Quote Before Sending", type: "tutorial", duration: "3 min" },
      { title: "Accepting a Quote", type: "tutorial", duration: "2 min" },
      { title: "Convert a Quote to an Invoice", type: "tutorial", duration: "2-3 min" },
      { title: "How VAT & Tax Are Handled", type: "tutorial", duration: "3 min" },
      { title: "Download an Invoice", type: "tutorial", duration: "2 min" },
      { title: "Export Invoice Data", type: "tutorial", duration: "2-3 min" },
    ],
  },
  {
    title: "Engineer & Scheduler Toolkit",
    description: "For those managing job allocations and field teams.",
    icon: Calendar,
    color: "text-orange-600",
    bgColor: "bg-orange-50",
    borderColor: "border-orange-200",
    items: [
      { title: "View Engineers & Their Jobs", type: "tutorial", duration: "2-3 min" },
      { title: "Planner Overview (Drag & Drop Tips)", type: "tutorial", duration: "3-4 min" },
      { title: "Assign or Reassign a Job", type: "tutorial", duration: "2 min" },
      { title: "Mark a Job as Completed", type: "tutorial", duration: "1-2 min" },
      { title: "What Engineers See on the Mobile App", type: "video", duration: "3 min" },
    ],
  },
  {
    title: "System Admin Shortcuts",
    description: "Make system changes without confusion or second-guessing.",
    icon: Shield,
    color: "text-red-600",
    bgColor: "bg-red-50",
    borderColor: "border-red-200",
    items: [
      { title: "Add or Deactivate Staff Users", type: "tutorial", duration: "2-3 min" },
      { title: "Change User Permissions", type: "tutorial", duration: "3-4 min" },
      { title: "Add Payment Terms to Invoices", type: "tutorial", duration: "2 min" },
      { title: "Update Rates, Priorities or Statuses", type: "tutorial", duration: "3 min" },
    ],
  },
  {
    title: "Reports, Data & Sync",
    description: "A quick guide to importing, exporting, and syncing your data.",
    icon: Database,
    color: "text-teal-600",
    bgColor: "bg-teal-50",
    borderColor: "border-teal-200",
    items: [
      { title: "Download Job Reports", type: "tutorial", duration: "2-3 min" },
      { title: "What Sync History Tells You", type: "tutorial", duration: "2 min" },
      { title: "How to Reimport Customers or Jobs", type: "tutorial", duration: "3 min" },
      { title: "Import vs Export History Explained", type: "tutorial", duration: "2 min" },
    ],
  },
  {
    title: "Quick Navigation Help",
    description: "When you can't remember where to click or what something means.",
    icon: HelpCircle,
    color: "text-indigo-600",
    bgColor: "bg-indigo-50",
    borderColor: "border-indigo-200",
    items: [
      { title: "How to Use the Menu & Search Bar", type: "tutorial", duration: "2 min" },
      { title: "Joblogic Mobile vs Desktop View", type: "video", duration: "3 min" },
      { title: "Need Support? Where to Go", type: "tutorial", duration: "1 min" },
    ],
  },
  {
    title: "Bespoke Customisation",
    description: "For users who want to tailor Joblogic to their business needs.",
    icon: Wrench,
    color: "text-gray-600",
    bgColor: "bg-gray-50",
    borderColor: "border-gray-200",
    items: [
      { title: "Create a Custom Electronic Form", type: "tutorial", duration: "7-8 min" },
      { title: "Deploy a Form Against a Visit or Asset", type: "tutorial", duration: "4-5 min" },
      { title: "Customise Document Templates (Quotes, Invoices, Job Sheets)", type: "tutorial", duration: "6-7 min" },
    ],
  },
]

interface Tutorial {
  id: string
  title: string
  description: string
  duration: string
  completed: boolean
  action: "navigate-log-job" | "navigate-add-customer" | "video"
  featured?: boolean
  difficulty?: string
  category?: string
}

interface LearningPath {
  id: string
  title: string
  description: string
  tutorials: string[]
  progress: number
  estimatedTime: string
}

const allTutorials: Tutorial[] = [
  {
    id: "2",
    title: "How to add Customer?",
    description: "Step-by-step guide to adding customers and managing customer information",
    duration: "2-3 min",
    difficulty: "Beginner",
    category: "Everyday Essentials",
    completed: true,
    action: "navigate-add-customer",
  },
  {
    id: "3",
    title: "How to Log Job?",
    description: "Complete walkthrough of the job logging process from start to finish",
    duration: "3-4 min",
    difficulty: "Beginner",
    category: "Everyday Essentials",
    completed: false,
    action: "navigate-log-job",
  },
  {
    id: "11",
    title: "Find a Customer, Site or Job Quickly",
    description: "Learn efficient search techniques to locate records fast",
    duration: "2 min",
    difficulty: "Beginner",
    category: "Everyday Essentials",
    completed: false,
    featured: true,
    action: "video",
  },
  {
    id: "12",
    title: "Use the Planner to View & Schedule Jobs",
    description: "Master the planning interface for job scheduling and visualization",
    duration: "3 min",
    difficulty: "Beginner",
    category: "Everyday Essentials",
    completed: false,
    featured: true,
    action: "video",
  },
  {
    id: "13",
    title: "Edit or Reassign a Job",
    description: "Learn how to modify job details and reassign to different engineers",
    duration: "2 min",
    difficulty: "Beginner",
    category: "Everyday Essentials",
    completed: false,
    action: "video",
  },
  {
    id: "14",
    title: "Pin Important Notes to a Job",
    description: "Add and manage important notes that stay visible on job records",
    duration: "2 min",
    difficulty: "Beginner",
    category: "Everyday Essentials",
    completed: false,
    action: "video",
  },
  {
    id: "15",
    title: "Edit a Customer",
    description: "Update customer information and maintain accurate records",
    duration: "2 min",
    difficulty: "Beginner",
    category: "Customer, Site & Asset Management",
    completed: false,
    action: "video",
  },
  {
    id: "16",
    title: "How Sites Link to Customers",
    description: "Understand the relationship between customers and their sites",
    duration: "3 min",
    difficulty: "Beginner",
    category: "Customer, Site & Asset Management",
    completed: false,
    action: "video",
  },
  {
    id: "17",
    title: "Link Assets to Sites",
    description: "Connect assets to specific customer sites for better organization",
    duration: "3 min",
    difficulty: "Beginner",
    category: "Customer, Site & Asset Management",
    completed: false,
    action: "video",
  },
  {
    id: "18",
    title: "Finding a Site or Asset Fast",
    description: "Quick techniques to locate sites and assets in your database",
    duration: "2 min",
    difficulty: "Beginner",
    category: "Customer, Site & Asset Management",
    completed: false,
    action: "video",
  },
  {
    id: "19",
    title: "Edit Asset Info (Model, Serial, Type)",
    description: "Update asset details including model numbers, serial numbers, and types",
    duration: "2-3 min",
    difficulty: "Beginner",
    category: "Customer, Site & Asset Management",
    completed: false,
    action: "video",
  },
  {
    id: "20",
    title: "Add Notes to a Customer or Site",
    description: "Document important information and observations",
    duration: "2 min",
    difficulty: "Beginner",
    category: "Customer, Site & Asset Management",
    completed: false,
    action: "video",
  },
  {
    id: "21",
    title: "Change a Quote Before Sending",
    description: "Modify quote details and pricing before customer delivery",
    duration: "3 min",
    difficulty: "Intermediate",
    category: "Quote & Invoice Refresher",
    completed: false,
    action: "video",
  },
  {
    id: "22",
    title: "Accepting a Quote",
    description: "Process quote acceptance and convert to active work",
    duration: "2 min",
    difficulty: "Intermediate",
    category: "Quote & Invoice Refresher",
    completed: false,
    action: "video",
  },
  {
    id: "23",
    title: "Convert a Quote to an Invoice",
    description: "Transform accepted quotes into billing invoices",
    duration: "2-3 min",
    difficulty: "Intermediate",
    category: "Quote & Invoice Refresher",
    completed: false,
    action: "video",
  },
  {
    id: "24",
    title: "How VAT & Tax Are Handled",
    description: "Understand tax calculations and VAT management in the system",
    duration: "3 min",
    difficulty: "Intermediate",
    category: "Quote & Invoice Refresher",
    completed: false,
    action: "video",
  },
  {
    id: "25",
    title: "Download an Invoice",
    description: "Export invoices as PDF documents for customer delivery",
    duration: "2 min",
    difficulty: "Beginner",
    category: "Quote & Invoice Refresher",
    completed: false,
    featured: true,
    action: "video",
  },
  {
    id: "26",
    title: "Export Invoice Data",
    description: "Extract invoice information for external accounting systems",
    duration: "2-3 min",
    difficulty: "Intermediate",
    category: "Quote & Invoice Refresher",
    completed: false,
    action: "video",
  },
  {
    id: "27",
    title: "View Engineers & Their Jobs",
    description: "Monitor engineer workloads and current job assignments",
    duration: "2-3 min",
    difficulty: "Beginner",
    category: "Engineer & Scheduler Toolkit",
    completed: false,
    action: "video",
  },
  {
    id: "28",
    title: "Planner Overview (Drag & Drop Tips)",
    description: "Master the drag-and-drop scheduling interface for efficiency",
    duration: "3-4 min",
    difficulty: "Intermediate",
    category: "Engineer & Scheduler Toolkit",
    completed: false,
    action: "video",
  },
  {
    id: "29",
    title: "Assign or Reassign a Job",
    description: "Allocate jobs to engineers and make reassignments when needed",
    duration: "2 min",
    difficulty: "Beginner",
    category: "Engineer & Scheduler Toolkit",
    completed: false,
    action: "video",
  },
  {
    id: "30",
    title: "Mark a Job as Completed",
    description: "Process job completion and update status correctly",
    duration: "1-2 min",
    difficulty: "Beginner",
    category: "Engineer & Scheduler Toolkit",
    completed: false,
    action: "video",
  },
  {
    id: "31",
    title: "What Engineers See on the Mobile App",
    description: "Understand the engineer mobile experience and capabilities",
    duration: "3 min",
    difficulty: "Beginner",
    category: "Engineer & Scheduler Toolkit",
    completed: false,
    action: "video",
  },
  {
    id: "32",
    title: "Add or Deactivate Staff Users",
    description: "Manage user accounts and control system access",
    duration: "2-3 min",
    difficulty: "Advanced",
    category: "System Admin Shortcuts",
    completed: false,
    action: "video",
  },
  {
    id: "33",
    title: "Change User Permissions",
    description: "Configure access levels and feature permissions for users",
    duration: "3-4 min",
    difficulty: "Advanced",
    category: "System Admin Shortcuts",
    completed: false,
    action: "video",
  },
  {
    id: "34",
    title: "Add Payment Terms to Invoices",
    description: "Set up and manage payment terms for customer billing",
    duration: "2 min",
    difficulty: "Intermediate",
    category: "System Admin Shortcuts",
    completed: false,
    action: "video",
  },
  {
    id: "35",
    title: "Update Rates, Priorities or Statuses",
    description: "Modify system settings for rates, job priorities, and status options",
    duration: "3 min",
    difficulty: "Advanced",
    category: "System Admin Shortcuts",
    completed: false,
    action: "video",
  },
  {
    id: "36",
    title: "Download Job Reports",
    description: "Generate and export comprehensive job reporting data",
    duration: "2-3 min",
    difficulty: "Intermediate",
    category: "Reports, Data & Sync",
    completed: false,
    action: "video",
  },
  {
    id: "37",
    title: "What Sync History Tells You",
    description: "Understand synchronization logs and troubleshoot sync issues",
    duration: "2 min",
    difficulty: "Intermediate",
    category: "Reports, Data & Sync",
    completed: false,
    action: "video",
  },
  {
    id: "38",
    title: "How to Reimport Customers or Jobs",
    description: "Re-import data when updates or corrections are needed",
    duration: "3 min",
    difficulty: "Advanced",
    category: "Reports, Data & Sync",
    completed: false,
    action: "video",
  },
  {
    id: "39",
    title: "Import vs Export History Explained",
    description: "Understand the difference between import and export operations",
    duration: "2 min",
    difficulty: "Intermediate",
    category: "Reports, Data & Sync",
    completed: false,
    action: "video",
  },
  {
    id: "40",
    title: "How to Use the Menu & Search Bar",
    description: "Navigate the interface efficiently using menus and search",
    duration: "2 min",
    difficulty: "Beginner",
    category: "Quick Navigation Help",
    completed: false,
    action: "video",
  },
  {
    id: "41",
    title: "Joblogic Mobile vs Desktop View",
    description: "Understand differences between mobile and desktop interfaces",
    duration: "3 min",
    difficulty: "Beginner",
    category: "Quick Navigation Help",
    completed: false,
    action: "video",
  },
  {
    id: "42",
    title: "Need Support? Where to Go",
    description: "Find help resources and contact support when needed",
    duration: "1 min",
    difficulty: "Beginner",
    category: "Quick Navigation Help",
    completed: false,
    action: "video",
  },
  {
    id: "43",
    title: "Create a Custom Electronic Form",
    description: "Design custom forms for data collection and job documentation",
    duration: "7-8 min",
    difficulty: "Advanced",
    category: "Bespoke Customisation",
    completed: false,
    action: "video",
  },
  {
    id: "44",
    title: "Deploy a Form Against a Visit or Asset",
    description: "Assign custom forms to specific visits or asset types",
    duration: "4-5 min",
    difficulty: "Advanced",
    category: "Bespoke Customisation",
    completed: false,
    action: "video",
  },
  {
    id: "45",
    title: "Customise Document Templates (Quotes, Invoices, Job Sheets)",
    description: "Personalize document templates to match your brand and requirements",
    duration: "6-7 min",
    difficulty: "Advanced",
    category: "Bespoke Customisation",
    completed: false,
    action: "video",
  },
]

const initialLearningPaths: LearningPath[] = [
  {
    id: "everyday-essentials",
    title: "Everyday Essentials",
    description: "Master the daily actions for managing jobs and customer interactions",
    tutorials: ["11", "12", "13", "14"],
    progress: 0,
    estimatedTime: "",
  },
  {
    id: "customer-asset-management",
    title: "Customer, Site & Asset Management",
    description: "Build confidence in maintaining your customer and asset database",
    tutorials: ["15", "16", "17", "18", "19", "20"],
    progress: 0,
    estimatedTime: "",
  },
  {
    id: "quotes-invoices",
    title: "Quote & Invoice Refresher",
    description: "Handle quotes and billing processes smoothly",
    tutorials: ["21", "22", "23", "24", "25", "26"],
    progress: 0,
    estimatedTime: "",
  },
  {
    id: "engineer-scheduler",
    title: "Engineer & Scheduler Toolkit",
    description: "Efficiently manage job allocations and field teams",
    tutorials: ["27", "28", "29", "30", "31"],
    progress: 0,
    estimatedTime: "",
  },
]

interface TutorialsVideosScreenProps {
  isLoggingJobCompleted: boolean
  isCreatingCustomerCompleted: boolean
  onNavigateToLogJob: (withGuide?: boolean) => void
  onNavigateToAddCustomer: (withGuide?: boolean) => void
}

export function TutorialsVideosScreen({
  isLoggingJobCompleted,
  isCreatingCustomerCompleted,
  onNavigateToLogJob,
  onNavigateToAddCustomer,
}: TutorialsVideosScreenProps) {
  const [activeTab, setActiveTab] = useState("overview")
  const [tutorials, setTutorials] = useState<Tutorial[]>(allTutorials)
  const [learningPaths, setLearningPaths] = useState<LearningPath[]>(initialLearningPaths)
  const [selectedTutorial, setSelectedTutorial] = useState<any>(null)
  const [showVideoDialog, setShowVideoDialog] = useState(false)
  const [showJobGuidedTourDialog, setShowJobGuidedTourDialog] = useState(false)
  const [showCustomerGuidedTourDialog, setShowCustomerGuidedTourDialog] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [collapsedCategories, setCollapsedCategories] = useState<Set<number>>(new Set())

  const filteredCategories = tutorialCategories
    .map((category) => ({
      ...category,
      items: category.items.filter((item) => item.title.toLowerCase().includes(searchTerm.toLowerCase())),
    }))
    .filter((category) => category.items.length > 0)

  // Effect to update tutorial completion based on props
  useEffect(() => {
    setTutorials((prevTutorials) =>
      prevTutorials.map((tutorial) => {
        if (tutorial.id === "3") {
          return { ...tutorial, completed: isLoggingJobCompleted }
        }
        if (tutorial.id === "2") {
          return { ...tutorial, completed: isCreatingCustomerCompleted }
        }
        return tutorial
      }),
    )
  }, [isLoggingJobCompleted, isCreatingCustomerCompleted])

  // Function to calculate remaining time based on current 'tutorials' state
  const calculateRemainingTime = (pathTutorialIds: string[]) => {
    let totalDurationMinutes = 0
    let completedDurationMinutes = 0

    pathTutorialIds.forEach((id) => {
      const tutorial = tutorials.find((t) => t.id === id)
      if (tutorial) {
        const durationMatch = tutorial.duration.match(/(\d+)\s*min/)
        const duration = durationMatch ? Number.parseInt(durationMatch[1]) : 0
        totalDurationMinutes += duration

        if (tutorial.completed) {
          completedDurationMinutes += duration
        }
      }
    })

    const remainingDurationMinutes = totalDurationMinutes - completedDurationMinutes

    if (remainingDurationMinutes <= 0) return "Completed"
    return `${remainingDurationMinutes} min remaining`
  }

  // Effect to recalculate learning path progress whenever 'tutorials' state changes
  useEffect(() => {
    const updatedLearningPaths = initialLearningPaths.map((path) => {
      const completedInPath = path.tutorials.filter((tutorialId) => {
        const tutorial = tutorials.find((t) => t.id === tutorialId)
        return tutorial?.completed || false
      }).length
      const totalInPath = path.tutorials.length
      const pathProgress = totalInPath > 0 ? Math.round((completedInPath / totalInPath) * 100) : 0

      const estimatedTime = calculateRemainingTime(path.tutorials)

      return {
        ...path,
        progress: pathProgress,
        estimatedTime: estimatedTime,
      }
    })
    setLearningPaths(updatedLearningPaths)
  }, [tutorials])

  const toggleTutorialComplete = (tutorialId: string) => {
    if (tutorialId === "3") {
      // Show guided tour confirmation dialog for "Logging Your First Job"
      setShowJobGuidedTourDialog(true)
      return
    }

    if (tutorialId === "2") {
      // Show guided tour confirmation dialog for "Creating Your First Customer"
      setShowCustomerGuidedTourDialog(true)
      return
    }

    setTutorials((prevTutorials) =>
      prevTutorials.map((tutorial) =>
        tutorial.id === tutorialId ? { ...tutorial, completed: !tutorial.completed } : tutorial,
      ),
    )
  }

  const handleStartJobGuidedTour = () => {
    setShowJobGuidedTourDialog(false)
    onNavigateToLogJob(true)
  }

  const handleStartCustomerGuidedTour = () => {
    setShowCustomerGuidedTourDialog(false)
    onNavigateToAddCustomer(true)
  }

  const toggleCategoryCollapse = (categoryIndex: number) => {
    const newCollapsed = new Set(collapsedCategories)
    if (newCollapsed.has(categoryIndex)) {
      newCollapsed.delete(categoryIndex)
    } else {
      newCollapsed.add(categoryIndex)
    }
    setCollapsedCategories(newCollapsed)
  }

  const completedCount = tutorials.filter((t) => t.completed).length
  const totalCount = tutorials.length
  const overallProgress = Math.round((completedCount / totalCount) * 100)

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-100 text-green-800"
      case "Intermediate":
        return "bg-yellow-100 text-yellow-800"
      case "Advanced":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Everyday Essentials":
        return <Star className="w-4 h-4" />
      case "Customer, Site & Asset Management":
        return <Users className="w-4 h-4" />
      case "Quote & Invoice Refresher":
        return <FileText className="w-4 h-4" />
      case "Engineer & Scheduler Toolkit":
        return <Calendar className="w-4 h-4" />
      case "System Admin Shortcuts":
        return <Settings className="w-4 h-4" />
      case "Reports, Data & Sync":
        return <BarChart3 className="w-4 h-4" />
      case "Quick Navigation Help":
        return <HelpCircle className="w-4 h-4" />
      case "Bespoke Customisation":
        return <Settings className="w-4 h-4" />
      case "Getting Started":
        return <Star className="w-4 h-4" />
      case "Customer Management":
        return <Users className="w-4 h-4" />
      case "Job Management":
        return <Calendar className="w-4 h-4" />
      case "Site Management":
        return <Settings className="w-4 h-4" />
      case "Engineer Management":
        return <Users className="w-4 h-4" />
      case "Sales":
        return <FileText className="w-4 h-4" />
      case "Billing":
        return <FileText className="w-4 h-4" />
      case "Analytics":
        return <BarChart3 className="w-4 h-4" />
      case "Mobile":
        return <Settings className="w-4 h-4" />
      case "Automation":
        return <Settings className="w-4 h-4" />
      default:
        return <BookOpen className="w-4 h-4" />
    }
  }

  const handleCardClick = (tutorial: Tutorial) => {
    if (tutorial.action === "navigate-log-job") {
      setShowJobGuidedTourDialog(true)
    } else if (tutorial.action === "navigate-add-customer") {
      setShowCustomerGuidedTourDialog(true)
    } else {
      setSelectedTutorial(tutorial)
      setShowVideoDialog(true)
    }
  }

  const handleCloseVideoDialog = () => {
    setShowVideoDialog(false)
    setSelectedTutorial(null)
  }

  const handleTutorialClick = (tutorialTitle: string) => {
    if (tutorialTitle === "Logging your First Job") {
      setShowJobGuidedTourDialog(true)
    } else if (tutorialTitle === "Creating Your First Customer") {
      setShowCustomerGuidedTourDialog(true)
    } else {
      console.log(`Starting tutorial: ${tutorialTitle}`)
    }
  }

  return (
    <div className="h-full bg-gray-50 overflow-auto">
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Tutorials & Videos</h1>
          <p className="text-gray-600">Master joblogic with our comprehensive learning resources</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="learning-paths">Learning Paths</TabsTrigger>
            <TabsTrigger value="all-tutorials">All Tutorials</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            {/* Progress Overview */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-teal-600" />
                  Your Learning Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-teal-600 mb-2">{overallProgress}%</div>
                    <div className="text-sm text-gray-600">Overall Progress</div>
                    <Progress value={overallProgress} className="mt-2" />
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600 mb-2">{completedCount}</div>
                    <div className="text-sm text-gray-600">Tutorials Completed</div>
                    <div className="text-xs text-gray-500 mt-1">out of {totalCount} total</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600 mb-2">
                      {learningPaths.filter((path) => path.progress > 0).length}
                    </div>
                    <div className="text-sm text-gray-600">Paths Started</div>
                    <div className="text-xs text-gray-500 mt-1">out of {learningPaths.length} available</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Featured Tutorials */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-500" />
                  Featured Tutorials
                </CardTitle>
                <CardDescription>Start with these essential tutorials</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {tutorials
                    .filter((tutorial) => tutorial.featured)
                    .map((tutorial) => (
                      <Card key={tutorial.id} className="hover:shadow-md transition-shadow">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-2">
                              {getCategoryIcon(tutorial.category || "")}
                              <Badge className={getDifficultyColor(tutorial.difficulty || "")}>
                                {tutorial.difficulty}
                              </Badge>
                            </div>
                            {tutorial.completed && <CheckCircle className="w-5 h-5 text-green-600" />}
                          </div>
                          <h3 className="font-semibold mb-2">{tutorial.title}</h3>
                          <p className="text-sm text-gray-600 mb-3">{tutorial.description}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1 text-sm text-gray-500">
                              <Clock className="w-4 h-4" />
                              {tutorial.duration}
                            </div>
                            <Button
                              size="sm"
                              variant={tutorial.completed ? "outline" : "default"}
                              className={
                                tutorial.completed
                                  ? "bg-green-50 text-green-700 border-green-200"
                                  : "bg-teal-600 hover:bg-teal-700"
                              }
                              onClick={() => toggleTutorialComplete(tutorial.id)}
                            >
                              {tutorial.completed ? (
                                <>
                                  <CheckCircle className="w-4 h-4 mr-1" />
                                  Completed
                                </>
                              ) : (
                                <>
                                  <Play className="w-4 h-4 mr-1" />
                                  Start
                                </>
                              )}
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center">
                      <BookOpen className="w-5 h-5 text-teal-600" />
                    </div>
                    <div>
                      <div className="font-semibold">Next Recommended</div>
                      <div className="text-sm text-gray-600">
                        {tutorials.find((t) => !t.completed)?.title || "All completed!"}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <Award className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <div className="font-semibold">Achievements</div>
                    <div className="text-sm text-gray-600">2 badges earned</div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <Clock className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <div className="font-semibold">Time Invested</div>
                      <div className="text-sm text-gray-600">27 minutes</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="learning-paths">
            <div className="space-y-6">
              {learningPaths.map((path) => (
                <Card key={path.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          <Target className="w-5 h-5 text-teal-600" />
                          {path.title}
                        </CardTitle>
                        <CardDescription>{path.description}</CardDescription>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-teal-600">{path.progress}%</div>
                        <div className="text-sm text-gray-500">{path.estimatedTime}</div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Progress value={path.progress} className="mb-4" />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {path.tutorials.map((tutorialId) => {
                        const tutorial = tutorials.find((t) => t.id === tutorialId)
                        if (!tutorial) return null

                        return (
                          <Card key={tutorial.id} className="hover:shadow-md transition-shadow cursor-pointer">
                            <CardContent className="p-4">
                              <div className="flex items-start justify-between mb-3">
                                <Badge className={getDifficultyColor(tutorial.difficulty || "")}>
                                  {tutorial.difficulty}
                                </Badge>
                                {tutorial.completed && <CheckCircle className="w-5 h-5 text-green-600" />}
                              </div>
                              <h4 className="font-medium mb-2">{tutorial.title}</h4>
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-1 text-sm text-gray-500">
                                  <Clock className="w-4 h-4" />
                                  {tutorial.duration}
                                </div>
                                <Button
                                  size="sm"
                                  variant={tutorial.completed ? "outline" : "default"}
                                  className={
                                    tutorial.completed
                                      ? "bg-green-50 text-green-700 border-green-200"
                                      : "bg-teal-600 hover:bg-teal-700"
                                  }
                                  onClick={() => toggleTutorialComplete(tutorial.id)}
                                >
                                  {tutorial.completed ? (
                                    <CheckCircle className="w-4 h-4" />
                                  ) : (
                                    <Play className="w-4 h-4" />
                                  )}
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        )
                      })}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="all-tutorials">
            {/* Search Bar */}
            <div className="mb-6">
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search tutorials and videos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Tutorial Categories */}
            <div className="space-y-6">
              {filteredCategories.map((category, categoryIndex) => {
                const isCollapsed = collapsedCategories.has(categoryIndex)
                
                return (
                  <Card key={categoryIndex} className="overflow-hidden">
                    <CardHeader 
                      className="bg-gray-50 border-b cursor-pointer hover:bg-gray-100 transition-colors"
                      onClick={() => toggleCategoryCollapse(categoryIndex)}
                    >
                      <CardTitle className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg ${category.bgColor}`}>
                            <category.icon className={`w-5 h-5 ${category.color}`} />
                          </div>
                          {category.title}
                          <span className="text-sm font-normal text-gray-500">
                            ({category.items.length} items)
                          </span>
                        </div>
                        {isCollapsed ? (
                          <ChevronRight className="w-5 h-5 text-gray-400" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-gray-400" />
                        )}
                      </CardTitle>
                      {category.description && (
                        <CardDescription className="text-gray-600 ml-11">
                          {category.description}
                        </CardDescription>
                      )}
                    </CardHeader>
                    
                    {!isCollapsed && (
                      <CardContent className="p-0">
                        <div className="divide-y divide-gray-100">
                          {category.items.map((item, itemIndex) => (
                            <div
                              key={itemIndex}
                              className="flex items-center justify-between p-4 hover:bg-gray-50 cursor-pointer transition-colors group"
                              onClick={() => handleTutorialClick(item.title)}
                            >
                              <div className="flex items-center gap-4">
                                <div
                                  className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                                    item.type === "video" ? "bg-blue-100" : "bg-green-100"
                                  }`}
                                >
                                  {item.type === "video" ? (
                                    <Video className="w-5 h-5 text-blue-600" />
                                  ) : (
                                    <FileText className="w-5 h-5 text-green-600" />
                                  )}
                                </div>
                                <div>
                                  <h4 className="font-medium text-gray-900 mb-1">{item.title}</h4>
                                  <div className="flex items-center gap-3 text-sm text-gray-500">
                                    <div className="flex items-center gap-1">
                                      <Clock className="w-3 h-3" />
                                      <span>{item.duration}</span>
                                    </div>
                                    <span className="capitalize px-2 py-1 bg-gray-100 rounded-full text-xs">
                                      {item.type}
                                    </span>
                                    {item.featured && (
                                      <Badge variant="secondary" className="text-xs bg-yellow-100 text-yellow-700">
                                        Featured
                                      </Badge>
                                    )}
                                  </div>
                                </div>
                              </div>
                              <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                                <Play className="w-4 h-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    )}
                  </Card>
                )
              })}
            </div>

            {/* No Results */}
            {filteredCategories.length === 0 && (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No tutorials found</h3>
                <p className="text-gray-500">Try adjusting your search terms</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="achievements">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Star className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-bold text-yellow-800 mb-2">First Steps</h3>
                  <p className="text-sm text-yellow-700 mb-3">Completed your first tutorial</p>
                  <Badge className="bg-yellow-500 text-white">Earned</Badge>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-bold text-green-800 mb-2">Customer Champion</h3>
                  <p className="text-sm text-green-700 mb-3">Mastered customer management</p>
                  <Badge className="bg-green-500 text-white">Earned</Badge>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-gray-50 to-gray-100 border-gray-200">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-gray-400 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Calendar className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-bold text-gray-600 mb-2">Job Master</h3>
                  <p className="text-sm text-gray-600 mb-3">Complete job management tutorials</p>
                  <Badge variant="outline" className="border-gray-400 text-gray-600">
                    Pending
                  </Badge>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-gray-50 to-gray-100 border-gray-200">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-gray-400 rounded-full flex items-center justify-center mx-auto mb-4">
                    <BarChart3 className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-bold text-gray-600 mb-2">Analytics Expert</h3>
                  <p className="text-sm text-gray-600 mb-3">Master reporting and analytics</p>
                  <Badge variant="outline" className="border-gray-400 text-gray-600">
                    Pending
                  </Badge>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-gray-50 to-gray-100 border-gray-200">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-gray-400 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Award className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-bold text-gray-600 mb-2">Power User</h3>
                  <p className="text-sm text-gray-600 mb-3">Complete all tutorials</p>
                  <Badge variant="outline" className="border-gray-400 text-gray-600">
                    Pending
                  </Badge>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-gray-50 to-gray-100 border-gray-200">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-gray-400 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Target className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-bold text-gray-600 mb-2">Path Finder</h3>
                  <p className="text-sm text-gray-600 mb-3">Complete all learning paths</p>
                  <Badge variant="outline" className="border-gray-400 text-gray-600">
                    Pending
                  </Badge>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Guided Tour Confirmation Dialog for Job Logging */}
      <Dialog open={showJobGuidedTourDialog} onOpenChange={setShowJobGuidedTourDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-teal-600" />
              Start Guided Job Logging Tutorial
            </DialogTitle>
            <DialogDescription>
              We'll walk you through the job logging process step-by-step with interactive guides and helpful tips. This
              hands-on tutorial will help you log your first job with confidence.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-3 my-4">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <CheckCircle className="w-4 h-4 text-green-600" />
              Interactive step-by-step guidance
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <CheckCircle className="w-4 h-4 text-green-600" />
              Helpful tips and best practices
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <CheckCircle className="w-4 h-4 text-green-600" />
              Real-time form assistance
            </div>
          </div>
          <DialogFooter className="flex gap-2">
            <Button variant="outline" onClick={() => setShowJobGuidedTourDialog(false)}>
              Maybe Later
            </Button>
            <Button onClick={handleStartJobGuidedTour} className="bg-teal-600 hover:bg-teal-700">
              Start Guided Tour
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Guided Tour Confirmation Dialog for Customer Creation */}
      <Dialog open={showCustomerGuidedTourDialog} onOpenChange={setShowCustomerGuidedTourDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-teal-600" />
              Start Guided Customer Creation Tutorial
            </DialogTitle>
            <DialogDescription>
              Let's walk you through adding your first customer step-by-step. This interactive guide will help you
              confidently create new customer records.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-3 my-4">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <CheckCircle className="w-4 h-4 text-green-600" />
              Interactive step-by-step guidance
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <CheckCircle className="w-4 h-4 text-green-600" />
              Essential fields walkthrough
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <CheckCircle className="w-4 h-4 text-green-600" />
              Real-time form assistance
            </div>
          </div>
          <DialogFooter className="flex gap-2">
            <Button variant="outline" onClick={() => setShowCustomerGuidedTourDialog(false)}>
              Maybe Later
            </Button>
            <Button onClick={handleStartCustomerGuidedTour} className="bg-teal-600 hover:bg-teal-700">
              Start Guided Tour
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Video Playback Dialog */}
      <Dialog open={showVideoDialog} onOpenChange={setShowVideoDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{selectedTutorial?.title}</DialogTitle>
            <DialogDescription>{selectedTutorial?.description}</DialogDescription>
          </DialogHeader>
          <div className="aspect-video w-full bg-gray-200 flex items-center justify-center text-gray-500">
            {/* Placeholder for video player */}
            Video Player for {selectedTutorial?.title}
          </div>
          <DialogFooter>
            <Button onClick={handleCloseVideoDialog}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
