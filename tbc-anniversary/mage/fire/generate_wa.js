/**
 * Tidekeeper — Fire Mage WeakAura Generator
 * ==========================================
 * TBC Anniversary 2026 | Fire Mage (DPS)
 */

const path = require('path');
const fs = require('fs');
const { encodeWeakAura, decodeWeakAura } = require('../../../lib/weakaura_encoder');
const C = require('../../_shared/wa_constants');
const B = require('../../_shared/wa_builder');

const CLASS = "MAGE";
const SPEC = "Fire";

// ============================================================================
// CORE COOLDOWNS — Primary DPS/utility CDs
// ============================================================================
// 8 icons: Combustion, Blast Wave, Dragon's Breath, Icy Veins,
//          Evocation, Counterspell, Trinket 1, Trinket 2
const corePos = B.centeredIconRow(8, C.ICON_SIZE, C.ICON_GAP);

const cdCombustion = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Combustion", uid: "tk_mag_fire_comb",
    spellName: "Combustion", xOffset: corePos[0],
});
const cdBlastWave = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Blast Wave", uid: "tk_mag_fire_bw",
    spellName: "Blast Wave", xOffset: corePos[1],
});
const cdDragonsBreath = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Dragon's Breath", uid: "tk_mag_fire_db",
    spellName: "Dragon's Breath", xOffset: corePos[2],
});
const cdIcyVeins = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Icy Veins", uid: "tk_mag_fire_iv",
    spellName: "Icy Veins", xOffset: corePos[3],
});
const cdEvocation = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Evocation", uid: "tk_mag_fire_evo",
    spellName: "Evocation", xOffset: corePos[4],
});
const cdCounterspell = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Counterspell", uid: "tk_mag_fire_cs",
    spellName: "Counterspell", xOffset: corePos[5],
});
const cdTrink1 = B.buildTrinketIcon(CLASS, {
    id: "TK - CD: Trinket 1", uid: "tk_mag_fire_t1",
    slot: 13, xOffset: corePos[6],
});
const cdTrink2 = B.buildTrinketIcon(CLASS, {
    id: "TK - CD: Trinket 2", uid: "tk_mag_fire_t2",
    slot: 14, xOffset: corePos[7],
});

// ============================================================================
// SECONDARY ROW — Utility cooldowns (below core icons)
// ============================================================================
const SEC_Y = C.ICON_Y - C.ICON_SIZE - 2;
const secPos = B.centeredIconRow(6, C.ICON_SIZE, C.ICON_GAP);

const cdIceBlock = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Ice Block", uid: "tk_mag_fire_ib",
    spellName: "Ice Block", xOffset: secPos[0], yOffset: SEC_Y,
});
const cdBlink = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Blink", uid: "tk_mag_fire_blink",
    spellName: "Blink", xOffset: secPos[1], yOffset: SEC_Y,
});
const cdManaShield = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Mana Shield", uid: "tk_mag_fire_ms",
    spellName: "Mana Shield", xOffset: secPos[2], yOffset: SEC_Y,
});
const cdPolymorph = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Polymorph", uid: "tk_mag_fire_poly",
    spellName: "Polymorph", xOffset: secPos[3], yOffset: SEC_Y,
});
const cdRemoveCurse = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Remove Curse", uid: "tk_mag_fire_rc",
    spellName: "Remove Curse", xOffset: secPos[4], yOffset: SEC_Y,
});
const cdFireBlast = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Fire Blast", uid: "tk_mag_fire_fb",
    spellName: "Fire Blast", xOffset: secPos[5], yOffset: SEC_Y,
});

// ============================================================================
// DOT TRACKING — Ignite on target, Scorch (Fire Vulnerability) on target
// ============================================================================
// NOTE: Living Bomb does NOT exist in TBC — skipped
// NOTE: Hot Streak does NOT exist in TBC — skipped
const dotIgnite = B.buildBuffIcon(CLASS, {
    id: "TK - DoT: Ignite", uid: "tk_mag_fire_ignite",
    spellName: "Ignite", xOffset: 180, yOffset: C.ICON_Y,
    unit: "target", ownOnly: true, debuffType: "HARMFUL",
});
const dotScorch = B.buildBuffIcon(CLASS, {
    id: "TK - Debuff: Fire Vulnerability", uid: "tk_mag_fire_scorch",
    spellName: "Fire Vulnerability", xOffset: 210, yOffset: C.ICON_Y,
    unit: "target", ownOnly: false, debuffType: "HARMFUL", showStacks: true,
});

