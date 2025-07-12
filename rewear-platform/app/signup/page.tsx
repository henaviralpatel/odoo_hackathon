"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useActionState } from "react" // Import useActionState
import { signupUser } from "./actions" // Import the new action

export default function SignUpPage() {
  const [state, action, isPending] = useActionState(signupUser, null) // Initialize useActionState

  return (
    <div className="flex min-h-[calc(100dvh-14rem)] items-center justify-center bg-rewear-beige py-12 px-4">
      <Card className="w-full max-w-md rounded-xl shadow-2xl border-rewear-lightgreen/50">
        <CardHeader className="space-y-2 text-center">
          <CardTitle className="text-3xl font-poppins font-bold text-rewear-darkgray">
            Create Your ReWear Account
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Sign up as a user to start exchanging clothes.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <form action={action} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-rewear-darkgray">
                Name
              </Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="John Doe"
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
                type="email"
                placeholder="m@example.com"
                className="border-rewear-gray/50 focus-visible:ring-rewear-sage transition-colors"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-rewear-darkgray">
                Password
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                className="border-rewear-gray/50 focus-visible:ring-rewear-sage transition-colors"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password" className="text-rewear-darkgray">
                Confirm Password
              </Label>
              <Input
                id="confirm-password"
                name="confirm-password"
                type="password"
                className="border-rewear-gray/50 focus-visible:ring-rewear-sage transition-colors"
                required
              />
            </div>
            <Button
              type="submit"
              disabled={isPending}
              className="w-full bg-rewear-sage hover:bg-rewear-sage/90 text-primary-foreground shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
            >
              {isPending ? "Signing Up..." : "Sign Up as User"}
            </Button>
            {state?.message && (
              <p className={`text-center text-sm ${state.success ? "text-green-600" : "text-red-600"}`}>
                {state.message}
              </p>
            )}
          </form>
          <div className="text-center text-sm mt-4">
            Already have an account?{" "}
            <Link href="/login" className="text-rewear-sage hover:underline font-medium">
              Login
            </Link>
          </div>
          <div className="text-center text-sm mt-2">
            Are you an admin?{" "}
            <Link href="/login?tab=admin" className="text-muted-foreground hover:underline">
              Login here
            </Link>{" "}
            (Admin registration is invite-only)
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
