"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Search, AlertTriangle, CheckCircle, X, Eye, MessageSquare } from "lucide-react"
import Image from "next/image"

const flaggedReports = [
  {
    id: 1,
    type: "inappropriate_content",
    reportedItem: "Vintage Band T-Shirt",
    reportedUser: "Alex Kim",
    reporterUser: "Sarah Chen",
    reason: "Item description contains inappropriate language",
    description: "The item description includes offensive terms that violate community guidelines.",
    status: "pending",
    priority: "high",
    reportDate: "2024-03-20",
    images: ["/placeholder.svg?height=200&width=200"],
    category: "Content Violation",
  },
  {
    id: 2,
    type: "fake_item",
    reportedItem: "Designer Handbag",
    reportedUser: "Emma Davis",
    reporterUser: "Mike Johnson",
    reason: "Suspected counterfeit item",
    description: "The brand logo and stitching appear to be fake. This looks like a counterfeit designer bag.",
    status: "investigating",
    priority: "high",
    reportDate: "2024-03-19",
    images: ["/placeholder.svg?height=200&width=200"],
    category: "Authenticity",
  },
  {
    id: 3,
    type: "misleading_condition",
    reportedItem: "Casual Sneakers",
    reportedUser: "Lisa Wang",
    reporterUser: "Alex Kim",
    reason: "Item condition misrepresented",
    description: "Item was listed as 'excellent' condition but arrived with significant wear and damage.",
    status: "pending",
    priority: "medium",
    reportDate: "2024-03-18",
    images: ["/placeholder.svg?height=200&width=200"],
    category: "Misrepresentation",
  },
  {
    id: 4,
    type: "spam_behavior",
    reportedItem: "Multiple Listings",
    reportedUser: "John Doe",
    reporterUser: "Emma Davis",
    reason: "Spam posting and duplicate listings",
    description: "User has posted the same item multiple times and is flooding the marketplace.",
    status: "resolved",
    priority: "low",
    reportDate: "2024-03-17",
    images: ["/placeholder.svg?height=200&width=200"],
    category: "Spam",
  },
]

