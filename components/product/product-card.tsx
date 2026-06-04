'use client';

import Link from 'next/link';
import { Product } from '@/data/products';
import { ShoppingCart } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="bg-white border-2 border-secondary rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
      {/* Image Container */}
      <Link href={`/products/${product.id}`} className="block">
        <div className="bg-secondary h-48 flex items-center justify-center relative overflow-hidden">
          <div className="w-full h-full bg-gradient-to-b from-secondary to-blue-200 flex items-center justify-center">
            <span className="text-primary text-center text-sm font-medium">{product.name}</span>
          </div>
          {product.discount && (
            <div className="absolute top-2 right-2 bg-accent text-white px-2 py-1 rounded text-xs font-bold">
              -{product.discount}%
            </div>
          )}
        </div>
      </Link>

      {/* Content */}
      <div className="p-3">
        <Link href={`/products/${product.id}`}>
          <h3 className="font-bold text-sm text-primary mb-2 truncate hover:text-blue-700">
            {product.name}
          </h3>
        </Link>

        {/* Price */}
        <div className="mb-2">
          <div className="text-accent font-bold text-lg">
            {formatPrice(product.price)}
          </div>
          {product.originalPrice && (
            <div className="text-muted line-through text-xs">
              {formatPrice(product.originalPrice)}
            </div>
          )}
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-3 text-xs">
          <span className="text-yellow-400">★ {product.rating}</span>
          <span className="text-muted">({product.reviews})</span>
        </div>

        {/* Stock Status */}
        <div className="mb-3">
          {product.inStock ? (
            <span className="text-green text-xs font-medium">Còn hàng</span>
          ) : (
            <span className="text-accent text-xs font-medium">Hết hàng</span>
          )}
        </div>

        {/* Add to Cart Button */}
        <button
          disabled={!product.inStock}
          className="w-full bg-primary text-white py-2 rounded border-2 border-primary hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm font-medium"
        >
          <ShoppingCart size={16} />
          Thêm vào giỏ
        </button>
      </div>
    </div>
  );
}
