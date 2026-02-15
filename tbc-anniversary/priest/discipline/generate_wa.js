/**
 * Tidekeeper — Discipline Priest WeakAura Generator
 * ===================================================
 * TBC Anniversary 2026 | Discipline Priest (PvE Healing / PvP)
 */

const path = require('path');
const fs = require('fs');
const { encodeWeakAura, decodeWeakAura } = require('../../../lib/weakaura_encoder');
const C = require('../../_shared/wa_constants');
const B = require('../../_shared/wa_builder');

const CLASS = "PRIEST";
const SPEC = "Discipline";

// ============================================================================
// CORE COOLDOWNS — Primary healing/utility CDs
// ============================================================================
// 8 icons: Pain Suppression, Power Infusion, Inner Focus, Shadowfiend,
//          Power Word: Shield, Fear Ward, Trinket 1, Trinket 2
const corePos = B.centeredIconRow(8, C.ICON_SIZE, C.ICON_GAP);

const cdPainSup = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Pain Suppression", uid: "tk_pr_disc_painsup",
    spellName: "Pain Suppression", xOffset: corePos[0],
});
const cdPI = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Power Infusion", uid: "tk_pr_disc_pi",
    spellName: "Power Infusion", xOffset: corePos[1],
});
const cdIF = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Inner Focus", uid: "tk_pr_disc_if",
    spellName: "Inner Focus", xOffset: corePos[2],
});
const cdSF = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Shadowfiend", uid: "tk_pr_disc_sf",
    spellName: "Shadowfiend", xOffset: corePos[3],
});
const cdPWS = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Power Word: Shield", uid: "tk_pr_disc_pws",
    spellName: "Power Word: Shield", xOffset: corePos[4],
});
const cdFW = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Fear Ward", uid: "tk_pr_disc_fw",
    spellName: "Fear Ward", xOffset: corePos[5],
});
const cdTrink1 = B.buildTrinketIcon(CLASS, {
    id: "TK - CD: Trinket 1", uid: "tk_pr_disc_t1",
    slot: 13, xOffset: corePos[6],
});
const cdTrink2 = B.buildTrinketIcon(CLASS, {
    id: "TK - CD: Trinket 2", uid: "tk_pr_disc_t2",
    slot: 14, xOffset: corePos[7],
});

// ============================================================================
// SECONDARY ROW — Utility cooldowns (below core icons)
// ============================================================================
const SEC_Y = C.ICON_Y - C.ICON_SIZE - 2; // Below core row
const secPos = B.centeredIconRow(6, C.ICON_SIZE, C.ICON_GAP);

const cdFade = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Fade", uid: "tk_pr_disc_fade",
    spellName: "Fade", xOffset: secPos[0], yOffset: SEC_Y,
});
const cdScream = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Psychic Scream", uid: "tk_pr_disc_scream",
    spellName: "Psychic Scream", xOffset: secPos[1], yOffset: SEC_Y,
});
const cdMD = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Mass Dispel", uid: "tk_pr_disc_md",
    spellName: "Mass Dispel", xOffset: secPos[2], yOffset: SEC_Y,
});
const cdDispel = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Dispel Magic", uid: "tk_pr_disc_dispel",
    spellName: "Dispel Magic", xOffset: secPos[3], yOffset: SEC_Y,
});
const cdMB = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Mind Blast", uid: "tk_pr_disc_mb",
    spellName: "Mind Blast", xOffset: secPos[4], yOffset: SEC_Y,
});
const cdSWD = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Shadow Word: Death", uid: "tk_pr_disc_swd",
    spellName: "Shadow Word: Death", xOffset: secPos[5], yOffset: SEC_Y,
});

// ============================================================================
// BUFF TRACKING — Weakened Soul, PWS on target, Focused Will
// ============================================================================
const buffWeakenedSoul = B.buildBuffIcon(CLASS, {
    id: "TK - Debuff: Weakened Soul", uid: "tk_pr_disc_ws",
    spellName: "Weakened Soul", xOffset: 180, yOffset: C.ICON_Y,
    unit: "target", ownOnly: true, debuffType: "HARMFUL",
});

// ============================================================================
// SELF-BUFF REMINDERS — Inner Fire, Fortitude, Divine Spirit, Shadow Protection
// ============================================================================
const REMIND_Y = C.ICON_Y + C.ICON_SIZE + 4; // Above icon row
const remPos = B.centeredIconRow(4, C.ICON_SIZE, C.ICON_GAP);

