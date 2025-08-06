'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Eye } from "lucide-react"
import { useOnboarding } from '@/components/onboarding-context'
import { useState } from 'react'

const industries = [
  "Access Control and Entry Systems",
  "Electrical Maintenance",
  "Facilities Management",
  "Fire Safety",
  "Elevator and Escalator",
  "HVACR",
  "Plumbing, Heating & Drainage",
  "Security",
  "Water Hygiene",
  "Other",
]

const electricalMaintenanceForms = [
  "Customer Satisfaction Survey",
  "Domestic Visual Condition Report",
  "Dynamic Risk Assessment",
  "Electrical Danger Notification",
  "Electrical Installation Certificate",
  "Electrical Installation Certificate ECA",
  "Electrical Installation Certificate ECA – Single Signature",
  "Electrical Installation Condition Report",
  "Electrical Installation Condition Report – 2023",
  "Electrical Installation Condition Report – ECA",
  "Electrical Isolation Certificate",
  "Emergency Light Testing Certificate",
  "Emergency Lighting Periodic Inspection and Testing Certificate – EPG6",
  "Emergency Lighting Periodic Test Certificate – ECA",
  "Emergency Lighting Small Install",
  "EPM5 Emergency Lighting Periodic Inspection and Testing Certificate",
  "Generic Schedule Circuit Details Test – ECA",
  "Ladder Inspection Checklist",
  "Minor Electrical Installation Works / Single Circuit Certificate",
  "Minor Electrical Installation Works Certificate – 2024 – ECA",
  "Minor Electrical Installation Works Certificate 2023",
  "Portable Appliance Inspection & Testing Certificate",
]

const electricalMaintenanceDashboards = [
  "Emergency Lighting and Testing Certificate – Compliance",
  "Risk Assessment – Compliance",
  "Finance",
  "CRM",
  "WIP"
]

const workTypes = ["Contracts", "Ad-Hoc Work", "Projects"]

