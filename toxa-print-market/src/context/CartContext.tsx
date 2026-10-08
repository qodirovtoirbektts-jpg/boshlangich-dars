'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, Order, User, PaymentMethod, B2BProfile, OrderStatus } from '../types';
import { UZBEKISTAN_REGIONS } from '../config/regions';
import { INITIAL_PRODUCTS } from '../data/products';
import { SiteSettings, DEFAULT_SITE_SETTINGS } from '../data/siteSettings';

interface ShippingCalculation {
  shippingCost: number;
  physicalWeight: number;
  volumetricWeight: number;
  billableWeight: number;
  deliveryDays: number;
}

interface ToastInfo {
  message: string;
  type: 'success' | 'warning' | 'info';
}

interface CartContextType {
  // Products Management (Live CRUD)
  products: Product[];
  addProduct: (product: Product) => void;
  updateProduct: (id: string, updated: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  resetProductsToDefault: () => void;

  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, isBundle?: boolean) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  
  isB2BMode: boolean;
  toggleB2BMode: () => void;
  
  // Modals
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  isAuthOpen: boolean;
  setIsAuthOpen: (open: boolean) => void;
  isWizardOpen: boolean;
  setIsWizardOpen: (open: boolean) => void;
  isTrackingOpen: boolean;
  setIsTrackingOpen: (open: boolean) => void;
  isB2BPortalOpen: boolean;
  setIsB2BPortalOpen: (open: boolean) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
  
  activeOrderCode: string | null;
  setActiveOrderCode: (code: string | null) => void;

  user: User | null;
  login: (phone: string, role: 'B2C' | 'B2B', b2bProfile?: B2BProfile) => void;
  logout: () => void;

  // Admin state
  isAdmin: boolean;
  adminCredentials: { username: string; password: string };
  updateAdminCredentials: (newLogin: string, newPass: string) => boolean;
  resetAdminCredentials: () => void;
  adminLogin: (loginStr: string, passStr: string) => boolean;
  adminLogout: () => void;
  
  orders: Order[];
  updateOrderStatus: (orderCode: string, newStatus: OrderStatus) => void;
  createOrder: (params: {
    recipientName: string;
    phone: string;
    region: string;
    addressLine: string;
    paymentMethod: PaymentMethod;
    b2bProfile?: B2BProfile;
  }) => Order;
  
  calculateShipping: (regionName: string, items?: CartItem[]) => ShippingCalculation;
  
  toast: ToastInfo | null;
  showToast: (message: string, type?: 'success' | 'warning' | 'info') => void;
  
  // Dynamic Site Settings (Footer, Contacts, B2B Banner)
  siteSettings: SiteSettings;
  updateSiteSettings: (newSettings: Partial<SiteSettings>) => void;
  resetSiteSettings: () => void;

