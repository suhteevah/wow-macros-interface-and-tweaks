/**
 * Tidekeeper — Shadow Priest WeakAura Generator
 * ================================================
 * TBC Anniversary 2026 | Shadow Priest (DPS)
 */

const path = require('path');
const fs = require('fs');
const { encodeWeakAura, decodeWeakAura } = require('../../../lib/weakaura_encoder');
const C = require('../../_shared/wa_constants');
const B = require('../../_shared/wa_builder');

const CLASS = "PRIEST";
const SPEC = "Shadow";

// ============================================================================
// CORE COOLDOWNS — Primary DPS cooldowns
// ============================================================================
const corePos = B.centeredIconRow(8, C.ICON_SIZE, C.ICON_GAP);

const cdMB = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Mind Blast", uid: "tk_pr_shad_mb",
    spellName: "Mind Blast", xOffset: corePos[0],
});
const cdSWD = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Shadow Word: Death", uid: "tk_pr_shad_swd",
    spellName: "Shadow Word: Death", xOffset: corePos[1],
});
const cdSilence = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Silence", uid: "tk_pr_shad_silence",
    spellName: "Silence", xOffset: corePos[2],
});
const cdSF = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Shadowfiend", uid: "tk_pr_shad_sf",
    spellName: "Shadowfiend", xOffset: corePos[3],
});
const cdPWS = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Power Word: Shield", uid: "tk_pr_shad_pws",
    spellName: "Power Word: Shield", xOffset: corePos[4],
});
const cdFW = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Fear Ward", uid: "tk_pr_shad_fw",
    spellName: "Fear Ward", xOffset: corePos[5],
});
const cdTrink1 = B.buildTrinketIcon(CLASS, {
    id: "TK - CD: Trinket 1", uid: "tk_pr_shad_t1",
    slot: 13, xOffset: corePos[6],
});
const cdTrink2 = B.buildTrinketIcon(CLASS, {
    id: "TK - CD: Trinket 2", uid: "tk_pr_shad_t2",
    slot: 14, xOffset: corePos[7],
});

// ============================================================================
// SECONDARY ROW — Utility
// ============================================================================
const SEC_Y = C.ICON_Y - C.ICON_SIZE - 2;
const secPos = B.centeredIconRow(5, C.ICON_SIZE, C.ICON_GAP);

const cdFade = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Fade", uid: "tk_pr_shad_fade",
    spellName: "Fade", xOffset: secPos[0], yOffset: SEC_Y,
});
const cdScream = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Psychic Scream", uid: "tk_pr_shad_scream",
    spellName: "Psychic Scream", xOffset: secPos[1], yOffset: SEC_Y,
});
const cdMD = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Mass Dispel", uid: "tk_pr_shad_md",
    spellName: "Mass Dispel", xOffset: secPos[2], yOffset: SEC_Y,
});
const cdDispel = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Dispel Magic", uid: "tk_pr_shad_dispel",
    spellName: "Dispel Magic", xOffset: secPos[3], yOffset: SEC_Y,
});
const cdInnerFocus = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Inner Focus", uid: "tk_pr_shad_if",
    spellName: "Inner Focus", xOffset: secPos[4], yOffset: SEC_Y,
});

// ============================================================================
// DOT TRACKING — On target (offensive auras)
// ============================================================================
const DOT_Y = C.ICON_Y; // Same Y as core, but offset far right
const dotSWP = B.buildBuffIcon(CLASS, {
    id: "TK - DoT: Shadow Word: Pain", uid: "tk_pr_shad_swp",
    spellName: "Shadow Word: Pain", xOffset: 170, yOffset: DOT_Y,
    unit: "target", ownOnly: true, debuffType: "HARMFUL",
});
const dotVT = B.buildBuffIcon(CLASS, {
    id: "TK - DoT: Vampiric Touch", uid: "tk_pr_shad_vt",
    spellName: "Vampiric Touch", xOffset: 198, yOffset: DOT_Y,
    unit: "target", ownOnly: true, debuffType: "HARMFUL",
});
const dotDP = B.buildBuffIcon(CLASS, {
    id: "TK - DoT: Devouring Plague", uid: "tk_pr_shad_dp",
    spellName: "Devouring Plague", xOffset: 226, yOffset: DOT_Y,
    unit: "target", ownOnly: true, debuffType: "HARMFUL",
});

