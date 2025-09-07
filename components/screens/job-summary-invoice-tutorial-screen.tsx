"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
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
  X,
  FileText,
  User,
  MapPin,
  Calendar,
  DollarSign,
  Clock,
  Info,
  Building,
  Zap,
  Edit,
  Share,
  AlertCircle,
  Phone,
  Mail,
  TrendingUp,
  Briefcase,
  ChevronDown,
  Play
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
    id: "job-summary-welcome",
    title: "Job Summary Overview",
    description:
      "Excellent! Your sample job has been created. This job summary shows all the details that will be included when you create an invoice.",
    target: "job-summary-card",
    position: "bottom",
    action: "highlight",
  },
  {
    id: "job-status-info",
    title: "Job Status",
    description:
      "This job is marked as 'Completed' - only completed jobs can be converted to invoices. This ensures all work is finished before billing.",
    target: "job-status",
    position: "bottom",
    action: "highlight",
  },
  {
    id: "customer-details",
    title: "Customer Information",
    description:
      "Here you can see the customer details that will appear on the invoice. This helps ensure you're billing the right customer.",
    target: "customer-info",
    position: "bottom",
    action: "highlight",
  },
  {
    id: "work-details",
    title: "Work Performed",
    description:
      "The job description shows exactly what work was performed. This description will appear on your invoice to explain the charges to your customer.",
    target: "work-details",
    position: "top",
    action: "highlight",
  },
  {
    id: "invoice-potential",
    title: "Ready for Invoicing",
    description:
      "This completed job is now ready to be converted into an invoice. In a real scenario, you would add pricing, materials, and labor costs.",
    target: "invoice-section",
    position: "top",
    action: "highlight",
  },
  {
    id: "next-steps",
    title: "Understanding the Invoice Process",
    description:
      "You've learned how jobs become invoices! In practice, you would: 1) Complete the work, 2) Review the job details, 3) Add pricing, 4) Generate the invoice.",
    target: "completion-button",
    position: "top",
    action: "highlight",
  },
]

interface JobSummaryInvoiceTutorialScreenProps {
  onBackToTutorials: () => void
}

