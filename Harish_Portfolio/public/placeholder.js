// This file will be used to generate placeholder images
export default function handler(req, res) {
    const { height = 300, width = 400 } = req.query
  
    // Create an SVG placeholder
    const svg = `
      <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="#3B82F6" opacity="0.1"/>
        <text x="50%" y="50%" font-family="Arial" font-size="24" fill="#3B82F6" text-anchor="middle" dominant-baseline="middle">
          ${width}x${height}
        </text>
      </svg>
    `
  
    res.setHeader("Content-Type", "image/svg+xml")
    res.status(200).send(svg)
  }
  
  