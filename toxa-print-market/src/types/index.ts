export type ProductType = 'PRINTER' | 'CONSUMABLE' | 'PLOTTER' | 'SPARE_PART';

export interface ProductSpecs {
  technology?: string; // Lazerli, Siyohli (Inkjet)
  speed?: string; // 19 ppm, 33 ppm
  resolution?: string; // 1200x1200 dpi, 4800x1200 dpi
  format?: string; // A4, A3, A1 (Plotter)
  connectivity?: string; // USB 2.0, Wi-Fi, Ethernet, Mobile Print
  color?: string; // Qora-oq (Monoxrom) yoki Rangli
  monthlyDuty?: string; // 8 000 varaqgacha
  yieldPages?: string; // 1 000 varaq (kartrij uchun)
}

export interface Product {
  id: string;
  sku: string;
  slug: string;
  name: string;
  type: ProductType;
  brand: string;
  categorySlug: string;
  categoryName: string;
  retailPrice: number; // so'm
  b2bPrice: number; // so'm (QQS bilan ulgurji narx)
  length: number; // cm
  width: number; // cm
  height: number; // cm
  weight: number; // kg
  warranty: number; // months
  stock: number;
  image: string;
  specs: ProductSpecs;
  compatibleSkus: string[]; // SKU list of compatible items
  badge?: string; // 'Tavsiya', 'Bestseller', 'Yangi'
}

export interface CartItem {
  product: Product;
  quantity: number;
  isBundle?: boolean;
}

export interface RegionRate {
  name: string;
  basePrice: number;
  extraKgPrice: number;
  deliveryTime: number; // kunlarda
}

export type PaymentMethod = 'PAYME' | 'CLICK' | 'UZUM_NASIYA' | 'CASH' | 'BANK_TRANSFER';

export type OrderStatus = 
  | 'NEW'
  | 'PAID'
  | 'SENT_TO_WAREHOUSE'
  | 'PACKAGED'
  | 'COURIER_HANDED'
  | 'DELIVERED'
  | 'CANCELED';

export interface B2BProfile {
  companyName: string;
  inn: string;
  mfo: string;
  bankAccount: string;
  vatCertificate: string;
}

export interface Order {
  id: string;
  code: string; // TPM-XXXX
  recipientName: string;
  phone: string;
  region: string;
  addressLine: string;
  paymentMethod: PaymentMethod;
  orderStatus: OrderStatus;
  items: CartItem[];
  subtotal: number;
  shippingCost: number;
  vatAmount: number;
  totalAmount: number;
  isB2B: boolean;
  b2bProfile?: B2BProfile;
  createdAt: string;
  estimatedDeliveryDate: string;
}

export interface User {
  phone: string;
  role: 'B2C' | 'B2B';
  name?: string;
  b2bProfile?: B2BProfile;
}
