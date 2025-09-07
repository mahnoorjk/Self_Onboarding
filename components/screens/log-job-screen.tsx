"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  CalendarIcon,
  Plus,
  X,
  Search,
  ChevronDown,
  ChevronUp,
  HelpCircle,
  Minus,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Target,
  Lightbulb,
  RotateCcw,
  Info,
} from "lucide-react"
import { format } from "date-fns"

const customers = [
  "Sample Customer 1",
  "Sample Customer 2",
  "Sample Customer 3",
  "Acme Ltd",
  "Beta Services",
  "Gamma Corp",
]

const sites = ["Sample Site 1", "Sample Site 2", "Sample Site 3", "Main Office", "Warehouse A", "Factory Floor"]

const jobTypes = ["Maintenance", "Installation", "Repair", "Inspection", "Emergency"]

const jobCategories = ["HVAC", "Electrical", "Plumbing", "General Maintenance"]

const primaryTrades = ["HVAC Technician", "Electrician", "Plumber", "General Maintenance"]

const secondaryTrades = ["Assistant Technician", "Apprentice", "Specialist"]

const engineers = ["John Smith", "Sarah Connor", "Mike Johnson", "Emma Wilson"]

const priorityLevels = ["Low", "Medium", "High", "Urgent"]

interface GuideStep {
  id: string
  title: string
  description: string
  target: string
  position: "top" | "bottom" | "left" | "right"
  action?: string
  tab?: string
  requiresInput?: boolean
  inputField?: string
}

const guideSteps: GuideStep[] = [
  {
    id: "welcome",
    title: "Welcome to Job Logging!",
    description:
      "Let's walk through logging your first job step by step. This tutorial will guide you through each section of the form to help you get started.",
    target: "page-header",
    position: "bottom",
  },
  {
    id: "customer-selection",
    title: "Step 1: Select a Customer",
    description:
      "First, choose the customer for this job. This is a required field. Please select a customer from the dropdown to continue.",
    target: "customer-select",
    position: "bottom",
    action: "highlight",
    requiresInput: true,
    inputField: "customer",
  },
  {
    id: "site-selection",
    title: "Step 2: Choose a Site",
    description:
      "Great! Now select the site where the work will be performed. Please choose a site to continue with the tutorial.",
    target: "site-select",
    position: "bottom",
    action: "highlight",
    requiresInput: true,
    inputField: "site",
  },
  {
    id: "job-type",
    title: "Step 3: Define Job Type",
    description:
      "Perfect! Now select the type of job you're logging. The default 'Maintenance' is already selected, but you can change it if needed.",
    target: "job-type-select",
    position: "bottom",
    action: "highlight",
    requiresInput: true,
    inputField: "jobType",
  },
  {
    id: "description",
    title: "Step 4: Add Job Description",
    description:
      "Excellent! Now provide a detailed description of the work to be performed. Please enter a description to continue.",
    target: "description-textarea",
    position: "top",
    action: "highlight",
    requiresInput: true,
    inputField: "description",
  },
  {
    id: "job-kpis-priority",
    title: "Step 5: Set Job Priority",
    description:
      "Great work! Now let's set the priority level for this job. Click on the Job KPIs tab and select a priority level. This helps with scheduling and resource allocation.",
    target: "priority-select",
    position: "bottom",
    action: "highlight",
    tab: "job-kpis",
  },
  {
    id: "job-allocation-engineer",
    title: "Step 6: Assign Engineer",
    description: "Excellent! Now let's assign the job to an engineer. Click on the Job Allocation tab and select an engineer to assign this job to.",
    target: "engineer-select",
    position: "bottom",
    action: "highlight",
    tab: "job-allocation",
  },
  {
    id: "review-additional-info",
    title: "Step 7: Review Additional Information",
    description:
      "Great job! You've covered the basics of job creation. Would you like to explore additional features like job KPIs, allocation settings, or advanced options? You can continue to save the job or explore these tabs for more functionality.",
    target: "tabs-container",
    position: "bottom",
    action: "highlight",
  },
  {
    id: "save-job",
    title: "Step 8: Save Your Job",
    description:
      "Perfect! You've completed all the required information. Now click the Save button to create your job. Congratulations on logging your first job!",
    target: "save-button",
    position: "top",
    action: "highlight",
  },
]

interface LogJobScreenProps {
  onJobSaveSuccess: () => void
  onNavigateBackToTutorials?: () => void
  showGuide?: boolean // When true, shows simplified version (from completion screen tasks)
}

