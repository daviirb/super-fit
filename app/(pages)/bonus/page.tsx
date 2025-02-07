import { EbookCard } from '@/components/EbookCard';

const ebooks = [
  {
    title: 'Guia de Nutrição Esportiva',
    imageUrl: '/placeholder.svg?height=300&width=200',
  },
  {
    title: 'Treinos em Casa',
    imageUrl: '/placeholder.svg?height=300&width=200',
  },
  {
    title: 'Receitas Fitness',
    imageUrl: '/placeholder.svg?height=300&width=200',
  },
  {
    title: 'Meditação para Atletas',
    imageUrl: '/placeholder.svg?height=300&width=200',
  },
  {
    title: 'Guia de Suplementação',
    imageUrl: '/placeholder.svg?height=300&width=200',
  },
  {
    title: 'Alongamentos Essenciais',
    imageUrl: '/placeholder.svg?height=300&width=200',
  },
];

export default function BonusPage() {
  return (
    <div className="p-4 sm:p-6">
      <h1 className="mb-4 text-2xl font-bold sm:mb-6 sm:text-3xl">
        Bônus - Ebooks Gratuitos
      </h1>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {ebooks.map((ebook, index) => (
          <EbookCard
            key={index}
            title={ebook.title}
            imageUrl={ebook.imageUrl}
          />
        ))}
      </div>
    </div>
  );
}
