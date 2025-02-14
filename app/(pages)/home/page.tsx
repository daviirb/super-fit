import { redirect } from 'next/navigation';

import { auth } from '@/auth';
import BannerWarning from '@/components/BannerWarning';
import { ExpandableMealCard } from '@/components/ExpandibleCard';
import PricingCard from '@/components/PricingCard';
import { RecommendedEbooks } from '@/components/RecommendedEbooks';
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

  if (!user?.height && meals.length === 0) {
    redirect('/quiz');
  }

  const userData = {
    name: userName!,
    weight: user?.weight,
    height: user?.height,
    // waterIntake: 2.5,
    calories: user?.calories,
    goal: user?.goal,
  };
  return (
    <div className="px-2 pb-2">
      {subscription && (
        <>
          <section>{user && <UserInfoCard user={userData} />}</section>
          <section>
            <RecommendedEbooks />
          </section>
          <section className="py-2">
            <div className="relative">
              <h1 className="text-xl font-bold">Plano Alimentar</h1>
              {/* <Button size="sm" className="absolute right-4 top-1 gap-2">
                <p>PDF</p>
                <Download className="h-6 w-6" />
              </Button> */}
              <div className="flex items-center pb-4">
                <span className="flex gap-2">
                  <p className="text-xs">Vencimento:</p>
                  <p className="text-xs">
                    {new Date(
                      subscription.current_period_end * 1000,
                    ).toLocaleDateString('pt-BR')}
                  </p>
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
