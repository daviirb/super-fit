import { GoogleGenerativeAI } from '@google/generative-ai';

import { GeminiResponse, Meal, MealPlanResponse } from '@/models/userMealPlan';

export async function generateMealPlan(prompt: {
  userProfile: any;
  mealPlan: Meal[];
}) {
  try {
    const { userProfile, mealPlan } = prompt;
    console.log(prompt);

    // if (!userProfile || !mealPlan) {
    //   throw new Error('Os campos "userProfile" e "mealPlan" são obrigatórios.');
    // }

    const API_KEY = process.env.GEMINI_API_KEY;
    const genAI = new GoogleGenerativeAI(API_KEY!);

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    // Formatação do prompt com os dados do usuário e do plano de refeições
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

    // Gerar o conteúdo com o prompt formatado
    const result = await model.generateContent(formattedPrompt);
    const responseText = result.response.text();

    // Encontrar o JSON na resposta gerada
    const jsonStartIndex = responseText.indexOf('[');
    const jsonEndIndex = responseText.lastIndexOf(']') + 1;
    const jsonString = responseText.slice(jsonStartIndex, jsonEndIndex);

    // Parse da resposta do modelo para a estrutura MealPlanResponse
    const mealPlanResponse: MealPlanResponse = JSON.parse(jsonString);

    // Formatação da resposta final
    const geminiResponse: GeminiResponse = {
      text: mealPlanResponse,
      note: 'Este é apenas um exemplo de plano de refeições. As porções e os alimentos podem ser ajustados de acordo com as preferências e necessidades individuais. É importante consultar um nutricionista para um plano alimentar personalizado e adequado às suas necessidades e objetivos. As calorias indicadas são aproximadas e podem variar dependendo da preparação e dos ingredientes utilizados.',
    };

    return geminiResponse;
  } catch (error) {
    console.error('Erro:', error);
    throw new Error('Erro interno do servidor');
  }
}
