import { getAllFlavors, getBusinessInfo } from '@/lib/cosmic'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import FlavorCard from '@/components/FlavorCard'
import FlavorFilter from '@/components/FlavorFilter'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Our Flavors',
  description: 'Discover our delicious selection of handcrafted donut hole flavors, from year-round favorites to seasonal specialties.',
}

export default async function FlavorsPage() {
  const [allFlavors, businessInfo] = await Promise.all([
    getAllFlavors(),
    getBusinessInfo()
  ]);

  if (!businessInfo) {
    return <div className="flex items-center justify-center min-h-screen">
      <p className="text-lg text-burgundy-600">Loading...</p>
    </div>;
  }

  return (
    <>
      <Navigation businessInfo={businessInfo} />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-warm section-padding">
          <div className="max-w-7xl mx-auto container-padding text-center">
            <h1 className="heading-xl mb-6">Our Magical Flavors</h1>
            <p className="text-xl text-burgundy-600 max-w-3xl mx-auto leading-relaxed">
              Every donut hole is a little piece of magic, crafted with premium ingredients 
              and lots of love. From classic favorites to seasonal surprises, discover your 
              perfect bite-sized treasure.
            </p>
          </div>
        </section>

        {/* Filters Section */}
        <section className="py-8 bg-white border-b border-cream-200">
          <div className="max-w-7xl mx-auto container-padding">
            <FlavorFilter flavors={allFlavors} />
          </div>
        </section>

        {/* Flavors Grid */}
        <section className="section-padding bg-cream-50">
          <div className="max-w-7xl mx-auto container-padding">
            {allFlavors.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-xl text-burgundy-500">No flavors available at the moment.</p>
                <p className="text-burgundy-400 mt-2">Check back soon for new magical creations!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" id="flavors-grid">
                {allFlavors.map((flavor) => (
                  <FlavorCard 
                    key={flavor.id} 
                    flavor={flavor} 
                    showPricing={true}
                    className="animate-fade-in-up"
                  />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer businessInfo={businessInfo} />
    </>
  )
}