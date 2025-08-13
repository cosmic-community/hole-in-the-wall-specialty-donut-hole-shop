import Link from 'next/link'
import { BlogPost } from '@/types'

interface BlogCardProps {
  post: BlogPost;
  showCategory?: boolean;
  className?: string;
}

export default function BlogCard({ post, showCategory = false, className = '' }: BlogCardProps) {
  const category = post.metadata.category;
  const isFeatured = post.metadata.featured;

  // Format date
  const publishedDate = new Date(post.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <Link href={`/blog/${post.slug}`} className={`block ${className}`}>
      <article className="card transition-all duration-300 hover:shadow-warm hover:scale-105 h-full">
        {/* Featured Badge */}
        {isFeatured && (
          <div className="absolute top-4 right-4 z-10">
            <span className="bg-burgundy-600 text-white text-xs font-semibold px-2 py-1 rounded-full">
              Featured
            </span>
          </div>
        )}

        {/* Featured Image */}
        <div className="relative aspect-[4/3] overflow-hidden">
          {post.metadata.featured_image ? (
            <img
              src={`${post.metadata.featured_image.imgix_url}?w=800&h=600&fit=crop&auto=format,compress`}
              alt={post.metadata.title}
              className="w-full h-full object-cover"
              width="400"
              height="300"
            />
          ) : (
            <div className="w-full h-full bg-cream-200 flex items-center justify-center">
              <span className="text-4xl">📝</span>
            </div>
          )}
        </div>

        {/* Card Content */}
        <div className="p-6 flex-1 flex flex-col">
          {/* Category & Date */}
          <div className="flex items-center justify-between mb-3 text-sm">
            {showCategory && category && (
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                category.key === 'behind-scenes' ? 'bg-purple-100 text-purple-800' :
                category.key === 'new-flavors' ? 'bg-orange-100 text-orange-800' :
                category.key === 'company-news' ? 'bg-blue-100 text-blue-800' :
                category.key === 'customer-stories' ? 'bg-green-100 text-green-800' :
                category.key === 'baking-tips' ? 'bg-yellow-100 text-yellow-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {category.value}
              </span>
            )}
            <span className="text-burgundy-400 text-xs">{publishedDate}</span>
          </div>

          {/* Title */}
          <h3 className="heading-sm text-burgundy-800 mb-3 line-clamp-2 flex-1">
            {post.metadata.title}
          </h3>

          {/* Content Preview */}
          {post.metadata.content && (
            <p className="text-burgundy-600 mb-4 line-clamp-3 flex-1">
              {post.metadata.content.replace(/<[^>]*>/g, '').substring(0, 150)}...
            </p>
          )}

          {/* Read More */}
          <div className="pt-4 border-t border-cream-200 mt-auto">
            <span className="text-burgundy-600 font-medium text-sm hover:text-burgundy-800 transition-colors">
              Read Story →
            </span>
          </div>
        </div>
      </article>
    </Link>
  )
}