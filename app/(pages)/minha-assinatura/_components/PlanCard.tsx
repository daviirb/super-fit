import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/Card';
import {
  translateSubscriptionInterval,
  translateSubscriptionStatus,
} from '@/lib/stripe';

export default function PlanCard({ subscription }: { subscription: any }) {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Detalhes da Assinatura</CardTitle>
        <CardDescription>Informações sobre seu plano atual</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-600">Plano:</span>
            <span>{subscription.plan.nickname}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Status:</span>
            <span className="text-green-600">
              {translateSubscriptionStatus(subscription.status)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Próxima cobrança:</span>
            <span>
              {new Date(
                subscription.current_period_end * 1000,
              ).toLocaleDateString('pt-BR')}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Valor:</span>
            <span>
              {(subscription.plan.amount / 100).toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              })}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Ciclo:</span>
            <span>
              {translateSubscriptionInterval(subscription.plan.interval)}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
