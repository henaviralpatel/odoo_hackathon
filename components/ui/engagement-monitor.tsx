"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Search, Filter, TrendingUp, Users, MessageSquare, Send } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts"

const engagementData = [
  { date: "2024-03-14", activeUsers: 234, newUsers: 12, swaps: 45, messages: 89 },
  { date: "2024-03-15", activeUsers: 267, newUsers: 18, swaps: 52, messages: 94 },
  { date: "2024-03-16", activeUsers: 298, newUsers: 15, swaps: 61, messages: 102 },
  { date: "2024-03-17", activeUsers: 312, newUsers: 22, swaps: 58, messages: 87 },
  { date: "2024-03-18", activeUsers: 289, newUsers: 9, swaps: 43, messages: 76 },
  { date: "2024-03-19", activeUsers: 345, newUsers: 28, swaps: 67, messages: 115 },
  { date: "2024-03-20", activeUsers: 378, newUsers: 31, swaps: 72, messages: 128 },
]

const inactiveUsers = [
  {
    id: 1,
    name: "John Smith",
    email: "john.smith@email.com",
    avatar: "/placeholder.svg?height=40&width=40",
    lastActive: "2024-02-15",
    daysSinceActive: 34,
    totalSwaps: 12,
    joinDate: "2024-01-10",
    engagementScore: 25,
    preferredContact: "email",
  },
  {
    id: 2,
    name: "Maria Garcia",
    email: "maria.garcia@email.com",
    avatar: "/placeholder.svg?height=40&width=40",
    lastActive: "2024-02-28",
    daysSinceActive: 21,
    totalSwaps: 8,
    joinDate: "2024-01-25",
    engagementScore: 35,
    preferredContact: "push",
  },
  {
    id: 3,
    name: "David Lee",
    email: "david.lee@email.com",
    avatar: "/placeholder.svg?height=40&width=40",
    lastActive: "2024-03-01",
    daysSinceActive: 19,
    totalSwaps: 15,
    joinDate: "2023-12-20",
    engagementScore: 42,
    preferredContact: "email",
  },
  {
    id: 4,
    name: "Sophie Wilson",
    email: "sophie.wilson@email.com",
    avatar: "/placeholder.svg?height=40&width=40",
    lastActive: "2024-02-20",
    daysSinceActive: 29,
    totalSwaps: 6,
    joinDate: "2024-02-01",
    engagementScore: 18,
    preferredContact: "sms",
  },
]

const messageTemplates = [
  {
    id: 1,
    name: "Welcome Back",
    subject: "We miss you at ReWear!",
    content: "Hi {name}, we noticed you haven't been active lately. Check out the new items that match your style!",
    type: "re_engagement",
  },
  {
    id: 2,
    name: "New Items Alert",
    subject: "New sustainable fashion items just for you",
    content: "Hello {name}, we've added {count} new items in your favorite categories. Don't miss out!",
    type: "new_items",
  },
  {
    id: 3,
    name: "Swap Reminder",
    subject: "Complete your pending swap",
    content: "Hi {name}, you have a pending swap waiting. Complete it to earn points and help the environment!",
    type: "swap_reminder",
  },
]

