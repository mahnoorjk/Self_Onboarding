"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  FileText, 
  Target, 
  CreditCard, 
  Plus, 
  TrendingUp, 
  Clock, 
  CheckCircle2,
  AlertCircle,
  DollarSign,
  Users,
  Calendar,
  Filter
} from "lucide-react"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts'

interface DashboardBusinessHealthScreenProps {
  onNavigateToQuote?: () => void
  onNavigateToJob?: () => void
  onNavigateToInvoice?: () => void
  onBack?: () => void
}

// Sample data - in real app this would come from API
// Using consistent color scheme across all charts for similar states
const quotesData = [
  { name: 'Outstanding', value: 8, color: '#3498DB' }, // Blue - Outstanding
  { name: 'Accepted', value: 5, color: '#27AE60' }, // Green - Accepted
  { name: 'Rejected', value: 2, color: '#E74C3C' }, // Red - Rejected
]

const jobsData = [
  { name: 'In Progress', value: 12, color: '#3498DB' }, // Blue - In Progress
  { name: 'Completed', value: 8, color: '#27AE60' }, // Green - Completed (matching Paid/Accepted)
  { name: 'Scheduled', value: 4, color: '#BDC3C7' }, // Gray - Scheduled
]

const invoicesData = [
  { name: 'Outstanding', value: 6, color: '#3498DB' }, // Blue - Outstanding
  { name: 'Paid', value: 14, color: '#27AE60' }, // Green - Paid
  { name: 'Overdue', value: 3, color: '#F39C12' }, // Amber - Overdue
]

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border border-gray-300 rounded-lg shadow-lg">
        <p className="text-base font-semibold text-gray-800">{`${payload[0].name}: ${payload[0].value}`}</p>
      </div>
    )
  }
  return null
}

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
  if (percent < 0.05) return null // Don't show label if slice is too small
  
  const RADIAN = Math.PI / 180
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  const y = cy + radius * Math.sin(-midAngle * RADIAN)

  return (
    <text 
      x={x} 
      y={y} 
      fill="white" 
      textAnchor={x > cx ? 'start' : 'end'} 
      dominantBaseline="central"
      className="text-sm font-bold"
      style={{ fontSize: '14px' }}
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  )
}

