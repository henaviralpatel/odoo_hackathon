"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { TagIcon, RulerIcon, ShirtIcon, CheckCircleIcon } from "lucide-react"
import { useState, useEffect } from "react" // Import useEffect
import { cn } from "@/lib/utils"
import { useActionState } from "react"
import { swapItem, redeemItemWithPoints } from "./actions"
import { useToast } from "@/hooks/use-toast" // Import useToast

export default function ItemDetailPage({ params }: { params: { id: string } }) {
  const itemId = params.id
  const [mainImage, setMainImage] = useState(0) // State to control main image display
  const { toast } = useToast() // Initialize useToast

  // Action states for swap and redeem buttons
  const [swapState, swapAction, isSwapPending] = useActionState(async (prevState, formData) => {
    return await swapItem(itemId)
  }, null)

  const [redeemState, redeemAction, isRedeemPending] = useActionState(async (prevState, formData) => {
    return await redeemItemWithPoints(itemId)
  }, null)

  // Handle toast messages for swap and redeem actions
  useEffect(() => {
    if (swapState?.message) {
      toast({
        title: swapState.success ? "Success!" : "Error!",
        description: swapState.message,
        variant: swapState.success ? "default" : "destructive",
      })
    }
  }, [swapState, toast])

  useEffect(() => {
    if (redeemState?.message) {
      toast({
        title: redeemState.success ? "Success!" : "Error!",
        description: redeemState.message,
        variant: redeemState.success ? "default" : "destructive",
      })
    }
  }, [redeemState, toast])

  // Placeholder data for a single item
  const item = {
    id: itemId,
    title: "Classic Blue Denim Jacket",
    description:
      "A timeless blue denim jacket, perfect for all seasons. Features two chest pockets and two side pockets. Gently used, no major flaws. Great for layering or as a light outer layer. This piece is a versatile addition to any wardrobe, promoting sustainable fashion choices.",
    images: [
      "/images/stylish-tshirt.jpeg",
      "/images/stylish-tshirt.jpeg",
      "/images/stylish-tshirt.jpeg",
      "/images/stylish-tshirt.jpeg",
    ],
    uploader: {
      name: "Priya Sharma",
      avatar: "/images/stylish-tshirt.jpeg",
      email: "priya.s@example.com",
    },
    size: "M (Medium)",
    condition: "Good (minor wear)",
    tags: ["denim", "jacket", "casual", "outerwear", "blue", "unisex"],
    points: 250,
    availability: "Available",
  }

  return (
    <div className="container mx-auto py-12 px-4 md:px-6 bg-rewear-beige min-h-[calc(100dvh-14rem)]">
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        {/* Image Gallery */}
        <div className="space-y-4">
          <div className="relative aspect-square overflow-hidden rounded-xl border border-rewear-lightgreen/50 shadow-lg">
            <Image
              src={item.images[mainImage] || "/placeholder.svg"}
              alt={item.title}
              fill
              style={{ objectFit: "cover" }}
              className="rounded-xl transition-transform duration-300 hover:scale-105"
            />
          </div>
          <div className="grid grid-cols-4 gap-3">
            {item.images.map((img, index) => (
              <div
                key={index}
                className={cn(
                  "relative aspect-square overflow-hidden rounded-lg border-2 cursor-pointer transition-all duration-200",
                  mainImage === index
                    ? "border-rewear-sage shadow-md"
                    : "border-rewear-gray/30 hover:border-rewear-sage/50",
                )}
                onClick={() => setMainImage(index)}
              >
                <Image
                  src={img || "/placeholder.svg"}
                  alt={`${item.title} - view ${index + 1}`}
                  fill
                  style={{ objectFit: "cover" }}
                  className="rounded-lg hover:opacity-80 transition-opacity"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Item Details */}
        <div className="space-y-6">
          <h1 className="text-4xl font-poppins font-bold text-rewear-darkgray">{item.title}</h1>
          <div className="flex items-center gap-3">
            <Badge
              variant={item.availability === "Available" ? "default" : "secondary"}
              className={cn(
                "font-medium text-base px-3 py-1 rounded-full",
                item.availability === "Available"
                  ? "bg-rewear-sage/20 text-rewear-sage"
                  : "bg-rewear-gray/20 text-rewear-gray",
              )}
            >
              <CheckCircleIcon className="h-4 w-4 mr-1" /> {item.availability}
            </Badge>
            <span className="text-3xl font-poppins font-semibold text-rewear-sage">{item.points} Points</span>
          </div>

          <p className="text-muted-foreground leading-relaxed text-lg">{item.description}</p>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-1">
              <h3 className="font-poppins font-semibold text-rewear-darkgray flex items-center gap-2 text-lg">
                <RulerIcon className="h-5 w-5 text-rewear-sage" /> Size
              </h3>
              <p className="text-muted-foreground text-base">{item.size}</p>
            </div>
            <div className="space-y-1">
              <h3 className="font-poppins font-semibold text-rewear-darkgray flex items-center gap-2 text-lg">
                <ShirtIcon className="h-5 w-5 text-rewear-sage" /> Condition
              </h3>
              <p className="text-muted-foreground text-base">{item.condition}</p>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-poppins font-semibold text-rewear-darkgray flex items-center gap-2 text-lg">
              <TagIcon className="h-5 w-5 text-rewear-sage" /> Tags
            </h3>
            <div className="flex flex-wrap gap-2">
              {item.tags.map((tag, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="border-rewear-gray/50 text-rewear-gray text-sm px-3 py-1 rounded-full hover:bg-rewear-lightgreen/20 transition-colors"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          {/* Uploader Info */}
          <Card className="bg-rewear-beige/50 shadow-md border-rewear-lightgreen/50">
            <CardHeader>
              <CardTitle className="text-xl font-poppins text-rewear-darkgray">Uploader Information</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center gap-4">
              <Avatar className="h-16 w-16 border-2 border-rewear-sage shadow-sm">
                <AvatarImage src={item.uploader.avatar || "/placeholder.svg"} alt={item.uploader.name} />
                <AvatarFallback className="text-xl font-poppins text-rewear-darkgray">
                  {item.uploader.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-poppins font-semibold text-rewear-darkgray text-lg">{item.uploader.name}</p>
                <p className="text-sm text-muted-foreground">{item.uploader.email}</p>
              </div>
            </CardContent>
          </Card>

          {/* Swap or Redeem Options */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <form action={swapAction} className="flex-1">
              <Button
                type="submit"
                className="w-full bg-rewear-sage hover:bg-rewear-sage/90 text-primary-foreground text-lg py-6 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
                disabled={item.availability !== "Available" || isSwapPending || isRedeemPending}
              >
                {isSwapPending ? "Swapping..." : "Swap This Item"}
              </Button>
              {swapState?.message && (
                <p className={`text-center text-sm mt-2 ${swapState.success ? "text-green-600" : "text-red-600"}`}>
                  {swapState.message}
                </p>
              )}
            </form>
            <form action={redeemAction} className="flex-1">
              <Button
                type="submit"
                variant="outline"
                className="w-full border-rewear-sage text-rewear-sage hover:bg-rewear-sage/10 bg-transparent text-lg py-6 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
                disabled={item.availability !== "Available" || isSwapPending || isRedeemPending}
              >
                {isRedeemPending ? "Redeeming..." : "Redeem with Points"}
              </Button>
              {redeemState?.message && (
                <p className={`text-center text-sm mt-2 ${redeemState.success ? "text-green-600" : "text-red-600"}`}>
                  {redeemState.message}
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
