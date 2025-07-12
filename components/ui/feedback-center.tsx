"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Search, Star, MessageSquare, ThumbsUp, Reply, Send } from "lucide-react"

const feedbackData = [
  {
    id: 1,
    user: "Sarah Chen",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 5,
    type: "feature_request",
    title: "Add wishlist functionality",
    message: "It would be great to have a wishlist feature where I can save items I'm interested in for later.",
    date: "2024-03-20",
    status: "under_review",
    category: "Feature Request",
    upvotes: 23,
    replies: 2,
  },
  {
    id: 2,
    user: "Mike Johnson",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 4,
    type: "bug_report",
    title: "Search filters not working properly",
    message:
      "When I try to filter by size, the results don't update correctly. This happens on both mobile and desktop.",
    date: "2024-03-19",
    status: "in_progress",
    category: "Bug Report",
    upvotes: 15,
    replies: 1,
  },
  {
    id: 3,
    user: "Emma Davis",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 5,
    type: "general_feedback",
    title: "Love the eco-impact tracking!",
    message:
      "The CO₂ savings tracker is amazing! It really motivates me to swap more items. Great job on this feature!",
    date: "2024-03-18",
    status: "resolved",
    category: "General Feedback",
    upvotes: 31,
    replies: 3,
  },
  {
    id: 4,
    user: "Alex Kim",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 3,
    type: "improvement",
    title: "Improve photo upload quality",
    message: "The photo upload process could be smoother. Sometimes images get compressed too much and lose quality.",
    date: "2024-03-17",
    status: "planned",
    category: "Improvement",
    upvotes: 18,
    replies: 0,
  },
  {
    id: 5,
    user: "Lisa Wang",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 5,
    type: "feature_request",
    title: "Local pickup option",
    message: "Would love to have a local pickup option to reduce shipping and meet other community members in person.",
    date: "2024-03-16",
    status: "under_review",
    category: "Feature Request",
    upvotes: 27,
    replies: 1,
  },
]

