'use client';

import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { 
  X, 
  Building2, 
  FileText, 
  CheckCircle2, 
  Download, 
  Send, 
  RefreshCw, 
  ShieldCheck,
  Percent
} from 'lucide-react';

export default function B2BPortalModal() {
  const { isB2BPortalOpen, setIsB2BPortalOpen, isB2BMode, toggleB2BMode, showToast } = useCart();

  const [companyName, setCompanyName] = useState('"TEXNO SERVIS PRO" MCHJ');
  const [inn, setInn] = useState('309845123');
  const [mfo, setMfo] = useState('00448');
  const [account, setAccount] = useState('20208000700123456001');

  if (!isB2BPortalOpen) return null;

  const handleSendToDidox = () => {
    showToast(`Didox orqali ${companyName} nomiga elektron hisob-faktura yuborildi!`, 'success');
  };

  const handleSync1C = () => {
    showToast("1C:Korxona bazasi bilan sinxronizatsiya qilindi: Ombor qoldiqlari va narxlar yangilandi.", 'info');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-3xl w-full p-6 md:p-8 shadow-2xl relative border border-gray-100 max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={() => setIsB2BPortalOpen(false)}
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-700">
            <Building2 className="w-4 h-4" />
          </div>
          <span className="text-xs font-black text-purple-700 uppercase tracking-wider">
            Didox & 1C Korporativ Portal
          </span>
        </div>

        <h3 className="text-2xl font-black text-gray-900 tracking-tight">
          B2B Hamkorlik va Elektron Hujjat Aylanishi
        </h3>
        <p className="text-xs text-gray-500 mb-6">
          Yuridik shaxslar uchun 12% QQS bilan hisob-faktura, 1C ombor integratsiyasi va maxsus ulgurji narxlar
        </p>

        {/* Quick B2B Toggle Action */}
        <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl flex items-center justify-between gap-4 mb-6">
          <div>
            <span className="font-bold text-amber-900 text-xs md:text-sm block">
              B2B QQSli Rejim Holati: {isB2BMode ? 'Faol (Yoniq)' : 'O\'chiq'}
            </span>
            <span className="text-[11px] text-amber-700">
              Ushbu rejim yoqilganda barcha katalogdagi mahsulotlar 12% QQS bilan ko'rsatiladi.
            </span>
          </div>

          <button
            onClick={toggleB2BMode}
            className={`px-4 py-2 rounded-xl text-xs font-black transition shadow-sm ${
              isB2BMode
                ? 'bg-amber-600 text-white hover:bg-amber-700'
                : 'bg-white text-gray-800 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            {isB2BMode ? 'Rejimni O\'chirish' : 'B2B Rejimni Yoqish'}
          </button>
        </div>

        {/* Didox Electronic Invoice Preview */}
        <div className="border border-gray-200 rounded-2xl p-5 bg-gray-50/50 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-gray-200">
            <span className="text-xs font-black text-gray-900 flex items-center gap-1.5 uppercase">
              <FileText className="w-4 h-4 text-purple-700" />
              Didox Elektron Hisob-Faktura Namunasi (SF-2026/048)
            </span>
            <span className="text-[10px] font-bold bg-purple-100 text-purple-800 px-2.5 py-0.5 rounded-full">
              QQS 12%
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            {/* Sotuvchi */}
            <div className="p-3 bg-white rounded-xl border border-gray-200 space-y-1">
              <span className="text-[10px] font-bold text-gray-400 uppercase">Sotuvchi (Yetkazib beruvchi):</span>
              <p className="font-black text-gray-900">"TOXA PRINT MARKET" MCHJ</p>
              <p className="text-gray-500">INN: 309876543 • MFO: 00448</p>
              <p className="text-gray-500">H/r: 20208000500123987001</p>
            </div>

            {/* Xaridor */}
            <div className="p-3 bg-white rounded-xl border border-gray-200 space-y-1">
              <span className="text-[10px] font-bold text-gray-400 uppercase">Xaridor (Yuridik shaxs):</span>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full font-black text-gray-900 text-xs border-b border-gray-200 focus:outline-none"
              />
              <p className="text-gray-500">INN: {inn} • MFO: {mfo}</p>
              <p className="text-gray-500">H/r: {account}</p>
            </div>
          </div>

          {/* Sample Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs bg-white rounded-xl overflow-hidden border border-gray-200">
              <thead className="bg-gray-100 font-bold text-gray-700 text-[11px]">
                <tr>
                  <th className="p-2.5">Tovar Nomi</th>
                  <th className="p-2.5 text-center">Miqdori</th>
                  <th className="p-2.5 text-right">QQS-siz narx</th>
                  <th className="p-2.5 text-right">QQS (12%)</th>
                  <th className="p-2.5 text-right">Jami summa</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr>
                  <td className="p-2.5 font-bold">HP LaserJet Pro M428dw</td>
                  <td className="p-2.5 text-center">1 dona</td>
                  <td className="p-2.5 text-right">5 600 000 so'm</td>
                  <td className="p-2.5 text-right">672 000 so'm</td>
                  <td className="p-2.5 text-right font-black">6 272 000 so'm</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold">HP 59A Original Toner (CF259A)</td>
                  <td className="p-2.5 text-center">2 dona</td>
                  <td className="p-2.5 text-right">2 200 000 so'm</td>
                  <td className="p-2.5 text-right">264 000 so'm</td>
                  <td className="p-2.5 text-right font-black">2 464 000 so'm</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <button
              onClick={handleSync1C}
              className="text-xs font-bold text-gray-700 bg-gray-100 hover:bg-gray-200 px-4 py-2.5 rounded-xl flex items-center gap-1.5 transition"
            >
              <RefreshCw className="w-3.5 h-3.5" /> 1C Bilan Sinxronlash
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={() => alert("Elektron schyot-faktura PDF formati yuklab olindi!")}
                className="text-xs font-bold text-gray-700 bg-gray-100 hover:bg-gray-200 px-4 py-2.5 rounded-xl flex items-center gap-1.5 transition"
              >
                <Download className="w-3.5 h-3.5" /> PDF
              </button>
              <button
                onClick={handleSendToDidox}
                className="text-xs font-black bg-purple-700 hover:bg-purple-800 text-white px-5 py-2.5 rounded-xl flex items-center gap-1.5 transition shadow-sm"
              >
                <Send className="w-3.5 h-3.5" /> Didox Orqali Yuborish
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
