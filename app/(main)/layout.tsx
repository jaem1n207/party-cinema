import NavigationSidebar from '@/components/navigation/navigation-sidebar';

export default async function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-full">
      <nav
        className="fixed inset-y-0 z-30 flex-col hidden h-full md:flex w-72pxr"
        aria-label="서버 사이드바"
      >
        <NavigationSidebar />
      </nav>
      <main className="h-full md:pl-72pxr">{children}</main>
    </div>
  );
}
