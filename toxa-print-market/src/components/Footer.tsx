'use client';

import React from 'react';
import { Truck, ShieldCheck, Headphones, RefreshCw, FileText } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-16 text-gray-600 text-xs">
      
      {/* Top Value Badges */}
      <div className="border-b border-gray-100 py-8 px-4 md:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-blue-50 text-jio-blue flex items-center justify-center flex-shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-black text-gray-900 text-sm">14 Hududga Yetkazish</h5>
              <p className="text-gray-400 text-xs mt-0.5">BTS va Express tezkor pochta</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-black text-gray-900 text-sm">Rasmiy Kafolat</h5>
              <p className="text-gray-400 text-xs mt-0.5">12 oydan 24 oygacha servis</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center flex-shrink-0">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-black text-gray-900 text-sm">Didox & 1C Integratsiya</h5>
              <p className="text-gray-400 text-xs mt-0.5">Yuridik shaxslar uchun 12% QQS</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center flex-shrink-0">
              <Headphones className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-black text-gray-900 text-sm">24/7 Qo'llab-quvvatlash</h5>
              <p className="text-gray-400 text-xs mt-0.5">+998 (71) 200-00-00</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto py-12 px-4 md:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="space-y-3">
          <span className="text-2xl font-black text-jio-blue tracking-tighter block">
            TOXA<span className="text-jio-sparkle">PRINT</span>
          </span>
          <p className="text-xs text-gray-500 leading-relaxed">
            O'zbekiston bo'ylab barcha toifadagi mijozlar uchun printerlar, skanerlar, plotterlar va original sarf materiallarining B2C hamda B2B onlayn distribyutsiyasi.
          </p>
          <p className="text-[11px] text-gray-400">
            Toshkent sh., Chilonzor tumani, Bunyodkor shox ko'chasi 42-uy
          </p>
        </div>

        <div>
          <h5 className="font-black text-gray-900 text-sm mb-3">Mahsulotlar</h5>
          <ul className="space-y-2 text-xs">
            <li><a href="#" className="hover:text-jio-blue transition">Lazerli Printerlar (HP, Canon)</a></li>
            <li><a href="#" className="hover:text-jio-blue transition">Siyohli CISS MFP (Epson EcoTank)</a></li>
            <li><a href="#" className="hover:text-jio-blue transition">Katta Formatli Plotterlar (HP DesignJet)</a></li>
            <li><a href="#" className="hover:text-jio-blue transition">Original Toner va Siyoh Kartrijlari</a></li>
            <li><a href="#" className="hover:text-jio-blue transition">Fotokog'oz va Aksessuarlar</a></li>
          </ul>
        </div>

        <div>
          <h5 className="font-black text-gray-900 text-sm mb-3">B2B va Xizmatlar</h5>
          <ul className="space-y-2 text-xs">
            <li><a href="#" className="hover:text-jio-blue transition">Didox elektron schyot-fakturalar</a></li>
            <li><a href="#" className="hover:text-jio-blue transition">1C ombor qoldiqlari sinxronizatsiyasi</a></li>
            <li><a href="#" className="hover:text-jio-blue transition">Kafolat va Servis xizmati</a></li>
            <li><a href="#" className="hover:text-jio-blue transition">14 hudud yetkazib berish tariflari</a></li>
            <li><a href="#" className="hover:text-jio-blue transition">Ulgurji xaridlar bo'limi</a></li>
          </ul>
        </div>

        <div>
          <h5 className="font-black text-gray-900 text-sm mb-3">Bog'lanish</h5>
          <div className="space-y-2 text-xs">
            <p><strong>Yagona aloqa markazi:</strong> +998 (71) 200-00-00</p>
            <p><strong>Telegram:</strong> @toxaprint_support</p>
            <p><strong>Email:</strong> info@toxaprint.uz</p>
            <p className="text-gray-400 text-[11px] pt-2">
              Dushanba - Shanba: 09:00 dan 19:00 gacha
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-100 py-4 px-4 md:px-8 text-center text-[11px] text-gray-400">
        <p>© 2026 TOXA PRINT MARKET. Barcha huquqlar himoyalangan. MyJio UI/UX Design System.</p>
      </div>

    </footer>
  );
}
