import Image from 'next/image';
import Link from 'next/link';

import { Card } from './ui/Card';

export type Ebook = {
  title: string;
  src: string;
  link: string;
};

type EbookCardProps = {
  ebooks: Ebook[];
};

const recommendedEbooks: Ebook[] = [
  {
    title: 'Chás Medicinais',
    src: 'https://aws-assets.kiwify.com.br/on5uYDDYdAA8p25/Design-sem-nome_c20d1135f1c54710a50d4c17eda2ac9f.png',
    link: 'https://pay.kiwify.com.br/jq9eFGP',
  },
  {
    title: '30 Receitas Saudáveis',
    src: 'https://aws-assets.kiwify.com.br/on5uYDDYdAA8p25/Design-sem-nome-1_c2045a1dce5c42a99d3fe2a4e3853938.png',
    link: 'https://pay.kiwify.com.br/SPf7mbY',
  },
  {
    title: 'Cosméticos Naturais',
    src: 'https://aws-assets.kiwify.com.br/on5uYDDYdAA8p25/Post-para-instagram-alimentacao-dieta-minimalista-verde-9_e967ab0310ac492f8de18619d1c4943a.png',
    link: 'https://pay.kiwify.com.br/i7faKcg',
  },
  {
    title: 'Cuidando da Saúde Mental',
    src: 'https://aws-assets.kiwify.com.br/on5uYDDYdAA8p25/Post-para-instagram-alimentacao-dieta-minimalista-verde-10_5bc290aa97964d5581790d0a10cd2f39.png',
    link: 'https://pay.kiwify.com.br/A8r1MNg',
  },
];

export function RecommendedEbooks() {
  return (
    <div className="mb-6">
      <h3 className="text-xl font-semibold">Impulsione seus Resultados 📈</h3>
      <p className="mb-4 text-sm">Ebooks que os especialistas recomendam</p>
      <div className="grid grid-cols-4 gap-2 md:flex">
        {recommendedEbooks.map(({ title, src, link }, index) => (
          <Link href={link} target="_blank" key={index}>
            <Card className="pb-1 md:w-36">
              <div key={index} className="justify-items-center">
                <div className="relative flex h-20 w-full items-center justify-center overflow-hidden rounded-t-lg md:h-36">
                  <Image alt="ebook" src={src} fill />
                </div>
                <p className="mt-1 px-1 text-center text-[10px] md:text-base">
                  {title}
                </p>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
