"use client"

import { cn } from "@/utils/sanitizeClassName"
import { useState } from "react"

const mealOptions = ["Café da Manhã", "Lanche da Manhã", "Almoço", "Lanche da Tarde", "Janta"]

export function MealOptions() {
  const [selectedMeal, setSelectedMeal] = useState(mealOptions[0])

  return (
    <div className="mb-6">
      <div className="flex space-x-4 overflow-x-auto pb-2">
        {mealOptions.map((meal) => (
          <button
            key={meal}
            onClick={() => setSelectedMeal(meal)}
            className={cn(
              "px-4 py-2 rounded-full whitespace-nowrap",
              selectedMeal === meal ? "bg-primary text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300",
            )}
          >
            {meal}
          </button>
        ))}
      </div>
    </div>
  )
}

