'use client';

import Link from 'next/link';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import { orders } from '@/data/orders';
import { products } from '@/data/products';
import { BrandHeader, BrandFooter } from '@/components/common';

const formatVND = (n: number) => n.toLocaleString('vi-VN') + ' đ';

const hourly = [
  { h: '8h', v: 3.2 }, { h: '9h', v: 4.1 }, { h: '10h', v: 5.6 },
  { h: '11h', v: 6.0 }, { h: '12h', v: 4.8 }, { h: '13h', v: 5.2 },
  { h: '14h', v: 7.1 }, { h: '15h', v: 8.3 }, { h: '16h', v: 9.5 },
  { h: '17h', v: 11.2 }, { h: '18h', v: 8.7 }, { h: '19h', v: 7.4 },
  { h: '20h', v: 6.1 },
];

export default function AdminDashboard() {
  const totalRevenue = orders.reduce((s, o) => s + o.totalPrice, 0);
  const revToday = Math.round(totalRevenue * 0.2);
  const revYesterday = Math.round(totalRevenue * 0.16);

  const totalBought = orders.reduce((s, o) => s + o.items.reduce((q, it) => q + it.quantity, 0), 0);
  const metrics = [
    { label: 'Khách hàng', value: new Set(orders.map((o) => o.userId)).size.toLocaleString('vi-VN') },
    { label: 'Lượt xem', value: products.reduce((s, p) => s + p.reviews, 0).toLocaleString('vi-VN') },
    { label: 'Đơn hàng', value: orders.length.toLocaleString('vi-VN') },
    { label: 'Sản phẩm', value: products.length.toLocaleString('vi-VN') },
    { label: 'Lượt mua', value: totalBought.toLocaleString('vi-VN') },
    { label: 'Mã giảm giá', value: products.filter((p) => p.discount).length.toLocaleString('vi-VN') },
  ];

  const topProducts = [...products].sort((a, b) => b.reviews - a.reviews).slice(0, 3);
  const today = new Date().toLocaleDateString('vi-VN');

  const actions = (
    <>
      <Link href="/admin/orders" className="bg-primary text-white text-sm font-semibold rounded-lg px-4 py-2 hover:bg-primary/90 transition">
        Tên các shop bán hàng
      </Link>
      <Link href="/admin/login" className="border-2 border-primary text-primary text-sm font-semibold rounded-lg px-4 py-2 hover:bg-primary hover:text-white transition">
        Đăng xuất
      </Link>
    </>
  );

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <BrandHeader title="Dashboard Admin" actions={actions} />

      <main className="flex-1 p-5 md:p-8 space-y-6">
        {/* Doanh thu */}
        <section className="bg-secondary rounded-2xl p-5 md:p-6">
          <div className="flex justify-center mb-5">
            <span className="bg-white border-2 border-primary text-primary font-semibold rounded-lg px-5 py-2 text-sm">{today}</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 items-start">
            <RevCard label="Doanh thu hôm qua" value={formatVND(revYesterday)} />
            <RevCard label="Doanh thu hôm nay" value={formatVND(revToday)} big />
            <RevCard label="Doanh thu tuần này" value={formatVND(totalRevenue)} />
          </div>
        </section>

        {/* 3 panel */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <Panel title="Các chỉ số quan trọng">
            <div className="grid grid-cols-2 gap-3">
              {metrics.map((m) => (
                <div key={m.label} className="bg-white rounded-xl border border-secondary p-3 flex flex-col items-center gap-2">
                  <span className="bg-primary text-white text-xs font-semibold rounded-md px-3 py-1.5 text-center w-full">{m.label}</span>
                  <b className="text-primary text-lg">{m.value}</b>
                </div>
              ))}
            </div>
          </Panel>

          <Panel title="Xu hướng doanh thu hôm nay">
            <div className="bg-white rounded-xl border border-secondary p-3">
              <p className="text-xs font-semibold text-primary mb-1">Doanh thu (triệu đ)</p>
              <div style={{ width: '100%', height: 240 }}>
                <ResponsiveContainer>
                  <BarChart data={hourly} margin={{ top: 5, right: 8, left: -18, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#D7EFFF" vertical={false} />
                    <XAxis dataKey="h" tick={{ fontSize: 11, fill: '#5b6b7e' }} axisLine={{ stroke: '#002A94' }} tickLine={false} />
                    <YAxis tick={{ fontSize: 11, fill: '#5b6b7e' }} axisLine={{ stroke: '#002A94' }} tickLine={false} />
                    <Tooltip cursor={{ fill: 'rgba(0,42,148,0.06)' }}
                      formatter={(val: number) => [`${val} triệu đ`, 'Doanh thu']} labelFormatter={(l) => `Lúc ${l}`} />
                    <Bar dataKey="v" fill="#002A94" radius={[4, 4, 0, 0]} maxBarSize={22} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <p className="text-xs font-semibold text-primary text-right mt-1">Giờ</p>
            </div>
          </Panel>

          <Panel title="Top sản phẩm bán chạy">
            <div className="flex flex-col gap-3">
              {topProducts.map((p) => (
                <div key={p.id} className="bg-white rounded-xl border border-secondary p-3 flex items-center gap-3">
                  <span className="text-3xl shrink-0">🖥️</span>
                  <div className="min-w-0">
                    <div className="flex items-baseline gap-2">
                      <span className="text-primary font-bold text-sm">{formatVND(p.price)}</span>
                      {p.originalPrice && <span className="text-gray-400 line-through text-xs">{formatVND(p.originalPrice)}</span>}
                    </div>
                    <p className="text-sm text-foreground truncate">{p.name}</p>
                    <span className="text-xs text-primary font-semibold">{p.rating} ★</span>
                  </div>
                </div>
              ))}
            </div>
          </Panel>
        </section>
      </main>

      <BrandFooter />
    </div>
  );
}

function RevCard({ label, value, big }: { label: string; value: string; big?: boolean }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <span className="bg-primary text-white text-sm font-semibold rounded-lg px-4 py-2 text-center w-full">{label}</span>
      <div className={`bg-white border-2 border-primary rounded-lg w-full text-center font-bold text-primary ${big ? 'py-5 text-2xl md:text-3xl' : 'py-3 text-lg'}`}>
        {value}
      </div>
    </div>
  );
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-secondary rounded-2xl p-4 md:p-5">
      <h3 className="bg-primary text-white text-center font-bold rounded-lg py-2.5 mb-4">{title}</h3>
      {children}
    </div>
  );
}