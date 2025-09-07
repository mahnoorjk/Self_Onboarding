"use client"

import { useState } from "react"
import { useOnboarding } from "../onboarding-context"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Trash2, Users } from "lucide-react"

interface RoleOption {
  value: string
  label: string
  description: string
}

const roleOptions: RoleOption[] = [
  {
    value: "Contract Manager",
    label: "Contract Manager",
    description: "Oversees contract administration and ensures compliance with terms and agreements.",
  },
  {
    value: "Service Delivery",
    label: "Service Delivery",
    description: "Manages the delivery of services to clients and ensures quality standards are met.",
  },
  {
    value: "Finance",
    label: "Finance",
    description: "Handles financial operations, budgeting, and reporting related to the implementation.",
  },
  {
    value: "Project Manager",
    label: "Project Manager",
    description: "Coordinates the overall project, manages timelines and resource allocation.",
  },
  {
    value: "HR",
    label: "HR",
    description: "Manages personnel aspects, including training and user adoption for the system.",
  },
  {
    value: "Fleet Manager",
    label: "Fleet Manager",
    description: "Oversees vehicle management and related operations within the system.",
  },
  {
    value: "Marketing",
    label: "Marketing",
    description: "Handles promotional activities and communications related to the implementation.",
  },
  {
    value: "Stock Manager",
    label: "Stock Manager",
    description: "Manages inventory and stock control processes within the system.",
  },
]

export function TeamRolesScreen() {
  const { data, updateData } = useOnboarding()
  const [teamMembers, setTeamMembers] = useState(data.teamRoles)

  const addTeamMember = () => {
    setTeamMembers([...teamMembers, { fullName: "", role: "", email: "", phoneNumber: "" }])
  }

  const removeTeamMember = (index: number) => {
    const newTeamMembers = teamMembers.filter((_, i) => i !== index)
    setTeamMembers(newTeamMembers)
    updateData("teamRoles", newTeamMembers)
  }

  const handleMemberChange = (index: number, field: string, value: string) => {
    const newTeamMembers = teamMembers.map((member, i) => (i === index ? { ...member, [field]: value } : member))
    setTeamMembers(newTeamMembers)
    updateData("teamRoles", newTeamMembers)
  }

  return (
    <div className="container mx-auto max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Team Roles</h1>
        <p className="text-gray-600">
          Define the key roles within your team who will be using JobLogic. This helps us tailor your setup.
        </p>
      </div>

      <div className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="h-5 w-5" />
              <span>Team Members</span>
            </CardTitle>
            <CardDescription>Add and define the roles for your team members.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {teamMembers.map((member, index) => (
              <div key={index} className="border rounded-lg p-4 space-y-4 relative">
                <h3 className="text-lg font-semibold text-gray-800">Team Member {index + 1}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`fullName-${index}`}>Full Name</Label>
                    <Input
                      id={`fullName-${index}`}
                      value={member.fullName}
                      onChange={(e) => handleMemberChange(index, "fullName", e.target.value)}
                      placeholder="e.g., John Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`role-${index}`}>Role</Label>
                    <Select value={member.role} onValueChange={(value) => handleMemberChange(index, "role", value)}>
                      <SelectTrigger id={`role-${index}`}>
                        <SelectValue placeholder="Select a role" />
                      </SelectTrigger>
                      <SelectContent>
                        {roleOptions.map((role) => (
                          <SelectItem key={role.value} value={role.value}>
                            {role.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`email-${index}`}>Email</Label>
                    <Input
                      id={`email-${index}`}
                      type="email"
                      value={member.email}
                      onChange={(e) => handleMemberChange(index, "email", e.target.value)}
                      placeholder="e.g., john.doe@example.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`phoneNumber-${index}`}>Phone Number</Label>
                    <Input
                      id={`phoneNumber-${index}`}
                      type="tel"
                      value={member.phoneNumber}
                      onChange={(e) => handleMemberChange(index, "phoneNumber", e.target.value)}
                      placeholder="e.g., +44 7123 456789"
                    />
                  </div>
                </div>
                {member.role && (
                  <div className="mt-4 p-3 bg-gray-50 rounded-lg text-sm text-gray-700">
                    <p className="font-medium mb-1">{member.role} Description:</p>
                    <p>{roleOptions.find((r) => r.value === member.role)?.description}</p>
                  </div>
                )}
                {teamMembers.length > 0 && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeTeamMember(index)}
                    className="absolute top-2 right-2 text-red-500 hover:bg-red-50 hover:text-red-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}
              </div>
            ))}
            <Button variant="outline" onClick={addTeamMember} className="w-full flex items-center gap-2 bg-transparent">
              <Plus className="w-4 h-4" />
              Add Team Member
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Role Descriptions</CardTitle>
            <CardDescription>Detailed descriptions for each available role.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {roleOptions.map((role) => (
              <div key={role.value} className="border-b pb-3 last:border-b-0 last:pb-0">
                <h3 className="font-semibold text-gray-800">{role.label}</h3>
                <p className="text-sm text-gray-600 mt-1">{role.description}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
