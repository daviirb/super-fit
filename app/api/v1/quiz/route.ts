import { GoogleGenerativeAI } from '@google/generative-ai';

import { GeminiResponse, Meal, MealPlanResponse } from '@/models/userMealPlan';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { prompt } = body;

    if (!prompt) {
      return new Response(
        JSON.stringify({ message: 'O campo "prompt" é obrigatório.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } },
      );
    }

    const API_KEY = process.env.GEMINI_API_KEY;
    const genAI = new GoogleGenerativeAI(API_KEY!);

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const userProfile = prompt.userProfile;
    const mealPlan = prompt.mealPlan;

    const formattedPrompt = `
      Crie uma lista semanal de refeições, separada por dias, com base nas informações abaixo:
      
      Informações do usuário:
      - Peso: ${userProfile.weight}
      - Altura: ${userProfile.height}
      - Idade: ${userProfile.age}
      - Sexo: ${userProfile.gender}
      - Objetivo: ${userProfile.goal}
      - Calorias diárias: ${userProfile.calories}

      Plano de Refeições:
      ${mealPlan
        .map(
          (meal: Meal, index: number) => `
        Dia ${index + 1}: ${meal.mealTitle}
        Alimentos: ${meal.foodList.join(', ')}`,
        )
        .join('\n')}
      
      Retorne o plano de refeições como um JSON estruturado com os seguintes campos:
      {
        "day": "Nome do dia da semana",
        "meal": "Nome da refeição",
        "foods": ["Alimento1", "Alimento2", ...]
      }
    `;

    const result = await model.generateContent(formattedPrompt);
    const responseText = result.response.text();

    const jsonStartIndex = responseText.indexOf('[');
    const jsonEndIndex = responseText.lastIndexOf(']') + 1;
    const jsonString = responseText.slice(jsonStartIndex, jsonEndIndex);

    const mealPlanResponse: MealPlanResponse = JSON.parse(jsonString);

    const geminiResponse: GeminiResponse = {
      text: mealPlanResponse,
      note: 'Este é apenas um exemplo de plano de refeições. As porções e os alimentos podem ser ajustados de acordo com as preferências e necessidades individuais. É importante consultar um nutricionista para um plano alimentar personalizado e adequado às suas necessidades e objetivos. As calorias indicadas são aproximadas e podem variar dependendo da preparação e dos ingredientes utilizados.',
    };

    return new Response(JSON.stringify(geminiResponse), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Erro:', error);
    return new Response(
      JSON.stringify({ message: 'Erro interno do servidor' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } },
    );
  }
}
