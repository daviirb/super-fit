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
      <div className="grid grid-cols-4 gap-4 md:grid-cols-4">
        {ebooks.map((ebook, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className="mb-2 flex h-20 w-20 items-center justify-center rounded-lg bg-white text-4xl shadow-md">
              📚
            </div>
            <p className="mt-2 text-center text-xs">{ebook.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
