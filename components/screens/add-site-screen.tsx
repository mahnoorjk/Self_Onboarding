"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Plus, Info, X, ArrowRight, ArrowLeft, CheckCircle, Target, Lightbulb, HelpCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface AddSiteScreenProps {
  onSiteSaveSuccess?: () => void
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
    title: "Welcome to Site Creation!",
    description:
      "Let's walk through creating your first site step by step. This tutorial will guide you through all the essential fields.",
    target: "page-header",
    position: "bottom",
  },
  {
    id: "customer-select",
    title: "Step 1: Select Customer",
    description:
      "Start by selecting the customer for this site. This is a required field and links the site to a customer. Please select a customer to continue.",
    target: "customer-select",
    position: "bottom",
    action: "highlight",
    requiresInput: true,
    inputField: "customer",
  },
  {
    id: "site-name",
    title: "Step 2: Enter Site Name",
    description:
      "Enter a descriptive name for this site. This is a required field and will help identify the site. Please enter a site name to continue.",
    target: "site-name-input",
    position: "bottom",
    action: "highlight",
    requiresInput: true,
    inputField: "siteName",
  },
  {
    id: "address-section",
    title: "Step 3: Add Site Address",
    description:
      "Fill in the site's address details. This helps with location identification.",
    target: "address-textarea",
    position: "bottom",
    action: "highlight",
  },
  {
    id: "city-field",
    title: "Step 4: Enter City",
    description: "Add the city where the site is located.",
    target: "city-input",
    position: "bottom",
    action: "highlight",
  },
  {
    id: "postcode-field",
    title: "Step 5: Add Postcode",
    description: "Enter the postcode for accurate location identification.",
    target: "postcode-input",
    position: "bottom",
    action: "highlight",
  },
  {
    id: "contact-first-name",
    title: "Step 6: Add Contact First Name",
    description:
      "Enter the first name of the main contact person for this site.",
    target: "contact-first-name",
    position: "bottom",
    action: "highlight",
  },
  {
    id: "contact-last-name",
    title: "Step 7: Contact Last Name",
    description: "Add the last name of the main contact person.",
    target: "contact-last-name",
    position: "bottom",
    action: "highlight",
  },
  {
    id: "contact-email",
    title: "Step 8: Contact Email",
    description:
      "Provide an email address for the main contact. This will be used for communication.",
    target: "contact-email",
    position: "bottom",
    action: "highlight",
  },
  {
    id: "save-site",
    title: "Step 9: Save Your Site",
    description:
      "Great! You've filled in all the essential information. Now click the Save button to create your first site. Congratulations on creating your first site!",
    target: "save-button",
    position: "top",
    action: "highlight",
  },
]

