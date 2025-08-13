import { BusinessInfo } from '@/types'

interface ContactSectionProps {
  businessInfo: BusinessInfo;
}

export default function ContactSection({ businessInfo }: ContactSectionProps) {
  return (
    <section className="section-padding bg-burgundy-800 text-white">
      <div className="max-w-7xl mx-auto container-padding">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Find the Magic</h2>
          <p className="text-xl text-burgundy-100 max-w-3xl mx-auto leading-relaxed">
            Step up to our hole in the wall and discover your new favorite donut holes. 
            We're always here to serve you something magical!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Location */}
          {businessInfo.metadata.address && (
            <div className="text-center">
              <div className="w-16 h-16 mx-auto bg-burgundy-600 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl">📍</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Visit Us</h3>
              <p className="text-burgundy-100 whitespace-pre-line">
                {businessInfo.metadata.address}
              </p>
            </div>
          )}

          {/* Hours */}
          {businessInfo.metadata.hours && (
            <div className="text-center">
              <div className="w-16 h-16 mx-auto bg-burgundy-600 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl">🕒</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Hours</h3>
              <p className="text-burgundy-100 whitespace-pre-line">
                {businessInfo.metadata.hours}
              </p>
            </div>
          )}

          {/* Contact */}
          <div className="text-center">
            <div className="w-16 h-16 mx-auto bg-burgundy-600 rounded-full flex items-center justify-center mb-4">
              <span className="text-2xl">📞</span>
            </div>
            <h3 className="text-xl font-semibold mb-3">Get in Touch</h3>
            <div className="space-y-2 text-burgundy-100">
              {businessInfo.metadata.phone && (
                <p>
                  <a 
                    href={`tel:${businessInfo.metadata.phone}`}
                    className="hover:text-white transition-colors"
                  >
                    {businessInfo.metadata.phone}
                  </a>
                </p>
              )}
              {businessInfo.metadata.email && (
                <p>
                  <a 
                    href={`mailto:${businessInfo.metadata.email}`}
                    className="hover:text-white transition-colors"
                  >
                    {businessInfo.metadata.email}
                  </a>
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Order CTA */}
        {businessInfo.metadata.doordash_link && (
          <div className="text-center mt-16">
            <a
              href={businessInfo.metadata.doordash_link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-white text-burgundy-800 font-semibold px-8 py-4 rounded-lg hover:bg-cream-50 transition-colors text-lg"
            >
              Order Now on DoorDash
            </a>
          </div>
        )}
      </div>
    </section>
  )
}