'use client';

type UserInfo = {
  name: string;
  weight: number;
  height: number;
  calories: string;
  goal: string;
};

export function UserInfoCard({ user }: { user: Partial<UserInfo> }) {
  if (!user.height || !user.weight) return null;

  const bmi = user.weight / Math.pow(user.height / 100, 2);
  const bmiCategory = getBMICategory(bmi);

  return (
    <div>
      <h2 className="text-2xl font-semibold">Olá, {user.name}! 👋</h2>
      <div className="mb-6 mt-4 rounded-lg bg-white px-4 py-2 shadow-md">
        <div className="grid grid-cols-1 text-sm md:grid-cols-2">
          <div className="flex items-center gap-2">
            <span className="text-xl">⚖️</span>
            <p className="text-sm text-gray-600">Peso:</p>
            <p className="text-sm font-medium">{user.weight} kg</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xl">📏</span>
            <p className="text-sm text-gray-600">Altura:</p>
            <p className="text-sm font-medium">{user.height} cm</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xl">📊</span>
            <p className="text-sm text-gray-600">IMC:</p>
            <p className="text-sm font-medium">
              {bmi.toFixed(1)} ({bmiCategory})
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xl">🎯</span>
            <p className="text-sm text-gray-600">Objetivo:</p>
            <p className="text-sm font-medium">{user.goal}</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xl">🔥</span>
            <p className="text-sm text-gray-600">Calorias:</p>
            <p className="text-sm font-medium">{user.calories}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function getBMICategory(bmi: number): string {
  if (bmi < 18.5) return 'Abaixo do peso';
  if (bmi < 25) return 'Peso normal';
  if (bmi < 30) return 'Sobrepeso';
  return 'Obeso';
}
