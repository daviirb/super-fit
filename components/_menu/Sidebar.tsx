import { cn } from '@/utils/sanitizeClassName';
import { Calendar, Gift, Home, LogOut, Utensils, X } from 'lucide-react';
import { MenuItens } from './MenuItens';

const menuItems = [
  { icon: Home, label: 'Dashboard', href: "/dashboard" , active: true },
  { icon: Utensils, label: 'Alimentos' },
  { icon: Gift, label: 'Bônus', href: "/bonus" },
  { icon: Calendar, label: 'Plano' },
  // { icon: ActivitySquare, label: 'Exercícios' },
  // { icon: BarChart2, label: 'Progresso' },
  // { icon: Settings, label: 'Configurações' },
]

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => Promise<void>;
}

export function Sidebar({ isOpen, onClose, onLogout }: SidebarProps) {
  return (
    <div className={cn(
      "fixed inset-y-0 left-0 z-50 w-64 bg-primary text-white p-4 transform transition-transform duration-300 ease-in-out flex flex-col",
      isOpen ? "translate-x-0" : "-translate-x-full",
      "md:relative md:translate-x-0"
    )}>
      <div className="flex justify-between items-center mb-8">
        <div className="text-2xl font-bold">Super Fit</div>
        <button onClick={onClose} className="md:hidden">
          <X className="w-6 h-6" />
        </button>
      </div>
      <div className='pb-2'>
        {/* <Avatar name="Davi Ribeiro"/> */}
      </div>
      <nav className="flex-grow">
        {menuItems.map((item, index) => (
          <MenuItens item={item} key={index} href={item.href}/>
        ))}
      </nav>
      <div className="mt-auto">
        <button
          onClick={onLogout}
          className="flex items-center space-x-2 p-2 rounded-lg hover:bg-green-700 w-full text-left"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  )
}
