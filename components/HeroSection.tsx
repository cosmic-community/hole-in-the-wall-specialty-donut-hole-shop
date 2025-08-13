import Link from 'next/link'
import { BusinessInfo } from '@/types'
import MagicalEffects from './MagicalEffects'
import AnimatedBackground from './AnimatedBackground'
import SparkleEffect from './SparkleEffect'
import FloatingElements from './FloatingElements'

interface HeroSectionProps {
  businessInfo: BusinessInfo;
}

export default function HeroSection({ businessInfo }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Animated Background */}
      <AnimatedBackground 
        variant="waves"
        speed="medium"
        colors={['#667eea', '#764ba2', '#f093fb', '#f5576c', '#4facfe']}
      />

      {/* Magical Effects Layer */}
      <div className="absolute inset-0">
        <MagicalEffects variant="sparkles" intensity="medium" />
        <MagicalEffects variant="particles" intensity="low" />
      </div>

      {/* Floating Donut Elements */}
      <FloatingElements
        elements={[
          { emoji: '🍩', size: 32, speed: 1, color: '#8b5a2b' },
          { emoji: '✨', size: 20, speed: 1.3, color: '#f59e0b' },
          { emoji: '🌟', size: 24, speed: 1.1, color: '#10b981' },
          { emoji: '💫', size: 18, speed: 1.4, color: '#8b5cf6' }
        ]}
        count={8}
        speed="slow"
        direction="up"
      />

      {/* Main Content */}
      <div className="relative z-20 max-w-7xl mx-auto container-magical text-center">
        <div className="max-w-5xl mx-auto">
          {/* Magical Title */}
          <SparkleEffect 
            trigger="always" 
            count={15} 
            colors={['#9333ea', '#3b82f6', '#ec4899', '#10b981', '#f59e0b']}
            size="large"
          >
            <h1 className="heading-magical mb-8 animate-magical-entrance text-balance">
              Welcome to the{' '}
              <span className="relative">
                Magic
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-lg blur opacity-20 animate-glow"></div>
              </span>
            </h1>
          </SparkleEffect>
          
          <div className="animate-magical-entrance [animation-delay:0.3s]">
            <p className="text-2xl md:text-3xl text-slate-700 mb-8 leading-relaxed text-balance font-medium">
              {businessInfo.metadata.tagline || 'Magical donut holes through the hole in the wall'}
            </p>
          </div>

          <div className="animate-magical-entrance [animation-delay:0.6s]">
            <div className="text-xl text-slate-600 mb-12 max-w-4xl mx-auto leading-relaxed">
              <p className="mb-4">
                ✨ Step into a world where <span className="text-magical font-semibold">every bite</span> is an adventure! 
              </p>
              <p>
                Our handcrafted donut holes are made with premium ingredients, a dash of wonder, 
                and enough magic to transport you to flavor paradise.
              </p>
            </div>
          </div>

          {/* Magical CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16 animate-magical-entrance [animation-delay:0.9s]">
            <SparkleEffect trigger="hover" count={10} size="medium">
              <Link 
                href="/flavors" 
                className="btn-magical text-xl px-10 py-5 w-full sm:w-auto group"
              >
                <span className="relative z-10">🍩 Discover Magical Flavors</span>
              </Link>
            </SparkleEffect>
            
            {businessInfo.metadata.doordash_link && (
              <SparkleEffect trigger="hover" count={8} colors={['#ff6b6b', '#4ecdc4', '#45b7d1']}>
                <Link 
                  href={businessInfo.metadata.doordash_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline-magical w-full sm:w-auto group"
                >
                  <span className="btn-content text-xl px-9 py-4">
                    🚀 Order Magic Now
                  </span>
                </Link>
              </SparkleEffect>
            )}
          </div>

          {/* Magical Feature Icons */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-16 animate-magical-entrance [animation-delay:1.2s]">
            {[
              { icon: '🍩', title: 'Fresh Daily Magic', desc: 'Baked with love every morning' },
              { icon: '✨', title: 'Handcrafted Wonder', desc: 'Each hole perfectly shaped by hand' },
              { icon: '🕳️', title: 'Through the Wall', desc: 'Served fresh through our magical opening' }
            ].map((feature, index) => (
              <SparkleEffect 
                key={index}
                trigger="hover" 
                count={6} 
                size="small"
                className={`animate-magical-entrance`}
              >
                <div 
                  className="card-magical p-8 text-center group hover:glow-magical transition-all duration-500"
                  style={{ animationDelay: `${1.4 + index * 0.2}s` }}
                >
                  <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300 float">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-3">{feature.title}</h3>
                  <p className="text-slate-600">{feature.desc}</p>
                </div>
              </SparkleEffect>
            ))}
          </div>

          {/* Hours Display with Magical Styling */}
          {businessInfo.metadata.hours && (
            <div className="animate-magical-entrance [animation-delay:1.8s]">
              <div className="card-magical p-8 max-w-md mx-auto glow-blue">
                <h3 className="heading-sm-magical mb-6 text-magical">✨ Magical Hours ✨</h3>
                <div className="text-lg text-slate-700 whitespace-pre-line leading-relaxed">
                  {businessInfo.metadata.hours}
                </div>
                <div className="mt-4 text-sm text-slate-500 italic">
                  The magic never stops brewing! ✨
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Scroll Indicator with Magic */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <SparkleEffect trigger="always" count={3} size="small">
          <div className="animate-bounce-gentle">
            <div className="w-8 h-12 border-2 border-purple-400 rounded-full flex justify-center relative overflow-hidden">
              <div className="w-1.5 h-4 bg-gradient-to-b from-purple-500 to-blue-500 rounded-full mt-2 animate-bounce"></div>
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-200 to-transparent opacity-30 animate-pulse"></div>
            </div>
            <p className="text-sm text-slate-600 mt-2 font-medium">Scroll for Magic</p>
          </div>
        </SparkleEffect>
      </div>
    </section>
  )
}