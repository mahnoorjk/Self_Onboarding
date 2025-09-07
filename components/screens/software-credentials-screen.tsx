"use client"

import { useState } from "react"
import { useOnboarding } from "../onboarding-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Eye, EyeOff, Shield, AlertCircle, Calendar, Clock } from "lucide-react"

const supportedSoftware = [
  { id: "quickbooks", name: "QuickBooks", type: "Accounting" },
  { id: "xero", name: "Xero", type: "Accounting" },
  { id: "sage", name: "Sage", type: "Accounting" },
  { id: "servicem8", name: "ServiceM8", type: "Field Service" },
  { id: "fieldedge", name: "FieldEdge", type: "Field Service" },
  { id: "housecall", name: "HouseCall Pro", type: "Field Service" },
  { id: "custom", name: "Other/Custom System", type: "Custom" },
]

export function SoftwareCredentialsScreen() {
  const { data, updateData } = useOnboarding()
  const [selectedSoftware, setSelectedSoftware] = useState("")
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
    apiKey: "",
    serverUrl: "",
    database: "",
    additionalInfo: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [has2FA, setHas2FA] = useState(false)
  const [preferredDate, setPreferredDate] = useState("")
  const [preferredTime, setPreferredTime] = useState("")

  // Only show this screen if user needs import and selected software credentials method
  if (!data.dataImport.needsImport || data.dataImport.importMethod !== "software-credentials") {
    return null
  }

  const handleSoftwareChange = (software: string) => {
    setSelectedSoftware(software)
    updateData("dataImport", {
      credentials: { ...credentials, software },
    })
  }

  const handleCredentialChange = (field: string, value: string) => {
    const newCredentials = { ...credentials, [field]: value }
    setCredentials(newCredentials)
    updateData("dataImport", { 
      credentials: newCredentials,
      has2FA,
      preferredDate,
      preferredTime
    })
  }

  const handle2FAChange = (checked: boolean) => {
    setHas2FA(checked)
    updateData("dataImport", { 
      credentials,
      has2FA: checked,
      preferredDate,
      preferredTime
    })
  }

  const selectedSoftwareInfo = supportedSoftware.find((s) => s.id === selectedSoftware)

  return (
    <div className="container mx-auto max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Software Credentials</h1>
        <p className="text-gray-600">Provide credentials for your existing software to enable data transfer.</p>
      </div>

      <div className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Select Your Software</CardTitle>
            <CardDescription>Choose the software system you want to transfer data from</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Label htmlFor="software">Software System</Label>
              <Select value={selectedSoftware} onValueChange={handleSoftwareChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your software" />
                </SelectTrigger>
                <SelectContent>
                  {supportedSoftware.map((software) => (
                    <SelectItem key={software.id} value={software.id}>
                      <div className="flex items-center gap-2">
                        {software.name}
                        <Badge variant="outline" className="text-xs">
                          {software.type}
                        </Badge>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {selectedSoftware && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-green-600" />
                Connection Details
              </CardTitle>
              <CardDescription>
                Enter your {selectedSoftwareInfo?.name} credentials to establish the connection
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-yellow-800">Security Notice</h4>
                      <p className="text-sm text-yellow-700 mt-1">
                        Your credentials are encrypted and stored securely. They will only be used for data transfer and
                        can be removed after the process is complete.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="username">Username/Email</Label>
                    <Input
                      id="username"
                      type="text"
                      value={credentials.username}
                      onChange={(e) => handleCredentialChange("username", e.target.value)}
                      placeholder="Enter your username or email"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={credentials.password}
                        onChange={(e) => handleCredentialChange("password", e.target.value)}
                        placeholder="Enter your password"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>

                  {selectedSoftware !== "custom" && (
                    <div className="space-y-2">
                      <Label htmlFor="apiKey">API Key (if applicable)</Label>
                      <Input
                        id="apiKey"
                        type="text"
                        value={credentials.apiKey}
                        onChange={(e) => handleCredentialChange("apiKey", e.target.value)}
                        placeholder="Enter API key if required"
                      />
                    </div>
                  )}

                  {selectedSoftware === "custom" && (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="serverUrl">Server URL</Label>
                        <Input
                          id="serverUrl"
                          type="url"
                          value={credentials.serverUrl}
                          onChange={(e) => handleCredentialChange("serverUrl", e.target.value)}
                          placeholder="https://your-server.com"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="database">Database Name</Label>
                        <Input
                          id="database"
                          type="text"
                          value={credentials.database}
                          onChange={(e) => handleCredentialChange("database", e.target.value)}
                          placeholder="Database name"
                        />
                      </div>
                    </>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="additionalInfo">Additional Information</Label>
                  <Textarea
                    id="additionalInfo"
                    value={credentials.additionalInfo}
                    onChange={(e) => handleCredentialChange("additionalInfo", e.target.value)}
                    placeholder="Please provide any additional information that might help us access your data (e.g., server details, API keys, etc.)"
                    rows={4}
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="has2fa"
                      checked={has2FA}
                      onCheckedChange={handle2FAChange}
                      className="mt-1"
                    />
                    <div className="space-y-1">
                      <Label htmlFor="has2fa" className="font-medium">
                        This software has 2FA (Two-Factor Authentication) enabled or requires special assistance
                      </Label>
                    </div>
                  </div>

                  {has2FA && (
                    <div className="bg-pink-50 border border-pink-200 rounded-lg p-4">
                      <div className="flex items-start gap-2 mb-4">
                        <Calendar className="w-5 h-5 text-pink-600 mt-0.5" />
                        <p className="text-sm text-pink-800">
                          Please schedule a time for our team to assist with real-time data extraction.
                        </p>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="preferredDate">Preferred Date *</Label>
                          <Input
                            id="preferredDate"
                            type="date"
                            value={preferredDate}
                            onChange={(e) => setPreferredDate(e.target.value)}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="preferredTime">Preferred Time *</Label>
                          <Input
                            id="preferredTime"
                            type="time"
                            value={preferredTime}
                            onChange={(e) => setPreferredTime(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                        <h4 className="font-medium text-yellow-800 mb-2">Important Information:</h4>
                        <ul className="text-sm text-yellow-700 space-y-1">
                          <li>• Our team will contact you at your scheduled time to assist with the data extraction</li>
                          <li>• Please ensure you have access to your software and any 2FA devices</li>
                        </ul>
                      </div>
                      
                      <div className="mt-4 p-3 bg-orange-50 border border-orange-200 rounded-md">
                        <p className="text-sm text-orange-800 font-medium">
                          Please provide all required credential information (software name, email, and password).
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex gap-4">
                  <Button variant="outline" className="flex-1 bg-transparent">
                    Test Connection
                  </Button>
                  <Button className="flex-1 bg-teal-600 hover:bg-teal-700">Save Credentials</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
