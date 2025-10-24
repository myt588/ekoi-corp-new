# Setup Notes - EKOI Corporate Website

**Date:** 2025-10-24  
**Status:** Foundation Complete

## What Has Been Set Up

The project has been initialized using the **TypeScript Next.js Starter** template, which provides a production-ready foundation with modern tooling and best practices.

### ✅ Completed Setup

#### Framework & Runtime
- **Next.js 16.0.0** with App Router
- **React 19.2.0** and React DOM 19.2.0
- **TypeScript 5.9.3** with strict mode enabled
- Node.js 24 runtime (specified in `.nvmrc`)

#### Code Quality Tools
- **ESLint 9.38.0** with Next.js and Prettier integration
  - Configured in `eslint.config.mjs`
  - Includes TypeScript ESLint support
  - Prettier plugin for consistent formatting
- **Prettier 3.6.2** for code formatting
  - Configured in `.prettierrc.json`
  - Import sorting plugin
  - JSON sorting plugin
- **EditorConfig** for consistent coding styles across IDEs

#### Git Workflow Tools
- **Husky 9.1.7** for Git hooks
  - `pre-commit`: Runs lint-staged (disabled by default, see note below)
  - `commit-msg`: Validates commit messages with commitlint
  - `post-merge`: Automatically runs `pnpm install` if dependencies changed
- **Commitlint 20.1.0** with conventional commit standards
- **lint-staged 16.2.5** for staged file linting

> **Husky Pre-commit Note:** The pre-commit hook is intentionally disabled by default. To enable it, run:
> ```bash
> echo 'HUSKY_ENABLED=true' > .husky/_/pre-commit.options
> ```

#### Type Safety & Validation
- **Zod 4.1.12** for schema validation
- **T3 Env (@t3-oss/env-nextjs)** for type-safe environment variables
  - Client-side env schema: `src/lib/env/client.ts`
  - Server-side env schema: `src/lib/env/server.ts`

#### Security
- **Content Security Policy (CSP)** headers configured in `next.config.ts`
- Security headers (HSTS, X-Frame-Options, etc.)
- Permissions Policy headers

#### Configuration Files
- `tsconfig.json` - TypeScript configuration with path aliases (`@/*`)
- `next.config.ts` - Next.js configuration with CSP and redirects
- `redirects.ts` - Typed redirects configuration
- `.nvmrc` - Node version specification (24)
- `renovate.json` - Automated dependency updates

#### React Compiler
- **babel-plugin-react-compiler 1.0.0** - React 19 compiler support enabled

### 📦 Package Manager

The project uses **pnpm 10** as the package manager. The following files are configured for pnpm:
- `pnpm-lock.yaml` - Lock file
- `.npmrc` - pnpm configuration

### 🏗️ Project Structure

```
ekoi-corp-new/
├── .husky/                          # Git hooks
│   ├── commit-msg                   # Commitlint validation
│   ├── post-merge                   # Auto-install deps
│   └── pre-commit                   # Lint-staged (optional)
├── src/
│   ├── app/                         # Next.js App Router
│   │   ├── layout.tsx               # Root layout
│   │   ├── page.tsx                 # Homepage
│   │   ├── page.module.css          # Page-specific styles
│   │   ├── globals.css              # Global styles
│   │   └── favicon.ico              # Favicon
│   └── lib/
│       └── env/                     # T3 Env configuration
│           ├── client.ts            # Client env vars
│           └── server.ts            # Server env vars
├── public/                          # Static assets
├── specs/                           # Project specifications
└── workflows/                       # CI/CD workflows
```

### 📝 Documentation Updated

The following documentation files have been updated to reflect the actual implementation:

1. **README.md** - Updated with:
   - Correct prerequisites (Node.js 24, pnpm 10)
   - Installation instructions
   - Available scripts
   - Current technology stack
   - Link to detailed quickstart guide

2. **specs/001-ekoi-corporate-website/quickstart.md** - Updated with:
   - Correct Node.js version (24) and pnpm usage
   - Current project structure
   - Differentiation between "Currently Configured" and "To Be Added" technologies
   - Initial setup tasks for next steps (Tailwind, shadcn/ui, etc.)
   - Updated all command examples to use pnpm
   - T3 Env documentation
   - Correct development workflow

3. **specs/001-ekoi-corporate-website/plan.md** - Updated with:
   - Project setup note about the starter template
   - Updated status to "In Progress - Phase 1 Partially Complete"
   - Phase 1 tasks marked complete where applicable
   - Current vs target directory structure
   - Current dependencies vs dependencies to be added
   - Updated package count

4. **package.json** - Updated with:
   - Project name: `ekoi-corp-website`
   - Project description
   - EKOI Development Team as author
   - Relevant keywords

### ⏭️ Next Steps

To continue with the implementation, follow these steps:

#### 1. Install Tailwind CSS
```bash
pnpm add -D tailwindcss postcss autoprefixer
pnpm tailwindcss init -p
```

Then configure `tailwind.config.ts` with your content paths and theme.

#### 2. Install shadcn/ui
```bash
pnpm dlx shadcn@latest init
```

This will set up the component library. Then add components as needed:
```bash
pnpm dlx shadcn@latest add button input textarea
```

#### 3. Install next-intl for Internationalization
```bash
pnpm add next-intl
```

Configure for English and Japanese support.

#### 4. Install Form Libraries
```bash
pnpm add react-hook-form @hookform/resolvers
```

This integrates with the already-installed Zod for validation.

#### 5. Set Up Vercel Deployment
- Connect the GitHub repository to Vercel
- Configure environment variables
- Set up preview deployments

### 🔍 Constitutional Compliance

This setup aligns with the project's constitutional principles:

✅ **Principle 1 - Code Quality Excellence:**
- TypeScript strict mode
- ESLint + Prettier configured
- Git hooks for quality control
- Type-safe environment variables

✅ **Principle 7 - Performance Excellence:**
- Next.js 16 with App Router
- React 19 with compiler
- Optimized production configuration

### 📚 Reference Documentation

- **Template Documentation:** `ekoi-corp-web/README.md`
- **Next.js Documentation:** https://nextjs.org/docs
- **T3 Env Documentation:** https://env.t3.gg/
- **TypeScript Next.js Starter:** https://github.com/jpedroschmitz/typescript-nextjs-starter

### 🎯 Current Development Status

**Phase 1 Progress:**
- ✅ Base project initialization
- ✅ Code quality tools
- ✅ Git workflow automation
- ✅ Type safety infrastructure
- ✅ Security headers
- ⏳ Styling framework (Tailwind) - pending
- ⏳ Component library (shadcn/ui) - pending
- ⏳ Internationalization - pending
- ⏳ Layout components - pending
- ⏳ Vercel deployment - pending

**Next Phase:** Complete Phase 1 by adding Tailwind CSS, shadcn/ui, and setting up the base layout components and internationalization.

---

**Document Version:** 1.0  
**Last Updated:** 2025-10-24

