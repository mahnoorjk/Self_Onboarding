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

  const handleIndustryChange = (industry: string, checked: boolean) => {
    const updated = checked 
      ? [...selectedIndustries, industry]
      : selectedIndustries.filter(i => i !== industry)
    
    setSelectedIndustries(updated)
    updateData('industryConfiguration', { 
      ...data.industryConfiguration,
      selectedIndustries: updated 
    })
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

        {/* Electrical Maintenance Forms and Dashboards */}
        {selectedIndustries.includes("Electrical Maintenance") && (
          <Card>
            <CardHeader>
              <CardTitle>Electrical Maintenance - Forms and Dashboards</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Would you like us to set up the below standard forms for you now? (You can always create your own later)</Label>
                <div className="grid grid-cols-1 gap-3 mt-2">
                  {electricalMaintenanceForms.map((form) => (
                    <div key={form} className="flex items-center space-x-2">
                      <Checkbox id={`form-${form}`} />
                      <Label htmlFor={`form-${form}`} className="text-sm">{form}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6">
                <Label>Would you like us to set up the below standard dashboard views for you now? (You can always create your own later)</Label>
                <div className="grid grid-cols-1 gap-3 mt-2">
                  {electricalMaintenanceDashboards.map((dashboard) => (
                    <div key={dashboard} className="flex items-center space-x-2">
                      <Checkbox id={`dashboard-${dashboard}`} />
                      <Label htmlFor={`dashboard-${dashboard}`} className="text-sm">{dashboard}</Label>
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
