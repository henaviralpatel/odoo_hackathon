"use client"

import { cn } from "@/lib/utils"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { UserDashboardSidebar } from "@/components/user-dashboard-sidebar"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { PlusIcon, EditIcon, Trash2Icon } from "lucide-react"
import { useActionState } from "react"
import { saveProfileChanges, deleteListedItem, cancelSwap, addNewItem } from "./actions"
import { useToast } from "@/hooks/use-toast" // Import useToast

export default function UserDashboardPage() {
  const searchParams = useSearchParams()
  const [activeSection, setActiveSection] = useState("profile")
  const { toast } = useToast() // Initialize useToast

  // Action states for various forms/buttons
  const [profileState, profileAction, isProfilePending] = useActionState(saveProfileChanges, null)
  const [addItemState, addItemAction, isAddItemPending] = useActionState(addNewItem, null)

  // Local states for individual button actions
  const [isDeleting, setIsDeleting] = useState<number | null>(null)
  const [isCancelling, setIsCancelling] = useState<number | null>(null)

  useEffect(() => {
    const section = searchParams.get("section")
    if (section) {
      setActiveSection(section)
    } else {
      setActiveSection("profile") // Default to profile if no section is specified
    }
  }, [searchParams])

  // Handle toast messages for form submissions
  useEffect(() => {
    if (profileState?.message) {
      toast({
        title: profileState.success ? "Success!" : "Error!",
        description: profileState.message,
        variant: profileState.success ? "default" : "destructive",
      })
    }
  }, [profileState, toast])

  useEffect(() => {
    if (addItemState?.message) {
      toast({
        title: addItemState.success ? "Success!" : "Error!",
        description: addItemState.message,
        variant: addItemState.success ? "default" : "destructive",
      })
    }
  }, [addItemState, toast])

  const listedItems = [
    { id: 1, title: "Blue Denim Jacket", condition: "Good", size: "M", status: "Available", points: 200 },
    { id: 2, title: "White Cotton Shirt", condition: "Excellent", size: "L", status: "Pending Swap", points: 150 },
    { id: 3, title: "Black Trousers", condition: "Fair", size: "S", status: "Swapped", points: 100 },
  ]

  const completedSwaps = [
    { id: 1, item: "Red Dress", partner: "Alice", date: "2024-06-15" },
    { id: 2, item: "Green Sweater", partner: "Bob", date: "2024-05-20" },
  ]

  const ongoingSwaps = [
    { id: 1, item: "Striped T-Shirt", partner: "Charlie", status: "Pending Acceptance" },
    { id: 2, item: "Jeans", partner: "David", status: "In Transit" },
  ]

  const handleDeleteItem = async (itemId: number) => {
    setIsDeleting(itemId)
    try {
      const result = await deleteListedItem(itemId)
      toast({
        title: result.success ? "Success!" : "Error!",
        description: result.message,
        variant: result.success ? "default" : "destructive",
      })
    } catch (error: any) {
      toast({
        title: "Error!",
        description: error.message || "Failed to delete item.",
        variant: "destructive",
      })
    } finally {
      setIsDeleting(null)
    }
  }

  const handleCancelSwap = async (swapId: number) => {
    setIsCancelling(swapId)
    try {
      const result = await cancelSwap(swapId)
      toast({
        title: result.success ? "Success!" : "Error!",
        description: result.message,
        variant: result.success ? "default" : "destructive",
      })
    } catch (error: any) {
      toast({
        title: "Error!",
        description: error.message || "Failed to cancel swap.",
        variant: "destructive",
      })
    } finally {
      setIsCancelling(null)
    }
  }

  const renderContent = () => {
    switch (activeSection) {
      case "profile":
        return (
          <Card className="rounded-xl shadow-lg border-rewear-lightgreen/50">
            <CardHeader>
              <CardTitle className="text-rewear-darkgray font-poppins">Profile Information</CardTitle>
              <CardDescription>Manage your personal details and points balance.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <form action={profileAction} className="space-y-6">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-24 w-24 border-2 border-rewear-sage shadow-md">
                    <AvatarImage src="/images/stylish-tshirt.jpeg" alt="User Avatar" />
                    <AvatarFallback className="text-4xl font-poppins text-rewear-darkgray">JD</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-2xl font-poppins font-semibold text-rewear-darkgray">John Doe</h3>
                    <p className="text-muted-foreground">john.doe@example.com</p>
                    <p className="text-xl font-poppins font-medium text-rewear-sage">Points Balance: 500</p>
                  </div>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-rewear-darkgray">
                      Name
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      defaultValue="John Doe"
                      className="border-rewear-gray/50 focus-visible:ring-rewear-sage transition-colors"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-rewear-darkgray">
                      Email
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      defaultValue="john.doe@example.com"
                      type="email"
                      readOnly
                      className="border-rewear-gray/50 bg-muted/20"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-rewear-darkgray">
                      Phone
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      defaultValue="+91 98765 43210"
                      className="border-rewear-gray/50 focus-visible:ring-rewear-sage transition-colors"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address" className="text-rewear-darkgray">
                      Address
                    </Label>
                    <Input
                      id="address"
                      name="address"
                      defaultValue="123, Green Street, Mumbai"
                      className="border-rewear-gray/50 focus-visible:ring-rewear-sage transition-colors"
                      required
                    />
                  </div>
                </div>
                <Button
                  type="submit"
                  disabled={isProfilePending}
                  className="bg-rewear-sage hover:bg-rewear-sage/90 text-primary-foreground shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
                >
                  {isProfilePending ? "Saving..." : "Save Changes"}
                </Button>
                {profileState?.message && (
                  <p className={`text-center text-sm ${profileState.success ? "text-green-600" : "text-red-600"}`}>
                    {profileState.message}
                  </p>
                )}
              </form>
            </CardContent>
          </Card>
        )
      case "listed-items":
        return (
          <Card className="rounded-xl shadow-lg border-rewear-lightgreen/50">
            <CardHeader>
              <CardTitle className="text-rewear-darkgray font-poppins">Your Listed Items</CardTitle>
              <CardDescription>View and manage the clothes you have listed for exchange.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="bg-rewear-lightgreen/30">
                    <TableHead className="font-poppins text-rewear-darkgray">Item</TableHead>
                    <TableHead className="font-poppins text-rewear-darkgray">Condition</TableHead>
                    <TableHead className="font-poppins text-rewear-darkgray">Size</TableHead>
                    <TableHead className="font-poppins text-rewear-darkgray">Status</TableHead>
                    <TableHead className="font-poppins text-rewear-darkgray">Points</TableHead>
                    <TableHead className="text-right font-poppins text-rewear-darkgray">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {listedItems.map((item) => (
                    <TableRow key={item.id} className="hover:bg-rewear-lightgreen/10 transition-colors">
                      <TableCell className="font-medium text-rewear-darkgray">{item.title}</TableCell>
                      <TableCell>{item.condition}</TableCell>
                      <TableCell>{item.size}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            item.status === "Available"
                              ? "default"
                              : item.status === "Pending Swap"
                                ? "secondary"
                                : "outline"
                          }
                          className={cn(
                            "font-medium",
                            item.status === "Available" && "bg-rewear-sage/20 text-rewear-sage",
                            item.status === "Pending Swap" && "bg-rewear-gray/20 text-rewear-gray",
                            item.status === "Swapped" && "border-rewear-gray/50 text-rewear-gray",
                          )}
                        >
                          {item.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-rewear-sage font-medium">{item.points}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="mr-2 hover:bg-rewear-lightgreen/20 transition-colors"
                          // This button would typically open an edit modal or navigate to an edit page
                        >
                          <EditIcon className="h-4 w-4 text-rewear-gray" />
                          <span className="sr-only">Edit</span>
                        </Button>
                        <Button
                          variant="destructive"
                          size="icon"
                          className="hover:bg-destructive/20 transition-colors"
                          onClick={() => handleDeleteItem(item.id)} // Call local handler
                          disabled={isDeleting === item.id}
                        >
                          {isDeleting === item.id ? (
                            <span className="animate-spin">◌</span>
                          ) : (
                            <Trash2Icon className="h-4 w-4" />
                          )}
                          <span className="sr-only">Delete</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )
      case "swaps":
        return (
          <div className="grid gap-6">
            <Card className="rounded-xl shadow-lg border-rewear-lightgreen/50">
              <CardHeader>
                <CardTitle className="text-rewear-darkgray font-poppins">Ongoing Swaps</CardTitle>
                <CardDescription>Track your active clothing exchange requests.</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow className="bg-rewear-lightgreen/30">
                      <TableHead className="font-poppins text-rewear-darkgray">Item</TableHead>
                      <TableHead className="font-poppins text-rewear-darkgray">Swap Partner</TableHead>
                      <TableHead className="font-poppins text-rewear-darkgray">Status</TableHead>
                      <TableHead className="text-right font-poppins text-rewear-darkgray">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {ongoingSwaps.map((swap) => (
                      <TableRow key={swap.id} className="hover:bg-rewear-lightgreen/10 transition-colors">
                        <TableCell className="font-medium text-rewear-darkgray">{swap.item}</TableCell>
                        <TableCell>{swap.partner}</TableCell>
                        <TableCell>
                          <Badge
                            variant={swap.status === "Pending Acceptance" ? "secondary" : "default"}
                            className={cn(
                              "font-medium",
                              swap.status === "Pending Acceptance" && "bg-rewear-gray/20 text-rewear-gray",
                              swap.status === "In Transit" && "bg-rewear-sage/20 text-rewear-sage",
                            )}
                          >
                            {swap.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="outline"
                            size="sm"
                            className="mr-2 bg-transparent border-rewear-sage text-rewear-sage hover:bg-rewear-sage/10 transition-colors"
                            // This button would typically navigate to swap details page
                          >
                            View Details
                          </Button>
                          {swap.status === "Pending Acceptance" && (
                            <Button
                              variant="destructive"
                              size="sm"
                              className="hover:bg-destructive/20 transition-colors"
                              onClick={() => handleCancelSwap(swap.id)} // Call local handler
                              disabled={isCancelling === swap.id}
                            >
                              {isCancelling === swap.id ? <span className="animate-spin">◌</span> : "Cancel"}
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
            <Card className="rounded-xl shadow-lg border-rewear-lightgreen/50">
              <CardHeader>
                <CardTitle className="text-rewear-darkgray font-poppins">Completed Swaps</CardTitle>
                <CardDescription>A history of your successful clothing exchanges.</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow className="bg-rewear-lightgreen/30">
                      <TableHead className="font-poppins text-rewear-darkgray">Item</TableHead>
                      <TableHead className="font-poppins text-rewear-darkgray">Swap Partner</TableHead>
                      <TableHead className="font-poppins text-rewear-darkgray">Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {completedSwaps.map((swap) => (
                      <TableRow key={swap.id} className="hover:bg-rewear-lightgreen/10 transition-colors">
                        <TableCell className="font-medium text-rewear-darkgray">{swap.item}</TableCell>
                        <TableCell>{swap.partner}</TableCell>
                        <TableCell>{swap.date}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        )
      case "add-item":
        return (
          <Card className="rounded-xl shadow-lg border-rewear-lightgreen/50">
            <CardHeader>
              <CardTitle className="text-rewear-darkgray font-poppins">Add New Item</CardTitle>
              <CardDescription>List a new clothing item for exchange or points.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <form action={addItemAction} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="item-title" className="text-rewear-darkgray">
                    Title
                  </Label>
                  <Input
                    id="item-title"
                    name="item-title"
                    placeholder="e.g., Blue Denim Jacket"
                    className="border-rewear-gray/50 focus-visible:ring-rewear-sage transition-colors"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="item-description" className="text-rewear-darkgray">
                    Description
                  </Label>
                  <Textarea
                    id="item-description"
                    name="item-description"
                    placeholder="Describe your item, including any unique features or flaws."
                    rows={4}
                    className="border-rewear-gray/50 focus-visible:ring-rewear-sage transition-colors"
                    required
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="item-size" className="text-rewear-darkgray">
                      Size
                    </Label>
                    <Select name="item-size">
                      <SelectTrigger
                        id="item-size"
                        className="border-rewear-gray/50 focus-visible:ring-rewear-sage transition-colors"
                      >
                        <SelectValue placeholder="Select size" />
                      </SelectTrigger>
                      <SelectContent className="bg-rewear-beige shadow-lg rounded-lg">
                        <SelectItem value="XS">XS</SelectItem>
                        <SelectItem value="S">S</SelectItem>
                        <SelectItem value="M">M</SelectItem>
                        <SelectItem value="L">L</SelectItem>
                        <SelectItem value="XL">XL</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="item-condition" className="text-rewear-darkgray">
                      Condition
                    </Label>
                    <Select name="item-condition">
                      <SelectTrigger
                        id="item-condition"
                        className="border-rewear-gray/50 focus-visible:ring-rewear-sage transition-colors"
                      >
                        <SelectValue placeholder="Select condition" />
                      </SelectTrigger>
                      <SelectContent className="bg-rewear-beige shadow-lg rounded-lg">
                        <SelectItem value="new">New with tags</SelectItem>
                        <SelectItem value="excellent">Excellent (like new)</SelectItem>
                        <SelectItem value="good">Good (minor wear)</SelectItem>
                        <SelectItem value="fair">Fair (visible wear/minor flaws)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="item-tags" className="text-rewear-darkgray">
                    Tags (comma-separated)
                  </Label>
                  <Input
                    id="item-tags"
                    name="item-tags"
                    placeholder="e.g., denim, jacket, casual, winter"
                    className="border-rewear-gray/50 focus-visible:ring-rewear-sage transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="item-images" className="text-rewear-darkgray">
                    Images
                  </Label>
                  <Input
                    id="item-images"
                    name="item-images"
                    type="file"
                    multiple
                    className="border-rewear-gray/50 focus-visible:ring-rewear-sage transition-colors file:text-rewear-sage file:bg-rewear-lightgreen/30 file:border-rewear-sage file:rounded-md file:px-3 file:py-1 file:mr-2 hover:file:bg-rewear-lightgreen/50"
                  />
                  <p className="text-sm text-muted-foreground">Upload up to 5 images of your item.</p>
                </div>
                <Button
                  type="submit"
                  disabled={isAddItemPending}
                  className="w-full bg-rewear-sage hover:bg-rewear-sage/90 text-primary-foreground shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
                >
                  <PlusIcon className="mr-2 h-4 w-4" /> {isAddItemPending ? "Listing..." : "List Item"}
                </Button>
                {addItemState?.message && (
                  <p className={`text-center text-sm ${addItemState.success ? "text-green-600" : "text-red-600"}`}>
                    {addItemState.message}
                  </p>
                )}
              </form>
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
        <UserDashboardSidebar />
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
