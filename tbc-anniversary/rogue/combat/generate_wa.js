/**
 * Tidekeeper — Combat Rogue WeakAura Generator
 * ===============================================
 * TBC Anniversary 2026 | Combat Rogue (DPS)
 */

const path = require('path');
const fs = require('fs');
const { encodeWeakAura, decodeWeakAura } = require('../../../lib/weakaura_encoder');
const C = require('../../_shared/wa_constants');
const B = require('../../_shared/wa_builder');

const CLASS = "ROGUE";
const SPEC = "Combat";

// ============================================================================
// CORE COOLDOWNS — Primary CDs
// ============================================================================
// 8 icons: Blade Flurry, Adrenaline Rush, Cloak of Shadows, Vanish, Evasion, Sprint, Trinket 1, Trinket 2
const corePos = B.centeredIconRow(8, C.ICON_SIZE, C.ICON_GAP);

const cdBladeFlurry = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Blade Flurry", uid: "tk_rog_com_bf",
    spellName: "Blade Flurry", xOffset: corePos[0],
});
const cdAdrenalineRush = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Adrenaline Rush", uid: "tk_rog_com_ar",
    spellName: "Adrenaline Rush", xOffset: corePos[1],
});
const cdCloak = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Cloak of Shadows", uid: "tk_rog_com_cloak",
    spellName: "Cloak of Shadows", xOffset: corePos[2],
});
const cdVanish = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Vanish", uid: "tk_rog_com_vanish",
    spellName: "Vanish", xOffset: corePos[3],
});
const cdEvasion = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Evasion", uid: "tk_rog_com_evasion",
    spellName: "Evasion", xOffset: corePos[4],
});
const cdSprint = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Sprint", uid: "tk_rog_com_sprint",
    spellName: "Sprint", xOffset: corePos[5],
});
const cdTrink1 = B.buildTrinketIcon(CLASS, {
    id: "TK - CD: Trinket 1", uid: "tk_rog_com_t1",
    slot: 13, xOffset: corePos[6],
});
const cdTrink2 = B.buildTrinketIcon(CLASS, {
    id: "TK - CD: Trinket 2", uid: "tk_rog_com_t2",
    slot: 14, xOffset: corePos[7],
});

// ============================================================================
// SECONDARY ROW — Utility cooldowns (below core icons)
// ============================================================================
const SEC_Y = C.ICON_Y - C.ICON_SIZE - 2; // Below core row
const secPos = B.centeredIconRow(6, C.ICON_SIZE, C.ICON_GAP);

const cdKick = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Kick", uid: "tk_rog_com_kick",
    spellName: "Kick", xOffset: secPos[0], yOffset: SEC_Y,
});
const cdBlind = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Blind", uid: "tk_rog_com_blind",
    spellName: "Blind", xOffset: secPos[1], yOffset: SEC_Y,
});
const cdSap = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Sap", uid: "tk_rog_com_sap",
    spellName: "Sap", xOffset: secPos[2], yOffset: SEC_Y,
});
const cdKidney = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Kidney Shot", uid: "tk_rog_com_kidney",
    spellName: "Kidney Shot", xOffset: secPos[3], yOffset: SEC_Y,
});
const cdRiposte = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Riposte", uid: "tk_rog_com_riposte",
    spellName: "Riposte", xOffset: secPos[4], yOffset: SEC_Y,
});
const cdGouge = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Gouge", uid: "tk_rog_com_gouge",
    spellName: "Gouge", xOffset: secPos[5], yOffset: SEC_Y,
});

// ============================================================================
// BUFF TRACKING — Self buffs and target debuffs
// ============================================================================
const BUFF_Y = C.ICON_Y + C.ICON_SIZE + 4; // Above core row
const buffPos = B.centeredIconRow(4, C.ICON_SIZE, C.ICON_GAP);

