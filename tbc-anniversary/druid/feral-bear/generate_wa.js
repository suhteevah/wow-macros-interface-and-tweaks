/**
 * Tidekeeper — Feral Bear Druid WeakAura Generator
 * ===================================================
 * TBC Anniversary 2026 | Feral Bear Druid (Tanking)
 */

const path = require('path');
const fs = require('fs');
const { encodeWeakAura, decodeWeakAura } = require('../../../lib/weakaura_encoder');
const C = require('../../_shared/wa_constants');
const B = require('../../_shared/wa_builder');

const CLASS = "DRUID";
const SPEC = "Feral Bear";

// ============================================================================
// CORE COOLDOWNS — Primary tanking CDs
// ============================================================================
// 8 icons: Mangle (Bear), Lacerate, Maul, Swipe,
//          Frenzied Regeneration, Barkskin, Trinket 1, Trinket 2
const corePos = B.centeredIconRow(8, C.ICON_SIZE, C.ICON_GAP);

const cdMangle = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Mangle (Bear)", uid: "tk_dru_fbear_mangle",
    spellName: "Mangle (Bear)", xOffset: corePos[0],
});
const cdLacerate = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Lacerate", uid: "tk_dru_fbear_lacerate",
    spellName: "Lacerate", xOffset: corePos[1],
});
const cdMaul = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Maul", uid: "tk_dru_fbear_maul",
    spellName: "Maul", xOffset: corePos[2],
});
const cdSwipe = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Swipe", uid: "tk_dru_fbear_swipe",
    spellName: "Swipe", xOffset: corePos[3],
});
const cdFrenzied = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Frenzied Regeneration", uid: "tk_dru_fbear_frenzied",
    spellName: "Frenzied Regeneration", xOffset: corePos[4],
});
const cdBarkskin = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Barkskin", uid: "tk_dru_fbear_bark",
    spellName: "Barkskin", xOffset: corePos[5],
});
const cdTrink1 = B.buildTrinketIcon(CLASS, {
    id: "TK - CD: Trinket 1", uid: "tk_dru_fbear_t1",
    slot: 13, xOffset: corePos[6],
});
const cdTrink2 = B.buildTrinketIcon(CLASS, {
    id: "TK - CD: Trinket 2", uid: "tk_dru_fbear_t2",
    slot: 14, xOffset: corePos[7],
});

// ============================================================================
// SECONDARY ROW — Utility cooldowns (below core icons)
// ============================================================================
const SEC_Y = C.ICON_Y - C.ICON_SIZE - 2; // Below core row
const secPos = B.centeredIconRow(6, C.ICON_SIZE, C.ICON_GAP);

const cdBash = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Bash", uid: "tk_dru_fbear_bash",
    spellName: "Bash", xOffset: secPos[0], yOffset: SEC_Y,
});
const cdFeralCharge = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Feral Charge", uid: "tk_dru_fbear_fcharge",
    spellName: "Feral Charge", xOffset: secPos[1], yOffset: SEC_Y,
});
const cdFFFeral = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Faerie Fire (Feral)", uid: "tk_dru_fbear_fff",
    spellName: "Faerie Fire (Feral)", xOffset: secPos[2], yOffset: SEC_Y,
});
const cdInnervate = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Innervate", uid: "tk_dru_fbear_innerv",
    spellName: "Innervate", xOffset: secPos[3], yOffset: SEC_Y,
});
const cdRebirth = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Rebirth", uid: "tk_dru_fbear_rebirth",
    spellName: "Rebirth", xOffset: secPos[4], yOffset: SEC_Y,
});
const cdEnrage = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Enrage", uid: "tk_dru_fbear_enrage",
    spellName: "Enrage", xOffset: secPos[5], yOffset: SEC_Y,
});

// ============================================================================
// BUFF TRACKING — Lacerate stacks on target, Frenzied Regeneration active
// ============================================================================
const buffLacerate = B.buildBuffIcon(CLASS, {
    id: "TK - Debuff: Lacerate", uid: "tk_dru_fbear_dot_lac",
    spellName: "Lacerate", xOffset: 160, yOffset: C.ICON_Y,
    unit: "target", ownOnly: true, debuffType: "HARMFUL", showStacks: true,
});
const buffFrenzied = B.buildBuffIcon(CLASS, {
    id: "TK - Buff: Frenzied Regeneration", uid: "tk_dru_fbear_buff_fr",
    spellName: "Frenzied Regeneration", xOffset: 190, yOffset: C.ICON_Y,
    unit: "player", ownOnly: true, debuffType: "HELPFUL",
});

