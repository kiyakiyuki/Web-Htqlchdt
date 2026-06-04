'use client';

import { usePathname } from 'next/navigation';
import { Header } from './header';
import { Footer } from './footer';

// Các trang có header/footer riêng (đăng nhập, admin...) thì KHÔNG dùng
// Header/Footer chung của cửa hàng, tránh bị lồng 2 lớp.
const BARE_PREFIXES = ['/auth', '/admin'];

export function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const bare = BARE_PREFIXES.some((p) => pathname.startsWith(p));

  if (bare) {
    return <main className="min-h-screen">{children}</main>;
  }

  return (
    <>
      <Header />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  );
}