# Technical Research: EKOI Corporate Website

**Date:** 2025-10-21  
**Status:** Completed

## Overview

This document consolidates technical research and decision-making for the EKOI corporate website implementation. All technology choices align with the project requirements for minimal dependencies, optimal performance, and Vercel deployment best practices.

---

## Core Technology Decisions

### 1. Framework: Next.js 14+ with App Router

**Decision:** Use Next.js 14.x with the App Router paradigm

**Rationale:**
- **Server Components:** Default RSC significantly reduces client-side JavaScript, improving performance and SEO
- **Built-in Optimization:** Automatic code splitting, image optimization, font optimization
- **Internationalization:** Native i18n routing support with middleware
- **Vercel Integration:** First-class support, optimal deployment, Edge Functions
- **SEO Excellence:** Server-side rendering, static generation, and metadata API for superior SEO
- **Developer Experience:** File-based routing, TypeScript support, Fast Refresh

**Alternatives Considered:**
- **Remix:** Excellent performance but less mature ecosystem for i18n
- **Astro:** Great for content sites but less flexible for dynamic features
- **Gatsby:** Static site generator but heavier build times and less flexible
- **Create React App:** No SSR/SSG capabilities, poor SEO out of box

**Best Practices for Vercel:**
- Use ISR (Incremental Static Regeneration) for semi-dynamic content
- Leverage Edge Functions for API routes requiring low latency
- Enable automatic static optimization
- Use Vercel Analytics for performance monitoring
- Configure caching headers appropriately
- Use Vercel Image Optimization (next/image)

---

### 2. Styling: Tailwind CSS

**Decision:** Use Tailwind CSS 3.x with JIT compiler

**Rationale:**
- **Minimal Bundle:** Purges unused styles, typically <15 KB gzipped
- **Developer Velocity:** Utility-first approach speeds development
- **Responsive Design:** Mobile-first breakpoints align with constitutional requirements
- **Consistency:** Design tokens prevent style drift
- **Performance:** Zero runtime, compiled at build time
- **shadcn/ui Compatibility:** Required for component library

**Alternatives Considered:**
- **CSS Modules:** More verbose, harder to maintain consistency
- **Styled Components:** Runtime cost, larger bundle size
- **Vanilla CSS:** Maintenance overhead, inconsistency risk
- **Emotion:** Runtime overhead, not needed for static content

**Configuration Best Practices:**
```javascript
// tailwind.config.js
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        // EKOI brand colors
      },
      fontFamily: {
        // System fonts for performance
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'), // For markdown content
  ],
}
```

---

### 3. Component Library: shadcn/ui

**Decision:** Use shadcn/ui for UI component foundation

**Rationale:**
- **Copy-Paste Architecture:** Components are copied into project, no runtime dependency
- **Full Customization:** Complete control over component code
- **Radix UI Primitives:** Built on accessible, unstyled primitives
- **Tailwind Integration:** Designed specifically for Tailwind CSS
- **TypeScript Native:** Full type safety
- **Minimal Footprint:** Only includes components you use
- **Accessibility:** WCAG 2.1 AA compliant out of box

**Alternatives Considered:**
- **Material UI:** Too heavy (~400 KB), opinionated design
- **Chakra UI:** Runtime styling, larger bundle
- **Ant Design:** Not minimal, harder to customize deeply
- **Headless UI:** Lower-level, more work required

**Components to Use:**
- Button, Input, Textarea, Select - Forms
- Dialog, Sheet - Modals and drawers
- Toast - Notifications
- Accordion, Collapsible - Disclosure widgets
- Badge, Card - Content display
- NavigationMenu, DropdownMenu - Navigation

---

### 4. Internationalization: next-intl

**Decision:** Use next-intl for translation management

**Rationale:**
- **Next.js Native:** Designed specifically for Next.js App Router
- **Type Safety:** TypeScript support for translations
- **Server Components:** Works seamlessly with RSC
- **Performance:** Zero client-side JavaScript for translations
- **Developer Experience:** Simple JSON translation files
- **Metadata Support:** Translate SEO metadata easily

**Alternatives Considered:**
- **next-i18next:** Older, designed for Pages Router
- **react-intl:** More complex setup, heavier
- **Format.js:** Lower-level, more setup required
- **i18next:** General-purpose but heavier for our needs