const remInnerFire = B.buildMissingBuffReminder(CLASS, {
    id: "TK - Reminder: Inner Fire", uid: "tk_pr_disc_rem_if",
    spellName: "Inner Fire", xOffset: remPos[0], yOffset: REMIND_Y,
});
const remFort = B.buildMissingBuffReminder(CLASS, {
    id: "TK - Reminder: Fortitude", uid: "tk_pr_disc_rem_fort",
    spellName: "Power Word: Fortitude", xOffset: remPos[1], yOffset: REMIND_Y,
});
const remSpirit = B.buildMissingBuffReminder(CLASS, {
    id: "TK - Reminder: Divine Spirit", uid: "tk_pr_disc_rem_ds",
    spellName: "Divine Spirit", xOffset: remPos[2], yOffset: REMIND_Y,
});
const remShadowProt = B.buildMissingBuffReminder(CLASS, {
    id: "TK - Reminder: Shadow Protection", uid: "tk_pr_disc_rem_sp",
    spellName: "Shadow Protection", xOffset: remPos[3], yOffset: REMIND_Y,
});

// ============================================================================
// SATED TRACKER (TBC Anniversary 2026)
// ============================================================================
const satedTracker = B.buildSatedTracker(CLASS, {
    id: "TK - Sated Tracker", uid: "tk_pr_disc_sated",
    xOffset: 210, yOffset: C.ICON_Y,
});

// ============================================================================
// BARS — Mana, 5SR, Tick Timer, Cast Bar
// ============================================================================
const manaBar = B.buildResourceBar(CLASS, {
    id: "TK - Mana Bar", uid: "tk_pr_disc_mana",
    powerType: C.POWER_TYPE.MANA,
});
const fsrTimer = B.buildFiveSecondRule(CLASS, {
    id: "TK - 5SR Timer", uid: "tk_pr_disc_5sr",
});
const tickTimer = B.buildTickTimer(CLASS, {
    id: "TK - Tick Timer", uid: "tk_pr_disc_tick",
});
const castBar = B.buildCastBar(CLASS, {
    id: "TK - Cast Bar", uid: "tk_pr_disc_cast",
});

// ============================================================================
// MASTER GROUP
// ============================================================================
const childAuras = [
    // Core row
    cdPainSup, cdPI, cdIF, cdSF, cdPWS, cdFW, cdTrink1, cdTrink2,
    // Secondary row
    cdFade, cdScream, cdMD, cdDispel, cdMB, cdSWD,
    // Buff tracking
    buffWeakenedSoul,
    // Reminders
    remInnerFire, remFort, remSpirit, remShadowProt,
    // Sated
    satedTracker,
    // Bars
    manaBar, fsrTimer, tickTimer, castBar,
];
const childNames = childAuras.map(a => a.id);

const masterGroup = B.buildGroup(CLASS, {
    id: "Tidekeeper - Priest Discipline",
    uid: "tk_priest_disc",
    childNames,
    groupIcon: 135940, // Discipline icon
});

childAuras.forEach(c => { c.parent = masterGroup.id; });

// ============================================================================
// ENCODE & OUTPUT
// ============================================================================
const groupWrapper = B.wrapGroupAura(masterGroup, childAuras);
console.log(`Encoding ${masterGroup.id}...`);
const fullImport = encodeWeakAura(groupWrapper);
console.log(`  Full import: ${fullImport.length} characters`);

let output = `# Tidekeeper — Discipline Priest WeakAura Import Strings
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
console.log(`✅ Written to: ${outPath}`);

// Verify
try {
    const decoded = decodeWeakAura(fullImport);
    const str = decoded.rawBuffer.toString('binary');
    const checks = ['Pain Suppression', 'Power Infusion', 'Inner Focus', 'Shadowfiend',
                     'Weakened Soul', 'Inner Fire', 'Sated', 'Mana Bar', 'Cast Bar'];
    const passed = checks.filter(c => str.includes(c));
    console.log(`  Verification: ${passed.length}/${checks.length} checks passed`);
    if (passed.length === checks.length) console.log("  ✅ VALID");
    else console.log("  ❌ Missing: " + checks.filter(c => !str.includes(c)).join(', '));
} catch (e) { console.log("  ❌ ERROR: " + e.message); }
