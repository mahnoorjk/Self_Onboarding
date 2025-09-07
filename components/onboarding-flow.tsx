"use client"

import { useOnboarding } from "./onboarding-context"
import { OnboardingHeader } from "./onboarding-header"
import { ProgressBar } from "./progress-bar"
import { NavigationButtons } from "./navigation-buttons"
import { AboutYourBusinessScreen } from "./screens/about-your-business-screen"
import YourServicesScreen from "./screens/your-services-screen"
import { BusinessInformationScreen } from "./screens/business-information-screen"
import { WorkInProgressScreen } from "./screens/work-in-progress-screen"
import { CompletionScreen } from "./screens/completion-screen"
import { TutorialsVideosScreen } from "./screens/tutorials-videos-screen"

interface OnboardingFlowProps {
  isLoggingJobCompleted?: boolean
  isCreatingCustomerCompleted?: boolean
  onOnboardingCompletion?: () => void
  onNavigateToTutorials?: () => void
  setShowThirtyDayModal?: (show: boolean) => void
  onNavigateToAddCustomer?: (showGuide?: boolean) => void
  onNavigateToLogJob?: (showGuide?: boolean) => void
  onNavigateToLogQuote?: (showGuide?: boolean) => void
  onNavigateToReports?: (showGuide?: boolean) => void
  onTaskCompleted?: (taskId: string) => void
  completedTasks?: string[]
  onNavigateToInvoiceTutorial?: () => void
}

export function OnboardingFlow({ 
  isLoggingJobCompleted = false, 
  isCreatingCustomerCompleted = false, 
  onOnboardingCompletion, 
  onNavigateToTutorials,
  setShowThirtyDayModal,
  onNavigateToAddCustomer,
  onNavigateToLogJob,
  onNavigateToLogQuote,
  onNavigateToReports,
  onTaskCompleted,
  completedTasks = [],
  onNavigateToInvoiceTutorial
}: OnboardingFlowProps) { 
  const { currentStep } = useOnboarding()

  const renderScreen = () => {
    switch (currentStep) {
      case 1:
        return <AboutYourBusinessScreen />
      case 2:
        return <YourServicesScreen />
      case 3:
        return <WorkInProgressScreen />
      case 4:
        return <CompletionScreen 
          onOnboardingCompletion={onOnboardingCompletion} 
          onNavigateToTutorials={onNavigateToTutorials}
          setShowOnboardingModal={setShowThirtyDayModal}
          onNavigateToAddCustomer={onNavigateToAddCustomer}
          onNavigateToLogJob={onNavigateToLogJob}
          onNavigateToLogQuote={onNavigateToLogQuote}
          onNavigateToReports={onNavigateToReports}
          onTaskCompleted={onTaskCompleted}
          completedTasks={completedTasks}
          onNavigateToInvoiceTutorial={onNavigateToInvoiceTutorial}
        />
      case 5:
        return <TutorialsVideosScreen 
          isLoggingJobCompleted={isLoggingJobCompleted}
          isCreatingCustomerCompleted={isCreatingCustomerCompleted}
          onNavigateToLogJob={onNavigateToLogJob || (() => {})}
          onNavigateToAddCustomer={onNavigateToAddCustomer || (() => {})}
        />
      default:
        return <AboutYourBusinessScreen />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 w-full">
      {/* <OnboardingHeader /> */}
      <ProgressBar completedTasks={completedTasks} />
      <main className="px-4 py-8 w-full pb-24">{renderScreen()}</main>
      <NavigationButtons />
    </div>
  )
}
