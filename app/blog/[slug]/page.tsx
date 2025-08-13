// app/blog/[slug]/page.tsx
import { getBlogPostBySlug, getAllBlogPosts, getBusinessInfo } from '@/lib/cosmic'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import BlogPostContent from '@/components/BlogPostContent'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = await getAllBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  
  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: post.metadata.title,
    description: post.metadata.content ? post.metadata.content.replace(/<[^>]*>/g, '').substring(0, 150) : '',
    openGraph: {
      title: post.metadata.title,
      description: post.metadata.content ? post.metadata.content.replace(/<[^>]*>/g, '').substring(0, 150) : '',
      images: post.metadata.featured_image ? [{
        url: `${post.metadata.featured_image.imgix_url}?w=1200&h=600&fit=crop&auto=format,compress`,
        width: 1200,
        height: 600,
        alt: post.metadata.title,
      }] : [],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const [post, businessInfo] = await Promise.all([
    getBlogPostBySlug(slug),
    getBusinessInfo()
  ]);

  if (!post) {
    notFound();
  }

  if (!businessInfo) {
    return <div className="flex items-center justify-center min-h-screen">
      <p className="text-lg text-burgundy-600">Loading...</p>
    </div>;
  }

  return (
    <>
      <Navigation businessInfo={businessInfo} />
      
      <main className="flex-1">
        <BlogPostContent post={post} businessInfo={businessInfo} />
      </main>

      <Footer businessInfo={businessInfo} />
    </>
  )
}