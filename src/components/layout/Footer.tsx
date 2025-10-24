import Link from 'next/link';
import { Logo } from '@/components/ui/Logo';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const sitemapSections = [
    {
      title: 'Products',
      links: [
        { label: 'H100 Servers', href: '/products' },
        { label: 'A100 Servers', href: '/products' },
        { label: 'H200 Servers', href: '/products' },
      ],
    },
    {
      title: 'Solutions',
      links: [
        { label: 'Cloud Partnerships', href: '/solutions' },
        { label: 'Enterprise Solutions', href: '/solutions' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'Why Us', href: '/why-us' },
        { label: 'News', href: '/news' },
        { label: 'Contact', href: '/contact' },
      ],
    },
  ];

  return (
    <footer className="border-t bg-background">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and description */}
          <div className="col-span-1">
            <Logo />
            <p className="mt-4 text-sm text-muted-foreground">
              AI Infrastructure Solutions for Enterprise
            </p>
          </div>

          {/* Sitemap sections */}
          {sitemapSections.map((section, index) => (
            <div key={index}>
              <h3 className="font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom section */}
        <div className="mt-12 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {currentYear} EKOI. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link
              href="/privacy"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

