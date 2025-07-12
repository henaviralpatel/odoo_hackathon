"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useSearchParams, useRouter } from "next/navigation"
import { useActionState } from "react"
import { loginUser, loginAdmin } from "./actions"

export default function LoginPage() {
  const searchParams = useSearchParams()
  const router = useRouter()

  // Initialize activeTab directly from searchParams for the first render
  const initialTab = searchParams.get("tab") === "admin" ? "admin" : "user"
  const [activeTab, setActiveTab] = useState(initialTab)

  // State for user login form
  const [userLoginState, userLoginAction, isUserLoginPending] = useActionState(loginUser, null)
  // State for admin login form
  const [adminLoginState, adminLoginAction, isAdminLoginPending] = useActionState(loginAdmin, null)

  // Redirect on successful login
  useEffect(() => {
    if (userLoginState?.success) {
      console.log(userLoginState.message)
      router.push("/dashboard") // Redirect to user dashboard
    }
  }, [userLoginState, router])

  useEffect(() => {
    if (adminLoginState?.success) {
      console.log(adminLoginState.message)
      router.push("/admin") // Redirect to admin dashboard
    }
  }, [adminLoginState, router])

  return (
    <div className="flex min-h-[calc(100dvh-14rem)] items-center justify-center bg-rewear-beige py-12 px-4">
      <Card className="w-full max-w-md rounded-xl shadow-2xl border-rewear-lightgreen/50">
        <CardHeader className="space-y-2 text-center">
          <CardTitle className="text-3xl font-poppins font-bold text-rewear-darkgray">Welcome to ReWear</CardTitle>
          <CardDescription className="text-muted-foreground">Login to your account to continue.</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-rewear-lightgreen/30 rounded-lg p-1 mb-6">
              <TabsTrigger
                value="user"
                className="data-[state=active]:bg-rewear-sage data-[state=active]:text-primary-foreground data-[state=active]:shadow-md data-[state=active]:font-semibold rounded-md transition-all duration-300"
              >
                User Login
              </TabsTrigger>
              <TabsTrigger
                value="admin"
                className="data-[state=active]:bg-rewear-sage data-[state=active]:text-primary-foreground data-[state=active]:shadow-md data-[state=active]:font-semibold rounded-md transition-all duration-300"
              >
                Admin Login
              </TabsTrigger>
            </TabsList>
            <TabsContent value="user" className="mt-4 space-y-6">
              <form action={userLoginAction} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="user-email" className="text-rewear-darkgray">
                    Email
                  </Label>
                  <Input
                    id="user-email"
                    name="user-email" // Add name attribute for form data
                    type="email"
                    placeholder="user@example.com" // Update placeholder for clarity
                    required
                    className="border-rewear-gray/50 focus-visible:ring-rewear-sage transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="user-password" className="text-rewear-darkgray">
                    Password
                  </Label>
                  <Input
                    id="user-password"
                    name="user-password" // Add name attribute for form data
                    type="password"
                    placeholder="password123" // Update placeholder for clarity
                    required
                    className="border-rewear-gray/50 focus-visible:ring-rewear-sage transition-colors"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={isUserLoginPending}
                  className="w-full bg-rewear-sage hover:bg-rewear-sage/90 text-primary-foreground shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
                >
                  {isUserLoginPending ? "Logging in..." : "Login as User"}
                </Button>
                {userLoginState?.message && (
                  <p className={`text-center text-sm ${userLoginState.success ? "text-green-600" : "text-red-600"}`}>
                    {userLoginState.message}
                  </p>
                )}
              </form>
              <div className="flex justify-between text-sm mt-4">
                <Link href="/signup" className="text-rewear-sage hover:underline font-medium">
                  Sign Up
                </Link>
                <Link href="/forgot-password" className="text-muted-foreground hover:underline">
                  Forgot Password?
                </Link>
              </div>
            </TabsContent>
            <TabsContent value="admin" className="mt-4 space-y-6">
              <form action={adminLoginAction} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="admin-email" className="text-rewear-darkgray">
                    Email
                  </Label>
                  <Input
                    id="admin-email"
                    name="admin-email" // Add name attribute for form data
                    type="email"
                    placeholder="admin@example.com" // Update placeholder for clarity
                    required
                    className="border-rewear-gray/50 focus-visible:ring-rewear-sage transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="admin-password" className="text-rewear-darkgray">
                    Password
                  </Label>
                  <Input
                    id="admin-password"
                    name="admin-password" // Add name attribute for form data
                    type="password"
                    placeholder="admin123" // Update placeholder for clarity
                    required
                    className="border-rewear-gray/50 focus-visible:ring-rewear-sage transition-colors"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={isAdminLoginPending}
                  className="w-full bg-rewear-sage hover:bg-rewear-sage/90 text-primary-foreground shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
                >
                  {isAdminLoginPending ? "Logging in..." : "Login as Admin"}
                </Button>
                {adminLoginState?.message && (
                  <p className={`text-center text-sm ${adminLoginState.success ? "text-green-600" : "text-red-600"}`}>
                    {adminLoginState.message}
                  </p>
                )}
              </form>
              <div className="flex justify-between text-sm mt-4">
                <Link href="/signup" className="text-rewear-sage hover:underline font-medium">
                  Sign Up (User)
                </Link>
                <Link href="/forgot-password" className="text-muted-foreground hover:underline">
                  Forgot Password?
                </Link>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
