"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import Image from "next/image"

interface RegistrationScreenProps {
  onBeginTrial: (userData: RegistrationData) => void
}

interface RegistrationData {
  name: string
  email: string
  companyName: string
  mobileNumber: string
  countryCode: string
}

export function RegistrationScreen({ onBeginTrial }: RegistrationScreenProps) {
  const [formData, setFormData] = useState<RegistrationData>({
    name: "",
    email: "",
    companyName: "",
    mobileNumber: "",
    countryCode: "+44"
  })
  const [acceptedTerms, setAcceptedTerms] = useState(false)
  const [imageError, setImageError] = useState(true) // Show diagram by default

  const handleInputChange = (field: keyof RegistrationData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (acceptedTerms && formData.name && formData.email && formData.companyName && formData.mobileNumber) {
      onBeginTrial(formData)
    }
  }

  const isFormValid = formData.name && formData.email && formData.companyName && formData.mobileNumber && acceptedTerms

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-4 bg-white border-b border-gray-200">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <div className="w-2 h-8 bg-blue-500 rounded-sm"></div>
            <div className="w-2 h-8 bg-green-500 rounded-sm"></div>
            <div className="w-2 h-8 bg-orange-500 rounded-sm"></div>
            <div className="w-2 h-8 bg-teal-500 rounded-sm"></div>
          </div>
          <span className="text-xl font-bold text-gray-800 ml-3">joblogic®</span>
        </div>
        <nav className="hidden lg:flex items-center gap-8">
          <div className="flex items-center gap-1 text-gray-700 hover:text-blue-600 cursor-pointer font-medium">
            <span>Products</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          <div className="flex items-center gap-1 text-gray-700 hover:text-blue-600 cursor-pointer font-medium">
            <span>Industries</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          <div className="flex items-center gap-1 text-gray-700 hover:text-blue-600 cursor-pointer font-medium">
            <span>Features</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          <div className="flex items-center gap-1 text-gray-700 hover:text-blue-600 cursor-pointer font-medium">
            <span>Pricing</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          <div className="flex items-center gap-1 text-gray-700 hover:text-blue-600 cursor-pointer font-medium">
            <span>Resources</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </nav>
        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-2 text-sm text-blue-600">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span className="font-medium">info@joblogic.com</span>
          </div>
          <div className="hidden md:flex items-center gap-2 text-sm text-blue-600">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <span className="font-medium">0800 326 5561</span>
          </div>
          <Button className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-6 py-2.5 rounded">
            Book Demo
          </Button>
          <Button className="bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 font-semibold px-6 py-2.5 rounded">
            Start Trial
          </Button>
          <Button variant="ghost" className="text-blue-600 hover:text-blue-700 font-semibold px-4 py-2.5">
            Login
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex min-h-[calc(100vh-80px)]">
        {/* Left Side - Hero Content */}
        <div className="flex-1 flex items-center justify-center p-12 bg-gradient-to-br from-gray-50 to-white">
          <div className="max-w-4xl">
            <h1 className="text-4xl lg:text-5xl font-bold text-slate-800 leading-tight mb-6">
              Get Verified to Start Your Free Trial Now
            </h1>
            <p className="text-lg text-slate-600 mb-12 max-w-2xl leading-relaxed">
              Discover how Joblogic can help streamline your field service operations and grow your business.
            </p>
            
            {/* Dashboard Image */}
            <div className="relative max-w-5xl">
              {!imageError && (
                <Image
                  src="/dashboard-devices.png"
                  alt="JobLogic Dashboard displayed on multiple devices - laptop, tablet and phone showing comprehensive field service management interface with KPI charts, job management, and real-time data"
                  width={1000}
                  height={600}
                  className="w-full h-auto object-contain drop-shadow-2xl"
                  priority
                  onError={() => setImageError(true)}
                />
              )}
              
              {/* Fallback Multi-Device Dashboard Diagram */}
              {imageError && (
                <div className="relative drop-shadow-2xl">
                  <div className="relative flex items-end justify-center gap-8 p-8">
                    {/* Desktop/Laptop */}
                    <div className="relative">
                      {/* Laptop Screen */}
                      <div className="w-80 h-52 bg-gray-900 rounded-t-lg border-4 border-gray-800 relative overflow-hidden">
                        <div className="w-full h-full bg-gradient-to-br from-blue-50 to-white p-3">
                          {/* Top Navigation */}
                          <div className="flex items-center gap-2 mb-3">
                            <div className="w-16 h-2 bg-blue-500 rounded"></div>
                            <div className="w-12 h-2 bg-green-500 rounded"></div>
                            <div className="w-10 h-2 bg-orange-500 rounded"></div>
                          </div>
                          
                          {/* Dashboard Content */}
                          <div className="grid grid-cols-3 gap-2 mb-3">
                            <div className="bg-blue-100 rounded p-2 h-12">
                              <div className="w-8 h-2 bg-blue-500 rounded mb-1"></div>
                              <div className="w-12 h-1 bg-blue-300 rounded"></div>
                            </div>
                            <div className="bg-green-100 rounded p-2 h-12">
                              <div className="w-8 h-2 bg-green-500 rounded mb-1"></div>
                              <div className="w-12 h-1 bg-green-300 rounded"></div>
                            </div>
                            <div className="bg-orange-100 rounded p-2 h-12">
                              <div className="w-8 h-2 bg-orange-500 rounded mb-1"></div>
                              <div className="w-12 h-1 bg-orange-300 rounded"></div>
                            </div>
                          </div>
                          
                          {/* Charts Area */}
                          <div className="grid grid-cols-2 gap-2">
                            <div className="bg-white rounded shadow-sm p-2 h-20">
                              <div className="flex items-end gap-1 h-12">
                                <div className="w-2 bg-blue-400 rounded-t" style={{height: '60%'}}></div>
                                <div className="w-2 bg-blue-400 rounded-t" style={{height: '80%'}}></div>
                                <div className="w-2 bg-blue-400 rounded-t" style={{height: '40%'}}></div>
                                <div className="w-2 bg-blue-400 rounded-t" style={{height: '90%'}}></div>
                                <div className="w-2 bg-blue-400 rounded-t" style={{height: '70%'}}></div>
                              </div>
                            </div>
                            <div className="bg-white rounded shadow-sm p-2 h-20 flex items-center justify-center">
                              <div className="w-12 h-12 border-4 border-green-400 rounded-full border-t-green-600"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* Laptop Base */}
                      <div className="w-96 h-4 bg-gray-300 rounded-b-lg relative">
                        <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-8 h-2 bg-gray-400 rounded"></div>
                      </div>
                    </div>

                    {/* Tablet */}
                    <div className="relative -ml-12 z-10">
                      <div className="w-48 h-64 bg-gray-800 rounded-lg border-4 border-gray-700 relative overflow-hidden">
                        <div className="w-full h-full bg-gradient-to-br from-blue-50 to-white p-2">
                          {/* Mobile Navigation */}
                          <div className="flex items-center justify-between mb-2">
                            <div className="w-8 h-1.5 bg-blue-500 rounded"></div>
                            <div className="flex gap-1">
                              <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                              <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                              <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                            </div>
                          </div>
                          
                          {/* Mobile Content */}
                          <div className="space-y-2">
                            <div className="bg-white rounded shadow-sm p-2 h-12">
                              <div className="w-16 h-1.5 bg-blue-400 rounded mb-1"></div>
                              <div className="w-20 h-1 bg-gray-300 rounded"></div>
                            </div>
                            <div className="bg-white rounded shadow-sm p-2 h-12">
                              <div className="w-16 h-1.5 bg-green-400 rounded mb-1"></div>
                              <div className="w-20 h-1 bg-gray-300 rounded"></div>
                            </div>
                            <div className="bg-white rounded shadow-sm p-2 h-16">
                              <div className="flex items-end gap-1 h-8">
                                <div className="w-1.5 bg-blue-400 rounded-t" style={{height: '50%'}}></div>
                                <div className="w-1.5 bg-blue-400 rounded-t" style={{height: '80%'}}></div>
                                <div className="w-1.5 bg-blue-400 rounded-t" style={{height: '30%'}}></div>
                                <div className="w-1.5 bg-blue-400 rounded-t" style={{height: '90%'}}></div>
                                <div className="w-1.5 bg-blue-400 rounded-t" style={{height: '60%'}}></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Phone */}
                    <div className="relative -ml-8 z-20">
                      <div className="w-32 h-56 bg-gray-800 rounded-2xl border-4 border-gray-700 relative overflow-hidden">
                        <div className="w-full h-full bg-gradient-to-br from-blue-50 to-white p-2">
                          {/* Phone Status Bar */}
                          <div className="flex justify-between items-center mb-2">
                            <div className="w-6 h-1 bg-gray-400 rounded"></div>
                            <div className="flex gap-1">
                              <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                              <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                              <div className="w-3 h-1 bg-gray-400 rounded"></div>
                            </div>
                          </div>
                          
                          {/* Phone Content */}
                          <div className="space-y-1.5">
                            <div className="bg-white rounded shadow-sm p-1.5 h-8">
                              <div className="w-12 h-1 bg-blue-400 rounded mb-1"></div>
                              <div className="w-16 h-0.5 bg-gray-300 rounded"></div>
                            </div>
                            <div className="bg-white rounded shadow-sm p-1.5 h-8">
                              <div className="w-12 h-1 bg-green-400 rounded mb-1"></div>
                              <div className="w-16 h-0.5 bg-gray-300 rounded"></div>
                            </div>
                            <div className="bg-white rounded shadow-sm p-1.5 h-12 flex items-center justify-center">
                              <div className="w-6 h-6 border-2 border-orange-400 rounded-full border-t-orange-600"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Background Elements */}
                  <div className="absolute inset-0 -z-10">
                    <div className="absolute top-10 left-10 w-32 h-32 bg-blue-100 rounded-full opacity-20"></div>
                    <div className="absolute bottom-20 right-16 w-24 h-24 bg-green-100 rounded-full opacity-20"></div>
                    <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-orange-100 rounded-full opacity-20"></div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Side - Registration Form */}
        <div className="w-[500px] bg-white p-12 border-l border-gray-200">
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">
              Start Your Free Trial, No Credit Card Required.
            </h2>
            <p className="text-slate-600 text-base leading-relaxed">
              Creating an account will begin a 14 day free, no obligation trial with all the features and support you require.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Field */}
            <div>
              <Label htmlFor="name" className="text-sm font-semibold text-slate-700 mb-2 block">
                Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="Type here"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="w-full h-12 border-gray-300 rounded-lg text-base focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>

            {/* Email Field */}
            <div>
              <Label htmlFor="email" className="text-sm font-semibold text-slate-700 mb-2 block">
                Email Address <span className="text-red-500">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Type here"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="w-full h-12 border-gray-300 rounded-lg text-base focus:border-blue-500 focus:ring-blue-500"
                required
              />
              <p className="text-xs text-slate-500 mt-2">
                No spam. Your information will never be sold or shared.
              </p>
            </div>

            {/* Company Name Field */}
            <div>
              <Label htmlFor="companyName" className="text-sm font-semibold text-slate-700 mb-2 block">
                Company Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="companyName"
                type="text"
                placeholder="Type here"
                value={formData.companyName}
                onChange={(e) => handleInputChange('companyName', e.target.value)}
                className="w-full h-12 border-gray-300 rounded-lg text-base focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>

            {/* Mobile Number Field */}
            <div>
              <Label htmlFor="mobileNumber" className="text-sm font-semibold text-slate-700 mb-2 block">
                Mobile Number <span className="text-red-500">*</span>
              </Label>
              <div className="flex gap-3">
                <div className="flex items-center gap-2 h-12 px-4 border border-gray-300 rounded-lg bg-white min-w-[110px]">
                  <span className="text-lg">🇬🇧</span>
                  <select
                    value={formData.countryCode}
                    onChange={(e) => handleInputChange('countryCode', e.target.value)}
                    className="bg-transparent border-none outline-none text-base font-medium"
                  >
                    <option value="+44">+44</option>
                    <option value="+1">+1</option>
                    <option value="+33">+33</option>
                    <option value="+49">+49</option>
                  </select>
                </div>
                <Input
                  id="mobileNumber"
                  type="tel"
                  placeholder="Type here"
                  value={formData.mobileNumber}
                  onChange={(e) => handleInputChange('mobileNumber', e.target.value)}
                  className="flex-1 h-12 border-gray-300 rounded-lg text-base focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            {/* reCAPTCHA */}
            <div className="flex items-center justify-between py-6">
              <div className="flex items-center gap-3">
                <Checkbox
                  id="recaptcha"
                  checked={acceptedTerms}
                  onCheckedChange={(checked) => setAcceptedTerms(checked as boolean)}
                  className="w-5 h-5 border-2 border-gray-400 data-[state=checked]:bg-blue-600"
                />
                <Label htmlFor="recaptcha" className="text-sm text-slate-700 font-medium">
                  I'm not a robot
                </Label>
              </div>
              <div className="flex items-center">
                <div className="w-16 h-16 border-2 border-gray-300 rounded bg-gray-50 flex flex-col items-center justify-center relative">
                  <div className="absolute top-1 right-1">
                    <div className="w-3 h-3 border border-gray-400 rounded-sm bg-white flex items-center justify-center">
                      {acceptedTerms && <div className="w-1.5 h-1.5 bg-green-500 rounded-sm"></div>}
                    </div>
                  </div>
                  <div className="text-xs text-gray-600 text-center mt-1">
                    <div className="font-bold text-[10px]">reCAPTCHA</div>
                    <div className="text-[8px] text-gray-500">Privacy - Terms</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <Button 
              type="submit" 
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-4 text-lg rounded-lg mt-8 shadow-sm"
              disabled={!isFormValid}
            >
              Begin Trial →
            </Button>

            {/* Terms and Conditions */}
            <div className="text-xs text-slate-500 space-y-3 leading-relaxed mt-8">
              <p>
                By continuing you are agreeing to our{" "}
                <a href="#" className="text-blue-600 hover:underline">Terms & Conditions</a>{" "}
                and{" "}
                <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>.
              </p>
              <p>
                Please note, our free trial is only available in the English language. For any international queries regarding non-English speaking users, please contact us at{" "}
                <a href="mailto:info@joblogic.com" className="text-blue-600 hover:underline">info@joblogic.com</a>.
              </p>
            </div>
          </form>
        </div>
      </div>

      {/* Cookie Settings */}
      <div className="fixed bottom-6 left-6">
        <Button 
          variant="outline" 
          className="bg-slate-800 text-white border-slate-600 hover:bg-slate-700 px-5 py-2.5 rounded-lg font-medium"
        >
          Cookie Settings
        </Button>
      </div>

      {/* Live Chat */}
      <div className="fixed bottom-6 right-6">
        <Button 
          className="bg-green-500 hover:bg-green-600 text-white rounded-full w-16 h-16 p-0 shadow-xl flex items-center justify-center"
        >
          <span className="text-xl">💬</span>
        </Button>
      </div>
    </div>
  )
}
