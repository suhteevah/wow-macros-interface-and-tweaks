/**
 * Tidekeeper HUD — Restoration Shaman WeakAura Generator
 * =======================================================
 * TBC Anniversary 2026 | Resto Shaman with Elemental offspec
 *
 * Uses shared framework from _shared/wa_builder.js and wa_constants.js
 * Generates paste-able import strings for /wa → Import
 */

const path = require('path');
const fs = require('fs');
const { encodeWeakAura, decodeWeakAura } = require('../../../lib/weakaura_encoder');
const C = require('../../_shared/wa_constants');
const B = require('../../_shared/wa_builder');

// ============================================================================
// SHAMAN RESTORATION — AURA DEFINITIONS
// ============================================================================

const CLASS = "SHAMAN";

// --- Icon Row Layout ---
// 8 icons (added Sated tracker): centered row at feet level
// 28px per icon, 0px gap = 224px total. First center = -224/2 + 14 = -98
const positions = B.centeredIconRow(8, C.ICON_SIZE, C.ICON_GAP);

// Core cooldown icons
const cdNS = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Nature's Swiftness",
    uid: "tk_cd_ns",
    spellName: "Nature's Swiftness",
    xOffset: positions[0],
});

const cdEM = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Elemental Mastery",
    uid: "tk_cd_em",
    spellName: "Elemental Mastery",
    xOffset: positions[1],
});

const cdMT = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Mana Tide Totem",
    uid: "tk_cd_mt",
    spellName: "Mana Tide Totem",
    xOffset: positions[2],
});

const cdHero = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Heroism",
    uid: "tk_cd_hero",
    spellName: "Heroism",
    xOffset: positions[3],
});

// Earth Shield — buff tracker with stacks (special handling)
const earthShield = B.buildBuffIcon(CLASS, {
    id: "TK - CD: Earth Shield",
    uid: "tidekeeper_cd_es",
    spellName: "Earth Shield",
    xOffset: positions[4],
    unit: "group",
    ownOnly: true,
    debuffType: "HELPFUL",
    showStacks: true,
});

// Add stack-based conditional coloring to Earth Shield
earthShield.conditions = {
    1: {
        check: { trigger: 1, variable: "stacks", op: ">=", value: "5" },
        changes: {
            1: { "property": "sub.3.glow", value: true },
            2: { "property": "sub.3.glowColor", value: C.COLORS.GLOW_ES_OK },
            3: { property: "desaturate", value: false },
        },
    },
    2: {
        check: { trigger: 1, variable: "stacks", op: "<=", value: "2" },
        changes: {
            1: { "property": "sub.3.glow", value: true },
            2: { "property": "sub.3.glowColor", value: C.COLORS.GLOW_ES_LOW },
            3: { property: "desaturate", value: false },
        },
    },
    3: {
        check: { trigger: 1, variable: "stacks", op: "==", value: "0" },
        changes: {
            1: { property: "desaturate", value: true },
            2: { "property": "sub.3.glow", value: true },
            3: { "property": "sub.3.glowColor", value: C.COLORS.GLOW_ES_NONE },
        },
    },
};
// Add glow subregion to Earth Shield
earthShield.subRegions[3] = {
    type: "subglow",
    glow: false,
    glowType: "Pixel",
    glowColor: C.COLORS.GLOW_ES_OK,
    glowLines: 8,
    glowLength: 6,
    glowThickness: 2,
    glowFrequency: 0.25,
    glowXOffset: 0,
    glowYOffset: 0,
    glowScale: 1,
};

// Trinkets
const cdTrink1 = B.buildTrinketIcon(CLASS, {
    id: "TK - CD: Trinket 1",
    uid: "tk_cd_t1",
    slot: 13,
    xOffset: positions[5],
});

const cdTrink2 = B.buildTrinketIcon(CLASS, {
    id: "TK - CD: Trinket 2",
    uid: "tk_cd_t2",
    slot: 14,
    xOffset: positions[6],
});

// Sated/Exhaustion tracker (NEW — TBC Anniversary 2026)
const satedTracker = B.buildSatedTracker(CLASS, {
    id: "TK - Sated Tracker",
    uid: "tk_sated",
    xOffset: positions[7],
});

