'use client';

import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { Product, ProductType, OrderStatus } from '../../types';
import { PRODUCT_IMAGES } from '../../data/productImages';
import { 
  ShieldCheck, 
  Lock, 
  Package, 
  ShoppingCart, 
  Plus, 
  Trash2, 
  Edit3, 
  Save, 
  X, 
  LogOut, 
  ArrowLeft, 
  DollarSign, 
  Layers, 
  CheckCircle2, 
  Clock, 
  Truck, 
  RefreshCw,
  Search
} from 'lucide-react';
import Link from 'next/link';

export default function AdminPage() {
  const { 
    products, 
    addProduct, 
    updateProduct, 
    deleteProduct, 
    resetProductsToDefault,
    orders, 
    updateOrderStatus,
    isAdmin, 
    adminCredentials,
    updateAdminCredentials,
    resetAdminCredentials,
    adminLogin, 
    adminLogout 
  } = useCart();

  // Login form state (pre-filled with current active credentials)
  const [loginInput, setLoginInput] = useState(adminCredentials.username);
  const [passwordInput, setPasswordInput] = useState(adminCredentials.password);

  // Active Tab
  const [activeTab, setActiveTab] = useState<'products' | 'orders' | 'add' | 'settings'>('products');

  // Change Credentials form state
  const [newLoginInput, setNewLoginInput] = useState(adminCredentials.username);
  const [newPasswordInput, setNewPasswordInput] = useState('');
  const [confirmPasswordInput, setConfirmPasswordInput] = useState('');

  // Search filter
  const [searchQuery, setSearchQuery] = useState('');

  // Editing state for products
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editPrice, setEditPrice] = useState<number>(0);
  const [editB2BPrice, setEditB2BPrice] = useState<number>(0);
  const [editStock, setEditStock] = useState<number>(0);

  // New Product Form state
  const [newProdName, setNewProdName] = useState('');
  const [newProdSku, setNewProdSku] = useState('');
  const [newProdBrand, setNewProdBrand] = useState('HP');
  const [newProdType, setNewProdType] = useState<ProductType>('PRINTER');
  const [newProdRetailPrice, setNewProdRetailPrice] = useState(2500000);
  const [newProdB2BPrice, setNewProdB2BPrice] = useState(2800000);
  const [newProdStock, setNewProdStock] = useState(20);
  const [newProdCompatible, setNewProdCompatible] = useState('');
  const [newProdImageKey, setNewProdImageKey] = useState<keyof typeof PRODUCT_IMAGES>('hpM15w');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    adminLogin(loginInput, passwordInput);
  };

  const handleStartEdit = (p: Product) => {
    setEditingId(p.id);
    setEditPrice(p.retailPrice);
    setEditB2BPrice(p.b2bPrice);
    setEditStock(p.stock);
  };

  const handleSaveEdit = (id: string) => {
    updateProduct(id, {
      retailPrice: editPrice,
      b2bPrice: editB2BPrice,
      stock: editStock,
    });
    setEditingId(null);
  };

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProdName.trim() || !newProdSku.trim()) {
      alert("Iltimos, mahsulot nomi va SKU kodini kiriting!");
      return;
    }

    const created: Product = {
      id: `prod-custom-${Date.now()}`,
      sku: newProdSku.trim().toUpperCase(),
      slug: newProdName.trim().toLowerCase().replace(/\s+/g, '-'),
      name: newProdName.trim(),
      type: newProdType,
      brand: newProdBrand,
      categorySlug: newProdType === 'PRINTER' ? 'printers' : newProdType === 'CONSUMABLE' ? 'consumables' : 'plotters',
      categoryName: newProdType === 'PRINTER' ? 'Lazerli / Siyohli Printer' : newProdType === 'CONSUMABLE' ? 'Kartrij va Sarf Materiali' : 'Plotter',
      retailPrice: Number(newProdRetailPrice),
      b2bPrice: Number(newProdB2BPrice),
      length: 30,
      width: 25,
      height: 18,
      weight: newProdType === 'CONSUMABLE' ? 0.6 : 4.5,
      warranty: 12,
      stock: Number(newProdStock),
      image: PRODUCT_IMAGES[newProdImageKey],
      specs: {
        technology: newProdType === 'PRINTER' ? 'Lazerli yuqori tezlikdagi bosma' : 'Original toner',
        speed: '20 varaq/daqiqagacha',
        resolution: '1200 x 1200 dpi',
      },
      compatibleSkus: newProdCompatible ? newProdCompatible.split(',').map((s) => s.trim().toUpperCase()) : [],
      badge: 'Yangi qo\'shildi',
    };

    addProduct(created);
    setNewProdName('');
    setNewProdSku('');
    setNewProdCompatible('');
    setActiveTab('products');
  };

  // Filtered products list
  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.brand.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Totals
  const totalStock = products.reduce((acc, p) => acc + p.stock, 0);
  const totalRevenue = orders.reduce((acc, o) => acc + o.totalAmount, 0);

  // If NOT Logged In, Render Secure Admin Login Card
  if (!isAdmin) {
    return (
      <div className="min-h-[75vh] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 shadow-2xl border border-gray-100">
          
          <div className="text-center space-y-2 mb-6">
            <div className="w-14 h-14 rounded-2xl bg-jio-blue text-white flex items-center justify-center mx-auto shadow-lg shadow-blue-900/20">
              <Lock className="w-7 h-7" />
            </div>
            <h2 className="text-2xl font-black text-gray-900 tracking-tight">
              Toxa Print Admin Boshqaruv
            </h2>
            <p className="text-xs text-gray-500">
              Mahsulotlar, narxlar, ombor va buyurtmalarni to'liq boshqarish paneli
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Admin Login:
              </label>
              <input
                type="text"
                required
                placeholder="admin"
                value={loginInput}
                onChange={(e) => setLoginInput(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm font-semibold focus:border-jio-blue focus:bg-white focus:outline-none transition"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Parol:
              </label>
              <input
                type="password"
                required
                placeholder="admin123"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm font-semibold focus:border-jio-blue focus:bg-white focus:outline-none transition"
              />
            </div>

            {/* Hint Box for User */}
            <div className="p-3 bg-blue-50 border border-blue-100 rounded-xl text-[11px] text-jio-blue space-y-1">
              <p className="font-bold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> Joriy Admin Kirish Ma'lumotlari:
              </p>
              <p>• Login: <strong>{adminCredentials.username}</strong></p>
              <p>• Parol: <strong>{adminCredentials.password}</strong></p>
            </div>

            {/* Fast 1-Click Login Button */}
            <button
              type="button"
              onClick={() => adminLogin(adminCredentials.username, adminCredentials.password)}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3.5 rounded-xl font-black text-sm transition shadow-md flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-4 h-4" /> 1-Klikda Tezkor Kirish ({adminCredentials.username})
            </button>

            <button
              type="submit"
              className="w-full bg-jio-blue hover:bg-jio-dark text-white py-3.5 rounded-xl font-black text-sm transition shadow-lg shadow-blue-900/10"
            >
              Tizimga Kirish
            </button>

            <div className="text-center pt-2">
              <Link href="/" className="text-xs font-bold text-gray-500 hover:text-jio-blue transition flex items-center justify-center gap-1">
                <ArrowLeft className="w-3.5 h-3.5" /> Asosiy Do'konga Qaytish
              </Link>
            </div>
          </form>

        </div>
      </div>
    );
  }

  // LOGGED IN ADMIN DASHBOARD
  return (
    <div className="py-6 space-y-8">
      
      {/* Top Admin Header Bar */}
      <div className="bg-white p-5 md:p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
              Admin Rejimi Faol
            </span>
            <span className="text-xs text-gray-400">Super Administrator</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight mt-1">
            Boshqaruv Paneli (Admin Dashboard)
          </h2>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="text-xs font-bold bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2.5 rounded-xl flex items-center gap-1.5 transition"
          >
            <ArrowLeft className="w-4 h-4" /> Do'kon Sahifasi
          </Link>
          <button
            onClick={adminLogout}
            className="text-xs font-bold bg-rose-50 hover:bg-rose-100 text-rose-600 px-4 py-2.5 rounded-xl flex items-center gap-1.5 transition"
          >
            <LogOut className="w-4 h-4" /> Chiqish
          </button>
        </div>
      </div>

      {/* Analytics KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs space-y-1">
          <span className="text-xs font-bold text-gray-400 block">Jami Mahsulotlar</span>
          <span className="text-2xl font-black text-gray-900">{products.length} ta</span>
          <span className="text-[11px] text-emerald-600 font-semibold block">Katalogda faol</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs space-y-1">
          <span className="text-xs font-bold text-gray-400 block">Jami Ombor Zaxirasi</span>
          <span className="text-2xl font-black text-jio-blue">{totalStock} dona</span>
          <span className="text-[11px] text-gray-400 font-semibold block">Yetarli darajada</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs space-y-1">
          <span className="text-xs font-bold text-gray-400 block">Buyurtmalar</span>
          <span className="text-2xl font-black text-purple-700">{orders.length} ta</span>
          <span className="text-[11px] text-purple-600 font-semibold block">14 hududdan</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs space-y-1">
          <span className="text-xs font-bold text-gray-400 block">Jami Tushum</span>
          <span className="text-2xl font-black text-emerald-600">{totalRevenue.toLocaleString('uz-UZ')} so'm</span>
          <span className="text-[11px] text-emerald-700 font-semibold block">Sotuvlar hajmi</span>
        </div>
      </div>

      {/* Tabs Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-200 pb-2">
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('products')}
            className={`px-5 py-2.5 rounded-2xl font-black text-xs md:text-sm transition flex items-center gap-2 ${
              activeTab === 'products'
                ? 'bg-jio-blue text-white shadow-md'
                : 'bg-white hover:bg-gray-50 text-gray-700 border border-gray-200'
            }`}
          >
            <Package className="w-4 h-4" /> Mahsulotlar ({products.length})
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`px-5 py-2.5 rounded-2xl font-black text-xs md:text-sm transition flex items-center gap-2 ${
              activeTab === 'orders'
                ? 'bg-jio-blue text-white shadow-md'
                : 'bg-white hover:bg-gray-50 text-gray-700 border border-gray-200'
            }`}
          >
            <ShoppingCart className="w-4 h-4" /> Buyurtmalar ({orders.length})
          </button>

          <button
            onClick={() => setActiveTab('add')}
            className={`px-5 py-2.5 rounded-2xl font-black text-xs md:text-sm transition flex items-center gap-2 ${
              activeTab === 'add'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200'
            }`}
          >
            <Plus className="w-4 h-4" /> + Yangi Mahsulot
          </button>

          <button
            onClick={() => {
              setActiveTab('settings');
              setNewLoginInput(adminCredentials.username);
              setNewPasswordInput('');
              setConfirmPasswordInput('');
            }}
            className={`px-5 py-2.5 rounded-2xl font-black text-xs md:text-sm transition flex items-center gap-2 ${
              activeTab === 'settings'
                ? 'bg-purple-700 text-white shadow-md'
                : 'bg-purple-50 hover:bg-purple-100 text-purple-900 border border-purple-200'
            }`}
          >
            <ShieldCheck className="w-4 h-4" /> 🔐 Xavfsizlik & Parol
          </button>
        </div>

        {activeTab === 'products' && (
          <div className="flex items-center gap-2">
            <button
              onClick={resetProductsToDefault}
              className="text-[11px] font-bold text-gray-500 hover:text-gray-800 flex items-center gap-1 border border-gray-200 px-3 py-1.5 rounded-xl bg-white"
              title="Barcha mahsulotlarni zavod holatiga qaytarish"
            >
              <RefreshCw className="w-3 h-3" /> Standart holatga qaytarish
            </button>
          </div>
        )}
      </div>

      {/* TAB 1: PRODUCTS LIST & INLINE EDITING */}
      {activeTab === 'products' && (
        <div className="space-y-4">
          
          {/* Search bar */}
          <div className="max-w-md relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Mahsulot nomi, SKU yoki brend bo'yicha saralash..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 text-xs font-semibold focus:border-jio-blue focus:outline-none"
            />
          </div>

          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-gray-50 text-gray-500 font-bold border-b border-gray-100">
                  <tr>
                    <th className="p-4">Rasm & Nomi</th>
                    <th className="p-4">SKU / Brend</th>
                    <th className="p-4">Chakana Narx (B2C)</th>
                    <th className="p-4">Ulgurji Narx (B2B QQS)</th>
                    <th className="p-4 text-center">Ombor Qoldig'i</th>
                    <th className="p-4 text-right">Amallar</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredProducts.map((p) => {
                    const isEditing = editingId === p.id;

                    return (
                      <tr key={p.id} className="hover:bg-gray-50/60 transition">
                        {/* Name & Img */}
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={p.image}
                              alt={p.name}
                              className="w-12 h-12 object-contain rounded-xl bg-gray-50 p-1 border border-gray-100"
                            />
                            <div>
                              <span className="font-black text-gray-900 block leading-tight">
                                {p.name}
                              </span>
                              <span className="text-[10px] text-gray-400">
                                {p.categoryName}
                              </span>
                            </div>
                          </div>
                        </td>

                        {/* SKU / Brand */}
                        <td className="p-4">
                          <span className="font-mono font-bold text-gray-800 block">{p.sku}</span>
                          <span className="text-[10px] font-bold text-jio-blue bg-blue-50 px-2 py-0.5 rounded-full inline-block mt-0.5">
                            {p.brand}
                          </span>
                        </td>

                        {/* Retail Price */}
                        <td className="p-4">
                          {isEditing ? (
                            <input
                              type="number"
                              value={editPrice}
                              onChange={(e) => setEditPrice(Number(e.target.value))}
                              className="w-32 bg-white border border-jio-blue rounded-lg px-2 py-1 text-xs font-bold"
                            />
                          ) : (
                            <span className="font-black text-gray-900">
                              {p.retailPrice.toLocaleString('uz-UZ')} so'm
                            </span>
                          )}
                        </td>

                        {/* B2B Price */}
                        <td className="p-4">
                          {isEditing ? (
                            <input
                              type="number"
                              value={editB2BPrice}
                              onChange={(e) => setEditB2BPrice(Number(e.target.value))}
                              className="w-32 bg-white border border-amber-500 rounded-lg px-2 py-1 text-xs font-bold"
                            />
                          ) : (
                            <span className="font-black text-amber-700">
                              {p.b2bPrice.toLocaleString('uz-UZ')} so'm
                            </span>
                          )}
                        </td>

                        {/* Stock */}
                        <td className="p-4 text-center">
                          {isEditing ? (
                            <input
                              type="number"
                              value={editStock}
                              onChange={(e) => setEditStock(Number(e.target.value))}
                              className="w-20 bg-white border border-emerald-500 rounded-lg px-2 py-1 text-xs font-bold text-center"
                            />
                          ) : (
                            <span className="font-bold px-2.5 py-1 rounded-full text-xs bg-emerald-50 text-emerald-800">
                              {p.stock} ta
                            </span>
                          )}
                        </td>

                        {/* Actions */}
                        <td className="p-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            {isEditing ? (
                              <>
                                <button
                                  onClick={() => handleSaveEdit(p.id)}
                                  className="bg-emerald-600 hover:bg-emerald-700 text-white p-2 rounded-xl transition"
                                  title="Saqlash"
                                >
                                  <Save className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={() => setEditingId(null)}
                                  className="bg-gray-200 hover:bg-gray-300 text-gray-700 p-2 rounded-xl transition"
                                  title="Bekor qilish"
                                >
                                  <X className="w-3.5 h-3.5" />
                                </button>
                              </>
                            ) : (
                              <>
                                <button
                                  onClick={() => handleStartEdit(p)}
                                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 p-2 rounded-xl transition"
                                  title="Narx va omborni tahrirlash"
                                >
                                  <Edit3 className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={() => {
                                    if (confirm(`Rostdan ham "${p.name}" mahsulotini o'chirmoqchimisiz?`)) {
                                      deleteProduct(p.id);
                                    }
                                  }}
                                  className="bg-rose-50 hover:bg-rose-100 text-rose-600 p-2 rounded-xl transition"
                                  title="O'chirish"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: ORDERS MANAGEMENT */}
      {activeTab === 'orders' && (
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
          {orders.length === 0 ? (
            <div className="p-12 text-center text-gray-400 text-xs">
              Hozircha hech qanday buyurtma kelib tushmagan. Saytdan yangi xarid amalga oshirilganda bu yerda paydo bo'ladi.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-gray-50 text-gray-500 font-bold border-b border-gray-100">
                  <tr>
                    <th className="p-4">Kodi</th>
                    <th className="p-4">Mijoz / Telefon</th>
                    <th className="p-4">Hudud & Manzil</th>
                    <th className="p-4">To'lov Turi</th>
                    <th className="p-4">Jami Summa</th>
                    <th className="p-4">Holat (Status)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {orders.map((ord) => (
                    <tr key={ord.id} className="hover:bg-gray-50/60 transition">
                      <td className="p-4 font-black text-jio-blue font-mono text-sm">
                        {ord.code}
                      </td>

                      <td className="p-4">
                        <span className="font-bold text-gray-900 block">{ord.recipientName}</span>
                        <span className="text-[11px] text-gray-400">{ord.phone}</span>
                      </td>

                      <td className="p-4">
                        <span className="font-bold text-gray-800 block">{ord.region}</span>
                        <span className="text-[11px] text-gray-500 truncate max-w-xs block">{ord.addressLine}</span>
                      </td>

                      <td className="p-4">
                        <span className="font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-md">
                          {ord.paymentMethod}
                        </span>
                      </td>

                      <td className="p-4 font-black text-gray-900">
                        {ord.totalAmount.toLocaleString('uz-UZ')} so'm
                      </td>

                      <td className="p-4">
                        <select
                          value={ord.orderStatus}
                          onChange={(e) => updateOrderStatus(ord.code, e.target.value as OrderStatus)}
                          className="bg-gray-50 border border-gray-200 rounded-xl px-3 py-1.5 font-bold text-xs focus:border-jio-blue focus:outline-none cursor-pointer"
                        >
                          <option value="NEW">Yangi (NEW)</option>
                          <option value="PAID">To'landi (PAID)</option>
                          <option value="SENT_TO_WAREHOUSE">Omborda yig'ilmoqda</option>
                          <option value="PACKAGED">Qadoqlandi</option>
                          <option value="COURIER_HANDED">Kuryerga berildi</option>
                          <option value="DELIVERED">Yetkazildi (DELIVERED)</option>
                          <option value="CANCELED">Bekor qilindi</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: ADD NEW PRODUCT FORM */}
      {activeTab === 'add' && (
        <div className="max-w-2xl bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-sm">
          <h3 className="text-xl font-black text-gray-900 mb-4">
            Katalogga Yangi Mahsulot Qo'shish
          </h3>

          <form onSubmit={handleCreateProduct} className="space-y-4 text-xs md:text-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-gray-700 mb-1">
                  Mahsulot Nomi *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Masalan: Canon i-SENSYS LBP6030B"
                  value={newProdName}
                  onChange={(e) => setNewProdName(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 focus:border-jio-blue focus:bg-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">
                  SKU (Model kodi) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="CANON-LBP-6030"
                  value={newProdSku}
                  onChange={(e) => setNewProdSku(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 focus:border-jio-blue focus:bg-white focus:outline-none uppercase"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block font-bold text-gray-700 mb-1">Brend</label>
                <select
                  value={newProdBrand}
                  onChange={(e) => setNewProdBrand(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 font-bold cursor-pointer"
                >
                  <option value="HP">HP</option>
                  <option value="Epson">Epson</option>
                  <option value="Canon">Canon</option>
                  <option value="Brother">Brother</option>
                  <option value="Xerox">Xerox</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Turi</label>
                <select
                  value={newProdType}
                  onChange={(e) => setNewProdType(e.target.value as ProductType)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 font-bold cursor-pointer"
                >
                  <option value="PRINTER">Printer / MFP</option>
                  <option value="CONSUMABLE">Kartrij / Siyoh</option>
                  <option value="PLOTTER">Plotter</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Ombordagi Son</label>
                <input
                  type="number"
                  value={newProdStock}
                  onChange={(e) => setNewProdStock(Number(e.target.value))}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 font-bold"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-gray-700 mb-1">
                  Chakana Narxi (so'm) *
                </label>
                <input
                  type="number"
                  required
                  value={newProdRetailPrice}
                  onChange={(e) => setNewProdRetailPrice(Number(e.target.value))}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 font-bold text-jio-blue"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">
                  B2B Ulgurji Narxi (so'm QQS bilan) *
                </label>
                <input
                  type="number"
                  required
                  value={newProdB2BPrice}
                  onChange={(e) => setNewProdB2BPrice(Number(e.target.value))}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 font-bold text-amber-700"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-gray-700 mb-1">
                Mos Keluvchi Kartrij SKU (vergul bilan):
              </label>
              <input
                type="text"
                placeholder="CANON-725, HP-85A"
                value={newProdCompatible}
                onChange={(e) => setNewProdCompatible(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 focus:border-jio-blue focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-gray-700 mb-1">
                Vektorli Rasm Shabloni:
              </label>
              <select
                value={newProdImageKey}
                onChange={(e) => setNewProdImageKey(e.target.value as any)}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 font-bold cursor-pointer"
              >
                <option value="hpM15w">Lazerli Printer Shabloni (HP M15w)</option>
                <option value="epsonL3250">Siyohli CISS MFP Shabloni (Epson EcoTank)</option>
                <option value="canonG2420">MegaTank CISS Shabloni (Canon G2420)</option>
                <option value="hpT650">Katta Formatli Plotter Shabloni (HP T650)</option>
                <option value="hpM428dw">Korporativ Dupleks MFP (HP M428dw)</option>
                <option value="hp44a">Lazer Toner Kartrij Shabloni (HP 44A)</option>
                <option value="epson103">4 Rangli Siyoh Baklari (Epson 103)</option>
                <option value="canonGi41">MegaTank Siyoh To'plami (Canon GI-41)</option>
                <option value="hp712">Plotter Kartrijlar To'plami (HP 712)</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3.5 rounded-2xl font-black text-sm flex items-center justify-center gap-2 transition shadow-md shadow-emerald-900/10 mt-4"
            >
              <Plus className="w-4 h-4" /> Mahsulotni Katalogga Qo'shish
            </button>
          </form>
        </div>
      )}

      {/* TAB 4: SECURITY & CREDENTIALS UPDATE */}
      {activeTab === 'settings' && (
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-sm space-y-6 max-w-2xl">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <h3 className="text-xl font-black text-gray-900 flex items-center gap-2">
                <ShieldCheck className="w-6 h-6 text-purple-700" />
                Admin Login va Parolni Yangilash
              </h3>
              <p className="text-xs text-gray-500">
                Ushbu bo'lim orqali administrator tizimiga kirish login va maxfiy parolini o'zingiz istagandek o'zgartirishingiz mumkin.
              </p>
            </div>
          </div>

          {/* Current credentials status box */}
          <div className="p-4 bg-purple-50/70 border border-purple-100 rounded-2xl flex flex-wrap items-center justify-between gap-3">
            <div>
              <span className="text-[11px] font-bold text-purple-600 block">Joriy Faol Login:</span>
              <span className="text-base font-black text-purple-950 font-mono">{adminCredentials.username}</span>
            </div>
            <div>
              <span className="text-[11px] font-bold text-purple-600 block">Joriy Parol:</span>
              <span className="text-base font-black text-purple-950 font-mono">{adminCredentials.password}</span>
            </div>
            <button
              type="button"
              onClick={resetAdminCredentials}
              className="text-xs font-bold bg-white text-gray-700 hover:text-purple-700 px-3 py-1.5 rounded-xl border border-purple-200 shadow-xs flex items-center gap-1 transition cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Standartga Qaytarish (admin/admin123)
            </button>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (newPasswordInput !== confirmPasswordInput) {
                alert("Yangi kiritilgan parollar bir-biriga mos kelmadi! Iltimos, tekshirib qayta kiriting.");
                return;
              }
              const success = updateAdminCredentials(newLoginInput, newPasswordInput);
              if (success) {
                setNewPasswordInput('');
                setConfirmPasswordInput('');
              }
            }}
            className="space-y-4"
          >
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5">
                Yangi Admin Login:
              </label>
              <input
                type="text"
                required
                placeholder="Masalan: toirbek yoki toxa_market"
                value={newLoginInput}
                onChange={(e) => setNewLoginInput(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm font-semibold focus:border-purple-600 focus:bg-white focus:outline-none transition"
              />
              <span className="text-[11px] text-gray-400 mt-1 block">Kamida 3 ta harf yoki raqam</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  Yangi Maxfiy Parol:
                </label>
                <input
                  type="password"
                  required
                  placeholder="Yangi parol kiriting"
                  value={newPasswordInput}
                  onChange={(e) => setNewPasswordInput(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm font-semibold focus:border-purple-600 focus:bg-white focus:outline-none transition"
                />
                <span className="text-[11px] text-gray-400 mt-1 block">Kamida 4 ta belgi</span>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  Yangi Parolni Tasdiqlang:
                </label>
                <input
                  type="password"
                  required
                  placeholder="Parolni qayta tering"
                  value={confirmPasswordInput}
                  onChange={(e) => setConfirmPasswordInput(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm font-semibold focus:border-purple-600 focus:bg-white focus:outline-none transition"
                />
                <span className="text-[11px] text-gray-400 mt-1 block">Parol bilan bir xil bo'lishi shart</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full bg-purple-700 hover:bg-purple-800 text-white py-3.5 rounded-2xl font-black text-sm flex items-center justify-center gap-2 transition shadow-md shadow-purple-900/10 cursor-pointer"
              >
                <Save className="w-4 h-4" /> Yangi Login va Parolni Saqlash
              </button>
            </div>
          </form>

          {/* Direct Code Update Information */}
          <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200 space-y-2 text-xs text-gray-600">
            <p className="font-bold text-gray-900 flex items-center gap-1.5">
              <Lock className="w-4 h-4 text-gray-700" />
              Doimiy Kod Orqali Ham O'zgartirish Mumkinmi?
            </p>
            <p>
              Ha! Agar login va parolni dastur kodining o'zida ham qotirib qo'ymoqchi bo'lsangiz:
            </p>
            <p className="font-mono bg-white p-2 rounded-lg border border-gray-200 text-[11px] text-gray-800">
              Fayl: src/context/CartContext.tsx &rarr; 220-qator
            </p>
            <p>
              Admin paneldan o'zgartirganingizda esa ma'lumotlar brauzer xotirasiga (localStorage) darhol saqlanadi va qayta kirganingizda yangi login va parol ishlaydi.
            </p>
          </div>
        </div>
      )}

    </div>
  );
}
