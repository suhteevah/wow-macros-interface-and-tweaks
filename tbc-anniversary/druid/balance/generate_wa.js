/**
 * Tidekeeper — Balance Druid WeakAura Generator
 * ===================================================
 * TBC Anniversary 2026 | Balance Druid (PvE DPS)
 */

const path = require('path');
const fs = require('fs');
const { encodeWeakAura, decodeWeakAura } = require('../../../lib/weakaura_encoder');
const C = require('../../_shared/wa_constants');
const B = require('../../_shared/wa_builder');

const CLASS = "DRUID";
const SPEC = "Balance";

// ============================================================================
// CORE COOLDOWNS — Primary DPS/utility CDs
// ============================================================================
// 8 icons: Starfire, Wrath, Force of Nature, Innervate,
//          Barkskin, Faerie Fire, Trinket 1, Trinket 2
const corePos = B.centeredIconRow(8, C.ICON_SIZE, C.ICON_GAP);

const cdStarfire = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Starfire", uid: "tk_dru_bal_starfire",
    spellName: "Starfire", xOffset: corePos[0],
});
const cdWrath = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Wrath", uid: "tk_dru_bal_wrath",
    spellName: "Wrath", xOffset: corePos[1],
});
const cdTreeants = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Force of Nature", uid: "tk_dru_bal_fon",
    spellName: "Force of Nature", xOffset: corePos[2],
});
const cdInnervate = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Innervate", uid: "tk_dru_bal_innerv",
    spellName: "Innervate", xOffset: corePos[3],
});
const cdBarkskin = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Barkskin", uid: "tk_dru_bal_bark",
    spellName: "Barkskin", xOffset: corePos[4],
});
const cdFF = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Faerie Fire", uid: "tk_dru_bal_ff",
    spellName: "Faerie Fire", xOffset: corePos[5],
});
const cdTrink1 = B.buildTrinketIcon(CLASS, {
    id: "TK - CD: Trinket 1", uid: "tk_dru_bal_t1",
    slot: 13, xOffset: corePos[6],
});
const cdTrink2 = B.buildTrinketIcon(CLASS, {
    id: "TK - CD: Trinket 2", uid: "tk_dru_bal_t2",
    slot: 14, xOffset: corePos[7],
});

// ============================================================================
// SECONDARY ROW — Utility cooldowns (below core icons)
// ============================================================================
const SEC_Y = C.ICON_Y - C.ICON_SIZE - 2; // Below core row
const secPos = B.centeredIconRow(6, C.ICON_SIZE, C.ICON_GAP);

const cdCyclone = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Cyclone", uid: "tk_dru_bal_cyclone",
    spellName: "Cyclone", xOffset: secPos[0], yOffset: SEC_Y,
});
const cdRoots = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Entangling Roots", uid: "tk_dru_bal_roots",
    spellName: "Entangling Roots", xOffset: secPos[1], yOffset: SEC_Y,
});
const cdRebirth = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Rebirth", uid: "tk_dru_bal_rebirth",
    spellName: "Rebirth", xOffset: secPos[2], yOffset: SEC_Y,
});
const cdAbolish = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Abolish Poison", uid: "tk_dru_bal_abolish",
    spellName: "Abolish Poison", xOffset: secPos[3], yOffset: SEC_Y,
});
const cdRemCurse = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Remove Curse", uid: "tk_dru_bal_remcurse",
    spellName: "Remove Curse", xOffset: secPos[4], yOffset: SEC_Y,
});
const cdHurricane = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Hurricane", uid: "tk_dru_bal_hurricane",
    spellName: "Hurricane", xOffset: secPos[5], yOffset: SEC_Y,
});

// ============================================================================
// DOT TRACKING — Moonfire, Insect Swarm on target
// ============================================================================
const dotMoonfire = B.buildBuffIcon(CLASS, {
    id: "TK - DoT: Moonfire", uid: "tk_dru_bal_moonfire",
    spellName: "Moonfire", xOffset: 160, yOffset: C.ICON_Y,
    unit: "target", ownOnly: true, debuffType: "HARMFUL",
});
const dotInsectSwarm = B.buildBuffIcon(CLASS, {
    id: "TK - DoT: Insect Swarm", uid: "tk_dru_bal_is",
    spellName: "Insect Swarm", xOffset: 190, yOffset: C.ICON_Y,
    unit: "target", ownOnly: true, debuffType: "HARMFUL",
});

