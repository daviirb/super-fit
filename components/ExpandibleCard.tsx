'use client';

import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

import { cn } from '@/utils/sanitizeClassName';

interface FoodItem {
  name: string;
  calories: number;
  quantity: string;
  protein: number;
  carbs: number;
  fat: number;
}

interface MealOption {
  name: string;
  items: FoodItem[];
}

interface MealData {
  name: string;
  time: string;
  options: MealOption[];
}

function MealCard({ meal }: { meal: MealData }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  const renderMealOption = (option: MealOption) => {
    const totalCalories = option.items.reduce(
      (sum, item) => sum + item.calories,
      0,
    );
    const totalProtein = option.items.reduce(
      (sum, item) => sum + item.protein,
      0,
    );
    const totalCarbs = option.items.reduce((sum, item) => sum + item.carbs, 0);
    const totalFat = option.items.reduce((sum, item) => sum + item.fat, 0);

    return (
      <div>
        {option.items.map((item, index) => (
          <div key={index} className="mb-2 flex items-center justify-between">
            <span className="font-medium">{item.name}</span>
            <div className="text-sm text-gray-600">
              <span>{item.calories} kcal</span>
              <span className="ml-2">({item.quantity})</span>
            </div>
          </div>
        ))}
        <div className="mt-4 border-t pt-4">
          <h4 className="mb-2 font-semibold">Total</h4>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>Calorias: {totalCalories} kcal</div>
            <div>Proteínas: {totalProtein.toFixed(1)}g</div>
            <div>Carboidratos: {totalCarbs.toFixed(1)}g</div>
            <div>Gorduras: {totalFat.toFixed(1)}g</div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="mb-4 overflow-hidden rounded-lg bg-white p-2 shadow-md">
      <button
        className="relative flex w-full items-center justify-center p-2 focus:outline-none"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div>
          <h3 className="text-lg font-semibold">{meal.name}</h3>
          <p>{meal.time}</p>
        </div>
        {isExpanded ? (
          <ChevronUp className="absolute right-4 h-5 w-5" />
        ) : (
          <ChevronDown className="absolute right-4 h-5 w-5" />
        )}
      </button>
      <div
        className={cn(
          'transition-all duration-300 ease-in-out',
          isExpanded ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0',
        )}
      >
        <div className="border-t p-4">
          <div className="mb-4 flex justify-center border-b">
            {meal.options.map((option, index) => (
              <button
                key={index}
                className={cn(
                  'px-4 py-2 font-medium focus:outline-none',
                  activeTab === index
                    ? 'border-b-2 border-green-500 text-green-500'
                    : 'text-gray-500 hover:text-gray-700',
                )}
                onClick={() => setActiveTab(index)}
              >
                {option.name}
              </button>
            ))}
          </div>
          {renderMealOption(meal.options[activeTab])}
        </div>
      </div>
    </div>
  );
}

type ExpandableMealCardProps = {
  meals: MealData[];
};
export function ExpandableMealCard({ meals }: ExpandableMealCardProps) {
  return (
    <div className="space-y-4">
      {meals.map((meal, index) => (
        <MealCard key={index} meal={meal} />
      ))}
    </div>
  );
}
