# Data Model: EKOI Corporate Website

**Date:** 2025-10-21  
**Status:** Approved

## Overview

This document defines the complete data model for the EKOI corporate website. Since there is no database, all data is stored as TypeScript/JSON files in the codebase under `/src/data/`. Each entity is fully typed with TypeScript for compile-time validation.

---

## Core Entities

### 1. Product (GPU Server)

Represents an AI GPU server configuration available for purchase.

```typescript
interface TranslatedString {
  en: string;
  ja: string;
}

interface Product {
  // Identification
  id: string;                              // Unique identifier (e.g., "h100-8gpu-001")
  slug: string;                            // URL-friendly slug (e.g., "h100-8gpu-server")
  
  // Basic Information
  name: TranslatedString;                  // Product name
  shortDescription: TranslatedString;      // Brief description (1-2 sentences)
  fullDescription: TranslatedString;       // Detailed description (paragraph)
  
  // GPU Specifications
  gpuModel: string;                        // GPU model (e.g., "H100", "A100", "H200")
  gpuCount: number;                        // Number of GPUs
  gpuMemoryPerUnit: string;                // Memory per GPU (e.g., "80GB")
  gpuInterconnect: string;                 // Interconnect technology (e.g., "NVLink 4.0")
  
  // Server Specifications
  cpuSpecs: string;                        // CPU details (e.g., "2x AMD EPYC 9654")
  ramCapacity: string;                     // RAM (e.g., "2TB DDR5")
  storageConfig: string;                   // Storage (e.g., "4x 3.84TB NVMe SSD")
  networkSpecs: string;                    // Network (e.g., "2x 200GbE")
  
  // Use Case Information
  useCases: TranslatedString[];            // Primary use cases
  benefits: TranslatedString[];            // Key benefits/advantages
  
  // Media
  image: string;                           // Primary product image path
  gallery?: string[];                      // Additional images (optional)
  
  // Metadata
  specifications: Record<string, string>;  // Detailed specs as key-value pairs
  featured?: boolean;                      // Show on homepage
  available: boolean;                      // Availability status
  sortOrder: number;                       // Display order (lower = higher priority)
  
  // SEO (optional overrides)
  seoTitle?: TranslatedString;
  seoDescription?: TranslatedString;
}
```

**Example Data:**

```typescript
{
  id: "h100-8gpu-001",
  slug: "h100-8gpu-server",
  name: {
    en: "H100 8-GPU Training Server",
    ja: "H100 8-GPU トレーニングサーバー"
  },
  shortDescription: {
    en: "Enterprise-grade AI training server with 8x NVIDIA H100 GPUs for large-scale model development",
    ja: "大規模モデル開発のための8基のNVIDIA H100 GPUを搭載したエンタープライズグレードAIトレーニングサーバー"
  },
  fullDescription: {
    en: "Our flagship H100 8-GPU server delivers unprecedented training performance...",
    ja: "フラッグシップのH100 8-GPUサーバーは、前例のないトレーニングパフォーマンスを提供します..."
  },
  gpuModel: "H100",
  gpuCount: 8,
  gpuMemoryPerUnit: "80GB",
  gpuInterconnect: "NVLink 4.0 (900GB/s per GPU)",
  cpuSpecs: "2x AMD EPYC 9654 (96 cores total)",
  ramCapacity: "2TB DDR5 ECC",
  storageConfig: "4x 3.84TB NVMe SSD RAID 10",
  networkSpecs: "2x 200GbE QSFP56",
  useCases: [
    {
      en: "Large Language Model (LLM) training",
      ja: "大規模言語モデル（LLM）トレーニング"
    },
    {
      en: "Computer vision model development",
      ja: "コンピュータビジョンモデル開発"
    }
  ],
  benefits: [
    {
      en: "3x faster training vs. A100",
      ja: "A100と比較して3倍高速なトレーニング"
    }
  ],
  image: "/assets/products/h100-8gpu.jpg",
  specifications: {
    "GPU Architecture": "NVIDIA Hopper",
    "Tensor Core Gen": "4th Generation",
    "FP8 Performance": "3,958 TFLOPS",
    "Power Consumption": "10.5 kW",
    "Rack Units": "4U"
  },
  featured: true,
  available: true,
  sortOrder: 10
}
```

