'use client';

import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { 
  X, 
  Phone, 
  ShieldCheck, 
  ArrowRight, 
  Lock, 
  Building2, 
  User as UserIcon,
  LogOut
} from 'lucide-react';

export default function AuthModal() {
  const { isAuthOpen, setIsAuthOpen, user, login, logout } = useCart();

  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [phone, setPhone] = useState('+998 ');
  const [otp, setOtp] = useState('');
  const [role, setRole] = useState<'B2C' | 'B2B'>('B2C');
  const [companyName, setCompanyName] = useState('');
  const [inn, setInn] = useState('');

  if (!isAuthOpen) return null;

  const handleSendCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length < 9) {
      alert("Iltimos, to'liq telefon raqamingizni kiriting!");
      return;
    }
    setStep('otp');
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    login(phone, role, role === 'B2B' ? {
      companyName: companyName || 'Yangi Hamkor MCHJ',
      inn: inn || '309999888',
      mfo: '00448',
      bankAccount: '20208000100200300400',
      vatCertificate: '123456789',
    } : undefined);
    setIsAuthOpen(false);
    setStep('phone');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 md:p-8 shadow-2xl relative border border-gray-100">
        
        {/* Close Button */}
        <button
          onClick={() => setIsAuthOpen(false)}
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {user ? (
          /* Profile view */
          <div className="space-y-4 text-center py-4">
            <div className="w-16 h-16 rounded-full bg-blue-50 text-jio-blue flex items-center justify-center mx-auto text-2xl font-black">
              {user.name ? user.name[0] : 'U'}
            </div>
            <div>
              <h3 className="text-xl font-black text-gray-900">{user.name}</h3>
              <p className="text-xs text-gray-500 mt-1">{user.phone}</p>
              <span className={`inline-block mt-2 text-xs font-bold px-3 py-1 rounded-full ${
                user.role === 'B2B' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-jio-blue'
              }`}>
                {user.role === 'B2B' ? 'B2B Korporativ Mijoz' : 'Jismoniy Shaxs (B2C)'}
              </span>
            </div>

            <div className="pt-4 border-t border-gray-100">
              <button
                onClick={() => {
                  logout();
                  setIsAuthOpen(false);
                }}
                className="w-full bg-rose-50 hover:bg-rose-100 text-rose-600 font-bold py-3 rounded-2xl flex items-center justify-center gap-2 text-sm transition"
              >
                <LogOut className="w-4 h-4" /> Tizimdan Chiqish
              </button>
            </div>
          </div>
        ) : (
          /* Login Form */
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-jio-blue">
                <Lock className="w-4 h-4" />
              </div>
              <span className="text-xs font-black text-jio-blue uppercase tracking-wider">
                Jio Tezkor Kirish
              </span>
            </div>

            <h3 className="text-2xl font-black text-gray-900 tracking-tight">
              {step === 'phone' ? 'Telefon orqali kirish' : 'Kodni tasdiqlang'}
            </h3>
            <p className="text-xs text-gray-500 mb-6">
              {step === 'phone' 
                ? 'Parolsiz, SMS orqali bir lahzada profilingizga kiring' 
                : `${phone} raqamiga yuborilgan 4 xonali SMS kodni kiriting`}
            </p>

            {step === 'phone' ? (
              <form onSubmit={handleSendCode} className="space-y-4">
                {/* Role Switcher */}
                <div className="grid grid-cols-2 gap-2 p-1 bg-gray-100 rounded-2xl">
                  <button
                    type="button"
                    onClick={() => setRole('B2C')}
                    className={`py-2 text-xs font-bold rounded-xl transition flex items-center justify-center gap-1.5 ${
                      role === 'B2C' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'
                    }`}
                  >
                    <UserIcon className="w-3.5 h-3.5" /> B2C Mijoz
                  </button>
                  <button
                    type="button"
                    onClick={() => setRole('B2B')}
                    className={`py-2 text-xs font-bold rounded-xl transition flex items-center justify-center gap-1.5 ${
                      role === 'B2B' ? 'bg-white text-purple-700 shadow-sm' : 'text-gray-500'
                    }`}
                  >
                    <Building2 className="w-3.5 h-3.5" /> B2B Yuridik Shaxs
                  </button>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">
                    Telefon Raqam:
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      placeholder="+998 90 123 45 67"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-white border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-sm font-bold focus:border-jio-blue focus:outline-none"
                    />
                  </div>
                </div>

                {role === 'B2B' && (
                  <div className="space-y-3 pt-1">
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1">
                        Korxona Nomi:
                      </label>
                      <input
                        type="text"
                        placeholder='"Print Tech" MCHJ'
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        className="w-full bg-white border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs focus:border-jio-blue focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1">
                        INN (9 xonali):
                      </label>
                      <input
                        type="text"
                        placeholder="308123456"
                        value={inn}
                        onChange={(e) => setInn(e.target.value)}
                        className="w-full bg-white border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs focus:border-jio-blue focus:outline-none"
                      />
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full bg-jio-blue hover:bg-jio-dark text-white py-3.5 rounded-2xl font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-blue-900/10 transition"
                >
                  SMS Kodni Olish <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            ) : (
              <form onSubmit={handleVerifyOtp} className="space-y-4">
                <div className="p-3 bg-blue-50 border border-blue-100 rounded-xl text-[11px] text-jio-blue">
                  Demo rejimida istalgan 4 xonali kodni kiritishingiz mumkin (Masalan: <strong>1234</strong>)
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">
                    SMS Kod:
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={4}
                    placeholder="1 2 3 4"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="w-full text-center tracking-widest text-2xl font-black bg-white border border-gray-200 rounded-xl py-3 focus:border-jio-blue focus:outline-none"
                  />
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setStep('phone')}
                    className="w-1/3 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-2xl font-bold text-xs transition"
                  >
                    Ortga
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-jio-blue hover:bg-jio-dark text-white py-3 rounded-2xl font-black text-xs md:text-sm shadow-md transition"
                  >
                    Tasdiqlash & Kirish
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
