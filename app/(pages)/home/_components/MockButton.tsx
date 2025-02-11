'use client';
import Form from 'next/form';
import { useActionState } from 'react';

import { Button } from '@/components/ui/Button';
import { saveMealDataMockButton } from '@/models/userMealPlan';

export function MockButton() {
  const [state, formAction, isPending] = useActionState(
    saveMealDataMockButton,
    null,
  );
  return (
    <Form action={formAction}>
      <Button type="submit" isLoading={isPending}>
        Gerar Sua Dieta
      </Button>
    </Form>
  );
}
