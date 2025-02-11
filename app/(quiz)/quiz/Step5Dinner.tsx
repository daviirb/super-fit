'use client';

import type React from 'react';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/Button';

import { QuizLayout } from './QuizLayout';

interface Step5Props {
  onNext: (data: string[]) => void;
  onPrev: () => void;
}

const dinnerOptions = [
  { id: 'sopa', label: 'Sopa 🍲' },
  { id: 'salada', label: 'Salada 🥗' },
  { id: 'frango', label: 'Frango 🍗' },
  { id: 'peixe', label: 'Peixe 🐟' },
  { id: 'omelete', label: 'Omelete 🍳' },
  { id: 'sanduiche', label: 'Sanduíche 🥪' },
];

export function Step5Dinner({ onNext, onPrev }: Step5Props) {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  useEffect(() => {
    const savedData = localStorage.getItem('quizData');
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      if (parsedData.dinner) {
        setSelectedOptions(parsedData.dinner);
      }
    }
  }, []);

  const handleOptionToggle = (id: string) => {
    setSelectedOptions((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const savedData = localStorage.getItem('quizData');
    const newData = savedData ? JSON.parse(savedData) : {};

    const updatedData = {
      ...newData,
      dinner: selectedOptions,
    };

    localStorage.setItem('quizData', JSON.stringify(updatedData));

    onNext(selectedOptions);
  };

  return (
    <QuizLayout step={5} totalSteps={6}>
      <h2 className="mb-6 text-center text-2xl font-bold">Jantar 🌙</h2>
      <p className="mb-4 text-center">
        Selecione os alimentos disponíveis para seu jantar:
      </p>
      <form onSubmit={handleSubmit}>
        <div className="mb-6 grid grid-cols-2 gap-4">
          {dinnerOptions.map((option) => (
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
