'use client';

import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { INITIAL_PRODUCTS } from '../data/products';
import { CheckCircle2, ShieldCheck, ShoppingCart, RefreshCw, Layers } from 'lucide-react';

export default function CompatibilityBanner() {
  const { addToCart, isB2BMode, setSelectedProduct } = useCart();
  
  const printers = INITIAL_PRODUCTS.filter((p) => p.type === 'PRINTER' || p.type === 'PLOTTER');
  const [selectedPrinterSku, setSelectedPrinterSku] = useState(printers[0].sku);

  const currentPrinter = printers.find((p) => p.sku === selectedPrinterSku) || printers[0];
  const matchingConsumables = INITIAL_PRODUCTS.filter((c) =>
    c.type === 'CONSUMABLE' && currentPrinter.compatibleSkus.includes(c.sku)
  );

  return (
    <section className="w-full bg-gradient-to-br from-blue-900 via-jio-blue to-indigo-950 rounded-3xl p-6 md:p-10 text-white shadow-xl relative overflow-hidden my-4">
      
      {/* Decorative Blur Circles */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-jio-sparkle/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row items-center gap-8 justify-between">
        
        {/* Left Column: Selector */}
        <div className="flex-1 space-y-4 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-bold uppercase tracking-wider text-jio-sparkle">
            <RefreshCw className="w-3.5 h-3.5" />
            Moslik Matritsasi (Compatibility Engine)
          </div>

          <h3 className="text-2xl md:text-3xl font-black tracking-tight leading-snug">
            Printeringiz modelini tanlang — 100% mos original kartrijni ko'ring
          </h3>

          <p className="text-xs md:text-sm text-white/80 leading-relaxed">
            Noto'g'ri kartrij xarid qilishdan saqlaning. Bizning tizim har bir printer modeli uchun zavod tomonidan tasdiqlangan original sarf materiallarini taqdim etadi.
          </p>

          <div className="pt-2">
            <label className="block text-xs font-bold text-gray-200 mb-2 uppercase tracking-wide">
              Mavjud Printeringizni Tanlang:
            </label>
            <select
              value={selectedPrinterSku}
              onChange={(e) => setSelectedPrinterSku(e.target.value)}
              className="w-full bg-white text-gray-900 font-bold text-sm px-4 py-3 rounded-2xl shadow-md border-2 border-jio-sparkle focus:outline-none cursor-pointer"
            >
              {printers.map((p) => (
                <option key={p.sku} value={p.sku}>
                  {p.brand} — {p.name} ({p.sku})
                </option>
              ))}
            </select>
          </div>

          {/* Quick tags */}
          <div className="flex flex-wrap gap-2 pt-1">
            {printers.slice(0, 4).map((p) => (
              <button
                key={p.sku}
                onClick={() => setSelectedPrinterSku(p.sku)}
                className={`text-[11px] font-bold px-3 py-1 rounded-full transition ${
                  selectedPrinterSku === p.sku
                    ? 'bg-white text-jio-blue shadow-sm'
                    : 'bg-white/15 hover:bg-white/25 text-white'
                }`}
              >
                {p.brand} {p.sku}
              </button>
            ))}
          </div>
        </div>

        {/* Right Column: Matched Consumable Card */}
        <div className="w-full lg:w-96 bg-white rounded-3xl p-5 text-gray-900 shadow-2xl border border-white/20">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <span className="text-[11px] font-black text-jio-blue uppercase tracking-wide flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              100% Mos Keluvchi Sarf Materiali
            </span>
            <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
              Kafolatli
            </span>
          </div>

          {matchingConsumables.length > 0 ? (
            matchingConsumables.map((c) => (
              <div key={c.id} className="pt-4 flex flex-col gap-3">
                <div className="flex items-center gap-4">
                  <img
                    src={c.image}
                    alt={c.name}
                    className="w-20 h-20 object-contain rounded-xl bg-gray-50 p-1 border border-gray-100"
                  />
                  <div className="flex-1">
                    <span className="text-[10px] font-bold text-gray-400 uppercase">{c.brand} Original</span>
                    <h5 className="text-sm font-black text-gray-900 leading-tight line-clamp-2">
                      {c.name}
                    </h5>
                    <p className="text-[11px] text-gray-500 mt-0.5">
                      Resurs: {c.specs.yieldPages || 'Standart'}
                    </p>
                    <div className="mt-1 flex items-baseline gap-1.5">
                      <span className="text-base font-black text-jio-blue">
                        {(isB2BMode ? c.b2bPrice : c.retailPrice).toLocaleString('uz-UZ')} so'm
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <button
                    onClick={() => setSelectedProduct(c)}
                    className="flex-1 text-xs font-bold bg-gray-100 hover:bg-gray-200 text-gray-700 py-2.5 rounded-xl transition text-center"
                  >
                    Batafsil
                  </button>
                  <button
                    onClick={() => addToCart(c, 1)}
                    className="flex-1 text-xs font-bold bg-jio-blue hover:bg-jio-dark text-white py-2.5 rounded-xl transition flex items-center justify-center gap-1.5 shadow-md shadow-blue-900/10"
                  >
                    <ShoppingCart className="w-3.5 h-3.5" />
                    Savatga
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-xs text-gray-500 py-6 text-center">
              Mos sarf materiali qidirilmoqda...
            </p>
          )}

          <div className="mt-4 pt-3 border-t border-gray-100 flex items-center gap-2 text-[11px] text-gray-500">
            <ShieldCheck className="w-4 h-4 text-jio-blue flex-shrink-0" />
            <span>Faqat zavod sertifikatiga ega original toner va siyohlar</span>
          </div>
        </div>

      </div>
    </section>
  );
}
