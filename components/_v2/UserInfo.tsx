// "use client"

// import { Activity, Droplet, FlameIcon as Fire } from "lucide-react"
// import { useEffect, useState } from "react"
// import {
//   Bar,
//   BarChart,
//   Cell,
//   Line,
//   LineChart,
//   Pie,
//   PieChart,
//   ResponsiveContainer,
//   Tooltip,
//   XAxis,
//   YAxis,
// } from "recharts"

// interface UserInfo {
//   name: string
//   weight: number
//   height: number
//   waterIntake: number
//   calorieIntake: number
//   goal: string
//   weeklyActivity?: { day: string; minutes: number }[]
//   macronutrients?: { name: string; value: number }[]
//   weightHistory?: { date: string; weight: number }[]
// }

// const COLORS = ["#0088FE", "#00C49F", "#FFBB28"]

// export function UserInfoCard({ user }: { user: UserInfo }) {
//   const [animationPercent, setAnimationPercent] = useState(0)
//   const bmi = user.weight / Math.pow(user.height / 100, 2)
//   const bmiCategory = getBMICategory(bmi)

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setAnimationPercent((prev) => (prev < 100 ? prev + 1 : 100))
//     }, 20)
//     return () => clearInterval(timer)
//   }, [])

//   return (
//     <div className="bg-white p-6 rounded-lg shadow-md mb-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//       <div className="col-span-1 md:col-span-2 lg:col-span-3">
//         <h2 className="text-2xl font-semibold mb-4">Olá, {user.name}!</h2>
//         <p className="text-gray-600 mb-2">
//           Seu objetivo: <span className="font-medium">{user.goal}</span>
//         </p>
//       </div>

//       <div className="bg-blue-50 p-4 rounded-lg">
//         <h3 className="text-lg font-semibold mb-2 flex items-center">
//           <Activity className="mr-2" /> Dados Físicos
//         </h3>
//         <p>Peso: {user.weight} kg</p>
//         <p>Altura: {user.height} cm</p>
//         <p>
//           IMC: {bmi.toFixed(1)} ({bmiCategory})
//         </p>
//       </div>

//       <div className="bg-green-50 p-4 rounded-lg">
//         <h3 className="text-lg font-semibold mb-2 flex items-center">
//           <Droplet className="mr-2" /> Consumo de Água
//         </h3>
//         <div className="relative pt-1">
//           <div className="flex mb-2 items-center justify-between">
//             <div>
//               <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
//                 Progresso
//               </span>
//             </div>
//             <div className="text-right">
//               <span className="text-xs font-semibold inline-block text-blue-600">{user.waterIntake}L / 3L</span>
//             </div>
//           </div>
//           <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200">
//             <div
//               style={{ width: `${(user.waterIntake / 3) * 100}%` }}
//               className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
//             ></div>
//           </div>
//         </div>
//       </div>

//       <div className="bg-red-50 p-4 rounded-lg">
//         <h3 className="text-lg font-semibold mb-2 flex items-center">
//           <Fire className="mr-2" /> Calorias
//         </h3>
//         <p>Consumo diário: {user.calorieIntake} kcal</p>
//         {user.macronutrients && user.macronutrients.length > 0 ? (
//           <>
//             <ResponsiveContainer width="100%" height={100}>
//               <PieChart>
//                 <Pie
//                   data={user.macronutrients}
//                   cx="50%"
//                   cy="50%"
//                   innerRadius={30}
//                   outerRadius={40}
//                   fill="#8884d8"
//                   dataKey="value"
//                   startAngle={90}
//                   endAngle={-270}
//                 >
//                   {user.macronutrients.map((entry, index) => (
//                     <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                   ))}
//                 </Pie>
//               </PieChart>
//             </ResponsiveContainer>
//             <div className="flex justify-around text-xs mt-2">
//               {user.macronutrients.map((macro, index) => (
//                 <div key={macro.name} className="flex items-center">
//                   <div
//                     className="w-3 h-3 rounded-full mr-1"
//                     style={{ backgroundColor: COLORS[index % COLORS.length] }}
//                   ></div>
//                   {macro.name}
//                 </div>
//               ))}
//             </div>
//           </>
//         ) : (
//           <p>Dados de macronutrientes não disponíveis</p>
//         )}
//       </div>

//       {user.weeklyActivity && user.weeklyActivity.length > 0 ? (
//         <div className="col-span-1 md:col-span-2 lg:col-span-3">
//           <h3 className="text-lg font-semibold mb-2">Atividade Semanal</h3>
//           <ResponsiveContainer width="100%" height={200}>
//             <BarChart data={user.weeklyActivity}>
//               <XAxis dataKey="day" />
//               <YAxis />
//               <Tooltip />
//               <Bar dataKey="minutes" fill="#8884d8">
//                 {user.weeklyActivity.map((entry, index) => (
//                   <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                 ))}
//               </Bar>
//             </BarChart>
//           </ResponsiveContainer>
//         </div>
//       ) : (
//         <div className="col-span-1 md:col-span-2 lg:col-span-3">
//           <p>Dados de atividade semanal não disponíveis</p>
//         </div>
//       )}

//       {user.weightHistory && user.weightHistory.length > 0 ? (
//         <div className="col-span-1 md:col-span-2 lg:col-span-3">
//           <h3 className="text-lg font-semibold mb-2">Histórico de Peso</h3>
//           <ResponsiveContainer width="100%" height={200}>
//             <LineChart data={user.weightHistory}>
//               <XAxis dataKey="date" />
//               <YAxis />
//               <Tooltip />
//               <Line type="monotone" dataKey="weight" stroke="#8884d8" strokeWidth={2} />
//             </LineChart>
//           </ResponsiveContainer>
//         </div>
//       ) : (
//         <div className="col-span-1 md:col-span-2 lg:col-span-3">
//           <p>Histórico de peso não disponível</p>
//         </div>
//       )}
//     </div>
//   )
// }

// function getBMICategory(bmi: number): string {
//   if (bmi < 18.5) return "Abaixo do peso"
//   if (bmi < 25) return "Peso normal"
//   if (bmi < 30) return "Sobrepeso"
//   return "Obeso"
// }
