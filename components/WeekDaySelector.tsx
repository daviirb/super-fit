"use client"

import { cn } from "@/utils/sanitizeClassName"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useEffect, useState } from "react"

const weekDays = ["D", "S", "T", "Q", "Q", "S", "S"]

export function WeekDaySelector() {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [currentWeek, setCurrentWeek] = useState<Date[]>([])
  const [weekOffset, setWeekOffset] = useState(0)

  useEffect(() => {
    const getWeekDates = (offset: number) => {
      const today = new Date()
      const startOfWeek = new Date(today)
      startOfWeek.setDate(today.getDate() - today.getDay() + offset * 7)

      return Array.from({ length: 7 }, (_, i) => {
        const date = new Date(startOfWeek)
        date.setDate(startOfWeek.getDate() + i)
        return date
      })
    }

    setCurrentWeek(getWeekDates(weekOffset))
  }, [weekOffset])

  const navigateWeek = (direction: "prev" | "next") => {
    setWeekOffset((prev) => (direction === "next" ? prev + 1 : prev - 1))
  }

  const isToday = (date: Date) => {
    const today = new Date()
    return date.toDateString() === today.toDateString()
  }

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2 px-4">
        <button onClick={() => navigateWeek("prev")} className="p-2">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h2 className="text-lg font-semibold">
          {currentWeek.length > 0 &&
            (() => {
              const formattedDate = currentWeek[0].toLocaleDateString("pt-BR", {
                month: "long",
                year: "numeric",
              });
              return formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
            })()}
        </h2>
        <button onClick={() => navigateWeek("next")} className="p-2">
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
      <div className="flex justify-between px-2">
        {currentWeek.map((date, index) => {
          const isSelected = date.toDateString() === selectedDate.toDateString()
          return (
            <button
              key={date.toISOString()}
              onClick={() => setSelectedDate(date)}
              className={cn(
                "flex flex-col items-center w-8 py-2 rounded-full",
                isSelected
                    ? "bg-primary text-white font-bold"
                    : isToday(date)
                      ? "bg-green-200 text-primaryDark"
                      : "bg-gray-200 text-gray-700",
                  "hover:bg-green-500 hover:text-white transition-colors",
              )}
            >
              <div>
                {weekDays[index]}
              </div>
              <span className={cn("text-sm")}>{date.getDate()}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

