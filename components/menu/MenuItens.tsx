import { LucideProps } from 'lucide-react';
import { ForwardRefExoticComponent, JSX, RefAttributes } from 'react';

import { cn } from '@/utils/sanitizeClassName';

type MenuItens = {
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>
  >;
  isLocked?: boolean;
  label: string;
  active?: boolean;
};
type MenuItensProps = JSX.IntrinsicElements['a'] & {
  item: MenuItens;
};
export function MenuItens({ item, ...props }: MenuItensProps) {
  return (
    <a
      {...props}
      className={cn(
        'mb-2 flex items-center space-x-2 rounded-lg p-2 hover:bg-green-700',
        item.active && 'bg-green-700',
      )}
    >
      <item.icon className="h-5 w-5" />
      <span>{item.label}</span>
    </a>
  );
}
