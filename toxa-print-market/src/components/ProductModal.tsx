'use client';

import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { INITIAL_PRODUCTS } from '../data/products';
import { 
  X, 
  ShoppingCart, 
  ShieldCheck, 
  Truck, 
  Layers, 
  Check, 
  Sparkles, 
  Box, 
  Cpu, 
  Plus, 
  Minus 
} from 'lucide-react';

export default function ProductModal() {
  const { selectedProduct, setSelectedProduct, addToCart, setIsCartOpen, isB2BMode } = useCart();
  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState<'specs' | 'compatibility' | 'shipping'>('specs');

  if (!selectedProduct) return null;

  const displayPrice = isB2BMode ? selectedProduct.b2bPrice : selectedProduct.retailPrice;

  // Find compatible products
  const compatibleProducts = INITIAL_PRODUCTS.filter((p) =>
    selectedProduct.compatibleSkus.includes(p.sku) || p.compatibleSkus.includes(selectedProduct.sku)
  );

  const volumetricWeight = Number(((selectedProduct.length * selectedProduct.width * selectedProduct.height) / 5000).toFixed(2));
  const billableWeight = Math.max(selectedProduct.weight, volumetricWeight);

  const handleAddToCart = () => {
    addToCart(selectedProduct, qty);
    setSelectedProduct(null);
  };

  const handleBuyBundle = (compProduct: typeof INITIAL_PRODUCTS[0]) => {
    addToCart(selectedProduct, 1);
    addToCart(compProduct, 1, true);
    setSelectedProduct(null);
    setIsCartOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-t-3xl sm:rounded-3xl max-w-3xl w-full p-4 sm:p-6 md:p-8 shadow-2xl relative border border-gray-100 max-h-[90vh] overflow-y-auto pb-safe">
        
        {/* Close button */}
        <button
          onClick={() => setSelectedProduct(null)}
          className="absolute top-3.5 right-3.5 sm:top-5 sm:right-5 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 transition z-10"
        >
          <X className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" strokeWidth={2} aria-hidden="true" />
        </button>

        {/* Top Product Hero */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 items-center pb-4 sm:pb-6 border-b border-gray-100">
          <div className="w-full h-44 sm:h-64 bg-gray-50 rounded-2xl flex items-center justify-center p-3 sm:p-4 border border-gray-100">
            <img
              src={selectedProduct.image}
              alt={selectedProduct.name}
              className="max-h-full max-w-full object-contain"
            />
          </div>

          <div className="space-y-2.5 sm:space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full bg-blue-50 text-jio-blue">
                {selectedProduct.brand}
              </span>
              <span className="text-[11px] sm:text-xs font-bold text-gray-400">
                SKU: {selectedProduct.sku}
              </span>
            </div>

            <h3 className="text-base sm:text-xl md:text-2xl font-black text-gray-900 leading-snug">
              {selectedProduct.name}
            </h3>

            <div className="flex items-baseline gap-2 pt-0.5">
              <span className="text-xl sm:text-2xl md:text-3xl font-black text-jio-blue">
                {displayPrice.toLocaleString('uz-UZ')} so'm
              </span>
              {isB2BMode && (
                <span className="text-[10px] sm:text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md">
                  12% QQS bilan
                </span>
              )}
            </div>

            <p className="text-[11px] sm:text-xs text-gray-500">
              Kafolat: <strong className="text-gray-800">{selectedProduct.warranty} oy</strong> • Ombor: <strong className="text-emerald-700">{selectedProduct.stock} dona</strong>
            </p>

            {/* Quantity and Add to Cart */}
            <div className="flex items-center gap-2 sm:gap-3 pt-2">
              <div className="flex items-center border border-gray-200 rounded-xl p-1 bg-gray-50">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-white flex items-center justify-center text-gray-600 hover:text-jio-blue shadow-xs"
                >
                  <Minus className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" strokeWidth={2} aria-hidden="true" />
                </button>
                <span className="w-8 sm:w-10 text-center font-black text-xs sm:text-sm text-gray-800">
                  {qty}
                </span>
                <button
                  onClick={() => setQty((q) => q + 1)}
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-white flex items-center justify-center text-gray-600 hover:text-jio-blue shadow-xs"
                >
                  <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" strokeWidth={2} aria-hidden="true" />
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className="flex-1 bg-jio-blue hover:bg-jio-dark text-white py-2.5 sm:py-3 px-4 sm:px-6 rounded-xl font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-blue-900/10 transition active:scale-95"
              >
                <ShoppingCart className="w-4 h-4 flex-shrink-0" strokeWidth={2} aria-hidden="true" />
                Savatchaga
              </button>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 sm:gap-4 border-b border-gray-200 mt-4 sm:mt-6 pb-2 text-xs md:text-sm font-bold overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab('specs')}
            className={`pb-1.5 transition flex items-center gap-1.5 flex-shrink-0 ${
              activeTab === 'specs'
                ? 'text-jio-blue border-b-2 border-jio-blue'
                : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            <Cpu className="w-4 h-4 flex-shrink-0" strokeWidth={2} aria-hidden="true" /> Texnik Xususiyatlar
          </button>
          <button
            onClick={() => setActiveTab('compatibility')}
            className={`pb-2 transition flex items-center gap-1.5 flex-shrink-0 ${
              activeTab === 'compatibility'
                ? 'text-jio-blue border-b-2 border-jio-blue'
                : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            <Layers className="w-4 h-4 flex-shrink-0" strokeWidth={2} aria-hidden="true" /> Mos Keluvchi Sarf Materiallari ({compatibleProducts.length})
          </button>
          <button
            onClick={() => setActiveTab('shipping')}
            className={`pb-2 transition flex items-center gap-1.5 flex-shrink-0 ${
              activeTab === 'shipping'
                ? 'text-jio-blue border-b-2 border-jio-blue'
                : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            <Box className="w-4 h-4 flex-shrink-0" strokeWidth={2} aria-hidden="true" /> O'lcham & Logistika
          </button>
        </div>

        {/* TAB 1: SPECS */}
        {activeTab === 'specs' && (
          <div className="py-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs md:text-sm">
            {Object.entries(selectedProduct.specs).map(([key, val]) => (
              <div key={key} className="p-3 bg-gray-50 rounded-xl flex flex-col justify-center">
                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wide">
                  {key}
                </span>
                <span className="font-semibold text-gray-900 mt-0.5">{val}</span>
              </div>
            ))}
          </div>
        )}

        {/* TAB 2: COMPATIBILITY & CROSS-SELL */}
        {activeTab === 'compatibility' && (
          <div className="py-4 space-y-4">
            <p className="text-xs text-gray-500">
              Ushbu model bilan to'liq sinovdan o'tgan va 100% mos keluvchi sarf materiallari:
            </p>

            {compatibleProducts.length > 0 ? (
              <div className="space-y-3">
                {compatibleProducts.map((comp) => (
                  <div
                    key={comp.id}
                    className="p-4 border-2 border-gray-100 hover:border-jio-sparkle rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 bg-gray-50/50"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={comp.image}
                        alt={comp.name}
                        className="w-16 h-16 object-contain rounded-xl bg-white p-1"
                      />
                      <div>
                        <span className="text-[10px] font-bold text-jio-blue uppercase">
                          {comp.brand} Original
                        </span>
                        <h5 className="font-black text-sm text-gray-900">
                          {comp.name}
                        </h5>
                        <p className="text-xs text-gray-500 mt-0.5">
                          Resurs: {comp.specs.yieldPages || 'Standart'}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                      <div className="text-right">
                        <span className="font-black text-base text-gray-900 block">
                          {(isB2BMode ? comp.b2bPrice : comp.retailPrice).toLocaleString('uz-UZ')} so'm
                        </span>
                        <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                          100% Moslik
                        </span>
                      </div>
                      <button
                        onClick={() => handleBuyBundle(comp)}
                        className="bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition flex items-center gap-1 shadow-sm"
                      >
                        <Sparkles className="w-3.5 h-3.5 flex-shrink-0" strokeWidth={2} aria-hidden="true" />
                        Birgalikda Olish (-10%)
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-6 bg-gray-50 rounded-2xl text-center text-xs text-gray-500">
                Ushbu uskuna uchun alohida moslik mavjud emas yoki u aksessuardir.
              </div>
            )}
          </div>
        )}

        {/* TAB 3: SHIPPING & DIMENSIONS */}
        {activeTab === 'shipping' && (
          <div className="py-4 space-y-4 text-xs md:text-sm">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 bg-gray-50 rounded-xl">
                <span className="text-gray-400 font-bold block text-[10px] uppercase">Uzunligi (L)</span>
                <span className="font-black text-gray-900">{selectedProduct.length} sm</span>
              </div>
              <div className="p-3 bg-gray-50 rounded-xl">
                <span className="text-gray-400 font-bold block text-[10px] uppercase">Kengligi (W)</span>
                <span className="font-black text-gray-900">{selectedProduct.width} sm</span>
              </div>
              <div className="p-3 bg-gray-50 rounded-xl">
                <span className="text-gray-400 font-bold block text-[10px] uppercase">Balandligi (H)</span>
                <span className="font-black text-gray-900">{selectedProduct.height} sm</span>
              </div>
              <div className="p-3 bg-gray-50 rounded-xl">
                <span className="text-gray-400 font-bold block text-[10px] uppercase">Sof Og'irlik</span>
                <span className="font-black text-gray-900">{selectedProduct.weight} kg</span>
              </div>
            </div>

            <div className="p-4 bg-blue-50 border border-blue-100 rounded-2xl flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-jio-blue uppercase block">
                  Logistika Hajm-Vazn Kalkulyatori:
                </span>
                <p className="text-xs text-blue-900 mt-0.5">
                  Fizik og'irlik: <strong>{selectedProduct.weight} kg</strong> | Hajm og'irligi (L×W×H/5000): <strong>{volumetricWeight} kg</strong>
                </p>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-gray-500 font-semibold block">Hisoblanuvchi vazn:</span>
                <span className="text-base font-black text-jio-blue">{billableWeight} kg</span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-gray-500">
              <Truck className="w-4 h-4 text-jio-blue flex-shrink-0" strokeWidth={2} aria-hidden="true" />
              <span>O'zbekistonning 14 hududiga BTS va Express orqali eshikkacha yetkaziladi</span>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
