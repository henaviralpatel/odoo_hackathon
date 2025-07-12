"use server"

export async function approveItem(itemId: number) {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  console.log(`Item with ID ${itemId} approved.`)
  return { success: true, message: `Item ${itemId} approved.` }
}

export async function rejectItem(itemId: number) {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  console.log(`Item with ID ${itemId} rejected.`)
  return { success: true, message: `Item ${itemId} rejected.` }
}

export async function resolveFlaggedItem(itemId: number) {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  console.log(`Flag for item with ID ${itemId} resolved.`)
  return { success: true, message: `Flag for item ${itemId} resolved.` }
}

export async function removeFlaggedItem(itemId: number) {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  console.log(`Flagged item with ID ${itemId} removed.`)
  return { success: true, message: `Flagged item ${itemId} removed.` }
}

export async function suspendUser(userId: number) {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  console.log(`User with ID ${userId} suspended.`)
  return { success: true, message: `User ${userId} suspended.` }
}

export async function activateUser(userId: number) {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  console.log(`User with ID ${userId} activated.`)
  return { success: true, message: `User ${userId} activated.` }
}
