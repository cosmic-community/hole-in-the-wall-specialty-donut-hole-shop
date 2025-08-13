// app/flavors/[slug]/page.tsx
import { getFlavorBySlug, getAllFlavors, getBusinessInfo } from '@/lib/cosmic'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import FlavorDetail from '@/components/FlavorDetail'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

interface FlavorPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const flavors = await getAllFlavors();
  return flavors.map((flavor) => ({
    slug: flavor.slug,
  }));
}

export async function generateMetadata({ params }: FlavorPageProps): Promise<Metadata> {
  const { slug } = await params;
  const flavor = await getFlavorBySlug(slug);
  
  if (!flavor) {
    return {
      title: 'Flavor Not Found',
    };
  }

  return {
    title: flavor.metadata.flavor_name,
    description: `Discover our ${flavor.metadata.flavor_name} donut holes. ${flavor.metadata.description ? flavor.metadata.description.replace(/<[^>]*>/g, '').substring(0, 150) : ''}`,
    openGraph: {
      title: flavor.metadata.flavor_name,
      description: flavor.metadata.description ? flavor.metadata.description.replace(/<[^>]*>/g, '').substring(0, 150) : '',
      images: flavor.metadata.flavor_image ? [{
        url: `${flavor.metadata.flavor_image.imgix_url}?w=1200&h=600&fit=crop&auto=format,compress`,
        width: 1200,
        height: 600,
        alt: flavor.metadata.flavor_name,
      }] : [],
    },
  };
}

export default async function FlavorPage({ params }: FlavorPageProps) {
  const { slug } = await params;
  const [flavor, businessInfo] = await Promise.all([
    getFlavorBySlug(slug),
    getBusinessInfo()
  ]);

  if (!flavor) {
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
        <FlavorDetail flavor={flavor} businessInfo={businessInfo} />
      </main>

      <Footer businessInfo={businessInfo} />
    </>
  )
}