export function LogJobScreen({ onJobSaveSuccess, onNavigateBackToTutorials, showGuide = false }: LogJobScreenProps) {
  const [activeTab, setActiveTab] = useState("customer-site")
  const [selectedCustomer, setSelectedCustomer] = useState("")
  const [selectedSite, setSelectedSite] = useState("")
  const [showCustomerDropdown, setShowCustomerDropdown] = useState(false)
  const [showSiteDropdown, setShowSiteDropdown] = useState(false)
  const [logFromRecent, setLogFromRecent] = useState(false)
  const [logFromTemplate, setLogFromTemplate] = useState(false)
  const [showAssociatedOnly, setShowAssociatedOnly] = useState(false)
  const [jobType, setJobType] = useState("Maintenance")
  const [jobCategory, setJobCategory] = useState("")
  const [description, setDescription] = useState("")
  const [primaryTrade, setPrimaryTrade] = useState("")
  const [secondaryTradesList, setSecondaryTradesList] = useState<string[]>([])
  const [customerOrderNumber, setCustomerOrderNumber] = useState("")
  const [referenceNumber, setReferenceNumber] = useState("")
  const [jobOwner, setJobOwner] = useState("mahnoor+fsm@joblogic.com")
  const [dateLogged, setDateLogged] = useState<Date>(new Date())
  const [jobRef1, setJobRef1] = useState("")
  const [jobRef2, setJobRef2] = useState("")
  const [reqApproval, setReqApproval] = useState(false)
  const [priorityLevel, setPriorityLevel] = useState("")
  const [completionTimeFromLogged, setCompletionTimeFromLogged] = useState(true)
  const [preferredDate, setPreferredDate] = useState<Date>()
  const [startDate, setStartDate] = useState<Date>(new Date())
  const [endDate, setEndDate] = useState<Date>(new Date())
  const [assignToEngineer, setAssignToEngineer] = useState(true)
  const [selectedEngineer, setSelectedEngineer] = useState("")
  const [deployToMobile, setDeployToMobile] = useState(false)
  const [recurJob, setRecurJob] = useState(false)
  const [contactSearch, setContactSearch] = useState("")
  const [loggedWithinPeriod, setLoggedWithinPeriod] = useState("10 Days")
  const [showCongratulations, setShowCongratulations] = useState(false)
  const [isAdditionalInfoOpen, setIsAdditionalInfoOpen] = useState(false)

  // Guide state
  const [isGuideActive, setIsGuideActive] = useState(false)
  const [currentGuideStep, setCurrentGuideStep] = useState(0)
  const [guideOverlayPosition, setGuideOverlayPosition] = useState({ top: 0, left: 0, width: 0, height: 0 })
  const [showStartGuideButton, setShowStartGuideButton] = useState(false) // Controls the button on the screen

  // Refs for guide targeting
  const pageHeaderRef = useRef<HTMLDivElement>(null)
  const customerSelectRef = useRef<HTMLDivElement>(null)
  const siteSelectRef = useRef<HTMLDivElement>(null)
  const jobTypeSelectRef = useRef<HTMLDivElement>(null)
  const descriptionTextareaRef = useRef<HTMLDivElement>(null)
  const saveButtonRef = useRef<HTMLButtonElement>(null)
  const prioritySelectRef = useRef<HTMLDivElement>(null)
  const engineerSelectRef = useRef<HTMLDivElement>(null)
  const tabsContainerRef = useRef<HTMLDivElement>(null)

  // Initialize guide when showGuide prop is true (auto-start from tutorials)
  useEffect(() => {
    if (showGuide) {
      // If coming from tutorials, start the guide automatically
      const timer = setTimeout(() => {
        startGuide()
      }, 500) // Short delay to ensure page is rendered
      return () => clearTimeout(timer) // Cleanup timer on unmount
    } else {
      // If not coming from tutorials, show the manual start button on the page
      setShowStartGuideButton(true)
    }
  }, [showGuide])

  // Handle guide step changes
  useEffect(() => {
    if (isGuideActive && currentGuideStep < guideSteps.length) {
      const currentStep = guideSteps[currentGuideStep]

      // Switch to the required tab if specified
      if (currentStep.tab && currentStep.tab !== activeTab) {
        setActiveTab(currentStep.tab)
      }

      // Calculate overlay position for highlighting
      // Use a longer delay to ensure elements are rendered after tab switch and scrolling
      const highlightTimer = setTimeout(() => {
        updateGuideOverlay(currentStep)
      }, 500) // Increased delay for better rendering and scrolling sync

      return () => clearTimeout(highlightTimer)
    } else if (isGuideActive && currentGuideStep >= guideSteps.length) {
      // Guide finished
      setIsGuideActive(false)
    }
  }, [currentGuideStep, isGuideActive, activeTab, priorityLevel, selectedEngineer])

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

    // Add scroll and resize event listeners
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleResize, { passive: true })
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
    }
  }, [isGuideActive, currentGuideStep, guideSteps])

  const startGuide = () => {
    setIsGuideActive(true)
    setCurrentGuideStep(0)
    setShowStartGuideButton(false) // Hide the manual start button on the page
  }

  const updateGuideOverlay = (step: GuideStep) => {
    const targetElement = getTargetElement(step.target)
    if (targetElement) {
      // Scroll to the target element
      targetElement.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "nearest",
      })

      // Add a small delay to ensure scrolling completes before calculating position
      setTimeout(() => {
        const rect = targetElement.getBoundingClientRect()
        // Store absolute positions for clip-path calculations
        setGuideOverlayPosition({
          top: rect.top + window.scrollY - 8,
          left: rect.left + window.scrollX - 8,
          width: rect.width + 16,
          height: rect.height + 16,
        })
      }, 300)
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
      case "priority-select":
        return prioritySelectRef.current
      case "engineer-select":
        return engineerSelectRef.current
      case "save-button":
        return saveButtonRef.current
      case "tabs-container":
        return tabsContainerRef.current
      case "job-details-tab":
        return document.querySelector('[data-tab="job-details"]')
      case "job-kpis-tab":
        return document.querySelector('[data-tab="job-kpis"]')
      case "job-allocation-tab":
        return document.querySelector('[data-tab="job-allocation"]')
      default:
        return null
    }
  }

  const validateCurrentStep = (step: GuideStep): boolean => {
    if (!step.requiresInput) return true

    switch (step.inputField) {
      case "customer":
        return selectedCustomer !== ""
      case "site":
        return selectedSite !== ""
      case "jobType":
        return jobType !== ""
      case "description":
        return description.trim() !== ""
      case "priority":
        return priorityLevel !== ""
      case "engineer":
        return assignToEngineer ? selectedEngineer !== "" : true
      default:
        return true
    }
  }

  const handleNextGuideStep = () => {
    const currentStepData = guideSteps[currentGuideStep]

    // Check if current step requires input validation
    if (currentStepData.requiresInput && !validateCurrentStep(currentStepData)) {
      // Show validation message but don't proceed
      return
    }

    if (currentGuideStep < guideSteps.length - 1) {
      const nextStep = currentGuideStep + 1
      setCurrentGuideStep(nextStep)
      
      // Scroll to next target element after a short delay
      setTimeout(() => {
        const nextStepData = guideSteps[nextStep]
        updateGuideOverlay(nextStepData)
      }, 100)
    } else {
      // Guide completed
      setIsGuideActive(false)
    }
  }

  const handlePrevGuideStep = () => {
    if (currentGuideStep > 0) {
      const prevStep = currentGuideStep - 1
      setCurrentGuideStep(prevStep)
      
      // Scroll to previous target element after a short delay
      setTimeout(() => {
        const prevStepData = guideSteps[prevStep]
        updateGuideOverlay(prevStepData)
      }, 100)
    }
  }

  const handleSkipGuide = () => {
    setIsGuideActive(false)
    setShowStartGuideButton(true) // Show the manual start button on the page if skipped
  }

  const handleSecondaryTradeAdd = (trade: string) => {
    if (!secondaryTradesList.includes(trade)) {
      setSecondaryTradesList([...secondaryTradesList, trade])
    }
  }

  const handleSecondaryTradeRemove = (trade: string) => {
    setSecondaryTradesList(secondaryTradesList.filter((t) => t !== trade))
  }

  const handleSave = () => {
    setShowCongratulations(true)
    onJobSaveSuccess()
  }

  const handleContinue = () => {
    setShowCongratulations(false)
    if (onNavigateBackToTutorials) {
      onNavigateBackToTutorials()
    }
  }

  const currentStep = guideSteps[currentGuideStep]
  
  // Determine which version to show:
  // - showGuide=true (activeTab="wizard"): Simplified version (from completion screen tasks)
  // - showGuide=false/undefined (activeTab="tutorials"): BAU version (from normal navigation)
  const isSimplifiedVersion = showGuide // When coming from completion screen tasks

  // SIMPLIFIED VERSION: For users coming from completion screen tasks
  // Shows main fields in one card with additional information in a collapsible section
  if (isSimplifiedVersion) {
    return (
      <div className="h-full bg-white overflow-auto relative">
        {/* Guide Overlay - Same as BAU version */}
        {isGuideActive && currentStep?.action === "highlight" && (
          <>
            {/* Dark overlay covering entire screen with cutout */}
            <div
              className="fixed inset-0 z-40 pointer-events-none"
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
              }}
            />
            {/* Highlighted element border only - no background */}
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

        <div className="p-6">
          <div className="mb-6" ref={pageHeaderRef}>
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Create Your First Job</h1>
                <p className="text-gray-600">Complete the essential fields below to log your job. You can add more details later.</p>
                {isGuideActive && (
                  <div className="flex items-center gap-2 text-sm text-teal-600 bg-teal-50 px-4 py-2 rounded-lg border border-teal-200 shadow-sm mt-3">
                    <Target className="w-4 h-4" />
                    <span className="font-medium">Tutorial Mode Active</span>
                    <span className="text-teal-500">•</span>
                    <span>
                      Step {currentGuideStep + 1} of {guideSteps.length}
                    </span>
                  </div>
                )}
              </div>
              {showStartGuideButton && !isGuideActive && (
                <Button
                  onClick={startGuide}
                  className="bg-teal-600 hover:bg-teal-700 flex items-center gap-2 shadow-lg"
                >
                  <Lightbulb className="w-4 h-4" />
                  Start Tutorial
                </Button>
              )}
            </div>
          </div>

          {/* Simplified Main Fields Card */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-teal-600" />
                Job Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Customer & Site Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2" ref={customerSelectRef}>
                  <Label className="flex items-center gap-2">
                    Customer <span className="text-red-500">*</span>
                    <HelpCircle className="w-4 h-4 text-gray-400" />
                  </Label>
                  <div className="relative">
                    <Select
                      value={selectedCustomer}
                      onValueChange={setSelectedCustomer}
                      open={showCustomerDropdown}
                      onOpenChange={setShowCustomerDropdown}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Please select an option..." />
                      </SelectTrigger>
                      <SelectContent>
                        {customers.map((customer) => (
                          <SelectItem key={customer} value={customer}>
                            {customer}
                          </SelectItem>
                        ))}
                        <div className="p-2 text-xs text-gray-500 border-t">Showing top 10 customers</div>
                      </SelectContent>
                    </Select>
                    <Button
                      size="sm"
                      className="absolute right-8 top-1/2 transform -translate-y-1/2 bg-green-600 hover:bg-green-700 w-6 h-6 p-0"
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-2" ref={siteSelectRef}>
                  <Label className="flex items-center gap-2">
                    Site <span className="text-red-500">*</span>
                    <HelpCircle className="w-4 h-4 text-gray-400" />
                  </Label>
                  <div className="relative">
                    <Select
                      value={selectedSite}
                      onValueChange={setSelectedSite}
                      open={showSiteDropdown}
                      onOpenChange={setShowSiteDropdown}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Please select an option..." />
                      </SelectTrigger>
                      <SelectContent>
                        {sites.map((site) => (
                          <SelectItem key={site} value={site}>
                            {site}
                          </SelectItem>
                        ))}
                        <div className="p-2 text-xs text-gray-500 border-t">Showing top 10 sites</div>
                      </SelectContent>
                    </Select>
                    <Button
                      size="sm"
                      className="absolute right-8 top-1/2 transform -translate-y-1/2 bg-green-600 hover:bg-green-700 w-6 h-6 p-0"
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Job Type & Category Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2" ref={jobTypeSelectRef}>
                  <Label className="flex items-center gap-2">
                    Job Type <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <Select value={jobType} onValueChange={setJobType}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {jobTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Button
                      size="sm"
                      className="absolute right-8 top-1/2 transform -translate-y-1/2 bg-green-600 hover:bg-green-700 w-6 h-6 p-0"
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    Job Category
                    <HelpCircle className="w-4 h-4 text-gray-400" />
                  </Label>
                  <div className="relative">
                    <Select value={jobCategory} onValueChange={setJobCategory}>
                      <SelectTrigger>
                        <SelectValue placeholder="Please select an option..." />
                      </SelectTrigger>
                      <SelectContent>
                        {jobCategories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Button
                      size="sm"
                      className="absolute right-8 top-1/2 transform -translate-y-1/2 bg-green-600 hover:bg-green-700 w-6 h-6 p-0"
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Primary Trade */}
              <div className="space-y-2">
                <Label>Primary Job Trade</Label>
                <div className="relative">
                  <Select value={primaryTrade} onValueChange={setPrimaryTrade}>
                    <SelectTrigger>
                      <SelectValue placeholder="Please select an option..." />
                    </SelectTrigger>
                    <SelectContent>
                      {primaryTrades.map((trade) => (
                        <SelectItem key={trade} value={trade}>
                          {trade}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button
                    size="sm"
                    className="absolute right-8 top-1/2 transform -translate-y-1/2 bg-green-600 hover:bg-green-700 w-6 h-6 p-0"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2" ref={descriptionTextareaRef}>
                <Label className="flex items-center gap-2">
                  Description <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="min-h-[100px]"
                  placeholder="Describe the work to be performed..."
                />
              </div>

              {/* Priority Level */}
              <div className="space-y-2" ref={prioritySelectRef}>
                <Label className="flex items-center gap-2">
                  Priority Level
                  <HelpCircle className="w-4 h-4 text-gray-400" />
                </Label>
                <div className="relative">
                  <Select value={priorityLevel} onValueChange={setPriorityLevel}>
                    <SelectTrigger>
                      <SelectValue placeholder="Please select an option..." />
                    </SelectTrigger>
                    <SelectContent>
                      {priorityLevels.map((level) => (
                        <SelectItem key={level} value={level}>
                          {level}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button
                    size="sm"
                    className="absolute right-8 top-1/2 transform -translate-y-1/2 bg-green-600 hover:bg-green-700 w-6 h-6 p-0"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Engineer Assignment */}
              <div className="space-y-4">
                <Label className="flex items-center gap-2">
                  Assign To
                  <HelpCircle className="w-4 h-4 text-gray-400" />
                </Label>
                <RadioGroup
                  value={assignToEngineer ? "engineer" : "team"}
                  onValueChange={(value) => setAssignToEngineer(value === "engineer")}
                  className="flex space-x-6"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="engineer" id="engineer" className="text-teal-600" />
                    <Label htmlFor="engineer" className="text-teal-600">
                      Engineer
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="team" id="team" />
                    <Label htmlFor="team">Engineer Team</Label>
                  </div>
                </RadioGroup>

                {assignToEngineer && (
                  <div ref={engineerSelectRef}>
                    <Select value={selectedEngineer} onValueChange={setSelectedEngineer}>
                      <SelectTrigger>
                        <SelectValue placeholder="Please select an option..." />
                      </SelectTrigger>
                      <SelectContent>
                        {engineers.map((engineer) => (
                          <SelectItem key={engineer} value={engineer}>
                            {engineer}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Collapsible Additional Information Section */}
          <Collapsible open={isAdditionalInfoOpen} onOpenChange={setIsAdditionalInfoOpen}>
            <Card className="mb-6">
              <CollapsibleTrigger asChild>
                <CardHeader className="cursor-pointer hover:bg-gray-50 transition-colors">
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Info className="w-5 h-5 text-blue-600" />
                      Additional Information
                      <Badge variant="secondary" className="text-xs">
                        Optional
                      </Badge>
                    </div>
                    {isAdditionalInfoOpen ? (
                      <ChevronUp className="w-5 h-5 text-gray-500" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-500" />
                    )}
                  </CardTitle>
                  <p className="text-sm text-gray-600 mt-2">
                    Add reference numbers, scheduling details, and other optional job information
                  </p>
                </CardHeader>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <CardContent className="space-y-6 pt-0">
                  {/* Secondary Job Trade(s) */}
                  <div className="space-y-2">
                    <Label>Secondary Job Trade(s)</Label>
                    <div className="relative">
                      <Select onValueChange={(value) => handleSecondaryTradeAdd(value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Please select option(s)" />
                        </SelectTrigger>
                        <SelectContent>
                          {secondaryTrades.map((trade) => (
                            <SelectItem key={trade} value={trade}>
                              {trade}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <ChevronDown className="absolute right-8 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    </div>
                    {secondaryTradesList.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {secondaryTradesList.map((trade) => (
                          <Badge key={trade} variant="secondary" className="flex items-center gap-1">
                            {trade}
                            <Button
                              size="sm"
                              variant="ghost"
                              className="w-4 h-4 p-0 hover:bg-transparent"
                              onClick={() => handleSecondaryTradeRemove(trade)}
                            >
                              <X className="w-3 h-3" />
                            </Button>
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Reference Numbers */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="flex items-center gap-2">
                        Customer Order Number
                        <HelpCircle className="w-4 h-4 text-gray-400" />
                      </Label>
                      <Input value={customerOrderNumber} onChange={(e) => setCustomerOrderNumber(e.target.value)} />
                    </div>

                    <div className="space-y-2">
                      <Label className="flex items-center gap-2">
                        Reference Number
                        <HelpCircle className="w-4 h-4 text-gray-400" />
                      </Label>
                      <Input value={referenceNumber} onChange={(e) => setReferenceNumber(e.target.value)} />
                    </div>
                  </div>

                  {/* Job Owner & Date Logged */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="flex items-center gap-2">
                        Job Owner <span className="text-red-500">*</span>
                        <HelpCircle className="w-4 h-4 text-gray-400" />
                      </Label>
                      <div className="relative">
                        <Input value={jobOwner} onChange={(e) => setJobOwner(e.target.value)} />
                        <Button
                          size="sm"
                          variant="ghost"
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 w-6 h-6 p-0"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="flex items-center gap-2">
                        Date Logged <span className="text-red-500">*</span>
                        <HelpCircle className="w-4 h-4 text-gray-400" />
                      </Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {dateLogged ? format(dateLogged, "dd/MM/yyyy HH:mm") : "Select date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={dateLogged}
                            onSelect={(date) => date && setDateLogged(date)}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>

                  {/* Job References */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label>Job Ref 1</Label>
                      <Input value={jobRef1} onChange={(e) => setJobRef1(e.target.value)} />
                    </div>

                    <div className="space-y-2">
                      <Label>Job Ref 2</Label>
                      <Select value={jobRef2} onValueChange={setJobRef2}>
                        <SelectTrigger>
                          <SelectValue placeholder="Please select an option..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ref1">Reference 1</SelectItem>
                          <SelectItem value="ref2">Reference 2</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Checkboxes */}
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="req-approval" checked={reqApproval} onCheckedChange={(checked) => setReqApproval(checked === true)} />
                      <Label htmlFor="req-approval">Req. Approval</Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox id="deploy-mobile" checked={deployToMobile} onCheckedChange={(checked) => setDeployToMobile(checked === true)} />
                      <Label htmlFor="deploy-mobile">Deploy to Mobile</Label>
                    </div>
                  </div>

                  {/* Scheduling Dates */}
                  <div className="space-y-4">
                    <h4 className="font-medium text-gray-900">Scheduling</h4>
                    <div className="space-y-2">
                      <Label>Preferred Appointment Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {preferredDate ? format(preferredDate, "dd/MM/yyyy HH:mm") : "DD/MM/YYYY HH:mm"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar mode="single" selected={preferredDate} onSelect={setPreferredDate} initialFocus />
                        </PopoverContent>
                      </Popover>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label>Start Date</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {startDate ? format(startDate, "dd/MM/yyyy HH:mm") : "Select date"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={startDate}
                              onSelect={(date) => date && setStartDate(date)}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </div>

                      <div className="space-y-2">
                        <Label>End Date</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {endDate ? format(endDate, "dd/MM/yyyy HH:mm") : "Select date"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={endDate}
                              onSelect={(date) => date && setEndDate(date)}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </CollapsibleContent>
            </Card>
          </Collapsible>

          {/* Footer Actions */}
          <div className="flex justify-between items-center mt-6 pt-4 border-t">
            <div className="text-sm text-gray-500">
              <span className="text-red-500">*</span>Required Fields
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="bg-transparent">
                Cancel
              </Button>
              <Button ref={saveButtonRef} className="bg-green-600 hover:bg-green-700" onClick={handleSave}>
                Save
              </Button>
            </div>
          </div>
        </div>

        {/* Guide Control - Same as BAU version */}
        {isGuideActive && currentStep && (
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
                
                {/* Show validation message if step requires input and validation fails */}
                {currentStep.requiresInput && !validateCurrentStep(currentStep) && (
                  <div className="bg-amber-50 border border-amber-200 rounded p-2 mb-3">
                    <div className="flex items-center gap-2 text-amber-800">
                      <HelpCircle className="w-3 h-3" />
                      <span className="text-xs font-medium">Complete this field to continue</span>
                    </div>
                  </div>
                )}
                
                <div className="text-xs text-gray-500 mb-3">
                  Step {currentGuideStep + 1} of {guideSteps.length}
                </div>
                
                {/* Progress bar */}
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
                    disabled={currentStep.requiresInput && !validateCurrentStep(currentStep)}
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

        {/* Congratulations Dialog */}
        <Dialog open={showCongratulations} onOpenChange={setShowCongratulations}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader className="text-center">
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <DialogTitle className="text-xl font-bold text-green-600">Congratulations!</DialogTitle>
              <DialogDescription className="text-lg">You just logged your first job!</DialogDescription>
            </DialogHeader>
            <div className="flex justify-center mt-4">
              <Button onClick={handleContinue} className="bg-green-600 hover:bg-green-700">
                Continue
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    )
  }

  // BAU VERSION: For normal navigation from left panel
  // Shows the full tabbed interface with all sections and fields
  return (
    <div className="h-full bg-white overflow-auto relative">
      {/* Guide Overlay - Fixed to avoid CSS conflicts */}
      {isGuideActive && currentStep?.action === "highlight" && (
        <>
          {/* Dark overlay covering entire screen with cutout */}
          <div
            className="fixed inset-0 z-40 pointer-events-none"
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
            }}
          />
          {/* Highlighted element border only - no background */}
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

      <div className="p-6">
        <div className="mb-6" ref={pageHeaderRef}>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Log Job</h1>
              {isGuideActive && (
                <div className="flex items-center gap-2 text-sm text-teal-600 bg-teal-50 px-4 py-2 rounded-lg border border-teal-200 shadow-sm">
                  <Target className="w-4 h-4" />
                  <span className="font-medium">Tutorial Mode Active</span>
                  <span className="text-teal-500">•</span>
                  <span>
                    Step {currentGuideStep + 1} of {guideSteps.length}
                  </span>
                </div>
              )}
            </div>
            {showStartGuideButton && !isGuideActive && (
              <Button
                onClick={startGuide}
                className="bg-teal-600 hover:bg-teal-700 flex items-center gap-2 shadow-lg"
              >
                <Lightbulb className="w-4 h-4" />
                Start Tutorial
              </Button>
            )}
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full" ref={tabsContainerRef}>
          <TabsList className="grid w-full grid-cols-6 mb-6">
            <TabsTrigger
              value="customer-site"
              data-tab="customer-site"
              onClick={() => document.getElementById("section-customer-site")?.scrollIntoView({ behavior: "smooth" })}
            >
              Customer & Site
            </TabsTrigger>

            <TabsTrigger
              value="job-details"
              data-tab="job-details"
              onClick={() => document.getElementById("section-job-details")?.scrollIntoView({ behavior: "smooth" })}
            >
              Job Details
            </TabsTrigger>

            <TabsTrigger
              value="job-kpis"
              data-tab="job-kpis"
              onClick={() => document.getElementById("section-job-kpis")?.scrollIntoView({ behavior: "smooth" })}
            >
              Job KPIs
            </TabsTrigger>

            <TabsTrigger
              value="job-allocation"
              data-tab="job-allocation"
              onClick={() => document.getElementById("section-job-allocation")?.scrollIntoView({ behavior: "smooth" })}
            >
              Job Allocation
            </TabsTrigger>

            <TabsTrigger
              value="recur-job"
              data-tab="recur-job"
              onClick={() => document.getElementById("section-recur-job")?.scrollIntoView({ behavior: "smooth" })}
            >
              Recur Job
            </TabsTrigger>

            <TabsTrigger
              value="contacts"
              data-tab="contacts"
              onClick={() => document.getElementById("section-contacts")?.scrollIntoView({ behavior: "smooth" })}
            >
              Contacts
            </TabsTrigger>
          </TabsList>

          <div className="flex flex-col gap-6">
            <Card id="section-customer-site">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  Customer & Site
                  <Button variant="ghost" size="sm">
                    <Minus className="w-4 h-4" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2" ref={customerSelectRef}>
                    <Label className="flex items-center gap-2">
                      Customer <span className="text-red-500">*</span>
                      <HelpCircle className="w-4 h-4 text-gray-400" />
                    </Label>
                    <div className="relative">
                      <Select
                        value={selectedCustomer}
                        onValueChange={setSelectedCustomer}
                        open={showCustomerDropdown}
                        onOpenChange={setShowCustomerDropdown}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Please select an option..." />
                        </SelectTrigger>
                        <SelectContent>
                          {customers.map((customer) => (
                            <SelectItem key={customer} value={customer}>
                              {customer}
                            </SelectItem>
                          ))}
                          <div className="p-2 text-xs text-gray-500 border-t">Showing top 10 customers</div>
                        </SelectContent>
                      </Select>
                      <Button
                        size="sm"
                        className="absolute right-8 top-1/2 transform -translate-y-1/2 bg-green-600 hover:bg-green-700 w-6 h-6 p-0"
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2" ref={siteSelectRef}>
                    <div className="flex items-center justify-between">
                      <Label className="flex items-center gap-2">
                        Site <span className="text-red-500">*</span>
                        <HelpCircle className="w-4 h-4 text-gray-400" />
                      </Label>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="show-associated"
                          checked={showAssociatedOnly}
                          onCheckedChange={(checked) => setShowAssociatedOnly(checked === true)}
                        />
                        <Label htmlFor="show-associated" className="text-sm">
                          Show Associated only
                        </Label>
                      </div>
                    </div>
                    <div className="relative">
                      <Select
                        value={selectedSite}
                        onValueChange={setSelectedSite}
                        open={showSiteDropdown}
                        onOpenChange={setShowSiteDropdown}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Please select an option..." />
                        </SelectTrigger>
                        <SelectContent>
                          {sites.map((site) => (
                            <SelectItem key={site} value={site}>
                              {site}
                            </SelectItem>
                          ))}
                          <div className="p-2 text-xs text-gray-500 border-t">Showing top 10 sites</div>
                        </SelectContent>
                      </Select>
                      <Button
                        size="sm"
                        className="absolute right-8 top-1/2 transform -translate-y-1/2 bg-green-600 hover:bg-green-700 w-6 h-6 p-0"
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-center space-x-2">
                    <Switch id="log-recent" checked={logFromRecent} onCheckedChange={setLogFromRecent} />
                    <Label htmlFor="log-recent">Log Job from Recent Job</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch id="log-template" checked={logFromTemplate} onCheckedChange={setLogFromTemplate} />
                    <Label htmlFor="log-template">Log Job from Template</Label>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="mt-6" id="section-job-details">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  Job Details
                  <Button variant="ghost" size="sm">
                    <Minus className="w-4 h-4" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2" ref={jobTypeSelectRef}>
                    <Label className="flex items-center gap-2">
                      Job Type <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative">
                      <Select value={jobType} onValueChange={setJobType}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {jobTypes.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Button
                        size="sm"
                        className="absolute right-8 top-1/2 transform -translate-y-1/2 bg-green-600 hover:bg-green-700 w-6 h-6 p-0"
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                      {jobType && (
                        <Button
                          size="sm"
                          variant="ghost"
                          className="absolute right-14 top-1/2 transform -translate-y-1/2 w-6 h-6 p-0"
                          onClick={() => setJobType("")}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Primary Job Trade</Label>
                    <div className="relative">
                      <Select value={primaryTrade} onValueChange={setPrimaryTrade}>
                        <SelectTrigger>
                          <SelectValue placeholder="Please select an option..." />
                        </SelectTrigger>
                        <SelectContent>
                          {primaryTrades.map((trade) => (
                            <SelectItem key={trade} value={trade}>
                              {trade}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Button
                        size="sm"
                        className="absolute right-8 top-1/2 transform -translate-y-1/2 bg-green-600 hover:bg-green-700 w-6 h-6 p-0"
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      Job Category
                      <HelpCircle className="w-4 h-4 text-gray-400" />
                    </Label>
                    <div className="relative">
                      <Select value={jobCategory} onValueChange={setJobCategory}>
                        <SelectTrigger>
                          <SelectValue placeholder="Please select an option..." />
                        </SelectTrigger>
                        <SelectContent>
                          {jobCategories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Button
                        size="sm"
                        className="absolute right-8 top-1/2 transform -translate-y-1/2 bg-green-600 hover:bg-green-700 w-6 h-6 p-0"
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Secondary Job Trade(s)</Label>
                    <div className="relative">
                      <Select onValueChange={(value) => handleSecondaryTradeAdd(value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Please select option(s)" />
                        </SelectTrigger>
                        <SelectContent>
                          {secondaryTrades.map((trade) => (
                            <SelectItem key={trade} value={trade}>
                              {trade}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <ChevronDown className="absolute right-8 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    </div>
                    {secondaryTradesList.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {secondaryTradesList.map((trade) => (
                          <Badge key={trade} variant="secondary" className="flex items-center gap-1">
                            {trade}
                            <Button
                              size="sm"
                              variant="ghost"
                              className="w-4 h-4 p-0 hover:bg-transparent"
                              onClick={() => handleSecondaryTradeRemove(trade)}
                            >
                              <X className="w-3 h-3" />
                            </Button>
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-2" ref={descriptionTextareaRef}>
                  <Label className="flex items-center gap-2">
                    Description <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="min-h-[100px]"
                    placeholder="Describe the work to be performed..."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      Customer Order Number
                      <HelpCircle className="w-4 h-4 text-gray-400" />
                    </Label>
                    <Input value={customerOrderNumber} onChange={(e) => setCustomerOrderNumber(e.target.value)} />
                  </div>

                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      Reference Number
                      <HelpCircle className="w-4 h-4 text-gray-400" />
                    </Label>
                    <Input value={referenceNumber} onChange={(e) => setReferenceNumber(e.target.value)} />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      Job Owner <span className="text-red-500">*</span>
                      <HelpCircle className="w-4 h-4 text-gray-400" />
                    </Label>
                    <div className="relative">
                      <Input value={jobOwner} onChange={(e) => setJobOwner(e.target.value)} />
                      <Button
                        size="sm"
                        variant="ghost"
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 w-6 h-6 p-0"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      Date Logged <span className="text-red-500">*</span>
                      <HelpCircle className="w-4 h-4 text-gray-400" />
                    </Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {dateLogged ? format(dateLogged, "dd/MM/yyyy HH:mm") : "Select date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={dateLogged}
                          onSelect={(date) => date && setDateLogged(date)}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Job Ref 1</Label>
                    <Input value={jobRef1} onChange={(e) => setJobRef1(e.target.value)} />
                  </div>

                  <div className="space-y-2">
                    <Label>Job Ref 2</Label>
                    <Select value={jobRef2} onValueChange={setJobRef2}>
                      <SelectTrigger>
                        <SelectValue placeholder="Please select an option..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ref1">Reference 1</SelectItem>
                        <SelectItem value="ref2">Reference 2</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox id="req-approval" checked={reqApproval} onCheckedChange={(checked) => setReqApproval(checked === true)} />
                  <Label htmlFor="req-approval">Req. Approval</Label>
                </div>
              </CardContent>
            </Card>

            <Card id="section-job-kpis">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  Job KPIs
                  <Button variant="ghost" size="sm">
                    <Minus className="w-4 h-4" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2" ref={prioritySelectRef}>
                  <Label className="flex items-center gap-2">
                    Priority Level
                    <HelpCircle className="w-4 h-4 text-gray-400" />
                  </Label>
                  <div className="relative">
                    <Select value={priorityLevel} onValueChange={setPriorityLevel}>
                      <SelectTrigger>
                        <SelectValue placeholder="Please select an option..." />
                      </SelectTrigger>
                      <SelectContent>
                        {priorityLevels.map((level) => (
                          <SelectItem key={level} value={level}>
                            {level}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Button
                      size="sm"
                      className="absolute right-8 top-1/2 transform -translate-y-1/2 bg-green-600 hover:bg-green-700 w-6 h-6 p-0"
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="completion-logged"
                      checked={completionTimeFromLogged}
                      onCheckedChange={setCompletionTimeFromLogged}
                    />
                    <Label htmlFor="completion-logged" className="text-teal-600">
                      Completion Time from Date Logged
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="completion-onsite"
                      checked={!completionTimeFromLogged}
                      onCheckedChange={(checked) => setCompletionTimeFromLogged(!checked)}
                    />
                    <Label htmlFor="completion-onsite">Completion Time from Engineer Onsite</Label>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="mt-6" id="section-job-allocation">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  Job Allocation
                  <Button variant="ghost" size="sm">
                    <Minus className="w-4 h-4" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>Preferred Appointment Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {preferredDate ? format(preferredDate, "dd/MM/yyyy HH:mm") : "DD/MM/YYYY HH:mm"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" selected={preferredDate} onSelect={setPreferredDate} initialFocus />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Start Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {startDate ? format(startDate, "dd/MM/yyyy HH:mm") : "Select date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={startDate}
                          onSelect={(date) => date && setStartDate(date)}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="space-y-2">
                    <Label>End Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {endDate ? format(endDate, "dd/MM/yyyy HH:mm") : "Select date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={endDate}
                          onSelect={(date) => date && setEndDate(date)}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                <div className="space-y-4">
                  <RadioGroup
                    value={assignToEngineer ? "engineer" : "team"}
                    onValueChange={(value) => setAssignToEngineer(value === "engineer")}
                    className="flex space-x-6"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="engineer" id="engineer" className="text-teal-600" />
                      <Label htmlFor="engineer" className="text-teal-600">
                        Engineer
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="team" id="team" />
                      <Label htmlFor="team">Engineer Team</Label>
                    </div>
                  </RadioGroup>

                  {assignToEngineer && (
                    <div ref={engineerSelectRef}>
                      <Select value={selectedEngineer} onValueChange={setSelectedEngineer}>
                        <SelectTrigger>
                          <SelectValue placeholder="Please select an option..." />
                        </SelectTrigger>
                        <SelectContent>
                          {engineers.map((engineer) => (
                            <SelectItem key={engineer} value={engineer}>
                              {engineer}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox id="deploy-mobile" checked={deployToMobile} onCheckedChange={(checked) => setDeployToMobile(checked === true)} />
                  <Label htmlFor="deploy-mobile">Deploy to Mobile</Label>
                </div>
              </CardContent>
            </Card>

            <Card className="mt-6" id="section-recur-job">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  Recur Job
                  <Button variant="ghost" size="sm">
                    <RotateCcw className="w-4 h-4" />
                  </Button>
                </CardTitle>
              </CardHeader>
            </Card>

            <Card className="mt-6" id="section-contacts">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  Contacts
                  <Button variant="ghost" size="sm">
                    <Minus className="w-4 h-4" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Search Contacts"
                      value={contactSearch}
                      onChange={(e) => setContactSearch(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Button className="bg-gray-300 hover:bg-gray-400 text-gray-700">Add Contact</Button>
                </div>
                <div className="text-center py-8 text-gray-500">No matching results found.</div>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  Recent Jobs/Quotes
                  <Button variant="ghost" size="sm">
                    <Minus className="w-4 h-4" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2">
                  <Label className="flex items-center gap-2">
                    Logged Within Last / Next
                    <HelpCircle className="w-4 h-4 text-gray-400" />
                  </Label>
                  <Select value={loggedWithinPeriod} onValueChange={setLoggedWithinPeriod}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="10 Days">10 Days</SelectItem>
                      <SelectItem value="30 Days">30 Days</SelectItem>
                      <SelectItem value="90 Days">90 Days</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="bg-teal-600 text-white p-2 rounded">
                  <div className="flex">
                    <div className="bg-teal-700 px-3 py-1 rounded-l text-sm">Jobs (0)</div>
                    <div className="bg-teal-600 px-3 py-1 rounded-r text-sm">Quotes (0)</div>
                  </div>
                </div>

                <div className="text-center py-8 text-gray-500">No matching results found.</div>
              </CardContent>
            </Card>
          </div>
        </Tabs>

        {/* Footer Actions */}
        <div className="flex justify-between items-center mt-6 pt-4 border-t">
          <div className="text-sm text-gray-500">
            <span className="text-red-500">*</span>Required Fields
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="bg-transparent">
              Cancel
            </Button>
            <Button ref={saveButtonRef} className="bg-green-600 hover:bg-green-700" onClick={handleSave}>
              Save
            </Button>
          </div>
        </div>
      </div>

      {/* Single Unified Guide Control - Bottom Right Corner */}
      {isGuideActive && currentStep && (
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
              
              {/* Show validation message if step requires input and validation fails */}
              {currentStep.requiresInput && !validateCurrentStep(currentStep) && (
                <div className="bg-amber-50 border border-amber-200 rounded p-2 mb-3">
                  <div className="flex items-center gap-2 text-amber-800">
                    <HelpCircle className="w-3 h-3" />
                    <span className="text-xs font-medium">Complete this field to continue</span>
                  </div>
                </div>
              )}
              
              <div className="text-xs text-gray-500 mb-3">
                Step {currentGuideStep + 1} of {guideSteps.length}
              </div>
              
              {/* Progress bar */}
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
                  disabled={currentStep.requiresInput && !validateCurrentStep(currentStep)}
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

      {/* Congratulations Dialog */}
      <Dialog open={showCongratulations} onOpenChange={setShowCongratulations}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <DialogTitle className="text-xl font-bold text-green-600">Congratulations!</DialogTitle>
            <DialogDescription className="text-lg">You just logged your first job!</DialogDescription>
          </DialogHeader>
          <div className="flex justify-center mt-4">
            <Button onClick={handleContinue} className="bg-green-600 hover:bg-green-700">
              Continue
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
