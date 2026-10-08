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

  // Footer 2-Ustun: Mahsulotlar havolalari
  productsColTitle: string;
  productLink1Text: string;
  productLink2Text: string;
  productLink3Text: string;
  productLink4Text: string;
  productLink5Text: string;

  // Footer 3-Ustun: B2B va Xizmatlar havolalari
  servicesColTitle: string;
  serviceLink1Text: string;
  serviceLink2Text: string;
  serviceLink3Text: string;
  serviceLink4Text: string;
  serviceLink5Text: string;

  // Footer 4-Ustun: Bog'lanish & Kontaktlar
  contactsColTitle: string;
  phoneLabel: string;
  phone: string;
  telegramLabel: string;
  telegram: string;
  emailLabel: string;
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

  // Footer 2-Ustun: Mahsulotlar
  productsColTitle: 'Mahsulotlar',
  productLink1Text: 'Lazerli Printerlar (HP, Canon)',
  productLink2Text: 'Siyohli CISS MFP (Epson EcoTank)',
  productLink3Text: 'Katta Formatli Plotterlar (HP DesignJet)',
  productLink4Text: 'Original Toner va Siyoh Kartrijlari',
  productLink5Text: "Fotokog'oz va Aksessuarlar",

  // Footer 3-Ustun: B2B va Xizmatlar
  servicesColTitle: 'B2B va Xizmatlar',
  serviceLink1Text: 'Didox elektron schyot-fakturalar',
  serviceLink2Text: '1C ombor qoldiqlari sinxronizatsiyasi',
  serviceLink3Text: 'Kafolat va Servis xizmati',
  serviceLink4Text: '14 hudud yetkazib berish tariflari',
  serviceLink5Text: "Ulgurji xaridlar bo'limi",

  // Footer 4-Ustun: Bog'lanish
  contactsColTitle: "Bog'lanish",
  phoneLabel: 'Yagona aloqa markazi:',
  phone: '+998 (71) 200-00-00',
  telegramLabel: 'Telegram:',
  telegram: '@toxaprint_support',
  emailLabel: 'Email:',
  email: 'info@toxaprint.uz',
  workingHours: 'Dushanba - Shanba: 09:00 dan 19:00 gacha',

  // Copyright
  copyright: '© 2026 TOXA PRINT MARKET. Barcha huquqlar himoyalangan. MyJio UI/UX Design System.',
};
