import Link from 'next/link'
import { DonutFlavor } from '@/types'
import FlavorCard from './FlavorCard'
import MagicalEffects from './MagicalEffects'
import SparkleEffect from './SparkleEffect'

interface FeaturedFlavorsProps {
  flavors: DonutFlavor[];
}

export default function FeaturedFlavors({ flavors }: FeaturedFlavorsProps) {
  if (flavors.length === 0) {
    return null;
  }

  return (
    <section className="section-magical bg-gradient-to-br from-white via-purple-50 to-blue-50 relative">
      {/* Background Magic Effects */}
      <MagicalEffects variant="aurora" intensity="low" colors={['#667eea', '#f093fb', '#4facfe']} />
      
      <div className="max-w-7xl mx-auto container-magical">
        <div className="text-center mb-20">
          <SparkleEffect trigger="always" count={12} size="medium">
            <h2 className="heading-lg-magical mb-8">
              ✨ Featured Magical Flavors ✨
            </h2>
          </SparkleEffect>
          
          <div className="max-w-4xl mx-auto">
            <p className="text-2xl text-slate-600 leading-relaxed mb-6">
              Our <span className="text-magical font-semibold">signature donut holes</span> that capture hearts and taste buds
            </p>
            <p className="text-xl text-slate-500">
              Each one is a perfect bite-sized adventure waiting to be discovered through our magical wall 🕳️
            </p>
          </div>
        </div>

        {/* Featured Flavors Grid with Staggered Animation */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-16">
          {flavors.map((flavor, index) => (
            <div 
              key={flavor.id}
              className={`animate-magical-entrance animate-stagger-${Math.min(index + 1, 5)}`}
            >
              <SparkleEffect 
                trigger="hover" 
                count={8} 
                colors={['#9333ea', '#3b82f6', '#ec4899', '#10b981']}
                size="medium"
              >
                <div className="card-magical transition-all duration-500 hover:glow-magical hover:scale-105 group">
                  <FlavorCard 
                    flavor={flavor} 
                    showPricing={true} 
                    className="h-full border-0 shadow-none bg-transparent hover:shadow-none" 
                  />
                  
                  {/* Magical Overlay on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-500/10 via-transparent to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl pointer-events-none"></div>
                </div>
              </SparkleEffect>
            </div>
          ))}
        </div>

        {/* Magical CTA */}
        <div className="text-center">
          <SparkleEffect trigger="hover" count={15} size="large">
            <Link 
              href="/flavors" 
              className="btn-magical text-xl px-12 py-5 inline-block group"
            >
              <span className="flex items-center gap-3">
                🌟 Explore All Magical Flavors 🌟
                <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
              </span>
            </Link>
          </SparkleEffect>
          
          <p className="mt-6 text-slate-500 text-lg">
            Over 10 enchanting flavors await your discovery!
          </p>
        </div>
      </div>

      {/* Bottom Sparkle Effect */}
      <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none">
        <MagicalEffects variant="sparkles" intensity="low" />
      </div>
    </section>
  )
}