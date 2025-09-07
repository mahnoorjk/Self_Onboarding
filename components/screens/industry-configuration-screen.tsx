"use client"

import { useState } from "react"
import { useOnboarding } from "../onboarding-context"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

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
  "WIP"
]

'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { useOnboarding } from '@/components/onboarding-context'
import { useState } from 'react'

const industries = [
  "Air Conditioning and Cooling", "Alarms and Security Systems", "Domestic Appliances",
  "Electrical Installation and Maintenance", "Fire Systems", "Food Service",
  "General Building Maintenance", "HVAC", "Lifts and Escalators", "Plumbing",
  "Refrigeration and Freezer Services"
]

const workTypes = ["Contracts", "Ad-Hoc Work", "Equipment Hire", "Projects", "Equipment Sales"]

export default function YourServicesScreen() {
  const { updateData, businessInformation } = useOnboarding()
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>(
    businessInformation.selectedIndustries || []
  )
  const [selectedWorkTypes, setSelectedWorkTypes] = useState<string[]>(
    businessInformation.workTypes || []
  )
  const [contractTypes, setContractTypes] = useState<string[]>([])

  const handleIndustryChange = (industry: string, checked: boolean) => {
    const updated = checked 
      ? [...selectedIndustries, industry]
      : selectedIndustries.filter(i => i !== industry)
    
    setSelectedIndustries(updated)
    updateData({ selectedIndustries: updated })
  }

  const handleWorkTypeChange = (workType: string, checked: boolean) => {
    const updated = checked
      ? [...selectedWorkTypes, workType]
      : selectedWorkTypes.filter(t => t !== workType)
    
    setSelectedWorkTypes(updated)
    updateData({ workTypes: updated })
  }

  const handleContractTypeChange = (type: string, checked: boolean) => {
    const updated = checked
      ? [...contractTypes, type]
      : contractTypes.filter(t => t !== type)
    
    setContractTypes(updated)
  }

  // Show work type specific forms based on selections
  const showContracts = selectedWorkTypes.includes("Contracts")
  const showAdHoc = selectedWorkTypes.includes("Ad-Hoc Work")
  const showEquipmentHire = selectedWorkTypes.includes("Equipment Hire")
  const showProjects = selectedWorkTypes.includes("Projects")
  const showEquipmentSales = selectedWorkTypes.includes("Equipment Sales")