export function FeedbackCenter() {
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedFeedback, setSelectedFeedback] = useState<(typeof feedbackData)[0] | null>(null)
  const [replyMessage, setReplyMessage] = useState("")

  const filteredFeedback = feedbackData.filter((feedback) => {
    const matchesSearch =
      feedback.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      feedback.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
      feedback.user.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = typeFilter === "all" || feedback.type === typeFilter
    const matchesStatus = statusFilter === "all" || feedback.status === statusFilter
    return matchesSearch && matchesType && matchesStatus
  })

  const handleReply = (feedbackId: number, message: string) => {
    console.log(`Replying to feedback ${feedbackId}: ${message}`)
    // Simulate reply
    setReplyMessage("")
    setSelectedFeedback(null)
  }

  const handleStatusChange = (feedbackId: number, newStatus: string) => {
    console.log(`Changing status of feedback ${feedbackId} to ${newStatus}`)
    // Simulate status change
  }

  const handleUpvote = (feedbackId: number) => {
    console.log(`Admin upvoting feedback ${feedbackId}`)
    // Simulate upvote
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "under_review":
        return <Badge className="bg-blue-100 text-blue-800">Under Review</Badge>
      case "in_progress":
        return <Badge className="bg-yellow-100 text-yellow-800">In Progress</Badge>
      case "resolved":
        return <Badge className="bg-green-100 text-green-800">Resolved</Badge>
      case "planned":
        return <Badge className="bg-purple-100 text-purple-800">Planned</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "feature_request":
        return (
          <Badge variant="outline" className="border-green-200 text-green-800">
            Feature Request
          </Badge>
        )
      case "bug_report":
        return (
          <Badge variant="outline" className="border-red-200 text-red-800">
            Bug Report
          </Badge>
        )
      case "improvement":
        return (
          <Badge variant="outline" className="border-blue-200 text-blue-800">
            Improvement
          </Badge>
        )
      case "general_feedback":
        return (
          <Badge variant="outline" className="border-gray-200 text-gray-800">
            General Feedback
          </Badge>
        )
      default:
        return <Badge variant="outline">{type}</Badge>
    }
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i} className={`h-4 w-4 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
    ))
  }

  const averageRating = feedbackData.reduce((sum, feedback) => sum + feedback.rating, 0) / feedbackData.length
  const totalFeedback = feedbackData.length
  const pendingReview = feedbackData.filter((f) => f.status === "under_review").length
  const inProgress = feedbackData.filter((f) => f.status === "in_progress").length

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-green-800 dark:text-green-200">User Feedback Center</h1>
          <p className="text-green-600 dark:text-green-400">Manage community feedback and feature requests</p>
        </div>
        <Button className="bg-green-600 hover:bg-green-700">
          <MessageSquare className="h-4 w-4 mr-2" />
          Send Update
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-green-200 dark:border-green-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-700 dark:text-green-300">Total Feedback</CardTitle>
            <MessageSquare className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-800 dark:text-green-200">{totalFeedback}</div>
            <p className="text-xs text-green-600 dark:text-green-400">All time submissions</p>
          </CardContent>
        </Card>

        <Card className="border-green-200 dark:border-green-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-700 dark:text-green-300">Average Rating</CardTitle>
            <Star className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-800 dark:text-green-200">{averageRating.toFixed(1)}</div>
            <div className="flex items-center gap-1">{renderStars(Math.round(averageRating))}</div>
          </CardContent>
        </Card>

        <Card className="border-green-200 dark:border-green-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-700 dark:text-green-300">Pending Review</CardTitle>
            <MessageSquare className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{pendingReview}</div>
            <p className="text-xs text-blue-500">Awaiting response</p>
          </CardContent>
        </Card>

        <Card className="border-green-200 dark:border-green-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-700 dark:text-green-300">In Progress</CardTitle>
            <MessageSquare className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{inProgress}</div>
            <p className="text-xs text-yellow-500">Being worked on</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="border-green-200 dark:border-green-800">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-green-500" />
              <Input
                placeholder="Search feedback, users, or topics..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 border-green-200 focus:border-green-400"
              />
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full sm:w-[180px] border-green-200">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="feature_request">Feature Request</SelectItem>
                <SelectItem value="bug_report">Bug Report</SelectItem>
                <SelectItem value="improvement">Improvement</SelectItem>
                <SelectItem value="general_feedback">General Feedback</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[180px] border-green-200">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="under_review">Under Review</SelectItem>
                <SelectItem value="in_progress">In Progress</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
                <SelectItem value="planned">Planned</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Feedback List */}
      <div className="space-y-4">
        {filteredFeedback.map((feedback) => (
          <Card key={feedback.id} className="border-green-200 dark:border-green-800 hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={feedback.avatar || "/placeholder.svg"} alt={feedback.user} />
                    <AvatarFallback className="bg-green-100 text-green-800">
                      {feedback.user
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-green-800 dark:text-green-200">{feedback.title}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-sm text-green-600 dark:text-green-400">{feedback.user}</span>
                      <span className="text-sm text-green-500">•</span>
                      <span className="text-sm text-green-600 dark:text-green-400">{feedback.date}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {getStatusBadge(feedback.status)}
                  {getTypeBadge(feedback.type)}
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-1">
                {renderStars(feedback.rating)}
                <span className="text-sm text-green-600 dark:text-green-400 ml-2">{feedback.rating}/5 stars</span>
              </div>

              <p className="text-green-700 dark:text-green-300">{feedback.message}</p>

              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleUpvote(feedback.id)}
                    className="text-green-600 hover:bg-green-50"
                  >
                    <ThumbsUp className="h-4 w-4 mr-1" />
                    {feedback.upvotes}
                  </Button>
                  <div className="flex items-center gap-1 text-sm text-green-600 dark:text-green-400">
                    <MessageSquare className="h-4 w-4" />
                    {feedback.replies} replies
                  </div>
                </div>

                <div className="flex gap-2">
                  <Select onValueChange={(value) => handleStatusChange(feedback.id, value)}>
                    <SelectTrigger className="w-[140px] h-8 border-green-200">
                      <SelectValue placeholder="Change status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="under_review">Under Review</SelectItem>
                      <SelectItem value="in_progress">In Progress</SelectItem>
                      <SelectItem value="resolved">Resolved</SelectItem>
                      <SelectItem value="planned">Planned</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button
                    size="sm"
                    onClick={() => setSelectedFeedback(feedback)}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <Reply className="h-4 w-4 mr-1" />
                    Reply
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Reply Modal */}
      <Dialog open={!!selectedFeedback} onOpenChange={() => setSelectedFeedback(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-green-800 dark:text-green-200">Reply to Feedback</DialogTitle>
            <DialogDescription className="text-green-600 dark:text-green-400">
              Respond to user feedback and provide updates
            </DialogDescription>
          </DialogHeader>
          {selectedFeedback && (
            <div className="space-y-4">
              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <div className="flex items-center gap-3 mb-2">
                  <Avatar>
                    <AvatarImage src={selectedFeedback.avatar || "/placeholder.svg"} alt={selectedFeedback.user} />
                    <AvatarFallback className="bg-green-100 text-green-800">
                      {selectedFeedback.user
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-semibold text-green-800 dark:text-green-200">{selectedFeedback.title}</h4>
                    <p className="text-sm text-green-600 dark:text-green-400">{selectedFeedback.user}</p>
                  </div>
                </div>
                <p className="text-green-700 dark:text-green-300">{selectedFeedback.message}</p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-green-800 dark:text-green-200">Your Reply</label>
                <Textarea
                  placeholder="Write your response to this feedback..."
                  value={replyMessage}
                  onChange={(e) => setReplyMessage(e.target.value)}
                  className="border-green-200 focus:border-green-400"
                  rows={4}
                />
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  onClick={() => handleReply(selectedFeedback.id, replyMessage)}
                  disabled={!replyMessage.trim()}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <Send className="h-4 w-4 mr-2" />
                  Send Reply
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setSelectedFeedback(null)}
                  className="border-green-200 hover:bg-green-50"
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
