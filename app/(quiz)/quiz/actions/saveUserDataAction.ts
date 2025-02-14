'use server';

import { auth } from '@/auth';
import db from '@/utils/db';

export async function submitQuiz(formData: any) {
  try {
    const {
      userInfo,
      breakfast = [],
      lunch = [],
      snack = [],
      dinner = [],
      moreInfo,
    } = formData;

    let userId;
    const session = await auth();
    if (!session) {
      return {
        status: 404,
        message: 'Erro ao buscar uma sessão',
      };
    }

    if (session.user?.email) {
      const user = await db.users.findUnique({
        where: {
          email: session.user.email,
        },
      });

      userId = user?.id;

      if (!userId) {
        return {
          status: 404,
          message: 'Usuário não encontrado',
        };
      }
    }

    const userInfoData = {
      weight: userInfo?.weight ?? null,
      height: userInfo?.height ?? null,
      age: userInfo?.age ?? null,
      goal: userInfo?.goal ?? null,
      gender: userInfo?.gender ?? null,
      calories: userInfo?.calories ?? null,
    };

    await db.user_info.upsert({
      where: { userId },
      update: userInfoData,
      create: {
        user: {
          connect: { id: userId },
        },
        ...userInfoData,
      },
    });

    if (Array.isArray(breakfast) && breakfast.length > 0) {
      await db.user_breakfast.upsert({
        where: { userId },
        update: {
          foodItems: {
            deleteMany: {},
            create: breakfast.map((item: string) => ({
              name: item,
            })),
          },
        },
        create: {
          user: {
            connect: { id: userId },
          },
          foodItems: {
            create: breakfast.map((item: string) => ({
              name: item,
            })),
          },
        },
      });
    }

    if (Array.isArray(lunch) && lunch.length > 0) {
      await db.user_lunch.upsert({
        where: { userId },
        update: {
          foodItems: {
            deleteMany: {},
            create: lunch.map((item: string) => ({
              name: item,
            })),
          },
        },
        create: {
          user: {
            connect: { id: userId },
          },
          foodItems: {
            create: lunch.map((item: string) => ({
              name: item,
            })),
          },
        },
      });
    }

    if (Array.isArray(snack) && snack.length > 0) {
      await db.user_snack.upsert({
        where: { userId },
        update: {
          foodItems: {
            deleteMany: {},
            create: snack.map((item: string) => ({
              name: item,
            })),
          },
        },
        create: {
          user: {
            connect: { id: userId },
          },
          foodItems: {
            create: snack.map((item: string) => ({
              name: item,
            })),
          },
        },
      });
    }

    if (Array.isArray(dinner) && dinner.length > 0) {
      await db.user_dinner.upsert({
        where: { userId },
        update: {
          foodItems: {
            deleteMany: {},
            create: dinner.map((item: string) => ({
              name: item,
            })),
          },
        },
        create: {
          user: {
            connect: { id: userId },
          },
          foodItems: {
            create: dinner.map((item: string) => ({
              name: item,
            })),
          },
        },
      });
    }

    const validMoreInfo = {
      activity: moreInfo.activity || null,
      exercise: moreInfo.exercise || null,
      dietSchedule: moreInfo.dietSchedule || null,
      chocolate: moreInfo.chocolate || null,
    };

    await db.user_moreInfos.upsert({
      where: { userId },
      update: validMoreInfo,
      create: {
        user: {
          connect: { id: userId },
        },
        ...validMoreInfo,
      },
    });

    return { success: true };
  } catch (error) {
    return { success: false, error: 'Erro ao salvar os dados' };
  }
}
