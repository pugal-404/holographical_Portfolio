"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"
import confetti from "canvas-confetti"

const timelineItems = [
  {
    title: "B.Tech in Computer Science",
    subtitle: "SRM University",
    period: "2020-2024",
    description: "CGPA: 9.02",
  },
  {
    title: "Higher Secondary",
    subtitle: "ACS Matriculation, Tiruvannamalai",
    period: "2018-2020",
    description: "Percentage: 83.33%",
  },
  {
    title: "SSLC",
    subtitle: "ACS Matriculation, Tiruvannamalai",
    period: "2017-2018",
    description: "Percentage: 96.4%",
  },
  {
    title: "CHAMPIONSHIP",
    subtitle: "ABACUS State Level Competition",
    period: "2016",
    description: "Achieved the championship title",
  },
  {
    title: "Certifications",
    subtitle: "Professional Development",
    period: "2023",
    description: "JavaScript with DSA (2023), Typewriting Course (Junior)",
  },
]

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.2 })
  const [visibleItems, setVisibleItems] = useState([])

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        timelineItems.forEach((_, index) => {
          setTimeout(() => {
            setVisibleItems((prev) => {
              if (!prev.includes(index)) {
                // Trigger confetti when a new level is revealed
                const element = document.getElementById(`timeline-item-${index}`)
                if (element) {
                  const rect = element.getBoundingClientRect()
                  confetti({
                    particleCount: 30,
                    spread: 40,
                    origin: {
                      x: rect.left / window.innerWidth,
                      y: rect.top / window.innerHeight,
                    },
                    colors: ["#22c55e", "#10b981", "#34d399"],
                  })
                }
                return [...prev, index]
              }
              return prev
            })
          }, index * 800) // Stagger the appearance
        })
      }, 500)

      return () => clearTimeout(timer)
    }
  }, [isInView])

  return (
    <section id="about" className="py-20 relative overflow-hidden">
      <div
        className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent -z-10"
        style={{
          transform: isInView ? "translateY(0)" : "translateY(100px)",
          opacity: isInView ? 1 : 0,
          transition: "all 1.2s cubic-bezier(0.17, 0.55, 0.55, 1) 0.2s",
        }}
      />

      <div className="container mx-auto px-4" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">My Journey</h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex justify-center items-center"
          >
            <div className="relative w-64 h-64 rounded-full overflow-hidden border-4 border-primary/30 glow-border sci-fi-border">
              <Image src="/profile.jpg" alt="Harish S" fill className="object-cover" />
              <motion.div
                animate={{
                  rotateZ: [0, 10, 0, 10, 0],
                  transition: {
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "loop",
                    duration: 2,
                    repeatDelay: 3,
                  },
                }}
                className="absolute inset-0"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="md:col-span-2 relative pl-6"
          >
            <div className="timeline-line" />

            {timelineItems.map((item, index) => (
              <motion.div
                id={`timeline-item-${index}`}
                key={index}
                initial={{ opacity: 0, x: 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                className={`mb-8 relative pl-8 ${visibleItems.includes(index) ? "level-complete" : ""}`}
              >
                <div className="absolute left-0 top-0 w-4 h-4 rounded-full bg-primary z-10" />
                <h3 className="text-xl font-bold">{item.title}</h3>
                <p className="text-primary">{item.subtitle}</p>
                <p className="text-sm text-muted-foreground">{item.period}</p>
                <p className="mt-2">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

