// Hàng nút đăng nhập mạng xã hội dùng chung.
const ITEMS = [
  { label: 'Google', color: '#DB4437', d: 'M21.35 11.1H12v3.8h5.35c-.5 2.4-2.5 3.7-5.35 3.7A5.6 5.6 0 1 1 12 6.4c1.4 0 2.7.5 3.6 1.4l2.6-2.6A9.3 9.3 0 1 0 12 21.3c5 0 9.3-3.6 9.3-9.3 0-.6-.05-1.2-.15-1.9z' },
  { label: 'Facebook', color: '#1877F2', d: 'M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.2c-1.2 0-1.6.8-1.6 1.6V12h2.7l-.4 2.9h-2.3v7A10 10 0 0 0 22 12z' },
  { label: 'TikTok', color: '#000000', d: 'M16 2c.3 2.3 1.7 3.8 4 4v3c-1.4 0-2.8-.4-4-1.1V15a6 6 0 1 1-6-6c.3 0 .7 0 1 .1v3.1A3 3 0 1 0 13 15V2h3z' },
];

export function SocialButtons() {
  return (
    <div className="flex justify-center gap-4">
      {ITEMS.map((s) => (
        <a key={s.label} href="#" aria-label={s.label} style={{ color: s.color }}
          className="w-11 h-11 rounded-full bg-white border border-[#c4dcf3] grid place-items-center transition hover:-translate-y-0.5 hover:shadow-md">
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d={s.d} /></svg>
        </a>
      ))}
    </div>
  );
}