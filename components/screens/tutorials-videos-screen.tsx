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
} from "lucide-react"

const tutorialCategories = [
  {
    title: "Getting Started",
    items: [
      { title: "Logging your First Job", type: "tutorial", duration: "5 min", featured: true },
      { title: "Creating Your First Customer", type: "tutorial", duration: "3 min" },
      { title: "Setting Up Your Dashboard", type: "tutorial", duration: "4 min" },
      { title: "Understanding Job Status", type: "tutorial", duration: "6 min" },
    ],
  },
  {
    title: "Job Management",
    items: [
      { title: "Advanced Job Logging", type: "video", duration: "8 min" },
      { title: "Job Scheduling & Allocation", type: "video", duration: "10 min" },
      { title: "Managing Job Templates", type: "tutorial", duration: "7 min" },
      { title: "Job Reporting & Analytics", type: "video", duration: "12 min" },
    ],
  },
  {
    title: "Customer Management",
    items: [
      { title: "Customer Database Setup", type: "tutorial", duration: "6 min" },
      { title: "Site Management", type: "video", duration: "9 min" },
      { title: "Customer Communication", type: "tutorial", duration: "5 min" },
      { title: "Contract Management", type: "video", duration: "11 min" },
    ],
  },
  {
    title: "System Configuration",
    items: [
      { title: "User Roles & Permissions", type: "tutorial", duration: "8 min" },
      { title: "Custom Fields Setup", type: "video", duration: "7 min" },
      { title: "Integration Settings", type: "tutorial", duration: "10 min" },
      { title: "Mobile App Configuration", type: "video", duration: "6 min" },
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
    id: "1",
    title: "Getting Started with joblogic",
    description: "Learn the basics of navigating the joblogic platform and setting up your account",
    duration: "15 min",
    completed: true,
    featured: true,
    action: "video",
  },
  {
    id: "2",
    title: "Creating Your First Customer",
    description: "Step-by-step guide to adding customers and managing customer information",
    duration: "12 min",
    difficulty: "Beginner",
    category: "Customer Management",
    completed: true,
    action: "navigate-add-customer",
  },
  {
    id: "3",
    title: "Logging Your First Job",
    description: "Complete walkthrough of the job logging process from start to finish",
    duration: "18 min",
    difficulty: "Beginner",
    category: "Job Management",
    completed: false,
    action: "navigate-log-job",
  },
  {
    id: "4",
    title: "Managing Sites and Assets",
    description: "How to organize and track customer sites and associated assets",
    duration: "20 min",
    difficulty: "Intermediate",
    category: "Site Management",
    completed: false,
    action: "video",
  },
  {
    id: "5",
    title: "Engineer Scheduling and Dispatch",
    description: "Learn how to efficiently schedule and dispatch engineers to jobs",
    duration: "25 min",
    difficulty: "Intermediate",
    category: "Engineer Management",
    completed: false,
    action: "video",
  },
  {
    id: "6",
    title: "Creating Quotes and Estimates",
    description: "Master the art of creating professional quotes and managing estimates",
    duration: "22 min",
    difficulty: "Intermediate",
    category: "Sales",
    completed: false,
    action: "video",
  },
  {
    id: "7",
    title: "Invoice Generation and Management",
    description: "Complete guide to generating invoices and managing billing processes",
    duration: "16 min",
    difficulty: "Intermediate",
    category: "Billing",
    completed: false,
    action: "video",
  },
  {
    id: "8",
    title: "Reporting and Analytics",
    description: "Unlock powerful insights with advanced reporting features and KPI tracking",
    duration: "30 min",
    difficulty: "Intermediate",
    category: "Analytics",
    completed: false,
    action: "video",
  },
  {
    id: "9",
    title: "Mobile App Setup",
    description: "Learn how to use the mobile app for field operations and real-time updates",
    duration: "14 min",
    difficulty: "Beginner",
    category: "Mobile",
    completed: false,
    action: "video",
  },
  {
    id: "10",
    title: "Automation and Workflows",
    description: "Set up automated workflows to streamline your business processes",
    duration: "28 min",
    difficulty: "Advanced",
    category: "Automation",
    completed: false,
    action: "video",
  },
]

const initialLearningPaths: LearningPath[] = [
  {
    id: "essential",
    title: "Essential Setup",
    description: "Get your joblogic account ready for daily operations",
    tutorials: ["1", "2", "3"],
    progress: 0,
    estimatedTime: "",
  },
  {
    id: "operations",
    title: "Daily Operations",
    description: "Master the core features for day-to-day business management",
    tutorials: ["4", "5", "9"],
    progress: 0,
    estimatedTime: "",
  },
  {
    id: "business",
    title: "Business Growth",
    description: "Advanced features to scale and optimize your business",
    tutorials: ["6", "7", "8", "10"],
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
                    .filter((tutorial) => tutorial.featured || tutorial.id === "3" || tutorial.id === "2")
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

            {/* Featured Tutorial - Logging your First Job */}
            <Card className="mb-6 border-teal-200 bg-teal-50">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center">
                      <Play className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-teal-800">Featured Tutorial</CardTitle>
                      <p className="text-sm text-teal-600">Perfect for getting started</p>
                    </div>
                  </div>
                  <Badge className="bg-teal-600 text-white">New</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-lg text-teal-800 mb-1">Logging your First Job</h3>
                    <p className="text-teal-600 text-sm mb-2">Step-by-step guide to create your first job entry</p>
                    <div className="flex items-center gap-4 text-sm text-teal-600">
                      <span className="flex items-center gap-1">
                        <BookOpen className="w-4 h-4" />
                        Interactive Tutorial
                      </span>
                      <span>5 min</span>
                    </div>
                  </div>
                  <Button
                    className="bg-teal-600 hover:bg-teal-700"
                    onClick={() => handleTutorialClick("Logging your First Job")}
                  >
                    Start Tutorial
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Tutorial Categories */}
            <div className="space-y-6">
              {filteredCategories.map((category, categoryIndex) => (
                <Card key={categoryIndex}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <HelpCircle className="w-5 h-5 text-teal-600" />
                      {category.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {category.items.map((item, itemIndex) => (
                        <div
                          key={itemIndex}
                          className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                          onClick={() => handleTutorialClick(item.title)}
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                item.type === "video" ? "bg-blue-100" : "bg-green-100"
                              }`}
                            >
                              {item.type === "video" ? (
                                <Video
                                  className={`w-4 h-4 ${item.type === "video" ? "text-blue-600" : "text-green-600"}`}
                                />
                              ) : (
                                <FileText
                                  className={`w-4 h-4 ${item.type === "video" ? "text-blue-600" : "text-green-600"}`}
                                />
                              )}
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900">{item.title}</h4>
                              <div className="flex items-center gap-2 text-sm text-gray-500">
                                <span className="capitalize">{item.type}</span>
                                <span>•</span>
                                <span>{item.duration}</span>
                                {item.featured && (
                                  <>
                                    <span>•</span>
                                    <Badge variant="secondary" className="text-xs">
                                      Featured
                                    </Badge>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm">
                            <Play className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
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
                    Locked
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
                    Locked
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
                    Locked
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
                    Locked
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