**Validation Rules:**
- `id` must be unique
- `slug` must be URL-safe and unique
- `gpuCount` must be positive integer
- `sortOrder` must be positive integer
- `name`, `shortDescription`, `fullDescription` must have both `en` and `ja`
- `image` must be valid path
- `available` defaults to `true`

---

### 2. Solution (Cloud Partnership)

Represents a cloud service partnership and solution offering.

```typescript
interface Solution {
  // Identification
  id: string;                              // Unique identifier
  slug: string;                            // URL-friendly slug
  
  // Partner Information
  partnerName: string;                     // Partner company name
  partnerLogo: string;                     // Logo image path
  partnerUrl?: string;                     // Partner website (optional)
  partnerType: "cloud" | "colocation" | "network"; // Partner category
  
  // Solution Information
  solutionName: TranslatedString;          // Solution name
  description: TranslatedString;           // Detailed description
  benefits: TranslatedString[];            // Key benefits
  integrationDetails: TranslatedString;    // How it integrates
  useCases: TranslatedString[];            // Use cases
  
  // Media
  image?: string;                          // Solution diagram/image (optional)
  
  // Metadata
  featured?: boolean;                      // Show on homepage
  sortOrder: number;                       // Display order
  
  // SEO (optional overrides)
  seoTitle?: TranslatedString;
  seoDescription?: TranslatedString;
}
```

**Example Data:**

```typescript
{
  id: "aws-partnership",
  slug: "aws-cloud-integration",
  partnerName: "Amazon Web Services",
  partnerLogo: "/assets/partners/aws-logo.svg",
  partnerUrl: "https://aws.amazon.com",
  partnerType: "cloud",
  solutionName: {
    en: "AWS Direct Connect Integration",
    ja: "AWS Direct Connect 統合"
  },
  description: {
    en: "Seamless integration with AWS services through dedicated network connections...",
    ja: "専用ネットワーク接続を介したAWSサービスとのシームレスな統合..."
  },
  benefits: [
    {
      en: "Low-latency access to AWS services",
      ja: "AWSサービスへの低遅延アクセス"
    }
  ],
  integrationDetails: {
    en: "Direct fiber connections to AWS regions in Tokyo and Virginia...",
    ja: "東京とバージニアのAWSリージョンへの直接ファイバー接続..."
  },
  useCases: [
    {
      en: "Hybrid cloud AI workflows",
      ja: "ハイブリッドクラウドAIワークフロー"
    }
  ],
  featured: true,
  sortOrder: 10
}
```

**Validation Rules:**
- `id` and `slug` must be unique
- `partnerName` and `partnerLogo` are required
- `partnerType` must be valid enum value
- All `TranslatedString` must have both locales

---

### 3. NewsArticle

Represents a news article or company announcement.

```typescript
interface NewsArticle {
  // Identification
  id: string;                              // Unique identifier
  slug: string;                            // URL-friendly slug
  
  // Content
  title: TranslatedString;                 // Article title
  excerpt: TranslatedString;               // Short summary
  content: TranslatedString;               // Full article content (markdown)
  
  // Media
  featuredImage: string;                   // Main article image
  
  // Metadata
  publishedAt: string;                     // ISO 8601 date
  author?: string;                         // Author name (optional)
  category?: string;                       // Category (e.g., "Product Launch")
  tags?: string[];                         // Tags for filtering
  
  // SEO (optional overrides)
  seoTitle?: TranslatedString;
  seoDescription?: TranslatedString;
}
```

**Example Data:**

```typescript
{
  id: "h200-launch-2024",
  slug: "h200-gpu-servers-now-available",
  title: {
    en: "EKOI Launches H200 GPU Servers for Advanced AI Workloads",
    ja: "EKOI、高度なAIワークロード向けH200 GPUサーバーを発表"
  },
  excerpt: {
    en: "New H200-powered servers offer 2x memory bandwidth for next-generation AI models",
    ja: "新しいH200搭載サーバーは、次世代AIモデルのために2倍のメモリ帯域幅を提供"
  },
  content: {
    en: "# EKOI Announces H200 GPU Servers\n\nTokyo, Japan - October 21, 2025...",
    ja: "# EKOI、H200 GPUサーバーを発表\n\n日本、東京 - 2025年10月21日..."
  },
  featuredImage: "/assets/news/h200-launch.jpg",
  publishedAt: "2025-10-21T09:00:00Z",
  author: "EKOI Communications Team",
  category: "Product Launch",
  tags: ["H200", "GPU", "AI Infrastructure"]
}
```

