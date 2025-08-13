'use client'

import { useState } from 'react'
import { BlogPost, BlogCategory } from '@/types'

interface CategoryFilterProps {
  posts: BlogPost[];
}

export default function CategoryFilter({ posts }: CategoryFilterProps) {
  const [selectedCategory, setSelectedCategory] = useState<'all' | BlogCategory>('all');

  const categoryOptions = [
    { key: 'all', label: 'All Stories' },
    { key: 'behind-scenes', label: 'Behind the Scenes' },
    { key: 'new-flavors', label: 'New Flavors' },
    { key: 'company-news', label: 'Company News' },
    { key: 'customer-stories', label: 'Customer Stories' },
    { key: 'baking-tips', label: 'Baking Tips' }
  ];

  const handleCategoryChange = (category: 'all' | BlogCategory) => {
    setSelectedCategory(category);
    
    // Filter and show/hide blog posts
    const blogGrid = document.getElementById('blog-grid');
    if (!blogGrid) return;

    const blogCards = blogGrid.children;
    
    Array.from(blogCards).forEach((card) => {
      const postId = card.getAttribute('data-post-id');
      const post = posts.find(p => p.id === postId);
      
      if (!post) return;
      
      let shouldShow = false;
      
      if (category === 'all') {
        shouldShow = true;
      } else {
        shouldShow = post.metadata.category?.key === category;
      }
      
      if (shouldShow) {
        card.classList.remove('hidden');
        card.classList.add('animate-fade-in-up');
      } else {
        card.classList.add('hidden');
      }
    });
  };

  return (
    <div className="flex flex-wrap gap-3 justify-center">
      {categoryOptions.map((option) => {
        const count = option.key === 'all' 
          ? posts.length 
          : posts.filter(p => p.metadata.category?.key === option.key).length;

        if (count === 0 && option.key !== 'all') return null;

        return (
          <button
            key={option.key}
            onClick={() => handleCategoryChange(option.key as 'all' | BlogCategory)}
            className={`px-4 py-2 rounded-full font-medium transition-all duration-200 ${
              selectedCategory === option.key
                ? 'bg-burgundy-600 text-white shadow-md'
                : 'bg-white text-burgundy-600 border border-burgundy-200 hover:bg-burgundy-50'
            }`}
          >
            {option.label}
            <span className="ml-2 text-xs opacity-75">({count})</span>
          </button>
        );
      })}
    </div>
  )
}