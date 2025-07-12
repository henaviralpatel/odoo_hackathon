"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { AdminDashboardSidebar } from "@/components/admin-dashboard-sidebar"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { CheckCircleIcon, XCircleIcon, EyeIcon, Trash2Icon } from "lucide-react"
import { cn } from "@/lib/utils"

// Import Recharts and Shadcn UI Chart components
import { Line, LineChart, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

// Import new admin actions
import { approveItem, rejectItem, resolveFlaggedItem, removeFlaggedItem, suspendUser, activateUser } from "./actions"
import { useToast } from "@/hooks/use-toast" // Import useToast

export default function AdminPanelPage() {
  const searchParams = useSearchParams()
  const [activeSection, setActiveSection] = useState("moderation")
  const { toast } = useToast() // Initialize useToast

  // Local states for individual button actions
  const [isApproving, setIsApproving] = useState<number | null>(null)
  const [isRejecting, setIsRejecting] = useState<number | null>(null)
  const [isResolving, setIsResolving] = useState<number | null>(null)
  const [isRemoving, setIsRemoving] = useState<number | null>(null)
  const [isSuspending, setIsSuspending] = useState<number | null>(null)
  const [isActivating, setIsActivating] = useState<number | null>(null)

  useEffect(() => {
    const section = searchParams.get("section")
    if (section) {
      setActiveSection(section)
    } else {
      setActiveSection("moderation") // Default to moderation if no section is specified
    }
  }, [searchParams])

  const itemsForModeration = [
    { id: 1, title: "Vintage Leather Jacket", uploader: "User A", date: "2024-07-01", status: "Pending" },
    { id: 2, title: "Kids' T-Shirt (Cartoon)", uploader: "User B", date: "2024-07-02", status: "Pending" },
    { id: 3, title: "Formal Shirt (Stained)", uploader: "User C", date: "2024-07-03", status: "Pending" },
  ]

  const flaggedItems = [
    { id: 1, title: "Damaged Jeans", reason: "Poor Condition", reportedBy: "User X", status: "Flagged" },
    { id: 2, title: "Offensive Print Tee", reason: "Inappropriate Content", reportedBy: "User Y", status: "Flagged" },
  ]

  const userList = [
    { id: 1, name: "John Doe", email: "john.doe@example.com", status: "Active", items: 5, swaps: 3 },
    { id: 2, name: "Jane Smith", email: "jane.smith@example.com", status: "Active", items: 8, swaps: 6 },
    { id: 3, name: "Peter Jones", email: "peter.jones@example.com", status: "Suspended", items: 2, swaps: 1 },
  ]

  // Dummy data for analytics chart
  const analyticsData = [
    { month: "Jan", listedItems: 120, successfulSwaps: 80, activeUsers: 300 },
    { month: "Feb", listedItems: 150, successfulSwaps: 100, activeUsers: 350 },
    { month: "Mar", listedItems: 180, successfulSwaps: 120, activeUsers: 400 },
    { month: "Apr", listedItems: 200, successfulSwaps: 140, activeUsers: 450 },
    { month: "May", listedItems: 230, successfulSwaps: 160, activeUsers: 500 },
    { month: "Jun", listedItems: 260, successfulSwaps: 180, activeUsers: 550 },
    { month: "Jul", listedItems: 290, successfulSwaps: 200, activeUsers: 600 },
  ]

  const handleApproveItem = async (itemId: number) => {
    setIsApproving(itemId)
    try {
      const result = await approveItem(itemId)
      toast({
        title: result.success ? "Success!" : "Error!",
        description: result.message,
        variant: result.success ? "default" : "destructive",
      })
    } catch (error: any) {
      toast({
        title: "Error!",
        description: error.message || "Failed to approve item.",
        variant: "destructive",
      })
    } finally {
      setIsApproving(null)
    }
  }

  const handleRejectItem = async (itemId: number) => {
    setIsRejecting(itemId)
    try {
      const result = await rejectItem(itemId)
      toast({
        title: result.success ? "Success!" : "Error!",
        description: result.message,
        variant: result.success ? "default" : "destructive",
      })
    } catch (error: any) {
      toast({
        title: "Error!",
        description: error.message || "Failed to reject item.",
        variant: "destructive",
      })
    } finally {
      setIsRejecting(null)
    }
  }

  const handleResolveFlaggedItem = async (itemId: number) => {
    setIsResolving(itemId)
    try {
      const result = await resolveFlaggedItem(itemId)
      toast({
        title: result.success ? "Success!" : "Error!",
        description: result.message,
        variant: result.success ? "default" : "destructive",
      })
    } catch (error: any) {
      toast({
        title: "Error!",
        description: error.message || "Failed to resolve flag.",
        variant: "destructive",
      })
    } finally {
      setIsResolving(null)
    }
  }

  const handleRemoveFlaggedItem = async (itemId: number) => {
    setIsRemoving(itemId)
    try {
      const result = await removeFlaggedItem(itemId)
      toast({
        title: result.success ? "Success!" : "Error!",
        description: result.message,
        variant: result.success ? "default" : "destructive",
      })
    } catch (error: any) {
      toast({
        title: "Error!",
        description: error.message || "Failed to remove item.",
        variant: "destructive",
      })
    } finally {
      setIsRemoving(null)
    }
  }

  const handleSuspendUser = async (userId: number) => {
    setIsSuspending(userId)
    try {
      const result = await suspendUser(userId)
      toast({
        title: result.success ? "Success!" : "Error!",
        description: result.message,
        variant: result.success ? "default" : "destructive",
      })
    } catch (error: any) {
      toast({
        title: "Error!",
        description: error.message || "Failed to suspend user.",
        variant: "destructive",
      })
    } finally {
      setIsSuspending(null)
    }
  }

  const handleActivateUser = async (userId: number) => {
    setIsActivating(userId)
    try {
      const result = await activateUser(userId)
      toast({
        title: result.success ? "Success!" : "Error!",
        description: result.message,
        variant: result.success ? "default" : "destructive",
      })
    } catch (error: any) {
      toast({
        title: "Error!",
        description: error.message || "Failed to activate user.",
        variant: "destructive",
      })
    } finally {
      setIsActivating(null)
    }
  }

  const renderContent = () => {
    switch (activeSection) {
      case "moderation":
        return (
          <Card className="rounded-xl shadow-lg border-rewear-lightgreen/50">
            <CardHeader>
              <CardTitle className="text-rewear-darkgray font-poppins">Item Moderation</CardTitle>
              <CardDescription>Review and approve or reject new item listings.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="bg-rewear-lightgreen/30">
                    <TableHead className="font-poppins text-rewear-darkgray">Item Title</TableHead>
                    <TableHead className="font-poppins text-rewear-darkgray">Uploader</TableHead>
                    <TableHead className="font-poppins text-rewear-darkgray">Date Listed</TableHead>
                    <TableHead className="font-poppins text-rewear-darkgray">Status</TableHead>
                    <TableHead className="text-right font-poppins text-rewear-darkgray">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {itemsForModeration.map((item) => (
                    <TableRow key={item.id} className="hover:bg-rewear-lightgreen/10 transition-colors">
                      <TableCell className="font-medium text-rewear-darkgray">{item.title}</TableCell>
                      <TableCell>{item.uploader}</TableCell>
                      <TableCell>{item.date}</TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="bg-rewear-gray/20 text-rewear-gray font-medium">
                          {item.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="mr-2 hover:bg-rewear-lightgreen/20 transition-colors"
                          // This button would typically navigate to item details page
                        >
                          <EyeIcon className="h-4 w-4 text-rewear-gray" />
                          <span className="sr-only">View Details</span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-rewear-sage mr-2 hover:bg-rewear-lightgreen/20 transition-colors"
                          onClick={() => handleApproveItem(item.id)}
                          disabled={isApproving === item.id}
                        >
                          {isApproving === item.id ? (
                            <span className="animate-spin">◌</span>
                          ) : (
                            <CheckCircleIcon className="h-4 w-4" />
                          )}
                          <span className="sr-only">Approve</span>
                        </Button>
                        <Button
                          variant="destructive"
                          size="icon"
                          className="hover:bg-destructive/20 transition-colors"
                          onClick={() => handleRejectItem(item.id)}
                          disabled={isRejecting === item.id}
                        >
                          {isRejecting === item.id ? (
                            <span className="animate-spin">◌</span>
                          ) : (
                            <XCircleIcon className="h-4 w-4" />
                          )}
                          <span className="sr-only">Reject</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )
      case "flagged-items":
        return (
          <Card className="rounded-xl shadow-lg border-rewear-lightgreen/50">
            <CardHeader>
              <CardTitle className="text-rewear-darkgray font-poppins">Flagged Items</CardTitle>
              <CardDescription>Manage items reported by users for various reasons.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="bg-rewear-lightgreen/30">
                    <TableHead className="font-poppins text-rewear-darkgray">Item Title</TableHead>
                    <TableHead className="font-poppins text-rewear-darkgray">Reason</TableHead>
                    <TableHead className="font-poppins text-rewear-darkgray">Reported By</TableHead>
                    <TableHead className="font-poppins text-rewear-darkgray">Status</TableHead>
                    <TableHead className="text-right font-poppins text-rewear-darkgray">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {flaggedItems.map((item) => (
                    <TableRow key={item.id} className="hover:bg-rewear-lightgreen/10 transition-colors">
                      <TableCell className="font-medium text-rewear-darkgray">{item.title}</TableCell>
                      <TableCell>{item.reason}</TableCell>
                      <TableCell>{item.reportedBy}</TableCell>
                      <TableCell>
                        <Badge variant="destructive" className="font-medium">
                          {item.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="mr-2 hover:bg-rewear-lightgreen/20 transition-colors"
                          // This button would typically navigate to item details page
                        >
                          <EyeIcon className="h-4 w-4 text-rewear-gray" />
                          <span className="sr-only">View Details</span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-rewear-sage mr-2 hover:bg-rewear-lightgreen/20 transition-colors"
                          onClick={() => handleResolveFlaggedItem(item.id)}
                          disabled={isResolving === item.id}
                        >
                          {isResolving === item.id ? (
                            <span className="animate-spin">◌</span>
                          ) : (
                            <CheckCircleIcon className="h-4 w-4" />
                          )}
                          <span className="sr-only">Resolve</span>
                        </Button>
                        <Button
                          variant="destructive"
                          size="icon"
                          className="hover:bg-destructive/20 transition-colors"
                          onClick={() => handleRemoveFlaggedItem(item.id)}
                          disabled={isRemoving === item.id}
                        >
                          {isRemoving === item.id ? (
                            <span className="animate-spin">◌</span>
                          ) : (
                            <Trash2Icon className="h-4 w-4" />
                          )}
                          <span className="sr-only">Remove Item</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )
      case "users":
        return (
          <Card className="rounded-xl shadow-lg border-rewear-lightgreen/50">
            <CardHeader>
              <CardTitle className="text-rewear-darkgray font-poppins">User List</CardTitle>
              <CardDescription>View and manage registered users.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="bg-rewear-lightgreen/30">
                    <TableHead className="font-poppins text-rewear-darkgray">Name</TableHead>
                    <TableHead className="font-poppins text-rewear-darkgray">Email</TableHead>
                    <TableHead className="font-poppins text-rewear-darkgray">Status</TableHead>
                    <TableHead className="font-poppins text-rewear-darkgray">Listed Items</TableHead>
                    <TableHead className="font-poppins text-rewear-darkgray">Completed Swaps</TableHead>
                    <TableHead className="text-right font-poppins text-rewear-darkgray">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {userList.map((user) => (
                    <TableRow key={user.id} className="hover:bg-rewear-lightgreen/10 transition-colors">
                      <TableCell className="font-medium text-rewear-darkgray">{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <Badge
                          variant={user.status === "Active" ? "default" : "destructive"}
                          className={cn(
                            "font-medium",
                            user.status === "Active" && "bg-rewear-sage/20 text-rewear-sage",
                          )}
                        >
                          {user.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{user.items}</TableCell>
                      <TableCell>{user.swaps}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="outline"
                          size="sm"
                          className="mr-2 bg-transparent border-rewear-sage text-rewear-sage hover:bg-rewear-sage/10 transition-colors"
                          // This button would typically navigate to user profile page
                        >
                          View Profile
                        </Button>
                        {user.status === "Active" ? (
                          <Button
                            variant="destructive"
                            size="sm"
                            className="hover:bg-destructive/20 transition-colors"
                            onClick={() => handleSuspendUser(user.id)}
                            disabled={isSuspending === user.id}
                          >
                            {isSuspending === user.id ? <span className="animate-spin">◌</span> : "Suspend"}
                          </Button>
                        ) : (
                          <Button
                            variant="default"
                            size="sm"
                            className="bg-rewear-sage hover:bg-rewear-sage/90 transition-colors"
                            onClick={() => handleActivateUser(user.id)}
                            disabled={isActivating === user.id}
                          >
                            {isActivating === user.id ? <span className="animate-spin">◌</span> : "Activate"}
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )
      case "analytics":
        return (
          <Card className="rounded-xl shadow-lg border-rewear-lightgreen/50">
            <CardHeader>
              <CardTitle className="text-rewear-darkgray font-poppins">Analytics Dashboard</CardTitle>
              <CardDescription>Overview of platform performance and user activity.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="text-lg font-poppins font-semibold text-rewear-darkgray">Total Items Listed</h3>
                  <p className="text-4xl font-poppins font-bold text-rewear-sage mt-2">5,230</p>
                </div>
                <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="text-lg font-poppins font-semibold text-rewear-darkgray">Successful Swaps</h3>
                  <p className="text-4xl font-poppins font-bold text-rewear-sage mt-2">3,120</p>
                </div>
                <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="text-lg font-poppins font-semibold text-rewear-darkgray">Active Users</h3>
                  <p className="text-4xl font-poppins font-bold text-rewear-sage mt-2">1,250</p>
                </div>
              </div>
              <ChartContainer
                config={{
                  listedItems: {
                    label: "Items Listed",
                    color: "hsl(var(--primary))", // Using rewear-sage
                  },
                  successfulSwaps: {
                    label: "Successful Swaps",
                    color: "hsl(var(--accent))", // Using a slightly darker sage
                  },
                  activeUsers: {
                    label: "Active Users",
                    color: "hsl(var(--muted-foreground))", // Using muted gray
                  },
                }}
                className="h-[400px] w-full"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={analyticsData}
                    margin={{
                      left: -10,
                    }}
                  >
                    <CartesianGrid vertical={false} stroke="hsl(var(--border))" />
                    <XAxis
                      dataKey="month"
                      tickLine={false}
                      axisLine={false}
                      tickMargin={8}
                      className="text-sm text-muted-foreground"
                    />
                    <YAxis tickLine={false} axisLine={false} tickMargin={8} className="text-sm text-muted-foreground" />
                    <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                    <Legend />
                    <Line
                      dataKey="listedItems"
                      type="monotone"
                      stroke="var(--color-listedItems)"
                      strokeWidth={2}
                      dot={false}
                    />
                    <Line
                      dataKey="successfulSwaps"
                      type="monotone"
                      stroke="var(--color-successfulSwaps)"
                      strokeWidth={2}
                      dot={false}
                    />
                    <Line
                      dataKey="activeUsers"
                      type="monotone"
                      stroke="var(--color-activeUsers)"
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        )
      default:
        return null
    }
  }

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-[calc(100dvh-3.5rem)]">
        {" "}
        {/* Adjusted min-h to account for header */}
        <AdminDashboardSidebar />
        <SidebarInset className="flex-1 p-4 md:p-6 bg-rewear-beige">
          <div className="max-w-6xl mx-auto">
            {" "}
            {/* Added max-width and auto margins */}
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-3xl font-poppins font-bold text-rewear-darkgray capitalize">
                {activeSection.replace("-", " ")}
              </h1>
              <SidebarTrigger className="md:hidden" />
            </div>
            {renderContent()}
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
