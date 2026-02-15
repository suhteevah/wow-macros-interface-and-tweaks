/**
 * Tidekeeper — Feral Cat Druid WeakAura Generator
 * ===================================================
 * TBC Anniversary 2026 | Feral Cat Druid (Melee DPS)
 */

const path = require('path');
const fs = require('fs');
const { encodeWeakAura, decodeWeakAura } = require('../../../lib/weakaura_encoder');
const C = require('../../_shared/wa_constants');
const B = require('../../_shared/wa_builder');

const CLASS = "DRUID";
const SPEC = "Feral Cat";

// ============================================================================
// CORE COOLDOWNS — Primary melee DPS CDs
// ============================================================================
// 8 icons: Mangle (Cat), Shred, Rip, Ferocious Bite,
//          Tiger's Fury, Dash, Trinket 1, Trinket 2
const corePos = B.centeredIconRow(8, C.ICON_SIZE, C.ICON_GAP);

const cdMangle = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Mangle (Cat)", uid: "tk_dru_fcat_mangle",
    spellName: "Mangle (Cat)", xOffset: corePos[0],
});
const cdShred = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Shred", uid: "tk_dru_fcat_shred",
    spellName: "Shred", xOffset: corePos[1],
});
const cdRip = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Rip", uid: "tk_dru_fcat_rip",
    spellName: "Rip", xOffset: corePos[2],
});
const cdFBite = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Ferocious Bite", uid: "tk_dru_fcat_fbite",
    spellName: "Ferocious Bite", xOffset: corePos[3],
});
const cdTigersFury = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Tiger's Fury", uid: "tk_dru_fcat_tf",
    spellName: "Tiger's Fury", xOffset: corePos[4],
});
const cdDash = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Dash", uid: "tk_dru_fcat_dash",
    spellName: "Dash", xOffset: corePos[5],
});
const cdTrink1 = B.buildTrinketIcon(CLASS, {
    id: "TK - CD: Trinket 1", uid: "tk_dru_fcat_t1",
    slot: 13, xOffset: corePos[6],
});
const cdTrink2 = B.buildTrinketIcon(CLASS, {
    id: "TK - CD: Trinket 2", uid: "tk_dru_fcat_t2",
    slot: 14, xOffset: corePos[7],
});

// ============================================================================
// SECONDARY ROW — Utility cooldowns (below core icons)
// ============================================================================
const SEC_Y = C.ICON_Y - C.ICON_SIZE - 2; // Below core row
const secPos = B.centeredIconRow(6, C.ICON_SIZE, C.ICON_GAP);

const cdFFFeral = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Faerie Fire (Feral)", uid: "tk_dru_fcat_fff",
    spellName: "Faerie Fire (Feral)", xOffset: secPos[0], yOffset: SEC_Y,
});
const cdMaim = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Maim", uid: "tk_dru_fcat_maim",
    spellName: "Maim", xOffset: secPos[1], yOffset: SEC_Y,
});
const cdBash = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Bash", uid: "tk_dru_fcat_bash",
    spellName: "Bash", xOffset: secPos[2], yOffset: SEC_Y,
});
const cdInnervate = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Innervate", uid: "tk_dru_fcat_innerv",
    spellName: "Innervate", xOffset: secPos[3], yOffset: SEC_Y,
});
const cdRebirth = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Rebirth", uid: "tk_dru_fcat_rebirth",
    spellName: "Rebirth", xOffset: secPos[4], yOffset: SEC_Y,
});
const cdBarkskin = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Barkskin", uid: "tk_dru_fcat_bark",
    spellName: "Barkskin", xOffset: secPos[5], yOffset: SEC_Y,
});

