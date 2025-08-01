"use client"

import type React from "react"

import { useState } from "react"
import { useOnboarding } from "../onboarding-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Upload, FileText, CheckCircle, AlertCircle, Download, X } from "lucide-react"

const fileTemplates = [
  {
    id: "customers",
    name: "Customers Template",
    description: "Template for transferring customer data",
    filename: "customers_template.csv",
    requiredFields: ["Name", "Email", "Phone", "Address"],
  },
  {
    id: "sites",
    name: "Sites Template",
    description: "Template for transferring site location data",
    filename: "sites_template.csv",
    requiredFields: ["Site Name", "Customer", "Address", "Contact"],
  },
  {
    id: "assets-equipment",
    name: "Assets & Equipment Template",
    description: "Template for transferring asset and equipment data",
    filename: "assets_equipment_template.csv",
    requiredFields: ["Asset ID", "Description", "Location", "Status"],
  },
  {
    id: "parts-materials",
    name: "Parts & Materials Template",
    description: "Template for transferring inventory data",
    filename: "parts_materials_template.csv",
    requiredFields: ["Part Number", "Description", "Quantity", "Unit Price"],
  },
  {
    id: "jobs",
    name: "Jobs Template",
    description: "Template for transferring job and work order data",
    filename: "jobs_template.csv",
    requiredFields: ["Job Number", "Customer", "Date", "Status"],
  },
  {
    id: "quotes",
    name: "Quotes Template",
    description: "Template for transferring quote data",
    filename: "quotes_template.csv",
    requiredFields: ["Quote Number", "Customer", "Amount", "Date"],
  },
  {
    id: "invoices",
    name: "Invoices Template",
    description: "Template for transferring invoice data",
    filename: "invoices_template.csv",
    requiredFields: ["Invoice Number", "Customer", "Amount", "Date"],
  },
]

export function UploadDataFilesScreen() {
  const { data, updateData } = useOnboarding()
  const [uploadedFiles, setUploadedFiles] = useState<any[]>([])
  const [dragActive, setDragActive] = useState(false)

  // Only show this screen if user needs import and selected upload data files method
  if (!data.dataImport.needsImport || data.dataImport.importMethod !== "upload-data-files") {
    return null
  }

  const selectedModules = data.dataImport.selectedModules || []
  const relevantTemplates = fileTemplates.filter((template) => selectedModules.includes(template.id))

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files)
    }
  }

  const handleFiles = (files: FileList) => {
    const newFiles = Array.from(files).map((file) => ({
      id: Date.now() + Math.random(),
      name: file.name,
      size: file.size,
      type: file.type,
      status: "uploaded",
      progress: 100,
    }))

    setUploadedFiles((prev) => [...prev, ...newFiles])
    updateData("dataImport", { uploadedFiles: [...uploadedFiles, ...newFiles] })
  }

  const removeFile = (fileId: string) => {
    const filtered = uploadedFiles.filter((file) => file.id !== fileId)
    setUploadedFiles(filtered)
    updateData("dataImport", { uploadedFiles: filtered })
  }

  const downloadTemplate = (template: any) => {
    // In a real app, this would download the actual template file
    console.log(`Downloading template: ${template.filename}`)
  }

  return (
    <div className="container mx-auto max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Upload Data Files</h1>
        <p className="text-gray-600">Upload your CSV or Excel files to transfer your data into JobLogic.</p>
      </div>

      <div className="space-y-8">
        {relevantTemplates.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Download Templates</CardTitle>
              <CardDescription>
                Download templates for your selected data types to ensure proper formatting
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                {relevantTemplates.map((template) => (
                  <div key={template.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-medium text-gray-900">{template.name}</h4>
                        <p className="text-sm text-gray-600 mt-1">{template.description}</p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => downloadTemplate(template)}
                        className="ml-2"
                      >
                        <Download className="w-4 h-4 mr-1" />
                        Download
                      </Button>
                    </div>
                    <div className="space-y-2">
                      <p className="text-xs font-medium text-gray-700">Required Fields:</p>
                      <div className="flex flex-wrap gap-1">
                        {template.requiredFields.map((field) => (
                          <Badge key={field} variant="secondary" className="text-xs">
                            {field}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Upload Your Files</CardTitle>
            <CardDescription>Drag and drop your files here or click to browse</CardDescription>
          </CardHeader>
          <CardContent>
            <div
              className={`
                border-2 border-dashed rounded-lg p-8 text-center transition-colors
                ${dragActive ? "border-teal-500 bg-teal-50" : "border-gray-300"}
              `}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Drop your files here</h3>
              <p className="text-gray-600 mb-4">Supports CSV, Excel (.xlsx, .xls) files up to 10MB each</p>
              <Button variant="outline" onClick={() => document.getElementById("file-upload")?.click()}>
                Browse Files
              </Button>
              <input
                id="file-upload"
                type="file"
                multiple
                accept=".csv,.xlsx,.xls"
                className="hidden"
                onChange={(e) => e.target.files && handleFiles(e.target.files)}
              />
            </div>
          </CardContent>
        </Card>

        {uploadedFiles.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Uploaded Files</CardTitle>
              <CardDescription>Review your uploaded files before proceeding</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {uploadedFiles.map((file) => (
                  <div key={file.id} className="flex items-center gap-4 p-4 border rounded-lg">
                    <FileText className="w-8 h-8 text-teal-600" />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium">{file.name}</span>
                        <Badge variant="outline" className="text-xs">
                          {(file.size / 1024).toFixed(1)} KB
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <Progress value={file.progress} className="flex-1 h-2" />
                        {file.status === "uploaded" && <CheckCircle className="w-4 h-4 text-green-500" />}
                        {file.status === "error" && <AlertCircle className="w-4 h-4 text-red-500" />}
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => removeFile(file.id)}>
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
