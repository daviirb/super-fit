import { Download } from 'lucide-react';
import { redirect } from 'next/navigation';

import { auth } from '@/auth';
import BannerWarning from '@/components/BannerWarning';
import { ExpandableMealCard } from '@/components/ExpandibleCard';
import PricingCard from '@/components/PricingCard';
import { Ebook, RecommendedEbooks } from '@/components/RecommendedEbooks';
import { Button } from '@/components/ui/Button';
import { UserInfoCard } from '@/components/UserInfo';
import { fetchSubscriptionByEmail } from '@/lib/stripe';
import { findUserInformations } from '@/models/user';
import { getMealData } from '@/models/userMealPlan';

export default async function HomePage() {
  const session = await auth();
  let subscription = null;

  if (session) {
    const email = session?.user?.email;
    subscription = await fetchSubscriptionByEmail(email ?? '');
  }
  const userName = session?.user?.name?.split(' ')[0];

  const { data: user } = await findUserInformations();
  const { meals } = await getMealData();

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

  if (!user?.height && meals.length === 0) {
    redirect('/quiz');
  }

  const userData = {
    name: userName!,
    weight: user?.weight,
    height: user?.height,
    // waterIntake: 2.5,
    // calorieIntake: 2200,
    goal: user?.goal,
  };
  return (
    <div className="px-2 pb-2">
      {subscription && (
        <>
          <section>{user && <UserInfoCard user={userData} />}</section>
          <section>
            <RecommendedEbooks ebooks={recommendedEbooks} />
          </section>
          <section className="py-2">
            <div className="relative">
              <h1 className="text-xl font-bold">Plano Alimentar</h1>
              <Button size="sm" className="absolute right-4 top-1 gap-2">
                <p>PDF</p>
                <Download className="h-6 w-6" />
              </Button>
              <div className="flex items-center pb-4">
                <span className="flex gap-2">
                  <p className="text-xs">Vencimento:</p>
                  <p className="text-xs">02/05/25</p>
                </span>
              </div>
            </div>
          </section>
          <section>
            <ExpandableMealCard meals={meals} />
          </section>
        </>
      )}
      {!subscription && (
        <>
          <BannerWarning text="Você não possui nenhuma assinatura ativa. Que tal assinar agora? " />
          <PricingCard />
        </>
      )}
    </div>
  );
}
