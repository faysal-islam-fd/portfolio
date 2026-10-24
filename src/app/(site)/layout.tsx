import { BrandNav } from "@/components/brand/nav";
import { BrandFooter } from "@/components/brand/footer";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="site relative min-h-screen">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:bg-fg focus:px-3 focus:py-1.5 focus:text-sm focus:text-paper"
      >
        Skip to content
      </a>
      <BrandNav />
      <main id="main" className="relative">
        {children}
      </main>
      <BrandFooter />
    </div>
  );
}
