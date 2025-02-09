import { auth } from '@/auth';
import BannerWarning from '@/components/BannerWarning';
import PricingCard from '@/components/PricingCard';
import { fetchSubscription } from '@/lib/stripe';

import ActionCard from './_components/ActionCard';
import PlanCard from './_components/PlanCard';

export default async function MySubscription() {
  const session = await auth();

  let subscription = null;

  if (session?.user?.email) {
    const email = session?.user?.email;
    subscription = await fetchSubscription(email);
  }

  return (
    <div className="px-4">
      <h1 className="mb-6 text-3xl font-bold">Minha Assinatura</h1>
      {subscription && (
        <div className="space-y-6 md:flex md:gap-10">
          <PlanCard subscription={subscription} />
          <ActionCard subscription={subscription} />
        </div>
      )}
      {!subscription && (
        <>
          <BannerWarning text="Você precisa de uma assinatura ativa. Quer tal assinar agora?" />
          <PricingCard />
        </>
      )}
    </div>
  );
}
