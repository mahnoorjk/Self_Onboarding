"use client"

import { useOnboarding } from "./onboarding-context"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

export function NavigationButtons() {
  const { currentStep, setCurrentStep, isStepValid, data } = useOnboarding()

  const handleNext = () => {
    if (!isStepValid(currentStep)) {
      return // Prevent navigation if current step is not valid
    }

    if (currentStep < 4) {
      // For steps 1-3, just increment
      setCurrentStep(currentStep + 1)
    }
    // No navigation from step 4 (Completion) - it's the final step
  }

  const handleBack = () => {
    if (currentStep > 1) {
      // For all steps, just decrement
      setCurrentStep(currentStep - 1)
    }
  }

  const canGoNext = isStepValid(currentStep) && currentStep < 4
  const showBack = currentStep > 1
  const isLastStep = currentStep === 4

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-4">
      <div className="container mx-auto max-w-4xl flex justify-between">
        <div>
          {showBack && (
            <Button variant="outline" onClick={handleBack} className="flex items-center gap-2 bg-transparent">
              <ChevronLeft className="w-4 h-4" />
              Back
            </Button>
          )}
        </div>
        <div>
          {!isLastStep && (
            <Button
              onClick={handleNext}
              disabled={!canGoNext}
              className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </Button>
          )}
          {/* No button shown on completion screen - it's the final step */}
        </div>
      </div>
    </div>
  )
}
