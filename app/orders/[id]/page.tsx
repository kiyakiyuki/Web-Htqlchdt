'use client';

import Link from 'next/link';
import { orders } from '@/data/orders';
import { products } from '@/data/products';
import { CheckCircle, Package, Truck, MapPin, Clock, AlertCircle, ArrowLeft } from 'lucide-react';

interface PageProps {
  params: Promise<{ id: string }>;
}

const statusSteps = [
  { key: 'pending', label: 'Chờ xác nhận', icon: Clock },
  { key: 'confirmed', label: 'Đã xác nhận', icon: CheckCircle },
  { key: 'processing', label: 'Đang xử lý', icon: Package },
  { key: 'shipped', label: 'Đang giao', icon: Truck },
  { key: 'delivered', label: 'Đã giao', icon: CheckCircle },
];

export default async function OrderDetailPage({ params }: PageProps) {
  const { id } = await params;
  const order = orders.find((o) => o.id === id);

  if (!order) {
    return (
      <main className="max-w-7xl mx-auto px-4 py-8">
        <Link href="/orders" className="flex items-center gap-2 text-primary hover:underline mb-4">
          <ArrowLeft size={20} />
          Quay lại danh sách đơn hàng
        </Link>
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-primary">Đơn hàng không tìm thấy</h1>
        </div>
      </main>
    );
  }

  const currentStatusIndex = statusSteps.findIndex((s) => s.key === order.status);
  const isDelivered = order.status === 'delivered';
  const isCancelled = order.status === 'cancelled';

  return (
    <main className="bg-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="mb-8">
          <Link href="/orders" className="flex items-center gap-2 text-primary hover:underline">
            <ArrowLeft size={20} />
            Quay lại danh sách đơn hàng
          </Link>
        </div>

        <h1 className="text-3xl font-bold text-primary mb-8">
          Chi tiết đơn hàng {order.id}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="md:col-span-2 space-y-6">
            {/* Status Timeline */}
            {!isCancelled && (
              <div className="bg-card rounded-lg p-6">
                <h2 className="font-bold text-primary mb-6">Trạng thái đơn hàng</h2>
                <div className="flex items-center justify-between">
                  {statusSteps.map((step, index) => {
                    const Icon = step.icon;
                    const isActive = index <= currentStatusIndex;
                    const isCompleted = index < currentStatusIndex;

                    return (
                      <div key={step.key} className="flex flex-col items-center flex-1">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                            isActive
                              ? 'bg-primary text-white'
                              : 'bg-gray-300 text-gray-500'
                          }`}
                        >
                          <Icon size={20} />
                        </div>
                        <span
                          className={`text-xs font-bold text-center ${
                            isActive ? 'text-primary' : 'text-muted'
                          }`}
                        >
                          {step.label}
                        </span>
                        {index < statusSteps.length - 1 && (
                          <div
                            className={`h-1 flex-1 mx-2 mt-2 ${
                              isCompleted ? 'bg-primary' : 'bg-gray-300'
                            }`}
                          ></div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {isCancelled && (
              <div className="bg-red-100 border-2 border-red-500 rounded-lg p-6">
                <div className="flex items-center gap-3">
                  <AlertCircle className="text-red-600" size={32} />
                  <div>
                    <h3 className="font-bold text-red-600 text-lg">Đơn hàng đã bị hủy</h3>
                    <p className="text-red-600 text-sm">
                      Đơn hàng này đã bị hủy và không thể xử lý tiếp
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Delivery Information */}
            <div className="bg-card rounded-lg p-6">
              <h2 className="font-bold text-primary mb-4">Thông tin giao hàng</h2>
              <div className="space-y-3">
                <div className="flex gap-3">
                  <MapPin className="text-primary flex-shrink-0" size={20} />
                  <div>
                    <p className="text-sm text-muted">Địa chỉ giao hàng</p>
                    <p className="font-bold text-primary">{order.deliveryAddress}</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="text-sm text-muted">Người nhận:</span>
                  <p className="font-bold text-primary">
                    {order.email} / {order.phone}
                  </p>
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div className="bg-card rounded-lg p-6">
              <h2 className="font-bold text-primary mb-4">Chi tiết sản phẩm</h2>
              <div className="space-y-4">
                {order.items.map((item, idx) => {
                  const product = products.find((p) => p.id === item.productId);
                  return (
                    <div key={idx} className="border-b-2 border-secondary pb-4 last:border-b-0 last:pb-0">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-bold text-primary">{product?.name}</h3>
                          <p className="text-sm text-muted">Số lượng: {item.quantity}</p>
                        </div>
                        <span className="font-bold text-primary">
                          {item.price.toLocaleString('vi-VN')}đ / cái
                        </span>
                      </div>
                      <div className="text-right">
                        <p className="text-accent font-bold">
                          Tổng: {(item.price * item.quantity).toLocaleString('vi-VN')}đ
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="md:col-span-1">
            {/* Order Summary */}
            <div className="bg-card rounded-lg p-6 sticky top-4">
              <h2 className="font-bold text-primary mb-4 text-lg">Tóm tắt đơn hàng</h2>

              <div className="space-y-3 pb-4 border-b-2 border-secondary mb-4">
                {order.items.map((item, idx) => {
                  const product = products.find((p) => p.id === item.productId);
                  return (
                    <div key={idx} className="flex justify-between text-sm">
                      <span className="text-muted">{product?.name} x {item.quantity}</span>
                      <span className="font-bold">
                        {(item.price * item.quantity).toLocaleString('vi-VN')}đ
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted">Tạm tính:</span>
                  <span className="font-bold">{order.totalPrice.toLocaleString('vi-VN')}đ</span>
                </div>
              </div>

              <div className="flex justify-between mb-4 pt-4 border-t-2 border-secondary">
                <span className="font-bold text-primary">Tổng cộng:</span>
                <span className="font-bold text-accent text-xl">
                  {order.totalPrice.toLocaleString('vi-VN')}đ
                </span>
              </div>

              {isDelivered && (
                <button className="w-full bg-primary text-white py-2 rounded-lg font-bold hover:bg-blue-700 mb-2">
                  Để lại đánh giá
                </button>
              )}

              {!isCancelled && order.status !== 'delivered' && (
                <button className="w-full border-2 border-accent text-accent py-2 rounded-lg font-bold hover:bg-red-50">
                  Hủy đơn hàng
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
