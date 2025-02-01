type UserProfile = {
  weight: string;
  height: string;
  age: number;
  gender: string;
  goal: string;
  calories: string;
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
