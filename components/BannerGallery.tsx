"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import { useEffect, useState } from "react"

const bannerData = [
  { title: "Dica do dia", content: "Beba pelo menos 8 copos de água hoje!" },
  { title: "Motivação", content: "Cada passo conta. Continue se movendo!" },
  { title: "Lembrete", content: "Não se esqueça de registrar suas refeições." },
]

export function BannerGallery() {
  const [currentBanner, setCurrentBanner] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % bannerData.length)
    }, 10000)
    return () => clearInterval(timer)
  }, [])

  const navigate = (direction: "prev" | "next") => {
    if (direction === "prev") {
      setCurrentBanner((prev) => (prev - 1 + bannerData.length) % bannerData.length)
    } else {
      setCurrentBanner((prev) => (prev + 1) % bannerData.length)
    }
  }

  return (
    <div className="relative bg-blue-200 text-white p-6 rounded-lg shadow-lg mb-6">
      <div className="flex justify-between items-center">
        <button onClick={() => navigate("prev")} className="text-white">
          <ChevronLeft size={24} />
        </button>
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">{bannerData[currentBanner].title}</h2>
          <p>{bannerData[currentBanner].content}</p>
        </div>
        <button onClick={() => navigate("next")} className="text-white">
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  )
}

