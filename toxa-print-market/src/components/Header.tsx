'use client';

import React from 'react';
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
  ShieldCheck
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
    siteSettings
  } = useCart();

  const s = { ...DEFAULT_SITE_SETTINGS, ...(siteSettings || {}) };

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

          <div className="flex items-center gap-4">
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
            <a href="#" className="flex flex-col">
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
            <kbd className="hidden lg:inline-block text-[10px] bg-white border border-gray-200 px-1.5 py-0.5 rounded text-gray-400 font-mono">
              Qidiruv
            </kbd>
          </div>

          {/* Action Navigation */}
          <div className="flex items-center gap-2 md:gap-3">
            
            {/* Smart Tanlov Trigger */}
            <button
              onClick={() => setIsWizardOpen(true)}
              className="hidden lg:flex items-center gap-1.5 text-xs font-bold text-jio-blue bg-blue-50 hover:bg-blue-100 px-3.5 py-2 rounded-full transition border border-blue-100"
            >
              <Sparkles className="w-3.5 h-3.5 text-jio-blue animate-pulse" />
              Smart Tanlov
            </button>

            {/* B2B Mode Switcher Toggle */}
            <button
              onClick={toggleB2BMode}
              className={`flex items-center gap-2 text-xs font-bold px-3 py-2 rounded-full border transition-all ${
                isB2BMode 
                  ? 'bg-amber-500 text-white border-amber-600 shadow-sm shadow-amber-500/20' 
                  : 'bg-gray-50 hover:bg-gray-100 text-gray-700 border-gray-200'
              }`}
              title="Yuridik shaxslar uchun QQSli narxlar"
            >
              <Building2 className={`w-3.5 h-3.5 ${isB2BMode ? 'text-white' : 'text-gray-500'}`} />
              <span className="hidden sm:inline">
                {isB2BMode ? 'B2B Rejim: QQS bilan' : 'B2B Rejim'}
              </span>
              <span className={`w-2 h-2 rounded-full ${isB2BMode ? 'bg-white animate-ping' : 'bg-gray-300'}`} />
            </button>

            {/* Order Tracking Button */}
            <button
              onClick={() => setIsTrackingOpen(true)}
              className="flex items-center gap-1.5 text-xs font-bold text-gray-700 hover:text-jio-blue bg-gray-50 hover:bg-gray-100 p-2 md:px-3 md:py-2 rounded-full border border-gray-200 transition"
              title="Buyurtma holatini kuzatish"
            >
              <Truck className="w-4 h-4 text-jio-blue" />
              <span className="hidden md:inline">Kuzatuv</span>
            </button>

            {/* Search Button (Mobile only) */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="md:hidden p-2 rounded-full bg-gray-100 text-gray-700 hover:text-jio-blue"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-2 bg-jio-blue hover:bg-jio-dark text-white px-3.5 py-2 md:px-4 md:py-2 rounded-full font-bold text-xs md:text-sm transition-all shadow-md shadow-blue-900/10 active:scale-95"
            >
              <ShoppingCart className="w-4 h-4" />
              <span className="hidden sm:inline">Savatcha</span>
              {totalCartItemsCount > 0 && (
                <span className="bg-amber-400 text-neutral-900 text-[11px] font-black w-5 h-5 rounded-full flex items-center justify-center">
                  {totalCartItemsCount}
                </span>
              )}
            </button>

            {/* User Profile / Login */}
            <button
              onClick={() => setIsAuthOpen(true)}
              className="flex items-center gap-1.5 bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-2 rounded-full text-xs font-bold transition"
            >
              <UserIcon className="w-4 h-4 text-gray-600" />
              <span className="hidden md:inline">
                {user ? (user.role === 'B2B' ? 'B2B Kabinet' : user.phone.slice(-4)) : 'Kirish'}
              </span>
            </button>

            {/* Admin Panel Quick Link */}
            <Link
              href="/admin"
              className="flex items-center gap-1.5 bg-slate-900 hover:bg-black text-white px-3 py-2 rounded-full text-xs font-bold transition shadow-xs"
              title="Admin boshqaruv paneli"
            >
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span className="hidden sm:inline">Admin</span>
            </Link>
          </div>

        </div>
      </header>
    </>
  );
}
