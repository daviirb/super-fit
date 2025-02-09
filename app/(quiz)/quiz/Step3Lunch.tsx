'use client';

import type React from 'react';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/Button';

import { QuizLayout } from './QuizLayout';

interface LunchProps {
  onNext: (data: { lunch: string[]; legumes?: string[] }) => void;
  onPrev: () => void;
}

const lunchOptions = [
  { id: 'arroz', label: 'Arroz 🍚' },
  { id: 'feijao', label: 'Feijão 🫘' },
  { id: 'carne', label: 'Carne 🥩' },
  { id: 'frango', label: 'Frango 🍗' },
  { id: 'peixe', label: 'Peixe 🐟' },
  { id: 'salada', label: 'Salada 🥗' },
  { id: 'legumes', label: 'Legumes 🥕' },
];

const vegetableOptions = [
  { id: 'cenoura', label: 'Cenoura 🥕' },
  { id: 'brocolis', label: 'Brócolis 🥦' },
  { id: 'batata-doce', label: 'Batata Doce 🍠' },
  { id: 'abobrinha', label: 'Abobrinha 🥒' },
];

export function Step3Lunch({ onNext, onPrev }: LunchProps) {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [selectedVegetables, setSelectedVegetables] = useState<string[]>([]);

  useEffect(() => {
    const savedData = localStorage.getItem('quizData');
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      if (parsedData.step3) {
        setSelectedOptions(parsedData.lunch);
      }
      if (parsedData.lunchLegumes) {
        setSelectedVegetables(parsedData.lunchLegumes);
      }
    }
  }, []);

  const handleOptionToggle = (id: string) => {
    setSelectedOptions((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const handleVegetableToggle = (id: string) => {
    setSelectedVegetables((prev) =>
      prev.includes(id) ? prev.filter((veg) => veg !== id) : [...prev, id],
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const savedData = localStorage.getItem('quizData');
    const newData = savedData ? JSON.parse(savedData) : {};

    const updatedData = {
      ...newData,
      lunch: selectedOptions,
      lunchLegumes: selectedVegetables,
    };

    localStorage.setItem('quizData', JSON.stringify(updatedData));

    onNext({ lunch: selectedOptions, legumes: selectedVegetables });
  };

  return (
    <QuizLayout step={3} totalSteps={6}>
      <h2 className="mb-6 text-center text-2xl font-bold">Almoço 🍽️</h2>
      <p className="mb-4 text-center">
        Selecione os alimentos disponíveis para seu almoço:
      </p>
      <form onSubmit={handleSubmit}>
        <div className="mb-6 grid grid-cols-2 gap-4">
          {lunchOptions.map((option) => (
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
        {selectedOptions.includes('legumes') && (
          <div className="mb-6 rounded-lg">
            <p className="mb-2 text-sm">
              Selecione os vegetais de sua preferência:
            </p>
            <div className="grid grid-cols-2 gap-4">
              {vegetableOptions.map((veggie) => (
                <button
                  key={veggie.id}
                  type="button"
                  onClick={() => handleVegetableToggle(veggie.id)}
                  className={`rounded-lg p-2 text-center text-sm transition duration-300 ${
                    selectedVegetables.includes(veggie.id)
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                >
                  {veggie.label}
                </button>
              ))}
            </div>
          </div>
        )}
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
