/**
 * Tidekeeper — Arcane Mage WeakAura Generator
 * =============================================
 * TBC Anniversary 2026 | Arcane Mage (DPS)
 */

const path = require('path');
const fs = require('fs');
const { encodeWeakAura, decodeWeakAura } = require('../../../lib/weakaura_encoder');
const C = require('../../_shared/wa_constants');
const B = require('../../_shared/wa_builder');

const CLASS = "MAGE";
const SPEC = "Arcane";

// ============================================================================
// CORE COOLDOWNS — Primary DPS/utility CDs
// ============================================================================
// 8 icons: Arcane Power, Presence of Mind, Icy Veins, Evocation,
//          Counterspell, Cold Snap, Trinket 1, Trinket 2
const corePos = B.centeredIconRow(8, C.ICON_SIZE, C.ICON_GAP);

const cdArcanePower = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Arcane Power", uid: "tk_mag_arc_ap",
    spellName: "Arcane Power", xOffset: corePos[0],
});
const cdPoM = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Presence of Mind", uid: "tk_mag_arc_pom",
    spellName: "Presence of Mind", xOffset: corePos[1],
});
const cdIcyVeins = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Icy Veins", uid: "tk_mag_arc_iv",
    spellName: "Icy Veins", xOffset: corePos[2],
});
const cdEvocation = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Evocation", uid: "tk_mag_arc_evo",
    spellName: "Evocation", xOffset: corePos[3],
});
const cdCounterspell = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Counterspell", uid: "tk_mag_arc_cs",
    spellName: "Counterspell", xOffset: corePos[4],
});
const cdColdSnap = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Cold Snap", uid: "tk_mag_arc_snap",
    spellName: "Cold Snap", xOffset: corePos[5],
});
const cdTrink1 = B.buildTrinketIcon(CLASS, {
    id: "TK - CD: Trinket 1", uid: "tk_mag_arc_t1",
    slot: 13, xOffset: corePos[6],
});
const cdTrink2 = B.buildTrinketIcon(CLASS, {
    id: "TK - CD: Trinket 2", uid: "tk_mag_arc_t2",
    slot: 14, xOffset: corePos[7],
});

// ============================================================================
// SECONDARY ROW — Utility cooldowns (below core icons)
// ============================================================================
const SEC_Y = C.ICON_Y - C.ICON_SIZE - 2;
const secPos = B.centeredIconRow(6, C.ICON_SIZE, C.ICON_GAP);

const cdIceBlock = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Ice Block", uid: "tk_mag_arc_ib",
    spellName: "Ice Block", xOffset: secPos[0], yOffset: SEC_Y,
});
const cdBlink = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Blink", uid: "tk_mag_arc_blink",
    spellName: "Blink", xOffset: secPos[1], yOffset: SEC_Y,
});
const cdManaShield = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Mana Shield", uid: "tk_mag_arc_ms",
    spellName: "Mana Shield", xOffset: secPos[2], yOffset: SEC_Y,
});
const cdPolymorph = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Polymorph", uid: "tk_mag_arc_poly",
    spellName: "Polymorph", xOffset: secPos[3], yOffset: SEC_Y,
});
const cdRemoveCurse = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Remove Curse", uid: "tk_mag_arc_rc",
    spellName: "Remove Curse", xOffset: secPos[4], yOffset: SEC_Y,
});
const cdArcaneExplosion = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Arcane Explosion", uid: "tk_mag_arc_ae",
    spellName: "Arcane Explosion", xOffset: secPos[5], yOffset: SEC_Y,
});

// ============================================================================
// BUFF TRACKING — Arcane Blast debuff stacks on self
// ============================================================================
const buffArcaneBlast = B.buildBuffIcon(CLASS, {
    id: "TK - Debuff: Arcane Blast", uid: "tk_mag_arc_ab",
    spellName: "Arcane Blast", xOffset: 180, yOffset: C.ICON_Y,
    unit: "player", ownOnly: true, debuffType: "HARMFUL", showStacks: true,
});

