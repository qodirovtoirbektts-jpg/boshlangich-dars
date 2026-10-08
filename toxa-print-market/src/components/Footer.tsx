'use client';

import React, { useState } from 'react';
import { Truck, ShieldCheck, Headphones, FileText, Edit3, X, Save, RefreshCw, Package, Building2, Phone } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { DEFAULT_SITE_SETTINGS, SiteSettings } from '../data/siteSettings';
import Link from 'next/link';

export default function Footer() {
  const { siteSettings, updateSiteSettings, resetSiteSettings } = useCart();
  
  // Safe fallback to guarantee no field is ever undefined or blank
  const s: SiteSettings = { ...DEFAULT_SITE_SETTINGS, ...(siteSettings || {}) };

  // Quick edit modal state
  const [isEditingModal, setIsEditingModal] = useState(false);
  const [editValues, setEditValues] = useState<SiteSettings>(s);

  const handleOpenEdit = () => {
    setEditValues(s);
    setIsEditingModal(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSiteSettings(editValues);
    setIsEditingModal(false);
  };

  return (
    <>
      <footer className="bg-white border-t border-gray-200 mt-16 text-gray-600 text-xs">
        
        {/* Quick Edit Banner for Admin */}
        <div className="bg-amber-50 border-b border-amber-200 py-2 px-4">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
            <span className="text-[11px] md:text-xs font-bold text-amber-900 flex items-center gap-1.5">
              <Edit3 className="w-3.5 h-3.5 text-amber-700" />
              Saytning pastki qismidagi barcha matnlarni xohlagancha o'zgartirishingiz mumkin:
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={handleOpenEdit}
                className="bg-amber-500 hover:bg-amber-600 text-slate-900 text-[11px] font-black px-3.5 py-1 rounded-full shadow-xs transition flex items-center gap-1 cursor-pointer"
              >
                <Edit3 className="w-3 h-3" /> Footer Matnlarini Tahrirlash Oynasi
              </button>
              <Link
                href="/admin"
                className="text-[11px] font-bold text-jio-blue hover:underline flex items-center gap-1"
              >
                Admin Panel &rarr;
              </Link>
            </div>
          </div>
        </div>

        {/* Top Value Badges */}
        <div className="border-b border-gray-100 py-8 px-4 md:px-8">
          <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-2xl bg-blue-50 text-jio-blue flex items-center justify-center flex-shrink-0">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <h5 className="font-black text-gray-900 text-sm">{s.badge1Title}</h5>
                <p className="text-gray-400 text-xs mt-0.5">{s.badge1Desc}</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h5 className="font-black text-gray-900 text-sm">{s.badge2Title}</h5>
                <p className="text-gray-400 text-xs mt-0.5">{s.badge2Desc}</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center flex-shrink-0">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h5 className="font-black text-gray-900 text-sm">{s.badge3Title}</h5>
                <p className="text-gray-400 text-xs mt-0.5">{s.badge3Desc}</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center flex-shrink-0">
                <Headphones className="w-5 h-5" />
              </div>
              <div>
                <h5 className="font-black text-gray-900 text-sm">{s.badge4Title}</h5>
                <p className="text-gray-400 text-xs mt-0.5">{s.badge4Desc}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="max-w-7xl mx-auto py-12 px-4 md:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Col 1: Company Logo & Info */}
          <div className="space-y-3">
            <span className="text-2xl font-black text-jio-blue tracking-tighter block">
              {s.companyName.includes(' ') ? (
                <>
                  {s.companyName.split(' ')[0]}
                  <span className="text-jio-sparkle">
                    {' ' + s.companyName.split(' ').slice(1).join(' ')}
                  </span>
                </>
              ) : (
                s.companyName
              )}
            </span>
            <p className="text-xs text-gray-500 leading-relaxed">
              {s.companyDescription}
            </p>
            <p className="text-[11px] text-gray-400">
              {s.address}
            </p>
          </div>

          {/* Col 2: Mahsulotlar havolalari */}
          <div>
            <h5 className="font-black text-gray-900 text-sm mb-3">
              {s.productsColTitle}
            </h5>
            <ul className="space-y-2 text-xs">
              <li><Link href="/#catalog" className="hover:text-jio-blue transition">{s.productLink1Text}</Link></li>
              <li><Link href="/#catalog" className="hover:text-jio-blue transition">{s.productLink2Text}</Link></li>
              <li><Link href="/#catalog" className="hover:text-jio-blue transition">{s.productLink3Text}</Link></li>
              <li><Link href="/#catalog" className="hover:text-jio-blue transition">{s.productLink4Text}</Link></li>
              <li><Link href="/#catalog" className="hover:text-jio-blue transition">{s.productLink5Text}</Link></li>
            </ul>
          </div>

          {/* Col 3: B2B va Xizmatlar havolalari */}
          <div>
            <h5 className="font-black text-gray-900 text-sm mb-3">
              {s.servicesColTitle}
            </h5>
            <ul className="space-y-2 text-xs">
              <li><Link href="/#b2b-section" className="hover:text-jio-blue transition">{s.serviceLink1Text}</Link></li>
              <li><Link href="/#b2b-section" className="hover:text-jio-blue transition">{s.serviceLink2Text}</Link></li>
              <li><Link href="/#catalog" className="hover:text-jio-blue transition">{s.serviceLink3Text}</Link></li>
              <li><Link href="/#catalog" className="hover:text-jio-blue transition">{s.serviceLink4Text}</Link></li>
              <li><Link href="/#b2b-section" className="hover:text-jio-blue transition">{s.serviceLink5Text}</Link></li>
            </ul>
          </div>

          {/* Col 4: Bog'lanish */}
          <div>
            <h5 className="font-black text-gray-900 text-sm mb-3">
              {s.contactsColTitle}
            </h5>
            <div className="space-y-2 text-xs">
              <p><strong>{s.phoneLabel}</strong> {s.phone}</p>
              <p><strong>{s.telegramLabel}</strong> {s.telegram}</p>
              <p><strong>{s.emailLabel}</strong> {s.email}</p>
              <p className="text-gray-400 text-[11px] pt-2">
                {s.workingHours}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-100 py-4 px-4 md:px-8 text-center text-[11px] text-gray-400">
          <p>{s.copyright}</p>
        </div>

      </footer>

      {/* QUICK FOOTER EDIT MODAL */}
      {isEditingModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-3xl w-full p-6 md:p-8 space-y-6 max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <div>
                <h3 className="text-lg font-black text-gray-900 flex items-center gap-2">
                  <Edit3 className="w-5 h-5 text-amber-500" />
                  Footer va Sayt Matnlarini Tahrirlash
                </h3>
                <p className="text-xs text-gray-500">
                  Matnlarni shu yerning o'zida o'zgartiring va "Saqlash" tugmasini bosing
                </p>
              </div>
              <button
                onClick={() => setIsEditingModal(false)}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-6">
              {/* 0. Top Announcement Bar */}
              <div className="p-4 bg-amber-50/60 rounded-2xl space-y-3 border border-amber-200">
                <h4 className="font-bold text-xs text-amber-950 uppercase">🔝 Eng Yuqori E'lonlar Tasmasi (Top Bar)</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-bold text-gray-500 block mb-0.5">1. Yetkazib berish matni:</label>
                    <input
                      type="text"
                      value={editValues.topDeliveryText}
                      onChange={(e) => setEditValues({ ...editValues, topDeliveryText: e.target.value })}
                      placeholder="O'zbekistonning barcha 14 hududiga tezkor yetkazib berish"
                      className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs font-semibold"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-gray-500 block mb-0.5">2. Kafolat matni:</label>
                    <input
                      type="text"
                      value={editValues.topGuaranteeText}
                      onChange={(e) => setEditValues({ ...editValues, topGuaranteeText: e.target.value })}
                      placeholder="100% Original mahsulotlar kafolati"
                      className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs font-semibold"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-gray-500 block mb-0.5">3. Admin havola matni:</label>
                    <input
                      type="text"
                      value={editValues.topAdminLinkText}
                      onChange={(e) => setEditValues({ ...editValues, topAdminLinkText: e.target.value })}
                      placeholder="Admin Panel"
                      className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs font-semibold"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-gray-500 block mb-0.5">4. Didox tugma matni:</label>
                    <input
                      type="text"
                      value={editValues.topB2BText}
                      onChange={(e) => setEditValues({ ...editValues, topB2BText: e.target.value })}
                      placeholder="Didox & 1C B2B Integratsiya"
                      className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs font-semibold"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-[10px] font-bold text-gray-500 block mb-0.5">5. Yuqoridagi Telefon raqami:</label>
                    <input
                      type="text"
                      value={editValues.topPhoneText}
                      onChange={(e) => setEditValues({ ...editValues, topPhoneText: e.target.value })}
                      placeholder="+998 (71) 200-00-00"
                      className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs font-semibold"
                    />
                  </div>
                </div>
              </div>

              {/* 1. Value Badges */}
              <div className="p-4 bg-gray-50 rounded-2xl space-y-3">
                <h4 className="font-bold text-xs text-gray-700 uppercase">4 ta Afzallik Kartasi</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <input
                    type="text"
                    value={editValues.badge1Title}
                    onChange={(e) => setEditValues({ ...editValues, badge1Title: e.target.value })}
                    placeholder="1-karta sarlavhasi (14 Hududga Yetkazish)"
                    className="bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs font-semibold"
                  />
                  <input
                    type="text"
                    value={editValues.badge1Desc}
                    onChange={(e) => setEditValues({ ...editValues, badge1Desc: e.target.value })}
                    placeholder="1-karta tavsifi (BTS va Express tezkor pochta)"
                    className="bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs"
                  />
                  <input
                    type="text"
                    value={editValues.badge2Title}
                    onChange={(e) => setEditValues({ ...editValues, badge2Title: e.target.value })}
                    placeholder="2-karta sarlavhasi (Rasmiy Kafolat)"
                    className="bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs font-semibold"
                  />
                  <input
                    type="text"
                    value={editValues.badge2Desc}
                    onChange={(e) => setEditValues({ ...editValues, badge2Desc: e.target.value })}
                    placeholder="2-karta tavsifi (12 oydan 24 oygacha servis)"
                    className="bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs"
                  />
                  <input
                    type="text"
                    value={editValues.badge3Title}
                    onChange={(e) => setEditValues({ ...editValues, badge3Title: e.target.value })}
                    placeholder="3-karta sarlavhasi (Didox & 1C Integratsiya)"
                    className="bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs font-semibold"
                  />
                  <input
                    type="text"
                    value={editValues.badge3Desc}
                    onChange={(e) => setEditValues({ ...editValues, badge3Desc: e.target.value })}
                    placeholder="3-karta tavsifi (Yuridik shaxslar uchun 12% QQS)"
                    className="bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs"
                  />
                  <input
                    type="text"
                    value={editValues.badge4Title}
                    onChange={(e) => setEditValues({ ...editValues, badge4Title: e.target.value })}
                    placeholder="4-karta sarlavhasi (24/7 Qo'llab-quvvatlash)"
                    className="bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs font-semibold"
                  />
                  <input
                    type="text"
                    value={editValues.badge4Desc}
                    onChange={(e) => setEditValues({ ...editValues, badge4Desc: e.target.value })}
                    placeholder="4-karta tavsifi (+998 (71) 200-00-00)"
                    className="bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs"
                  />
                </div>
              </div>

              {/* 2. Mahsulotlar Ustuni */}
              <div className="p-4 bg-indigo-50/40 rounded-2xl space-y-3">
                <h4 className="font-bold text-xs text-indigo-950 uppercase">"Mahsulotlar" Ustuni</h4>
                <input
                  type="text"
                  value={editValues.productsColTitle}
                  onChange={(e) => setEditValues({ ...editValues, productsColTitle: e.target.value })}
                  placeholder="Ustun sarlavhasi (Mahsulotlar)"
                  className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs font-bold"
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={editValues.productLink1Text}
                    onChange={(e) => setEditValues({ ...editValues, productLink1Text: e.target.value })}
                    className="bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-xs"
                  />
                  <input
                    type="text"
                    value={editValues.productLink2Text}
                    onChange={(e) => setEditValues({ ...editValues, productLink2Text: e.target.value })}
                    className="bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-xs"
                  />
                  <input
                    type="text"
                    value={editValues.productLink3Text}
                    onChange={(e) => setEditValues({ ...editValues, productLink3Text: e.target.value })}
                    className="bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-xs"
                  />
                  <input
                    type="text"
                    value={editValues.productLink4Text}
                    onChange={(e) => setEditValues({ ...editValues, productLink4Text: e.target.value })}
                    className="bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-xs"
                  />
                  <input
                    type="text"
                    value={editValues.productLink5Text}
                    onChange={(e) => setEditValues({ ...editValues, productLink5Text: e.target.value })}
                    className="bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-xs sm:col-span-2"
                  />
                </div>
              </div>

              {/* 3. B2B Ustuni */}
              <div className="p-4 bg-purple-50/40 rounded-2xl space-y-3">
                <h4 className="font-bold text-xs text-purple-950 uppercase">"B2B va Xizmatlar" Ustuni</h4>
                <input
                  type="text"
                  value={editValues.servicesColTitle}
                  onChange={(e) => setEditValues({ ...editValues, servicesColTitle: e.target.value })}
                  placeholder="Ustun sarlavhasi (B2B va Xizmatlar)"
                  className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs font-bold"
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={editValues.serviceLink1Text}
                    onChange={(e) => setEditValues({ ...editValues, serviceLink1Text: e.target.value })}
                    className="bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-xs"
                  />
                  <input
                    type="text"
                    value={editValues.serviceLink2Text}
                    onChange={(e) => setEditValues({ ...editValues, serviceLink2Text: e.target.value })}
                    className="bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-xs"
                  />
                  <input
                    type="text"
                    value={editValues.serviceLink3Text}
                    onChange={(e) => setEditValues({ ...editValues, serviceLink3Text: e.target.value })}
                    className="bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-xs"
                  />
                  <input
                    type="text"
                    value={editValues.serviceLink4Text}
                    onChange={(e) => setEditValues({ ...editValues, serviceLink4Text: e.target.value })}
                    className="bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-xs"
                  />
                  <input
                    type="text"
                    value={editValues.serviceLink5Text}
                    onChange={(e) => setEditValues({ ...editValues, serviceLink5Text: e.target.value })}
                    className="bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-xs sm:col-span-2"
                  />
                </div>
              </div>

              {/* 4. Bog'lanish */}
              <div className="p-4 bg-emerald-50/40 rounded-2xl space-y-3">
                <h4 className="font-bold text-xs text-emerald-950 uppercase">Bog'lanish & Kontaktlar</h4>
                <input
                  type="text"
                  value={editValues.contactsColTitle}
                  onChange={(e) => setEditValues({ ...editValues, contactsColTitle: e.target.value })}
                  placeholder="Ustun sarlavhasi (Bog'lanish)"
                  className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs font-bold"
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-bold text-gray-500">Telefon yorlig'i & raqami:</label>
                    <input
                      type="text"
                      value={editValues.phoneLabel}
                      onChange={(e) => setEditValues({ ...editValues, phoneLabel: e.target.value })}
                      className="w-full bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-xs mb-1"
                    />
                    <input
                      type="text"
                      value={editValues.phone}
                      onChange={(e) => setEditValues({ ...editValues, phone: e.target.value })}
                      className="w-full bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-xs font-bold"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-gray-500">Telegram yorlig'i & manzili:</label>
                    <input
                      type="text"
                      value={editValues.telegramLabel}
                      onChange={(e) => setEditValues({ ...editValues, telegramLabel: e.target.value })}
                      className="w-full bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-xs mb-1"
                    />
                    <input
                      type="text"
                      value={editValues.telegram}
                      onChange={(e) => setEditValues({ ...editValues, telegram: e.target.value })}
                      className="w-full bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-xs font-bold"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-gray-500">Email yorlig'i & manzili:</label>
                    <input
                      type="text"
                      value={editValues.emailLabel}
                      onChange={(e) => setEditValues({ ...editValues, emailLabel: e.target.value })}
                      className="w-full bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-xs mb-1"
                    />
                    <input
                      type="text"
                      value={editValues.email}
                      onChange={(e) => setEditValues({ ...editValues, email: e.target.value })}
                      className="w-full bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-xs font-bold"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-gray-500">Ish vaqti:</label>
                    <input
                      type="text"
                      value={editValues.workingHours}
                      onChange={(e) => setEditValues({ ...editValues, workingHours: e.target.value })}
                      className="w-full bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-xs mt-6"
                    />
                  </div>
                </div>
              </div>

              {/* 5. Copyright */}
              <div className="p-3 bg-gray-50 rounded-xl space-y-1">
                <label className="text-[10px] font-bold text-gray-500">Mualliflik huquqi (Copyright):</label>
                <input
                  type="text"
                  value={editValues.copyright}
                  onChange={(e) => setEditValues({ ...editValues, copyright: e.target.value })}
                  className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-xs font-medium"
                />
              </div>

              {/* Modal Buttons */}
              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={() => {
                    resetSiteSettings();
                    setEditValues(DEFAULT_SITE_SETTINGS);
                  }}
                  className="text-xs font-bold text-gray-500 hover:text-gray-800 flex items-center gap-1 cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" /> Standartga Qaytarish
                </button>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsEditingModal(false)}
                    className="text-xs font-bold px-4 py-2.5 rounded-xl border border-gray-200 hover:bg-gray-50 text-gray-700 cursor-pointer"
                  >
                    Bekor Qilish
                  </button>
                  <button
                    type="submit"
                    className="bg-jio-blue hover:bg-jio-dark text-white text-xs font-black px-6 py-2.5 rounded-xl flex items-center gap-1.5 shadow-md shadow-blue-900/10 cursor-pointer"
                  >
                    <Save className="w-4 h-4" /> Saqlash va Qo'llash
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
