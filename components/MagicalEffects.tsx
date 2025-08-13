'use client'

import { useEffect, useRef } from 'react'

interface MagicalEffectsProps {
  variant?: 'sparkles' | 'particles' | 'aurora' | 'constellation'
  intensity?: 'low' | 'medium' | 'high'
  colors?: string[]
}

export default function MagicalEffects({ 
  variant = 'sparkles', 
  intensity = 'medium',
  colors = ['#9333ea', '#3b82f6', '#ec4899', '#10b981', '#f59e0b']
}: MagicalEffectsProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    const elementCounts = {
      low: 15,
      medium: 25,
      high: 40
    }

    const createSparkles = () => {
      const count = elementCounts[intensity]
      
      for (let i = 0; i < count; i++) {
        const sparkle = document.createElement('div')
        sparkle.className = 'absolute pointer-events-none'
        
        // Random position
        sparkle.style.left = Math.random() * 100 + '%'
        sparkle.style.top = Math.random() * 100 + '%'
        
        // Random color
        const color = colors[Math.floor(Math.random() * colors.length)]
        
        // Create sparkle content
        sparkle.innerHTML = '✨'
        sparkle.style.color = color
        sparkle.style.fontSize = Math.random() * 12 + 8 + 'px'
        sparkle.style.opacity = '0'
        
        // Animation
        sparkle.style.animation = `sparkleAnimation ${2 + Math.random() * 3}s ease-in-out infinite`
        sparkle.style.animationDelay = Math.random() * 2 + 's'
        
        container.appendChild(sparkle)
        
        // Remove after animation cycle
        setTimeout(() => {
          if (sparkle.parentNode) {
            sparkle.parentNode.removeChild(sparkle)
          }
        }, 5000)
      }
    }

    const createParticles = () => {
      const count = elementCounts[intensity]
      
      for (let i = 0; i < count; i++) {
        const particle = document.createElement('div')
        particle.className = 'absolute w-1 h-1 rounded-full pointer-events-none'
        
        // Random position
        particle.style.left = Math.random() * 100 + '%'
        particle.style.top = '100%'
        
        // Random color
        const color = colors[Math.floor(Math.random() * colors.length)]
        particle.style.backgroundColor = color
        particle.style.boxShadow = `0 0 6px ${color}`
        
        // Animation
        particle.style.animation = `particleRise ${3 + Math.random() * 4}s ease-out forwards`
        particle.style.animationDelay = Math.random() * 2 + 's'
        
        container.appendChild(particle)
        
        // Remove after animation
        setTimeout(() => {
          if (particle.parentNode) {
            particle.parentNode.removeChild(particle)
          }
        }, 7000)
      }
    }

    const createAurora = () => {
      const aurora = document.createElement('div')
      aurora.className = 'absolute inset-0 pointer-events-none opacity-30'
      aurora.style.background = `
        radial-gradient(ellipse at top, ${colors[0]} 0%, transparent 50%),
        radial-gradient(ellipse at bottom left, ${colors[1]} 0%, transparent 50%),
        radial-gradient(ellipse at bottom right, ${colors[2]} 0%, transparent 50%)
      `
      aurora.style.animation = 'auroraMove 8s ease-in-out infinite'
      
      container.appendChild(aurora)
      
      setTimeout(() => {
        if (aurora.parentNode) {
          aurora.parentNode.removeChild(aurora)
        }
      }, 8000)
    }

    const createConstellation = () => {
      const count = elementCounts[intensity]
      
      for (let i = 0; i < count; i++) {
        const star = document.createElement('div')
        star.className = 'absolute w-0.5 h-0.5 rounded-full pointer-events-none'
        
        // Random position
        star.style.left = Math.random() * 100 + '%'
        star.style.top = Math.random() * 100 + '%'
        
        // Star appearance
        star.style.backgroundColor = '#ffffff'
        star.style.boxShadow = '0 0 6px #ffffff, 0 0 12px #3b82f6, 0 0 18px #9333ea'
        
        // Twinkling animation
        star.style.animation = `twinkle ${1 + Math.random() * 2}s ease-in-out infinite`
        star.style.animationDelay = Math.random() * 2 + 's'
        
        container.appendChild(star)
        
        // Connect stars with lines occasionally
        if (i > 0 && Math.random() > 0.7) {
          const line = document.createElement('div')
          line.className = 'absolute h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent pointer-events-none opacity-20'
          line.style.width = Math.random() * 100 + 50 + 'px'
          line.style.left = star.style.left
          line.style.top = star.style.top
          line.style.transform = `rotate(${Math.random() * 360}deg)`
          line.style.animation = 'fadeInOut 4s ease-in-out infinite'
          
          container.appendChild(line)
          
          setTimeout(() => {
            if (line.parentNode) {
              line.parentNode.removeChild(line)
            }
          }, 4000)
        }
      }
      
      // Remove stars after a while
      setTimeout(() => {
        const stars = container.querySelectorAll('.w-0\\.5')
        stars.forEach(star => {
          if (star.parentNode) {
            star.parentNode.removeChild(star)
          }
        })
      }, 6000)
    }

    // Create effects based on variant
    const createEffects = () => {
      switch (variant) {
        case 'sparkles':
          createSparkles()
          break
        case 'particles':
          createParticles()
          break
        case 'aurora':
          createAurora()
          break
        case 'constellation':
          createConstellation()
          break
      }
    }

    // Initial creation
    createEffects()

    // Repeat effects
    const interval = setInterval(createEffects, variant === 'aurora' ? 8000 : 3000)

    return () => {
      clearInterval(interval)
      if (container) {
        container.innerHTML = ''
      }
    }
  }, [variant, intensity, colors])

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{ zIndex: 1 }}
    />
  )
}

// Add these keyframes to your CSS (they'll be in globals.css)
const styles = `
@keyframes sparkleAnimation {
  0%, 100% { 
    opacity: 0; 
    transform: scale(0) rotate(0deg); 
  }
  50% { 
    opacity: 1; 
    transform: scale(1) rotate(180deg); 
  }
}

@keyframes particleRise {
  0% {
    opacity: 0;
    transform: translateY(0) translateX(0) scale(0);
  }
  10% {
    opacity: 1;
    transform: translateY(-10vh) translateX(10px) scale(1);
  }
  90% {
    opacity: 1;
    transform: translateY(-90vh) translateX(-20px) scale(1);
  }
  100% {
    opacity: 0;
    transform: translateY(-100vh) translateX(-30px) scale(0);
  }
}

@keyframes auroraMove {
  0%, 100% { 
    transform: translateX(0%) rotate(0deg); 
    opacity: 0.3;
  }
  25% { 
    transform: translateX(10%) rotate(1deg); 
    opacity: 0.5;
  }
  50% { 
    transform: translateX(-5%) rotate(-0.5deg); 
    opacity: 0.4;
  }
  75% { 
    transform: translateX(15%) rotate(0.8deg); 
    opacity: 0.6;
  }
}

@keyframes twinkle {
  0%, 100% { 
    opacity: 0.3; 
    transform: scale(0.8); 
  }
  50% { 
    opacity: 1; 
    transform: scale(1.2); 
  }
}

@keyframes fadeInOut {
  0%, 100% { opacity: 0; }
  50% { opacity: 0.3; }
}
`