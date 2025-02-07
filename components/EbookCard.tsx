import Image from 'next/image';

interface EbookCardProps {
  title: string;
  imageUrl: string;
}

export function EbookCard({ title, imageUrl }: EbookCardProps) {
  return (
    <div className="flex flex-col overflow-hidden rounded-lg bg-white shadow-md">
      <div className="relative h-40 w-full">
        <Image
          src={imageUrl || '/placeholder.svg'}
          alt={title}
          fill
          style={{ objectFit: 'cover' }}
        />
      </div>
      <div className="p-4">
        <h3 className="text-center text-sm font-semibold">{title}</h3>
      </div>
    </div>
  );
}
