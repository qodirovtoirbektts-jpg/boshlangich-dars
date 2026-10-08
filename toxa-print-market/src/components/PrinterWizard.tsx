'use client';

import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { INITIAL_PRODUCTS } from '../data/products';
import { 
  Sparkles, 
  X, 
  Home, 
  Building, 
  Camera, 
  CheckCircle, 
  FileText, 
  Palette, 
  Layers, 
  ArrowRight, 
  ShoppingCart,
  ChevronLeft,
  ShieldCheck
} from 'lucide-react';

export default function PrinterWizard() {
  const { isWizardOpen, setIsWizardOpen, addToCart, setIsCartOpen, isB2BMode } = useCart();

  const [step, setStep] = useState(1);
  const [environment, setEnvironment] = useState<'home' | 'small_office' | 'enterprise' | 'studio'>('home');
  const [colorRequirement, setColorRequirement] = useState<'mono' | 'color' | 'photo' | 'plotter'>('mono');
  const [monthlyVolume, setMonthlyVolume] = useState<'low' | 'medium' | 'high'>('low');

  if (!isWizardOpen) return null;

  // Determination logic
  let recommendedSku = 'HP-LJ-M15W';
  let reason = "Uy va kichik ofis uchun ixcham, tezkor va tejamkor lazerli bosma.";

  if (colorRequirement === 'plotter' || environment === 'studio' && monthlyVolume === 'high') {
    recommendedSku = 'HP-DJ-T650';
    reason = "Arxitektura, SAPR va katta formatli A1 chizmalar uchun eng maqbul plotter.";
  } else if (environment === 'enterprise' || monthlyVolume === 'high') {
    recommendedSku = 'HP-LJ-M428DW';
    reason = "Katta idora uchun avtomatik 2 tomonlama (Dupleks) tezkor lazerli monoxrom MFP.";
  } else if (colorRequirement === 'photo' || colorRequirement === 'color') {
    if (environment === 'studio') {
      recommendedSku = 'CANON-G2420';
      reason = "Fotolaboratoriya va fotosuratlar uchun uzluksiz siyoh tizimli yuqori sifatli CISS printer.";
    } else {
      recommendedSku = 'EPSON-L3250';
      reason = "Rangli grafiklar, hisobotlar va uy/ofis uchun 3-in-1 o'ta tejamkor siyohli MFP.";
    }
  } else {
    recommendedSku = 'HP-LJ-M15W';
    reason = "Standart kundalik hujjatlar, shartnomalar va cheklar uchun ultra-kompakt lazerli printer.";
  }

  const recommendedProduct = INITIAL_PRODUCTS.find((p) => p.sku === recommendedSku) || INITIAL_PRODUCTS[0];
  const matchingConsumable = INITIAL_PRODUCTS.find((p) => recommendedProduct.compatibleSkus.includes(p.sku));

  const handleAddBundle = () => {
    addToCart(recommendedProduct, 1);
    if (matchingConsumable) {
      addToCart(matchingConsumable, 1, true);
    }
    setIsWizardOpen(false);
    setIsCartOpen(true);
  };

  const handleReset = () => {
    setStep(1);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-t-3xl sm:rounded-3xl max-w-2xl w-full p-4 sm:p-6 md:p-8 shadow-2xl relative border border-gray-100 max-h-[90vh] overflow-y-auto pb-safe">
        
        {/* Close Button */}
        <button
          onClick={() => setIsWizardOpen(false)}
          className="absolute top-3.5 right-3.5 sm:top-5 sm:right-5 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 transition z-10"
        >
          <X className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-jio-blue">
            <Sparkles className="w-4 h-4 text-jio-blue animate-spin" />
          </div>
          <span className="text-xs font-black text-jio-blue uppercase tracking-wider">
            Smart Tanlov Yordamchisi (Wizard)
          </span>
        </div>

        <h3 className="text-2xl font-black text-gray-900 tracking-tight">
          Printeringizni 3 klikda aniqlang
        </h3>
        <p className="text-xs md:text-sm text-gray-500 mb-6">
          Ehtiyojingizga mos optimal model va sarf materiallari to'plamini tavsiya qilamiz
        </p>

        {/* Step Progress */}
        <div className="flex items-center gap-2 mb-6">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`h-2 flex-1 rounded-full transition-all duration-300 ${
                step >= s ? 'bg-jio-blue' : 'bg-gray-200'
              }`}
            />
          ))}
        </div>

        {/* STEP 1: Foydalanish joyi */}
        {step === 1 && (
          <div className="space-y-4">
            <h4 className="font-bold text-gray-800 text-sm md:text-base">
              1-qadam: Printerni asosan qayerda ishlatmoqchisiz?
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { id: 'home', title: 'Uy sharoitida', desc: 'O\'qish, darslar va kam hajm', icon: <Home className="w-5 h-5 text-jio-blue" /> },
                { id: 'small_office', title: 'Kichik ofis (1-5 kishi)', desc: 'Kundalik hujjat aylanishi', icon: <Building className="w-5 h-5 text-emerald-600" /> },
                { id: 'enterprise', title: 'Katta korxona / Buxgalteriya', desc: 'Ko\'p yuklamali uzluksiz bosma', icon: <Layers className="w-5 h-5 text-indigo-600" /> },
                { id: 'studio', title: 'Fotostudiya / Muhandislik', desc: 'Yuqori sifatli fotosuratlar / A1 chizmalar', icon: <Camera className="w-5 h-5 text-amber-500" /> },
              ].map((item) => (
                <div
                  key={item.id}
                  onClick={() => setEnvironment(item.id as any)}
                  className={`p-4 rounded-2xl border-2 cursor-pointer transition flex items-start gap-3 ${
                    environment === item.id
                      ? 'border-jio-blue bg-blue-50/50 shadow-sm'
                      : 'border-gray-100 hover:border-gray-300 bg-gray-50/40'
                  }`}
                >
                  <div className="mt-0.5">{item.icon}</div>
                  <div>
                    <h5 className="font-bold text-sm text-gray-900">{item.title}</h5>
                    <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end pt-4">
              <button
                onClick={() => setStep(2)}
                className="bg-jio-blue hover:bg-jio-dark text-white px-6 py-2.5 rounded-full font-bold text-sm flex items-center gap-2 transition"
              >
                Keyingisi <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Chop etish turi */}
        {step === 2 && (
          <div className="space-y-4">
            <h4 className="font-bold text-gray-800 text-sm md:text-base">
              2-qadam: Sizga qanday bosma turi kerak?
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { id: 'mono', title: 'Faqat qora-oq (Monoxrom)', desc: 'Shartnomalar, hisob-kitoblar, hujjatlar', icon: <FileText className="w-5 h-5 text-gray-700" /> },
                { id: 'color', title: 'Rangli hujjatlar va grafiklar', desc: 'Prezentatsiyalar, jadvallar, rangli bosma', icon: <Palette className="w-5 h-5 text-pink-500" /> },
                { id: 'photo', title: 'Yuqori sifatli fotosuratlar', desc: 'Fotokog\'ozda to\'liq rangli fotolar', icon: <Camera className="w-5 h-5 text-rose-500" /> },
                { id: 'plotter', title: 'Katta formatli chizmalar (A1/A0)', desc: 'SAPR, arxitektura va loyihalar', icon: <Layers className="w-5 h-5 text-cyan-600" /> },
              ].map((item) => (
                <div
                  key={item.id}
                  onClick={() => setColorRequirement(item.id as any)}
                  className={`p-4 rounded-2xl border-2 cursor-pointer transition flex items-start gap-3 ${
                    colorRequirement === item.id
                      ? 'border-jio-blue bg-blue-50/50 shadow-sm'
                      : 'border-gray-100 hover:border-gray-300 bg-gray-50/40'
                  }`}
                >
                  <div className="mt-0.5">{item.icon}</div>
                  <div>
                    <h5 className="font-bold text-sm text-gray-900">{item.title}</h5>
                    <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-between pt-4">
              <button
                onClick={() => setStep(1)}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-5 py-2.5 rounded-full font-bold text-sm flex items-center gap-1.5 transition"
              >
                <ChevronLeft className="w-4 h-4" /> Ortga
              </button>
              <button
                onClick={() => setStep(3)}
                className="bg-jio-blue hover:bg-jio-dark text-white px-6 py-2.5 rounded-full font-bold text-sm flex items-center gap-2 transition"
              >
                Keyingisi <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Oylik yuklama */}
        {step === 3 && (
          <div className="space-y-4">
            <h4 className="font-bold text-gray-800 text-sm md:text-base">
              3-qadam: Taxminiy oylik bosma hajmi qancha?
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { id: 'low', title: '500 varaqgacha', desc: 'Haftada bir necha marta' },
                { id: 'medium', title: '500 - 3 000 varaq', desc: 'Har kuni 10-50 varaq' },
                { id: 'high', title: '3 000+ varaq', desc: 'Uzluksiz va jadal foydalanish' },
              ].map((item) => (
                <div
                  key={item.id}
                  onClick={() => setMonthlyVolume(item.id as any)}
                  className={`p-4 rounded-2xl border-2 cursor-pointer transition text-center ${
                    monthlyVolume === item.id
                      ? 'border-jio-blue bg-blue-50/50 shadow-sm'
                      : 'border-gray-100 hover:border-gray-300 bg-gray-50/40'
                  }`}
                >
                  <h5 className="font-bold text-sm text-gray-900">{item.title}</h5>
                  <p className="text-xs text-gray-500 mt-1">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="flex justify-between pt-4">
              <button
                onClick={() => setStep(2)}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-5 py-2.5 rounded-full font-bold text-sm flex items-center gap-1.5 transition"
              >
                <ChevronLeft className="w-4 h-4" /> Ortga
              </button>
              <button
                onClick={() => setStep(4)}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-7 py-2.5 rounded-full font-bold text-sm flex items-center gap-2 transition shadow-md"
              >
                Natijani ko'rish <Sparkles className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: RECOMMENDATION RESULT */}
        {step === 4 && (
          <div className="space-y-5 animate-in zoom-in-95 duration-200">
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-3">
              <CheckCircle className="w-6 h-6 text-emerald-600 flex-shrink-0" />
              <div>
                <span className="text-xs font-bold text-emerald-800 uppercase tracking-wide">
                  Siz uchun 100% ideal tavsiya
                </span>
                <p className="text-xs md:text-sm text-emerald-950 font-medium">
                  {reason}
                </p>
              </div>
            </div>

            {/* Recommended Printer Card */}
            <div className="p-5 border-2 border-jio-blue rounded-3xl bg-white shadow-sm flex flex-col md:flex-row gap-5 items-center">
              <img
                src={recommendedProduct.image}
                alt={recommendedProduct.name}
                className="w-36 h-36 object-contain rounded-2xl bg-gray-50 p-2"
              />
              <div className="flex-1 space-y-2">
                <span className="text-[11px] font-bold text-jio-blue uppercase bg-blue-50 px-2.5 py-1 rounded-full">
                  {recommendedProduct.brand} • {recommendedProduct.categoryName}
                </span>
                <h4 className="text-lg font-black text-gray-900 leading-snug">
                  {recommendedProduct.name}
                </h4>
                <div className="text-xs text-gray-600 space-y-0.5">
                  <p>• Tezlik: {recommendedProduct.specs.speed}</p>
                  <p>• Ulanish: {recommendedProduct.specs.connectivity}</p>
                </div>
                <div className="pt-1 flex items-baseline gap-2">
                  <span className="text-xl font-black text-jio-blue">
                    {(isB2BMode ? recommendedProduct.b2bPrice : recommendedProduct.retailPrice).toLocaleString('uz-UZ')} so'm
                  </span>
                  {isB2BMode && <span className="text-[11px] text-amber-600 font-bold">(QQS bilan)</span>}
                </div>
              </div>
            </div>

            {/* Matching Consumable Bundle Proposal */}
            {matchingConsumable && (
              <div className="p-4 bg-amber-50/60 border border-amber-200 rounded-2xl flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <img
                    src={matchingConsumable.image}
                    alt={matchingConsumable.name}
                    className="w-12 h-12 object-contain rounded-lg bg-white p-1"
                  />
                  <div>
                    <span className="text-[10px] font-bold text-amber-700 uppercase">
                      Mos keluvchi original kartrij:
                    </span>
                    <p className="text-xs font-bold text-gray-900 line-clamp-1">
                      {matchingConsumable.name}
                    </p>
                    <span className="text-xs font-extrabold text-amber-900">
                      {(isB2BMode ? matchingConsumable.b2bPrice : matchingConsumable.retailPrice).toLocaleString('uz-UZ')} so'm
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-bold bg-amber-200 text-amber-800 px-2 py-0.5 rounded-full">
                    Bundle: -10% chegirma
                  </span>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
              <button
                onClick={handleReset}
                className="w-full sm:w-auto text-xs font-bold text-gray-500 hover:text-gray-800 py-2"
              >
                Qayta boshlash
              </button>

              <div className="flex w-full sm:w-auto items-center gap-2">
                <button
                  onClick={() => {
                    addToCart(recommendedProduct, 1);
                    setIsWizardOpen(false);
                  }}
                  className="flex-1 sm:flex-none bg-gray-100 hover:bg-gray-200 text-gray-800 px-5 py-3 rounded-full font-bold text-xs md:text-sm transition"
                >
                  Faqat printerni olish
                </button>
                <button
                  onClick={handleAddBundle}
                  className="flex-1 sm:flex-none bg-jio-blue hover:bg-jio-dark text-white px-6 py-3 rounded-full font-black text-xs md:text-sm flex items-center justify-center gap-2 shadow-lg shadow-blue-900/10 transition"
                >
                  <ShoppingCart className="w-4 h-4" />
                  To'plamni (Bundle) Savatga Qo'shish
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
