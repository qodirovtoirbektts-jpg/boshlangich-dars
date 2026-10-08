'use client';

import React from 'react';
import { useCart } from '../context/CartContext';
import { Home, Grid, ShoppingCart, Sparkles, Search } from 'lucide-react';

interface BottomNavProps {
  onScrollToCatalog: () => void;
}

export default function BottomNav({ onScrollToCatalog }: BottomNavProps) {
  const { 
    totalCartItemsCount, 
    setIsCartOpen, 
    setIsWizardOpen,
    setIsSearchOpen,
  } = useCart();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-200/90 z-40 px-3 shadow-[0_-4px_24px_rgba(0,0,0,0.08)] pb-safe pt-1.5 h-16 flex justify-around items-center">
      
      {/* 1. Asosiy */}
      <button 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="flex flex-col items-center justify-center text-gray-600 hover:text-jio-blue active:text-jio-blue font-bold group cursor-pointer flex-1 py-1"
      >
        <Home className="w-5 h-5 mb-0.5 text-jio-blue group-hover:scale-110 transition" />
        <span className="text-[10px] text-jio-blue leading-none">Asosiy</span>
      </button>

      {/* 2. Katalog */}
      <button 
        onClick={onScrollToCatalog}
        className="flex flex-col items-center justify-center text-gray-500 hover:text-jio-blue active:text-jio-blue font-bold group cursor-pointer flex-1 py-1"
      >
        <Grid className="w-5 h-5 mb-0.5 group-hover:scale-110 transition" />
        <span className="text-[10px] leading-none">Katalog</span>
      </button>

      {/* 3. Smart Tanlov (Center Floating Action) */}
      <button 
        onClick={() => setIsWizardOpen(true)}
        className="flex flex-col items-center justify-center font-black group cursor-pointer flex-1 -mt-4"
      >
        <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-amber-500 to-amber-400 text-slate-950 flex items-center justify-center shadow-lg shadow-amber-500/30 border-2 border-white group-active:scale-95 transition">
          <Sparkles className="w-5 h-5 text-slate-950" />
        </div>
        <span className="text-[9px] font-black text-amber-700 mt-0.5 leading-none">Smart Tanlov</span>
      </button>

      {/* 4. Qidiruv */}
      <button 
        onClick={() => setIsSearchOpen(true)}
        className="flex flex-col items-center justify-center text-gray-500 hover:text-jio-blue active:text-jio-blue font-bold group cursor-pointer flex-1 py-1"
      >
        <Search className="w-5 h-5 mb-0.5 group-hover:scale-110 transition" />
        <span className="text-[10px] leading-none">Qidirish</span>
      </button>

      {/* 5. Savatcha */}
      <button 
        onClick={() => setIsCartOpen(true)}
        className="relative flex flex-col items-center justify-center text-gray-500 hover:text-jio-blue active:text-jio-blue font-bold group cursor-pointer flex-1 py-1"
      >
        <div className="relative">
          <ShoppingCart className="w-5 h-5 mb-0.5 group-hover:scale-110 transition" />
          {totalCartItemsCount > 0 && (
            <span className="absolute -top-1 -right-2.5 bg-rose-500 text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
              {totalCartItemsCount}
            </span>
          )}
        </div>
        <span className="text-[10px] leading-none">Savatcha</span>
      </button>

    </nav>
  );
}
