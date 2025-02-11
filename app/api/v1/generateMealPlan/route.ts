import { GoogleGenerativeAI } from '@google/generative-ai';

import {
  GeminiResponse,
  MealPlanResponse,
  saveMealData,
} from '@/models/userMealPlan';

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

    const userProfile = prompt.userInfo;
    const breakfast = prompt.breakfast;
    const lunch = prompt.lunch;
    const snack = prompt.snack;
    const dinner = prompt.dinner;
    const moreInfo = prompt.moreInfo;
    console.log(moreInfo.dietSchedule.split(', ')[0]);

    const formattedPrompt = `
Crie um plano de refeições contendo 3 opcoes para cada refeição
## Usuário:
Peso: ${userProfile.weight}kg, Altura: ${userProfile.height}cm, Idade: ${userProfile.age} anos
Objetivo: ${userProfile.goal}, Atividade: ${moreInfo.activity}
Exercício: ${moreInfo.exercise}, Chocolate diário: ${moreInfo.chocolate}

## Refeições:
- ☕️ Café da Manhã: ${breakfast.join(', ')}, Horário: ${moreInfo.dietSchedule.split(', ')[0]}
- 🍏 Lanche da Manhã: ${snack.join(', ')}, Horário: ${moreInfo.dietSchedule.split(', ')[1]}
- 🥗 Almoço: ${lunch.join(', ')}, Horário: ${moreInfo.dietSchedule.split(', ')[2]}
- 🥪 Lanche da Tarde: ${snack.join(', ')}, Horário: ${moreInfo.dietSchedule.split(', ')[3]}
- 🍗 Jantar: ${dinner.join(', ')}, Horário: ${moreInfo.dietSchedule.split(', ')[4]}

### **Formato de saída JSON**
Responda **apenas** com um JSON válido no formato abaixo:

[
  {
    "name": "🥪 Lanche da Tarde",
    "time": "15:00",
    "options": [
      {
        "name": "Opção 1",
        "items": [
          { "name": "Banana", "calories": 105, "quantity": "1 unidade", "protein": 1.3, "carbs": 27, "fat": 0.3 },
          { "name": "Pasta de amendoim", "calories": 90, "quantity": "1 colher", "protein": 4, "carbs": 3, "fat": 8 }
        ]
      }
    ]
  }
]

Gere a resposta para todos os dias da semana, variando os alimentos com base nas preferências do usuário. 
**Apenas JSON, sem explicações adicionais.**
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

    console.log(geminiResponse);

    const savedMealPlan = await saveMealData(geminiResponse.text);

    return new Response(JSON.stringify({ geminiResponse, savedMealPlan }), {
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
