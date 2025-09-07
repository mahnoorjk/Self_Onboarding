"use client"

import { useOnboarding } from "../onboarding-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, ArrowRight, Users, FileText, TrendingUp, DollarSign, BarChart3, Play, Clock, Target, Zap } from "lucide-react"
import { useState } from "react"

interface CompletionScreenProps {
  onOnboardingCompletion?: () => void
  onNavigateToTutorials?: () => void
  onNavigateToThirtyDayJourney?: () => void
  setShowOnboardingModal?: (show: boolean) => void
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

export function CompletionScreen({ onOnboardingCompletion, onNavigateToTutorials, onNavigateToThirtyDayJourney, setShowOnboardingModal }: CompletionScreenProps = {}) {
  const { setCurrentStep, data } = useOnboarding()
  const [completedTasks, setCompletedTasks] = useState<string[]>([])

  const handleGoBack = () => {
    setCurrentStep(4) // Go back to Work in Progress screen
  }

  const markTaskCompleted = (taskId: string) => {
    setCompletedTasks(prev => [...prev, taskId])
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
      title: "Add Your First Customer",
      description: hasWIPJobs 
        ? "Bring one of your real customers into the system"
        : "Create a sample customer to get started",
      icon: Users,
      estimatedTime: "2 min",
      isRequired: true,
      status: completedTasks.includes("add-customer") ? 'completed' : 'pending',
      onClick: () => {
        console.log("Navigate to add customer")
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
        console.log("Navigate to quote creation")
        markTaskCompleted("create-quote")
      }
    },
    {
      id: "quote-to-job",
      title: "Turn Quote into Job",
      description: "Experience the full workflow from quote approval to job creation",
      icon: TrendingUp,
      estimatedTime: "4 min",
      isRequired: true,
      status: completedTasks.includes("quote-to-job") ? 'completed' : 'pending',
      onClick: () => {
        console.log("Navigate to quote-to-job workflow")
        markTaskCompleted("quote-to-job")
      }
    },
    {
      id: "create-invoice",
      title: hasInvoices ? "Send Your Pending Invoice" : "Create Your First Invoice",
      description: hasInvoices
        ? `Get those ${wipCounts?.pendingInvoices} invoice${wipCounts?.pendingInvoices !== 1 ? 's' : ''} sent out`
        : "Learn how to get paid faster with professional invoicing",
      icon: DollarSign,
      estimatedTime: "3 min",
      isRequired: true,
      status: completedTasks.includes("create-invoice") ? 'completed' : 'pending',
      onClick: () => {
        console.log("Navigate to invoice creation")
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
        console.log("Navigate to reports")
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
                  into JobLogic so you can start managing everything in one place.
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
            Complete these tasks to get your work into JobLogic and start using the system with {hasWIPJobs ? 'your real work' : 'sample scenarios'}
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

      {/* Next Steps */}
      {completedRequiredTasks.length === requiredTasks.length && (
        <Card className="mb-8 border-green-200 bg-green-50">
          <CardContent className="pt-6">
            <div className="text-center">
              <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h2 className="text-xl font-bold text-green-800 mb-2">Excellent Work!</h2>
              <p className="text-green-700 mb-4">
                You've completed the core setup. Ready for your 30-day learning journey?
              </p>
              <Button 
                onClick={() => {
                  if (setShowOnboardingModal) {
                    setShowOnboardingModal(true)
                  } else if (onNavigateToThirtyDayJourney) {
                    onNavigateToThirtyDayJourney()
                  }
                }}
                className="bg-green-600 hover:bg-green-700"
              >
                Continue to 30-Day Journey
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Skip Option */}
      <div className="text-center">
        <Button 
          variant="outline" 
          onClick={() => {
            if (setShowOnboardingModal) {
              setShowOnboardingModal(true)
            } else if (onNavigateToThirtyDayJourney) {
              onNavigateToThirtyDayJourney()
            }
          }}
          className="text-gray-600 hover:text-gray-800"
        >
          Skip for now - Take me to 30-day journey
        </Button>
      </div>
    </div>
  )
}
