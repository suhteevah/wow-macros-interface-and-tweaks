/**
 * Tidekeeper — Assassination Rogue WeakAura Generator
 * =====================================================
 * TBC Anniversary 2026 | Assassination Rogue (DPS)
 */

const path = require('path');
const fs = require('fs');
const { encodeWeakAura, decodeWeakAura } = require('../../../lib/weakaura_encoder');
const C = require('../../_shared/wa_constants');
const B = require('../../_shared/wa_builder');

const CLASS = "ROGUE";
const SPEC = "Assassination";

// ============================================================================
// CORE COOLDOWNS — Primary CDs
// ============================================================================
// 8 icons: Cold Blood, Cloak of Shadows, Vanish, Evasion, Sprint, Blind, Trinket 1, Trinket 2
const corePos = B.centeredIconRow(8, C.ICON_SIZE, C.ICON_GAP);

const cdColdBlood = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Cold Blood", uid: "tk_rog_ass_cb",
    spellName: "Cold Blood", xOffset: corePos[0],
});
const cdCloak = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Cloak of Shadows", uid: "tk_rog_ass_cloak",
    spellName: "Cloak of Shadows", xOffset: corePos[1],
});
const cdVanish = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Vanish", uid: "tk_rog_ass_vanish",
    spellName: "Vanish", xOffset: corePos[2],
});
const cdEvasion = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Evasion", uid: "tk_rog_ass_evasion",
    spellName: "Evasion", xOffset: corePos[3],
});
const cdSprint = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Sprint", uid: "tk_rog_ass_sprint",
    spellName: "Sprint", xOffset: corePos[4],
});
const cdBlind = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Blind", uid: "tk_rog_ass_blind",
    spellName: "Blind", xOffset: corePos[5],
});
const cdTrink1 = B.buildTrinketIcon(CLASS, {
    id: "TK - CD: Trinket 1", uid: "tk_rog_ass_t1",
    slot: 13, xOffset: corePos[6],
});
const cdTrink2 = B.buildTrinketIcon(CLASS, {
    id: "TK - CD: Trinket 2", uid: "tk_rog_ass_t2",
    slot: 14, xOffset: corePos[7],
});

// ============================================================================
// SECONDARY ROW — Utility cooldowns (below core icons)
// ============================================================================
const SEC_Y = C.ICON_Y - C.ICON_SIZE - 2; // Below core row
const secPos = B.centeredIconRow(6, C.ICON_SIZE, C.ICON_GAP);

const cdKick = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Kick", uid: "tk_rog_ass_kick",
    spellName: "Kick", xOffset: secPos[0], yOffset: SEC_Y,
});
const cdSap = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Sap", uid: "tk_rog_ass_sap",
    spellName: "Sap", xOffset: secPos[1], yOffset: SEC_Y,
});
const cdPrep = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Preparation", uid: "tk_rog_ass_prep",
    spellName: "Preparation", xOffset: secPos[2], yOffset: SEC_Y,
});
const cdKidney = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Kidney Shot", uid: "tk_rog_ass_kidney",
    spellName: "Kidney Shot", xOffset: secPos[3], yOffset: SEC_Y,
});
const cdBladeFlurry = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Blade Flurry", uid: "tk_rog_ass_bf",
    spellName: "Blade Flurry", xOffset: secPos[4], yOffset: SEC_Y,
});
const cdGouge = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Gouge", uid: "tk_rog_ass_gouge",
    spellName: "Gouge", xOffset: secPos[5], yOffset: SEC_Y,
});

// ============================================================================
// DOT/DEBUFF TRACKING — Target debuffs and self buffs
// ============================================================================
const DOT_Y = C.ICON_Y + C.ICON_SIZE + 4; // Above core row
const dotPos = B.centeredIconRow(4, C.ICON_SIZE, C.ICON_GAP);

