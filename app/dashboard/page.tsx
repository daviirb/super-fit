import { BannerGallery } from "@/components/BannerGallery"
import { DietInfo } from "@/components/DietInfo"
import { MealOptions } from "@/components/MealOptions"
import { WeekDaySelector } from "@/components/WeekDaySelector"

export default function DashboardPage() {
  return (
    <div className="p-2">
      <BannerGallery />
      <WeekDaySelector />
      <MealOptions />
      <DietInfo />
    </div>
  )
}

