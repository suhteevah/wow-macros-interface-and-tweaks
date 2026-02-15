/**
 * Tidekeeper — Marksmanship Hunter WeakAura Generator
 * =====================================================
 * TBC Anniversary 2026 | Marksmanship Hunter (DPS)
 */

const path = require('path');
const fs = require('fs');
const { encodeWeakAura, decodeWeakAura } = require('../../../lib/weakaura_encoder');
const C = require('../../_shared/wa_constants');
const B = require('../../_shared/wa_builder');

const CLASS = "HUNTER";
const SPEC = "Marksmanship";

// ============================================================================
// CORE COOLDOWNS — Primary DPS/utility CDs
// ============================================================================
// 8 icons: Aimed Shot, Rapid Fire, Silencing Shot, Misdirection,
//          Multi-Shot, Arcane Shot, Trinket 1, Trinket 2
const corePos = B.centeredIconRow(8, C.ICON_SIZE, C.ICON_GAP);

const cdAimedShot = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Aimed Shot", uid: "tk_hun_mm_aimed",
    spellName: "Aimed Shot", xOffset: corePos[0],
});
const cdRapidFire = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Rapid Fire", uid: "tk_hun_mm_rf",
    spellName: "Rapid Fire", xOffset: corePos[1],
});
const cdSilencingShot = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Silencing Shot", uid: "tk_hun_mm_silence",
    spellName: "Silencing Shot", xOffset: corePos[2],
});
const cdMisdirection = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Misdirection", uid: "tk_hun_mm_md",
    spellName: "Misdirection", xOffset: corePos[3],
});
const cdMultiShot = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Multi-Shot", uid: "tk_hun_mm_multi",
    spellName: "Multi-Shot", xOffset: corePos[4],
});
const cdArcaneShot = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Arcane Shot", uid: "tk_hun_mm_arc",
    spellName: "Arcane Shot", xOffset: corePos[5],
});
const cdTrink1 = B.buildTrinketIcon(CLASS, {
    id: "TK - CD: Trinket 1", uid: "tk_hun_mm_t1",
    slot: 13, xOffset: corePos[6],
});
const cdTrink2 = B.buildTrinketIcon(CLASS, {
    id: "TK - CD: Trinket 2", uid: "tk_hun_mm_t2",
    slot: 14, xOffset: corePos[7],
});

// ============================================================================
// SECONDARY ROW — Utility cooldowns (below core icons)
// ============================================================================
const SEC_Y = C.ICON_Y - C.ICON_SIZE - 2; // Below core row
const secPos = B.centeredIconRow(6, C.ICON_SIZE, C.ICON_GAP);

const cdFeignDeath = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Feign Death", uid: "tk_hun_mm_fd",
    spellName: "Feign Death", xOffset: secPos[0], yOffset: SEC_Y,
});
const cdDeterrence = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Deterrence", uid: "tk_hun_mm_det",
    spellName: "Deterrence", xOffset: secPos[1], yOffset: SEC_Y,
});
const cdDisengage = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Disengage", uid: "tk_hun_mm_dis",
    spellName: "Disengage", xOffset: secPos[2], yOffset: SEC_Y,
});
const cdScatterShot = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Scatter Shot", uid: "tk_hun_mm_scatter",
    spellName: "Scatter Shot", xOffset: secPos[3], yOffset: SEC_Y,
});
const cdFreezingTrap = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Freezing Trap", uid: "tk_hun_mm_freeze",
    spellName: "Freezing Trap", xOffset: secPos[4], yOffset: SEC_Y,
});
const cdReadiness = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Readiness", uid: "tk_hun_mm_ready",
    spellName: "Readiness", xOffset: secPos[5], yOffset: SEC_Y,
});

