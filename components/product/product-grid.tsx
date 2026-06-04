'use client';

import { Product } from '@/data/products';
import { ProductCard } from './product-card';

interface ProductGridProps {
  products: Product[];
  title?: string;
}

export function ProductGrid({ products, title }: ProductGridProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {title && (
        <h2 className="text-2xl font-bold text-primary mb-6">
          {title}
        </h2>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      {products.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted text-lg">Không tìm thấy sản phẩm nào</p>
        </div>
      )}
    </div>
  );
}
