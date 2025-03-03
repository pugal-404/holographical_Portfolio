const { execSync } = require("child_process")
const fs = require("fs")
const path = require("path")

// Build the Next.js project
console.log("Building Next.js project...")
try {
  // Use next build directly since next export is deprecated in Next.js 13+
  execSync("npx next build", { stdio: "inherit" })

  // Check if the out directory exists
  if (!fs.existsSync(path.join(__dirname, "out"))) {
    console.error('Build failed: "out" directory not found')
    process.exit(1)
  }

  // Serve the out directory
  console.log("Serving the built project...")
  console.log("Open http://localhost:3000 in your browser")
  execSync("npx serve@latest out -p 3000", { stdio: "inherit" })
} catch (error) {
  console.error("Build or serve process failed:", error.message)
  process.exit(1)
}

