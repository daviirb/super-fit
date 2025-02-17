import Link from 'next/link';

import { auth } from '@/auth';
import BannerWarning from '@/components/BannerWarning';
import PricingCard from '@/components/PricingCard';
import { Button } from '@/components/ui/Button';
import { fetchSubscriptionByEmail } from '@/lib/stripe';

import { RecipeCard } from './_components/RecipeCard';

export default async function RecipePage() {
  const session = await auth();
  let subscription = null;

  if (session) {
    const email = session?.user?.email;
    subscription = await fetchSubscriptionByEmail(email ?? '');
  }
  return (
    <main className="flex w-full flex-col p-2">
      <header className="mb-4">
        <h1 className="text-2xl font-bold">Receitas Fit</h1>
      </header>
      {subscription && (
        <>
          <section>
            <div className="grid grid-cols-2 place-items-center gap-y-4 md:gap-x-8 lg:grid-cols-3">
              <RecipeCard
                recipe={panquecafit}
                name="Panqueca Fit"
                src="/panquecafit.webp"
                alt="Image da Panqueca"
                time={8}
                calories={225}
              />
            </div>
          </section>
          <Button variant="link" className="mt-16">
            <Link href={'https://pay.kiwify.com.br/SPf7mbY'} target="_blank">
              Descubra Mais Receitas Receitas Poderosas
            </Link>
          </Button>
        </>
      )}
      {!subscription && (
        <>
          <BannerWarning text="Você não possui nenhuma assinatura ativa. Que tal assinar agora? " />
          <PricingCard />
        </>
      )}
    </main>
  );
}

const panquecafit = {
  title: 'Panqueca Fit',
  description: 'Uma opção leve e deliciosa para o seu café da manhã!',
  quantity: '1 porção',
  time: '8 min',
  ingredients: [
    '1 Ovo',
    '1 Banana',
    '1 colher (sopa) de Aveia',
    '1 colher (sopa) de cacau em pó (opcional)',
  ],
  steps: [
    'Em um pote misture ou bata o ovo, a aveia e a banana amassada',
    'Unte uma frigideira com óleo de coco e aqueça',
    'Despeje a mistura na frigideira e quando a massa já estiver desgrudando, vire-a',
    'Adicione mel, frutas, caldas de sua preferência',
  ],
};
