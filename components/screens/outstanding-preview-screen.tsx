"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, ArrowLeft, ChevronDown } from "lucide-react"

interface OutstandingPreviewScreenProps {
  onBack: () => void
}

export function OutstandingPreviewScreen({ onBack }: OutstandingPreviewScreenProps) {
  const [searchTerm, setSearchTerm] = useState("")

  const outstandingJobs = [
    {
      id: "PM0000588/001",
      jobStatus: "Allocated",
      visitStatus: "New",
      engineer: "Abdul Basit",
      visitStartDate: "21/07/2025 00:00",
      visitEndDate: "21/07/2025 00:00",
      jobFirstOnSite: "",
      jobDescription: "AC Service - GREE",
      jobSite: "Bill",
      area: "East",
    },
    {
      id: "PM0000588/002",
      jobStatus: "Allocated",
      visitStatus: "Not Sent",
      engineer: "Abdul Basit",
      visitStartDate: "21/08/2025 00:00",
      visitEndDate: "21/08/2025 00:00",
      jobFirstOnSite: "",
      jobDescription: "AC Service - GREE",
      jobSite: "Bill",
      area: "East",
    },
    {
      id: "PM0000588/003",
      jobStatus: "Allocated",
      visitStatus: "Not Sent",
      engineer: "Abdul Basit",
      visitStartDate: "21/09/2025 00:00",
      visitEndDate: "21/09/2025 00:00",
      jobFirstOnSite: "",
      jobDescription: "AC Service - GREE",
      jobSite: "Bill",
      area: "East",
    },
    {
      id: "PM0000588/004",
      jobStatus: "Allocated",
      visitStatus: "Not Sent",
      engineer: "Abdul Basit",
      visitStartDate: "21/10/2025 00:00",
      visitEndDate: "21/10/2025 00:00",
      jobFirstOnSite: "",
      jobDescription: "AC Service - GREE",
      jobSite: "Bill",
      area: "East",
    },
    {
      id: "PM0000588/005",
      jobStatus: "Allocated",
      visitStatus: "Not Sent",
      engineer: "Abdul Basit",
      visitStartDate: "21/11/2025 00:00",
      visitEndDate: "21/11/2025 00:00",
      jobFirstOnSite: "",
      jobDescription: "AC Service - GREE",
      jobSite: "Bill",
      area: "East",
    },
    {
      id: "PM0000588/006",
      jobStatus: "Allocated",
      visitStatus: "Not Sent",
      engineer: "Abdul Basit",
      visitStartDate: "21/12/2025 00:00",
      visitEndDate: "21/12/2025 00:00",
      jobFirstOnSite: "",
      jobDescription: "AC Service - GREE",
      jobSite: "Bill",
      area: "East",
    },
    {
      id: "PM0000588/007",
      jobStatus: "Allocated",
      visitStatus: "Not Sent",
      engineer: "Abdul Basit",
      visitStartDate: "21/01/2026 00:00",
      visitEndDate: "21/01/2026 00:00",
      jobFirstOnSite: "",
      jobDescription: "AC Service - GREE",
      jobSite: "Bill",
      area: "East",
    },
    {
      id: "PM0000588/008",
      jobStatus: "Allocated",
      visitStatus: "Not Sent",
      engineer: "Abdul Basit",
      visitStartDate: "21/02/2026 00:00",
      visitEndDate: "21/02/2026 00:00",
      jobFirstOnSite: "",
      jobDescription: "AC Service - GREE",
      jobSite: "Bill",
      area: "East",
    },
    {
      id: "PM0000588/009",
      jobStatus: "Allocated",
      visitStatus: "Not Sent",
      engineer: "Abdul Basit",
      visitStartDate: "21/03/2026 00:00",
      visitEndDate: "21/03/2026 00:00",
      jobFirstOnSite: "",
      jobDescription: "AC Service - GREE",
      jobSite: "Bill",
      area: "East",
    },
    {
      id: "PM0000588/010",
      jobStatus: "Allocated",
      visitStatus: "Not Sent",
      engineer: "Abdul Basit",
      visitStartDate: "21/04/2026 00:00",
      visitEndDate: "21/04/2026 00:00",
      jobFirstOnSite: "",
      jobDescription: "AC Service - GREE",
      jobSite: "Bill",
      area: "East",
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
              <span className="text-blue-600">JLWeb - Outstanding J...</span>
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
      <div className="bg-white border border-gray-200">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-100 border-b border-gray-200">
              <TableHead className="text-gray-700 font-semibold py-3 px-4 text-left">ID</TableHead>
              <TableHead className="text-gray-700 font-semibold py-3 px-4 text-left">Job Status</TableHead>
              <TableHead className="text-gray-700 font-semibold py-3 px-4 text-left">Visit Status</TableHead>
              <TableHead className="text-gray-700 font-semibold py-3 px-4 text-left">Engineer</TableHead>
              <TableHead className="text-gray-700 font-semibold py-3 px-4 text-left">Visit StartDate</TableHead>
              <TableHead className="text-gray-700 font-semibold py-3 px-4 text-left">Visit EndDate</TableHead>
              <TableHead className="text-gray-700 font-semibold py-3 px-4 text-left">Job - First On Site</TableHead>
              <TableHead className="text-gray-700 font-semibold py-3 px-4 text-left">Job Description</TableHead>
              <TableHead className="text-gray-700 font-semibold py-3 px-4 text-left">Job Site</TableHead>
              <TableHead className="text-gray-700 font-semibold py-3 px-4 text-left">Area</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {outstandingJobs.map((job, index) => (
              <TableRow key={index} className="border-b border-gray-200 hover:bg-gray-50">
                <TableCell className="text-gray-700 py-3 px-4">{job.id}</TableCell>
                <TableCell className="text-gray-700 py-3 px-4">{job.jobStatus}</TableCell>
                <TableCell className="text-gray-700 py-3 px-4">{job.visitStatus}</TableCell>
                <TableCell className="text-blue-600 py-3 px-4 cursor-pointer hover:underline">{job.engineer}</TableCell>
                <TableCell className="text-gray-700 py-3 px-4">{job.visitStartDate}</TableCell>
                <TableCell className="text-gray-700 py-3 px-4">{job.visitEndDate}</TableCell>
                <TableCell className="text-gray-700 py-3 px-4">{job.jobFirstOnSite}</TableCell>
                <TableCell className="text-gray-700 py-3 px-4">{job.jobDescription}</TableCell>
                <TableCell className="text-gray-700 py-3 px-4">{job.jobSite}</TableCell>
                <TableCell className="text-gray-700 py-3 px-4">{job.area}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Pagination */}
        <div className="flex items-center justify-between p-4 border-t border-gray-200">
          <div className="text-sm text-gray-600">Showing 1 to 10 of 10734 entries</div>
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
                  variant={page === 1 ? "default" : "outline"}
                  size="icon"
                  className={`h-8 w-8 ${
                    page === 1
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
