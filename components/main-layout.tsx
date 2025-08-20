"use client"

import { useState } from "react"
import { OnboardingProvider } from "./onboarding-context"
import { OnboardingFlow } from "./onboarding-flow"
import { TutorialsVideosScreen } from "./screens/tutorials-videos-screen"
import { RegistrationScreen } from "./screens/registration-screen"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  LayoutDashboard,
  Users,
  MapPin,
  Package,
  Briefcase,
  FileText,
  Receipt,
  BarChart3,
  ChevronDown,
  ChevronRight,
  Search,
  MessageCircle,
  Bell,
  HelpCircle,
  BookOpen,
  Menu,
  HardHat,
  BookOpenCheck,
  Store,
  Settings,
  Newspaper,
  Smartphone,
  MessageSquare,
  RefreshCcw,
  Lock,
} from "lucide-react"
import { LogJobScreen } from "./screens/log-job-screen"
import { LogQuoteScreen } from "./screens/log-quote-screen"
import { AddSiteScreen } from "./screens/add-site-screen"
import { AddAssetScreen } from "./screens/add-asset-screen"
import { DashboardMainScreen } from "./screens/dashboard-main-screen"
import { AddCustomerScreen } from "./screens/add-customer-screen"
import { ReportsScreen } from "./screens/reports-screen"
import { LiveChatScreen } from "./screens/live-chat-screen"
import { MarketplaceScreen } from "./screens/marketplace-screen"

const dashboardSubmenu = ["Main", "Key Metric Dashboard"]
const reportsSubmenu = ["Dynamic Reports", "External Links and Dashboards"]

const sidebarItems = [
  { icon: Users, label: "Customers", hasSubmenu: true, submenu: ["Add Customer", "All Customers"] },
  { icon: MapPin, label: "Sites", hasSubmenu: true, submenu: ["Add Site", "All Sites"] },
  { icon: Package, label: "Assets", hasSubmenu: true, submenu: ["Add Asset", "All Assets"] },
  { icon: Briefcase, label: "Jobs", hasSubmenu: true, submenu: ["Log Job", "All Jobs"] },
  { icon: FileText, label: "Quotes", hasSubmenu: true, submenu: ["Log Quote", "All Quotes"] },
  { icon: Receipt, label: "Invoices", hasSubmenu: true },
  { icon: HardHat, label: "Engineers", hasSubmenu: true },
  { icon: BookOpenCheck, label: "Forms Logbook", hasSubmenu: true },
  { icon: Store, label: "Marketplace", hasSubmenu: false, badge: "BETA" },
]

const bottomItems = [
  { icon: Settings, label: "Settings", hasSubmenu: false },
  { icon: Newspaper, label: "News Feed", hasSubmenu: false },
  { icon: Smartphone, label: "Download Mobile Apps", hasSubmenu: false },
  { icon: MessageSquare, label: "Live Chat", hasSubmenu: false, indicator: true },
]

