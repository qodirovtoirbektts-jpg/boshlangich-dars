# TEXNIK VAZIFA (TZ) - V.2.0 (Premium "Jio" Estetikasi)
**Loyiha nomi:** "TOXA PRINT MARKET" elektron tijorat platformasi  
**Hujjat turi:** Dasturiy ta’minotni ishlab chiqish bo‘yicha texnik topshiriq (Technical Specification)  
**Qamrov:** O‘zbekiston Respublikasi (14 ta hudud: 12 ta viloyat, Toshkent shahri, Qoraqalpog‘iston Respublikasi)  
**Yo‘nalishi:** Orgtexnika, bosma uskunalar, sarf materiallari va ehtiyot qismlarining B2C hamda B2B onlayn distribyutsiyasi  
**Dizayn Va UI/UX Konsepsiyasi:** MyJio (Jio.com) uslubidagi zamonaviy, premium, tezkor va "App-like" (ilovaga o'xshash) interfeys.

---

## 1. Umumiy Ma'lumotlar va Loyiha Maqsadi
### 1.1. Loyihaning Maqsadi
O‘zbekiston bo‘ylab barcha toifadagi mijozlar (jismoniy shaxslar, xususiy korxonalar, davlat idoralari va bosmaxonalar) uchun printerlar, skanerlar, ko‘p funksiyali qurilmalar (MFP), plotterlar va ularga tegishli sarf materiallarini qulay xarid qilish platformasini yaratish. Sayt xuddi **MyJio** kabi yuqori darajadagi foydalanuvchi tajribasini (UX) taqdim etishi shart.

### 1.2. Asosiy Vazifalar
- **MyJio kabi silliq va qulay UI:** Foydalanuvchini charchatmaydigan, toza va juda tezkor interfeys.
- Printer va sarf materiallari o‘rtasidagi moslik matritsasini (Compatibility Engine) ishlab chiqish.
- 14 ta hududga mo‘ljallangan avtomatlashtirilgan hajm-vazn logistika kalkulyatori.
- SMS OTP orqali bir lahzada tizimga kirish (Xuddi Jio login kabi).
- Yuridik shaxslar (B2B) uchun QQSli narxlar va elektron hisob-faktura (Didox) tizimi.
- Ombor qoldiqlari va narxlarni 1C:Korxona bilan sinxronlash.

---

## 2. UI/UX va Dizayn Tizimi (Design System) - "MyJio" Uslubida
Platforma to'liq **MyJio** sayti estetikasiga asoslanib quriladi. Bunga quyidagilar kiradi:
- **Premium Ranglar Palitrasi:** Asosiy rang sifatida Jio'ga xos Chuqur Moviy (Deep Blue `#0F3CC9`), urg'u beruvchi Ochiq Moviy (Sparkle Blue) va orqa fon uchun mutlaq Oq va Och Kulrang (Light Grey) ishlatiladi.
- **Tipografiya:** Zamonaviy, qalin va yirik (Bold/Black) harflar. `Inter` yoki `Outfit` shriftlaridan foydalanib, sarlavhalar juda e'tiborni tortuvchi bo'ladi.
- **Shakllar va Elementlar (Glassmorphism & Border Radius):** Barcha kartochkalar, tugmalar va formalar sezilarli darajada yumaloqlangan (rounded-2xl, rounded-full) bo'ladi. Qalqib chiquvchi oyna (Modal) va header'larda xira shisha effekti (Glassmorphism/Backdrop-blur) ishlatiladi.
- **Navigatsiya:** Tepada "Sticky" (qotib turuvchi) navigatsiya paneli va mobil qurilmalarda xuddi mobil ilovalardagidek (App-like) pastki navigatsiya (Bottom Action Bar).
- **Mikro-animatsiyalar:** Hover effektlari, tugmalarni bosganda "Ripple" (to'lqin) effekti, sahifalar va rasmlar (Carousel) o'rtasida juda silliq o'tish.

---

## 3. Tizim Arxitekturasi va Dasturiy Stek
Platforma monolit-modulli arxitekturada, yuqori konversiya va qidiruv tizimlari (SEO) talablariga to‘liq javob beradigan stekda barpo etiladi:
- **Foydalanuvchi interfeysi (Frontend):** Next.js 15+ (React 19, App Router). Jio uslubidagi dizayn uchun to'liq Tailwind CSS + Framer Motion animatsiyalari.
- **Uslublar va UI:** Tailwind CSS, Radix UI (Shadcn UI modernizatsiyasi).
- **Server tomoni (Backend):** Next.js Server Actions.
- **Ma’lumotlar bazasi:** PostgreSQL 16+ va Prisma ORM.
- **Kesh va sessiyalar:** Redis.
- **Qidiruv dvigateli:** Meilisearch (Typo-tolerance va fasetli filtrlar uchun).
- **Fayllar xotirasi:** S3-mos bulutli xotira.

---

## 4. Foydalanuvchi Rollari (RBAC)
| Rol | Ruxsat doirasi va Funksiyalari |
| --- | --- |
| **Mehmon (Guest)** | Mahsulotlar katalogini ko‘rish, tezkor qidiruv, savatchaga qo‘shish, Jio kabi SMS orqali tezkor autentifikatsiya va buyurtma berish. |
| **B2C Mijoz** | Shaxsiy kabinet, buyurtmalar tarixi, buyurtma holatini vizual kuzatish (Tracking progress bar), saqlangan manzillar. |
| **B2B Mijoz** | Korxona profili, QQSli narxlarni ko‘rish, to‘lov hisob-varag‘i yuklab olish, Didox orqali hujjat imzolash. |
| **Admin/Operator** | Buyurtmalar paneli, logistika, ombor boshqaruvi va kontentni tahrirlash (Katalog, Moslik). |

---

## 5. Ma’lumotlar Bazasi Modeli (Database Schema)
Asosiy sxema `Prisma` orqali quyidagilarni o'z ichiga oladi:
- **User / B2BProfile:** Telefon raqam orqali OTP login, B2B rekvizitlar.
- **Product / Category:** Printerlar, sarf materiallari, ularning texnik xususiyatlari, rasmlari, narxlari va zaxirasi.
- **ProductCompatibility:** Lazer/Siyohli printerlar va ularga to'g'ri keladigan kartrij/siyohlar o'rtasidagi bog'liqlik (M:N).
- **Order / OrderItem / Region:** 14 hudud tariflari va buyurtma tafsilotlari.

---

## 6. Funksional Modullar (MyJio UX asosida)
### 6.1. Bosh Sahifa (Homepage)
- **Katta Hero Banner (Slider):** MyJio uslubidagi, to'liq ekran kengligida, qalin sarlavhali va dumaloq burchakli katta slaydlar. Asosiy aksiyalar va printer bundle'lari uchun.
- **Tezkor Harakatlar (Quick Actions):** 4 ta yoki 8 ta dumaloq, ikonkalari aniq va rangli tugmalar (Masalan: "Lazerli Printerlar", "Siyoh izlash", "B2B Portal", "Servis markazi").
- **Smart Tanlov Vidjeti ("Printer Wizard"):** Jio App'dagi kabi qadam-ba-qadam ishlovchi viza (Uy, Ofis yoki Fotostudiya uchun printerni 3 klikda topish).

### 6.2. Katalog va Qidiruv
- Saytning qidiruv qismi ekranning yuqori qismida yirik ochiladigan (modal) oyna bo'ladi. Printerning modelini yozish bilanoq, Meilisearch yordamida millisekundlarda unga mos kartrijlar ham taklif qilinadi.

### 6.3. Mahsulot Kartochkasi va Moslik (Compatibility)
- **Vizual:** Katta rasm, narxlar juda aniq ko'rsatiladi. B2B mijoz kirsagina QQS bilan narx chiqadi.
- **Moslik bloki (Cross-sell):** Printer sahifasida pastki qismda yirik dumaloq kartochkalarda "Bunga mos keluvchi kartrijlar" ro'yxati scroll qilinadigan (Carousel) ko'rinishda chiqadi.
- Savatchaga noto'g'ri kartrij solinganda ekranda yumshoq ogohlantirish Toast'i (Qizil emas, balki to'q sariq rangda) chiqib, to'g'risini taklif qiladi.

### 6.4. Viloyatlararo Checkout
- Xuddi ilovalardagidek 1 sahifali (Single Page) to'lov jarayoni. 
- Logistika kalkulyatori kiritilgan og'irlik (fizik va hajm vazni) hamda tanlangan viloyatga qarab yetkazish narxini real vaqtda hisoblab turadi.
- Payme, Click va Muddatli to'lov (Uzum Nasiya) tugmalari UI jihatdan juda sezilarli, logotiplar oq fonda toza joylashgan.

---

## 7. Nofunksional Talablar (NFR)
### 7.1. Tezlik va Unumdorlik
- Sahifalar yuklanishi (FCP) **1 soniyadan** tez.
- Interfeys reaktivligi (latency) 100ms dan kam (optimistic UI updates).
- Lighthouse ko'rsatkichlari Mobile va Desktop uchun **90+** ball.

### 7.2. Xavfsizlik va Zaxiralash
- HTTPS (TLS 1.3), barcha parollar Argon2 hesh.
- To'lov webhook'lari faqat oq IP-manzillardan qabul qilinadi (IP Whitelisting).
- PostgreSQL DB har kuni S3'ga avtomatik tarzda Backup qilinadi.

---

## 8. Qabul Qilish Mezonlari
1. **Dizayn Muvofiqligi:** Barcha elementlar (tugmalar, navigatsiya, kartochkalar) belgilangan "MyJio" estetikasi va UI me'yorlariga javob berishi. Mobil versiya haqiqiy Android/iOS ilovasini yodga solishi shart.
2. **Moslik va Logistika algoritmik tekshiruvi:** TZ ning logistika hisob-kitoblari va kartrijlar mosligi (Compatibility Engine) xatosiz ishlashi.
3. **Avtomatizatsiya:** B2B xaridida 1C qoldiqning ayirilishi va Didox schyoti shakllanishi.
