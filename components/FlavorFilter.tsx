'use client'

import { useState } from 'react'
import { DonutFlavor, AvailabilityType } from '@/types'

interface FlavorFilterProps {
  flavors: DonutFlavor[];
}

export default function FlavorFilter({ flavors }: FlavorFilterProps) {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'available' | AvailabilityType>('all');

  const filterOptions = [
    { key: 'all', label: 'All Flavors' },
    { key: 'available', label: 'Available Now' },
    { key: 'year-round', label: 'Year-Round' },
    { key: 'seasonal-spring', label: 'Spring Seasonal' },
    { key: 'seasonal-summer', label: 'Summer Seasonal' },
    { key: 'seasonal-fall', label: 'Fall Seasonal' },
    { key: 'seasonal-winter', label: 'Winter Seasonal' },
    { key: 'limited', label: 'Limited Edition' }
  ];

  const handleFilterChange = (filter: 'all' | 'available' | AvailabilityType) => {
    setSelectedFilter(filter);
    
    // Filter and show/hide flavors
    const flavorGrid = document.getElementById('flavors-grid');
    if (!flavorGrid) return;

    const flavorCards = flavorGrid.children;
    
    Array.from(flavorCards).forEach((card) => {
      const flavorId = card.getAttribute('data-flavor-id');
      const flavor = flavors.find(f => f.id === flavorId);
      
      if (!flavor) return;
      
      let shouldShow = false;
      
      if (filter === 'all') {
        shouldShow = true;
      } else if (filter === 'available') {
        shouldShow = flavor.metadata.available;
      } else {
        shouldShow = flavor.metadata.availability?.key === filter;
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
      {filterOptions.map((option) => {
        const count = option.key === 'all' 
          ? flavors.length 
          : option.key === 'available'
            ? flavors.filter(f => f.metadata.available).length
            : flavors.filter(f => f.metadata.availability?.key === option.key).length;

        if (count === 0 && option.key !== 'all') return null;

        return (
          <button
            key={option.key}
            onClick={() => handleFilterChange(option.key as 'all' | 'available' | AvailabilityType)}
            className={`px-4 py-2 rounded-full font-medium transition-all duration-200 ${
              selectedFilter === option.key
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