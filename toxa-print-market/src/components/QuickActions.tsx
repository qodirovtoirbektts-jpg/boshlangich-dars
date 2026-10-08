'use client';

import React from 'react';
import { useCart } from '../context/CartContext';
import { 
  Printer, 
  Droplets, 
  Package, 
  Maximize2, 
  Sparkles, 
  Building2, 
  Truck, 
  Wrench 
} from 'lucide-react';

interface QuickActionsProps {
  onSelectCategory: (categorySlug: string) => void;
  activeCategory: string;
}

export default function QuickActions({ onSelectCategory, activeCategory }: QuickActionsProps) {
  const { setIsWizardOpen, setIsB2BPortalOpen, setIsTrackingOpen } = useCart();

  const actions = [
    {
      id: 'printers-laser',
      label: 'Lazerli Printerlar',
      subtext: 'Tezkor monoxrom',
      icon: <Printer className="w-6 h-6 text-jio-blue" />,
      onClick: () => onSelectCategory('printers'),
      isActive: activeCategory === 'printers',
    },
    {
      id: 'printers-inkjet',
      label: 'Siyohli MFP',
      subtext: 'Rangli CISS bosma',
      icon: <Droplets className="w-6 h-6 text-sky-500" />,
      onClick: () => onSelectCategory('printers'),
      isActive: activeCategory === 'printers',
    },
    {
      id: 'consumables',
      label: 'Kartrij & Siyoh',
      subtext: '100% Original toner',
      icon: <Package className="w-6 h-6 text-indigo-500" />,
      onClick: () => onSelectCategory('consumables'),
      isActive: activeCategory === 'consumables',
    },
    {
      id: 'plotters',
      label: 'Plotterlar (A1/A0)',
      subtext: 'Muhandislik va SAPR',
      icon: <Maximize2 className="w-6 h-6 text-emerald-600" />,
      onClick: () => onSelectCategory('plotters'),
      isActive: activeCategory === 'plotters',
    },
    {
      id: 'wizard',
      label: 'Smart Tanlov',
      subtext: '3 klikda topish',
      icon: <Sparkles className="w-6 h-6 text-amber-500 animate-bounce" />,
      onClick: () => setIsWizardOpen(true),
      highlight: true,
    },
    {
      id: 'b2b',
      label: 'B2B Portal',
      subtext: 'QQS & Didox hisob',
      icon: <Building2 className="w-6 h-6 text-purple-600" />,
      onClick: () => setIsB2BPortalOpen(true),
    },
    {
      id: 'logistics',
      label: '14 Hudud Kuzatuv',
      subtext: 'Yetkazish holati',
      icon: <Truck className="w-6 h-6 text-blue-600" />,
      onClick: () => setIsTrackingOpen(true),
    },
    {
      id: 'service',
      label: 'Servis Markazi',
      subtext: 'Texnik xizmat',
      icon: <Wrench className="w-6 h-6 text-rose-500" />,
      onClick: () => alert("Toxa Print Servis Markazi: Mutaxassis chaqirish uchun telefon: +998 (71) 200-00-00"),
    },
  ];

  return (
    <section className="w-full">
      <div className="flex items-center justify-between mb-2 sm:mb-3 px-1">
        <h3 className="text-sm sm:text-base md:text-lg font-black text-gray-900 tracking-tight flex items-center gap-1.5">
          <span>Tezkor Bo'limlar</span>
        </h3>
        <span className="text-[11px] text-gray-400 font-semibold sm:inline hidden">Toxa Print Ekosistemasi</span>
        <span className="text-[10px] text-jio-blue font-bold sm:hidden">Yoniga suring ➔</span>
      </div>

      <div className="-mx-3 px-3 sm:mx-0 sm:px-0 flex overflow-x-auto no-scrollbar gap-2 sm:gap-3 pb-1.5 sm:pb-0 sm:grid sm:grid-cols-4 lg:grid-cols-8">
        {actions.map((act) => (
          <div
            key={act.id}
            onClick={act.onClick}
            className={`min-w-[100px] sm:min-w-0 flex-shrink-0 sm:flex-shrink flex flex-col items-center justify-center p-2.5 sm:p-3.5 rounded-2xl bg-white border cursor-pointer transition-all duration-200 group text-center select-none active:scale-95 ${
              act.isActive
                ? 'border-jio-blue shadow-md shadow-blue-900/10 scale-102 ring-2 ring-jio-blue/20'
                : act.highlight
                ? 'border-amber-200 bg-amber-50/40 hover:border-amber-400 hover:shadow-md'
                : 'border-gray-100 hover:border-jio-sparkle/50 hover:shadow-xs'
            }`}
          >
            <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center mb-1.5 sm:mb-2.5 transition-transform group-hover:scale-110 ${
              act.highlight ? 'bg-amber-100' : 'bg-gray-50'
            }`}>
              {React.cloneElement(act.icon as React.ReactElement, {
                className: 'w-5 h-5 sm:w-6 sm:h-6 ' + ((act.icon as any).props.className || '')
              })}
            </div>
            <span className="text-[11px] sm:text-xs font-bold text-gray-900 leading-tight truncate w-full">
              {act.label}
            </span>
            <span className="text-[9px] sm:text-[10px] text-gray-400 font-medium mt-0.5 leading-none truncate w-full">
              {act.subtext}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
