import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { ArrowRightIcon, ShirtIcon, HandshakeIcon, AwardIcon } from "lucide-react"

export default function HomePage() {
  const featuredItems = [
    {
      id: 1,
      title: "Stylish T-Shirt",
      condition: "Good",
      size: "M",
      points: 150,
      image: "/images/stylish-tshirt.jpeg",
    },
    {
      id: 2,
      title: "Cozy Knit Sweater",
      condition: "Excellent",
      size: "L",
      points: 200,
      image: "/images/stylish-tshirt.jpeg",
    },
    {
      id: 3,
      title: "Classic Denim Jeans",
      condition: "Fair",
      size: "S",
      points: 100,
      image: "/images/stylish-tshirt.jpeg",
    },
    {
      id: 4,
      title: "Elegant Saree",
      condition: "New",
      size: "Free",
      points: 300,
      image: "/images/stylish-tshirt.jpeg",
    },
    {
      id: 5,
      title: "Sporty Hoodie",
      condition: "Good",
      size: "XL",
      points: 180,
      image: "/images/stylish-tshirt.jpeg",
    },
    {
      id: 6,
      title: "Summer Dress",
      condition: "Excellent",
      size: "S",
      points: 220,
      image: "/images/stylish-tshirt.jpeg",
    },
  ]

  return (
    <div className="flex flex-col min-h-[100dvh]">
      {/* Hero Section */}
      <section className="relative w-full py-12 md:py-24 lg:py-32 bg-rewear-beige text-center overflow-hidden">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=100&width=100&text=Pattern')] bg-repeat opacity-5 dark:opacity-10"></div>
        <div className="container px-4 md:px-6 relative z-10">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="flex flex-col justify-center space-y-4 text-left animate-fade-in-up">
              <h1 className="text-4xl font-poppins font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-rewear-darkgray leading-tight">
                Make India Sustainable, One Shirt at a Time
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl leading-relaxed">
                Exchange unused clothes through ReWear and help reduce textile waste.
              </p>
              <div className="flex flex-col gap-3 min-[400px]:flex-row">
                <Link href="/login" passHref>
                  <Button className="bg-rewear-sage hover:bg-rewear-sage/90 text-primary-foreground shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                    Start Swapping
                  </Button>
                </Link>
                <Link href="/items" passHref>
                  <Button
                    variant="outline"
                    className="border-rewear-sage text-rewear-sage hover:bg-rewear-sage/10 bg-transparent shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                  >
                    Browse Items
                  </Button>
                </Link>
                <Link href="/dashboard?section=add-item" passHref>
                  <Button
                    variant="secondary"
                    className="bg-rewear-gray/20 hover:bg-rewear-gray/30 text-rewear-darkgray shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                  >
                    List an Item
                  </Button>
                </Link>
              </div>
            </div>
            <Image
              src="/images/hero-threads.png"
              width={600}
              height={400}
              alt="Colorful sewing threads representing sustainable fashion and creativity"
              className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last shadow-xl animate-fade-in-right"
              priority
            />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="w-full py-16 md:py-28 lg:py-36 bg-background">
        <div className="container px-4 md:px-6 text-center">
          <div className="space-y-6 max-w-3xl mx-auto">
            <h2 className="text-4xl font-poppins font-bold tracking-tighter sm:text-5xl md:text-6xl text-rewear-darkgray">
              Our Mission: Sustainable Fashion for India
            </h2>
            <p className="mx-auto max-w-[800px] text-muted-foreground md:text-xl leading-relaxed">
              ReWear is dedicated to fostering an eco-conscious clothing exchange community in India. We aim to
              significantly reduce textile waste by providing a platform where unused clothes find new homes, promoting
              sustainability and responsible consumption.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="w-full py-16 md:py-28 lg:py-36 bg-rewear-lightgreen/30">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-6 text-center mb-12">
            <h2 className="text-4xl font-poppins font-bold tracking-tighter sm:text-5xl md:text-6xl text-rewear-darkgray">
              How It Works
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Simple steps to join the ReWear community and make a difference.
            </p>
          </div>
          <div className="mx-auto grid max-w-6xl items-start gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
            <div className="group grid gap-3 p-6 rounded-xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="flex items-center justify-center w-14 h-14 rounded-full bg-rewear-sage/20 text-rewear-sage mb-4 group-hover:bg-rewear-sage/30 transition-colors">
                <ArrowRightIcon className="h-7 w-7 group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="text-xl font-poppins font-bold text-rewear-darkgray">Step 1: Sign Up</h3>
              <p className="text-sm text-muted-foreground">
                Create your free account as a User or Admin to get started.
              </p>
            </div>
            <div className="group grid gap-3 p-6 rounded-xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="flex items-center justify-center w-14 h-14 rounded-full bg-rewear-sage/20 text-rewear-sage mb-4 group-hover:bg-rewear-sage/30 transition-colors">
                <ShirtIcon className="h-7 w-7 group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="text-xl font-poppins font-bold text-rewear-darkgray">Step 2: List or Browse</h3>
              <p className="text-sm text-muted-foreground">
                List your unused clothes or browse items from other users.
              </p>
            </div>
            <div className="group grid gap-3 p-6 rounded-xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="flex items-center justify-center w-14 h-14 rounded-full bg-rewear-sage/20 text-rewear-sage mb-4 group-hover:bg-rewear-sage/30 transition-colors">
                <HandshakeIcon className="h-7 w-7 group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="text-xl font-poppins font-bold text-rewear-darkgray">Step 3: Swap or Redeem</h3>
              <p className="text-sm text-muted-foreground">Directly swap items or use points to redeem clothes.</p>
            </div>
            <div className="group grid gap-3 p-6 rounded-xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="flex items-center justify-center w-14 h-14 rounded-full bg-rewear-sage/20 text-rewear-sage mb-4 group-hover:bg-rewear-sage/30 transition-colors">
                <AwardIcon className="h-7 w-7 group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="text-xl font-poppins font-bold text-rewear-darkgray">Step 4: Confirm & Reward</h3>
              <p className="text-sm text-muted-foreground">
                Confirm delivery and earn points for your sustainable actions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Items Carousel */}
      <section className="w-full py-16 md:py-28 lg:py-36 bg-background">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-6 text-center mb-12">
            <h2 className="text-4xl font-poppins font-bold tracking-tighter sm:text-5xl md:text-6xl text-rewear-darkgray">
              Featured Items
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
              Discover unique finds from our community.
            </p>
          </div>
          <div className="relative">
            <div className="flex overflow-x-auto snap-x snap-mandatory pb-4 scrollbar-hide lg:grid lg:grid-cols-4 lg:gap-6">
              {featuredItems.map((item) => (
                <Card
                  key={item.id}
                  className="min-w-[280px] md:min-w-[300px] lg:min-w-0 snap-center overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group"
                >
                  <Link href={`/items/${item.id}`} className="block">
                    <div className="relative w-full h-48 overflow-hidden">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        width={300}
                        height={300}
                        alt={`Featured Item ${item.id}`}
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
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-rewear-sage text-rewear-sage hover:bg-rewear-sage/10 bg-transparent transition-colors"
                        >
                          Swap
                        </Button>
                      </div>
                    </CardContent>
                  </Link>
                </Card>
              ))}
            </div>
            {/* Simple scroll indicators (optional, can be more complex with JS) */}
            <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-2 mt-4 lg:hidden">
              {Array.from({ length: Math.ceil(featuredItems.length / 2) }).map((_, i) => (
                <span key={i} className="w-2 h-2 bg-rewear-gray/50 rounded-full"></span>
              ))}
            </div>
          </div>
          <div className="flex justify-center mt-12">
            <Link href="/items" passHref>
              <Button
                variant="outline"
                className="border-rewear-sage text-rewear-sage hover:bg-rewear-sage/10 bg-transparent shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
              >
                View All Items <ArrowRightIcon className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Community Stats or Testimonials */}
      <section className="w-full py-16 md:py-28 lg:py-36 bg-rewear-lightgreen/30">
        <div className="container px-4 md:px-6 text-center">
          <div className="grid gap-10 md:grid-cols-2 max-w-4xl mx-auto">
            <div className="space-y-4 p-6 rounded-xl bg-white shadow-lg">
              <h2 className="text-6xl font-poppins font-bold text-rewear-sage animate-pulse-once">2,500+</h2>
              <p className="text-2xl font-poppins font-semibold text-rewear-darkgray">Clothes Reused</p>
              <p className="text-muted-foreground leading-relaxed">
                Our community has given a second life to thousands of garments, significantly reducing textile waste
                across India.
              </p>
            </div>
            <div className="space-y-4 p-6 rounded-xl bg-white shadow-lg">
              <h2 className="text-6xl font-poppins font-bold text-rewear-sage animate-pulse-once">1,200+</h2>
              <p className="text-2xl font-poppins font-semibold text-rewear-darkgray">Trusted Users</p>
              <p className="text-muted-foreground leading-relaxed">
                A growing network of eco-conscious individuals committed to sustainable fashion.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Join Section with Final CTA */}
      <section className="w-full py-16 md:py-28 lg:py-36 bg-background">
        <div className="container px-4 md:px-6 text-center">
          <div className="space-y-6 max-w-3xl mx-auto">
            <h2 className="text-4xl font-poppins font-bold tracking-tighter sm:text-5xl md:text-6xl text-rewear-darkgray">
              Join the ReWear Movement Today!
            </h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl leading-relaxed">
              Be a part of India&apos;s sustainable fashion revolution. Register now and start exchanging!
            </p>
            <Link href="/signup" passHref>
              <Button
                size="lg"
                className="bg-rewear-sage hover:bg-rewear-sage/90 text-primary-foreground shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                Register Now
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
