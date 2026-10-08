'use client';

import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { ArrowRight, ChevronLeft, ChevronRight, ShieldCheck, Sparkles, Building2 } from 'lucide-react';

export default function HeroSlider() {
  const { setIsWizardOpen, setIsB2BPortalOpen } = useCart();
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      badge: "Yangi Avlod Texnologiyalari",
      title: "Kengaytirilgan Chop Etish Tajribasi",
      description: "Barcha turdagi printer, MFP va original sarf materiallari yagona ilovada. O'zbekistonning 14 hududiga kafolatli yetkazib berish.",
      buttonText: "Smart Tanlovni Boshlash",
      action: () => setIsWizardOpen(true),
      gradient: "from-blue-700 via-jio-blue to-jio-dark",
      tag: "12 Oy Rasmiy Kafolat",
    },
    {
      badge: "B2B Korporativ Mijozlar Uchun",
      title: "QQSli Narxlar va Didox Avtomatizatsiyasi",
      description: "Yuridik shaxslar uchun elektron shartnomalar, Didox orqali schyot-faktura va 1C ombor zaxirasini to'g'ridan-to'g'ri sinxronlash.",
      buttonText: "B2B Portalga O'tish",
      action: () => setIsB2BPortalOpen(true),
      gradient: "from-slate-900 via-indigo-950 to-blue-900",
      tag: "QQS 12% | Didox Ready",
    },
    {
      badge: "Moslik Dvigateli (Compatibility Engine)",
      title: "Hech Qachon Noto'g'ri Kartrij Xarid Qilmaysiz",
      description: "Printerning modelini tanlang, tizim avtomatik ravishda unga 100% mos keluvchi original toner va siyohlarni topib beradi.",
      buttonText: "Printeringizni Toping",
      action: () => setIsWizardOpen(true),
      gradient: "from-cyan-900 via-sky-800 to-jio-blue",
      tag: "100% Moslik Kafolati",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-md sm:shadow-lg border border-gray-100">
      {/* Slide Item */}
      <div 
        className={`relative w-full min-h-[250px] sm:min-h-[340px] md:min-h-[440px] bg-gradient-to-r ${slides[currentSlide].gradient} flex items-center p-4 sm:p-8 md:p-14 text-white transition-all duration-700`}
      >
        <div className="relative z-10 max-w-2xl flex flex-col items-start gap-2.5 sm:gap-4 pr-12 sm:pr-0">
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-white/15 backdrop-blur-md text-[10px] sm:text-xs font-bold tracking-wide uppercase">
            <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-jio-sparkle flex-shrink-0" />
            <span className="truncate">{slides[currentSlide].badge}</span>
          </div>

          <h2 className="text-lg sm:text-3xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tight">
            {slides[currentSlide].title}
          </h2>

          <p className="text-xs sm:text-base lg:text-lg text-white/85 max-w-xl font-normal leading-relaxed line-clamp-2 sm:line-clamp-none">
            {slides[currentSlide].description}
          </p>

          <div className="flex flex-wrap items-center gap-2 sm:gap-4 mt-1 sm:mt-2">
            <button
              onClick={slides[currentSlide].action}
              className="bg-white text-jio-blue hover:bg-gray-100 px-4 sm:px-7 py-2 sm:py-3 rounded-full font-black text-xs sm:text-base flex items-center gap-1.5 sm:gap-2 shadow-lg shadow-black/10 transition-transform active:scale-95"
            >
              <span>{slides[currentSlide].buttonText}</span>
              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>

            <span className="inline-flex items-center gap-1 text-[10px] sm:text-xs font-semibold px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-full bg-black/20 backdrop-blur-sm border border-white/10">
              <ShieldCheck className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-400 flex-shrink-0" />
              <span>{slides[currentSlide].tag}</span>
            </span>
          </div>
        </div>

        {/* Decorative Blurred Jio Circles */}
        <div className="absolute right-0 bottom-0 w-60 sm:w-96 h-60 sm:h-96 bg-jio-sparkle opacity-25 rounded-full blur-3xl pointer-events-none translate-x-1/4 translate-y-1/4" />
        <div className="absolute right-1/4 top-0 w-48 sm:w-64 h-48 sm:h-64 bg-white opacity-10 rounded-full blur-2xl pointer-events-none" />

        {/* Slide Controls */}
        <div className="absolute bottom-3 right-3 sm:bottom-6 sm:right-6 flex items-center gap-1.5 sm:gap-2 z-20">
          <button 
            onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
            className="w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md flex items-center justify-center text-white transition active:scale-95"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
          <div className="flex gap-1.5 px-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`h-2 rounded-full transition-all ${
                  currentSlide === i ? 'w-6 bg-white' : 'w-2 bg-white/40'
                }`}
              />
            ))}
          </div>
          <button 
            onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
            className="w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md flex items-center justify-center text-white transition"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
