# EKOI Corp

Welcome to the EKOI Corp project repository.

## Project Constitution

This project is governed by a comprehensive constitution that establishes foundational principles for quality, consistency, and excellence. All development work must adhere to these constitutional principles.

📜 **[Read the Constitution](.specify/memory/constitution.md)**

### Core Principles

Our project is guided by seven core principles:

1. **Code Quality Excellence** - Professional standards for maintainable, clear code
2. **User Experience Consistency** - Predictable interactions and workflows
3. **UI Design Consistency** - Unified visual design language
4. **Responsive Design** - Flawless function across all device sizes
5. **Clear & Intuitive Interface** - Immediately understandable UX
6. **SEO Optimization** - Search engine discovery and ranking
7. **Performance Excellence** - Fast, responsive experiences

## Getting Started

### Prerequisites

- **Node.js** 24 or later
- **pnpm** 10 (package manager)
- **Git** for version control

### Installation

```bash
# Clone the repository
git clone https://github.com/ekoi/ekoi-corp-new.git
cd ekoi-corp-new

# Install dependencies
pnpm install
```

### Development

```bash
# Start development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

### Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm type-check` - Run TypeScript type checking
- `pnpm lint` - Run ESLint
- `pnpm lint:fix` - Run ESLint with auto-fix
- `pnpm format` - Format code with Prettier
- `pnpm format:check` - Check code formatting

### Technology Stack

**Currently Configured:**

- Next.js 16 (App Router)
- React 19.2
- TypeScript 5.9
- Zod 4.1 (validation)
- T3 Env (type-safe environment variables)
- ESLint 9 + Prettier 3.6
- Husky + Commitlint

**To Be Added:**

- Tailwind CSS (styling)
- shadcn/ui (components)
- next-intl (internationalization)
- react-hook-form (forms)

See [specs/001-ekoi-corporate-website/quickstart.md](specs/001-ekoi-corporate-website/quickstart.md) for detailed setup instructions.

> **Note:** The `ekoi-corp-web/README.md` file contains documentation about the TypeScript Next.js Starter template this project is based on. It can be kept as reference or removed once you're familiar with the setup.

## Project Structure

```text
ekoi-corp-new/
├── .specify/                    # Project governance and templates
│   ├── memory/
│   │   └── constitution.md      # Project constitution
│   └── templates/
│       ├── plan-template.md     # Implementation plan template
│       ├── spec-template.md     # Feature specification template
│       ├── tasks-template.md    # Task breakdown template
│       └── commands/
│           └── constitution.md  # Constitution update command
└── README.md                    # This file
```

## Documentation

- [Constitution](.specify/memory/constitution.md) - Project governance and principles
- [Plan Template](.specify/templates/plan-template.md) - Use for implementation planning
- [Spec Template](.specify/templates/spec-template.md) - Use for feature specifications
- [Tasks Template](.specify/templates/tasks-template.md) - Use for task breakdowns

## Contributing

All contributions must adhere to the [Project Constitution](.specify/memory/constitution.md). Before submitting a pull request:

1. Review the constitutional principles relevant to your changes
2. Ensure all code quality standards are met (Principle 1)
3. Verify UI consistency with design system (Principles 2, 3, 4, 5)
4. Validate SEO requirements for public pages (Principle 6)
5. Confirm performance targets are met (Principle 7)
6. Include appropriate tests and documentation

## Constitutional Compliance

Every pull request should reference applicable constitutional principles in the description. Code reviews will assess adherence to all relevant principles.

### Quick Compliance Checklist

- [ ] Code passes linting without warnings
- [ ] Unit tests included with ≥80% coverage
- [ ] UI uses design system components exclusively
- [ ] Responsive design tested on multiple devices
- [ ] Performance meets Lighthouse ≥90 score
- [ ] SEO meta tags included for public pages
- [ ] Accessibility standards met (WCAG 2.1 AA)

## License

[Add your license information here]

## Contact

[Add your contact information here]

---

**Constitution Version:** 1.0.0  
**Last Updated:** 2025-10-21

