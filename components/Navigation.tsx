'use client'

import { useState } from 'react'
import Link from 'next/link'
import { BusinessInfo } from '@/types'

interface NavigationProps {
  businessInfo: BusinessInfo;
}

export default function Navigation({ businessInfo }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Flavors', href: '/flavors' },
    { label: 'Blog', href: '/blog' },
    { label: 'Order Now', href: businessInfo.metadata.doordash_link || '#', external: true }
  ];

  return (
    <nav className="bg-white shadow-soft sticky top-0 z-40">
      <div className="max-w-7xl mx-auto container-padding">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
            <div className="w-10 h-10 bg-burgundy-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">🕳️</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-burgundy-800">
                {businessInfo.metadata.business_name}
              </h1>
              {businessInfo.metadata.tagline && (
                <p className="text-xs text-burgundy-500 hidden sm:block">
                  {businessInfo.metadata.tagline}
                </p>
              )}
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                target={item.external ? '_blank' : undefined}
                rel={item.external ? 'noopener noreferrer' : undefined}
                className={`font-medium transition-colors duration-200 ${
                  item.label === 'Order Now'
                    ? 'btn-primary'
                    : 'text-burgundy-600 hover:text-burgundy-800'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-md text-burgundy-600 hover:bg-cream-100 transition-colors"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-cream-200">
            <div className="flex flex-col space-y-3">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  target={item.external ? '_blank' : undefined}
                  rel={item.external ? 'noopener noreferrer' : undefined}
                  onClick={() => setIsOpen(false)}
                  className={`px-3 py-2 rounded-md font-medium transition-colors duration-200 ${
                    item.label === 'Order Now'
                      ? 'btn-primary text-center'
                      : 'text-burgundy-600 hover:bg-cream-100'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}