**Validation Rules:**
- `id` and `slug` must be unique
- `publishedAt` must be valid ISO 8601 date
- `featuredImage` must be valid path
- `content` supports markdown formatting
- Articles sorted by `publishedAt` (newest first)

---

### 4. Partner

Represents a business partner (hardware manufacturers, technology partners).

```typescript
interface Partner {
  // Identification
  id: string;                              // Unique identifier
  
  // Partner Information
  name: string;                            // Partner name
  logo: string;                            // Logo image path
  website?: string;                        // Partner website (optional)
  type: "hardware" | "cloud" | "technology"; // Partner category
  
  // Optional Details
  description?: TranslatedString;          // Brief description (optional)
  
  // Metadata
  sortOrder: number;                       // Display order
}
```

**Example Data:**

```typescript
{
  id: "nvidia",
  name: "NVIDIA",
  logo: "/assets/partners/nvidia-logo.svg",
  website: "https://nvidia.com",
  type: "hardware",
  description: {
    en: "Leading GPU manufacturer and AI computing platform provider",
    ja: "大手GPUメーカーおよびAIコンピューティングプラットフォームプロバイダー"
  },
  sortOrder: 10
}
```

**Validation Rules:**
- `id` must be unique
- `logo` must be valid path
- `type` must be valid enum value
- Partners grouped by `type` and sorted by `sortOrder`

---

### 5. Client

Represents a customer/client (displayed with permission).

```typescript
interface Client {
  // Identification
  id: string;                              // Unique identifier
  
  // Client Information
  name: string;                            // Client name
  logo: string;                            // Logo image path
  industry?: string;                       // Industry/sector (optional)
  
  // Optional Content
  testimonial?: TranslatedString;          // Client testimonial (optional)
  caseStudyUrl?: string;                   // Link to case study (optional)
  
  // Metadata
  sortOrder: number;                       // Display order
}
```

**Example Data:**

```typescript
{
  id: "acme-research",
  name: "Acme Research Institute",
  logo: "/assets/clients/acme-logo.svg",
  industry: "Research & Development",
  testimonial: {
    en: "EKOI's infrastructure accelerated our AI research by 10x",
    ja: "EKOIのインフラストラクチャにより、AI研究が10倍加速しました"
  },
  sortOrder: 10
}
```

**Validation Rules:**
- `id` must be unique
- `logo` must be valid path
- Display requires client permission
- Sorted by `sortOrder`

---

### 6. ContactSubmission

Represents a contact form submission (transient, not stored).

```typescript
interface ContactSubmission {
  // User Information
  name: string;                            // Full name (2-100 chars)
  email: string;                           // Email address (validated)
  company: string;                         // Company name (2-200 chars)
  phone?: string;                          // Phone number (optional, E.164 format)
  
  // Inquiry Information
  inquiryType: "product" | "partnership" | "general"; // Inquiry category
  message: string;                         // Message content (10-5000 chars)
  
  // Metadata (server-side)
  language: string;                        // Form language (en | ja)
  timestamp: string;                       // Submission time (ISO 8601)
  ipAddress?: string;                      // Client IP (for rate limiting, hashed)
  recaptchaToken?: string;                 // reCAPTCHA v3 token
  
  // Honeypot (server-side validation)
  website?: string;                        // Honeypot field (should be empty)
}
```

**Validation Schema (Zod):**

```typescript
import {z} from 'zod';

export const contactFormSchema = z.object({
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters')
    .regex(/^[a-zA-Z\s\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]+$/, 'Name contains invalid characters'),
  
  email: z.string()
    .email('Invalid email address')
    .max(255, 'Email too long'),
  
  company: z.string()
    .min(2, 'Company name must be at least 2 characters')
    .max(200, 'Company name too long'),
  
  phone: z.string()
    .regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number format')
    .optional()
    .or(z.literal('')),
  
  inquiryType: z.enum(['product', 'partnership', 'general'], {
    required_error: 'Please select an inquiry type',
  }),
  
  message: z.string()
    .min(10, 'Message must be at least 10 characters')
    .max(5000, 'Message must be less than 5000 characters'),
  
  // Honeypot (client submits but should be empty)
  website: z.string().optional(),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
```

