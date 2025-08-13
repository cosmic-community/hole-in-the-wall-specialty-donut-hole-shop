import Link from 'next/link'
import { BlogPost, BusinessInfo } from '@/types'

interface BlogPostContentProps {
  post: BlogPost;
  businessInfo: BusinessInfo;
}

export default function BlogPostContent({ post, businessInfo }: BlogPostContentProps) {
  const category = post.metadata.category;
  const isFeatured = post.metadata.featured;

  // Format date
  const publishedDate = new Date(post.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="min-h-screen bg-cream-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-cream-200 py-4">
        <div className="max-w-4xl mx-auto container-padding">
          <nav className="text-sm">
            <Link href="/" className="text-burgundy-600 hover:text-burgundy-800">Home</Link>
            <span className="mx-2 text-burgundy-400">/</span>
            <Link href="/blog" className="text-burgundy-600 hover:text-burgundy-800">Blog</Link>
            <span className="mx-2 text-burgundy-400">/</span>
            <span className="text-burgundy-400">{post.metadata.title}</span>
          </nav>
        </div>
      </div>

      {/* Blog Post Content */}
      <article className="section-padding">
        <div className="max-w-4xl mx-auto container-padding">
          {/* Header */}
          <header className="mb-12 text-center">
            <div className="flex items-center justify-center gap-4 mb-6">
              {category && (
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
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
              
              {isFeatured && (
                <span className="bg-burgundy-600 text-white text-sm font-semibold px-3 py-1 rounded-full">
                  Featured
                </span>
              )}
            </div>

            <h1 className="heading-xl mb-6 text-balance">{post.metadata.title}</h1>
            
            <p className="text-burgundy-500">Published on {publishedDate}</p>
          </header>

          {/* Featured Image */}
          {post.metadata.featured_image && (
            <div className="mb-12">
              <img
                src={`${post.metadata.featured_image.imgix_url}?w=1200&h=600&fit=crop&auto=format,compress`}
                alt={post.metadata.title}
                className="w-full h-auto rounded-xl shadow-soft"
                width="800"
                height="400"
              />
            </div>
          )}

          {/* Content */}
          {post.metadata.content && (
            <div 
              className="prose prose-burgundy prose-lg max-w-none mb-12"
              dangerouslySetInnerHTML={{ __html: post.metadata.content }}
            />
          )}

          {/* TikTok Embed */}
          {post.metadata.tiktok_embed && post.metadata.tiktok_embed.trim() && (
            <div className="mb-12">
              <div className="bg-white rounded-xl p-6 shadow-soft text-center">
                <h3 className="heading-sm mb-4">Watch on TikTok</h3>
                <div 
                  dangerouslySetInnerHTML={{ __html: post.metadata.tiktok_embed }}
                  className="flex justify-center"
                />
              </div>
            </div>
          )}

          {/* Social Sharing */}
          <div className="border-t border-cream-200 pt-8 mb-12">
            <h3 className="heading-sm mb-4 text-center">Share This Story</h3>
            <div className="flex justify-center space-x-4">
              {businessInfo.metadata.social_media?.tiktok && (
                <a
                  href={`https://tiktok.com/${businessInfo.metadata.social_media.tiktok}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary"
                >
                  Follow on TikTok
                </a>
              )}
              
              {businessInfo.metadata.social_media?.instagram && (
                <a
                  href={`https://instagram.com/${businessInfo.metadata.social_media.instagram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary"
                >
                  Follow on Instagram
                </a>
              )}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center pt-8 border-t border-cream-200">
            <Link href="/blog" className="text-burgundy-600 hover:text-burgundy-800 font-medium">
              ← Back to All Stories
            </Link>
            
            <Link href="/flavors" className="text-burgundy-600 hover:text-burgundy-800 font-medium">
              Explore Our Flavors →
            </Link>
          </div>
        </div>
      </article>
    </div>
  )
}