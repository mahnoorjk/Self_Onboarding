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
        ? "Add one of your real customers to get started"
        : "Create a sample customer to practice with",
      icon: Users,
      estimatedTime: "2 min",
      isRequired: true,
      status: completedTasks.includes("add-customer") ? 'completed' : 'pending',
      onClick: () => {
        // Navigate to customer creation
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
    <div className="container mx-auto max-w-4xl p-6">
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
                <h3 className="font-semibold text-purple-800 mb-1">Perfect! You have real work to practice with</h3>
                <p className="text-purple-700 text-sm">
                  We'll use your actual workload ({wipCounts?.inProgress || 0} active jobs, {wipCounts?.pendingQuotes || 0} quotes, {wipCounts?.pendingInvoices || 0} invoices) 
                  to make this training super relevant.
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
            Complete these tasks to experience JobLogic with {hasWIPJobs ? 'your real work' : 'practice scenarios'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {actionTasks.map((task, index) => {
              const IconComponent = task.icon
              const isCompleted = task.status === 'completed'
              
              return (
                <div 
                  key={task.id}
                  className={`border rounded-lg p-4 transition-all ${
                    isCompleted 
                      ? 'bg-green-50 border-green-200' 
                      : 'hover:bg-gray-50 cursor-pointer border-gray-200'
                  }`}
                  onClick={!isCompleted ? task.onClick : undefined}
                >
                  <div className="flex items-center gap-4">
                    {/* Step Number & Icon */}
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                        isCompleted 
                          ? 'bg-green-500 text-white' 
                          : task.isRequired 
                            ? 'bg-teal-500 text-white' 
                            : 'bg-gray-300 text-gray-600'
                      }`}>
                        {isCompleted ? <CheckCircle className="w-4 h-4" /> : index + 1}
                      </div>
                      <IconComponent className={`w-5 h-5 ${
                        isCompleted ? 'text-green-600' : 'text-teal-600'
                      }`} />
                    </div>

                    {/* Task Content */}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className={`font-semibold ${
                          isCompleted ? 'text-green-800' : 'text-gray-900'
                        }`}>
                          {task.title}
                        </h3>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          task.isRequired 
                            ? 'bg-orange-100 text-orange-700' 
                            : 'bg-gray-100 text-gray-600'
                        }`}>
                          {task.isRequired ? 'Required' : 'Optional'}
                        </span>
                      </div>
                      <p className={`text-sm ${
                        isCompleted ? 'text-green-700' : 'text-gray-600'
                      }`}>
                        {task.description}
                      </p>
                    </div>

                    {/* Time & Action */}
                    <div className="text-right">
                      <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                        <Clock className="w-3 h-3" />
                        {task.estimatedTime}
                      </div>
                      {!isCompleted && (
                        <Button
                          size="sm"
                          className="bg-teal-600 hover:bg-teal-700"
                          onClick={(e) => {
                            e.stopPropagation()
                            task.onClick()
                          }}
                        >
                          <Play className="w-3 h-3 mr-1" />
                          Start
                        </Button>
                      )}
                      {isCompleted && (
                        <div className="text-green-600 text-sm font-medium">
                          ✓ Complete
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
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
