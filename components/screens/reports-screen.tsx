"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { Search, Eye, Mail, Plus, Link } from "lucide-react"
import { KpiPreviewScreen } from "./kpi-preview-screen"
import { OutstandingPreviewScreen } from "./outstanding-preview-screen"

export function ReportsScreen() {
  const [selectedCategory, setSelectedCategory] = useState("")
  const [scheduleStatus, setScheduleStatus] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [showKpiPreview, setShowKpiPreview] = useState(false)
  const [showOutstandingPreview, setShowOutstandingPreview] = useState(false)

  const reports = [
    {
      category: "JLWeb",
      name: "All Customers",
      scheduledExport: true,
      hasLink: true,
      preview: true,
      favourite: false,
    },
    {
      category: "JLWeb",
      name: "All Equipment",
      scheduledExport: true,
      hasLink: false,
      preview: true,
      favourite: false,
    },
    {
      category: "JLWeb",
      name: "All Vehicles Info",
      scheduledExport: true,
      hasLink: false,
      preview: true,
      favourite: false,
    },
    {
      category: "JLWeb",
      name: "Outstanding Jobs by Engineer",
      scheduledExport: true,
      hasLink: false,
      preview: true,
      favourite: false,
      isOutstandingReport: true,
    },
    {
      category: "JLWeb",
      name: "KPI VS priority with business hours",
      scheduledExport: true,
      hasLink: false,
      preview: true,
      favourite: false,
      isKpiReport: true,
    },
    {
      category: "JLWeb",
      name: "All in Job",
      scheduledExport: true,
      hasLink: false,
      preview: true,
      favourite: false,
    },
    {
      category: "JLWeb",
      name: "All in Reqs. Invoice",
      scheduledExport: true,
      hasLink: false,
      preview: true,
      favourite: false,
    },
    {
      category: "JLWeb",
      name: "All Invoices",
      scheduledExport: true,
      hasLink: false,
      preview: true,
      favourite: false,
    },
    {
      category: "JLWeb",
      name: "All Job Tasks",
      scheduledExport: true,
      hasLink: false,
      preview: true,
      favourite: false,
    },
    {
      category: "JLWeb",
      name: "All Jobs",
      scheduledExport: true,
      hasLink: true,
      preview: true,
      favourite: false,
    },
  ]

  const handlePreviewClick = (report: any) => {
    if (report.isKpiReport) {
      setShowKpiPreview(true)
    } else if (report.isOutstandingReport) {
      setShowOutstandingPreview(true)
    }
  }

  const handleBackFromKpiPreview = () => {
    setShowKpiPreview(false)
  }

  const handleBackFromOutstandingPreview = () => {
    setShowOutstandingPreview(false)
  }

  if (showKpiPreview) {
    return <KpiPreviewScreen onBack={handleBackFromKpiPreview} />
  }

  if (showOutstandingPreview) {
    return <OutstandingPreviewScreen onBack={handleBackFromOutstandingPreview} />
  }

  return (
    <div className="p-6 bg-white min-h-full">
      {/* Header Section */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800 mb-2">Reports</h1>
          <p className="text-gray-600 text-sm">
            Preview and select the reports that suit your reporting requirements best. All reports can be exported as
            CSV.
          </p>
        </div>
        <Button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Create Dynamic Dashboard
        </Button>
      </div>

      {/* Filter Section */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Select reports by category</label>
            <Select onValueChange={setSelectedCategory} value={selectedCategory}>
              <SelectTrigger className="w-full h-10 text-gray-500 bg-white border border-gray-300">
                <SelectValue placeholder="Please select option(s)" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="jlweb">JLWeb</SelectItem>
                <SelectItem value="category2">Category 2</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Schedule Status</label>
            <Select onValueChange={setScheduleStatus} value={scheduleStatus}>
              <SelectTrigger className="w-full h-10 text-gray-500 bg-white border border-gray-300">
                <SelectValue placeholder="Please select an option..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
            <Input
              placeholder="Enter search term / ref. No., etc..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-10 bg-white border border-gray-300"
            />
          </div>
          <div className="flex justify-end gap-3 pt-6">
            <Button
              variant="outline"
              className="text-gray-600 border-gray-300 hover:bg-gray-50 px-4 py-2 bg-gray-100 text-sm"
            >
              Reset Filter
            </Button>
            <Button className="bg-slate-800 hover:bg-slate-900 text-white px-6 py-2 text-sm">
              <Search className="w-4 h-4 mr-2" />
              Search
            </Button>
          </div>
        </div>
      </div>

      {/* Tabs and Table */}
      <div className="w-full">
        <Tabs defaultValue="all-reports" className="w-full">
          <TabsList className="grid w-full grid-cols-3 h-12 bg-slate-700 text-white rounded-none p-0">
            <TabsTrigger
              value="all-reports"
              className="data-[state=active]:bg-cyan-500 data-[state=active]:text-white data-[state=active]:shadow-none text-white hover:bg-slate-600 rounded-none font-medium text-sm h-full"
            >
              All Reports (462)
            </TabsTrigger>
            <TabsTrigger
              value="favourite-reports"
              className="data-[state=active]:bg-cyan-500 data-[state=active]:text-white data-[state=active]:shadow-none text-white hover:bg-slate-600 rounded-none font-medium text-sm h-full"
            >
              Favourite Reports (0)
            </TabsTrigger>
            <TabsTrigger
              value="dynamic-dashboard"
              className="data-[state=active]:bg-cyan-500 data-[state=active]:text-white data-[state=active]:shadow-none text-white hover:bg-slate-600 rounded-none font-medium text-sm h-full"
            >
              Dynamic Dashboard (222)
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all-reports" className="p-0 mt-0">
            <div className="bg-white border border-gray-200">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-100 border-b border-gray-200">
                    <TableHead className="w-[100px] text-gray-700 font-semibold py-3 px-4 text-left">
                      Category
                    </TableHead>
                    <TableHead className="text-gray-700 font-semibold py-3 px-4 text-left">Report Name</TableHead>
                    <TableHead className="w-[150px] text-center text-gray-700 font-semibold py-3 px-4">
                      Scheduled Export
                    </TableHead>
                    <TableHead className="w-[100px] text-center text-gray-700 font-semibold py-3 px-4">
                      Preview
                    </TableHead>
                    <TableHead className="w-[150px] text-center text-gray-700 font-semibold py-3 px-4">
                      Add to Favourite
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {reports.map((report, index) => (
                    <TableRow key={index} className="border-b border-gray-200 hover:bg-gray-50">
                      <TableCell className="font-medium text-gray-800 py-3 px-4">{report.category}</TableCell>
                      <TableCell className="text-gray-700 py-3 px-4">{report.name}</TableCell>
                      <TableCell className="text-center py-3 px-4">
                        <div className="flex items-center justify-center gap-2">
                          <Mail className="w-4 h-4 text-blue-600" />
                          <Checkbox
                            checked={report.scheduledExport}
                            className="w-4 h-4 rounded border-gray-400 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white"
                          />
                          {report.hasLink && <Link className="w-4 h-4 text-blue-600" />}
                        </div>
                      </TableCell>
                      <TableCell className="text-center py-3 px-4">
                        <Eye
                          className="w-4 h-4 text-blue-600 mx-auto cursor-pointer hover:text-blue-800"
                          onClick={() => handlePreviewClick(report)}
                        />
                      </TableCell>
                      <TableCell className="text-center py-3 px-4">
                        <Checkbox
                          checked={report.favourite}
                          className="w-4 h-4 rounded border-gray-400 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white"
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {/* Pagination */}
              <div className="flex items-center justify-between p-4 border-t border-gray-200">
                <div className="flex items-center gap-1">
                  <Button variant="outline" size="icon" className="h-8 w-8 bg-transparent text-gray-600">
                    {"<<"}
                  </Button>
                  <Button variant="outline" size="icon" className="h-8 w-8 bg-transparent text-gray-600">
                    {"<"}
                  </Button>
                  {[17, 18, 19, 20, 21, 22, 23, 24, 25, 26].map((page) => (
                    <Button
                      key={page}
                      variant={page === 22 ? "default" : "outline"}
                      size="icon"
                      className={`h-8 w-8 ${
                        page === 22
                          ? "bg-cyan-500 text-white hover:bg-cyan-600 border-cyan-500"
                          : "bg-transparent text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      {page}
                    </Button>
                  ))}
                  <span className="text-gray-400 px-2">...</span>
                  <Button variant="outline" size="icon" className="h-8 w-8 bg-transparent text-gray-600">
                    {">"}
                  </Button>
                  <Button variant="outline" size="icon" className="h-8 w-8 bg-transparent text-gray-600">
                    {">>"}
                  </Button>
                </div>
                <Select defaultValue="10">
                  <SelectTrigger className="w-[140px] h-8 text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10">10 Results per page</SelectItem>
                    <SelectItem value="20">20 Results per page</SelectItem>
                    <SelectItem value="50">50 Results per page</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="favourite-reports" className="p-6 bg-white border border-gray-200">
            <div className="text-center text-gray-500">No favourite reports found.</div>
          </TabsContent>

          <TabsContent value="dynamic-dashboard" className="p-6 bg-white border border-gray-200">
            <div className="text-center text-gray-500">Dynamic Dashboard content goes here.</div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
