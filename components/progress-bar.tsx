"use client"

import { useOnboarding } from "./onboarding-context"
import { Check } from "lucide-react"

export function ProgressBar() {
  const { currentStep } = useOnboarding()

  const steps = [
    { number: 1, title: "Tell Us About You", isActive: currentStep === 1, isCompleted: currentStep > 1 },
    { number: 2, title: "Set Up Your Business", isActive: currentStep === 2, isCompleted: currentStep > 2 },
    { number: 3, title: "Add Your Work", isActive: currentStep === 3, isCompleted: currentStep > 3 },
    { number: 4, title: "Let's Get Started!", isActive: currentStep === 4, isCompleted: currentStep > 4 }
  ];

  const getDisplayStep = (step: number) => {
    if (step === 1) return 1 // Tell Us About You
    if (step === 2) return 2 // Set Up Your Business (merged What Do You Do + How You Work)
    if (step === 3) return 3 // Add Your Work (was Current Work)
    if (step === 4) return 4 // Let's Get Started!
    if (step === 5) return 4 // Tutorials (still show as completion)
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
    <div className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Progress Header */}
        <div className="text-center mb-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">Setup Progress</h2>
          <p className="text-sm text-gray-600">
            Step {displayStep} of {steps.length} - {steps.find(s => s.number === displayStep)?.title}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="relative mb-6">
          {/* Background line */}
          <div className="absolute top-6 left-0 right-0 h-1 bg-gray-200 rounded-full"></div>
          
          {/* Progress fill */}
          <div 
            className="absolute top-6 left-0 h-1 bg-gradient-to-r from-teal-500 to-blue-500 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${((displayStep - 1) / (steps.length - 1)) * 100}%` }}
          ></div>

          {/* Steps */}
          <div className="relative flex justify-between">
            {steps.map((step, index) => {
              const status = getStepStatus(step.number)

              const circleStyles =
                status === "completed"
                  ? "bg-gradient-to-r from-teal-500 to-blue-500 text-white border-2 border-white shadow-lg transform scale-110"
                  : status === "current"
                  ? "bg-white text-teal-600 border-4 border-teal-500 shadow-lg transform scale-125 ring-4 ring-teal-100"
                  : "bg-white text-gray-400 border-2 border-gray-300"

              const labelStyles =
                status === "completed"
                  ? "text-teal-600 font-medium"
                  : status === "current"
                  ? "text-teal-700 font-semibold"
                  : "text-gray-500"

              return (
                <div key={step.number} className="flex flex-col items-center">
                  {/* Step Circle */}
                  <div 
                    className={`
                      relative z-10 rounded-full w-12 h-12 flex items-center justify-center 
                      transition-all duration-300 ease-out ${circleStyles}
                    `}
                  >
                    {status === "completed" ? (
                      <Check className="w-5 h-5 font-bold" />
                    ) : (
                      <span className="text-sm font-semibold">{step.number}</span>
                    )}
                  </div>

                  {/* Step Label */}
                  <div className={`mt-3 text-center transition-colors duration-300 ${labelStyles}`}>
                    <div className="text-xs font-medium leading-tight max-w-[100px]">
                      {step.title}
                    </div>
                    {status === "current" && (
                      <div className="mt-1">
                        <div className="w-2 h-2 bg-teal-500 rounded-full mx-auto animate-pulse"></div>
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Progress Stats */}
        <div className="flex justify-center">
          <div className="bg-gray-50 rounded-full px-4 py-2 flex items-center space-x-2">
            <div className="w-3 h-3 bg-gradient-to-r from-teal-500 to-blue-500 rounded-full"></div>
            <span className="text-sm font-medium text-gray-700">
              {Math.round(((displayStep - 1) / (steps.length - 1)) * 100)}% Complete
            </span>
          </div>
        </div>
      </div>
    </div>
  )

}
