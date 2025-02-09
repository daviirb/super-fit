'use client';
import { AlarmClock, Flame } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

import { Recipe, RecipeDialog } from './RecipeDialog';
type RecipeCardProps = {
  name: string;
  time: number;
  calories: number;
  src: string;
  alt: string;
  recipe: Recipe;
};
export function RecipeCard({
  name,
  time,
  calories,
  alt,
  src,
  recipe,
}: RecipeCardProps) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div
        onClick={() => setOpen(true)}
        className="w-40 rounded-xl border-2 p-2 md:w-48"
      >
        <div className="relative h-36 w-full overflow-hidden rounded-lg">
          <Image src={src} alt={alt} fill className="object-cover" />
        </div>
        <span className="text-center">
          <h2 className="font-bold">{name}</h2>
          <div className="flex justify-center gap-4">
            <div className="flex items-center gap-1 text-sm">
              <AlarmClock size={18} className="text-primary" />
              <span className="md:text-md text-nowrap text-[8px]">
                {time} min
              </span>
            </div>
            <div className="flex items-center gap-1 text-sm">
              <Flame size={18} className="text-primary" />
              <span className="md:text-md text-nowrap text-[8px]">
                {calories} cal
              </span>
            </div>
          </div>
        </span>
      </div>
      <RecipeDialog recipe={recipe} open={open} setOpen={setOpen} />
    </>
  );
}