export default function YourServicesScreen() {
  const { updateData, data } = useOnboarding()
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>(
    data.industryConfiguration.selectedIndustries || []
  )
  const [selectedWorkTypes, setSelectedWorkTypes] = useState<string[]>(
    data.businessInformation.workTypes || []
  )
  const [contractTypes, setContractTypes] = useState<string[]>([])
  const [selectedForms, setSelectedForms] = useState<string[]>(() => {
    if (data.industryConfiguration?.selectedForms) {
      return data.industryConfiguration.selectedForms
    }
    // If Electrical Maintenance is already selected, default to all forms
    if (data.industryConfiguration?.selectedIndustries?.includes("Electrical Maintenance")) {
      return electricalMaintenanceForms
    }
    return []
  })
  const [selectedDashboards, setSelectedDashboards] = useState<string[]>(() => {
    if (data.industryConfiguration?.selectedDashboards) {
      return data.industryConfiguration.selectedDashboards
    }
    // If Electrical Maintenance is already selected, default to all dashboards
    if (data.industryConfiguration?.selectedIndustries?.includes("Electrical Maintenance")) {
      return electricalMaintenanceDashboards
    }
    return []
  })

  const handleIndustryChange = (industry: string, checked: boolean) => {
    const updated = checked 
      ? [...selectedIndustries, industry]
      : selectedIndustries.filter(i => i !== industry)
    
    setSelectedIndustries(updated)
    
    // If Electrical Maintenance is selected, initialize forms and dashboards to all items
    if (industry === "Electrical Maintenance" && checked) {
      setSelectedForms(electricalMaintenanceForms)
      setSelectedDashboards(electricalMaintenanceDashboards)
      updateData('industryConfiguration', { 
        ...data.industryConfiguration,
        selectedIndustries: updated,
        selectedForms: electricalMaintenanceForms,
        selectedDashboards: electricalMaintenanceDashboards
      })
    } else {
      updateData('industryConfiguration', { 
        ...data.industryConfiguration,
        selectedIndustries: updated 
      })
    }
  }

  const handleWorkTypeChange = (workType: string, checked: boolean) => {
    const updated = checked
      ? [...selectedWorkTypes, workType]
      : selectedWorkTypes.filter(t => t !== workType)
    
    setSelectedWorkTypes(updated)
    updateData('businessInformation', { 
      ...data.businessInformation,
      workTypes: updated 
    })
  }

  const handleContractTypeChange = (type: string, checked: boolean) => {
    const updated = checked
      ? [...contractTypes, type]
      : contractTypes.filter(t => t !== type)
    
    setContractTypes(updated)
  }

  const handleFormChange = (form: string, checked: boolean) => {
    const updated = checked
      ? [...selectedForms, form]
      : selectedForms.filter(f => f !== form)
    
    setSelectedForms(updated)
    updateData('industryConfiguration', { 
      ...data.industryConfiguration,
      selectedForms: updated 
    })
  }

  const handleDashboardChange = (dashboard: string, checked: boolean) => {
    const updated = checked
      ? [...selectedDashboards, dashboard]
      : selectedDashboards.filter(d => d !== dashboard)
    
    setSelectedDashboards(updated)
    updateData('industryConfiguration', { 
      ...data.industryConfiguration,
      selectedDashboards: updated 
    })
  }

  const handlePreview = (type: 'form' | 'dashboard', item: string) => {
    // For now, we'll show an alert. In a real app, this would open a preview modal
    alert(`Preview ${type}: ${item}\n\nThis would show a preview of the ${type} template.`)
  }

  // Show work type specific forms based on selections
  const showContracts = selectedWorkTypes.includes("Contracts")
  const showAdHoc = selectedWorkTypes.includes("Ad-Hoc Work")
  const showEquipmentHire = selectedWorkTypes.includes("Equipment Hire")
  const showProjects = selectedWorkTypes.includes("Projects")
  const showEquipmentSales = selectedWorkTypes.includes("Equipment Sales")

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">Your Services</h1>
        <p className="text-muted-foreground">
          Let us know which industries you work in and what types of services you provide
        </p>
      </div>

      <div className="space-y-6">
        {/* Industry Selection */}
        <Card>
          <CardHeader>
            <CardTitle>Industry Selection</CardTitle>
          </CardHeader>
          <CardContent>
            <Label>Which industries do you work in?</Label>
            <div className="grid grid-cols-2 gap-3 mt-2">
              {industries.map((industry) => (
                <div key={industry} className="flex items-center space-x-2">
                  <Checkbox
                    id={industry}
                    checked={selectedIndustries.includes(industry)}
                    onCheckedChange={(checked) => handleIndustryChange(industry, checked as boolean)}
                  />
                  <Label htmlFor={industry}>{industry}</Label>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Selected Industries Display */}
        {selectedIndustries.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Selected Industries</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {selectedIndustries.map((industry) => (
                <Badge key={industry} variant="secondary">{industry}</Badge>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Electrical Maintenance Forms */}
        {selectedIndustries.includes("Electrical Maintenance") && (
          <Card>
            <CardHeader>
              <CardTitle>Electrical Maintenance - Forms</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-green-600 font-bold text-lg">✓</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-green-800 mb-1">Free Industry-Standard Forms Included</h4>
                    <p className="text-sm text-green-700 leading-relaxed">
                      As part of your onboarding, we're providing these professionally designed electrical maintenance forms at no extra cost. 
                      These templates comply with industry standards and will save you hours of setup time. Simply uncheck any forms you don't need.
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mt-1 mb-3">All forms are pre-selected. Uncheck any you don't need.</p>
                <div className="grid grid-cols-1 gap-3 mt-2">
                  {electricalMaintenanceForms.map((form) => (
                    <div key={form} className="flex items-center justify-between space-x-2 p-2 rounded-lg hover:bg-gray-50">
                      <div className="flex items-center space-x-2 flex-1">
                        <Checkbox 
                          id={`form-${form}`} 
                          checked={selectedForms.includes(form)}
                          onCheckedChange={(checked) => handleFormChange(form, checked as boolean)}
                        />
                        <Label htmlFor={`form-${form}`} className="text-sm cursor-pointer flex-1">{form}</Label>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handlePreview('form', form)}
                        className="flex items-center gap-1 px-2 py-1 h-auto text-xs"
                      >
                        <Eye className="w-3 h-3" />
                        Preview
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Electrical Maintenance Dashboards */}
        {selectedIndustries.includes("Electrical Maintenance") && (
          <Card>
            <CardHeader>
              <CardTitle>Electrical Maintenance - Dashboards</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-blue-600 font-bold text-lg">📊</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-800 mb-1">Complimentary Dashboard Views</h4>
                    <p className="text-sm text-blue-700 leading-relaxed">
                      Get instant business insights with these pre-built dashboard views, included free with your onboarding. 
                      These intelligent dashboards will help you track compliance, monitor performance, and manage your workflow efficiently. 
                      Uncheck any dashboards you don't require.
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mt-1 mb-3">All dashboards are pre-selected. Uncheck any you don't need.</p>
                <div className="grid grid-cols-1 gap-3 mt-2">
                  {electricalMaintenanceDashboards.map((dashboard) => (
                    <div key={dashboard} className="flex items-center justify-between space-x-2 p-2 rounded-lg hover:bg-gray-50">
                      <div className="flex items-center space-x-2 flex-1">
                        <Checkbox 
                          id={`dashboard-${dashboard}`} 
                          checked={selectedDashboards.includes(dashboard)}
                          onCheckedChange={(checked) => handleDashboardChange(dashboard, checked as boolean)}
                        />
                        <Label htmlFor={`dashboard-${dashboard}`} className="text-sm cursor-pointer flex-1">{dashboard}</Label>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handlePreview('dashboard', dashboard)}
                        className="flex items-center gap-1 px-2 py-1 h-auto text-xs"
                      >
                        <Eye className="w-3 h-3" />
                        Preview
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Work Types Selection */}
        <Card>
          <CardHeader>
            <CardTitle>Service Types</CardTitle>
          </CardHeader>
          <CardContent>
            <Label>Which types of services do you provide?</Label>
            <div className="grid grid-cols-2 gap-3 mt-2">
              {workTypes.map((workType) => (
                <div key={workType} className="flex items-center space-x-2">
                  <Checkbox
                    id={workType}
                    checked={selectedWorkTypes.includes(workType)}
                    onCheckedChange={(checked) => handleWorkTypeChange(workType, checked as boolean)}
                  />
                  <Label htmlFor={workType}>{workType}</Label>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Selected Work Types Display */}
        {selectedWorkTypes.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Selected Service Types</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {selectedWorkTypes.map((type) => (
                <Badge key={type} variant="secondary">{type}</Badge>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Contract Management Details */}
        {showContracts && (
          <Card>
            <CardHeader>
              <CardTitle>Contract Management</CardTitle>
            </CardHeader>
            <CardContent>
              <Label>Which types of contracts do you offer?</Label>
              <div className="grid grid-cols-2 gap-3 mt-2">
                {["Maintenance", "Corrective", "Hire", "Comprehensive"].map((type) => (
                  <div key={type} className="flex items-center space-x-2">
                    <Checkbox
                      id={type}
                      checked={contractTypes.includes(type)}
                      onCheckedChange={(checked) => handleContractTypeChange(type, checked as boolean)}
                    />
                    <Label htmlFor={type}>{type}</Label>
                  </div>
                ))}
              </div>
              <div className="grid md:grid-cols-2 gap-4 mt-4">
                <div>
                  <Label>Number of contracts you have in progress currently</Label>
                  <Input />
                </div>
              </div>
              <div className="mt-4">
                <Label>Who do you assign contracts to?</Label>
                <RadioGroup className="mt-2">
                  {["Engineers", "Subcontractors", "Both"].map((opt) => (
                    <div key={opt} className="flex items-center space-x-2">
                      <RadioGroupItem value={opt.toLowerCase()} id={opt.toLowerCase()} />
                      <Label htmlFor={opt.toLowerCase()}>{opt}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Ad-Hoc Work Details */}
        {showAdHoc && (
          <Card>
            <CardHeader>
              <CardTitle>Ad-Hoc Work</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Categories of Ad-Hoc Work</Label>
                <div className="grid grid-cols-2 gap-3 mt-2">
                  {["Cleaning", "PAT Testing", "Emergency Call-Outs", "Repairs"].map((cat) => (
                    <div key={cat} className="flex items-center space-x-2">
                      <Checkbox id={cat} />
                      <Label htmlFor={cat}>{cat}</Label>
                    </div>
                  ))}
                </div>
                <div className="mt-2">
                  <Label htmlFor="otherAdHoc">Other</Label>
                  <Input id="otherAdHoc" />
                </div>
              </div>
              <div>
                <Label>Frequency of Ad-Hoc Tasks</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    {["Daily", "Weekly", "Monthly", "On-Demand"].map((opt) => (
                      <SelectItem key={opt} value={opt.toLowerCase()}>
                        {opt}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Average Job Value</Label>
                <Input placeholder="e.g., £75" />
              </div>
              <div>
                <Label>Generate Quotes?</Label>
                <RadioGroup className="mt-2">
                  {["Yes", "No"].map((opt) => (
                    <div key={opt} className="flex items-center space-x-2">
                      <RadioGroupItem value={opt.toLowerCase()} id={`quote-${opt.toLowerCase()}`} />
                      <Label htmlFor={`quote-${opt.toLowerCase()}`}>{opt}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
              <div>
                <Label>Job Assignment</Label>
                <div className="grid grid-cols-2 gap-3 mt-2">
                  {["In-house engineers", "Subcontractors", "Both"].map((method) => (
                    <div key={method} className="flex items-center space-x-2">
                      <Checkbox id={method} />
                      <Label htmlFor={method}>{method}</Label>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <Label>Request Channels</Label>
                <div className="grid grid-cols-2 gap-3 mt-2">
                  {["Telephone", "Customer Portal", "Email", "Third-Party Integration"].map((ch) => (
                    <div key={ch} className="flex items-center space-x-2">
                      <Checkbox id={ch} />
                      <Label htmlFor={ch}>{ch}</Label>
                    </div>
                  ))}
                </div>
                <div className="mt-2">
                  <Label htmlFor="otherChannel">Other</Label>
                  <Input id="otherChannel" />
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Equipment Hire Details */}
        {showEquipmentHire && (
          <Card>
            <CardHeader>
              <CardTitle>Equipment Hire</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="equipmentTypes">Which equipment types do you offer for hire?</Label>
                <Textarea id="equipmentTypes" placeholder="Examples: Generators, scaffolding, tools, ladders" />
              </div>
              <div>
                <Label htmlFor="hireTerm">What is the average hire term?</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    {["Days", "Weeks", "Months", "Custom"].map((opt) => (
                      <SelectItem key={opt} value={opt.toLowerCase()}>
                        {opt}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="hireProcess">Outline your equipment hire process</Label>
                <Textarea id="hireProcess" placeholder="e.g., booking, dispatch, return, maintenance" />
              </div>
              <div>
                <Label htmlFor="trackingMaintenance">How do you track availability and maintenance?</Label>
                <Textarea id="trackingMaintenance" placeholder="e.g., software, manual logs, reminders" />
              </div>
              <div>
                <Label htmlFor="hireChallenges">Challenges in current hire management</Label>
                <Textarea id="hireChallenges" placeholder="e.g., scheduling conflicts, returns" />
              </div>
            </CardContent>
          </Card>
        )}

        {/* Projects Details */}
        {showProjects && (
          <Card>
            <CardHeader>
              <CardTitle>Projects</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Project Types</Label>
                <div className="grid grid-cols-2 gap-3 mt-2">
                  {["Installation", "Upgrade", "Inspection"].map((type) => (
                    <div key={type} className="flex items-center space-x-2">
                      <Checkbox id={type} />
                      <Label htmlFor={type}>{type}</Label>
                    </div>
                  ))}
                </div>
                <div className="mt-2">
                  <Label htmlFor="otherProject">Other</Label>
                  <Input id="otherProject" />
                </div>
              </div>
              <div>
                <Label htmlFor="projectDuration">Average Project Duration</Label>
                <Input id="projectDuration" placeholder="e.g., 2–4 weeks" />
              </div>
              {/* <div>
                <Label>Project Team Roles</Label>
                <div className="grid grid-cols-2 gap-3 mt-2">
                  {["Contract Manager", "Project Manager", "Service Delivery"].map((role) => (
                    <div key={role} className="flex items-center space-x-2">
                      <Checkbox id={role} />
                      <Label htmlFor={role}>{role}</Label>
                    </div>
                  ))}
                </div>
                <div className="mt-2">
                  <Label htmlFor="otherRole">Other</Label>
                  <Input id="otherRole" />
                </div>
              </div>
              <div>
                <Label htmlFor="projectWorkflow">Project Workflow Description</Label>
                <Textarea
                  id="projectWorkflow"
                  placeholder="e.g., planning, execution, handover"
                  className="min-h-[100px]"
                />
              </div> */}
            </CardContent>
          </Card>
        )}

        {/* Equipment Sales Details */}
        {showEquipmentSales && (
          <Card>
            <CardHeader>
              <CardTitle>Equipment Sales</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Sales Categories</Label>
                <div className="grid grid-cols-2 gap-3 mt-2">
                  {["New Equipment", "Refurbished", "Spare Parts"].map((category) => (
                    <div key={category} className="flex items-center space-x-2">
                      <Checkbox id={category} />
                      <Label htmlFor={category}>{category}</Label>
                    </div>
                  ))}
                </div>
                <div className="mt-2">
                  <Label htmlFor="otherSales">Other</Label>
                  <Input id="otherSales" />
                </div>
              </div>
              <div>
                <Label>Pricing Models</Label>
                <div className="grid grid-cols-2 gap-3 mt-2">
                  {["Fixed Price", "Tiered", "Contractual"].map((model) => (
                    <div key={model} className="flex items-center space-x-2">
                      <Checkbox id={model} />
                      <Label htmlFor={model}>{model}</Label>
                    </div>
                  ))}
                </div>
                <div className="mt-2">
                  <Label htmlFor="otherPricing">Other</Label>
                  <Input id="otherPricing" />
                </div>
              </div>
              <div>
                <Label htmlFor="fulfillmentWorkflow">Order Fulfillment Workflow</Label>
                <Textarea
                  id="fulfillmentWorkflow"
                  placeholder="e.g., pick & pack, delivery, invoicing"
                  className="min-h-[100px]"
                />
              </div>
            </CardContent>
          </Card>
        )}

      </div>
    </div>
  )
}
