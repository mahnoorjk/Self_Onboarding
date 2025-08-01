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
import { Building2, MapPin, Phone, Mail, Globe, Award, Users, CheckCircle, Upload } from "lucide-react"

export function AboutYourBusinessScreen() {
  const { data, updateData } = useOnboarding()
  const [formData, setFormData] = useState(data.companyDetails)

  // Pre-fill company data on mount
  useEffect(() => {
    // Pre-fill company overview data
    if (!data.companyOverview.businessType) {
      const prefilledOverviewData = {
        businessType: "Electrical Contractor",
        companySize: "3-8 employees",
        primaryServices: [
          "Electrical Installation",
          "Maintenance & Repairs",
          "Emergency Call-outs",
          "PAT Testing",
          "Electrical Inspections",
          "Commercial Wiring",
        ],
        yearsInBusiness: "6",
        targetMarkets: ["Commercial", "Industrial", "Residential"],
      }
      updateData("companyOverview", prefilledOverviewData)
    }

    // Pre-fill company details data with European defaults
    if (!data.companyDetails.companyName) {
      const prefilledDetailsData = {
        companyName: "ElectroTech Solutions Ltd",
        vatNumber: "GB123456789",
        registrationNumber: "",
        website: "www.electrotechsolutions.co.uk",
        businessAddress: "Unit 12, Industrial Estate, Manchester, M15 4FN, United Kingdom",
        phoneNumber: "+44 161 234 5678",
        contactEmail: "info@electrotechsolutions.co.uk",
        timezone: "Greenwich Mean Time (GMT)",
        currency: "GBP (£)",
        region: "UK",
        logo: null,
      }
      setFormData(prefilledDetailsData)
      updateData("companyDetails", prefilledDetailsData)
    } else {
      setFormData(data.companyDetails)
    }
  }, [])

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
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const newData = { ...formData, logo: file }
      setFormData(newData)
      updateData("companyDetails", newData)
    }
  }

  return (
    <div className="container mx-auto max-w-6xl">
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <div className="w-12 h-12 bg-teal-500 rounded-lg flex items-center justify-center">
            <Building2 className="h-6 w-6 text-white" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">About Your Business</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Let's get your business set up quickly. Just a few essential details and you'll be ready to start using JobLogic.
        </p>
      </div>

      {/* Simplified Essential Information Form */}
      <div className="max-w-2xl mx-auto space-y-6">
        
        {/* Essential Business Information */}
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
              <div className="relative">
                <Input
                  id="companyName"
                  value={formData.companyName}
                  onChange={(e) => handleInputChange("companyName", e.target.value)}
                  placeholder="Enter your company name"
                  className="bg-green-50 border-green-200"
                />
                <CheckCircle className="absolute right-3 top-3 h-4 w-4 text-green-500" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="businessAddress">Business Address *</Label>
              <div className="relative">
                <Input
                  id="businessAddress"
                  value={formData.businessAddress}
                  onChange={(e) => handleInputChange("businessAddress", e.target.value)}
                  placeholder="Your business address"
                  className="bg-green-50 border-green-200"
                />
                <CheckCircle className="absolute right-3 top-3 h-4 w-4 text-green-500" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phoneNumber">Phone Number *</Label>
                <div className="relative">
                  <Input
                    id="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                    placeholder="e.g., 020 7123 4567"
                    className="bg-green-50 border-green-200"
                  />
                  <CheckCircle className="absolute right-3 top-3 h-4 w-4 text-green-500" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="contactEmail">Email Address *</Label>
                <div className="relative">
                  <Input
                    id="contactEmail"
                    type="email"
                    value={formData.contactEmail}
                    onChange={(e) => handleInputChange("contactEmail", e.target.value)}
                    placeholder="your@email.co.uk"
                    className="bg-green-50 border-green-200"
                  />
                  <CheckCircle className="absolute right-3 top-3 h-4 w-4 text-green-500" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="vatNumber">
                  VAT Number 
                  <span className="text-sm text-gray-500 ml-1">(optional)</span>
                </Label>
                <div className="relative">
                  <Input
                    id="vatNumber"
                    value={formData.vatNumber}
                    onChange={(e) => handleInputChange("vatNumber", e.target.value)}
                    placeholder="GB123456789"
                    className="bg-green-50 border-green-200"
                  />
                  <CheckCircle className="absolute right-3 top-3 h-4 w-4 text-green-500" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="website">
                  Website 
                  <span className="text-sm text-gray-500 ml-1">(optional)</span>
                </Label>
                <div className="relative">
                  <Input
                    id="website"
                    value={formData.website}
                    onChange={(e) => handleInputChange("website", e.target.value)}
                    placeholder="www.yourcompany.co.uk"
                    className="bg-green-50 border-green-200"
                  />
                  <CheckCircle className="absolute right-3 top-3 h-4 w-4 text-green-500" />
                </div>
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
                <div className="relative">
                  <Select value={formData.timezone} onValueChange={(value) => handleInputChange("timezone", value)}>
                    <SelectTrigger className="bg-green-50 border-green-200">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Greenwich Mean Time (GMT)">Greenwich Mean Time (GMT) - UK/Ireland</SelectItem>
                      <SelectItem value="Central European Time (CET)">Central European Time (CET) - Most of EU</SelectItem>
                      <SelectItem value="Eastern European Time (EET)">Eastern European Time (EET) - Eastern EU</SelectItem>
                      <SelectItem value="Western European Time (WET)">Western European Time (WET) - Portugal</SelectItem>
                    </SelectContent>
                  </Select>
                  <CheckCircle className="absolute right-8 top-3 h-4 w-4 text-green-500" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="region">Region</Label>
                <div className="relative">
                  <Select value={formData.region} onValueChange={(value) => handleInputChange("region", value)}>
                    <SelectTrigger className="bg-green-50 border-green-200">
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
                  <CheckCircle className="absolute right-8 top-3 h-4 w-4 text-green-500" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Setup Notice */}
        <div className="bg-teal-50 border border-teal-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <CheckCircle className="h-5 w-5 text-teal-600 mt-0.5" />
            <div>
              <h3 className="text-sm font-medium text-teal-800">Pre-filled Information</h3>
              <p className="text-sm text-teal-700 mt-1">
                Fields with green backgrounds and checkmarks have been pre-filled based on information from your sales consultation. You can edit any details if needed. Regional settings are pre-configured but can be adjusted for your specific location and preferences.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
