import { getAllBlogPosts, getBusinessInfo } from '@/lib/cosmic'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import BlogCard from '@/components/BlogCard'
import CategoryFilter from '@/components/CategoryFilter'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Stories from behind the scenes, new flavor announcements, baking tips, and more from Hole in the Wall.',
}

export default async function BlogPage() {
  const [blogPosts, businessInfo] = await Promise.all([
    getAllBlogPosts(),
    getBusinessInfo()
  ]);

  if (!businessInfo) {
    return <div className="flex items-center justify-center min-h-screen">
      <p className="text-lg text-burgundy-600">Loading...</p>
    </div>;
  }

  // Sort posts by creation date (newest first)
  const sortedPosts = blogPosts.sort((a, b) => 
    new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );

  return (
    <>
      <Navigation businessInfo={businessInfo} />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-warm section-padding">
          <div className="max-w-7xl mx-auto container-padding text-center">
            <h1 className="heading-xl mb-6">Behind the Wall</h1>
            <p className="text-xl text-burgundy-600 max-w-3xl mx-auto leading-relaxed">
              Stories from our kitchen, new flavor adventures, baking secrets, and the magical 
              moments that make Hole in the Wall special. Step into our world!
            </p>
          </div>
        </section>

        {/* Category Filter */}
        {blogPosts.length > 0 && (
          <section className="py-8 bg-white border-b border-cream-200">
            <div className="max-w-7xl mx-auto container-padding">
              <CategoryFilter posts={blogPosts} />
            </div>
          </section>
        )}

        {/* Blog Posts Grid */}
        <section className="section-padding bg-cream-50">
          <div className="max-w-7xl mx-auto container-padding">
            {sortedPosts.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-xl text-burgundy-500">No blog posts available yet.</p>
                <p className="text-burgundy-400 mt-2">Check back soon for stories from behind the wall!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" id="blog-grid">
                {sortedPosts.map((post) => (
                  <BlogCard 
                    key={post.id} 
                    post={post} 
                    showCategory={true}
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