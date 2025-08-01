"use client"

import { useState } from "react"
import { useOnboarding } from "../onboarding-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, Database, FileText, Users, Calendar } from "lucide-react"

const importModules = [
  {
    id: "customers",
    name: "Customers",
    icon: Users,
    description: "Transfer your existing customer database",
    benefits: ["Contact information", "Customer Addresses"],
  },
  {
    id: "jobs",
    name: "Jobs",
    icon: FileText,
    description: "Transfer historical job data",
    benefits: ["Job history"],
  },
  {
    id: "inventory",
    name: "Parts",
    icon: Database,
    description: "Transfer your parts and inventory data",
    benefits: ["Part Library", "Part numbers", "Additional information"],
  },
  {
    id: "schedule",
    name: "Sites",
    icon: Calendar,
    description: "Transfer existing sites",
    benefits: ["Site Contacts", "Easy linking"],
  },
]

export function DataImportOverviewScreen() {
  const { data, updateData } = useOnboarding()
  const [needsImport, setNeedsImport] = useState(data.dataImport.needsImport)

  const handleImportDecision = (decision: boolean) => {
    setNeedsImport(decision)
    updateData("dataImport", { needsImport: decision })
  }

  return (
    <div className="container mx-auto max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Data</h1>
        <p className="text-gray-600">
          Most small businesses find it easier to start fresh with JobLogic. We'll show you how to add your current work as you go.
        </p>
      </div>

      <div className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>💡 We Recommend: Start Fresh</CardTitle>
            <CardDescription>Most small businesses get up and running faster this way</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-600 mt-1" />
                <div>
                  <h3 className="text-lg font-semibold text-green-800 mb-2">Start Fresh - It's Easier!</h3>
                  <p className="text-green-700 mb-3">
                    We'll show you simple step-by-step guides to add your current jobs, customers, and parts as you work. 
                    No complicated data transfers or technical headaches.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-sm text-green-700">Get started in minutes</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-sm text-green-700">Learn as you go</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-sm text-green-700">No data upload hassles</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-sm text-green-700">Clean, organized system</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <Button
                variant={!needsImport ? "default" : "outline"}
                onClick={() => handleImportDecision(false)}
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white"
              >
                <CheckCircle className="w-4 h-4" />
                Yes, start fresh (Recommended)
              </Button>
              <Button
                variant={needsImport ? "default" : "outline"}
                onClick={() => handleImportDecision(true)}
                className="flex items-center gap-2"
              >
                <Database className="w-4 h-4" />
                I need my old data
              </Button>
            </div>
          </CardContent>
        </Card>

        {needsImport && (
          <Card>
            <CardHeader>
              <CardTitle>Historical Data Transfer</CardTitle>
              <CardDescription>Important: This requires manual work and may take time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                <div className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-yellow-800 mb-1">Manual Process Required</h4>
                    <p className="text-sm text-yellow-700">
                      We'll need to manually process your data, which can take several days. 
                      Most small businesses find starting fresh is much quicker.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium text-gray-900">Common reasons you might need old data:</h4>
                <div className="grid grid-cols-1 gap-4">
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <FileText className="w-4 h-4 text-blue-600" />
                      <span className="font-medium text-gray-900">Compliance & Warranties</span>
                    </div>
                    <p className="text-sm text-gray-600">
                      Need to access old job records for warranty claims, safety certificates, or compliance audits
                    </p>
                  </div>
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Users className="w-4 h-4 text-green-600" />
                      <span className="font-medium text-gray-900">Large Customer Base</span>
                    </div>
                    <p className="text-sm text-gray-600">
                      You have hundreds of customers with detailed service histories
                    </p>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-medium text-blue-800 mb-2">What happens if you choose this:</h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• You'll need to map your own data to JobLogic templates</li>
                    <li>• Share the mapped data with our team for processing</li>
                    <li>• This can take 3-10 business days depending on data size</li>
                    <li>• For assistance, reach out to support via live chat for guidance</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {!needsImport && (
          <Card>
            <CardHeader>
              <CardTitle>🎉 Perfect Choice!</CardTitle>
              <CardDescription>We'll help you add your current work step-by-step</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-6">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">You're making the smart choice!</h3>
                <p className="text-gray-600 mb-6">
                  Starting fresh means a clean, organized system from day one. We'll guide you through adding 
                  your current jobs and customers as you work.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <Calendar className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                    <h4 className="font-medium text-blue-800 mb-1">Current Jobs</h4>
                    <p className="text-xs text-blue-700">We'll show you how to add jobs from your Work in Progress list</p>
                  </div>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <Users className="w-8 h-8 text-green-600 mx-auto mb-2" />
                    <h4 className="font-medium text-green-800 mb-1">Customer Details</h4>
                    <p className="text-xs text-green-700">Simple guides to add customers as you visit them</p>
                  </div>
                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                    <Database className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                    <h4 className="font-medium text-purple-800 mb-1">Parts & Inventory</h4>
                    <p className="text-xs text-purple-700">Build your parts list as you use them on jobs</p>
                  </div>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="text-sm text-green-800 font-medium mb-1">
                    ✅ No spreadsheets to upload
                  </p>
                  <p className="text-sm text-green-800 font-medium mb-1">
                    ✅ No technical setup required
                  </p>
                  <p className="text-sm text-green-800 font-medium">
                    ✅ Start using JobLogic immediately
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
