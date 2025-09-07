"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, CalendarIcon, Plus, X, Target, ArrowLeft, ArrowRight, ChevronRight, ChevronLeft, CheckCircle, Lightbulb, HelpCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"

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
    title: "Welcome to Quote Creation!",
    description: "Let's walk through creating your first quote step by step. This tutorial will guide you through all the essential fields to help you create professional quotes.",
    target: "page-header",
    position: "bottom",
    action: "highlight",
  },
  {
    id: "customer-selection",
    title: "Step 1: Select a Customer",
    description: "First, choose the customer for this quote. This is a required field. Please select a customer from the dropdown to continue.",
    target: "customer-select",
    position: "bottom",
    action: "highlight",
    requiresInput: true,
    inputField: "customer",
  },
  {
    id: "site-selection",
    title: "Step 2: Choose a Site",
    description: "Great! Now select the site where the work will be performed. Please choose a site to continue with the tutorial.",
    target: "site-select",
    position: "bottom",
    action: "highlight",
    requiresInput: true,
    inputField: "site",
  },
  {
    id: "job-type",
    title: "Step 3: Define Job Type",
    description: "Select the type of work this quote is for. This helps categorise your quotes and makes them easier to manage.",
    target: "job-type-select",
    position: "bottom",
    action: "highlight",
    requiresInput: true,
    inputField: "jobType",
  },
  {
    id: "description",
    title: "Step 4: Add Quote Description",
    description: "Provide a detailed description of the work to be quoted. This helps customers understand exactly what they're paying for.",
    target: "description-textarea",
    position: "top",
    action: "highlight",
    requiresInput: true,
    inputField: "description",
  },
  {
    id: "quote-reference",
    title: "Step 5: Quote Reference Number",
    description: "Enter a unique reference number for this quote. This helps you track and identify quotes easily.",
    target: "quote-reference-input",
    position: "bottom",
    action: "highlight",
  },
  {
    id: "source-enquiry",
    title: "Step 6: Source of Enquiry",
    description: "Select how this enquiry came to you. This helps track your best lead sources and marketing effectiveness.",
    target: "source-enquiry-select",
    position: "bottom",
    action: "highlight",
  },
  {
    id: "save-quote",
    title: "Step 7: Save Your Quote",
    description: "Perfect! You've filled in all the essential information. Now click the Save button to create your first quote. Congratulations on creating your first quote!",
    target: "save-button",
    position: "top",
    action: "highlight",
  },
]

interface LogQuoteScreenProps {
  onQuoteSaveSuccess?: () => void
  onNavigateBackToTutorials?: () => void
  showGuide?: boolean
}

