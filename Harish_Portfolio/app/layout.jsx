import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "../components/theme-provider"
import Footer from "../components/footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Harish S - Python & Frontend Developer",
  description: "Portfolio of Harish S, a Python & Frontend Developer showcasing skills, projects, and experience.",
  keywords: ["Python", "Frontend", "Developer", "Portfolio", "Harish S", "Next.js", "React"],
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Force favicon to be loaded - this helps with static exports */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/apple-icon.png" />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <main className="min-h-screen">
            {children}
            <Footer />
          </main>
        </ThemeProvider>
      </body>
    </html>
  )
}