// --- Bars ---
const manaBar = B.buildResourceBar(CLASS, {
    id: "TK - Mana Bar",
    uid: "tidekeeper_manabar",
    powerType: C.POWER_TYPE.MANA,
});

const fsrTimer = B.buildFiveSecondRule(CLASS, {
    id: "TK - 5SR Timer",
    uid: "tidekeeper_5sr",
});

const tickTimer = B.buildTickTimer(CLASS, {
    id: "TK - Tick Timer",
    uid: "tidekeeper_tick",
});

const castBar = B.buildCastBar(CLASS, {
    id: "TK - Cast Bar",
    uid: "tidekeeper_castbar",
});

// --- Master Group ---
const childAuras = [cdNS, cdEM, cdMT, cdHero, earthShield, cdTrink1, cdTrink2, satedTracker, manaBar, fsrTimer, tickTimer, castBar];
const childNames = childAuras.map(a => a.id);

const masterGroup = B.buildGroup(CLASS, {
    id: "Tidekeeper HUD",
    uid: "tidekeeper_hud",
    childNames,
    groupIcon: 136052,
});

// Set parent on all children
childAuras.forEach(c => { c.parent = "Tidekeeper HUD"; });

// ============================================================================
// ENCODE & OUTPUT
// ============================================================================

const groupWrapper = B.wrapGroupAura(masterGroup, childAuras);

console.log("Encoding Tidekeeper HUD (Restoration Shaman)...");
const fullImport = encodeWeakAura(groupWrapper);
console.log(`  Full group import string: ${fullImport.length} characters\n`);

// Individual imports
const individualImports = {};
const allAuras = [masterGroup, ...childAuras];
allAuras.forEach(aura => {
    const wrapper = B.wrapSingleAura(aura);
    const encoded = encodeWeakAura(wrapper);
    individualImports[aura.id] = encoded;
    console.log(`  ${aura.id}: ${encoded.length} chars`);
});

// Write output
let output = `# Tidekeeper HUD — Importable WeakAura Strings
# ==============================================
# TBC Anniversary 2026 | Resto Shaman
# Generated with shared framework v1.0
#
# HOW TO IMPORT:
# 1. Open World of Warcraft (TBC Anniversary client)
# 2. Type /wa to open WeakAuras
# 3. Click "Import" (top left)
# 4. Copy the ENTIRE string (including the ! at the start)
# 5. Paste it into the import box (Ctrl+V)
# 6. Click "Import" in the dialog
#
# RECOMMENDED: Import the FULL GROUP string first.

================================================================================
 FULL GROUP IMPORT (PASTE THIS ONE — CONTAINS EVERYTHING)
================================================================================

${fullImport}


================================================================================
 INDIVIDUAL IMPORTS (Optional — import pieces separately)
================================================================================

`;

for (const [name, str] of Object.entries(individualImports)) {
    output += `--- ${name} ---\n${str}\n\n`;
}

output += `
================================================================================
 WHAT'S INCLUDED
================================================================================

 Component                | Type          | Description
 -------------------------|---------------|--------------------------------------------
 Tidekeeper HUD           | Group         | Master container
 TK - Mana Bar            | Progress Bar  | ${C.BAR_WIDTH}x${C.BAR_HEIGHT_MAIN}, dynamic color (blue/teal/red)
 TK - 5SR Timer           | Progress Bar  | ${C.BAR_WIDTH}x${C.BAR_HEIGHT_THIN}, orange 5-second rule timer
 TK - Tick Timer           | Progress Bar  | ${C.BAR_WIDTH}x${C.BAR_HEIGHT_THIN}, cyan 2s mana regen tick
 TK - Cast Bar            | Progress Bar  | ${C.BAR_WIDTH}x${C.BAR_HEIGHT_THIN}, green cast progress
 TK - CD: Nature's Swift  | Icon          | Panic button cooldown
 TK - CD: Elem Mastery    | Icon          | Instant crit CD (Elemental talent)
 TK - CD: Mana Tide       | Icon          | Group mana cooldown
 TK - CD: Heroism         | Icon          | Raid-wide cooldown (TBC Anniversary)
 TK - CD: Earth Shield    | Icon          | Buff charge tracker (color by stacks)
 TK - CD: Trinket 1       | Icon          | Trinket slot 13
 TK - CD: Trinket 2       | Icon          | Trinket slot 14
 TK - Sated Tracker       | Icon          | NEW: Sated/Exhaustion debuff (10min)

================================================================================
 LAYOUT (Visual)
================================================================================

    [NS]  [EM]  [MT] [Hero] [ES]  [T1]  [T2] [Sated]  ← Cooldowns
    ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░░░░░░░        ← Mana bar
    ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━        ← 5SR timer
    ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━        ← Tick / Cast bar

================================================================================
 TBC ANNIVERSARY 2026 CHANGES
================================================================================

 - Heroism/Bloodlust is now RAID-WIDE (not party-only)
 - 10-minute Sated/Exhaustion debuff after Hero/BL
 - Cooldowns reset on boss kill or wipe
 - Sated Tracker icon shows remaining debuff time

================================================================================
 TROUBLESHOOTING
================================================================================

 If import fails:
  - Make sure you copied the ENTIRE string (starts with !)
  - Try /reload then import again
  - Check WeakAuras addon is up to date

 If auras don't show:
  - Check Load tab → Class must be Shaman
  - 5SR and Tick bars only show in combat or when mana < 100%
  - Cooldown icons show always (desaturated when on CD)
  - Cast bar only shows while casting
  - Sated tracker only shows when debuff is active

 If tick timer desyncs after death:
  - Type /reload to reset the timer
`;

