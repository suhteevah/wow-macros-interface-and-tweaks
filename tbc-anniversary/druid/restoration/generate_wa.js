/**
 * Tidekeeper — Restoration Druid WeakAura Generator
 * ===================================================
 * TBC Anniversary 2026 | Restoration Druid (PvE Healing)
 */

const path = require('path');
const fs = require('fs');
const { encodeWeakAura, decodeWeakAura } = require('../../../lib/weakaura_encoder');
const C = require('../../_shared/wa_constants');
const B = require('../../_shared/wa_builder');

const CLASS = "DRUID";
const SPEC = "Restoration";

// ============================================================================
// CORE COOLDOWNS — Primary healing/utility CDs
// ============================================================================
// 8 icons: Swiftmend, Nature's Swiftness, Innervate, Tranquility,
//          Barkskin, Rebirth, Trinket 1, Trinket 2
const corePos = B.centeredIconRow(8, C.ICON_SIZE, C.ICON_GAP);

const cdSwiftmend = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Swiftmend", uid: "tk_dru_resto_swiftmend",
    spellName: "Swiftmend", xOffset: corePos[0],
});
const cdNS = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Nature's Swiftness", uid: "tk_dru_resto_ns",
    spellName: "Nature's Swiftness", xOffset: corePos[1],
});
const cdInnervate = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Innervate", uid: "tk_dru_resto_innerv",
    spellName: "Innervate", xOffset: corePos[2],
});
const cdTranquility = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Tranquility", uid: "tk_dru_resto_tranq",
    spellName: "Tranquility", xOffset: corePos[3],
});
const cdBarkskin = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Barkskin", uid: "tk_dru_resto_bark",
    spellName: "Barkskin", xOffset: corePos[4],
});
const cdRebirth = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Rebirth", uid: "tk_dru_resto_rebirth",
    spellName: "Rebirth", xOffset: corePos[5],
});
const cdTrink1 = B.buildTrinketIcon(CLASS, {
    id: "TK - CD: Trinket 1", uid: "tk_dru_resto_t1",
    slot: 13, xOffset: corePos[6],
});
const cdTrink2 = B.buildTrinketIcon(CLASS, {
    id: "TK - CD: Trinket 2", uid: "tk_dru_resto_t2",
    slot: 14, xOffset: corePos[7],
});

// ============================================================================
// SECONDARY ROW — Utility cooldowns (below core icons)
// ============================================================================
const SEC_Y = C.ICON_Y - C.ICON_SIZE - 2; // Below core row
const secPos = B.centeredIconRow(6, C.ICON_SIZE, C.ICON_GAP);

const cdAbolish = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Abolish Poison", uid: "tk_dru_resto_abolish",
    spellName: "Abolish Poison", xOffset: secPos[0], yOffset: SEC_Y,
});
const cdRemCurse = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Remove Curse", uid: "tk_dru_resto_remcurse",
    spellName: "Remove Curse", xOffset: secPos[1], yOffset: SEC_Y,
});
const cdFF = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Faerie Fire", uid: "tk_dru_resto_ff",
    spellName: "Faerie Fire", xOffset: secPos[2], yOffset: SEC_Y,
});
const cdCyclone = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Cyclone", uid: "tk_dru_resto_cyclone",
    spellName: "Cyclone", xOffset: secPos[3], yOffset: SEC_Y,
});
const cdBash = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Bash", uid: "tk_dru_resto_bash",
    spellName: "Bash", xOffset: secPos[4], yOffset: SEC_Y,
});
const cdFeralCharge = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Feral Charge", uid: "tk_dru_resto_fcharge",
    spellName: "Feral Charge", xOffset: secPos[5], yOffset: SEC_Y,
});

// ============================================================================
// BUFF TRACKING — Lifebloom stacks, Rejuvenation, Regrowth on target
// ============================================================================
const buffPos = B.centeredIconRow(3, C.ICON_SIZE, C.ICON_GAP);
const BUFF_Y = C.ICON_Y + C.ICON_SIZE + 4; // Above icon row (for buff tracking)

