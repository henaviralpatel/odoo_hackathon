"use server"

export async function loginUser(prevState: any, formData: FormData) {
  const email = formData.get("user-email") as string
  const password = formData.get("user-password") as string

  // Simulate a network delay
  await new Promise((resolve) => setTimeout(resolve, 1500))

  // Basic dummy authentication
  if (email === "user@example.com" && password === "password123") {
    return {
      success: true,
      message: "Login successful! Redirecting to dashboard...",
    }
  } else {
    return {
      success: false,
      message: "Invalid email or password. Please try again.",
    }
  }
}

export async function loginAdmin(prevState: any, formData: FormData) {
  const email = formData.get("admin-email") as string
  const password = formData.get("admin-password") as string

  // Simulate a network delay
  await new Promise((resolve) => setTimeout(resolve, 1500))

  // Basic dummy authentication for admin
  if (email === "admin@example.com" && password === "admin123") {
    return {
      success: true,
      message: "Admin login successful! Redirecting to admin panel...",
    }
  } else {
    return {
      success: false,
      message: "Invalid admin email or password. Please try again.",
    }
  }
}
