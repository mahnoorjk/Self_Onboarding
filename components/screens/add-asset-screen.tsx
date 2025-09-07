"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Info, QrCode } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface AddAssetScreenProps {
  onAssetSaveSuccess?: () => void
  onNavigateBackToTutorials?: () => void
  showGuide?: boolean
}

export function AddAssetScreen({ 
  onAssetSaveSuccess, 
  onNavigateBackToTutorials, 
  showGuide = false 
}: AddAssetScreenProps) {
  const [customer, setCustomer] = useState("")
  const [site, setSite] = useState("")
  const [equipmentClass, setEquipmentClass] = useState("")
  const [equipmentLibrary, setEquipmentLibrary] = useState("")
  const [trades, setTrades] = useState("")
  const [serviceType, setServiceType] = useState("")
  const [description, setDescription] = useState("")
  const [make, setMake] = useState("")
  const [model, setModel] = useState("")
  
  // Site Asset Details
  const [number, setNumber] = useState("")
  const [location, setLocation] = useState("")
  const [serialNumber, setSerialNumber] = useState("")
  const [qrCode, setQrCode] = useState("")
  const [referenceNumber, setReferenceNumber] = useState("")
  const [installationDate, setInstallationDate] = useState("")
  const [assetQuantity, setAssetQuantity] = useState("1")
  const [labourWarrantyExpiry, setLabourWarrantyExpiry] = useState("")
  const [assetWarrantyExpiry, setAssetWarrantyExpiry] = useState("")
  const [quotedReplacementDate, setQuotedReplacementDate] = useState("")
  const [budgetReplacementCost, setBudgetReplacementCost] = useState("")
  const [assetCondition, setAssetCondition] = useState("")
  
  // Additional Information
  const [comments, setComments] = useState("")

  const handleSave = () => {
    // Save asset logic here
    if (onAssetSaveSuccess) {
      onAssetSaveSuccess()
    }
  }

  const handleCancel = () => {
    if (showGuide && onNavigateBackToTutorials) {
      onNavigateBackToTutorials()
    }
  }

  const generateRandomQRCode = () => {
    // Generate a random QR code
    const randomCode = Math.random().toString(36).substring(2, 15)
    setQrCode(randomCode.toUpperCase())
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Create Asset</h1>
        <div className="text-sm text-gray-600">
          Add a new asset to track equipment and manage maintenance schedules.
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Asset Form */}
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="p-6">
              {/* Customer and Site Selection */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-2">
                  <Label htmlFor="customer" className="text-sm font-medium">
                    Customer <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <Select value={customer} onValueChange={setCustomer}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Please select an option..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="customer1">Customer 1</SelectItem>
                        <SelectItem value="customer2">Customer 2</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button 
                      size="sm" 
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 bg-green-500 hover:bg-green-600"
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="site" className="text-sm font-medium">
                    Site <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <Select value={site} onValueChange={setSite}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Please select an option..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="site1">Site 1</SelectItem>
                        <SelectItem value="site2">Site 2</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button 
                      size="sm" 
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 bg-green-500 hover:bg-green-600"
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Asset Details Section */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Asset Details</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Equipment Class */}
                  <div className="space-y-2">
                    <Label htmlFor="equipmentClass" className="text-sm font-medium flex items-center gap-2">
                      Equipment Class
                      <Info className="w-4 h-4 text-gray-400" />
                    </Label>
                    <div className="relative">
                      <Select value={equipmentClass} onValueChange={setEquipmentClass}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Please select an option..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="hvac">HVAC Equipment</SelectItem>
                          <SelectItem value="electrical">Electrical Equipment</SelectItem>
                          <SelectItem value="plumbing">Plumbing Equipment</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button 
                        size="sm" 
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 bg-green-500 hover:bg-green-600"
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>

                  {/* Equipment Library */}
                  <div className="space-y-2">
                    <Label htmlFor="equipmentLibrary" className="text-sm font-medium flex items-center gap-2">
                      Equipment Library
                      <Info className="w-4 h-4 text-gray-400" />
                    </Label>
                    <div className="relative">
                      <Select value={equipmentLibrary} onValueChange={setEquipmentLibrary}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Please select an option..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="library1">Standard Library</SelectItem>
                          <SelectItem value="library2">Custom Library</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button 
                        size="sm" 
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 bg-green-500 hover:bg-green-600"
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>

                  {/* Trades */}
                  <div className="space-y-2">
                    <Label htmlFor="trades" className="text-sm font-medium flex items-center gap-2">
                      Trades
                      <Info className="w-4 h-4 text-gray-400" />
                    </Label>
                    <div className="relative">
                      <Select value={trades} onValueChange={setTrades}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Please select an option..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="electrical">Electrical</SelectItem>
                          <SelectItem value="plumbing">Plumbing</SelectItem>
                          <SelectItem value="hvac">HVAC</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button 
                        size="sm" 
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 bg-green-500 hover:bg-green-600"
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>

                  {/* Service Type */}
                  <div className="space-y-2">
                    <Label htmlFor="serviceType" className="text-sm font-medium flex items-center gap-2">
                      Service Type
                      <Info className="w-4 h-4 text-gray-400" />
                    </Label>
                    <div className="relative">
                      <Select value={serviceType} onValueChange={setServiceType}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Please select an option..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="maintenance">Maintenance</SelectItem>
                          <SelectItem value="repair">Repair</SelectItem>
                          <SelectItem value="installation">Installation</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button 
                        size="sm" 
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 bg-green-500 hover:bg-green-600"
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="mt-6 space-y-2">
                  <Label htmlFor="description" className="text-sm font-medium">
                    Description <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter asset description..."
                    className="min-h-[100px]"
                  />
                </div>

                {/* Make and Model */}
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="make" className="text-sm font-medium flex items-center gap-2">
                      Make
                      <Info className="w-4 h-4 text-gray-400" />
                    </Label>
                    <Input
                      id="make"
                      value={make}
                      onChange={(e) => setMake(e.target.value)}
                      placeholder="Enter make..."
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="model" className="text-sm font-medium flex items-center gap-2">
                      Model
                      <Info className="w-4 h-4 text-gray-400" />
                    </Label>
                    <Input
                      id="model"
                      value={model}
                      onChange={(e) => setModel(e.target.value)}
                      placeholder="Enter model..."
                    />
                  </div>
                </div>
              </div>

              {/* Additional Information Section */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Additional Information</h3>
                
                <div className="space-y-2">
                  <Label htmlFor="comments" className="text-sm font-medium">Comments</Label>
                  <Textarea
                    id="comments"
                    value={comments}
                    onChange={(e) => setComments(e.target.value)}
                    placeholder="Enter additional comments..."
                    className="min-h-[100px]"
                  />
                </div>
              </div>

              {/* Required Fields Notice */}
              <div className="mb-6 text-sm text-gray-600">
                <span className="text-red-500">*</span> Required Fields
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={handleCancel}>
                  Cancel
                </Button>
                <Button onClick={handleSave} className="bg-green-500 hover:bg-green-600">
                  Save
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Sidebar - Site Asset Details */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                Site Asset Details
                <Info className="w-4 h-4 text-gray-400" />
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="number" className="text-sm font-medium">Number</Label>
                <Input
                  id="number"
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="location" className="text-sm font-medium flex items-center gap-2">
                  Location
                  <Info className="w-4 h-4 text-gray-400" />
                </Label>
                <Input
                  id="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="serialNumber" className="text-sm font-medium flex items-center gap-2">
                  Serial Number
                  <Info className="w-4 h-4 text-gray-400" />
                </Label>
                <Input
                  id="serialNumber"
                  value={serialNumber}
                  onChange={(e) => setSerialNumber(e.target.value)}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="qrCode" className="text-sm font-medium flex items-center gap-2">
                  QR Code
                  <Info className="w-4 h-4 text-gray-400" />
                </Label>
                <div className="flex gap-2 mt-1">
                  <Input
                    id="qrCode"
                    value={qrCode}
                    onChange={(e) => setQrCode(e.target.value)}
                    className="flex-1"
                  />
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={generateRandomQRCode}
                    className="text-blue-600 hover:text-blue-700"
                  >
                    Create Random QR Code
                  </Button>
                </div>
              </div>

              <div>
                <Label htmlFor="referenceNumber" className="text-sm font-medium flex items-center gap-2">
                  Reference Number
                  <Info className="w-4 h-4 text-gray-400" />
                </Label>
                <Input
                  id="referenceNumber"
                  value={referenceNumber}
                  onChange={(e) => setReferenceNumber(e.target.value)}
                  className="mt-1"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="installationDate" className="text-sm font-medium flex items-center gap-2">
                    Installation Date
                    <Info className="w-4 h-4 text-gray-400" />
                  </Label>
                  <Input
                    id="installationDate"
                    type="date"
                    value={installationDate}
                    onChange={(e) => setInstallationDate(e.target.value)}
                    placeholder="DD/MM/YYYY"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="assetQuantity" className="text-sm font-medium flex items-center gap-2">
                    Asset Quantity
                    <Info className="w-4 h-4 text-gray-400" />
                  </Label>
                  <Input
                    id="assetQuantity"
                    type="number"
                    value={assetQuantity}
                    onChange={(e) => setAssetQuantity(e.target.value)}
                    className="mt-1"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="labourWarrantyExpiry" className="text-sm font-medium">Labour Warranty Expiry</Label>
                  <Input
                    id="labourWarrantyExpiry"
                    type="date"
                    value={labourWarrantyExpiry}
                    onChange={(e) => setLabourWarrantyExpiry(e.target.value)}
                    placeholder="DD/MM/YYYY"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="assetWarrantyExpiry" className="text-sm font-medium">Asset Warranty Expiry</Label>
                  <Input
                    id="assetWarrantyExpiry"
                    type="date"
                    value={assetWarrantyExpiry}
                    onChange={(e) => setAssetWarrantyExpiry(e.target.value)}
                    placeholder="DD/MM/YYYY"
                    className="mt-1"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="quotedReplacementDate" className="text-sm font-medium flex items-center gap-2">
                  Quoted Replacement Date
                  <Info className="w-4 h-4 text-gray-400" />
                </Label>
                <Input
                  id="quotedReplacementDate"
                  type="date"
                  value={quotedReplacementDate}
                  onChange={(e) => setQuotedReplacementDate(e.target.value)}
                  placeholder="DD/MM/YYYY"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="budgetReplacementCost" className="text-sm font-medium">Budget Replacement Cost</Label>
                <Input
                  id="budgetReplacementCost"
                  value={budgetReplacementCost}
                  onChange={(e) => setBudgetReplacementCost(e.target.value)}
                  placeholder="Enter cost..."
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="assetCondition" className="text-sm font-medium">Asset Condition</Label>
                <Select value={assetCondition} onValueChange={setAssetCondition}>
                  <SelectTrigger className="w-full mt-1">
                    <SelectValue placeholder="Please select an option..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="excellent">Excellent</SelectItem>
                    <SelectItem value="good">Good</SelectItem>
                    <SelectItem value="fair">Fair</SelectItem>
                    <SelectItem value="poor">Poor</SelectItem>
                    <SelectItem value="needs-replacement">Needs Replacement</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
