"use client"

import { useOnboarding } from "./onboarding-context"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, AlertCircle } from "lucide-react"
import { useState } from "react"

export function NavigationButtons() {
  const { currentStep, setCurrentStep, isStepValid, data } = useOnboarding()
  const [showValidationMessage, setShowValidationMessage] = useState(false)

  const handleNext = () => {
    if (!isStepValid(currentStep)) {
      setShowValidationMessage(true)
      setTimeout(() => setShowValidationMessage(false), 5000) // Hide after 5 seconds
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

  const getValidationMessage = (): string => {
    if (currentStep === 1) {
      return "Please fill in all required fields (Company Name, Business Address, Phone Number, and Email Address) to continue."
    }
    if (currentStep === 2) {
      return "Please complete all required fields (Primary Industry, Number of Customers, Engineers, and Jobs per Month) to continue."
    }
    return "Please complete all required fields to continue."
  }

  const canGoNext = isStepValid(currentStep) && currentStep < 4
  const showBack = currentStep > 1
  const isLastStep = currentStep === 4

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-4">
      <div className="container mx-auto max-w-4xl">
        {/* Validation Message */}
        {showValidationMessage && !canGoNext && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md flex items-center gap-2 text-red-700">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span className="text-sm">{getValidationMessage()}</span>
          </div>
        )}
        
        <div className="flex justify-between">
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
                className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </Button>
            )}
            {/* No button shown on completion screen - it's the final step */}
          </div>
        </div>
      </div>
    </div>
  )
}