// ============================================================================
// PROC TRACKING — Clearcasting (free spell proc)
// ============================================================================
const procClearcasting = B.buildBuffIcon(CLASS, {
    id: "TK - Proc: Clearcasting", uid: "tk_mag_arc_cc",
    spellName: "Clearcasting", xOffset: 210, yOffset: C.ICON_Y,
    unit: "player", ownOnly: true, debuffType: "HELPFUL",
});

// ============================================================================
// SELF-BUFF REMINDERS — Arcane Intellect, Mage Armor
// ============================================================================
const REMIND_Y = C.ICON_Y + C.ICON_SIZE + 4;
const remPos = B.centeredIconRow(2, C.ICON_SIZE, C.ICON_GAP);

const remArcaneIntellect = B.buildMissingBuffReminder(CLASS, {
    id: "TK - Reminder: Arcane Intellect", uid: "tk_mag_arc_rem_ai",
    spellName: "Arcane Intellect", xOffset: remPos[0], yOffset: REMIND_Y,
});
const remMageArmor = B.buildMissingBuffReminder(CLASS, {
    id: "TK - Reminder: Mage Armor", uid: "tk_mag_arc_rem_ma",
    spellName: "Mage Armor", xOffset: remPos[1], yOffset: REMIND_Y,
});

// ============================================================================
// SATED TRACKER (TBC Anniversary 2026)
// ============================================================================
const satedTracker = B.buildSatedTracker(CLASS, {
    id: "TK - Sated Tracker", uid: "tk_mag_arc_sated",
    xOffset: 240, yOffset: C.ICON_Y,
});

// ============================================================================
// BARS — Mana, 5SR, Tick Timer, Cast Bar
// ============================================================================
const manaBar = B.buildResourceBar(CLASS, {
    id: "TK - Mana Bar", uid: "tk_mag_arc_mana",
    powerType: C.POWER_TYPE.MANA,
});
const fsrTimer = B.buildFiveSecondRule(CLASS, {
    id: "TK - 5SR Timer", uid: "tk_mag_arc_5sr",
});
const tickTimer = B.buildTickTimer(CLASS, {
    id: "TK - Tick Timer", uid: "tk_mag_arc_tick",
});
const castBar = B.buildCastBar(CLASS, {
    id: "TK - Cast Bar", uid: "tk_mag_arc_cast",
});

// ============================================================================
// MASTER GROUP
// ============================================================================
const childAuras = [
    // Core row
    cdArcanePower, cdPoM, cdIcyVeins, cdEvocation, cdCounterspell, cdColdSnap, cdTrink1, cdTrink2,
    // Secondary row
    cdIceBlock, cdBlink, cdManaShield, cdPolymorph, cdRemoveCurse, cdArcaneExplosion,
    // Buff tracking
    buffArcaneBlast,
    // Proc tracking
    procClearcasting,
    // Reminders
    remArcaneIntellect, remMageArmor,
    // Sated
    satedTracker,
    // Bars
    manaBar, fsrTimer, tickTimer, castBar,
];
const childNames = childAuras.map(a => a.id);

const masterGroup = B.buildGroup(CLASS, {
    id: "Tidekeeper - Mage Arcane",
    uid: "tk_mage_arcane",
    childNames,
    groupIcon: 135932,
});

childAuras.forEach(c => { c.parent = masterGroup.id; });

// ============================================================================
// ENCODE & OUTPUT
// ============================================================================
const groupWrapper = B.wrapGroupAura(masterGroup, childAuras);
console.log(`Encoding ${masterGroup.id}...`);
const fullImport = encodeWeakAura(groupWrapper);
console.log(`  Full import: ${fullImport.length} characters`);

let output = `# Tidekeeper — Arcane Mage WeakAura Import Strings
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
    const checks = ['Arcane Power', 'Presence of Mind', 'Icy Veins', 'Evocation',
                     'Counterspell', 'Cold Snap', 'Arcane Blast', 'Clearcasting',
                     'Arcane Intellect', 'Mage Armor', 'Sated', 'Mana Bar', 'Cast Bar'];
    const passed = checks.filter(c => str.includes(c));
    console.log(`  Verification: ${passed.length}/${checks.length} checks passed`);
    if (passed.length === checks.length) console.log("  VALID");
    else console.log("  Missing: " + checks.filter(c => !str.includes(c)).join(', '));
} catch (e) { console.log("  ERROR: " + e.message); }
