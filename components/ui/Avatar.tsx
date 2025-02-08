type AvatarProps = {
  name: string;
};

export function Avatar({ name }: AvatarProps) {
  const formattedName = name
    ?.split(' ')
    .map((part) => part.charAt(0))
    .join('');

  return (
    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-300">
      <span className="text-white">{formattedName}</span>
    </div>
  );
}
