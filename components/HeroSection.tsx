import Link from 'next/link'
import { BusinessInfo } from '@/types'

interface HeroSectionProps {
  businessInfo: BusinessInfo;
}

export default function HeroSection({ businessInfo }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen bg-gradient-warm flex items-center">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23cd2c2c' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto container-padding text-center">
        <div className="max-w-4xl mx-auto">
          {/* Main Hero Content */}
          <h1 className="heading-xl mb-6 animate-fade-in-up text-balance">
            Welcome to the{' '}
            <span className="text-burgundy-600">Magic</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-burgundy-600 mb-8 leading-relaxed animate-fade-in-up [animation-delay:0.2s] text-balance">
            {businessInfo.metadata.tagline || 'Magical donut holes through the hole in the wall'}
          </p>

          <div className="text-lg text-burgundy-500 mb-12 max-w-3xl mx-auto animate-fade-in-up [animation-delay:0.4s]">
            <p className="leading-relaxed">
              Step up to our wall and discover handcrafted donut holes made fresh daily with premium ingredients. 
              Each bite-sized treasure tells a story of quality, craftsmanship, and a little bit of magic.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up [animation-delay:0.6s]">
            <Link 
              href="/flavors" 
              className="btn-primary text-lg px-8 py-4 w-full sm:w-auto"
            >
              Discover Our Flavors
            </Link>
            
            {businessInfo.metadata.doordash_link && (
              <Link 
                href={businessInfo.metadata.doordash_link}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline text-lg px-8 py-4 w-full sm:w-auto"
              >
                Order Through DoorDash
              </Link>
            )}
          </div>

          {/* Magic Elements */}
          <div className="mt-16 flex justify-center space-x-8 animate-fade-in-up [animation-delay:0.8s]">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto bg-white rounded-full flex items-center justify-center shadow-soft mb-3">
                <span className="text-2xl">🍩</span>
              </div>
              <p className="text-sm font-medium text-burgundy-600">Fresh Daily</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 mx-auto bg-white rounded-full flex items-center justify-center shadow-soft mb-3">
                <span className="text-2xl">✨</span>
              </div>
              <p className="text-sm font-medium text-burgundy-600">Handcrafted</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 mx-auto bg-white rounded-full flex items-center justify-center shadow-soft mb-3">
                <span className="text-2xl">🕳️</span>
              </div>
              <p className="text-sm font-medium text-burgundy-600">Through the Wall</p>
            </div>
          </div>

          {/* Hours Display */}
          {businessInfo.metadata.hours && (
            <div className="mt-12 p-6 bg-white/80 backdrop-blur-sm rounded-xl shadow-soft max-w-md mx-auto animate-fade-in-up [animation-delay:1s]">
              <h3 className="font-semibold text-burgundy-800 mb-3">Hours</h3>
              <div className="text-sm text-burgundy-600 whitespace-pre-line">
                {businessInfo.metadata.hours}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce-gentle">
        <div className="w-6 h-10 border-2 border-burgundy-300 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-burgundy-300 rounded-full mt-2"></div>
        </div>
      </div>
    </section>
  )
}