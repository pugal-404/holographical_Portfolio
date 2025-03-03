"use client"

import { useState, useRef } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { Button } from "./ui/button"
import { X } from "lucide-react"
import Image from "next/image"

const projects = [
  {
    id: 1,
    title: "Blockchain Certificate Verification",
    period: "Jan 2024 - May 2024",
    description: "Built a tamper-proof system for verifying academic certificates.",
    achievements: [
      "Enhanced workflow efficiency by 25% through streamlined processes.",
      "Implemented secure blockchain verification for 1000+ certificates.",
      "Reduced verification time from days to seconds.",
    ],
    image: "/projects/blockchain.jpeg",
    tags: ["Blockchain", "Python", "React"],
  },
  {
    id: 2,
    title: "Student Attendance System using Facial Recognition",
    period: "July 2023 - Dec 2023",
    description: "Implemented AI-based facial recognition for student tracking.",
    achievements: [
      "Boosted project success rates by 10% through effective collaboration.",
      "Reduced manual attendance tracking time by 90%.",
      "Integrated with existing school management systems.",
    ],
    image: "/projects/facial-recognition.png",
    tags: ["AI", "Python", "OpenCV"],
  },
]

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.2 })

  const handleProjectClick = (id) => {
    setSelectedProject(id)
  }

  const selectedProjectData = projects.find((p) => p.id === selectedProject)

  return (
    <section className="py-20">
      <div className="container mx-auto px-4" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Experiments & Creations</h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              whileHover={{
                y: -10,
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
              }}
              onClick={() => handleProjectClick(project.id)}
              className="bg-card rounded-lg p-6 cursor-pointer border border-border hover:border-primary transition-all duration-300 sci-fi-border"
            >
              <div className="mb-4 overflow-hidden rounded-lg">
                <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    width={600}
                    height={300}
                    className="w-full h-48 object-cover"
                  />
                </motion.div>
              </div>

              <h3 className="text-xl font-bold mb-2">{project.title}</h3>
              <p className="text-sm text-primary mb-2">{project.period}</p>
              <p className="text-muted-foreground mb-4">{project.description}</p>

              <div className="flex flex-wrap gap-2 mt-4">
                {project.tags.map((tag, i) => (
                  <span key={i} className="bg-secondary text-secondary-foreground text-xs px-3 py-1 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {selectedProject && selectedProjectData && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedProject(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", damping: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-card rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto sci-fi-border"
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-2xl font-bold">{selectedProjectData.title}</h3>
                  <Button variant="ghost" size="icon" onClick={() => setSelectedProject(null)}>
                    <X className="h-5 w-5" />
                  </Button>
                </div>

                <div className="mb-6 overflow-hidden rounded-lg">
                  <Image
                    src={selectedProjectData.image || "/placeholder.svg"}
                    alt={selectedProjectData.title}
                    width={600}
                    height={400}
                    className="w-full h-auto"
                  />
                </div>

                <p className="text-sm text-primary mb-2">{selectedProjectData.period}</p>
                <p className="text-muted-foreground mb-4">{selectedProjectData.description}</p>

                <h4 className="font-semibold mb-2">Key Achievements:</h4>
                <ul className="list-disc pl-5 mb-4 space-y-2">
                  {selectedProjectData.achievements.map((achievement, i) => (
                    <li key={i}>{achievement}</li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2 mt-4">
                  {selectedProjectData.tags.map((tag, i) => (
                    <span key={i} className="bg-secondary text-secondary-foreground text-xs px-3 py-1 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}

