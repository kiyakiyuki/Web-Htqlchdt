'use client';

import { useState } from 'react';
import { Package } from 'lucide-react';
import { orders } from '@/data/orders';
import { products } from '@/data/products';
import { Header, BrandFooter } from '@/components/common';

const formatVND = (n: number) => n.toLocaleString('vi-VN') + ' đ';
const productMap = Object.fromEntries(products.map((p) => [p.id, p]));

const TABS = [
  { key: 'all', label: 'Tất cả' },
  { key: 'pending', label: 'Chờ xác nhận' },
  { key: 'confirmed', label: 'Chờ lấy hàng' },
  { key: 'shipped', label: 'Đang giao' },
  { key: 'delivered', label: 'Đã giao' },
  { key: 'cancelled', label: 'Đã hủy' },
];

const BADGE: Record<string, string> = {
  shipped: 'Đang giao hàng',
  delivered: 'Đã giao hàng',
  cancelled: 'Đã hủy',
};

export default function SellerOrdersPage() {
  const [tab, setTab] = useState('all');
  const [search, setSearch] = useState('');
  const [visible, setVisible] = useState(4);

  const matchTab = (s: string) =>
    tab === 'all' ? true : tab === 'confirmed' ? s === 'confirmed' || s === 'processing' : s === tab;

  const list = orders.filter((o) => {
    if (!matchTab(o.status)) return false;
    if (!search.trim()) return true;
    const name = productMap[o.items[0]?.productId]?.name ?? '';
    return name.toLowerCase().includes(search.toLowerCase()) || o.id.toLowerCase().includes(search.toLowerCase());
  });
  const shown = list.slice(0, visible);

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 py-6">
        {/* Tabs lọc trạng thái */}
        <div className="flex flex-wrap justify-center gap-2 mb-5">
          {TABS.map((t) => (
            <button key={t.key} onClick={() => { setTab(t.key); setVisible(4); }}
              className={`px-4 py-2 rounded-lg text-sm font-semibold border-2 border-primary transition ${
                tab === t.key ? 'bg-white text-primary' : 'bg-primary text-white hover:bg-primary/90'
              }`}>
              {t.label}
            </button>
          ))}
        </div>

        {/* Tìm kiếm đơn */}
        <div className="flex justify-center mb-6">
          <input value={search} onChange={(e) => { setSearch(e.target.value); setVisible(4); }}
            placeholder="Tìm kiếm đơn hàng"
            className="w-full max-w-xl px-4 py-2.5 border-2 border-primary rounded-lg text-center placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20" />
        </div>

        {/* Danh sách đơn */}
        <div className="space-y-4">
          {shown.length === 0 && (
            <p className="text-center text-muted py-10">Không có đơn hàng nào.</p>
          )}
          {shown.map((o) => {
            const item = o.items[0];
            const p = productMap[item?.productId];
            return (
              <div key={o.id} className="bg-secondary rounded-2xl p-4 flex flex-col md:flex-row gap-4 items-center">
                {/* Ảnh */}
                <div className="w-28 h-24 bg-white rounded-lg border border-primary/20 grid place-items-center shrink-0">
                  <Package size={34} className="text-primary/40" />
                </div>

                {/* Thông tin */}
                <div className="flex-1 grid grid-cols-3 gap-3 w-full">
                  <Field label="Tên sản phẩm" value={p?.name ?? 'Sản phẩm'} />
                  <Field label="Giá cả" value={formatVND(item?.price ?? 0)} />
                  <Field label="Thành tiền" value={formatVND(o.totalPrice)} />
                </div>

                {/* Nút thao tác */}
                <div className="flex flex-col gap-2 w-full md:w-auto shrink-0">
                  {BADGE[o.status] ? (
                    <>
                      <span className="bg-[#FF696B] text-white text-sm font-semibold rounded-lg px-4 py-2 text-center">
                        {BADGE[o.status]}
                      </span>
                      <button className="border-2 border-primary text-primary text-sm font-semibold rounded-lg px-4 py-2 hover:bg-primary hover:text-white transition">
                        Liên hệ khách hàng
                      </button>
                    </>
                  ) : (
                    <>
                      <button className="bg-[#FF696B] text-white text-sm font-semibold rounded-lg px-4 py-2 hover:bg-[#ef4d4f] transition">
                        Hủy đơn hàng
                      </button>
                      <button className="border-2 border-primary text-primary text-sm font-semibold rounded-lg px-4 py-2 hover:bg-primary hover:text-white transition">
                        Liên hệ khách hàng
                      </button>
                      <button className="bg-primary text-white text-sm font-semibold rounded-lg px-4 py-2 hover:bg-primary/90 transition">
                        Xác nhận đơn hàng
                      </button>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Xem thêm */}
        {visible < list.length && (
          <div className="flex justify-center mt-6">
            <button onClick={() => setVisible((v) => v + 4)}
              className="bg-primary text-white font-semibold rounded-lg px-8 py-2.5 hover:bg-primary/90 transition">
              Xem thêm
            </button>
          </div>
        )}
      </main>

      <BrandFooter />
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col items-center gap-1.5 text-center">
      <span className="bg-white border-2 border-primary text-primary text-xs md:text-sm font-semibold rounded-lg px-3 py-1.5 w-full">
        {label}
      </span>
      <span className="text-sm text-foreground">{value}</span>
    </div>
  );
}