import { createBucketClient } from '@cosmicjs/sdk'
import { DonutFlavor, BlogPost, BusinessInfo, CosmicResponse } from '@/types'

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
  apiEnvironment: 'staging'
})

// Simple error helper for Cosmic SDK
function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error;
}

// Fetch all donut flavors
export async function getAllFlavors(): Promise<DonutFlavor[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'flavors' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    return response.objects as DonutFlavor[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch flavors');
  }
}

// Fetch available flavors only
export async function getAvailableFlavors(): Promise<DonutFlavor[]> {
  try {
    const response = await cosmic.objects
      .find({ 
        type: 'flavors',
        'metadata.available': true 
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    return response.objects as DonutFlavor[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch available flavors');
  }
}

// Fetch featured flavors
export async function getFeaturedFlavors(): Promise<DonutFlavor[]> {
  try {
    const response = await cosmic.objects
      .find({ 
        type: 'flavors',
        'metadata.featured': true,
        'metadata.available': true 
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    return response.objects as DonutFlavor[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch featured flavors');
  }
}

// Fetch single flavor by slug
export async function getFlavorBySlug(slug: string): Promise<DonutFlavor | null> {
  try {
    const response = await cosmic.objects
      .findOne({
        type: 'flavors',
        slug
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    const flavor = response.object as DonutFlavor;
    
    if (!flavor || !flavor.metadata) {
      return null;
    }
    
    return flavor;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw new Error(`Failed to fetch flavor: ${slug}`);
  }
}

// Fetch all blog posts
export async function getAllBlogPosts(): Promise<BlogPost[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'blog-posts' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    return response.objects as BlogPost[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch blog posts');
  }
}

// Fetch featured blog posts
export async function getFeaturedBlogPosts(): Promise<BlogPost[]> {
  try {
    const response = await cosmic.objects
      .find({ 
        type: 'blog-posts',
        'metadata.featured': true 
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    return response.objects as BlogPost[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch featured blog posts');
  }
}

// Fetch blog posts by category
export async function getBlogPostsByCategory(category: string): Promise<BlogPost[]> {
  try {
    const response = await cosmic.objects
      .find({ 
        type: 'blog-posts',
        'metadata.category': category 
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    return response.objects as BlogPost[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error(`Failed to fetch blog posts for category: ${category}`);
  }
}

// Fetch single blog post by slug
export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const response = await cosmic.objects
      .findOne({
        type: 'blog-posts',
        slug
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    const post = response.object as BlogPost;
    
    if (!post || !post.metadata) {
      return null;
    }
    
    return post;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw new Error(`Failed to fetch blog post: ${slug}`);
  }
}

// Fetch business information
export async function getBusinessInfo(): Promise<BusinessInfo | null> {
  try {
    const response = await cosmic.objects
      .findOne({
        type: 'business-info'
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    const businessInfo = response.object as BusinessInfo;
    
    if (!businessInfo || !businessInfo.metadata) {
      return null;
    }
    
    return businessInfo;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw new Error('Failed to fetch business information');
  }
}