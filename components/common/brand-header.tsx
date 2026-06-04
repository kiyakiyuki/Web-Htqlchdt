import Image from 'next/image';

// Header dùng chung cho các trang đăng nhập/đăng ký/admin.
// title: tiêu đề set từ page. actions: nút phụ bên phải (vd dashboard).
export function BrandHeader({ title, actions }: { title: string; actions?: React.ReactNode }) {
  return (
    <header className="bg-secondary flex items-center gap-4 px-6 md:px-9 py-3">
      <Image src="/logo-ptk.png" alt="PTK" width={120} height={70} className="h-11 w-auto" priority />
      <h1 className="text-xl md:text-3xl font-extrabold uppercase tracking-wide text-primary">{title}</h1>
      {actions && <div className="ml-auto flex items-center gap-3">{actions}</div>}
    </header>
  );
}