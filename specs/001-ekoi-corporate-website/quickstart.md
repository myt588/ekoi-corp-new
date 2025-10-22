# EKOI Corporate Website - Developer Quickstart

**Last Updated:** 2025-10-21

## Prerequisites

Before you begin, ensure you have:

- **Node.js** 18.17 or later
- **npm** or **yarn** or **pnpm**
- **Git** for version control
- **VS Code** (recommended) with extensions:
  - ESLint
  - Prettier
  - Tailwind CSS IntelliSense
  - TypeScript and JavaScript Language Features

## Project Setup

### 1. Clone and Install

```bash
# Clone the repository
git clone https://github.com/ekoi/ekoi-corp-new.git
cd ekoi-corp-new

# Install dependencies
npm install

# or
yarn install

# or
pnpm install
```

### 2. Environment Variables

Create a `.env.local` file in the project root:

```bash
# .env.local

# reCAPTCHA v3 (get from https://www.google.com/recaptcha/admin)
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_recaptcha_site_key_here
RECAPTCHA_SECRET_KEY=your_recaptcha_secret_key_here

# Slack Webhook (get from Slack App settings)
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/YOUR/WEBHOOK/URL

# Optional: Analytics
# NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

**Getting reCAPTCHA Keys:**
1. Go to https://www.google.com/recaptcha/admin
2. Register a new site with reCAPTCHA v3
3. Add your domains (localhost for development)
4. Copy Site Key → `NEXT_PUBLIC_RECAPTCHA_SITE_KEY`
5. Copy Secret Key → `RECAPTCHA_SECRET_KEY`

**Getting Slack Webhook URL:**
1. Go to https://api.slack.com/apps
2. Create a new app or use existing
3. Enable "Incoming Webhooks"
4. Add webhook to your desired channel
5. Copy Webhook URL → `SLACK_WEBHOOK_URL`

### 3. Run Development Server

```bash
npm run dev

# or
yarn dev

# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

The page will auto-reload when you make changes. Errors and lint warnings will appear in the console.

## Project Structure

```
ekoi-corp-new/
├── src/
│   ├── app/                         # Next.js App Router
│   │   ├── [locale]/                # Internationalized routes
│   │   │   ├── layout.tsx           # Root layout
│   │   │   ├── page.tsx             # Homepage
│   │   │   ├── products/            # Product pages
│   │   │   ├── solutions/           # Solutions pages
│   │   │   ├── news/                # News pages
│   │   │   └── contact/             # Contact page
│   │   ├── api/
│   │   │   └── contact/route.ts     # Contact API
│   │   └── globals.css              # Global styles
│   ├── components/
│   │   ├── ui/                      # shadcn/ui components
│   │   ├── layout/                  # Header, Footer, Nav
│   │   ├── sections/                # Page sections
│   │   └── forms/                   # Form components
│   ├── lib/
│   │   ├── utils.ts                 # Utility functions
│   │   ├── validations.ts           # Zod schemas
│   │   ├── slack.ts                 # Slack integration
│   │   └── recaptcha.ts             # reCAPTCHA helper
│   ├── data/                        # Content data files
│   │   ├── products.ts
│   │   ├── solutions.ts
│   │   ├── news.ts
│   │   ├── partners.ts
│   │   └── clients.ts
│   ├── messages/                    # i18n translations
│   │   ├── en.json
│   │   └── ja.json
│   └── types/
│       └── index.ts                 # TypeScript types
├── public/
│   ├── assets/                      # Images, logos
│   └── favicon.ico
├── specs/                           # Project specifications
│   └── 001-ekoi-corporate-website/
│       ├── spec.md
│       ├── plan.md
│       ├── research.md
│       ├── data-model.md
│       └── contracts/
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
└── package.json
```

## Key Technologies