export function LogQuoteScreen({ 
  onQuoteSaveSuccess, 
  onNavigateBackToTutorials, 
  showGuide = false 
}: LogQuoteScreenProps) {
  const [customer, setCustomer] = useState("")
  const [site, setSite] = useState("")
  const [logQuoteFromTemplate, setLogQuoteFromTemplate] = useState(false)
  const [logQuoteFromRecentQuote, setLogQuoteFromRecentQuote] = useState(false)
  const [jobType, setJobType] = useState("")
  const [jobCategory, setJobCategory] = useState("")
  const [description, setDescription] = useState("")
  const [tags, setTags] = useState<string[]>([])
  const [title, setTitle] = useState("")
  const [quoteReferenceNumber, setQuoteReferenceNumber] = useState("")
  const [sourceOfEnquiry, setSourceOfEnquiry] = useState("")
  const [quoteTrade, setQuoteTrade] = useState("")
  const [priorityLevel, setPriorityLevel] = useState("")
  const [quoteRef1, setQuoteRef1] = useState("")
  const [quoteRef2, setQuoteRef2] = useState("")
  const [expiryDate, setExpiryDate] = useState("")
  const [expectedSaleDate, setExpectedSaleDate] = useState("")
  const [quoteOwner, setQuoteOwner] = useState("mahnoorj+fsm@joblogic.com")
  const [chanceOfSale, setChanceOfSale] = useState([25])
  const [showCongratulations, setShowCongratulations] = useState(false)

  // Guide state
  const [isGuideActive, setIsGuideActive] = useState(false)
  const [currentGuideStep, setCurrentGuideStep] = useState(0)
  const [showGuideDialog, setShowGuideDialog] = useState(false)
  const [guideOverlayPosition, setGuideOverlayPosition] = useState({ top: 0, left: 0, width: 0, height: 0 })
  const [showStartGuideButton, setShowStartGuideButton] = useState(false)
  const [showWelcomeDialog, setShowWelcomeDialog] = useState(false)

  // Refs for guide targeting
  const mainContainerRef = useRef<HTMLDivElement>(null)
  const pageHeaderRef = useRef<HTMLDivElement>(null)
  const customerSelectRef = useRef<HTMLDivElement>(null)
  const siteSelectRef = useRef<HTMLDivElement>(null)
  const jobTypeSelectRef = useRef<HTMLDivElement>(null)
  const descriptionTextareaRef = useRef<HTMLDivElement>(null)
  const quoteReferenceInputRef = useRef<HTMLDivElement>(null)
  const sourceEnquirySelectRef = useRef<HTMLDivElement>(null)
  const saveButtonRef = useRef<HTMLButtonElement>(null)

  // Initialize guide when showGuide prop is true (auto-start from completion screen)
  useEffect(() => {
    if (showGuide) {
      // If coming from completion screen, start the guide directly without welcome dialog
      const timer = setTimeout(() => {
        startGuide()
      }, 500)
      return () => clearTimeout(timer)
    } else {
      // If not coming from completion screen, show the manual start button
      setShowStartGuideButton(true)
    }
  }, [showGuide])

  // Handle guide step changes
  useEffect(() => {
    if (isGuideActive && currentGuideStep < guideSteps.length) {
      const currentStep = guideSteps[currentGuideStep]

      // Calculate overlay position for highlighting
      const highlightTimer = setTimeout(() => {
        updateGuideOverlay(currentStep)
        scrollToTarget(currentStep)
        setShowGuideDialog(true)
      }, 300)

      return () => clearTimeout(highlightTimer)
    } else if (isGuideActive && currentGuideStep >= guideSteps.length) {
      // Guide finished
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

    // Add scroll and resize event listeners
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleResize, { passive: true })
    
    // Also listen to scroll events on the main container
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

  const startGuide = () => {
    setShowWelcomeDialog(false)
    setIsGuideActive(true)
    setCurrentGuideStep(0)
    setShowStartGuideButton(false)
    setShowGuideDialog(true)
    
    // Remove pre-filled data - fields should start empty
  }

  const updateGuideOverlay = (step: GuideStep) => {
    const targetElement = getTargetElement(step.target)
    if (targetElement) {
      const rect = targetElement.getBoundingClientRect()
      // Store absolute positions for clip-path calculations
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
      // Calculate if element is in viewport
      const rect = targetElement.getBoundingClientRect()
      const isInViewport = rect.top >= 0 && rect.bottom <= window.innerHeight
      
      if (!isInViewport) {
        // Scroll element into view with some padding
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
          inline: 'nearest'
        })
        
        // Update overlay position after scroll completes
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
      case "quote-reference-input":
        return quoteReferenceInputRef.current
      case "source-enquiry-select":
        return sourceEnquirySelectRef.current
      case "save-button":
        return saveButtonRef.current
      default:
        return null
    }
  }

  const validateCurrentStep = (step: GuideStep): boolean => {
    if (!step.requiresInput) return true

    switch (step.inputField) {
      case "customer":
        return customer.trim() !== ""
      case "site":
        return site.trim() !== ""
      case "jobType":
        return jobType.trim() !== ""
      case "description":
        return description.trim() !== ""
      case "quoteReferenceNumber":
        return quoteReferenceNumber.trim() !== ""
      case "sourceOfEnquiry":
        return sourceOfEnquiry.trim() !== ""
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
        scrollToTarget(nextStepData)
      }, 100)
    } else {
      // Guide completed
      setIsGuideActive(false)
      setShowGuideDialog(false)
    }
  }

  const handlePrevGuideStep = () => {
    if (currentGuideStep > 0) {
      const prevStep = currentGuideStep - 1
      setCurrentGuideStep(prevStep)
      
      // Scroll to previous target element after a short delay
      setTimeout(() => {
        const prevStepData = guideSteps[prevStep]
        scrollToTarget(prevStepData)
      }, 100)
    }
  }

  const handleSkipGuide = () => {
    setIsGuideActive(false)
    setShowGuideDialog(false)
    setShowStartGuideButton(true) // Show the manual start button on the page if skipped
    setShowWelcomeDialog(false) // Also close welcome dialog if open
  }

  const handleSave = () => {
    console.log("Quote saved!", { customer, site, jobType, description, quoteReferenceNumber, sourceOfEnquiry })
    setShowCongratulations(true)
    if (onQuoteSaveSuccess) {
      onQuoteSaveSuccess()
    }

    // If guide is active, complete it
    if (isGuideActive) {
      setIsGuideActive(false)
      setShowGuideDialog(false)
    }
  }

  const handleCancel = () => {
    if (showGuide && onNavigateBackToTutorials) {
      onNavigateBackToTutorials()
    }
  }

  const handleContinueToLearningPath = () => {
    setShowCongratulations(false)
    if (onNavigateBackToTutorials) {
      onNavigateBackToTutorials()
    }
  }

  const addTag = (tag: string) => {
    if (tag && !tags.includes(tag)) {
      setTags([...tags, tag])
    }
  }

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove))
  }

  const currentStep = guideSteps[currentGuideStep]

  // Sample data for dropdowns
  const customers = [
    "Sample Customer 1",
    "Sample Customer 2", 
    "Sample Customer 3",
    "Acme Ltd",
    "Beta Services",
    "Gamma Corp",
  ]

  const sites = [
    "Sample Site 1",
    "Sample Site 2",
    "Sample Site 3", 
    "Main Office",
    "Warehouse A",
    "Factory Floor"
  ]

  const jobTypes = [
    "Maintenance",
    "Installation", 
    "Repair",
    "Inspection",
    "Emergency"
  ]

  const jobCategories = [
    "HVAC",
    "Electrical",
    "Plumbing", 
    "General Maintenance"
  ]

  const sourceOptions = [
    "Website",
    "Phone Call",
    "Email",
    "Referral",
    "Walk-in",
    "Social Media"
  ]

  return (
    <div ref={mainContainerRef} className="h-full bg-white overflow-auto relative">
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

      {/* Start Guide Button */}
      {showStartGuideButton && !isGuideActive && (
        <Button 
          onClick={startGuide}
          className="fixed top-20 right-6 z-50 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-3 shadow-lg"
          title="Start guided tour"
        >
          <Target className="w-5 h-5" />
        </Button>
      )}


      <div className="p-6 max-w-7xl mx-auto">
        <div ref={pageHeaderRef} className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Log Quote</h1>
          <div className="text-sm text-gray-600">
            Fill in the details below to create a new quote for your customer.
          </div>
        </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Quote Form */}
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
                    <Select value={customer} onValueChange={setCustomer}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Please select an option..." />
                      </SelectTrigger>
                      <SelectContent>
                        {customers.map((customerName) => (
                          <SelectItem key={customerName} value={customerName}>
                            {customerName}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Button 
                      size="sm" 
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 bg-green-500 hover:bg-green-600"
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                </div>

                {/* Site Selection */}
                <div ref={siteSelectRef} className="space-y-2">
                  <Label htmlFor="site" className="text-sm font-medium">
                    Site <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <Select value={site} onValueChange={setSite}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Please select an option..." />
                      </SelectTrigger>
                      <SelectContent>
                        {sites.map((siteName) => (
                          <SelectItem key={siteName} value={siteName}>
                            {siteName}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Button 
                      size="sm" 
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 bg-green-500 hover:bg-green-600"
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Template Options */}
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="templateToggle"
                    checked={logQuoteFromTemplate}
                    onChange={(e) => setLogQuoteFromTemplate(e.target.checked)}
                    className="rounded border-gray-300"
                  />
                  <Label htmlFor="templateToggle" className="text-sm">
                    Log Quote from Template
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="recentToggle"
                    checked={logQuoteFromRecentQuote}
                    onChange={(e) => setLogQuoteFromRecentQuote(e.target.checked)}
                    className="rounded border-gray-300"
                  />
                  <Label htmlFor="recentToggle" className="text-sm">
                    Log Quote from Recent Quote
                  </Label>
                </div>
              </div>

              {/* Quote Details Section */}
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quote Details</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Job Type */}
                  <div ref={jobTypeSelectRef} className="space-y-2">
                    <Label htmlFor="jobType" className="text-sm font-medium">
                      Job Type <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative">
                      <Select value={jobType} onValueChange={setJobType}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Please select an option..." />
                        </SelectTrigger>
                        <SelectContent>
                          {jobTypes.map((type) => (
                            <SelectItem key={type} value={type.toLowerCase()}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Button 
                        size="sm" 
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 bg-green-500 hover:bg-green-600"
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>

                  {/* Job Category */}
                  <div className="space-y-2">
                    <Label htmlFor="jobCategory" className="text-sm font-medium">
                      Job Category
                    </Label>
                    <div className="relative">
                      <Select value={jobCategory} onValueChange={setJobCategory}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Please select an option..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="category1">Category 1</SelectItem>
                          <SelectItem value="category2">Category 2</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button 
                        size="sm" 
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 bg-green-500 hover:bg-green-600"
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
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
                    placeholder="Enter quote description..."
                    className="min-h-[100px]"
                  />
                </div>

                {/* Tags */}
                <div className="mt-6 space-y-2">
                  <Label className="text-sm font-medium">Tag(s)</Label>
                  <Select onValueChange={addTag}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Please select option(s)" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="urgent">Urgent</SelectItem>
                      <SelectItem value="priority">Priority</SelectItem>
                      <SelectItem value="commercial">Commercial</SelectItem>
                      <SelectItem value="residential">Residential</SelectItem>
                    </SelectContent>
                  </Select>
                  {tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {tags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="flex items-center gap-1">
                          {tag}
                          <X 
                            className="h-3 w-3 cursor-pointer" 
                            onClick={() => removeTag(tag)}
                          />
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>

                {/* Title */}
                <div className="mt-6 space-y-2">
                  <Label htmlFor="title" className="text-sm font-medium">Title</Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter title..."
                  />
                </div>

                {/* Quote Reference Number */}
                <div ref={quoteReferenceInputRef} className="mt-6 space-y-2">
                  <Label htmlFor="quoteRef" className="text-sm font-medium">
                    Quote Reference Number
                  </Label>
                  <Input
                    id="quoteRef"
                    value={quoteReferenceNumber}
                    onChange={(e) => setQuoteReferenceNumber(e.target.value)}
                    placeholder="Enter reference number..."
                  />
                </div>

                {/* Additional Fields Grid */}
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Source of Enquiry */}
                  <div ref={sourceEnquirySelectRef} className="space-y-2">
                    <Label htmlFor="sourceEnquiry" className="text-sm font-medium">
                      Source of Enquiry
                    </Label>
                    <div className="relative">
                      <Select value={sourceOfEnquiry} onValueChange={setSourceOfEnquiry}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Please select an option..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="website">Website</SelectItem>
                          <SelectItem value="referral">Referral</SelectItem>
                          <SelectItem value="phone">Phone</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button 
                        size="sm" 
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 bg-green-500 hover:bg-green-600"
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>

                  {/* Quote Trade */}
                  <div className="space-y-2">
                    <Label htmlFor="quoteTrade" className="text-sm font-medium">Quote Trade</Label>
                    <div className="relative">
                      <Select value={quoteTrade} onValueChange={setQuoteTrade}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Please select an option..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="electrical">Electrical</SelectItem>
                          <SelectItem value="plumbing">Plumbing</SelectItem>
                          <SelectItem value="hvac">HVAC</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button 
                        size="sm" 
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 bg-green-500 hover:bg-green-600"
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>

                  {/* Priority Level */}
                  <div className="space-y-2">
                    <Label htmlFor="priorityLevel" className="text-sm font-medium">Priority Level</Label>
                    <div className="relative">
                      <Select value={priorityLevel} onValueChange={setPriorityLevel}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Please select an option..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                          <SelectItem value="urgent">Urgent</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button 
                        size="sm" 
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 bg-green-500 hover:bg-green-600"
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>

                  {/* Quote Ref 1 */}
                  <div className="space-y-2">
                    <Label htmlFor="quoteRef1" className="text-sm font-medium">Quote Ref 1</Label>
                    <Input
                      id="quoteRef1"
                      value={quoteRef1}
                      onChange={(e) => setQuoteRef1(e.target.value)}
                      placeholder="Enter reference..."
                    />
                  </div>
                </div>

                {/* Quote Ref 2 */}
                <div className="mt-6 space-y-2">
                  <Label htmlFor="quoteRef2" className="text-sm font-medium">Quote Ref 2</Label>
                  <Select value={quoteRef2} onValueChange={setQuoteRef2}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Please select an option..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ref1">Reference 1</SelectItem>
                      <SelectItem value="ref2">Reference 2</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Date Fields */}
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Expiry Date */}
                  <div className="space-y-2">
                    <Label htmlFor="expiryDate" className="text-sm font-medium">
                      Expiry Date
                    </Label>
                    <Input
                      id="expiryDate"
                      type="date"
                      value={expiryDate}
                      onChange={(e) => setExpiryDate(e.target.value)}
                      placeholder="DD/MM/YYYY"
                    />
                  </div>

                  {/* Expected Sale Date */}
                  <div className="space-y-2">
                    <Label htmlFor="expectedSaleDate" className="text-sm font-medium">Expected Sale Date</Label>
                    <Input
                      id="expectedSaleDate"
                      type="date"
                      value={expectedSaleDate}
                      onChange={(e) => setExpectedSaleDate(e.target.value)}
                      placeholder="DD/MM/YYYY"
                    />
                  </div>
                </div>

                {/* Quote Owner */}
                <div className="mt-6 space-y-2">
                  <Label htmlFor="quoteOwner" className="text-sm font-medium">
                    Quote Owner <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <Select value={quoteOwner} onValueChange={setQuoteOwner}>
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mahnoorj+fsm@joblogic.com">mahnoorj+fsm@joblogic.com</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button 
                      size="sm" 
                      className="absolute right-8 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 text-red-500 hover:text-red-700"
                      variant="ghost"
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                </div>

                {/* Chance of Sale */}
                <div className="mt-6 space-y-4">
                  <Label className="text-sm font-medium">Chance of Sale</Label>
                  <div className="space-y-2">
                    <Slider
                      value={chanceOfSale}
                      onValueChange={setChanceOfSale}
                      max={100}
                      min={0}
                      step={25}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>25%</span>
                      <span>50%</span>
                      <span>75%</span>
                      <span>100%</span>
                    </div>
                  </div>
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
                  Save
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Contacts Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Contacts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center text-gray-500 py-8">
                No matching results found.
              </div>
            </CardContent>
          </Card>

          {/* Recent Jobs/Quotes */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Recent Jobs/Quotes</CardTitle>
              <div className="text-sm text-gray-600">
                Logged Within Last 7 Days
              </div>
            </CardHeader>
            <CardContent>
              <Select defaultValue="10">
                <SelectTrigger className="w-full mb-4">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10 Days</SelectItem>
                  <SelectItem value="30">30 Days</SelectItem>
                  <SelectItem value="90">90 Days</SelectItem>
                </SelectContent>
              </Select>

              <Tabs defaultValue="jobs" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="jobs" className="text-xs">Jobs (0)</TabsTrigger>
                  <TabsTrigger value="quotes" className="text-xs">Quotes (0)</TabsTrigger>
                </TabsList>
                <TabsContent value="jobs" className="mt-4">
                  <div className="text-center text-gray-500 py-4">
                    No matching results found.
                  </div>
                </TabsContent>
                <TabsContent value="quotes" className="mt-4">
                  <div className="text-center text-gray-500 py-4">
                    No matching results found.
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
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
                  disabled={!!(currentStep.requiresInput && !validateCurrentStep(currentStep))}
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
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              Congratulations!
            </DialogTitle>
            <DialogDescription>
              You've successfully completed the quote creation tutorial! You're now ready to create professional quotes for your customers.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={handleContinueToLearningPath} className="bg-green-600 hover:bg-green-700">
              Continue
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Welcome Dialog */}
      <Dialog open={showWelcomeDialog} onOpenChange={setShowWelcomeDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Target className="w-5 h-5 text-teal-600" />
              Welcome to Quote Creation!
            </DialogTitle>
            <DialogDescription>
              Let's walk through creating your first quote step by step. This tutorial will guide you through all the essential fields to help you create professional quotes.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex gap-2">
            <Button variant="outline" onClick={() => setShowWelcomeDialog(false)}>
              Skip Tutorial
            </Button>
            <Button onClick={startGuide} className="bg-teal-600 hover:bg-teal-700">
              Start Tutorial
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
