import { BrandHeader } from './brand-header';
import { BrandFooter } from './brand-footer';

// Khung dùng chung cho các trang /auth: nền xám + khung trắng bo tròn
// + header (theo title) + footer. Page chỉ cần truyền phần giữa qua children.
export function AuthFrame({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#EDEFF3] p-3 md:p-7">
      <div className="max-w-5xl mx-auto bg-white border border-[#C9CDD4] rounded-[36px] overflow-hidden shadow-[0_10px_40px_-28px_rgba(0,26,94,0.45)]">
        <BrandHeader title={title} />
        {children}
        <BrandFooter />
      </div>
    </div>
  );
}