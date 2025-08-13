import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import CosmicBadge from '@/components/CosmicBadge'
import { getBusinessInfo } from '@/lib/cosmic'

const inter = Inter({ subsets: ['latin'] })

export async function generateMetadata(): Promise<Metadata> {
  const businessInfo = await getBusinessInfo();
  const businessName = businessInfo?.metadata?.business_name || 'Hole in the Wall';
  const tagline = businessInfo?.metadata?.tagline || 'Magical donut holes through the hole in the wall';

  return {
    title: {
      default: businessName,
      template: `%s | ${businessName}`
    },
    description: tagline,
    keywords: ['donut holes', 'bakery', 'specialty donuts', 'fresh baked', 'hole in the wall'],
    authors: [{ name: businessName }],
    creator: businessName,
    openGraph: {
      type: 'website',
      locale: 'en_US',
      title: businessName,
      description: tagline,
      siteName: businessName,
    },
    twitter: {
      card: 'summary_large_image',
      title: businessName,
      description: tagline,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Get bucket slug from environment for the cosmic badge
  const bucketSlug = process.env.COSMIC_BUCKET_SLUG as string;

  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} antialiased`}>
        <div className="min-h-screen flex flex-col">
          {children}
        </div>
        {/* Pass bucket slug to client component */}
        <CosmicBadge bucketSlug={bucketSlug} />
      </body>
    </html>
  )
}