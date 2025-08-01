"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { X, Minus, Send, Bot, User } from "lucide-react"

interface Message {
  id: string
  text: string
  sender: "user" | "bot"
  timestamp: Date
}

interface LiveChatScreenProps {
  onClose: () => void
  isMinimized: boolean
  onToggleMinimize: () => void
}

export function LiveChatScreen({ onClose, isMinimized, onToggleMinimize }: LiveChatScreenProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! Welcome to Joblogic support. How can I help you today?",
      sender: "bot",
      timestamp: new Date(Date.now() - 300000), // 5 minutes ago
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        text: inputValue,
        sender: "user",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, newMessage])
      setInputValue("")
      setIsTyping(true)

      // Simulate bot response with specific keyword detection
      setTimeout(() => {
        const lowerInput = inputValue.toLowerCase()

        // Check if all three keywords are present
        const hasUpload = lowerInput.includes("upload")
        const hasComplianceDocuments = lowerInput.includes("compliance documents")
        const hasElectricians = lowerInput.includes("electricians")

        let botResponse: string

        if (hasUpload && hasComplianceDocuments && hasElectricians) {
          botResponse =
            "Go to Settings ▸ Staff to see your staff list. Open the profile of the person you want, switch to the Documents tab, and upload the files. For more help, check the guides in Tutorials & Video."
        } else {
          botResponse = "I'm sorry, I can only answer specific questions for this demo."
        }

        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: botResponse,
          sender: "bot",
          timestamp: new Date(),
        }

        setMessages((prev) => [...prev, botMessage])
        setIsTyping(false)
      }, 1500)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage()
    }
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  if (isMinimized) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Button
          onClick={onToggleMinimize}
          className="bg-teal-600 hover:bg-teal-700 text-white rounded-full w-12 h-12 shadow-lg"
        >
          <Bot className="w-6 h-6" />
        </Button>
      </div>
    )
  }

  return (
    <div className="fixed bottom-4 right-4 w-80 h-[500px] z-50 shadow-2xl">
      <Card className="h-full flex flex-col border-0 rounded-lg overflow-hidden">
        <CardHeader className="bg-teal-600 text-white p-3 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bot className="w-5 h-5" />
              <h3 className="font-medium text-sm">Live Chat Support</h3>
            </div>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={onToggleMinimize}
                className="text-white hover:bg-white/20 p-1 h-6 w-6"
              >
                <Minus className="w-3 h-3" />
              </Button>
              <Button variant="ghost" size="sm" onClick={onClose} className="text-white hover:bg-white/20 p-1 h-6 w-6">
                <X className="w-3 h-3" />
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="flex-1 p-0 flex flex-col bg-gray-50 min-h-0">
          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0">
            {messages.map((message) => (
              <div key={message.id} className="flex gap-3">
                {message.sender === "bot" && (
                  <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                )}
                <div className="flex flex-col flex-1">
                  <div
                    className={`px-3 py-2 text-sm break-words ${
                      message.sender === "user"
                        ? "bg-teal-600 text-white rounded-lg ml-auto max-w-[80%]"
                        : "bg-white text-gray-800 rounded-lg shadow-sm border max-w-[90%]"
                    }`}
                  >
                    {message.text}
                  </div>
                  <span className="text-xs text-gray-500 mt-1">{formatTime(message.timestamp)}</span>
                </div>
                {message.sender === "user" && (
                  <div className="w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <User className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-3">
                <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="bg-white rounded-lg shadow-sm border px-3 py-2">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 bg-white border-t border-gray-200">
            <div className="flex items-center gap-2 mb-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 border-gray-300 focus:border-teal-500 focus:ring-teal-500"
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputValue.trim()}
                className="bg-teal-600 hover:bg-teal-700 text-white px-3 py-2"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-xs text-gray-500">We typically reply within a few minutes</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
