"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Info } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface AddSiteScreenProps {
  onSiteSaveSuccess?: () => void
  onNavigateBackToTutorials?: () => void
  showGuide?: boolean
}

export function AddSiteScreen({ 
  onSiteSaveSuccess, 
  onNavigateBackToTutorials, 
  showGuide = false 
}: AddSiteScreenProps) {
  const [customer, setCustomer] = useState("")
  const [siteName, setSiteName] = useState("")
  const [tags, setTags] = useState<string[]>([])
  const [address, setAddress] = useState("")
  const [area, setArea] = useState("")
  const [city, setCity] = useState("")
  const [countyStateRegion, setCountyStateRegion] = useState("")
  const [accountManager, setAccountManager] = useState("")
  const [postcode, setPostcode] = useState("")
  const [telephone, setTelephone] = useState("")
  const [telephoneArea, setTelephoneArea] = useState("")
  const [siteReferenceNumber, setSiteReferenceNumber] = useState("")
  
  // Main Contact Person fields
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [contactTelephone, setContactTelephone] = useState("")
  const [email, setEmail] = useState("")
  const [jobPosition, setJobPosition] = useState("")

  const handleSave = () => {
    // Save site logic here
    if (onSiteSaveSuccess) {
      onSiteSaveSuccess()
    }
  }

  const handleCancel = () => {
    if (showGuide && onNavigateBackToTutorials) {
      onNavigateBackToTutorials()
    }
  }

  const addTag = (tag: string) => {
    if (tag && !tags.includes(tag)) {
      setTags([...tags, tag])
    }
  }

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove))
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Add Site</h1>
        <div className="text-sm text-gray-600">
          Create a new site for your customers and manage their location details.
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Site Form */}
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="p-6">
              {/* Customer Selection */}
              <div className="mb-6">
                <Label htmlFor="customer" className="text-sm font-medium">
                  Customer <span className="text-red-500">*</span>
                </Label>
                <div className="relative mt-2">
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

              {/* Find Address Section */}
              <div className="mb-6">
                <Label className="text-sm font-medium text-gray-700">
                  Find Address to Populate All Fields
                </Label>
                <Input
                  placeholder="Start Typing Company Name, Address, Postcode..."
                  className="mt-2 bg-gray-50"
                />
              </div>

              {/* Site Name */}
              <div className="mb-6">
                <Label htmlFor="siteName" className="text-sm font-medium">
                  Site Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="siteName"
                  value={siteName}
                  onChange={(e) => setSiteName(e.target.value)}
                  className="mt-2"
                />
              </div>

              {/* Tags */}
              <div className="mb-6">
                <Label className="text-sm font-medium">Tag(s)</Label>
                <Select onValueChange={addTag}>
                  <SelectTrigger className="w-full mt-2">
                    <SelectValue placeholder="Please select option(s)" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="commercial">Commercial</SelectItem>
                    <SelectItem value="residential">Residential</SelectItem>
                    <SelectItem value="industrial">Industrial</SelectItem>
                    <SelectItem value="retail">Retail</SelectItem>
                  </SelectContent>
                </Select>
                {tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="flex items-center gap-1">
                        {tag}
                        <button 
                          onClick={() => removeTag(tag)}
                          className="ml-1 text-xs hover:text-red-500"
                        >
                          ×
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              {/* Address */}
              <div className="mb-6">
                <Label htmlFor="address" className="text-sm font-medium">Address</Label>
                <Textarea
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Company name, building, Street address"
                  className="mt-2 min-h-[80px]"
                />
              </div>

              {/* Area, City, County Fields */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div>
                  <Label htmlFor="area" className="text-sm font-medium">Area</Label>
                  <Input
                    id="area"
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="city" className="text-sm font-medium">City</Label>
                  <Input
                    id="city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="county" className="text-sm font-medium">County, State/Province/Region</Label>
                  <Input
                    id="county"
                    value={countyStateRegion}
                    onChange={(e) => setCountyStateRegion(e.target.value)}
                    className="mt-2"
                  />
                </div>
              </div>

              {/* Account Manager */}
              <div className="mb-6">
                <Label htmlFor="accountManager" className="text-sm font-medium flex items-center gap-2">
                  Account Manager
                  <Info className="w-4 h-4 text-gray-400" />
                </Label>
                <Select value={accountManager} onValueChange={setAccountManager}>
                  <SelectTrigger className="w-full mt-2">
                    <SelectValue placeholder="Please select an option..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="manager1">Manager 1</SelectItem>
                    <SelectItem value="manager2">Manager 2</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Postcode and Telephone */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <Label htmlFor="postcode" className="text-sm font-medium">Postcode</Label>
                  <Input
                    id="postcode"
                    value={postcode}
                    onChange={(e) => setPostcode(e.target.value)}
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="telephone" className="text-sm font-medium">Telephone</Label>
                  <div className="flex gap-2 mt-2">
                    <Select value={telephoneArea} onValueChange={setTelephoneArea}>
                      <SelectTrigger className="w-20">
                        <SelectValue placeholder="🇬🇧" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="gb">🇬🇧 +44</SelectItem>
                        <SelectItem value="us">🇺🇸 +1</SelectItem>
                      </SelectContent>
                    </Select>
                    <Input
                      id="telephone"
                      value={telephone}
                      onChange={(e) => setTelephone(e.target.value)}
                      className="flex-1"
                    />
                  </div>
                </div>
              </div>

              {/* Area Dropdown */}
              <div className="mb-6">
                <Label htmlFor="areaSelect" className="text-sm font-medium">Area</Label>
                <div className="relative mt-2">
                  <Select>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Please select an option..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="area1">Area 1</SelectItem>
                      <SelectItem value="area2">Area 2</SelectItem>
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

              {/* Site Reference Number */}
              <div className="mb-6">
                <Label htmlFor="siteRef" className="text-sm font-medium flex items-center gap-2">
                  Site Reference Number
                  <Info className="w-4 h-4 text-gray-400" />
                </Label>
                <Input
                  id="siteRef"
                  value={siteReferenceNumber}
                  onChange={(e) => setSiteReferenceNumber(e.target.value)}
                  className="mt-2"
                />
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

        {/* Right Sidebar - Main Contact Person */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Main Contact Person</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="firstName" className="text-sm font-medium">First Name</Label>
                <Input
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="lastName" className="text-sm font-medium">Last Name</Label>
                <Input
                  id="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="mt-1"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="contactTelephone" className="text-sm font-medium">Telephone</Label>
                  <div className="flex gap-1 mt-1">
                    <Select>
                      <SelectTrigger className="w-12 p-1">
                        <SelectValue placeholder="🇬🇧" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="gb">🇬🇧</SelectItem>
                        <SelectItem value="us">🇺🇸</SelectItem>
                      </SelectContent>
                    </Select>
                    <Input
                      id="contactTelephone"
                      value={contactTelephone}
                      onChange={(e) => setContactTelephone(e.target.value)}
                      className="flex-1"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email" className="text-sm font-medium">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="jobPosition" className="text-sm font-medium">Job Position</Label>
                <Input
                  id="jobPosition"
                  value={jobPosition}
                  onChange={(e) => setJobPosition(e.target.value)}
                  className="mt-1"
                />
              </div>

              <div className="mt-4 p-3 bg-blue-50 rounded-lg flex items-start gap-2">
                <Info className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-blue-700">
                  You can add additional contacts in the next page
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
