"use client"

import { useState } from "react"
import { useOnboarding } from "../onboarding-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { FileText, Download, Eye, CheckCircle } from "lucide-react"

const templateCategories = [
  {
    id: "certificates",
    name: "General",
    templates: [
      {
        id: "electrical-cert",
        name: "Customer",
        description: "Download the template for Customers, fill it with your data, and upload it.",
        industry: "General",
      },
      {
        id: "safety-report",
        name: "Sites",
        description: "Download the template for Sites, fill it with your data, and upload it.",
        industry: "General",
      },
    ],
  },
  {
    id: "invoices",
    name: "Assets & Quotes",
    templates: [
      {
        id: "standard-invoice",
        name: "Assets",
        description: "Download the template for Assets, fill it with your data, and upload it.",
        industry: "General",
      },
      {
        id: "quote-template",
        name: "Quotes",
        description: "Detailed quote template, fill it with your data, and upload it.",
        industry: "General",
      },
    ],
  },
]

export function JoblogicTemplatesScreen() {
  const { data, updateData } = useOnboarding()
  const [selectedTemplates, setSelectedTemplates] = useState<string[]>([])

  // Only show this screen if user needs import and selected joblogic templates method
  if (!data.dataImport.needsImport || data.dataImport.importMethod !== "joblogic-templates") {
    return null
  }

  const handleTemplateChange = (templateId: string, checked: boolean) => {
    const newTemplates = checked
      ? [...selectedTemplates, templateId]
      : selectedTemplates.filter((id) => id !== templateId)

    setSelectedTemplates(newTemplates)
    updateData("dataImport", { templates: { selected: newTemplates } })
  }

  const previewTemplate = (templateId: string) => {
    console.log(`Previewing template: ${templateId}`)
  }

  const downloadTemplate = (templateId: string) => {
    console.log(`Downloading template: ${templateId}`)
  }

  return (
    <div className="container mx-auto max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">JobLogic Templates</h1>
        <p className="text-gray-600">Choose from our library of professional templates to get started quickly.</p>
      </div>

      <div className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Template Library</CardTitle>
            <CardDescription>Select the templates you'd like to use in your JobLogic system</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {templateCategories.map((category) => (
                <div key={category.id}>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">{category.name}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {category.templates.map((template) => (
                      <div key={template.id} className="border rounded-lg p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-start gap-3">
                            <Checkbox
                              id={template.id}
                              checked={selectedTemplates.includes(template.id)}
                              onCheckedChange={(checked) => handleTemplateChange(template.id, checked as boolean)}
                            />
                            <div>
                              <Label htmlFor={template.id} className="font-medium cursor-pointer">
                                {template.name}
                              </Label>
                              <p className="text-sm text-gray-600 mt-1">{template.description}</p>
                              <Badge variant="outline" className="text-xs mt-2">
                                {template.industry}
                              </Badge>
                            </div>
                          </div>
                          <FileText className="w-5 h-5 text-teal-600" />
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => previewTemplate(template.id)}
                            className="flex items-center gap-1"
                          >
                            <Eye className="w-3 h-3" />
                            Preview
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => downloadTemplate(template.id)}
                            className="flex items-center gap-1"
                          >
                            <Download className="w-3 h-3" />
                            Download
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {selectedTemplates.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Selected Templates</CardTitle>
              <CardDescription>These templates will be added to your JobLogic system</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-green-800">
                      {selectedTemplates.length} template{selectedTemplates.length !== 1 ? "s" : ""} selected
                    </h4>
                    <p className="text-sm text-green-700 mt-1">
                      These templates will be configured and ready to use once your setup is complete.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
