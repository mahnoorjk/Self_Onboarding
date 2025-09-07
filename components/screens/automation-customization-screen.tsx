"use client"

import type React from "react"

import { useState } from "react"
import { useOnboarding } from "../onboarding-context"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Upload, FileText, Settings, Zap, CheckCircle, XCircle } from "lucide-react"

const customizationTypes = [
  {
    id: "custom-forms",
    name: "Custom Forms",
    description: "Create custom forms for specific job types or compliance requirements",
    icon: FileText,
  },
  {
    id: "custom-dashboards",
    name: "Custom Dashboards",
    description: "Build personalized dashboards for different roles and departments",
    icon: Settings,
  },
  {
    id: "document-templates",
    name: "Document Templates",
    description: "Create custom invoice, quote, and certificate templates",
    icon: FileText,
  },
  {
    id: "workflow-automation",
    name: "Workflow Automation",
    description: "Automate repetitive tasks and business processes",
    icon: Zap,
  },
]

export function AutomationCustomizationScreen() {
  const { data, updateData } = useOnboarding()
  const [needsCustomization, setNeedsCustomization] = useState(data.automationCustomization.needsCustomization)
  const [selectedTypes, setSelectedTypes] = useState<string[]>(data.automationCustomization.customizationTypes || [])
  const [automationRequirements, setAutomationRequirements] = useState(data.automationCustomization.automations || "")
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const [customFormFiles, setCustomFormFiles] = useState<File[]>([])
  const [customDashboardFiles, setCustomDashboardFiles] = useState<File[]>([])
  const [workflowFiles, setWorkflowFiles] = useState<File[]>([])

  const handleCustomizationDecision = (decision: boolean) => {
    setNeedsCustomization(decision)
    updateData("automationCustomization", { needsCustomization: decision })
  }

  const handleTypeChange = (typeId: string, checked: boolean) => {
    const newTypes = checked ? [...selectedTypes, typeId] : selectedTypes.filter((t) => t !== typeId)

    setSelectedTypes(newTypes)
    updateData("automationCustomization", { customizationTypes: newTypes })
  }

  const handleAutomationChange = (value: string) => {
    setAutomationRequirements(value)
    updateData("automationCustomization", { automations: value })
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    setUploadedFiles((prev) => [...prev, ...files])
    updateData("automationCustomization", { documentTemplates: [...uploadedFiles, ...files] })
  }

  const handleCustomFormFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    setCustomFormFiles((prev) => [...prev, ...files])
    updateData("automationCustomization", { customForms: [...customFormFiles, ...files] })
  }

  const handleCustomDashboardFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    setCustomDashboardFiles((prev) => [...prev, ...files])
    updateData("automationCustomization", { customDashboards: [...customDashboardFiles, ...files] })
  }

  const handleWorkflowFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    setWorkflowFiles((prev) => [...prev, ...files])
    updateData("automationCustomization", { workflowDocuments: [...workflowFiles, ...files] })
  }

  const removeFile = (index: number) => {
    const newFiles = uploadedFiles.filter((_, i) => i !== index)
    setUploadedFiles(newFiles)
    updateData("automationCustomization", { documentTemplates: newFiles })
  }

  const removeCustomFormFile = (index: number) => {
    const newFiles = customFormFiles.filter((_, i) => i !== index)
    setCustomFormFiles(newFiles)
    updateData("automationCustomization", { customForms: newFiles })
  }

  const removeCustomDashboardFile = (index: number) => {
    const newFiles = customDashboardFiles.filter((_, i) => i !== index)
    setCustomDashboardFiles(newFiles)
    updateData("automationCustomization", { customDashboards: newFiles })
  }

  const removeWorkflowFile = (index: number) => {
    const newFiles = workflowFiles.filter((_, i) => i !== index)
    setWorkflowFiles(newFiles)
    updateData("automationCustomization", { workflowDocuments: newFiles })
  }

  return (
    <div className="container mx-auto max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Automation & Customization</h1>
        <p className="text-gray-600">
          Do you need any custom forms, dashboards, or automated workflows for your business?
        </p>
      </div>

      <div className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Customization Requirements</CardTitle>
            <CardDescription>
              Let us know if you need any customizations beyond the standard JobLogic features
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <Button
                variant={needsCustomization ? "default" : "outline"}
                onClick={() => handleCustomizationDecision(true)}
                className="flex items-center gap-2"
              >
                <CheckCircle className="w-4 h-4" />
                Yes, I need customizations
              </Button>
              <Button
                variant={!needsCustomization ? "default" : "outline"}
                onClick={() => handleCustomizationDecision(false)}
                className="flex items-center gap-2"
              >
                <XCircle className="w-4 h-4" />
                No, standard features are sufficient
              </Button>
            </div>
          </CardContent>
        </Card>

        {needsCustomization && (
          <>
            <Card>
              <CardHeader>
                <CardTitle>Customization Types</CardTitle>
                <CardDescription>Select the types of customizations you need</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {customizationTypes.map((type) => {
                    const IconComponent = type.icon
                    const isSelected = selectedTypes.includes(type.id)

                    return (
                      <div key={type.id} className="flex items-start space-x-3">
                        <Checkbox
                          id={type.id}
                          checked={isSelected}
                          onCheckedChange={(checked) => handleTypeChange(type.id, checked as boolean)}
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <IconComponent className="w-4 h-4 text-teal-600" />
                            <Label htmlFor={type.id} className="font-medium">
                              {type.name}
                            </Label>
                          </div>
                          <p className="text-sm text-gray-600">{type.description}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            {selectedTypes.includes("custom-forms") && (
              <Card>
                <CardHeader>
                  <CardTitle>Custom Forms Requirements</CardTitle>
                  <CardDescription>Describe the custom forms you need or upload existing examples</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600 mb-2">Upload existing form examples (optional)</p>
                      <Button variant="outline" onClick={() => document.getElementById("custom-form-upload")?.click()}>
                        Choose Files
                      </Button>
                      <input
                        id="custom-form-upload"
                        type="file"
                        multiple
                        accept=".pdf,.doc,.docx,.xls,.xlsx,.png,.jpg,.jpeg"
                        className="hidden"
                        onChange={handleCustomFormFileUpload}
                      />
                      <p className="text-xs text-gray-500 mt-2">Supported formats: PDF, Word, Excel, Images</p>
                    </div>

                    {customFormFiles.length > 0 && (
                      <div className="space-y-2">
                        <h4 className="font-medium">Uploaded Form Examples</h4>
                        {customFormFiles.map((file, index) => (
                          <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                            <span className="text-sm">{file.name}</span>
                            <Button variant="ghost" size="sm" onClick={() => removeCustomFormFile(index)}>
                              <XCircle className="w-4 h-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="space-y-2">
                      <Label htmlFor="formRequirements">Form Requirements</Label>
                      <Textarea
                        id="formRequirements"
                        placeholder="Describe the custom forms you need, including fields, validation rules, and any specific compliance requirements"
                        rows={4}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {selectedTypes.includes("custom-dashboards") && (
              <Card>
                <CardHeader>
                  <CardTitle>Custom Dashboard Requirements</CardTitle>
                  <CardDescription>Tell us about the dashboards you need or upload mockups/examples</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600 mb-2">Upload dashboard mockups or examples (optional)</p>
                      <Button variant="outline" onClick={() => document.getElementById("custom-dashboard-upload")?.click()}>
                        Choose Files
                      </Button>
                      <input
                        id="custom-dashboard-upload"
                        type="file"
                        multiple
                        accept=".pdf,.doc,.docx,.xls,.xlsx,.png,.jpg,.jpeg"
                        className="hidden"
                        onChange={handleCustomDashboardFileUpload}
                      />
                      <p className="text-xs text-gray-500 mt-2">Supported formats: PDF, Word, Excel, Images</p>
                    </div>

                    {customDashboardFiles.length > 0 && (
                      <div className="space-y-2">
                        <h4 className="font-medium">Uploaded Dashboard Examples</h4>
                        {customDashboardFiles.map((file, index) => (
                          <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                            <span className="text-sm">{file.name}</span>
                            <Button variant="ghost" size="sm" onClick={() => removeCustomDashboardFile(index)}>
                              <XCircle className="w-4 h-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="space-y-2">
                      <Label htmlFor="dashboardRequirements">Dashboard Requirements</Label>
                      <Textarea
                        id="dashboardRequirements"
                        placeholder="Describe the custom dashboards you need, including key metrics, charts, and user roles"
                        rows={4}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {selectedTypes.includes("document-templates") && (
              <Card>
                <CardHeader>
                  <CardTitle>Document Templates</CardTitle>
                  <CardDescription>Upload existing templates or describe new ones you need</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600 mb-2">Upload your existing templates (optional)</p>
                      <Button variant="outline" onClick={() => document.getElementById("template-upload")?.click()}>
                        Choose Files
                      </Button>
                      <input
                        id="template-upload"
                        type="file"
                        multiple
                        accept=".pdf,.doc,.docx,.xls,.xlsx"
                        className="hidden"
                        onChange={handleFileUpload}
                      />
                      <p className="text-xs text-gray-500 mt-2">Supported formats: PDF, Word, Excel</p>
                    </div>

                    {uploadedFiles.length > 0 && (
                      <div className="space-y-2">
                        <h4 className="font-medium">Uploaded Templates</h4>
                        {uploadedFiles.map((file, index) => (
                          <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                            <span className="text-sm">{file.name}</span>
                            <Button variant="ghost" size="sm" onClick={() => removeFile(index)}>
                              <XCircle className="w-4 h-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="space-y-2">
                      <Label htmlFor="templateRequirements">Template Requirements</Label>
                      <Textarea
                        id="templateRequirements"
                        placeholder="Describe any new templates you need or modifications to existing ones"
                        rows={3}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {selectedTypes.includes("workflow-automation") && (
              <Card>
                <CardHeader>
                  <CardTitle>Workflow Automation</CardTitle>
                  <CardDescription>Describe the processes you'd like to automate or upload workflow diagrams</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600 mb-2">Upload workflow diagrams or process documents (optional)</p>
                      <Button variant="outline" onClick={() => document.getElementById("workflow-upload")?.click()}>
                        Choose Files
                      </Button>
                      <input
                        id="workflow-upload"
                        type="file"
                        multiple
                        accept=".pdf,.doc,.docx,.xls,.xlsx,.png,.jpg,.jpeg,.vsd,.vsdx"
                        className="hidden"
                        onChange={handleWorkflowFileUpload}
                      />
                      <p className="text-xs text-gray-500 mt-2">Supported formats: PDF, Word, Excel, Images, Visio</p>
                    </div>

                    {workflowFiles.length > 0 && (
                      <div className="space-y-2">
                        <h4 className="font-medium">Uploaded Workflow Documents</h4>
                        {workflowFiles.map((file, index) => (
                          <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                            <span className="text-sm">{file.name}</span>
                            <Button variant="ghost" size="sm" onClick={() => removeWorkflowFile(index)}>
                              <XCircle className="w-4 h-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="space-y-2">
                      <Label htmlFor="automationRequirements">Automation Requirements</Label>
                      <Textarea
                        id="automationRequirements"
                        value={automationRequirements}
                        onChange={(e) => handleAutomationChange(e.target.value)}
                        placeholder="Describe the workflows and processes you'd like to automate (e.g., automatic job assignment, follow-up emails, invoice generation)"
                        rows={4}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {selectedTypes.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Customization Summary</CardTitle>
                  <CardDescription>Review your customization requirements</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-medium text-blue-900 mb-2">Selected Customizations:</h4>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {selectedTypes.map((typeId) => {
                        const type = customizationTypes.find((t) => t.id === typeId)
                        return (
                          <Badge key={typeId} variant="outline">
                            {type?.name}
                          </Badge>
                        )
                      })}
                    </div>
                    <p className="text-sm text-blue-800">
                      Our team will review your requirements and provide a customization plan during the setup process.
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </>
        )}

        {!needsCustomization && (
          <Card>
            <CardHeader>
              <CardTitle>Standard Configuration</CardTitle>
              <CardDescription>You'll be set up with JobLogic's standard features</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Perfect! Standard features will work great for you.
                </h3>
                <p className="text-gray-600 mb-4">
                  JobLogic comes with comprehensive standard features that work for most businesses.
                </p>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="text-sm text-green-800">
                    <strong>Note:</strong> You can always request customizations later as your business grows and your
                    needs evolve.
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
