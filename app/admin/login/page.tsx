'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, EyeOff } from 'lucide-react';
import { AuthFrame } from '@/components/common';

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) { setError('Vui lòng nhập đầy đủ thông tin.'); return; }
    if (password.length < 6) { setError('Mật khẩu tối thiểu 6 ký tự.'); return; }
    setError('');
    router.push('/admin');
  };

  return (
    <AuthFrame title="Đăng nhập quản trị viên">
      <div className="p-6 md:p-10 flex justify-center">
        <form onSubmit={handleSubmit} noValidate className="bg-secondary w-full max-w-md rounded-[40px] px-7 md:px-12 py-10">
          <h2 className="text-center text-3xl md:text-4xl font-bold leading-tight text-primary mb-7">
            Đăng nhập<br />Admin
          </h2>
          <div className="space-y-4">
            <input type="text" placeholder="Tên đăng nhập" value={username}
              onChange={(e) => { setUsername(e.target.value); setError(''); }}
              className="w-full px-4 py-3 bg-white border-2 border-black rounded-lg text-foreground placeholder:text-gray-500 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" />

            <div className="relative">
              <input type={showPassword ? 'text' : 'password'} placeholder="Mật khẩu" value={password}
                onChange={(e) => { setPassword(e.target.value); setError(''); }}
                className="w-full pl-4 pr-11 py-3 bg-white border-2 border-black rounded-lg text-foreground placeholder:text-gray-500 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" />
              <button type="button" onClick={() => setShowPassword((v) => !v)} aria-label="Hiện/ẩn mật khẩu"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-primary">
                {showPassword ? <EyeOff size={20} /> : <Lock size={20} />}
              </button>
            </div>

            {error && <p className="text-sm font-medium text-destructive">{error}</p>}

            <div className="text-right">
              <Link href="/auth/forgot-password" className="text-sm font-semibold text-primary hover:underline">Quên mật khẩu?</Link>
            </div>

            <button type="submit"
              className="block mx-auto min-w-[200px] mt-2 px-6 py-3 rounded-full font-bold bg-white border-[2.5px] border-primary text-primary transition hover:bg-primary hover:text-white">
              Đăng nhập
            </button>
          </div>
        </form>
      </div>
    </AuthFrame>
  );
}