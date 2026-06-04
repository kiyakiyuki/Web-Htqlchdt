'use client';

import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-secondary text-primary mt-12">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          {/* Column 1 */}
          <div>
            <h3 className="font-bold mb-4">GỚI THIỆU</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="hover:underline">
                  Về PTK
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  Tuyển dụng
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  Truyền thông
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  Nhà đầu tư
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2 */}
          <div>
            <h3 className="font-bold mb-4">CHÍNH SÁCH</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="hover:underline">
                  Điều khoản & điều kiện
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  Chính sách bảo mật
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  Liên hệ khách hàng
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h3 className="font-bold mb-4">TÀI KHOẢN</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/auth/login" className="hover:underline">
                  Đăng nhập
                </Link>
              </li>
              <li>
                <Link href="/auth/register" className="hover:underline">
                  Đăng ký
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  Hỗ trợ
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4 - Logo */}
          <div className="flex items-start justify-start">
            <div className="bg-white rounded-lg p-3 font-bold text-primary text-2xl">
              PTK
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-primary pt-6 text-center text-sm">
          <p>© 2024 PTK Electronics. Tất cả quyền được bảo lưu.</p>
        </div>
      </div>
    </footer>
  );
}