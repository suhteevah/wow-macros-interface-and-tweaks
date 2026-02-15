/**
 * Tidekeeper — Holy Priest WeakAura Generator
 * =============================================
 * TBC Anniversary 2026 | Holy Priest (PvE Healing)
 */

const path = require('path');
const fs = require('fs');
const { encodeWeakAura, decodeWeakAura } = require('../../../lib/weakaura_encoder');
const C = require('../../_shared/wa_constants');
const B = require('../../_shared/wa_builder');

const CLASS = "PRIEST";
const SPEC = "Holy";

// ============================================================================
// CORE COOLDOWNS
// ============================================================================
const corePos = B.centeredIconRow(8, C.ICON_SIZE, C.ICON_GAP);

const cdCoH = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Circle of Healing", uid: "tk_pr_holy_coh",
    spellName: "Circle of Healing", xOffset: corePos[0],
});
const cdPrayMend = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Prayer of Mending", uid: "tk_pr_holy_pom",
    spellName: "Prayer of Mending", xOffset: corePos[1],
});
const cdIF = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Inner Focus", uid: "tk_pr_holy_if",
    spellName: "Inner Focus", xOffset: corePos[2],
});
const cdSF = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Shadowfiend", uid: "tk_pr_holy_sf",
    spellName: "Shadowfiend", xOffset: corePos[3],
});
const cdPWS = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Power Word: Shield", uid: "tk_pr_holy_pws",
    spellName: "Power Word: Shield", xOffset: corePos[4],
});
const cdFW = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Fear Ward", uid: "tk_pr_holy_fw",
    spellName: "Fear Ward", xOffset: corePos[5],
});
const cdTrink1 = B.buildTrinketIcon(CLASS, {
    id: "TK - CD: Trinket 1", uid: "tk_pr_holy_t1",
    slot: 13, xOffset: corePos[6],
});
const cdTrink2 = B.buildTrinketIcon(CLASS, {
    id: "TK - CD: Trinket 2", uid: "tk_pr_holy_t2",
    slot: 14, xOffset: corePos[7],
});

// ============================================================================
// SECONDARY ROW
// ============================================================================
const SEC_Y = C.ICON_Y - C.ICON_SIZE - 2;
const secPos = B.centeredIconRow(6, C.ICON_SIZE, C.ICON_GAP);

const cdFade = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Fade", uid: "tk_pr_holy_fade",
    spellName: "Fade", xOffset: secPos[0], yOffset: SEC_Y,
});
const cdScream = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Psychic Scream", uid: "tk_pr_holy_scream",
    spellName: "Psychic Scream", xOffset: secPos[1], yOffset: SEC_Y,
});
const cdMD = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Mass Dispel", uid: "tk_pr_holy_md",
    spellName: "Mass Dispel", xOffset: secPos[2], yOffset: SEC_Y,
});
const cdDispel = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Dispel Magic", uid: "tk_pr_holy_dispel",
    spellName: "Dispel Magic", xOffset: secPos[3], yOffset: SEC_Y,
});
const cdHF = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Holy Fire", uid: "tk_pr_holy_hf",
    spellName: "Holy Fire", xOffset: secPos[4], yOffset: SEC_Y,
});
const cdSWD = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Shadow Word: Death", uid: "tk_pr_holy_swd",
    spellName: "Shadow Word: Death", xOffset: secPos[5], yOffset: SEC_Y,
});

// ============================================================================
// PROC TRACKING — Surge of Light
// ============================================================================
const procSurge = B.buildBuffIcon(CLASS, {
    id: "TK - Proc: Surge of Light", uid: "tk_pr_holy_surge",
    spellName: "Surge of Light", xOffset: 180, yOffset: C.ICON_Y,
    unit: "player", ownOnly: true,
});

// ============================================================================
// BUFF TRACKING — Renew on target, Prayer of Mending bounces
// ============================================================================
const buffRenew = B.buildBuffIcon(CLASS, {
    id: "TK - Buff: Renew", uid: "tk_pr_holy_renew",
    spellName: "Renew", xOffset: -180, yOffset: C.ICON_Y,
    unit: "target", ownOnly: true,
});

