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
  options: MealOption[];
}

const meals: MealData[] = [
  {
    name: '☕️ Café da Manhã',
    options: [
      {
        name: 'Opção 1',
        items: [
          {
            name: 'Ovos mexidos',
            calories: 200,
            quantity: '2 ovos',
            protein: 12,
            carbs: 1,
            fat: 15,
          },
          {
            name: 'Torrada integral',
            calories: 80,
            quantity: '1 fatia',
            protein: 3,
            carbs: 15,
            fat: 1,
          },
          {
            name: 'Abacate',
            calories: 160,
            quantity: '1/2 unidade',
            protein: 2,
            carbs: 8,
            fat: 15,
          },
        ],
      },
      {
        name: 'Opção 2',
        items: [
          {
            name: 'Iogurte grego',
            calories: 150,
            quantity: '170g',
            protein: 15,
            carbs: 6,
            fat: 8,
          },
          {
            name: 'Granola',
            calories: 120,
            quantity: '30g',
            protein: 3,
            carbs: 20,
            fat: 5,
          },
          {
            name: 'Banana',
            calories: 105,
            quantity: '1 média',
            protein: 1,
            carbs: 27,
            fat: 0,
          },
        ],
      },
      {
        name: 'Opção 3',
        items: [
          {
            name: 'Panquecas de aveia',
            calories: 250,
            quantity: '2 unidades',
            protein: 10,
            carbs: 35,
            fat: 8,
          },
          {
            name: 'Mel',
            calories: 64,
            quantity: '1 colher',
            protein: 0,
            carbs: 17,
            fat: 0,
          },
          {
            name: 'Morangos',
            calories: 50,
            quantity: '1 xícara',
            protein: 1,
            carbs: 12,
            fat: 0,
          },
        ],
      },
    ],
  },
  {
    name: '🍏 Lanche da Manhã',
    options: [
      {
        name: 'Opção 1',
        items: [
          {
            name: 'Iogurte natural',
            calories: 100,
            quantity: '1 pote (170g)',
            protein: 10,
            carbs: 7,
            fat: 3,
          },
          {
            name: 'Castanhas',
            calories: 150,
            quantity: '10 unidades',
            protein: 4,
            carbs: 6,
            fat: 13,
          },
        ],
      },
      {
        name: 'Opção 2',
        items: [
          {
            name: 'Maçã',
            calories: 95,
            quantity: '1 unidade média',
            protein: 0.5,
            carbs: 25,
            fat: 0.3,
          },
          {
            name: 'Queijo cottage',
            calories: 120,
            quantity: '100g',
            protein: 11,
            carbs: 4,
            fat: 5,
          },
        ],
      },
      {
        name: 'Opção 3',
        items: [
          {
            name: 'Pão integral',
            calories: 80,
            quantity: '1 fatia',
            protein: 3,
            carbs: 15,
            fat: 1,
          },
          {
            name: 'Manteiga de amendoim',
            calories: 95,
            quantity: '1 colher de sopa',
            protein: 4,
            carbs: 3,
            fat: 8,
          },
        ],
      },
    ],
  },
  {
    name: '🥗 Almoço',
    options: [
      {
        name: 'Opção 1',
        items: [
          {
            name: 'Peito de frango grelhado',
            calories: 165,
            quantity: '100g',
            protein: 31,
            carbs: 0,
            fat: 3.6,
          },
          {
            name: 'Arroz integral',
            calories: 216,
            quantity: '1 xícara',
            protein: 5,
            carbs: 45,
            fat: 1.6,
          },
          {
            name: 'Brócolis cozido',
            calories: 55,
            quantity: '1 xícara',
            protein: 3.7,
            carbs: 11.2,
            fat: 0.6,
          },
        ],
      },
      {
        name: 'Opção 2',
        items: [
          {
            name: 'Salmão assado',
            calories: 206,
            quantity: '100g',
            protein: 22,
            carbs: 0,
            fat: 13,
          },
          {
            name: 'Quinoa',
            calories: 222,
            quantity: '1 xícara',
            protein: 8,
            carbs: 39,
            fat: 3.6,
          },
          {
            name: 'Aspargos grelhados',
            calories: 27,
            quantity: '1 xícara',
            protein: 3,
            carbs: 5,
            fat: 0,
          },
        ],
      },
      {
        name: 'Opção 3',
        items: [
          {
            name: 'Tofu grelhado',
            calories: 144,
            quantity: '100g',
            protein: 17,
            carbs: 3,
            fat: 8,
          },
          {
            name: 'Macarrão integral',
            calories: 174,
            quantity: '1 xícara',
            protein: 7,
            carbs: 37,
            fat: 1,
          },
          {
            name: 'Molho de tomate',
            calories: 30,
            quantity: '1/2 xícara',
            protein: 1,
            carbs: 7,
            fat: 0,
          },
          {
            name: 'Abobrinha refogada',
            calories: 30,
            quantity: '1 xícara',
            protein: 2,
            carbs: 5,
            fat: 0,
          },
        ],
      },
    ],
  },
  {
    name: '🥪 Lanche da Tarde',
    options: [
      {
        name: 'Opção 1',
        items: [
          {
            name: 'Banana',
            calories: 105,
            quantity: '1 unidade média',
            protein: 1.3,
            carbs: 27,
            fat: 0.3,
          },
          {
            name: 'Pasta de amendoim',
            calories: 90,
            quantity: '1 colher de sopa',
            protein: 4,
            carbs: 3,
            fat: 8,
          },
        ],
      },
      {
        name: 'Opção 2',
        items: [
          {
            name: 'Biscoitos integrais',
            calories: 140,
            quantity: '4 unidades',
            protein: 3,
            carbs: 20,
            fat: 5,
          },
          {
            name: 'Suco de laranja natural',
            calories: 110,
            quantity: '1 copo',
            protein: 2,
            carbs: 26,
            fat: 0,
          },
        ],
      },
      {
        name: 'Opção 3',
        items: [
          {
            name: 'Iogurte grego',
            calories: 150,
            quantity: '170g',
            protein: 15,
            carbs: 6,
            fat: 8,
          },
          {
            name: 'Frutas vermelhas',
            calories: 60,
            quantity: '1/2 xícara',
            protein: 1,
            carbs: 15,
            fat: 0.5,
          },
        ],
      },
    ],
  },
  {
    name: '🍗 Janta',
    options: [
      {
        name: 'Opção 1',
        items: [
          {
            name: 'Salmão grelhado',
            calories: 233,
            quantity: '100g',
            protein: 25,
            carbs: 0,
            fat: 14,
          },
          {
            name: 'Quinoa cozida',
            calories: 120,
            quantity: '1/2 xícara',
            protein: 4,
            carbs: 21,
            fat: 2,
          },
          {
            name: 'Aspargos',
            calories: 27,
            quantity: '5 unidades',
            protein: 3,
            carbs: 5,
            fat: 0.2,
          },
        ],
      },
      {
        name: 'Opção 2',
        items: [
          {
            name: 'Filé de tilápia',
            calories: 180,
            quantity: '100g',
            protein: 20,
            carbs: 0,
            fat: 9,
          },
          {
            name: 'Batata-doce assada',
            calories: 112,
            quantity: '1 média',
            protein: 2,
            carbs: 26,
            fat: 0,
          },
          {
            name: 'Brócolis cozido',
            calories: 55,
            quantity: '1 xícara',
            protein: 3.7,
            carbs: 11.2,
            fat: 0.6,
          },
        ],
      },
      {
        name: 'Opção 3',
        items: [
          {
            name: 'Tofu grelhado',
            calories: 144,
            quantity: '100g',
            protein: 17,
            carbs: 3,
            fat: 8,
          },
          {
            name: 'Abobrinha refogada',
            calories: 30,
            quantity: '1 xícara',
            protein: 2,
            carbs: 5,
            fat: 0,
          },
          {
            name: 'Arroz integral',
            calories: 216,
            quantity: '1 xícara',
            protein: 5,
            carbs: 45,
            fat: 1.6,
          },
        ],
      },
    ],
  },
];

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
        className="relative flex w-full items-center justify-center p-4 focus:outline-none"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h3 className="text-lg font-semibold">{meal.name}</h3>
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

export function ExpandableMealCard() {
  return (
    <div className="space-y-4">
      {meals.map((meal, index) => (
        <MealCard key={index} meal={meal} />
      ))}
    </div>
  );
}
