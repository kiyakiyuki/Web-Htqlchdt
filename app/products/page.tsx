'use client';

import { useState } from 'react';
import { ProductGrid } from '@/components/product';
import { products, categories } from '@/data/products';
import { ChevronDown } from 'lucide-react';

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 50000000]);
  const [sortBy, setSortBy] = useState<'newest' | 'price-asc' | 'price-desc' | 'rating'>('newest');

  const filteredProducts = products
    .filter((product) => {
      const matchCategory = !selectedCategory || product.category === selectedCategory;
      const matchPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      return matchCategory && matchPrice;
    })
    .sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });

  return (
    <main className="bg-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <aside className="md:col-span-1">
            <div className="bg-card p-6 rounded-lg">
              {/* Categories */}
              <div className="mb-6">
                <h3 className="font-bold text-primary mb-3">Danh mục</h3>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      checked={selectedCategory === ''}
                      onChange={() => setSelectedCategory('')}
                      className="w-4 h-4"
                    />
                    <span className="text-sm">Tất cả sản phẩm</span>
                  </label>
                  {categories.map((cat) => (
                    <label key={cat.id} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        checked={selectedCategory === cat.id}
                        onChange={() => setSelectedCategory(cat.id)}
                        className="w-4 h-4"
                      />
                      <span className="text-sm">{cat.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6 pb-6 border-b border-secondary">
                <h3 className="font-bold text-primary mb-3">Khoảng giá</h3>
                <div className="space-y-2 text-sm">
                  <div>
                    <label>Từ: {priceRange[0].toLocaleString('vi-VN')}đ</label>
                    <input
                      type="range"
                      min="0"
                      max="50000000"
                      step="1000000"
                      value={priceRange[0]}
                      onChange={(e) =>
                        setPriceRange([Number(e.target.value), priceRange[1]])
                      }
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label>Đến: {priceRange[1].toLocaleString('vi-VN')}đ</label>
                    <input
                      type="range"
                      min="0"
                      max="50000000"
                      step="1000000"
                      value={priceRange[1]}
                      onChange={(e) =>
                        setPriceRange([priceRange[0], Number(e.target.value)])
                      }
                      className="w-full"
                    />
                  </div>
                </div>
              </div>

              {/* Sort By */}
              <div>
                <h3 className="font-bold text-primary mb-3">Sắp xếp</h3>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="w-full px-3 py-2 border-2 border-primary rounded bg-white text-sm focus:outline-none"
                >
                  <option value="newest">Mới nhất</option>
                  <option value="price-asc">Giá: Thấp đến cao</option>
                  <option value="price-desc">Giá: Cao đến thấp</option>
                  <option value="rating">Đánh giá cao nhất</option>
                </select>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="md:col-span-3">
            {/* Header Info */}
            <div className="mb-6 pb-4 border-b-2 border-secondary">
              <h1 className="text-2xl font-bold text-primary mb-2">
                {selectedCategory
                  ? categories.find((c) => c.id === selectedCategory)?.name
                  : 'Tất cả sản phẩm'}
              </h1>
              <p className="text-sm text-muted">
                Tìm thấy {filteredProducts.length} sản phẩm
              </p>
            </div>

            {/* Products Grid */}
            <ProductGrid products={filteredProducts} />
          </div>
        </div>
      </div>
    </main>
  );
}