// ============================================================================
// SELF-BUFF REMINDERS
// ============================================================================
const REMIND_Y = C.ICON_Y + C.ICON_SIZE + 4;
const remPos = B.centeredIconRow(4, C.ICON_SIZE, C.ICON_GAP);

const remInnerFire = B.buildMissingBuffReminder(CLASS, {
    id: "TK - Reminder: Inner Fire", uid: "tk_pr_holy_rem_if",
    spellName: "Inner Fire", xOffset: remPos[0], yOffset: REMIND_Y,
});
const remFort = B.buildMissingBuffReminder(CLASS, {
    id: "TK - Reminder: Fortitude", uid: "tk_pr_holy_rem_fort",
    spellName: "Power Word: Fortitude", xOffset: remPos[1], yOffset: REMIND_Y,
});
const remSpirit = B.buildMissingBuffReminder(CLASS, {
    id: "TK - Reminder: Divine Spirit", uid: "tk_pr_holy_rem_ds",
    spellName: "Divine Spirit", xOffset: remPos[2], yOffset: REMIND_Y,
});
const remShadowProt = B.buildMissingBuffReminder(CLASS, {
    id: "TK - Reminder: Shadow Protection", uid: "tk_pr_holy_rem_sp",
    spellName: "Shadow Protection", xOffset: remPos[3], yOffset: REMIND_Y,
});

// ============================================================================
// SATED TRACKER
// ============================================================================
const satedTracker = B.buildSatedTracker(CLASS, {
    id: "TK - Sated Tracker", uid: "tk_pr_holy_sated",
    xOffset: 210, yOffset: C.ICON_Y,
});

// ============================================================================
// BARS
// ============================================================================
const manaBar = B.buildResourceBar(CLASS, {
    id: "TK - Mana Bar", uid: "tk_pr_holy_mana",
    powerType: C.POWER_TYPE.MANA,
});
const fsrTimer = B.buildFiveSecondRule(CLASS, {
    id: "TK - 5SR Timer", uid: "tk_pr_holy_5sr",
});
const tickTimer = B.buildTickTimer(CLASS, {
    id: "TK - Tick Timer", uid: "tk_pr_holy_tick",
});
const castBar = B.buildCastBar(CLASS, {
    id: "TK - Cast Bar", uid: "tk_pr_holy_cast",
});

// ============================================================================
// MASTER GROUP
// ============================================================================
const childAuras = [
    cdCoH, cdPrayMend, cdIF, cdSF, cdPWS, cdFW, cdTrink1, cdTrink2,
    cdFade, cdScream, cdMD, cdDispel, cdHF, cdSWD,
    procSurge, buffRenew,
    remInnerFire, remFort, remSpirit, remShadowProt,
    satedTracker,
    manaBar, fsrTimer, tickTimer, castBar,
];
const childNames = childAuras.map(a => a.id);

const masterGroup = B.buildGroup(CLASS, {
    id: "Tidekeeper - Priest Holy",
    uid: "tk_priest_holy",
    childNames,
    groupIcon: 135920, // Holy icon
});

childAuras.forEach(c => { c.parent = masterGroup.id; });

// ============================================================================
// ENCODE & OUTPUT
// ============================================================================
const groupWrapper = B.wrapGroupAura(masterGroup, childAuras);
console.log(`Encoding ${masterGroup.id}...`);
const fullImport = encodeWeakAura(groupWrapper);
console.log(`  Full import: ${fullImport.length} characters`);

let output = `# Tidekeeper — Holy Priest WeakAura Import Strings
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
    const checks = ['Circle of Healing', 'Prayer of Mending', 'Surge of Light',
                     'Renew', 'Inner Fire', 'Sated', 'Mana Bar', 'Cast Bar'];
    const passed = checks.filter(c => str.includes(c));
    console.log(`  Verification: ${passed.length}/${checks.length} checks passed`);
    if (passed.length === checks.length) console.log("  ✅ VALID");
    else console.log("  ❌ Missing: " + checks.filter(c => !str.includes(c)).join(', '));
} catch (e) { console.log("  ❌ ERROR: " + e.message); }
