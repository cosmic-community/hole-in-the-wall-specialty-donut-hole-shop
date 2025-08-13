import Link from 'next/link'
import { BlogPost } from '@/types'
import BlogCard from './BlogCard'

interface BlogPreviewProps {
  posts: BlogPost[];
}

export default function BlogPreview({ posts }: BlogPreviewProps) {
  if (posts.length === 0) {
    return null;
  }

  return (
    <section className="section-padding bg-white">
      <div className="max-w-7xl mx-auto container-padding">
        <div className="text-center mb-16">
          <h2 className="heading-lg mb-6">Stories from Behind the Wall</h2>
          <p className="text-xl text-burgundy-600 max-w-3xl mx-auto leading-relaxed">
            Discover the magic that happens behind the scenes, learn about our newest flavors, 
            and get insider tips from our bakers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {posts.slice(0, 3).map((post, index) => (
            <div 
              key={post.id}
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <BlogCard post={post} showCategory={true} className="card-hover h-full" />
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link href="/blog" className="btn-outline text-lg px-8 py-4 inline-block">
            Read All Stories
          </Link>
        </div>
      </div>
    </section>
  )
}