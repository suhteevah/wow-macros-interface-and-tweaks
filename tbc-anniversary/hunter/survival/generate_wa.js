/**
 * Tidekeeper — Survival Hunter WeakAura Generator
 * =================================================
 * TBC Anniversary 2026 | Survival Hunter (DPS)
 */

const path = require('path');
const fs = require('fs');
const { encodeWeakAura, decodeWeakAura } = require('../../../lib/weakaura_encoder');
const C = require('../../_shared/wa_constants');
const B = require('../../_shared/wa_builder');

const CLASS = "HUNTER";
const SPEC = "Survival";

// ============================================================================
// CORE COOLDOWNS — Primary DPS/utility CDs
// ============================================================================
// 8 icons: Wyvern Sting, Rapid Fire, Misdirection, Multi-Shot,
//          Arcane Shot, Kill Command, Trinket 1, Trinket 2
const corePos = B.centeredIconRow(8, C.ICON_SIZE, C.ICON_GAP);

const cdWyvernSting = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Wyvern Sting", uid: "tk_hun_sv_wyvern",
    spellName: "Wyvern Sting", xOffset: corePos[0],
});
const cdRapidFire = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Rapid Fire", uid: "tk_hun_sv_rf",
    spellName: "Rapid Fire", xOffset: corePos[1],
});
const cdMisdirection = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Misdirection", uid: "tk_hun_sv_md",
    spellName: "Misdirection", xOffset: corePos[2],
});
const cdMultiShot = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Multi-Shot", uid: "tk_hun_sv_multi",
    spellName: "Multi-Shot", xOffset: corePos[3],
});
const cdArcaneShot = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Arcane Shot", uid: "tk_hun_sv_arc",
    spellName: "Arcane Shot", xOffset: corePos[4],
});
const cdKillCommand = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Kill Command", uid: "tk_hun_sv_kc",
    spellName: "Kill Command", xOffset: corePos[5],
});
const cdTrink1 = B.buildTrinketIcon(CLASS, {
    id: "TK - CD: Trinket 1", uid: "tk_hun_sv_t1",
    slot: 13, xOffset: corePos[6],
});
const cdTrink2 = B.buildTrinketIcon(CLASS, {
    id: "TK - CD: Trinket 2", uid: "tk_hun_sv_t2",
    slot: 14, xOffset: corePos[7],
});

// ============================================================================
// SECONDARY ROW — Utility cooldowns (below core icons)
// ============================================================================
const SEC_Y = C.ICON_Y - C.ICON_SIZE - 2; // Below core row
const secPos = B.centeredIconRow(6, C.ICON_SIZE, C.ICON_GAP);

const cdFeignDeath = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Feign Death", uid: "tk_hun_sv_fd",
    spellName: "Feign Death", xOffset: secPos[0], yOffset: SEC_Y,
});
const cdDeterrence = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Deterrence", uid: "tk_hun_sv_det",
    spellName: "Deterrence", xOffset: secPos[1], yOffset: SEC_Y,
});
const cdDisengage = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Disengage", uid: "tk_hun_sv_dis",
    spellName: "Disengage", xOffset: secPos[2], yOffset: SEC_Y,
});
const cdScatterShot = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Scatter Shot", uid: "tk_hun_sv_scatter",
    spellName: "Scatter Shot", xOffset: secPos[3], yOffset: SEC_Y,
});
const cdFreezingTrap = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Freezing Trap", uid: "tk_hun_sv_freeze",
    spellName: "Freezing Trap", xOffset: secPos[4], yOffset: SEC_Y,
});
const cdImmolationTrap = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Immolation Trap", uid: "tk_hun_sv_immol",
    spellName: "Immolation Trap", xOffset: secPos[5], yOffset: SEC_Y,
});

