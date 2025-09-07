"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

interface OnboardingData {
  registration?: {
    name: string
    email: string
    companyName: string
    mobileNumber: string
    countryCode: string
  }
  companyOverview: {
    businessType: string
    companySize: string
    primaryServices: string[]
    yearsInBusiness: string
    targetMarkets: string[]
  }
  companyDetails: {
    companyName: string
    vatNumber: string
    registrationNumber: string
    website: string
    businessAddress: string
    phoneNumber: string
    contactEmail: string
    timezone: string
    currency: string
    region: string
    logo: File | null
  }
  industryConfiguration: {
    selectedIndustries: string[]
    customIndustry: string
    selectedForms: string[]
    selectedDashboards: string[]
  }
  teamRoles: Array<{
    fullName: string
    role: string
    email: string
    phoneNumber: string
  }>
  businessInformation: {
    businessVolumes: {
      numberOfCustomers: string
      numberOfEngineers: string
      numberOfSubcontractors: string
      numberOfJobs: string
    }
    systems: {
      accountingSoftware: string
      existingSoftware: string
      backOfficeUsers: string
      mobileUsers: string
    }
    businessOverview: string
    challenges: string
    shortTermObjectives: string
    longTermObjectives: string
    accreditations: string[]
    businessWorkflow: {
      jobEntry: string
      jobAssignment: string
      onSiteSteps: string
      softwareSteps: string
      teamHandoffs: string
    }
    customizations: {
      industryProcesses: string
      uniqueRequirements: string
    }
    workTypes: string[]
    contractManagement: {
      hasContracts: boolean
      contractTypes?: string[]
      contractRenewalProcess?: string
    }
    stockInventory: {
      hasStock: boolean
      features?: string[]
      stockLocations?: string
    }
    financeManagement: {
      hasFinanceManager: boolean
      features?: string[]
      financeIntegration?: string
    }
    additionalInfo: string
  }
  workInProgress: {
    hasWIPJobs: boolean
    counts: {
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
    } | null
  }
}

interface OnboardingContextType {
  currentStep: number
  setCurrentStep: (step: number) => void
  data: OnboardingData
  updateData: (section: keyof OnboardingData, newData: any) => void
  isStepValid: (step: number) => boolean
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined)

const industries = [
  "Access Control and Entry Systems",
  "Electrical Maintenance",
  "Facilities Management",
  "Fire Safety",
  "Elevator and Escalator",
  "HVACR",
  "Plumbing, Heating & Drainage",
  "Security",
  "Water Hygiene",
  "Other",
]

const electricalMaintenanceForms = [
  "Customer Satisfaction Survey",
  "Domestic Visual Condition Report",
  "Dynamic Risk Assessment",
  "Electrical Danger Notification",
  "Electrical Installation Certificate",
  "Electrical Installation Certificate ECA",
  "Electrical Installation Certificate ECA – Single Signature",
  "Electrical Installation Condition Report",
  "Electrical Installation Condition Report – 2023",
  "Electrical Installation Condition Report – ECA",
  "Electrical Isolation Certificate",
  "Emergency Light Testing Certificate",
  "Emergency Lighting Periodic Inspection and Testing Certificate – EPG6",
  "Emergency Lighting Periodic Test Certificate – ECA",
  "Emergency Lighting Small Install",
  "EPM5 Emergency Lighting Periodic Inspection and Testing Certificate",
  "Generic Schedule Circuit Details Test – ECA",
  "Ladder Inspection Checklist",
  "Minor Electrical Installation Works / Single Circuit Certificate",
  "Minor Electrical Installation Works Certificate – 2024 – ECA",
  "Minor Electrical Installation Works Certificate 2023",
  "Portable Appliance Inspection & Testing Certificate",
]

const electricalMaintenanceDashboards = [
  "Emergency Lighting and Testing Certificate – Compliance",
  "Risk Assessment – Compliance",
  "Finance",
  "CRM",
  "WIP",
  "PPM",
]

