"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, ArrowLeft, ChevronDown } from "lucide-react"

interface KpiPreviewScreenProps {
  onBack: () => void
}

export function KpiPreviewScreen({ onBack }: KpiPreviewScreenProps) {
  const [searchTerm, setSearchTerm] = useState("")

  const kpiData = [
    {
      jobId: "M0000147",
      jobDescription: "Test-Dynamic Images",
      orderNumber: "",
      jobStatus: "Allocated",
      dateLogged: "26/12/2023 12:00",
      loggedBy: "Arslan Tariq",
      priority: "",
      jobType: "Maintenance",
      taskType: "",
      customerName: "Sample Customer 1",
      site: "Sample Site 1",
      area: "A4S - South West",
      address1: "Street1",
      address2: "Area1",
      address3: "City 1",
      address4: "Province",
    },
    {
      jobId: "M0000147",
      jobDescription: "Test-Dynamic Images",
      orderNumber: "",
      jobStatus: "Allocated",
      dateLogged: "26/12/2023 12:00",
      loggedBy: "Arslan Tariq",
      priority: "",
      jobType: "Maintenance",
      taskType: "",
      customerName: "Sample Customer 1",
      site: "Sample Site 1",
      area: "A4S - South West",
      address1: "Street1",
      address2: "Area1",
      address3: "City 1",
      address4: "Province",
    },
    {
      jobId: "M0000189",
      jobDescription: "Sample Quote 1",
      orderNumber: "Order",
      jobStatus: "Allocated",
      dateLogged: "05/01/2024 09:21",
      loggedBy: "Hasnain Jamil",
      priority: "",
      jobType: "Maintenance",
      taskType: "",
      customerName: "Sample Customer 1",
      site: "Sample Site 1",
      area: "A4S - South West",
      address1: "Street1",
      address2: "Area1",
      address3: "City 1",
      address4: "Province",
    },
    {
      jobId: "M0000189",
      jobDescription: "Sample Quote 1",
      orderNumber: "Order",
      jobStatus: "Allocated",
      dateLogged: "05/01/2024 09:21",
      loggedBy: "Hasnain Jamil",
      priority: "",
      jobType: "Maintenance",
      taskType: "",
      customerName: "Sample Customer 1",
      site: "Sample Site 1",
      area: "A4S - South West",
      address1: "Street1",
      address2: "Area1",
      address3: "City 1",
      address4: "Province",
    },
    {
      jobId: "M0000189",
      jobDescription: "Sample Quote 1",
      orderNumber: "Order",
      jobStatus: "Allocated",
      dateLogged: "05/01/2024 09:21",
      loggedBy: "Hasnain Jamil",
      priority: "",
      jobType: "Maintenance",
      taskType: "",
      customerName: "Sample Customer 1",
      site: "Sample Site 1",
      area: "A4S - South West",
      address1: "Street1",
      address2: "Area1",
      address3: "City 1",
      address4: "Province",
    },
    {
      jobId: "M0000204",
      jobDescription: "test",
      orderNumber: "",
      jobStatus: "Allocated",
      dateLogged: "09/01/2024 08:25",
      loggedBy: "Iqra Manzoor",
      priority: "",
      jobType: "Maintenance",
      taskType: "",
      customerName: "Sample Customer 1",
      site: "Sample Site 1",
      area: "A4S - South West",
      address1: "Street1",
      address2: "Area1",
      address3: "City 1",
      address4: "Province",
    },
    {
      jobId: "M0000204",
      jobDescription: "test",
      orderNumber: "",
      jobStatus: "Allocated",
      dateLogged: "09/01/2024 08:25",
      loggedBy: "Iqra Manzoor",
      priority: "",
      jobType: "Maintenance",
      taskType: "",
      customerName: "Sample Customer 1",
      site: "Sample Site 1",
      area: "A4S - South West",
      address1: "Street1",
      address2: "Area1",
      address3: "City 1",
      address4: "Province",
    },
    {
      jobId: "M0000209",
      jobDescription: "test",
      orderNumber: "",
      jobStatus: "Allocated",
      dateLogged: "09/01/2024 14:00",
      loggedBy: "Iqra Manzoor",
      priority: "",
      jobType: "Maintenance",
      taskType: "",
      customerName: "Sample Customer 1",
      site: "Sample Site 1",
      area: "A4S - South West",
      address1: "Street1",
      address2: "Area1",
      address3: "City 1",
      address4: "Province",
    },
    {
      jobId: "M0000209",
      jobDescription: "test",
      orderNumber: "",
      jobStatus: "Allocated",
      dateLogged: "09/01/2024 14:00",
      loggedBy: "Iqra Manzoor",
      priority: "",
      jobType: "Maintenance",
      taskType: "",
      customerName: "Sample Customer 1",
      site: "Sample Site 1",
      area: "A4S - South West",
      address1: "Street1",
      address2: "Area1",
      address3: "City 1",
      address4: "Province",
    },
    {
      jobId: "O0000003",
      jobDescription: "Test",
      orderNumber: "",
      jobStatus: "Allocated",
      dateLogged: "18/01/2024 10:17",
      loggedBy: "Junaid Ali",
      priority: "",
      jobType: "Commissioning",
      taskType: "",
      customerName: "Sample Customer 1",
      site: "Sample Site 1",
      area: "A4S - South West",
      address1: "Street1",
      address2: "Area1",
      address3: "City 1",
      address4: "Province",
    },
  ]

  return (
    <div className="p-6 bg-white min-h-full">
      {/* Header Section */}
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={onBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 bg-transparent"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
          <div>
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
              <span className="cursor-pointer hover:text-blue-600" onClick={onBack}>
                Reports
              </span>
              <span>/</span>
              <span className="text-blue-600">JLWeb - KPI Vs Arrival ...</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm">
            + Add Report Template
          </Button>
          <Button className="bg-slate-800 hover:bg-slate-900 text-white px-4 py-2 rounded text-sm">Outbound</Button>
          <Button className="bg-slate-800 hover:bg-slate-900 text-white px-4 py-2 rounded text-sm flex items-center gap-2">
            Share
            <ChevronDown className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Search Section */}
      <div className="mb-6">
        <div className="flex items-end gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
            <Input
              placeholder="Enter search term / ref. No., etc..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-10 bg-white border border-gray-300"
            />
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              className="text-gray-600 border-gray-300 hover:bg-gray-50 px-4 py-2 bg-gray-100 text-sm h-10"
            >
              Reset Filter
            </Button>
            <Button className="bg-slate-800 hover:bg-slate-900 text-white px-6 py-2 text-sm h-10">
              <Search className="w-4 h-4 mr-2" />
              Search
            </Button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-200 overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-100 border-b border-gray-200">
              <TableHead className="text-gray-700 font-semibold py-3 px-4 text-left whitespace-nowrap">
                Job ID
              </TableHead>
              <TableHead className="text-gray-700 font-semibold py-3 px-4 text-left whitespace-nowrap">
                Job Description
              </TableHead>
              <TableHead className="text-gray-700 font-semibold py-3 px-4 text-left whitespace-nowrap">
                Order Number
              </TableHead>
              <TableHead className="text-gray-700 font-semibold py-3 px-4 text-left whitespace-nowrap">
                Job Status
              </TableHead>
              <TableHead className="text-gray-700 font-semibold py-3 px-4 text-left whitespace-nowrap">
                DateLogged
              </TableHead>
              <TableHead className="text-gray-700 font-semibold py-3 px-4 text-left whitespace-nowrap">
                Logged By
              </TableHead>
              <TableHead className="text-gray-700 font-semibold py-3 px-4 text-left whitespace-nowrap">
                Priority
              </TableHead>
              <TableHead className="text-gray-700 font-semibold py-3 px-4 text-left whitespace-nowrap">
                Job Type
              </TableHead>
              <TableHead className="text-gray-700 font-semibold py-3 px-4 text-left whitespace-nowrap">
                Task Type
              </TableHead>
              <TableHead className="text-gray-700 font-semibold py-3 px-4 text-left whitespace-nowrap">
                Customer Name
              </TableHead>
              <TableHead className="text-gray-700 font-semibold py-3 px-4 text-left whitespace-nowrap">Site</TableHead>
              <TableHead className="text-gray-700 font-semibold py-3 px-4 text-left whitespace-nowrap">Area</TableHead>
              <TableHead className="text-gray-700 font-semibold py-3 px-4 text-left whitespace-nowrap">
                Address1
              </TableHead>
              <TableHead className="text-gray-700 font-semibold py-3 px-4 text-left whitespace-nowrap">
                Address2
              </TableHead>
              <TableHead className="text-gray-700 font-semibold py-3 px-4 text-left whitespace-nowrap">
                Address3
              </TableHead>
              <TableHead className="text-gray-700 font-semibold py-3 px-4 text-left whitespace-nowrap">
                Address4
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {kpiData.map((job, index) => (
              <TableRow key={index} className="border-b border-gray-200 hover:bg-gray-50">
                <TableCell className="text-gray-700 py-3 px-4 whitespace-nowrap">{job.jobId}</TableCell>
                <TableCell className="text-gray-700 py-3 px-4 whitespace-nowrap">{job.jobDescription}</TableCell>
                <TableCell className="text-gray-700 py-3 px-4 whitespace-nowrap">{job.orderNumber}</TableCell>
                <TableCell className="text-gray-700 py-3 px-4 whitespace-nowrap">{job.jobStatus}</TableCell>
                <TableCell className="text-gray-700 py-3 px-4 whitespace-nowrap">{job.dateLogged}</TableCell>
                <TableCell className="text-gray-700 py-3 px-4 whitespace-nowrap">{job.loggedBy}</TableCell>
                <TableCell className="text-gray-700 py-3 px-4 whitespace-nowrap">{job.priority}</TableCell>
                <TableCell className="text-gray-700 py-3 px-4 whitespace-nowrap">{job.jobType}</TableCell>
                <TableCell className="text-gray-700 py-3 px-4 whitespace-nowrap">{job.taskType}</TableCell>
                <TableCell className="text-gray-700 py-3 px-4 whitespace-nowrap">{job.customerName}</TableCell>
                <TableCell className="text-gray-700 py-3 px-4 whitespace-nowrap">{job.site}</TableCell>
                <TableCell className="text-gray-700 py-3 px-4 whitespace-nowrap">{job.area}</TableCell>
                <TableCell className="text-gray-700 py-3 px-4 whitespace-nowrap">{job.address1}</TableCell>
                <TableCell className="text-gray-700 py-3 px-4 whitespace-nowrap">{job.address2}</TableCell>
                <TableCell className="text-gray-700 py-3 px-4 whitespace-nowrap">{job.address3}</TableCell>
                <TableCell className="text-gray-700 py-3 px-4 whitespace-nowrap">{job.address4}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Pagination */}
        <div className="flex items-center justify-between p-4 border-t border-gray-200">
          <div className="text-sm text-gray-600">Showing 21 to 30 of 15212 entries</div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Button variant="outline" size="icon" className="h-8 w-8 bg-transparent text-gray-600">
                {"<<"}
              </Button>
              <Button variant="outline" size="icon" className="h-8 w-8 bg-transparent text-gray-600">
                {"<"}
              </Button>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((page) => (
                <Button
                  key={page}
                  variant={page === 3 ? "default" : "outline"}
                  size="icon"
                  className={`h-8 w-8 ${
                    page === 3
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
      </div>
    </div>
  )
}
