"use client"

import { useState } from "react"
import { AdminSidebar } from "@/components/admin-sidebar"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AdminHeader } from "@/components/admin-header"
import { DashboardOverview } from "@/components/dashboard-overview"
import { UserManagement } from "@/components/user-management"
import { ModerationPanel } from "@/components/moderation-panel"
import { FlaggedContent } from "@/components/flagged-content"
import { InventoryOverview } from "@/components/inventory-overview"
import { FeedbackCenter } from "@/components/feedback-center"
import { EngagementMonitor } from "@/components/engagement-monitor"
import { ThemeProvider } from "@/components/theme-provider"

export default function AdminPanel() {
  const [activeSection, setActiveSection] = useState("dashboard")

  const renderActiveSection = () => {
    switch (activeSection) {
      case "dashboard":
        return <DashboardOverview />
      case "users":
        return <UserManagement />
      case "moderation":
        return <ModerationPanel />
      case "flagged":
        return <FlaggedContent />
      case "inventory":
        return <InventoryOverview />
      case "feedback":
        return <FeedbackCenter />
      case "engagement":
        return <EngagementMonitor />
      default:
        return <DashboardOverview />
    }
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <div className="min-h-screen bg-background">
        <SidebarProvider defaultOpen={true}>
          <div className="flex h-screen overflow-hidden">
            <AdminSidebar activeSection={activeSection} setActiveSection={setActiveSection} />
            <SidebarInset className="flex-1 flex flex-col overflow-hidden">
              <AdminHeader />
              <main className="flex-1 overflow-auto p-4 md:p-6 lg:p-8">
                <div className="max-w-7xl mx-auto">{renderActiveSection()}</div>
              </main>
            </SidebarInset>
          </div>
        </SidebarProvider>
      </div>
    </ThemeProvider>
  )
}
