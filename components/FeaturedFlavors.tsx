import Link from 'next/link'
import { DonutFlavor } from '@/types'
import FlavorCard from './FlavorCard'

interface FeaturedFlavorsProps {
  flavors: DonutFlavor[];
}

export default function FeaturedFlavors({ flavors }: FeaturedFlavorsProps) {
  if (flavors.length === 0) {
    return null;
  }

  return (
    <section className="section-padding bg-white">
      <div className="max-w-7xl mx-auto container-padding">
        <div className="text-center mb-16">
          <h2 className="heading-lg mb-6">Featured Magical Flavors</h2>
          <p className="text-xl text-burgundy-600 max-w-3xl mx-auto leading-relaxed">
            Our signature donut holes that capture hearts and taste buds. Each one is a perfect 
            bite-sized adventure waiting to be discovered through our hole in the wall.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {flavors.map((flavor, index) => (
            <div 
              key={flavor.id}
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <FlavorCard flavor={flavor} showPricing={true} className="card-hover" />
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link href="/flavors" className="btn-outline text-lg px-8 py-4 inline-block">
            Explore All Flavors
          </Link>
        </div>
      </div>
    </section>
  )
}