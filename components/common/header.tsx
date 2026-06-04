'use client';

import Link from 'next/link';
import { Search, ShoppingCart, User, Menu } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className="bg-white border-b-2 border-secondary">
      {/* Top Bar */}
      <div className="bg-secondary py-2 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-sm text-primary">
          <span>Liên hệ hỗ trợ</span>
          <div className="space-x-4">
            <Link href="/orders" className="hover:underline">
              Theo dõi đơn hàng
            </Link>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <div className="bg-secondary rounded-lg p-2 font-bold text-primary text-lg">
              PTK
            </div>
          </Link>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex-1 max-w-2xl">
            <div className="relative">
              <input
                type="text"
                placeholder="Tìm kiếm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white"
              />
              <button
                type="submit"
                className="absolute right-3 top-2.5 text-primary hover:text-blue-700"
              >
                <Search size={20} />
              </button>
            </div>
          </form>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            <Link href="/cart" className="flex flex-col items-center gap-1 hover:text-primary">
              <ShoppingCart size={24} className="text-primary" />
              <span className="text-xs">Giỏ hàng</span>
            </Link>
            <Link href="/profile" className="flex flex-col items-center gap-1 hover:text-primary">
              <User size={24} className="text-primary" />
              <span className="text-xs">Tài khoản</span>
            </Link>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden"
            >
              <Menu size={24} className="text-primary" />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="mt-4 hidden md:flex gap-4 border-t pt-3 text-sm font-medium">
          <Link href="/" className="text-primary hover:bg-secondary px-3 py-1 rounded">
            Tất cả
          </Link>
          <Link href="/products?category=phones" className="text-primary hover:bg-secondary px-3 py-1 rounded">
            Điện thoại
          </Link>
          <Link href="/products?category=laptops" className="text-primary hover:bg-secondary px-3 py-1 rounded">
            Laptop
          </Link>
          <Link href="/products?category=accessories" className="text-primary hover:bg-secondary px-3 py-1 rounded">
            Phụ kiện
          </Link>
          <Link href="/products?category=electronics" className="text-primary hover:bg-secondary px-3 py-1 rounded">
            Điện tử
          </Link>
          <Link href="/admin/login" className="text-primary hover:bg-secondary px-3 py-1 rounded ml-auto">
            Quản trị
          </Link>
        </nav>
      </div>
    </header>
  );
}