"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Target,
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  HelpCircle,
  X,
  Info,
} from "lucide-react"

interface GuideStep {
  id: string
  title: string
  description: string
  target: string
  position: "top" | "bottom" | "left" | "right"
  action?: string
  requiresInput?: boolean
  inputField?: string
}

const guideSteps: GuideStep[] = [
  {
    id: "welcome",
    title: "Invoice Learning Journey",
    description:
      "Welcome! For learning purposes, we'll walk you through a sample job that you can later convert to an invoice. This helps you understand the job-to-invoice workflow.",
    target: "page-header",
    position: "bottom",
    action: "highlight",
  },
  {
    id: "customer-info",
    title: "Step 1: Customer Information",
    description:
      "This sample job is for 'Sample Customer 1' - a demonstration customer to show you how the invoicing process works.",
    target: "customer-select",
    position: "bottom",
    action: "highlight",
  },
  {
    id: "site-info",
    title: "Step 2: Site Information",
    description:
      "The job is assigned to 'Sample Site 1' - this represents where the work will be performed.",
    target: "site-select",
    position: "bottom",
    action: "highlight",
  },
  {
    id: "job-type-info",
    title: "Step 3: Job Type",
    description:
      "We've set this as a 'Maintenance' job type - a common type of work that often gets invoiced.",
    target: "job-type-select",
    position: "bottom",
    action: "highlight",
  },
  {
    id: "description-info",
    title: "Step 4: Job Description",
    description:
      "The description explains what work was performed - this will appear on your invoice to help customers understand what they're being charged for.",
    target: "description-textarea",
    position: "top",
    action: "highlight",
  },
  {
    id: "save-job-info",
    title: "Step 5: Save Sample Job",
    description:
      "Now save this sample job and we'll show you how it appears in your job summary - the next step towards creating an invoice.",
    target: "save-button",
    position: "top",
    action: "highlight",
  },
]

interface LogJobInvoiceTutorialScreenProps {
  onJobSaveSuccess: () => void
  onNavigateBackToTutorials?: () => void
}

