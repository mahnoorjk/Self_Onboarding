"use client"

import { useEffect } from "react"
import { useOnboarding } from "../onboarding-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Building2, MapPin, Phone, Mail, Globe, Award, Users, CheckCircle } from "lucide-react"

export function CompanyOverviewScreen() {
  const { data, updateData } = useOnboarding()

  // Pre-fill company overview data on mount - only run once
  useEffect(() => {
    // Only update if the data is empty to prevent infinite loops
    if (!data.companyOverview.businessType) {
      const prefilledData = {
        businessType: "Electrical Contractor",
        companySize: "25-50 employees",
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
      updateData("companyOverview", prefilledData)
    }
  }, []) // Empty dependency array - only run once on mount

  return (
    <div className="container mx-auto max-w-6xl">
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <div className="w-12 h-12 bg-teal-500 rounded-lg flex items-center justify-center">
            <Building2 className="h-6 w-6 text-white" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Welcome to JobLogic</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          We've gathered some information about your company to help streamline your onboarding process. Please review
          the details below and we'll help you customize JobLogic for your business.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Company Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Building2 className="h-5 w-5 text-teal-500" />
              <span>Company Overview</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">ElectroTech Solutions Ltd</h3>
              <p className="text-sm text-gray-600">Electrical Maintenance & Installation</p>
            </div>

            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <div className="flex items-center space-x-1">
                <Building2 className="h-4 w-4" />
                <span>Founded 2018</span>
              </div>
              <div className="flex items-center space-x-1">
                <Users className="h-4 w-4" />
                <span>25-50 employees</span>
              </div>
            </div>

            <p className="text-sm text-gray-700">
              ElectroTech Solutions Ltd is a leading electrical maintenance and installation company serving the Greater
              Manchester area. Specializing in commercial and industrial electrical services, emergency repairs, and
              compliance testing.
            </p>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Phone className="h-5 w-5 text-teal-500" />
              <span>Contact Information</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-start space-x-2">
              <MapPin className="h-4 w-4 text-gray-500 mt-0.5" />
              <div>
                <p className="text-sm font-medium">Business Address</p>
                <p className="text-sm text-gray-600">Unit 12, Industrial Estate, Manchester, M15 4FN, United Kingdom</p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Phone className="h-4 w-4 text-gray-500" />
              <div>
                <p className="text-sm font-medium">Phone</p>
                <p className="text-sm text-gray-600">+44 161 234 5678</p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Mail className="h-4 w-4 text-gray-500" />
              <div>
                <p className="text-sm font-medium">Email</p>
                <p className="text-sm text-gray-600">info@electrotechsolutions.co.uk</p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Globe className="h-4 w-4 text-gray-500" />
              <div>
                <p className="text-sm font-medium">Website</p>
                <p className="text-sm text-gray-600">www.electrotechsolutions.co.uk</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Services Offered */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Award className="h-5 w-5 text-teal-500" />
              <span>Services Offered</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">Electrical Installation</Badge>
              <Badge variant="secondary">Maintenance & Repairs</Badge>
              <Badge variant="secondary">Emergency Call-outs</Badge>
              <Badge variant="secondary">PAT Testing</Badge>
              <Badge variant="secondary">Electrical Inspections</Badge>
              <Badge variant="secondary">Commercial Wiring</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Certifications & Accreditations */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Award className="h-5 w-5 text-teal-500" />
              <span>Certifications & Accreditations</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span className="text-sm">NICEIC Approved Contractor</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span className="text-sm">ECA Member</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span className="text-sm">SafeContractor Approved</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span className="text-sm">ISO 9001:2015</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Key Personnel */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="h-5 w-5 text-teal-500" />
            <span>Key Personnel</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-gray-200 rounded-full mx-auto mb-2 flex items-center justify-center">
                <Users className="h-6 w-6 text-gray-500" />
              </div>
              <h4 className="font-semibold">James Mitchell</h4>
              <p className="text-sm text-gray-600">Managing Director</p>
              <p className="text-xs text-gray-500">james@electrotechsolutions.co.uk</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-gray-200 rounded-full mx-auto mb-2 flex items-center justify-center">
                <Users className="h-6 w-6 text-gray-500" />
              </div>
              <h4 className="font-semibold">Sarah Thompson</h4>
              <p className="text-sm text-gray-600">Operations Manager</p>
              <p className="text-xs text-gray-500">sarah@electrotechsolutions.co.uk</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-gray-200 rounded-full mx-auto mb-2 flex items-center justify-center">
                <Users className="h-6 w-6 text-gray-500" />
              </div>
              <h4 className="font-semibold">David Wilson</h4>
              <p className="text-sm text-gray-600">Senior Electrician</p>
              <p className="text-xs text-gray-500">david@electrotechsolutions.co.uk</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <p className="text-sm text-blue-700">
          <strong>Note:</strong> This information has been pre-filled based on your sales consultation. You can modify
          any details in the next steps if needed.
        </p>
      </div>
    </div>
  )
}
