import { getFeaturedFlavors, getFeaturedBlogPosts, getBusinessInfo } from '@/lib/cosmic'
import HeroSection from '@/components/HeroSection'
import FeaturedFlavors from '@/components/FeaturedFlavors'
import AboutSection from '@/components/AboutSection'
import BlogPreview from '@/components/BlogPreview'
import ContactSection from '@/components/ContactSection'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export default async function HomePage() {
  // Fetch all data in parallel for better performance
  const [featuredFlavors, featuredPosts, businessInfo] = await Promise.all([
    getFeaturedFlavors(),
    getFeaturedBlogPosts(),
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
        <HeroSection businessInfo={businessInfo} />
        
        <FeaturedFlavors flavors={featuredFlavors} />
        
        <AboutSection businessInfo={businessInfo} />
        
        {featuredPosts.length > 0 && (
          <BlogPreview posts={featuredPosts} />
        )}
        
        <ContactSection businessInfo={businessInfo} />
      </main>

      <Footer businessInfo={businessInfo} />
    </>
  )
}