import { cn } from "@/utils/sanitizeClassName"
import { LucideProps } from "lucide-react"
import { ForwardRefExoticComponent, JSX, RefAttributes } from "react"

 type MenuItens = {
   icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>
   isLocked?: boolean 
   label: string
   active?: boolean
 }
 type MenuItensProps = JSX.IntrinsicElements['a'] & {
   item: MenuItens
 }
export function MenuItens({item, ...props}:MenuItensProps) {

  
  return (
     <a 
        {...props}
        className={cn(
          "flex items-center space-x-2 p-2 rounded-lg mb-2 hover:bg-green-700",
          item.active && "bg-green-700"
        )}
      >
        <item.icon className="w-5 h-5" />
        <span>{item.label}</span>
      </a>
    
  )
}