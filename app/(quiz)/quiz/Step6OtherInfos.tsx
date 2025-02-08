'use client';

import type React from 'react';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/Button';

import { QuizLayout } from './QuizLayout';

interface Step4Props {
  onNext: (data: string[]) => void;
  onPrev: () => void;
}

const activity = [
  { value: '', label: 'Nível de Atividade Física' },
  {
    value: 'sedentário',
    label: 'Sedentário (pouca ou nenhuma atividade física)',
  },
  {
    value: 'levemente ativo',
    label: 'Levemente ativo (exercícios 1 a 3 vezes por semana)',
  },
  {
    value: 'moderadamente ativo',
    label: 'Moderadamente ativo (exercícios 3 a 5 vezes por semana)',
  },
  {
    value: 'Altamente ativo',
    label: 'Altamente ativo (exercícios 5 a 7 vezes por semana)',
  },
  {
    value: 'extremamente ativo',
    label: 'Extremamente ativo (pouca ou nenhuma atividade física)',
  },
];

const exercise = [
  {
    value: '',
    label: 'Deseja treino?',
  },
  {
    value: 'treino na academia',
    label: 'Sim, treino na academia',
  },
  {
    value: 'treino em casa',
    label: 'Sim, treino em casa',
  },
  {
    value: 'não quero fazer exercicios na academia ou em casa',
    label: 'Não',
  },
];

const additionalInDiet = [
  {
    value: '',
    label: 'Horários de cada refeição',
  },
  {
    value: 'Tenho meu próprio horário',
    label: 'Tenho meu próprio horário',
  },
  {
    value: '05:30, 08:30, 12:00, 15:00, 19:00',
    label: '05:30, 08:30, 12:00, 15:00, 19:00',
  },
  {
    value: '06:00, 09:00, 12:00, 15:00, 19:00',
    label: '06:00, 09:00, 12:00, 15:00, 19:00',
  },
  {
    value: '06:30, 09:30, 13:00, 16:00, 20:00',
    label: '06:30, 09:30, 13:00, 16:00, 20:00',
  },
  {
    value: '07:00, 10:00, 12:30, 15:30, 19:30',
    label: '07:00, 10:00, 12:30, 15:30, 19:30',
  },
  {
    value: '07:30, 10:30, 12:00, 15:00, 19:00',
    label: '07:30, 10:30, 12:00, 15:00, 19:00',
  },
  {
    value: '08:00, 11:00, 13:30, 16:30, 19:00',
    label: '08:00, 11:00, 13:30, 16:30, 19:00',
  },
  {
    value: '09:00, 11:00, 13:00, 16:00, 21:00',
    label: '09:00, 11:00, 13:00, 16:00, 21:00',
  },
];

const chocolateOptions = [
  { value: '', label: 'Chocolate na dieta?' },
  { value: 'Não', label: 'Não, obrigado' },
  {
    value: 'um Bis (31 kcal) por dia',
    label: 'um Bis (31 kcal)',
  },
  {
    value: 'um Prestígio (70 kcal) por dia',
    label: 'Sim, um Prestígio (70 kcal)',
  },
  {
    value: 'um Ouro Branco (75 kcal) por dia',
    label: 'Sim, um Ouro Branco (75 kcal)',
  },
  {
    value: 'um Trento (80 kcal) por dia',
    label: 'Sim, um Trento (80 kcal)',
  },
  {
    value: 'um Baton (85 kcal) por dia',
    label: 'Sim, um Baton (85 kcal)',
  },
  {
    value: 'um Chokito (90 kcal) por dia',
    label: 'Sim, um Chokito (90 kcal)',
  },
  {
    value: 'um Sonho de Valsa (95 kcal) por dia',
    label: 'Sim, um Sonho de Valsa (95 kcal)',
  },
];

export function Step6OtherInfos({ onNext, onPrev }: Step4Props) {
  const [selectedActivity, setSelectedActivity] = useState<string>('');
  const [selectedExercise, setSelectedExercise] = useState<string>('');
  const [selectedDietSchedule, setSelectedDietSchedule] = useState<string>('');
  const [selectedChocolate, setSelectedChocolate] = useState<string>('');

  useEffect(() => {
    const savedData = localStorage.getItem('otherInfos');
    if (savedData) {
      const data = JSON.parse(savedData);
      setSelectedActivity(data.activity || '');
      setSelectedExercise(data.exercise || '');
      setSelectedDietSchedule(data.dietSchedule || '');
      setSelectedChocolate(data.chocolate || '');
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = {
      activity: selectedActivity,
      exercise: selectedExercise,
      dietSchedule: selectedDietSchedule,
      chocolate: selectedChocolate,
    };
    localStorage.setItem('otherInfos', JSON.stringify(formData));
    onNext([
      selectedActivity,
      selectedExercise,
      selectedDietSchedule,
      selectedChocolate,
    ]);
  };

  return (
    <QuizLayout step={6} totalSteps={6}>
      <h2 className="mb-6 text-center text-2xl font-bold">
        Outras Informações 📝
      </h2>
      <p className="mb-4 text-center">
        Selecione as informações relacionadas à sua atividade física e dieta:
      </p>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="activity"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Nível de Atividade Física 🏅
          </label>
          <select
            value={selectedActivity}
            onChange={(e) => setSelectedActivity(e.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            {activity.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label
            htmlFor="exercise"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Deseja treino? 🏋️‍♀️
          </label>
          <select
            value={selectedExercise}
            onChange={(e) => setSelectedExercise(e.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            {exercise.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label
            htmlFor="dietSchedule"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Horários de cada refeição 🥗
          </label>
          <select
            value={selectedDietSchedule}
            onChange={(e) => setSelectedDietSchedule(e.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            {additionalInDiet.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label
            htmlFor="chocolate"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Chocolate? 🍫
          </label>
          <select
            value={selectedChocolate}
            onChange={(e) => setSelectedChocolate(e.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            {chocolateOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-between">
          <Button type="button" onClick={onPrev} variant="outline">
            Voltar
          </Button>
          <Button type="submit">Montar Minha Dieta</Button>
        </div>
      </form>
    </QuizLayout>
  );
}
