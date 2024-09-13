'use client'

import { useEffect, useState } from 'react'

const words = [
  'Thinking',
  'Overthinking',
  'Analyzing',
  'Second-guessing',
  'Reassuring',
  'Regretting',
  'Self-doubting',
  'Paralyzed'
]

export default function SmoothGradientLoader() {
  const [mounted, setMounted] = useState(false)
  const [currentWord, setCurrentWord] = useState(words[0])
  const [fade, setFade] = useState(true)

  useEffect(() => {
    setMounted(true)

    const intervalId = setInterval(() => {
      setFade(false) 
      setTimeout(() => {
        setCurrentWord((prevWord) => {
          const currentIndex = words.indexOf(prevWord)
          const nextIndex = (currentIndex + 1) % words.length
          return words[nextIndex]
        })
        setFade(true) 
      }, 500) 
    }, 3000) 

    return () => clearInterval(intervalId)
  }, [])

  if (!mounted) return null

  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <h1
        className={`text-4xl font-bold animate-gradient bg-gradient-to-r from-gray-300 via-gray-800 to-gray-300 bg-clip-text text-transparent bg-400% transition-opacity duration-500 ease-in-out ${
          fade ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {currentWord}
      </h1>
      <style jsx global>{`
        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          100% {
            background-position: -200% 50%;
          }
        }
        .animate-gradient {
          animation: gradient 3s linear infinite;
        }
        .bg-400\% {
          background-size: 400% 100%;
        }
      `}</style>
    </div>
  )
}