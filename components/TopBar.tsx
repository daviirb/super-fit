import { Bell, Menu } from "lucide-react"

interface TopBarProps {
  onMenuClick: () => void
}

export function TopBar({ onMenuClick }: TopBarProps) {
  return (
    <div className="flex justify-between items-center p-4 bg-white border-b">
      <div className="flex items-center">
        <button onClick={onMenuClick} className="mr-4 md:hidden">
          <Menu className="w-6 h-6" />
        </button>
        
      </div>
      <div className="flex items-center space-x-4">
        <Bell className="w-5 h-5 text-gray-500" />
        <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
      </div>
    </div>
  )
}

