"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Search, Filter, CheckCircle, X, Eye, AlertTriangle } from "lucide-react"
import Image from "next/image"

const pendingItems = [
  {
    id: 1,
    title: "Vintage Denim Jacket",
    description: "Classic 90s denim jacket in excellent condition. Perfect for layering!",
    category: "Outerwear",
    condition: "Excellent",
    size: "M",
    brand: "Levi's",
    user: "Sarah Chen",
    submittedDate: "2024-03-20",
    images: ["/placeholder.svg?height=200&width=200"],
    status: "pending",
    flagged: false,
  },
  {
    id: 2,
    title: "Designer Silk Scarf",
    description: "Beautiful silk scarf with floral pattern. Authentic designer piece.",
    category: "Accessories",
    condition: "Good",
    size: "One Size",
    brand: "Hermès",
    user: "Emma Davis",
    submittedDate: "2024-03-19",
    images: ["/placeholder.svg?height=200&width=200"],
    status: "pending",
    flagged: true,
  },
  {
    id: 3,
    title: "Casual Summer Dress",
    description: "Light and airy summer dress, perfect for warm weather.",
    category: "Dresses",
    condition: "Very Good",
    size: "S",
    brand: "Zara",
    user: "Lisa Wang",
    submittedDate: "2024-03-18",
    images: ["/placeholder.svg?height=200&width=200"],
    status: "pending",
    flagged: false,
  },
  {
    id: 4,
    title: "Athletic Running Shoes",
    description: "Barely worn running shoes, great for workouts and casual wear.",
    category: "Footwear",
    condition: "Excellent",
    size: "8.5",
    brand: "Nike",
    user: "Mike Johnson",
    submittedDate: "2024-03-17",
    images: ["/placeholder.svg?height=200&width=200"],
    status: "pending",
    flagged: false,
  },
]

