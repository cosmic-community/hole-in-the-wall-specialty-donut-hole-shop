'use client'

import { useEffect, useRef, useState } from 'react'

interface SparkleEffectProps {
  children: React.ReactNode
  count?: number
  colors?: string[]
  size?: 'small' | 'medium' | 'large'
  speed?: 'slow' | 'medium' | 'fast'
  trigger?: 'hover' | 'always' | 'click'
  className?: string
}

interface Sparkle {
  id: number
  x: number
  y: number
  size: number
  color: string
  opacity: number
  life: number
  maxLife: number
  velocityX: number
  velocityY: number
  rotation: number
  rotationSpeed: number
}

export default function SparkleEffect({
  children,
  count = 12,
  colors = ['#9333ea', '#3b82f6', '#ec4899', '#10b981', '#f59e0b'],
  size = 'medium',
  speed = 'medium',
  trigger = 'hover',
  className = ''
}: SparkleEffectProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [sparkles, setSparkles] = useState<Sparkle[]>([])
  const [isActive, setIsActive] = useState(trigger === 'always')
  const animationRef = useRef<number>()
  const sparkleIdRef = useRef(0)

  const sizeMap = {
    small: { min: 8, max: 16 },
    medium: { min: 12, max: 24 },
    large: { min: 16, max: 32 }
  }

  const speedMap = {
    slow: 0.5,
    medium: 1,
    fast: 2
  }

  const createSparkle = (x?: number, y?: number): Sparkle => {
    const containerRect = containerRef.current?.getBoundingClientRect()
    const sparkleSize = Math.random() * (sizeMap[size].max - sizeMap[size].min) + sizeMap[size].min
    
    return {
      id: sparkleIdRef.current++,
      x: x !== undefined ? x : Math.random() * (containerRect?.width || 300),
      y: y !== undefined ? y : Math.random() * (containerRect?.height || 200),
      size: sparkleSize,
      color: colors[Math.floor(Math.random() * colors.length)] || '#9333ea',
      opacity: Math.random() * 0.8 + 0.2,
      life: 0,
      maxLife: Math.random() * 60 + 60,
      velocityX: (Math.random() - 0.5) * 2 * speedMap[speed],
      velocityY: (Math.random() - 0.5) * 2 * speedMap[speed],
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 5 * speedMap[speed]
    }
  }

  const updateSparkles = () => {
    setSparkles(prevSparkles => {
      const updated = prevSparkles.map(sparkle => ({
        ...sparkle,
        x: sparkle.x + sparkle.velocityX,
        y: sparkle.y + sparkle.velocityY,
        life: sparkle.life + 1,
        rotation: sparkle.rotation + sparkle.rotationSpeed,
        opacity: Math.max(0, sparkle.opacity - 0.02)
      })).filter(sparkle => sparkle.life < sparkle.maxLife && sparkle.opacity > 0)

      // Add new sparkles if active and below count
      if (isActive && updated.length < count) {
        const newSparkles = Array.from(
          { length: Math.min(3, count - updated.length) },
          () => createSparkle()
        )
        return [...updated, ...newSparkles]
      }

      return updated
    })
  }

  useEffect(() => {
    if (isActive || sparkles.length > 0) {
      animationRef.current = requestAnimationFrame(() => {
        updateSparkles()
        animationRef.current = requestAnimationFrame(updateSparkles)
      })
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isActive, sparkles.length])

  const handleMouseEnter = () => {
    if (trigger === 'hover') {
      setIsActive(true)
    }
  }

  const handleMouseLeave = () => {
    if (trigger === 'hover') {
      setIsActive(false)
    }
  }

  const handleClick = (e: React.MouseEvent) => {
    if (trigger === 'click') {
      const rect = containerRef.current?.getBoundingClientRect()
      if (rect) {
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        
        // Create burst of sparkles at click position
        const burstSparkles = Array.from({ length: 8 }, () => createSparkle(x, y))
        setSparkles(prev => [...prev, ...burstSparkles])
      }
    }
  }

  const SparkleComponent = ({ sparkle }: { sparkle: Sparkle }) => {
    const sparkleStyle: React.CSSProperties = {
      position: 'absolute',
      left: `${sparkle.x}px`,
      top: `${sparkle.y}px`,
      width: `${sparkle.size}px`,
      height: `${sparkle.size}px`,
      color: sparkle.color,
      opacity: sparkle.opacity,
      transform: `rotate(${sparkle.rotation}deg)`,
      pointerEvents: 'none',
      userSelect: 'none',
      fontSize: `${sparkle.size}px`,
      lineHeight: 1,
      zIndex: 10
    }

    return (
      <div style={sparkleStyle}>
        ✨
      </div>
    )
  }

  return (
    <div
      ref={containerRef}
      className={`relative ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      {children}
      {sparkles.map(sparkle => (
        <SparkleComponent key={sparkle.id} sparkle={sparkle} />
      ))}
    </div>
  )
}

// Preset configurations for easy use
export const SparklePresets = {
  gentle: {
    count: 6,
    colors: ['#e0e7ff', '#c7d2fe', '#a5b4fc'],
    size: 'small' as const,
    speed: 'slow' as const
  },
  magical: {
    count: 12,
    colors: ['#9333ea', '#3b82f6', '#ec4899', '#10b981'],
    size: 'medium' as const,
    speed: 'medium' as const
  },
  celebration: {
    count: 20,
    colors: ['#f59e0b', '#ef4444', '#10b981', '#3b82f6', '#8b5cf6'],
    size: 'large' as const,
    speed: 'fast' as const
  },
  rainbow: {
    count: 15,
    colors: ['#ef4444', '#f97316', '#f59e0b', '#eab308', '#22c55e', '#06b6d4', '#3b82f6', '#8b5cf6', '#ec4899'],
    size: 'medium' as const,
    speed: 'medium' as const
  }
}