'use client';

import type React from 'react';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/Button';

import { QuizLayout } from './QuizLayout';

interface UserInfoProps {
  onNext: (data: userInfo) => void;
}

interface userInfo {
  weight: number;
  height: number;
  age: number;
  goal: string;
  gender: string;
}

export function Step1BasicInfo({ onNext }: UserInfoProps) {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [age, setAge] = useState('');
  const [goal, setGoal] = useState('');
  const [gender, setGender] = useState('');

  useEffect(() => {
    const savedData = localStorage.getItem('quizData');

    if (savedData) {
      const parsedData = JSON.parse(savedData);
      const userInfo = parsedData.userInfo || {};

      setWeight(userInfo.weight || '');
      setHeight(userInfo.height || '');
      setAge(userInfo.age || '');
      setGoal(userInfo.goal || '');
      setGender(userInfo.gender || '');
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const data: userInfo = {
      weight: Number(weight),
      height: Number(height),
      age: Number(age),
      goal,
      gender,
    };

    const savedData = localStorage.getItem('quizData');
    const newData = savedData ? JSON.parse(savedData) : {};

    const updatedData = {
      ...newData,
      userInfo: data,
    };

    localStorage.setItem('quizData', JSON.stringify(updatedData));

    onNext(data);
  };

  const goals = [
    { value: '', label: 'Selecione sua meta' },
    { value: 'Perder peso', label: 'Perder peso' },
    { value: 'Perder peso + Definição', label: 'Perder peso + Definição' },
    { value: 'Ganhar massa muscular', label: 'Ganhar massa muscular' },
    {
      value: 'Ganhar massa muscular + Definição',
      label: 'Ganhar massa muscular + Definição',
    },
    { value: 'Definição', label: 'Definição' },
    { value: 'Manter o peso', label: 'Manter o peso' },
  ];

  const genders = [
    { value: '', label: 'Selecione seu gênero' },
    { value: 'Masculino', label: 'Masculino' },
    { value: 'Feminino', label: 'Feminino' },
  ];

  return (
    <QuizLayout step={1} totalSteps={6}>
      <h2 className="mb-4 text-center text-2xl font-bold">Vamos começar! 🚀</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="weight"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Peso (kg) ⚖️
          </label>
          <input
            type="number"
            id="weight"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="height"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Altura (cm) 📏
          </label>
          <input
            type="text" // Usamos "text" para maior controle da entrada
            id="height"
            value={height}
            onChange={(e) => {
              let value = e.target.value;
              value = value.replace(/\D/g, '');

              if (value.length > 3) {
                value = value.slice(0, 3);
              }
              setHeight(value);
            }}
            onBlur={() => {
              if (!height) {
                setHeight('');
              }
            }}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="age"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Idade 🎂
          </label>
          <input
            type="number"
            id="age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="goal"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Meta 🎯
          </label>
          <select
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            {goals.map((goal) => (
              <option key={goal.value} value={goal.value}>
                {goal.label}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-6">
          <label
            htmlFor="gender"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Gênero
          </label>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            {genders.map((gender) => (
              <option key={gender.value} value={gender.value}>
                {gender.label}
              </option>
            ))}
          </select>
        </div>
        <Button type="submit" className="w-full ">
          Próximo passo
        </Button>
      </form>
    </QuizLayout>
  );
}
