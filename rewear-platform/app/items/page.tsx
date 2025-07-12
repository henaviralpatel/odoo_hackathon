import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeftIcon } from "lucide-react"
import { cn } from "@/lib/utils"

export default function BrowseItemsPage() {
  const allItems = [
    {
      id: 1,
      title: "Stylish T-Shirt",
      condition: "Good",
      size: "M",
      points: 150,
      image: "/images/stylish-tshirt.jpeg",
      availability: "Available",
    },
    {
      id: 2,
      title: "Cozy Knit Sweater",
      condition: "Excellent",
      size: "L",
      points: 200,
      image: "/images/stylish-tshirt.jpeg",
      availability: "Available",
    },
    {
      id: 3,
      title: "Classic Denim Jeans",
      condition: "Fair",
      size: "S",
      points: 100,
      image: "/images/stylish-tshirt.jpeg",
      availability: "Pending Swap",
    },
    {
      id: 4,
      title: "Elegant Saree",
      condition: "New",
      size: "Free",
      points: 300,
      image: "/images/stylish-tshirt.jpeg",
      availability: "Available",
    },
    {
      id: 5,
      title: "Sporty Hoodie",
      condition: "Good",
      size: "XL",
      points: 180,
      image: "/images/stylish-tshirt.jpeg",
      availability: "Available",
    },
    {
      id: 6,
      title: "Summer Dress",
      condition: "Excellent",
      size: "S",
      points: 220,
      image: "/images/stylish-tshirt.jpeg",
      availability: "Available",
    },
    {
      id: 7,
      title: "Formal Blazer",
      condition: "Good",
      size: "M",
      points: 280,
      image: "/images/stylish-tshirt.jpeg",
      availability: "Available",
    },
    {
      id: 8,
      title: "Kids' Jacket",
      condition: "New",
      size: "XS",
      points: 120,
      image: "/images/stylish-tshirt.jpeg",
      availability: "Swapped",
    },
    {
      id: 9,
      title: "Traditional Kurta",
      condition: "Excellent",
      size: "L",
      points: 250,
      image: "/images/stylish-tshirt.jpeg",
      availability: "Available",
    },
    {
      id: 10,
      title: "Workout Leggings",
      condition: "Good",
      size: "S",
      points: 90,
      image: "/images/stylish-tshirt.jpeg",
      availability: "Available",
    },
  ]

  return (
    <div className="flex flex-col min-h-[calc(100dvh-14rem)] bg-rewear-beige py-12">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-6 text-center mb-12">
          <h1 className="text-4xl font-poppins font-bold tracking-tighter sm:text-5xl md:text-6xl text-rewear-darkgray">
            Browse All Items
          </h1>
          <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
            Explore a wide range of pre-loved clothing available for exchange or redemption.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {allItems.map((item) => (
            <Card
              key={item.id}
              className="overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group"
            >
              <Link href={`/items/${item.id}`} className="block">
                <div className="relative w-full h-48 overflow-hidden">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    width={300}
                    height={300}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <CardContent className="p-4">
                  <CardTitle className="text-lg font-poppins font-semibold text-rewear-darkgray">
                    {item.title}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {item.condition}, {item.size}
                  </p>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-base font-semibold text-rewear-sage">{item.points} Points</span>
                    <Badge
                      variant={item.availability === "Available" ? "default" : "secondary"}
                      className={cn(
                        "font-medium",
                        item.availability === "Available" && "bg-rewear-sage/20 text-rewear-sage",
                        item.availability === "Pending Swap" && "bg-rewear-gray/20 text-rewear-gray",
                        item.availability === "Swapped" && "border-rewear-gray/50 text-rewear-gray",
                      )}
                    >
                      {item.availability}
                    </Badge>
                  </div>
                </CardContent>
              </Link>
            </Card>
          ))}
        </div>

        <div className="flex justify-center mt-12">
          <Link href="/" passHref>
            <Button
              variant="outline"
              className="border-rewear-sage text-rewear-sage hover:bg-rewear-sage/10 bg-transparent shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
            >
              <ArrowLeftIcon className="mr-2 h-4 w-4" /> Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
