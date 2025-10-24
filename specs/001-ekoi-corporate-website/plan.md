# Implementation Plan: EKOI Corporate Website

**Date:** 2025-10-21  
**Last Updated:** 2025-10-24  
**Author:** EKOI Development Team  
**Status:** In Progress - Phase 1 Partially Complete

## Project Setup Note

The project has been initialized using the **TypeScript Next.js Starter** template (https://github.com/jpedroschmitz/typescript-nextjs-starter), which provides a solid foundation with:

- Next.js 16 with App Router
- React 19.2
- TypeScript 5.9
- ESLint 9 with Prettier integration
- Husky for Git hooks
- Commitlint for conventional commits
- lint-staged for pre-commit checks
- T3 Env for type-safe environment variables
- Content Security Policy headers
- EditorConfig for consistent coding styles
- Renovate for dependency updates

This starter provides a production-ready foundation that aligns with our constitutional principles for code quality, allowing us to focus on implementing business features rather than configuration.

## Overview

This implementation plan outlines the development of EKOI's multilingual corporate website using Next.js, Tailwind CSS, and shadcn/ui. The website will showcase AI GPU server products, cloud solution partnerships, company information, news, and enable business inquiries through a contact form with Slack integration. The application will be deployed on Vercel following Next.js and Vercel best practices for optimal performance and SEO.

The implementation follows a phased approach prioritizing core functionality, internationalization, and constitutional compliance across all 7 principles.

## Constitutional Alignment

This implementation adheres to the following constitutional principles:

### Code Quality Excellence (Principle 1)
- [x] Code follows Next.js and TypeScript conventions
- [x] Clear single responsibilities with modular component structure
- [x] Meaningful naming using semantic component and function names
- [x] ESLint and Prettier configured for Next.js
- [x] Minimal dependencies strategy to reduce technical debt
- [x] Code reviews required via pull request workflow

### User Experience Consistency (Principle 2)
- [x] Workflows follow predictable Next.js routing patterns
- [x] Consistent form validation using react-hook-form
- [x] Standardized feedback using shadcn/ui toast components
- [x] Loading states with Suspense boundaries
- [x] Error boundaries for graceful error handling

### UI Design Consistency (Principle 3)
- [x] shadcn/ui components as design system foundation
- [x] Tailwind CSS for consistent styling
- [x] Defined color palette in tailwind.config.js
- [x] Typography scale using Tailwind typography utilities
- [x] Lucide React icons for consistent iconography
- [x] Animation variants documented in component library

### Responsive Design (Principle 4)
- [x] Mobile-first Tailwind breakpoints (sm: 640px, md: 768px, lg: 1024px, xl: 1280px, 2xl: 1536px)
- [x] Touch targets minimum 44×44px using Tailwind spacing
- [x] Responsive images with next/image optimization
- [x] Testing across Chrome DevTools devices and real devices

### Clear & Intuitive Interface (Principle 5)
- [x] Primary CTAs using shadcn/ui Button with clear labels
- [x] Form validation with actionable error messages
- [x] Empty states with guidance text
- [x] Progressive disclosure using shadcn/ui Accordion and Collapsible

### SEO Optimization (Principle 6)
- [x] Next.js Metadata API for titles and descriptions
- [x] Semantic HTML with proper heading hierarchy
- [x] next/image automatic alt text enforcement
- [x] JSON-LD structured data (Organization, Product, Article)
- [x] Sitemap generation with next-sitemap
- [x] Internationalized routing with Next.js i18n

### Performance Excellence (Principle 7)
- [x] Next.js App Router with RSC for optimal performance
- [x] Automatic code splitting and route-based chunking
- [x] Image optimization with next/image (WebP/AVIF)
- [x] Bundle analysis with @next/bundle-analyzer
- [x] Static generation for product/solution pages
- [x] Vercel Edge Network for global CDN

## Scope

### In Scope

**Core Pages & Features:**
- Homepage with hero, featured products, news preview, partners/clients showcase
- Internationalization (English/Japanese) with language switcher
- Product catalog pages (list + individual product details)
- Cloud solutions pages (list + individual solution details)
- "Why Us" company value proposition page
- News section (list + article detail pages)
- Contact form with Slack webhook integration and bot prevention
- Partners showcase section
- Clients showcase section
- Legal pages (Privacy Policy, Terms of Service) - content TBD

**Technical Infrastructure:**
- Next.js 14+ with App Router and Server Components
- TypeScript for type safety
- Tailwind CSS for styling
- shadcn/ui component library
- i18n implementation with next-intl
- Form handling with react-hook-form + zod validation
- Slack webhook for contact form notifications
- Vercel deployment with optimal configurations
- Analytics integration (Vercel Analytics or Google Analytics)
- Error tracking (Vercel monitoring or Sentry)

### Out of Scope

- Content Management System (content managed in code)
- User authentication and accounts
- E-commerce functionality
- Payment processing
- Search functionality (deferred to Phase 2)
- Interactive server configuration tool
- Customer portal
- Real-time chat support
- Video content hosting
- Blog platform beyond basic news section
- Community forum
- Email newsletter platform integration (Phase 2)

## Technical Approach

### Architecture

**Framework:** Next.js 14+ with App Router

**Architecture Pattern:**
- Server Components by default for optimal performance
- Client Components only where interactivity required
- Route-based code splitting for efficient loading
- Static Site Generation (SSG) for content pages
- Server Actions for form submissions
- Edge Functions for API routes when needed

**Current Directory Structure:**
```
ekoi-corp-new/
├── .husky/                              # Git hooks (Husky)
│   ├── commit-msg                       # Commitlint hook
│   ├── post-merge                       # Auto-install dependencies
│   └── pre-commit                       # Lint-staged hook
├── specs/                               # Project specifications
│   └── 001-ekoi-corporate-website/
├── src/
│   ├── app/                             # Next.js App Router
│   │   ├── layout.tsx                   # Root layout
│   │   ├── page.tsx                     # Homepage
│   │   ├── page.module.css              # Page styles
│   │   ├── globals.css                  # Global styles
│   │   └── favicon.ico                  # Favicon
│   └── lib/
│       └── env/                         # T3 Env configuration
│           ├── client.ts                # Client-side env vars
│           └── server.ts                # Server-side env vars
├── public/                              # Static assets
│   └── next.svg
├── workflows/                           # CI/CD workflows
│   └── ci.yml
├── .editorconfig                        # Editor configuration
├── .gitignore                           # Git ignore rules
├── .nvmrc                               # Node version (24)
├── .commitlintrc.json                   # Commit lint config
├── .lintstagedrc.js                     # Lint-staged config
├── .prettierrc.json                     # Prettier config
├── .prettierignore                      # Prettier ignore
├── eslint.config.mjs                    # ESLint config (ESM)
├── next.config.ts                       # Next.js configuration
├── next-env.d.ts                        # Next.js TypeScript defs
├── redirects.ts                         # Redirects configuration
├── renovate.json                        # Dependency updates
├── tsconfig.json                        # TypeScript configuration
├── package.json                         # Dependencies
└── pnpm-lock.yaml                       # pnpm lock file
```

**Target Directory Structure (After Full Implementation):**
```
ekoi-corp-new/
├── src/
│   ├── app/
│   │   ├── [locale]/                    # Internationalized routes
│   │   │   ├── layout.tsx               # Root layout with providers
│   │   │   ├── page.tsx                 # Homepage
│   │   │   ├── products/
│   │   │   │   ├── page.tsx             # Product list
│   │   │   │   └── [slug]/page.tsx      # Product detail
│   │   │   ├── solutions/
│   │   │   │   ├── page.tsx             # Solutions list
│   │   │   │   └── [slug]/page.tsx      # Solution detail
│   │   │   ├── why-us/page.tsx
│   │   │   ├── news/
│   │   │   │   ├── page.tsx             # News list
│   │   │   │   └── [slug]/page.tsx      # Article detail
│   │   │   ├── contact/page.tsx
│   │   │   └── partners/page.tsx
│   │   ├── api/
│   │   │   └── contact/route.ts         # Contact form handler
│   │   └── globals.css                  # Tailwind imports
│   ├── components/
│   │   ├── ui/                          # shadcn/ui components
│   │   ├── layout/                      # Header, Footer, Navigation
│   │   ├── sections/                    # Page sections
│   │   └── forms/                       # Form components
│   ├── lib/
│   │   ├── env/                         # T3 Env configuration
│   │   │   ├── client.ts                # Client-side env vars
│   │   │   └── server.ts                # Server-side env vars
│   │   ├── utils.ts                     # Utility functions
│   │   ├── validations.ts               # Zod schemas
│   │   └── slack.ts                     # Slack integration
│   ├── data/
│   │   ├── products.ts                  # Product data
│   │   ├── solutions.ts                 # Solutions data
│   │   ├── news.ts                      # News articles
│   │   ├── partners.ts                  # Partners data
│   │   └── clients.ts                   # Clients data
│   ├── messages/                        # i18n translation files
│   │   ├── en.json
│   │   └── ja.json
│   └── types/
│       └── index.ts                     # TypeScript type definitions
├── public/
│   ├── assets/                          # Images, logos
│   └── favicon.ico
├── next.config.ts                       # Next.js configuration
├── tailwind.config.ts                   # Tailwind configuration
├── tsconfig.json                        # TypeScript configuration
└── package.json
```

### Key Components

1. **Layout System**
   - Responsive header with navigation and language switcher
   - Persistent footer with sitemap and legal links
   - Breadcrumb navigation for deep pages
   - Mobile hamburger menu with drawer

2. **Internationalization (i18n)**
   - next-intl for translation management
   - Locale detection and routing
   - Language switcher component
   - Translated metadata for SEO
   - Persistent language preference (cookies)

3. **Product Catalog**
   - ProductCard component for list view
   - ProductDetail component with specs and benefits
   - Filter/sort functionality
   - GPU type badges and tags
   - Responsive image gallery

4. **Solutions Showcase**
   - SolutionCard component
   - Partnership detail pages
   - Benefits and integration information
   - Partner logo display with proper attribution

5. **News Section**
   - ArticleCard with featured image
   - Article detail with markdown rendering
   - Category/tag filtering
   - Publication date and metadata
   - Social sharing buttons

6. **Contact Form**
   - FormField components with validation
   - Inquiry type selector
   - Honeypot for bot prevention
   - reCAPTCHA v3 integration
   - Server Action for submission
   - Slack webhook notification
   - Success/error toast feedback

7. **Partners & Clients Showcase**
   - Logo grid with responsive columns
   - Category organization
   - Hover effects and links
   - Lazy loaded images

### Data Model Changes

**No database required.** All data stored as TypeScript/JSON files in `/src/data/`:

**Product Model:**
```typescript
interface Product {
  id: string;
  slug: string;
  name: TranslatedString;
  shortDescription: TranslatedString;
  fullDescription: TranslatedString;
  gpuModel: string; // "A100" | "H100" | "H200" | ...
  gpuCount: number;
  gpuMemoryPerUnit: string;
  gpuInterconnect: string;
  cpuSpecs: string;
  ramCapacity: string;
  storageConfig: string;
  networkSpecs: string;
  useCases: TranslatedString[];
  benefits: TranslatedString[];
  image: string;
  gallery?: string[];
  specifications: Record<string, string>;
  featured?: boolean;
  available: boolean;
  sortOrder: number;
}
```

**Solution Model:**
```typescript
interface Solution {
  id: string;
  slug: string;
  partnerName: string;
  partnerLogo: string;
  partnerUrl?: string;
  solutionName: TranslatedString;
  description: TranslatedString;
  benefits: TranslatedString[];
  integrationDetails: TranslatedString;
  useCases: TranslatedString[];
  featured?: boolean;
  sortOrder: number;
}
```

**News Article Model:**
```typescript
interface NewsArticle {
  id: string;
  slug: string;
  title: TranslatedString;
  excerpt: TranslatedString;
  content: TranslatedString; // Markdown or HTML
  featuredImage: string;
  publishedAt: string; // ISO date
  author?: string;
  category?: string;
  tags?: string[];
}
```

**Partner Model:**
```typescript
interface Partner {
  id: string;
  name: string;
  logo: string;
  website?: string;
  type: "hardware" | "cloud" | "technology";
  description?: TranslatedString;
  sortOrder: number;
}
```

**Client Model:**
```typescript
interface Client {
  id: string;
  name: string;
  logo: string;
  industry?: string;
  testimonial?: TranslatedString;
  caseStudyUrl?: string;
  sortOrder: number;
}
```

**Contact Form Submission:**
```typescript
interface ContactSubmission {
  name: string;
  email: string;
  company: string;
  phone?: string;
  inquiryType: "product" | "partnership" | "general";
  message: string;
  language: string;
  timestamp: string;
  ipAddress?: string;
}
```

### API Changes

**New API Routes:**

1. **POST /api/contact**
   - Handles contact form submissions
   - Validates input with Zod
   - Checks rate limiting (IP-based)
   - Verifies reCAPTCHA token
   - Sends Slack notification
   - Returns success/error response

## Implementation Phases

### Phase 1: Foundation & Core Setup
**Duration:** 2 weeks  
**Status:** ✅ Partially Complete (Base Setup Done)

**Tasks:**
- [x] Initialize Next.js project with TypeScript (via typescript-nextjs-starter)
- [x] Set up ESLint and Prettier
- [x] Configure Husky for git hooks
- [x] Set up commitlint for commit message validation
- [x] Configure lint-staged
- [x] Set up T3 Env for type-safe environment variables
- [x] Configure Content Security Policy (CSP) headers
- [x] Set up redirects configuration
- [x] Configure path aliases (@/* mappings)
- [ ] Configure Tailwind CSS and PostCSS
- [ ] Install and configure shadcn/ui
- [ ] Configure next-intl for internationalization
- [ ] Create base layout components (Header, Footer, Navigation)
- [ ] Implement language switcher
- [ ] Create type definitions for data models
- [ ] Set up Vercel project and preview deployments
- [ ] Create initial translation files (en.json, ja.json)
- [ ] Implement responsive navigation with mobile menu
- [ ] Set up bundle analyzer

**Deliverables:**
- ✅ Working Next.js 16 application structure
- ✅ TypeScript 5.9 configured
- ✅ Code quality tools configured (ESLint, Prettier, Husky)
- ✅ Type-safe environment variable system
- 🔄 Development environment partially configured
- ⏳ Responsive layout with i18n (pending)
- ⏳ CI/CD pipeline on Vercel (pending)

### Phase 2: Homepage & Product Catalog
**Duration:** 2-3 weeks

**Tasks:**
- [ ] Design and implement homepage hero section
- [ ] Create ProductCard component
- [ ] Build product list page with filtering/sorting
- [ ] Create ProductDetail page component
- [ ] Implement GPU specification display
- [ ] Add product data files (JSON/TS)
- [ ] Implement image optimization with next/image
- [ ] Create featured products section for homepage
- [ ] Add breadcrumb navigation
- [ ] Implement SEO metadata for products
- [ ] Add structured data (Product schema)
- [ ] Create responsive product image galleries
- [ ] Test across devices

**Deliverables:**
- Functional homepage
- Product catalog (list + detail pages)
- Optimized images and SEO

### Phase 3: Solutions, News & Content Pages
**Duration:** 2-3 weeks

**Tasks:**
- [ ] Create SolutionCard component
- [ ] Build solutions list page
- [ ] Create solution detail pages
- [ ] Implement partner logo display
- [ ] Create ArticleCard component
- [ ] Build news list page with pagination
- [ ] Create news article detail pages
- [ ] Implement markdown rendering for articles
- [ ] Build "Why Us" page
- [ ] Add partners showcase section
- [ ] Add clients showcase section
- [ ] Create data files for all content
- [ ] Implement category/tag filtering for news
- [ ] Add social sharing buttons
- [ ] Add SEO metadata for all pages
- [ ] Implement structured data (Article, Organization schemas)

**Deliverables:**
- Solutions pages
- News section
- Why Us page
- Partners and clients sections
- Complete content structure

### Phase 4: Contact Form & Integration
**Duration:** 1-2 weeks

**Tasks:**
- [ ] Create ContactForm component with shadcn/ui
- [ ] Implement form validation with react-hook-form + Zod
- [ ] Add inquiry type selector
- [ ] Implement honeypot field for bot prevention
- [ ] Integrate reCAPTCHA v3
- [ ] Create Server Action for form handling
- [ ] Implement rate limiting logic
- [ ] Set up Slack webhook integration
- [ ] Create Slack notification formatter
- [ ] Add success/error toast notifications
- [ ] Implement email validation
- [ ] Add phone number formatting (optional field)
- [ ] Create contact page layout
- [ ] Add loading states during submission
- [ ] Test form validation scenarios
- [ ] Test Slack notifications

**Deliverables:**
- Functional contact form
- Slack integration
- Bot prevention
- Error handling

### Phase 5: SEO, Performance & Polish
**Duration:** 2 weeks

**Tasks:**
- [ ] Implement Next.js Metadata API for all pages
- [ ] Create dynamic sitemap with next-sitemap
- [ ] Add robots.txt configuration
- [ ] Implement hreflang tags for i18n
- [ ] Add Open Graph and Twitter Card metadata
- [ ] Implement JSON-LD structured data
- [ ] Optimize all images (WebP/AVIF)
- [ ] Implement lazy loading for below-fold content
- [ ] Add loading skeletons for async content
- [ ] Configure Vercel caching headers
- [ ] Run Lighthouse audits and optimize
- [ ] Fix any accessibility issues (WCAG AA)
- [ ] Test keyboard navigation
- [ ] Add focus indicators
- [ ] Optimize bundle size
- [ ] Set up Vercel Analytics
- [ ] Configure error tracking
- [ ] Create 404 and 500 error pages
- [ ] Add loading.tsx for Suspense boundaries
- [ ] Final cross-browser testing
- [ ] Mobile device testing

**Deliverables:**
- Lighthouse score ≥90
- Full SEO implementation
- Accessibility compliance
- Performance optimization
- Production-ready application

### Phase 6: Testing, Documentation & Launch
**Duration:** 1-2 weeks

**Tasks:**
- [ ] Write unit tests for utility functions
- [ ] Write integration tests for contact form
- [ ] Set up Playwright for E2E tests
- [ ] Write E2E tests for critical user flows
- [ ] Test language switching thoroughly
- [ ] Test all form validations
- [ ] Security audit (XSS, CSRF, injection)
- [ ] Load testing for contact form
- [ ] Review all translated content
- [ ] Create README documentation
- [ ] Document component usage
- [ ] Document data file formats
- [ ] Create deployment runbook
- [ ] Configure production environment variables
- [ ] Set up custom domain on Vercel
- [ ] Configure DNS and SSL
- [ ] Final production deployment
- [ ] Post-launch monitoring
- [ ] Verify analytics tracking
- [ ] Test Slack notifications in production

**Deliverables:**
- Comprehensive test coverage
- Documentation
- Production launch
- Monitoring setup

## Testing Strategy

### Unit Tests
- **Coverage Target:** ≥80% for utility functions and non-UI logic
- **Framework:** Vitest (fast, Vite-powered)
- **Key Test Cases:**
  - Form validation schemas (Zod)
  - Utility functions (formatting, date handling)
  - Data transformation functions
  - Slack notification formatting
  - Rate limiting logic

### Integration Tests
- **Framework:** React Testing Library
- **Key Test Cases:**
  - Contact form submission flow
  - Language switching
  - Form validation feedback
  - Toast notifications
  - Navigation behavior

### E2E Tests
- **Framework:** Playwright
- **Critical User Flows:**
  - Browse products → View detail → Contact
  - Switch language → Navigate pages (content changes)
  - Fill contact form → Submit → See success
  - Filter products by GPU type
  - Read news article
  - Mobile navigation flow

### Performance Tests
- **Tools:** Lighthouse CI, WebPageTest
- **Validation:**
  - Lighthouse Performance ≥90
  - LCP ≤2.5s
  - FCP ≤1.8s
  - TTI ≤3.8s
  - CLS ≤0.1
  - Bundle size monitoring

### Accessibility Tests
- **Tools:** axe DevTools, WAVE, Pa11y
- **Validation:**
  - WCAG 2.1 Level AA compliance
  - Keyboard navigation
  - Screen reader compatibility
  - Color contrast ratios
  - Focus management

### Cross-browser/Device Testing
- **Browsers:** Chrome, Firefox, Safari, Edge (latest 2 versions)
- **Devices:** 
  - Mobile: iPhone 12/13/14, Samsung Galaxy S21/S22
  - Tablet: iPad Pro, iPad Air
  - Desktop: 1920×1080, 2560×1440, 3840×2160

## Performance Considerations

### Bundle Size Impact
- **Estimated Base Bundle:** ~150-180 KB (gzipped)
  - Next.js runtime: ~85 KB
  - React: ~45 KB
  - Tailwind CSS (purged): ~15 KB
  - shadcn/ui components: ~20 KB
  - next-intl: ~10 KB
  - Other utilities: ~5-10 KB

- **Mitigation Strategies:**
  - Route-based code splitting (automatic)
  - Dynamic imports for heavy components
  - Tree-shaking with ES modules
  - Remove unused Tailwind classes
  - Minimize client-side JavaScript with RSC
  - Use next/dynamic for client components

### Runtime Performance
- **Optimization Techniques:**
  - Server Components for static content
  - Streaming with Suspense
  - Optimistic UI updates
  - Debounced search/filter inputs
  - Virtualization for long lists (if needed)
  - Memoization with React.memo where appropriate
  - CSS containment for large DOM trees

### Network Requests
- **API Strategy:**
  - No external API calls (content in code)
  - Contact form: single POST to /api/contact
  - Slack webhook: server-side only
  - Analytics: async/deferred loading

- **Caching Strategy:**
  - Static pages cached at CDN edge
  - next/image automatic caching
  - Browser cache headers (1 year for static assets)
  - Vercel Edge Network global distribution

### Database Queries
- **Not applicable** - no database. All content from static JSON/TS files.

## Security Considerations

### Authentication/Authorization
- No authentication required
- Contact form is public (protected by rate limiting and bot prevention)

### Data Validation and Sanitization
- Zod schemas for all form inputs
- Server-side validation in Server Actions
- Email format validation
- HTML escaping for all user inputs
- Phone number format validation
- Message length limits (5000 characters)

### XSS, CSRF, Injection Prevention
- Next.js built-in CSRF protection for Server Actions
- Content Security Policy headers
- XSS protection through React's automatic escaping
- No dangerouslySetInnerHTML except for trusted markdown
- Sanitize markdown output with remark/rehype
- Input validation prevents script injection

### Sensitive Data Handling
- Slack webhook URL in environment variables
- reCAPTCHA secret key server-side only
- No PII stored (contact submissions go to Slack)
- IP addresses hashed for rate limiting
- HTTPS enforced by Vercel
- Secure headers (HSTS, X-Frame-Options)

### Rate Limiting
- IP-based rate limiting for contact form
- Maximum 5 submissions per IP per hour
- Implemented in Server Action with simple in-memory store
- Honeypot field for basic bot detection
- reCAPTCHA v3 for advanced bot detection

## Rollout Strategy

### Feature Flags
- Not required for initial launch
- Future consideration for A/B testing features

### A/B Testing
- Not planned for initial launch
- Vercel Edge Config for future A/B tests

### Monitoring
- **Vercel Analytics:** Real User Monitoring (RUM)
- **Core Web Vitals:** Track LCP, FCP, CLS, INP
- **Error Tracking:** Vercel monitoring or Sentry
- **Custom Events:**
  - Contact form submissions
  - Language switches
  - Product page views
  - Download interactions (if any)

### Alerts
- Deployment failures (Vercel notifications)
- Error rate spikes (threshold: >10 errors/hour)
- Performance degradation (Lighthouse score drops below 85)
- Contact form failures

### Rollback Plan
- Vercel instant rollback to previous deployment
- Deployment history maintained (one-click revert)
- Preview deployments for testing before production
- Staging environment for validation

## Dependencies

### External Libraries (Minimal Strategy)

**Currently Installed:**

**Core Framework:**
- next (16.0.0) - React framework
- react (19.2.0) - UI library  
- react-dom (19.2.0) - React DOM renderer

**Validation & Type Safety:**
- zod (4.1.12) - Schema validation
- @t3-oss/env-nextjs (0.13.8) - Type-safe environment variables

**Development Tools:**
- typescript (5.9.3) - Type safety
- eslint (9.38.0) - Linting
- eslint-config-next (16.0.0) - Next.js ESLint config
- eslint-config-prettier (10.1.8) - Prettier + ESLint integration
- eslint-plugin-prettier (5.5.4) - Prettier as ESLint rule
- prettier (3.6.2) - Code formatting
- @ianvs/prettier-plugin-sort-imports (4.7.0) - Import sorting
- prettier-plugin-sort-json (4.1.1) - JSON sorting
- typescript-eslint (8.46.2) - TypeScript ESLint

**Git & Commit Tools:**
- husky (9.1.7) - Git hooks
- lint-staged (16.2.5) - Staged files linting
- @commitlint/cli (20.1.0) - Commit message linting
- @commitlint/config-conventional (20.0.0) - Conventional commits

**React Compiler:**
- babel-plugin-react-compiler (1.0.0) - React compiler plugin

**To Be Added:**

**Styling:**
- tailwindcss (3.x) - Utility-first CSS
- @tailwindcss/typography - Typography plugin
- tailwind-merge - Merge Tailwind classes
- clsx - Conditional classnames
- postcss - CSS processing
- autoprefixer - CSS vendor prefixes

**UI Components:**
- @radix-ui/* - Headless UI primitives (via shadcn/ui)
- lucide-react - Icon library
- class-variance-authority - Variant management
- tailwind-merge - Class merging

**Forms:**
- react-hook-form (7.x) - Form state management
- @hookform/resolvers - react-hook-form + Zod integration

**Internationalization:**
- next-intl (3.x) - i18n for Next.js

**Utilities:**
- date-fns - Date formatting/manipulation
- @vercel/analytics - Vercel Analytics (optional)

**Development:**
- @next/bundle-analyzer - Bundle analysis

**Testing (Phase 6):**
- vitest - Unit testing
- @testing-library/react - Component testing
- @playwright/test - E2E testing

**Current package count:** ~20 packages  
**Estimated final count:** ~35-40 packages (minimal for feature scope)

### Team Dependencies
- Content team for English and Japanese translations
- Design input for brand colors and imagery
- Product team for server specifications
- Marketing for partner/client logos and permissions
- DevOps for Slack webhook URL

### Infrastructure Requirements
- Vercel account (Hobby or Pro tier)
- Custom domain and DNS access
- Slack workspace and webhook URL
- Google reCAPTCHA v3 keys
- GitHub repository for CI/CD

## Risks & Mitigations

| Risk | Impact | Likelihood | Mitigation |
|------|--------|------------|------------|
| Translation quality issues | High | Medium | Engage native Japanese speaker for review; create translation style guide; use professional translator |
| Performance degradation with content growth | Medium | Medium | Implement pagination early; use ISR for dynamic content; monitor bundle size continuously |
| Slack webhook failures | Medium | Low | Implement retry logic; log failed submissions; email fallback; monitor webhook health |
| Bot spam on contact form | High | High | Multi-layered protection: honeypot + reCAPTCHA v3 + rate limiting; monitor spam patterns |
| SEO competition with established players | Medium | High | Focus on long-tail keywords; create detailed technical content; optimize for Japanese market specifically |
| Content maintenance complexity | Medium | Medium | Create clear documentation for content updates; use TypeScript for type safety; implement content validation |
| Browser compatibility issues | Low | Low | Test early and often; use PostCSS autoprefixer; follow Next.js browser support guidelines |
| Vercel cost overruns | Low | Low | Monitor bandwidth and function invocations; optimize image sizes; implement efficient caching |
| Accessibility gaps | Medium | Low | Use shadcn/ui accessible components; automated testing; manual keyboard testing; screen reader validation |
| Timeline delays from content creation | High | Medium | Start with placeholder content; parallelize development and content creation; establish clear content deadlines |

## Documentation Requirements

### Code Documentation
- [x] TypeScript types for all data models
- [x] JSDoc comments for complex utilities
- [x] Component prop types documented
- [x] Server Action documentation

### Component Documentation
- [ ] shadcn/ui components usage guide
- [ ] Custom component library documentation
- [ ] Storybook for component showcase (optional)

### User-Facing Documentation
- [ ] Contact page instructions
- [ ] Privacy Policy (legal content required)
- [ ] Terms of Service (legal content required)

### Developer Documentation
- [ ] README with setup instructions
- [ ] Environment variables documentation
- [ ] Content update guide
- [ ] Translation workflow guide
- [ ] Deployment guide
- [ ] Troubleshooting common issues

### API Documentation
- [ ] Contact API endpoint specification
- [ ] Slack webhook payload format
- [ ] Rate limiting documentation

## Success Metrics

### Performance Metrics
- **Lighthouse Performance Score:** Target ≥90, Baseline TBD after Phase 2
- **Largest Contentful Paint (LCP):** Target ≤2.5s
- **First Contentful Paint (FCP):** Target ≤1.8s
- **Time to Interactive (TTI):** Target ≤3.8s
- **Cumulative Layout Shift (CLS):** Target ≤0.1
- **Bundle Size:** Target <200 KB gzipped initial load

### Engagement Metrics
- **Average Session Duration:** Target ≥3 minutes
- **Bounce Rate:** Target <50%
- **Pages per Session:** Target ≥2.5
- **Product Detail Page Views:** Track engagement per product
- **News Article Completion Rate:** Target ≥60% scroll to end

### Conversion Metrics
- **Contact Form Submission Rate:** Target 2-3% of visitors
- **Form Completion Rate:** Target ≥70% (started vs completed)
- **Spam Submission Rate:** Target <5% of total submissions
- **Language Distribution:** Track EN vs JA usage

### SEO Metrics
- **Organic Traffic:** Target 10,000 monthly visitors within 6 months
- **Keywords Ranking:** Target 20+ keywords in top 10 within 6 months
- **Mobile-Friendly Test:** Pass
- **Core Web Vitals:** Pass "Good" thresholds

### Technical Metrics
- **Deployment Success Rate:** Target 100%
- **Uptime:** Target 99.9%
- **Error Rate:** Target <0.1%
- **Slack Notification Success Rate:** Target 99%

---

**Approval Signatures:**
- Technical Lead: _______________
- Product Owner: _______________
- Date: _______________
