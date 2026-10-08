'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useCart } from '../context/CartContext';
import { DEFAULT_SITE_SETTINGS } from '../data/siteSettings';
import { 
  Search, 
  ShoppingCart, 
  User as UserIcon, 
  Truck, 
  Building2, 
  Sparkles, 
  PhoneCall,
  ShieldCheck,
  Edit3,
  X,
  Save,
  RefreshCw
} from 'lucide-react';

export default function Header() {
  const {
    cart,
    totalCartItemsCount,
    setIsCartOpen,
    isB2BMode,
    toggleB2BMode,
    setIsAuthOpen,
    setIsSearchOpen,
    setIsTrackingOpen,
    setIsWizardOpen,
    setIsB2BPortalOpen,
    user,
    siteSettings,
    updateSiteSettings,
    resetSiteSettings
  } = useCart();

  const s = { ...DEFAULT_SITE_SETTINGS, ...(siteSettings || {}) };

  // Top Bar Direct Edit Modal State
  const [isTopBarEditOpen, setIsTopBarEditOpen] = useState(false);
  const [topFormValues, setTopFormValues] = useState({
    topDeliveryText: s.topDeliveryText,
    topGuaranteeText: s.topGuaranteeText,
    topAdminLinkText: s.topAdminLinkText,
    topB2BText: s.topB2BText,
    topPhoneText: s.topPhoneText,
  });

  const handleOpenTopEdit = () => {
    setTopFormValues({
      topDeliveryText: s.topDeliveryText,
      topGuaranteeText: s.topGuaranteeText,
      topAdminLinkText: s.topAdminLinkText,
      topB2BText: s.topB2BText,
      topPhoneText: s.topPhoneText,
    });
    setIsTopBarEditOpen(true);
  };

  const handleSaveTopBar = (e: React.FormEvent) => {
    e.preventDefault();
    updateSiteSettings(topFormValues);
    setIsTopBarEditOpen(false);
  };

  return (
    <>
      {/* Top Banner (Jio Announcement Bar) */}
      <div className="bg-jio-dark text-white text-[11px] md:text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 font-medium">
              <Truck className="w-3.5 h-3.5 text-jio-sparkle" />
              {s.topDeliveryText}
            </span>
            <span className="hidden lg:flex items-center gap-1 opacity-75">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              {s.topGuaranteeText}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Instant 1-Click Top Bar Edit Button */}
            <button
              onClick={handleOpenTopEdit}
              className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-black px-2.5 py-0.5 rounded-full text-[10px] flex items-center gap-1 transition cursor-pointer shadow-xs"
              title="Yuqori qatordagi barcha matnlarni bir zumda o'zgartirish"
            >
              <Edit3 className="w-2.5 h-2.5 text-slate-950" />
              Tepani Tahrirlash
            </button>

            <Link
              href="/admin"
              className="hover:text-amber-300 transition flex items-center gap-1 text-[11px] font-bold text-amber-300"
            >
              <ShieldCheck className="w-3 h-3 text-amber-400" />
              {s.topAdminLinkText}
            </Link>
            <button 
              onClick={() => setIsB2BPortalOpen(true)}
              className="hover:text-jio-sparkle transition flex items-center gap-1 text-[11px] font-semibold cursor-pointer"
            >
              <Building2 className="w-3 h-3 text-jio-sparkle" />
              {s.topB2BText}
            </button>
            <a 
              href={`tel:${s.topPhoneText.replace(/[^\d+]/g, '')}`} 
              className="flex items-center gap-1 font-semibold hover:text-jio-sparkle transition"
            >
              <PhoneCall className="w-3 h-3 text-jio-sparkle" />
              {s.topPhoneText}
            </a>
          </div>
        </div>
      </div>

      {/* Main Glassmorphic Sticky Header */}
      <header className="sticky top-0 z-40 bg-white/85 backdrop-blur-md border-b border-gray-100 shadow-sm transition-all">
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-18 py-3 flex items-center justify-between gap-4">
          
          {/* Logo */}
          <div className="flex items-center gap-3">
            <a href="/" className="flex flex-col">
              <span className="text-2xl md:text-3xl font-black text-jio-blue tracking-tighter leading-none">
                TOXA<span className="text-jio-sparkle">PRINT</span>
              </span>
              <span className="text-[9px] font-extrabold tracking-widest text-gray-400 uppercase mt-0.5">
                Market & Service
              </span>
            </a>
          </div>

          {/* Search Trigger Bar */}
          <div 
            onClick={() => setIsSearchOpen(true)}
            className="hidden md:flex items-center flex-1 max-w-md bg-gray-100/80 hover:bg-gray-100 border border-gray-200/80 rounded-full px-4 py-2 text-sm text-gray-500 cursor-pointer transition shadow-inner group"
          >
            <Search className="w-4 h-4 text-gray-400 group-hover:text-jio-blue mr-2 transition" />
            <span className="flex-1 text-xs md:text-sm">Printer yoki kartrij modelini qidiring...</span>
            <kbd className="hidden lg:inline-block text-[10px] font-semibold bg-white border border-gray-200 px-2 py-0.5 rounded text-gray-400">
              Qidirish
            </kbd>
          </div>

          {/* Action CTAs */}
          <div className="flex items-center gap-2 md:gap-3">
            
            {/* Printer Wizard Button */}
            <button
              onClick={() => setIsWizardOpen(true)}
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-blue-50 text-jio-blue font-bold text-xs hover:bg-blue-100 transition"
            >
              <Sparkles className="w-3.5 h-3.5 text-jio-sparkle" />
              <span>Printer Tanlash Ustasi</span>
            </button>

            {/* B2B Mode Toggle Button */}
            <button
              onClick={toggleB2BMode}
              className={`px-3.5 py-2 rounded-full font-bold text-xs flex items-center gap-1.5 transition ${
                isB2BMode 
                  ? 'bg-purple-700 text-white shadow-md shadow-purple-900/20' 
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>{isB2BMode ? 'B2B QQS 12% Faol' : 'B2B Rejim'}</span>
            </button>

            {/* Order Tracking Button */}
            <button
              onClick={() => setIsTrackingOpen(true)}
              className="p-2.5 rounded-full hover:bg-gray-100 text-gray-600 transition relative"
              title="Buyurtmani Kuzatish"
            >
              <Truck className="w-5 h-5" />
            </button>

            {/* Auth Button */}
            <button
              onClick={() => setIsAuthOpen(true)}
              className="p-2.5 rounded-full hover:bg-gray-100 text-gray-600 transition flex items-center gap-1"
              title="SMS OTP Kirish"
            >
              <UserIcon className="w-5 h-5" />
              {user && (
                <span className="hidden lg:inline text-xs font-bold text-jio-blue">
                  {user.phone.slice(-4)}
                </span>
              )}
            </button>

            {/* Cart Flyout Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative bg-jio-blue hover:bg-jio-dark text-white p-2.5 md:px-4 md:py-2.5 rounded-full font-bold text-xs md:text-sm flex items-center gap-2 transition shadow-md shadow-blue-900/20 active:scale-95"
            >
              <ShoppingCart className="w-4 h-4" />
              <span className="hidden md:inline">Savat</span>
              {totalCartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 md:static bg-rose-500 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-black">
                  {totalCartItemsCount}
                </span>
              )}
            </button>

          </div>
        </div>
      </header>

      {/* INSTANT TOP BAR EDIT MODAL */}
      {isTopBarEditOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 md:p-8 space-y-6 shadow-2xl border border-gray-100">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div>
                <h3 className="text-base font-black text-gray-900 flex items-center gap-2">
                  <Edit3 className="w-4 h-4 text-amber-500" />
                  Yuqori E'lonlar Tasmasini Tahrirlash
                </h3>
                <p className="text-[11px] text-gray-500">
                  Bir urinishda o'zgartiring va darhol saytda aks etadi
                </p>
              </div>
              <button
                onClick={() => setIsTopBarEditOpen(false)}
                className="w-7 h-7 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveTopBar} className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold text-gray-700 mb-1">
                  1. Tezkor yetkazib berish matni:
                </label>
                <input
                  type="text"
                  required
                  value={topFormValues.topDeliveryText}
                  onChange={(e) => setTopFormValues({ ...topFormValues, topDeliveryText: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs font-semibold focus:border-jio-blue focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-700 mb-1">
                  2. Kafolat matni:
                </label>
                <input
                  type="text"
                  required
                  value={topFormValues.topGuaranteeText}
                  onChange={(e) => setTopFormValues({ ...topFormValues, topGuaranteeText: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs font-semibold focus:border-jio-blue focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-gray-700 mb-1">
                    3. Admin havola matni:
                  </label>
                  <input
                    type="text"
                    required
                    value={topFormValues.topAdminLinkText}
                    onChange={(e) => setTopFormValues({ ...topFormValues, topAdminLinkText: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs font-semibold focus:border-jio-blue focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-gray-700 mb-1">
                    4. Didox tugma matni:
                  </label>
                  <input
                    type="text"
                    required
                    value={topFormValues.topB2BText}
                    onChange={(e) => setTopFormValues({ ...topFormValues, topB2BText: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs font-semibold focus:border-jio-blue focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-700 mb-1">
                  5. Yuqoridagi telefon raqami:
                </label>
                <input
                  type="text"
                  required
                  value={topFormValues.topPhoneText}
                  onChange={(e) => setTopFormValues({ ...topFormValues, topPhoneText: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs font-semibold focus:border-jio-blue focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={() => {
                    resetSiteSettings();
                    setTopFormValues({
                      topDeliveryText: DEFAULT_SITE_SETTINGS.topDeliveryText,
                      topGuaranteeText: DEFAULT_SITE_SETTINGS.topGuaranteeText,
                      topAdminLinkText: DEFAULT_SITE_SETTINGS.topAdminLinkText,
                      topB2BText: DEFAULT_SITE_SETTINGS.topB2BText,
                      topPhoneText: DEFAULT_SITE_SETTINGS.topPhoneText,
                    });
                  }}
                  className="text-[11px] font-bold text-gray-400 hover:text-gray-700 flex items-center gap-1 cursor-pointer"
                >
                  <RefreshCw className="w-3 h-3" /> Standartga
                </button>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsTopBarEditOpen(false)}
                    className="text-xs font-bold px-3 py-2 rounded-xl border border-gray-200 hover:bg-gray-50 text-gray-600 cursor-pointer"
                  >
                    Bekor Qilish
                  </button>
                  <button
                    type="submit"
                    className="bg-jio-blue hover:bg-jio-dark text-white text-xs font-black px-5 py-2 rounded-xl flex items-center gap-1.5 shadow-md shadow-blue-900/10 cursor-pointer"
                  >
                    <Save className="w-3.5 h-3.5" /> Saqlash va Qo'llash
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
