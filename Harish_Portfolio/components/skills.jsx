"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Code, Database, FileCode, Globe, Palette } from "lucide-react"

const skills = [
  { name: "Python", icon: <FileCode className="h-8 w-8" />, level: 90 },
  { name: "HTML", icon: <Code className="h-8 w-8" />, level: 95 },
  { name: "CSS", icon: <Palette className="h-8 w-8" />, level: 85 },
  { name: "JavaScript", icon: <Globe className="h-8 w-8" />, level: 80 },
  { name: "Django", icon: <Database className="h-8 w-8" />, level: 75 },
]

export default function Skills() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.2 })

  return (
    <section className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">My Arsenal</h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{
                scale: 1.05,
                rotateY: 10,
                boxShadow: "0 0 20px rgba(59, 130, 246, 0.6)",
              }}
              className="bg-card rounded-lg p-6 cursor-pointer transition-all duration-300 hover:border-primary border-2 border-transparent sci-fi-border"
            >
              <div className="flex items-center mb-4">
                <motion.div
                  animate={{
                    y: [0, -10, 0],
                    transition: {
                      repeat: Number.POSITIVE_INFINITY,
                      repeatType: "loop",
                      duration: 2,
                      delay: index * 0.2,
                    },
                  }}
                  className="mr-4 text-primary"
                >
                  {skill.icon}
                </motion.div>
                <h3 className="text-xl font-bold">{skill.name}</h3>
              </div>

              <div className="w-full bg-secondary rounded-full h-2.5 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={isInView ? { width: `${skill.level}%` } : {}}
                  transition={{ duration: 1, delay: 0.3 + index * 0.1 }}
                  className="bg-primary h-2.5 rounded-full relative"
                >
                  <motion.div
                    className="absolute top-0 right-0 h-full w-4 bg-white/30"
                    animate={{
                      x: [0, 10, 0],
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      repeat: Number.POSITIVE_INFINITY,
                      duration: 1.5,
                      repeatDelay: 1,
                    }}
                  />
                </motion.div>
              </div>
              <div className="mt-2 text-right text-sm text-muted-foreground">{skill.level}%</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

