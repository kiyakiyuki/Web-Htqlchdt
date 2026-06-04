'use client';

import { Suspense } from 'react';
import Link from 'next/link';
import { ProductGrid } from '@/components/product';
import { products } from '@/data/products';
import { ArrowLeft } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.description.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <main className="bg-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link href="/" className="flex items-center gap-2 text-primary hover:underline">
            <ArrowLeft size={20} />
            Quay lại trang chủ
          </Link>
        </div>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">
            Kết quả tìm kiếm
          </h1>
          <p className="text-muted">
            Tìm kiếm cho: <strong>&quot;{query}&quot;</strong> - Tìm thấy{' '}
            {filteredProducts.length} kết quả
          </p>
        </div>

        {/* Results */}
        {filteredProducts.length > 0 ? (
          <ProductGrid products={filteredProducts} />
        ) : (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-primary mb-4">
              Không tìm thấy sản phẩm nào
            </h2>
            <p className="text-muted mb-6">
              Không có sản phẩm nào phù hợp với tìm kiếm của bạn. Vui lòng thử lại với từ khóa khác.
            </p>
            <Link
              href="/products"
              className="bg-primary text-white px-6 py-3 rounded-lg font-bold inline-block hover:bg-blue-700"
            >
              Xem tất cả sản phẩm
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div>Đang tìm kiếm...</div>}>
      <SearchContent />
    </Suspense>
  );
}
