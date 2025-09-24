"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Users, MapPin, FileText, TrendingUp, DollarSign, ArrowRight, Star, Target } from "lucide-react"
import { Progress } from "@/components/ui/progress"

interface ProgressStep {
  id: string
  title: string
  icon: any
  completed: boolean
}

interface ProgressCongratulationsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  completedTask: {
    id: string
    title: string
    description: string
    icon: any
  }
  onContinueToNext: () => void
  onBackToTutorials?: () => void
  nextStepTitle?: string
  customMessage?: string
}

const WORKFLOW_STEPS: ProgressStep[] = [
  {
    id: "add-customer",
    title: "Add Customer",
    icon: Users,
    completed: false
  },
  {
    id: "add-site", 
    title: "Add Site",
    icon: MapPin,
    completed: false
  },
  {
    id: "create-quote",
    title: "Create Quote", 
    icon: FileText,
    completed: false
  },
  {
    id: "create-job",
    title: "Create Job",
    icon: TrendingUp,
    completed: false
  },
  {
    id: "create-invoice",
    title: "Create Invoice",
    icon: DollarSign,
    completed: false
  }
]

export function ProgressCongratulationsDialog({
  open,
  onOpenChange,
  completedTask,
  onContinueToNext,
  onBackToTutorials,
  nextStepTitle,
  customMessage
}: ProgressCongratulationsDialogProps) {
  console.log("ProgressCongratulationsDialog rendered with open:", open, "completedTask:", completedTask.id)
  
  // Calculate progress based on completed task
  const currentStepIndex = WORKFLOW_STEPS.findIndex(step => step.id === completedTask.id)
  const progress = ((currentStepIndex + 1) / WORKFLOW_STEPS.length) * 100
  
  // Update workflow steps to show completion status
  const updatedSteps = WORKFLOW_STEPS.map((step, index) => ({
    ...step,
    completed: index <= currentStepIndex
  }))

  const getMotivationalMessage = (taskId: string) => {
    switch (taskId) {
      case "add-customer":
        return "Great start! You've created your first customer. Now let's add a site where work will be performed."
      case "add-site":
        return "Excellent! Your site is ready. Next, let's create a quote to show your customer what services you can provide."
      case "create-quote":
        return "Perfect! Your quote looks professional. Now let's convert this into a job to start the actual work."
      case "create-job":
        return "Outstanding! You've logged a job. The final step is creating an invoice to get paid for your work."
      case "create-invoice":
        return "Congratulations! You've completed the full customer-to-cash workflow. You're ready to run your business!"
      default:
        return "Great job! You're making excellent progress through the workflow."
    }
  }

  const isLastStep = currentStepIndex === WORKFLOW_STEPS.length - 1

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="text-center pb-2">
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <CheckCircle2 className="w-8 h-8 text-green-600" />
          </div>
          <DialogTitle className="text-xl font-bold text-gray-900">
            🎉 {completedTask.title} Complete!
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Custom message or motivational message */}
          <p className="text-sm text-gray-600 text-center leading-relaxed">
            {customMessage || getMotivationalMessage(completedTask.id)}
          </p>

          {/* Progress visualization */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Workflow Progress</span>
              <span className="text-sm text-teal-600 font-medium">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="mb-3 h-2" />
            
            {/* Step indicators */}
            <div className="flex justify-between items-center">
              {updatedSteps.map((step, index) => {
                const StepIcon = step.icon
                return (
                  <div key={step.id} className="flex flex-col items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${
                      step.completed 
                        ? 'bg-teal-100 text-teal-600' 
                        : index === currentStepIndex + 1
                        ? 'bg-blue-100 text-blue-600 animate-pulse'
                        : 'bg-gray-100 text-gray-400'
                    }`}>
                      {step.completed ? (
                        <CheckCircle2 className="w-4 h-4" />
                      ) : (
                        <StepIcon className="w-4 h-4" />
                      )}
                    </div>
                    <span className={`text-xs text-center leading-tight ${
                      step.completed ? 'text-teal-600 font-medium' : 'text-gray-500'
                    }`}>
                      {step.title}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Achievement badge for milestones */}
          {[0, 2, 4].includes(currentStepIndex) && (
            <div className="flex items-center justify-center gap-2 bg-yellow-50 border border-yellow-200 rounded-lg p-3">
              <Star className="w-4 h-4 text-yellow-600" />
              <span className="text-sm font-medium text-yellow-800">
                {currentStepIndex === 0 && "First Customer Added! 🏆"}
                {currentStepIndex === 2 && "Quote Master! 📋"}
                {currentStepIndex === 4 && "Workflow Champion! 💰"}
              </span>
            </div>
          )}

          {/* Action buttons */}
          <div className="flex flex-col gap-2 pt-2">
            {!isLastStep ? (
              <Button 
                onClick={onContinueToNext}
                className="w-full bg-teal-600 hover:bg-teal-700 text-white flex items-center justify-center gap-2"
              >
                Continue to {nextStepTitle || 'Next Step'}
                <ArrowRight className="w-4 h-4" />
              </Button>
            ) : (
              <Button 
                onClick={onContinueToNext}
                className="w-full bg-green-600 hover:bg-green-700 text-white flex items-center justify-center gap-2"
              >
                <Target className="w-4 h-4" />
                View Learning Dashboard
              </Button>
            )}
            
            {onBackToTutorials && (
              <Button 
                variant="outline" 
                onClick={onBackToTutorials}
                className="w-full"
              >
                Back to Tutorials
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}