// ============================================================================
// BUFF TRACKING — Expose Weakness proc (TBC survival talent)
// ============================================================================
const buffExposeWeakness = B.buildBuffIcon(CLASS, {
    id: "TK - Buff: Expose Weakness", uid: "tk_hun_sv_ew",
    spellName: "Expose Weakness", xOffset: 180, yOffset: C.ICON_Y,
    unit: "player", ownOnly: true, debuffType: "HELPFUL",
});

// ============================================================================
// SELF-BUFF REMINDERS — Aspect of the Hawk (missing)
// ============================================================================
const REMIND_Y = C.ICON_Y + C.ICON_SIZE + 4; // Above icon row
const remPos = B.centeredIconRow(1, C.ICON_SIZE, C.ICON_GAP);

const remAspectHawk = B.buildMissingBuffReminder(CLASS, {
    id: "TK - Reminder: Aspect of the Hawk", uid: "tk_hun_sv_rem_hawk",
    spellName: "Aspect of the Hawk", xOffset: remPos[0], yOffset: REMIND_Y,
});

// ============================================================================
// SATED TRACKER (TBC Anniversary 2026)
// ============================================================================
const satedTracker = B.buildSatedTracker(CLASS, {
    id: "TK - Sated Tracker", uid: "tk_hun_sv_sated",
    xOffset: 210, yOffset: C.ICON_Y,
});

// ============================================================================
// BARS — Mana, 5SR, Tick Timer, Cast Bar
// ============================================================================
const manaBar = B.buildResourceBar(CLASS, {
    id: "TK - Mana Bar", uid: "tk_hun_sv_mana",
    powerType: C.POWER_TYPE.MANA,
});
const fsrTimer = B.buildFiveSecondRule(CLASS, {
    id: "TK - 5SR Timer", uid: "tk_hun_sv_5sr",
});
const tickTimer = B.buildTickTimer(CLASS, {
    id: "TK - Tick Timer", uid: "tk_hun_sv_tick",
});
const castBar = B.buildCastBar(CLASS, {
    id: "TK - Cast Bar", uid: "tk_hun_sv_cast",
});

// ============================================================================
// MASTER GROUP
// ============================================================================
const childAuras = [
    // Core row
    cdWyvernSting, cdRapidFire, cdMisdirection, cdMultiShot,
    cdArcaneShot, cdKillCommand, cdTrink1, cdTrink2,
    // Secondary row
    cdFeignDeath, cdDeterrence, cdDisengage, cdScatterShot, cdFreezingTrap, cdImmolationTrap,
    // Buff tracking
    buffExposeWeakness,
    // Reminders
    remAspectHawk,
    // Sated
    satedTracker,
    // Bars
    manaBar, fsrTimer, tickTimer, castBar,
];
const childNames = childAuras.map(a => a.id);

const masterGroup = B.buildGroup(CLASS, {
    id: "Tidekeeper - Hunter Survival",
    uid: "tk_hunter_sv",
    childNames,
    groupIcon: 132215, // Survival icon
});

childAuras.forEach(c => { c.parent = masterGroup.id; });

// ============================================================================
// ENCODE & OUTPUT
// ============================================================================
const groupWrapper = B.wrapGroupAura(masterGroup, childAuras);
console.log(`Encoding ${masterGroup.id}...`);
const fullImport = encodeWeakAura(groupWrapper);
console.log(`  Full import: ${fullImport.length} characters`);

let output = `# Tidekeeper — Survival Hunter WeakAura Import Strings
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
    const checks = ['Wyvern Sting', 'Rapid Fire', 'Misdirection', 'Expose Weakness',
                     'Immolation Trap', 'Feign Death', 'Aspect of the Hawk', 'Sated',
                     'Mana Bar', 'Cast Bar'];
    const passed = checks.filter(c => str.includes(c));
    console.log(`  Verification: ${passed.length}/${checks.length} checks passed`);
    if (passed.length === checks.length) console.log("  VALID");
    else console.log("  MISSING: " + checks.filter(c => !str.includes(c)).join(', '));
} catch (e) { console.log("  ERROR: " + e.message); }