// ============================================================================
// SELF-BUFF REMINDERS — Moonkin Form, Mark of the Wild
// ============================================================================
const REMIND_Y = C.ICON_Y + C.ICON_SIZE + 4; // Above icon row
const remPos = B.centeredIconRow(2, C.ICON_SIZE, C.ICON_GAP);

const remMoonkin = B.buildMissingBuffReminder(CLASS, {
    id: "TK - Reminder: Moonkin Form", uid: "tk_dru_bal_rem_moonkin",
    spellName: "Moonkin Form", xOffset: remPos[0], yOffset: REMIND_Y,
});
const remMotW = B.buildMissingBuffReminder(CLASS, {
    id: "TK - Reminder: Mark of the Wild", uid: "tk_dru_bal_rem_motw",
    spellName: "Mark of the Wild", xOffset: remPos[1], yOffset: REMIND_Y,
});

// ============================================================================
// SATED TRACKER (TBC Anniversary 2026)
// ============================================================================
const satedTracker = B.buildSatedTracker(CLASS, {
    id: "TK - Sated Tracker", uid: "tk_dru_bal_sated",
    xOffset: 220, yOffset: C.ICON_Y,
});

// ============================================================================
// BARS — Mana, 5SR, Tick Timer, Cast Bar
// ============================================================================
const manaBar = B.buildResourceBar(CLASS, {
    id: "TK - Mana Bar", uid: "tk_dru_bal_mana",
    powerType: C.POWER_TYPE.MANA,
});
const fsrTimer = B.buildFiveSecondRule(CLASS, {
    id: "TK - 5SR Timer", uid: "tk_dru_bal_5sr",
});
const tickTimer = B.buildTickTimer(CLASS, {
    id: "TK - Tick Timer", uid: "tk_dru_bal_tick",
});
const castBar = B.buildCastBar(CLASS, {
    id: "TK - Cast Bar", uid: "tk_dru_bal_cast",
});

// ============================================================================
// MASTER GROUP
// ============================================================================
const childAuras = [
    // Core row
    cdStarfire, cdWrath, cdTreeants, cdInnervate, cdBarkskin, cdFF, cdTrink1, cdTrink2,
    // Secondary row
    cdCyclone, cdRoots, cdRebirth, cdAbolish, cdRemCurse, cdHurricane,
    // DoT tracking
    dotMoonfire, dotInsectSwarm,
    // Reminders
    remMoonkin, remMotW,
    // Sated
    satedTracker,
    // Bars
    manaBar, fsrTimer, tickTimer, castBar,
];
const childNames = childAuras.map(a => a.id);

const masterGroup = B.buildGroup(CLASS, {
    id: "Tidekeeper - Druid Balance",
    uid: "tk_druid_balance",
    childNames,
    groupIcon: 136096, // Balance icon
});

childAuras.forEach(c => { c.parent = masterGroup.id; });

// ============================================================================
// ENCODE & OUTPUT
// ============================================================================
const groupWrapper = B.wrapGroupAura(masterGroup, childAuras);
console.log(`Encoding ${masterGroup.id}...`);
const fullImport = encodeWeakAura(groupWrapper);
console.log(`  Full import: ${fullImport.length} characters`);

let output = `# Tidekeeper — Balance Druid WeakAura Import Strings
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
    const checks = ['Starfire', 'Force of Nature', 'Innervate', 'Barkskin',
                     'Moonfire', 'Insect Swarm', 'Moonkin Form', 'Sated', 'Mana Bar', 'Cast Bar'];
    const passed = checks.filter(c => str.includes(c));
    console.log(`  Verification: ${passed.length}/${checks.length} checks passed`);
    if (passed.length === checks.length) console.log("  VALID");
    else console.log("  Missing: " + checks.filter(c => !str.includes(c)).join(', '));
} catch (e) { console.log("  ERROR: " + e.message); }
