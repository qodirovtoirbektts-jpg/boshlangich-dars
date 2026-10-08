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
    <div className="flex flex-col gap-8 py-4 md:py-6">
      
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
      <section className="w-full bg-white rounded-3xl shadow-sm border border-gray-100 p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            Jio Smart Tanlov
          </div>
          <h3 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight">
            Qaysi printer sizga mos kelishini bilmayapsizmi?
          </h3>
          <p className="text-xs md:text-sm text-gray-500 leading-relaxed">
            3 ta oddiy savolga javob bering — aqlli algoritmimiz sizning vazifangizga mos eng tejamkor printerni va unga mos kartrijni aniqlab beradi.
          </p>
        </div>

        <button
          onClick={() => setIsWizardOpen(true)}
          className="bg-jio-blue hover:bg-jio-dark text-white px-8 py-4 rounded-full font-black text-sm md:text-base flex items-center gap-2 shadow-lg shadow-blue-900/10 transition transform hover:scale-105 active:scale-95 flex-shrink-0"
        >
          Smart Tanlovni Boshlash <ArrowRight className="w-4 h-4" />
        </button>
      </section>

      {/* 5. Asosiy Mahsulotlar Katalogi */}
      <section ref={catalogRef} id="catalog" className="scroll-mt-24 space-y-6">
        
        {/* Catalog Header & Filters */}
        <div className="bg-white p-5 md:p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-xl md:text-2xl font-black text-gray-900 tracking-tight">
                Mahsulotlar Katalogi
              </h3>
              <p className="text-xs text-gray-500 mt-0.5">
                {filteredProducts.length} ta sertifikatlangan orgtexnika va sarf materiallari
              </p>
            </div>

            {/* Sorting */}
            <div className="flex items-center gap-2 text-xs">
              <span className="text-gray-400 font-semibold">Saralash:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 font-bold text-gray-800 focus:outline-none focus:border-jio-blue cursor-pointer"
              >
                <option value="popular">Ommabop</option>
                <option value="price_asc">Narx: Arzondan qimmatga</option>
                <option value="price_desc">Narx: Qimmatdan arzonga</option>
              </select>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-gray-100">
            {[
              { id: 'all', label: 'Barchasi' },
              { id: 'printers', label: 'Printer & MFP' },
              { id: 'consumables', label: 'Kartrij & Siyoh' },
              { id: 'plotters', label: 'Plotterlar' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`text-xs font-bold px-4 py-2 rounded-full transition ${
                  activeCategory === cat.id
                    ? 'bg-jio-blue text-white shadow-sm'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
              >
                {cat.label}
              </button>
            ))}

            <div className="h-4 w-[1px] bg-gray-200 mx-2 hidden sm:block" />

            {/* Brand Filter */}
            <div className="flex items-center gap-1.5">
              {['all', 'HP', 'Epson', 'Canon'].map((brand) => (
                <button
                  key={brand}
                  onClick={() => setActiveBrand(brand)}
                  className={`text-[11px] font-bold px-3 py-1.5 rounded-full border transition ${
                    activeBrand === brand
                      ? 'bg-slate-900 text-white border-slate-900'
                      : 'bg-white hover:bg-gray-50 text-gray-600 border-gray-200'
                  }`}
                >
                  {brand === 'all' ? 'Barcha Brendlar' : brand}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

      </section>

      {/* 6. 14 Hudud Logistika va Yetkazib Berish Ma'lumotnomasi */}
      <section className="w-full bg-gradient-to-r from-blue-50 to-indigo-50/50 rounded-3xl p-6 md:p-8 border border-blue-100/70">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-6">
          <div className="space-y-1">
            <span className="text-xs font-black text-jio-blue uppercase tracking-wider flex items-center gap-1.5">
              <Truck className="w-4 h-4" />
              O'zbekiston Bo'ylab Yetkazib Berish Geografiyasi
            </span>
            <h4 className="text-xl md:text-2xl font-black text-gray-900 tracking-tight">
              14 ta hududga kafolatlangan tezkor logistika
            </h4>
          </div>

          <span className="text-xs font-semibold text-gray-600 bg-white px-4 py-2 rounded-full border border-blue-200 shadow-2xs">
            Hajm-vazn kalkulyatori asosida arzon tariflar
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-2.5">
          {UZBEKISTAN_REGIONS.map((reg) => (
            <div 
              key={reg.name} 
              className="p-3 bg-white rounded-2xl border border-blue-100 text-center space-y-1 shadow-2xs hover:shadow-xs transition"
            >
              <MapPin className="w-4 h-4 text-jio-blue mx-auto" />
              <h5 className="font-bold text-[11px] text-gray-900 line-clamp-1">{reg.name}</h5>
              <p className="text-[10px] text-emerald-600 font-black">{reg.deliveryTime} kun ichida</p>
              <p className="text-[10px] text-gray-400 font-semibold">{reg.basePrice.toLocaleString()} so'm dan</p>
            </div>
          ))}
        </div>
      </section>

      {/* 7. B2B va Didox Integratsiyasi Bloki */}
      <section id="b2b-section" className="w-full bg-white rounded-3xl p-6 md:p-10 border border-gray-100 shadow-sm flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="space-y-3 max-w-xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-xs font-bold uppercase">
            <Building2 className="w-3.5 h-3.5" />
            {siteSettings.b2bBadge}
          </div>
          <h4 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight">
            {siteSettings.b2bTitle}
          </h4>
          <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
            {siteSettings.b2bDescription}
          </p>
        </div>

        <button
          onClick={() => setIsB2BPortalOpen(true)}
          className="bg-purple-700 hover:bg-purple-800 text-white px-8 py-4 rounded-full font-black text-sm md:text-base flex items-center gap-2 shadow-lg shadow-purple-900/10 transition transform hover:scale-105 active:scale-95 flex-shrink-0 cursor-pointer"
        >
          <FileText className="w-4 h-4" /> {siteSettings.b2bButtonText}
        </button>
      </section>

      {/* Mobile Sticky Bottom Navigation */}
      <BottomNav onScrollToCatalog={scrollToCatalog} />

    </div>
  );
}
