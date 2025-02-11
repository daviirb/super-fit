'use client';

import type React from 'react';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/Button';

import { QuizLayout } from './QuizLayout';

interface SnackProps {
  onNext: (data: string[]) => void;
  onPrev: () => void;
}

const snackOptions = [
  { id: 'whey', label: 'Whey 💪' },
  { id: 'fruta', label: 'Fruta 🍏' },
  { id: 'cuscuz', label: 'Cuscuz 🍚' },
  { id: 'pao com ovo', label: 'Pão com ovo 🥖' },
  { id: 'tapioca com frango', label: 'Tapioca com frango 🥙' },
  { id: 'crepioca com queijo', label: 'Crepioca com queijo 🥞' },
  { id: 'leite', label: 'Leite 🥛' },
  { id: 'rap10 com frango', label: 'Rap10 com frango 🌯' },
  { id: 'ovo', label: 'Ovo 🥚' },
  { id: 'sanduíche de frango', label: 'Sanduíche de Frango 🥪' },
  { id: 'sanduíche de peru', label: 'Sanduíche de Peru 🥪' },
  { id: 'suco', label: 'Suco 🥤' },
];

export function Step4Snack({ onNext, onPrev }: SnackProps) {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  useEffect(() => {
    const savedData = localStorage.getItem('quizData');
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      if (parsedData.snack) {
        setSelectedOptions(parsedData.snack);
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
      snack: selectedOptions,
    };

    localStorage.setItem('quizData', JSON.stringify(updatedData));

    onNext(selectedOptions);
  };

  return (
    <QuizLayout step={4} totalSteps={6}>
      <h2 className="mb-6 text-center text-2xl font-bold">
        Lanche da Manhã e Tarde 🥪
      </h2>
      <p className="mb-4 text-center">
        Selecione os alimentos disponíveis para seu almoço e lanche da tarde:
      </p>
      <form onSubmit={handleSubmit}>
        <div className="mb-6 grid grid-cols-2 gap-4">
          {snackOptions.map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => handleOptionToggle(option.id)}
              className={`rounded-lg px-2 py-4 text-center transition duration-300 ${
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
