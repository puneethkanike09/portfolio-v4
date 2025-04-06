"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

export function Preloader() {
  const [loading, setLoading] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Start with body overflow hidden
    document.body.style.overflow = "hidden"

    // Smooth progress animation
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + (100 - prev) / 20
      })
    }, 100)

    // Cleanup timeout
    const timeout = setTimeout(() => {
      setLoading(false)
      document.body.style.overflow = ""
    }, 4000)

    // Cleanup function
    return () => {
      clearInterval(interval)
      clearTimeout(timeout)
      document.body.style.overflow = ""
    }
  }, [])

  if (!loading) return null

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-gray-900 transition-opacity duration-500 ease-in-out">
      <div className="flex flex-col items-center justify-center">
        {/* Logo Container */}
        <div className="relative w-48 h-48 mb-6">
          <Image
            src="/logo.png"
            alt="Loading Logo"
            fill
            sizes="192px"
            className="object-contain animate-pulse"
            priority
            quality={100}
          />
          {/* Glow effect */}
          <div className="absolute inset-0 bg-blue-500/20 rounded-full animate-pulse blur-xl" />
        </div>

        {/* Progress Circle */}
        <div className="relative w-56 h-56 -mt-52 mb-4">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <circle
              className="text-gray-700"
              strokeWidth="2"
              cx="50"
              cy="50"
              r="40"
              fill="transparent"
            />
            <circle
              className="text-blue-500 transition-all duration-300 ease-out"
              strokeWidth="2"
              strokeLinecap="round"
              cx="50"
              cy="50"
              r="40"
              fill="transparent"
              strokeDasharray="251.2"
              strokeDashoffset={251.2 - (251.2 * progress) / 100}
              transform="rotate(-90 50 50)"
            />
          </svg>
        </div>

        {/* Loading Text */}
        <p className="mt-4 text-gray-300 text-lg font-medium opacity-0 animate-[fadeIn_1s_ease-in_forwards]">
          Preparing Your Experience...
        </p>
      </div>
    </div>
  )
}