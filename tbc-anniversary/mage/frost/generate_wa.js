/**
 * Tidekeeper — Frost Mage WeakAura Generator
 * ============================================
 * TBC Anniversary 2026 | Frost Mage (DPS/PvP)
 */

const path = require('path');
const fs = require('fs');
const { encodeWeakAura, decodeWeakAura } = require('../../../lib/weakaura_encoder');
const C = require('../../_shared/wa_constants');
const B = require('../../_shared/wa_builder');

const CLASS = "MAGE";
const SPEC = "Frost";

// ============================================================================
// CORE COOLDOWNS — Primary DPS/utility CDs
// ============================================================================
// 8 icons: Cold Snap, Ice Block, Icy Veins, Summon Water Elemental,
//          Evocation, Counterspell, Trinket 1, Trinket 2
const corePos = B.centeredIconRow(8, C.ICON_SIZE, C.ICON_GAP);

const cdColdSnap = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Cold Snap", uid: "tk_mag_frost_snap",
    spellName: "Cold Snap", xOffset: corePos[0],
});
const cdIceBlock = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Ice Block", uid: "tk_mag_frost_ib",
    spellName: "Ice Block", xOffset: corePos[1],
});
const cdIcyVeins = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Icy Veins", uid: "tk_mag_frost_iv",
    spellName: "Icy Veins", xOffset: corePos[2],
});
const cdWaterEle = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Summon Water Elemental", uid: "tk_mag_frost_ele",
    spellName: "Summon Water Elemental", xOffset: corePos[3],
});
const cdEvocation = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Evocation", uid: "tk_mag_frost_evo",
    spellName: "Evocation", xOffset: corePos[4],
});
const cdCounterspell = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Counterspell", uid: "tk_mag_frost_cs",
    spellName: "Counterspell", xOffset: corePos[5],
});
const cdTrink1 = B.buildTrinketIcon(CLASS, {
    id: "TK - CD: Trinket 1", uid: "tk_mag_frost_t1",
    slot: 13, xOffset: corePos[6],
});
const cdTrink2 = B.buildTrinketIcon(CLASS, {
    id: "TK - CD: Trinket 2", uid: "tk_mag_frost_t2",
    slot: 14, xOffset: corePos[7],
});

// ============================================================================
// SECONDARY ROW — Utility cooldowns (below core icons)
// ============================================================================
const SEC_Y = C.ICON_Y - C.ICON_SIZE - 2;
const secPos = B.centeredIconRow(6, C.ICON_SIZE, C.ICON_GAP);

const cdBlink = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Blink", uid: "tk_mag_frost_blink",
    spellName: "Blink", xOffset: secPos[0], yOffset: SEC_Y,
});
const cdFrostNova = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Frost Nova", uid: "tk_mag_frost_fn",
    spellName: "Frost Nova", xOffset: secPos[1], yOffset: SEC_Y,
});
const cdManaShield = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Mana Shield", uid: "tk_mag_frost_ms",
    spellName: "Mana Shield", xOffset: secPos[2], yOffset: SEC_Y,
});
const cdPolymorph = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Polymorph", uid: "tk_mag_frost_poly",
    spellName: "Polymorph", xOffset: secPos[3], yOffset: SEC_Y,
});
const cdRemoveCurse = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Remove Curse", uid: "tk_mag_frost_rc",
    spellName: "Remove Curse", xOffset: secPos[4], yOffset: SEC_Y,
});
const cdConeOfCold = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Cone of Cold", uid: "tk_mag_frost_coc",
    spellName: "Cone of Cold", xOffset: secPos[5], yOffset: SEC_Y,
});

// ============================================================================
// PROC TRACKING — Clearcasting
// ============================================================================
// NOTE: Fingers of Frost does NOT exist in TBC — skipped
const procClearcasting = B.buildBuffIcon(CLASS, {
    id: "TK - Proc: Clearcasting", uid: "tk_mag_frost_cc",
    spellName: "Clearcasting", xOffset: 180, yOffset: C.ICON_Y,
    unit: "player", ownOnly: true, debuffType: "HELPFUL",
});

