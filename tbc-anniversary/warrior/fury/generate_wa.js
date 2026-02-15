/**
 * Tidekeeper — Fury Warrior WeakAura Generator
 * ===============================================
 * TBC Anniversary 2026 | Fury Warrior (DPS)
 *
 * Core rotation: Bloodthirst, Whirlwind, Rampage
 * Proc tracking: Rampage buff, Flurry proc
 * Utility: Death Wish, Recklessness, Berserker Rage, Intercept, Pummel
 */

const path = require('path');
const fs = require('fs');
const { encodeWeakAura, decodeWeakAura } = require('../../../lib/weakaura_encoder');
const C = require('../../_shared/wa_constants');
const B = require('../../_shared/wa_builder');

const CLASS = "WARRIOR";
const SPEC = "Fury";

// ============================================================================
// CORE COOLDOWNS — Primary DPS abilities
// ============================================================================
// 8 icons: Bloodthirst, Whirlwind, Rampage, Death Wish,
//          Recklessness, Intimidating Shout, Trinket 1, Trinket 2
const corePos = B.centeredIconRow(8, C.ICON_SIZE, C.ICON_GAP);

const cdBT = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Bloodthirst", uid: "tk_war_fury_bt",
    spellName: "Bloodthirst", xOffset: corePos[0],
});
const cdWW = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Whirlwind", uid: "tk_war_fury_ww",
    spellName: "Whirlwind", xOffset: corePos[1],
});
const cdRampage = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Rampage", uid: "tk_war_fury_rampage",
    spellName: "Rampage", xOffset: corePos[2],
});
const cdDeathWish = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Death Wish", uid: "tk_war_fury_dw",
    spellName: "Death Wish", xOffset: corePos[3],
});
const cdRecklessness = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Recklessness", uid: "tk_war_fury_reck",
    spellName: "Recklessness", xOffset: corePos[4],
});
const cdIntimShout = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Intimidating Shout", uid: "tk_war_fury_intim",
    spellName: "Intimidating Shout", xOffset: corePos[5],
});
const cdTrink1 = B.buildTrinketIcon(CLASS, {
    id: "TK - CD: Trinket 1", uid: "tk_war_fury_t1",
    slot: 13, xOffset: corePos[6],
});
const cdTrink2 = B.buildTrinketIcon(CLASS, {
    id: "TK - CD: Trinket 2", uid: "tk_war_fury_t2",
    slot: 14, xOffset: corePos[7],
});

// ============================================================================
// SECONDARY ROW — Utility cooldowns (below core icons)
// ============================================================================
const SEC_Y = C.ICON_Y - C.ICON_SIZE - 2; // Below core row
const secPos = B.centeredIconRow(6, C.ICON_SIZE, C.ICON_GAP);

const cdBerserkerRage = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Berserker Rage", uid: "tk_war_fury_brage",
    spellName: "Berserker Rage", xOffset: secPos[0], yOffset: SEC_Y,
});
const cdIntercept = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Intercept", uid: "tk_war_fury_intercept",
    spellName: "Intercept", xOffset: secPos[1], yOffset: SEC_Y,
});
const cdPummel = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Pummel", uid: "tk_war_fury_pummel",
    spellName: "Pummel", xOffset: secPos[2], yOffset: SEC_Y,
});
const cdExecute = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Execute", uid: "tk_war_fury_exec",
    spellName: "Execute", xOffset: secPos[3], yOffset: SEC_Y,
});
const cdSpellReflect = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Spell Reflection", uid: "tk_war_fury_sr",
    spellName: "Spell Reflection", xOffset: secPos[4], yOffset: SEC_Y,
});
const cdIntervene = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Intervene", uid: "tk_war_fury_intervene",
    spellName: "Intervene", xOffset: secPos[5], yOffset: SEC_Y,
});