// ============================================================================
// DOT TRACKING — Rip on target, Mangle debuff on target
// ============================================================================
const dotRip = B.buildBuffIcon(CLASS, {
    id: "TK - DoT: Rip", uid: "tk_dru_fcat_dot_rip",
    spellName: "Rip", xOffset: 160, yOffset: C.ICON_Y,
    unit: "target", ownOnly: true, debuffType: "HARMFUL",
});
const dotMangle = B.buildBuffIcon(CLASS, {
    id: "TK - Debuff: Mangle", uid: "tk_dru_fcat_dot_mangle",
    spellName: "Mangle (Cat)", xOffset: 190, yOffset: C.ICON_Y,
    unit: "target", ownOnly: true, debuffType: "HARMFUL",
});

// ============================================================================
// SELF-BUFF REMINDERS — Cat Form, Mark of the Wild
// ============================================================================
const REMIND_Y = C.ICON_Y + C.ICON_SIZE + 4; // Above icon row
const remPos = B.centeredIconRow(2, C.ICON_SIZE, C.ICON_GAP);

const remCatForm = B.buildMissingBuffReminder(CLASS, {
    id: "TK - Reminder: Cat Form", uid: "tk_dru_fcat_rem_cat",
    spellName: "Cat Form", xOffset: remPos[0], yOffset: REMIND_Y,
});
const remMotW = B.buildMissingBuffReminder(CLASS, {
    id: "TK - Reminder: Mark of the Wild", uid: "tk_dru_fcat_rem_motw",
    spellName: "Mark of the Wild", xOffset: remPos[1], yOffset: REMIND_Y,
});

// ============================================================================
// SATED TRACKER (TBC Anniversary 2026)
// ============================================================================
const satedTracker = B.buildSatedTracker(CLASS, {
    id: "TK - Sated Tracker", uid: "tk_dru_fcat_sated",
    xOffset: 220, yOffset: C.ICON_Y,
});

// ============================================================================
// BARS — Energy (powerType: 3), Cast Bar (no 5SR/Tick)
// ============================================================================
const energyBar = B.buildResourceBar(CLASS, {
    id: "TK - Energy Bar", uid: "tk_dru_fcat_energy",
    powerType: C.POWER_TYPE.ENERGY,
});
const castBar = B.buildCastBar(CLASS, {
    id: "TK - Cast Bar", uid: "tk_dru_fcat_cast",
});

// ============================================================================
// MASTER GROUP
// ============================================================================
const childAuras = [
    // Core row
    cdMangle, cdShred, cdRip, cdFBite, cdTigersFury, cdDash, cdTrink1, cdTrink2,
    // Secondary row
    cdFFFeral, cdMaim, cdBash, cdInnervate, cdRebirth, cdBarkskin,
    // DoT tracking
    dotRip, dotMangle,
    // Reminders
    remCatForm, remMotW,
    // Sated
    satedTracker,
    // Bars
    energyBar, castBar,
];
const childNames = childAuras.map(a => a.id);

const masterGroup = B.buildGroup(CLASS, {
    id: "Tidekeeper - Druid Feral Cat",
    uid: "tk_druid_fcat",
    childNames,
    groupIcon: 132115, // Cat Form icon
});

childAuras.forEach(c => { c.parent = masterGroup.id; });

// ============================================================================
// ENCODE & OUTPUT
// ============================================================================
const groupWrapper = B.wrapGroupAura(masterGroup, childAuras);
console.log(`Encoding ${masterGroup.id}...`);
const fullImport = encodeWeakAura(groupWrapper);
console.log(`  Full import: ${fullImport.length} characters`);

let output = `# Tidekeeper — Feral Cat Druid WeakAura Import Strings
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
    const checks = ['Mangle (Cat)', 'Shred', 'Tiger\'s Fury', 'Barkskin',
                     'Rip', 'Cat Form', 'Mark of the Wild', 'Sated', 'Energy Bar', 'Cast Bar'];
    const passed = checks.filter(c => str.includes(c));
    console.log(`  Verification: ${passed.length}/${checks.length} checks passed`);
    if (passed.length === checks.length) console.log("  VALID");
    else console.log("  Missing: " + checks.filter(c => !str.includes(c)).join(', '));
} catch (e) { console.log("  ERROR: " + e.message); }