- **Framework:** Next.js 14+ (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Components:** shadcn/ui (Radix UI + Tailwind)
- **Forms:** react-hook-form + Zod
- **i18n:** next-intl
- **Icons:** Lucide React

## Development Workflow

### Adding shadcn/ui Components

```bash
# Add a new component
npx shadcn-ui@latest add button

# Add multiple components
npx shadcn-ui@latest add button input textarea select
```

Components will be added to `src/components/ui/`.

### Creating New Pages

1. **Create page file:**
   ```bash
   # Example: Create "About" page
   touch src/app/[locale]/about/page.tsx
   ```

2. **Implement page with metadata:**
   ```typescript
   // src/app/[locale]/about/page.tsx
   import {Metadata} from 'next';
   import {useTranslations} from 'next-intl';
   
   export const metadata: Metadata = {
     title: 'About Us | EKOI',
     description: 'Learn about EKOI AI infrastructure solutions',
   };
   
   export default function AboutPage() {
     const t = useTranslations('about');
     
     return (
       <div>
         <h1>{t('title')}</h1>
         {/* Page content */}
       </div>
     );
   }
   ```

3. **Add translations:**
   ```json
   // src/messages/en.json
   {
     "about": {
       "title": "About EKOI"
     }
   }
   
   // src/messages/ja.json
   {
     "about": {
       "title": "EKOIについて"
     }
   }
   ```

### Adding Content

#### Adding a Product

1. Open `src/data/products.ts`
2. Add new product object following the `Product` interface
3. Include both English and Japanese translations
4. Add product images to `public/assets/products/`

```typescript
// src/data/products.ts
export const products: Product[] = [
  // ... existing products
  {
    id: 'new-product-001',
    slug: 'new-product-slug',
    name: {
      en: 'Product Name',
      ja: '製品名',
    },
    shortDescription: {
      en: 'Brief description',
      ja: '簡単な説明',
    },
    // ... rest of fields
  },
];
```

#### Adding a News Article

1. Open `src/data/news.ts`
2. Add new article with translations
3. Add featured image to `public/assets/news/`

```typescript
// src/data/news.ts
{
  id: 'article-slug',
  slug: 'article-slug',
  title: {
    en: 'Article Title',
    ja: '記事タイトル',
  },
  excerpt: {
    en: 'Short summary...',
    ja: '短い要約...',
  },
  content: {
    en: '# Markdown Content\n\nArticle text...',
    ja: '# マークダウンコンテンツ\n\n記事テキスト...',
  },
  featuredImage: '/assets/news/image.jpg',
  publishedAt: '2025-10-21T09:00:00Z',
}
```

### Testing Forms Locally

To test the contact form without Slack:

1. **Mock Slack webhook:**
   ```typescript
   // src/lib/slack.ts
   export async function sendSlackNotification(data: ContactFormData) {
     if (process.env.NODE_ENV === 'development') {
       console.log('📧 Contact Form Submission:', data);
       return true; // Simulate success
     }
     // ... actual Slack code
   }
   ```

2. **Test submission:**
   - Fill out contact form
   - Check browser console for logged data
   - Verify validation works

### Working with Translations

All translations are in `src/messages/`:

```json
// en.json
{
  "navigation": {
    "home": "Home",
    "products": "Products",
    "solutions": "Solutions"
  },
  "homepage": {
    "hero": {
      "title": "AI Infrastructure Solutions",
      "subtitle": "Enterprise GPU servers for AI workloads"
    }
  }
}
```

Use in components:

```typescript
import {useTranslations} from 'next-intl';

export function Component() {
  const t = useTranslations('navigation');
  
  return <nav>{t('home')}</nav>;
}
```

## Common Tasks

### Running Linter

```bash
npm run lint

# Fix automatically
npm run lint:fix
```

### Type Checking

```bash
# Check types
npm run type-check

# or just build (includes type check)
npm run build
```

### Building for Production

```bash
npm run build
```

This will:
1. Type-check all code
2. Lint code
3. Build optimized production bundle
4. Generate sitemap
5. Output to `.next/` directory

### Analyzing Bundle Size

```bash
npm run analyze
```

Opens bundle analyzer in browser showing:
- Chunk sizes
- Module dependencies
- Optimization opportunities

### Running Tests

```bash
# Unit tests
npm test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:coverage
```

## Debugging

### VS Code Debug Configuration

Create `.vscode/launch.json`:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Next.js: debug server-side",
      "type": "node-terminal",
      "request": "launch",
      "command": "npm run dev"
    },
    {
      "name": "Next.js: debug client-side",
      "type": "chrome",
      "request": "launch",
      "url": "http://localhost:3000"
    }
  ]
}
```

### Common Issues

**Issue: "Module not found"**
```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules
npm install
```

**Issue: Tailwind styles not applying**
```bash
# Check tailwind.config.js content paths
# Restart dev server
npm run dev
```

**Issue: TypeScript errors**
```bash
# Regenerate TypeScript cache
rm -rf .next
npm run dev
```

**Issue: Environment variables not loading**
- Restart dev server after changing `.env.local`
- Verify variable names (client vars must start with `NEXT_PUBLIC_`)
- Check `.env.local` is in .gitignore

## Deployment

### Vercel (Recommended)

1. **Connect Repository:**
   - Go to https://vercel.com
   - Import Git repository
   - Vercel auto-detects Next.js

2. **Configure Environment Variables:**
   - Add all variables from `.env.local`
   - Navigate to Project Settings → Environment Variables

3. **Deploy:**
   ```bash
   # Automatic on git push to main
   git push origin main
   
   # Or manual deploy via CLI
   npm i -g vercel
   vercel
   ```

4. **Configure Domain:**
   - Go to Project Settings → Domains
   - Add custom domain
   - Update DNS records as instructed

### Environment-Specific Settings

**Development:**
- `.env.local` (local dev only, not committed)

**Preview/Staging:**
- Set via Vercel dashboard
- Separate Slack channel for testing

**Production:**
- Set via Vercel dashboard
- Production Slack webhook
- Enable Vercel Analytics
- Configure custom domain

## Performance Optimization

### Image Optimization

Always use `next/image`:

```typescript
import Image from 'next/image';