export function OnboardingProvider({ 
  children, 
  initialRegistrationData,
  initialStep = 1
}: { 
  children: ReactNode
  initialRegistrationData?: {
    name: string
    email: string
    companyName: string
    mobileNumber: string
    countryCode: string
  }
  initialStep?: number
}) {
  const [currentStep, setCurrentStep] = useState(initialStep)
  const [data, setData] = useState<OnboardingData>({
    registration: initialRegistrationData || {
      name: "",
      email: "",
      companyName: "",
      mobileNumber: "",
      countryCode: "+44"
    },
    companyOverview: {
      businessType: "Limited Company", // Default for UK Electrical Company
      companySize: "3-8 employees", // Default for UK Electrical Company
      primaryServices: ["Installation Services", "Maintenance & Repair", "Emergency Call-outs", "Compliance & Testing"], // Default for UK Electrical Company
      yearsInBusiness: "11-20 years", // Default for UK Electrical Company
      targetMarkets: ["Commercial", "Industrial", "Healthcare"], // Default for UK Electrical Company
    },
    companyDetails: {
      companyName: "",
      vatNumber: "",
      registrationNumber: "",
      website: "",
      businessAddress: "",
      phoneNumber: "",
      contactEmail: "",
      timezone: "Greenwich Mean Time",
      currency: "GBP (£)",
      region: "UK",
      logo: null,
    },
    industryConfiguration: {
      selectedIndustries: [],
      customIndustry: "",
      selectedForms: [],
      selectedDashboards: [],
    },
    teamRoles: initialRegistrationData ? [{
      fullName: initialRegistrationData.name,
      role: "Project Manager",
      email: initialRegistrationData.email,
      phoneNumber: initialRegistrationData.countryCode + " " + initialRegistrationData.mobileNumber
    }] : [],
    businessInformation: {
      businessVolumes: {
        numberOfCustomers: "",
        numberOfEngineers: "",
        numberOfSubcontractors: "",
        numberOfJobs: "",
      },
      systems: {
        accountingSoftware: "",
        existingSoftware: "",
        backOfficeUsers: "",
        mobileUsers: "",
      },
      businessOverview: "",
      challenges: "",
      shortTermObjectives: "",
      longTermObjectives: "",
      accreditations: [],
      businessWorkflow: {
        jobEntry: "",
        jobAssignment: "",
        onSiteSteps: "",
        softwareSteps: "",
        teamHandoffs: "",
      },
      customizations: {
        industryProcesses: "",
        uniqueRequirements: "",
      },
      workTypes: [],
      contractManagement: {
        hasContracts: false,
        contractTypes: [],
        contractRenewalProcess: "",
      },
      stockInventory: {
        hasStock: false,
        features: [],
        stockLocations: "",
      },
      financeManagement: {
        hasFinanceManager: false,
        features: [],
        financeIntegration: "no",
      },
      additionalInfo: "",
    },
    workInProgress: {
      hasWIPJobs: false,
      counts: null,
    },
  })

  const updateData = (section: keyof OnboardingData, newData: any) => {
    setData((prev) => {
      // Handle direct array replacement for teamRoles
      if (section === "teamRoles" && Array.isArray(newData)) {
        return {
          ...prev,
          [section]: newData,
        }
      }

      // Handle other sections with object merging
      return {
        ...prev,
        [section]:
          typeof prev[section] === "object" && !Array.isArray(prev[section])
            ? { ...prev[section], ...newData }
            : newData,
      }
    })
  }

  const isStepValid = (step: number): boolean => {
    switch (step) {
      case 1:
        // Validate required fields for About Your Business screen
        const { companyName, businessAddress, phoneNumber, contactEmail } = data.companyDetails
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        
        return !!(
          companyName?.trim() &&
          businessAddress?.trim() &&
          phoneNumber?.trim() &&
          contactEmail?.trim() &&
          emailRegex.test(contactEmail)
        )
      case 2:
        // Validate required fields for Your Services screen
        const { selectedIndustries, customIndustry } = data.industryConfiguration
        const { businessVolumes } = data.businessInformation
        
        // Check if industry is selected
        const hasIndustry = selectedIndustries && selectedIndustries.length > 0
        
        // If "Other" is selected, check if custom industry is provided
        const hasCustomIndustry = !selectedIndustries?.includes("Other") || (customIndustry && customIndustry.trim())
        
        // Check business volumes
        const hasValidBusinessVolumes = businessVolumes && 
          businessVolumes.numberOfCustomers && 
          businessVolumes.numberOfEngineers && 
          businessVolumes.numberOfJobs &&
          Number(businessVolumes.numberOfCustomers) > 0 &&
          Number(businessVolumes.numberOfEngineers) > 0 &&
          Number(businessVolumes.numberOfJobs) > 0
        
        return !!(hasIndustry && hasCustomIndustry && hasValidBusinessVolumes)
      case 3:
        // Add validation for step 3 later
        return true
      default:
        return true
    }
  }


  return (
    <OnboardingContext.Provider
      value={{
        currentStep,
        setCurrentStep,
        data,
        updateData,
        isStepValid,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  )
}

export function useOnboarding() {
  const context = useContext(OnboardingContext)
  if (context === undefined) {
    throw new Error("useOnboarding must be used within an OnboardingProvider")
  }
  return context
}
