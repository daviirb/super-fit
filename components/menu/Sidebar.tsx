import {
  Calendar,
  ChefHat,
  Gift,
  Home,
  LogOut,
  Utensils,
  X,
} from 'lucide-react';

import { cn } from '@/utils/sanitizeClassName';

import { MenuItens } from './MenuItens';

const menuItems = [
  { icon: Home, label: 'Home', href: '/home' },
  { icon: ChefHat, label: 'Receitas', href: '/receitas' },
  { icon: Gift, label: 'Bônus', href: '/bonus' },
  { icon: Utensils, label: 'Lista de Compra' },
  { icon: Calendar, label: 'Plano', href: '/minha-assinatura' },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => Promise<void>;
}

export function Sidebar({ isOpen, onClose, onLogout }: SidebarProps) {
  return (
    <div
      className={cn(
        'fixed inset-y-0 left-0 z-50 flex w-64 transform flex-col bg-primary p-4 text-white transition-transform duration-300 ease-in-out',
        isOpen ? 'translate-x-0' : '-translate-x-full',
        'md:relative md:translate-x-0',
      )}
    >
      <div className="mb-8 flex items-center justify-between">
        <div className="text-2xl font-bold">Super Fit</div>
        <button onClick={onClose} className="md:hidden">
          <X className="h-6 w-6" />
        </button>
      </div>
      <div className="pb-2"></div>
      <nav className="flex-grow">
        {menuItems.map((item, index) => (
          <MenuItens item={item} key={index} href={item.href} />
        ))}
      </nav>
      <div className="mt-auto">
        <button
          onClick={onLogout}
          className="flex w-full items-center space-x-2 rounded-lg p-2 text-left hover:bg-green-700"
        >
          <LogOut className="h-5 w-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}
