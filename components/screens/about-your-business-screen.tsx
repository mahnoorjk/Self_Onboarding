"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useOnboarding } from "../onboarding-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Building2, MapPin, Phone, Mail, Globe, Award, Users, Upload, AlertCircle, CheckCircle } from "lucide-react"

export function AboutYourBusinessScreen() {
  const { data, updateData } = useOnboarding()
  const [formData, setFormData] = useState(data.companyDetails)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})

  // Initialize form data on mount
  useEffect(() => {
    setFormData(data.companyDetails)
  }, [])

  // Validation functions
  const validateField = (field: string, value: string): string => {
    switch (field) {
      case 'companyName':
        return value.trim() === '' ? 'Company name is required' : ''
      case 'businessAddress':
        return value.trim() === '' ? 'Business address is required' : ''
      case 'phoneNumber':
        return value.trim() === '' ? 'Phone number is required' : ''
      case 'contactEmail':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (value.trim() === '') return 'Email address is required'
        if (!emailRegex.test(value)) return 'Please enter a valid email address'
        return ''
      default:
        return ''
    }
  }

  const validateForm = (): boolean => {
    const requiredFields = ['companyName', 'businessAddress', 'phoneNumber', 'contactEmail']
    const newErrors: Record<string, string> = {}
    
    requiredFields.forEach(field => {
      const value = formData[field as keyof typeof formData]
      const stringValue = typeof value === 'string' ? value : ''
      const error = validateField(field, stringValue)
      if (error) {
        newErrors[field] = error
      }
    })
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (field: string, value: string) => {
    const newData = { ...formData, [field]: value }
    
    // Auto-adjust timezone and currency based on region selection
    if (field === "region") {
      switch (value) {
        case "UK":
          newData.timezone = "Greenwich Mean Time (GMT)"
          newData.currency = "GBP (£)"
          break
        case "Ireland":
          newData.timezone = "Greenwich Mean Time (GMT)"
          newData.currency = "EUR (€)"
          break
        case "France":
        case "Germany":
        case "Netherlands":
        case "Belgium":
        case "Spain":
        case "Italy":
        case "Austria":
          newData.timezone = "Central European Time (CET)"
          newData.currency = "EUR (€)"
          break
        case "Switzerland":
          newData.timezone = "Central European Time (CET)"
          newData.currency = "CHF"
          break
        case "Denmark":
          newData.timezone = "Central European Time (CET)"
          newData.currency = "DKK"
          break
        case "Sweden":
          newData.timezone = "Central European Time (CET)"
          newData.currency = "SEK"
          break
        case "Norway":
          newData.timezone = "Central European Time (CET)"
          newData.currency = "NOK"
          break
        case "Portugal":
          newData.timezone = "Western European Time (WET)"
          newData.currency = "EUR (€)"
          break
        case "Finland":
          newData.timezone = "Eastern European Time (EET)"
          newData.currency = "EUR (€)"
          break
        default:
          newData.timezone = "Central European Time (CET)"
          newData.currency = "EUR (€)"
      }
    }
    
    setFormData(newData)
    updateData("companyDetails", newData)
    
    // Clear error for this field if it was previously invalid
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const handleBlur = (field: string, value: string) => {
    setTouched(prev => ({ ...prev, [field]: true }))
    const error = validateField(field, value)
    setErrors(prev => ({ ...prev, [field]: error }))
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const newData = { ...formData, logo: file }
      setFormData(newData)
      updateData("companyDetails", newData)
    }
  }

  const isFormComplete = (): boolean => {
    const requiredFields = ['companyName', 'businessAddress', 'phoneNumber', 'contactEmail']
    return requiredFields.every(field => {
      const value = formData[field as keyof typeof formData]
      const stringValue = typeof value === 'string' ? value : ''
      return stringValue.trim() !== '' && validateField(field, stringValue) === ''
    })
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Enhanced Professional Header */}
      <div className="text-center space-y-4 bg-gradient-to-r from-teal-50 to-blue-50 rounded-xl border border-teal-200 p-8">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <div className="w-12 h-12 bg-teal-500 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-xl">1</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Tell Us About You</h1>
        </div>
        <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
          Let's get your business set up quickly. Please fill in your essential business details
          and you'll be ready to start using Joblogic with your team.
        </p>
        <div className="flex items-center justify-center space-x-2 text-sm text-teal-700 bg-teal-100 rounded-full px-4 py-2 inline-flex">
          <span className="w-2 h-2 bg-teal-500 rounded-full"></span>
          <span>This sets up your company profile and regional settings</span>
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
                  <p className="text-sm text-blue-700">Please fill in all required fields marked with an asterisk (*) to continue.</p>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Essential Business Information */}
        {/* <div className="max-w-2xl mx-auto"> */}
        <div className="max-w-6xl mx-auto px-0">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Building2 className="h-5 w-5 text-teal-500" />
              <span>Business Details</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="companyName">Company Name *</Label>
              <Input
                id="companyName"
                value={formData.companyName}
                onChange={(e) => handleInputChange("companyName", e.target.value)}
                onBlur={(e) => handleBlur("companyName", e.target.value)}
                placeholder="Enter your company name"
                className={errors.companyName && touched.companyName ? "border-red-500" : ""}
              />
              {errors.companyName && touched.companyName && (
                <p className="text-sm text-red-500">{errors.companyName}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="businessAddress">Business Address *</Label>
              <Input
                id="businessAddress"
                value={formData.businessAddress}
                onChange={(e) => handleInputChange("businessAddress", e.target.value)}
                onBlur={(e) => handleBlur("businessAddress", e.target.value)}
                placeholder="Your business address"
                className={errors.businessAddress && touched.businessAddress ? "border-red-500" : ""}
              />
              {errors.businessAddress && touched.businessAddress && (
                <p className="text-sm text-red-500">{errors.businessAddress}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phoneNumber">Phone Number *</Label>
                <Input
                  id="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                  onBlur={(e) => handleBlur("phoneNumber", e.target.value)}
                  placeholder="e.g., 020 7123 4567"
                  className={errors.phoneNumber && touched.phoneNumber ? "border-red-500" : ""}
                />
                {errors.phoneNumber && touched.phoneNumber && (
                  <p className="text-sm text-red-500">{errors.phoneNumber}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="contactEmail">Email Address *</Label>
                <Input
                  id="contactEmail"
                  type="email"
                  value={formData.contactEmail}
                  onChange={(e) => handleInputChange("contactEmail", e.target.value)}
                  onBlur={(e) => handleBlur("contactEmail", e.target.value)}
                  placeholder="your@email.co.uk"
                  className={errors.contactEmail && touched.contactEmail ? "border-red-500" : ""}
                />
                {errors.contactEmail && touched.contactEmail && (
                  <p className="text-sm text-red-500">{errors.contactEmail}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="vatNumber">
                  VAT Number 
                  <span className="text-sm text-gray-500 ml-1">(optional)</span>
                </Label>
                <Input
                  id="vatNumber"
                  value={formData.vatNumber}
                  onChange={(e) => handleInputChange("vatNumber", e.target.value)}
                  placeholder="GB123456789"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="website">
                  Website 
                  <span className="text-sm text-gray-500 ml-1">(optional)</span>
                </Label>
                <Input
                  id="website"
                  value={formData.website}
                  onChange={(e) => handleInputChange("website", e.target.value)}
                  placeholder="www.yourcompany.co.uk"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Regional Settings for European Users */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Globe className="h-5 w-5 text-teal-500" />
              <span>Regional Settings</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="timezone">Timezone</Label>
                <Select value={formData.timezone} onValueChange={(value) => handleInputChange("timezone", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Greenwich Mean Time (GMT)">Greenwich Mean Time (GMT) - UK/Ireland</SelectItem>
                    <SelectItem value="Central European Time (CET)">Central European Time (CET) - Most of EU</SelectItem>
                    <SelectItem value="Eastern European Time (EET)">Eastern European Time (EET) - Eastern EU</SelectItem>
                    <SelectItem value="Western European Time (WET)">Western European Time (WET) - Portugal</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="region">Region</Label>
                <Select value={formData.region} onValueChange={(value) => handleInputChange("region", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="UK">United Kingdom</SelectItem>
                    <SelectItem value="Ireland">Ireland</SelectItem>
                    <SelectItem value="France">France</SelectItem>
                    <SelectItem value="Germany">Germany</SelectItem>
                    <SelectItem value="Netherlands">Netherlands</SelectItem>
                    <SelectItem value="Belgium">Belgium</SelectItem>
                    <SelectItem value="Spain">Spain</SelectItem>
                    <SelectItem value="Italy">Italy</SelectItem>
                    <SelectItem value="Portugal">Portugal</SelectItem>
                    <SelectItem value="Austria">Austria</SelectItem>
                    <SelectItem value="Switzerland">Switzerland</SelectItem>
                    <SelectItem value="Denmark">Denmark</SelectItem>
                    <SelectItem value="Sweden">Sweden</SelectItem>
                    <SelectItem value="Norway">Norway</SelectItem>
                    <SelectItem value="Finland">Finland</SelectItem>
                    <SelectItem value="Other EU">Other EU Country</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Setup Notice */}
        {/* <div className="bg-teal-50 border border-teal-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <CheckCircle className="h-5 w-5 text-teal-600 mt-0.5" />
            <div>
              <h3 className="text-sm font-medium text-teal-800">Pre-filled Information</h3>
              <p className="text-sm text-teal-700 mt-1">
                Fields with green backgrounds and checkmarks are auto-filled from public data. All details and regional settings can be edited to match your location and preferences.
              </p>
            </div>
          </div>
        </div> */}
        </div>
      </div>
    </div>
  )
}
