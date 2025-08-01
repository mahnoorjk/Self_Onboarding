"use client"

import { useOnboarding } from "../onboarding-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Building, Users, Settings, Database, Wrench } from "lucide-react"

export function ReviewFinalizeScreen() {
  const { data } = useOnboarding()

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
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Review & Finalize</h1>
        <p className="text-gray-600">Please review your configuration before we set up your JobLogic system.</p>
      </div>

      <div className="space-y-6">
        {sections.map((section, index) => {
          const IconComponent = section.icon
          return (
            <Card key={section.id}>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-8 h-8 bg-teal-100 rounded-full">
                    <span className="text-sm font-bold text-teal-600">{index + 1}</span>
                  </div>
                  <IconComponent className="w-5 h-5 text-teal-600" />
                  {section.title}
                  <CheckCircle className="w-5 h-5 text-green-500 ml-auto" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {section.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="flex justify-between items-start">
                      <span className="text-sm font-medium text-gray-600">{item.label}:</span>
                      <span className="text-sm text-gray-900 text-right max-w-xs">{item.value || "Not provided"}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )
        })}

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <div className="flex items-center justify-center w-8 h-8 bg-green-100 rounded-full">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              Setup Summary
            </CardTitle>
            <CardDescription>Your JobLogic system will be configured with the following features</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <h3 className="font-semibold text-green-800 mb-4">What happens next:</h3>
              <ul className="space-y-2 text-sm text-green-700">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  Your JobLogic system will be configured based on your selections
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  Industry-specific forms and dashboards will be set up for your services
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  System will be configured to match how you work
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  You'll have access to step-by-step guides for adding your current work
                </li>
                {data.dataImport.needsImport ? (
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    Our team will help you map and process your historical data
                  </li>
                ) : (
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    You'll start with a clean system and learn JobLogic as you work
                  </li>
                )}
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
