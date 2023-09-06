import NavigationSidebar from '@/components/navigation/navigation-sidebar';

export default async function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex w-full h-full overflow-hidden">
      <nav className="relative z-30 flex flex-shrink-0 w-72pxr" aria-label="서버 사이드바">
        <NavigationSidebar />
      </nav>
      <main className="flex items-stretch content-start flex-1 min-w-0 min-h-0">{children}</main>
    </div>
  );
}
