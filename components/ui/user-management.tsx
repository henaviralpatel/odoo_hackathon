"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Search, Filter, MoreHorizontal, Mail, Ban, CheckCircle, Trash2 } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const users = [
  {
    id: 1,
    name: "Sarah Chen",
    email: "sarah.chen@email.com",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "active",
    joinDate: "2024-01-15",
    swaps: 47,
    points: 2340,
    location: "San Francisco, CA",
    verified: true,
  },
  {
    id: 2,
    name: "Mike Johnson",
    email: "mike.j@email.com",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "active",
    joinDate: "2024-02-03",
    swaps: 42,
    points: 2180,
    location: "New York, NY",
    verified: true,
  },
  {
    id: 3,
    name: "Emma Davis",
    email: "emma.davis@email.com",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "suspended",
    joinDate: "2024-01-28",
    swaps: 38,
    points: 1950,
    location: "Los Angeles, CA",
    verified: false,
  },
  {
    id: 4,
    name: "Alex Kim",
    email: "alex.kim@email.com",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "active",
    joinDate: "2024-03-10",
    swaps: 35,
    points: 1820,
    location: "Seattle, WA",
    verified: true,
  },
  {
    id: 5,
    name: "Lisa Wang",
    email: "lisa.wang@email.com",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "pending",
    joinDate: "2024-03-20",
    swaps: 33,
    points: 1690,
    location: "Austin, TX",
    verified: false,
  },
]

export function UserManagement() {
  const [selectedUsers, setSelectedUsers] = useState<number[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedUser, setSelectedUser] = useState<(typeof users)[0] | null>(null)

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || user.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleSelectUser = (userId: number) => {
    setSelectedUsers((prev) => (prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId]))
  }

  const handleSelectAll = () => {
    setSelectedUsers(selectedUsers.length === filteredUsers.length ? [] : filteredUsers.map((user) => user.id))
  }

  const handleBulkAction = (action: string) => {
    console.log(`Performing ${action} on users:`, selectedUsers)
    // Simulate bulk action
    setSelectedUsers([])
  }

  const handleUserAction = (userId: number, action: string) => {
    console.log(`Performing ${action} on user:`, userId)
    // Simulate user action
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Active</Badge>
      case "suspended":
        return <Badge variant="destructive">Suspended</Badge>
      case "pending":
        return <Badge variant="secondary">Pending</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-green-800 dark:text-green-200">User Management</h1>
          <p className="text-green-600 dark:text-green-400">Manage community members and their activities</p>
        </div>
        <Button className="bg-green-600 hover:bg-green-700">
          <Mail className="h-4 w-4 mr-2" />
          Send Announcement
        </Button>
      </div>

      {/* Filters and Search */}
      <Card className="border-green-200 dark:border-green-800">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-green-500" />
              <Input
                placeholder="Search users by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 border-green-200 focus:border-green-400"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[180px] border-green-200">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="suspended">Suspended</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Bulk Actions */}
      {selectedUsers.length > 0 && (
        <Card className="border-green-200 dark:border-green-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-green-700 dark:text-green-300">
                {selectedUsers.length} user(s) selected
              </span>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleBulkAction("message")}
                  className="border-green-200 hover:bg-green-50"
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Message
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleBulkAction("suspend")}
                  className="border-red-200 hover:bg-red-50 text-red-600"
                >
                  <Ban className="h-4 w-4 mr-2" />
                  Suspend
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleBulkAction("delete")}
                  className="border-red-200 hover:bg-red-50 text-red-600"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Users Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredUsers.map((user) => (
          <Card key={user.id} className="border-green-200 dark:border-green-800 hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <Checkbox
                    checked={selectedUsers.includes(user.id)}
                    onCheckedChange={() => handleSelectUser(user.id)}
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
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-green-800 dark:text-green-200">{user.name}</h3>
                      {user.verified && <CheckCircle className="h-4 w-4 text-green-600" />}
                    </div>
                    <p className="text-sm text-green-600 dark:text-green-400">{user.email}</p>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setSelectedUser(user)}>View Details</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleUserAction(user.id, "message")}>
                      Send Message
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleUserAction(user.id, "suspend")}>
                      Suspend User
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleUserAction(user.id, "delete")} className="text-red-600">
                      Delete User
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-green-600 dark:text-green-400">Status</span>
                {getStatusBadge(user.status)}
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-green-600 dark:text-green-400">Swaps</span>
                  <p className="font-semibold text-green-800 dark:text-green-200">{user.swaps}</p>
                </div>
                <div>
                  <span className="text-green-600 dark:text-green-400">Points</span>
                  <p className="font-semibold text-green-800 dark:text-green-200">{user.points}</p>
                </div>
              </div>
              <div>
                <span className="text-sm text-green-600 dark:text-green-400">Location</span>
                <p className="text-sm font-medium text-green-800 dark:text-green-200">{user.location}</p>
              </div>
              <div>
                <span className="text-sm text-green-600 dark:text-green-400">Joined</span>
                <p className="text-sm font-medium text-green-800 dark:text-green-200">{user.joinDate}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* User Details Modal */}
      <Dialog open={!!selectedUser} onOpenChange={() => setSelectedUser(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-green-800 dark:text-green-200">User Details</DialogTitle>
            <DialogDescription className="text-green-600 dark:text-green-400">
              Complete profile information and activity history
            </DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={selectedUser.avatar || "/placeholder.svg"} alt={selectedUser.name} />
                  <AvatarFallback className="bg-green-100 text-green-800 text-lg">
                    {selectedUser.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-semibold text-green-800 dark:text-green-200">{selectedUser.name}</h3>
                    {selectedUser.verified && <CheckCircle className="h-5 w-5 text-green-600" />}
                  </div>
                  <p className="text-green-600 dark:text-green-400">{selectedUser.email}</p>
                  {getStatusBadge(selectedUser.status)}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="font-semibold text-green-800 dark:text-green-200">Activity Stats</h4>
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <span className="text-green-600 dark:text-green-400">Total Swaps:</span>
                      <span className="font-medium text-green-800 dark:text-green-200">{selectedUser.swaps}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-green-600 dark:text-green-400">Points Earned:</span>
                      <span className="font-medium text-green-800 dark:text-green-200">{selectedUser.points}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-green-600 dark:text-green-400">Join Date:</span>
                      <span className="font-medium text-green-800 dark:text-green-200">{selectedUser.joinDate}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold text-green-800 dark:text-green-200">Location Info</h4>
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <span className="text-green-600 dark:text-green-400">Location:</span>
                      <span className="font-medium text-green-800 dark:text-green-200">{selectedUser.location}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-green-600 dark:text-green-400">Verified:</span>
                      <span className="font-medium text-green-800 dark:text-green-200">
                        {selectedUser.verified ? "Yes" : "No"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <Button
                  onClick={() => handleUserAction(selectedUser.id, "message")}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Send Message
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleUserAction(selectedUser.id, "suspend")}
                  className="border-red-200 hover:bg-red-50 text-red-600"
                >
                  <Ban className="h-4 w-4 mr-2" />
                  Suspend User
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
