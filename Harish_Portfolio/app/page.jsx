"use client"

import dynamic from "next/dynamic"

const Hero = dynamic(() => import("../components/hero"))
const About = dynamic(() => import("../components/about"))
const Skills = dynamic(() => import("../components/skills"))
const Projects = dynamic(() => import("../components/projects"))
const Contact = dynamic(() => import("../components/contact"))

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Contact />
    </>
  )
}

