import { BusinessInfo } from '@/types'

interface AboutSectionProps {
  businessInfo: BusinessInfo;
}

export default function AboutSection({ businessInfo }: AboutSectionProps) {
  return (
    <section className="section-padding bg-cream-50">
      <div className="max-w-7xl mx-auto container-padding">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="heading-lg mb-8">About {businessInfo.metadata.business_name}</h2>
          
          {businessInfo.metadata.about_us && (
            <div 
              className="text-lg text-burgundy-600 leading-relaxed prose prose-burgundy prose-lg max-w-none mb-8"
              dangerouslySetInnerHTML={{ __html: businessInfo.metadata.about_us }}
            />
          )}

          {/* Social Media Links */}
          {businessInfo.metadata.social_media && (
            <div className="flex justify-center items-center space-x-6 mt-12">
              <p className="text-burgundy-600 font-medium">Follow Our Journey:</p>
              
              {businessInfo.metadata.social_media.tiktok && (
                <a
                  href={`https://tiktok.com/${businessInfo.metadata.social_media.tiktok}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-burgundy-600 hover:text-burgundy-800 font-medium transition-colors"
                >
                  TikTok {businessInfo.metadata.social_media.tiktok}
                </a>
              )}
              
              {businessInfo.metadata.social_media.instagram && (
                <a
                  href={`https://instagram.com/${businessInfo.metadata.social_media.instagram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-burgundy-600 hover:text-burgundy-800 font-medium transition-colors"
                >
                  Instagram {businessInfo.metadata.social_media.instagram}
                </a>
              )}
              
              {businessInfo.metadata.social_media.facebook && (
                <a
                  href={`https://facebook.com/${businessInfo.metadata.social_media.facebook}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-burgundy-600 hover:text-burgundy-800 font-medium transition-colors"
                >
                  Facebook
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}