const buffSND = B.buildBuffIcon(CLASS, {
    id: "TK - Buff: Slice and Dice", uid: "tk_rog_com_snd",
    spellName: "Slice and Dice", xOffset: buffPos[0], yOffset: BUFF_Y,
    unit: "player", ownOnly: true, debuffType: "HELPFUL",
});
const buffBF = B.buildBuffIcon(CLASS, {
    id: "TK - Buff: Blade Flurry", uid: "tk_rog_com_bfbuff",
    spellName: "Blade Flurry", xOffset: buffPos[1], yOffset: BUFF_Y,
    unit: "player", ownOnly: true, debuffType: "HELPFUL",
});
const buffAR = B.buildBuffIcon(CLASS, {
    id: "TK - Buff: Adrenaline Rush", uid: "tk_rog_com_arbuff",
    spellName: "Adrenaline Rush", xOffset: buffPos[2], yOffset: BUFF_Y,
    unit: "player", ownOnly: true, debuffType: "HELPFUL",
});
const dotRupture = B.buildBuffIcon(CLASS, {
    id: "TK - DoT: Rupture", uid: "tk_rog_com_rupture",
    spellName: "Rupture", xOffset: buffPos[3], yOffset: BUFF_Y,
    unit: "target", ownOnly: true, debuffType: "HARMFUL",
});

// ============================================================================
// SELF-BUFF REMINDERS — Poisons on weapons
// ============================================================================
const REMIND_Y = BUFF_Y + C.ICON_SIZE + 4; // Above buff row
const remPos = B.centeredIconRow(1, C.ICON_SIZE, C.ICON_GAP);

const remInstantPoison = B.buildMissingBuffReminder(CLASS, {
    id: "TK - Reminder: Instant Poison", uid: "tk_rog_com_rem_ip",
    spellName: "Instant Poison", xOffset: remPos[0], yOffset: REMIND_Y,
});

// ============================================================================
// SATED TRACKER (TBC Anniversary 2026)
// ============================================================================
const satedTracker = B.buildSatedTracker(CLASS, {
    id: "TK - Sated Tracker", uid: "tk_rog_com_sated",
    xOffset: 210, yOffset: C.ICON_Y,
});

// ============================================================================
// BARS — Energy, Cast Bar (NO 5SR/Tick — not a mana class)
// ============================================================================
const energyBar = B.buildResourceBar(CLASS, {
    id: "TK - Energy Bar", uid: "tk_rog_com_energy",
    powerType: C.POWER_TYPE.ENERGY,
});
const castBar = B.buildCastBar(CLASS, {
    id: "TK - Cast Bar", uid: "tk_rog_com_cast",
});

// ============================================================================
// MASTER GROUP
// ============================================================================
const childAuras = [
    // Core row
    cdBladeFlurry, cdAdrenalineRush, cdCloak, cdVanish, cdEvasion, cdSprint, cdTrink1, cdTrink2,
    // Secondary row
    cdKick, cdBlind, cdSap, cdKidney, cdRiposte, cdGouge,
    // Buff tracking
    buffSND, buffBF, buffAR, dotRupture,
    // Reminders
    remInstantPoison,
    // Sated
    satedTracker,
    // Bars
    energyBar, castBar,
];
const childNames = childAuras.map(a => a.id);

const masterGroup = B.buildGroup(CLASS, {
    id: "Tidekeeper - Rogue Combat",
    uid: "tk_rogue_com",
    childNames,
    groupIcon: 132090, // Combat icon
});

childAuras.forEach(c => { c.parent = masterGroup.id; });

// ============================================================================
// ENCODE & OUTPUT
// ============================================================================
const groupWrapper = B.wrapGroupAura(masterGroup, childAuras);
console.log(`Encoding ${masterGroup.id}...`);
const fullImport = encodeWeakAura(groupWrapper);
console.log(`  Full import: ${fullImport.length} characters`);

let output = `# Tidekeeper — Combat Rogue WeakAura Import Strings
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
    const checks = ['Blade Flurry', 'Adrenaline Rush', 'Cloak of Shadows', 'Vanish', 'Evasion',
                     'Kick', 'Riposte', 'Slice and Dice', 'Rupture',
                     'Sated', 'Energy Bar', 'Cast Bar'];
    const passed = checks.filter(c => str.includes(c));
    console.log(`  Verification: ${passed.length}/${checks.length} checks passed`);
    if (passed.length === checks.length) console.log("  VALID");
    else console.log("  Missing: " + checks.filter(c => !str.includes(c)).join(', '));
} catch (e) { console.log("  ERROR: " + e.message); }
