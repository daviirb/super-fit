'use client';
import { AlarmClock } from 'lucide-react';

import { Button } from '@/components/ui/Button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/Dialog';

export type Recipe = {
  title: string;
  description: string;
  quantity: string;
  time: string;
  ingredients: string[];
  steps: string[];
};

type RecipeDialogProps = {
  recipe: Recipe;
  open: boolean;
  setOpen: (open: boolean) => void;
};

export function RecipeDialog({ recipe, open, setOpen }: RecipeDialogProps) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{recipe.title}</DialogTitle>
          <DialogDescription>{recipe.description}</DialogDescription>
        </DialogHeader>
        <div>
          <section className="border-t py-2">
            <h2 className="text-bold mb-2 text-center">
              Ingredientes ({recipe.quantity})
            </h2>
            <ul className="gap-x-4 gap-y-2 text-sm">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index} className="flex items-center gap-2 text-left">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary" />
                  {ingredient}
                </li>
              ))}
            </ul>
          </section>
          <section className="border-t py-2">
            <div className="mb-2 flex justify-center">
              <h2 className="text-bold text-center">Modo de preparo</h2>
            </div>
            <div className="mb-2 flex items-center justify-end gap-2 text-sm text-primary">
              <AlarmClock size={14} />
              <p>{recipe.time}</p>
            </div>
            <ul className="grid text-sm">
              {recipe.steps.map((step, index) => (
                <li key={index}>
                  {index + 1} - {step}
                </li>
              ))}
            </ul>
          </section>
        </div>
        <DialogFooter className="gap-4 border-t pt-4">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Fechar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
