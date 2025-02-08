'use client';
import { CheckCircle } from 'lucide-react';

import { Button } from '@/components/ui/Button';

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
          {plans.map((plan) => (
            <div
              key={plan.name}
              className="divide-y divide-gray-200 rounded-lg border border-gray-200 bg-white shadow-sm"
            >
              <div className="p-4">
                <h3 className="text-lg font-medium text-gray-900">
                  {plan.name}
                </h3>
                <div className="flex items-end">
                  <p className="mt-2 text-3xl font-extrabold text-gray-900">
                    {plan.price}
                  </p>
                  <p className="text-sm text-gray-500">/mês</p>
                </div>
                <ul className="mt-4 space-y-4">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start">
                      <div className="flex-shrink-0">
                        <CheckCircle className="h-6 w-6 text-green-500" />
                      </div>
                      <p className="ml-3 text-sm text-gray-700">{feature}</p>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="px-6 py-4">
                <Button type="button" className="w-full">
                  Começar agora
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
