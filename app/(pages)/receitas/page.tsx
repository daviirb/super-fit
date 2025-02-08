import { Button } from '@/components/ui/Button';

import { RecipeCard } from './_components/RecipeCard';

export default function RecipePage() {
  return (
    <main className="flex w-full flex-col p-2">
      <header className="mb-4">
        <h1 className="text-2xl font-bold">Receitas Fit</h1>
      </header>
      <section>
        <div className="grid grid-cols-2 place-items-center gap-y-4 md:gap-x-8 lg:grid-cols-3">
          <RecipeCard name="Panqueca Fit" time={20} calories={180} />
          <RecipeCard name="Panqueca Fit" time={20} calories={180} />
          <RecipeCard name="Panqueca Fit" time={20} calories={180} />
          <RecipeCard name="Panqueca Fit" time={20} calories={180} />
          <RecipeCard name="Panqueca Fit" time={20} calories={180} />
          <RecipeCard name="Panqueca Fit" time={20} calories={180} />
        </div>
      </section>
      <Button variant="link">Descubra Mais Receitas Receitas Poderosas</Button>
    </main>
  );
}
