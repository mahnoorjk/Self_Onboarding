"use client"

import { useState } from "react"
import { useOnboarding } from "../onboarding-context"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CheckCircle } from "lucide-react"

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
  const [hasWIPJobs, setHasWIPJobs] = useState(data.workInProgress?.hasWIPJobs || false)
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

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Enhanced Professional Header */}
      <div className="text-center space-y-4 bg-gradient-to-r from-teal-50 to-blue-50 rounded-xl border border-teal-200 p-8">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <div className="w-12 h-12 bg-teal-500 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-xl">3</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Add Your Work</h1>
        </div>
        <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
          We'll help you bring your work into Joblogic and get started right away with 
          your actual jobs and workflows.
        </p>
        <div className="flex items-center justify-center space-x-2 text-sm text-teal-700 bg-teal-100 rounded-full px-4 py-2 inline-flex">
          <span className="w-2 h-2 bg-teal-500 rounded-full"></span>
          <span>This helps you set up your live work in Joblogic</span>
        </div>
      </div>

      <div className="space-y-8">
        {/* <div className="max-w-3xl mx-auto space-y-6"> */}
        <div className="max-w-6xl mx-auto space-y-6">
        {/* Enhanced Yes/No Question */}
        <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300">
          <CardContent className="pt-8 pb-6">
            <div className="text-center mb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Do you have any current work - jobs, quotes, or invoices?</h3>
              <p className="text-gray-600">Choose the option that best describes your current situation</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {/* Yes Option */}
              <div 
                className={`relative p-6 border-2 rounded-xl cursor-pointer transition-all duration-300 hover:shadow-lg ${
                  hasWIPJobs 
                    ? 'border-teal-500 bg-teal-50 shadow-md ring-2 ring-teal-100' 
                    : 'border-gray-200 hover:border-teal-300 hover:bg-teal-25'
                }`}
                onClick={() => handleWIPToggle(true)}
              >
                <div className="flex items-start space-x-4">
                  <input 
                    type="radio" 
                    id="hasJobs" 
                    name="currentWork" 
                    checked={hasWIPJobs} 
                    onChange={() => handleWIPToggle(true)}
                    className="w-5 h-5 text-teal-600 mt-1 focus:ring-teal-500" 
                  />
                  <div className="flex-1">
                    <Label htmlFor="hasJobs" className="cursor-pointer">
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="w-8 h-8 bg-teal-100 rounded-lg flex items-center justify-center">
                          <span className="text-teal-600 font-semibold text-sm">✓</span>
                        </div>
                        <div className="font-semibold text-gray-900">Yes, I have current work</div>
                      </div>
                      <div className="text-sm text-gray-600 leading-relaxed">
                        I'll bring my actual work into Joblogic and practice with real scenarios
                      </div>
                    </Label>
                  </div>
                </div>
                {hasWIPJobs && (
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-teal-500 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>

              {/* No Option */}
              <div 
                className={`relative p-6 border-2 rounded-xl cursor-pointer transition-all duration-300 hover:shadow-lg ${
                  !hasWIPJobs 
                    ? 'border-blue-500 bg-blue-50 shadow-md ring-2 ring-blue-100' 
                    : 'border-gray-200 hover:border-blue-300 hover:bg-blue-25'
                }`}
                onClick={() => handleWIPToggle(false)}
              >
                <div className="flex items-start space-x-4">
                  <input 
                    type="radio" 
                    id="noJobs" 
                    name="currentWork" 
                    checked={!hasWIPJobs} 
                    onChange={() => handleWIPToggle(false)}
                    className="w-5 h-5 text-blue-600 mt-1 focus:ring-blue-500" 
                  />
                  <div className="flex-1">
                    <Label htmlFor="noJobs" className="cursor-pointer">
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                          <span className="text-blue-600 font-semibold text-sm">○</span>
                        </div>
                        <div className="font-semibold text-gray-900">No current work right now</div>
                      </div>
                      <div className="text-sm text-gray-600 leading-relaxed">
                        I'll start with demo examples to learn how Joblogic works
                      </div>
                    </Label>
                  </div>
                </div>
                {!hasWIPJobs && (
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Numbers - Only if they have jobs */}
        {hasWIPJobs && (
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold mb-4">Quick numbers (rough estimates are fine)</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="inProgress" className="text-sm font-medium">Jobs in progress</Label>
                  <Input
                    id="inProgress"
                    type="number"
                    min="0"
                    placeholder="0"
                    value={wipCounts.inProgress || ''}
                    onChange={(e) => handleCountChange('inProgress', parseInt(e.target.value) || 0)}
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="scheduled" className="text-sm font-medium">Jobs scheduled</Label>
                  <Input
                    id="scheduled"
                    type="number"
                    min="0"
                    placeholder="0"
                    value={wipCounts.scheduled || ''}
                    onChange={(e) => handleCountChange('scheduled', parseInt(e.target.value) || 0)}
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="pendingQuotes" className="text-sm font-medium">Quotes to send</Label>
                  <Input
                    id="pendingQuotes"
                    type="number"
                    min="0"
                    placeholder="0"
                    value={wipCounts.pendingQuotes || ''}
                    onChange={(e) => handleCountChange('pendingQuotes', parseInt(e.target.value) || 0)}
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="pendingInvoices" className="text-sm font-medium">Invoices to send</Label>
                  <Input
                    id="pendingInvoices"
                    type="number"
                    min="0"
                    placeholder="0"
                    value={wipCounts.pendingInvoices || ''}
                    onChange={(e) => handleCountChange('pendingInvoices', parseInt(e.target.value) || 0)}
                    className="mt-1"
                  />
                </div>
              </div>
              
              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-700">
                  💡 Don't worry about being exact - we just want to help you get started with your real work
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* What happens next */}
        <Card className="border-green-200 bg-green-50">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-green-800">What happens next?</h4>
                <p className="text-sm text-green-700 mt-1">
                  {hasWIPJobs 
                    ? "We'll help you add your real work into Joblogic so you can start using it right away."
                    : "We'll walk you through adding sample work so you can see how everything works."
                  }
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        </div>
      </div>
    </div>
  )
}
