"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"
import { HomeIcon, ListChecksIcon, FlagIcon, UsersIcon, BarChart2Icon, LogOutIcon } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  SidebarFooter,
  useSidebar, // Import useSidebar
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ChevronUp } from "lucide-react"
import { useEffect } from "react"

export function AdminDashboardSidebar() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [activeSection, setActiveSection] = useState("moderation")
  const { state } = useSidebar() // Get the sidebar state

  useEffect(() => {
    const section = searchParams.get("section")
    if (section) {
      setActiveSection(section)
    } else {
      setActiveSection("moderation") // Default to moderation if no section is specified
    }
  }, [searchParams])

  const menuItems = [
    {
      id: "moderation",
      title: "Item Moderation",
      icon: ListChecksIcon,
      href: "/admin?section=moderation",
    },
    {
      id: "flagged-items",
      title: "Flagged Items",
      icon: FlagIcon,
      href: "/admin?section=flagged-items",
    },
    {
      id: "users",
      title: "Manage Users",
      icon: UsersIcon,
      href: "/admin?section=users",
    },
    {
      id: "analytics",
      title: "Analytics",
      icon: BarChart2Icon,
      href: "/admin?section=analytics",
    },
  ]

  return (
    <Sidebar collapsible="icon" className="bg-rewear-beige border-r border-rewear-gray/20 shadow-lg">
      <SidebarHeader className={state === "collapsed" ? "p-1" : "p-2"}>
        <Link href="/" className="flex items-center gap-2 group">
          <HomeIcon className="h-6 w-6 text-rewear-sage group-hover:scale-110 transition-transform" />
          <span className="font-poppins font-bold text-lg text-rewear-darkgray group-data-[state=collapsed]:hidden group-hover:text-rewear-sage transition-colors">
            Admin Panel
          </span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="font-poppins text-rewear-darkgray/70">Admin Tools</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    asChild
                    isActive={activeSection === item.id}
                    className="hover:bg-rewear-lightgreen/50 transition-colors"
                  >
                    <Link href={item.href} onClick={() => setActiveSection(item.id)}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className={state === "collapsed" ? "p-1" : "p-2"}>
        <SidebarSeparator />
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton className="hover:bg-rewear-lightgreen/50 transition-colors">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src="/images/stylish-tshirt.jpeg" alt="Admin Avatar" />
                    <AvatarFallback>AD</AvatarFallback>
                  </Avatar>
                  <span className="group-data-[state=collapsed]:hidden">Admin User</span>
                  <ChevronUp className="ml-auto h-4 w-4 group-data-[state=collapsed]:hidden" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                align="start"
                className="w-[--radix-popper-anchor-width] bg-rewear-beige shadow-lg rounded-lg"
              >
                <DropdownMenuItem className="hover:bg-rewear-lightgreen/50 transition-colors cursor-pointer">
                  <Link href="/logout" className="flex items-center w-full">
                    <LogOutIcon className="mr-2 h-4 w-4" />
                    <span>Logout</span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
