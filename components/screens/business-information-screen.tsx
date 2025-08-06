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
import { BarChart3, Settings, FileText } from "lucide-react"

export function BusinessInformationScreen() {
  const { data, updateData } = useOnboarding()
  const [formData, setFormData] = useState(data.businessInformation)

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
    <div className="container mx-auto max-w-4xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">How You Work</h1>
        <p className="text-gray-600">
          Help us understand your business better by providing detailed information about your operations, processes,
          and requirements.
        </p>
      </div>

      <div className="space-y-6">
        {/* Business Volumes */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5 text-teal-500" />
              <span>Your Usual Workload</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="numberOfCustomers">Number of Active Customers *</Label>
                <Input
                  id="numberOfCustomers"
                  type="number"
                  value={formData.businessVolumes.numberOfCustomers}
                  onChange={(e) => handleInputChange("businessVolumes", "numberOfCustomers", e.target.value)}
                  placeholder="e.g., 150"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="numberOfEngineers">Number of Engineers/Technicians *</Label>
                <Input
                  id="numberOfEngineers"
                  type="number"
                  value={formData.businessVolumes.numberOfEngineers}
                  onChange={(e) => handleInputChange("businessVolumes", "numberOfEngineers", e.target.value)}
                  placeholder="e.g., 12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="numberOfJobs">Average Jobs per Month *</Label>
                <Input
                  id="numberOfJobs"
                  type="number"
                  value={formData.businessVolumes.numberOfJobs}
                  onChange={(e) => handleInputChange("businessVolumes", "numberOfJobs", e.target.value)}
                  placeholder="e.g., 200"
                />
              </div>
            </div>
          </CardContent>
        </Card>

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
        <Card>
          <CardHeader>
            <CardTitle>How You Handle Jobs</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="jobEntry">How do jobs typically enter your system? *</Label>
              <Textarea
                id="jobEntry"
                value={formData.businessWorkflow.jobEntry}
                onChange={(e) => handleInputChange("businessWorkflow", "jobEntry", e.target.value)}
                placeholder="e.g., Phone calls, website inquiries, repeat customers..."
                rows={2}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="jobAssignment">How are jobs assigned to engineers? *</Label>
              <Textarea
                id="jobAssignment"
                value={formData.businessWorkflow.jobAssignment}
                onChange={(e) => handleInputChange("businessWorkflow", "jobAssignment", e.target.value)}
                placeholder="e.g., Manual assignment, automated scheduling, engineer choice..."
                rows={2}
              />
            </div>

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
          </CardContent>
        </Card>

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
