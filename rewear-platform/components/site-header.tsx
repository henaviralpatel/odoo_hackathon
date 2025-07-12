"use client"

import Link from "next/link"
import { MountainIcon, MenuIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ThemeToggle } from "@/components/ui/theme-toggle"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2 group">
          <MountainIcon className="h-6 w-6 text-rewear-sage group-hover:scale-110 transition-transform" />
          <span className="font-poppins font-bold text-lg text-rewear-darkgray group-hover:text-rewear-sage transition-colors">
            ReWear
          </span>
        </Link>
        <nav className="hidden md:flex items-center space-x-6">
          <Link
            href="/"
            className="text-sm font-medium text-rewear-darkgray hover:text-rewear-sage transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-rewear-sage after:transition-all after:duration-300 hover:after:w-full"
          >
            Home
          </Link>
          <Link
            href="/items"
            className="text-sm font-medium text-rewear-darkgray hover:text-rewear-sage transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-rewear-sage after:transition-all after:duration-300 hover:after:w-full"
          >
            Browse Items
          </Link>
          <Link
            href="/dashboard?section=add-item"
            className="text-sm font-medium text-rewear-darkgray hover:text-rewear-sage transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-rewear-sage after:transition-all after:duration-300 hover:after:w-full"
          >
            List an Item
          </Link>
          <Link
            href="/login"
            className="text-sm font-medium text-rewear-darkgray hover:text-rewear-sage transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-rewear-sage after:transition-all after:duration-300 hover:after:w-full"
          >
            Login
          </Link>
          <ThemeToggle />
        </nav>
        <div className="md:hidden flex items-center space-x-2">
          <ThemeToggle />
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="hover:bg-rewear-lightgreen/20 transition-colors">
                <MenuIcon className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-rewear-beige">
              <div className="flex flex-col gap-4 py-6">
                <Link
                  href="/"
                  className="text-lg font-medium text-rewear-darkgray hover:text-rewear-sage transition-colors"
                >
                  Home
                </Link>
                <Link
                  href="/items"
                  className="text-lg font-medium text-rewear-darkgray hover:text-rewear-sage transition-colors"
                >
                  Browse Items
                </Link>
                <Link
                  href="/dashboard?section=add-item"
                  className="text-lg font-medium text-rewear-darkgray hover:text-rewear-sage transition-colors"
                >
                  List an Item
                </Link>
                <Link
                  href="/login"
                  className="text-lg font-medium text-rewear-darkgray hover:text-rewear-sage transition-colors"
                >
                  Login
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
