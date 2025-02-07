type AvatarProps = {
 name: string 
}

export function Avatar({name}:AvatarProps) {  
  const formattedName = name
    ?.split(' ') 
    .map((part) => part.charAt(0))
    .join('')

  return (
    <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
      <span className="text-white">{formattedName}</span>
    </div>
  )
}
