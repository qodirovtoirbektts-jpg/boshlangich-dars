-- Initial Seed Data for Toxa Print Market (Supabase PostgreSQL)

-- 1. Regions
INSERT INTO "Region" ("id", "name", "basePrice", "extraKgPrice", "deliveryTime") VALUES
('reg-1', 'Toshkent shahri', 25000, 0, 1),
('reg-2', 'Toshkent viloyati', 35000, 3000, 2),
('reg-3', 'Sirdaryo viloyati', 35000, 3000, 2),
('reg-4', 'Jizzax viloyati', 35000, 3000, 2),
('reg-5', 'Samarqand viloyati', 35000, 3000, 2),
('reg-6', 'Qashqadaryo viloyati', 40000, 4000, 3),
('reg-7', 'Surxondaryo viloyati', 40000, 4000, 3),
('reg-8', 'Buxoro viloyati', 40000, 4000, 3),
('reg-9', 'Navoiy viloyati', 40000, 4000, 3),
('reg-10', 'Xorazm viloyati', 45000, 5000, 4),
('reg-11', 'Qoraqalpog‘iston Respublikasi', 50000, 5000, 5),
('reg-12', 'Farg‘ona viloyati', 35000, 3000, 2),
('reg-13', 'Namangan viloyati', 35000, 3000, 2),
('reg-14', 'Andijon viloyati', 35000, 3000, 2)
ON CONFLICT ("name") DO NOTHING;

-- 2. Categories
INSERT INTO "Category" ("id", "name", "slug") VALUES
('cat-printers', 'Printer va MFP', 'printers'),
('cat-plotters', 'Plotterlar', 'plotters'),
('cat-consumables', 'Sarf materiallari', 'consumables')
ON CONFLICT ("slug") DO NOTHING;

-- 3. Products
INSERT INTO "Product" ("id", "sku", "slug", "name", "type", "brand", "retailPrice", "b2bPrice", "length", "width", "height", "weight", "warranty", "stock", "categoryId", "updatedAt") VALUES
('prod-hp-m15w', 'HP-LJ-M15W', 'hp-laserjet-m15w', 'HP LaserJet Pro M15w (Lazerli)', 'PRINTER', 'HP', 2150000, 2408000, 34.6, 18.9, 15.9, 3.8, 12, 18, 'cat-printers', NOW()),
('prod-epson-l3250', 'EPSON-L3250', 'epson-ecotank-l3250', 'Epson EcoTank L3250 (Siyohli MFP)', 'PRINTER', 'Epson', 2850000, 3192000, 37.5, 34.7, 17.9, 3.9, 12, 24, 'cat-printers', NOW()),
('prod-canon-g2420', 'CANON-G2420', 'canon-pixma-g2420', 'Canon PIXMA G2420 (Siyohli MFP)', 'PRINTER', 'Canon', 2390000, 2676800, 44.5, 33.0, 16.7, 6.4, 12, 15, 'cat-printers', NOW()),
('prod-hp-t650', 'HP-DJ-T650', 'hp-designjet-t650', 'HP DesignJet T650 (Plotter)', 'PRINTER', 'HP', 16800000, 18816000, 101.3, 60.5, 93.2, 29.5, 24, 5, 'cat-plotters', NOW()),
('prod-hp-44a', 'HP-44A', 'hp-44a-toner', 'HP 44A Black LaserJet Toner', 'CONSUMABLE', 'HP', 420000, 470400, 15.0, 10.5, 7.2, 0.55, 6, 85, 'cat-consumables', NOW()),
('prod-epson-103', 'EPSON-103', 'epson-103-ink', 'Epson 103 EcoTank Ink Set', 'CONSUMABLE', 'Epson', 380000, 425600, 18.0, 12.0, 6.5, 0.65, 6, 120, 'cat-consumables', NOW()),
('prod-canon-gi41', 'CANON-GI-41', 'canon-gi-41-ink', 'Canon GI-41 MegaTank Ink Set', 'CONSUMABLE', 'Canon', 360000, 403200, 17.5, 11.0, 6.0, 0.6, 6, 95, 'cat-consumables', NOW()),
('prod-hp-712', 'HP-712', 'hp-712-ink', 'HP 712 DesignJet Ink Cartridge', 'CONSUMABLE', 'HP', 1950000, 2184000, 20.0, 14.0, 8.0, 0.8, 12, 22, 'cat-consumables', NOW())
ON CONFLICT ("sku") DO NOTHING;

-- 4. Product Compatibility
INSERT INTO "ProductCompatibility" ("printerId", "consumableId") VALUES
('prod-hp-m15w', 'prod-hp-44a'),
('prod-epson-l3250', 'prod-epson-103'),
('prod-canon-g2420', 'prod-canon-gi41'),
('prod-hp-t650', 'prod-hp-712')
ON CONFLICT ("printerId", "consumableId") DO NOTHING;