**Implementation Pattern:**
```typescript
// app/[locale]/layout.tsx
import {NextIntlClientProvider} from 'next-intl';
import {notFound} from 'next/navigation';

export default async function LocaleLayout({
  children,
  params: {locale}
}: {
  children: React.ReactNode;
  params: {locale: string};
}) {
  let messages;
  try {
    messages = (await import(`@/messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
```

---

### 5. Form Handling: react-hook-form + Zod

**Decision:** Use react-hook-form with Zod validation

**Rationale:**
- **Performance:** Minimal re-renders, uncontrolled components
- **Type Safety:** Zod schema provides runtime and compile-time types
- **Bundle Size:** ~9 KB (react-hook-form) + 8 KB (Zod)
- **Developer Experience:** Simple API, great TypeScript support
- **Validation:** Synchronous and asynchronous validation support
- **Accessibility:** Built-in error handling integration

**Alternatives Considered:**
- **Formik:** Heavier (~15 KB), more complex API
- **React Final Form:** Good but less TypeScript support
- **Native Forms:** More manual work, no type safety
- **Server Actions Only:** Need client-side validation for UX

**Validation Schema Example:**
```typescript
import {z} from 'zod';

export const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  company: z.string().min(2, 'Company name required'),
  phone: z.string().optional(),
  inquiryType: z.enum(['product', 'partnership', 'general']),
  message: z.string().min(10).max(5000),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
```

---

### 6. Bot Prevention Strategy

**Decision:** Multi-layered approach: Honeypot + reCAPTCHA v3 + Rate Limiting

**Rationale:**
- **Honeypot:** Simple, zero user friction, catches basic bots
- **reCAPTCHA v3:** Invisible to users, scores submissions
- **Rate Limiting:** IP-based throttling prevents abuse
- **Defense in Depth:** Multiple layers catch different bot types

**Alternatives Considered:**
- **reCAPTCHA v2:** Checkbox or image challenges annoy users
- **hCaptcha:** Similar to reCAPTCHA but different provider
- **Cloudflare Turnstile:** Good but adds dependency
- **Custom Challenge:** Too much work, easily bypassed

**Implementation Strategy:**

1. **Honeypot Field:**
```typescript
// Hidden field in form
<input
  type="text"
  name="website"
  tabIndex={-1}
  autoComplete="off"
  className="hidden"
  aria-hidden="true"
/>
```

2. **reCAPTCHA v3:**
```typescript
// Client-side token generation
const token = await grecaptcha.execute('SITE_KEY', {action: 'submit'});

// Server-side verification
const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
  method: 'POST',
  body: new URLSearchParams({
    secret: process.env.RECAPTCHA_SECRET_KEY!,
    response: token,
  }),
});
```

3. **Rate Limiting:**
```typescript
// Simple in-memory store (for single instance)
// For production at scale, use Vercel KV or Upstash
const submissionMap = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const submissions = submissionMap.get(ip) || [];
  const recentSubmissions = submissions.filter(
    time => now - time < 60 * 60 * 1000 // 1 hour
  );
  
  if (recentSubmissions.length >= 5) return true;
  
  submissionMap.set(ip, [...recentSubmissions, now]);
  return false;
}
```

---

### 7. Slack Integration

**Decision:** Use Slack Incoming Webhooks for contact form notifications

**Rationale:**
- **Simple:** Single HTTPS POST request, no SDK needed
- **Reliable:** Slack webhooks are highly available
- **Customizable:** Rich message formatting with Block Kit
- **Zero Dependencies:** Native fetch API sufficient
- **Fast:** Async, doesn't block user response

**Alternatives Considered:**
- **Email:** Requires SMTP configuration, more complex
- **Slack API:** Overkill for simple notifications
- **Third-party Services:** (Zapier, n8n) Unnecessary complexity
- **Database Storage:** Requires database, management overhead

**Webhook Implementation:**
```typescript
// lib/slack.ts
export async function sendSlackNotification(data: ContactFormData) {
  const webhookUrl = process.env.SLACK_WEBHOOK_URL;
  
  if (!webhookUrl) {
    console.error('Slack webhook URL not configured');
    return false;
  }

  const message = {
    blocks: [
      {
        type: 'header',
        text: {
          type: 'plain_text',
          text: '🔔 New Contact Form Submission',
        },
      },
      {
        type: 'section',
        fields: [
          {type: 'mrkdwn', text: `*Name:*\n${data.name}`},
          {type: 'mrkdwn', text: `*Email:*\n${data.email}`},
          {type: 'mrkdwn', text: `*Company:*\n${data.company}`},
          {type: 'mrkdwn', text: `*Type:*\n${data.inquiryType}`},
        ],
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `*Message:*\n${data.message}`,
        },
      },
    ],
  };

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(message),
    });
    
    return response.ok;
  } catch (error) {
    console.error('Slack notification failed:', error);
    return false;
  }
}
```

---

### 8. Image Optimization Strategy

**Decision:** Use next/image with Vercel Image Optimization

**Rationale:**
- **Automatic Formats:** Serves WebP/AVIF to supporting browsers
- **Responsive:** Generates multiple sizes automatically
- **Lazy Loading:** Built-in lazy loading with IntersectionObserver
- **CDN Caching:** Images cached at Vercel's edge network
- **Zero Configuration:** Works out of box on Vercel
- **Blur Placeholders:** Prevents layout shift

**Alternatives Considered:**
- **Manual Optimization:** Too much work, human error prone
- **Cloudinary:** External service, additional cost
- **imgix:** External service, additional cost
- **Static WebP:** Doesn't adapt to browser capabilities

**Implementation Best Practices:**
```typescript
import Image from 'next/image';

