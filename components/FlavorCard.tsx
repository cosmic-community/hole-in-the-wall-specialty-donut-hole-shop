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
      <div className={`card-magical transition-all duration-500 h-full relative group ${isAvailable ? 'hover:glow-magical hover:scale-105' : 'opacity-75'}`}>
        {/* Magical Featured Badge */}
        {isFeatured && (
          <div className="absolute top-6 right-6 z-10">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-bold px-3 py-2 rounded-full shadow-lg animate-glow">
              ✨ Featured ✨
            </div>
          </div>
        )}

        {/* Magical Flavor Image */}
        <div className="relative aspect-square overflow-hidden rounded-t-3xl">
          {flavor.metadata.flavor_image ? (
            <div className="relative">
              <img
                src={`${flavor.metadata.flavor_image.imgix_url}?w=800&h=800&fit=crop&auto=format,compress`}
                alt={flavor.metadata.flavor_name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                width="400"
                height="400"
              />
              
              {/* Magical Image Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* Sparkle Overlay on Hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-2 h-2 bg-white rounded-full animate-sparkle"
                    style={{
                      left: `${Math.random() * 80 + 10}%`,
                      top: `${Math.random() * 80 + 10}%`,
                      animationDelay: `${i * 0.3}s`
                    }}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center">
              <span className="text-8xl animate-float">🍩</span>
            </div>
          )}
          
          {/* Magical Availability Overlay */}
          {!isAvailable && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-t-3xl">
              <div className="text-center text-white">
                <div className="text-4xl mb-2">😴</div>
                <span className="font-semibold text-lg">Resting Magically</span>
                <p className="text-sm opacity-80">Will return soon!</p>
              </div>
            </div>
          )}
        </div>

        {/* Magical Card Content */}
        <div className="p-8">
          <div className="flex items-start justify-between mb-4">
            <h3 className="text-2xl font-bold text-slate-800 line-clamp-2 group-hover:text-magical transition-colors duration-300">
              {flavor.metadata.flavor_name}
            </h3>
            
            {availability && (
              <span className={`text-xs font-bold px-3 py-2 rounded-full ml-3 whitespace-nowrap ${
                availability.key === 'year-round' 
                  ? 'bg-gradient-to-r from-green-400 to-green-600 text-white'
                  : availability.key.startsWith('seasonal')
                    ? 'bg-gradient-to-r from-orange-400 to-orange-600 text-white'
                    : 'bg-gradient-to-r from-purple-400 to-purple-600 text-white'
              }`}>
                {availability.value}
              </span>
            )}
          </div>

          {/* Magical Description */}
          {flavor.metadata.description && (
            <div 
              className="text-slate-600 mb-6 line-clamp-3 leading-relaxed text-lg"
              dangerouslySetInnerHTML={{ __html: flavor.metadata.description }}
            />
          )}

          {/* Magical Pricing */}
          {showPricing && pricing && isAvailable && (
            <div className="border-t border-gradient pt-6 mb-6">
              <h4 className="text-lg font-semibold text-slate-700 mb-4 text-center">
                ✨ Magical Portions ✨
              </h4>
              <div className="grid grid-cols-2 gap-3">
                {pricing.nibble && (
                  <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl border border-purple-200 hover:shadow-lg transition-all duration-300">
                    <p className="font-bold text-slate-800 text-lg">Nibble</p>
                    <p className="text-sm text-slate-500">{pricing.nibble.count} magical bites</p>
                    <p className="font-bold text-purple-600 text-xl">${pricing.nibble.price}</p>
                  </div>
                )}
                {pricing.munch && (
                  <div className="text-center p-4 bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl border border-pink-200 hover:shadow-lg transition-all duration-300">
                    <p className="font-bold text-slate-800 text-lg">Munch</p>
                    <p className="text-sm text-slate-500">{pricing.munch.count} magical bites</p>
                    <p className="font-bold text-pink-600 text-xl">${pricing.munch.price}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Magical View Details */}
          <div className="pt-4 border-t border-slate-100">
            <div className="flex items-center justify-center text-magical font-semibold text-lg group-hover:text-purple-700 transition-colors duration-300">
              <span>Discover the Magic</span>
              <span className="ml-2 group-hover:translate-x-1 transition-transform duration-300">✨</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}