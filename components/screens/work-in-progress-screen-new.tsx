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
    <div className="container mx-auto max-w-6xl">
      {/* Enhanced Professional Header */}
      <div className="mb-10 text-center">
        <div className="bg-gradient-to-r from-teal-50 to-blue-50 rounded-xl border border-teal-200 p-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-teal-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xl">4</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900">What work do you have right now?</h1>
          </div>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
            We'll use this to set up some practice scenarios for you, so you can try JobLogic 
            with work that feels familiar and realistic.
          </p>
          <div className="flex items-center justify-center space-x-2 text-sm text-teal-700 bg-teal-100 rounded-full px-4 py-2 inline-flex mt-4">
            <span className="w-2 h-2 bg-teal-500 rounded-full"></span>
            <span>This creates realistic training scenarios</span>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto space-y-6">
        {/* Simple Yes/No Question */}
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Do you have any jobs happening this week?</h3>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer" onClick={() => handleWIPToggle(true)}>
                  <input 
                    type="radio" 
                    id="hasJobs" 
                    name="currentWork" 
                    checked={hasWIPJobs} 
                    onChange={() => handleWIPToggle(true)}
                    className="w-4 h-4 text-blue-600" 
                  />
                  <Label htmlFor="hasJobs" className="cursor-pointer">
                    <div>
                      <div className="font-medium">Yes, I have jobs running</div>
                      <div className="text-sm text-gray-500">I'll get real practice with my actual work</div>
                    </div>
                  </Label>
                </div>
                
                <div className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer" onClick={() => handleWIPToggle(false)}>
                  <input 
                    type="radio" 
                    id="noJobs" 
                    name="currentWork" 
                    checked={!hasWIPJobs} 
                    onChange={() => handleWIPToggle(false)}
                    className="w-4 h-4 text-blue-600" 
                  />
                  <Label htmlFor="noJobs" className="cursor-pointer">
                    <div>
                      <div className="font-medium">No active jobs right now</div>
                      <div className="text-sm text-gray-500">I'll start with demo examples</div>
                    </div>
                  </Label>
                </div>
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
                  💡 Don't worry about being exact - we just want to make the practice realistic for you
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
                    ? "We'll help you add a real job into JobLogic so you can see how it works with your actual work."
                    : "We'll walk you through adding a sample job so you can see how everything works."
                  }
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
