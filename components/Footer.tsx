import { BusinessInfo } from '@/types'

interface FooterProps {
  businessInfo: BusinessInfo;
}

export default function Footer({ businessInfo }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-burgundy-900 text-white">
      <div className="max-w-7xl mx-auto container-padding py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="col-span-1">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <span className="text-burgundy-800 font-bold text-lg">🕳️</span>
              </div>
              <div>
                <h3 className="text-xl font-bold">{businessInfo.metadata.business_name}</h3>
                {businessInfo.metadata.tagline && (
                  <p className="text-sm text-burgundy-200">{businessInfo.metadata.tagline}</p>
                )}
              </div>
            </div>
            <p className="text-burgundy-200 text-sm leading-relaxed">
              Handcrafted donut holes made fresh daily with premium ingredients and lots of love.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/flavors" className="text-burgundy-200 hover:text-white transition-colors">
                  Our Flavors
                </a>
              </li>
              <li>
                <a href="/blog" className="text-burgundy-200 hover:text-white transition-colors">
                  Blog
                </a>
              </li>
              {businessInfo.metadata.doordash_link && (
                <li>
                  <a 
                    href={businessInfo.metadata.doordash_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-burgundy-200 hover:text-white transition-colors"
                  >
                    Order on DoorDash
                  </a>
                </li>
              )}
            </ul>
          </div>

          {/* Contact & Social */}
          <div className="col-span-1">
            <h4 className="text-lg font-semibold mb-4">Connect With Us</h4>
            <div className="space-y-2 text-sm text-burgundy-200 mb-4">
              {businessInfo.metadata.phone && (
                <p>📞 {businessInfo.metadata.phone}</p>
              )}
              {businessInfo.metadata.email && (
                <p>✉️ {businessInfo.metadata.email}</p>
              )}
            </div>
            
            {/* Social Media */}
            {businessInfo.metadata.social_media && (
              <div className="space-y-1">
                {businessInfo.metadata.social_media.tiktok && (
                  <a
                    href={`https://tiktok.com/${businessInfo.metadata.social_media.tiktok}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-burgundy-200 hover:text-white transition-colors text-sm"
                  >
                    TikTok: {businessInfo.metadata.social_media.tiktok}
                  </a>
                )}
                
                {businessInfo.metadata.social_media.instagram && (
                  <a
                    href={`https://instagram.com/${businessInfo.metadata.social_media.instagram}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-burgundy-200 hover:text-white transition-colors text-sm"
                  >
                    Instagram: {businessInfo.metadata.social_media.instagram}
                  </a>
                )}
                
                {businessInfo.metadata.social_media.facebook && (
                  <a
                    href={`https://facebook.com/${businessInfo.metadata.social_media.facebook}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-burgundy-200 hover:text-white transition-colors text-sm"
                  >
                    Facebook: {businessInfo.metadata.social_media.facebook}
                  </a>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-burgundy-800 pt-8 mt-8 text-center text-sm text-burgundy-300">
          <p>&copy; {currentYear} {businessInfo.metadata.business_name}. All rights reserved.</p>
          <p className="mt-1">Built with ❤️ and a touch of magic</p>
        </div>
      </div>
    </footer>
  )
}