// Static import (recommended)
import heroImage from '@/public/assets/hero.jpg';

<Image
  src={heroImage}
  alt="Description"
  priority // For above-fold images
  placeholder="blur" // Automatic with static imports
/>

// Dynamic path
<Image
  src="/assets/products/h100.jpg"
  alt="H100 Server"
  width={800}
  height={600}
  loading="lazy"
/>
```

### Code Splitting

Use dynamic imports for heavy components:

```typescript
import dynamic from 'next/dynamic';

const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <p>Loading...</p>,
  ssr: false, // If client-only
});
```

### Caching Strategy

Next.js handles caching automatically:
- Static pages cached indefinitely
- Images cached with automatic optimization
- API routes can set cache headers

## Getting Help

- **Documentation:** https://nextjs.org/docs
- **Tailwind Docs:** https://tailwindcss.com/docs
- **shadcn/ui:** https://ui.shadcn.com
- **Team Chat:** #ekoi-dev Slack channel
- **Issues:** GitHub Issues in repository

## Next Steps

1. **Familiarize yourself with the codebase**
   - Read spec.md and plan.md
   - Explore component structure
   - Review data models

2. **Set up your development environment**
   - Install recommended VS Code extensions
   - Configure linter and formatter
   - Test hot reload

3. **Make your first contribution**
   - Pick a task from the project board
   - Create a feature branch
   - Follow the development workflow
   - Submit a pull request

4. **Review coding standards**
   - TypeScript best practices
   - Component patterns
   - Naming conventions
   - Commit message format

## Useful Commands Cheat Sheet

```bash
# Development
npm run dev                 # Start dev server
npm run build              # Build for production
npm run start              # Start production server
npm run lint               # Run ESLint
npm run type-check         # Run TypeScript check

# Component Management
npx shadcn-ui@latest add <component>  # Add shadcn/ui component

# Testing
npm test                   # Run unit tests
npm run test:e2e          # Run E2E tests
npm run test:coverage     # Generate coverage report

# Utilities
npm run analyze           # Analyze bundle size
npm run clean             # Clean build artifacts
```

Happy coding! 🚀

