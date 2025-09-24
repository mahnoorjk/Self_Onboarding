"use client"

import { useOnboarding } from "../onboarding-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { CheckCircle, ArrowRight, Users, FileText, TrendingUp, DollarSign, BarChart3, Play, Clock, Target, Zap, GraduationCap, Calendar, X, CheckCircle2, AlertCircle, MapPin } from "lucide-react"
import { useState } from "react"

interface CompletionScreenProps {
  onOnboardingCompletion?: () => void
  onNavigateToTutorials?: () => void
  onNavigateToThirtyDayJourney?: () => void
  setShowOnboardingModal?: (show: boolean) => void
  onNavigateToAddCustomer?: (showGuide?: boolean) => void
  onNavigateToLogJob?: (showGuide?: boolean) => void
  onNavigateToLogQuote?: (showGuide?: boolean) => void
  onNavigateToReports?: (showGuide?: boolean) => void
  onTaskCompleted?: (taskId: string) => void
  completedTasks?: string[]
  onNavigateToInvoiceTutorial?: () => void
}

interface ActionTask {
  id: string
  title: string
  description: string
  icon: any
  estimatedTime: string
  isRequired: boolean
  status: 'pending' | 'completed'
  onClick: () => void
}

export function CompletionScreen({ 
  onOnboardingCompletion, 
  onNavigateToTutorials, 
  onNavigateToThirtyDayJourney, 
  setShowOnboardingModal,
  onNavigateToAddCustomer,
  onNavigateToLogJob,
  onNavigateToLogQuote,
  onNavigateToReports,
  onTaskCompleted,
  completedTasks = [],
  onNavigateToInvoiceTutorial
}: CompletionScreenProps = {}) {
  const { setCurrentStep, data } = useOnboarding()
  const [showVideoModal, setShowVideoModal] = useState(false)
  const [showFollowUpModal, setShowFollowUpModal] = useState(false)
  const [showProgressCongratulations, setShowProgressCongratulations] = useState(false)
  // Simulated video progress state (replace with actual video player logic)
  const [videoProgress, setVideoProgress] = useState(0) // percent watched

  const handleGoBack = () => {
    setCurrentStep(3) // Go back to Work in Progress screen (now step 3)
  }

  const markTaskCompleted = (taskId: string) => {
    if (onTaskCompleted) {
      onTaskCompleted(taskId)
    }
  }

  const handleProgressContinue = () => {
    setShowProgressCongratulations(false)
    // Mark the invoice task as completed if not already done
    markTaskCompleted("create-invoice")
    // Could add navigation to dashboard here
  }

  const handleProgressBackToTutorials = () => {
    setShowProgressCongratulations(false)
    // Mark the invoice task as completed if not already done
    markTaskCompleted("create-invoice")
    if (onNavigateToTutorials) {
      onNavigateToTutorials()
    }  
  }

  const hasWIPJobs = data.workInProgress?.hasWIPJobs
  const wipCounts = data.workInProgress?.counts
  const hasQuotes = wipCounts?.pendingQuotes && wipCounts.pendingQuotes > 0
  const hasInvoices = wipCounts?.pendingInvoices && wipCounts.pendingInvoices > 0
  const hasActiveJobs = wipCounts && (wipCounts.inProgress > 0 || wipCounts.scheduled > 0)

  // Define action tasks based on user's workload
  const actionTasks: ActionTask[] = [
    {
      id: "add-customer",
      title: "Add a Customer",
      description: hasWIPJobs 
        ? "Bring one of your real customers into the system"
        : "Create a sample customer to get started",
      icon: Users,
      estimatedTime: "2 min",
      isRequired: true,
      status: completedTasks.includes("add-customer") ? 'completed' : 'pending',
      onClick: () => {
        console.log("Add customer task clicked, onNavigateToAddCustomer:", !!onNavigateToAddCustomer)
        if (onNavigateToAddCustomer) {
          console.log("Calling onNavigateToAddCustomer with guided tour")
          onNavigateToAddCustomer(true)
        } else {
          console.log("Navigate to add customer - no navigation function provided")
        }
        markTaskCompleted("add-customer")
      }
    },
    {
      id: "create-quote",
      title: hasQuotes ? "Log Your Pending Quote" : "Create a Sample Quote",
      description: hasQuotes 
        ? `You mentioned ${wipCounts?.pendingQuotes} pending quote${wipCounts?.pendingQuotes !== 1 ? 's' : ''} - let's get one in`
        : "See how easy it is to create professional quotes",
      icon: FileText,
      estimatedTime: "3 min",
      isRequired: true,
      status: completedTasks.includes("create-quote") ? 'completed' : 'pending',
      onClick: () => {
        console.log("Create quote task clicked, onNavigateToLogQuote:", !!onNavigateToLogQuote)
        if (onNavigateToLogQuote) {
          console.log("Calling onNavigateToLogQuote with guided tour")
          onNavigateToLogQuote(true)
        } else {
          console.log("Navigate to quote creation - no navigation function provided")
        }
        markTaskCompleted("create-quote")
      }
    },
    {
      id: "create-job",
      title: hasActiveJobs ? "Add Your Active Jobs" : "Create a Job",
      description: hasActiveJobs
        ? `Bring your ${wipCounts?.inProgress || 0} active and ${wipCounts?.scheduled || 0} scheduled jobs into the system`
        : "Set up a job from start to finish - the core of your business workflow",
      icon: TrendingUp,
      estimatedTime: "4 min",
      isRequired: true,
      status: completedTasks.includes("create-job") ? 'completed' : 'pending',
      onClick: () => {
        console.log("Create job task clicked, onNavigateToLogJob:", !!onNavigateToLogJob)
        if (onNavigateToLogJob) {
          console.log("Calling onNavigateToLogJob with guided tour")
          onNavigateToLogJob(true)
        } else {
          console.log("Navigate to job creation - no navigation function provided")
        }
        markTaskCompleted("create-job")
      }
    },
    {
      id: "create-invoice",
      title: hasInvoices ? "Send Your Pending Invoice" : "Create an Invoice",
      description: hasInvoices
        ? `Get those ${wipCounts?.pendingInvoices} invoice${wipCounts?.pendingInvoices !== 1 ? 's' : ''} sent out`
        : "Learn how to get paid faster with professional invoicing",
      icon: DollarSign,
      estimatedTime: "3 min",
      isRequired: true,
      status: completedTasks.includes("create-invoice") ? 'completed' : 'pending',
      onClick: () => {
        console.log("Navigate to invoice creation")
        setShowVideoModal(true)
        markTaskCompleted("create-invoice")
      }
    },
    {
      id: "explore-reports",
      title: "Check Your Business Health",
      description: "See live reports and KPIs that matter to your business",
      icon: BarChart3,
      estimatedTime: "2 min",
      isRequired: false,
      status: completedTasks.includes("explore-reports") ? 'completed' : 'pending',
      onClick: () => {
        console.log("Reports task clicked, onNavigateToReports:", !!onNavigateToReports)
        if (onNavigateToReports) {
          console.log("Calling onNavigateToReports with guided tour")
          onNavigateToReports(true)
        } else {
          console.log("Navigate to reports - no navigation function provided")
        }
        markTaskCompleted("explore-reports")
      }
    }
  ]

  const completionPercentage = 70 + (completedTasks.length / actionTasks.length) * 30
  const requiredTasks = actionTasks.filter(task => task.isRequired)
  const completedRequiredTasks = requiredTasks.filter(task => completedTasks.includes(task.id))

  return (
    <div className="container mx-auto max-w-5xl p-6">
      {/* Progress Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Almost There!</h1>
            <p className="text-lg text-gray-600">
              {Math.round(completionPercentage)}% setup complete - let's walk through your system
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-teal-600">{completedRequiredTasks.length}/{requiredTasks.length}</div>
            <div className="text-sm text-gray-500">core tasks done</div>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
          <div 
            className="bg-gradient-to-r from-teal-500 to-blue-500 h-3 rounded-full transition-all duration-300"
            style={{ width: `${completionPercentage}%` }}
          ></div>
        </div>
      </div>

      {/* Context Based on User's Data */}
      {hasWIPJobs && (
        <Card className="mb-6 border-purple-200 bg-purple-50">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <Target className="w-6 h-6 text-purple-600 mt-1" />
              <div>
                <h3 className="font-semibold text-purple-800 mb-1">Perfect! You have real work to bring into the system</h3>
                <p className="text-purple-700 text-sm">
                  We'll help you get your actual workload ({wipCounts?.inProgress || 0} active jobs, {wipCounts?.pendingQuotes || 0} quotes, {wipCounts?.pendingInvoices || 0} invoices) 
                  into Joblogic so you can start managing everything in one place.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Main Action Tasks */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Zap className="w-6 h-6 text-orange-500" />
            Let's Get You Started
          </CardTitle>
          <CardDescription>
            Complete these tasks to get your work into Joblogic and start using the system with {hasWIPJobs ? 'your real work' : 'sample scenarios'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Clean Side-by-Side Block Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {actionTasks.map((task, index) => {
              const IconComponent = task.icon
              const isCompleted = task.status === 'completed'
              const isNextTask = !isCompleted && completedTasks.length === index
              const isPending = !isCompleted && completedTasks.length < index
              
              return (
                <div 
                  key={task.id}
                  className={`relative transition-all duration-200 ${
                    !isCompleted && !isPending ? 'hover:scale-102 cursor-pointer' : ''
                  }`}
                  onClick={!isCompleted && !isPending ? task.onClick : undefined}
                >
                  {/* Task Block */}
                  <div className={`relative rounded-lg p-6 border-2 transition-all duration-200 min-h-[180px] ${
                    isCompleted 
                      ? 'bg-green-50 border-green-200 shadow-sm' 
                      : isNextTask
                        ? 'bg-teal-50 border-teal-300 shadow-md ring-2 ring-teal-100'
                        : isPending
                          ? 'bg-gray-50 border-gray-200 opacity-70'
                          : 'bg-white border-gray-200 shadow-sm hover:border-teal-200 hover:shadow-md'
                  }`}>
                    
                    {/* Status Indicator Corner */}
                    <div className="absolute top-4 right-4">
                      {isCompleted && (
                        <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                          <CheckCircle className="w-4 h-4 text-white" />
                        </div>
                      )}
                      {isNextTask && (
                        <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                          !
                        </div>
                      )}
                      {isPending && (
                        <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center text-gray-500 text-xs">
                          ●
                        </div>
                      )}
                    </div>

                    {/* Header Section */}
                    <div className="flex items-start gap-4 mb-4">
                      {/* Step Icon & Number */}
                      <div className="flex-shrink-0 relative">
                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                          isCompleted 
                            ? 'bg-green-100 text-green-600' 
                            : isNextTask
                              ? 'bg-teal-100 text-teal-600'
                              : isPending
                                ? 'bg-gray-100 text-gray-400'
                                : 'bg-blue-100 text-blue-600'
                        }`}>
                          <IconComponent className="w-6 h-6" />
                        </div>
                        <div className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                          isCompleted 
                            ? 'bg-green-500 text-white' 
                            : isNextTask
                              ? 'bg-orange-500 text-white'
                              : 'bg-teal-500 text-white'
                        }`}>
                          {index + 1}
                        </div>
                      </div>

                      {/* Title & Time */}
                      <div className="flex-1 min-w-0">
                        <h3 className={`font-semibold text-lg mb-1 ${
                          isCompleted ? 'text-green-800' : isNextTask ? 'text-teal-800' : isPending ? 'text-gray-500' : 'text-gray-800'
                        }`}>
                          {task.title}
                        </h3>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-500">{task.estimatedTime}</span>
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <p className={`text-sm mb-4 leading-relaxed ${
                      isCompleted ? 'text-green-700' : isNextTask ? 'text-teal-700' : isPending ? 'text-gray-500' : 'text-gray-600'
                    }`}>
                      {task.description}
                    </p>

                    {/* Status & Action Row */}
                    <div className="flex items-center justify-between">
                      {/* Status Badges */}
                      <div className="flex gap-2">
                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                          task.isRequired 
                            ? 'bg-orange-100 text-orange-700' 
                            : 'bg-blue-100 text-blue-700'
                        }`}>
                          {task.isRequired ? 'Required' : 'Optional'}
                        </span>
                        
                        {isCompleted && (
                          <span className="text-xs px-2 py-1 rounded-full font-medium bg-green-100 text-green-700">
                            ✓ Done
                          </span>
                        )}
                        
                        {isNextTask && (
                          <span className="text-xs px-2 py-1 rounded-full font-medium bg-yellow-100 text-yellow-700">
                            → Next
                          </span>
                        )}
                      </div>

                      {/* Action Button */}
                      {!isCompleted && !isPending && (
                        <Button
                          size="sm"
                          className={`${
                            isNextTask 
                              ? 'bg-teal-600 hover:bg-teal-700 ring-2 ring-teal-200' 
                              : 'bg-gray-600 hover:bg-gray-700'
                          }`}
                          onClick={(e) => {
                            e.stopPropagation()
                            task.onClick()
                          }}
                        >
                          <Play className="w-3 h-3 mr-1" />
                          {isNextTask ? 'Start Now' : 'Begin'}
                        </Button>
                      )}

                      {isCompleted && (
                        <div className="text-green-600 text-sm font-medium flex items-center gap-1">
                          <CheckCircle className="w-4 h-4" />
                          Complete
                        </div>
                      )}

                      {isPending && (
                        <div className="text-gray-400 text-sm">
                          Locked
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Connecting Arrow for Flow */}
                  {index < actionTasks.length - 1 && index % 2 === 0 && (
                    <div className="hidden md:block absolute top-1/2 -right-3 z-10">
                      <ArrowRight className="w-6 h-6 text-gray-300" />
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* Progress Flow Indicator */}
          <div className="mt-8 flex items-center justify-center">
            <div className="flex items-center gap-3">
              {actionTasks.filter(task => task.isRequired).map((task, index) => {
                const isCompleted = completedTasks.includes(task.id)
                const isNext = completedTasks.length === index
                
                return (
                  <div key={task.id} className="flex items-center">
                    <div className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                      isCompleted 
                        ? 'bg-green-500' 
                        : isNext 
                          ? 'bg-teal-500' 
                          : 'bg-gray-300'
                    }`} />
                    {index < actionTasks.filter(task => task.isRequired).length - 1 && (
                      <div className={`w-8 h-0.5 mx-1 transition-colors duration-200 ${
                        completedTasks.length > index ? 'bg-green-300' : 'bg-gray-300'
                      }`} />
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          {/* Completion Message */}
          {completedRequiredTasks.length === requiredTasks.length && (
            <div className="mt-8 text-center">
              <div className="inline-flex items-center gap-3 bg-green-50 border border-green-200 rounded-lg px-6 py-4">
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-green-800">All Set!</h3>
                  {/* <p className="text-sm text-green-700">Ready for your 30-day journey</p> */}
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Level 2 Preview - Always Visible */}
      <Card className={`transition-all duration-300 ${
        completedRequiredTasks.length === requiredTasks.length 
          ? 'border-blue-200 bg-blue-50 hover:border-blue-300 cursor-pointer' 
          : 'border-gray-200 bg-gray-50 opacity-75'
      }`}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                completedRequiredTasks.length === requiredTasks.length 
                  ? 'bg-blue-100' 
                  : 'bg-gray-100'
              }`}>
                <GraduationCap className={`w-6 h-6 ${
                  completedRequiredTasks.length === requiredTasks.length 
                    ? 'text-blue-600' 
                    : 'text-gray-400'
                }`} />
              </div>
              <div>
                <h3 className={`text-lg font-semibold ${
                  completedRequiredTasks.length === requiredTasks.length 
                    ? 'text-blue-800' 
                    : 'text-gray-500'
                }`}>
                  Level 2: Master the System
                </h3>
                <p className={`text-sm ${
                  completedRequiredTasks.length === requiredTasks.length 
                    ? 'text-blue-700' 
                    : 'text-gray-400'
                }`}>
                  Quick tutorials & videos on everyday tasks
                </p>
              </div>
            </div>
            {completedRequiredTasks.length === requiredTasks.length ? (
              <div className="text-green-600">
                <CheckCircle className="w-6 h-6" />
              </div>
            ) : (
              <div className="text-gray-400 text-sm font-medium">
                {requiredTasks.length - completedRequiredTasks.length} tasks left
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <Clock className="w-3 h-3" />
              <span>2-5 minutes each</span>
            </div>
            <Button 
              disabled={completedRequiredTasks.length !== requiredTasks.length}
              className={`${
                completedRequiredTasks.length === requiredTasks.length 
                  ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
              onClick={() => {
                if (completedRequiredTasks.length === requiredTasks.length) {
                  if (onNavigateToTutorials) {
                    onNavigateToTutorials()
                  } else {
                    console.log("Navigate to tutorials")
                  }
                }
              }}
            >
              <Play className="w-4 h-4 mr-2" />
              {completedRequiredTasks.length === requiredTasks.length ? 'Access Now' : 'Locked'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Video Tutorial Modal */}
      <Dialog open={showVideoModal} onOpenChange={val => {
        // If closing, check video progress
        if (!val) {
          if (videoProgress < 90) {
            // Video not completed - show follow up modal
            setShowFollowUpModal(true)
          }
          // If video is completed (>=90), progress congratulations is handled by click handlers
        }
        setShowVideoModal(val)
      }}>
        <DialogContent className="sm:max-w-4xl">
          <DialogHeader>
            <DialogTitle className="sr-only">
              Invoice Creation Tutorial
            </DialogTitle>
            <DialogDescription className="sr-only">
              Learn how to create and send professional invoices from completed jobs
            </DialogDescription>
          </DialogHeader>
          <div className="relative">
            {/* Video Section with Enhanced Layout */}
            <div className="relative bg-gradient-to-br from-slate-900 to-slate-800 rounded-lg overflow-hidden">
              {/* Video Placeholder with realistic design */}
              <div 
                className="relative aspect-video bg-black flex items-center justify-center group cursor-pointer hover:bg-gray-900 transition-colors"
                onClick={() => {
                  // Simulate watching video: increase progress by 50% per click for demo
                  const newProgress = Math.min(videoProgress + 50, 100)
                  setVideoProgress(newProgress)
                  // If progress now >= 90, mark as completed and show progress congratulations
                  if (newProgress >= 90) {
                    setShowVideoModal(false)
                    setShowProgressCongratulations(true)
                  }
                }}
              >
                {/* Video thumbnail overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20"></div>
                
                {/* Play button and content */}
                <div className="relative z-10 text-center text-white">
                  <div className="mb-4">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full border border-white/30 group-hover:bg-white/30 group-hover:scale-110 transition-all duration-300">
                      <Play className="w-8 h-8 ml-1 text-white" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Invoice Creation Masterclass</h3>
                  <p className="text-white/80 text-sm max-w-md mx-auto mb-2">
                    Learn how to create professional invoices from completed jobs and streamline your billing process
                  </p>
                  <p className="text-white/60 text-xs">
                    Click to simulate watching tutorial ({videoProgress}% watched)
                  </p>
                </div>

                {/* Video duration badge */}
                <div className="absolute bottom-4 right-4 bg-black/70 text-white text-xs px-2 py-1 rounded">
                  5:32
                </div>

                {/* Progress bar at bottom */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
                  <div className="h-full bg-teal-500" style={{ width: `${videoProgress}%` }}></div>
                </div>
              </div>

              {/* Video Details Section */}
              <div className="p-6 bg-white">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-1">
                      Complete Guide to Invoice Creation
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Master the art of professional invoicing and get paid faster
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Clock className="w-4 h-4" />
                    5 min 32 sec
                  </div>
                </div>

                {/* Learning objectives */}
                <div className="border-t pt-4">
                  <h5 className="font-medium text-gray-900 mb-3">What you'll learn:</h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <CheckCircle2 className="w-4 h-4 text-teal-600" />
                      Convert jobs to invoices instantly
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <CheckCircle2 className="w-4 h-4 text-teal-600" />
                      Add materials and labor costs
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <CheckCircle2 className="w-4 h-4 text-teal-600" />
                      Customize invoice templates
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <CheckCircle2 className="w-4 h-4 text-teal-600" />
                      Send and track payments
                    </div>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex gap-3 mt-6 pt-4 border-t">
                  <Button 
                    className="flex-1 bg-teal-600 hover:bg-teal-700 text-white"
                    onClick={() => {
                      const newProgress = Math.min(videoProgress + 50, 100)
                      setVideoProgress(newProgress)
                      if (newProgress >= 90) {
                        setShowVideoModal(false)
                        setShowProgressCongratulations(true)
                      }
                    }}
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Resume Tutorial
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setShowVideoModal(false)}
                    className="px-6"
                  >
                    Close
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Follow-up Modal if video not completed */}
      <Dialog open={showFollowUpModal} onOpenChange={setShowFollowUpModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-orange-600" />
              Almost Done!
            </DialogTitle>
            <DialogDescription>
              You haven’t finished the onboarding tutorial yet. Watching the full video will help you unlock all features and get started faster.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="text-gray-700 mb-4">
              Would you like to continue watching the tutorial?
            </div>
            <div className="flex gap-3">
              <Button className="flex-1 bg-teal-600 hover:bg-teal-700 text-white" onClick={() => {
                setShowFollowUpModal(false)
                setShowVideoModal(true)
              }}>
                <Play className="w-4 h-4 mr-2" />
                Resume Tutorial
              </Button>
              <Button variant="outline" onClick={() => setShowFollowUpModal(false)}>
                Skip for Now
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Progress Congratulations Dialog - Simple Modal */}
      {showProgressCongratulations && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-50"
            onClick={() => {
              setShowProgressCongratulations(false)
              markTaskCompleted("create-invoice")
            }}
          />
          
          {/* Modal Content */}
          <div className="relative bg-white rounded-lg shadow-xl p-6 max-w-md w-full mx-4 z-10">
            {/* Close X button */}
            <button
              onClick={() => {
                setShowProgressCongratulations(false)
                markTaskCompleted("create-invoice")
              }}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center pb-2">
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">🎉 Invoice Tutorial Complete!</h2>
            </div>

            {/* Enhanced Progress Bar with Integrated Icons */}
            <div className="mb-6 bg-gray-50 rounded-lg p-4 border border-gray-100">
              <div className="flex justify-center items-center mb-4">
                <span className="text-xs bg-teal-100 text-teal-700 px-3 py-1 rounded-full font-medium">
                  Step 5 of 5
                </span>
              </div>
              
              {/* Icons with connecting progress lines */}
              <div className="relative">
                <div className="flex justify-between items-center relative">
                  {/* Background connecting lines */}
                  <div className="absolute top-4 left-4 right-4 h-0.5 bg-gray-300"></div>
                  
                  {/* Progressive connecting lines - all completed */}
                  <div 
                    className="absolute top-4 left-4 h-0.5 bg-gradient-to-r from-teal-500 to-teal-400 transition-all duration-700 ease-out"
                    style={{ width: 'calc(100% - 32px)' }}
                  ></div>
                  
                  {/* Customer */}
                  <div className="flex flex-col items-center relative z-10">
                    <div className="w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center mb-2 shadow-sm border-2 border-white">
                      <Users className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-xs font-medium text-teal-600">Customer</span>
                  </div>
                  
                  {/* Site */}
                  <div className="flex flex-col items-center relative z-10">
                    <div className="w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center mb-2 shadow-sm border-2 border-white">
                      <MapPin className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-xs font-medium text-teal-600">Site</span>
                  </div>
                  
                  {/* Quote */}
                  <div className="flex flex-col items-center relative z-10">
                    <div className="w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center mb-2 shadow-sm border-2 border-white">
                      <FileText className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-xs font-medium text-teal-600">Quote</span>
                  </div>
                  
                  {/* Job */}
                  <div className="flex flex-col items-center relative z-10">
                    <div className="w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center mb-2 shadow-sm border-2 border-white">
                      <Target className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-xs font-medium text-teal-600">Job</span>
                  </div>
                  
                  {/* Invoice */}
                  <div className="flex flex-col items-center relative z-10">
                    <div className="w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center mb-2 shadow-sm border-2 border-white">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-xs font-medium text-teal-600">Invoice</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <p className="text-sm text-gray-600 text-center leading-relaxed">
                Amazing! You've completed the full customer-to-invoice workflow. You're now ready to manage your business efficiently with Joblogic!
              </p>

              <div className="flex flex-col gap-2 pt-2">
                <Button 
                  onClick={handleProgressContinue}
                  className="w-full bg-teal-600 hover:bg-teal-700 text-white flex items-center justify-center gap-2"
                >
                  Explore Your Dashboard
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
