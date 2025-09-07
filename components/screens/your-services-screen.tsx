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
import { Eye, ChevronDown, ChevronUp, ExternalLink, Zap, Target, CheckCircle2, ArrowRight, BarChart3, AlertCircle, CheckCircle } from "lucide-react"
import { useOnboarding } from '@/components/onboarding-context'
import { useState, useEffect } from 'react'

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
  "Your Current Workload"
]

const workTypes = ["Contracts", "Ad-Hoc Work", "Projects"]

export default function BusinessOperationsSetupScreen() {
  const { updateData, data } = useOnboarding()
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>(
    data.industryConfiguration.selectedIndustries || []
  )
  const [otherIndustry, setOtherIndustry] = useState<string>(
    data.industryConfiguration.customIndustry || ""
  )
  const [selectedWorkTypes, setSelectedWorkTypes] = useState<string[]>(
    data.businessInformation.workTypes || []
  )
  const [contractTypes, setContractTypes] = useState<string[]>([])
  const [jobEntryMethods, setJobEntryMethods] = useState<string[]>([])
  const [otherJobEntryMethod, setOtherJobEntryMethod] = useState<string>("")
  // Business information state
  const [formData, setFormData] = useState(data.businessInformation)
  // Validation state
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})

  // Sync formData when data changes
  useEffect(() => {
    setFormData(data.businessInformation)
  }, [data.businessInformation])

  // Validation functions
  const validateField = (field: string, value: string): string => {
    switch (field) {
      case 'primaryIndustry':
        return value === '' ? 'Please select your primary industry' : ''
      case 'numberOfCustomers':
        if (value.trim() === '') return 'Number of active customers is required'
        if (isNaN(Number(value)) || Number(value) <= 0) return 'Please enter a valid number'
        return ''
      case 'numberOfEngineers':
        if (value.trim() === '') return 'Number of engineers/technicians is required'
        if (isNaN(Number(value)) || Number(value) <= 0) return 'Please enter a valid number'
        return ''
      case 'numberOfJobs':
        if (value.trim() === '') return 'Average jobs per month is required'
        if (isNaN(Number(value)) || Number(value) <= 0) return 'Please enter a valid number'
        return ''
      case 'otherIndustry':
        return selectedIndustries.includes("Other") && value.trim() === '' ? 'Please specify your industry' : ''
      default:
        return ''
    }
  }

  const validateForm = (): boolean => {
    // Validate primary industry
    const primaryIndustry = selectedIndustries[0] || ''
    if (!primaryIndustry) return false
    
    // Validate other industry if "Other" is selected
    if (selectedIndustries.includes("Other") && !otherIndustry.trim()) return false
    
    // Validate business volumes
    const requiredBusinessFields = ['numberOfCustomers', 'numberOfEngineers', 'numberOfJobs']
    for (const field of requiredBusinessFields) {
      const value = formData.businessVolumes?.[field as keyof typeof formData.businessVolumes] || ''
      if (!value || isNaN(Number(value)) || Number(value) <= 0) return false
    }
    
    return true
  }

  const isFormComplete = (): boolean => {
    return validateForm()
  }

  const handleBlur = (field: string, value: string) => {
    setTouched(prev => ({ ...prev, [field]: true }))
    const error = validateField(field, value)
    setErrors(prev => ({ ...prev, [field]: error }))
  }
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
  const [showFormsDetails, setShowFormsDetails] = useState(false)
  const [showDashboardsDetails, setShowDashboardsDetails] = useState(false)

  const handleIndustryChange = (industry: string) => {
    const updated = [industry] // Single selection for dropdown
    
    setSelectedIndustries(updated)
    setTouched(prev => ({ ...prev, primaryIndustry: true }))
    
    // Clear industry error when selection is made
    if (errors.primaryIndustry) {
      setErrors(prev => ({ ...prev, primaryIndustry: '' }))
    }
    
    // Validate immediately when industry is selected
    const industryError = validateField('primaryIndustry', industry)
    if (industryError) {
      setErrors(prev => ({ ...prev, primaryIndustry: industryError }))
    }
    
    // If Electrical Maintenance is selected, initialize forms and dashboards to all items
    if (industry === "Electrical Maintenance") {
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

  const handleOtherIndustryChange = (value: string) => {
    setOtherIndustry(value)
    updateData('industryConfiguration', { 
      ...data.industryConfiguration,
      customIndustry: value 
    })
    
    // Clear error for this field if it was previously invalid
    if (errors.otherIndustry) {
      setErrors(prev => ({ ...prev, otherIndustry: '' }))
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

  const handleJobEntryMethodChange = (method: string, checked: boolean) => {
    const updated = checked
      ? [...jobEntryMethods, method]
      : jobEntryMethods.filter(m => m !== method)
    
    setJobEntryMethods(updated)
  }

  const handleOtherJobEntryMethodChange = (value: string) => {
    setOtherJobEntryMethod(value)
  }

  // Business information handlers
  const handleBusinessVolumeChange = (field: string, value: string) => {
    const newData = {
      ...formData,
      businessVolumes: {
        ...formData.businessVolumes,
        [field]: value,
      },
    }
    setFormData(newData)
    updateData("businessInformation", newData)
    
    // Clear error for this field if it was previously invalid
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
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
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Enhanced Professional Header */}
      <div className="text-center space-y-4 bg-gradient-to-r from-teal-50 to-blue-50 rounded-xl border border-teal-200 p-8">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <div className="w-12 h-12 bg-teal-500 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-xl">2</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Set Up Your Business</h1>
        </div>
        <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
          Help us understand your business, industry, and operations so we can customise Joblogic 
          with the right features and forms for your needs.
        </p>
        <div className="flex items-center justify-center space-x-2 text-sm text-teal-700 bg-teal-100 rounded-full px-4 py-2 inline-flex">
          <span className="w-2 h-2 bg-teal-500 rounded-full"></span>
          <span>This will set up industry-specific features</span>
        </div>
      </div>

      <div className="space-y-8">
        {/* Validation Status Indicator */}
        <div className={`p-4 rounded-lg border ${
          isFormComplete() 
            ? 'bg-green-50 border-green-200' 
            : Object.keys(errors).some(key => errors[key] && touched[key])
              ? 'bg-red-50 border-red-200'
              : 'bg-blue-50 border-blue-200'
        }`}>
          <div className="flex items-center gap-3">
            {isFormComplete() ? (
              <>
                <CheckCircle className="w-5 h-5 text-green-600" />
                <div>
                  <h3 className="font-medium text-green-800">All Required Information Complete</h3>
                  <p className="text-sm text-green-700">You can proceed to the next step.</p>
                </div>
              </>
            ) : Object.keys(errors).some(key => errors[key] && touched[key]) ? (
              <>
                <AlertCircle className="w-5 h-5 text-red-600" />
                <div>
                  <h3 className="font-medium text-red-800">Please Complete Required Fields</h3>
                  <p className="text-sm text-red-700">Some required fields need your attention before you can continue.</p>
                </div>
              </>
            ) : (
              <>
                <AlertCircle className="w-5 h-5 text-blue-600" />
                <div>
                  <h3 className="font-medium text-blue-800">Required Information Needed</h3>
                  <p className="text-sm text-blue-700">Please complete all required fields marked with an asterisk (*) to continue.</p>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Enhanced Industry Selection */}
        <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300">
          <CardHeader className="bg-gray-50 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-blue-600 font-semibold">1</span>
              </div>
              <div>
                <CardTitle className="text-xl text-gray-900">Select Your Industry</CardTitle>
                <p className="text-sm text-gray-600 mt-1">Choose your primary industry to customise Joblogic for your business</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="max-w-md">
                <Label htmlFor="industry-select" className="text-sm font-semibold text-gray-700 mb-2 block">
                  Choose your primary industry: *
                </Label>
                <Select 
                  value={selectedIndustries[0] || ""} 
                  onValueChange={handleIndustryChange}
                >
                  <SelectTrigger className={`w-full focus:border-teal-500 focus:ring-teal-500 ${
                    errors.primaryIndustry && touched.primaryIndustry ? 'border-red-500' : 'border-gray-300'
                  }`}>
                    <SelectValue placeholder="Select an industry..." />
                  </SelectTrigger>
                  <SelectContent>
                    {industries.map((industry) => (
                      <SelectItem key={industry} value={industry}>
                        {industry}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.primaryIndustry && touched.primaryIndustry && (
                  <p className="text-sm text-red-500 mt-1">{errors.primaryIndustry}</p>
                )}
              </div>
              
              {selectedIndustries[0] && (
                <div className="p-4 bg-teal-50 rounded-lg border border-teal-200">
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-5 h-5 text-teal-600" />
                    <span className="font-medium text-teal-800">Selected: {selectedIndustries[0]}</span>
                  </div>
                </div>
              )}
            </div>
            {selectedIndustries.includes("Other") && (
              <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <Label htmlFor="otherIndustryInput" className="text-sm font-semibold text-gray-700 mb-2 block">
                  Please specify your industry: *
                </Label>
                <Input
                  id="otherIndustryInput"
                  value={otherIndustry}
                  onChange={(e) => handleOtherIndustryChange(e.target.value)}
                  onBlur={(e) => handleBlur("otherIndustry", e.target.value)}
                  placeholder="e.g., Custom manufacturing, Marine services, Specialized consulting..."
                  className={`focus:border-teal-500 focus:ring-teal-500 ${
                    errors.otherIndustry && touched.otherIndustry ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.otherIndustry && touched.otherIndustry && (
                  <p className="text-sm text-red-500 mt-1">{errors.otherIndustry}</p>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Enhanced Selected Industries Display */}
        {/* {selectedIndustries.length > 0 && (
          <div className="bg-gradient-to-r from-green-50 to-teal-50 border border-green-200 rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-green-900">
                  Great! You've selected {selectedIndustries.length} {selectedIndustries.length === 1 ? 'industry' : 'industries'}
                </h3>
                <p className="text-sm text-green-700">JobLogic will be configured with relevant features for these industries</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              {selectedIndustries.map((industry) => (
                <div key={industry} className="flex items-center gap-2 bg-white border border-green-300 rounded-lg px-4 py-2 shadow-sm">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <span className="font-medium text-green-800">{industry}</span>
                </div>
              ))}
            </div>
          </div>
        )} */}

        {/* Enhanced Electrical Maintenance Forms */}
        {/* {selectedIndustries.includes("Electrical Maintenance") && (
          <Card className="border border-gray-200">
            <CardHeader>
              <CardTitle className="text-lg">Electrical Maintenance Forms Package</CardTitle>
              <p className="text-sm text-gray-600">22 professional, regulation-compliant forms automatically added</p>
            </CardHeader>
            <CardContent>
              <div className="border border-gray-200 rounded p-4 bg-gray-50">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 mb-1">22 Professional Forms Included</h4>
                    <p className="text-sm text-gray-600 mb-3">
                      Industry-standard forms that comply with current regulations. All forms are pre-configured and ready to use in your workflows.
                    </p>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setShowFormsDetails(!showFormsDetails)}
                      >
                        {showFormsDetails ? <ChevronUp className="w-4 h-4 mr-1" /> : <ChevronDown className="w-4 h-4 mr-1" />}
                        {showFormsDetails ? 'Hide' : 'View'} Complete Forms List
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              
              {showFormsDetails && (
                <div className="mt-4 max-h-60 overflow-y-auto border rounded p-3 bg-white">
                  <p className="text-sm text-gray-600 mb-3">All forms are pre-selected. Uncheck any you don't need:</p>
                  {electricalMaintenanceForms.map((form) => (
                    <div key={form} className="flex items-center justify-between space-x-2 p-2 hover:bg-gray-50 rounded">
                      <div className="flex items-center space-x-2 flex-1">
                        <Checkbox 
                          id={`form-${form}`} 
                          checked={selectedForms.includes(form)}
                          onCheckedChange={(checked) => handleFormChange(form, checked as boolean)}
                        />
                        <Label htmlFor={`form-${form}`} className="text-sm cursor-pointer flex-1">{form}</Label>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handlePreview('form', form)}
                        className="px-2 py-1 h-auto text-xs"
                      >
                        <Eye className="w-3 h-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        )} */}

        {/* Electrical Maintenance Dashboards */}
        {/* {selectedIndustries.includes("Electrical Maintenance") && (
          <Card className="border border-gray-200">
            <CardHeader>
              <CardTitle className="text-lg">Dashboard Package</CardTitle>
              <p className="text-sm text-gray-600">5 business intelligence dashboards ready to use</p>
            </CardHeader>
            <CardContent>
              <div className="border border-gray-200 rounded p-4 bg-gray-50">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 mb-1">5 Smart Dashboard Views</h4>
                    <p className="text-sm text-gray-600 mb-3">
                      Track compliance, monitor performance, and manage workflow.
                    </p>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setShowDashboardsDetails(!showDashboardsDetails)}
                      >
                        {showDashboardsDetails ? <ChevronUp className="w-4 h-4 mr-1" /> : <ChevronDown className="w-4 h-4 mr-1" />}
                        {showDashboardsDetails ? 'Hide' : 'View'} Dashboards
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              
              {showDashboardsDetails && (
                <div className="mt-4 max-h-60 overflow-y-auto border rounded p-3 bg-white">
                  <p className="text-sm text-gray-600 mb-3">All dashboards are pre-selected. Uncheck any you don't need:</p>
                  {electricalMaintenanceDashboards.map((dashboard) => (
                    <div key={dashboard} className="flex items-center justify-between space-x-2 p-2 hover:bg-gray-50 rounded">
                      <div className="flex items-center space-x-2 flex-1">
                        <Checkbox 
                          id={`dashboard-${dashboard}`} 
                          checked={selectedDashboards.includes(dashboard)}
                          onCheckedChange={(checked) => handleDashboardChange(dashboard, checked as boolean)}
                        />
                        <Label htmlFor={`dashboard-${dashboard}`} className="text-sm cursor-pointer flex-1">{dashboard}</Label>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handlePreview('dashboard', dashboard)}
                        className="px-2 py-1 h-auto text-xs"
                      >
                        <Eye className="w-3 h-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        )} */}

        {/* Your Usual Workload Section */}
        <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300">
          <CardHeader className="bg-gradient-to-r from-gray-50 to-blue-50 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center">
                <span className="text-teal-600 font-semibold">2</span>
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
                    value={formData.businessVolumes?.numberOfCustomers || ''}
                    onChange={(e) => handleBusinessVolumeChange("numberOfCustomers", e.target.value)}
                    onBlur={(e) => handleBlur("numberOfCustomers", e.target.value)}
                    placeholder="e.g., 150"
                    className={`focus:border-teal-500 focus:ring-teal-500 pl-4 ${
                      errors.numberOfCustomers && touched.numberOfCustomers ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                    <span className="text-gray-400 text-sm">customers</span>
                  </div>
                </div>
                {errors.numberOfCustomers && touched.numberOfCustomers && (
                  <p className="text-sm text-red-500">{errors.numberOfCustomers}</p>
                )}
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
                    value={formData.businessVolumes?.numberOfEngineers || ''}
                    onChange={(e) => handleBusinessVolumeChange("numberOfEngineers", e.target.value)}
                    onBlur={(e) => handleBlur("numberOfEngineers", e.target.value)}
                    placeholder="e.g., 12"
                    className={`focus:border-teal-500 focus:ring-teal-500 pl-4 ${
                      errors.numberOfEngineers && touched.numberOfEngineers ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                    <span className="text-gray-400 text-sm">staff</span>
                  </div>
                </div>
                {errors.numberOfEngineers && touched.numberOfEngineers && (
                  <p className="text-sm text-red-500">{errors.numberOfEngineers}</p>
                )}
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
                    value={formData.businessVolumes?.numberOfJobs || ''}
                    onChange={(e) => handleBusinessVolumeChange("numberOfJobs", e.target.value)}
                    onBlur={(e) => handleBlur("numberOfJobs", e.target.value)}
                    placeholder="e.g., 200"
                    className={`focus:border-teal-500 focus:ring-teal-500 pl-4 ${
                      errors.numberOfJobs && touched.numberOfJobs ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                    <span className="text-gray-400 text-sm">jobs/month</span>
                  </div>
                </div>
                {errors.numberOfJobs && touched.numberOfJobs && (
                  <p className="text-sm text-red-500">{errors.numberOfJobs}</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* How You Work Section */}
        {/* <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300">
          <CardHeader className="bg-gradient-to-r from-gray-50 to-blue-50 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center">
                <span className="text-teal-600 font-semibold">3</span>
              </div>
              <div>
                <CardTitle className="text-xl text-gray-900">How You Work</CardTitle>
                <p className="text-sm text-gray-600 mt-1">Tell us about your workflow and job entry methods</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <Label className="text-sm font-semibold text-gray-700 mb-4 block">How do jobs typically enter your system?</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
                <div key={method} className={`relative flex items-center space-x-3 p-4 rounded-lg border-2 transition-all duration-200 cursor-pointer hover:scale-102 ${
                  jobEntryMethods.includes(method)
                    ? 'border-teal-500 bg-teal-50 shadow-md'
                    : 'border-gray-200 hover:border-teal-300 hover:bg-teal-25'
                }`}
                onClick={() => handleJobEntryMethodChange(method, !jobEntryMethods.includes(method))}
                >
                  <Checkbox
                    id={method}
                    checked={jobEntryMethods.includes(method)}
                    onCheckedChange={(checked) => handleJobEntryMethodChange(method, checked as boolean)}
                    className="data-[state=checked]:bg-teal-500 data-[state=checked]:border-teal-500"
                  />
                  <Label htmlFor={method} className="cursor-pointer text-sm">{method}</Label>
                </div>
              ))}
            </div>
            {jobEntryMethods.includes("Other") && (
              <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <Label htmlFor="otherJobEntryInput" className="text-sm font-semibold text-gray-700 mb-2 block">
                  Please specify other method:
                </Label>
                <Input
                  id="otherJobEntryInput"
                  value={otherJobEntryMethod}
                  onChange={(e) => handleOtherJobEntryMethodChange(e.target.value)}
                  placeholder="Enter other job entry method"
                  className="border-gray-300 focus:border-teal-500 focus:ring-teal-500"
                />
              </div>
            )}
          </CardContent>
        </Card> */}
          {/* <Card className="border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-cyan-50">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-bold text-xl">📊</span>
                </div>
                <div>
                  <CardTitle className="text-xl text-blue-800">Smart Dashboards Ready!</CardTitle>
                  <p className="text-sm text-blue-700 mt-1">5 intelligent dashboard views to track your business</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="bg-white border border-blue-200 rounded-lg p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-blue-600 font-bold text-xl">�</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-blue-800 mb-2 text-lg">5 Smart Dashboard Views</h4>
                    <p className="text-blue-700 mb-4 leading-relaxed">
                      Track compliance, monitor performance, and manage workflow with pre-built intelligent dashboards. 
                      Perfect for staying on top of your business metrics!
                    </p>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setShowDashboardsDetails(!showDashboardsDetails)}
                      >
                        {showDashboardsDetails ? <ChevronUp className="w-4 h-4 mr-1" /> : <ChevronDown className="w-4 h-4 mr-1" />}
                        {showDashboardsDetails ? 'Hide' : 'See'} All Dashboards
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              
              {showDashboardsDetails && (
                <div className="mt-4 max-h-60 overflow-y-auto border rounded p-3 bg-white">
                  <p className="text-sm text-gray-600 mb-3">All dashboards are pre-selected. Uncheck any you don't need:</p>
                  {electricalMaintenanceDashboards.map((dashboard) => (
                    <div key={dashboard} className="flex items-center justify-between space-x-2 p-2 hover:bg-gray-50 rounded">
                      <div className="flex items-center space-x-2 flex-1">
                        <Checkbox 
                          id={`dashboard-${dashboard}`} 
                          checked={selectedDashboards.includes(dashboard)}
                          onCheckedChange={(checked) => handleDashboardChange(dashboard, checked as boolean)}
                        />
                        <Label htmlFor={`dashboard-${dashboard}`} className="text-sm cursor-pointer flex-1">{dashboard}</Label>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handlePreview('dashboard', dashboard)}
                        className="px-2 py-1 h-auto text-xs"
                      >
                        <Eye className="w-3 h-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card> */}

        {/* Work Types Selection */}
        {/* <Card>
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
        </Card> */}

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

        {/* How You Work
        <Card>
          <CardHeader>
            <CardTitle>How You Work</CardTitle>
          </CardHeader>
          <CardContent>
            <Label>How do jobs typically enter your system?</Label>
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
          </CardContent>
        </Card> */}

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
              {/* <div>
                <Label>Generate Quotes?</Label>
                <RadioGroup className="mt-2">
                  {["Yes", "No"].map((opt) => (
                    <div key={opt} className="flex items-center space-x-2">
                      <RadioGroupItem value={opt.toLowerCase()} id={`quote-${opt.toLowerCase()}`} />
                      <Label htmlFor={`quote-${opt.toLowerCase()}`}>{opt}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div> */}
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
              {/* <div>
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
              </div> */}
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

        {/* Next Steps Call-to-Action */}
        {/* {selectedIndustries.length > 0 && (
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Setup Complete</h3>
            <p className="text-gray-600 mb-4">
              Your workspace is configured. Continue to the next step to tell us how you work.
            </p>
            <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
              <CheckCircle2 className="w-4 h-4 text-green-600" />
              <span>Industry selected</span>
              {selectedIndustries.includes("Electrical Maintenance") && (
                <>
                  <span className="mx-2">•</span>
                  <span>Forms & dashboards added</span>
                </>
              )}
            </div>
          </div>
        )} */}

      </div>
    </div>
  )
}