export function EngagementMonitor() {
  const [searchTerm, setSearchTerm] = useState("")
  const [engagementFilter, setEngagementFilter] = useState("all")
  const [selectedUsers, setSelectedUsers] = useState<number[]>([])
  const [selectedTemplate, setSelectedTemplate] = useState("")
  const [customMessage, setCustomMessage] = useState("")
  const [showMessageDialog, setShowMessageDialog] = useState(false)

  const filteredUsers = inactiveUsers.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesEngagement =
      engagementFilter === "all" ||
      (engagementFilter === "low" && user.engagementScore < 30) ||
      (engagementFilter === "medium" && user.engagementScore >= 30 && user.engagementScore < 60) ||
      (engagementFilter === "high" && user.engagementScore >= 60)
    return matchesSearch && matchesEngagement
  })

  const handleSelectUser = (userId: number) => {
    setSelectedUsers((prev) => (prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId]))
  }

  const handleSelectAll = () => {
    setSelectedUsers(selectedUsers.length === filteredUsers.length ? [] : filteredUsers.map((user) => user.id))
  }

  const handleSendMessage = () => {
    console.log("Sending message to users:", selectedUsers)
    console.log("Template:", selectedTemplate)
    console.log("Custom message:", customMessage)
    // Simulate sending message
    setShowMessageDialog(false)
    setSelectedUsers([])
    setCustomMessage("")
    setSelectedTemplate("")
  }

  const getEngagementBadge = (score: number) => {
    if (score < 30) return <Badge variant="destructive">Low</Badge>
    if (score < 60) return <Badge className="bg-yellow-100 text-yellow-800">Medium</Badge>
    return <Badge className="bg-green-100 text-green-800">High</Badge>
  }

  const totalActiveUsers = engagementData[engagementData.length - 1]?.activeUsers || 0
  const totalInactiveUsers = inactiveUsers.length
  const avgEngagement = inactiveUsers.reduce((sum, user) => sum + user.engagementScore, 0) / inactiveUsers.length
  const recentSwaps = engagementData[engagementData.length - 1]?.swaps || 0

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-green-800 dark:text-green-200">User Engagement Monitor</h1>
          <p className="text-green-600 dark:text-green-400">Track user activity and re-engage inactive members</p>
        </div>
        <Button
          onClick={() => setShowMessageDialog(true)}
          disabled={selectedUsers.length === 0}
          className="bg-green-600 hover:bg-green-700"
        >
          <MessageSquare className="h-4 w-4 mr-2" />
          Send Re-engagement Message
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-green-200 dark:border-green-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-700 dark:text-green-300">Active Users</CardTitle>
            <Users className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-800 dark:text-green-200">{totalActiveUsers}</div>
            <p className="text-xs text-green-600 dark:text-green-400 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" />
              +12% from yesterday
            </p>
          </CardContent>
        </Card>

        <Card className="border-green-200 dark:border-green-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-700 dark:text-green-300">Inactive Users</CardTitle>
            <Users className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{totalInactiveUsers}</div>
            <p className="text-xs text-red-500">Need re-engagement</p>
          </CardContent>
        </Card>

        <Card className="border-green-200 dark:border-green-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-700 dark:text-green-300">Avg Engagement</CardTitle>
            <TrendingUp className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{avgEngagement.toFixed(0)}%</div>
            <p className="text-xs text-blue-500">Engagement score</p>
          </CardContent>
        </Card>

        <Card className="border-green-200 dark:border-green-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-700 dark:text-green-300">Recent Swaps</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-800 dark:text-green-200">{recentSwaps}</div>
            <p className="text-xs text-green-600 dark:text-green-400">Today</p>
          </CardContent>
        </Card>
      </div>

      {/* Engagement Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border-green-200 dark:border-green-800">
          <CardHeader>
            <CardTitle className="text-green-800 dark:text-green-200">Daily Active Users</CardTitle>
            <CardDescription className="text-green-600 dark:text-green-400">
              User activity over the past week
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={engagementData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#22c55e20" />
                <XAxis dataKey="date" stroke="#16a34a" />
                <YAxis stroke="#16a34a" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#f0fdf4",
                    border: "1px solid #22c55e",
                    borderRadius: "8px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="activeUsers"
                  stroke="#22c55e"
                  strokeWidth={3}
                  dot={{ fill: "#22c55e", strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-green-200 dark:border-green-800">
          <CardHeader>
            <CardTitle className="text-green-800 dark:text-green-200">Activity Breakdown</CardTitle>
            <CardDescription className="text-green-600 dark:text-green-400">
              Swaps and messages over time
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={engagementData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#22c55e20" />
                <XAxis dataKey="date" stroke="#16a34a" />
                <YAxis stroke="#16a34a" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#f0fdf4",
                    border: "1px solid #22c55e",
                    borderRadius: "8px",
                  }}
                />
                <Bar dataKey="swaps" fill="#22c55e" name="Swaps" />
                <Bar dataKey="messages" fill="#16a34a" name="Messages" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className="border-green-200 dark:border-green-800">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-green-500" />
              <Input
                placeholder="Search inactive users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 border-green-200 focus:border-green-400"
              />
            </div>
            <Select value={engagementFilter} onValueChange={setEngagementFilter}>
              <SelectTrigger className="w-full sm:w-[180px] border-green-200">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by engagement" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Engagement</SelectItem>
                <SelectItem value="low">Low (0-30%)</SelectItem>
                <SelectItem value="medium">Medium (30-60%)</SelectItem>
                <SelectItem value="high">High (60%+)</SelectItem>
              </SelectContent>
            </Select>
            <Button
              onClick={handleSelectAll}
              variant="outline"
              className="border-green-200 hover:bg-green-50 bg-transparent"
            >
              {selectedUsers.length === filteredUsers.length ? "Deselect All" : "Select All"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Selected Users Info */}
      {selectedUsers.length > 0 && (
        <Card className="border-green-200 dark:border-green-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-green-700 dark:text-green-300">
                {selectedUsers.length} user(s) selected for re-engagement
              </span>
              <Button onClick={() => setShowMessageDialog(true)} className="bg-green-600 hover:bg-green-700">
                <Send className="h-4 w-4 mr-2" />
                Send Message
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Inactive Users List */}
      <Card className="border-green-200 dark:border-green-800">
        <CardHeader>
          <CardTitle className="text-green-800 dark:text-green-200">Inactive Users</CardTitle>
          <CardDescription className="text-green-600 dark:text-green-400">Users who need re-engagement</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredUsers.map((user) => (
              <div
                key={user.id}
                className="flex items-center space-x-4 p-4 border border-green-200 dark:border-green-800 rounded-lg"
              >
                <input
                  type="checkbox"
                  checked={selectedUsers.includes(user.id)}
                  onChange={() => handleSelectUser(user.id)}
                  className="rounded border-green-300 text-green-600 focus:ring-green-500"
                />
                <Avatar>
                  <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                  <AvatarFallback className="bg-green-100 text-green-800">
                    {user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-green-800 dark:text-green-200">{user.name}</h4>
                      <p className="text-sm text-green-600 dark:text-green-400">{user.email}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {getEngagementBadge(user.engagementScore)}
                      <Badge variant="outline" className="text-xs">
                        {user.preferredContact}
                      </Badge>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-green-600 dark:text-green-400">Last Active:</span>
                      <p className="font-medium text-green-800 dark:text-green-200">{user.lastActive}</p>
                    </div>
                    <div>
                      <span className="text-green-600 dark:text-green-400">Days Inactive:</span>
                      <p className="font-medium text-red-600">{user.daysSinceActive}</p>
                    </div>
                    <div>
                      <span className="text-green-600 dark:text-green-400">Total Swaps:</span>
                      <p className="font-medium text-green-800 dark:text-green-200">{user.totalSwaps}</p>
                    </div>
                    <div>
                      <span className="text-green-600 dark:text-green-400">Engagement:</span>
                      <div className="flex items-center gap-2">
                        <Progress value={user.engagementScore} className="h-2 flex-1" />
                        <span className="text-xs font-medium text-green-800 dark:text-green-200">
                          {user.engagementScore}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Message Dialog */}
      <Dialog open={showMessageDialog} onOpenChange={setShowMessageDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-green-800 dark:text-green-200">Send Re-engagement Message</DialogTitle>
            <DialogDescription className="text-green-600 dark:text-green-400">
              Send a personalized message to {selectedUsers.length} selected user(s)
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-green-800 dark:text-green-200 mb-2 block">
                Message Template
              </label>
              <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
                <SelectTrigger className="border-green-200">
                  <SelectValue placeholder="Choose a template or write custom message" />
                </SelectTrigger>
                <SelectContent>
                  {messageTemplates.map((template) => (
                    <SelectItem key={template.id} value={template.id.toString()}>
                      {template.name} - {template.subject}
                    </SelectItem>
                  ))}
                  <SelectItem value="custom">Custom Message</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {selectedTemplate && (
              <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <h4 className="font-medium text-green-800 dark:text-green-200 mb-1">
                  {selectedTemplate === "custom"
                    ? "Custom Message"
                    : messageTemplates.find((t) => t.id.toString() === selectedTemplate)?.subject}
                </h4>
                <p className="text-sm text-green-600 dark:text-green-400">
                  {selectedTemplate === "custom"
                    ? "Write your own message below"
                    : messageTemplates.find((t) => t.id.toString() === selectedTemplate)?.content}
                </p>
              </div>
            )}

            <div>
              <label className="text-sm font-medium text-green-800 dark:text-green-200 mb-2 block">
                {selectedTemplate === "custom" ? "Custom Message" : "Additional Notes (Optional)"}
              </label>
              <Textarea
                placeholder={
                  selectedTemplate === "custom"
                    ? "Write your custom re-engagement message..."
                    : "Add any additional notes to the template..."
                }
                value={customMessage}
                onChange={(e) => setCustomMessage(e.target.value)}
                className="border-green-200 focus:border-green-400"
                rows={4}
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                onClick={handleSendMessage}
                disabled={!selectedTemplate || (selectedTemplate === "custom" && !customMessage.trim())}
                className="bg-green-600 hover:bg-green-700"
              >
                <Send className="h-4 w-4 mr-2" />
                Send Message
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowMessageDialog(false)}
                className="border-green-200 hover:bg-green-50"
              >
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
