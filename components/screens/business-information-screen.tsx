"use client"

import { useState, useEffect } from "react"
import { useOnboarding } from "../onboarding-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { BarChart3, Settings, FileText, CheckCircle2 } from "lucide-react"

export function BusinessInformationScreen() {
  const { data, updateData } = useOnboarding()
  const [formData, setFormData] = useState(data.businessInformation)
  const [jobEntryMethods, setJobEntryMethods] = useState<string[]>([])
  const [otherJobEntryMethod, setOtherJobEntryMethod] = useState<string>("")

  useEffect(() => {
    setFormData(data.businessInformation)
  }, [data.businessInformation])

  const handleInputChange = (section: string, field: string, value: string) => {
    const newData = {
      ...formData,
      [section]: {
        ...formData[section as keyof typeof formData],
        [field]: value,
      },
    }
    setFormData(newData)
    updateData("businessInformation", newData)
  }

  const handleDirectInputChange = (field: string, value: string) => {
    const newData = { ...formData, [field]: value }
    setFormData(newData)
    updateData("businessInformation", newData)
  }

  const handleArrayChange = (field: string, values: string[]) => {
    const newData = { ...formData, [field]: values }
    setFormData(newData)
    updateData("businessInformation", newData)
  }

  const handleCheckboxChange = (field: string, value: string, checked: boolean) => {
    const currentValues = formData[field as keyof typeof formData] as string[]
    let newValues: string[]

    if (checked) {
      newValues = [...currentValues, value]
    } else {
      newValues = currentValues.filter((item) => item !== value)
    }

    handleArrayChange(field, newValues)
  }

  const handleWorkTypeChange = (value: string, checked: boolean) => {
    handleCheckboxChange("workTypes", value, checked)
  }

  const handleAccreditationChange = (value: string, checked: boolean) => {
    handleCheckboxChange("accreditations", value, checked)
  }

  const handleContractChange = (field: string, value: any) => {
    const newData = {
      ...formData,
      contractManagement: {
        ...formData.contractManagement,
        [field]: value,
      },
    }
    setFormData(newData)
    updateData("businessInformation", newData)
  }

  const handleStockChange = (field: string, value: any) => {
    const newData = {
      ...formData,
      stockInventory: {
        ...formData.stockInventory,
        [field]: value,
      },
    }
    setFormData(newData)
    updateData("businessInformation", newData)
  }

  const handleFinanceChange = (field: string, value: any) => {
    const newData = {
      ...formData,
      financeManagement: {
        ...formData.financeManagement,
        [field]: value,
      },
    }
    setFormData(newData)
    updateData("businessInformation", newData)
  }

  const handleJobEntryMethodChange = (method: string, checked: boolean) => {
    const updated = checked
      ? [...jobEntryMethods, method]
      : jobEntryMethods.filter(m => m !== method)
    
    setJobEntryMethods(updated)
  }

  const handleOtherJobEntryMethodChange = (value: string) => {
    setOtherJobEntryMethod(value)
  }

  const workTypeOptions = [
    "Installation Services",
    "Maintenance & Repair",
    "Emergency Call-outs",
    "Compliance & Testing",
    "Design & Consultation",
    "Upgrades & Retrofits",
  ]

  const accreditationOptions = [
    "NICEIC",
    "ECA",
    "NAPIT",
    "ELECSA",
    "SafeContractor",
    "CHAS",
    "Constructionline",
    "ISO 9001",
    "ISO 14001",
    "ISO 45001",
  ]

  return (
    <div className="container mx-auto max-w-6xl">
      {/* Enhanced Header */}
      <div className="mb-10 text-center">
        <div className="bg-gradient-to-r from-teal-50 to-blue-50 rounded-xl border border-teal-200 p-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-teal-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xl">3</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900">How You Work</h1>
          </div>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Tell us about your day-to-day operations so we can configure JobLogic 
            to perfectly match your team's workflow and business needs.
          </p>
          <div className="flex items-center justify-center space-x-2 text-sm text-teal-700 bg-teal-100 rounded-full px-4 py-2 inline-flex mt-4">
            <span className="w-2 h-2 bg-teal-500 rounded-full"></span>
            <span>This customizes your dashboard and features</span>
          </div>
        </div>
      </div>

      <div className="space-y-8">
        {/* Enhanced Business Volumes */}
        <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300">
          <CardHeader className="bg-gradient-to-r from-gray-50 to-blue-50 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center">
                <BarChart3 className="h-6 w-6 text-teal-600" />
              </div>
              <div>
                <CardTitle className="text-xl text-gray-900">Your Usual Workload</CardTitle>
                <p className="text-sm text-gray-600 mt-1">Help us understand the scale of your operations</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="space-y-3">
                <Label htmlFor="numberOfCustomers" className="text-sm font-semibold text-gray-700 flex items-center">
                  <span className="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
                  Number of Active Customers *
                </Label>
                <div className="relative">
                  <Input
                    id="numberOfCustomers"
                    type="number"
                    value={formData.businessVolumes.numberOfCustomers}
                    onChange={(e) => handleInputChange("businessVolumes", "numberOfCustomers", e.target.value)}
                    placeholder="e.g., 150"
                    className="border-gray-300 focus:border-teal-500 focus:ring-teal-500 pl-4"
                  />
                  <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                    <span className="text-gray-400 text-sm">customers</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <Label htmlFor="numberOfEngineers" className="text-sm font-semibold text-gray-700 flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                  Number of Engineers/Technicians *
                </Label>
                <div className="relative">
                  <Input
                    id="numberOfEngineers"
                    type="number"
                    value={formData.businessVolumes.numberOfEngineers}
                    onChange={(e) => handleInputChange("businessVolumes", "numberOfEngineers", e.target.value)}
                    placeholder="e.g., 12"
                    className="border-gray-300 focus:border-teal-500 focus:ring-teal-500 pl-4"
                  />
                  <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                    <span className="text-gray-400 text-sm">staff</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <Label htmlFor="numberOfJobs" className="text-sm font-semibold text-gray-700 flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  Average Jobs per Month *
                </Label>
                <div className="relative">
                  <Input
                    id="numberOfJobs"
                    type="number"
                    value={formData.businessVolumes.numberOfJobs}
                    onChange={(e) => handleInputChange("businessVolumes", "numberOfJobs", e.target.value)}
                    placeholder="e.g., 200"
                    className="border-gray-300 focus:border-teal-500 focus:ring-teal-500 pl-4"
                  />
                  <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                    <span className="text-gray-400 text-sm">jobs/month</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Workload Insights */}
            {(formData.businessVolumes.numberOfCustomers || formData.businessVolumes.numberOfEngineers || formData.businessVolumes.numberOfJobs) && (
              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <BarChart3 className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-900 mb-1">Workload Analysis</h4>
                    <p className="text-sm text-blue-800">
                      Based on your inputs, we'll optimize JobLogic's performance and recommend the best features for your business size.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Enhanced Work Preferences Section */}
        {/* <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300"> */}
          {/* <CardHeader className="bg-gradient-to-r from-gray-50 to-green-50 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Settings className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <CardTitle className="text-xl text-gray-900">Additional Business Information</CardTitle>
                <p className="text-sm text-gray-600 mt-1">Help us better configure JobLogic for your needs</p>
              </div>
            </div>
          </CardHeader> */}
          {/* <CardContent className="p-6"> */}
            {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6"> */}
              {/* <div className="space-y-3">
                <Label className="text-sm font-semibold text-gray-700 flex items-center">
                  <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                  Business Operating Model
                </Label>
                <Select onValueChange={(value) => console.log('Business type:', value)}>
                  <SelectTrigger className="border-gray-300 focus:border-teal-500 focus:ring-teal-500">
                    <SelectValue placeholder="Select your business model" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="service-only">Service Only</SelectItem>
                    <SelectItem value="emergency-response">Emergency Response</SelectItem>
                    <SelectItem value="maintenance-contracts">Maintenance Contracts</SelectItem>
                    <SelectItem value="project-based">Project-Based Work</SelectItem>
                    <SelectItem value="mixed">Mixed Services</SelectItem>
                  </SelectContent>
                </Select>
              </div> */}
{/* 
              <div className="space-y-3">
                <Label className="text-sm font-semibold text-gray-700 flex items-center">
                  <span className="w-2 h-2 bg-indigo-500 rounded-full mr-2"></span>
                  Service Coverage
                </Label>
                <Select onValueChange={(value) => console.log('Service area:', value)}>
                  <SelectTrigger className="border-gray-300 focus:border-teal-500 focus:ring-teal-500">
                    <SelectValue placeholder="Select your service coverage" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="local">Local (Single City/Region)</SelectItem>
                    <SelectItem value="regional">Regional (Multiple Cities)</SelectItem>
                    <SelectItem value="national">National Coverage</SelectItem>
                    <SelectItem value="international">International</SelectItem>
                  </SelectContent>
                </Select>
              </div> */}
            {/* </div> */}

            {/* Information Notice */}
            {/* <div className="mt-6 p-4 bg-gradient-to-r from-teal-50 to-blue-50 border border-teal-200 rounded-lg">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-teal-900 mb-1">Intelligent Configuration</h4>
                  <p className="text-sm text-teal-800">
                    JobLogic will automatically configure features, workflows, and dashboards 
                    based on your industry selection and business information. You can always 
                    customize these settings later.
                  </p>
                </div>
              </div>
            </div> */}
          {/* </CardContent> */}
        {/* </Card> */}

        {/* Summary Card */}
        {(formData.businessVolumes.numberOfCustomers || 
          formData.businessVolumes.numberOfEngineers || 
          formData.businessVolumes.numberOfJobs) && (
          <Card className="border border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-green-900 text-lg mb-2">Perfect! We're setting up JobLogic for you</h3>
                  <div className="space-y-2 text-sm text-green-800">
                    {formData.businessVolumes.numberOfCustomers && (
                      <div className="flex items-center">
                        <span className="w-2 h-2 bg-green-600 rounded-full mr-2"></span>
                        <span>Customer database optimized for {formData.businessVolumes.numberOfCustomers} active customers</span>
                      </div>
                    )}
                    {formData.businessVolumes.numberOfEngineers && (
                      <div className="flex items-center">
                        <span className="w-2 h-2 bg-green-600 rounded-full mr-2"></span>
                        <span>Team management tools configured for {formData.businessVolumes.numberOfEngineers} team members</span>
                      </div>
                    )}
                    {formData.businessVolumes.numberOfJobs && (
                      <div className="flex items-center">
                        <span className="w-2 h-2 bg-green-600 rounded-full mr-2"></span>
                        <span>Job scheduling optimized for {formData.businessVolumes.numberOfJobs} jobs per month</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Systems Information */}
        {/* <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Settings className="h-5 w-5 text-teal-500" />
              <span>Other Tools You Use</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="accountingSoftware">Do you use any accounting software? *</Label>
                <Select
                  value={formData.systems.accountingSoftware}
                  onValueChange={(value) => handleInputChange("systems", "accountingSoftware", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select accounting software" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="QuickBooks">QuickBooks</SelectItem>
                    <SelectItem value="Xero">Xero</SelectItem>
                    <SelectItem value="Sage">Sage</SelectItem>
                    <SelectItem value="FreeAgent">FreeAgent</SelectItem>
                    <SelectItem value="Excel/Spreadsheets">Excel/Spreadsheets</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                    <SelectItem value="None">None</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="existingSoftware">What do you currently use to manage your business? *</Label>
                <Select
                  value={formData.systems.existingSoftware}
                  onValueChange={(value) => handleInputChange("systems", "existingSoftware", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select existing software" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ServiceTitan">ServiceTitan</SelectItem>
                    <SelectItem value="FieldEdge">FieldEdge</SelectItem>
                    <SelectItem value="Housecall Pro">Housecall Pro</SelectItem>
                    <SelectItem value="Jobber">Jobber</SelectItem>
                    <SelectItem value="Excel/Paper">Excel/Paper Based</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                    <SelectItem value="None">None</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card> */}

        {/* Business Overview
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileText className="h-5 w-5 text-teal-500" />
              <span>Business Overview</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="businessOverview">Business Overview *</Label>
              <Textarea
                id="businessOverview"
                value={formData.businessOverview}
                onChange={(e) => handleDirectInputChange("businessOverview", e.target.value)}
                placeholder="Describe your business, main services, and target market..."
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="challenges">What challenges or pain-points are you currently facing? *</Label>
              <Textarea
                id="challenges"
                value={formData.challenges}
                onChange={(e) => handleDirectInputChange("challenges", e.target.value)}
                placeholder="Challenges faced in business operations such as scheduling conflicts, invoicing delays?"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="shortTermObjectives">Short-term Objectives (6-12 months) *</Label>
                <Textarea
                  id="shortTermObjectives"
                  value={formData.shortTermObjectives}
                  onChange={(e) => handleDirectInputChange("shortTermObjectives", e.target.value)}
                  placeholder="What do you want to achieve in the next 6-12 months (e.g. reduce manual entry by 80%)?"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="longTermObjectives">Long-term Objectives (1-3 years) *</Label>
                <Textarea
                  id="longTermObjectives"
                  value={formData.longTermObjectives}
                  onChange={(e) => handleDirectInputChange("longTermObjectives", e.target.value)}
                  placeholder="What are your strategic goals (e.g. expand to new regions)?"
                  rows={3}
                />
              </div>
            </div>
          </CardContent>
        </Card> */}

        {/* Accreditations */}
        {/* <Card>
          <CardHeader>
            <CardTitle>Accreditations & Certifications</CardTitle>
            <p className="text-sm text-gray-600">Select all accreditations your company holds</p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {accreditationOptions.map((accreditation) => (
                <div key={accreditation} className="flex items-center space-x-2">
                  <Checkbox
                    id={`accreditation-${accreditation}`}
                    checked={formData.accreditations.includes(accreditation)}
                    onCheckedChange={(checked) => handleAccreditationChange(accreditation, checked as boolean)}
                  />
                  <Label htmlFor={`accreditation-${accreditation}`} className="text-sm">
                    {accreditation}
                  </Label>
                </div>
              ))}
            </div>
          </CardContent>
        </Card> */}

        {/* Business Workflow */}
        {/* <Card>
          <CardHeader>
            <CardTitle>How You Handle Jobs</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>How do jobs typically enter your system? *</Label>
              <div className="grid grid-cols-2 gap-3 mt-2">
                {[
                  "Phone calls",
                  "Email requests", 
                  "Website form submissions",
                  "WhatsApp or SMS",
                  "Repeat customer rebooking",
                  "Internal team request",
                  "Customer Portal",
                  "Third-Party Integration",
                  "Other"
                ].map((method) => (
                  <div key={method} className="flex items-center space-x-2">
                    <Checkbox
                      id={method}
                      checked={jobEntryMethods.includes(method)}
                      onCheckedChange={(checked) => handleJobEntryMethodChange(method, checked as boolean)}
                    />
                    <Label htmlFor={method}>{method}</Label>
                  </div>
                ))}
              </div>
              {jobEntryMethods.includes("Other") && (
                <div className="mt-3">
                  <Label htmlFor="otherJobEntryInput">Please specify other method:</Label>
                  <Input
                    id="otherJobEntryInput"
                    value={otherJobEntryMethod}
                    onChange={(e) => handleOtherJobEntryMethodChange(e.target.value)}
                    placeholder="Enter other job entry method"
                    className="mt-1"
                  />
                </div>
              )}
            </div>

            {/* <div className="space-y-2">
              <Label htmlFor="jobAssignment">How are jobs assigned to engineers? *</Label>
              <Textarea
                id="jobAssignment"
                value={formData.businessWorkflow.jobAssignment}
                onChange={(e) => handleInputChange("businessWorkflow", "jobAssignment", e.target.value)}
                placeholder="e.g., Manual assignment, automated scheduling, engineer choice..."
                rows={2}
              />
            </div> */}

            {/* <div className="space-y-2">
              <Label htmlFor="onSiteSteps">What steps do engineers follow on-site and after completion? *</Label>
              <Textarea
                id="onSiteSteps"
                value={formData.businessWorkflow.onSiteSteps}
                onChange={(e) => handleInputChange("businessWorkflow", "onSiteSteps", e.target.value)}
                placeholder="e.g., Check-in, assessment, work completion, customer sign-off..."
                rows={2}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="softwareSteps">What software or manual steps support each stage? *</Label>
              <Textarea
                id="softwareSteps"
                value={formData.businessWorkflow.softwareSteps}
                onChange={(e) => handleInputChange("businessWorkflow", "softwareSteps", e.target.value)}
                placeholder="e.g., Scheduling Software, Mobile apps, paper forms, tablets, testing equipment..."
                rows={2}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="teamHandoffs">How are handoffs managed between team members? *</Label>
              <Textarea
                id="teamHandoffs"
                value={formData.businessWorkflow.teamHandoffs}
                onChange={(e) => handleInputChange("businessWorkflow", "teamHandoffs", e.target.value)}
                placeholder="e.g., Daily briefings, digital handover notes, phone calls..."
                rows={2}
              />
            </div> */}
          {/* </CardContent>
        </Card> */}

        {/* Customizations */}
        {/* <Card>
          <CardHeader>
            <CardTitle>Industry-Specific Customizations</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="industryProcesses">Are there specific industry processes we should be aware of? *</Label>
              <Textarea
                id="industryProcesses"
                value={formData.customizations.industryProcesses}
                onChange={(e) => handleInputChange("customizations", "industryProcesses", e.target.value)}
                placeholder="e.g., Specific testing procedures, compliance requirements, safety audits, certification processes..."
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="uniqueRequirements">Are there any specific customizations or unique requirements your business needs? *</Label>
              <Textarea
                id="uniqueRequirements"
                value={formData.customizations.uniqueRequirements}
                onChange={(e) => handleInputChange("customizations", "uniqueRequirements", e.target.value)}
                placeholder="e.g., Integration requirements, seasonal schedling rules, custom reporting needs, specific workflows..."
                rows={3}
              />
            </div>
          </CardContent>
        </Card> */}

        {/* Additional Information */}
        {/* <Card>
          <CardHeader>
            <CardTitle>Anything Else to Share?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label htmlFor="additionalInfo">Is there anything else you'd like us to know about your business?</Label>
              <Textarea
                id="additionalInfo"
                value={formData.additionalInfo}
                onChange={(e) => handleDirectInputChange("additionalInfo", e.target.value)}
                placeholder="Any additional information that might help us configure JobLogic for your needs..."
                rows={4}
              />
            </div>
          </CardContent>
        </Card> */}
      </div>
    </div>
  )
}
