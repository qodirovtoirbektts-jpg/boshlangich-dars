'use client';

import React from 'react';
import { useCart } from '../context/CartContext';
import { Home, Grid, ShoppingCart, User as UserIcon, Sparkles } from 'lucide-react';

interface BottomNavProps {
  onScrollToCatalog: () => void;
}

export default function BottomNav({ onScrollToCatalog }: BottomNavProps) {
  const { 
    totalCartItemsCount, 
    setIsCartOpen, 
    setIsAuthOpen, 
    setIsWizardOpen,
    user 
  } = useCart();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-200 h-16 flex justify-around items-center z-40 px-2 shadow-[0_-4px_16px_rgba(0,0,0,0.06)]">
      
      {/* 1. Asosiy */}
      <button 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="flex flex-col items-center text-jio-blue font-bold group cursor-pointer flex-1"
      >
        <Home className="w-5 h-5 mb-0.5 group-hover:scale-110 transition" />
        <span className="text-[10px]">Asosiy</span>
      </button>

      {/* 2. Katalog */}
      <button 
        onClick={onScrollToCatalog}
        className="flex flex-col items-center text-gray-500 hover:text-jio-blue font-bold group cursor-pointer flex-1"
      >
        <Grid className="w-5 h-5 mb-0.5 group-hover:scale-110 transition" />
        <span className="text-[10px]">Katalog</span>
      </button>

      {/* 3. Smart Tanlov */}
      <button 
        onClick={() => setIsWizardOpen(true)}
        className="flex flex-col items-center text-amber-500 font-bold group cursor-pointer flex-1"
      >
        <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center -mt-4 shadow-md border-2 border-white">
          <Sparkles className="w-4 h-4 text-amber-600" />
        </div>
        <span className="text-[10px] mt-0.5 text-amber-600">Tanlov</span>
      </button>

      {/* 4. Savatcha */}
      <button 
        onClick={() => setIsCartOpen(true)}
        className="relative flex flex-col items-center text-gray-500 hover:text-jio-blue font-bold group cursor-pointer flex-1"
      >
        <div className="relative">
          <ShoppingCart className="w-5 h-5 mb-0.5 group-hover:scale-110 transition" />
          {totalCartItemsCount > 0 && (
            <span className="absolute -top-1.5 -right-2.5 bg-amber-400 text-neutral-900 text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center">
              {totalCartItemsCount}
            </span>
          )}
        </div>
        <span className="text-[10px]">Savatcha</span>
      </button>

      {/* 5. Profil */}
      <button 
        onClick={() => setIsAuthOpen(true)}
        className="flex flex-col items-center text-gray-500 hover:text-jio-blue font-bold group cursor-pointer flex-1"
      >
        <UserIcon className="w-5 h-5 mb-0.5 group-hover:scale-110 transition" />
        <span className="text-[10px]">
          {user ? (user.role === 'B2B' ? 'B2B' : 'Profil') : 'Kirish'}
        </span>
      </button>

    </nav>
  );
}
