"use client"

import { useOnboarding } from "../onboarding-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, ArrowLeft, ExternalLink, Mail, Phone, BookOpen, Building, Users, Settings, Database, Wrench } from "lucide-react"
import { useState } from "react"

interface CompletionScreenProps {
  onOnboardingCompletion?: () => void
  onNavigateToTutorials?: () => void
}

export function CompletionScreen({ onOnboardingCompletion, onNavigateToTutorials }: CompletionScreenProps = {}) {
  const { setCurrentStep, data } = useOnboarding()
  const [showSuccessPrompt, setShowSuccessPrompt] = useState(false)

  const handleGoBack = () => {
    setCurrentStep(9) // Go back to JobLogic Templates screen
  }

  const handleComplete = () => {
    // Mark the initial onboarding as completed
    if (onOnboardingCompletion) {
      onOnboardingCompletion()
    }
    
    // If we can navigate directly to tutorials, do it
    if (onNavigateToTutorials) {
      onNavigateToTutorials()
    } else {
      // Otherwise show success prompt with option to continue
      setShowSuccessPrompt(true)
    }
  }

  const handleContinueToTutorials = () => {
    if (onNavigateToTutorials) {
      onNavigateToTutorials()
    } else {
      // Fallback: navigate to step 11 (tutorials within onboarding flow)
      setCurrentStep(11)
    }
  }

  const hasWIPJobs = data.workInProgress?.hasWIPJobs && data.workInProgress?.counts
  const totalJobs = data.workInProgress?.counts ? 
    data.workInProgress.counts.inProgress + 
    data.workInProgress.counts.scheduled + 
    data.workInProgress.counts.onHold + 
    data.workInProgress.counts.awaitingParts : 0
  const learningMethod = hasWIPJobs ? "hybrid" : "standard"

  // Review sections from review-finalize-screen
  const sections = [
    {
      id: "about-your-business",
      title: "About Your Business",
      icon: Building,
      data: { ...data.companyOverview, ...data.companyDetails },
      items: [
        { label: "Company Name", value: data.companyDetails.companyName },
        { label: "Business Type", value: data.companyOverview.businessType },
        { label: "Company Size", value: data.companyOverview.companySize },
        { label: "Years in Business", value: data.companyOverview.yearsInBusiness },
        { label: "Business Address", value: data.companyDetails.businessAddress },
        { label: "Phone Number", value: data.companyDetails.phoneNumber },
        { label: "Contact Email", value: data.companyDetails.contactEmail },
        { label: "Website", value: data.companyDetails.website || "Not provided" },
        { label: "Primary Services", value: data.companyOverview.primaryServices.join(", ") || "None selected" },
        { label: "Target Markets", value: data.companyOverview.targetMarkets.join(", ") || "None selected" },
        { label: "Timezone", value: data.companyDetails.timezone },
        { label: "Currency", value: data.companyDetails.currency },
        { label: "Region", value: data.companyDetails.region },
      ],
    },
    {
      id: "your-services",
      title: "Your Services",
      icon: Settings,
      data: data.industryConfiguration,
      items: [
        { label: "Selected Industries", value: data.industryConfiguration.selectedIndustries.join(", ") },
        { label: "Custom Industry", value: data.industryConfiguration.customIndustry || "None" },
        { label: "Work Types", value: `${data.businessInformation?.workTypes?.length || 0} types selected` },
        { label: "Service Areas", value: data.industryConfiguration.selectedIndustries.join(", ") },
        { label: "Selected Forms", value: `${data.industryConfiguration.selectedForms.length} forms selected` },
        {
          label: "Selected Dashboards",
          value: `${data.industryConfiguration.selectedDashboards.length} dashboards selected`,
        },
      ],
    },
    {
      id: "how-you-work",
      title: "How You Work",
      icon: Settings,
      data: data.businessInformation,
      items: [
        { label: "Number of Customers", value: data.businessInformation.businessVolumes.numberOfCustomers },
        { label: "Number of Engineers", value: data.businessInformation.businessVolumes.numberOfEngineers },
        { label: "Number of Jobs (Monthly)", value: data.businessInformation.businessVolumes.numberOfJobs },
        { label: "Accounting Software", value: data.businessInformation.systems.accountingSoftware },
        { label: "Back Office Users", value: data.businessInformation.systems.backOfficeUsers },
        { label: "Mobile Users", value: data.businessInformation.systems.mobileUsers },
        { label: "Stock/Inventory Management", value: data.businessInformation.stockInventory.hasStock ? "Yes" : "No" },
        {
          label: "Finance Management",
          value: data.businessInformation.financeManagement.hasFinanceManager ? "Yes" : "No",
        },
      ],
    },
    {
      id: "work-in-progress",
      title: "Work in Progress",
      icon: Wrench,
      data: data.workInProgress,
      items: [
        { label: "Total Current Jobs", value: data.workInProgress.counts?.totalJobs?.toString() || "0" },
        { label: "Jobs In Progress", value: data.workInProgress.counts?.inProgress?.toString() || "0" },
        { label: "Scheduled Jobs", value: data.workInProgress.counts?.scheduled?.toString() || "0" },
        { label: "Jobs On Hold", value: data.workInProgress.counts?.onHold?.toString() || "0" },
        { label: "Pending Quotes", value: data.workInProgress.counts?.pendingQuotes?.toString() || "0" },
        { label: "Pending Invoices", value: data.workInProgress.counts?.pendingInvoices?.toString() || "0" },
        { label: "Safety Forms", value: data.workInProgress.counts?.safetyForms?.toString() || "0" },
        { label: "Document Templates", value: data.workInProgress.counts?.documentTemplates?.toString() || "0" },
      ],
    },
    {
      id: "your-data",
      title: "Your Data",
      icon: Database,
      data: data.dataImport,
      items: [
        { label: "Starting Fresh", value: data.dataImport.needsImport ? "No - Transferring old data" : "Yes - Starting fresh (Recommended)" },
        ...(data.dataImport.needsImport
          ? [
              { label: "Data Mapping", value: "Will map own data to JobLogic templates" },
              { label: "Processing Time", value: "3-10 business days" },
              { label: "Support", value: "Live chat assistance available" },
            ]
          : [
              { label: "Benefits", value: "Clean system, learn as you go, immediate start" },
            ]),
      ],
    },
  ]

  return (
    <div className="container mx-auto max-w-4xl">
      {showSuccessPrompt && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md mx-4 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Setup Complete!</h2>
            <p className="text-gray-600 mb-6">
              Your JobLogic system has been successfully configured. Ready to start your learning journey?
            </p>
            <div className="space-y-3">
              <Button 
                onClick={handleContinueToTutorials} 
                className="w-full bg-teal-600 hover:bg-teal-700"
              >
                Continue to Tutorials & Videos
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setShowSuccessPrompt(false)}
                className="w-full"
              >
                Stay Here
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Review & Setup Complete */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Setup Complete!</h1>
        <p className="text-gray-600">Review your configuration and get ready to start using JobLogic.</p>
      </div>

      {/* Quick Configuration Summary */}
      <Card className="mb-8 border-green-200 bg-green-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-green-800">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            Your JobLogic System is Ready
          </CardTitle>
          <CardDescription className="text-green-700">
            {hasWIPJobs 
              ? `Configured for your business with ${totalJobs} active job${totalJobs !== 1 ? 's' : ''} ready for training`
              : "Configured and ready for your electrical business operations"
            }
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <Building className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <h4 className="font-semibold text-green-800">Business Setup</h4>
              <p className="text-sm text-green-700">{data.companyDetails?.companyName || "Your Company"}</p>
              <p className="text-xs text-green-600">{data.companyOverview?.businessType || "Business"}</p>
            </div>
            <div className="text-center">
              <Settings className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <h4 className="font-semibold text-green-800">Services & Forms</h4>
              <p className="text-sm text-green-700">{data.industryConfiguration?.selectedIndustries?.length || 0} Industries</p>
              <p className="text-xs text-green-600">{data.industryConfiguration?.selectedForms?.length || 0} Forms Selected</p>
            </div>
            <div className="text-center">
              <Database className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <h4 className="font-semibold text-green-800">Data Strategy</h4>
              <p className="text-sm text-green-700">
                {data.dataImport?.needsImport ? "Import Existing" : "Fresh Start"}
              </p>
              <p className="text-xs text-green-600">
                {hasWIPJobs ? `${totalJobs} jobs captured` : "Ready to begin"}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Configuration Review - Collapsible */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-teal-600" />
            Detailed Configuration Review
          </CardTitle>
          <CardDescription>
            Complete breakdown of your JobLogic setup (click sections to expand)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {sections.map((section, index) => {
              const IconComponent = section.icon
              return (
                <details key={section.id} className="group">
                  <summary className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
                    <div className="flex items-center justify-center w-6 h-6 bg-teal-100 rounded-full">
                      <span className="text-xs font-bold text-teal-600">{index + 1}</span>
                    </div>
                    <IconComponent className="w-4 h-4 text-teal-600" />
                    <span className="font-medium">{section.title}</span>
                    <CheckCircle className="w-4 h-4 text-green-500 ml-auto" />
                  </summary>
                  <div className="mt-3 pl-4 border-l-2 border-gray-200">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {section.items.map((item, itemIndex) => (
                        <div key={itemIndex} className="flex justify-between items-start py-1">
                          <span className="text-sm font-medium text-gray-600">{item.label}:</span>
                          <span className="text-sm text-gray-900 text-right max-w-xs">{item.value || "Not provided"}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </details>
              )
            })}
          </div>
        </CardContent>
      </Card>
      
      {/* What Happens Next - Simplified */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-blue-600" />
            </div>
            What Happens Next
          </CardTitle>
          <CardDescription>Your learning journey begins now</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Immediate Next Steps */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="font-semibold text-blue-800 mb-3 flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                Ready to Start Learning
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-medium text-blue-700 mb-1">✓ System Configured</p>
                  <p className="text-blue-600">Based on your electrical business needs</p>
                </div>
                <div>
                  <p className="font-medium text-blue-700 mb-1">✓ Forms & Dashboards</p>
                  <p className="text-blue-600">Industry-specific templates ready</p>
                </div>
                <div>
                  <p className="font-medium text-blue-700 mb-1">✓ Data Strategy</p>
                  <p className="text-blue-600">
                    {data.dataImport?.needsImport ? "Import process initiated" : "Clean start configured"}
                  </p>
                </div>
                <div>
                  <p className="font-medium text-blue-700 mb-1">✓ Training Ready</p>
                  <p className="text-blue-600">
                    {hasWIPJobs ? `${totalJobs} real jobs for practice` : "Step-by-step tutorials prepared"}
                  </p>
                </div>
              </div>
            </div>

            {hasWIPJobs && (
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <h4 className="font-semibold text-purple-800 mb-2">🎯 Your Hybrid Learning Experience</h4>
                <p className="text-sm text-purple-700 mb-3">
                  Practice with your actual work data ({totalJobs} active job{totalJobs !== 1 ? 's' : ''})
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-purple-600">
                  <span>• Real customer information</span>
                  <span>• Actual job locations</span>
                  <span>• Current work scenarios</span>
                  <span>• Live workflow practice</span>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Primary Call to Action */}
      <Card className="mb-8 border-teal-200 bg-teal-50">
        <CardContent className="pt-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-8 h-8 text-teal-600" />
            </div>
            <h2 className="text-2xl font-bold text-teal-900 mb-2">Ready to Begin?</h2>
            <p className="text-teal-700 mb-6">
              {hasWIPJobs 
                ? "Start learning JobLogic with your real job data" 
                : "Begin your JobLogic learning journey"
              }
            </p>
            <div className="flex justify-center">
              <Button 
                onClick={handleComplete} 
                className="bg-teal-600 hover:bg-teal-700 text-white px-8"
                size="lg"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Start Learning Journey
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Support Information - Simplified */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Need Help?</CardTitle>
          <CardDescription>Our UK-based support team is ready to assist you</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <a 
              href="mailto:support@joblogic.com" 
              className="flex items-center gap-3 p-4 border rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Mail className="w-5 h-5 text-teal-600" />
              <div>
                <p className="font-medium">Email Support</p>
                <p className="text-sm text-gray-600">support@joblogic.com</p>
              </div>
            </a>
            <a 
              href="tel:+441234567890" 
              className="flex items-center gap-3 p-4 border rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Phone className="w-5 h-5 text-teal-600" />
              <div>
                <p className="font-medium">Phone Support</p>
                <p className="text-sm text-gray-600">+44 (0) 123 456 789</p>
              </div>
            </a>
            <a 
              href="https://help.joblogic.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 border rounded-lg hover:bg-gray-50 transition-colors"
            >
              <BookOpen className="w-5 h-5 text-teal-600" />
              <div>
                <p className="font-medium">Help Center</p>
                <p className="text-sm text-gray-600">help.joblogic.com</p>
              </div>
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
