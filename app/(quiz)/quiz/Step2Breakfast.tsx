'use client';

import type React from 'react';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/Button';

import { QuizLayout } from './QuizLayout';

interface Step2Props {
  onNext: (data: string[]) => void;
  onPrev: () => void;
}

const breakfastOptions = [
  { id: 'pao', label: 'Pão 🍞' },
  { id: 'ovos', label: 'Ovos 🥚' },
  { id: 'frutas', label: 'Frutas 🍎' },
  { id: 'aveia', label: 'Aveia 🥣' },
  { id: 'iogurte', label: 'Iogurte 🥛' },
  { id: 'queijo', label: 'Queijo 🧀' },
];

export function Step2Breakfast({ onNext, onPrev }: Step2Props) {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  useEffect(() => {
    const savedData = localStorage.getItem('breakfast');
    if (savedData) {
      setSelectedOptions(JSON.parse(savedData));
    }
  }, []);

  const handleOptionToggle = (id: string) => {
    setSelectedOptions((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('breakfast', JSON.stringify(selectedOptions));
    onNext(selectedOptions);
  };

  return (
    <QuizLayout step={2} totalSteps={6}>
      <h2 className="mb-6 text-center text-2xl font-bold">Café da manhã 🍳</h2>
      <p className="mb-4 text-center">
        Selecione os alimentos disponíveis para seu café da manhã e lanche da
        manhã:
      </p>
      <form onSubmit={handleSubmit}>
        <div className="mb-6 grid grid-cols-2 gap-4">
          {breakfastOptions.map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => handleOptionToggle(option.id)}
              className={`rounded-lg p-4 text-center transition duration-300 ${
                selectedOptions.includes(option.id)
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
        <div className="flex justify-between">
          <Button type="button" onClick={onPrev} variant="outline">
            Voltar
          </Button>
          <Button type="submit">Próximo passo</Button>
        </div>
      </form>
    </QuizLayout>
  );
}
