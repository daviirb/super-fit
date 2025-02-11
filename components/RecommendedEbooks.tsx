import Image from 'next/image';

import { Card } from './ui/Card';

interface Ebook {
  title: string;
}

interface EbookCardProps {
  ebooks: Ebook[];
}

export function RecommendedEbooks({ ebooks }: EbookCardProps) {
  return (
    <div className="mb-6">
      <h3 className="text-xl font-semibold">Impulsione seus Resultados 📈</h3>
      <p className="mb-4 text-sm">Ebooks que os especialistas recomendam</p>
      <div className="grid grid-cols-4 gap-2 md:flex">
        {ebooks.map((ebook, index) => (
          <>
            <Card className="pb-1 md:w-36" key={index}>
              <div key={index} className="justify-items-center">
                <div className="relative flex h-16 w-full items-center justify-center overflow-hidden rounded-t-lg md:h-36">
                  <Image alt="ebook" src={'/cosmeticos.png'} fill />
                </div>
                <p className="mt-1 px-1 text-center text-[10px] md:text-base">
                  {ebook.title}
                </p>
              </div>
            </Card>
          </>
        ))}
      </div>
    </div>
  );
}