  // Financial totals
  cartSubtotal: number;
  cartTotalWeight: number;
  totalCartItemsCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isB2BMode, setIsB2BMode] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [adminCredentials, setAdminCredentials] = useState<{ username: string; password: string }>({
    username: 'admin',
    password: 'admin123',
  });
  const [siteSettings, setSiteSettings] = useState<SiteSettings>(DEFAULT_SITE_SETTINGS);
  
  // Modals state
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [isTrackingOpen, setIsTrackingOpen] = useState(false);
  const [isB2BPortalOpen, setIsB2BPortalOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeOrderCode, setActiveOrderCode] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [toast, setToast] = useState<ToastInfo | null>(null);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const savedProducts = localStorage.getItem('tpm_products');
      if (savedProducts) {
        const parsed: Product[] = JSON.parse(savedProducts);
        const updatedWithRealImages = parsed.map((p) => {
          const fresh = INITIAL_PRODUCTS.find((init) => init.id === p.id);
          if (fresh && (!p.image || p.image.startsWith('data:image/svg'))) {
            return { ...p, image: fresh.image };
          }
          return p;
        });
        setProducts(updatedWithRealImages);
      }

      const savedCart = localStorage.getItem('tpm_cart');
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        const updatedCart = parsedCart.map((item: any) => {
          const fresh = INITIAL_PRODUCTS.find((init) => init.id === item.product?.id);
          if (fresh && (!item.product.image || item.product.image.startsWith('data:image/svg'))) {
            return { ...item, product: { ...item.product, image: fresh.image } };
          }
          return item;
        });
        setCart(updatedCart);
      }

      const savedB2B = localStorage.getItem('tpm_b2b_mode');
      if (savedB2B) setIsB2BMode(JSON.parse(savedB2B));

      const savedUser = localStorage.getItem('tpm_user');
      if (savedUser) setUser(JSON.parse(savedUser));

      const savedAdmin = localStorage.getItem('tpm_is_admin');
      if (savedAdmin) setIsAdmin(JSON.parse(savedAdmin));

      const savedAdminAuth = localStorage.getItem('tpm_admin_auth');
      if (savedAdminAuth) setAdminCredentials(JSON.parse(savedAdminAuth));

      const savedSettings = localStorage.getItem('tpm_site_settings');
      if (savedSettings) {
        try {
          const parsed = JSON.parse(savedSettings);
          setSiteSettings({ ...DEFAULT_SITE_SETTINGS, ...parsed });
        } catch {
          setSiteSettings(DEFAULT_SITE_SETTINGS);
        }
      }

      const savedOrders = localStorage.getItem('tpm_orders');
      if (savedOrders) setOrders(JSON.parse(savedOrders));
    } catch {
      // ignore SSR error
    }
  }, []);

  // Save changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('tpm_products', JSON.stringify(products));
    } catch {}
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem('tpm_cart', JSON.stringify(cart));
    } catch {}
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('tpm_b2b_mode', JSON.stringify(isB2BMode));
    } catch {}
  }, [isB2BMode]);

  useEffect(() => {
    try {
      localStorage.setItem('tpm_is_admin', JSON.stringify(isAdmin));
    } catch {}
  }, [isAdmin]);

  useEffect(() => {
    try {
      if (user) localStorage.setItem('tpm_user', JSON.stringify(user));
      else localStorage.removeItem('tpm_user');
    } catch {}
  }, [user]);

  useEffect(() => {
    try {
      localStorage.setItem('tpm_orders', JSON.stringify(orders));
    } catch {}
  }, [orders]);

  useEffect(() => {
    try {
      localStorage.setItem('tpm_site_settings', JSON.stringify(siteSettings));
    } catch {}
  }, [siteSettings]);

  const showToast = (message: string, type: 'success' | 'warning' | 'info' = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  // Site Settings (Footer, Contacts, B2B banner) Update Handlers
  const updateSiteSettings = (newSettings: Partial<SiteSettings>) => {
    setSiteSettings((prev) => {
      const updated = { ...prev, ...newSettings };
      try {
        localStorage.setItem('tpm_site_settings', JSON.stringify(updated));
      } catch {}
      return updated;
    });
    showToast("Sayt ma'lumotlari va sozlamalari yangilandi!", 'success');
  };

  const resetSiteSettings = () => {
    setSiteSettings(DEFAULT_SITE_SETTINGS);
    try {
      localStorage.removeItem('tpm_site_settings');
    } catch {}
    showToast("Sayt matnlari standart holatga qaytarildi", 'info');
  };

  // Products CRUD
  const addProduct = (newProduct: Product) => {
    setProducts((prev) => [newProduct, ...prev]);
    showToast(`"${newProduct.name}" yangi mahsulot qo'shildi!`, 'success');
  };

  const updateProduct = (id: string, updated: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updated } : p))
    );
    showToast("Mahsulot ma'lumotlari yangilandi!", 'success');
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    showToast("Mahsulot ro'yxatdan o'chirildi", 'info');
  };

  const resetProductsToDefault = () => {
    setProducts(INITIAL_PRODUCTS);
    localStorage.removeItem('tpm_products');
    showToast("Mahsulotlar boshlang'ich holatga qaytarildi", 'info');
  };

  // Admin login tekshiruvi: faqat to'g'ri admin login va maxfiy paroli bilan kirish
  const adminLogin = (loginStr: string, passStr: string): boolean => {
    const l = (loginStr || '').trim().toLowerCase();
    const p = (passStr || '').trim();

    const expectedLogin = (adminCredentials.username || 'admin').trim().toLowerCase();
    const expectedPass = (adminCredentials.password || 'admin123').trim();

    if (l === expectedLogin && p === expectedPass) {
      setIsAdmin(true);
      showToast("Admin paneliga muvaffaqiyatli kirdingiz!", 'success');
      return true;
    }
    showToast("Login yoki parol noto'g'ri!", 'warning');
    return false;
  };

  // Yangi login va parolni saqlash
  const updateAdminCredentials = (newLogin: string, newPass: string): boolean => {
    const cleanLogin = (newLogin || '').trim();
    const cleanPass = (newPass || '').trim();

    if (!cleanLogin || cleanLogin.length < 3) {
      showToast("Login kamida 3 ta belgidan iborat bo'lishi kerak!", 'warning');
      return false;
    }
    if (!cleanPass || cleanPass.length < 4) {
      showToast("Parol kamida 4 ta belgidan iborat bo'lishi kerak!", 'warning');
      return false;
    }

    const updated = { username: cleanLogin, password: cleanPass };
    setAdminCredentials(updated);
    try {
      localStorage.setItem('tpm_admin_auth', JSON.stringify(updated));
    } catch {}
    showToast(`Yangi login: "${cleanLogin}" va parol muvaffaqiyatli saqlandi!`, 'success');
    return true;
  };

  // Boshlang'ich holatga qaytarish
  const resetAdminCredentials = () => {
    const defaults = { username: 'admin', password: 'admin123' };
    setAdminCredentials(defaults);
    try {
      localStorage.removeItem('tpm_admin_auth');
    } catch {}
    showToast("Login va parol boshlang'ich holatga (admin / admin123) qaytarildi", 'info');
  };

  const adminLogout = () => {
    setIsAdmin(false);
    try {
      localStorage.setItem('tpm_is_admin', JSON.stringify(false));
    } catch {}
    showToast("Admin rejimidan chiqildi", 'info');
  };

  const updateOrderStatus = (orderCode: string, newStatus: OrderStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.code === orderCode ? { ...o, orderStatus: newStatus } : o))
    );
    showToast(`Buyurtma ${orderCode} statusi o'zgartirildi: ${newStatus}`, 'success');
  };

  const addToCart = (product: Product, quantity = 1, isBundle = false) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity, isBundle }];
    });

    if (product.type === 'CONSUMABLE') {
      const hasCompatiblePrinterInCart = cart.some((item) =>
        item.product.type === 'PRINTER' && item.product.compatibleSkus.includes(product.sku)
      );
      if (!hasCompatiblePrinterInCart) {
        const targetPrinter = products.find((p) => p.sku === product.compatibleSkus[0]);
        if (targetPrinter) {
          showToast(
            `"${product.name}" savatga qo'shildi! Bu kartrij "${targetPrinter.name}" printeriga to'g'ri keladi.`,
            'info'
          );
          return;
        }
      }
    }

    showToast(`"${product.name}" savatchaga qo'shildi!`, 'success');
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
    showToast("Mahsulot savatchadan olib tashlandi", 'info');
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleB2BMode = () => {
    setIsB2BMode((prev) => {
      const next = !prev;
      showToast(
        next ? "B2B rejimi yoqildi! Barcha narxlar 12% QQS bilan va ulgurji tarifda ko'rsatiladi." : "B2C standart rejimiga o'tildi.",
        'info'
      );
      return next;
    });
  };

  const login = (phone: string, role: 'B2C' | 'B2B', b2bProfile?: B2BProfile) => {
    const newUser: User = { phone, role, b2bProfile, name: role === 'B2B' ? (b2bProfile?.companyName || 'Korxona') : 'Mijoz' };
    setUser(newUser);
    if (role === 'B2B') {
      setIsB2BMode(true);
    }
    showToast(`Xush kelibsiz! ${role === 'B2B' ? 'B2B Korporativ' : 'B2C'} kabinet faollashtirildi.`, 'success');
  };

  const logout = () => {
    setUser(null);
    setIsB2BMode(false);
    showToast("Tizimdan chiqildi", 'info');
  };

  // Logistics & volumetric weight calculator (14 regions)
  const calculateShipping = (regionName: string, itemsList = cart): ShippingCalculation => {
    const region = UZBEKISTAN_REGIONS.find((r) => r.name.toLowerCase() === regionName.toLowerCase()) || UZBEKISTAN_REGIONS[0];
    
    let physicalWeight = 0;
    let volumetricWeight = 0;

    itemsList.forEach((item) => {
      const p = item.product;
      const count = item.quantity;
      physicalWeight += (p.weight || 1) * count;
      const vol = ((p.length || 20) * (p.width || 20) * (p.height || 10)) / 5000;
      volumetricWeight += vol * count;
    });

    const billableWeight = Math.max(physicalWeight, volumetricWeight);
    const extraWeight = Math.max(0, Math.ceil(billableWeight - 1));
    const shippingCost = region.basePrice + (extraWeight * region.extraKgPrice);

    return {
      shippingCost: itemsList.length > 0 ? shippingCost : 0,
      physicalWeight: Number(physicalWeight.toFixed(2)),
      volumetricWeight: Number(volumetricWeight.toFixed(2)),
      billableWeight: Number(billableWeight.toFixed(2)),
      deliveryDays: region.deliveryTime,
    };
  };

  const cartSubtotal = cart.reduce((sum, item) => {
    const price = isB2BMode ? item.product.b2bPrice : item.product.retailPrice;
    const finalPrice = item.isBundle ? price * 0.9 : price;
    return sum + finalPrice * item.quantity;
  }, 0);

  const cartTotalWeight = cart.reduce((sum, item) => sum + item.product.weight * item.quantity, 0);
  const totalCartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const createOrder = ({
    recipientName,
    phone,
    region,
    addressLine,
    paymentMethod,
    b2bProfile,
  }: {
    recipientName: string;
    phone: string;
    region: string;
    addressLine: string;
    paymentMethod: PaymentMethod;
    b2bProfile?: B2BProfile;
  }): Order => {
    const shipping = calculateShipping(region, cart);
    const code = `TPM-${Math.floor(1000 + Math.random() * 9000)}`;
    const subtotal = cartSubtotal;
    const shippingCost = shipping.shippingCost;
    const vatAmount = isB2BMode ? Math.round((subtotal / 1.12) * 0.12) : 0;
    const totalAmount = subtotal + shippingCost;

    const deliveryDays = shipping.deliveryDays;
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + deliveryDays);

    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      code,
      recipientName,
      phone,
      region,
      addressLine,
      paymentMethod,
      orderStatus: paymentMethod === 'CASH' ? 'NEW' : 'PAID',
      items: [...cart],
      subtotal,
      shippingCost,
      vatAmount,
      totalAmount,
      isB2B: isB2BMode,
      b2bProfile: isB2BMode ? (b2bProfile || user?.b2bProfile) : undefined,
      createdAt: new Date().toISOString(),
      estimatedDeliveryDate: deliveryDate.toLocaleDateString('uz-UZ'),
    };

    setOrders((prev) => [newOrder, ...prev]);
    setActiveOrderCode(code);
    clearCart();
    setIsCheckoutOpen(false);
    setIsTrackingOpen(true);
    showToast(`Buyurtma qabul qilindi! Buyurtma kodi: ${code}`, 'success');

    return newOrder;
  };

  return (
    <CartContext.Provider
      value={{
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        resetProductsToDefault,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isB2BMode,
        toggleB2BMode,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isAuthOpen,
        setIsAuthOpen,
        isWizardOpen,
        setIsWizardOpen,
        isTrackingOpen,
        setIsTrackingOpen,
        isB2BPortalOpen,
        setIsB2BPortalOpen,
        isSearchOpen,
        setIsSearchOpen,
        selectedProduct,
        setSelectedProduct,
        activeOrderCode,
        setActiveOrderCode,
        user,
        login,
        logout,
        isAdmin,
        adminCredentials,
        updateAdminCredentials,
        resetAdminCredentials,
        adminLogin,
        adminLogout,
        siteSettings,
        updateSiteSettings,
        resetSiteSettings,
        orders,
        updateOrderStatus,
        createOrder,
        calculateShipping,
        toast,
        showToast,
        cartSubtotal,
        cartTotalWeight,
        totalCartItemsCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