// For static imports
import heroImage from '@/public/assets/hero.jpg';

<Image
  src={heroImage}
  alt="AI GPU Servers"
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  priority // For above-fold images
  placeholder="blur" // Automatic blur with static imports
/>

// For dynamic images
<Image
  src="/assets/products/h100-server.jpg"
  alt="H100 GPU Server"
  width={800}
  height={600}
  sizes="(max-width: 768px) 100vw, 800px"
  loading="lazy"
/>
```

**Image Organization:**
```
public/
├── assets/
│   ├── hero/
│   ├── products/
│   ├── partners/
│   ├── clients/
│   └── news/
└── favicon.ico
```

---

### 9. Content Management Strategy

**Decision:** Code-based content using TypeScript files with type safety

**Rationale:**
- **No CMS Overhead:** No additional infrastructure or cost
- **Version Controlled:** All content tracked in Git
- **Type Safe:** TypeScript ensures data consistency
- **Fast Builds:** No external API calls during build
- **Simple Updates:** Edit code, commit, deploy
- **Preview:** Vercel preview deployments for content changes

**Content File Structure:**
```typescript
// src/data/products.ts
import {Product} from '@/types';

export const products: Product[] = [
  {
    id: 'h100-server-8gpu',
    slug: 'h100-8gpu-server',
    name: {
      en: 'H100 8-GPU Server',
      ja: 'H100 8-GPU サーバー',
    },
    shortDescription: {
      en: 'High-performance AI training server with 8x NVIDIA H100 GPUs',
      ja: '8基のNVIDIA H100 GPUを搭載した高性能AIトレーニングサーバー',
    },
    // ... more fields
  },
  // ... more products
];
```

**Content Update Workflow:**
1. Edit data file in `src/data/`
2. Run TypeScript type check
3. Test locally with `npm run dev`
4. Commit and push to GitHub
5. Vercel auto-deploys to preview
6. Review preview deployment
7. Merge to main for production

---

### 10. SEO Implementation Strategy

**Decision:** Use Next.js Metadata API + next-sitemap + JSON-LD

**Rationale:**
- **Native Support:** Metadata API is built into Next.js App Router
- **Type Safe:** TypeScript for metadata objects
- **Dynamic:** Generate metadata per page
- **Sitemap:** Automatic sitemap generation with next-sitemap
- **Structured Data:** JSON-LD for rich search results

**Metadata Implementation:**
```typescript
// app/[locale]/products/[slug]/page.tsx
import {Metadata} from 'next';

export async function generateMetadata({
  params,
}: {
  params: {locale: string; slug: string};
}): Promise<Metadata> {
  const product = getProductBySlug(params.slug);
  const t = await getTranslations(params.locale);
  
  return {
    title: `${product.name[params.locale]} | EKOI`,
    description: product.shortDescription[params.locale],
    openGraph: {
      title: product.name[params.locale],
      description: product.shortDescription[params.locale],
      images: [product.image],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: product.name[params.locale],
      description: product.shortDescription[params.locale],
      images: [product.image],
    },
    alternates: {
      canonical: `https://ekoi.com/en/products/${params.slug}`,
      languages: {
        en: `/en/products/${params.slug}`,
        ja: `/ja/products/${params.slug}`,
      },
    },
  };
}
```

**Structured Data:**
```typescript
// Add to page component
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: product.name.en,
      description: product.shortDescription.en,
      image: product.image,
      // ... more Product schema properties
    }),
  }}
