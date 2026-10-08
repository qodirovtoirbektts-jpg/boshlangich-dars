'use client';

import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { UZBEKISTAN_REGIONS } from '../config/regions';
import { PaymentMethod, B2BProfile } from '../types';
import { 
  X, 
  Truck, 
  CreditCard, 
  Building2, 
  ShieldCheck, 
  CheckCircle2, 
  MapPin, 
  Phone, 
  User as UserIcon,
  Clock,
  ArrowRight
} from 'lucide-react';

export default function CheckoutModal() {
  const { 
    isCheckoutOpen, 
    setIsCheckoutOpen, 
    cart, 
    cartSubtotal, 
    isB2BMode, 
    calculateShipping, 
    createOrder,
    user 
  } = useCart();

  const [recipientName, setRecipientName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '+998 ');
  const [selectedRegion, setSelectedRegion] = useState(UZBEKISTAN_REGIONS[0].name);
  const [addressLine, setAddressLine] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('PAYME');

  // B2B fields
  const [b2bProfile, setB2bProfile] = useState<B2BProfile>({
    companyName: user?.b2bProfile?.companyName || '',
    inn: user?.b2bProfile?.inn || '',
    mfo: user?.b2bProfile?.mfo || '00448',
    bankAccount: user?.b2bProfile?.bankAccount || '20208000900000000001',
    vatCertificate: user?.b2bProfile?.vatCertificate || '1234567890',
  });

  if (!isCheckoutOpen) return null;

  const shippingInfo = calculateShipping(selectedRegion, cart);
  const totalAmount = cartSubtotal + shippingInfo.shippingCost;
  const vatAmount = isB2BMode ? Math.round((cartSubtotal / 1.12) * 0.12) : 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!recipientName.trim()) {
      alert("Iltimos, ism-familiyangizni kiriting!");
      return;
    }
    if (!addressLine.trim()) {
      alert("Iltimos, yetkazib berish manzilini kiriting!");
      return;
    }

    createOrder({
      recipientName,
      phone,
      region: selectedRegion,
      addressLine,
      paymentMethod,
      b2bProfile: isB2BMode ? b2bProfile : undefined,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-3xl w-full p-6 md:p-8 shadow-2xl relative border border-gray-100 max-h-[92vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={() => setIsCheckoutOpen(false)}
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
            1 Sahifali Tezkor Rasmiylashtirish
          </span>
        </div>

        <h3 className="text-2xl font-black text-gray-900 tracking-tight">
          Buyurtmani Rasmiylashtirish
        </h3>
        <p className="text-xs text-gray-500 mb-6">
          14 hudud avtomatlashtirilgan hajm-vazn logistika kalkulyatori va to'lov tizimlari
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Section 1: Mijoz Ma'lumotlari */}
          <div className="p-4 bg-gray-50/60 rounded-2xl border border-gray-100 space-y-3">
            <h4 className="font-bold text-sm text-gray-900 flex items-center gap-2">
              <UserIcon className="w-4 h-4 text-jio-blue" />
              1. Qabul Qiluvchi Ma'lumotlari
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">
                  Ism va Familiya *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ali Valiyev"
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                  className="w-full bg-white border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm focus:border-jio-blue focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">
                  Telefon Raqam *
                </label>
                <input
                  type="text"
                  required
                  placeholder="+998 90 123 45 67"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-white border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm focus:border-jio-blue focus:outline-none"
                />
              </div>
            </div>

            {/* B2B Yuridik Shaxs Ma'lumotlari */}
            {isB2BMode && (
              <div className="mt-4 pt-3 border-t border-gray-200/60 space-y-3">
                <span className="text-xs font-black text-amber-800 flex items-center gap-1.5 uppercase">
                  <Building2 className="w-3.5 h-3.5 text-amber-600" />
                  B2B Korxona Rekvizitlari (Didox Schyot-Faktura Uchun)
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-gray-600 mb-0.5">
                      Korxona Nomi *
                    </label>
                    <input
                      type="text"
                      required={isB2BMode}
                      placeholder='"Smart Print Tech" MCHJ'
                      value={b2bProfile.companyName}
                      onChange={(e) => setB2bProfile({ ...b2bProfile, companyName: e.target.value })}
                      className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs focus:border-jio-blue focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-gray-600 mb-0.5">
                      INN (9 xonali) *
                    </label>
                    <input
                      type="text"
                      required={isB2BMode}
                      placeholder="308123456"
                      value={b2bProfile.inn}
                      onChange={(e) => setB2bProfile({ ...b2bProfile, inn: e.target.value })}
                      className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs focus:border-jio-blue focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Section 2: 14 Hudud Logistika Kalkulyatori */}
          <div className="p-4 bg-gray-50/60 rounded-2xl border border-gray-100 space-y-3">
            <h4 className="font-bold text-sm text-gray-900 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-jio-blue" />
              2. Yetkazib Berish Hududi (14 Hudud Logistika Kalkulyatori)
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">
                  Viloyat yoki Hududni Tanlang *
                </label>
                <select
                  value={selectedRegion}
                  onChange={(e) => setSelectedRegion(e.target.value)}
                  className="w-full bg-white border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm font-semibold focus:border-jio-blue focus:outline-none cursor-pointer"
                >
                  {UZBEKISTAN_REGIONS.map((r) => (
                    <option key={r.name} value={r.name}>
                      {r.name} ({r.deliveryTime} kun)
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">
                  Aniq Ko'cha, Uy, Xonadon *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Navoiy ko'chasi, 24-uy"
                  value={addressLine}
                  onChange={(e) => setAddressLine(e.target.value)}
                  className="w-full bg-white border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm focus:border-jio-blue focus:outline-none"
                />
              </div>
            </div>

            {/* Live Logistics Breakdown Card */}
            <div className="p-3.5 bg-blue-50/70 border border-blue-100 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <div className="space-y-0.5 text-gray-700">
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-jio-blue" />
                  <span>Yetkazib berish muddati: <strong>{shippingInfo.deliveryDays} ish kuni</strong></span>
                </div>
                <div className="text-[11px] text-gray-500">
                  Fizik og'irlik: {shippingInfo.physicalWeight} kg • Hajm vazni (L×W×H/5000): {shippingInfo.volumetricWeight} kg
                </div>
              </div>

              <div className="text-right flex items-center gap-2">
                <span className="text-gray-500 font-medium">Logistika narxi:</span>
                <span className="text-base font-black text-jio-blue">
                  {shippingInfo.shippingCost.toLocaleString('uz-UZ')} so'm
                </span>
              </div>
            </div>
          </div>

          {/* Section 3: To'lov Tizimlari */}
          <div className="p-4 bg-gray-50/60 rounded-2xl border border-gray-100 space-y-3">
            <h4 className="font-bold text-sm text-gray-900 flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-jio-blue" />
              3. To'lov Usulini Tanlang
            </h4>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
              {[
                { id: 'PAYME', label: 'Payme', badge: 'Karta', color: 'text-cyan-600' },
                { id: 'CLICK', label: 'Click', badge: 'Karta', color: 'text-blue-600' },
                { id: 'UZUM_NASIYA', label: 'Uzum Nasiya', badge: 'Muddatli', color: 'text-purple-600' },
                { id: 'CASH', label: 'Naqd / Terminal', badge: 'Yetkazganda', color: 'text-emerald-600' },
                { id: 'BANK_TRANSFER', label: 'Hisob-raqam', badge: 'B2B Didox', color: 'text-amber-600' },
              ].map((p) => (
                <div
                  key={p.id}
                  onClick={() => setPaymentMethod(p.id as PaymentMethod)}
                  className={`p-3 rounded-2xl border-2 cursor-pointer transition text-center flex flex-col justify-between items-center ${
                    paymentMethod === p.id
                      ? 'border-jio-blue bg-white shadow-md ring-2 ring-jio-blue/10'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <span className={`font-black text-sm ${p.color}`}>
                    {p.label}
                  </span>
                  <span className="text-[10px] font-semibold text-gray-400 mt-1">
                    {p.badge}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Section 4: Xulosa va Tasdiqlash */}
          <div className="p-4 bg-white border border-gray-200 rounded-2xl space-y-2 text-xs">
            <div className="flex justify-between text-gray-500">
              <span>Mahsulotlar soni:</span>
              <span className="font-bold text-gray-800">{cart.length} xil</span>
            </div>
            <div className="flex justify-between text-gray-500">
              <span>Mahsulotlar summasi:</span>
              <span className="font-bold text-gray-800">{cartSubtotal.toLocaleString('uz-UZ')} so'm</span>
            </div>
            {isB2BMode && (
              <div className="flex justify-between text-amber-700 font-semibold">
                <span>Shu jumladan 12% QQS:</span>
                <span>{vatAmount.toLocaleString('uz-UZ')} so'm</span>
              </div>
            )}
            <div className="flex justify-between text-gray-500">
              <span>Yetkazib berish ({selectedRegion}):</span>
              <span className="font-bold text-emerald-600">{shippingInfo.shippingCost.toLocaleString('uz-UZ')} so'm</span>
            </div>
            
            <div className="pt-3 border-t border-gray-200 flex justify-between items-baseline">
              <span className="text-base font-black text-gray-900">Jami To'lov:</span>
              <span className="text-2xl font-black text-jio-blue">
                {totalAmount.toLocaleString('uz-UZ')} so'm
              </span>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-jio-blue hover:bg-jio-dark text-white py-4 rounded-2xl font-black text-base flex items-center justify-center gap-2 shadow-xl shadow-blue-900/20 transition transform active:scale-98"
          >
            Buyurtmani Tasdiqlash <ArrowRight className="w-5 h-5" />
          </button>

        </form>

      </div>
    </div>
  );
}
