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
  ListChecks,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Mail
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
  const [isFormsExpanded, setIsFormsExpanded] = useState(false)
  const [isDashboardsExpanded, setIsDashboardsExpanded] = useState(false)
  const [isTemplatesExpanded, setIsTemplatesExpanded] = useState(false)
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

  // Get selected forms and dashboards from Your Services screen
  const selectedForms = data.industryConfiguration?.selectedForms || []
  const selectedDashboards = data.industryConfiguration?.selectedDashboards || []
  const selectedIndustries = data.industryConfiguration?.selectedIndustries || []

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
          <CardHeader className="text-center">
            <CardTitle className="text-xl">Why We Need This</CardTitle>
            <CardDescription className="text-base">This helps us customize your system setup and training</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="flex justify-center mb-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-bold text-lg">✓</span>
                    </div>
                  </div>
                  <h4 className="font-semibold text-blue-800 mb-2">Bespoke Guides</h4>
                  <p className="text-sm text-blue-700 leading-relaxed">Scenarios that match your actual workload</p>
                </div>
                <div className="text-center">
                  <div className="flex justify-center mb-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-bold text-lg">✓</span>
                    </div>
                  </div>
                  <h4 className="font-semibold text-blue-800 mb-2">Smart Setup</h4>
                  <p className="text-sm text-blue-700 leading-relaxed">Configure workflows for your business size</p>
                </div>
                <div className="text-center">
                  <div className="flex justify-center mb-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-bold text-lg">✓</span>
                    </div>
                  </div>
                  <h4 className="font-semibold text-blue-800 mb-2">Time Savings</h4>
                  <p className="text-sm text-blue-700 leading-relaxed">Skip features you don't need</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* <Card>
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
        </Card> */}

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

                    {/* <div className="flex items-center justify-between">
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
                    </div> */}
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
{/* 
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
                    </div> */}
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
                <CardTitle>Forms & Documentation Overview</CardTitle>
                <CardDescription>Review your selected forms and dashboard configurations from the Services section</CardDescription>
              </CardHeader>
              <CardContent>
                {selectedIndustries.includes("Electrical Maintenance") ? (
                  <div className="space-y-6">
                    {/* Selected Forms Section */}
                    <div>
                      <div 
                        className="flex items-center justify-between cursor-pointer p-3 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition-colors"
                        onClick={() => setIsFormsExpanded(!isFormsExpanded)}
                      >
                        <div className="flex items-center gap-3">
                          <FileText className="w-5 h-5 text-green-600" />
                          <div>
                            <h4 className="font-semibold text-green-800">Selected Forms</h4>
                            <p className="text-sm text-green-700">{selectedForms.length} forms configured</p>
                          </div>
                        </div>
                        {isFormsExpanded ? (
                          <ChevronUp className="w-5 h-5 text-green-600" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-green-600" />
                        )}
                      </div>
                      
                      {isFormsExpanded && (
                        <div className="mt-3 ml-4 space-y-2">
                          {selectedForms.length > 0 ? (
                            selectedForms.map((form, index) => (
                              <div key={index} className="flex items-center gap-2 text-sm text-gray-700">
                                <CheckCircle className="w-4 h-4 text-green-600" />
                                <span>{form}</span>
                              </div>
                            ))
                          ) : (
                            <p className="text-sm text-gray-500 italic">No forms selected in Your Services</p>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Selected Dashboards Section */}
                    <div>
                      <div 
                        className="flex items-center justify-between cursor-pointer p-3 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors"
                        onClick={() => setIsDashboardsExpanded(!isDashboardsExpanded)}
                      >
                        <div className="flex items-center gap-3">
                          <ListChecks className="w-5 h-5 text-blue-600" />
                          <div>
                            <h4 className="font-semibold text-blue-800">Selected Dashboards</h4>
                            <p className="text-sm text-blue-700">{selectedDashboards.length} dashboards configured</p>
                          </div>
                        </div>
                        {isDashboardsExpanded ? (
                          <ChevronUp className="w-5 h-5 text-blue-600" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-blue-600" />
                        )}
                      </div>
                      
                      {isDashboardsExpanded && (
                        <div className="mt-3 ml-4 space-y-2">
                          {selectedDashboards.length > 0 ? (
                            selectedDashboards.map((dashboard, index) => (
                              <div key={index} className="flex items-center gap-2 text-sm text-gray-700">
                                <CheckCircle className="w-4 h-4 text-blue-600" />
                                <span>{dashboard}</span>
                              </div>
                            ))
                          ) : (
                            <p className="text-sm text-gray-500 italic">No dashboards selected in Your Services</p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h4 className="font-medium text-gray-600 mb-2">No Industry Selected</h4>
                    <p className="text-sm text-gray-500">
                      Please complete the "Your Services" section to see your form and dashboard configurations here.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Document Templates Overview</CardTitle>
                <CardDescription>Review the default templates available in the system for your business documents</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
                  <p className="text-sm text-blue-800">
                    ℹ️ <strong>Default Templates Included</strong> - JobLogic comes with professional templates ready to use
                  </p>
                </div>

                <div>
                  <div 
                    className="flex items-center justify-between cursor-pointer p-3 bg-purple-50 border border-purple-200 rounded-lg hover:bg-purple-100 transition-colors"
                    onClick={() => setIsTemplatesExpanded(!isTemplatesExpanded)}
                  >
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-purple-600" />
                      <div>
                        <h4 className="font-semibold text-purple-800">Available Templates</h4>
                        <p className="text-sm text-purple-700">Professional templates for all document types</p>
                      </div>
                    </div>
                    {isTemplatesExpanded ? (
                      <ChevronUp className="w-5 h-5 text-purple-600" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-purple-600" />
                    )}
                  </div>
                  
                  {isTemplatesExpanded && (
                    <div className="mt-3 space-y-4">
                      {/* Jobsheet Templates */}
                      <div className="bg-white rounded-lg border p-4">
                        <h5 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                          <Clipboard className="w-4 h-4 text-blue-600" />
                          Jobsheet Templates
                        </h5>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {[
                            "Default Jobsheet Template",
                            "Grey and Blue Job Sheet Template", 
                            "Light Tones Job Sheet Template",
                            "Simple Job Sheet Template",
                            "Styled Job Sheet Template",
                            "Traditional Job Sheet Template"
                          ].map((template, index) => (
                            <div key={index} className="flex items-center gap-2 text-sm text-gray-700">
                              <CheckCircle className="w-3 h-3 text-green-600" />
                              <span>{template}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Quote Templates */}
                      <div className="bg-white rounded-lg border p-4">
                        <h5 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                          <FileText className="w-4 h-4 text-blue-600" />
                          Quote Templates
                        </h5>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {[
                            "Blue Transition Quote Template",
                            "Default Quote Template",
                            "Original Blue Quote Template",
                            "Simple Colour Quote Template",
                            "Simple Quote Template",
                            "Traditional Quote Template"
                          ].map((template, index) => (
                            <div key={index} className="flex items-center gap-2 text-sm text-gray-700">
                              <CheckCircle className="w-3 h-3 text-green-600" />
                              <span>{template}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Invoice Templates */}
                      <div className="bg-white rounded-lg border p-4">
                        <h5 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                          <DollarSign className="w-4 h-4 text-blue-600" />
                          Invoice Templates
                        </h5>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {[
                            "Blue Invoice Template",
                            "Dark Blue Invoice Template",
                            "Default Invoice Template",
                            "Direct Sales Invoice Template",
                            "Oceans Invoice Template",
                            "Reverse VAT Invoice Template",
                            "Simple Invoice Template",
                            "Traditional Invoice Template"
                          ].map((template, index) => (
                            <div key={index} className="flex items-center gap-2 text-sm text-gray-700">
                              <CheckCircle className="w-3 h-3 text-green-600" />
                              <span>{template}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Credit Templates */}
                      <div className="bg-white rounded-lg border p-4">
                        <h5 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                          <Edit className="w-4 h-4 text-blue-600" />
                          Credit Templates
                        </h5>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {[
                            "Aqua Credit Template",
                            "Basic Blue Credit Template",
                            "Dark Blue Line Credit Template",
                            "Default Credit Template",
                            "Original Credit Template",
                            "Reverse VAT Credit Template",
                            "Simple Credit Template"
                          ].map((template, index) => (
                            <div key={index} className="flex items-center gap-2 text-sm text-gray-700">
                              <CheckCircle className="w-3 h-3 text-green-600" />
                              <span>{template}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Asset & Task Compliance Templates */}
                      <div className="bg-white rounded-lg border p-4">
                        <h5 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                          <Shield className="w-4 h-4 text-blue-600" />
                          Asset & Task Compliance Templates
                        </h5>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          <div className="flex items-center gap-2 text-sm text-gray-700">
                            <CheckCircle className="w-3 h-3 text-green-600" />
                            <span>Default Asset Task Compliance Template</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Need Custom Solutions?</CardTitle>
                <CardDescription>Get help with bespoke forms and custom templates for your business needs</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <h4 className="font-semibold text-purple-800 mb-4 flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    Professional Services Available
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Professional Development Services */}
                    <div className="space-y-3">
                      <h5 className="font-medium text-purple-800 flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        Professional Development
                      </h5>
                      <div className="space-y-2">
                        <div className="flex items-start gap-3 p-3 bg-white rounded-lg border">
                          <FileText className="w-4 h-4 text-purple-600 mt-0.5" />
                          <div>
                            <h6 className="font-medium text-purple-800 text-sm">Custom Forms</h6>
                            <p className="text-xs text-purple-700">
                              Bespoke forms designed for your specific industry requirements and workflows
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3 p-3 bg-white rounded-lg border">
                          <Clipboard className="w-4 h-4 text-purple-600 mt-0.5" />
                          <div>
                            <h6 className="font-medium text-purple-800 text-sm">Branded Templates</h6>
                            <p className="text-xs text-purple-700">
                              Professional document templates with your company branding and styling
                            </p>
                          </div>
                        </div>
                      </div>
                      <span className="text-xs text-purple-600 font-medium">Chargeable service</span>
                    </div>

                    {/* Self-Service Resources */}
                    <div className="space-y-3">
                      <h5 className="font-medium text-purple-800 flex items-center gap-2">
                        <ExternalLink className="w-4 h-4" />
                        Self-Service Resources
                      </h5>
                      <div className="space-y-2">
                        <div className="flex items-start gap-3 p-3 bg-white rounded-lg border">
                          <FileText className="w-4 h-4 text-purple-600 mt-0.5" />
                          <div>
                            <h6 className="font-medium text-purple-800 text-sm">Form Builder Guides</h6>
                            <p className="text-xs text-purple-700">
                              Step-by-step instructions to create your own custom forms and checklists
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3 p-3 bg-white rounded-lg border">
                          <Clipboard className="w-4 h-4 text-purple-600 mt-0.5" />
                          <div>
                            <h6 className="font-medium text-purple-800 text-sm">Template Customization</h6>
                            <p className="text-xs text-purple-700">
                              Learn how to modify existing templates or create new ones from scratch
                            </p>
                          </div>
                        </div>
                      </div>
                      <span className="text-xs text-purple-600 font-medium">Free resource</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
      </div>
    </div>
  )
}
