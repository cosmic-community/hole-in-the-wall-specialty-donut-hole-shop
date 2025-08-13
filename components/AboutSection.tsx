import { BusinessInfo } from '@/types'
import MagicalEffects from './MagicalEffects'
import SparkleEffect from './SparkleEffect'
import FloatingElements from './FloatingElements'

interface AboutSectionProps {
  businessInfo: BusinessInfo;
}

export default function AboutSection({ businessInfo }: AboutSectionProps) {
  return (
    <section className="section-magical bg-gradient-to-br from-slate-50 via-purple-50 to-blue-50 relative overflow-hidden">
      {/* Background Magic Effects */}
      <MagicalEffects variant="constellation" intensity="low" />
      <FloatingElements
        elements={[
          { emoji: '✨', size: 16, speed: 0.8 },
          { emoji: '🌟', size: 20, speed: 0.6 },
          { emoji: '💫', size: 18, speed: 1.2 }
        ]}
        count={6}
        speed="slow"
        direction="random"
      />
      
      <div className="max-w-6xl mx-auto container-magical">
        <div className="text-center">
          {/* Magical Header */}
          <SparkleEffect trigger="always" count={10} size="large">
            <h2 className="heading-lg-magical mb-12">
              ✨ About {businessInfo.metadata.business_name} ✨
            </h2>
          </SparkleEffect>
          
          {/* Main Content with Magic */}
          {businessInfo.metadata.about_us && (
            <div className="relative">
              <SparkleEffect trigger="hover" count={8} colors={['#9333ea', '#3b82f6', '#ec4899']}>
                <div className="card-magical p-12 max-w-4xl mx-auto mb-16 relative overflow-hidden group">
                  {/* Magical background pattern */}
                  <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
                    <div className="absolute inset-0" style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239333ea' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    }} />
                  </div>
                  
                  <div 
                    className="text-2xl text-slate-700 leading-relaxed prose prose-slate prose-2xl max-w-none relative z-10"
                    dangerouslySetInnerHTML={{ __html: businessInfo.metadata.about_us }}
                  />
                  
                  {/* Magical accent */}
                  <div className="absolute top-6 right-6 text-4xl animate-float opacity-20 group-hover:opacity-40 transition-opacity duration-500">
                    🍩
                  </div>
                </div>
              </SparkleEffect>
            </div>
          )}

          {/* Magical Story Elements */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {[
              {
                icon: '🏰',
                title: 'Our Magical Origin',
                description: 'Born from a dream to bring wonder and joy to every bite, our hole-in-the-wall concept creates an experience like no other.'
              },
              {
                icon: '👨‍🍳',
                title: 'Master Bakers',
                description: 'Our skilled artisans craft each donut hole with precision, love, and a sprinkle of magic that you can taste.'
              },
              {
                icon: '🌈',
                title: 'Endless Wonder',
                description: 'From classic favorites to seasonal surprises, we\'re constantly creating new magical flavors to delight your senses.'
              }
            ].map((item, index) => (
              <div 
                key={index}
                className={`animate-magical-entrance animate-stagger-${index + 1}`}
              >
                <SparkleEffect trigger="hover" count={6} size="small">
                  <div className="card-magical p-8 text-center hover:glow-purple transition-all duration-500 group">
                    <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300 float">
                      {item.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-slate-800 mb-4 group-hover:text-magical transition-colors duration-300">
                      {item.title}
                    </h3>
                    <p className="text-lg text-slate-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </SparkleEffect>
              </div>
            ))}
          </div>

          {/* Social Media with Magic */}
          {businessInfo.metadata.social_media && (
            <div className="card-magical p-10 max-w-2xl mx-auto">
              <SparkleEffect trigger="always" count={8} size="small">
                <h3 className="text-3xl font-bold text-slate-800 mb-8">
                  ✨ Follow Our Magical Journey ✨
                </h3>
              </SparkleEffect>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                {businessInfo.metadata.social_media.tiktok && (
                  <SparkleEffect trigger="hover" count={5} colors={['#ff0050', '#00f2ea']}>
                    <a
                      href={`https://tiktok.com/${businessInfo.metadata.social_media.tiktok}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-secondary-magical text-lg px-8 py-4 flex items-center gap-3 group"
                    >
                      <span className="text-2xl">📱</span>
                      <span>TikTok {businessInfo.metadata.social_media.tiktok}</span>
                      <span className="group-hover:rotate-12 transition-transform duration-300">✨</span>
                    </a>
                  </SparkleEffect>
                )}
                
                {businessInfo.metadata.social_media.instagram && (
                  <SparkleEffect trigger="hover" count={5} colors={['#e4405f', '#833ab4', '#f77737']}>
                    <a
                      href={`https://instagram.com/${businessInfo.metadata.social_media.instagram}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-secondary-magical text-lg px-8 py-4 flex items-center gap-3 group"
                    >
                      <span className="text-2xl">📸</span>
                      <span>Instagram {businessInfo.metadata.social_media.instagram}</span>
                      <span className="group-hover:rotate-12 transition-transform duration-300">✨</span>
                    </a>
                  </SparkleEffect>
                )}
                
                {businessInfo.metadata.social_media.facebook && (
                  <SparkleEffect trigger="hover" count={5} colors={['#1877f2', '#42a5f5']}>
                    <a
                      href={`https://facebook.com/${businessInfo.metadata.social_media.facebook}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-secondary-magical text-lg px-8 py-4 flex items-center gap-3 group"
                    >
                      <span className="text-2xl">📘</span>
                      <span>Facebook</span>
                      <span className="group-hover:rotate-12 transition-transform duration-300">✨</span>
                    </a>
                  </SparkleEffect>
                )}
              </div>
              
              <p className="mt-6 text-slate-500 text-lg italic">
                Watch the magic happen behind the scenes! 🎬✨
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}