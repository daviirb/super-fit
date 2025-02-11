'use server';
import { MockData } from '@/app/(pages)/home/_components/mockData';
import { auth } from '@/auth';
import db from '@/utils/db';

type UserProfile = {
  weight: string;
  height: string;
  age: number;
  gender: string;
  goal: string;
};

export type Meal = {
  mealTitle: string;
  foodList: string[];
};

export type Prompt = {
  userProfile: UserProfile;
  mealPlan: Meal[];
};

export type MealPlanResponse = {
  day: string;
  meal: string;
  foods: string[];
}[];

export type GeminiResponse = {
  text: MealPlanResponse;
  note?: string;
};
type RegisterState = {
  success: boolean;
  message?: string;
};

export async function saveMealData(
  mealData: any,
): Promise<RegisterState | null> {
  const session = await auth();
  if (!session?.user?.email) {
    console.error('Erro: Sessão não encontrada');
    return { success: false, message: 'Erro ao buscar uma sessão' };
  }

  const user = await db.users.findUnique({
    where: { email: session.user.email },
  });

  if (!user) {
    console.error('Erro: Usuário não encontrado');
    return { success: false, message: 'Usuário não encontrado' };
  }

  const userId = user.id;

  console.log('******** SAVE MEAL DATA *******');
  console.log('ID do usuário:', userId);
  // console.log('Data:', JSON.stringify(mealData, null, 2));

  try {
    for (const meal of mealData) {
      console.log(meal.name);

      const mealCreated = await db.user_meal.create({
        data: {
          name: meal.name,
          time: meal.time,
          userId: userId,
          options: {
            create: (Array.isArray(meal.options) ? meal.options : []).map(
              (option: any) => ({
                name: option.name,
                items: {
                  create: (Array.isArray(option.items) ? option.items : []).map(
                    (item: any) => ({
                      name: item.name,
                      quantity: item.quantity,
                      nutritionalInfo: {
                        create: {
                          calories: item.nutritionalInfo?.calories ?? 0,
                          protein: item.nutritionalInfo?.protein ?? 0,
                          carbs: item.nutritionalInfo?.carbs ?? 0,
                          fat: item.nutritionalInfo?.fat ?? 0,
                        },
                      },
                    }),
                  ),
                },
              }),
            ),
          },
        },
      });

      console.log(`Refeição ${meal.name} salva com sucesso!`);
    }

    return { success: true, message: 'Refeições salvas com sucesso' };
  } catch (error) {
    console.error('Erro ao salvar refeições:', error);
    throw new Error('Failed to save meals');
  }
}

export async function saveMealDataMockButton() {
  const mealData = MockData;
  const session = await auth();
  if (!session?.user?.email) {
    console.error('Erro: Sessão não encontrada');
    return { success: false, message: 'Erro ao buscar uma sessão' };
  }

  const user = await db.users.findUnique({
    where: { email: session.user.email },
  });

  if (!user) {
    console.error('Erro: Usuário não encontrado');
    return { success: false, message: 'Usuário não encontrado' };
  }

  const userId = user.id;

  console.log('******** SAVE MEAL DATA *******');
  console.log('ID do usuário:', userId);

  try {
    for (const meal of mealData) {
      const mealCreated = await db.user_meal.create({
        data: {
          name: meal.name,
          time: meal.time,
          userId: userId,
          options: {
            create: meal.options.map((option: any) => ({
              name: option.name,
              items: {
                create: option.items.map((item: any) => ({
                  name: item.name,
                  quantity: item.quantity,
                  nutritionalInfo: {
                    create: {
                      calories: item.calories,
                      protein: item.protein,
                      carbs: item.carbs,
                      fat: item.fat,
                    },
                  },
                })),
              },
            })),
          },
        },
      });
    }

    return { success: true, message: 'Refeições salvas com sucesso' };
  } catch (error) {
    console.error('Erro ao salvar refeições:', error);
    throw new Error('Failed to save meals');
  }
}

export async function getMealData(): Promise<any> {
  const session = await auth();
  if (!session?.user?.email) {
    console.error('Erro: Sessão não encontrada');
    return { success: false, message: 'Erro ao buscar uma sessão' };
  }

  const user = await db.users.findUnique({
    where: { email: session.user.email },
  });

  if (!user) {
    console.error('Erro: Usuário não encontrado');
    return { success: false, message: 'Usuário não encontrado' };
  }

  const userId = user.id;

  try {
    const meals = await db.user_meal.findMany({
      where: { userId },
      include: {
        options: {
          include: {
            items: {
              include: {
                nutritionalInfo: true, // Incluindo as informações nutricionais
              },
            },
          },
        },
      },
    });

    // Organizando os dados para retornar no formato desejado
    const formattedMeals = meals.map((meal) => ({
      name: meal.name,
      time: meal.time,
      options: meal.options.map((option) => ({
        name: option.name,
        items: option.items.map((item) => ({
          name: item.name,
          quantity: item.quantity,
          calories: item.nutritionalInfo.calories,
          protein: item.nutritionalInfo.protein,
          carbs: item.nutritionalInfo.carbs,
          fat: item.nutritionalInfo.fat,
        })),
      })),
    }));

    return { success: true, meals: formattedMeals };
  } catch (error) {
    console.error('Erro ao buscar refeições:', error);
    return { success: false, message: 'Erro ao buscar as refeições' };
  }
}
