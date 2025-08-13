'use client'

import { useEffect, useRef } from 'react'

interface FloatingElementsProps {
  elements?: Array<{
    emoji: string
    size: number
    speed: number
    color?: string
  }>
  count?: number
  speed?: 'slow' | 'medium' | 'fast'
  direction?: 'up' | 'down' | 'random'
  className?: string
}

export default function FloatingElements({
  elements = [
    { emoji: '🍩', size: 24, speed: 1 },
    { emoji: '✨', size: 16, speed: 1.2 },
    { emoji: '🌟', size: 20, speed: 0.8 },
    { emoji: '💫', size: 18, speed: 1.1 },
    { emoji: '🎂', size: 22, speed: 0.9 },
    { emoji: '🧁', size: 20, speed: 1.3 }
  ],
  count = 15,
  speed = 'medium',
  direction = 'up',
  className = ''
}: FloatingElementsProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const elementsRef = useRef<HTMLDivElement[]>([])

  const speedMultiplier = speed === 'slow' ? 0.5 : speed === 'fast' ? 2 : 1

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Clear existing elements
    container.innerHTML = ''
    elementsRef.current = []

    // Create floating elements
    for (let i = 0; i < count; i++) {
      const element = document.createElement('div')
      const elementType = elements[i % elements.length]
      
      // Basic styling
      element.className = 'absolute pointer-events-none select-none'
      element.style.fontSize = `${elementType.size}px`
      element.textContent = elementType.emoji
      element.style.zIndex = '1'
      
      if (elementType.color) {
        element.style.color = elementType.color
      }

      // Random starting position
      element.style.left = Math.random() * 100 + '%'
      
      // Starting position based on direction
      if (direction === 'up') {
        element.style.top = '100%'
      } else if (direction === 'down') {
        element.style.top = '-10%'
      } else {
        element.style.top = Math.random() * 100 + '%'
      }

      // Animation properties
      const baseSpeed = elementType.speed * speedMultiplier
      const animationDuration = (8 + Math.random() * 4) / baseSpeed
      const horizontalDrift = (Math.random() - 0.5) * 200
      const rotationAmount = (Math.random() - 0.5) * 360
      const scaleVariation = 0.8 + Math.random() * 0.4

      let keyframes: Keyframe[]
      
      if (direction === 'up') {
        keyframes = [
          { 
            transform: `translateY(0) translateX(0) rotate(0deg) scale(${scaleVariation})`, 
            opacity: 0 
          },
          { 
            transform: `translateY(-20vh) translateX(${horizontalDrift * 0.3}px) rotate(${rotationAmount * 0.3}deg) scale(${scaleVariation})`, 
            opacity: 1,
            offset: 0.1
          },
          { 
            transform: `translateY(-80vh) translateX(${horizontalDrift * 0.7}px) rotate(${rotationAmount * 0.7}deg) scale(${scaleVariation})`, 
            opacity: 1,
            offset: 0.9
          },
          { 
            transform: `translateY(-110vh) translateX(${horizontalDrift}px) rotate(${rotationAmount}deg) scale(${scaleVariation})`, 
            opacity: 0 
          }
        ]
      } else if (direction === 'down') {
        keyframes = [
          { 
            transform: `translateY(0) translateX(0) rotate(0deg) scale(${scaleVariation})`, 
            opacity: 0 
          },
          { 
            transform: `translateY(20vh) translateX(${horizontalDrift * 0.3}px) rotate(${rotationAmount * 0.3}deg) scale(${scaleVariation})`, 
            opacity: 1,
            offset: 0.1
          },
          { 
            transform: `translateY(80vh) translateX(${horizontalDrift * 0.7}px) rotate(${rotationAmount * 0.7}deg) scale(${scaleVariation})`, 
            opacity: 1,
            offset: 0.9
          },
          { 
            transform: `translateY(110vh) translateX(${horizontalDrift}px) rotate(${rotationAmount}deg) scale(${scaleVariation})`, 
            opacity: 0 
          }
        ]
      } else {
        // Random direction
        const randomDirectionY = (Math.random() - 0.5) * 200
        keyframes = [
          { 
            transform: `translateY(0) translateX(0) rotate(0deg) scale(${scaleVariation})`, 
            opacity: Math.random() * 0.5 + 0.3
          },
          { 
            transform: `translateY(${randomDirectionY * 0.5}px) translateX(${horizontalDrift * 0.5}px) rotate(${rotationAmount * 0.5}deg) scale(${scaleVariation * 1.1})`, 
            opacity: 1,
            offset: 0.5
          },
          { 
            transform: `translateY(${randomDirectionY}px) translateX(${horizontalDrift}px) rotate(${rotationAmount}deg) scale(${scaleVariation * 0.9})`, 
            opacity: Math.random() * 0.5 + 0.2
          }
        ]
      }

      // Apply animation
      const animation = element.animate(keyframes, {
        duration: animationDuration * 1000,
        easing: 'ease-out',
        iterations: Infinity,
        delay: Math.random() * 2000 // Random delay up to 2 seconds
      })

      // Pause animation on hover (for performance)
      element.addEventListener('mouseenter', () => animation.pause())
      element.addEventListener('mouseleave', () => animation.play())

      container.appendChild(element)
      elementsRef.current.push(element)
    }

    // Cleanup function
    return () => {
      elementsRef.current.forEach(element => {
        if (element.parentNode) {
          element.parentNode.removeChild(element)
        }
      })
      elementsRef.current = []
    }
  }, [elements, count, speed, direction])

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
      style={{ zIndex: 1 }}
    />
  )
}

