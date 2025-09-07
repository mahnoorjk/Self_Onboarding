"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Search,
  ArrowRight,
  Star,
  Download,
  ExternalLink,
  Package,
  Zap,
  DollarSign,
  Users,
  BarChart3,
  Smartphone,
  FileText,
  Settings,
  Brain,
  Truck,
  Calculator,
  MapPin,
  Clock,
  Shield,
  Wifi
} from "lucide-react"

// Mock data based on the Joblogic Marketplace screenshot
const recommendedApps = [
  {
    id: "accountsiq",
    name: "AccountsIQ",
    icon: "AIO",
    description: "Powerful cloud accounting software with seamless Joblogic integration, real-time insights, and comprehensive financial management.",
    category: "Finance Team",
    subscribed: false,
    featured: true
  },
  {
    id: "api-access",
    name: "API Access",
    icon: "API",
    description: "Seamlessly integrate Joblogic with third-party systems using the API Access app. This powerful tool enables custom connections and automation.",
    category: "Integration",
    subscribed: false,
    featured: true
  },
  {
    id: "carriage",
    name: "Carriage Apportionment",
    icon: "$",
    description: "Automatically distribute delivery charges across items in a Purchase Order. Carriage Apportionment ensures accurate costing and improved margins.",
    category: "Finance Team",
    subscribed: false,
    featured: true
  },
  {
    id: "facilities",
    name: "Industry Pack - Facilities Management",
    icon: "FM",
    description: "The Facilities Management industry pack comes fully packed with comprehensive dashboards, key performance indicators, and specialized tools.",
    category: "Industry Specific",
    subscribed: false,
    featured: true
  }
]

const featuredApps = [
  {
    id: "log-job-email",
    name: "Log Job via Email",
    description: "Instantly convert emails to Jobs in Joblogic with minimal set-up required.",
    subscribed: true,
    category: "Productivity",
    image: "/placeholder.jpg",
    color: "from-purple-500 to-pink-500"
  },
  {
    id: "subcontractor-portal",
    name: "Efficient Management with Subcontractor Portal",
    description: "The Subcontractor Portal streamlines the work processes used to manage subcontractors, reducing admin tasks while improving efficiency.",
    subscribed: true,
    category: "Team Management",
    image: "/placeholder.jpg",
    color: "from-blue-500 to-indigo-500"
  },
  {
    id: "vehicle-tracking",
    name: "Vehicle Tracking",
    description: "Real-time & historical location tracking of engineers' vehicle locations.",
    subscribed: true,
    category: "Fleet Management",
    image: "/placeholder.jpg",
    color: "from-blue-600 to-blue-800"
  }
]

const categories = [
  "All Categories",
  "Most Popular Apps",
  "AI",
  "Accounting & Finance",
  "Communication",
  "Customer Management",
  "Data Analysis",
  "Document Management",
  "Fleet Management",
  "Industry Specific",
  "Integration",
  "Mobile",
  "Productivity",
  "Reporting",
  "Team Management"
]

const recommendedFor = [
  "Contract Manager",
  "Finance Team", 
  "Fleet Management Team",
  "Non-Specific",
  "Project Manager",
  "Service Delivery Team"
]