export function JobSummaryInvoiceTutorialScreen({ onBackToTutorials }: JobSummaryInvoiceTutorialScreenProps) {
  // Sample job data for the tutorial
  const sampleJob = {
    id: "JT01026",
    status: "New Job",
    customer: "Sample Customer 2",
    site: "Sample Site 2",
    jobType: "New Job Type",
    category: "Please select an option...",
    description: "khj",
    primaryTrade: "Please select an option...",
    secondaryTrades: "Please select option(s)",
    preferredDate: "",
    customerOrderNumber: "",
    referenceNumber: "",
    jobOwner: "mahnoorjfsm@joblogic.com",
    jobRef1: "",
    jobRef2: "",
    tags: "Please select option(s)",
    dateLogged: "07/09/2025 19:44",
    dateComplete: "",
    recurJob: false,
    priorityLevel: "Please select an option...",
    targetCompletion: "",
    actualProfitToDate: "£0.00",
    completionTimeFromDateLogged: true,
    completionTimeFromEngineerOnsite: false
  }

  // Guide state
  const [isGuideActive, setIsGuideActive] = useState(false)
  const [currentGuideStep, setCurrentGuideStep] = useState(0)
  const [showGuideDialog, setShowGuideDialog] = useState(false)
  const [guideOverlayPosition, setGuideOverlayPosition] = useState({ top: 0, left: 0, width: 0, height: 0 })
  const [showCongratulationsDialog, setShowCongratulationsDialog] = useState(true)
  const [showVideoModal, setShowVideoModal] = useState(false)

  // Refs for guide targeting
  const mainContainerRef = useRef<HTMLDivElement>(null)
  const jobSummaryCardRef = useRef<HTMLDivElement>(null)
  const jobStatusRef = useRef<HTMLDivElement>(null)
  const customerInfoRef = useRef<HTMLDivElement>(null)
  const workDetailsRef = useRef<HTMLDivElement>(null)
  const invoiceSectionRef = useRef<HTMLDivElement>(null)
  const completionButtonRef = useRef<HTMLButtonElement>(null)

  // Auto-start tutorial when user dismisses congratulations dialog
  const startTutorial = () => {
    setShowCongratulationsDialog(false)
    setIsGuideActive(true)
    setCurrentGuideStep(0)
    
    setTimeout(() => {
      setShowGuideDialog(true)
    }, 500)
  }

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
      case "job-summary-card":
        return jobSummaryCardRef.current
      case "job-status":
        return jobStatusRef.current
      case "customer-info":
        return customerInfoRef.current
      case "work-details":
        return workDetailsRef.current
      case "invoice-section":
        return invoiceSectionRef.current
      case "completion-button":
        return completionButtonRef.current
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
    setIsGuideActive(false)
    setShowGuideDialog(false)
    setShowCongratulationsDialog(false)
    if (onBackToTutorials) {
      onBackToTutorials()
    }
  }

  const handleCompleteInvoiceTutorial = () => {
    setIsGuideActive(false)
    setShowGuideDialog(false)
    if (onBackToTutorials) {
      onBackToTutorials()
    }
  }

  const handleInvoiceAction = () => {
    setShowVideoModal(true)
  }

  const currentStep = guideSteps[currentGuideStep]

  return (
    <div ref={mainContainerRef} className="h-full bg-white overflow-auto relative">
      {/* Tutorial Mode Indicator */}
      <div className="bg-teal-50 border-b border-teal-200 px-6 py-3">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-teal-600" />
            <span className="text-sm font-medium text-teal-800">Invoice Tutorial Completed</span>
            <span className="text-xs text-teal-600">Job Summary Review</span>
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

      {/* Header Navigation Tabs */}
      <div className="bg-teal-600 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center space-x-8 px-6">
            <button className="flex items-center gap-2 px-4 py-3 bg-teal-700 text-white border-b-2 border-white">
              <FileText className="w-4 h-4" />
              Details
            </button>
            <button className="flex items-center gap-2 px-4 py-3 text-teal-100 hover:text-white hover:bg-teal-700 transition-colors">
              <User className="w-4 h-4" />
              Contacts
            </button>
            <button className="flex items-center gap-2 px-4 py-3 text-teal-100 hover:text-white hover:bg-teal-700 transition-colors">
              <Building className="w-4 h-4" />
              Assets
            </button>
            <button className="flex items-center gap-2 px-4 py-3 text-teal-100 hover:text-white hover:bg-teal-700 transition-colors">
              <Briefcase className="w-4 h-4" />
              Tasks
            </button>
            <button className="flex items-center gap-2 px-4 py-3 text-teal-100 hover:text-white hover:bg-teal-700 transition-colors">
              <DollarSign className="w-4 h-4" />
              Costs
            </button>
            <button className="flex items-center gap-2 px-4 py-3 text-teal-100 hover:text-white hover:bg-teal-700 transition-colors">
              <Calendar className="w-4 h-4" />
              Visits
            </button>
            <button className="flex items-center gap-2 px-4 py-3 text-teal-100 hover:text-white hover:bg-teal-700 transition-colors">
              <Clock className="w-4 h-4" />
              History
            </button>
            <button className="flex items-center gap-2 px-4 py-3 text-teal-100 hover:text-white hover:bg-teal-700 transition-colors">
              <Info className="w-4 h-4" />
              Info
            </button>
            <button className="flex items-center gap-2 px-4 py-3 text-teal-100 hover:text-white hover:bg-teal-700 transition-colors">
              <FileText className="w-4 h-4" />
              Job Forms
            </button>
          </div>
        </div>
      </div>

      <div className="p-6 max-w-7xl mx-auto">
        {/* Header with Job Actions */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <h1 className="text-2xl font-bold text-gray-900">Jobs</h1>
              <span className="text-gray-400">/</span>
              <span className="text-blue-600">{sampleJob.id}</span>
              <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100 ml-2">
                New Job
              </Badge>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button 
              className="bg-green-500 hover:bg-green-600 text-white"
              onClick={handleInvoiceAction}
            >
              Complete Job
            </Button>
            <Button 
              className="bg-green-500 hover:bg-green-600 text-white"
              onClick={handleInvoiceAction}
            >
              Add Invoice
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Share className="w-4 h-4" />
              Share
            </Button>
            <Button variant="outline" size="icon">
              <span className="text-lg">⋮</span>
            </Button>
          </div>
        </div>

        {/* Job Summary Section */}
        <Card ref={jobSummaryCardRef} className="mb-6">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium">Job Summary</CardTitle>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <span className="sr-only">Collapse</span>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-2">
                <div className="text-sm font-medium text-gray-500">Customer</div>
                <div className="flex items-center gap-2">
                  <span className="text-blue-600 hover:underline cursor-pointer">{sampleJob.customer}</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-sm font-medium text-gray-500">Site</div>
                <div className="flex items-center gap-2">
                  <span className="text-blue-600 hover:underline cursor-pointer">{sampleJob.site}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Profitability Section */}
        <Card className="mb-6">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium">Profitability</CardTitle>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <span className="sr-only">Collapse</span>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-2">
              <div className="text-sm font-medium text-gray-500">Actual Profit to Date</div>
              <div className="text-lg font-semibold">{sampleJob.actualProfitToDate}</div>
            </div>
          </CardContent>
        </Card>

        {/* Details Section */}
        <Card ref={workDetailsRef} className="mb-6">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium">Details</CardTitle>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="h-8 px-3 text-orange-600 border-orange-200 hover:bg-orange-50">
                <Edit className="w-3 h-3 mr-1" />
                Edit
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <span className="sr-only">Collapse</span>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-6">
              {/* Job Details */}
              <div>
                <h3 className="text-base font-semibold text-gray-900 mb-4">Job Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-gray-500">Status</Label>
                        <Select value={sampleJob.status} disabled>
                          <SelectTrigger className="w-full">
                            <SelectValue />
                          </SelectTrigger>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-gray-500">Primary Job Trade</Label>
                        <Select value={sampleJob.primaryTrade} disabled>
                          <SelectTrigger className="w-full">
                            <SelectValue />
                          </SelectTrigger>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-gray-500">Job Type <span className="text-red-500">*</span></Label>
                        <Select value={sampleJob.jobType} disabled>
                          <SelectTrigger className="w-full">
                            <SelectValue />
                          </SelectTrigger>
                        </Select>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-gray-500">Job Category</Label>
                        <Select value={sampleJob.category} disabled>
                          <SelectTrigger className="w-full">
                            <SelectValue />
                          </SelectTrigger>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-gray-500">Secondary Job Trade(s)</Label>
                        <Select value={sampleJob.secondaryTrades} disabled>
                          <SelectTrigger className="w-full">
                            <SelectValue />
                          </SelectTrigger>
                        </Select>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-gray-500">Description<span className="text-red-500">*</span></Label>
                      <Textarea
                        value={sampleJob.description}
                        disabled
                        className="min-h-[100px] resize-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-gray-500">Preferred Appointment Date</Label>
                        <Input 
                          value={sampleJob.preferredDate} 
                          placeholder="DD/MM/YYYY HH:mm"
                          disabled
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-gray-500">Customer Order Number</Label>
                        <Input value={sampleJob.customerOrderNumber} disabled />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-gray-500">Reference Number</Label>
                        <Input value={sampleJob.referenceNumber} disabled />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-gray-500">Job Owner <span className="text-red-500">*</span></Label>
                        <Select value={sampleJob.jobOwner} disabled>
                          <SelectTrigger className="w-full">
                            <SelectValue />
                          </SelectTrigger>
                        </Select>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-gray-500">Job Ref 1</Label>
                        <Input value={sampleJob.jobRef1} disabled />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-gray-500">Job Ref 2</Label>
                        <Select value={sampleJob.jobRef2} disabled>
                          <SelectTrigger className="w-full">
                            <SelectValue />
                          </SelectTrigger>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-gray-500">Next Contact Date</Label>
                      <Input placeholder="DD/MM/YYYY" disabled />
                    </div>
                  </div>
                </div>

                {/* Additional Job Details */}
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-gray-500">Job Number</Label>
                        <div className="text-gray-900">{sampleJob.id}</div>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-gray-500">Logged By</Label>
                        <div className="text-blue-600">{sampleJob.jobOwner}</div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-gray-500">Tag(s)</Label>
                        <Select value={sampleJob.tags} disabled>
                          <SelectTrigger className="w-full">
                            <SelectValue />
                          </SelectTrigger>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-gray-500">Date Complete</Label>
                        <Input 
                          value={sampleJob.dateComplete} 
                          placeholder="DD/MM/YYYY HH:mm"
                          disabled
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-gray-500">Date Logged <span className="text-red-500">*</span></Label>
                      <Input value={sampleJob.dateLogged} disabled />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <input 
                        type="checkbox" 
                        checked={sampleJob.recurJob} 
                        disabled
                        className="rounded border-gray-300"
                      />
                      <Label className="text-sm font-medium text-gray-700">Recur Job</Label>
                      <Info className="w-4 h-4 text-gray-400" />
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <input 
                        type="checkbox" 
                        checked={false} 
                        disabled
                        className="rounded border-gray-300"
                      />
                      <Label className="text-sm font-medium text-gray-700">Req. Approval</Label>
                      <Info className="w-4 h-4 text-gray-400" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Job KPIs Section */}
        <Card className="mb-6">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium">Job KPIs</CardTitle>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <span className="sr-only">Collapse</span>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-500">Priority Level</Label>
                  <Select value={sampleJob.priorityLevel} disabled>
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                  </Select>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <input 
                      type="radio" 
                      checked={sampleJob.completionTimeFromDateLogged} 
                      disabled
                      className="rounded-full border-gray-300"
                    />
                    <Label className="text-sm text-gray-700">Completion Time from Date Logged</Label>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <input 
                    type="radio" 
                    checked={sampleJob.completionTimeFromEngineerOnsite} 
                    disabled
                    className="rounded-full border-gray-300"
                  />
                  <Label className="text-sm text-blue-600 cursor-pointer">Completion Time from Engineer Onsite</Label>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-500">Target Completion Date</Label>
                  <Input 
                    value={sampleJob.targetCompletion} 
                    placeholder="DD/MM/YYYY HH:mm"
                    disabled
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Required Fields Notice */}
        <div className="mb-6 text-sm text-gray-600">
          <span className="text-red-500">*</span> Required Fields
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={handleSkipGuide}>
            Back to Tutorials
          </Button>
          <Button ref={completionButtonRef} onClick={handleCompleteInvoiceTutorial} className="bg-teal-500 hover:bg-teal-600">
            Complete Invoice Tutorial
          </Button>
        </div>
      </div>

      {/* Congratulations Dialog */}
      <Dialog open={showCongratulationsDialog} onOpenChange={setShowCongratulationsDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-teal-600" />
              Job Created Successfully!
            </DialogTitle>
            <DialogDescription className="text-left space-y-3">
              Excellent! You've successfully created a sample job. This is exactly what a completed job looks like before it becomes an invoice. Let's review the job summary to understand how job details translate into invoice information.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center gap-3 mt-4">
            <Button variant="outline" onClick={handleSkipGuide}>
              Skip Review
            </Button>
            <Button onClick={startTutorial} className="bg-teal-600 hover:bg-teal-700">
              Review Job Details
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
                      Complete
                      <CheckCircle className="w-3 h-3 ml-1" />
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Video Placeholder Modal */}
      <Dialog open={showVideoModal} onOpenChange={setShowVideoModal}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Play className="w-5 h-5 text-teal-600" />
              Invoice Creation Tutorial
            </DialogTitle>
            <DialogDescription className="text-left space-y-3">
              <div className="space-y-4">
                <div className="bg-gray-100 rounded-lg flex items-center justify-center h-48">
                  <div className="text-center">
                    <Play className="w-16 h-16 text-gray-400 mx-auto mb-3" />
                    <div className="text-gray-600 font-medium">Video Coming Soon</div>
                    <div className="text-sm text-gray-500">Tutorial: How to Create and Send Invoices</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="font-medium text-gray-900">This video will cover:</div>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li>• Converting completed jobs to invoices</li>
                    <li>• Adding pricing and labor costs</li>
                    <li>• Customizing invoice templates</li>
                    <li>• Sending invoices to customers</li>
                    <li>• Tracking payment status</li>
                  </ul>
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center gap-3 mt-4">
            <Button variant="outline" onClick={() => setShowVideoModal(false)}>
              Close
            </Button>
            <Button className="bg-teal-600 hover:bg-teal-700">
              Notify When Available
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