// Preset configurations for different themes
export const FloatingPresets = {
  bakery: {
    elements: [
      { emoji: '🍩', size: 28, speed: 1, color: '#8b5a2b' },
      { emoji: '🧁', size: 24, speed: 1.2, color: '#ec4899' },
      { emoji: '🍪', size: 22, speed: 0.9, color: '#92400e' },
      { emoji: '🎂', size: 26, speed: 0.8, color: '#7c3aed' },
      { emoji: '✨', size: 18, speed: 1.4, color: '#f59e0b' },
      { emoji: '🌟', size: 20, speed: 1.1, color: '#10b981' }
    ],
    count: 12,
    speed: 'medium' as const,
    direction: 'up' as const
  },
  magical: {
    elements: [
      { emoji: '✨', size: 20, speed: 1.3 },
      { emoji: '🌟', size: 24, speed: 1 },
      { emoji: '💫', size: 18, speed: 1.5 },
      { emoji: '⭐', size: 22, speed: 0.9 },
      { emoji: '🔮', size: 26, speed: 0.7 },
      { emoji: '🪄', size: 28, speed: 0.8 }
    ],
    count: 15,
    speed: 'medium' as const,
    direction: 'random' as const
  },
  celebration: {
    elements: [
      { emoji: '🎉', size: 24, speed: 1.2 },
      { emoji: '🎊', size: 20, speed: 1.4 },
      { emoji: '🎈', size: 26, speed: 0.8 },
      { emoji: '🎁', size: 22, speed: 1.1 },
      { emoji: '✨', size: 18, speed: 1.6 },
      { emoji: '🌟', size: 20, speed: 1.3 }
    ],
    count: 20,
    speed: 'fast' as const,
    direction: 'up' as const
  },
  nature: {
    elements: [
      { emoji: '🌸', size: 22, speed: 1.1, color: '#ec4899' },
      { emoji: '🦋', size: 24, speed: 1.3, color: '#8b5cf6' },
      { emoji: '🌺', size: 26, speed: 0.9, color: '#f97316' },
      { emoji: '🍃', size: 20, speed: 1.4, color: '#10b981' },
      { emoji: '✨', size: 16, speed: 1.6, color: '#f59e0b' }
    ],
    count: 10,
    speed: 'slow' as const,
    direction: 'random' as const
  }
}