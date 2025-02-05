"use client"

import { Sidebar } from "@/components/Sidebar"
import { TopBar } from "@/components/TopBar"
import { useState, type ReactNode } from "react"

interface DashboardClientProps {
  children: ReactNode
  onLogout: () => Promise<void>
}

export function DashboardClient({ children, onLogout }: DashboardClientProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen)

  return (
    <div className="flex h-screen bg-background">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} onLogout={onLogout} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar onMenuClick={toggleSidebar} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto">{children}</main>
      </div>
    </div>
  )
}