// ============================================================================
// SELF-BUFF REMINDERS — Molten Armor, Arcane Intellect
// ============================================================================
const REMIND_Y = C.ICON_Y + C.ICON_SIZE + 4;
const remPos = B.centeredIconRow(2, C.ICON_SIZE, C.ICON_GAP);

const remMoltenArmor = B.buildMissingBuffReminder(CLASS, {
    id: "TK - Reminder: Molten Armor", uid: "tk_mag_fire_rem_ma",
    spellName: "Molten Armor", xOffset: remPos[0], yOffset: REMIND_Y,
});
const remArcaneIntellect = B.buildMissingBuffReminder(CLASS, {
    id: "TK - Reminder: Arcane Intellect", uid: "tk_mag_fire_rem_ai",
    spellName: "Arcane Intellect", xOffset: remPos[1], yOffset: REMIND_Y,
});

// ============================================================================
// SATED TRACKER (TBC Anniversary 2026)
// ============================================================================
const satedTracker = B.buildSatedTracker(CLASS, {
    id: "TK - Sated Tracker", uid: "tk_mag_fire_sated",
    xOffset: 240, yOffset: C.ICON_Y,
});

// ============================================================================
// BARS — Mana, 5SR, Tick Timer, Cast Bar
// ============================================================================
const manaBar = B.buildResourceBar(CLASS, {
    id: "TK - Mana Bar", uid: "tk_mag_fire_mana",
    powerType: C.POWER_TYPE.MANA,
});
const fsrTimer = B.buildFiveSecondRule(CLASS, {
    id: "TK - 5SR Timer", uid: "tk_mag_fire_5sr",
});
const tickTimer = B.buildTickTimer(CLASS, {
    id: "TK - Tick Timer", uid: "tk_mag_fire_tick",
});
const castBar = B.buildCastBar(CLASS, {
    id: "TK - Cast Bar", uid: "tk_mag_fire_cast",
});

// ============================================================================
// MASTER GROUP
// ============================================================================
const childAuras = [
    // Core row
    cdCombustion, cdBlastWave, cdDragonsBreath, cdIcyVeins, cdEvocation, cdCounterspell, cdTrink1, cdTrink2,
    // Secondary row
    cdIceBlock, cdBlink, cdManaShield, cdPolymorph, cdRemoveCurse, cdFireBlast,
    // DoT tracking
    dotIgnite, dotScorch,
    // Reminders
    remMoltenArmor, remArcaneIntellect,
    // Sated
    satedTracker,
    // Bars
    manaBar, fsrTimer, tickTimer, castBar,
];
const childNames = childAuras.map(a => a.id);

const masterGroup = B.buildGroup(CLASS, {
    id: "Tidekeeper - Mage Fire",
    uid: "tk_mage_fire",
    childNames,
    groupIcon: 135810,
});

childAuras.forEach(c => { c.parent = masterGroup.id; });

// ============================================================================
// ENCODE & OUTPUT
// ============================================================================
const groupWrapper = B.wrapGroupAura(masterGroup, childAuras);
console.log(`Encoding ${masterGroup.id}...`);
const fullImport = encodeWeakAura(groupWrapper);
console.log(`  Full import: ${fullImport.length} characters`);

let output = `# Tidekeeper — Fire Mage WeakAura Import Strings
# TBC Anniversary 2026
#
# Import the FULL GROUP string below into /wa → Import

================================================================================
 FULL GROUP IMPORT
================================================================================

${fullImport}
`;

const outPath = path.join(__dirname, 'Import_Strings.txt');
fs.writeFileSync(outPath, output, 'utf8');
console.log(`Written to: ${outPath}`);

// Verify
try {
    const decoded = decodeWeakAura(fullImport);
    const str = decoded.rawBuffer.toString('binary');
    const checks = ['Combustion', 'Blast Wave', "Dragon's Breath", 'Icy Veins',
                     'Evocation', 'Counterspell', 'Ignite', 'Fire Vulnerability',
                     'Molten Armor', 'Arcane Intellect', 'Sated', 'Mana Bar', 'Cast Bar'];
    const passed = checks.filter(c => str.includes(c));
    console.log(`  Verification: ${passed.length}/${checks.length} checks passed`);
    if (passed.length === checks.length) console.log("  VALID");
    else console.log("  Missing: " + checks.filter(c => !str.includes(c)).join(', '));
} catch (e) { console.log("  ERROR: " + e.message); }
