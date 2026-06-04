'use client';

import { useState } from 'react';
import Link from 'next/link';
import { products } from '@/data/products';
import { ShoppingCart, Heart, Share2, ArrowLeft } from 'lucide-react';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductPage({ params }: PageProps) {
  const { id } = await params;
  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <main className="max-w-7xl mx-auto px-4 py-8">
        <Link href="/products" className="flex items-center gap-2 text-primary hover:underline mb-4">
          <ArrowLeft size={20} />
          Quay lại
        </Link>
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-primary">Sản phẩm không tìm thấy</h1>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link href="/products" className="flex items-center gap-2 text-primary hover:underline">
            <ArrowLeft size={20} />
            Quay lại danh sách sản phẩm
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="bg-secondary rounded-lg h-96 flex items-center justify-center">
            <span className="text-primary text-center text-sm font-medium">{product.name}</span>
          </div>

          {/* Product Details */}
          <div>
            <h1 className="text-3xl font-bold text-primary mb-4">{product.name}</h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-6">
              <span className="text-yellow-400 text-lg">★ {product.rating}</span>
              <span className="text-muted">({product.reviews} đánh giá)</span>
            </div>

            {/* Price */}
            <div className="mb-6">
              <div className="text-4xl font-bold text-accent mb-2">
                {product.price.toLocaleString('vi-VN')}đ
              </div>
              {product.originalPrice && (
                <div className="text-lg text-muted line-through">
                  {product.originalPrice.toLocaleString('vi-VN')}đ
                </div>
              )}
              {product.discount && (
                <div className="text-sm text-accent font-bold mt-2">
                  Tiết kiệm {product.discount}%
                </div>
              )}
            </div>

            {/* Description */}
            <div className="mb-8 p-4 bg-card rounded-lg">
              <h3 className="font-bold text-primary mb-2">Mô tả sản phẩm</h3>
              <p className="text-sm text-muted">{product.description}</p>
            </div>

            {/* Stock Status */}
            <div className="mb-6 p-4 bg-card rounded-lg">
              <h3 className="font-bold text-primary mb-2">Tình trạng kho</h3>
              {product.inStock ? (
                <span className="text-green font-bold">✓ Còn hàng</span>
              ) : (
                <span className="text-accent font-bold">✗ Hết hàng</span>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-3 mb-6">
              <button
                disabled={!product.inStock}
                className="w-full bg-primary text-white py-3 rounded-lg font-bold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-lg"
              >
                <ShoppingCart size={24} />
                Thêm vào giỏ hàng
              </button>
              <button className="w-full border-2 border-primary text-primary py-3 rounded-lg font-bold hover:bg-secondary flex items-center justify-center gap-2">
                <Heart size={24} />
                Thêm vào yêu thích
              </button>
              <button className="w-full border-2 border-primary text-primary py-3 rounded-lg font-bold hover:bg-secondary flex items-center justify-center gap-2">
                <Share2 size={24} />
                Chia sẻ
              </button>
            </div>

            {/* Product Info */}
            <div className="border-t-2 border-secondary pt-6">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-bold text-primary">Danh mục:</span>
                  <p className="text-muted">{product.category}</p>
                </div>
                <div>
                  <span className="font-bold text-primary">SKU:</span>
                  <p className="text-muted">{product.id}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        <div className="mt-12 pt-8 border-t-2 border-secondary">
          <h2 className="text-2xl font-bold text-primary mb-6">Sản phẩm liên quan</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {products
              .filter((p) => p.category === product.category && p.id !== product.id)
              .slice(0, 4)
              .map((p) => (
                <Link
                  key={p.id}
                  href={`/products/${p.id}`}
                  className="bg-white border-2 border-secondary rounded-lg p-4 hover:shadow-lg transition"
                >
                  <div className="bg-secondary h-40 rounded mb-2 flex items-center justify-center">
                    <span className="text-primary text-xs text-center">{p.name}</span>
                  </div>
                  <h3 className="font-bold text-sm text-primary truncate">{p.name}</h3>
                  <p className="text-accent font-bold mt-2">{p.price.toLocaleString('vi-VN')}đ</p>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </main>
  );
}
