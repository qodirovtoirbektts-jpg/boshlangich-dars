'use client';

import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { 
  X, 
  Truck, 
  CheckCircle2, 
  Clock, 
  Package, 
  Building2, 
  Download, 
  Search,
  MapPin,
  Check
} from 'lucide-react';

export default function OrderTrackingModal() {
  const { 
    isTrackingOpen, 
    setIsTrackingOpen, 
    orders, 
    activeOrderCode, 
    setActiveOrderCode 
  } = useCart();

  const [searchInput, setSearchInput] = useState('');

  if (!isTrackingOpen) return null;

  const currentOrder = orders.find(
    (o) => o.code.toLowerCase() === (activeOrderCode || searchInput).trim().toLowerCase()
  ) || orders[0];

  const steps = [
    { title: 'Buyurtma qabul qilindi', desc: 'Tizimga muvaffaqiyatli kiritildi', done: true },
    { title: 'To\'lov tasdiqlandi', desc: currentOrder?.paymentMethod ? `${currentOrder.paymentMethod} orqali` : 'Tasdiqlandi', done: true },
    { title: 'Omborda yig\'ilmoqda', desc: '1C ombor zaxirasidan ajratildi', done: true },
    { title: 'Qadoqlandi', desc: 'Himoyalangan paketda tayyor', done: currentOrder?.orderStatus === 'PACKAGED' || currentOrder?.orderStatus === 'COURIER_HANDED' || currentOrder?.orderStatus === 'DELIVERED' },
    { title: 'Kuryerga topshirildi', desc: 'BTS Express yetkazish xizmatida', done: currentOrder?.orderStatus === 'COURIER_HANDED' || currentOrder?.orderStatus === 'DELIVERED' },
    { title: 'Yetkazib berildi', desc: 'Manzilda qabul qilindi', done: currentOrder?.orderStatus === 'DELIVERED' },
  ];

  const handleDownloadInvoice = () => {
    alert(`Didox Elektron Hisob-faktura (${currentOrder?.code}) yuklab olindi! INN: ${currentOrder?.b2bProfile?.inn || '309876543'}`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 md:p-8 shadow-2xl relative border border-gray-100 max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={() => setIsTrackingOpen(false)}
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-jio-blue">
            <Truck className="w-4 h-4" />
          </div>
          <span className="text-xs font-black text-jio-blue uppercase tracking-wider">
            14 Hudud Bo'ylab Jonli Kuzatuv
          </span>
        </div>

        <h3 className="text-2xl font-black text-gray-900 tracking-tight">
          Buyurtma Holatini Kuzatish
        </h3>

        {/* Search by Order Code */}
        <div className="flex gap-2 my-4">
          <div className="flex-1 relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Masalan: TPM-8492"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-10 pr-3.5 py-2.5 text-xs font-bold focus:border-jio-blue focus:outline-none uppercase"
            />
          </div>
          <button
            onClick={() => setActiveOrderCode(searchInput)}
            className="bg-jio-blue text-white font-bold text-xs px-5 rounded-xl hover:bg-jio-dark transition"
          >
            Qidirish
          </button>
        </div>

        {currentOrder ? (
          <div className="space-y-6">
            
            {/* Order Summary Pill */}
            <div className="p-4 bg-blue-50/70 border border-blue-100 rounded-2xl flex flex-wrap items-center justify-between gap-3 text-xs">
              <div>
                <span className="text-[10px] font-bold text-gray-400 uppercase block">Buyurtma Kodi:</span>
                <span className="text-lg font-black text-jio-blue tracking-tight">{currentOrder.code}</span>
              </div>

              <div>
                <span className="text-[10px] font-bold text-gray-400 uppercase block">Qabul Qiluvchi:</span>
                <span className="font-bold text-gray-800">{currentOrder.recipientName}</span>
              </div>

              <div>
                <span className="text-[10px] font-bold text-gray-400 uppercase block">Manzil:</span>
                <span className="font-bold text-gray-800">{currentOrder.region}</span>
              </div>

              <div>
                <span className="text-[10px] font-bold text-gray-400 uppercase block">Jami To'lov:</span>
                <span className="font-black text-gray-900">{currentOrder.totalAmount.toLocaleString('uz-UZ')} so'm</span>
              </div>
            </div>

            {/* Visual Tracking Progress Bar (6 steps) */}
            <div className="py-2">
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-4">
                Buyurtma Marshruti:
              </h4>

              <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-blue-100">
                {steps.map((st, idx) => (
                  <div key={idx} className="relative flex items-start gap-3">
                    <div className={`absolute -left-6 top-0 w-5 h-5 rounded-full flex items-center justify-center text-white ${
                      st.done ? 'bg-emerald-500 ring-4 ring-emerald-100' : 'bg-gray-300 ring-4 ring-gray-100'
                    }`}>
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>

                    <div>
                      <h5 className={`text-xs md:text-sm font-bold ${st.done ? 'text-gray-900' : 'text-gray-400'}`}>
                        {st.title}
                      </h5>
                      <p className="text-[11px] text-gray-500 mt-0.5">{st.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* B2B Didox Electronic Invoice Download */}
            {currentOrder.isB2B && (
              <div className="p-4 bg-purple-50 border border-purple-100 rounded-2xl flex items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2.5">
                  <Building2 className="w-5 h-5 text-purple-700" />
                  <div>
                    <span className="font-bold text-purple-900 block">Didox Elektron Schyot-Faktura</span>
                    <span className="text-[11px] text-purple-700">12% QQS hisoblangan yuridik hujjat</span>
                  </div>
                </div>

                <button
                  onClick={handleDownloadInvoice}
                  className="bg-purple-700 hover:bg-purple-800 text-white font-bold px-4 py-2 rounded-xl flex items-center gap-1.5 transition shadow-sm"
                >
                  <Download className="w-3.5 h-3.5" />
                  Faktura (PDF)
                </button>
              </div>
            )}

          </div>
        ) : (
          <div className="p-8 text-center text-gray-400 text-xs">
            Buyurtma topilmadi. Buyurtma kodini to'g'ri kiritganingizni tekshiring (Masalan: TPM-1001).
          </div>
        )}

      </div>
    </div>
  );
}
