"use client"

import { useOnboarding } from "./onboarding-context"
import { OnboardingHeader } from "./onboarding-header"
import { ProgressBar } from "./progress-bar"
import { NavigationButtons } from "./navigation-buttons"
import { AboutYourBusinessScreen } from "./screens/about-your-business-screen"
import YourServicesScreen from "./screens/your-services-screen"
import { BusinessInformationScreen } from "./screens/business-information-screen"
import { DataImportOverviewScreen } from "./screens/data-import-overview-screen"
import { DataImportScreen } from "./screens/data-import-screen"
import { SoftwareCredentialsScreen } from "./screens/software-credentials-screen"
import { UploadDataFilesScreen } from "./screens/upload-data-files-screen"
import { JoblogicTemplatesScreen } from "./screens/joblogic-templates-screen"
import { WorkInProgressScreen } from "./screens/work-in-progress-screen"
import { CompletionScreen } from "./screens/completion-screen"
import { TutorialsVideosScreen } from "./screens/tutorials-videos-screen"

interface OnboardingFlowProps {
  isLoggingJobCompleted?: boolean
  isCreatingCustomerCompleted?: boolean
  onOnboardingCompletion?: () => void
  onNavigateToTutorials?: () => void
}

export function OnboardingFlow({ 
  isLoggingJobCompleted = false, 
  isCreatingCustomerCompleted = false,
  onOnboardingCompletion,
  onNavigateToTutorials
}: OnboardingFlowProps = {}) {
  const { currentStep } = useOnboarding()

  const renderScreen = () => {
    switch (currentStep) {
      case 1:
        return <AboutYourBusinessScreen />
      case 2:
        return <YourServicesScreen />
      case 3:
        return <BusinessInformationScreen />
      case 4:
        return <WorkInProgressScreen />
      case 5:
        return <DataImportOverviewScreen />
      case 6:
        return <DataImportScreen />
      case 7:
        return <SoftwareCredentialsScreen />
      case 8:
        return <UploadDataFilesScreen />
      case 9:
        return <JoblogicTemplatesScreen />
      case 10:
        return <CompletionScreen 
          onOnboardingCompletion={onOnboardingCompletion} 
          onNavigateToTutorials={onNavigateToTutorials}
        />
      case 11:
        return <TutorialsVideosScreen 
          isLoggingJobCompleted={isLoggingJobCompleted}
          isCreatingCustomerCompleted={isCreatingCustomerCompleted}
          onNavigateToLogJob={() => {/* Could implement navigation to job logging screen if needed */}}
          onNavigateToAddCustomer={() => {/* Could implement navigation to customer creation screen if needed */}}
        />
      default:
        return <AboutYourBusinessScreen />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 w-full">
      <OnboardingHeader />
      <ProgressBar />
      <main className="px-4 py-8 w-full pb-24">{renderScreen()}</main>
      <NavigationButtons />
    </div>
  )
}