const outPath = path.join(__dirname, 'Tidekeeper_Import_Strings.txt');
fs.writeFileSync(outPath, output, 'utf8');
console.log(`\n✅ Written to: ${outPath}`);
console.log(`   Full group import: ${fullImport.length} characters`);
console.log(`   Individual imports: ${Object.keys(individualImports).length} auras`);

// ============================================================================
// VERIFICATION
// ============================================================================

console.log(`\n--- Verification ---`);
try {
    const decoded = decodeWeakAura(fullImport);
    const inflatedStr = decoded.rawBuffer.toString('binary');

    console.log(`   Format: !WA:2! (LibSerialize v2)`);
    console.log(`   Decoded version: ${decoded.version} (should be 2)`);
    console.log(`   Inflated size: ${decoded.rawBuffer.length} bytes`);
    console.log(`   LibSerialize version byte: ${decoded.rawBuffer[0]} (should be 1)`);

    const checks = [
        ['Tidekeeper HUD', inflatedStr.includes('Tidekeeper HUD')],
        ['TK - Mana Bar', inflatedStr.includes('TK - Mana Bar')],
        ['TK - 5SR Timer', inflatedStr.includes('TK - 5SR Timer')],
        ['TK - Tick Timer', inflatedStr.includes('TK - Tick Timer')],
        ['TK - Cast Bar', inflatedStr.includes('TK - Cast Bar')],
        ['TK - Sated Tracker', inflatedStr.includes('TK - Sated Tracker')],
        ['5SR trigger code', inflatedStr.includes('lastManaSpend')],
        ['Tick trigger code', inflatedStr.includes('lastTickTime')],
        ['Nature\'s Swiftness', inflatedStr.includes("Nature's Swiftness")],
        ['Elemental Mastery', inflatedStr.includes('Elemental Mastery')],
        ['Mana Tide Totem', inflatedStr.includes('Mana Tide Totem')],
        ['Heroism', inflatedStr.includes('Heroism')],
        ['Earth Shield', inflatedStr.includes('Earth Shield')],
        ['Sated', inflatedStr.includes('Sated')],
        ['Exhaustion', inflatedStr.includes('Exhaustion')],
        ['aurabar region', inflatedStr.includes('aurabar')],
        ['icon region', inflatedStr.includes('icon')],
    ];

    let allPass = true;
    for (const [name, pass] of checks) {
        if (!pass) {
            console.log(`   MISSING: ${name}`);
            allPass = false;
        }
    }

    if (decoded.version === 2 && decoded.rawBuffer[0] === 1 && allPass) {
        console.log(`   All ${checks.length} content checks: PASSED`);
        console.log(`   ✅ VALID v2 import string with correct wrapper structure`);
    } else {
        console.log(`   ❌ VALIDATION FAILED`);
    }
} catch (err) {
    console.log(`   ❌ DECODE ERROR: ${err.message}`);
}
