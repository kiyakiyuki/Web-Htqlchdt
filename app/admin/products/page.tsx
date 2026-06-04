'use client';

import Link from 'next/link';
import { useState } from 'react';
import { products } from '@/data/products';
import { Menu, Plus, Edit, Trash2, Home, LogOut } from 'lucide-react';

export default function AdminProductsPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="flex bg-background">
      {/* Sidebar */}
      <aside
        className={`${
          isSidebarOpen ? 'w-64' : 'w-20'
        } bg-primary text-white transition-all duration-300 fixed h-screen left-0 top-0 overflow-y-auto`}
      >
        <div className="p-4 border-b border-secondary flex items-center justify-between">
          <div className={`font-bold text-2xl ${!isSidebarOpen && 'hidden'}`}>
            PTK Admin
          </div>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 hover:bg-blue-700 rounded"
          >
            <Menu size={20} />
          </button>
        </div>

        <nav className="p-4 space-y-2">
          <Link
            href="/admin"
            className="flex items-center gap-3 p-3 rounded hover:bg-blue-700 transition"
          >
            <Home size={20} />
            {isSidebarOpen && <span>Dashboard</span>}
          </Link>
          <Link
            href="/admin/products"
            className="flex items-center gap-3 p-3 rounded bg-blue-700"
          >
            <Plus size={20} />
            {isSidebarOpen && <span>Sản phẩm</span>}
          </Link>
          <Link
            href="/admin/orders"
            className="flex items-center gap-3 p-3 rounded hover:bg-blue-700 transition"
          >
            <span>📦</span>
            {isSidebarOpen && <span>Đơn hàng</span>}
          </Link>
          <div className="border-t border-secondary my-4 pt-4 mt-4">
            <button className="w-full flex items-center gap-3 p-3 rounded hover:bg-blue-700 transition">
              <LogOut size={20} />
              {isSidebarOpen && <span>Đăng xuất</span>}
            </button>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <div className={`${isSidebarOpen ? 'ml-64' : 'ml-20'} flex-1 transition-all duration-300`}>
        {/* Header */}
        <header className="bg-white border-b-2 border-secondary p-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-primary">Quản Lý Sản Phẩm</h1>
            <p className="text-muted text-sm">Tổng cộng: {filteredProducts.length} sản phẩm</p>
          </div>
          <button className="bg-primary text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 flex items-center gap-2">
            <Plus size={20} />
            Thêm sản phẩm
          </button>
        </header>

        {/* Content */}
        <div className="p-6">
          {/* Search */}
          <div className="mb-6">
            <input
              type="text"
              placeholder="Tìm kiếm sản phẩm..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 border-2 border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>

          {/* Products Table */}
          <div className="bg-card border-2 border-secondary rounded-lg overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-secondary border-b-2 border-secondary">
                  <th className="px-6 py-4 text-left font-bold text-primary">Tên sản phẩm</th>
                  <th className="px-6 py-4 text-left font-bold text-primary">Danh mục</th>
                  <th className="px-6 py-4 text-left font-bold text-primary">Giá</th>
                  <th className="px-6 py-4 text-left font-bold text-primary">Kho</th>
                  <th className="px-6 py-4 text-left font-bold text-primary">Đánh giá</th>
                  <th className="px-6 py-4 text-center font-bold text-primary">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="border-b border-secondary hover:bg-secondary transition">
                    <td className="px-6 py-4 font-bold text-primary">{product.name}</td>
                    <td className="px-6 py-4 text-muted text-sm">{product.category}</td>
                    <td className="px-6 py-4 text-primary font-bold">
                      {product.price.toLocaleString('vi-VN')}đ
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded text-xs font-bold ${
                          product.inStock
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {product.inStock ? 'Còn' : 'Hết'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-primary font-bold">
                      ★ {product.rating}
                    </td>
                    <td className="px-6 py-4 flex gap-2 justify-center">
                      <button className="p-2 bg-primary text-white rounded hover:bg-blue-700">
                        <Edit size={18} />
                      </button>
                      <button className="p-2 bg-accent text-white rounded hover:bg-red-700">
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}