export function MarketplaceScreen() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All Categories")
  const [selectedRole, setSelectedRole] = useState("All Roles")

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Joblogic Marketplace</h1>
            <p className="text-gray-600">Enhance your business with booster Apps</p>
          </div>
          <div className="hidden lg:block">
            <div className="w-48 h-24 bg-gradient-to-r from-teal-100 to-blue-100 rounded-lg flex items-center justify-center">
              <div className="flex space-x-2">
                <div className="w-8 h-8 bg-red-400 rounded transform rotate-12"></div>
                <div className="w-8 h-8 bg-blue-400 rounded transform -rotate-12"></div>
                <div className="w-8 h-8 bg-green-400 rounded transform rotate-6"></div>
                <div className="w-8 h-8 bg-yellow-400 rounded transform -rotate-6"></div>
              </div>
            </div>
          </div>
        </div>

        <Button className="bg-teal-600 hover:bg-teal-700 text-white">
          <Package className="w-4 h-4 mr-2" />
          Explore All Apps
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="mb-8">
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search apps..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 w-full max-w-md"
          />
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="recommended" className="space-y-6">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="recommended">Recommended</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="installed">My Apps</TabsTrigger>
        </TabsList>

        <TabsContent value="recommended" className="space-y-8">
          {/* Recommended for you */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Recommended for you</h2>
              <Button variant="ghost" size="sm" className="text-teal-600 hover:text-teal-700">
                View all <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {recommendedApps.map((app) => (
                <Card key={app.id} className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-teal-600 rounded-lg flex items-center justify-center text-white font-bold">
                        {app.icon}
                      </div>
                      {app.featured && (
                        <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                          Featured
                        </Badge>
                      )}
                    </div>
                    <CardTitle className="text-sm font-semibold">{app.name}</CardTitle>
                    <Badge variant="outline" className="w-fit text-xs">
                      {app.category}
                    </Badge>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <CardDescription className="text-xs text-gray-600 mb-3">
                      {app.description}
                    </CardDescription>
                    <Button 
                      size="sm" 
                      className="w-full bg-teal-600 hover:bg-teal-700 text-white"
                    >
                      {app.subscribed ? "Manage" : "Install"}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Featured Apps */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Featured Applications</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredApps.map((app) => (
                <Card key={app.id} className="overflow-hidden hover:shadow-lg transition-all cursor-pointer">
                  <div className={`h-32 bg-gradient-to-r ${app.color} relative`}>
                    <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                    <div className="absolute bottom-4 left-4 text-white">
                      <h3 className="font-semibold text-lg">{app.name.split(' ').slice(0, 2).join(' ')}</h3>
                      {app.name.split(' ').length > 2 && (
                        <p className="text-sm opacity-90">{app.name.split(' ').slice(2).join(' ')}</p>
                      )}
                    </div>
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-white text-gray-800">
                        {app.subscribed ? "Subscribed" : "Available"}
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <CardDescription className="text-sm text-gray-600 mb-3">
                      {app.description}
                    </CardDescription>
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="text-xs">
                        {app.category}
                      </Badge>
                      <Button variant="ghost" size="sm" className="text-teal-600 hover:text-teal-700">
                        View details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* AI Apps Section */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Brain className="w-5 h-5 text-purple-600" />
                <h2 className="text-xl font-semibold text-gray-900">AI (3)</h2>
              </div>
              <Button variant="ghost" size="sm" className="text-teal-600 hover:text-teal-700">
                See All
              </Button>
            </div>
            
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-6 border border-purple-200">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                  <Brain className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">AI-Powered Business Intelligence</h3>
                  <p className="text-gray-600 text-sm mb-2">
                    Unlock insights from your business data with advanced AI analytics and predictive modeling.
                  </p>
                  <Badge className="bg-purple-100 text-purple-800">Coming Soon</Badge>
                </div>
                <Button className="bg-purple-600 hover:bg-purple-700">
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="categories" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.slice(2).map((category, index) => {
              const icons = [Brain, DollarSign, Users, Users, BarChart3, FileText, Truck, Package, Zap, Smartphone, Settings, BarChart3, Users]
              const Icon = icons[index] || Package
              
              return (
                <Card key={category} className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center">
                        <Icon className="w-5 h-5 text-teal-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{category}</h3>
                        <p className="text-sm text-gray-600">
                          {Math.floor(Math.random() * 10) + 1} apps
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        <TabsContent value="installed" className="space-y-6">
          <div className="text-center py-12">
            <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Apps Installed Yet</h3>
            <p className="text-gray-600 mb-6">
              Browse our marketplace to find apps that can enhance your business workflow.
            </p>
            <Button className="bg-teal-600 hover:bg-teal-700">
              Browse Marketplace
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
