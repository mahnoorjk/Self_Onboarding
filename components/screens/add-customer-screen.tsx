"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Plus, Info, X, ArrowRight, ArrowLeft, CheckCircle, Target, Lightbulb, HelpCircle } from "lucide-react"

interface AddCustomerScreenProps {
  onCustomerSaveSuccess: () => void
  onNavigateBackToTutorials?: () => void
  showGuide?: boolean
}

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
    title: "Welcome to Customer Creation!",
    description:
      "Let's walk through creating your first customer step by step. This tutorial will guide you through all the essential fields.",
    target: "page-header",
    position: "bottom",
  },
  {
    id: "customer-name",
    title: "Step 1: Enter Customer Name",
    description:
      "Start by entering the customer's name. This is a required field and will be the primary identifier for this customer. Please enter a customer name to continue.",
    target: "customer-name-input",
    position: "bottom",
    action: "highlight",
    requiresInput: true,
    inputField: "customerName",
  },
  {
    id: "address-section",
    title: "Step 2: Add Customer Address",
    description:
      "Fill in the customer's address details. Start with the street address in the text area below. Please enter an address to continue.",
    target: "address-textarea",
    position: "bottom",
    action: "highlight",
    requiresInput: true,
    inputField: "address",
  },
  {
    id: "city-field",
    title: "Step 3: Enter City",
    description: "Add the city where your customer is located. Please enter a city to continue.",
    target: "city-input",
    position: "bottom",
    action: "highlight",
    requiresInput: true,
    inputField: "city",
  },
  {
    id: "postcode-field",
    title: "Step 4: Add Postcode",
    description: "Enter the postcode for accurate location identification. Please enter a postcode to continue.",
    target: "postcode-input",
    position: "bottom",
    action: "highlight",
    requiresInput: true,
    inputField: "postcode",
  },
  {
    id: "customer-type",
    title: "Step 5: Select Customer Type",
    description:
      "Choose whether this is a residential or commercial customer. This helps categorize your customer base. Please select a customer type to continue.",
    target: "customer-type-select",
    position: "bottom",
    action: "highlight",
    requiresInput: true,
    inputField: "customerType",
  },
  {
    id: "main-contact-name",
    title: "Step 6: Add Main Contact First Name",
    description:
      "Enter the first name of the main contact person for this customer. Please enter a first name to continue.",
    target: "contact-first-name",
    position: "bottom",
    action: "highlight",
    requiresInput: true,
    inputField: "contactFirstName",
  },
  {
    id: "contact-last-name",
    title: "Step 7: Contact Last Name",
    description: "Add the last name of the main contact person. Please enter a last name to continue.",
    target: "contact-last-name",
    position: "bottom",
    action: "highlight",
    requiresInput: true,
    inputField: "contactLastName",
  },
  {
    id: "contact-email",
    title: "Step 8: Contact Email",
    description:
      "Provide an email address for the main contact. This will be used for communication. Please enter a valid email address to continue.",
    target: "contact-email",
    position: "bottom",
    action: "highlight",
    requiresInput: true,
    inputField: "contactEmail",
  },
  {
    id: "save-customer",
    title: "Step 9: Save Your Customer",
    description:
      "Great! You've filled in all the essential information. Now click the Save button to create your first customer. Congratulations on creating your first customer!",
    target: "save-button",
    position: "top",
    action: "highlight",
  },
]