**Processing Rules:**
- Honeypot field (`website`) must be empty or submission rejected
- Rate limit: Maximum 5 submissions per IP per hour
- reCAPTCHA v3 score must be ≥0.5
- All fields sanitized before sending to Slack
- No storage of submissions (sent directly to Slack)

---

## Data File Organization

```
src/data/
├── products.ts          # Product[] export
├── solutions.ts         # Solution[] export
├── news.ts              # NewsArticle[] export
├── partners.ts          # Partner[] export
└── clients.ts           # Client[] export
```

**Example Structure:**

```typescript
// src/data/products.ts
import {Product} from '@/types';

export const products: Product[] = [
  {
    id: 'h100-8gpu-001',
    // ... full product data
  },
  {
    id: 'a100-8gpu-001',
    // ... full product data
  },
  // ... more products
];

// Helper functions
export function getProductBySlug(slug: string): Product | undefined {
  return products.find(p => p.slug === slug);
}

export function getFeaturedProducts(): Product[] {
  return products.filter(p => p.featured).sort((a, b) => a.sortOrder - b.sortOrder);
}

export function getProductsByGPU(gpuModel: string): Product[] {
  return products
    .filter(p => p.gpuModel === gpuModel)
    .sort((a, b) => a.sortOrder - b.sortOrder);
}
```

---

## Type Definitions Location

```typescript
// src/types/index.ts
export interface TranslatedString {
  en: string;
  ja: string;
}

export interface Product {
  // ... full interface
}

export interface Solution {
  // ... full interface
}

export interface NewsArticle {
  // ... full interface
}

export interface Partner {
  // ... full interface
}

export interface Client {
  // ... full interface
}

export interface ContactSubmission {
  // ... full interface
}

// Utility types
export type Locale = 'en' | 'ja';

export type InquiryType = 'product' | 'partnership' | 'general';

export type PartnerType = 'hardware' | 'cloud' | 'technology';
```

---

## Content Update Workflow

1. **Add/Edit Content:**
   - Edit appropriate file in `src/data/`
   - TypeScript will validate structure
   - Run `npm run build` to catch errors

2. **Translation:**
   - All `TranslatedString` fields require both `en` and `ja`
   - Use professional translation service for accuracy
   - Maintain consistent terminology

3. **Images:**
   - Place in `public/assets/{category}/`
   - Optimize before committing (WebP/AVIF)
   - Use descriptive filenames

4. **Testing:**
   - Test locally with `npm run dev`
   - Verify both languages render correctly
   - Check responsive layouts

5. **Deployment:**
   - Commit changes to Git
   - Vercel auto-deploys preview
   - Review preview URL
   - Merge to main for production

---

## Data Integrity

**TypeScript Validation:**
- Compile-time type checking prevents invalid data
- Required fields enforced at build time
- Enum types prevent invalid values

**Runtime Validation:**
- Contact form uses Zod schemas
- API routes validate input
- Error boundaries catch runtime issues

**Content Validation Script:**
```typescript
// scripts/validate-content.ts
// Run before deployment to catch issues
import {products} from '@/data/products';
import {solutions} from '@/data/solutions';

function validateContent() {
  // Check for duplicate IDs
  const productIds = products.map(p => p.id);
  const duplicates = productIds.filter((id, index) => productIds.indexOf(id) !== index);
  if (duplicates.length > 0) {
    throw new Error(`Duplicate product IDs: ${duplicates.join(', ')}`);
  }
  
  // Check for missing translations
  products.forEach(p => {
    if (!p.name.en || !p.name.ja) {
      throw new Error(`Product ${p.id} missing translation`);
    }
  });
  
  // Check for missing images
  // ... more validation
  
  console.log('✅ Content validation passed');
}
```

---

## Summary

- **No Database:** All data in TypeScript files
- **Type Safety:** Full TypeScript validation
- **Internationalization:** All user-facing content translated
- **Maintainability:** Clear structure, easy updates
- **Version Control:** All content tracked in Git
- **Performance:** Static data, no API calls during runtime

