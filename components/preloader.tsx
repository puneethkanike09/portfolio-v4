"use client"

import { useState, useEffect } from "react"

export function Preloader() {
  const [loading, setLoading] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + (100 - prev) / 20
        return Math.min(newProgress, 100)
      })
    }, 100)

    // Set timeout to hide preloader after 5 seconds
    const timeout = setTimeout(() => {
      setLoading(false)
      document.body.style.overflow = ""
    }, 5000)

    // Prevent scrolling during preloader
    document.body.style.overflow = "hidden"

    return () => {
      clearInterval(interval)
      clearTimeout(timeout)
      document.body.style.overflow = ""
    }
  }, [])

  if (!loading) return null

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black">
      <div className="relative w-40 h-40 mb-8">
        {/* Animated elements */}
        <div className="absolute inset-0 border-4 border-primary rounded-full animate-[spin_3s_linear_infinite]"></div>
        <div className="absolute inset-2 border-4 border-gray-400 rounded-full animate-[spin_2s_linear_infinite_reverse]"></div>
        <div className="absolute inset-4 border-4 border-primary/70 rounded-full animate-[spin_4s_linear_infinite]"></div>
        <div className="absolute inset-0 m-auto w-20 h-20 flex flex-col items-center justify-center text-center">
          <span className="text-xl font-bold text-gray-100">Puneeth</span>
          <span className="text-lg text-gray-500">Kanike</span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-64 h-1 bg-gray-700 rounded-full overflow-hidden">
        <div className="h-full bg-white transition-all duration-300 ease-out" style={{ width: `${progress}%` }}></div>
      </div>

      <p className="mt-4 text-gray-300 text-sm">Loading Experience...</p>
    </div>
  )
}