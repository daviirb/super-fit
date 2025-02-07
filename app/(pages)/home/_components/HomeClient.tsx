"use client"

import { Sidebar } from "@/components/_menu/Sidebar"
import { TopBar } from "@/components/_menu/TopBar"
import { useState, type ReactNode } from "react"

interface HomeClientProps {
  children: ReactNode
  onLogout: () => Promise<void>
  userName: string
}

export function HomeClient({ children, onLogout }: HomeClientProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen)

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} onLogout={onLogout} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar onMenuClick={toggleSidebar} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto">{children}</main>
      </div>
    </div>
  )
}