export function MainLayout() {
  const [isRegistered, setIsRegistered] = useState(false)
  const [registrationData, setRegistrationData] = useState<any>(null)
  const [activeTab, setActiveTab] = useState<"wizard" | "tutorials">("wizard")
  const [expandedItems, setExpandedItems] = useState<string[]>(["Dashboard", "Onboarding"])
  const [currentScreen, setCurrentScreen] = useState<
    "dashboard" | "log-job" | "wizard" | "tutorials" | "add-customer" | "reports" | "marketplace" | "log-quote" | "add-site" | "add-asset"
  >("dashboard")
  const [selectedDashboardItem, setSelectedDashboardItem] = useState("Main")
  const [isLoggingJobCompleted, setIsLoggingJobCompleted] = useState(false)
  const [isCreatingCustomerCompleted, setIsCreatingCustomerCompleted] = useState(false)
  const [isCustomersSectionUnlocked, setIsCustomersSectionUnlocked] = useState(false)
  const [isQuotesSectionUnlocked, setIsQuotesSectionUnlocked] = useState(false)
  const [isInitialOnboardingCompleted, setIsInitialOnboardingCompleted] = useState(false)
  const [isLiveChatOpen, setIsLiveChatOpen] = useState(false)
  const [isLiveChatMinimized, setIsLiveChatMinimized] = useState(false)
  const [isOnboardingComplete, setIsOnboardingComplete] = useState(false) // For demo purposes, set to false. In real app, this would check actual completion status
  const [isThirtyDayJourneyComplete, setIsThirtyDayJourneyComplete] = useState(false)
  const [showLockedDialog, setShowLockedDialog] = useState(false)
  const [showThirtyDayModal, setShowThirtyDayModal] = useState(false)
  
  // Track completion of "Let's get you started" tasks
  const [completedOnboardingTasks, setCompletedOnboardingTasks] = useState<string[]>([])
  
  // Track the current onboarding step for when returning to wizard
  const [onboardingStep, setOnboardingStep] = useState(1)
  
  // Required tasks that need to be completed to unlock tutorials
  const requiredOnboardingTasks = ["add-customer", "create-quote", "create-job", "create-invoice"]
  const areRequiredTasksCompleted = requiredOnboardingTasks.every(task => completedOnboardingTasks.includes(task))
  
  // Mock work-in-progress data for demonstration
  // Your Current Workload Data - should be provided by actual data source
  // Set to null/undefined when no real data is available
  const [workInProgressData] = useState(null)
  
  // Example of how real data would look when provided:
  // const [workInProgressData] = useState({
  //   hasWIPJobs: true,  // Set based on whether user actually has jobs
  //   totalJobs: actualJobCount,
  //   counts: {
  //     inProgress: actualInProgressCount,
  //     scheduled: actualScheduledCount,
  //     onHold: actualOnHoldCount,
  //     awaitingParts: actualAwaitingPartsCount
  //   },
  //   customers: {
  //     total: actualCustomerCount,
  //     withSites: actualCustomersWithSitesCount,
  //     withoutSites: actualCustomersWithoutSitesCount
  //   },
  //   quotes: {
  //     total: actualQuotesCount,
  //     pending: actualPendingQuotesCount,
  //     expired: actualExpiredQuotesCount
  //   },
  //   invoices: {
  //     total: actualInvoicesCount,
  //     pending: actualPendingInvoicesCount,
  //     overdue: actualOverdueInvoicesCount
  //   }
  // })
  
  // In a real application, you would determine onboarding completion like this:
  // const isOnboardingComplete = checkOnboardingCompletion(); 
  // This could check if all required onboarding steps are completed,
  // or if the user has completed the 30-day onboarding program

  const toggleExpanded = (item: string) => {
    setExpandedItems((prev) => (prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]))
  }

  const handleRegistrationComplete = (userData: any) => {
    setRegistrationData(userData)
    setIsRegistered(true)
    setCurrentScreen("wizard")
    setActiveTab("wizard")
  }

  const handleLockedSectionClick = () => {
    setShowLockedDialog(true)
  }

  const handleDashboardItemClick = (item: string) => {
    setSelectedDashboardItem(item)
    setCurrentScreen("dashboard")
    setActiveTab("wizard")
  }

  const handleLogJobClick = () => {
    setCurrentScreen("log-job")
    setActiveTab("tutorials") // Use tutorials tab for normal navigation (shows BAU version)
  }

  const handleLogQuoteClick = () => {
    setCurrentScreen("log-quote")
    setActiveTab("tutorials") // Use tutorials tab for normal navigation (shows BAU version)
  }

  const handleAddSiteClick = () => {
    setCurrentScreen("add-site")
    setActiveTab("wizard")
  }

  const handleAddAssetClick = () => {
    setCurrentScreen("add-asset")
    setActiveTab("wizard")
  }

  const handleJobSaveSuccess = () => {
    setIsLoggingJobCompleted(true)
  }

  const handleNavigateToLogJobFromTutorials = () => {
    setCurrentScreen("log-job")
    setActiveTab("tutorials")
  }

  const handleNavigateToLogJobFromOnboarding = (showGuide?: boolean) => {
    setCurrentScreen("log-job")
    if (showGuide) {
      setActiveTab("wizard") // Use wizard tab when coming from completion screen with guide (simplified version)
    } else {
      setActiveTab("tutorials") // Use tutorials tab for normal navigation (BAU version)
    }
  }

  const handleNavigateToReportsFromOnboarding = (showGuide?: boolean) => {
    setCurrentScreen("reports")
    if (showGuide) {
      setActiveTab("wizard") // Use wizard tab when coming from completion screen with guide
    } else {
      setActiveTab("wizard") // Normal reports view otherwise
    }
  }

  const handleNavigateToLogQuoteFromOnboarding = (showGuide?: boolean) => {
    setCurrentScreen("log-quote")
    if (showGuide) {
      setActiveTab("wizard") // Use wizard tab when coming from completion screen with guide (simplified version)
    } else {
      setActiveTab("tutorials") // Use tutorials tab for normal navigation (BAU version)
    }
  }

  const handleNavigateBackToTutorials = () => {
    setCurrentScreen("tutorials")
    setActiveTab("tutorials")
  }

  const handleNavigateBackToCompletion = () => {
    setCurrentScreen("wizard")
    setActiveTab("wizard")
    setOnboardingStep(4) // Set to completion screen (step 4, not 5)
  }

  const handleOnboardingCompletion = () => {
    setIsInitialOnboardingCompleted(true)
  }

  const handleNavigateToTutorialsFromOnboarding = () => {
    setCurrentScreen("tutorials")
    setActiveTab("tutorials")
  }

  const handleAddCustomerClick = () => {
    setCurrentScreen("add-customer")
    setActiveTab("wizard")
  }

  const handleCustomerSaveSuccess = () => {
    setIsCreatingCustomerCompleted(true)
    setIsCustomersSectionUnlocked(true)
  }

  const handleQuoteTaskCompleted = () => {
    setIsQuotesSectionUnlocked(true)
  }

  // Handler for marking onboarding tasks as completed
  const handleTaskCompleted = (taskId: string) => {
    setCompletedOnboardingTasks(prev => {
      if (!prev.includes(taskId)) {
        return [...prev, taskId]
      }
      return prev
    })
  }

  // Enhanced handlers to mark tasks as completed
  const handleCustomerSaveSuccessWithTask = () => {
    setIsCreatingCustomerCompleted(true)
    setIsCustomersSectionUnlocked(true)
    handleTaskCompleted("add-customer")
  }

  const handleCustomerSaveSuccessFromOnboarding = () => {
    setIsCreatingCustomerCompleted(true)
    setIsCustomersSectionUnlocked(true)
    handleTaskCompleted("add-customer")
    handleNavigateBackToCompletion()
  }

  const handleJobSaveSuccessWithTask = () => {
    setIsLoggingJobCompleted(true)
    handleTaskCompleted("create-job")
  }

  const handleJobSaveSuccessFromOnboarding = () => {
    setIsLoggingJobCompleted(true)
    handleTaskCompleted("create-job")
    handleNavigateBackToCompletion()
  }

  const handleReportsTaskCompleted = () => {
    handleTaskCompleted("explore-reports")
    handleNavigateBackToCompletion()
  }

  // Handler for quote creation completion
  const handleQuoteSaveSuccessWithTask = () => {
    handleTaskCompleted("create-quote")
  }

  const handleQuoteSaveSuccessFromOnboarding = () => {
    handleTaskCompleted("create-quote")
    handleNavigateBackToCompletion()
  }

  // Handler for invoice creation completion  
  const handleInvoiceSaveSuccessWithTask = () => {
    handleTaskCompleted("create-invoice")
  }

  // Function to check if a section should be unlocked
  const isSectionUnlocked = (sectionLabel: string) => {
    // Unlock all sections
    return true
  }

  const handleThirtyDayJourneyComplete = () => {
    setIsThirtyDayJourneyComplete(true)
  }

  const handleNavigateToAddCustomerFromTutorials = () => {
    setCurrentScreen("add-customer")
    setActiveTab("tutorials")
  }

  const handleNavigateToAddCustomerFromOnboarding = (showGuide?: boolean) => {
    setCurrentScreen("add-customer")
    if (showGuide) {
      setActiveTab("wizard") // Use wizard tab when coming from completion screen with guide (simplified version)
    } else {
      setActiveTab("tutorials") // Use tutorials tab for normal navigation (BAU version)
    }
  }

  const handleReportsClick = (subItem: string) => {
    if (subItem === "Dynamic Reports") {
      setCurrentScreen("reports")
      setActiveTab("wizard")
    }
    // Add logic for other report sub-items if needed
  }

  const handleMarketplaceClick = () => {
    setCurrentScreen("marketplace")
  }

  const handleLiveChatClick = () => {
    setIsLiveChatOpen(true)
    setIsLiveChatMinimized(false)
  }

  const handleCloseLiveChat = () => {
    setIsLiveChatOpen(false)
    setIsLiveChatMinimized(false)
  }

  const handleToggleLiveChatMinimize = () => {
    setIsLiveChatMinimized(!isLiveChatMinimized)
  }

  // Show registration screen if user hasn't registered yet
  if (!isRegistered) {
    return <RegistrationScreen onBeginTrial={handleRegistrationComplete} />
  }

  return (
    <div className="h-screen bg-gray-100 relative overflow-hidden">
      {/* Left Sidebar */}
      <div className="w-64 bg-slate-700 text-white flex flex-col fixed h-full z-10 left-0 top-0">
        {/* Logo/Header */}
        <div className="p-4 border-b border-slate-600 flex-shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gradient-to-r from-teal-400 to-teal-500 rounded flex items-center justify-center">
              <span className="text-white font-bold text-xs">JL</span>
            </div>
            <span className="text-lg font-medium">joblogic</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="h-[calc(100vh-5rem)] overflow-y-auto overflow-x-hidden sidebar-scroll">
          <div className="p-2 pb-4">
            {/* Onboarding Section - Moved above Dashboard */}
            <div className="mb-1">
              <Button
                variant="ghost"
                className="w-full justify-between text-left text-slate-200 hover:text-white hover:bg-slate-600 h-9 text-sm"
                onClick={() => toggleExpanded("Onboarding")}
              >
                <div className="flex items-center gap-3">
                  <BookOpen className="w-4 h-4" />
                  <span>Onboarding</span>
                </div>
                {expandedItems.includes("Onboarding") ? (
                  <ChevronDown className="w-4 h-4" />
                ) : (
                  <ChevronRight className="w-4 h-4" />
                )}
              </Button>

              {expandedItems.includes("Onboarding") && (
                <div className="ml-6 mt-1 space-y-1">
                  <Button
                    variant="ghost"
                    className={`w-full justify-start text-left h-7 text-xs ${
                      activeTab === "wizard" &&
                      currentScreen !== "log-job" &&
                      currentScreen !== "dashboard" &&
                      currentScreen !== "add-customer"
                        ? "text-white bg-teal-600 hover:bg-teal-600"
                        : "text-slate-300 hover:text-white hover:bg-slate-600"
                    }`}
                    onClick={() => {
                      setActiveTab("wizard")
                      setCurrentScreen("wizard")
                    }}
                  >
                    <div
                      className={`w-2 h-2 rounded-full mr-3 ${
                        activeTab === "wizard" &&
                        currentScreen !== "log-job" &&
                        currentScreen !== "dashboard" &&
                        currentScreen !== "add-customer"
                          ? "bg-white"
                          : "bg-teal-400"
                      }`}
                    />
                    Profile Setup
                  </Button>
                  {/* Only show Tutorials & Videos when required tasks are completed */}
                  {areRequiredTasksCompleted && (
                    <Button
                      variant="ghost"
                      className={`w-full justify-start text-left h-7 text-xs ${
                        activeTab === "tutorials"
                          ? "text-white bg-teal-600 hover:bg-teal-600"
                          : "text-slate-300 hover:text-white hover:bg-slate-600"
                      }`}
                      onClick={() => {
                        setActiveTab("tutorials")
                        setCurrentScreen("tutorials")
                      }}
                    >
                      <div
                        className={`w-2 h-2 rounded-full mr-3 ${activeTab === "tutorials" ? "bg-white" : "bg-teal-400"}`}
                      />
                      Tutorials & Videos
                    </Button>
                  )}
                </div>
              )}
            </div>

            {/* Dashboard Item */}
            <div className="mb-1">
              <Button
                variant="ghost"
                className="w-full justify-between text-left text-slate-200 hover:text-white hover:bg-slate-600 h-9 text-sm"
                onClick={() => isSectionUnlocked("Dashboard") ? toggleExpanded("Dashboard") : handleLockedSectionClick()}
              >
                <div className="flex items-center gap-3">
                  <LayoutDashboard className="w-4 h-4" />
                  <span>Dashboard</span>
                </div>
                <div className="flex items-center gap-2">
                  {!isSectionUnlocked("Dashboard") && <Lock className="w-3 h-3" />}
                  {isSectionUnlocked("Dashboard") && (expandedItems.includes("Dashboard") ? (
                    <ChevronDown className="w-4 h-4" />
                  ) : (
                    <ChevronRight className="w-4 h-4" />
                  ))}
                </div>
              </Button>

              {isSectionUnlocked("Dashboard") && expandedItems.includes("Dashboard") && (
                <div className="ml-6 mt-1 space-y-1">
                  {dashboardSubmenu.map((subItem, index) => (
                    <Button
                      key={subItem}
                      variant="ghost"
                      className={`w-full justify-start text-left h-7 text-xs ${
                        selectedDashboardItem === subItem && currentScreen === "dashboard"
                          ? "text-white bg-teal-600 hover:bg-teal-600"
                          : "text-slate-300 hover:text-white hover:bg-slate-600"
                      }`}
                      onClick={() => handleDashboardItemClick(subItem)}
                    >
                      <div
                        className={`w-2 h-2 rounded-full mr-3 ${
                          selectedDashboardItem === subItem && currentScreen === "dashboard"
                            ? "bg-white"
                            : "bg-teal-400"
                        }`}
                      />
                      {subItem}
                    </Button>
                  ))}
                </div>
              )}
            </div>

            {/* Reports Section */}
            <div className="mb-1">
              <Button
                variant="ghost"
                className="w-full justify-between text-left text-slate-200 hover:text-white hover:bg-slate-600 h-9 text-sm"
                onClick={() => isSectionUnlocked("Reports") ? toggleExpanded("Reports") : handleLockedSectionClick()}
              >
                <div className="flex items-center gap-3">
                  <BarChart3 className="w-4 h-4" />
                  <span>Reports</span>
                </div>
                <div className="flex items-center gap-2">
                  {!isSectionUnlocked("Reports") && <Lock className="w-3 h-3" />}
                  {isSectionUnlocked("Reports") && (expandedItems.includes("Reports") ? (
                    <ChevronDown className="w-4 h-4" />
                  ) : (
                    <ChevronRight className="w-4 h-4" />
                  ))}
                </div>
              </Button>

              {isSectionUnlocked("Reports") && expandedItems.includes("Reports") && (
                <div className="ml-6 mt-1 space-y-1">
                  {reportsSubmenu.map((subItem) => (
                    <Button
                      key={subItem}
                      variant="ghost"
                      className={`w-full justify-start text-left h-7 text-xs ${
                        currentScreen === "reports" && subItem === "Dynamic Reports"
                          ? "text-white bg-teal-600 hover:bg-teal-600"
                          : "text-slate-300 hover:text-white hover:bg-slate-600"
                      }`}
                      onClick={() => handleReportsClick(subItem)}
                    >
                      <div
                        className={`w-2 h-2 rounded-full mr-3 ${
                          currentScreen === "reports" && subItem === "Dynamic Reports" ? "bg-white" : "bg-teal-400"
                        }`}
                      />
                      {subItem}
                    </Button>
                  ))}
                </div>
              )}
            </div>

            {sidebarItems.map((item) => (
              <div key={item.label} className="mb-1">
                <Button
                  variant="ghost"
                  className="w-full justify-between text-left text-slate-200 hover:text-white hover:bg-slate-600 h-9 text-sm"
                  onClick={() => {
                    if (!isSectionUnlocked(item.label)) {
                      handleLockedSectionClick()
                    } else if (item.label === "Marketplace") {
                      handleMarketplaceClick()
                    } else if (item.hasSubmenu) {
                      toggleExpanded(item.label)
                    }
                  }}
                >
                  <div className="flex items-center gap-3">
                    <item.icon className="w-4 h-4" />
                    <span>{item.label}</span>
                    {item.badge && (
                      <Badge className="bg-yellow-500 text-black text-xs px-1.5 py-0.5">
                        {item.badge}
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    {!isSectionUnlocked(item.label) && <Lock className="w-3 h-3" />}
                    {isSectionUnlocked(item.label) && item.hasSubmenu &&
                      (expandedItems.includes(item.label) ? (
                        <ChevronDown className="w-4 h-4" />
                      ) : (
                        <ChevronRight className="w-4 h-4" />
                      ))}
                  </div>
                </Button>

                {/* Add Jobs submenu */}
                {isSectionUnlocked("Jobs") && item.label === "Jobs" && expandedItems.includes("Jobs") && (
                  <div className="ml-6 mt-1 space-y-1">
                    <Button
                      variant="ghost"
                      className={`w-full justify-start text-left h-7 text-xs ${
                        currentScreen === "log-job"
                          ? "text-white bg-teal-600 hover:bg-teal-600"
                          : "text-slate-300 hover:text-white hover:bg-slate-600"
                      }`}
                      onClick={handleLogJobClick}
                    >
                      <div
                        className={`w-2 h-2 rounded-full mr-3 ${currentScreen === "log-job" ? "bg-white" : "bg-teal-400"}`}
                      />
                      Log Job
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-left h-7 text-xs text-slate-300 hover:text-white hover:bg-slate-600"
                    >
                      <div className="w-2 h-2 rounded-full mr-3 bg-teal-400" />
                      All Jobs
                    </Button>
                  </div>
                )}

                {/* Add Customers submenu */}
                {isSectionUnlocked("Customers") && item.label === "Customers" && expandedItems.includes("Customers") && (
                  <div className="ml-6 mt-1 space-y-1">
                    <Button
                      variant="ghost"
                      className={`w-full justify-start text-left h-7 text-xs ${
                        currentScreen === "add-customer"
                          ? "text-white bg-teal-600 hover:bg-teal-600"
                          : "text-slate-300 hover:text-white hover:bg-slate-600"
                      }`}
                      onClick={handleAddCustomerClick}
                    >
                      <div
                        className={`w-2 h-2 rounded-full mr-3 ${currentScreen === "add-customer" ? "bg-white" : "bg-teal-400"}`}
                      />
                      Add Customer
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-left h-7 text-xs text-slate-300 hover:text-white hover:bg-slate-600"
                    >
                      <div className="w-2 h-2 rounded-full mr-3 bg-teal-400" />
                      All Customers
                    </Button>
                  </div>
                )}

                {/* Add Quotes submenu */}
                {isSectionUnlocked("Quotes") && item.label === "Quotes" && expandedItems.includes("Quotes") && (
                  <div className="ml-6 mt-1 space-y-1">
                    <Button
                      variant="ghost"
                      className={`w-full justify-start text-left h-7 text-xs ${
                        currentScreen === "log-quote"
                          ? "text-white bg-teal-600 hover:bg-teal-600"
                          : "text-slate-300 hover:text-white hover:bg-slate-600"
                      }`}
                      onClick={handleLogQuoteClick}
                    >
                      <div
                        className={`w-2 h-2 rounded-full mr-3 ${currentScreen === "log-quote" ? "bg-white" : "bg-teal-400"}`}
                      />
                      Log Quote
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-left h-7 text-xs text-slate-300 hover:text-white hover:bg-slate-600"
                    >
                      <div className="w-2 h-2 rounded-full mr-3 bg-teal-400" />
                      All Quotes
                    </Button>
                  </div>
                )}

                {/* Add Sites submenu */}
                {isSectionUnlocked("Sites") && item.label === "Sites" && expandedItems.includes("Sites") && (
                  <div className="ml-6 mt-1 space-y-1">
                    <Button
                      variant="ghost"
                      className={`w-full justify-start text-left h-7 text-xs ${
                        currentScreen === "add-site"
                          ? "text-white bg-teal-600 hover:bg-teal-600"
                          : "text-slate-300 hover:text-white hover:bg-slate-600"
                      }`}
                      onClick={handleAddSiteClick}
                    >
                      <div
                        className={`w-2 h-2 rounded-full mr-3 ${currentScreen === "add-site" ? "bg-white" : "bg-teal-400"}`}
                      />
                      Add Site
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-left h-7 text-xs text-slate-300 hover:text-white hover:bg-slate-600"
                    >
                      <div className="w-2 h-2 rounded-full mr-3 bg-teal-400" />
                      All Sites
                    </Button>
                  </div>
                )}

                {/* Add Assets submenu */}
                {isSectionUnlocked("Assets") && item.label === "Assets" && expandedItems.includes("Assets") && (
                  <div className="ml-6 mt-1 space-y-1">
                    <Button
                      variant="ghost"
                      className={`w-full justify-start text-left h-7 text-xs ${
                        currentScreen === "add-asset"
                          ? "text-white bg-teal-600 hover:bg-teal-600"
                          : "text-slate-300 hover:text-white hover:bg-slate-600"
                      }`}
                      onClick={handleAddAssetClick}
                    >
                      <div
                        className={`w-2 h-2 rounded-full mr-3 ${currentScreen === "add-asset" ? "bg-white" : "bg-teal-400"}`}
                      />
                      Add Asset
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-left h-7 text-xs text-slate-300 hover:text-white hover:bg-slate-600"
                    >
                      <div className="w-2 h-2 rounded-full mr-3 bg-teal-400" />
                      All Assets
                    </Button>
                  </div>
                )}
              </div>
            ))}

            {/* Bottom Items */}
            <div className="mt-4 pt-4 border-t border-slate-600">
              {bottomItems.map((item) => (
                <div key={item.label} className="mb-1">
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-left text-slate-200 hover:text-white hover:bg-slate-600 h-9 text-sm"
                    onClick={() => {
                      if (item.label === "Live Chat") {
                        handleLiveChatClick()
                      } else if (!isSectionUnlocked(item.label)) {
                        handleLockedSectionClick()
                      }
                    }}
                  >
                    <div className="flex items-center gap-3 w-full">
                      <item.icon className="w-4 h-4" />
                      <span>{item.label}</span>
                      <div className="flex items-center gap-2 ml-auto">
                        {!isSectionUnlocked(item.label) && item.label !== "Live Chat" && <Lock className="w-3 h-3" />}
                        {item.indicator && <div className="w-2 h-2 bg-green-500 rounded-full" />}
                      </div>
                    </div>
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="ml-64 h-screen">
        {/* Top Header */}
        <header className="fixed top-0 left-64 right-0 h-16 bg-white border-b border-gray-200 z-30 flex items-center px-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-teal-500 to-teal-600 rounded flex items-center justify-center">
              <span className="text-white font-bold text-xs">JL</span>
            </div>
            <span className="text-xl font-semibold text-gray-900">joblogic</span>
          </div>
          <Button variant="ghost" size="sm" className="ml-4">
            <Menu className="w-5 h-5 text-gray-500" />
          </Button>
          <div className="flex-1 text-sm text-gray-600 ml-4 min-w-0">
            Refer a company to Joblogic to be entered into our prize draw. Refer{" "}
            <a href="#" className="text-blue-600 hover:underline">
              now
            </a>
            . T&C's apply.
          </div>
          <div className="flex items-center gap-2">
            {/* Empty space for "XXX Days Remaining" */}
            <div className="w-20" />
            {/* Debug button to toggle onboarding completion for testing */}
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setIsOnboardingComplete(!isOnboardingComplete)}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs px-2"
            >
              {isOnboardingComplete ? "Lock" : "Unlock"}
            </Button>
            <Button className="bg-yellow-400 hover:bg-yellow-500 text-black text-sm px-3">Book Demo</Button>
            <Button className="bg-green-500 hover:bg-green-600 text-white flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4"
              >
                <path d="M20 6 9 17l-5-5" />
              </svg>{" "}
              Activate
            </Button>
            <Button className="bg-teal-500 hover:bg-teal-600 text-white flex items-center gap-1 text-sm px-3">
              <RefreshCcw className="w-4 h-4" /> Refer
            </Button>
            <Button variant="ghost" size="icon">
              <Search className="w-5 h-5 text-gray-600" />
            </Button>
            <Button variant="ghost" size="icon">
              <div className="relative">
                <MessageCircle className="w-5 h-5 text-gray-600" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full" />
              </div>
            </Button>
            <Button variant="ghost" size="icon">
              <Bell className="w-5 h-5 text-gray-600" />
            </Button>
            <Button className="bg-slate-700 hover:bg-slate-800 text-white flex items-center gap-1">
              <HelpCircle className="w-4 h-4" /> Help
            </Button>
            <div className="w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">M</span>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="h-screen pt-16 overflow-auto">
          {currentScreen === "marketplace" ? (
            <MarketplaceScreen />
          ) : currentScreen === "add-customer" ? (
            <AddCustomerScreen
              onCustomerSaveSuccess={activeTab === "wizard" ? handleCustomerSaveSuccessFromOnboarding : handleCustomerSaveSuccessWithTask}
              onNavigateBackToTutorials={activeTab === "wizard" ? handleNavigateBackToCompletion : handleNavigateBackToTutorials}
              showGuide={activeTab === "wizard"}
            />
          ) : currentScreen === "add-site" ? (
            <AddSiteScreen
              onSiteSaveSuccess={() => {}}
              onNavigateBackToTutorials={handleNavigateBackToTutorials}
              showGuide={activeTab === "tutorials"}
            />
          ) : currentScreen === "add-asset" ? (
            <AddAssetScreen
              onAssetSaveSuccess={() => {}}
              onNavigateBackToTutorials={handleNavigateBackToTutorials}
              showGuide={activeTab === "tutorials"}
            />
          ) : currentScreen === "tutorials" ? (
            <TutorialsVideosScreen
              isLoggingJobCompleted={isLoggingJobCompleted}
              isCreatingCustomerCompleted={isCreatingCustomerCompleted}
              onNavigateToLogJob={handleNavigateToLogJobFromTutorials}
              onNavigateToAddCustomer={handleNavigateToAddCustomerFromTutorials}
            />
          ) : currentScreen === "log-job" ? (
            <LogJobScreen
              onJobSaveSuccess={activeTab === "wizard" ? handleJobSaveSuccessFromOnboarding : handleJobSaveSuccessWithTask}
              onNavigateBackToTutorials={activeTab === "wizard" ? handleNavigateBackToCompletion : handleNavigateBackToTutorials}
              showGuide={activeTab === "wizard"}
            />
          ) : currentScreen === "log-quote" ? (
            <LogQuoteScreen
              onQuoteSaveSuccess={activeTab === "wizard" ? handleQuoteSaveSuccessFromOnboarding : handleQuoteSaveSuccessWithTask}
              onNavigateBackToTutorials={activeTab === "wizard" ? handleNavigateBackToCompletion : handleNavigateBackToTutorials}
              showGuide={activeTab === "wizard"}
            />
          ) : currentScreen === "dashboard" ? (
            <DashboardMainScreen />
          ) : currentScreen === "reports" ? (
            <ReportsScreen 
              showGuide={activeTab === "wizard"}
              onNavigateBackToTutorials={activeTab === "wizard" ? handleNavigateBackToCompletion : handleNavigateBackToTutorials}
              onTaskCompleted={activeTab === "wizard" ? handleReportsTaskCompleted : undefined}
            />
          ) : (
            <OnboardingProvider 
              initialRegistrationData={registrationData}
              initialStep={onboardingStep}
            >
              <OnboardingFlow 
                isLoggingJobCompleted={isLoggingJobCompleted}
                isCreatingCustomerCompleted={isCreatingCustomerCompleted}
                onOnboardingCompletion={handleOnboardingCompletion}
                onNavigateToTutorials={handleNavigateToTutorialsFromOnboarding}
                setShowThirtyDayModal={setShowThirtyDayModal}
                onNavigateToAddCustomer={handleNavigateToAddCustomerFromOnboarding}
                onNavigateToLogJob={handleNavigateToLogJobFromOnboarding}
                onNavigateToLogQuote={handleNavigateToLogQuoteFromOnboarding}
                onNavigateToReports={handleNavigateToReportsFromOnboarding}
                onTaskCompleted={handleTaskCompleted}
                completedTasks={completedOnboardingTasks}
              />
            </OnboardingProvider>
          )}
        </main>
      </div>
      {isLiveChatOpen && (
        <LiveChatScreen
          onClose={handleCloseLiveChat}
          isMinimized={isLiveChatMinimized}
          onToggleMinimize={handleToggleLiveChatMinimize}
        />
      )}

      {/* Locked Section Dialog */}
      <Dialog open={showLockedDialog} onOpenChange={setShowLockedDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Lock className="w-5 h-5 text-slate-600" />
              Section Locked
            </DialogTitle>
            <DialogDescription className="text-base">
              This section is currently locked. Please complete the onboarding process to unlock all features and access the full functionality of your JobLogic account.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-2 mt-4">
            <Button 
              variant="outline" 
              onClick={() => setShowLockedDialog(false)}
            >
              Cancel
            </Button>
            <Button 
              onClick={() => {
                setShowLockedDialog(false)
                setActiveTab("wizard")
                setCurrentScreen("wizard")
              }}
              className="bg-teal-600 hover:bg-teal-700"
            >
              Continue Onboarding
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
