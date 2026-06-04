'use client';

import Link from 'next/link';
import { products } from '@/data/products';
import { ShoppingCart, Trash2, Minus, Plus } from 'lucide-react';
import { useState, useEffect } from 'react';

interface CartItem {
  productId: string;
  quantity: number;
}

export default function CartComponent() {
  const [cart, setCart] = useState<CartItem[]>([
    { productId: '1', quantity: 2 },
    { productId: '5', quantity: 1 },
  ]);

  const cartItems = cart
    .map((item) => {
      const product = products.find((p) => p.id === item.productId);
      return product ? { ...product, cartQuantity: item.quantity } : null;
    })
    .filter(Boolean);

  const subtotal = cartItems.reduce((sum, item) => sum + (item?.price || 0) * (item?.cartQuantity || 0), 0);
  const shipping = 30000;
  const total = subtotal + shipping;

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId);
    } else {
      setCart(
        cart.map((item) =>
          item.productId === productId ? { ...item, quantity } : item
        )
      );
    }
  };

  const removeItem = (productId: string) => {
    setCart(cart.filter((item) => item.productId !== productId));
  };

  return (
    <main className="bg-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-primary mb-8">Giỏ hàng của bạn</h1>

        {cart.length === 0 ? (
          <div className="text-center py-12">
            <ShoppingCart size={64} className="text-secondary mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-primary mb-4">Giỏ hàng trống</h2>
            <p className="text-muted mb-6">Hãy thêm một số sản phẩm vào giỏ hàng của bạn</p>
            <Link
              href="/products"
              className="bg-primary text-white px-6 py-3 rounded-lg font-bold inline-block hover:bg-blue-700"
            >
              Tiếp tục mua sắm
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="md:col-span-2">
              <div className="bg-card rounded-lg overflow-hidden">
                {cartItems.map((item) => (
                  <div
                    key={item?.id}
                    className="border-b-2 border-secondary p-4 flex gap-4 last:border-b-0"
                  >
                    <div className="bg-secondary rounded w-24 h-24 flex-shrink-0 flex items-center justify-center">
                      <span className="text-primary text-xs text-center">{item?.name}</span>
                    </div>

                    <div className="flex-grow">
                      <h3 className="font-bold text-primary mb-1">{item?.name}</h3>
                      <p className="text-accent font-bold mb-3">
                        {item?.price?.toLocaleString('vi-VN')}đ
                      </p>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() =>
                            updateQuantity(item!.id, (item?.cartQuantity || 0) - 1)
                          }
                          className="border-2 border-primary text-primary p-1 rounded hover:bg-secondary"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="px-3 py-1 bg-white border-2 border-primary rounded">
                          {item?.cartQuantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item!.id, (item?.cartQuantity || 0) + 1)
                          }
                          className="border-2 border-primary text-primary p-1 rounded hover:bg-secondary"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="font-bold text-primary mb-3">
                        {((item?.price || 0) * (item?.cartQuantity || 0)).toLocaleString('vi-VN')}đ
                      </p>
                      <button
                        onClick={() => removeItem(item!.id)}
                        className="text-accent hover:text-red-700 p-2"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="md:col-span-1">
              <div className="bg-card rounded-lg p-6 sticky top-4">
                <h2 className="font-bold text-primary mb-4 text-lg">Tóm tắt đơn hàng</h2>

                <div className="space-y-3 mb-4 pb-4 border-b-2 border-secondary">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted">Tạm tính:</span>
                    <span className="font-bold text-primary">
                      {subtotal.toLocaleString('vi-VN')}đ
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted">Phí vận chuyển:</span>
                    <span className="font-bold text-primary">
                      {shipping.toLocaleString('vi-VN')}đ
                    </span>
                  </div>
                </div>

                <div className="flex justify-between mb-6">
                  <span className="font-bold text-primary">Tổng cộng:</span>
                  <span className="font-bold text-accent text-xl">
                    {total.toLocaleString('vi-VN')}đ
                  </span>
                </div>

                <Link
                  href="/checkout"
                  className="w-full bg-primary text-white py-3 rounded-lg font-bold hover:bg-blue-700 text-center block mb-3"
                >
                  Thanh toán
                </Link>
                <Link
                  href="/products"
                  className="w-full border-2 border-primary text-primary py-3 rounded-lg font-bold hover:bg-secondary text-center block"
                >
                  Tiếp tục mua sắm
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
