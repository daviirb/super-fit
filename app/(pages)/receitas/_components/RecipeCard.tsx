import { AlarmClock, Flame } from 'lucide-react';

type RecipeCardProps = {
  name: string;
  time: number;
  calories: number;
};
export function RecipeCard({ name, time, calories }: RecipeCardProps) {
  return (
    <div className="w-40 rounded-xl border-2 p-2 md:w-48">
      <div className="h-32 w-full rounded-lg bg-slate-400"></div>
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
  );
}
