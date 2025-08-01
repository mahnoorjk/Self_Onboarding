"use client"

import { useState } from "react"
import { OnboardingProvider } from "./onboarding-context"
import { OnboardingFlow } from "./onboarding-flow"
import { TutorialsVideosScreen } from "./screens/tutorials-videos-screen"
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
import { DashboardMainScreen } from "./screens/dashboard-main-screen"
import { AddCustomerScreen } from "./screens/add-customer-screen"
import { ReportsScreen } from "./screens/reports-screen"
import { LiveChatScreen } from "./screens/live-chat-screen"
import { ThirtyDayOnboardingSection } from "./thirty-day-onboarding-section"

const dashboardSubmenu = ["Main", "Key Metric Dashboard"]
const reportsSubmenu = ["Dynamic Reports", "External Links and Dashboards"]

const sidebarItems = [
  { icon: Users, label: "Customers", hasSubmenu: true, submenu: ["Add Customer", "All Customers"] },
  { icon: MapPin, label: "Sites", hasSubmenu: true },
  { icon: Package, label: "Assets", hasSubmenu: true },
  { icon: Briefcase, label: "Jobs", hasSubmenu: true, submenu: ["Log Job", "All Jobs"] },
  { icon: FileText, label: "Quotes", hasSubmenu: true },
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
  const [activeTab, setActiveTab] = useState<"wizard" | "tutorials">("wizard")
  const [expandedItems, setExpandedItems] = useState<string[]>(["Dashboard"])
  const [currentScreen, setCurrentScreen] = useState<
    "dashboard" | "log-job" | "wizard" | "tutorials" | "add-customer" | "reports"
  >("dashboard")
  const [selectedDashboardItem, setSelectedDashboardItem] = useState("Main")
  const [isLoggingJobCompleted, setIsLoggingJobCompleted] = useState(false)
  const [isCreatingCustomerCompleted, setIsCreatingCustomerCompleted] = useState(false)
  const [isInitialOnboardingCompleted, setIsInitialOnboardingCompleted] = useState(false)
  const [isLiveChatOpen, setIsLiveChatOpen] = useState(false)
  const [isLiveChatMinimized, setIsLiveChatMinimized] = useState(false)
  const [isOnboardingComplete, setIsOnboardingComplete] = useState(false) // For demo purposes, set to false. In real app, this would check actual completion status
  const [showLockedDialog, setShowLockedDialog] = useState(false)
  
  // Mock work-in-progress data for demonstration
  const [workInProgressData] = useState({
    hasWIPJobs: true,
    totalJobs: 3,
    counts: {
      inProgress: 2,
      scheduled: 1,
      onHold: 0,
      awaitingParts: 0
    }
  })
  
  // In a real application, you would determine onboarding completion like this:
  // const isOnboardingComplete = checkOnboardingCompletion(); 
  // This could check if all required onboarding steps are completed,
  // or if the user has completed the 30-day onboarding program

  const toggleExpanded = (item: string) => {
    setExpandedItems((prev) => (prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]))
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
    setActiveTab("wizard")
  }

  const handleJobSaveSuccess = () => {
    setIsLoggingJobCompleted(true)
  }

  const handleNavigateToLogJobFromTutorials = () => {
    setCurrentScreen("log-job")
    setActiveTab("tutorials")
  }

  const handleNavigateBackToTutorials = () => {
    setCurrentScreen("tutorials")
    setActiveTab("tutorials")
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
  }

  const handleNavigateToAddCustomerFromTutorials = () => {
    setCurrentScreen("add-customer")
    setActiveTab("tutorials")
  }

  const handleReportsClick = (subItem: string) => {
    if (subItem === "Dynamic Reports") {
      setCurrentScreen("reports")
      setActiveTab("wizard")
    }
    // Add logic for other report sub-items if needed
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

  return (
    <div className="flex h-screen bg-gray-100 relative">
      {/* Left Sidebar */}
      <div className="w-64 bg-slate-700 text-white flex flex-col fixed h-full z-10">
        {/* Logo/Header */}
        <div className="p-4 border-b border-slate-600">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gradient-to-r from-teal-400 to-teal-500 rounded flex items-center justify-center">
              <span className="text-white font-bold text-xs">JL</span>
            </div>
            <span className="text-lg font-medium">joblogic</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto">
          <div className="p-2">
            {/* Dashboard Item */}
            <div className="mb-1">
              <Button
                variant="ghost"
                className="w-full justify-between text-left text-slate-200 hover:text-white hover:bg-slate-600 h-9 text-sm"
                onClick={() => isOnboardingComplete ? toggleExpanded("Dashboard") : handleLockedSectionClick()}
              >
                <div className="flex items-center gap-3">
                  <LayoutDashboard className="w-4 h-4" />
                  <span>Dashboard</span>
                </div>
                <div className="flex items-center gap-2">
                  {!isOnboardingComplete && <Lock className="w-3 h-3" />}
                  {isOnboardingComplete && (expandedItems.includes("Dashboard") ? (
                    <ChevronDown className="w-4 h-4" />
                  ) : (
                    <ChevronRight className="w-4 h-4" />
                  ))}
                </div>
              </Button>

              {isOnboardingComplete && expandedItems.includes("Dashboard") && (
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

            {/* Onboarding Section */}
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
                    Get Started
                  </Button>
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
                  {/* New 30-Day Onboarding Section */}
                  <ThirtyDayOnboardingSection 
                    isLoggingJobCompleted={isLoggingJobCompleted}
                    isCreatingCustomerCompleted={isCreatingCustomerCompleted}
                    isInitialOnboardingCompleted={isInitialOnboardingCompleted}
                    workInProgressData={workInProgressData}
                  />
                </div>
              )}
            </div>

            {/* Reports Section */}
            <div className="mb-1">
              <Button
                variant="ghost"
                className="w-full justify-between text-left text-slate-200 hover:text-white hover:bg-slate-600 h-9 text-sm"
                onClick={() => isOnboardingComplete ? toggleExpanded("Reports") : handleLockedSectionClick()}
              >
                <div className="flex items-center gap-3">
                  <BarChart3 className="w-4 h-4" />
                  <span>Reports</span>
                </div>
                <div className="flex items-center gap-2">
                  {!isOnboardingComplete && <Lock className="w-3 h-3" />}
                  {isOnboardingComplete && (expandedItems.includes("Reports") ? (
                    <ChevronDown className="w-4 h-4" />
                  ) : (
                    <ChevronRight className="w-4 h-4" />
                  ))}
                </div>
              </Button>

              {isOnboardingComplete && expandedItems.includes("Reports") && (
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
                  onClick={() => isOnboardingComplete ? (item.hasSubmenu && toggleExpanded(item.label)) : handleLockedSectionClick()}
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
                    {!isOnboardingComplete && <Lock className="w-3 h-3" />}
                    {isOnboardingComplete && item.hasSubmenu &&
                      (expandedItems.includes(item.label) ? (
                        <ChevronDown className="w-4 h-4" />
                      ) : (
                        <ChevronRight className="w-4 h-4" />
                      ))}
                  </div>
                </Button>

                {/* Add Jobs submenu */}
                {isOnboardingComplete && item.label === "Jobs" && expandedItems.includes("Jobs") && (
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
                {isOnboardingComplete && item.label === "Customers" && expandedItems.includes("Customers") && (
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
                      } else if (!isOnboardingComplete) {
                        handleLockedSectionClick()
                      }
                    }}
                  >
                    <div className="flex items-center gap-3 w-full">
                      <item.icon className="w-4 h-4" />
                      <span>{item.label}</span>
                      <div className="flex items-center gap-2 ml-auto">
                        {!isOnboardingComplete && item.label !== "Live Chat" && <Lock className="w-3 h-3" />}
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
      <div className="flex-1 ml-64 pt-16">
        {/* Top Header */}
        <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 z-30 flex items-center px-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-teal-500 to-teal-600 rounded flex items-center justify-center">
              <span className="text-white font-bold text-xs">JL</span>
            </div>
            <span className="text-xl font-semibold text-gray-900">joblogic</span>
          </div>
          <Button variant="ghost" size="sm" className="ml-4">
            <Menu className="w-5 h-5 text-gray-500" />
          </Button>
          <div className="flex-1 text-sm text-gray-600 ml-4">
            Refer a company to Joblogic to be entered into our prize draw. Refer{" "}
            <a href="#" className="text-blue-600 hover:underline">
              now
            </a>
            . T&C's apply.
          </div>
          <div className="flex items-center gap-2">
            {/* Empty space for "XXX Days Remaining" */}
            <div className="w-40" />
            {/* Debug button to toggle onboarding completion for testing */}
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setIsOnboardingComplete(!isOnboardingComplete)}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs"
            >
              {isOnboardingComplete ? "Lock Sections" : "Unlock Sections"}
            </Button>
            <Button className="bg-yellow-400 hover:bg-yellow-500 text-black">Book a Demo</Button>
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
            <Button className="bg-teal-500 hover:bg-teal-600 text-white flex items-center gap-1">
              <RefreshCcw className="w-4 h-4" /> Refer & Earn
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
        <main className="flex-1 overflow-auto">
          {currentScreen === "add-customer" ? (
            <AddCustomerScreen
              onCustomerSaveSuccess={handleCustomerSaveSuccess}
              onNavigateBackToTutorials={handleNavigateBackToTutorials}
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
              onJobSaveSuccess={handleJobSaveSuccess}
              onNavigateBackToTutorials={handleNavigateBackToTutorials}
            />
          ) : currentScreen === "dashboard" ? (
            <DashboardMainScreen />
          ) : currentScreen === "reports" ? (
            <ReportsScreen />
          ) : (
            <OnboardingProvider>
              <OnboardingFlow 
                isLoggingJobCompleted={isLoggingJobCompleted}
                isCreatingCustomerCompleted={isCreatingCustomerCompleted}
                onOnboardingCompletion={handleOnboardingCompletion}
                onNavigateToTutorials={handleNavigateToTutorialsFromOnboarding}
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
