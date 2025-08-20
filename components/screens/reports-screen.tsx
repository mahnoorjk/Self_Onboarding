"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Search, Eye, Mail, Plus, Link, ArrowRight, ArrowLeft, Target, Lightbulb, X, CheckCircle } from "lucide-react"
import { KpiPreviewScreen } from "./kpi-preview-screen"
import { OutstandingPreviewScreen } from "./outstanding-preview-screen"

interface GuideStep {
  id: string
  title: string
  description: string
  target: string
  position: "top" | "bottom" | "left" | "right"
  highlight: boolean
}

const guideSteps: GuideStep[] = [
  {
    id: "welcome",
    title: "Welcome to Reports & Analytics! 📊",
    description: "This is your business intelligence center! Here you can track performance, analyze trends, and make data-driven decisions to grow your business.",
    target: "reports-container",
    position: "top",
    highlight: true
  },
  {
    id: "report-categories",
    title: "Select reports by category",
    description: "Filter reports by category to find exactly what you need. JLWeb reports show live data, while other categories offer specialized insights.",
    target: "category-filter",
    position: "bottom",
    highlight: true
  },
  {
    id: "search-reports",
    title: "Search",
    description: "Use the search box to quickly find specific reports. Try searching for 'customer', 'jobs', or 'revenue' to see what's available!",
    target: "search-input",
    position: "bottom",
    highlight: true
  },
  {
    id: "report-actions",
    title: "Preview & Schedule Reports",
    description: "Each report has actions: Preview to see sample data, Email to schedule automatic delivery, and Link to share with your team.",
    target: "reports-table",
    position: "top",
    highlight: true
  },
  {
    id: "sample-preview",
    title: "View Sample Report",
    description: "Let's see what reports look like! Click the eye icon (👁️) in the Preview column for 'Outstanding Jobs by Engineer' to view a sample business report.",
    target: "outstanding-jobs-row",
    position: "top",
    highlight: true
  },
  {
    id: "complete",
    title: "You're Ready to Analyze! 🚀",
    description: "That's the reports overview! Start by previewing a few reports that interest you. Regular report review helps you make better business decisions.",
    target: "reports-container",
    position: "top",
    highlight: false
  }
]

interface ReportsScreenProps {
  showGuide?: boolean
  onNavigateBackToTutorials?: () => void
  onTaskCompleted?: () => void
}