export function DashboardBusinessHealthScreen({ 
  onNavigateToQuote, 
  onNavigateToJob, 
  onNavigateToInvoice,
  onBack 
}: DashboardBusinessHealthScreenProps) {
  const totalQuotes = quotesData.reduce((sum, item) => sum + item.value, 0)
  const totalJobs = jobsData.reduce((sum, item) => sum + item.value, 0)
  const totalInvoices = invoicesData.reduce((sum, item) => sum + item.value, 0)

  // Calculate key metrics
  const outstandingQuotesValue = 15420 // £
  const completedJobsValue = 28750 // £
  const outstandingInvoicesValue = 12340 // £

  // Date filter state
  const [dateFilter, setDateFilter] = useState("this-month")

  return (
    <div className="h-full bg-white overflow-auto">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Revenue Tracker</h1>
            <p className="text-gray-600">Track your quotes, jobs, and invoices to maximize revenue</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center">
              <Calendar className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm font-medium text-gray-700">Filter Period:</span>
            <Select value={dateFilter} onValueChange={setDateFilter}>
              <SelectTrigger className="w-48 bg-white border-gray-300">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="this-week">This Week</SelectItem>
                <SelectItem value="this-month">This Month</SelectItem>
                <SelectItem value="last-month">Last Month</SelectItem>
                <SelectItem value="this-quarter">This Quarter</SelectItem>
                <SelectItem value="this-year">This Year</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Key Metrics Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">

          <Card className="border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 font-medium">Revenue</p>
                  <p className="text-2xl font-bold text-gray-900">£{completedJobsValue.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center">
                  <Clock className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 font-medium">Outstanding</p>
                  <p className="text-2xl font-bold text-gray-900">£{outstandingInvoicesValue.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 font-medium">Active Jobs</p>
                  <p className="text-2xl font-bold text-gray-900">{jobsData.find(j => j.name === 'In Progress')?.value || 0}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Quotes Section */}
          <Card className="border-gray-200 shadow-sm">
            <CardHeader className="bg-teal-100 border-b border-teal-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-teal-600 rounded-lg flex items-center justify-center">
                    <FileText className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-teal-700">Quotes</CardTitle>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-teal-700">{totalQuotes}</div>
                  <div className="text-sm text-teal-600">total quotes</div>
                </div>
                {/* <Button 
                  onClick={onNavigateToQuote}
                  className="bg-teal-600 hover:bg-teal-700 text-white shadow-sm"
                  size="sm"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Log Quote
                </Button> */}
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <div className="h-56 mb-4">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={quotesData}
                      cx="50%"
                      cy="45%"
                      labelLine={false}
                      label={renderCustomizedLabel}
                      outerRadius={90}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {quotesData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              
              <div className="space-y-3">
                {quotesData.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-4 h-4 rounded-full" 
                        style={{ backgroundColor: item.color }}
                      ></div>
                      <span className="text-gray-700 text-base font-medium">{item.name}</span>
                    </div>
                    <span className="font-bold text-gray-900 text-lg">{item.value}</span>
                  </div>
                ))}
              </div>

              <div className="mt-4 p-3 bg-teal-100 rounded-lg border border-teal-200">
                <p className="text-sm font-medium text-teal-700">Outstanding Value</p>
                <p className="text-lg font-bold text-teal-800">£{outstandingQuotesValue.toLocaleString()}</p>
              </div>
            </CardContent>
          </Card>

          {/* Jobs Section */}
          <Card className="border-gray-200 shadow-sm">
            <CardHeader className="bg-teal-100 border-b border-teal-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-teal-600 rounded-lg flex items-center justify-center">
                    <Target className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-teal-700">Jobs</CardTitle>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-teal-700">{totalJobs}</div>
                  <div className="text-sm text-teal-600">total jobs</div>
                </div>
                {/* <Button 
                  onClick={onNavigateToJob}
                  className="bg-teal-600 hover:bg-teal-700 text-white shadow-sm"
                  size="sm"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Log Job
                </Button> */}
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <div className="h-56 mb-4">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={jobsData}
                      cx="50%"
                      cy="45%"
                      labelLine={false}
                      label={renderCustomizedLabel}
                      outerRadius={90}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {jobsData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              
              <div className="space-y-3">
                {jobsData.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-4 h-4 rounded-full" 
                        style={{ backgroundColor: item.color }}
                      ></div>
                      <span className="text-gray-700 text-base font-medium">{item.name}</span>
                    </div>
                    <span className="font-bold text-gray-900 text-lg">{item.value}</span>
                  </div>
                ))}
              </div>

              <div className="mt-4 p-3 bg-teal-100 rounded-lg border border-teal-200">
                <p className="text-sm font-medium text-teal-700">Completed Value</p>
                <p className="text-lg font-bold text-teal-800">£{completedJobsValue.toLocaleString()}</p>
              </div>
            </CardContent>
          </Card>

          {/* Invoices Section */}
          <Card className="border-gray-200 shadow-sm">
            <CardHeader className="bg-teal-100 border-b border-teal-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-teal-600 rounded-lg flex items-center justify-center">
                    <CreditCard className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-teal-700">Invoices</CardTitle>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-teal-700">{totalInvoices}</div>
                  <div className="text-sm text-teal-600">total invoices</div>
                </div>
                {/* <Button 
                  className="bg-teal-600 hover:bg-teal-700 text-white shadow-sm"
                  size="sm"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Raise Invoice
                </Button> */}
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <div className="h-56 mb-4">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={invoicesData}
                      cx="50%"
                      cy="45%"
                      labelLine={false}
                      label={renderCustomizedLabel}
                      outerRadius={90}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {invoicesData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              
              <div className="space-y-3">
                {invoicesData.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-4 h-4 rounded-full" 
                        style={{ backgroundColor: item.color }}
                      ></div>
                      <span className="text-gray-700 text-base font-medium">{item.name}</span>
                    </div>
                    <span className="font-bold text-gray-900 text-lg">{item.value}</span>
                  </div>
                ))}
              </div>

              <div className="mt-4 p-3 bg-teal-100 rounded-lg border border-teal-200">
                <p className="text-sm font-medium text-teal-700">Outstanding Value</p>
                <p className="text-lg font-bold text-teal-800">£{outstandingInvoicesValue.toLocaleString()}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Items */}
        <Card className="mt-6 border-yellow-200 bg-gradient-to-r from-yellow-50 to-yellow-100">
          <CardHeader>
            <CardTitle className="text-yellow-700 flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              Action Items
            </CardTitle>
            <CardDescription className="text-yellow-600">
              Focus on these areas to improve your cash flow
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-white rounded-lg border border-yellow-200">
              <div className="w-2 h-2 bg-orange-600 rounded-full mt-2"></div>
              <div>
                <p className="font-medium text-gray-900">Follow up on outstanding quotes</p>
                <p className="text-sm text-gray-600">You have 8 quotes worth £{outstandingQuotesValue.toLocaleString()} waiting for customer response</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-3 bg-white rounded-lg border border-yellow-200">
              <div className="w-2 h-2 bg-red-600 rounded-full mt-2"></div>
              <div>
                <p className="font-medium text-gray-900">Chase overdue invoices</p>
                <p className="text-sm text-gray-600">3 invoices are overdue - follow up to improve cash flow</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-3 bg-white rounded-lg border border-yellow-200">
              <div className="w-2 h-2 bg-teal-600 rounded-full mt-2"></div>
              <div>
                <p className="font-medium text-gray-900">Complete in-progress jobs</p>
                <p className="text-sm text-gray-600">12 jobs are in progress - completing them will unlock more revenue</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}