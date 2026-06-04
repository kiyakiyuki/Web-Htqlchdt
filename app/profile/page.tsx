'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, User, Lock, LogOut, Edit2, Save } from 'lucide-react';

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    fullName: 'Nguyễn Văn A',
    email: 'nguyenvana@example.com',
    phone: '0123456789',
    address: '123 Đường ABC, Thành phố HCM',
    joinDate: '2024-01-15',
  });
  const [tempData, setTempData] = useState(userData);

  const handleEdit = () => {
    setIsEditing(true);
    setTempData(userData);
  };

  const handleSave = () => {
    setUserData(tempData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <main className="bg-white py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-primary mb-2">Hồ sơ cá nhân</h1>
          <p className="text-muted">Quản lý thông tin tài khoản của bạn</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Sidebar */}
          <aside className="md:col-span-1">
            <div className="bg-card rounded-xl p-6 sticky top-4">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <User size={40} className="text-white" />
                </div>
                <h2 className="font-bold text-primary">{userData.fullName}</h2>
                <p className="text-sm text-muted">{userData.email}</p>
              </div>

              <nav className="space-y-2">
                <Link
                  href="/profile"
                  className="block px-4 py-2 rounded-lg bg-primary text-white font-medium"
                >
                  Thông tin cá nhân
                </Link>
                <Link
                  href="/orders"
                  className="block px-4 py-2 rounded-lg hover:bg-secondary text-primary font-medium transition"
                >
                  Đơn hàng của tôi
                </Link>
                <Link
                  href="/auth/forgot-password"
                  className="block px-4 py-2 rounded-lg hover:bg-secondary text-primary font-medium transition"
                >
                  Đổi mật khẩu
                </Link>
                <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-accent hover:text-white text-primary font-medium transition">
                  <LogOut size={16} className="inline mr-2" />
                  Đăng xuất
                </button>
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <div className="md:col-span-3">
            <div className="bg-card rounded-xl p-8">
              {/* Header */}
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold text-primary">Thông tin tài khoản</h2>
                {!isEditing && (
                  <button
                    onClick={handleEdit}
                    className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition"
                  >
                    <Edit2 size={18} />
                    Chỉnh sửa
                  </button>
                )}
              </div>

              {/* Profile Form */}
              <div className="space-y-6">
                {/* Full Name */}
                <div>
                  <label className="block text-primary font-bold mb-2">Họ và tên</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={tempData.fullName}
                      onChange={(e) => setTempData({ ...tempData, fullName: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  ) : (
                    <p className="text-foreground">{userData.fullName}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="flex items-center gap-2 text-primary font-bold mb-2">
                    <Mail size={18} />
                    Email
                  </label>
                  <p className="text-foreground">{userData.email}</p>
                  <p className="text-xs text-muted mt-1">Email không thể thay đổi</p>
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-primary font-bold mb-2">
                    <Phone size={18} className="inline mr-2" />
                    Số điện thoại
                  </label>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={tempData.phone}
                      onChange={(e) => setTempData({ ...tempData, phone: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  ) : (
                    <p className="text-foreground">{userData.phone}</p>
                  )}
                </div>

                {/* Address */}
                <div>
                  <label className="block text-primary font-bold mb-2">
                    <MapPin size={18} className="inline mr-2" />
                    Địa chỉ
                  </label>
                  {isEditing ? (
                    <textarea
                      value={tempData.address}
                      onChange={(e) => setTempData({ ...tempData, address: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      rows={3}
                    />
                  ) : (
                    <p className="text-foreground">{userData.address}</p>
                  )}
                </div>

                {/* Join Date */}
                <div>
                  <label className="block text-primary font-bold mb-2">Ngày tham gia</label>
                  <p className="text-foreground">{new Date(userData.joinDate).toLocaleDateString('vi-VN')}</p>
                </div>

                {/* Action Buttons */}
                {isEditing && (
                  <div className="flex gap-3 pt-6 border-t-2 border-secondary">
                    <button
                      onClick={handleSave}
                      className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg hover:bg-blue-800 transition font-bold"
                    >
                      <Save size={18} />
                      Lưu thay đổi
                    </button>
                    <button
                      onClick={handleCancel}
                      className="flex items-center gap-2 bg-white text-primary border-2 border-primary px-6 py-3 rounded-lg hover:bg-secondary transition font-bold"
                    >
                      Hủy
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Security Section */}
            <div className="bg-card rounded-xl p-8 mt-6">
              <h2 className="text-2xl font-bold text-primary mb-6 flex items-center gap-2">
                <Lock size={24} />
                Bảo mật
              </h2>

              <div className="space-y-4">
                <Link
                  href="/auth/forgot-password"
                  className="block p-4 border-2 border-primary rounded-lg hover:bg-secondary transition"
                >
                  <h3 className="font-bold text-primary mb-1">Đổi mật khẩu</h3>
                  <p className="text-sm text-muted">Cập nhật mật khẩu của bạn để giữ an toàn</p>
                </Link>

                <div className="p-4 border-2 border-primary rounded-lg">
                  <h3 className="font-bold text-primary mb-1">Xác thực hai yếu tố</h3>
                  <p className="text-sm text-muted mb-3">Bảo vệ tài khoản của bạn bằng xác thực hai yếu tố</p>
                  <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition text-sm font-bold">
                    Kích hoạt
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
