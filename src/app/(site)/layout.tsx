import { SiteNav } from "@/components/site/nav";
import { SiteFooter } from "@/components/site/footer";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-md focus:bg-accent-blue focus:px-3 focus:py-1.5 focus:text-sm focus:text-white"
      >
        Skip to content
      </a>
      <SiteNav />
      <main id="main" className="relative pt-24">
        {children}
      </main>
      <SiteFooter />
    </div>
  );
}
