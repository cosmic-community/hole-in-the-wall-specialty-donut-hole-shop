import Link from 'next/link'
import { DonutFlavor } from '@/types'

interface FlavorCardProps {
  flavor: DonutFlavor;
  showPricing?: boolean;
  className?: string;
}

export default function FlavorCard({ flavor, showPricing = false, className = '' }: FlavorCardProps) {
  const isAvailable = flavor.metadata.available;
  const isFeatured = flavor.metadata.featured;
  const availability = flavor.metadata.availability;
  const pricing = flavor.metadata.pricing;

  return (
    <Link href={`/flavors/${flavor.slug}`} className={`block ${className}`}>
      <div className={`card transition-all duration-300 h-full ${isAvailable ? 'hover:shadow-warm hover:scale-105' : 'opacity-75'}`}>
        {/* Featured Badge */}
        {isFeatured && (
          <div className="absolute top-4 right-4 z-10">
            <span className="bg-burgundy-600 text-white text-xs font-semibold px-2 py-1 rounded-full">
              Featured
            </span>
          </div>
        )}

        {/* Flavor Image */}
        <div className="relative aspect-square overflow-hidden">
          {flavor.metadata.flavor_image ? (
            <img
              src={`${flavor.metadata.flavor_image.imgix_url}?w=800&h=800&fit=crop&auto=format,compress`}
              alt={flavor.metadata.flavor_name}
              className="w-full h-full object-cover"
              width="400"
              height="400"
            />
          ) : (
            <div className="w-full h-full bg-cream-200 flex items-center justify-center">
              <span className="text-6xl">🍩</span>
            </div>
          )}
          
          {/* Availability Overlay */}
          {!isAvailable && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <span className="text-white font-semibold text-lg">Currently Unavailable</span>
            </div>
          )}
        </div>

        {/* Card Content */}
        <div className="p-6">
          <div className="flex items-start justify-between mb-3">
            <h3 className="heading-sm text-burgundy-800 line-clamp-2">
              {flavor.metadata.flavor_name}
            </h3>
            
            {availability && (
              <span className={`text-xs font-medium px-2 py-1 rounded-full ml-2 ${
                availability.key === 'year-round' 
                  ? 'bg-green-100 text-green-800'
                  : availability.key.startsWith('seasonal')
                    ? 'bg-orange-100 text-orange-800'
                    : 'bg-purple-100 text-purple-800'
              }`}>
                {availability.value}
              </span>
            )}
          </div>

          {/* Description */}
          {flavor.metadata.description && (
            <div 
              className="text-burgundy-600 mb-4 line-clamp-3"
              dangerouslySetInnerHTML={{ __html: flavor.metadata.description }}
            />
          )}

          {/* Pricing */}
          {showPricing && pricing && isAvailable && (
            <div className="border-t border-cream-200 pt-4">
              <div className="grid grid-cols-2 gap-2 text-sm">
                {pricing.nibble && (
                  <div className="text-center p-2 bg-cream-50 rounded">
                    <p className="font-semibold text-burgundy-800">Nibble</p>
                    <p className="text-xs text-burgundy-600">{pricing.nibble.count} holes</p>
                    <p className="font-bold text-burgundy-700">${pricing.nibble.price}</p>
                  </div>
                )}
                {pricing.munch && (
                  <div className="text-center p-2 bg-cream-50 rounded">
                    <p className="font-semibold text-burgundy-800">Munch</p>
                    <p className="text-xs text-burgundy-600">{pricing.munch.count} holes</p>
                    <p className="font-bold text-burgundy-700">${pricing.munch.price}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* View Details */}
          <div className="mt-4 pt-4 border-t border-cream-200">
            <span className="text-burgundy-600 font-medium text-sm hover:text-burgundy-800 transition-colors">
              View Details →
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}