'use client';

import Link from 'next/link';
import { orders } from '@/data/orders';
import { products } from '@/data/products';
import { Package, Truck, MapPin, CheckCircle, Clock, AlertCircle, ArrowLeft } from 'lucide-react';

export default function OrdersPage() {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="text-yellow-500" size={24} />;
      case 'confirmed':
        return <CheckCircle className="text-blue-500" size={24} />;
      case 'processing':
        return <Package className="text-blue-500" size={24} />;
      case 'shipped':
        return <Truck className="text-blue-500" size={24} />;
      case 'delivered':
        return <CheckCircle className="text-green" size={24} />;
      case 'cancelled':
        return <AlertCircle className="text-accent" size={24} />;
      default:
        return <Clock size={24} />;
    }
  };

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      pending: 'Chờ xác nhận',
      confirmed: 'Đã xác nhận',
      processing: 'Đang xử lý',
      shipped: 'Đang giao',
      delivered: 'Đã giao',
      cancelled: 'Đã hủy',
    };
    return labels[status] || status;
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      pending: 'bg-yellow-100 text-yellow-800',
      confirmed: 'bg-blue-100 text-blue-800',
      processing: 'bg-blue-100 text-blue-800',
      shipped: 'bg-blue-100 text-blue-800',
      delivered: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  return (
    <main className="bg-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/" className="flex items-center gap-2 text-primary hover:underline">
            <ArrowLeft size={20} />
            Quay lại trang chủ
          </Link>
        </div>

        <h1 className="text-3xl font-bold text-primary mb-8">Đơn hàng của tôi</h1>

        {orders.length === 0 ? (
          <div className="text-center py-12">
            <Package size={64} className="text-secondary mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-primary mb-2">Không có đơn hàng</h2>
            <p className="text-muted mb-6">Bạn chưa có đơn hàng nào</p>
            <Link
              href="/products"
              className="bg-primary text-white px-6 py-3 rounded-lg font-bold inline-block hover:bg-blue-700"
            >
              Tiếp tục mua sắm
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order.id} className="border-2 border-secondary rounded-lg overflow-hidden hover:shadow-lg transition">
                {/* Order Header */}
                <div className="bg-card p-4 border-b-2 border-secondary">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-bold text-primary text-lg mb-1">
                        Mã đơn hàng: {order.id}
                      </h3>
                      <p className="text-sm text-muted">
                        Ngày đặt: {new Date(order.createdAt).toLocaleDateString('vi-VN')}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(order.status)}
                      <span className={`px-3 py-1 rounded-full text-sm font-bold ${getStatusColor(order.status)}`}>
                        {getStatusLabel(order.status)}
                      </span>
                    </div>
                  </div>

                  {/* Delivery Info */}
                  <div className="flex items-start gap-2 text-sm text-muted">
                    <MapPin size={16} className="flex-shrink-0 mt-1" />
                    <div>
                      <p>{order.deliveryAddress}</p>
                      <p>{order.phone}</p>
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div className="p-4 border-b-2 border-secondary">
                  <div className="space-y-2">
                    {order.items.map((item, idx) => {
                      const product = products.find((p) => p.id === item.productId);
                      return (
                        <div key={idx} className="flex justify-between text-sm">
                          <span className="text-primary font-medium">
                            {product?.name} x {item.quantity}
                          </span>
                          <span className="font-bold text-primary">
                            {(item.price * item.quantity).toLocaleString('vi-VN')}đ
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Order Total & Action */}
                <div className="bg-card p-4 flex items-center justify-between">
                  <div className="text-right">
                    <p className="text-sm text-muted mb-1">Tổng cộng</p>
                    <p className="text-2xl font-bold text-accent">
                      {order.totalPrice.toLocaleString('vi-VN')}đ
                    </p>
                  </div>
                  <Link
                    href={`/orders/${order.id}`}
                    className="bg-primary text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-700"
                  >
                    Chi tiết
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
