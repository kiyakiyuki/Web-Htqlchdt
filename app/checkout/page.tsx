'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';

export default function CheckoutPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    district: '',
    ward: '',
    paymentMethod: 'cod',
  });

  const subtotal = 37500000;
  const shipping = 30000;
  const total = subtotal + shipping;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Đặt hàng thành công! Mã đơn hàng: ORD' + Date.now());
  };

  return (
    <main className="bg-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Link href="/cart" className="flex items-center gap-2 text-primary hover:underline mb-6">
          <ArrowLeft size={20} />
          Quay lại giỏ hàng
        </Link>

        <h1 className="text-3xl font-bold text-primary mb-8">Thanh toán</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="md:col-span-2">
            <form onSubmit={handleSubmit}>
              {/* Shipping Information */}
              <section className="bg-card rounded-lg p-6 mb-6">
                <h2 className="text-xl font-bold text-primary mb-4">Thông tin giao hàng</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <input
                    type="text"
                    placeholder="Họ và tên"
                    required
                    value={formData.fullName}
                    onChange={(e) =>
                      setFormData({ ...formData, fullName: e.target.value })
                    }
                    className="px-4 py-3 border-2 border-primary rounded focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="px-4 py-3 border-2 border-primary rounded focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <input
                    type="tel"
                    placeholder="Số điện thoại"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="px-4 py-3 border-2 border-primary rounded focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                  <input
                    type="text"
                    placeholder="Thành phố"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="px-4 py-3 border-2 border-primary rounded focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>

                <input
                  type="text"
                  placeholder="Địa chỉ đầy đủ"
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-primary rounded focus:outline-none focus:ring-2 focus:ring-accent mb-4"
                />

                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Quận"
                    value={formData.district}
                    onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                    className="px-4 py-3 border-2 border-primary rounded focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                  <input
                    type="text"
                    placeholder="Phường/Xã"
                    value={formData.ward}
                    onChange={(e) => setFormData({ ...formData, ward: e.target.value })}
                    className="px-4 py-3 border-2 border-primary rounded focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>
              </section>

              {/* Payment Method */}
              <section className="bg-card rounded-lg p-6 mb-6">
                <h2 className="text-xl font-bold text-primary mb-4">Phương thức thanh toán</h2>

                <label className="flex items-center gap-3 p-3 border-2 border-primary rounded-lg mb-3 cursor-pointer">
                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    checked={formData.paymentMethod === 'cod'}
                    onChange={(e) =>
                      setFormData({ ...formData, paymentMethod: e.target.value })
                    }
                    className="w-5 h-5"
                  />
                  <div>
                    <span className="font-bold text-primary">Thanh toán khi nhận hàng</span>
                    <p className="text-sm text-muted">Thanh toán trực tiếp khi nhận hàng</p>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-3 border-2 border-muted rounded-lg cursor-pointer">
                  <input
                    type="radio"
                    name="payment"
                    value="bank"
                    checked={formData.paymentMethod === 'bank'}
                    onChange={(e) =>
                      setFormData({ ...formData, paymentMethod: e.target.value })
                    }
                    className="w-5 h-5"
                  />
                  <div>
                    <span className="font-bold text-primary">Chuyển khoản ngân hàng</span>
                    <p className="text-sm text-muted">Chuyển tiền trước khi giao hàng</p>
                  </div>
                </label>
              </section>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-primary text-white py-4 rounded-lg font-bold text-lg hover:bg-blue-700"
              >
                Đặt hàng
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div>
            <div className="bg-card rounded-lg p-6 sticky top-4">
              <h2 className="font-bold text-primary mb-4 text-lg">Tóm tắt đơn hàng</h2>

              {/* Items Summary */}
              <div className="space-y-3 mb-4 pb-4 border-b-2 border-secondary">
                <div className="flex justify-between text-sm">
                  <span>iPhone 14 Pro Max x 1</span>
                  <span>24,500,000đ</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>AirPods Pro 2 x 2</span>
                  <span>13,000,000đ</span>
                </div>
              </div>

              {/* Totals */}
              <div className="space-y-2 mb-4 pb-4 border-b-2 border-secondary">
                <div className="flex justify-between text-sm">
                  <span className="text-muted">Tạm tính:</span>
                  <span className="font-bold">
                    {subtotal.toLocaleString('vi-VN')}đ
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted">Phí vận chuyển:</span>
                  <span className="font-bold">
                    {shipping.toLocaleString('vi-VN')}đ
                  </span>
                </div>
              </div>

              <div className="flex justify-between mb-6">
                <span className="font-bold text-primary">Tổng cộng:</span>
                <span className="font-bold text-accent text-2xl">
                  {total.toLocaleString('vi-VN')}đ
                </span>
              </div>

              {/* Security Info */}
              <div className="bg-secondary p-3 rounded text-xs text-primary">
                ✓ Mua sắm an toàn với bảo mật SSL 256-bit
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
