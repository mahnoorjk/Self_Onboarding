"use client"

import { useState } from "react"
import { useOnboarding } from "../onboarding-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { 
  Wrench, 
  Calendar, 
  MapPin, 
  User, 
  Clock, 
  FileText, 
  CheckCircle,
  TrendingUp,
  DollarSign,
  AlertTriangle,
  Edit,
  Clipboard,
  Check,
  X,
  CalendarX,
  Shield,
  ListChecks
} from "lucide-react"

interface WIPCounts {
  totalJobs: number
  inProgress: number
  scheduled: number
  onHold: number
  awaitingParts: number
  emergency: number
  maintenance: number
  installation: number
  repair: number
  pendingInvoices: number
  overdueInvoices: number
  paidInvoices: number
  draftInvoices: number
  pendingQuotes: number
  approvedQuotes: number
  rejectedQuotes: number
  expiredQuotes: number
  safetyForms: number
  customChecklists: number
  documentTemplates: number
}

export function WorkInProgressScreen() {
  const { data, updateData } = useOnboarding()
  const [hasWIPJobs, setHasWIPJobs] = useState(false)
  const [wipCounts, setWipCounts] = useState<WIPCounts>({
    totalJobs: 0,
    inProgress: 0,
    scheduled: 0,
    onHold: 0,
    awaitingParts: 0,
    emergency: 0,
    maintenance: 0,
    installation: 0,
    repair: 0,
    pendingInvoices: 0,
    overdueInvoices: 0,
    paidInvoices: 0,
    draftInvoices: 0,
    pendingQuotes: 0,
    approvedQuotes: 0,
    rejectedQuotes: 0,
    expiredQuotes: 0,
    safetyForms: 0,
    customChecklists: 0,
    documentTemplates: 0
  })

  const handleWIPToggle = (checked: boolean) => {
    setHasWIPJobs(checked)
    if (!checked) {
      setWipCounts({
        totalJobs: 0,
        inProgress: 0,
        scheduled: 0,
        onHold: 0,
        awaitingParts: 0,
        emergency: 0,
        maintenance: 0,
        installation: 0,
        repair: 0,
        pendingInvoices: 0,
        overdueInvoices: 0,
        paidInvoices: 0,
        draftInvoices: 0,
        pendingQuotes: 0,
        approvedQuotes: 0,
        rejectedQuotes: 0,
        expiredQuotes: 0,
        safetyForms: 0,
        customChecklists: 0,
        documentTemplates: 0
      })
    }
    updateData("workInProgress", {
      hasWIPJobs: checked,
      counts: checked ? wipCounts : null
    })
  }

  const handleCountChange = (field: keyof WIPCounts, value: number) => {
    const updatedCounts = { ...wipCounts, [field]: value }
    setWipCounts(updatedCounts)
    updateData("workInProgress", {
      hasWIPJobs: hasWIPJobs,
      counts: updatedCounts
    })
  }

  const getTotalByStatus = () => {
    return wipCounts.inProgress + wipCounts.scheduled + wipCounts.onHold + wipCounts.awaitingParts
  }

  const getTotalByType = () => {
    return wipCounts.emergency + wipCounts.maintenance + wipCounts.installation + wipCounts.repair
  }

  const getTotalInvoices = () => {
    return wipCounts.pendingInvoices + wipCounts.overdueInvoices + wipCounts.paidInvoices + wipCounts.draftInvoices
  }

  const getTotalQuotes = () => {
    return wipCounts.pendingQuotes + wipCounts.approvedQuotes + wipCounts.rejectedQuotes + wipCounts.expiredQuotes
  }

  const getTotalForms = () => {
    return wipCounts.safetyForms + wipCounts.customChecklists
  }

  return (
    <div className="container mx-auto max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Work in Progress</h1>
        <p className="text-gray-600">
          Help us understand your current workload to tailor your learning experience and system setup.
        </p>
      </div>

      <div className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Why We Need This</CardTitle>
            <CardDescription>This helps us customize your system setup and training</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-blue-800 mb-2">✓ Custom Training</h4>
                  <p className="text-sm text-blue-700">Scenarios that match your actual workload</p>
                </div>
                <div>
                  <h4 className="font-medium text-blue-800 mb-2">✓ Smart Setup</h4>
                  <p className="text-sm text-blue-700">Configure workflows for your business size</p>
                </div>
                <div>
                  <h4 className="font-medium text-blue-800 mb-2">✓ Better Reports</h4>
                  <p className="text-sm text-blue-700">Track what matters most to you</p>
                </div>
                <div>
                  <h4 className="font-medium text-blue-800 mb-2">✓ Time Savings</h4>
                  <p className="text-sm text-blue-700">Skip features you don't need</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>When Did These Jobs Start?</CardTitle>
            <CardDescription>The numbers you're about to enter - when did most of these jobs begin?</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3">
                <input type="radio" id="recent" name="timeline" value="recent" className="text-blue-600 w-4 h-4" />
                <Label htmlFor="recent" className="text-base cursor-pointer">Within the last month</Label>
              </div>
              <div className="flex items-center space-x-3">
                <input type="radio" id="older" name="timeline" value="older" className="text-blue-600 w-4 h-4" />
                <Label htmlFor="older" className="text-base cursor-pointer">More than a month ago</Label>
              </div>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
              <p className="text-sm text-blue-800 font-medium">
                💡 This helps us set up your system correctly - no wrong answer!
              </p>
            </div>
          </CardContent>
        </Card>

        {/* <Card>
          <CardHeader>
            <CardTitle>Current Work Status</CardTitle>
            <CardDescription>
              Do you have any jobs currently in progress or scheduled?
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex items-start space-x-3">
                <Checkbox
                  id="hasWIP"
                  checked={hasWIPJobs}
                  onCheckedChange={handleWIPToggle}
                  className="mt-1"
                />
                <div className="space-y-1">
                  <Label htmlFor="hasWIP" className="font-medium">
                    Yes, I have current jobs to track
                  </Label>
                  <p className="text-sm text-gray-600">
                    Understanding your current workload helps us customize your training and system setup
                  </p>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-blue-800">Enhanced Learning Experience</h4>
                    <p className="text-sm text-blue-700 mt-1">
                      We'll use this information to create realistic training scenarios that match your actual workload patterns.
                      Later, you'll be able to add detailed job information for hands-on practice.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card> */}

        <Card>
          <CardHeader>
            <CardTitle>Job Status Overview</CardTitle>
            <CardDescription>How many jobs do you currently have in each status? (Only fill out what applies to you)</CardDescription>
          </CardHeader>
              <CardContent>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
                  <p className="text-sm text-yellow-800">
                    ℹ️ <strong>Skip any that don't apply</strong> - Only enter numbers for job types you actually have
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-blue-600" />
                        <Label htmlFor="inProgress">In Progress</Label>
                      </div>
                      <Input
                        id="inProgress"
                        type="number"
                        min="0"
                        value={wipCounts.inProgress}
                        onChange={(e) => handleCountChange('inProgress', parseInt(e.target.value) || 0)}
                        className="w-20 text-center"
                        placeholder="0"
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-green-600" />
                        <Label htmlFor="scheduled">Scheduled</Label>
                      </div>
                      <Input
                        id="scheduled"
                        type="number"
                        min="0"
                        value={wipCounts.scheduled}
                        onChange={(e) => handleCountChange('scheduled', parseInt(e.target.value) || 0)}
                        className="w-20 text-center"
                        placeholder="0"
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-yellow-600" />
                        <Label htmlFor="onHold">On Hold</Label>
                      </div>
                      <Input
                        id="onHold"
                        type="number"
                        min="0"
                        value={wipCounts.onHold}
                        onChange={(e) => handleCountChange('onHold', parseInt(e.target.value) || 0)}
                        className="w-20 text-center"
                        placeholder="0"
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Wrench className="w-4 h-4 text-red-600" />
                        <Label htmlFor="awaitingParts">Awaiting Parts</Label>
                      </div>
                      <Input
                        id="awaitingParts"
                        type="number"
                        min="0"
                        value={wipCounts.awaitingParts}
                        onChange={(e) => handleCountChange('awaitingParts', parseInt(e.target.value) || 0)}
                        className="w-20 text-center"
                        placeholder="0"
                      />
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-3">Status Summary</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Total by Status:</span>
                        <span className="font-medium">{getTotalByStatus()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Currently Active:</span>
                        <span className="font-medium text-blue-600">{wipCounts.inProgress}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Upcoming:</span>
                        <span className="font-medium text-green-600">{wipCounts.scheduled}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quote Status Overview</CardTitle>
                <CardDescription>What's the status of your quotes and estimates? (Leave blank if you don't do quotes)</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
                  <p className="text-sm text-yellow-800">
                    ℹ️ <strong>Don't do quotes?</strong> Just skip this section - it's totally optional
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Clipboard className="w-4 h-4 text-blue-600" />
                        <Label htmlFor="pendingQuotes">Pending Review</Label>
                      </div>
                      <Input
                        id="pendingQuotes"
                        type="number"
                        min="0"
                        value={wipCounts.pendingQuotes}
                        onChange={(e) => handleCountChange('pendingQuotes', parseInt(e.target.value) || 0)}
                        className="w-20 text-center"
                        placeholder="0"
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-green-600" />
                        <Label htmlFor="approvedQuotes">Approved</Label>
                      </div>
                      <Input
                        id="approvedQuotes"
                        type="number"
                        min="0"
                        value={wipCounts.approvedQuotes}
                        onChange={(e) => handleCountChange('approvedQuotes', parseInt(e.target.value) || 0)}
                        className="w-20 text-center"
                        placeholder="0"
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <X className="w-4 h-4 text-red-600" />
                        <Label htmlFor="rejectedQuotes">Rejected</Label>
                      </div>
                      <Input
                        id="rejectedQuotes"
                        type="number"
                        min="0"
                        value={wipCounts.rejectedQuotes}
                        onChange={(e) => handleCountChange('rejectedQuotes', parseInt(e.target.value) || 0)}
                        className="w-20 text-center"
                        placeholder="0"
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CalendarX className="w-4 h-4 text-gray-600" />
                        <Label htmlFor="expiredQuotes">Expired</Label>
                      </div>
                      <Input
                        id="expiredQuotes"
                        type="number"
                        min="0"
                        value={wipCounts.expiredQuotes}
                        onChange={(e) => handleCountChange('expiredQuotes', parseInt(e.target.value) || 0)}
                        className="w-20 text-center"
                        placeholder="0"
                      />
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-3">Quote Summary</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Total Quotes:</span>
                        <span className="font-medium">{getTotalQuotes()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Awaiting Response:</span>
                        <span className="font-medium text-blue-600">{wipCounts.pendingQuotes}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Conversion Rate:</span>
                        <span className="font-medium text-green-600">
                          {getTotalQuotes() > 0 ? Math.round((wipCounts.approvedQuotes / getTotalQuotes()) * 100) : 0}%
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Need Follow-up:</span>
                        <span className="font-medium text-orange-600">{wipCounts.expiredQuotes}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Invoice Status Overview</CardTitle>
                <CardDescription>What's the status of your invoicing and payments? (Add invoice details where applicable)</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
                  <p className="text-sm text-yellow-800">
                    ℹ️ <strong>Add invoice details where applicable</strong> - Only fill out the types of invoices you actually have
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Edit className="w-4 h-4 text-gray-600" />
                        <Label htmlFor="draftInvoices">Draft Invoices</Label>
                      </div>
                      <Input
                        id="draftInvoices"
                        type="number"
                        min="0"
                        value={wipCounts.draftInvoices}
                        onChange={(e) => handleCountChange('draftInvoices', parseInt(e.target.value) || 0)}
                        className="w-20 text-center"
                        placeholder="0"
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-orange-600" />
                        <Label htmlFor="pendingInvoices">Pending Payment</Label>
                      </div>
                      <Input
                        id="pendingInvoices"
                        type="number"
                        min="0"
                        value={wipCounts.pendingInvoices}
                        onChange={(e) => handleCountChange('pendingInvoices', parseInt(e.target.value) || 0)}
                        className="w-20 text-center"
                        placeholder="0"
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 text-red-600" />
                        <Label htmlFor="overdueInvoices">Overdue</Label>
                      </div>
                      <Input
                        id="overdueInvoices"
                        type="number"
                        min="0"
                        value={wipCounts.overdueInvoices}
                        onChange={(e) => handleCountChange('overdueInvoices', parseInt(e.target.value) || 0)}
                        className="w-20 text-center"
                        placeholder="0"
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4 text-green-600" />
                        <Label htmlFor="paidInvoices">Paid</Label>
                      </div>
                      <Input
                        id="paidInvoices"
                        type="number"
                        min="0"
                        value={wipCounts.paidInvoices}
                        onChange={(e) => handleCountChange('paidInvoices', parseInt(e.target.value) || 0)}
                        className="w-20 text-center"
                        placeholder="0"
                      />
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-3">Invoice Summary</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Total Invoices:</span>
                        <span className="font-medium">{getTotalInvoices()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Awaiting Payment:</span>
                        <span className="font-medium text-orange-600">{wipCounts.pendingInvoices}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Overdue:</span>
                        <span className="font-medium text-red-600">{wipCounts.overdueInvoices}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Collection Rate:</span>
                        <span className="font-medium text-green-600">
                          {getTotalInvoices() > 0 ? Math.round((wipCounts.paidInvoices / getTotalInvoices()) * 100) : 0}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Forms & Documentation</CardTitle>
                <CardDescription>How many specialized forms do you use? (Only if you use safety forms or checklists)</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
                  <p className="text-sm text-yellow-800">
                    ℹ️ <strong>No special forms?</strong> Many businesses don't use these - just put 0 or skip
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-red-600" />
                      <Label htmlFor="safetyForms">Safety & Compliance Forms</Label>
                    </div>
                    <Input
                      id="safetyForms"
                      type="number"
                      min="0"
                      value={wipCounts.safetyForms}
                      onChange={(e) => handleCountChange('safetyForms', parseInt(e.target.value) || 0)}
                      className="w-20 text-center"
                      placeholder="0"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <ListChecks className="w-4 h-4 text-blue-600" />
                      <Label htmlFor="customChecklists">Custom Checklists & Documents</Label>
                    </div>
                    <Input
                      id="customChecklists"
                      type="number"
                      min="0"
                      value={wipCounts.customChecklists}
                      onChange={(e) => handleCountChange('customChecklists', parseInt(e.target.value) || 0)}
                      className="w-20 text-center"
                      placeholder="0"
                    />
                  </div>

                  <div className="bg-gray-50 rounded-lg p-3 mt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Total Forms:</span>
                      <span className="font-medium">{wipCounts.safetyForms + wipCounts.customChecklists}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      We'll help digitize these forms for streamlined workflows
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Document Templates</CardTitle>
                <CardDescription>How many custom templates do you want? (Only if you want branded documents)</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
                  <p className="text-sm text-yellow-800">
                    ℹ️ <strong>Happy with basic templates?</strong> Put 0 - you can always add custom ones later
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-purple-600" />
                      <Label htmlFor="documentTemplates">Custom Templates</Label>
                    </div>
                    <Input
                      id="documentTemplates"
                      type="number"
                      min="0"
                      value={wipCounts.documentTemplates}
                      onChange={(e) => handleCountChange('documentTemplates', parseInt(e.target.value) || 0)}
                      className="w-20 text-center"
                      placeholder="0"
                    />
                  </div>

                  <div className="bg-gray-50 rounded-lg p-3 mt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Templates to Create:</span>
                      <span className="font-medium">{wipCounts.documentTemplates}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      We'll help you design professional templates for invoices, quotes, and certificates
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
      </div>
    </div>
  )
}
