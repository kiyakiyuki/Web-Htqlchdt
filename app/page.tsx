'use client';

import { useState } from 'react';
import { ProductGrid } from '@/components/product';
import { products, categories } from '@/data/products';

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredProducts = products.filter((product) => {
    const matchCategory = !selectedCategory || product.category === selectedCategory;
    const matchSearch =
      !searchQuery ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  const saleProducts = products.filter((p) => p.discount && p.discount > 0).slice(0, 4);

  return (
    <main className="bg-white">
      {/* Hero Banner */}
      <section className="bg-secondary py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-card rounded-3xl p-12 text-center">
            <h1 className="text-4xl font-bold text-primary mb-4">Chào mừng đến PTK Electronics</h1>
            <p className="text-primary mb-6 text-lg">Khám phá những sản phẩm điện tử chất lượng cao</p>
            <button
              onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-primary text-white px-8 py-3 rounded-full font-bold hover:bg-blue-800 transition"
            >
              Khám phá ngay
            </button>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="bg-white border-b py-6 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-lg font-bold text-primary mb-4">Danh mục sản phẩm</h2>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setSelectedCategory('')}
              className={`px-4 py-2 rounded-full font-medium border-2 transition ${
                selectedCategory === ''
                  ? 'bg-primary text-white border-primary'
                  : 'bg-white text-primary border-primary hover:bg-secondary'
              }`}
            >
              Tất cả
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-full font-medium border-2 transition ${
                  selectedCategory === cat.id
                    ? 'bg-primary text-white border-primary'
                    : 'bg-white text-primary border-primary hover:bg-secondary'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Sale Products */}
      {saleProducts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 py-8">
          <h2 className="text-2xl font-bold text-primary mb-6">
            Sản phẩm khuyến mãi
          </h2>
          <ProductGrid products={saleProducts} />
        </section>
      )}

      {/* All Products */}
      <section id="products" className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-primary mb-4">
          {selectedCategory || searchQuery ? 'Kết quả tìm kiếm' : 'Tất cả sản phẩm'}
        </h2>
        <ProductGrid products={filteredProducts} />
      </section>

      {/* Features Section */}
      <section className="bg-card py-12 px-4 mt-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <h3 className="font-bold text-primary mb-2">Giao hàng nhanh</h3>
              <p className="text-sm text-muted">
                Giao hàng miễn phí cho đơn hàng trên 500.000đ
              </p>
            </div>
            <div className="text-center">
              <h3 className="font-bold text-primary mb-2">Hỗ trợ 24/7</h3>
              <p className="text-sm text-muted">
                Dịch vụ khách hàng sẵn sàng giúp bạn bất kỳ lúc nào
              </p>
            </div>
            <div className="text-center">
              <h3 className="font-bold text-primary mb-2">Hoàn tiền an toàn</h3>
              <p className="text-sm text-muted">
                Chính sách hoàn tiền 100% nếu không hài lòng
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
