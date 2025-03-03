"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { Button } from "./ui/button"
import { ArrowDown, Download } from "lucide-react"
import confetti from "canvas-confetti"

export default function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [typedText, setTypedText] = useState("")
  const fullText = "Harish S"
  const confettiRef = useRef(null)
  const typingSpeed = 150 // ms per character

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX / window.innerWidth - 0.5,
        y: e.clientY / window.innerHeight - 0.5,
      })
    }

    window.addEventListener("mousemove", handleMouseMove)

    // Trigger confetti on load
    if (confettiRef.current) {
      const rect = confettiRef.current.getBoundingClientRect()
      confetti({
        particleCount: 100,
        spread: 70,
        origin: {
          x: rect.left / window.innerWidth + rect.width / window.innerWidth / 2,
          y: rect.top / window.innerHeight,
        },
      })
    }

    // Typing animation
    let i = 0
    const typingInterval = setInterval(() => {
      if (i < fullText.length) {
        setTypedText(fullText.substring(0, i + 1))
        i++
      } else {
        clearInterval(typingInterval)
      }
    }, typingSpeed)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      clearInterval(typingInterval)
    }
  }, [])

  const handleExplore = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })
  }

  const handleResumeClick = () => {
    // Open Google Form link in a new tab
    window.open("https://drive.google.com/file/d/1igcnG9IIQNnoPYfH3bFt2MLPNnH5Frab/view?usp=sharing", "_blank")
  }

  return (
    <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
      <div className="scanline"></div>
      <div
        className="sci-fi-grid absolute inset-0 z-0"
        style={{
          transform: `translateX(${mousePosition.x * 20}px) translateY(${mousePosition.y * 20}px)`,
        }}
      />

      <div ref={confettiRef} className="z-10 text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-6"
        >
          <h2 className="text-xl md:text-2xl font-medium text-primary mb-2">Welcome, Human!</h2>
          <h1 className="text-4xl md:text-6xl font-bold mb-4 glow-text typing-cursor">I am {typedText}</h1>
          <p className="text-xl md:text-2xl text-muted-foreground">Python & Frontend Developer</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mt-8"
        >
          <Button variant="scifi" size="lg" onClick={handleExplore} className="group sci-fi-border">
            Explore
            <ArrowDown className="ml-2 h-4 w-4 group-hover:animate-bounce" />
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={handleResumeClick}
            className="group hover:glow-border sci-fi-border"
          >
            Download Resume
            <Download className="ml-2 h-4 w-4 group-hover:translate-y-1 transition-transform" />
          </Button>
        </motion.div>
      </div>
    </section>
  )
}

