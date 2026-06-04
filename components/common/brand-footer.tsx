import Image from 'next/image';
import Link from 'next/link';

const COLS = [
  { title: 'Giới thiệu', links: ['Giới thiệu về PetPicks', 'Hệ thống cửa hàng', 'Tuyển dụng', 'Liên hệ, tuyển dụng'] },
  { title: 'Chính sách', links: ['Điều khoản & dịch vụ', 'Chính sách bảo mật', 'Quy định bảo hành', 'Hình thức thanh toán'] },
  { title: 'Tài khoản', links: ['Thay đổi thông tin', 'Lấy lại mật khẩu', 'Lịch sử mua hàng', 'Quản lí giỏ hàng'] },
  { title: 'Hỗ trợ', links: ['Hướng dẫn mua hàng', 'Khuyến mãi', 'Giao nhận hàng hóa', 'Khiếu nại bồi thường'] },
];

// Footer dùng chung (4 cột + logo tròn). Giống nhau ở mọi trang nên để ở common.
export function BrandFooter() {
  return (
    <footer className="bg-secondary text-primary px-6 md:px-9 py-8">
      <div className="flex flex-wrap items-start gap-x-10 gap-y-7">
        {COLS.map((c) => (
          <div key={c.title} className="min-w-[150px]">
            <h4 className="font-extrabold uppercase tracking-wide text-sm mb-3">{c.title}</h4>
            <ul className="space-y-2">
              {c.links.map((l) => (
                <li key={l}>
                  <Link href="#" className="text-sm text-primary/80 hover:text-primary hover:underline">{l}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div className="ml-auto self-center">
          <Image src="/logo-ptk-footer.png" alt="PTK" width={120} height={70} className="h-14 w-auto" />
        </div>
      </div>
    </footer>
  );
}