// High-fidelity vector illustrations for Toxa Print Market products
// 100% offline, instant load, zero CDN failure risk

const makeSvgUrl = (svgContent: string) => `data:image/svg+xml;utf8,${encodeURIComponent(svgContent.trim())}`;

export const PRODUCT_IMAGES = {
  // 1. HP LaserJet Pro M15w (Compact Laser)
  hpM15w: makeSvgUrl(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="100%" height="100%">
      <defs>
        <linearGradient id="bodyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#ffffff"/>
          <stop offset="100%" stop-color="#e2e8f0"/>
        </linearGradient>
        <linearGradient id="trayGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#cbd5e1"/>
          <stop offset="100%" stop-color="#94a3b8"/>
        </linearGradient>
        <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="8" stdDeviation="12" flood-color="#0f3cc9" flood-opacity="0.12"/>
        </filter>
      </defs>
      <!-- Base Shadow -->
      <ellipse cx="200" cy="255" rx="140" ry="20" fill="#cbd5e1" opacity="0.6"/>
      <!-- Main Body -->
      <g filter="url(#shadow)">
        <rect x="70" y="110" width="260" height="130" rx="20" fill="url(#bodyGrad)" stroke="#cbd5e1" stroke-width="2"/>
        <!-- Top Cover -->
        <rect x="90" y="80" width="220" height="40" rx="10" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2"/>
        <!-- Output Tray -->
        <path d="M110 150 L290 150 L280 185 L120 185 Z" fill="#334155"/>
        <rect x="130" y="140" width="140" height="25" rx="4" fill="#ffffff" stroke="#94a3b8" stroke-width="1"/>
        <line x1="145" y1="148" x2="210" y2="148" stroke="#cbd5e1" stroke-width="2"/>
        <line x1="145" y1="154" x2="195" y2="154" stroke="#cbd5e1" stroke-width="2"/>
        <!-- Paper in Tray -->
        <rect x="120" y="195" width="160" height="15" rx="4" fill="url(#trayGrad)"/>
        <!-- Control Panel & LED -->
        <circle cx="295" cy="100" r="5" fill="#10b981"/>
        <circle cx="280" cy="100" r="4" fill="#0ea5e9"/>
        <!-- HP Logo badge -->
        <circle cx="200" cy="100" r="14" fill="#0096d6"/>
        <text x="200" y="105" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="#ffffff" text-anchor="middle" font-style="italic">hp</text>
        <!-- Power line -->
        <rect x="95" y="225" width="210" height="4" rx="2" fill="#0ea5e9" opacity="0.8"/>
      </g>
    </svg>
  `),

  // 2. Epson EcoTank L3250 (Inkjet MFP with CISS Tanks)
  epsonL3250: makeSvgUrl(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="100%" height="100%">
      <defs>
        <linearGradient id="epsonBody" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#1e293b"/>
          <stop offset="100%" stop-color="#0f172a"/>
        </linearGradient>
        <filter id="shadowEp" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="8" stdDeviation="12" flood-color="#0f3cc9" flood-opacity="0.15"/>
        </filter>
      </defs>
      <ellipse cx="200" cy="255" rx="145" ry="18" fill="#94a3b8" opacity="0.5"/>
      <g filter="url(#shadowEp)">
        <!-- Scanner Top -->
        <rect x="65" y="70" width="270" height="45" rx="10" fill="#334155" stroke="#475569" stroke-width="2"/>
        <rect x="80" y="80" width="240" height="6" rx="3" fill="#64748b"/>
        <!-- Main Chassis -->
        <rect x="65" y="110" width="270" height="130" rx="16" fill="url(#epsonBody)" stroke="#334155" stroke-width="2"/>
        <!-- Paper Output -->
        <rect x="100" y="150" width="145" height="40" rx="6" fill="#020617"/>
        <rect x="115" y="160" width="115" height="18" rx="3" fill="#ffffff"/>
        <!-- Control buttons -->
        <circle cx="90" cy="130" r="4" fill="#38bdf8"/>
        <circle cx="102" cy="130" r="4" fill="#f43f5e"/>
        <circle cx="114" cy="130" r="4" fill="#22c55e"/>
        <!-- Transparent EcoTank Window on Right -->
        <rect x="255" y="140" width="65" height="85" rx="8" fill="#1e293b" stroke="#475569" stroke-width="1.5"/>
        <!-- 4 Ink Tanks (BK, C, M, Y) -->
        <rect x="260" y="155" width="11" height="60" rx="2" fill="#000000" stroke="#475569"/>
        <rect x="274" y="160" width="11" height="55" rx="2" fill="#06b6d4"/>
        <rect x="288" y="165" width="11" height="50" rx="2" fill="#ec4899"/>
        <rect x="302" y="158" width="11" height="57" rx="2" fill="#eab308"/>
        <!-- Brand logo -->
        <text x="200" y="95" font-family="Arial, sans-serif" font-size="14" font-weight="900" fill="#ffffff" text-anchor="middle" letter-spacing="2">EPSON</text>
        <text x="200" y="135" font-family="Arial, sans-serif" font-size="9" font-weight="bold" fill="#38bdf8" text-anchor="middle">EcoTank</text>
      </g>
    </svg>
  `),

  // 3. Canon PIXMA G2420 (MegaTank 3-in-1)
  canonG2420: makeSvgUrl(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="100%" height="100%">
      <defs>
        <linearGradient id="canonGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#27272a"/>
          <stop offset="100%" stop-color="#18181b"/>
        </linearGradient>
      </defs>
      <ellipse cx="200" cy="255" rx="145" ry="18" fill="#a1a1aa" opacity="0.5"/>
      <rect x="60" y="80" width="280" height="160" rx="20" fill="url(#canonGrad)" stroke="#3f3f46" stroke-width="2"/>
      <!-- Scanner Lid -->
      <rect x="75" y="65" width="250" height="30" rx="8" fill="#3f3f46"/>
      <!-- Canon Red Logo -->
      <text x="200" y="115" font-family="Arial, sans-serif" font-size="16" font-weight="bold" fill="#dc2626" text-anchor="middle" letter-spacing="3">Canon</text>
      <!-- Dual MegaTank Windows Left and Right -->
      <!-- Black Ink Tank Left -->
      <rect x="75" y="140" width="35" height="85" rx="6" fill="#09090b" stroke="#52525b" stroke-width="1.5"/>
      <rect x="80" y="150" width="25" height="70" rx="3" fill="#18181b"/>
      <text x="92" y="185" font-family="Arial" font-size="8" fill="#a1a1aa" text-anchor="middle">BK</text>
      <!-- Color Tanks Right -->
      <rect x="250" y="140" width="75" height="85" rx="6" fill="#09090b" stroke="#52525b" stroke-width="1.5"/>
      <rect x="255" y="155" width="18" height="65" rx="3" fill="#0284c7"/>
      <rect x="278" y="158" width="18" height="62" rx="3" fill="#e11d48"/>
      <rect x="301" y="152" width="18" height="68" rx="3" fill="#ca8a04"/>
      <!-- Center Paper Tray -->
      <rect x="120" y="150" width="120" height="50" rx="6" fill="#09090b"/>
      <rect x="130" y="160" width="100" height="15" rx="2" fill="#ffffff"/>
      <!-- LCD Screen -->
      <rect x="180" y="125" width="40" height="16" rx="3" fill="#1e3a5f" stroke="#0ea5e9" stroke-width="1"/>
      <text x="200" y="137" font-family="Arial" font-size="9" fill="#38bdf8" text-anchor="middle font-weight='bold'">READY</text>
    </svg>
  `),

  // 4. HP DesignJet T650 (24-inch Plotter)
  hpT650: makeSvgUrl(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="100%" height="100%">
      <defs>
        <linearGradient id="plotterGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#334155"/>
          <stop offset="100%" stop-color="#0f172a"/>
        </linearGradient>
      </defs>
      <!-- Stand Legs -->
      <line x1="100" y1="160" x2="80" y2="265" stroke="#475569" stroke-width="7" stroke-linecap="round"/>
      <line x1="300" y1="160" x2="320" y2="265" stroke="#475569" stroke-width="7" stroke-linecap="round"/>
      <line x1="70" y1="265" x2="100" y2="265" stroke="#334155" stroke-width="6" stroke-linecap="round"/>
      <line x1="300" y1="265" x2="330" y2="265" stroke="#334155" stroke-width="6" stroke-linecap="round"/>
      <line x1="90" y1="220" x2="310" y2="220" stroke="#64748b" stroke-width="3"/>
      <!-- Catch Basket -->
      <path d="M100 180 Q200 240 300 180" fill="none" stroke="#94a3b8" stroke-width="4" stroke-dasharray="6,4"/>
      <!-- Main Wide Format Chassis -->
      <rect x="50" y="90" width="300" height="75" rx="14" fill="url(#plotterGrad)" stroke="#475569" stroke-width="2"/>
      <!-- Roll Feed Slot -->
      <rect x="70" y="125" width="260" height="12" rx="3" fill="#020617"/>
      <!-- Paper Sheet Emerging (A1 Blueprint) -->
      <rect x="85" y="132" width="230" height="45" rx="2" fill="#eff6ff" stroke="#93c5fd" stroke-width="1"/>
      <line x1="100" y1="145" x2="280" y2="145" stroke="#3b82f6" stroke-width="1.5"/>
      <line x1="100" y1="155" x2="200" y2="155" stroke="#3b82f6" stroke-width="1"/>
      <line x1="220" y1="155" x2="290" y2="155" stroke="#60a5fa" stroke-width="1"/>
      <!-- Touch Screen on Right -->
      <rect x="290" y="98" width="45" height="24" rx="4" fill="#0284c7" stroke="#38bdf8" stroke-width="1"/>
      <text x="312" y="114" font-family="Arial" font-size="8" font-weight="bold" fill="#ffffff" text-anchor="middle">A1 PLOT</text>
      <!-- HP Badge -->
      <circle cx="85" cy="108" r="10" fill="#0096d6"/>
      <text x="85" y="112" font-family="Arial" font-size="9" font-weight="bold" fill="#ffffff" text-anchor="middle" font-style="italic">hp</text>
    </svg>
  `),

  // 5. Canon imageRUNNER 2206 (Heavy A3 Copier)
  canonIr2206: makeSvgUrl(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="100%" height="100%">
      <rect x="90" y="50" width="220" height="210" rx="16" fill="#f1f5f9" stroke="#cbd5e1" stroke-width="3"/>
      <!-- ADF Feeder Lid Top -->
      <rect x="105" y="35" width="190" height="30" rx="8" fill="#e2e8f0" stroke="#cbd5e1" stroke-width="2"/>
      <rect x="130" y="45" width="140" height="6" rx="2" fill="#64748b"/>
      <!-- Touch Console -->
      <rect x="110" y="75" width="180" height="35" rx="6" fill="#334155"/>
      <rect x="120" y="82" width="60" height="20" rx="3" fill="#0ea5e9"/>
      <!-- Keypad -->
      <circle cx="200" cy="92" r="3" fill="#ffffff"/>
      <circle cx="215" cy="92" r="3" fill="#ffffff"/>
      <circle cx="230" cy="92" r="3" fill="#ffffff"/>
      <circle cx="255" cy="92" r="6" fill="#22c55e"/>
      <!-- Center Output Cavity -->
      <rect x="110" y="120" width="180" height="40" rx="4" fill="#1e293b"/>
      <rect x="125" y="130" width="150" height="15" rx="2" fill="#ffffff"/>
      <!-- Paper Cassette 1 (A4) -->
      <rect x="105" y="175" width="190" height="32" rx="4" fill="#ffffff" stroke="#cbd5e1" stroke-width="2"/>
      <rect x="180" y="188" width="40" height="6" rx="2" fill="#94a3b8"/>
      <!-- Paper Cassette 2 (A3) -->
      <rect x="105" y="215" width="190" height="35" rx="4" fill="#ffffff" stroke="#cbd5e1" stroke-width="2"/>
      <rect x="180" y="228" width="40" height="6" rx="2" fill="#94a3b8"/>
      <!-- Brand -->
      <text x="200" y="68" font-family="Arial" font-size="12" font-weight="bold" fill="#dc2626" text-anchor="middle">Canon A3</text>
    </svg>
  `),

  // 6. HP LaserJet Pro M428dw (Office Duplex MFP)
  hpM428dw: makeSvgUrl(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="100%" height="100%">
      <rect x="80" y="60" width="240" height="190" rx="18" fill="#ffffff" stroke="#cbd5e1" stroke-width="2.5"/>
      <!-- ADF Top Feeder -->
      <rect x="100" y="40" width="200" height="35" rx="8" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2"/>
      <rect x="120" y="50" width="160" height="8" rx="3" fill="#334155"/>
      <!-- Color Touch Display on Arm -->
      <rect x="250" y="80" width="55" height="38" rx="6" fill="#0f172a" stroke="#0284c7" stroke-width="2"/>
      <rect x="256" y="86" width="43" height="26" rx="3" fill="#0284c7"/>
      <!-- Output Bin -->
      <rect x="100" y="125" width="140" height="40" rx="6" fill="#1e293b"/>
      <rect x="110" y="135" width="120" height="15" rx="2" fill="#ffffff"/>
      <!-- Main Cassette Drawer -->
      <rect x="95" y="195" width="210" height="45" rx="6" fill="#f1f5f9" stroke="#cbd5e1" stroke-width="1.5"/>
      <rect x="180" y="212" width="40" height="6" rx="2" fill="#94a3b8"/>
      <!-- HP Blue Round Badge -->
      <circle cx="120" cy="98" r="14" fill="#0096d6"/>
      <text x="120" y="103" font-family="Arial" font-size="12" font-weight="bold" fill="#ffffff" text-anchor="middle" font-style="italic">hp</text>
    </svg>
  `),

  // 7. HP 44A Black Laser Toner Cartridge
  hp44a: makeSvgUrl(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="100%" height="100%">
      <ellipse cx="200" cy="245" rx="120" ry="15" fill="#cbd5e1" opacity="0.6"/>
      <!-- Toner Cartridge Cylindrical Body -->
      <rect x="70" y="100" width="260" height="110" rx="22" fill="#1e293b" stroke="#334155" stroke-width="3"/>
      <!-- OP Drum Roller (Green/Cyan) -->
      <rect x="85" y="180" width="230" height="16" rx="6" fill="#059669" stroke="#10b981" stroke-width="1.5"/>
      <!-- Toner Grip Handle -->
      <rect x="140" y="80" width="120" height="25" rx="6" fill="#0f172a" stroke="#475569" stroke-width="2"/>
      <line x1="160" y1="92" x2="240" y2="92" stroke="#64748b" stroke-width="3" stroke-linecap="round"/>
      <!-- Side Cog Gears -->
      <circle cx="85" cy="135" r="16" fill="#f59e0b" stroke="#d97706" stroke-width="2"/>
      <circle cx="85" cy="135" r="6" fill="#1e293b"/>
      <!-- Label -->
      <rect x="130" y="125" width="140" height="40" rx="6" fill="#0284c7"/>
      <text x="200" y="145" font-family="Arial" font-size="14" font-weight="900" fill="#ffffff" text-anchor="middle">HP 44A</text>
      <text x="200" y="158" font-family="Arial" font-size="9" font-weight="bold" fill="#e0f2fe" text-anchor="middle">Black LaserJet Toner</text>
    </svg>
  `),

  // 8. Epson 103 EcoTank 4-Ink Bottle Set
  epson103: makeSvgUrl(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="100%" height="100%">
      <defs>
        <filter id="bottleShadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="6" stdDeviation="6" flood-color="#000000" flood-opacity="0.15"/>
        </filter>
      </defs>
      <!-- Base Shadow -->
      <ellipse cx="200" cy="245" rx="140" ry="15" fill="#cbd5e1" opacity="0.6"/>
      <!-- Bottle 1: Black (BK) -->
      <g filter="url(#bottleShadow)" transform="translate(60, 70)">
        <rect x="12" y="0" width="24" height="25" rx="4" fill="#0f172a"/>
        <path d="M4 25 L44 25 L48 140 L0 140 Z" fill="#1e293b" stroke="#334155" stroke-width="2"/>
        <rect x="6" y="60" width="36" height="50" rx="3" fill="#000000"/>
        <text x="24" y="90" font-family="Arial" font-size="12" font-weight="bold" fill="#ffffff" text-anchor="middle">BK</text>
      </g>
      <!-- Bottle 2: Cyan (C) -->
      <g filter="url(#bottleShadow)" transform="translate(130, 70)">
        <rect x="12" y="0" width="24" height="25" rx="4" fill="#0891b2"/>
        <path d="M4 25 L44 25 L48 140 L0 140 Z" fill="#06b6d4" stroke="#0891b2" stroke-width="2"/>
        <rect x="6" y="60" width="36" height="50" rx="3" fill="#ffffff"/>
        <text x="24" y="90" font-family="Arial" font-size="12" font-weight="bold" fill="#0891b2" text-anchor="middle">C</text>
      </g>
      <!-- Bottle 3: Magenta (M) -->
      <g filter="url(#bottleShadow)" transform="translate(200, 70)">
        <rect x="12" y="0" width="24" height="25" rx="4" fill="#db2777"/>
        <path d="M4 25 L44 25 L48 140 L0 140 Z" fill="#ec4899" stroke="#db2777" stroke-width="2"/>
        <rect x="6" y="60" width="36" height="50" rx="3" fill="#ffffff"/>
        <text x="24" y="90" font-family="Arial" font-size="12" font-weight="bold" fill="#db2777" text-anchor="middle">M</text>
      </g>
      <!-- Bottle 4: Yellow (Y) -->
      <g filter="url(#bottleShadow)" transform="translate(270, 70)">
        <rect x="12" y="0" width="24" height="25" rx="4" fill="#ca8a04"/>
        <path d="M4 25 L44 25 L48 140 L0 140 Z" fill="#eab308" stroke="#ca8a04" stroke-width="2"/>
        <rect x="6" y="60" width="36" height="50" rx="3" fill="#ffffff"/>
        <text x="24" y="90" font-family="Arial" font-size="12" font-weight="bold" fill="#ca8a04" text-anchor="middle">Y</text>
      </g>
    </svg>
  `),

  // 9. Canon GI-41 MegaTank Inks
  canonGi41: makeSvgUrl(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="100%" height="100%">
      <ellipse cx="200" cy="245" rx="140" ry="15" fill="#cbd5e1" opacity="0.6"/>
      <!-- Big Black Bottle (135ml) -->
      <g transform="translate(60, 60)">
        <rect x="16" y="0" width="28" height="28" rx="4" fill="#dc2626"/>
        <path d="M5 28 L55 28 L60 160 L0 160 Z" fill="#18181b" stroke="#3f3f46" stroke-width="2"/>
        <rect x="8" y="70" width="44" height="60" rx="4" fill="#dc2626"/>
        <text x="30" y="100" font-family="Arial" font-size="13" font-weight="bold" fill="#ffffff" text-anchor="middle">GI-41</text>
        <text x="30" y="115" font-family="Arial" font-size="9" fill="#fecaca" text-anchor="middle">PGBK</text>
      </g>
      <!-- Cyan -->
      <g transform="translate(145, 80)">
        <rect x="10" y="0" width="20" height="24" rx="3" fill="#0284c7"/>
        <path d="M2 24 L38 24 L42 140 L0 140 Z" fill="#0284c7"/>
        <rect x="5" y="60" width="30" height="50" rx="3" fill="#ffffff"/>
        <text x="20" y="90" font-family="Arial" font-size="11" font-weight="bold" fill="#0284c7" text-anchor="middle">C</text>
      </g>
      <!-- Magenta -->
      <g transform="translate(210, 80)">
        <rect x="10" y="0" width="20" height="24" rx="3" fill="#e11d48"/>
        <path d="M2 24 L38 24 L42 140 L0 140 Z" fill="#e11d48"/>
        <rect x="5" y="60" width="30" height="50" rx="3" fill="#ffffff"/>
        <text x="20" y="90" font-family="Arial" font-size="11" font-weight="bold" fill="#e11d48" text-anchor="middle">M</text>
      </g>
      <!-- Yellow -->
      <g transform="translate(275, 80)">
        <rect x="10" y="0" width="20" height="24" rx="3" fill="#eab308"/>
        <path d="M2 24 L38 24 L42 140 L0 140 Z" fill="#eab308"/>
        <rect x="5" y="60" width="30" height="50" rx="3" fill="#ffffff"/>
        <text x="20" y="90" font-family="Arial" font-size="11" font-weight="bold" fill="#ca8a04" text-anchor="middle">Y</text>
      </g>
    </svg>
  `),

  // 10. HP 712 Plotter Cartridge Pack
  hp712: makeSvgUrl(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="100%" height="100%">
      <rect x="80" y="90" width="240" height="120" rx="16" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2"/>
      <!-- 4 Cartridge Slots -->
      <rect x="95" y="110" width="50" height="80" rx="6" fill="#020617" stroke="#334155" stroke-width="1.5"/>
      <text x="120" y="155" font-family="Arial" font-size="11" font-weight="bold" fill="#ffffff" text-anchor="middle">80ml K</text>
      <rect x="155" y="110" width="45" height="80" rx="6" fill="#0284c7"/>
      <text x="177" y="155" font-family="Arial" font-size="11" font-weight="bold" fill="#ffffff" text-anchor="middle">29ml C</text>
      <rect x="210" y="110" width="45" height="80" rx="6" fill="#e11d48"/>
      <text x="232" y="155" font-family="Arial" font-size="11" font-weight="bold" fill="#ffffff" text-anchor="middle">29ml M</text>
      <rect x="265" y="110" width="45" height="80" rx="6" fill="#eab308"/>
      <text x="287" y="155" font-family="Arial" font-size="11" font-weight="bold" fill="#ffffff" text-anchor="middle">29ml Y</text>
      <text x="200" y="80" font-family="Arial" font-size="13" font-weight="bold" fill="#0096d6" text-anchor="middle">HP 712 DesignJet Set</text>
    </svg>
  `),

  // 11. Canon C-EXV 42 Copier Toner Tube
  canonCExv42: makeSvgUrl(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="100%" height="100%">
      <ellipse cx="200" cy="245" rx="130" ry="14" fill="#cbd5e1" opacity="0.6"/>
      <!-- Long Cylindrical Toner Bottle -->
      <rect x="60" y="115" width="280" height="70" rx="35" fill="#18181b" stroke="#3f3f46" stroke-width="2"/>
      <rect x="55" y="130" width="25" height="40" rx="6" fill="#dc2626"/>
      <rect x="290" y="125" width="40" height="50" rx="8" fill="#3f3f46"/>
      <!-- Label -->
      <rect x="110" y="128" width="160" height="44" rx="6" fill="#ffffff"/>
      <text x="190" y="148" font-family="Arial" font-size="12" font-weight="bold" fill="#dc2626" text-anchor="middle">Canon C-EXV 42</text>
      <text x="190" y="162" font-family="Arial" font-size="9" fill="#52525b" text-anchor="middle">10 200 Pages Heavy Yield</text>
    </svg>
  `),

  // 12. HP 59A JetIntelligence Toner
  hp59a: makeSvgUrl(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="100%" height="100%">
      <rect x="70" y="100" width="260" height="110" rx="20" fill="#0f172a" stroke="#334155" stroke-width="2"/>
      <!-- JetIntelligence Green Chip -->
      <rect x="85" y="115" width="20" height="15" rx="2" fill="#10b981"/>
      <!-- Drum Section -->
      <rect x="80" y="175" width="240" height="18" rx="6" fill="#047857" stroke="#10b981" stroke-width="1"/>
      <rect x="130" y="120" width="140" height="42" rx="6" fill="#0284c7"/>
      <text x="200" y="140" font-family="Arial" font-size="13" font-weight="900" fill="#ffffff" text-anchor="middle">HP 59A (CF259A)</text>
      <text x="200" y="154" font-family="Arial" font-size="8" font-weight="bold" fill="#e0f2fe" text-anchor="middle">JetIntelligence Original</text>
    </svg>
  `),
};
