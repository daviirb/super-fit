import { Download } from 'lucide-react';

import { auth } from '@/auth';
import { ExpandableMealCard } from '@/components/ExpandibleCard';
import { RecommendedEbooks } from '@/components/RecommendedEbooks';
import { Button } from '@/components/ui/Button';
import { UserInfoCard } from '@/components/UserInfo';

export default async function HomePage() {
  const session = await auth();
  if (!session?.user) return null;

  const userName = session.user.name?.split(' ')[0];

  const recommendedEbooks = [
    { title: 'Chás Medicinais' },
    { title: '30 Receitas Saudáveis' },
    { title: 'Cosméticos Naturais' },
    { title: 'Cuidando da Saúde Mental' },
  ];

  const userData = {
    name: userName!,
    weight: 75,
    height: 180,
    waterIntake: 2.5,
    calorieIntake: 2200,
    goal: 'Ganhar massa',
  };
  return (
    <div className="px-2 pb-2">
      <section>
        <UserInfoCard user={userData} />
      </section>
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
        <ExpandableMealCard />
      </section>
    </div>
  );
}
