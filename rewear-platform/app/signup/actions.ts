"use server"

import { redirect } from "next/navigation"

export async function signupUser(prevState: any, formData: FormData) {
  const name = formData.get("name") as string
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const confirmPassword = formData.get("confirm-password") as string

  // Simulate a network delay
  await new Promise((resolve) => setTimeout(resolve, 1500))

  if (!name || !email || !password || !confirmPassword) {
    return {
      success: false,
      message: "All fields are required.",
    }
  }

  if (password !== confirmPassword) {
    return {
      success: false,
      message: "Passwords do not match.",
    }
  }

  // Basic dummy registration logic
  if (email === "existing@example.com") {
    return {
      success: false,
      message: "Email already registered.",
    }
  }

  // Simulate successful registration
  console.log(`User registered: Name: ${name}, Email: ${email}`)
  // In a real app, you would hash the password and save to a database.

  // Redirect to login page after successful signup
  redirect("/login?signup=success")
}
