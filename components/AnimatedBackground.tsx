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
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
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
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        
        waves.forEach(wave => {
          ctx.beginPath()
          ctx.globalAlpha = wave.opacity
          
          const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
          gradient.addColorStop(0, wave.color + '00')
          gradient.addColorStop(0.5, wave.color + '40')
          gradient.addColorStop(1, wave.color + '00')
          
          ctx.fillStyle = gradient
          
          ctx.moveTo(0, canvas.height / 2)
          
          for (let x = 0; x <= canvas.width; x += 5) {
            const y = canvas.height / 2 + 
                     Math.sin(x * wave.frequency + time * wave.speed + wave.phase) * wave.amplitude +
                     Math.sin(x * wave.frequency * 2 + time * wave.speed * 1.5 + wave.phase) * wave.amplitude * 0.5
            ctx.lineTo(x, y)
          }
          
          ctx.lineTo(canvas.width, canvas.height)
          ctx.lineTo(0, canvas.height)
          ctx.closePath()
          ctx.fill()
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
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        
        bubbles.forEach(bubble => {
          // Update position
          bubble.y -= bubble.speed
          if (bubble.y + bubble.radius < 0) {
            bubble.y = canvas.height + bubble.radius
            bubble.x = Math.random() * canvas.width
          }
          
          // Pulsing effect
          const pulseRadius = bubble.radius + Math.sin(time * bubble.pulseSpeed + bubble.pulsePhase) * 5
          
          // Draw bubble
          ctx.beginPath()
          ctx.globalAlpha = bubble.opacity
          
          const gradient = ctx.createRadialGradient(
            bubble.x, bubble.y, 0,
            bubble.x, bubble.y, pulseRadius
          )
          gradient.addColorStop(0, bubble.color + '60')
          gradient.addColorStop(0.7, bubble.color + '20')
          gradient.addColorStop(1, bubble.color + '00')
          
          ctx.fillStyle = gradient
          ctx.arc(bubble.x, bubble.y, pulseRadius, 0, Math.PI * 2)
          ctx.fill()
          
          // Inner highlight
          ctx.beginPath()
          ctx.globalAlpha = bubble.opacity * 0.8
          ctx.fillStyle = '#ffffff40'
          ctx.arc(bubble.x - pulseRadius * 0.3, bubble.y - pulseRadius * 0.3, pulseRadius * 0.2, 0, Math.PI * 2)
          ctx.fill()
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
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        
        shapes.forEach(shape => {
          // Update position and rotation
          shape.x += shape.driftX
          shape.y += shape.driftY
          shape.rotation += shape.rotationSpeed
          
          // Wrap around screen
          if (shape.x > canvas.width + shape.size) shape.x = -shape.size
          if (shape.x < -shape.size) shape.x = canvas.width + shape.size
          if (shape.y > canvas.height + shape.size) shape.y = -shape.size
          if (shape.y < -shape.size) shape.y = canvas.height + shape.size
          
          ctx.save()
          ctx.translate(shape.x, shape.y)
          ctx.rotate(shape.rotation)
          ctx.globalAlpha = shape.opacity
          
          const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, shape.size)
          gradient.addColorStop(0, shape.color + '60')
          gradient.addColorStop(1, shape.color + '00')
          ctx.fillStyle = gradient
          
          ctx.beginPath()
          
          if (shape.type === 0) { // Triangle
            ctx.moveTo(0, -shape.size)
            ctx.lineTo(-shape.size * 0.866, shape.size * 0.5)
            ctx.lineTo(shape.size * 0.866, shape.size * 0.5)
          } else if (shape.type === 1) { // Square
            ctx.rect(-shape.size * 0.5, -shape.size * 0.5, shape.size, shape.size)
          } else { // Hexagon
            for (let i = 0; i < 6; i++) {
              const angle = (i * Math.PI) / 3
              const x = Math.cos(angle) * shape.size
              const y = Math.sin(angle) * shape.size
              if (i === 0) ctx.moveTo(x, y)
              else ctx.lineTo(x, y)
            }
          }
          
          ctx.closePath()
          ctx.fill()
          ctx.restore()
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
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        
        blobs.forEach(blob => {
          // Update position
          blob.x += blob.driftX
          blob.y += blob.driftY
          blob.rotation += blob.rotationSpeed
          
          // Wrap around
          if (blob.x > canvas.width + blob.baseRadius) blob.x = -blob.baseRadius
          if (blob.x < -blob.baseRadius) blob.x = canvas.width + blob.baseRadius
          if (blob.y > canvas.height + blob.baseRadius) blob.y = -blob.baseRadius
          if (blob.y < -blob.baseRadius) blob.y = canvas.height + blob.baseRadius
          
          ctx.save()
          ctx.translate(blob.x, blob.y)
          ctx.rotate(blob.rotation)
          ctx.globalAlpha = blob.opacity
          
          const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, blob.baseRadius * 2)
          gradient.addColorStop(0, blob.color + '80')
          gradient.addColorStop(0.5, blob.color + '40')
          gradient.addColorStop(1, blob.color + '00')
          ctx.fillStyle = gradient
          
          ctx.beginPath()
          
          for (let i = 0; i < blob.points.length; i++) {
            const angle = (i / blob.points.length) * Math.PI * 2
            const radiusVariation = Math.sin(time * 0.02 + blob.pulsePhase + i) * 20
            const radius = blob.baseRadius * blob.points[i] + radiusVariation
            const x = Math.cos(angle) * radius
            const y = Math.sin(angle) * radius
            
            if (i === 0) ctx.moveTo(x, y)
            else ctx.lineTo(x, y)
          }
          
          ctx.closePath()
          ctx.fill()
          ctx.restore()
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