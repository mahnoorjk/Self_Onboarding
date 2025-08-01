"use client"

import { useOnboarding } from "./onboarding-context"
import { Check } from "lucide-react"

const steps = [
  { number: 1, label: "About Your Business" },
  { number: 2, label: "Your Services" },
  { number: 3, label: "How You Work" },
  { number: 4, label: "Work in Progress" }, // Covers internal step 4 (WIP Jobs)
  { number: 5, label: "Transfer Data" }, // Covers internal steps 5 (Overview), 6 (Main), 7 (Software), 8 (Upload), 9 (Templates)
  { number: 6, label: "Completion" }, // Covers internal step 10 (now includes review content)
]

export function ProgressBar() {
  const { currentStep } = useOnboarding()

  const getDisplayStep = (step: number) => {
    if (step === 1) return 1 // About Your Business (1) -> Display Step 1
    if (step === 2) return 2 // Your Services (2) -> Display Step 2
    if (step === 3) return 3 // How You Work (3) -> Display Step 3
    if (step === 4) return 4 // Work in Progress (4) -> Display Step 4
    if (step >= 5 && step <= 9) return 5 // Transfer Data Overview (5), Transfer Data (6), Software (7), Upload (8), Templates (9) -> Display Step 5
    if (step === 10) return 6 // Completion (10) -> Display Step 6
    if (step === 11) return 6 // Tutorials (11) -> Still Display Step 6 (completion area)
    return step // Fallback
  }

  const getStepStatus = (stepNumber: number) => {
    const currentDisplayStep = getDisplayStep(currentStep)
    if (currentDisplayStep > stepNumber) return "completed"
    if (currentDisplayStep === stepNumber) return "current"
    return "pending"
  }

  const displayStep = getDisplayStep(currentStep)

  return (
  <div className="bg-white border-b border-gray-200 px-6 py-6">
    <div className="max-w-7xl mx-auto w-full px-4">
      <div className="grid grid-cols-7 gap-0 w-full relative">
        {steps.map((step, index) => {
          const status = getStepStatus(step.number)
          const isLast = index === steps.length - 1

          const statusStyles =
            status === "completed"
              ? "bg-[#22C55E] text-white" // green complete
              : status === "current"
              ? "bg-[#FFC800] text-black font-semibold" // yellow active
              : "bg-[#E5E7EB] text-[#6B7280]" // gray-200 pending

          return (
            <div key={step.number} className="flex flex-col items-center text-center relative">
              {/* Connector line */}
              {!isLast && (
                <div className="absolute top-4 left-1/2 w-full h-px bg-gray-300 z-0"></div>
              )}

              {/* Step Circle */}
              <div className={`relative z-10 rounded-full w-8 h-8 flex items-center justify-center ${statusStyles}`}>
                {status === "completed" ? (
                  <Check className="w-4 h-4" />
                ) : (
                  step.number
                )}
              </div>

              {/* Label */}
              <div className="mt-2 text-xs font-medium text-gray-800">{step.label}</div>
            </div>
          )
        })}
      </div>
    </div>
  </div>
)

}
