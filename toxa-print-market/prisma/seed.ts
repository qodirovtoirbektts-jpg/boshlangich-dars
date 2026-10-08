import { PrismaClient, ProductType } from '@prisma/client'
import { UZBEKISTAN_REGIONS } from '../src/config/regions'

const prisma = new PrismaClient()

async function main() {
  console.log("Ma'lumotlar bazasini to'ldirish (Seeding) boshlandi...")

  // 1. Hududlar (Regions)
  for (const region of UZBEKISTAN_REGIONS) {
    await prisma.region.upsert({
      where: { name: region.name },
      update: {},
      create: {
        name: region.name,
        basePrice: region.basePrice,
        extraKgPrice: region.extraKgPrice,
        deliveryTime: region.deliveryTime,
      }
    })
  }

  // 2. Toifalar (Categories)
  const catPrinter = await prisma.category.upsert({ where: { slug: "printers" }, update: {}, create: { name: "Printer va MFP", slug: "printers" } })
  const catPlotter = await prisma.category.upsert({ where: { slug: "plotters" }, update: {}, create: { name: "Plotterlar", slug: "plotters" } })
  const catConsumable = await prisma.category.upsert({ where: { slug: "consumables" }, update: {}, create: { name: "Sarf materiallari", slug: "consumables" } })

  // 3. Printerlar (Printers)
  const printers = [
    { sku: "HP-LJ-M15W", slug: "hp-laserjet-m15w", name: "HP LaserJet Pro M15w (Lazerli)", brand: "HP", categoryId: catPrinter.id, type: ProductType.PRINTER },
    { sku: "EPSON-L3250", slug: "epson-ecotank-l3250", name: "Epson EcoTank L3250 (Siyohli MFP)", brand: "Epson", categoryId: catPrinter.id, type: ProductType.PRINTER },
    { sku: "CANON-G2420", slug: "canon-pixma-g2420", name: "Canon PIXMA G2420 (Siyohli MFP)", brand: "Canon", categoryId: catPrinter.id, type: ProductType.PRINTER },
    { sku: "HP-DJ-T650", slug: "hp-designjet-t650", name: "HP DesignJet T650 (Plotter)", brand: "HP", categoryId: catPlotter.id, type: ProductType.PRINTER },
  ]
  const createdPrinters = await Promise.all(printers.map(p => prisma.product.upsert({
    where: { sku: p.sku }, update: {}, create: { ...p, retailPrice: 2000000, b2bPrice: 2240000, length: 40, width: 30, height: 20, weight: 5, warranty: 12, stock: 10 }
  })))

  // 4. Kartrijlar (Consumables)
  const consumables = [
    { sku: "HP-44A", slug: "hp-44a-toner", name: "HP 44A Black Toner", brand: "HP", categoryId: catConsumable.id, type: ProductType.CONSUMABLE, compatibleWith: "HP-LJ-M15W" },
    { sku: "EPSON-103", slug: "epson-103-ink", name: "Epson 103 Ink Bottle Set", brand: "Epson", categoryId: catConsumable.id, type: ProductType.CONSUMABLE, compatibleWith: "EPSON-L3250" },
    { sku: "CANON-GI-41", slug: "canon-gi-41-ink", name: "Canon GI-41 Ink Set", brand: "Canon", categoryId: catConsumable.id, type: ProductType.CONSUMABLE, compatibleWith: "CANON-G2420" },
    { sku: "HP-712", slug: "hp-712-ink", name: "HP 712 DesignJet Ink Cartridge", brand: "HP", categoryId: catConsumable.id, type: ProductType.CONSUMABLE, compatibleWith: "HP-DJ-T650" },
  ]
  
  for (const c of consumables) {
    const createdCons = await prisma.product.upsert({
      where: { sku: c.sku }, update: {}, create: { sku: c.sku, slug: c.slug, name: c.name, brand: c.brand, categoryId: c.categoryId, type: c.type, retailPrice: 500000, b2bPrice: 560000, length: 15, width: 10, height: 5, weight: 0.5, warranty: 1, stock: 50 }
    })
    const targetPrinter = createdPrinters.find(p => p.sku === c.compatibleWith)
    if (targetPrinter) {
      await prisma.productCompatibility.upsert({
        where: { printerId_consumableId: { printerId: targetPrinter.id, consumableId: createdCons.id } },
        update: {}, create: { printerId: targetPrinter.id, consumableId: createdCons.id }
      })
    }
  }

  console.log("Seeding muvaffaqiyatli yakunlandi!")
}

main().catch(e => { console.error(e); process.exit(1); }).finally(async () => { await prisma.$disconnect(); })
