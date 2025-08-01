"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useOnboarding } from "../onboarding-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { CheckCircle, Upload, Building2 } from "lucide-react"

export function CompanyDetailsScreen() {
  const { data, updateData } = useOnboarding()
  const [formData, setFormData] = useState(data.companyDetails)

  // Pre-fill company details on mount
  useEffect(() => {
    if (!data.companyDetails.companyName) {
      const prefilledData = {
        companyName: "ElectroTech Solutions Ltd",
        vatNumber: "GB123456789",
        registrationNumber: "12345678",
        website: "www.electrotechsolutions.co.uk",
        businessAddress: "Unit 12, Industrial Estate, Manchester, M15 4FN, United Kingdom",
        phoneNumber: "+44 161 234 5678",
        contactEmail: "info@electrotechsolutions.co.uk",
        timezone: "Greenwich Mean Time",
        currency: "GBP (£)",
        region: "UK",
        logo: null,
      }
      setFormData(prefilledData)
      updateData("companyDetails", prefilledData)
    } else {
      setFormData(data.companyDetails)
    }
  }, [])

  const handleInputChange = (field: string, value: string) => {
    const newData = { ...formData, [field]: value }
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
    <div className="container mx-auto max-w-4xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Company Details</h1>
        <p className="text-gray-600">
          Please review and update your company information. Fields marked with a green background have been pre-filled
          from our sales consultation.
        </p>
      </div>

      <div className="space-y-6">
        {/* Basic Company Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Building2 className="h-5 w-5 text-teal-500" />
              <span>Basic Information</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="companyName">Company Name *</Label>
                <div className="relative">
                  <Input
                    id="companyName"
                    value={formData.companyName}
                    onChange={(e) => handleInputChange("companyName", e.target.value)}
                    className="bg-green-50 border-green-200"
                  />
                  <CheckCircle className="absolute right-3 top-3 h-4 w-4 text-green-500" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="vatNumber">VAT Number</Label>
                <div className="relative">
                  <Input
                    id="vatNumber"
                    value={formData.vatNumber}
                    onChange={(e) => handleInputChange("vatNumber", e.target.value)}
                    className="bg-green-50 border-green-200"
                  />
                  <CheckCircle className="absolute right-3 top-3 h-4 w-4 text-green-500" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="registrationNumber">Company Registration Number</Label>
                <div className="relative">
                  <Input
                    id="registrationNumber"
                    value={formData.registrationNumber}
                    onChange={(e) => handleInputChange("registrationNumber", e.target.value)}
                    className="bg-green-50 border-green-200"
                  />
                  <CheckCircle className="absolute right-3 top-3 h-4 w-4 text-green-500" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="website">Website</Label>
                <div className="relative">
                  <Input
                    id="website"
                    value={formData.website}
                    onChange={(e) => handleInputChange("website", e.target.value)}
                    className="bg-green-50 border-green-200"
                  />
                  <CheckCircle className="absolute right-3 top-3 h-4 w-4 text-green-500" />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="businessAddress">Business Address *</Label>
              <div className="relative">
                <Input
                  id="businessAddress"
                  value={formData.businessAddress}
                  onChange={(e) => handleInputChange("businessAddress", e.target.value)}
                  className="bg-green-50 border-green-200"
                />
                <CheckCircle className="absolute right-3 top-3 h-4 w-4 text-green-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phoneNumber">Phone Number *</Label>
                <div className="relative">
                  <Input
                    id="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                    className="bg-green-50 border-green-200"
                  />
                  <CheckCircle className="absolute right-3 top-3 h-4 w-4 text-green-500" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="contactEmail">Contact Email *</Label>
                <div className="relative">
                  <Input
                    id="contactEmail"
                    type="email"
                    value={formData.contactEmail}
                    onChange={(e) => handleInputChange("contactEmail", e.target.value)}
                    className="bg-green-50 border-green-200"
                  />
                  <CheckCircle className="absolute right-3 top-3 h-4 w-4 text-green-500" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Regional Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Regional Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="timezone">Timezone</Label>
                <div className="relative">
                  <Select value={formData.timezone} onValueChange={(value) => handleInputChange("timezone", value)}>
                    <SelectTrigger className="bg-green-50 border-green-200">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Greenwich Mean Time">Greenwich Mean Time</SelectItem>
                      <SelectItem value="Central European Time">Central European Time</SelectItem>
                      <SelectItem value="Eastern Standard Time">Eastern Standard Time</SelectItem>
                    </SelectContent>
                  </Select>
                  <CheckCircle className="absolute right-8 top-3 h-4 w-4 text-green-500" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="currency">Currency</Label>
                <div className="relative">
                  <Select value={formData.currency} onValueChange={(value) => handleInputChange("currency", value)}>
                    <SelectTrigger className="bg-green-50 border-green-200">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="GBP (£)">GBP (£)</SelectItem>
                      <SelectItem value="EUR (€)">EUR (€)</SelectItem>
                      <SelectItem value="USD ($)">USD ($)</SelectItem>
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
                      <SelectItem value="UK">UK</SelectItem>
                      <SelectItem value="EU">EU</SelectItem>
                      <SelectItem value="US">US</SelectItem>
                      <SelectItem value="Canada">Canada</SelectItem>
                      <SelectItem value="Australia">Australia</SelectItem>
                    </SelectContent>
                  </Select>
                  <CheckCircle className="absolute right-8 top-3 h-4 w-4 text-green-500" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Company Logo */}
        <Card>
          <CardHeader>
            <CardTitle>Company Logo</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <div className="mt-4">
                  <Label htmlFor="logo-upload" className="cursor-pointer">
                    <span className="mt-2 block text-sm font-medium text-gray-900">Upload your company logo</span>
                    <span className="mt-1 block text-sm text-gray-500">PNG, JPG, GIF up to 10MB</span>
                  </Label>
                  <Input id="logo-upload" type="file" className="hidden" accept="image/*" onChange={handleFileUpload} />
                </div>
                <Button
                  variant="outline"
                  className="mt-4 bg-transparent"
                  onClick={() => document.getElementById("logo-upload")?.click()}
                >
                  Choose File
                </Button>
              </div>
              {formData.logo && <p className="text-sm text-green-600">✓ Logo uploaded: {formData.logo.name}</p>}
            </div>
          </CardContent>
        </Card>

        {/* Information Notice */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5" />
            <div>
              <h3 className="text-sm font-medium text-blue-800">Pre-filled Information</h3>
              <p className="text-sm text-blue-700 mt-1">
                Fields with green backgrounds and checkmarks have been pre-filled based on information gathered during
                your sales consultation. You can modify any of these details if needed.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
