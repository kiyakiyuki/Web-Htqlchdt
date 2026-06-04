'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, EyeOff } from 'lucide-react';
import { AuthFrame } from '@/components/common';

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRe = /^0\d{9}$/;

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [method, setMethod] = useState<'email' | 'phone'>('email');

  const [username, setUsername] = useState('');
  const [contact, setContact] = useState(''); // email hoặc sđt
  const [otp, setOtp] = useState('');
  const [pw, setPw] = useState('');
  const [rePw, setRePw] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [showRe, setShowRe] = useState(false);
  const [error, setError] = useState('');
  const [seconds, setSeconds] = useState(30);

  // đếm ngược gửi lại OTP khi vào bước 2
  useEffect(() => {
    if (step !== 2) return;
    setSeconds(30);
    const id = setInterval(() => setSeconds((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(id);
  }, [step]);

  const inputCls =
    'w-full px-4 py-3 bg-white border-2 border-black rounded-lg text-foreground placeholder:text-gray-500 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20';
  const pwCls =
    'w-full pl-4 pr-11 py-3 bg-white border-2 border-black rounded-lg text-foreground placeholder:text-gray-500 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20';

  const submitStep1 = () => {
    if (!username.trim() || !contact.trim()) { setError('Vui lòng nhập đầy đủ thông tin.'); return; }
    if (method === 'email' && !emailRe.test(contact)) { setError('Email không hợp lệ.'); return; }
    if (method === 'phone' && !phoneRe.test(contact)) { setError('Số điện thoại phải gồm 10 số, bắt đầu bằng 0.'); return; }
    setError(''); setStep(2);
  };
  const submitStep2 = () => {
    if (!/^\d{6}$/.test(otp)) { setError('Mã OTP gồm 6 chữ số.'); return; }
    setError(''); setStep(3);
  };
  const submitStep3 = () => {
    if (pw.length < 6) { setError('Mật khẩu tối thiểu 6 ký tự.'); return; }
    if (pw !== rePw) { setError('Mật khẩu nhập lại không khớp.'); return; }
    setError(''); router.push('/auth/login');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) submitStep1();
    else if (step === 2) submitStep2();
    else submitStep3();
  };

  return (
    <AuthFrame title="Đặt lại mật khẩu">
      <div className="p-6 md:p-10 flex justify-center">
        <form onSubmit={handleSubmit} noValidate className="bg-secondary w-full max-w-md rounded-[40px] px-7 md:px-10 py-10">
          <h2 className="text-center text-2xl md:text-3xl font-bold text-primary mb-2">Đặt lại mật khẩu</h2>

          {/* chấm tiến trình */}
          <div className="flex justify-center gap-2 mb-6">
            {[1, 2, 3].map((n) => (
              <span key={n} className={`h-2 rounded-full transition-all ${n === step ? 'w-6 bg-primary' : 'w-2 bg-primary/30'}`} />
            ))}
          </div>

          {/* ===== Bước 1 ===== */}
          {step === 1 && (
            <div className="space-y-4">
              <div className="flex gap-2 justify-center">
                {(['email', 'phone'] as const).map((m) => (
                  <button key={m} type="button"
                    onClick={() => { setMethod(m); setContact(''); setError(''); }}
                    className={`px-4 py-2 rounded-full text-sm font-semibold border-2 border-primary transition ${
                      method === m ? 'bg-primary text-white' : 'bg-white text-primary'
                    }`}>
                    {m === 'email' ? 'Email' : 'Số điện thoại'}
                  </button>
                ))}
              </div>
              <input type="text" placeholder="Tên đăng nhập" value={username}
                onChange={(e) => { setUsername(e.target.value); setError(''); }} className={inputCls} />
              <input
                type={method === 'email' ? 'email' : 'tel'}
                placeholder={method === 'email' ? 'Email' : 'Số điện thoại'}
                value={contact}
                onChange={(e) => { setContact(e.target.value); setError(''); }}
                className={inputCls}
              />
            </div>
          )}

          {/* ===== Bước 2 ===== */}
          {step === 2 && (
            <div className="space-y-4">
              <p className="text-center text-sm text-primary/80 leading-relaxed">
                Mã OTP gồm 6 chữ số đã được gửi tới {method === 'email' ? 'email' : 'số điện thoại'}{' '}
                <b className="text-primary">{contact}</b>. Vui lòng nhập mã để tiếp tục.
              </p>
              <input type="text" inputMode="numeric" maxLength={6} placeholder="Nhập mã OTP" value={otp}
                onChange={(e) => { setOtp(e.target.value.replace(/\D/g, '')); setError(''); }}
                className={`${inputCls} text-center tracking-[0.4em]`} />
              <div className="text-right">
                <button type="button" disabled={seconds > 0}
                  onClick={() => setSeconds(30)}
                  className={`text-sm font-semibold ${seconds > 0 ? 'text-primary/40 cursor-not-allowed' : 'text-primary hover:underline'}`}>
                  {seconds > 0 ? `Gửi lại mã sau ${seconds}s` : 'Gửi lại mã OTP'}
                </button>
              </div>
            </div>
          )}

          {/* ===== Bước 3 ===== */}
          {step === 3 && (
            <div className="space-y-4">
              <div className="relative">
                <input type={showPw ? 'text' : 'password'} placeholder="Nhập mật khẩu mới" value={pw}
                  onChange={(e) => { setPw(e.target.value); setError(''); }} className={pwCls} />
                <button type="button" onClick={() => setShowPw((v) => !v)} aria-label="Hiện/ẩn mật khẩu"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-primary">
                  {showPw ? <EyeOff size={20} /> : <Lock size={20} />}
                </button>
              </div>
              <div className="relative">
                <input type={showRe ? 'text' : 'password'} placeholder="Nhập lại mật khẩu mới" value={rePw}
                  onChange={(e) => { setRePw(e.target.value); setError(''); }} className={pwCls} />
                <button type="button" onClick={() => setShowRe((v) => !v)} aria-label="Hiện/ẩn mật khẩu"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-primary">
                  {showRe ? <EyeOff size={20} /> : <Lock size={20} />}
                </button>
              </div>
            </div>
          )}

          {error && <p className="text-sm font-medium text-destructive mt-4 text-center">{error}</p>}

          <button type="submit"
            className="block mx-auto min-w-[200px] mt-6 px-6 py-3 rounded-full font-bold bg-white border-[2.5px] border-primary text-primary transition hover:bg-primary hover:text-white">
            Xác nhận
          </button>
        </form>
      </div>
    </AuthFrame>
  );
}