'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useCart } from '../context/CartContext';
import { INITIAL_PRODUCTS } from '../data/products';
import { Search, X, ShoppingCart, Layers, ArrowRight } from 'lucide-react';

export default function SearchModal() {
  const { isSearchOpen, setIsSearchOpen, addToCart, setSelectedProduct, isB2BMode } = useCart();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isSearchOpen]);

  if (!isSearchOpen) return null;

  const trimmed = query.trim().toLowerCase();

  const results = INITIAL_PRODUCTS.filter((p) => {
    if (!trimmed) return false;
    return (
      p.name.toLowerCase().includes(trimmed) ||
      p.sku.toLowerCase().includes(trimmed) ||
      p.brand.toLowerCase().includes(trimmed) ||
      p.categoryName.toLowerCase().includes(trimmed) ||
      p.compatibleSkus.some((s) => s.toLowerCase().includes(trimmed))
    );
  });

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-2.5 sm:p-4 pt-3 sm:pt-16 md:pt-24 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl sm:rounded-3xl max-w-2xl w-full p-4 sm:p-6 shadow-2xl relative border border-gray-100 max-h-[85vh] flex flex-col">
        
        {/* Search Header */}
        <div className="flex items-center gap-2 sm:gap-3 pb-3 sm:pb-4 border-b border-gray-100">
          <Search className="w-5 h-5 text-jio-blue flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Printer yoki kartrij modelini kiriting (masalan: M15w, 44A, L3250)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full text-sm md:text-base font-bold text-gray-900 focus:outline-none placeholder:text-gray-400 placeholder:font-normal"
          />
          <button
            onClick={() => setIsSearchOpen(false)}
            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Search Results Area */}
        <div className="flex-1 overflow-y-auto pt-4 space-y-3">
          {trimmed && results.length === 0 && (
            <div className="py-12 text-center text-gray-400 text-xs">
              "{query}" bo'yicha mahsulot topilmadi. Boshqa model yoki nom bilan qidirib ko'ring.
            </div>
          )}

          {!trimmed && (
            <div className="py-8 space-y-4">
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">
                Ommabop Qidiruvlar:
              </span>
              <div className="flex flex-wrap gap-2">
                {['HP M15w', 'Epson L3250', 'Canon G2420', 'HP 44A Toner', 'HP DesignJet T650'].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setQuery(tag)}
                    className="text-xs font-bold bg-gray-50 hover:bg-blue-50 text-gray-700 hover:text-jio-blue px-3.5 py-1.5 rounded-full border border-gray-200 transition"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}

          {results.map((product) => {
            const price = isB2BMode ? product.b2bPrice : product.retailPrice;

            // Find matching supplies
            const matchingSupplies = INITIAL_PRODUCTS.filter((c) =>
              c.type === 'CONSUMABLE' && product.compatibleSkus.includes(c.sku)
            );

            return (
              <div
                key={product.id}
                className="p-3.5 border border-gray-100 hover:border-jio-sparkle rounded-2xl bg-gray-50/50 hover:bg-white transition flex flex-col gap-2 group"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-14 h-14 object-contain rounded-xl bg-white p-1 border border-gray-100"
                  />

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold text-jio-blue uppercase bg-blue-50 px-2 py-0.5 rounded">
                        {product.brand}
                      </span>
                      <span className="text-[10px] text-gray-400 font-semibold">
                        SKU: {product.sku}
                      </span>
                    </div>

                    <h4 
                      onClick={() => {
                        setSelectedProduct(product);
                        setIsSearchOpen(false);
                      }}
                      className="text-xs md:text-sm font-black text-gray-900 group-hover:text-jio-blue transition cursor-pointer truncate mt-0.5"
                    >
                      {product.name}
                    </h4>

                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="text-xs font-black text-jio-blue">
                        {price.toLocaleString('uz-UZ')} so'm
                      </span>
                      {isB2BMode && (
                        <span className="text-[10px] text-amber-700 font-semibold">(QQS bilan)</span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setSelectedProduct(product);
                        setIsSearchOpen(false);
                      }}
                      className="text-xs font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-xl transition"
                    >
                      Batafsil
                    </button>
                    <button
                      onClick={() => addToCart(product, 1)}
                      className="text-xs font-bold bg-jio-blue hover:bg-jio-dark text-white p-2 rounded-xl transition shadow-sm"
                      title="Savatga qo'shish"
                    >
                      <ShoppingCart className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Instant matching consumable suggestions */}
                {matchingSupplies.length > 0 && (
                  <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-600">
                    <span className="flex items-center gap-1.5 font-semibold text-emerald-700">
                      <Layers className="w-3.5 h-3.5" /> Mos kartrij: {matchingSupplies[0].name}
                    </span>
                    <button
                      onClick={() => addToCart(matchingSupplies[0], 1)}
                      className="text-[10px] font-bold text-jio-blue hover:underline"
                    >
                      + Kartrijni ham qo'shish
                    </button>
                  </div>
                )}

              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