const buffLifebloom = B.buildBuffIcon(CLASS, {
    id: "TK - Buff: Lifebloom", uid: "tk_dru_resto_lb",
    spellName: "Lifebloom", xOffset: 160, yOffset: C.ICON_Y,
    unit: "target", ownOnly: true, debuffType: "HELPFUL", showStacks: true,
});
const buffRejuv = B.buildBuffIcon(CLASS, {
    id: "TK - Buff: Rejuvenation", uid: "tk_dru_resto_rejuv",
    spellName: "Rejuvenation", xOffset: 190, yOffset: C.ICON_Y,
    unit: "target", ownOnly: true, debuffType: "HELPFUL",
});
const buffRegrowth = B.buildBuffIcon(CLASS, {
    id: "TK - Buff: Regrowth", uid: "tk_dru_resto_regrowth",
    spellName: "Regrowth", xOffset: 220, yOffset: C.ICON_Y,
    unit: "target", ownOnly: true, debuffType: "HELPFUL",
});

// ============================================================================
// SELF-BUFF REMINDERS — Mark of the Wild, Thorns
// ============================================================================
const REMIND_Y = C.ICON_Y + C.ICON_SIZE + 4; // Above icon row
const remPos = B.centeredIconRow(2, C.ICON_SIZE, C.ICON_GAP);

const remMotW = B.buildMissingBuffReminder(CLASS, {
    id: "TK - Reminder: Mark of the Wild", uid: "tk_dru_resto_rem_motw",
    spellName: "Mark of the Wild", xOffset: remPos[0], yOffset: REMIND_Y,
});
const remThorns = B.buildMissingBuffReminder(CLASS, {
    id: "TK - Reminder: Thorns", uid: "tk_dru_resto_rem_thorns",
    spellName: "Thorns", xOffset: remPos[1], yOffset: REMIND_Y,
});

// ============================================================================
// SATED TRACKER (TBC Anniversary 2026)
// ============================================================================
const satedTracker = B.buildSatedTracker(CLASS, {
    id: "TK - Sated Tracker", uid: "tk_dru_resto_sated",
    xOffset: 250, yOffset: C.ICON_Y,
});

// ============================================================================
// BARS — Mana, 5SR, Tick Timer, Cast Bar
// ============================================================================
const manaBar = B.buildResourceBar(CLASS, {
    id: "TK - Mana Bar", uid: "tk_dru_resto_mana",
    powerType: C.POWER_TYPE.MANA,
});
const fsrTimer = B.buildFiveSecondRule(CLASS, {
    id: "TK - 5SR Timer", uid: "tk_dru_resto_5sr",
});
const tickTimer = B.buildTickTimer(CLASS, {
    id: "TK - Tick Timer", uid: "tk_dru_resto_tick",
});
const castBar = B.buildCastBar(CLASS, {
    id: "TK - Cast Bar", uid: "tk_dru_resto_cast",
});

// ============================================================================
// MASTER GROUP
// ============================================================================
const childAuras = [
    // Core row
    cdSwiftmend, cdNS, cdInnervate, cdTranquility, cdBarkskin, cdRebirth, cdTrink1, cdTrink2,
    // Secondary row
    cdAbolish, cdRemCurse, cdFF, cdCyclone, cdBash, cdFeralCharge,
    // Buff tracking
    buffLifebloom, buffRejuv, buffRegrowth,
    // Reminders
    remMotW, remThorns,
    // Sated
    satedTracker,
    // Bars
    manaBar, fsrTimer, tickTimer, castBar,
];
const childNames = childAuras.map(a => a.id);

const masterGroup = B.buildGroup(CLASS, {
    id: "Tidekeeper - Druid Restoration",
    uid: "tk_druid_resto",
    childNames,
    groupIcon: 136041, // Restoration icon
});

childAuras.forEach(c => { c.parent = masterGroup.id; });

// ============================================================================
// ENCODE & OUTPUT
// ============================================================================
const groupWrapper = B.wrapGroupAura(masterGroup, childAuras);
console.log(`Encoding ${masterGroup.id}...`);
const fullImport = encodeWeakAura(groupWrapper);
console.log(`  Full import: ${fullImport.length} characters`);

let output = `# Tidekeeper — Restoration Druid WeakAura Import Strings
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
    const checks = ['Swiftmend', 'Innervate', 'Tranquility', 'Barkskin',
                     'Lifebloom', 'Rejuvenation', 'Mark of the Wild', 'Sated', 'Mana Bar', 'Cast Bar'];
    const passed = checks.filter(c => str.includes(c));
    console.log(`  Verification: ${passed.length}/${checks.length} checks passed`);
    if (passed.length === checks.length) console.log("  VALID");
    else console.log("  Missing: " + checks.filter(c => !str.includes(c)).join(', '));
} catch (e) { console.log("  ERROR: " + e.message); }