export function ModerationPanel() {
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [selectedItem, setSelectedItem] = useState<(typeof pendingItems)[0] | null>(null)
  const [rejectionReason, setRejectionReason] = useState("")

  const filteredItems = pendingItems.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.user.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === "all" || item.category === categoryFilter
    return matchesSearch && matchesCategory
  })

  const handleApprove = (itemId: number) => {
    console.log(`Approving item ${itemId}`)
    // Simulate approval
    setSelectedItem(null)
  }

  const handleReject = (itemId: number, reason: string) => {
    console.log(`Rejecting item ${itemId} with reason: ${reason}`)
    // Simulate rejection
    setSelectedItem(null)
    setRejectionReason("")
  }

  const handleFlag = (itemId: number) => {
    console.log(`Flagging item ${itemId}`)
    // Simulate flagging
  }

  const getConditionBadge = (condition: string) => {
    switch (condition) {
      case "Excellent":
        return <Badge className="bg-green-100 text-green-800">Excellent</Badge>
      case "Very Good":
        return <Badge className="bg-blue-100 text-blue-800">Very Good</Badge>
      case "Good":
        return <Badge className="bg-yellow-100 text-yellow-800">Good</Badge>
      default:
        return <Badge variant="outline">{condition}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-green-800 dark:text-green-200">Moderation Panel</h1>
          <p className="text-green-600 dark:text-green-400">Review and approve community submissions</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="border-orange-200 text-orange-800">
            {filteredItems.length} Pending Review
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
                placeholder="Search items, brands, or users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 border-green-200 focus:border-green-400"
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full sm:w-[180px] border-green-200">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Outerwear">Outerwear</SelectItem>
                <SelectItem value="Accessories">Accessories</SelectItem>
                <SelectItem value="Dresses">Dresses</SelectItem>
                <SelectItem value="Footwear">Footwear</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Items Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredItems.map((item) => (
          <Card key={item.id} className="border-green-200 dark:border-green-800 hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="relative">
                <Image
                  src={item.images[0] || "/placeholder.svg"}
                  alt={item.title}
                  width={200}
                  height={200}
                  className="w-full h-48 object-cover rounded-md"
                />
                {item.flagged && (
                  <div className="absolute top-2 right-2">
                    <AlertTriangle className="h-5 w-5 text-red-500 bg-white rounded-full p-1" />
                  </div>
                )}
              </div>
              <div className="space-y-2">
                <div className="flex items-start justify-between">
                  <h3 className="font-semibold text-green-800 dark:text-green-200 line-clamp-1">{item.title}</h3>
                  {item.flagged && (
                    <Badge variant="destructive" className="text-xs">
                      Flagged
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-green-600 dark:text-green-400 line-clamp-2">{item.description}</p>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="text-green-600 dark:text-green-400">Brand</span>
                  <p className="font-medium text-green-800 dark:text-green-200">{item.brand}</p>
                </div>
                <div>
                  <span className="text-green-600 dark:text-green-400">Size</span>
                  <p className="font-medium text-green-800 dark:text-green-200">{item.size}</p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-green-600 dark:text-green-400">Condition</span>
                {getConditionBadge(item.condition)}
              </div>

              <div className="text-sm">
                <span className="text-green-600 dark:text-green-400">Submitted by </span>
                <span className="font-medium text-green-800 dark:text-green-200">{item.user}</span>
              </div>

              <div className="text-sm">
                <span className="text-green-600 dark:text-green-400">Date: </span>
                <span className="font-medium text-green-800 dark:text-green-200">{item.submittedDate}</span>
              </div>

              <div className="flex gap-2 pt-2">
                <Button
                  size="sm"
                  onClick={() => setSelectedItem(item)}
                  variant="outline"
                  className="flex-1 border-green-200 hover:bg-green-50"
                >
                  <Eye className="h-4 w-4 mr-1" />
                  Review
                </Button>
                <Button size="sm" onClick={() => handleApprove(item.id)} className="bg-green-600 hover:bg-green-700">
                  <CheckCircle className="h-4 w-4 mr-1" />
                  Approve
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => {
                    setSelectedItem(item)
                    // Open rejection dialog
                  }}
                >
                  <X className="h-4 w-4 mr-1" />
                  Reject
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Item Details Modal */}
      <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-green-800 dark:text-green-200">Item Review</DialogTitle>
            <DialogDescription className="text-green-600 dark:text-green-400">
              Review item details and make moderation decision
            </DialogDescription>
          </DialogHeader>
          {selectedItem && (
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Image
                    src={selectedItem.images[0] || "/placeholder.svg"}
                    alt={selectedItem.title}
                    width={400}
                    height={400}
                    className="w-full h-80 object-cover rounded-lg"
                  />
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold text-green-800 dark:text-green-200 mb-2">
                      {selectedItem.title}
                    </h3>
                    <p className="text-green-600 dark:text-green-400">{selectedItem.description}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-sm text-green-600 dark:text-green-400">Category</span>
                      <p className="font-medium text-green-800 dark:text-green-200">{selectedItem.category}</p>
                    </div>
                    <div>
                      <span className="text-sm text-green-600 dark:text-green-400">Brand</span>
                      <p className="font-medium text-green-800 dark:text-green-200">{selectedItem.brand}</p>
                    </div>
                    <div>
                      <span className="text-sm text-green-600 dark:text-green-400">Size</span>
                      <p className="font-medium text-green-800 dark:text-green-200">{selectedItem.size}</p>
                    </div>
                    <div>
                      <span className="text-sm text-green-600 dark:text-green-400">Condition</span>
                      {getConditionBadge(selectedItem.condition)}
                    </div>
                  </div>

                  <div>
                    <span className="text-sm text-green-600 dark:text-green-400">Submitted by</span>
                    <p className="font-medium text-green-800 dark:text-green-200">{selectedItem.user}</p>
                  </div>

                  <div>
                    <span className="text-sm text-green-600 dark:text-green-400">Submission Date</span>
                    <p className="font-medium text-green-800 dark:text-green-200">{selectedItem.submittedDate}</p>
                  </div>

                  {selectedItem.flagged && (
                    <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-red-600" />
                        <span className="text-sm font-medium text-red-800 dark:text-red-200">Flagged Content</span>
                      </div>
                      <p className="text-sm text-red-600 dark:text-red-400 mt-1">
                        This item has been flagged by the community and requires careful review.
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-green-800 dark:text-green-200 mb-2 block">
                    Rejection Reason (if rejecting)
                  </label>
                  <Textarea
                    placeholder="Provide a reason for rejection..."
                    value={rejectionReason}
                    onChange={(e) => setRejectionReason(e.target.value)}
                    className="border-green-200 focus:border-green-400"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <Button onClick={() => handleApprove(selectedItem.id)} className="bg-green-600 hover:bg-green-700">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Approve Item
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => handleReject(selectedItem.id, rejectionReason)}
                    disabled={!rejectionReason.trim()}
                  >
                    <X className="h-4 w-4 mr-2" />
                    Reject Item
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleFlag(selectedItem.id)}
                    className="border-orange-200 hover:bg-orange-50 text-orange-600"
                  >
                    <AlertTriangle className="h-4 w-4 mr-2" />
                    Flag for Review
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
