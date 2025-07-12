import Link from "next/link"
import { MountainIcon } from "lucide-react"

export function SiteFooter() {
  return (
    <footer className="border-t bg-background py-6 md:py-8">
      <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
        <div className="flex items-center space-x-2">
          <MountainIcon className="h-6 w-6 text-rewear-sage" />
          <span className="font-poppins font-bold text-lg text-rewear-darkgray">ReWear</span>
        </div>
        <p className="text-center text-sm text-muted-foreground md:text-left">
          &copy; {new Date().getFullYear()} ReWear. All rights reserved.
        </p>
        <nav className="flex gap-4 sm:gap-6">
          <Link href="#" className="text-sm text-muted-foreground hover:text-rewear-sage transition-colors">
            Terms of Service
          </Link>
          <Link href="#" className="text-sm text-muted-foreground hover:text-rewear-sage transition-colors">
            Privacy Policy
          </Link>
        </nav>
      </div>
    </footer>
  )
}
