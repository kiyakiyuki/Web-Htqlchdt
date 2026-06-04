'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { User, Lock, EyeOff } from 'lucide-react';
import { AuthFrame, SocialButtons } from '@/components/common';

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ username: '', password: '', repassword: '', email: '' });
  const [agree, setAgree] = useState(false);
  const [showPw, setShowPw] = useState(false);
  const [showRe, setShowRe] = useState(false);
  const [error, setError] = useState('');

  const set = (k: string, v: string) => { setForm((f) => ({ ...f, [k]: v })); setError(''); };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.username.trim() || !form.password || !form.repassword || !form.email.trim()) { setError('Vui lòng nhập đầy đủ thông tin.'); return; }
    if (form.password.length < 6) { setError('Mật khẩu tối thiểu 6 ký tự.'); return; }
    if (form.password !== form.repassword) { setError('Mật khẩu nhập lại không khớp.'); return; }
    if (!emailRe.test(form.email)) { setError('Email không hợp lệ.'); return; }
    if (!agree) { setError('Bạn cần đồng ý với điều khoản & điều kiện.'); return; }
    setError('');
    router.push('/auth/login');
  };

  const inputCls = 'w-full pl-4 pr-11 py-3 bg-white border-2 border-black rounded-lg text-foreground placeholder:text-gray-500 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20';

  return (
    <AuthFrame title="Đăng ký">
      <div className="grid md:grid-cols-2 p-5 md:p-8 gap-4">
        {/* Form */}
        <form onSubmit={handleSubmit} noValidate className="flex flex-col justify-center px-1 md:px-6 py-4">
          <h2 className="text-3xl md:text-4xl font-bold text-primary text-center mb-6">Đăng ký</h2>
          <div className="space-y-4 max-w-sm w-full mx-auto">
            <div className="relative">
              <input type="text" placeholder="Tên đăng nhập" value={form.username} onChange={(e) => set('username', e.target.value)} className={inputCls} />
              <User size={20} className="absolute right-3 top-1/2 -translate-y-1/2 text-primary" />
            </div>

            <div className="relative">
              <input type={showPw ? 'text' : 'password'} placeholder="Mật khẩu" value={form.password} onChange={(e) => set('password', e.target.value)} className={inputCls} />
              <button type="button" onClick={() => setShowPw((v) => !v)} aria-label="Hiện/ẩn mật khẩu" className="absolute right-3 top-1/2 -translate-y-1/2 text-primary">
                {showPw ? <EyeOff size={20} /> : <Lock size={20} />}
              </button>
            </div>

            <div className="relative">
              <input type={showRe ? 'text' : 'password'} placeholder="Nhập lại mật khẩu" value={form.repassword} onChange={(e) => set('repassword', e.target.value)} className={inputCls} />
              <button type="button" onClick={() => setShowRe((v) => !v)} aria-label="Hiện/ẩn mật khẩu" className="absolute right-3 top-1/2 -translate-y-1/2 text-primary">
                {showRe ? <EyeOff size={20} /> : <Lock size={20} />}
              </button>
            </div>

            <input type="email" placeholder="Email" value={form.email} onChange={(e) => set('email', e.target.value)}
              className="w-full px-4 py-3 bg-white border-2 border-black rounded-lg text-foreground placeholder:text-gray-500 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" />

            <label className="flex items-start gap-2 text-sm text-primary/90 cursor-pointer select-none">
              <input type="checkbox" checked={agree} onChange={(e) => { setAgree(e.target.checked); setError(''); }} className="mt-0.5 w-4 h-4 accent-primary" />
              <span>Tôi đồng ý với <Link href="#" className="font-semibold underline">Điều khoản &amp; Điều kiện</Link> của PTK</span>
            </label>

            {error && <p className="text-sm font-medium text-destructive">{error}</p>}

            <button type="submit"
              className="block mx-auto min-w-[200px] px-6 py-3 rounded-full font-bold bg-white border-[2.5px] border-primary text-primary transition hover:bg-primary hover:text-white">
              Đăng ký
            </button>
          </div>
        </form>

        {/* Aside */}
        <aside className="bg-secondary rounded-[40px] flex flex-col items-center justify-center text-center gap-5 p-10 m-1">
          <h3 className="text-primary text-lg font-semibold">Bạn đã có tài khoản?</h3>
          <Link href="/auth/login"
            className="min-w-[200px] text-center px-6 py-3 rounded-full font-bold bg-white border-[2.5px] border-primary text-primary transition hover:bg-primary hover:text-white">
            Đăng nhập
          </Link>
          <p className="text-sm text-primary/70">Hoặc đăng ký bằng phương thức khác</p>
          <SocialButtons />
        </aside>
      </div>
    </AuthFrame>
  );
}