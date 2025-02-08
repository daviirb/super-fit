'use client';

import type React from 'react';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/Button';

import { QuizLayout } from './QuizLayout';

interface Step3Props {
  onNext: (data: (string | { legumes: string[] })[]) => void;
  onPrev: () => void;
}

interface Option {
  id: string;
  label: string;
}

interface SavedData {
  legumes?: string[];
  [key: string]: boolean | string[] | undefined;
}

const lunchOptions: Option[] = [
  { id: 'arroz', label: 'Arroz 🍚' },
  { id: 'feijao', label: 'Feijão 🫘' },
  { id: 'carne', label: 'Carne 🥩' },
  { id: 'frango', label: 'Frango 🍗' },
  { id: 'peixe', label: 'Peixe 🐟' },
  { id: 'salada', label: 'Salada 🥗' },
  { id: 'legumes', label: 'Legumes 🥕' },
];

const vegetableOptions: Option[] = [
  { id: 'cenoura', label: 'Cenoura 🥕' },
  { id: 'brocolis', label: 'Brócolis 🥦' },
  { id: 'batata-doce', label: 'Batata Doce 🍠' },
  { id: 'abobrinha', label: 'Abobrinha 🥒' },
];

export function Step3Lunch({ onNext, onPrev }: Step3Props) {
  const [selectedOptions, setSelectedOptions] = useState<Set<string>>(
    new Set(),
  );
  const [selectedVegetables, setSelectedVegetables] = useState<string[]>([]);

  useEffect(() => {
    const savedData = localStorage.getItem('lunch');
    if (savedData) {
      try {
        const parsedData: SavedData = JSON.parse(savedData);

        if (Array.isArray(parsedData)) {
          const mainSelections = new Set<string>(
            parsedData.filter(
              (item): item is string => typeof item === 'string',
            ),
          );

          const legumes = parsedData.find(
            (item) =>
              typeof item === 'object' &&
              (item as { legumes: string[] }).legumes,
          );

          setSelectedOptions(mainSelections);
          setSelectedVegetables(legumes?.legumes || []);
        } else if (typeof parsedData === 'object' && parsedData !== null) {
          const { legumes, ...others } = parsedData;
          setSelectedOptions(new Set(Object.keys(others)));
          setSelectedVegetables(legumes || []);
        }
      } catch (error) {
        console.error('Erro ao parsear JSON:', error);
      }
    }
  }, []);

  useEffect(() => {
    const dataToSave: (string | { legumes: string[] })[] = [...selectedOptions];
    if (selectedVegetables.length > 0) {
      dataToSave.push({ legumes: selectedVegetables });
    }
    localStorage.setItem('lunch', JSON.stringify(dataToSave));
  }, [selectedOptions, selectedVegetables]);

  const handleOptionToggle = (id: string) => {
    setSelectedOptions((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }

      if (id === 'legumes') {
        setSelectedVegetables([]);
      }

      return newSet;
    });
  };

  const handleVegetableToggle = (id: string) => {
    setSelectedVegetables((prev) =>
      prev.includes(id) ? prev.filter((veg) => veg !== id) : [...prev, id],
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalData: (string | { legumes: string[] })[] = [...selectedOptions];
    if (selectedVegetables.length > 0) {
      finalData.push({ legumes: selectedVegetables });
    }
    onNext(finalData);
  };

  return (
    <QuizLayout step={3} totalSteps={6}>
      <h2 className="mb-6 text-center text-2xl font-bold">Almoço 🍽️</h2>
      <p className="mb-4 text-center">
        Selecione os alimentos disponíveis para seu almoço e lanche da tarde:
      </p>
      <form onSubmit={handleSubmit}>
        <div className="mb-6 grid grid-cols-2 gap-4">
          {lunchOptions.map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => handleOptionToggle(option.id)}
              className={`rounded-lg p-4 text-center transition duration-300 ${
                selectedOptions.has(option.id)
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
        {selectedOptions.has('legumes') && (
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
