# EKOI Corporate Website - Developer Quickstart

**Last Updated:** 2025-10-24

## Prerequisites

Before you begin, ensure you have:

- **Node.js** 24 or later
- **pnpm** 10 (package manager)
- **Git** for version control
- **VS Code** (recommended) with extensions:
  - ESLint
  - Prettier
  - TypeScript and JavaScript Language Features

## Project Setup

### 1. Clone and Install

```bash
# Clone the repository
git clone https://github.com/ekoi/ekoi-corp-new.git
cd ekoi-corp-new

# Install dependencies
pnpm install
```

### 2. Environment Variables

Create a `.env.local` file in the project root (when you start implementing features that need them):

```bash
# .env.local

# Example environment variables (add as needed):
# NEXT_PUBLIC_EXAMPLE=value

# Note: Client-side env vars must start with NEXT_PUBLIC_
# Server-side env vars should be defined in src/lib/env/server.ts
# Client-side env vars should be defined in src/lib/env/client.ts
```

The project uses **T3 Env** for type-safe environment variables. See:
- `src/lib/env/server.ts` for server-side environment variables
- `src/lib/env/client.ts` for client-side environment variables

When you add environment variables, update the corresponding schema files.

### 3. Run Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

The page will auto-reload when you make changes. Errors and lint warnings will appear in the console.

## Project Structure

```
ekoi-corp-new/
├── .husky/                          # Git hooks (Husky)
├── specs/                           # Project specifications
│   └── 001-ekoi-corporate-website/
│       ├── spec.md
│       ├── plan.md
│       ├── quickstart.md
│       ├── research.md
│       ├── data-model.md
│       ├── constitutional-compliance.md
│       ├── checklists/
│       └── contracts/
├── src/
│   ├── app/                         # Next.js App Router
│   │   ├── layout.tsx               # Root layout
│   │   ├── page.tsx                 # Homepage
│   │   ├── page.module.css          # Page styles
│   │   ├── globals.css              # Global styles
│   │   └── favicon.ico              # Favicon
│   └── lib/
│       └── env/                     # T3 Env configuration
│           ├── client.ts            # Client-side env vars
│           └── server.ts            # Server-side env vars
├── public/                          # Static assets
│   └── next.svg
├── workflows/                       # CI/CD workflows
│   └── ci.yml
├── .editorconfig                    # Editor configuration
├── .eslintrc.json                   # ESLint configuration  
├── .prettierrc.json                 # Prettier configuration
├── .gitignore                       # Git ignore rules
├── .nvmrc                           # Node version
├── .commitlintrc.json               # Commit lint configuration
├── .lintstagedrc.js                 # Lint-staged configuration
├── eslint.config.mjs                # ESLint config (ESM)
├── next.config.ts                   # Next.js configuration
├── redirects.ts                     # Redirects configuration
├── tsconfig.json                    # TypeScript configuration
├── package.json                     # Dependencies
├── pnpm-lock.yaml                   # pnpm lock file
└── README.md                        # Project README
```

**Note:** As you build out features, you'll add directories like:
- `src/components/` - React components
- `src/data/` - Content data files
- `src/types/` - TypeScript type definitions
- `src/app/api/` - API routes

## Key Technologies

### Currently Configured

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript 5.9
- **Runtime:** React 19.2
- **Validation:** Zod 4.1
- **Environment Variables:** T3 Env (type-safe)
- **Code Quality:** ESLint 9, Prettier 3.6
- **Git Hooks:** Husky 9.1
- **Commit Linting:** Commitlint
- **Staged Files Linting:** lint-staged

### To Be Added (Per Plan)

- **Styling:** Tailwind CSS
- **Components:** shadcn/ui (Radix UI + Tailwind)
- **Forms:** react-hook-form + Zod
- **i18n:** next-intl
- **Icons:** Lucide React

## Development Workflow

### Initial Setup Tasks

Before starting feature development, you'll need to:

1. **Install Tailwind CSS:**
   ```bash
   pnpm add -D tailwindcss postcss autoprefixer
   pnpm tailwindcss init -p
   ```

2. **Initialize shadcn/ui:**
   ```bash
   pnpm dlx shadcn@latest init
   ```

3. **Add shadcn/ui Components (as needed):**
   ```bash
   pnpm dlx shadcn@latest add button
   pnpm dlx shadcn@latest add input textarea select
   ```

Components will be added to `src/components/ui/`.

### Creating New Pages

1. **Create page file:**
   ```bash
   # Example: Create "About" page
   mkdir -p src/app/about
   touch src/app/about/page.tsx
   ```

2. **Implement page with metadata:**
   ```typescript
   // src/app/about/page.tsx
   import type { Metadata } from 'next';
   
   export const metadata: Metadata = {
     title: 'About Us | EKOI',
     description: 'Learn about EKOI AI infrastructure solutions',
   };
   
   export default function AboutPage() {
     return (
       <div>
         <h1>About EKOI</h1>
         {/* Page content */}
       </div>
     );
   }
   ```

**Note:** Once you implement i18n with next-intl, the structure will change to:
- `src/app/[locale]/about/page.tsx`
- Translation files in `src/messages/`

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
pnpm lint

# Fix automatically
pnpm lint:fix
```

### Type Checking

```bash
# Check types
pnpm type-check

# or just build (includes type check)
pnpm build
```

### Building for Production

```bash
pnpm build
```

This will:
1. Type-check all code
2. Lint code
3. Build optimized production bundle
4. Generate sitemap
5. Output to `.next/` directory

### Analyzing Bundle Size

To be configured with `@next/bundle-analyzer`.

### Running Tests

Testing framework to be set up in Phase 6 of the implementation plan.

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
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

**Issue: Tailwind styles not applying**
```bash
# Check tailwind.config.js content paths
# Restart dev server
pnpm dev
```

**Note:** Tailwind CSS needs to be installed first (see Initial Setup Tasks above).

**Issue: TypeScript errors**
```bash
# Regenerate TypeScript cache
rm -rf .next
pnpm dev
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
pnpm dev                   # Start dev server
pnpm build                 # Build for production
pnpm start                 # Start production server
pnpm lint                  # Run ESLint
pnpm lint:fix              # Run ESLint with auto-fix
pnpm type-check            # Run TypeScript check
pnpm format                # Format code with Prettier
pnpm format:check          # Check formatting without changes

# Component Management (after setup)
pnpm dlx shadcn@latest add <component>  # Add shadcn/ui component

# Testing (to be configured)
pnpm test                  # Run unit tests
pnpm test:e2e              # Run E2E tests
pnpm test:coverage         # Generate coverage report
```

Happy coding! 🚀

