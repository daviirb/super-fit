'use client';

import { CreditCard, XCircle } from 'lucide-react';
import { useState } from 'react';
import Stripe from 'stripe';

import { Button } from '@/components/ui/Button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/Card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/Dialog';

import cancelSubscriptionAction from '../cancel-subscription-action';

type ActionCardProps = {
  subscription: Stripe.Subscription;
};

export default function ActionCard({ subscription }: ActionCardProps) {
  const [open, setOpen] = useState(false);

  const handleCancel = async () => {
    setOpen(false);
    const formData = new FormData();
    formData.append('subscriptionId', subscription.id);
    await cancelSubscriptionAction(formData);
  };

  return (
    <Card className="h-full w-full max-w-sm">
      <CardHeader>
        <CardTitle>Ações</CardTitle>
        <CardDescription>Gerencie sua assinatura</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <a
            href="https://billing.stripe.com/p/login/test_cN2dU55Ct6eC7IccMM"
            className="flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <CreditCard className="mr-2 h-5 w-5 text-gray-400" />
            Atualizar método de pagamento
          </a>

          <button
            onClick={() => setOpen(true)}
            className="flex w-full items-center justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            <XCircle className="mr-2 h-5 w-5" />
            Cancelar assinatura
          </button>
        </div>
      </CardContent>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cancelar Assinatura</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja cancelar sua assinatura? Esta ação é
              irreversível.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-4">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Fechar
            </Button>
            <Button variant="destructive" onClick={handleCancel}>
              Confirmar Cancelamento
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
