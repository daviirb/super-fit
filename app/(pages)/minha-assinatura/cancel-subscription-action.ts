'use server';

import { revalidatePath } from 'next/cache';

import { stripe } from '@/lib/stripe';

export default async function cancelSubscriptionAction(formData: FormData) {
  const subscriptionId = formData.get('subscriptionId') as string;
  await stripe.subscriptions.cancel(subscriptionId, {
    expand: ['customer'],
  });

  revalidatePath('/dashboard/minha-assinatura');
}
