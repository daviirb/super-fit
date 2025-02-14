import { GoogleGenerativeAI } from '@google/generative-ai';
import Ajv from 'ajv';

import {
  GeminiResponse,
  MealPlanResponse,
  saveMealData,
} from '@/models/userMealPlan';

type UserProfile = {
  weight: number;
  height: number;
  age: number;
  goal: string;
  calories: string;
};

type MoreInfo = {
  activity: string;
  exercise: string;
  chocolate: string;
  dietSchedule: string;
};

type PromptData = {
  userInfo: UserProfile;
  breakfast: string[];
  lunch: string[];
  snack: string[];
  dinner: string[];
  moreInfo: MoreInfo;
};

function cleanJsonString(jsonString: string): string {
  jsonString = jsonString.replace(/\s+/g, ' ').trim();
  jsonString = jsonString.replace(
    /[^\{\}\[\]:,"a-zA-Z0-9\u00C0-\u017F\s\.]/g,
    '',
  );
  return jsonString;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const prompt: PromptData = body.prompt;

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

    const formattedPrompt = `
    Crie um plano de refeições para um usuário com as seguintes características:

    ## Usuário:
    Peso: ${userProfile.weight}kg, Altura: ${userProfile.height}cm, Idade: ${userProfile.age} anos
    Objetivo: ${userProfile.goal}, Atividade: ${moreInfo.activity}
    Exercício: ${moreInfo.exercise}, Chocolate diário: ${moreInfo.chocolate}
    Meta de Calorias diárias: ${userProfile.calories}

    ## Refeições:
    - Café da Manhã: ${breakfast.join(', ')}, Horário: ${moreInfo.dietSchedule.split(', ')[0]}
    - Lanche da Manhã: ${snack.join(', ')}, Horário: ${moreInfo.dietSchedule.split(', ')[1]}
    - Almoço: ${lunch.join(', ')}, Horário: ${moreInfo.dietSchedule.split(', ')[2]}
    - Lanche da Tarde: ${snack.join(', ')}, Horário: ${moreInfo.dietSchedule.split(', ')[3]}
    - Jantar: ${dinner.join(', ')}, Horário: ${moreInfo.dietSchedule.split(', ')[4]}

    Gere um plano de refeições **APENAS em formato JSON válido**, sem quaisquer outros caracteres, delimitadores ou explicações. O JSON deve seguir o seguinte esquema:

    [
      {
        "name": "Nome da Refeição",
        "time": "Horário da Refeição",
        "options": [
          {
            "name": "Opção 1",
            "items": [
              { "name": "Nome do Alimento", "calories": 0, "quantity": "Quantidade", "protein": 0, "carbs": 0, "fat": 0 }
            ]
          }
        ]
      }
    ]

     Crie 3 opções para cada refeição. Gere um plano alimentar completo para o dia. Varie os alimentos com base nas preferências do usuário. **Não inclua \`\`\`json ou \`\`\` no início ou no final da resposta.** **Responda apenas com o JSON solicitado.**
    `;

    const schema = {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          time: { type: 'string' },
          options: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                name: { type: 'string' },
                items: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      name: { type: 'string' },
                      calories: { type: 'number' },
                      quantity: { type: 'string' },
                      protein: { type: 'number' },
                      carbs: { type: 'number' },
                      fat: { type: 'number' },
                    },
                    required: [
                      'name',
                      'calories',
                      'quantity',
                      'protein',
                      'carbs',
                      'fat',
                    ],
                  },
                },
              },
              required: ['name', 'items'],
            },
          },
        },
        required: ['name', 'time', 'options'],
      },
    };

    try {
      const result = await model.generateContent({
        contents: [{ role: 'user', parts: [{ text: formattedPrompt }] }],
        safetySettings: [],
      });

      let responseText = result.response.text();

      const jsonRegex = /```json\s*([\s\S]*?)\s*```/i;
      const match = responseText.match(jsonRegex);

      if (match && match[1]) {
        responseText = match[1].trim();
      } else {
        responseText = responseText.replace(/^`+|`+$/g, '');
      }

      responseText = cleanJsonString(responseText);

      try {
        ('ajv');
        const ajv = new Ajv();
        const validate = ajv.compile(schema);
        const responseJson: MealPlanResponse = JSON.parse(responseText);

        ('Validacao JSON');
        const valid = validate(responseJson);

        if (!valid) {
          console.error('Erro de validação JSON:', validate.errors);
          return new Response(
            JSON.stringify({
              message: 'Erro de validação JSON',
              errors: validate.errors,
            }),
            { status: 400, headers: { 'Content-Type': 'application/json' } },
          );
        } else {
          const geminiResponse: GeminiResponse = {
            text: responseJson,
            note: 'Este é apenas um exemplo de plano de refeições. As porções e os alimentos podem ser ajustados de acordo com as preferências e necessidades individuais. É importante consultar um nutricionista para um plano alimentar personalizado e adequado às suas necessidades e objetivos. As calorias indicadas são aproximadas e podem variar dependendo da preparação e dos ingredientes utilizados.',
          };
          ('save');
          const savedMealPlan = await saveMealData(geminiResponse.text);

          return new Response(
            JSON.stringify({ geminiResponse, savedMealPlan }),
            {
              status: 200,
              headers: { 'Content-Type': 'application/json' },
            },
          );
        }
      } catch (parseError) {
        console.error('Erro ao analisar a resposta JSON:', parseError);
        console.error('String que falhou ao ser analisada:', responseText);
        return new Response(
          JSON.stringify({
            message: 'Erro ao analisar a resposta JSON',
            error: parseError,
            rawResponse: responseText,
          }),
          { status: 500, headers: { 'Content-Type': 'application/json' } },
        );
      }
    } catch (error) {
      console.error('Erro:', error);
      return new Response(
        JSON.stringify({ message: 'Erro interno do servidor' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } },
      );
    }
  } catch (outerError) {
    console.error('Erro externo:', outerError);
    return new Response(
      JSON.stringify({ message: 'Erro interno do servidor (externo)' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } },
    );
  }
}
