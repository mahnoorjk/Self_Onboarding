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

    if (currentStep === 4) {
      // From Work in Progress, go to Transfer Data Overview (step 5)
      setCurrentStep(5)
    } else if (currentStep === 5) {
      // Transfer Data Overview screen (step 5)
      if (!data.dataImport.needsImport) {
        // Skip to Review & Finalize if no data transfer needed
        setCurrentStep(10)
      } else {
        // If data transfer is needed, go to Transfer Data Screen (step 6)
        setCurrentStep(6)
      }
    } else if (currentStep === 6) {
      // From Transfer Data Screen (where method is selected)
      if (data.dataImport.needsImport && data.dataImport.importMethod) {
        switch (data.dataImport.importMethod) {
          case "software-credentials":
            setCurrentStep(7) // Go to Software Credentials screen
            break
          case "upload-data-files":
            setCurrentStep(8) // Go to Upload Data Files screen
            break
          case "joblogic-templates":
            setCurrentStep(9) // Go to Joblogic Templates screen
            break
          default:
            // Fallback, should not happen if isStepValid is true
            setCurrentStep(currentStep + 1)
        }
      } else {
        // If needsImport is false or method not selected, just increment (should be caught by isStepValid)
        setCurrentStep(currentStep + 1)
      }
    } else if ([7, 8, 9].includes(currentStep)) {
      // All transfer method screens go to Completion (step 10)
      setCurrentStep(10)
    } else if (currentStep < 10) {
      // For all other general steps, just increment (but stop at step 10 - Completion)
      setCurrentStep(currentStep + 1)
    }
    // No navigation from step 10 (Completion) - it's the final step
  }

  const handleBack = () => {
    if (currentStep === 4) {
      // From Work in Progress, go back to How You Work (step 3)
      setCurrentStep(3)
    } else if (currentStep === 5) {
      // From Transfer Data Overview, go back to Work in Progress (step 4)
      setCurrentStep(4)
    } else if (currentStep === 6) {
      // From Transfer Data Screen, go back to Transfer Data Overview (step 5)
      setCurrentStep(5)
    } else if (currentStep === 7 || currentStep === 8 || currentStep === 9) {
      // From transfer method screens, go back to Transfer Data Screen (step 6)
      setCurrentStep(6)
    } else if (currentStep === 10) {
      // From Completion screen
      // Go back to the specific transfer method screen if one was selected
      if (data.dataImport.needsImport) {
        if (data.dataImport.importMethod === "software-credentials") {
          setCurrentStep(7)
        } else if (data.dataImport.importMethod === "upload-data-files") {
          setCurrentStep(8)
        } else if (data.dataImport.importMethod === "joblogic-templates") {
          setCurrentStep(9)
        } else {
          // Fallback if needsImport is true but no method selected, go to Transfer Data Screen (step 6)
          setCurrentStep(6)
        }
      } else {
        // If no data transfer was needed, go back to Transfer Data Overview (step 5)
        setCurrentStep(5)
      }
    } else {
      // For all other general steps, just decrement
      setCurrentStep(Math.max(1, currentStep - 1))
    }
  }

  const canGoNext = isStepValid(currentStep) && currentStep < 10
  const showBack = currentStep > 1
  const isLastStep = currentStep === 10

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
