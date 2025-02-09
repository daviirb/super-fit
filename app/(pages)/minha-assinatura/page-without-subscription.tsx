import BannerWarning from '@/components/BannerWarning';
import PricingCard from '@/components/PricingCard';

export default async function MySubscription() {
  return (
    <>
      <h1 className="mb-6 text-3xl font-bold">Minha Assinatura</h1>
      <BannerWarning text="Você precisa de uma assinatura ativa. Quer tal assinar agora?" />
      <PricingCard />
    </>
  );
}