const dotRupture = B.buildBuffIcon(CLASS, {
    id: "TK - DoT: Rupture", uid: "tk_rog_ass_rupture",
    spellName: "Rupture", xOffset: dotPos[0], yOffset: DOT_Y,
    unit: "target", ownOnly: true, debuffType: "HARMFUL",
});
const dotDeadlyPoison = B.buildBuffIcon(CLASS, {
    id: "TK - Debuff: Deadly Poison", uid: "tk_rog_ass_dp",
    spellName: "Deadly Poison", xOffset: dotPos[1], yOffset: DOT_Y,
    unit: "target", ownOnly: true, debuffType: "HARMFUL", showStacks: true,
});
const buffSND = B.buildBuffIcon(CLASS, {
    id: "TK - Buff: Slice and Dice", uid: "tk_rog_ass_snd",
    spellName: "Slice and Dice", xOffset: dotPos[2], yOffset: DOT_Y,
    unit: "player", ownOnly: true, debuffType: "HELPFUL",
});
const dotExposeArmor = B.buildBuffIcon(CLASS, {
    id: "TK - Debuff: Expose Armor", uid: "tk_rog_ass_ea",
    spellName: "Expose Armor", xOffset: dotPos[3], yOffset: DOT_Y,
    unit: "target", ownOnly: true, debuffType: "HARMFUL",
});

// ============================================================================
// SELF-BUFF REMINDERS — Poisons on weapons
// ============================================================================
const REMIND_Y = DOT_Y + C.ICON_SIZE + 4; // Above DoT row
const remPos = B.centeredIconRow(2, C.ICON_SIZE, C.ICON_GAP);

const remDeadlyPoison = B.buildMissingBuffReminder(CLASS, {
    id: "TK - Reminder: Deadly Poison", uid: "tk_rog_ass_rem_dp",
    spellName: "Deadly Poison", xOffset: remPos[0], yOffset: REMIND_Y,
});
const remInstantPoison = B.buildMissingBuffReminder(CLASS, {
    id: "TK - Reminder: Instant Poison", uid: "tk_rog_ass_rem_ip",
    spellName: "Instant Poison", xOffset: remPos[1], yOffset: REMIND_Y,
});

// ============================================================================
// SATED TRACKER (TBC Anniversary 2026)
// ============================================================================
const satedTracker = B.buildSatedTracker(CLASS, {
    id: "TK - Sated Tracker", uid: "tk_rog_ass_sated",
    xOffset: 210, yOffset: C.ICON_Y,
});

// ============================================================================
// BARS — Energy, Cast Bar (NO 5SR/Tick — not a mana class)
// ============================================================================
const energyBar = B.buildResourceBar(CLASS, {
    id: "TK - Energy Bar", uid: "tk_rog_ass_energy",
    powerType: C.POWER_TYPE.ENERGY,
});
const castBar = B.buildCastBar(CLASS, {
    id: "TK - Cast Bar", uid: "tk_rog_ass_cast",
});

// ============================================================================
// MASTER GROUP
// ============================================================================
const childAuras = [
    // Core row
    cdColdBlood, cdCloak, cdVanish, cdEvasion, cdSprint, cdBlind, cdTrink1, cdTrink2,
    // Secondary row
    cdKick, cdSap, cdPrep, cdKidney, cdBladeFlurry, cdGouge,
    // DoT/Debuff tracking
    dotRupture, dotDeadlyPoison, buffSND, dotExposeArmor,
    // Reminders
    remDeadlyPoison, remInstantPoison,
    // Sated
    satedTracker,
    // Bars
    energyBar, castBar,
];
const childNames = childAuras.map(a => a.id);

const masterGroup = B.buildGroup(CLASS, {
    id: "Tidekeeper - Rogue Assassination",
    uid: "tk_rogue_ass",
    childNames,
    groupIcon: 132292, // Assassination icon
});

childAuras.forEach(c => { c.parent = masterGroup.id; });

// ============================================================================
// ENCODE & OUTPUT
// ============================================================================
const groupWrapper = B.wrapGroupAura(masterGroup, childAuras);
console.log(`Encoding ${masterGroup.id}...`);
const fullImport = encodeWeakAura(groupWrapper);
console.log(`  Full import: ${fullImport.length} characters`);

let output = `# Tidekeeper — Assassination Rogue WeakAura Import Strings
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
    const checks = ['Cold Blood', 'Cloak of Shadows', 'Vanish', 'Evasion', 'Sprint',
                     'Kick', 'Rupture', 'Deadly Poison', 'Slice and Dice',
                     'Sated', 'Energy Bar', 'Cast Bar'];
    const passed = checks.filter(c => str.includes(c));
    console.log(`  Verification: ${passed.length}/${checks.length} checks passed`);
    if (passed.length === checks.length) console.log("  VALID");
    else console.log("  Missing: " + checks.filter(c => !str.includes(c)).join(', '));
} catch (e) { console.log("  ERROR: " + e.message); }
