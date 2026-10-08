'use client';

import React from 'react';
import { useCart } from '../context/CartContext';
import { CheckCircle2, AlertTriangle, Info } from 'lucide-react';

export default function Toast() {
  const { toast } = useCart();

  if (!toast) return null;

  const bgConfig = {
    success: 'bg-emerald-600 text-white shadow-emerald-900/20',
    warning: 'bg-amber-500 text-white shadow-amber-900/20',
    info: 'bg-jio-blue text-white shadow-blue-900/20',
  };

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 flex-shrink-0" />,
    warning: <AlertTriangle className="w-5 h-5 flex-shrink-0" />,
    info: <Info className="w-5 h-5 flex-shrink-0" />,
  };

  return (
    <div className="fixed bottom-20 md:bottom-8 right-4 left-4 md:left-auto md:right-8 z-[100] max-w-md animate-in fade-in slide-in-from-bottom-5 duration-300">
      <div className={`flex items-center gap-3 px-5 py-4 rounded-2xl shadow-xl backdrop-blur-md ${bgConfig[toast.type]}`}>
        {icons[toast.type]}
        <p className="text-sm font-semibold leading-snug">{toast.message}</p>
      </div>
    </div>
  );
}
