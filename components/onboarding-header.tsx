"use client"

export function OnboardingHeader() {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-r from-teal-500 to-teal-600 rounded flex items-center justify-center">
            <span className="text-white font-bold text-xs">JL</span>
          </div>
          <span className="text-xl font-semibold text-gray-900">joblogic</span>
        </div>
        <div className="text-gray-500 text-sm">Customer Onboarding</div>
      </div>
    </header>
  )
}
