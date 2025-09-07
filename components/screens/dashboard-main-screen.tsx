"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Info } from "lucide-react"

export function DashboardMainScreen() {
  return (
    <div className="h-full bg-gray-50 overflow-auto">
      <div className="p-6">
        {/* Top Row - Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* Job Overview */}
          <Card className="rounded-lg overflow-hidden">
            <CardHeader className="bg-[#073948] rounded-t-lg">
              <CardTitle className="text-white text-lg">Job Overview</CardTitle>
            </CardHeader>
            <CardContent className="bg-white text-[#073948] space-y-3 border-0 rounded-b-lg">
              <div className="flex justify-between items-center">
                <span className="text-sm">Outstanding</span>
                <span className="text-lg font-bold">(3)</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Require Invoicing</span>
                <span className="text-lg font-bold">(0)</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Invoiced</span>
                <span className="text-lg font-bold">(0)</span>
              </div>
              <div className="flex justify-between items-center border-t border-gray-300 pt-2">
                <span className="text-sm">Total jobs to date</span>
                <span className="text-lg font-bold">(3)</span>
              </div>
            </CardContent>
          </Card>

          {/* Jobs Logged */}
          <Card className="rounded-lg overflow-hidden">
            <CardHeader className="bg-[#073948] rounded-t-lg">
              <CardTitle className="text-white text-lg">Jobs Logged</CardTitle>
            </CardHeader>
            <CardContent className="bg-white text-[#073948] space-y-3 rounded-b-lg">
              <div className="flex justify-between items-center">
                <span className="text-sm">Logged today</span>
                <span className="text-lg font-bold">(3)</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Logged in last 7 days</span>
                <span className="text-lg font-bold">(3)</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Logged in last 30 days</span>
                <span className="text-lg font-bold">(3)</span>
              </div>
              <div className="flex justify-between items-center border-t border-gray-300 pt-2">
                <span className="text-sm">Total jobs logged to date</span>
                <span className="text-lg font-bold">(3)</span>
              </div>
            </CardContent>
          </Card>

          {/* Jobs Completed */}
          <Card className="rounded-lg overflow-hidden">
            <CardHeader className="bg-[#073948] rounded-t-lg">
              <CardTitle className="text-white text-lg">Jobs Completed</CardTitle>
            </CardHeader>
            <CardContent className="bg-white text-[#073948] space-y-3 rounded-b-lg">
              <div className="flex justify-between items-center">
                <span className="text-sm">Completed today</span>
                <span className="text-lg font-bold">(0)</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Completed in last 7 days</span>
                <span className="text-lg font-bold">(0)</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Completed in last 30 days</span>
                <span className="text-lg font-bold">(0)</span>
              </div>
              <div className="flex justify-between items-center border-t border-gray-300 pt-2">
                <span className="text-sm">Total jobs completed to date</span>
                <span className="text-lg font-bold">(0)</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Second Row - Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Outstanding Jobs vs Completed Jobs */}
          <Card className="rounded-lg overflow-hidden">
            <CardHeader className="bg-[#073948] flex flex-row items-center justify-between rounded-t-lg">
              <CardTitle className="text-white text-lg flex items-center gap-2">
                Outstanding Jobs vs Completed Jobs
                <Info className="w-4 h-4" />
              </CardTitle>
            </CardHeader>
            <CardContent className="bg-white text-[#073948] rounded-b-lg">
              <div className="grid grid-cols-3 gap-4">
                {/* Today */}
                <div className="text-center">
                  <div className="text-sm mb-2">Today</div>
                  <div className="relative w-20 h-20 mx-auto">
                    <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 36 36">
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#fbbf24"
                        strokeWidth="3"
                        strokeDasharray="100, 100"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-xs font-bold">3/0</span>
                    </div>
                  </div>
                </div>

                {/* Last 7 Days */}
                <div className="text-center">
                  <div className="text-sm mb-2">Last 7 Days</div>
                  <div className="relative w-20 h-20 mx-auto">
                    <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 36 36">
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#fbbf24"
                        strokeWidth="3"
                        strokeDasharray="100, 100"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-xs font-bold">3/0</span>
                    </div>
                  </div>
                </div>

                {/* Last 30 Days */}
                <div className="text-center">
                  <div className="text-sm mb-2">Last 30 Days</div>
                  <div className="relative w-20 h-20 mx-auto">
                    <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 36 36">
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#fbbf24"
                        strokeWidth="3"
                        strokeDasharray="100, 100"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-xs font-bold">3/0</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-center gap-6 mt-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-teal-400 rounded-sm"></div>
                  <span className="text-xs">Complete</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-yellow-400 rounded-sm"></div>
                  <span className="text-xs">Outstanding</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* First Time Fixes */}
          <Card className="rounded-lg overflow-hidden">
            <CardHeader className="bg-[#073948] flex flex-row items-center justify-between rounded-t-lg">
              <CardTitle className="text-white text-lg flex items-center gap-2">
                First Time Fixes
                <Info className="w-4 h-4" />
              </CardTitle>
            </CardHeader>
            <CardContent className="bg-white text-[#073948] rounded-b-lg">
              <div className="grid grid-cols-2 gap-8">
                {/* Last 30 Days */}
                <div className="text-center">
                  <div className="text-sm mb-2">Last 30 Days</div>
                  <div className="relative w-20 h-20 mx-auto">
                    <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 36 36">
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#6b7280"
                        strokeWidth="3"
                        strokeDasharray="0, 100"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-xs font-bold">0/0</span>
                    </div>
                  </div>
                </div>

                {/* All Time */}
                <div className="text-center">
                  <div className="text-sm mb-2">All Time</div>
                  <div className="relative w-20 h-20 mx-auto">
                    <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 36 36">
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#6b7280"
                        strokeWidth="3"
                        strokeDasharray="0, 100"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-xs font-bold">0/0</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-center gap-6 mt-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-teal-400 rounded-sm"></div>
                  <span className="text-xs">First Time</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-yellow-400 rounded-sm"></div>
                  <span className="text-xs">Not First Time</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Third Row - Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Job Types */}
          <Card className="rounded-lg overflow-hidden">
            <CardHeader className="bg-[#073948] flex flex-row items-center justify-between rounded-t-lg">
              <CardTitle className="text-white text-lg flex items-center gap-2">
                Top Job Types (All Time)
                <Info className="w-4 h-4" />
              </CardTitle>
            </CardHeader>
            <CardContent className="bg-white text-[#073948] rounded-b-lg">
              <div className="space-y-4">
                <div className="text-sm text-gray-500">Job Count</div>
                <div className="relative h-32">
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
                    <div className="w-16 bg-teal-400 rounded-t" style={{ height: "80px" }}></div>
                    <div className="text-center mt-2 text-xs">Maintenance</div>
                  </div>
                  <div className="absolute left-0 bottom-0 text-xs space-y-2">
                    <div>3.0</div>
                    <div>2.5</div>
                    <div>2.0</div>
                    <div>1.5</div>
                    <div>1.0</div>
                    <div>0.5</div>
                    <div>0</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Job Trends */}
          <Card className="rounded-lg overflow-hidden">
            <CardHeader className="bg-[#073948] flex flex-row items-center justify-between rounded-t-lg">
              <CardTitle className="text-white text-lg flex items-center gap-2">
                Job Trends
                <Info className="w-4 h-4" />
              </CardTitle>
            </CardHeader>
            <CardContent className="bg-white text-[#073948] rounded-b-lg">
              <div className="space-y-4">
                <div className="text-sm text-gray-500">Job Count</div>
                <div className="h-32 flex items-center justify-center">
                  <div className="text-center text-sm text-gray-500">
                    <div className="mb-2">Please Note:</div>
                    <div>You need two months of jobs before this chart will be displayed.</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