export function AddSiteScreen({ 
  onSiteSaveSuccess, 
  onNavigateBackToTutorials, 
  showGuide = false 
}: AddSiteScreenProps) {
  // Guide state
  const [isGuideActive, setIsGuideActive] = useState(false)
  const [currentGuideStep, setCurrentGuideStep] = useState(0)
  const [guideOverlayPosition, setGuideOverlayPosition] = useState({ top: 0, left: 0, width: 0, height: 0 })
  const [showStartGuideButton, setShowStartGuideButton] = useState(false)
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 })

  // Form state
  const [customer, setCustomer] = useState("")
  const [siteName, setSiteName] = useState("")
  const [tags, setTags] = useState<string[]>([])
  const [address, setAddress] = useState("")
  const [area, setArea] = useState("")
  const [city, setCity] = useState("")
  const [countyStateRegion, setCountyStateRegion] = useState("")
  const [accountManager, setAccountManager] = useState("")
  const [postcode, setPostcode] = useState("")
  const [telephone, setTelephone] = useState("")
  const [telephoneArea, setTelephoneArea] = useState("")
  const [siteReferenceNumber, setSiteReferenceNumber] = useState("")
  
  // Main Contact Person fields
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [contactTelephone, setContactTelephone] = useState("")
  const [email, setEmail] = useState("")
  const [jobPosition, setJobPosition] = useState("")

  // Refs for guide targeting
  const mainContainerRef = useRef<HTMLDivElement>(null)
  const pageHeaderRef = useRef<HTMLDivElement>(null)
  const customerSelectRef = useRef<HTMLDivElement>(null)
  const siteNameInputRef = useRef<HTMLDivElement>(null)
  const addressTextareaRef = useRef<HTMLDivElement>(null)
  const cityInputRef = useRef<HTMLDivElement>(null)
  const postcodeInputRef = useRef<HTMLDivElement>(null)
  const contactFirstNameRef = useRef<HTMLDivElement>(null)
  const contactLastNameRef = useRef<HTMLDivElement>(null)
  const contactEmailRef = useRef<HTMLDivElement>(null)
  const saveButtonRef = useRef<HTMLButtonElement>(null)

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

      // Calculate overlay position for highlighting
      const highlightTimer = setTimeout(() => {
        updateGuideOverlay(currentStep)
        updateTooltipPosition(currentStep)
        // Scroll to the target element to ensure it's visible
        scrollToTarget(currentStep)
      }, 300)

      return () => clearTimeout(highlightTimer)
    } else if (isGuideActive && currentGuideStep >= guideSteps.length) {
      // Guide finished
      setIsGuideActive(false)
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
    setIsGuideActive(true)
    setCurrentGuideStep(0)
    setShowStartGuideButton(false) // Hide the manual start button on the page
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

  const updateTooltipPosition = (step: GuideStep) => {
    const targetElement = getTargetElement(step.target)
    if (targetElement) {
      const rect = targetElement.getBoundingClientRect()
      const tooltipWidth = 320 // Approximate tooltip width
      const tooltipHeight = 120 // Approximate tooltip height
      
      let top = rect.top + window.scrollY
      let left = rect.left + window.scrollX
      
      // Position tooltip based on step position preference and available space
      switch (step.position) {
        case "top":
          top = rect.top + window.scrollY - tooltipHeight - 12
          left = rect.left + window.scrollX + (rect.width / 2) - (tooltipWidth / 2)
          break
        case "bottom":
          top = rect.top + window.scrollY + rect.height + 12
          left = rect.left + window.scrollX + (rect.width / 2) - (tooltipWidth / 2)
          break
        case "left":
          top = rect.top + window.scrollY + (rect.height / 2) - (tooltipHeight / 2)
          left = rect.left + window.scrollX - tooltipWidth - 12
          break
        case "right":
          top = rect.top + window.scrollY + (rect.height / 2) - (tooltipHeight / 2)
          left = rect.left + window.scrollX + rect.width + 12
          break
        default:
          // Default to bottom
          top = rect.top + window.scrollY + rect.height + 12
          left = rect.left + window.scrollX + (rect.width / 2) - (tooltipWidth / 2)
      }
      
      // Ensure tooltip stays within viewport bounds
      const viewportWidth = window.innerWidth
      const viewportHeight = window.innerHeight
      
      if (left < 10) left = 10
      if (left + tooltipWidth > viewportWidth - 10) left = viewportWidth - tooltipWidth - 10
      if (top < 10) top = 10
      if (top + tooltipHeight > window.scrollY + viewportHeight - 10) {
        top = window.scrollY + viewportHeight - tooltipHeight - 10
      }
      
      setTooltipPosition({ top, left })
    }
  }

  const scrollToTarget = (step: GuideStep) => {
    const targetElement = getTargetElement(step.target)
    if (targetElement) {
      // Calculate if element is in viewport, accounting for modal space
      const rect = targetElement.getBoundingClientRect()
      const modalBottomSpace = 350 // Space reserved for modal at bottom
      const effectiveViewportHeight = window.innerHeight - modalBottomSpace
      const isInViewport = rect.top >= 0 && rect.bottom <= effectiveViewportHeight
      
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
      case "site-name-input":
        return siteNameInputRef.current
      case "address-textarea":
        return addressTextareaRef.current
      case "city-input":
        return cityInputRef.current
      case "postcode-input":
        return postcodeInputRef.current
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
      case "customer":
        return customer.trim() !== ""
      case "siteName":
        return siteName.trim() !== ""
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
    setShowStartGuideButton(true) // Show the manual start button on the page if skipped
  }

  const handleSave = () => {
    // Save site logic here
    console.log("Site saved!", {
      customer,
      siteName,
      address,
      city,
      postcode,
      firstName,
      lastName,
      email
    })
    
    // If guide is active, complete it
    if (isGuideActive) {
      setIsGuideActive(false)
    }
    
    // Call the appropriate save success callback
    if (onSiteSaveSuccess) {
      onSiteSaveSuccess()
    }
  }

  const handleCancel = () => {
    if (showGuide && onNavigateBackToTutorials) {
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

  return (
    <div ref={mainContainerRef} className="p-6 max-w-6xl mx-auto relative">
      {/* Guide Overlay */}
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

      <div className="mb-6" ref={pageHeaderRef}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Add Site</h1>
            <div className="text-sm text-gray-600">
              Create a new site for your customers and manage their location details.
            </div>
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
              onClick={startGuide}
              className="bg-teal-600 hover:bg-teal-700 flex items-center gap-2 shadow-lg"
            >
              <Lightbulb className="w-4 h-4" />
              Start Tutorial
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Site Form */}
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="p-6">
              {/* Customer Selection */}
              <div className="mb-6" ref={customerSelectRef}>
                <Label htmlFor="customer" className="text-sm font-medium">
                  Customer <span className="text-red-500">*</span>
                </Label>
                <div className="relative mt-2">
                  <Select value={customer} onValueChange={setCustomer}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Please select an option..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="customer1">Customer 1</SelectItem>
                      <SelectItem value="customer2">Customer 2</SelectItem>
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

              {/* Find Address Section */}
              <div className="mb-6">
                <Label className="text-sm font-medium text-gray-700">
                  Find Address to Populate All Fields
                </Label>
                <Input
                  placeholder="Start Typing Company Name, Address, Postcode..."
                  className="mt-2 bg-gray-50"
                />
              </div>

              {/* Site Name */}
              <div className="mb-6" ref={siteNameInputRef}>
                <Label htmlFor="siteName" className="text-sm font-medium">
                  Site Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="siteName"
                  value={siteName}
                  onChange={(e) => setSiteName(e.target.value)}
                  className="mt-2"
                />
              </div>

              {/* Tags */}
              <div className="mb-6">
                <Label className="text-sm font-medium">Tag(s)</Label>
                <Select onValueChange={addTag}>
                  <SelectTrigger className="w-full mt-2">
                    <SelectValue placeholder="Please select option(s)" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="commercial">Commercial</SelectItem>
                    <SelectItem value="residential">Residential</SelectItem>
                    <SelectItem value="industrial">Industrial</SelectItem>
                    <SelectItem value="retail">Retail</SelectItem>
                  </SelectContent>
                </Select>
                {tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="flex items-center gap-1">
                        {tag}
                        <button 
                          onClick={() => removeTag(tag)}
                          className="ml-1 text-xs hover:text-red-500"
                        >
                          ×
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              {/* Address */}
              <div className="mb-6" ref={addressTextareaRef}>
                <Label htmlFor="address" className="text-sm font-medium">Address</Label>
                <Textarea
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Company name, building, Street address"
                  className="mt-2 min-h-[80px]"
                />
              </div>

              {/* Area, City, County Fields */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div>
                  <Label htmlFor="area" className="text-sm font-medium">Area</Label>
                  <Input
                    id="area"
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    className="mt-2"
                  />
                </div>
                <div ref={cityInputRef}>
                  <Label htmlFor="city" className="text-sm font-medium">City</Label>
                  <Input
                    id="city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="county" className="text-sm font-medium">County, State/Province/Region</Label>
                  <Input
                    id="county"
                    value={countyStateRegion}
                    onChange={(e) => setCountyStateRegion(e.target.value)}
                    className="mt-2"
                  />
                </div>
              </div>

              {/* Account Manager */}
              <div className="mb-6">
                <Label htmlFor="accountManager" className="text-sm font-medium flex items-center gap-2">
                  Account Manager
                  <Info className="w-4 h-4 text-gray-400" />
                </Label>
                <Select value={accountManager} onValueChange={setAccountManager}>
                  <SelectTrigger className="w-full mt-2">
                    <SelectValue placeholder="Please select an option..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="manager1">Manager 1</SelectItem>
                    <SelectItem value="manager2">Manager 2</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Postcode and Telephone */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div ref={postcodeInputRef}>
                  <Label htmlFor="postcode" className="text-sm font-medium">Postcode</Label>
                  <Input
                    id="postcode"
                    value={postcode}
                    onChange={(e) => setPostcode(e.target.value)}
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="telephone" className="text-sm font-medium">Telephone</Label>
                  <div className="flex gap-2 mt-2">
                    <Select value={telephoneArea} onValueChange={setTelephoneArea}>
                      <SelectTrigger className="w-20">
                        <SelectValue placeholder="🇬🇧" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="gb">🇬🇧 +44</SelectItem>
                        <SelectItem value="us">🇺🇸 +1</SelectItem>
                      </SelectContent>
                    </Select>
                    <Input
                      id="telephone"
                      value={telephone}
                      onChange={(e) => setTelephone(e.target.value)}
                      className="flex-1"
                    />
                  </div>
                </div>
              </div>

              {/* Area Dropdown */}
              <div className="mb-6">
                <Label htmlFor="areaSelect" className="text-sm font-medium">Area</Label>
                <div className="relative mt-2">
                  <Select>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Please select an option..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="area1">Area 1</SelectItem>
                      <SelectItem value="area2">Area 2</SelectItem>
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

              {/* Site Reference Number */}
              <div className="mb-6">
                <Label htmlFor="siteRef" className="text-sm font-medium flex items-center gap-2">
                  Site Reference Number
                  <Info className="w-4 h-4 text-gray-400" />
                </Label>
                <Input
                  id="siteRef"
                  value={siteReferenceNumber}
                  onChange={(e) => setSiteReferenceNumber(e.target.value)}
                  className="mt-2"
                />
              </div>

              {/* Required Fields Notice */}
              <div className="mb-6 text-sm text-gray-600">
                <span className="text-red-500">*</span> Required Fields
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3">
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

        {/* Right Sidebar - Main Contact Person */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Main Contact Person</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div ref={contactFirstNameRef}>
                <Label htmlFor="firstName" className="text-sm font-medium">First Name</Label>
                <Input
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="mt-1"
                />
              </div>

              <div ref={contactLastNameRef}>
                <Label htmlFor="lastName" className="text-sm font-medium">Last Name</Label>
                <Input
                  id="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="mt-1"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="contactTelephone" className="text-sm font-medium">Telephone</Label>
                  <div className="flex gap-1 mt-1">
                    <Select>
                      <SelectTrigger className="w-12 p-1">
                        <SelectValue placeholder="🇬🇧" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="gb">🇬🇧</SelectItem>
                        <SelectItem value="us">🇺🇸</SelectItem>
                      </SelectContent>
                    </Select>
                    <Input
                      id="contactTelephone"
                      value={contactTelephone}
                      onChange={(e) => setContactTelephone(e.target.value)}
                      className="flex-1"
                    />
                  </div>
                </div>

                <div ref={contactEmailRef}>
                  <Label htmlFor="email" className="text-sm font-medium">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="jobPosition" className="text-sm font-medium">Job Position</Label>
                <Input
                  id="jobPosition"
                  value={jobPosition}
                  onChange={(e) => setJobPosition(e.target.value)}
                  className="mt-1"
                />
              </div>

              <div className="mt-4 p-3 bg-blue-50 rounded-lg flex items-start gap-2">
                <Info className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-blue-700">
                  You can add additional contacts in the next page
                </div>
              </div>
            </CardContent>
          </Card>
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
    </div>
  )
}
