"use client"

import { useState, useRef } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { Loader2, Send, CheckCircle, AlertCircle, ChevronDown, Github, Linkedin, Mail, Phone } from "lucide-react"
import { useForm, ValidationError } from "@formspree/react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"

// Use the public Formspree endpoint
const FORM_ID = "xnnjewnn"

const countryCodes = [
  { code: "+1", flag: "🇺🇸", name: "United States" },
  { code: "+44", flag: "🇬🇧", name: "United Kingdom" },
  { code: "+91", flag: "🇮🇳", name: "India" },
  // Add more country codes as needed
]

export default function Contact() {
  const [state, handleSubmit] = useForm(FORM_ID)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    countryCode: "+1",
    phone: "",
    message: "",
  })
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.2 })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleCountryCodeChange = (code) => {
    setFormData((prev) => ({
      ...prev,
      countryCode: code,
    }))
    setIsDropdownOpen(false)
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    const fullPhone = `${formData.countryCode}${formData.phone}`
    const formDataToSubmit = new FormData()
    Object.entries({ ...formData, phone: fullPhone }).forEach(([key, value]) => {
      formDataToSubmit.append(key, value)
    })
    await handleSubmit(formDataToSubmit)
    if (state.succeeded) {
      setFormData({ name: "", email: "", countryCode: "+1", phone: "", message: "" })
    }
  }

  return (
    <section id="contact" className="py-20 bg-background">
      <div className="container mx-auto px-4" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Transmission Link</h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <h3 className="text-2xl font-bold mb-6">Get In Touch</h3>

            <div className="space-y-6">
              <motion.a href="tel:9384763135" whileHover={{ scale: 1.05 }} className="flex items-center group">
                <div className="bg-primary/10 p-3 rounded-full mr-4 group-hover:bg-primary/20 transition-colors">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium">Phone</h4>
                  <p className="text-muted-foreground">9384763135</p>
                </div>
              </motion.a>

              <motion.a
                href="mailto:harishsenthilkumarr@gmail.com"
                whileHover={{ scale: 1.05 }}
                className="flex items-center group"
              >
                <div className="bg-primary/10 p-3 rounded-full mr-4 group-hover:bg-primary/20 transition-colors">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium">Email</h4>
                  <p className="text-muted-foreground">harishsenthilkumarr@gmail.com</p>
                </div>
              </motion.a>

              <motion.a
                href="https://linkedin.com/in/harish-s"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                className="flex items-center group"
              >
                <div className="bg-primary/10 p-3 rounded-full mr-4 group-hover:bg-primary/20 transition-colors">
                  <Linkedin className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium">LinkedIn</h4>
                  <p className="text-muted-foreground">linkedin.com/in/harish-s</p>
                </div>
              </motion.a>

              <motion.a
                href="https://github.com/harish-s"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                className="flex items-center group"
              >
                <div className="bg-primary/10 p-3 rounded-full mr-4 group-hover:bg-primary/20 transition-colors">
                  <Github className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium">GitHub</h4>
                  <p className="text-muted-foreground">github.com/harish-s</p>
                </div>
              </motion.a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="backdrop-blur-sm bg-card/5 p-6 sm:p-8 rounded-xl border border-primary/10 sci-fi-border"
          >
            <form onSubmit={onSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Name
                </label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-background/50 rounded-lg border border-primary/30 focus:border-primary focus:ring-2 focus:ring-primary/50 outline-none transition-all duration-300"
                  autoComplete="name"
                />
                <ValidationError prefix="Name" field="name" errors={state.errors} />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email
                </label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-background/50 rounded-lg border border-primary/30 focus:border-primary focus:ring-2 focus:ring-primary/50 outline-none transition-all duration-300"
                  autoComplete="email"
                />
                <ValidationError prefix="Email" field="email" errors={state.errors} />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium mb-2">
                  Phone
                </label>
                <div className="flex">
                  <div className="relative w-1/3 mr-2">
                    <button
                      type="button"
                      className="w-full px-4 py-3 bg-background/50 rounded-lg border border-primary/30 focus:border-primary focus:ring-2 focus:ring-primary/50 outline-none transition-all duration-300 flex items-center justify-between"
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    >
                      <span>
                        {countryCodes.find((c) => c.code === formData.countryCode)?.flag} {formData.countryCode}
                      </span>
                      <ChevronDown size={20} />
                    </button>
                    {isDropdownOpen && (
                      <div className="absolute z-10 w-full mt-1 bg-card rounded-md shadow-lg max-h-60 overflow-auto">
                        {countryCodes.map((country) => (
                          <button
                            key={country.code}
                            type="button"
                            className="w-full text-left px-4 py-2 hover:bg-muted focus:outline-none"
                            onClick={() => handleCountryCodeChange(country.code)}
                          >
                            {country.flag} {country.code} {country.name}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  <Input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-2/3 px-4 py-3 bg-background/50 rounded-lg border border-primary/30 focus:border-primary focus:ring-2 focus:ring-primary/50 outline-none transition-all duration-300"
                    autoComplete="tel"
                  />
                </div>
                <ValidationError prefix="Phone" field="phone" errors={state.errors} />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-background/50 rounded-lg border border-primary/30 focus:border-primary focus:ring-2 focus:ring-primary/50 outline-none transition-all duration-300 resize-none"
                />
                <ValidationError prefix="Message" field="message" errors={state.errors} />
              </div>

              <Button
                type="submit"
                disabled={state.submitting}
                className="w-full px-6 py-3 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground rounded-lg font-medium 
                     hover:from-primary/90 hover:to-primary/70 focus:outline-none focus:ring-2 focus:ring-primary/50 
                     focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300
                     flex items-center justify-center space-x-2 sci-fi-border relative overflow-hidden"
              >
                {state.submitting ? (
                  <>
                    <Loader2 className="animate-spin" size={20} />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    <span>Send Message</span>
                  </>
                )}
              </Button>
            </form>

            <AnimatePresence>
              {state.succeeded && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mt-4 p-4 bg-green-500/20 backdrop-blur-sm border border-green-500 rounded-lg flex items-center space-x-2"
                >
                  <CheckCircle className="text-green-500" size={20} />
                  <span className="text-green-200">Message sent successfully!</span>
                </motion.div>
              )}

              {state.errors && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mt-4 p-4 bg-red-500/20 backdrop-blur-sm border border-red-500 rounded-lg flex items-center space-x-2"
                >
                  <AlertCircle className="text-red-500" size={20} />
                  <span className="text-red-200">There was an error sending your message. Please try again.</span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