export function FlaggedContent() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")
  const [selectedReport, setSelectedReport] = useState<(typeof flaggedReports)[0] | null>(null)
  const [resolutionNotes, setResolutionNotes] = useState("")

  const filteredReports = flaggedReports.filter((report) => {
    const matchesSearch =
      report.reportedItem.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.reportedUser.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.reporterUser.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || report.status === statusFilter
    const matchesPriority = priorityFilter === "all" || report.priority === priorityFilter
    return matchesSearch && matchesStatus && matchesPriority
  })

  const handleResolve = (reportId: number, action: string) => {
    console.log(`Resolving report ${reportId} with action: ${action}`)
    // Simulate resolution
    setSelectedReport(null)
    setResolutionNotes("")
  }

  const handleDismiss = (reportId: number) => {
    console.log(`Dismissing report ${reportId}`)
    // Simulate dismissal
    setSelectedReport(null)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="secondary">Pending</Badge>
      case "investigating":
        return <Badge className="bg-blue-100 text-blue-800">Investigating</Badge>
      case "resolved":
        return <Badge className="bg-green-100 text-green-800">Resolved</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge variant="destructive">High</Badge>
      case "medium":
        return <Badge className="bg-yellow-100 text-yellow-800">Medium</Badge>
      case "low":
        return <Badge className="bg-gray-100 text-gray-800">Low</Badge>
      default:
        return <Badge variant="outline">{priority}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-green-800 dark:text-green-200">Flagged Content Review</h1>
          <p className="text-green-600 dark:text-green-400">Investigate and resolve community reports</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="border-red-200 text-red-800">
            {filteredReports.filter((r) => r.status === "pending").length} Pending
          </Badge>
          <Badge variant="outline" className="border-blue-200 text-blue-800">
            {filteredReports.filter((r) => r.status === "investigating").length} Investigating
          </Badge>
        </div>
      </div>

      {/* Filters */}
      <Card className="border-green-200 dark:border-green-800">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-green-500" />
              <Input
                placeholder="Search reports, items, or users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 border-green-200 focus:border-green-400"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[150px] border-green-200">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="investigating">Investigating</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
              </SelectContent>
            </Select>
            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger className="w-full sm:w-[150px] border-green-200">
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priority</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Reports Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredReports.map((report) => (
          <Card key={report.id} className="border-green-200 dark:border-green-800 hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                  <Badge variant="outline" className="text-xs">
                    {report.category}
                  </Badge>
                </div>
                <div className="flex gap-1">
                  {getStatusBadge(report.status)}
                  {getPriorityBadge(report.priority)}
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-green-800 dark:text-green-200">{report.reportedItem}</h3>
                <p className="text-sm text-green-600 dark:text-green-400">{report.reason}</p>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="relative">
                <Image
                  src={report.images[0] || "/placeholder.svg"}
                  alt={report.reportedItem}
                  width={200}
                  height={150}
                  className="w-full h-32 object-cover rounded-md"
                />
              </div>

              <div className="text-sm space-y-1">
                <div className="flex justify-between">
                  <span className="text-green-600 dark:text-green-400">Reported User:</span>
                  <span className="font-medium text-green-800 dark:text-green-200">{report.reportedUser}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-green-600 dark:text-green-400">Reporter:</span>
                  <span className="font-medium text-green-800 dark:text-green-200">{report.reporterUser}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-green-600 dark:text-green-400">Date:</span>
                  <span className="font-medium text-green-800 dark:text-green-200">{report.reportDate}</span>
                </div>
              </div>

              <p className="text-sm text-green-600 dark:text-green-400 line-clamp-2">{report.description}</p>

              <div className="flex gap-2 pt-2">
                <Button
                  size="sm"
                  onClick={() => setSelectedReport(report)}
                  variant="outline"
                  className="flex-1 border-green-200 hover:bg-green-50"
                >
                  <Eye className="h-4 w-4 mr-1" />
                  Investigate
                </Button>
                {report.status === "pending" && (
                  <Button
                    size="sm"
                    onClick={() => handleResolve(report.id, "action_taken")}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Resolve
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Report Details Modal */}
      <Dialog open={!!selectedReport} onOpenChange={() => setSelectedReport(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-green-800 dark:text-green-200">Report Investigation</DialogTitle>
            <DialogDescription className="text-green-600 dark:text-green-400">
              Review report details and take appropriate action
            </DialogDescription>
          </DialogHeader>
          {selectedReport && (
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Image
                    src={selectedReport.images[0] || "/placeholder.svg"}
                    alt={selectedReport.reportedItem}
                    width={400}
                    height={300}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold text-green-800 dark:text-green-200 mb-2">
                      {selectedReport.reportedItem}
                    </h3>
                    <div className="flex gap-2 mb-3">
                      {getStatusBadge(selectedReport.status)}
                      {getPriorityBadge(selectedReport.priority)}
                      <Badge variant="outline">{selectedReport.category}</Badge>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <span className="text-sm font-medium text-green-600 dark:text-green-400">Report Type</span>
                      <p className="text-green-800 dark:text-green-200">{selectedReport.type.replace("_", " ")}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-green-600 dark:text-green-400">Reported User</span>
                      <p className="text-green-800 dark:text-green-200">{selectedReport.reportedUser}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-green-600 dark:text-green-400">Reporter</span>
                      <p className="text-green-800 dark:text-green-200">{selectedReport.reporterUser}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-green-600 dark:text-green-400">Report Date</span>
                      <p className="text-green-800 dark:text-green-200">{selectedReport.reportDate}</p>
                    </div>
                  </div>

                  <div>
                    <span className="text-sm font-medium text-green-600 dark:text-green-400">Reason</span>
                    <p className="text-green-800 dark:text-green-200 mt-1">{selectedReport.reason}</p>
                  </div>

                  <div>
                    <span className="text-sm font-medium text-green-600 dark:text-green-400">Description</span>
                    <p className="text-green-800 dark:text-green-200 mt-1">{selectedReport.description}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-green-800 dark:text-green-200 mb-2 block">
                    Resolution Notes
                  </label>
                  <Textarea
                    placeholder="Add notes about your investigation and resolution..."
                    value={resolutionNotes}
                    onChange={(e) => setResolutionNotes(e.target.value)}
                    className="border-green-200 focus:border-green-400"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <Button onClick={() => handleResolve(selectedReport.id, "content_removed")} variant="destructive">
                    <X className="h-4 w-4 mr-2" />
                    Remove Content
                  </Button>
                  <Button
                    onClick={() => handleResolve(selectedReport.id, "user_warned")}
                    className="bg-yellow-600 hover:bg-yellow-700"
                  >
                    <AlertTriangle className="h-4 w-4 mr-2" />
                    Warn User
                  </Button>
                  <Button
                    onClick={() => handleResolve(selectedReport.id, "no_action")}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    No Action Needed
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleDismiss(selectedReport.id)}
                    className="border-gray-200 hover:bg-gray-50"
                  >
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Request More Info
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