export function AddCustomerScreen({
  onCustomerSaveSuccess,
  onNavigateBackToTutorials,
  showGuide = false,
}: AddCustomerScreenProps) {
  const [showCongratulations, setShowCongratulations] = useState(false)

  // Guide state
  const [isGuideActive, setIsGuideActive] = useState(false)
  const [currentGuideStep, setCurrentGuideStep] = useState(0)
  const [showGuideDialog, setShowGuideDialog] = useState(false)
  const [guideOverlayPosition, setGuideOverlayPosition] = useState({ top: 0, left: 0, width: 0, height: 0 })
  const [showStartGuideButton, setShowStartGuideButton] = useState(false)
  const [showWelcomeDialog, setShowWelcomeDialog] = useState(false)

  // Form state for validation
  const [formData, setFormData] = useState({
    customerName: "",
    address: "",
    city: "",
    postcode: "",
    customerType: "",
    contactFirstName: "",
    contactLastName: "",
    contactEmail: "",
    autoGenerateSite: true,
  })

  // Refs for guide targeting
  const mainContainerRef = useRef<HTMLDivElement>(null)
  const pageHeaderRef = useRef<HTMLDivElement>(null)
  const customerNameInputRef = useRef<HTMLDivElement>(null)
  const addressTextareaRef = useRef<HTMLDivElement>(null)
  const cityInputRef = useRef<HTMLDivElement>(null)
  const postcodeInputRef = useRef<HTMLDivElement>(null)
  const customerTypeSelectRef = useRef<HTMLDivElement>(null)
  const contactFirstNameRef = useRef<HTMLDivElement>(null)
  const contactLastNameRef = useRef<HTMLDivElement>(null)
  const contactEmailRef = useRef<HTMLDivElement>(null)
  const saveButtonRef = useRef<HTMLButtonElement>(null)

  // Initialize guide when showGuide prop is true (auto-start from tutorials)
  useEffect(() => {
    if (showGuide) {
      // If coming from tutorials, show the welcome dialog automatically
      const timer = setTimeout(() => {
        setShowWelcomeDialog(true)
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

      // Calculate overlay position for highlighting
      const highlightTimer = setTimeout(() => {
        updateGuideOverlay(currentStep)
        // Scroll to the target element to ensure it's visible
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
    setShowWelcomeDialog(false) // Close welcome dialog if it was open
    setIsGuideActive(true)
    setCurrentGuideStep(0)
    setShowStartGuideButton(false) // Hide the manual start button on the page
    setShowGuideDialog(true) // Open the first guide step dialog
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
      case "customer-name-input":
        return customerNameInputRef.current
      case "address-textarea":
        return addressTextareaRef.current
      case "city-input":
        return cityInputRef.current
      case "postcode-input":
        return postcodeInputRef.current
      case "customer-type-select":
        return customerTypeSelectRef.current
      case "contact-first-name":
        return contactFirstNameRef.current
      case "contact-last-name":
        return contactLastNameRef.current
      case "contact-email":
        return contactEmailRef.current
      case "save-button":
        return saveButtonRef.current
      default:
        return null
    }
  }

  const validateCurrentStep = (step: GuideStep): boolean => {
    if (!step.requiresInput) return true

    switch (step.inputField) {
      case "customerName":
        return formData.customerName.trim() !== ""
      case "address":
        return formData.address.trim() !== ""
      case "city":
        return formData.city.trim() !== ""
      case "postcode":
        return formData.postcode.trim() !== ""
      case "customerType":
        return formData.customerType !== ""
      case "contactFirstName":
        return formData.contactFirstName.trim() !== ""
      case "contactLastName":
        return formData.contactLastName.trim() !== ""
      case "contactEmail":
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.contactEmail)
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

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSave = () => {
    // Simulate saving customer
    console.log("Customer saved!", formData)
    onCustomerSaveSuccess()
    setShowCongratulations(true)

    // If guide is active, complete it
    if (isGuideActive) {
      setIsGuideActive(false)
      setShowGuideDialog(false)
    }
  }

  const handleContinueToLearningPath = () => {
    setShowCongratulations(false)
    if (onNavigateBackToTutorials) {
      onNavigateBackToTutorials()
    }
  }

  const currentStep = guideSteps[currentGuideStep]

  return (
    <div ref={mainContainerRef} className="h-full bg-white overflow-auto relative">
      {/* Guide Overlay - Updated for better scrollability */}
      {isGuideActive && currentStep?.action === "highlight" && (
        <>
          {/* Dark overlay covering entire viewport with cutout */}
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

      <div className="p-6 bg-gray-50 min-h-full">
        <div className="mb-6" ref={pageHeaderRef}>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-gray-800">Add Customer</h1>
              {isGuideActive && (
                <div className="flex items-center gap-2 text-sm text-teal-600 bg-teal-50 px-4 py-2 rounded-lg border border-teal-200 shadow-sm mt-2">
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
                onClick={() => setShowWelcomeDialog(true)}
                className="bg-teal-600 hover:bg-teal-700 flex items-center gap-2 shadow-lg"
              >
                <Lightbulb className="w-4 h-4" />
                Start Tutorial
              </Button>
            )}
          </div>
        </div>

        {/* Address Lookup Section */}
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="mb-2">
            <Label className="text-sm font-medium text-gray-700">Find Address to Populate All Fields</Label>
          </div>
          <Input placeholder="Start Typing Company Name, Address, Postcode..." className="w-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Tags */}
            <div>
              <Label className="text-sm font-medium text-gray-700 mb-2 block">Tag(s)</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Please select option(s)" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tag1">Tag 1</SelectItem>
                  <SelectItem value="tag2">Tag 2</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Customer Name */}
            <div ref={customerNameInputRef}>
              <Label className="text-sm font-medium text-gray-700 mb-2 block">
                Customer Name <span className="text-red-500">*</span>
              </Label>
              <Input
                value={formData.customerName}
                onChange={(e) => handleInputChange("customerName", e.target.value)}
              />
            </div>

            {/* Address Section */}
            <div>
              <Label className="text-sm font-medium text-gray-700 mb-2 block">Address</Label>
              <div className="space-y-3">
                <div ref={addressTextareaRef}>
                  <Textarea
                    placeholder="Company name, building, Street address"
                    rows={3}
                    className="resize-none"
                    value={formData.address}
                    onChange={(e) => handleInputChange("address", e.target.value)}
                  />
                </div>
                <Input placeholder="Area" />
                <div ref={cityInputRef}>
                  <Input
                    placeholder="City"
                    value={formData.city}
                    onChange={(e) => handleInputChange("city", e.target.value)}
                  />
                </div>
                <Input placeholder="County, State/Province/Region" />
              </div>
            </div>

            {/* Postcode and Telephone */}
            <div className="grid grid-cols-2 gap-4">
              <div ref={postcodeInputRef}>
                <Label className="text-sm font-medium text-gray-700 mb-2 block">Postcode</Label>
                <Input value={formData.postcode} onChange={(e) => handleInputChange("postcode", e.target.value)} />
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-2 block">Telephone</Label>
                <div className="flex">
                  <Select>
                    <SelectTrigger className="w-20">
                      <SelectValue placeholder="🇬🇧" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="uk">🇬🇧</SelectItem>
                      <SelectItem value="us">🇺🇸</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input className="flex-1 ml-1" />
                </div>
              </div>
            </div>

            {/* Customer Type */}
            <div ref={customerTypeSelectRef}>
              <Label className="text-sm font-medium text-gray-700 mb-2 block">Customer Type</Label>
              <div className="flex">
                <Select
                  value={formData.customerType}
                  onValueChange={(value) => handleInputChange("customerType", value)}
                >
                  <SelectTrigger className="flex-1">
                    <SelectValue placeholder="Please select an option..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="residential">Residential</SelectItem>
                    <SelectItem value="commercial">Commercial</SelectItem>
                  </SelectContent>
                </Select>
                <Button size="sm" className="ml-2 bg-green-600 hover:bg-green-700">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Reference Number and Account Number */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-2 block">Reference Number</Label>
                <Input />
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-2 block">Account Number</Label>
                <Input />
              </div>
            </div>

            {/* Selling Rate */}
            <div>
              <Label className="text-sm font-medium text-gray-700 mb-2 block">Selling Rate</Label>
              <div className="flex">
                <Select>
                  <SelectTrigger className="flex-1">
                    <SelectValue placeholder="Please select an option..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="standard">Standard Rate</SelectItem>
                    <SelectItem value="premium">Premium Rate</SelectItem>
                  </SelectContent>
                </Select>
                <Button size="sm" className="ml-2 bg-green-600 hover:bg-green-700">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Account Manager */}
            <div>
              <Label className="text-sm font-medium text-gray-700 mb-2 block">Account Manager</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Please select an option..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="manager1">Manager 1</SelectItem>
                  <SelectItem value="manager2">Manager 2</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Right Column - Main Contact */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 h-fit">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">Main Contact</h2>

            <div className="space-y-4">
              {/* First Name */}
              <div ref={contactFirstNameRef}>
                <Label className="text-sm font-medium text-gray-700 mb-2 block">First Name</Label>
                <Input
                  value={formData.contactFirstName}
                  onChange={(e) => handleInputChange("contactFirstName", e.target.value)}
                />
              </div>

              {/* Last Name */}
              <div ref={contactLastNameRef}>
                <Label className="text-sm font-medium text-gray-700 mb-2 block">Last Name</Label>
                <Input
                  value={formData.contactLastName}
                  onChange={(e) => handleInputChange("contactLastName", e.target.value)}
                />
              </div>

              {/* Telephone and Email */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2 block">Telephone</Label>
                  <div className="flex">
                    <Select>
                      <SelectTrigger className="w-20">
                        <SelectValue placeholder="🇬🇧" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="uk">🇬🇧</SelectItem>
                        <SelectItem value="us">🇺🇸</SelectItem>
                      </SelectContent>
                    </Select>
                    <Input className="flex-1 ml-1" />
                  </div>
                </div>
                <div ref={contactEmailRef}>
                  <Label className="text-sm font-medium text-gray-700 mb-2 block">Email</Label>
                  <Input
                    type="email"
                    value={formData.contactEmail}
                    onChange={(e) => handleInputChange("contactEmail", e.target.value)}
                  />
                </div>
              </div>

              {/* Job Position */}
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-2 block">Job Position</Label>
                <Input />
              </div>

              {/* Info Message */}
              <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg border border-blue-200">
                <Info className="w-4 h-4 text-blue-500 flex-shrink-0" />
                <span className="text-sm text-blue-700">You can add additional contacts in the next page</span>
              </div>

              {/* Required Fields Note */}
              <div className="text-sm text-gray-600">
                <span className="text-red-500">*</span> Required Fields
              </div>

              {/* Auto Generate Site Checkbox */}
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="auto-generate-site" 
                  className="text-teal-600" 
                  checked={formData.autoGenerateSite}
                  onCheckedChange={(checked) => handleInputChange("autoGenerateSite", checked as boolean)}
                />
                <Label htmlFor="auto-generate-site" className="text-sm text-gray-700">
                  Auto generate a Site for this customer?
                </Label>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex justify-end gap-3">
          <Button variant="outline" className="px-6 bg-transparent">
            Cancel
          </Button>
          <Button ref={saveButtonRef} onClick={handleSave} className="bg-green-600 hover:bg-green-700 text-white px-6">
            Save
          </Button>
        </div>
      </div>

      {/* Welcome Dialog */}
      <Dialog open={showWelcomeDialog} onOpenChange={setShowWelcomeDialog}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl">
              <Target className="w-6 h-6 text-teal-600" />
              Ready to Create Your First Customer?
            </DialogTitle>
            <DialogDescription className="text-base leading-relaxed mt-2">
              Welcome to the customer creation tutorial! We'll guide you through each step of creating your first
              customer record with interactive tips and helpful guidance.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-3 my-4">
            <div className="flex items-center gap-3 text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
              <span>Step-by-step interactive guidance</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
              <span>Visual highlights and helpful tips</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
              <span>Learn best practices for customer management</span>
            </div>
          </div>
          <DialogFooter className="flex gap-3">
            <Button variant="outline" onClick={handleSkipGuide}>
              Skip Tutorial
            </Button>
            <Button onClick={startGuide} className="bg-teal-600 hover:bg-teal-700 flex items-center gap-2">
              <Lightbulb className="w-4 h-4" />
              Start Tutorial
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Guide Dialog - Fixed positioning to ensure visibility */}
      <Dialog open={showGuideDialog} onOpenChange={setShowGuideDialog}>
        <DialogContent
          className="sm:max-w-lg z-[70] fixed"
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            maxHeight: "90vh",
            overflow: "auto",
          }}
        >
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-lg">
              <Target className="w-5 h-5 text-teal-600" />
              {currentStep?.title}
            </DialogTitle>
            <DialogDescription className="text-base leading-relaxed mt-2">{currentStep?.description}</DialogDescription>
          </DialogHeader>

          {/* Show validation message if step requires input and validation fails */}
          {currentStep?.requiresInput && !validateCurrentStep(currentStep) && (
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mt-4">
              <div className="flex items-center gap-2 text-amber-800">
                <HelpCircle className="w-4 h-4" />
                <span className="text-sm font-medium">Please complete this step to continue</span>
              </div>
            </div>
          )}

          <div className="flex items-center justify-between mt-6">
            <div className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
              Step {currentGuideStep + 1} of {guideSteps.length}
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleSkipGuide}>
                Skip Guide
              </Button>
              {currentGuideStep > 0 && (
                <Button variant="outline" size="sm" onClick={handlePrevGuideStep}>
                  <ArrowLeft className="w-4 h-4 mr-1" />
                  Previous
                </Button>
              )}
              <Button
                size="sm"
                onClick={handleNextGuideStep}
                className="bg-teal-600 hover:bg-teal-700"
                disabled={currentStep?.requiresInput && !validateCurrentStep(currentStep)}
              >
                {currentGuideStep < guideSteps.length - 1 ? (
                  <>
                    Next
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </>
                ) : (
                  "Finish Guide"
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Floating Guide Controls - Always visible during tutorial */}
      {isGuideActive && (
        <div className="fixed bottom-6 right-6 z-[80] bg-white rounded-lg shadow-lg border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="text-sm font-medium text-gray-700">
              Tutorial: Step {currentGuideStep + 1} of {guideSteps.length}
            </div>
            <div className="flex gap-2">
              {currentGuideStep > 0 && (
                <Button variant="outline" size="sm" onClick={handlePrevGuideStep}>
                  <ArrowLeft className="w-4 h-4" />
                </Button>
              )}
              <Button
                size="sm"
                onClick={handleNextGuideStep}
                className="bg-teal-600 hover:bg-teal-700"
                disabled={currentStep?.requiresInput && !validateCurrentStep(currentStep)}
              >
                {currentGuideStep < guideSteps.length - 1 ? (
                  <ArrowRight className="w-4 h-4" />
                ) : (
                  <CheckCircle className="w-4 h-4" />
                )}
              </Button>
              <Button variant="outline" size="sm" onClick={handleSkipGuide}>
                <X className="w-4 h-4" />
              </Button>
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
            <DialogDescription className="text-lg">You just created your first customer!</DialogDescription>
          </DialogHeader>
          <div className="flex justify-center mt-4">
            <Button onClick={handleContinueToLearningPath} className="bg-green-600 hover:bg-green-700">
              Continue
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
