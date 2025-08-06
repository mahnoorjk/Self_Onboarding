"use client"

import { useState } from "react"
import { useOnboarding } from "../onboarding-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Users,
  MapPin,
  HardHat,
  Package,
  Truck,
  UserCog,
  FileText,
  ClipboardList,
  Receipt,
  CalendarCheck,
  FileSpreadsheet,
  Link,
  Upload,
  Clock,
  Download,
  AlertCircle,
} from "lucide-react"

const importModules = [
  {
    id: "customers",
    name: "Customers",
    icon: Users,
    description: "Transfer your existing customer database",
  },
  {
    id: "sites",
    name: "Sites",
    icon: MapPin,
    description: "Transfer customer site locations and details",
  },
  {
    id: "assets-equipment",
    name: "Assets & Equipment",
    icon: HardHat,
    description: "Transfer details of assets and equipment you manage",
  },
  {
    id: "parts-materials",
    name: "Parts & Materials",
    icon: Package,
    description: "Transfer your inventory of parts and materials",
  },
  // {
  //   id: "suppliers",
  //   name: "Suppliers",
  //   icon: Truck,
  //   description: "Import your supplier contact information",
  // },
  // {
  //   id: "subcontractors",
  //   name: "Subcontractors",
  //   icon: UserCog,
  //   description: "Import details of your subcontractors",
  // },
  {
    id: "jobs",
    name: "Jobs",
    icon: FileText,
    description: "Import historical job data and work orders",
  },
  {
    id: "quotes",
    name: "Quotes",
    icon: ClipboardList,
    description: "Import your existing quotes",
  },
  {
    id: "invoices",
    name: "Invoices",
    icon: Receipt,
    description: "Import historical invoice data",
  }
  // {
  //   id: "ppm-contracts",
  //   name: "PPM Contracts",
  //   icon: CalendarCheck,
  //   description: "Import your planned preventative maintenance contracts",
  // },
]

const importMethods = [
  {
    id: "upload-data-files",
    name: "Upload data files",
    icon: FileSpreadsheet,
    description: "Upload CSV or Excel files with your data",
    recommended: true,
  }
  // ,
  // {
  //   id: "software-credentials",
  //   name: "Software credentials",
  //   icon: Link,
  //   description: "Connect directly to your existing software",
  // }
  // ,
  // {
  //   id: "joblogic-templates",
  //   name: "Joblogic templates",
  //   icon: Upload,
  //   description: "We'll help you enter data manually",
  // },
]

export function DataImportScreen() {
  const { data, updateData, setCurrentStep } = useOnboarding()
  const [selectedModules, setSelectedModules] = useState<string[]>(data.dataImport.selectedModules || [])
  const [importMethod, setImportMethod] = useState(data.dataImport.importMethod || "")

  const handleModuleChange = (moduleId: string, checked: boolean) => {
    const newModules = checked ? [...selectedModules, moduleId] : selectedModules.filter((id) => id !== moduleId)

    setSelectedModules(newModules)
    updateData("dataImport", { selectedModules: newModules })
  }

  const handleMethodChange = (method: string) => {
    setImportMethod(method)
    updateData("dataImport", { importMethod: method })
  }

  const handleSkipImport = () => {
    // Mark data import as skipped and go to completion
    updateData("dataImport", { skipped: true })
    setCurrentStep(10) // Navigate to completion screen
  }

  // Only show this screen if user needs import
  if (!data.dataImport.needsImport) {
    return null
  }

  return (
    <div className="container mx-auto max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Transfer Your Data</h1>
        <p className="text-gray-600">Select what data you'd like to transfer and how you'd like to transfer it.</p>
      </div>

      <div className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-600" />
              Take Your Time - No Pressure!
            </CardTitle>
            <CardDescription>Remember: You can always come back to this later</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-blue-800 mb-2">Flexible Options for Busy Business Owners</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-700">
                    <div>
                      <p className="font-medium mb-1">✓ Select just a few modules now</p>
                      <p className="text-xs">You can add more data types later</p>
                    </div>
                    <div>
                      <p className="font-medium mb-1">✓ Download templates to work offline</p>
                      <p className="text-xs">Prepare data during quiet periods</p>
                    </div>
                    <div>
                      <p className="font-medium mb-1">✓ Upload partial data</p>
                      <p className="text-xs">Start with customers, add jobs later</p>
                    </div>
                    <div>
                      <p className="font-medium mb-1">✓ Skip entirely and return anytime</p>
                      <p className="text-xs">Access data import for each section later</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-3 text-sm">
              <Button variant="ghost" size="sm" className="text-gray-600" onClick={handleSkipImport}>
                Skip & Import Later
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Select Data to Transfer</CardTitle>
            <CardDescription>Choose which types of data you want to transfer from your existing system</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {importModules.map((module) => {
                const IconComponent = module.icon
                const isSelected = selectedModules.includes(module.id)

                return (
                  <div key={module.id} className="flex items-start space-x-3">
                    <Checkbox
                      id={module.id}
                      checked={isSelected}
                      onCheckedChange={(checked) => handleModuleChange(module.id, checked as boolean)}
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <IconComponent className="w-4 h-4 text-teal-600" />
                        <Label htmlFor={module.id} className="font-medium">
                          {module.name}
                        </Label>
                      </div>
                      <p className="text-sm text-gray-600">{module.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {selectedModules.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Download Templates</CardTitle>
              <CardDescription>Get templates for your selected data types</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-3">
                <p className="text-sm text-blue-700">
                  <strong>Only work on what you need:</strong> You don't have to fill out templates for all data types - 
                  just the ones you actually want to transfer. Skip the rest!
                </p>
              </div>
              <div className="flex gap-3 text-sm">
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Download Selected Templates ({selectedModules.length})
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-600" onClick={handleSkipImport}>
                  Skip & Import Later
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {selectedModules.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Transfer Method</CardTitle>
              <CardDescription>How would you like to transfer your data?</CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup value={importMethod} onValueChange={handleMethodChange}>
                <div className="space-y-4">
                  {importMethods.map((method) => {
                    const IconComponent = method.icon

                    return (
                      <div key={method.id} className="flex items-start space-x-3">
                        <RadioGroupItem value={method.id} id={method.id} className="mt-1" />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <IconComponent className="w-4 h-4 text-teal-600" />
                            <Label htmlFor={method.id} className="font-medium">
                              {method.name}
                              {method.recommended && (
                                <Badge variant="secondary" className="ml-2 text-xs">
                                  Recommended
                                </Badge>
                              )}
                            </Label>
                          </div>
                          <p className="text-sm text-gray-600">{method.description}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </RadioGroup>
            </CardContent>
          </Card>
        )}

        {selectedModules.length > 0 && importMethod && (
          <Card>
            <CardHeader>
              <CardTitle>Next Steps</CardTitle>
              <CardDescription>Based on your selections, here's what happens next</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-medium text-blue-900 mb-2">Selected for Transfer:</h4>
                <div className="flex flex-wrap gap-2 mb-4">
                  {selectedModules.map((moduleId) => {
                    const module = importModules.find((m) => m.id === moduleId)
                    return (
                      <Badge key={moduleId} variant="outline">
                        {module?.name}
                      </Badge>
                    )
                  })}
                </div>
                <p className="text-sm text-blue-800">
                  {importMethod === "upload-data-files" &&
                    "You'll be able to upload your CSV/Excel files in the next steps."}
                  {importMethod === "software-credentials" &&
                    "Our team will help you set up the API connection to your existing software."}
                  {importMethod === "joblogic-templates" &&
                    "Our support team will schedule a session to help you enter your data."}
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
