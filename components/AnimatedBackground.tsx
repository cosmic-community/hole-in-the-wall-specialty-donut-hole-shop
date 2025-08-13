'use client'

import { useEffect, useRef } from 'react'

interface AnimatedBackgroundProps {
  variant?: 'waves' | 'bubbles' | 'geometric' | 'organic'
  speed?: 'slow' | 'medium' | 'fast'
  colors?: string[]
  className?: string
}

export default function AnimatedBackground({ 
  variant = 'waves',
  speed = 'medium',
  colors = ['#667eea', '#764ba2', '#f093fb', '#f5576c', '#4facfe'],
  className = ''
}: AnimatedBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    const resizeCanvas = () => {
      const currentCanvas = canvasRef.current
      if (!currentCanvas) return
      currentCanvas.width = window.innerWidth
      currentCanvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    const speedMultiplier = speed === 'slow' ? 0.5 : speed === 'fast' ? 2 : 1

    // Waves variant
    if (variant === 'waves') {
      const waves = colors.map((color, index) => ({
        color,
        amplitude: 50 + index * 20,
        frequency: 0.01 + index * 0.005,
        phase: index * Math.PI * 0.5,
        speed: 0.02 * speedMultiplier * (1 + index * 0.3),
        opacity: 0.1 + index * 0.05
      }))

      let time = 0
      const animateWaves = () => {
        const currentCanvas = canvasRef.current
        const currentCtx = currentCanvas?.getContext('2d')
        if (!currentCanvas || !currentCtx) return
        
        currentCtx.clearRect(0, 0, currentCanvas.width, currentCanvas.height)
        
        waves.forEach(wave => {
          currentCtx.beginPath()
          currentCtx.globalAlpha = wave.opacity
          
          const gradient = currentCtx.createLinearGradient(0, 0, 0, currentCanvas.height)
          gradient.addColorStop(0, wave.color + '00')
          gradient.addColorStop(0.5, wave.color + '40')
          gradient.addColorStop(1, wave.color + '00')
          
          currentCtx.fillStyle = gradient
          
          currentCtx.moveTo(0, currentCanvas.height / 2)
          
          for (let x = 0; x <= currentCanvas.width; x += 5) {
            const y = currentCanvas.height / 2 + 
                     Math.sin(x * wave.frequency + time * wave.speed + wave.phase) * wave.amplitude +
                     Math.sin(x * wave.frequency * 2 + time * wave.speed * 1.5 + wave.phase) * wave.amplitude * 0.5
            currentCtx.lineTo(x, y)
          }
          
          currentCtx.lineTo(currentCanvas.width, currentCanvas.height)
          currentCtx.lineTo(0, currentCanvas.height)
          currentCtx.closePath()
          currentCtx.fill()
        })
        
        time += 1
        animationRef.current = requestAnimationFrame(animateWaves)
      }
      
      animateWaves()
    }

    // Bubbles variant
    else if (variant === 'bubbles') {
      const bubbles = Array.from({ length: 20 }, (_, index) => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 30 + 10,
        speed: (Math.random() * 2 + 1) * speedMultiplier,
        color: colors[index % colors.length],
        opacity: Math.random() * 0.3 + 0.1,
        pulsePhase: Math.random() * Math.PI * 2,
        pulseSpeed: Math.random() * 0.05 + 0.02
      }))

      let time = 0
      const animateBubbles = () => {
        const currentCanvas = canvasRef.current
        const currentCtx = currentCanvas?.getContext('2d')
        if (!currentCanvas || !currentCtx) return
        
        currentCtx.clearRect(0, 0, currentCanvas.width, currentCanvas.height)
        
        bubbles.forEach(bubble => {
          // Update position
          bubble.y -= bubble.speed
          if (bubble.y + bubble.radius < 0) {
            bubble.y = currentCanvas.height + bubble.radius
            bubble.x = Math.random() * currentCanvas.width
          }
          
          // Pulsing effect
          const pulseRadius = bubble.radius + Math.sin(time * bubble.pulseSpeed + bubble.pulsePhase) * 5
          
          // Draw bubble
          currentCtx.beginPath()
          currentCtx.globalAlpha = bubble.opacity
          
          const gradient = currentCtx.createRadialGradient(
            bubble.x, bubble.y, 0,
            bubble.x, bubble.y, pulseRadius
          )
          gradient.addColorStop(0, bubble.color + '60')
          gradient.addColorStop(0.7, bubble.color + '20')
          gradient.addColorStop(1, bubble.color + '00')
          
          currentCtx.fillStyle = gradient
          currentCtx.arc(bubble.x, bubble.y, pulseRadius, 0, Math.PI * 2)
          currentCtx.fill()
          
          // Inner highlight
          currentCtx.beginPath()
          currentCtx.globalAlpha = bubble.opacity * 0.8
          currentCtx.fillStyle = '#ffffff40'
          currentCtx.arc(bubble.x - pulseRadius * 0.3, bubble.y - pulseRadius * 0.3, pulseRadius * 0.2, 0, Math.PI * 2)
          currentCtx.fill()
        })
        
        time += 1
        animationRef.current = requestAnimationFrame(animateBubbles)
      }
      
      animateBubbles()
    }

    // Geometric variant
    else if (variant === 'geometric') {
      const shapes = Array.from({ length: 15 }, (_, index) => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 40 + 20,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() * 0.02 + 0.01) * speedMultiplier,
        driftX: (Math.random() - 0.5) * 0.5 * speedMultiplier,
        driftY: (Math.random() - 0.5) * 0.5 * speedMultiplier,
        color: colors[index % colors.length],
        opacity: Math.random() * 0.2 + 0.05,
        type: Math.floor(Math.random() * 3) // 0: triangle, 1: square, 2: hexagon
      }))

      const animateGeometric = () => {
        const currentCanvas = canvasRef.current
        const currentCtx = currentCanvas?.getContext('2d')
        if (!currentCanvas || !currentCtx) return
        
        currentCtx.clearRect(0, 0, currentCanvas.width, currentCanvas.height)
        
        shapes.forEach(shape => {
          // Update position and rotation
          shape.x += shape.driftX
          shape.y += shape.driftY
          shape.rotation += shape.rotationSpeed
          
          // Wrap around screen
          if (shape.x > currentCanvas.width + shape.size) shape.x = -shape.size
          if (shape.x < -shape.size) shape.x = currentCanvas.width + shape.size
          if (shape.y > currentCanvas.height + shape.size) shape.y = -shape.size
          if (shape.y < -shape.size) shape.y = currentCanvas.height + shape.size
          
          currentCtx.save()
          currentCtx.translate(shape.x, shape.y)
          currentCtx.rotate(shape.rotation)
          currentCtx.globalAlpha = shape.opacity
          
          const gradient = currentCtx.createRadialGradient(0, 0, 0, 0, 0, shape.size)
          gradient.addColorStop(0, shape.color + '60')
          gradient.addColorStop(1, shape.color + '00')
          currentCtx.fillStyle = gradient
          
          currentCtx.beginPath()
          
          if (shape.type === 0) { // Triangle
            currentCtx.moveTo(0, -shape.size)
            currentCtx.lineTo(-shape.size * 0.866, shape.size * 0.5)
            currentCtx.lineTo(shape.size * 0.866, shape.size * 0.5)
          } else if (shape.type === 1) { // Square
            currentCtx.rect(-shape.size * 0.5, -shape.size * 0.5, shape.size, shape.size)
          } else { // Hexagon
            for (let i = 0; i < 6; i++) {
              const angle = (i * Math.PI) / 3
              const x = Math.cos(angle) * shape.size
              const y = Math.sin(angle) * shape.size
              if (i === 0) currentCtx.moveTo(x, y)
              else currentCtx.lineTo(x, y)
            }
          }
          
          currentCtx.closePath()
          currentCtx.fill()
          currentCtx.restore()
        })
        
        animationRef.current = requestAnimationFrame(animateGeometric)
      }
      
      animateGeometric()
    }

    // Organic variant
    else if (variant === 'organic') {
      const blobs = Array.from({ length: 8 }, (_, index) => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        baseRadius: Math.random() * 100 + 50,
        points: Array.from({ length: 8 }, () => Math.random() * 0.5 + 0.75),
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() * 0.005 + 0.002) * speedMultiplier,
        driftX: (Math.random() - 0.5) * 0.3 * speedMultiplier,
        driftY: (Math.random() - 0.5) * 0.3 * speedMultiplier,
        color: colors[index % colors.length],
        opacity: Math.random() * 0.15 + 0.05,
        pulsePhase: Math.random() * Math.PI * 2
      }))

      let time = 0
      const animateOrganic = () => {
        const currentCanvas = canvasRef.current
        if (!currentCanvas) return
        
        const currentCtx = currentCanvas.getContext('2d')
        if (!currentCtx) return
        
        currentCtx.clearRect(0, 0, currentCanvas.width, currentCanvas.height)
        
        blobs.forEach(blob => {
          // Update position
          blob.x += blob.driftX
          blob.y += blob.driftY
          blob.rotation += blob.rotationSpeed
          
          // Wrap around
          if (blob.x > currentCanvas.width + blob.baseRadius) blob.x = -blob.baseRadius
          if (blob.x < -blob.baseRadius) blob.x = currentCanvas.width + blob.baseRadius
          if (blob.y > currentCanvas.height + blob.baseRadius) blob.y = -blob.baseRadius
          if (blob.y < -blob.baseRadius) blob.y = currentCanvas.height + blob.baseRadius
          
          currentCtx.save()
          currentCtx.translate(blob.x, blob.y)
          currentCtx.rotate(blob.rotation)
          currentCtx.globalAlpha = blob.opacity
          
          const gradient = currentCtx.createRadialGradient(0, 0, 0, 0, 0, blob.baseRadius * 2)
          gradient.addColorStop(0, blob.color + '80')
          gradient.addColorStop(0.5, blob.color + '40')
          gradient.addColorStop(1, blob.color + '00')
          currentCtx.fillStyle = gradient
          
          currentCtx.beginPath()
          
          for (let i = 0; i < blob.points.length; i++) {
            const angle = (i / blob.points.length) * Math.PI * 2
            const radiusVariation = Math.sin(time * 0.02 + blob.pulsePhase + i) * 20
            const radius = blob.baseRadius * blob.points[i] + radiusVariation
            const x = Math.cos(angle) * radius
            const y = Math.sin(angle) * radius
            
            if (i === 0) currentCtx.moveTo(x, y)
            else currentCtx.lineTo(x, y)
          }
          
          currentCtx.closePath()
          currentCtx.fill()
          currentCtx.restore()
        })
        
        time += 1
        animationRef.current = requestAnimationFrame(animateOrganic)
      }
      
      animateOrganic()
    }

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [variant, speed, colors])

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none ${className}`}
      style={{ zIndex: -1 }}
    />
  )
}