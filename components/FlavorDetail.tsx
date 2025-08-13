import Link from 'next/link'
import { DonutFlavor, BusinessInfo } from '@/types'

interface FlavorDetailProps {
  flavor: DonutFlavor;
  businessInfo: BusinessInfo;
}

export default function FlavorDetail({ flavor, businessInfo }: FlavorDetailProps) {
  const isAvailable = flavor.metadata.available;
  const isFeatured = flavor.metadata.featured;
  const availability = flavor.metadata.availability;
  const pricing = flavor.metadata.pricing;

  return (
    <div className="min-h-screen bg-cream-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-cream-200 py-4">
        <div className="max-w-7xl mx-auto container-padding">
          <nav className="text-sm">
            <Link href="/" className="text-burgundy-600 hover:text-burgundy-800">Home</Link>
            <span className="mx-2 text-burgundy-400">/</span>
            <Link href="/flavors" className="text-burgundy-600 hover:text-burgundy-800">Flavors</Link>
            <span className="mx-2 text-burgundy-400">/</span>
            <span className="text-burgundy-400">{flavor.metadata.flavor_name}</span>
          </nav>
        </div>
      </div>

      {/* Flavor Detail Content */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto container-padding">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Flavor Image */}
            <div className="relative">
              {isFeatured && (
                <div className="absolute top-4 right-4 z-10">
                  <span className="bg-burgundy-600 text-white text-sm font-semibold px-3 py-1 rounded-full">
                    Featured
                  </span>
                </div>
              )}
              
              <div className="aspect-square overflow-hidden rounded-xl shadow-soft">
                {flavor.metadata.flavor_image ? (
                  <img
                    src={`${flavor.metadata.flavor_image.imgix_url}?w=1200&h=1200&fit=crop&auto=format,compress`}
                    alt={flavor.metadata.flavor_name}
                    className="w-full h-full object-cover"
                    width="600"
                    height="600"
                  />
                ) : (
                  <div className="w-full h-full bg-cream-200 flex items-center justify-center">
                    <span className="text-8xl">🍩</span>
                  </div>
                )}
                
                {!isAvailable && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <span className="text-white font-semibold text-xl">Currently Unavailable</span>
                  </div>
                )}
              </div>
            </div>

            {/* Flavor Information */}
            <div className="space-y-8">
              {/* Header */}
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <h1 className="heading-lg">{flavor.metadata.flavor_name}</h1>
                  {availability && (
                    <span className={`text-sm font-medium px-3 py-1 rounded-full ${
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

                {flavor.metadata.description && (
                  <div 
                    className="text-lg text-burgundy-600 leading-relaxed prose prose-burgundy max-w-none"
                    dangerouslySetInnerHTML={{ __html: flavor.metadata.description }}
                  />
                )}
              </div>

              {/* Ingredients & Allergens */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {flavor.metadata.ingredients && (
                  <div>
                    <h3 className="heading-sm mb-3">Ingredients</h3>
                    <p className="text-burgundy-600">{flavor.metadata.ingredients}</p>
                  </div>
                )}

                {flavor.metadata.allergen_info && (
                  <div>
                    <h3 className="heading-sm mb-3">Allergen Information</h3>
                    <p className="text-burgundy-600 whitespace-pre-line">{flavor.metadata.allergen_info}</p>
                  </div>
                )}
              </div>

              {/* Pricing */}
              {pricing && isAvailable && (
                <div>
                  <h3 className="heading-sm mb-4">Pricing</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {pricing.nibble && (
                      <div className="text-center p-4 bg-white rounded-lg shadow-soft">
                        <p className="font-semibold text-burgundy-800 mb-1">Nibble</p>
                        <p className="text-sm text-burgundy-600 mb-2">{pricing.nibble.count} holes</p>
                        <p className="text-xl font-bold text-burgundy-700">${pricing.nibble.price}</p>
                      </div>
                    )}
                    {pricing.munch && (
                      <div className="text-center p-4 bg-white rounded-lg shadow-soft">
                        <p className="font-semibold text-burgundy-800 mb-1">Munch</p>
                        <p className="text-sm text-burgundy-600 mb-2">{pricing.munch.count} holes</p>
                        <p className="text-xl font-bold text-burgundy-700">${pricing.munch.price}</p>
                      </div>
                    )}
                    {pricing.feast && (
                      <div className="text-center p-4 bg-white rounded-lg shadow-soft">
                        <p className="font-semibold text-burgundy-800 mb-1">Feast</p>
                        <p className="text-sm text-burgundy-600 mb-2">{pricing.feast.count} holes</p>
                        <p className="text-xl font-bold text-burgundy-700">${pricing.feast.price}</p>
                      </div>
                    )}
                    {pricing.party_pack && (
                      <div className="text-center p-4 bg-white rounded-lg shadow-soft">
                        <p className="font-semibold text-burgundy-800 mb-1">Party Pack</p>
                        <p className="text-sm text-burgundy-600 mb-2">{pricing.party_pack.count} holes</p>
                        <p className="text-xl font-bold text-burgundy-700">${pricing.party_pack.price}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Order Button */}
              {isAvailable && businessInfo.metadata.doordash_link && (
                <div>
                  <Link
                    href={businessInfo.metadata.doordash_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary text-lg px-8 py-4 inline-block"
                  >
                    Order on DoorDash
                  </Link>
                </div>
              )}

              {/* Back to Flavors */}
              <div className="pt-6 border-t border-cream-200">
                <Link href="/flavors" className="text-burgundy-600 hover:text-burgundy-800 font-medium">
                  ← Back to All Flavors
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}