/>
```

---

### 11. Testing Strategy

**Decision:** Vitest for unit, React Testing Library for integration, Playwright for E2E

**Rationale:**
- **Vitest:** Fast (Vite-powered), great DX, compatible with Next.js
- **React Testing Library:** Best practices, focuses on user behavior
- **Playwright:** Cross-browser, reliable, great for E2E

**Test Organization:**
```
src/
├── components/
│   ├── ContactForm.tsx
│   └── ContactForm.test.tsx
├── lib/
│   ├── utils.ts
│   └── utils.test.ts
└── __tests__/
    └── e2e/
        ├── contact-flow.spec.ts
        └── language-switch.spec.ts
```

---

### 12. Error Tracking and Monitoring

**Decision:** Vercel Analytics + Vercel monitoring (or Sentry)

**Rationale:**
- **Vercel Analytics:** Built-in, zero config, privacy-friendly
- **Vercel Monitoring:** Error tracking included in Pro plan
- **Sentry:** More features if needed, easy integration

**Implementation:**
```typescript
// app/layout.tsx
import {Analytics} from '@vercel/analytics/react';

export default function RootLayout({children}) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

---

## Dependency Justification

Each dependency chosen provides significant value while maintaining minimal bundle size:

| Package | Size | Purpose | Alternatives |
|---------|------|---------|--------------|
| next | ~85 KB | Framework, routing, optimization | Remix, Astro |
| react | ~45 KB | UI library | Vue, Svelte |
| tailwindcss | ~15 KB | Styling | CSS Modules |
| react-hook-form | ~9 KB | Form state | Formik |
| zod | ~8 KB | Validation | Yup, Joi |
| next-intl | ~10 KB | i18n | next-i18next |
| @radix-ui/* | ~20 KB | UI primitives | Headless UI |
| lucide-react | ~2 KB | Icons | Heroicons |

**Total Core Bundle:** ~180-200 KB gzipped

---

## Performance Optimization Checklist

- [x] Server Components for static content
- [x] Route-based code splitting (automatic)
- [x] Image optimization with next/image
- [x] Font optimization with next/font
- [x] Minimal client-side JavaScript
- [x] Static generation for content pages
- [x] Tailwind CSS purging
- [x] Bundle analysis configured
- [x] Vercel Edge Network (automatic)
- [x] Proper cache headers
- [x] Lazy loading below fold
- [x] Suspense boundaries for async content

---

## Security Checklist

- [x] HTTPS enforced (Vercel automatic)
- [x] Content Security Policy headers
- [x] Input validation (Zod schemas)
- [x] XSS protection (React escaping)
- [x] CSRF protection (Server Actions)
- [x] Rate limiting (IP-based)
- [x] Bot prevention (multi-layer)
- [x] Environment variables for secrets
- [x] No sensitive data in client bundle
- [x] Secure headers configuration

---

## Deployment Checklist for Vercel

- [ ] Connect GitHub repository
- [ ] Configure environment variables:
  - `NEXT_PUBLIC_RECAPTCHA_SITE_KEY`
  - `RECAPTCHA_SECRET_KEY`
  - `SLACK_WEBHOOK_URL`
- [ ] Set up custom domain
- [ ] Configure DNS records
- [ ] Enable Vercel Analytics
- [ ] Set up deployment notifications
- [ ] Configure branch deployments (main → production)
- [ ] Test preview deployments
- [ ] Review build logs
- [ ] Verify environment-specific configs

---

## Conclusion

All technology choices have been validated against:
1. ✅ Minimal dependencies requirement
2. ✅ Constitutional principles (all 7)
3. ✅ Performance requirements (Lighthouse ≥90)
4. ✅ SEO optimization requirements
5. ✅ Vercel best practices
6. ✅ Developer experience
7. ✅ Maintainability and scalability

The selected stack provides optimal balance of performance, developer experience, and feature completeness while maintaining a minimal footprint.

