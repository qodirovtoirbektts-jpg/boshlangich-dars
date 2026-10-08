'use client';

import React from 'react';
import { useCart } from '../context/CartContext';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingCart, 
  AlertTriangle, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck 
} from 'lucide-react';

export default function CartDrawer() {
  const { 
    cart, 
    isCartOpen, 
    setIsCartOpen, 
    updateQuantity, 
    removeFromCart, 
    clearCart, 
    cartSubtotal, 
    isB2BMode, 
    setIsCheckoutOpen 
  } = useCart();

  if (!isCartOpen) return null;

  // Check if there are consumables without matching printer
  const printersInCart = cart.filter((item) => item.product.type === 'PRINTER');
  const printerSkusInCart = printersInCart.map((p) => p.product.sku);

  const standaloneConsumables = cart.filter(
    (item) => item.product.type === 'CONSUMABLE' && !item.product.compatibleSkus.some((sku) => printerSkusInCart.includes(sku))
  );

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-md h-full shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300">
        
        {/* Drawer Header */}
        <div className="p-5 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-jio-blue">
              <ShoppingCart className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-black text-lg text-gray-900 leading-none">Savatcha</h3>
              <span className="text-xs text-gray-400 font-semibold">
                {cart.length} xil mahsulot
              </span>
            </div>
          </div>

          <button
            onClick={() => setIsCartOpen(false)}
            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Incompatibility Soft Toast Warning */}
        {standaloneConsumables.length > 0 && (
          <div className="mx-4 mt-3 p-3 bg-amber-50 border border-amber-200 rounded-2xl flex items-start gap-2.5 text-xs text-amber-900">
            <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-bold block">Moslik eslatmasi:</span>
              <p className="mt-0.5 text-[11px] text-amber-800 leading-relaxed">
                Savatchadagi <strong>{standaloneConsumables[0].product.name}</strong> kartriji mavjud printeringizga to'g'ri kelishiga ishonch hosil qiling.
              </p>
            </div>
          </div>
        )}

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-gray-400">
              <ShoppingCart className="w-16 h-16 stroke-1 text-gray-300 mb-3" />
              <p className="font-bold text-gray-700 text-base">Savatchangiz bo'sh</p>
              <p className="text-xs text-gray-400 max-w-xs mt-1">
                Katalogimizdan o'zingizga ma'qul printer yoki sarf materialini tanlang
              </p>
            </div>
          ) : (
            cart.map((item) => {
              const price = isB2BMode ? item.product.b2bPrice : item.product.retailPrice;
              const finalPrice = item.isBundle ? price * 0.9 : price;

              return (
                <div
                  key={item.product.id}
                  className="p-3.5 border border-gray-100 rounded-2xl bg-gray-50/50 flex items-center gap-3 relative group"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-16 h-16 object-contain rounded-xl bg-white p-1 border border-gray-100"
                  />

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[9px] font-bold uppercase text-jio-blue bg-blue-50 px-1.5 py-0.5 rounded">
                        {item.product.brand}
                      </span>
                      {item.isBundle && (
                        <span className="text-[9px] font-black text-amber-700 bg-amber-100 px-1.5 py-0.5 rounded flex items-center gap-0.5">
                          <Sparkles className="w-2.5 h-2.5" /> -10% Bundle
                        </span>
                      )}
                    </div>

                    <h4 className="text-xs font-bold text-gray-900 truncate mt-0.5">
                      {item.product.name}
                    </h4>

                    <div className="flex items-baseline gap-1.5 mt-1">
                      <span className="text-xs font-black text-jio-blue">
                        {(finalPrice * item.quantity).toLocaleString('uz-UZ')} so'm
                      </span>
                      <span className="text-[10px] text-gray-400">
                        ({finalPrice.toLocaleString('uz-UZ')} × {item.quantity})
                      </span>
                    </div>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex flex-col items-end gap-2">
                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="text-gray-400 hover:text-rose-500 transition p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>

                    <div className="flex items-center border border-gray-200 rounded-lg bg-white p-0.5">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="w-6 h-6 flex items-center justify-center text-gray-500 hover:text-jio-blue"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-6 text-center text-xs font-bold">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="w-6 h-6 flex items-center justify-center text-gray-500 hover:text-jio-blue"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Drawer Footer */}
        {cart.length > 0 && (
          <div className="p-4 sm:p-5 border-t border-gray-100 bg-white space-y-3 pb-safe">
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-gray-500">
                <span>Mahsulotlar summasi:</span>
                <span className="font-bold text-gray-800">
                  {cartSubtotal.toLocaleString('uz-UZ')} so'm
                </span>
              </div>
              {isB2BMode && (
                <div className="flex justify-between text-amber-700 font-semibold">
                  <span>Shu jumladan 12% QQS:</span>
                  <span>{Math.round((cartSubtotal / 1.12) * 0.12).toLocaleString('uz-UZ')} so'm</span>
                </div>
              )}
              <div className="flex justify-between text-gray-500">
                <span>Yetkazib berish (14 hudud):</span>
                <span className="text-emerald-600 font-bold">Checkoutda hisoblanadi</span>
              </div>
              <div className="pt-2 border-t border-gray-100 flex justify-between items-baseline">
                <span className="text-sm font-black text-gray-900">Jami to'lov:</span>
                <span className="text-xl font-black text-jio-blue">
                  {cartSubtotal.toLocaleString('uz-UZ')} so'm
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-1">
              <button
                onClick={clearCart}
                className="text-xs text-gray-400 hover:text-rose-500 p-2 font-semibold transition"
              >
                Tozalash
              </button>
              <button
                onClick={handleProceedToCheckout}
                className="flex-1 bg-jio-blue hover:bg-jio-dark text-white py-3.5 px-6 rounded-2xl font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-blue-900/10 transition active:scale-95 cursor-pointer"
              >
                Rasmiylashtirish <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
