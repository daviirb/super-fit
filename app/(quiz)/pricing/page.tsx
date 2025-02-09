import PricingCard from '@/components/PricingCard';

const plans = [
  {
    name: 'Dieta',
    price: 'R$ 19,90',
    features: [
      'Plano alimentar personalizado',
      'Acesso ao app por 1 mês',
      'Suporte por email',
    ],
  },
  {
    name: 'Dieta + Treino',
    price: 'R$ 29,90',
    features: [
      'Plano alimentar personalizado',
      'Acesso ao app por 3 meses',
      'Suporte por email e chat',
      'Consulta com nutricionista',
    ],
  },
];

export default function PricingPage() {
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
