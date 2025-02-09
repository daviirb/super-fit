import { redirect } from 'next/navigation';

import { auth } from '@/auth';
import PricingCard from '@/components/PricingCard';
import { fetchSubscriptionByEmail } from '@/lib/stripe';

export default async function PricingPage() {
  const session = await auth();

  let subscription = null;

  if (session) {
    const email = session?.user?.email;
    subscription = await fetchSubscriptionByEmail(email ?? '');
  }

  if (subscription) {
    return redirect('/home');
  }
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-green-100 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Escolha seu plano
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Comece sua jornada para uma vida mais saudável hoje!
          </p>
        </div>
        <div className="mt-12 space-y-4 sm:mt-16 sm:grid sm:grid-cols-2 sm:gap-6 sm:space-y-0 lg:mx-auto lg:max-w-4xl xl:mx-0 xl:max-w-none xl:grid-cols-3">
          <PricingCard />
        </div>
      </div>
    </div>
  );
}