export function LogJobInvoiceTutorialScreen({ 
  onJobSaveSuccess, 
  onNavigateBackToTutorials 
}: LogJobInvoiceTutorialScreenProps) {
  // Pre-filled sample data for invoice tutorial
  const [customer, setCustomer] = useState("Sample Customer 1")
  const [site, setSite] = useState("Sample Site 1")
  const [jobType, setJobType] = useState("maintenance")
  const [description, setDescription] = useState("Routine maintenance and inspection of electrical systems - sample work for invoice demonstration")

  // Guide state
  const [isGuideActive, setIsGuideActive] = useState(false)
  const [currentGuideStep, setCurrentGuideStep] = useState(0)
  const [showGuideDialog, setShowGuideDialog] = useState(false)
  const [guideOverlayPosition, setGuideOverlayPosition] = useState({ top: 0, left: 0, width: 0, height: 0 })
  const [showInfoDialog, setShowInfoDialog] = useState(true)

  // Refs for guide targeting
  const mainContainerRef = useRef<HTMLDivElement>(null)
  const pageHeaderRef = useRef<HTMLDivElement>(null)
  const customerSelectRef = useRef<HTMLDivElement>(null)
  const siteSelectRef = useRef<HTMLDivElement>(null)
  const jobTypeSelectRef = useRef<HTMLDivElement>(null)
  const descriptionTextareaRef = useRef<HTMLDivElement>(null)
  const saveButtonRef = useRef<HTMLButtonElement>(null)

  // Auto-start tutorial when component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsGuideActive(true)
      setCurrentGuideStep(0)
      setShowGuideDialog(true)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  // Handle guide step changes
  useEffect(() => {
    if (isGuideActive && currentGuideStep < guideSteps.length) {
      const currentStep = guideSteps[currentGuideStep]

      const highlightTimer = setTimeout(() => {
        updateGuideOverlay(currentStep)
        scrollToTarget(currentStep)
        setShowGuideDialog(true)
      }, 300)

      return () => clearTimeout(highlightTimer)
    } else if (isGuideActive && currentGuideStep >= guideSteps.length) {
      setIsGuideActive(false)
      setShowGuideDialog(false)
    }
  }, [currentGuideStep, isGuideActive])

  // Add scroll event listener to update overlay positions during tutorial
  useEffect(() => {
    if (!isGuideActive) return

    const handleScroll = () => {
      if (currentGuideStep < guideSteps.length) {
        const currentStep = guideSteps[currentGuideStep]
        updateGuideOverlay(currentStep)
      }
    }

    const handleResize = () => {
      if (currentGuideStep < guideSteps.length) {
        const currentStep = guideSteps[currentGuideStep]
        updateGuideOverlay(currentStep)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleResize, { passive: true })
    
    const mainContainer = mainContainerRef.current
    if (mainContainer) {
      mainContainer.addEventListener('scroll', handleScroll, { passive: true })
    }
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
      if (mainContainer) {
        mainContainer.removeEventListener('scroll', handleScroll)
      }
    }
  }, [isGuideActive, currentGuideStep, guideSteps])

  const updateGuideOverlay = (step: GuideStep) => {
    const targetElement = getTargetElement(step.target)
    if (targetElement) {
      const rect = targetElement.getBoundingClientRect()
      setGuideOverlayPosition({
        top: rect.top + window.scrollY - 8,
        left: rect.left + window.scrollX - 8,
        width: rect.width + 16,
        height: rect.height + 16,
      })
    }
  }

  const scrollToTarget = (step: GuideStep) => {
    const targetElement = getTargetElement(step.target)
    if (targetElement) {
      const rect = targetElement.getBoundingClientRect()
      const modalBottomSpace = 350
      const effectiveViewportHeight = window.innerHeight - modalBottomSpace
      const isInViewport = rect.top >= 0 && rect.bottom <= effectiveViewportHeight
      
      if (!isInViewport) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
          inline: 'nearest'
        })
        
        setTimeout(() => {
          updateGuideOverlay(step)
        }, 500)
      }
    }
  }

  const getTargetElement = (target: string) => {
    switch (target) {
      case "page-header":
        return pageHeaderRef.current
      case "customer-select":
        return customerSelectRef.current
      case "site-select":
        return siteSelectRef.current
      case "job-type-select":
        return jobTypeSelectRef.current
      case "description-textarea":
        return descriptionTextareaRef.current
      case "save-button":
        return saveButtonRef.current
      default:
        return null
    }
  }

  const handleNextGuideStep = () => {
    if (currentGuideStep < guideSteps.length - 1) {
      const nextStep = currentGuideStep + 1
      setCurrentGuideStep(nextStep)
      
      setTimeout(() => {
        const nextStepData = guideSteps[nextStep]
        scrollToTarget(nextStepData)
      }, 100)
    } else {
      setIsGuideActive(false)
      setShowGuideDialog(false)
    }
  }

  const handlePrevGuideStep = () => {
    if (currentGuideStep > 0) {
      const prevStep = currentGuideStep - 1
      setCurrentGuideStep(prevStep)
      
      setTimeout(() => {
        const prevStepData = guideSteps[prevStep]
        scrollToTarget(prevStepData)
      }, 100)
    }
  }

  const handleSkipGuide = () => {
    if (onNavigateBackToTutorials) {
      onNavigateBackToTutorials()
    }
  }

  const handleSave = () => {
    console.log("Sample job saved for invoice tutorial!", { customer, site, jobType, description })
    
    if (isGuideActive) {
      setIsGuideActive(false)
      setShowGuideDialog(false)
    }

    if (onJobSaveSuccess) {
      onJobSaveSuccess()
    }
  }

  const handleCancel = () => {
    if (onNavigateBackToTutorials) {
      onNavigateBackToTutorials()
    }
  }

  const startTutorial = () => {
    setShowInfoDialog(false)
    setIsGuideActive(true)
    setCurrentGuideStep(0)
    setShowGuideDialog(true)
  }

  const currentStep = guideSteps[currentGuideStep]

  return (
    <div ref={mainContainerRef} className="h-full bg-white overflow-auto relative">
      {/* Tutorial Mode Indicator */}
      <div className="bg-teal-50 border-b border-teal-200 px-6 py-3">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-2">
            <Target className="w-4 h-4 text-teal-600" />
            <span className="text-sm font-medium text-teal-800">Invoice Learning Journey</span>
            <span className="text-xs text-teal-600">Step {currentGuideStep + 1} of {guideSteps.length}</span>
          </div>
          <Button variant="ghost" size="sm" onClick={handleSkipGuide} className="text-teal-600 hover:text-teal-800">
            Exit Tutorial
          </Button>
        </div>
      </div>

      {/* Guide Overlay */}
      {isGuideActive && currentStep?.action === "highlight" && (
        <>
          <div
            className="fixed inset-0 z-40"
            style={{
              clipPath: `polygon(
                0% 0%, 
                0% 100%, 
                ${Math.max(0, guideOverlayPosition.left - window.scrollX)}px 100%, 
                ${Math.max(0, guideOverlayPosition.left - window.scrollX)}px ${Math.max(0, guideOverlayPosition.top - window.scrollY)}px, 
                ${Math.max(0, guideOverlayPosition.left + guideOverlayPosition.width - window.scrollX)}px ${Math.max(0, guideOverlayPosition.top - window.scrollY)}px, 
                ${Math.max(0, guideOverlayPosition.left + guideOverlayPosition.width - window.scrollX)}px ${Math.max(0, guideOverlayPosition.top + guideOverlayPosition.height - window.scrollY)}px, 
                ${Math.max(0, guideOverlayPosition.left - window.scrollX)}px ${Math.max(0, guideOverlayPosition.top + guideOverlayPosition.height - window.scrollY)}px, 
                ${Math.max(0, guideOverlayPosition.left - window.scrollX)}px 100%, 
                100% 100%, 
                100% 0%
              )`,
              backgroundColor: "rgba(0, 0, 0, 0.6)",
              pointerEvents: "none",
            }}
          />
          <div
            className="fixed border-4 border-teal-500 rounded-lg z-50 pointer-events-none"
            style={{
              top: guideOverlayPosition.top - window.scrollY,
              left: guideOverlayPosition.left - window.scrollX,
              width: guideOverlayPosition.width,
              height: guideOverlayPosition.height,
              boxShadow: "0 0 0 2px rgba(20, 184, 166, 0.3), 0 0 20px rgba(20, 184, 166, 0.5)",
              animation: "pulse 2s infinite",
              backgroundColor: "transparent",
            }}
          />
        </>
      )}

      <div className="p-6 max-w-7xl mx-auto">
        <div ref={pageHeaderRef} className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Create Sample Job for Invoice</h1>
          <div className="text-sm text-gray-600">
            This sample job will help you understand the job-to-invoice workflow.
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Job Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Customer Selection */}
                  <div ref={customerSelectRef} className="space-y-2">
                    <Label htmlFor="customer" className="text-sm font-medium">
                      Customer <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative">
                      <Select value={customer} onValueChange={setCustomer} disabled>
                        <SelectTrigger className="w-full bg-gray-50">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Sample Customer 1">Sample Customer 1</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="text-xs text-gray-500">Pre-filled for tutorial</div>
                  </div>

                  {/* Site Selection */}
                  <div ref={siteSelectRef} className="space-y-2">
                    <Label htmlFor="site" className="text-sm font-medium">
                      Site <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative">
                      <Select value={site} onValueChange={setSite} disabled>
                        <SelectTrigger className="w-full bg-gray-50">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Sample Site 1">Sample Site 1</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="text-xs text-gray-500">Pre-filled for tutorial</div>
                  </div>
                </div>

                {/* Job Details Section */}
                <div className="mt-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Job Details</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Job Type */}
                    <div ref={jobTypeSelectRef} className="space-y-2">
                      <Label htmlFor="jobType" className="text-sm font-medium">
                        Job Type <span className="text-red-500">*</span>
                      </Label>
                      <div className="relative">
                        <Select value={jobType} onValueChange={setJobType} disabled>
                          <SelectTrigger className="w-full bg-gray-50">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="maintenance">Maintenance</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="text-xs text-gray-500">Pre-filled for tutorial</div>
                    </div>
                  </div>

                  {/* Description */}
                  <div ref={descriptionTextareaRef} className="mt-6 space-y-2">
                    <Label htmlFor="description" className="text-sm font-medium">
                      Description <span className="text-red-500">*</span>
                    </Label>
                    <Textarea
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Enter job description..."
                      className="min-h-[100px] bg-gray-50"
                      disabled
                    />
                    <div className="text-xs text-gray-500">Pre-filled for tutorial</div>
                  </div>
                </div>

                {/* Required Fields Notice */}
                <div className="mt-8 text-sm text-gray-600">
                  <span className="text-red-500">*</span> Required Fields
                </div>

                {/* Action Buttons */}
                <div className="mt-8 flex justify-end gap-3">
                  <Button variant="outline" onClick={handleCancel}>
                    Cancel
                  </Button>
                  <Button ref={saveButtonRef} onClick={handleSave} className="bg-green-500 hover:bg-green-600">
                    Save Sample Job
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Tutorial Progress */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Target className="w-5 h-5 text-teal-600" />
                  Tutorial Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="text-sm text-gray-600">
                    Step {currentGuideStep + 1} of {guideSteps.length}
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-teal-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${((currentGuideStep + 1) / guideSteps.length) * 100}%` }}
                    />
                  </div>
                  {currentStep && (
                    <div className="text-sm font-medium text-gray-900">
                      {currentStep.title}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Invoice Learning Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Info className="w-5 h-5 text-teal-600" />
                  About This Tutorial
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm text-gray-600">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Learn the job-to-invoice workflow</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>See how completed jobs become invoices</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Practice with sample data</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Info Dialog */}
      <Dialog open={showInfoDialog} onOpenChange={setShowInfoDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Info className="w-5 h-5 text-teal-600" />
              Invoice Learning Journey
            </DialogTitle>
            <DialogDescription className="text-left space-y-3">
              <p>Welcome! For learning purposes, we'll walk you through a sample job that you can later convert to an invoice.</p>
              <p>This helps you understand how completed work becomes billable invoices in your workflow.</p>
              <p className="font-medium text-gray-900">You can later explore and bring in your own invoices using this same process.</p>
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center gap-3 mt-4">
            <Button variant="outline" onClick={() => setShowInfoDialog(false)}>
              Skip Tutorial
            </Button>
            <Button onClick={startTutorial} className="bg-teal-600 hover:bg-teal-700">
              Start Learning
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Tutorial Guide Modal */}
      {isGuideActive && currentStep && showGuideDialog && (
        <div className="fixed bottom-6 right-6 z-[80] bg-white rounded-lg shadow-xl border border-gray-200 p-4 max-w-sm">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Target className="w-4 h-4 text-teal-600" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-gray-900 text-sm">{currentStep.title}</h4>
                <Button variant="ghost" size="sm" onClick={handleSkipGuide} className="h-6 w-6 p-0 text-gray-400 hover:text-gray-600">
                  <X className="w-3 h-3" />
                </Button>
              </div>
              
              <p className="text-xs text-gray-600 leading-relaxed mb-3">{currentStep.description}</p>
              
              <div className="text-xs text-gray-500 mb-3">
                Step {currentGuideStep + 1} of {guideSteps.length}
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-1.5 mb-3">
                <div
                  className="bg-teal-600 h-1.5 rounded-full transition-all duration-300"
                  style={{ width: `${((currentGuideStep + 1) / guideSteps.length) * 100}%` }}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex gap-1">
                  {currentGuideStep > 0 && (
                    <Button variant="outline" size="sm" onClick={handlePrevGuideStep} className="h-7 px-3 text-xs">
                      <ArrowLeft className="w-3 h-3 mr-1" />
                      Back
                    </Button>
                  )}
                </div>
                <Button
                  size="sm"
                  onClick={handleNextGuideStep}
                  className="bg-teal-600 hover:bg-teal-700 h-7 px-3 text-xs"
                >
                  {currentGuideStep < guideSteps.length - 1 ? (
                    <>
                      Next
                      <ArrowRight className="w-3 h-3 ml-1" />
                    </>
                  ) : (
                    <>
                      Finish
                      <CheckCircle className="w-3 h-3 ml-1" />
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