// ============================================================================
// BUFF TRACKING — Rapid Fire active, Improved Steady Shot proc
// ============================================================================
const buffRapidFire = B.buildBuffIcon(CLASS, {
    id: "TK - Buff: Rapid Fire", uid: "tk_hun_mm_rfbuff",
    spellName: "Rapid Fire", xOffset: 180, yOffset: C.ICON_Y,
    unit: "player", ownOnly: true, debuffType: "HELPFUL",
});
const buffImprovedSteady = B.buildBuffIcon(CLASS, {
    id: "TK - Buff: Improved Steady Shot", uid: "tk_hun_mm_iss",
    spellName: "Improved Steady Shot", xOffset: 210, yOffset: C.ICON_Y,
    unit: "player", ownOnly: true, debuffType: "HELPFUL",
});

// ============================================================================
// SELF-BUFF REMINDERS — Aspect of the Hawk (missing)
// ============================================================================
const REMIND_Y = C.ICON_Y + C.ICON_SIZE + 4; // Above icon row
const remPos = B.centeredIconRow(1, C.ICON_SIZE, C.ICON_GAP);

const remAspectHawk = B.buildMissingBuffReminder(CLASS, {
    id: "TK - Reminder: Aspect of the Hawk", uid: "tk_hun_mm_rem_hawk",
    spellName: "Aspect of the Hawk", xOffset: remPos[0], yOffset: REMIND_Y,
});

// ============================================================================
// SATED TRACKER (TBC Anniversary 2026)
// ============================================================================
const satedTracker = B.buildSatedTracker(CLASS, {
    id: "TK - Sated Tracker", uid: "tk_hun_mm_sated",
    xOffset: 240, yOffset: C.ICON_Y,
});

// ============================================================================
// BARS — Mana, 5SR, Tick Timer, Cast Bar
// ============================================================================
const manaBar = B.buildResourceBar(CLASS, {
    id: "TK - Mana Bar", uid: "tk_hun_mm_mana",
    powerType: C.POWER_TYPE.MANA,
});
const fsrTimer = B.buildFiveSecondRule(CLASS, {
    id: "TK - 5SR Timer", uid: "tk_hun_mm_5sr",
});
const tickTimer = B.buildTickTimer(CLASS, {
    id: "TK - Tick Timer", uid: "tk_hun_mm_tick",
});
const castBar = B.buildCastBar(CLASS, {
    id: "TK - Cast Bar", uid: "tk_hun_mm_cast",
});

// ============================================================================
// MASTER GROUP
// ============================================================================
const childAuras = [
    // Core row
    cdAimedShot, cdRapidFire, cdSilencingShot, cdMisdirection,
    cdMultiShot, cdArcaneShot, cdTrink1, cdTrink2,
    // Secondary row
    cdFeignDeath, cdDeterrence, cdDisengage, cdScatterShot, cdFreezingTrap, cdReadiness,
    // Buff tracking
    buffRapidFire, buffImprovedSteady,
    // Reminders
    remAspectHawk,
    // Sated
    satedTracker,
    // Bars
    manaBar, fsrTimer, tickTimer, castBar,
];
const childNames = childAuras.map(a => a.id);

const masterGroup = B.buildGroup(CLASS, {
    id: "Tidekeeper - Hunter Marksmanship",
    uid: "tk_hunter_mm",
    childNames,
    groupIcon: 132222, // Marksmanship icon
});

childAuras.forEach(c => { c.parent = masterGroup.id; });

// ============================================================================
// ENCODE & OUTPUT
// ============================================================================
const groupWrapper = B.wrapGroupAura(masterGroup, childAuras);
console.log(`Encoding ${masterGroup.id}...`);
const fullImport = encodeWeakAura(groupWrapper);
console.log(`  Full import: ${fullImport.length} characters`);

let output = `# Tidekeeper — Marksmanship Hunter WeakAura Import Strings
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
    const checks = ['Aimed Shot', 'Rapid Fire', 'Silencing Shot', 'Misdirection',
                     'Readiness', 'Feign Death', 'Aspect of the Hawk', 'Sated',
                     'Mana Bar', 'Cast Bar'];
    const passed = checks.filter(c => str.includes(c));
    console.log(`  Verification: ${passed.length}/${checks.length} checks passed`);
    if (passed.length === checks.length) console.log("  VALID");
    else console.log("  MISSING: " + checks.filter(c => !str.includes(c)).join(', '));
} catch (e) { console.log("  ERROR: " + e.message); }
