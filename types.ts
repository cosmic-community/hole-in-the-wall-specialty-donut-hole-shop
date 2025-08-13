// Base Cosmic object interface
export interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
}

// Business Info singleton interface
export interface BusinessInfo extends CosmicObject {
  type: 'business-info';
  metadata: {
    business_name: string;
    tagline?: string;
    about_us?: string;
    address?: string;
    phone?: string;
    email?: string;
    hours?: string;
    doordash_link?: string;
    social_media?: {
      tiktok?: string;
      instagram?: string;
      facebook?: string;
    };
  };
}

// Donut Hole Flavor interface
export interface DonutFlavor extends CosmicObject {
  type: 'flavors';
  metadata: {
    flavor_name: string;
    description?: string;
    flavor_image?: {
      url: string;
      imgix_url: string;
    };
    ingredients?: string;
    allergen_info?: string;
    availability?: {
      key: AvailabilityType;
      value: string;
    };
    featured: boolean;
    available: boolean;
    pricing?: {
      nibble?: {
        count: number;
        price: number;
      };
      munch?: {
        count: number;
        price: number;
      };
      feast?: {
        count: number;
        price: number;
      };
      party_pack?: {
        count: number;
        price: number;
      };
    };
  };
}

// Blog Post interface
export interface BlogPost extends CosmicObject {
  type: 'blog-posts';
  metadata: {
    title: string;
    featured_image?: {
      url: string;
      imgix_url: string;
    };
    content?: string;
    category?: {
      key: BlogCategory;
      value: string;
    };
    tiktok_embed?: string;
    featured: boolean;
  };
}

// Type literals for select-dropdown values
export type AvailabilityType = 
  | 'year-round' 
  | 'seasonal-spring' 
  | 'seasonal-summer' 
  | 'seasonal-fall' 
  | 'seasonal-winter' 
  | 'limited';

export type BlogCategory = 
  | 'behind-scenes' 
  | 'new-flavors' 
  | 'company-news' 
  | 'customer-stories' 
  | 'baking-tips';

// API response types
export interface CosmicResponse<T> {
  objects: T[];
  total: number;
  limit?: number;
  skip?: number;
}

// Type guards for runtime validation
export function isBusinessInfo(obj: CosmicObject): obj is BusinessInfo {
  return obj.type === 'business-info';
}

export function isDonutFlavor(obj: CosmicObject): obj is DonutFlavor {
  return obj.type === 'flavors';
}

export function isBlogPost(obj: CosmicObject): obj is BlogPost {
  return obj.type === 'blog-posts';
}

// Utility types
export type CreateFlavorData = Omit<DonutFlavor, 'id' | 'created_at' | 'modified_at'>;
export type CreateBlogPostData = Omit<BlogPost, 'id' | 'created_at' | 'modified_at'>;

// Navigation and UI types
export interface NavItem {
  label: string;
  href: string;
  external?: boolean;
}

export interface FlavorCardProps {
  flavor: DonutFlavor;
  showPricing?: boolean;
  className?: string;
}

export interface BlogCardProps {
  post: BlogPost;
  showCategory?: boolean;
  className?: string;
}