// ============================================================================
// SELF-BUFF REMINDERS — Dire Bear Form, Mark of the Wild, Thorns
// ============================================================================
const REMIND_Y = C.ICON_Y + C.ICON_SIZE + 4; // Above icon row
const remPos = B.centeredIconRow(3, C.ICON_SIZE, C.ICON_GAP);

const remDireBear = B.buildMissingBuffReminder(CLASS, {
    id: "TK - Reminder: Dire Bear Form", uid: "tk_dru_fbear_rem_bear",
    spellName: "Dire Bear Form", xOffset: remPos[0], yOffset: REMIND_Y,
});
const remMotW = B.buildMissingBuffReminder(CLASS, {
    id: "TK - Reminder: Mark of the Wild", uid: "tk_dru_fbear_rem_motw",
    spellName: "Mark of the Wild", xOffset: remPos[1], yOffset: REMIND_Y,
});
const remThorns = B.buildMissingBuffReminder(CLASS, {
    id: "TK - Reminder: Thorns", uid: "tk_dru_fbear_rem_thorns",
    spellName: "Thorns", xOffset: remPos[2], yOffset: REMIND_Y,
});

// ============================================================================
// SATED TRACKER (TBC Anniversary 2026)
// ============================================================================
const satedTracker = B.buildSatedTracker(CLASS, {
    id: "TK - Sated Tracker", uid: "tk_dru_fbear_sated",
    xOffset: 220, yOffset: C.ICON_Y,
});

// ============================================================================
// BARS — Rage (powerType: 1), Cast Bar (no 5SR/Tick)
// ============================================================================
const rageBar = B.buildResourceBar(CLASS, {
    id: "TK - Rage Bar", uid: "tk_dru_fbear_rage",
    powerType: C.POWER_TYPE.RAGE,
});
const castBar = B.buildCastBar(CLASS, {
    id: "TK - Cast Bar", uid: "tk_dru_fbear_cast",
});

// ============================================================================
// MASTER GROUP
// ============================================================================
const childAuras = [
    // Core row
    cdMangle, cdLacerate, cdMaul, cdSwipe, cdFrenzied, cdBarkskin, cdTrink1, cdTrink2,
    // Secondary row
    cdBash, cdFeralCharge, cdFFFeral, cdInnervate, cdRebirth, cdEnrage,
    // Buff tracking
    buffLacerate, buffFrenzied,
    // Reminders
    remDireBear, remMotW, remThorns,
    // Sated
    satedTracker,
    // Bars
    rageBar, castBar,
];
const childNames = childAuras.map(a => a.id);

const masterGroup = B.buildGroup(CLASS, {
    id: "Tidekeeper - Druid Feral Bear",
    uid: "tk_druid_fbear",
    childNames,
    groupIcon: 132276, // Bear Form icon
});

childAuras.forEach(c => { c.parent = masterGroup.id; });

// ============================================================================
// ENCODE & OUTPUT
// ============================================================================
const groupWrapper = B.wrapGroupAura(masterGroup, childAuras);
console.log(`Encoding ${masterGroup.id}...`);
const fullImport = encodeWeakAura(groupWrapper);
console.log(`  Full import: ${fullImport.length} characters`);

let output = `# Tidekeeper — Feral Bear Druid WeakAura Import Strings
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
    const checks = ['Mangle (Bear)', 'Lacerate', 'Swipe', 'Barkskin',
                     'Frenzied Regeneration', 'Dire Bear Form', 'Mark of the Wild', 'Sated', 'Rage Bar', 'Cast Bar'];
    const passed = checks.filter(c => str.includes(c));
    console.log(`  Verification: ${passed.length}/${checks.length} checks passed`);
    if (passed.length === checks.length) console.log("  VALID");
    else console.log("  Missing: " + checks.filter(c => !str.includes(c)).join(', '));
} catch (e) { console.log("  ERROR: " + e.message); }