export function ReportsScreen({ showGuide = false, onNavigateBackToTutorials, onTaskCompleted }: ReportsScreenProps) {
  const [selectedCategory, setSelectedCategory] = useState("")
  const [scheduleStatus, setScheduleStatus] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [showKpiPreview, setShowKpiPreview] = useState(false)
  const [showOutstandingPreview, setShowOutstandingPreview] = useState(false)

  // Guide state
  const [isGuideActive, setIsGuideActive] = useState(false)
  const [currentGuideStep, setCurrentGuideStep] = useState(0)
  const [showStartGuideButton, setShowStartGuideButton] = useState(false)
  const [guideOverlayPosition, setGuideOverlayPosition] = useState({ top: 0, left: 0, width: 0, height: 0 })

  // Initialize guide when showGuide prop is true (auto-start from onboarding)
  useEffect(() => {
    if (showGuide) {
      // Auto-start the guide after a brief delay
      setTimeout(() => {
        startGuide()
      }, 500)
    } else {
      // Show start guide button for manual activation
      setShowStartGuideButton(true)
    }
  }, [showGuide])

  const startGuide = () => {
    setIsGuideActive(true)
    setCurrentGuideStep(0)
    setShowStartGuideButton(false)
  }

  // Handle guide step changes and overlay updates
  useEffect(() => {
    if (isGuideActive && currentGuideStep < guideSteps.length) {
      const currentStep = guideSteps[currentGuideStep]
      
      // Update overlay position for highlighting
      const highlightTimer = setTimeout(() => {
        updateGuideOverlay(currentStep)
        scrollToTarget(currentStep)
      }, 300)

      return () => clearTimeout(highlightTimer)
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
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
    }
  }, [isGuideActive, currentGuideStep, guideSteps])

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
      case "reports-container":
        return document.getElementById("reports-container")
      case "category-filter":
        return document.getElementById("category-filter")
      case "search-input":
        return document.getElementById("search-input")
      case "reports-table":
        return document.getElementById("reports-table")
      case "outstanding-jobs-row":
        return document.getElementById("outstanding-jobs-row")
      default:
        return null
    }
  }

  const nextGuideStep = () => {
    if (currentGuideStep < guideSteps.length - 1) {
      setCurrentGuideStep(currentGuideStep + 1)
    } else {
      endGuide()
    }
  }

  const prevGuideStep = () => {
    if (currentGuideStep > 0) {
      setCurrentGuideStep(currentGuideStep - 1)
    }
  }

  const endGuide = () => {
    setIsGuideActive(false)
    setCurrentGuideStep(0)
    setShowStartGuideButton(true)
    // If we have a task completion callback and we came from onboarding (showGuide=true), call it
    if (showGuide && onTaskCompleted) {
      onTaskCompleted()
    }
  }

  const currentStep = guideSteps[currentGuideStep]

  const reports = [
    {
      category: "JLWeb",
      name: "All Customers",
      scheduledExport: true,
      hasLink: true,
      preview: true,
      favourite: false,
    },
    {
      category: "JLWeb",
      name: "All Equipment",
      scheduledExport: true,
      hasLink: false,
      preview: true,
      favourite: false,
    },
    {
      category: "JLWeb",
      name: "All Vehicles Info",
      scheduledExport: true,
      hasLink: false,
      preview: true,
      favourite: false,
    },
    {
      category: "JLWeb",
      name: "Outstanding Jobs by Engineer",
      scheduledExport: true,
      hasLink: false,
      preview: true,
      favourite: false,
      isOutstandingReport: true,
    },
    {
      category: "JLWeb",
      name: "KPI VS priority with business hours",
      scheduledExport: true,
      hasLink: false,
      preview: true,
      favourite: false,
      isKpiReport: true,
    },
    {
      category: "JLWeb",
      name: "All in Job",
      scheduledExport: true,
      hasLink: false,
      preview: true,
      favourite: false,
    },
    {
      category: "JLWeb",
      name: "All in Reqs. Invoice",
      scheduledExport: true,
      hasLink: false,
      preview: true,
      favourite: false,
    },
    {
      category: "JLWeb",
      name: "All Invoices",
      scheduledExport: true,
      hasLink: false,
      preview: true,
      favourite: false,
    },
    {
      category: "JLWeb",
      name: "All Job Tasks",
      scheduledExport: true,
      hasLink: false,
      preview: true,
      favourite: false,
    },
    {
      category: "JLWeb",
      name: "All Jobs",
      scheduledExport: true,
      hasLink: true,
      preview: true,
      favourite: false,
    },
  ]

  const handlePreviewClick = (report: any) => {
    if (report.isKpiReport) {
      setShowKpiPreview(true)
    } else if (report.isOutstandingReport) {
      setShowOutstandingPreview(true)
    }
  }

  const handleBackFromKpiPreview = () => {
    setShowKpiPreview(false)
  }

  const handleBackFromOutstandingPreview = () => {
    setShowOutstandingPreview(false)
  }

  if (showKpiPreview) {
    return <KpiPreviewScreen onBack={handleBackFromKpiPreview} />
  }

  if (showOutstandingPreview) {
    return <OutstandingPreviewScreen onBack={handleBackFromOutstandingPreview} />
  }

  return (
    <div id="reports-container" className="p-6 bg-white min-h-full relative">
      {/* Guide Overlay */}
      {isGuideActive && currentStep?.highlight && (
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
      {/* Start Guide Button */}
      {showStartGuideButton && !isGuideActive && (
        <Button
          onClick={startGuide}
          className="fixed top-20 right-6 z-50 bg-teal-600 hover:bg-teal-700 text-white flex items-center gap-2 shadow-lg"
          title="Start guided tour"
        >
          <Lightbulb className="w-4 h-4" />
          Start Tutorial
        </Button>
      )}

      {/* Back to Tutorials Button */}
      {onNavigateBackToTutorials && (
        <Button 
          onClick={onNavigateBackToTutorials}
          variant="outline" 
          className="mb-4 flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Tutorials
        </Button>
      )}

      {/* Header Section */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800 mb-2">Reports</h1>
          {isGuideActive && (
            <div className="flex items-center gap-2 text-sm text-teal-600 bg-teal-50 px-4 py-2 rounded-lg border border-teal-200 shadow-sm mb-2">
              <Target className="w-4 h-4" />
              <span className="font-medium">Tutorial Mode Active</span>
              <span className="text-teal-500">•</span>
              <span>
                Step {currentGuideStep + 1} of {guideSteps.length}
              </span>
            </div>
          )}
          <p className="text-gray-600 text-sm">
            Preview and select the reports that suit your reporting requirements best. All reports can be exported as
            CSV.
          </p>
        </div>
        <Button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Create Dynamic Dashboard
        </Button>
      </div>

      {/* Filter Section */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Select reports by category</label>
            <Select onValueChange={setSelectedCategory} value={selectedCategory}>
              <SelectTrigger id="category-filter" className="w-full h-10 text-gray-500 bg-white border border-gray-300">
                <SelectValue placeholder="Please select option(s)" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="jlweb">JLWeb</SelectItem>
                <SelectItem value="category2">Category 2</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Schedule Status</label>
            <Select onValueChange={setScheduleStatus} value={scheduleStatus}>
              <SelectTrigger className="w-full h-10 text-gray-500 bg-white border border-gray-300">
                <SelectValue placeholder="Please select an option..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
            <Input
              id="search-input"
              placeholder="Enter search term / ref. No., etc..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-10 bg-white border border-gray-300"
            />
          </div>
          <div className="flex justify-end gap-3 pt-6">
            <Button
              variant="outline"
              className="text-gray-600 border-gray-300 hover:bg-gray-50 px-4 py-2 bg-gray-100 text-sm"
            >
              Reset Filter
            </Button>
            <Button className="bg-slate-800 hover:bg-slate-900 text-white px-6 py-2 text-sm">
              <Search className="w-4 h-4 mr-2" />
              Search
            </Button>
          </div>
        </div>
      </div>

      {/* Tabs and Table */}
      <div className="w-full">
        <Tabs defaultValue="all-reports" className="w-full">
          <TabsList className="grid w-full grid-cols-3 h-12 bg-slate-700 text-white rounded-none p-0">
            <TabsTrigger
              value="all-reports"
              className="data-[state=active]:bg-cyan-500 data-[state=active]:text-white data-[state=active]:shadow-none text-white hover:bg-slate-600 rounded-none font-medium text-sm h-full"
            >
              All Reports (462)
            </TabsTrigger>
            <TabsTrigger
              value="favourite-reports"
              className="data-[state=active]:bg-cyan-500 data-[state=active]:text-white data-[state=active]:shadow-none text-white hover:bg-slate-600 rounded-none font-medium text-sm h-full"
            >
              Favourite Reports (0)
            </TabsTrigger>
            <TabsTrigger
              value="dynamic-dashboard"
              className="data-[state=active]:bg-cyan-500 data-[state=active]:text-white data-[state=active]:shadow-none text-white hover:bg-slate-600 rounded-none font-medium text-sm h-full"
            >
              Dynamic Dashboard (222)
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all-reports" className="p-0 mt-0">
            <div className="bg-white border border-gray-200">
              <Table id="reports-table">
                <TableHeader>
                  <TableRow className="bg-gray-100 border-b border-gray-200">
                    <TableHead className="w-[100px] text-gray-700 font-semibold py-3 px-4 text-left">
                      Category
                    </TableHead>
                    <TableHead className="text-gray-700 font-semibold py-3 px-4 text-left">Report Name</TableHead>
                    <TableHead className="w-[150px] text-center text-gray-700 font-semibold py-3 px-4">
                      Scheduled Export
                    </TableHead>
                    <TableHead className="w-[100px] text-center text-gray-700 font-semibold py-3 px-4">
                      Preview
                    </TableHead>
                    <TableHead className="w-[150px] text-center text-gray-700 font-semibold py-3 px-4">
                      Add to Favourite
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {reports.map((report, index) => (
                    <TableRow 
                      key={index} 
                      id={
                        report.name === "Outstanding Jobs by Engineer" ? "outstanding-jobs-row" :
                        report.isKpiReport ? "kpi-row" : 
                        report.name.includes("Outstanding") ? "financial-row" : 
                        undefined
                      }
                      className={`border-b border-gray-200 hover:bg-gray-50 ${
                        isGuideActive && 
                        currentStep?.id === "outstanding-jobs-report" && 
                        report.name === "Outstanding Jobs by Engineer" 
                          ? "ring-2 ring-blue-500 ring-opacity-75 bg-blue-50 shadow-lg relative z-10" 
                          : ""
                      }`}
                    >
                      <TableCell className="font-medium text-gray-800 py-3 px-4">{report.category}</TableCell>
                      <TableCell className="text-gray-700 py-3 px-4">{report.name}</TableCell>
                      <TableCell className="text-center py-3 px-4">
                        <div className="flex items-center justify-center gap-2">
                          <Mail className="w-4 h-4 text-blue-600" />
                          <Checkbox
                            checked={report.scheduledExport}
                            className="w-4 h-4 rounded border-gray-400 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white"
                          />
                          {report.hasLink && <Link className="w-4 h-4 text-blue-600" />}
                        </div>
                      </TableCell>
                      <TableCell className="text-center py-3 px-4">
                        <Eye
                          className={`w-4 h-4 mx-auto cursor-pointer hover:text-blue-800 ${
                            isGuideActive && 
                            currentStep?.id === "outstanding-jobs-report" && 
                            report.name === "Outstanding Jobs by Engineer"
                              ? "text-blue-800 animate-pulse ring-2 ring-blue-400 rounded-full p-1 bg-blue-100"
                              : "text-blue-600"
                          }`}
                          onClick={() => handlePreviewClick(report)}
                        />
                      </TableCell>
                      <TableCell className="text-center py-3 px-4">
                        <Checkbox
                          checked={report.favourite}
                          className="w-4 h-4 rounded border-gray-400 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white"
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {/* Pagination */}
              <div className="flex items-center justify-between p-4 border-t border-gray-200">
                <div className="flex items-center gap-1">
                  <Button variant="outline" size="icon" className="h-8 w-8 bg-transparent text-gray-600">
                    {"<<"}
                  </Button>
                  <Button variant="outline" size="icon" className="h-8 w-8 bg-transparent text-gray-600">
                    {"<"}
                  </Button>
                  {[17, 18, 19, 20, 21, 22, 23, 24, 25, 26].map((page) => (
                    <Button
                      key={page}
                      variant={page === 22 ? "default" : "outline"}
                      size="icon"
                      className={`h-8 w-8 ${
                        page === 22
                          ? "bg-cyan-500 text-white hover:bg-cyan-600 border-cyan-500"
                          : "bg-transparent text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      {page}
                    </Button>
                  ))}
                  <span className="text-gray-400 px-2">...</span>
                  <Button variant="outline" size="icon" className="h-8 w-8 bg-transparent text-gray-600">
                    {">"}
                  </Button>
                  <Button variant="outline" size="icon" className="h-8 w-8 bg-transparent text-gray-600">
                    {">>"}
                  </Button>
                </div>
                <Select defaultValue="10">
                  <SelectTrigger className="w-[140px] h-8 text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10">10 Results per page</SelectItem>
                    <SelectItem value="20">20 Results per page</SelectItem>
                    <SelectItem value="50">50 Results per page</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="favourite-reports" className="p-6 bg-white border border-gray-200">
            <div className="text-center text-gray-500">No favourite reports found.</div>
          </TabsContent>

          <TabsContent value="dynamic-dashboard" className="p-6 bg-white border border-gray-200">
            <div className="text-center text-gray-500">Dynamic Dashboard content goes here.</div>
          </TabsContent>
        </Tabs>
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
                <Button variant="ghost" size="sm" onClick={endGuide} className="h-6 w-6 p-0 text-gray-400 hover:text-gray-600">
                  <X className="w-3 h-3" />
                </Button>
              </div>
              
              <p className="text-xs text-gray-600 leading-relaxed mb-3">{currentStep.description}</p>
              
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
                    <Button variant="outline" size="sm" onClick={prevGuideStep} className="h-7 px-3 text-xs">
                      <ArrowLeft className="w-3 h-3 mr-1" />
                      Back
                    </Button>
                  )}
                </div>
                <Button
                  size="sm"
                  onClick={currentGuideStep < guideSteps.length - 1 ? nextGuideStep : endGuide}
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

      {/* KPI Preview Screen */}
      {showKpiPreview && (
        <KpiPreviewScreen onBack={() => setShowKpiPreview(false)} />
      )}

      {/* Outstanding Preview Screen */}
      {showOutstandingPreview && (
        <OutstandingPreviewScreen onBack={() => setShowOutstandingPreview(false)} />
      )}
    </div>
  )
}