// ============================================================================
// BUFF TRACKING — Rampage buff, Flurry proc
// ============================================================================
const buffRampage = B.buildBuffIcon(CLASS, {
    id: "TK - Buff: Rampage", uid: "tk_war_fury_buff_ramp",
    spellName: "Rampage", xOffset: 180, yOffset: C.ICON_Y,
    unit: "player", ownOnly: true, debuffType: "HELPFUL",
});
const buffFlurry = B.buildBuffIcon(CLASS, {
    id: "TK - Buff: Flurry", uid: "tk_war_fury_buff_flurry",
    spellName: "Flurry", xOffset: 210, yOffset: C.ICON_Y,
    unit: "player", ownOnly: true, debuffType: "HELPFUL", showStacks: true,
});

// ============================================================================
// SELF-BUFF REMINDERS — Battle Shout
// ============================================================================
const REMIND_Y = C.ICON_Y + C.ICON_SIZE + 4; // Above icon row
const remPos = B.centeredIconRow(1, C.ICON_SIZE, C.ICON_GAP);

const remBattleShout = B.buildMissingBuffReminder(CLASS, {
    id: "TK - Reminder: Battle Shout", uid: "tk_war_fury_rem_bs",
    spellName: "Battle Shout", xOffset: remPos[0], yOffset: REMIND_Y,
});

// ============================================================================
// SATED TRACKER (TBC Anniversary 2026)
// ============================================================================
const satedTracker = B.buildSatedTracker(CLASS, {
    id: "TK - Sated Tracker", uid: "tk_war_fury_sated",
    xOffset: 240, yOffset: C.ICON_Y,
});

// ============================================================================
// BARS — Rage bar and Cast bar (NO 5SR or Tick timer — not a mana class)
// ============================================================================
const rageBar = B.buildResourceBar(CLASS, {
    id: "TK - Rage Bar", uid: "tk_war_fury_rage",
    powerType: C.POWER_TYPE.RAGE,
});
const castBar = B.buildCastBar(CLASS, {
    id: "TK - Cast Bar", uid: "tk_war_fury_cast",
});

// ============================================================================
// MASTER GROUP
// ============================================================================
const childAuras = [
    // Core row
    cdBT, cdWW, cdRampage, cdDeathWish, cdRecklessness, cdIntimShout, cdTrink1, cdTrink2,
    // Secondary row
    cdBerserkerRage, cdIntercept, cdPummel, cdExecute, cdSpellReflect, cdIntervene,
    // Buff tracking
    buffRampage, buffFlurry,
    // Reminders
    remBattleShout,
    // Sated
    satedTracker,
    // Bars
    rageBar, castBar,
];
const childNames = childAuras.map(a => a.id);

const masterGroup = B.buildGroup(CLASS, {
    id: "Tidekeeper - Warrior Fury",
    uid: "tk_warrior_fury",
    childNames,
    groupIcon: 132347, // Fury icon
});

childAuras.forEach(c => { c.parent = masterGroup.id; });

// ============================================================================
// ENCODE & OUTPUT
// ============================================================================
const groupWrapper = B.wrapGroupAura(masterGroup, childAuras);
console.log(`Encoding ${masterGroup.id}...`);
const fullImport = encodeWeakAura(groupWrapper);
console.log(`  Full import: ${fullImport.length} characters`);

let output = `# Tidekeeper — Fury Warrior WeakAura Import Strings
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
    const checks = ['Bloodthirst', 'Whirlwind', 'Rampage', 'Death Wish',
                     'Recklessness', 'Flurry', 'Battle Shout', 'Sated', 'Rage Bar', 'Cast Bar'];
    const passed = checks.filter(c => str.includes(c));
    console.log(`  Verification: ${passed.length}/${checks.length} checks passed`);
    if (passed.length === checks.length) console.log("  VALID");
    else console.log("  MISSING: " + checks.filter(c => !str.includes(c)).join(', '));
} catch (e) { console.log("  ERROR: " + e.message); }
