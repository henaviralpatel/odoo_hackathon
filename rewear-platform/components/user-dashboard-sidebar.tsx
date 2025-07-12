"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation" // Import useSearchParams
import { HomeIcon, ShirtIcon, RepeatIcon, PlusCircleIcon, UserIcon, LogOutIcon } from "lucide-react"

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

export function UserDashboardSidebar() {
  const pathname = usePathname()
  const searchParams = useSearchParams() // Use useSearchParams
  const [activeSection, setActiveSection] = useState("profile")
  const { state } = useSidebar() // Get the sidebar state

  useEffect(() => {
    const section = searchParams.get("section")
    if (section) {
      setActiveSection(section)
    } else {
      setActiveSection("profile") // Default to profile if no section is specified
    }
  }, [searchParams])

  const menuItems = [
    {
      id: "profile",
      title: "Profile",
      icon: UserIcon,
      href: "/dashboard?section=profile",
    },
    {
      id: "listed-items",
      title: "Listed Items",
      icon: ShirtIcon,
      href: "/dashboard?section=listed-items",
    },
    {
      id: "swaps",
      title: "Swaps",
      icon: RepeatIcon,
      href: "/dashboard?section=swaps",
    },
    {
      id: "add-item",
      title: "Add New Item",
      icon: PlusCircleIcon,
      href: "/dashboard?section=add-item",
    },
  ]

  return (
    <Sidebar collapsible="icon" className="bg-rewear-beige border-r border-rewear-gray/20 shadow-lg">
      <SidebarHeader className={state === "collapsed" ? "p-1" : "p-2"}>
        <Link href="/" className="flex items-center gap-2 group">
          <HomeIcon className="h-6 w-6 text-rewear-sage group-hover:scale-110 transition-transform" />
          <span className="font-poppins font-bold text-lg text-rewear-darkgray group-data-[state=collapsed]:hidden group-hover:text-rewear-sage transition-colors">
            ReWear
          </span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="font-poppins text-rewear-darkgray/70">Dashboard</SidebarGroupLabel>
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
                    <AvatarImage src="/images/stylish-tshirt.jpeg" alt="User Avatar" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <span className="group-data-[state=collapsed]:hidden">John Doe</span>
                  <ChevronUp className="ml-auto h-4 w-4 group-data-[state=collapsed]:hidden" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                align="start"
                className="w-[--radix-popper-anchor-width] bg-rewear-beige shadow-lg rounded-lg"
              >
                <DropdownMenuItem className="hover:bg-rewear-lightgreen/50 transition-colors cursor-pointer">
                  <Link href="/profile" className="flex items-center w-full">
                    <UserIcon className="mr-2 h-4 w-4" />
                    <span>Profile Settings</span>
                  </Link>
                </DropdownMenuItem>
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
