"use server"

export async function saveProfileChanges(prevState: any, formData: FormData) {
  const name = formData.get("name") as string
  const phone = formData.get("phone") as string
  const address = formData.get("address") as string

  await new Promise((resolve) => setTimeout(resolve, 1000))

  if (!name || !phone || !address) {
    return { success: false, message: "All profile fields are required." }
  }

  console.log("Profile changes saved:", { name, phone, address })
  return { success: true, message: "Profile updated successfully!" }
}

export async function deleteListedItem(itemId: number) {
  await new Promise((resolve) => setTimeout(resolve, 1000))

  console.log(`Item with ID ${itemId} deleted.`)
  return { success: true, message: `Item ${itemId} deleted successfully.` }
}

export async function cancelSwap(swapId: number) {
  await new Promise((resolve) => setTimeout(resolve, 1000))

  console.log(`Swap with ID ${swapId} cancelled.`)
  return { success: true, message: `Swap ${swapId} cancelled.` }
}

export async function addNewItem(prevState: any, formData: FormData) {
  const title = formData.get("item-title") as string
  const description = formData.get("item-description") as string
  const size = formData.get("item-size") as string
  const condition = formData.get("item-condition") as string
  const tags = formData.get("item-tags") as string
  // const images = formData.getAll("item-images") as File[] // For actual file uploads

  await new Promise((resolve) => setTimeout(resolve, 1500))

  if (!title || !description || !size || !condition) {
    return { success: false, message: "Please fill all required item fields." }
  }

  console.log("New item added:", { title, description, size, condition, tags })
  return { success: true, message: `Item "${title}" listed successfully!` }
}
