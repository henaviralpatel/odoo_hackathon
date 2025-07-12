"use client"

import { BarChart3, Users, Shield, Flag, Package, MessageSquare, TrendingUp, Leaf, Settings, Bell } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"

const menuItems = [
  {
    title: "Analytics Dashboard",
    icon: BarChart3,
    id: "dashboard",
  },
  {
    title: "User Management",
    icon: Users,
    id: "users",
  },
  {
    title: "Moderation Panel",
    icon: Shield,
    id: "moderation",
  },
  {
    title: "Flagged Content",
    icon: Flag,
    id: "flagged",
  },
  {
    title: "Inventory Overview",
    icon: Package,
    id: "inventory",
  },
  {
    title: "Feedback Center",
    icon: MessageSquare,
    id: "feedback",
  },
  {
    title: "Engagement Monitor",
    icon: TrendingUp,
    id: "engagement",
  },
]

interface AdminSidebarProps {
  activeSection: string
  setActiveSection: (section: string) => void
}

export function AdminSidebar({ activeSection, setActiveSection }: AdminSidebarProps) {
  return (
    <Sidebar className="border-r border-green-100 dark:border-green-900 w-64 flex-shrink-0">
      <SidebarHeader className="border-b border-green-100 dark:border-green-900 p-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-600 flex-shrink-0">
            <Leaf className="h-4 w-4 text-white" />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight min-w-0">
            <span className="truncate font-semibold text-green-800 dark:text-green-200">ReWear Admin</span>
            <span className="truncate text-xs text-green-600 dark:text-green-400">Sustainable Fashion</span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent className="flex-1 overflow-y-auto">
        <SidebarGroup>
          <SidebarGroupLabel className="text-green-700 dark:text-green-300">Management</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    onClick={() => setActiveSection(item.id)}
                    isActive={activeSection === item.id}
                    className="hover:bg-green-50 dark:hover:bg-green-900/20 data-[active=true]:bg-green-100 dark:data-[active=true]:bg-green-900/40 w-full justify-start"
                  >
                    <item.icon className="h-4 w-4 flex-shrink-0" />
                    <span className="truncate">{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t border-green-100 dark:border-green-900 p-4">
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex-1 border-green-200 hover:bg-green-50 bg-transparent">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="border-green-200 hover:bg-green-50 bg-transparent flex-shrink-0"
          >
            <Bell className="h-4 w-4" />
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
