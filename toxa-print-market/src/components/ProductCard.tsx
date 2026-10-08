'use client';

import React from 'react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { ShoppingCart, Eye, ShieldCheck, Check, Layers, Sparkles } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart, isB2BMode, setSelectedProduct, cart } = useCart();

  const isAlreadyInCart = cart.some((item) => item.product.id === product.id);
  const displayPrice = isB2BMode ? product.b2bPrice : product.retailPrice;

  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl p-3 sm:p-5 border border-gray-100/90 hover:border-jio-sparkle/60 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group relative overflow-hidden">
      
      {/* Top badges */}
      <div className="flex items-center justify-between mb-2 sm:mb-3">
        <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-wider px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full bg-blue-50 text-jio-blue">
          {product.brand}
        </span>

        {product.badge && (
          <span className="text-[8px] sm:text-[10px] font-bold px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-100 flex items-center gap-0.5 sm:gap-1 max-w-[55%] truncate">
            <Sparkles className="w-2 h-2 sm:w-2.5 sm:h-2.5 text-amber-500 flex-shrink-0" strokeWidth={2.2} aria-hidden="true" />
            <span className="truncate">{product.badge}</span>
          </span>
        )}
      </div>

      {/* Image with zoom effect */}
      <div 
        onClick={() => setSelectedProduct(product)}
        className="w-full h-32 sm:h-44 rounded-xl sm:rounded-2xl bg-gray-50 flex items-center justify-center p-2 sm:p-3 cursor-pointer overflow-hidden relative"
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-contain group-hover:scale-108 transition-transform duration-500"
          loading="lazy"
        />

        {/* Quick view floating overlay */}
        <div className="absolute inset-0 bg-jio-blue/10 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <span className="bg-white text-jio-blue font-bold text-xs px-3.5 py-1.5 rounded-full shadow-md flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-all">
            <Eye className="w-3.5 h-3.5 flex-shrink-0" strokeWidth={2} aria-hidden="true" />
            Ko'rish
          </span>
        </div>
      </div>

      {/* Product Details */}
      <div className="pt-2 sm:pt-4 flex-1 flex flex-col justify-between">
        <div>
          <span className="text-[10px] sm:text-[11px] font-semibold text-gray-400 block mb-0.5 truncate">
            {product.categoryName}
          </span>
          <h4 
            onClick={() => setSelectedProduct(product)}
            className="text-xs sm:text-sm md:text-base font-black text-gray-900 group-hover:text-jio-blue transition cursor-pointer line-clamp-2 leading-snug min-h-[2rem] sm:min-h-[2.5rem]"
          >
            {product.name}
          </h4>

          {/* Specs tags */}
          <div className="flex flex-wrap gap-1 sm:gap-1.5 mt-1.5 sm:mt-2.5">
            {product.specs.technology && (
              <span className="text-[9px] sm:text-[10px] font-medium bg-gray-100 text-gray-600 px-1.5 sm:px-2 py-0.5 rounded-md truncate max-w-[120px]">
                {product.specs.technology.split(' ')[0]}
              </span>
            )}
            {product.specs.speed && (
              <span className="text-[9px] sm:text-[10px] font-medium bg-gray-100 text-gray-600 px-1.5 sm:px-2 py-0.5 rounded-md truncate max-w-[120px]">
                {product.specs.speed.split('(')[0]}
              </span>
            )}
            {product.specs.yieldPages && (
              <span className="text-[9px] sm:text-[10px] font-medium bg-emerald-50 text-emerald-700 px-1.5 sm:px-2 py-0.5 rounded-md font-semibold">
                {product.specs.yieldPages}
              </span>
            )}
          </div>

          {/* Compatibility badge link */}
          {product.compatibleSkus.length > 0 && (
            <div className="mt-2 sm:mt-3 py-1 px-1.5 sm:px-2 rounded-lg bg-blue-50/70 border border-blue-100 text-[9px] sm:text-[11px] text-jio-blue font-semibold flex items-center gap-1 sm:gap-1.5">
              <Layers className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-jio-sparkle flex-shrink-0" strokeWidth={2} aria-hidden="true" />
              <span className="truncate">
                Moslik: {product.compatibleSkus.join(', ')}
              </span>
            </div>
          )}
        </div>

        {/* Pricing and Stock */}
        <div className="pt-2 sm:pt-4 border-t border-gray-100 mt-2 sm:mt-4">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-2 gap-0.5">
            <div>
              <span className="text-xs sm:text-base md:text-xl font-black text-jio-blue tracking-tight block truncate">
                {displayPrice.toLocaleString('uz-UZ')} so'm
              </span>
              {isB2BMode && (
                <span className="block text-[8px] sm:text-[10px] text-amber-700 font-bold">
                  12% QQS bilan
                </span>
              )}
            </div>
            <span className="text-[8px] sm:text-[11px] font-bold text-emerald-600 bg-emerald-50 px-1.5 sm:px-2 py-0.5 rounded-full self-start sm:self-auto">
              Zaxirada: {product.stock}
            </span>
          </div>

          {/* Action Button */}
          <div className="flex items-center gap-1.5 sm:gap-2 pt-1">
            <button
              onClick={() => setSelectedProduct(product)}
              className="p-1.5 sm:p-2.5 rounded-lg sm:rounded-xl border border-gray-200 text-gray-600 hover:text-jio-blue hover:bg-gray-50 transition flex-shrink-0"
              title="Batafsil xususiyatlar"
            >
              <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" strokeWidth={2} aria-hidden="true" />
            </button>
            <button
              onClick={() => addToCart(product, 1)}
              className={`flex-1 py-1.5 sm:py-2.5 px-2 sm:px-4 rounded-lg sm:rounded-xl font-black text-[11px] sm:text-sm flex items-center justify-center gap-1 sm:gap-2 transition shadow-xs active:scale-95 ${
                isAlreadyInCart
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                  : 'bg-jio-blue hover:bg-jio-dark text-white'
              }`}
            >
              {isAlreadyInCart ? (
                <>
                  <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" strokeWidth={2.5} aria-hidden="true" /> <span className="truncate">Qo'shildi</span>
                </>
              ) : (
                <>
                  <ShoppingCart className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" strokeWidth={2} aria-hidden="true" /> <span className="truncate">Savatga</span>
                </>
              )}
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
