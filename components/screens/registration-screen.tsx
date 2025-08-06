"use client"

import { useState } from "react"
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
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-3 bg-white shadow-sm">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <div className="w-6 h-6 bg-blue-500 transform rotate-45"></div>
            <div className="w-6 h-6 bg-teal-500 transform rotate-45 -ml-3"></div>
          </div>
          <span className="text-2xl font-bold text-gray-800 ml-2">joblogic</span>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          <div className="flex items-center gap-1 text-gray-700 hover:text-gray-900 cursor-pointer">
            <span>Products</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          <div className="flex items-center gap-1 text-gray-700 hover:text-gray-900 cursor-pointer">
            <span>Industries</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          <div className="flex items-center gap-1 text-gray-700 hover:text-gray-900 cursor-pointer">
            <span>Features</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          <div className="flex items-center gap-1 text-gray-700 hover:text-gray-900 cursor-pointer">
            <span>Pricing</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          <div className="flex items-center gap-1 text-gray-700 hover:text-gray-900 cursor-pointer">
            <span>Resources</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </nav>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span>info@joblogic.com</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <span>0800 326 5561</span>
          </div>
          <Button className="bg-yellow-400 hover:bg-yellow-500 text-black font-medium px-6 py-2 rounded-md">
            Book Demo
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md">
            Start Trial
          </Button>
          <Button variant="ghost" className="text-gray-700 hover:text-gray-900 px-4 py-2">
            Login
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex min-h-[calc(100vh-64px)]">
        {/* Left Side - Hero Content */}
        <div className="flex-1 flex items-center justify-center p-16 bg-gray-100">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold text-gray-800 leading-tight mb-8">
              Get Verified to Start Your Free Trial Now
            </h1>
            <p className="text-xl text-gray-600 mb-16 max-w-2xl">
              Discover how Joblogic can help streamline your field service operations and grow your business.
            </p>
            
            {/* Dashboard Image */}
            <div className="relative max-w-4xl">
              <Image
                src="/images/dashboard-devices.png"
                alt="JobLogic Dashboard displayed on multiple devices - laptop, tablet and phone showing comprehensive field service management interface with KPI charts, job management, and real-time data"
                width={900}
                height={550}
                className="w-full h-auto object-contain"
                priority
              />
            </div>
          </div>
        </div>

        {/* Right Side - Registration Form */}
        <div className="w-[480px] bg-white p-10 shadow-xl">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-3">
              Start Your Free Trial, No Credit Card Required.
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              Creating an account will begin a 14 day free, no obligation trial with all the features and support you require.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name Field */}
            <div>
              <Label htmlFor="name" className="text-sm font-semibold text-gray-700 mb-2 block">
                Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="Type here"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="w-full h-12 border-gray-300 rounded-md text-base"
                required
              />
            </div>

            {/* Email Field */}
            <div>
              <Label htmlFor="email" className="text-sm font-semibold text-gray-700 mb-2 block">
                Email Address <span className="text-red-500">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Type here"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="w-full h-12 border-gray-300 rounded-md text-base"
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                No spam. Your information will never be sold or shared.
              </p>
            </div>

            {/* Company Name Field */}
            <div>
              <Label htmlFor="companyName" className="text-sm font-semibold text-gray-700 mb-2 block">
                Company Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="companyName"
                type="text"
                placeholder="Type here"
                value={formData.companyName}
                onChange={(e) => handleInputChange('companyName', e.target.value)}
                className="w-full h-12 border-gray-300 rounded-md text-base"
                required
              />
            </div>

            {/* Mobile Number Field */}
            <div>
              <Label htmlFor="mobileNumber" className="text-sm font-semibold text-gray-700 mb-2 block">
                Mobile Number <span className="text-red-500">*</span>
              </Label>
              <div className="flex gap-2">
                <div className="flex items-center gap-2 h-12 px-4 border border-gray-300 rounded-md bg-white min-w-[100px]">
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
                  className="flex-1 h-12 border-gray-300 rounded-md text-base"
                  required
                />
              </div>
            </div>

            {/* reCAPTCHA */}
            <div className="flex items-center gap-4 py-4">
              <div className="flex items-center gap-3">
                <Checkbox
                  id="recaptcha"
                  checked={acceptedTerms}
                  onCheckedChange={(checked) => setAcceptedTerms(checked as boolean)}
                  className="w-5 h-5"
                />
                <Label htmlFor="recaptcha" className="text-sm text-gray-700">
                  I'm not a robot
                </Label>
              </div>
              <div className="ml-auto">
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
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-4 text-lg rounded-md mt-6"
              disabled={!isFormValid}
            >
              Begin Trial →
            </Button>

            {/* Terms and Conditions */}
            <div className="text-xs text-gray-500 space-y-3 leading-relaxed mt-6">
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
          className="bg-gray-800 text-white border-gray-600 hover:bg-gray-700 px-4 py-2 rounded-md"
        >
          Cookie Settings
        </Button>
      </div>

      {/* Live Chat */}
      <div className="fixed bottom-6 right-6">
        <Button 
          className="bg-green-500 hover:bg-green-600 text-white rounded-full w-14 h-14 p-0 shadow-lg"
        >
          💬
        </Button>
      </div>
    </div>
  )
}
