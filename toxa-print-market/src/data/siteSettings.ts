export interface SiteSettings {
  // B2B Korporativ Xizmatlar Bo'limi
  b2bBadge: string;
  b2bTitle: string;
  b2bDescription: string;
  b2bButtonText: string;

  // 4 ta Afzallik Kartasi (Value Badges)
  badge1Title: string;
  badge1Desc: string;
  badge2Title: string;
  badge2Desc: string;
  badge3Title: string;
  badge3Desc: string;
  badge4Title: string;
  badge4Desc: string;

  // Do'kon Ma'lumotlari & Manzil
  companyName: string;
  companyDescription: string;
  address: string;

  // Aloqa & Kontaktlar
  phone: string;
  telegram: string;
  email: string;
  workingHours: string;

  // Pastki Mualliflik Huquqi (Copyright)
  copyright: string;
}

export const DEFAULT_SITE_SETTINGS: SiteSettings = {
  // B2B Section
  b2bBadge: 'B2B Korporativ Xizmatlar',
  b2bTitle: 'Didox orqali elektron hujjat aylanishi va 1C integratsiyasi',
  b2bDescription: "Korxonangiz uchun printerni rasmiy 12% QQS bilan xarid qiling. Biz Didox tizimi orqali to'lov hisob-varag'i (schyot-faktura) yuboramiz va tovarlarni 1C qoldiqlardan bir zumda ajratamiz.",
  b2bButtonText: 'B2B Portalni Ochish',

  // 4 Value Badges
  badge1Title: '14 Hududga Yetkazish',
  badge1Desc: 'BTS va Express tezkor pochta',

  badge2Title: 'Rasmiy Kafolat',
  badge2Desc: '12 oydan 24 oygacha servis',

  badge3Title: 'Didox & 1C Integratsiya',
  badge3Desc: 'Yuridik shaxslar uchun 12% QQS',

  badge4Title: "24/7 Qo'llab-quvvatlash",
  badge4Desc: '+998 (71) 200-00-00',

  // Company Info
  companyName: 'TOXA PRINT',
  companyDescription: "O'zbekiston bo'ylab barcha toifadagi mijozlar uchun printerlar, skanerlar, plotterlar va original sarf materiallarining B2C hamda B2B onlayn distribyutsiyasi.",
  address: "Toshkent sh., Chilonzor tumani, Bunyodkor shox ko'chasi 42-uy",

  // Contacts
  phone: '+998 (71) 200-00-00',
  telegram: '@toxaprint_support',
  email: 'info@toxaprint.uz',
  workingHours: 'Dushanba - Shanba: 09:00 dan 19:00 gacha',

  // Copyright
  copyright: '© 2026 TOXA PRINT MARKET. Barcha huquqlar himoyalangan. MyJio UI/UX Design System.',
};