// ============================================================================
// PROC/BUFF TRACKING — Shadow Weaving stacks, Shadowform
// ============================================================================
const buffSW = B.buildBuffIcon(CLASS, {
    id: "TK - Buff: Shadow Weaving", uid: "tk_pr_shad_weaving",
    spellName: "Shadow Weaving", xOffset: -170, yOffset: DOT_Y,
    unit: "target", ownOnly: true, debuffType: "HARMFUL", showStacks: true,
});

// ============================================================================
// SELF-BUFF REMINDERS
// ============================================================================
const REMIND_Y = C.ICON_Y + C.ICON_SIZE + 4;
const remPos = B.centeredIconRow(4, C.ICON_SIZE, C.ICON_GAP);

const remShadowform = B.buildMissingBuffReminder(CLASS, {
    id: "TK - Reminder: Shadowform", uid: "tk_pr_shad_rem_sf",
    spellName: "Shadowform", xOffset: remPos[0], yOffset: REMIND_Y,
});
const remVE = B.buildMissingBuffReminder(CLASS, {
    id: "TK - Reminder: Vampiric Embrace", uid: "tk_pr_shad_rem_ve",
    spellName: "Vampiric Embrace", xOffset: remPos[1], yOffset: REMIND_Y,
});
const remInnerFire = B.buildMissingBuffReminder(CLASS, {
    id: "TK - Reminder: Inner Fire", uid: "tk_pr_shad_rem_if",
    spellName: "Inner Fire", xOffset: remPos[2], yOffset: REMIND_Y,
});
const remFort = B.buildMissingBuffReminder(CLASS, {
    id: "TK - Reminder: Fortitude", uid: "tk_pr_shad_rem_fort",
    spellName: "Power Word: Fortitude", xOffset: remPos[3], yOffset: REMIND_Y,
});

// ============================================================================
// SATED TRACKER
// ============================================================================
const satedTracker = B.buildSatedTracker(CLASS, {
    id: "TK - Sated Tracker", uid: "tk_pr_shad_sated",
    xOffset: 254, yOffset: C.ICON_Y,
});

// ============================================================================
// BARS — Mana, 5SR, Tick, Cast
// ============================================================================
const manaBar = B.buildResourceBar(CLASS, {
    id: "TK - Mana Bar", uid: "tk_pr_shad_mana",
    powerType: C.POWER_TYPE.MANA,
});
const fsrTimer = B.buildFiveSecondRule(CLASS, {
    id: "TK - 5SR Timer", uid: "tk_pr_shad_5sr",
});
const tickTimer = B.buildTickTimer(CLASS, {
    id: "TK - Tick Timer", uid: "tk_pr_shad_tick",
});
const castBar = B.buildCastBar(CLASS, {
    id: "TK - Cast Bar", uid: "tk_pr_shad_cast",
});

// ============================================================================
// MASTER GROUP
// ============================================================================
const childAuras = [
    cdMB, cdSWD, cdSilence, cdSF, cdPWS, cdFW, cdTrink1, cdTrink2,
    cdFade, cdScream, cdMD, cdDispel, cdInnerFocus,
    dotSWP, dotVT, dotDP,
    buffSW,
    remShadowform, remVE, remInnerFire, remFort,
    satedTracker,
    manaBar, fsrTimer, tickTimer, castBar,
];
const childNames = childAuras.map(a => a.id);

const masterGroup = B.buildGroup(CLASS, {
    id: "Tidekeeper - Priest Shadow",
    uid: "tk_priest_shadow",
    childNames,
    groupIcon: 136207, // Shadow icon
});

childAuras.forEach(c => { c.parent = masterGroup.id; });

// ============================================================================
// ENCODE & OUTPUT
// ============================================================================
const groupWrapper = B.wrapGroupAura(masterGroup, childAuras);
console.log(`Encoding ${masterGroup.id}...`);
const fullImport = encodeWeakAura(groupWrapper);
console.log(`  Full import: ${fullImport.length} characters`);

let output = `# Tidekeeper — Shadow Priest WeakAura Import Strings
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
    const checks = ['Mind Blast', 'Silence', 'Shadowfiend', 'Shadow Word: Pain',
                     'Vampiric Touch', 'Shadow Weaving', 'Shadowform', 'Sated', 'Mana Bar'];
    const passed = checks.filter(c => str.includes(c));
    console.log(`  Verification: ${passed.length}/${checks.length} checks passed`);
    if (passed.length === checks.length) console.log("  ✅ VALID");
    else console.log("  ❌ Missing: " + checks.filter(c => !str.includes(c)).join(', '));
} catch (e) { console.log("  ❌ ERROR: " + e.message); }
