'use client';

import React, { useState, useRef } from 'react';
import HeroSlider from '../components/HeroSlider';
import QuickActions from '../components/QuickActions';
import CompatibilityBanner from '../components/CompatibilityBanner';
import ProductCard from '../components/ProductCard';
import BottomNav from '../components/BottomNav';
import { INITIAL_PRODUCTS } from '../data/products';
import { useCart } from '../context/CartContext';
import { UZBEKISTAN_REGIONS } from '../config/regions';
import { 
  Sparkles, 
  Filter, 
  Building2, 
  Truck, 
  ShieldCheck, 
  ArrowRight, 
  MapPin, 
  Layers, 
  FileText 
} from 'lucide-react';

export default function Home() {
  const { setIsWizardOpen, setIsB2BPortalOpen, isB2BMode, products, siteSettings } = useCart();
  const catalogRef = useRef<HTMLDivElement>(null);

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [activeBrand, setActiveBrand] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'popular' | 'price_asc' | 'price_desc'>('popular');

  const scrollToCatalog = () => {
    catalogRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // URL hash yoki parametr orqali printer bo'limiga to'g'ridan-to'g'ri o'tish
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.toLowerCase();
      const params = new URLSearchParams(window.location.search);
      const cat = params.get('category');
      if (cat) {
        setActiveCategory(cat);
      } else if (hash.includes('printer')) {
        setActiveCategory('printers');
      }
    }
  }, []);

  // Filter products
  const filteredProducts = products.filter((p) => {
    if (activeCategory !== 'all') {
      if (activeCategory === 'printers' && p.type !== 'PRINTER') return false;
      if (activeCategory === 'consumables' && p.type !== 'CONSUMABLE') return false;
      if (activeCategory === 'plotters' && p.type !== 'PLOTTER') return false;
    }
    if (activeBrand !== 'all' && p.brand.toLowerCase() !== activeBrand.toLowerCase()) {
      return false;
    }
    return true;
  }).sort((a, b) => {
    const priceA = isB2BMode ? a.b2bPrice : a.retailPrice;
    const priceB = isB2BMode ? b.b2bPrice : b.retailPrice;

    if (sortBy === 'price_asc') return priceA - priceB;
    if (sortBy === 'price_desc') return priceB - priceA;
    return 0; // popular
  });

  return (
    <div className="flex flex-col gap-5 sm:gap-8 py-2 sm:py-4 md:py-6">
      
      {/* 1. Katta Hero Banner (Slider) */}
      <HeroSlider />

      {/* 2. Tezkor Harakatlar (Quick Actions) */}
      <QuickActions 
        onSelectCategory={(slug) => {
          setActiveCategory(slug);
          scrollToCatalog();
        }}
        activeCategory={activeCategory}
      />

      {/* 3. Moslik Dvigateli (Compatibility Finder Banner) */}
      <CompatibilityBanner />

      {/* 4. Smart Tanlov Vidjeti Banneri */}
      <section className="w-full bg-white rounded-2xl sm:rounded-3xl shadow-xs border border-gray-100 p-4 sm:p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6">
        <div className="space-y-1.5 sm:space-y-2 max-w-xl text-left w-full">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-amber-50 text-amber-800 text-[10px] sm:text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-500" />
            Jio Smart Tanlov
          </div>
          <h3 className="text-lg sm:text-2xl md:text-3xl font-black text-gray-900 tracking-tight leading-snug">
            Qaysi printer sizga mos kelishini bilmayapsizmi?
          </h3>
          <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
            3 ta oddiy savolga javob bering — aqlli algoritmimiz sizning vazifangizga mos eng tejamkor printerni va unga mos kartrijni aniqlab beradi.
          </p>
        </div>

        <button
          onClick={() => setIsWizardOpen(true)}
          className="w-full sm:w-auto bg-jio-blue hover:bg-jio-dark text-white px-6 py-3.5 sm:px-8 sm:py-4 rounded-full font-black text-xs sm:text-sm md:text-base flex items-center justify-center gap-2 shadow-lg shadow-blue-900/10 transition transform active:scale-95 flex-shrink-0"
        >
          Smart Tanlovni Boshlash <ArrowRight className="w-4 h-4" />
        </button>
      </section>

      {/* 5. Asosiy Mahsulotlar Katalogi */}
      <section ref={catalogRef} id="catalog" className="scroll-mt-20 md:scroll-mt-24 space-y-4 sm:space-y-6">
        
        {/* Catalog Header & Filters */}
        <div className="bg-white p-3.5 sm:p-5 md:p-6 rounded-2xl sm:rounded-3xl border border-gray-100 shadow-xs space-y-3 sm:space-y-4">
          <div className="flex items-center justify-between gap-2">
            <div>
              <h3 className="text-base sm:text-xl md:text-2xl font-black text-gray-900 tracking-tight leading-tight">
                Mahsulotlar Katalogi
              </h3>
              <p className="text-[11px] sm:text-xs text-gray-500 mt-0.5">
                {filteredProducts.length} ta orgtexnika va sarf materiallari
              </p>
            </div>

            {/* Sorting */}
            <div className="flex items-center gap-1.5 text-xs flex-shrink-0">
              <span className="text-gray-400 font-semibold hidden sm:inline">Saralash:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-gray-50 border border-gray-200 rounded-xl px-2.5 py-1.5 sm:px-3 sm:py-2 text-[11px] sm:text-xs font-bold text-gray-800 focus:outline-none focus:border-jio-blue cursor-pointer"
              >
                <option value="popular">Ommabop</option>
                <option value="price_asc">Arzondan</option>
                <option value="price_desc">Qimmatdan</option>
              </select>
            </div>
          </div>

          {/* Category Tabs & Brand Filters (Horizontally scrollable on mobile) */}
          <div className="-mx-3 px-3 sm:mx-0 sm:px-0 flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar pt-2 border-t border-gray-100">
            {[
              { id: 'all', label: 'Barchasi' },
              { id: 'printers', label: 'Printer & MFP' },
              { id: 'consumables', label: 'Kartrij & Siyoh' },
              { id: 'plotters', label: 'Plotterlar' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex-shrink-0 text-[11px] sm:text-xs font-bold px-3 sm:px-4 py-1.5 sm:py-2 rounded-full transition active:scale-95 ${
                  activeCategory === cat.id
                    ? 'bg-jio-blue text-white shadow-xs'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
              >
                {cat.label}
              </button>
            ))}

            <div className="h-4 w-[1px] bg-gray-200 mx-1 flex-shrink-0" />

            {/* Brand Filter */}
            {['all', 'HP', 'Epson', 'Canon'].map((brand) => (
              <button
                key={brand}
                onClick={() => setActiveBrand(brand)}
                className={`flex-shrink-0 text-[10px] sm:text-[11px] font-bold px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full border transition active:scale-95 ${
                  activeBrand === brand
                    ? 'bg-slate-900 text-white border-slate-900'
                    : 'bg-white hover:bg-gray-50 text-gray-600 border-gray-200'
                }`}
              >
                {brand === 'all' ? 'Barcha Brend' : brand}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid - 2 columns on mobile, 3-4 columns on desktop */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2.5 sm:gap-4 md:gap-5">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

      </section>

      {/* 6. 14 Hudud Logistika va Yetkazib Berish Ma'lumotnomasi */}
      <section className="w-full bg-gradient-to-r from-blue-50 to-indigo-50/50 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 border border-blue-100/70">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 sm:gap-6 mb-4 sm:mb-6">
          <div className="space-y-1">
            <span className="text-[10px] sm:text-xs font-black text-jio-blue uppercase tracking-wider flex items-center gap-1.5">
              <Truck className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              O'zbekiston Bo'ylab Yetkazib Berish
            </span>
            <h4 className="text-base sm:text-xl md:text-2xl font-black text-gray-900 tracking-tight">
              14 ta hududga tezkor logistika
            </h4>
          </div>

          <span className="text-[11px] sm:text-xs font-semibold text-gray-600 bg-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-blue-200 shadow-2xs">
            Hajm-vazn kalkulyatori asosida
          </span>
        </div>

        <div className="-mx-3 px-3 sm:mx-0 sm:px-0 flex overflow-x-auto no-scrollbar gap-2 pb-1 sm:pb-0 sm:grid sm:grid-cols-3 lg:grid-cols-7">
          {UZBEKISTAN_REGIONS.map((reg) => (
            <div 
              key={reg.name} 
              className="min-w-[125px] sm:min-w-0 flex-shrink-0 sm:flex-shrink p-2.5 sm:p-3 bg-white rounded-xl sm:rounded-2xl border border-blue-100 text-center space-y-1 shadow-2xs hover:shadow-xs transition"
            >
              <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-jio-blue mx-auto" />
              <h5 className="font-bold text-[10px] sm:text-[11px] text-gray-900 truncate">{reg.name}</h5>
              <p className="text-[9px] sm:text-[10px] text-emerald-600 font-black">{reg.deliveryTime} kun ichida</p>
              <p className="text-[9px] sm:text-[10px] text-gray-400 font-semibold">{reg.basePrice.toLocaleString()} so'm</p>
            </div>
          ))}
        </div>
      </section>

      {/* 7. B2B va Didox Integratsiyasi Bloki */}
      <section id="b2b-section" className="w-full bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-10 border border-gray-100 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-8">
        <div className="space-y-2 sm:space-y-3 max-w-xl text-left w-full">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-purple-50 text-purple-700 text-[10px] sm:text-xs font-bold uppercase">
            <Building2 className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            {siteSettings.b2bBadge}
          </div>
          <h4 className="text-lg sm:text-2xl md:text-3xl font-black text-gray-900 tracking-tight leading-snug">
            {siteSettings.b2bTitle}
          </h4>
          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
            {siteSettings.b2bDescription}
          </p>
        </div>

        <button
          onClick={() => setIsB2BPortalOpen(true)}
          className="w-full sm:w-auto bg-purple-700 hover:bg-purple-800 text-white px-6 py-3.5 sm:px-8 sm:py-4 rounded-full font-black text-xs sm:text-sm md:text-base flex items-center justify-center gap-2 shadow-lg shadow-purple-900/10 transition transform active:scale-95 flex-shrink-0 cursor-pointer"
        >
          <FileText className="w-4 h-4" /> {siteSettings.b2bButtonText}
        </button>
      </section>

      {/* Mobile Sticky Bottom Navigation */}
      <BottomNav onScrollToCatalog={scrollToCatalog} />

    </div>
  );
}
