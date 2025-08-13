# Hole in the Wall - Specialty Donut Hole Shop

![Hole in the Wall Preview](https://imgix.cosmicjs.com/d62c8000-7876-11f0-a051-23c10f41277a-photo-1556909114-f6e7ad7d3136-1755111224087.jpg?w=1200&h=300&fit=crop&auto=format,compress)

A mystical and engaging website for Hole in the Wall, a specialty donut hole shop that brings magic to the simple pleasure of donut holes. Experience the unique "hole in the wall" concept where customers discover handcrafted donut holes through a signature wall opening.

## ✨ Features

- 🍩 **Flavor Showcase** - Interactive display of all donut hole flavors with availability indicators
- 📱 **Mobile Ordering** - Seamless DoorDash integration for easy online ordering  
- 📝 **Story Blog** - Behind-the-scenes content and baking tips to build community
- 🎭 **Social Integration** - TikTok embeds and social media connectivity
- 🌟 **Seasonal Discovery** - Featured flavors and limited-edition highlights
- 📍 **Business Info** - Contact details, hours, and location information
- 🏪 **Brand Storytelling** - Captures the magical "hole in the wall" experience

## Clone this Bucket and Code Repository

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Bucket and Code Repository](https://img.shields.io/badge/Clone%20this%20Bucket-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmic-staging.com/projects/new?clone_bucket=689cdc93efcf4b47c154dbf2&clone_repository=689ce2e8efcf4b47c154dc26)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> Can you tell me again what the prompt should be for the front end building agent to have?

### Code Generation Prompt

> Front-End Building Agent Prompt
You are building a website for Hole in the Wall, a specialty donut hole shop. The site should capture the unique "hole in the wall" experience where customers order through a wall opening.

Content Structure Available:
Business Info (Singleton)

Business name, tagline, about us content
Contact info (address, phone, email)
Hours of operation
DoorDash delivery link
Social media handles (TikTok, Instagram, Facebook)
Donut Hole Flavors

Flavor name, description, and image
Ingredients and allergen information
Availability (year-round, seasonal, limited edition)
Featured/available status toggles
Pricing tiers: Nibble (6), Munch (12), Feast (24), Party Pack (48)
Blog Posts

Post title, featured image, HTML content
Categories: Behind the Scenes, New Flavors, Company News, Customer Stories, Baking Tips
TikTok embed capability
Featured post designation
Design Direction:
Emphasize the mystery and magic of the "hole in the wall" concept
Highlight the specialty focus on donut holes only
Create a warm, inviting bakery atmosphere
Make flavors the hero content with appetizing imagery
Include social media integration, especially TikTok
Showcase seasonal/limited flavors prominently
Easy access to ordering via DoorDash
Key Features to Include:
Flavor showcase with availability indicators
Blog section for storytelling and behind-the-scenes content
Contact/hours information
Social media feeds/links
Mobile-friendly ordering experience
Build a modern, engaging website that makes visitors excited to try these specialty donut holes and creates anticipation around the unique ordering experience.
Use the attached photo for design inspiration

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## 🛠 Technologies Used

- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS with custom design system
- **Content Management**: Cosmic CMS
- **Language**: TypeScript
- **Deployment**: Optimized for Vercel, Netlify
- **Package Manager**: Bun

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ (or Bun runtime)
- A Cosmic account with the donut shop content model

### Installation

1. **Clone this repository**
   ```bash
   git clone [repository-url]
   cd hole-in-the-wall-website
   ```

2. **Install dependencies**
   ```bash
   bun install
   ```

3. **Environment Setup**
   ```bash
   # Copy environment template
   cp .env.example .env.local
   
   # Add your Cosmic credentials
   COSMIC_BUCKET_SLUG=your-bucket-slug
   COSMIC_READ_KEY=your-read-key
   COSMIC_WRITE_KEY=your-write-key
   ```

4. **Run development server**
   ```bash
   bun run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🌟 Cosmic SDK Examples

### Fetch All Flavors with Availability
```typescript
// Get all available flavors
const availableFlavors = await cosmic.objects.find({
  type: 'flavors',
  'metadata.available': true
}).props(['id', 'title', 'slug', 'metadata']).depth(1)

// Get featured flavors only
const featuredFlavors = await cosmic.objects.find({
  type: 'flavors', 
  'metadata.featured': true,
  'metadata.available': true
}).props(['id', 'title', 'slug', 'metadata']).depth(1)
```

### Fetch Blog Posts by Category
```typescript
// Get behind-the-scenes posts
const behindScenesPosts = await cosmic.objects.find({
  type: 'blog-posts',
  'metadata.category': 'behind-scenes'
}).props(['id', 'title', 'slug', 'metadata']).depth(1)

// Get featured blog posts
const featuredPosts = await cosmic.objects.find({
  type: 'blog-posts',
  'metadata.featured': true
}).props(['id', 'title', 'slug', 'metadata']).depth(1)
```

### Get Business Information
```typescript
// Fetch singleton business info
const businessInfo = await cosmic.objects.findOne({
  type: 'business-info'
}).props(['id', 'title', 'metadata']).depth(1)
```

## 🏪 Cosmic CMS Integration

This application integrates with your Cosmic CMS bucket containing:

- **Business Info**: Singleton containing business details, contact info, hours, and social media links
- **Donut Hole Flavors**: Complete flavor catalog with images, ingredients, allergens, availability, and pricing
- **Blog Posts**: Rich content posts with categories, featured images, and TikTok embed support

The content model supports:
- Seasonal and limited edition flavor management
- Featured content highlighting
- Rich HTML content with embedded media
- Flexible pricing tiers for different order sizes
- Social media integration with TikTok embeds

## 🌐 Deployment Options

### Deploy to Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repo to Vercel
3. Add your environment variables in Vercel dashboard
4. Deploy!

### Deploy to Netlify
1. Connect your repo to Netlify
2. Set build command: `bun run build`
3. Set publish directory: `out` or `dist`
4. Add environment variables
5. Deploy!

### Environment Variables for Production
Set these in your hosting platform's dashboard:
```
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

Ready to bring the magic of Hole in the Wall donut holes to your customers! 🕳️🍩

<!-- README_END -->