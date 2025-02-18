import { Check } from 'lucide-react';

import { auth } from '@/auth';
import { fetchSubscriptionByEmail } from '@/lib/stripe';

import PaymentButton from './PaymentButton';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/Card';

export default async function PricingCard() {
  const session = await auth();

  let subscription = null;

  if (session) {
    const email = session?.user?.email;
    subscription = await fetchSubscriptionByEmail(email ?? '');
  }

  return (
    <Card className="mt-10 w-[350px] text-left md:mt-20">
      <CardHeader>
        <CardTitle>SuperFit</CardTitle>
        <CardDescription>
          Tudo que você precisa para alcançar seus objetivos
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="mb-8 mt-4 text-4xl font-bold">R$9,90</p>
        <ul>
          <li className="flex gap-2 text-muted-foreground">
            <Check className="w-4 text-green-600" />
            Plano alimentar personalizado
          </li>
          <li className="flex gap-2 text-muted-foreground">
            <Check className="w-4 text-green-600" />
            Acesso ao app por 1 mês
          </li>
          <li className="flex gap-2 text-muted-foreground">
            <Check className="w-4 text-green-600" />
            Opções para casa ou academia
          </li>
          <li className="flex gap-2 text-muted-foreground">
            <Check className="w-4 text-green-600" />
            Calorias e intensidade ajustadas
          </li>
          <li className="flex gap-2 text-muted-foreground">
            <Check className="w-4 text-green-600" />
            Cancele quando quiser
          </li>
        </ul>
      </CardContent>
      <CardFooter>
        {!subscription && (
          <PaymentButton isLoggedIn={!!session} className="w-full">
            Assine Agora
          </PaymentButton>
        )}
      </CardFooter>
    </Card>
  );
}