// ============================================================================
// BUFF TRACKING — Ice Barrier active, Water Elemental active
// ============================================================================
const buffIceBarrier = B.buildBuffIcon(CLASS, {
    id: "TK - Buff: Ice Barrier", uid: "tk_mag_frost_barrier",
    spellName: "Ice Barrier", xOffset: 210, yOffset: C.ICON_Y,
    unit: "player", ownOnly: true, debuffType: "HELPFUL",
});
const buffWaterEle = B.buildBuffIcon(CLASS, {
    id: "TK - Buff: Water Elemental", uid: "tk_mag_frost_eleup",
    spellName: "Summon Water Elemental", xOffset: 240, yOffset: C.ICON_Y,
    unit: "player", ownOnly: true, debuffType: "HELPFUL",
});

// ============================================================================
// SELF-BUFF REMINDERS — Ice Armor, Arcane Intellect
// ============================================================================
const REMIND_Y = C.ICON_Y + C.ICON_SIZE + 4;
const remPos = B.centeredIconRow(2, C.ICON_SIZE, C.ICON_GAP);

const remIceArmor = B.buildMissingBuffReminder(CLASS, {
    id: "TK - Reminder: Ice Armor", uid: "tk_mag_frost_rem_ia",
    spellName: "Ice Armor", xOffset: remPos[0], yOffset: REMIND_Y,
});
const remArcaneIntellect = B.buildMissingBuffReminder(CLASS, {
    id: "TK - Reminder: Arcane Intellect", uid: "tk_mag_frost_rem_ai",
    spellName: "Arcane Intellect", xOffset: remPos[1], yOffset: REMIND_Y,
});

// ============================================================================
// SATED TRACKER (TBC Anniversary 2026)
// ============================================================================
const satedTracker = B.buildSatedTracker(CLASS, {
    id: "TK - Sated Tracker", uid: "tk_mag_frost_sated",
    xOffset: 270, yOffset: C.ICON_Y,
});

// ============================================================================
// BARS — Mana, 5SR, Tick Timer, Cast Bar
// ============================================================================
const manaBar = B.buildResourceBar(CLASS, {
    id: "TK - Mana Bar", uid: "tk_mag_frost_mana",
    powerType: C.POWER_TYPE.MANA,
});
const fsrTimer = B.buildFiveSecondRule(CLASS, {
    id: "TK - 5SR Timer", uid: "tk_mag_frost_5sr",
});
const tickTimer = B.buildTickTimer(CLASS, {
    id: "TK - Tick Timer", uid: "tk_mag_frost_tick",
});
const castBar = B.buildCastBar(CLASS, {
    id: "TK - Cast Bar", uid: "tk_mag_frost_cast",
});

// ============================================================================
// MASTER GROUP
// ============================================================================
const childAuras = [
    // Core row
    cdColdSnap, cdIceBlock, cdIcyVeins, cdWaterEle, cdEvocation, cdCounterspell, cdTrink1, cdTrink2,
    // Secondary row
    cdBlink, cdFrostNova, cdManaShield, cdPolymorph, cdRemoveCurse, cdConeOfCold,
    // Proc tracking
    procClearcasting,
    // Buff tracking
    buffIceBarrier, buffWaterEle,
    // Reminders
    remIceArmor, remArcaneIntellect,
    // Sated
    satedTracker,
    // Bars
    manaBar, fsrTimer, tickTimer, castBar,
];
const childNames = childAuras.map(a => a.id);

const masterGroup = B.buildGroup(CLASS, {
    id: "Tidekeeper - Mage Frost",
    uid: "tk_mage_frost",
    childNames,
    groupIcon: 135846,
});

childAuras.forEach(c => { c.parent = masterGroup.id; });

// ============================================================================
// ENCODE & OUTPUT
// ============================================================================
const groupWrapper = B.wrapGroupAura(masterGroup, childAuras);
console.log(`Encoding ${masterGroup.id}...`);
const fullImport = encodeWeakAura(groupWrapper);
console.log(`  Full import: ${fullImport.length} characters`);

let output = `# Tidekeeper — Frost Mage WeakAura Import Strings
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
    const checks = ['Cold Snap', 'Ice Block', 'Icy Veins', 'Summon Water Elemental',
                     'Evocation', 'Counterspell', 'Clearcasting', 'Ice Barrier',
                     'Ice Armor', 'Arcane Intellect', 'Sated', 'Mana Bar', 'Cast Bar'];
    const passed = checks.filter(c => str.includes(c));
    console.log(`  Verification: ${passed.length}/${checks.length} checks passed`);
    if (passed.length === checks.length) console.log("  VALID");
    else console.log("  Missing: " + checks.filter(c => !str.includes(c)).join(', '));
} catch (e) { console.log("  ERROR: " + e.message); }
