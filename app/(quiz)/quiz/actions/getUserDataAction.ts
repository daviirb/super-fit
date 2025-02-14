'use server';

import { auth } from '@/auth';
import db from '@/utils/db';

export async function getQuizData() {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      console.error('Erro: Sessão não encontrada');
      return { status: 404, message: 'Erro ao buscar uma sessão' };
    }

    const user = await db.users.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      console.error('Erro: Usuário não encontrado');
      return { status: 404, message: 'Usuário não encontrado' };
    }

    const userId = user.id;

    const userInfo = await db.user_info.findUnique({
      where: { userId },
      select: {
        weight: true,
        height: true,
        age: true,
        goal: true,
        gender: true,
        calories: true,
      },
    });

    const breakfastData = await db.user_breakfast.findUnique({
      where: { userId },
      select: {
        foodItems: true,
      },
    });

    const breakfast = breakfastData?.foodItems.map((item) => item.name) || [];
    const lunchData = await db.user_lunch.findUnique({
      where: { userId },
      select: {
        foodItems: true,
      },
    });

    const lunch = lunchData?.foodItems.map((item) => item.name) || [];
    const snackData = await db.user_snack.findUnique({
      where: { userId },
      select: {
        foodItems: true,
      },
    });

    const snack = snackData?.foodItems.map((item) => item.name) || [];

    const dinnerData = await db.user_dinner.findUnique({
      where: { userId },
      select: {
        foodItems: true,
      },
    });

    const dinner = dinnerData?.foodItems.map((item) => item.name) || [];

    const moreInfo = await db.user_moreInfos.findUnique({
      where: { userId },
      select: {
        activity: true,
        exercise: true,
        dietSchedule: true,
        chocolate: true,
      },
    });

    return {
      success: true,
      data: {
        userInfo: userInfo || {},
        breakfast,
        lunch,
        snack,
        dinner,
        moreInfo: moreInfo || {},
      },
    };
  } catch (error) {
    return { success: false, error: 'Erro ao buscar os dados' };
  }
}
