/**
 * Tidekeeper — Arms Warrior WeakAura Generator
 * ==============================================
 * TBC Anniversary 2026 | Arms Warrior (DPS / PvP)
 *
 * TBC Arms does NOT have Bladestorm (that was added in WotLK).
 * Core rotation: Mortal Strike, Sweeping Strikes, Overpower, Execute
 * Utility: Intercept, Pummel, Berserker Rage, Spell Reflection, etc.
 */

const path = require('path');
const fs = require('fs');
const { encodeWeakAura, decodeWeakAura } = require('../../../lib/weakaura_encoder');
const C = require('../../_shared/wa_constants');
const B = require('../../_shared/wa_builder');

const CLASS = "WARRIOR";
const SPEC = "Arms";

// ============================================================================
// CORE COOLDOWNS — Primary DPS/PvP abilities
// ============================================================================
// 8 icons: Mortal Strike, Sweeping Strikes, Overpower, Execute,
//          Intercept, Pummel, Trinket 1, Trinket 2
const corePos = B.centeredIconRow(8, C.ICON_SIZE, C.ICON_GAP);

const cdMS = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Mortal Strike", uid: "tk_war_arms_ms",
    spellName: "Mortal Strike", xOffset: corePos[0],
});
const cdSweep = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Sweeping Strikes", uid: "tk_war_arms_sweep",
    spellName: "Sweeping Strikes", xOffset: corePos[1],
});
const cdOverpower = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Overpower", uid: "tk_war_arms_op",
    spellName: "Overpower", xOffset: corePos[2],
});
const cdExecute = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Execute", uid: "tk_war_arms_exec",
    spellName: "Execute", xOffset: corePos[3],
});
const cdIntercept = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Intercept", uid: "tk_war_arms_intercept",
    spellName: "Intercept", xOffset: corePos[4],
});
const cdPummel = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Pummel", uid: "tk_war_arms_pummel",
    spellName: "Pummel", xOffset: corePos[5],
});
const cdTrink1 = B.buildTrinketIcon(CLASS, {
    id: "TK - CD: Trinket 1", uid: "tk_war_arms_t1",
    slot: 13, xOffset: corePos[6],
});
const cdTrink2 = B.buildTrinketIcon(CLASS, {
    id: "TK - CD: Trinket 2", uid: "tk_war_arms_t2",
    slot: 14, xOffset: corePos[7],
});

// ============================================================================
// SECONDARY ROW — Offensive/defensive CDs (below core icons)
// ============================================================================
const SEC_Y = C.ICON_Y - C.ICON_SIZE - 2; // Below core row
const secPos = B.centeredIconRow(7, C.ICON_SIZE, C.ICON_GAP);

const cdDeathWish = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Death Wish", uid: "tk_war_arms_dw",
    spellName: "Death Wish", xOffset: secPos[0], yOffset: SEC_Y,
});
const cdRecklessness = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Recklessness", uid: "tk_war_arms_reck",
    spellName: "Recklessness", xOffset: secPos[1], yOffset: SEC_Y,
});
const cdBerserkerRage = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Berserker Rage", uid: "tk_war_arms_brage",
    spellName: "Berserker Rage", xOffset: secPos[2], yOffset: SEC_Y,
});
const cdSpellReflect = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Spell Reflection", uid: "tk_war_arms_sr",
    spellName: "Spell Reflection", xOffset: secPos[3], yOffset: SEC_Y,
});
const cdIntervene = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Intervene", uid: "tk_war_arms_intervene",
    spellName: "Intervene", xOffset: secPos[4], yOffset: SEC_Y,
});
const cdDisarm = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Disarm", uid: "tk_war_arms_disarm",
    spellName: "Disarm", xOffset: secPos[5], yOffset: SEC_Y,
});
const cdIntimShout = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Intimidating Shout", uid: "tk_war_arms_intim",
    spellName: "Intimidating Shout", xOffset: secPos[6], yOffset: SEC_Y,
});

// ============================================================================
// BUFF TRACKING — Hamstring on target
// ============================================================================
const buffHamstring = B.buildBuffIcon(CLASS, {
    id: "TK - Debuff: Hamstring", uid: "tk_war_arms_ham",
    spellName: "Hamstring", xOffset: 180, yOffset: C.ICON_Y,
    unit: "target", ownOnly: true, debuffType: "HARMFUL",
});

// ============================================================================
// SELF-BUFF REMINDERS — Battle Shout
// ============================================================================
const REMIND_Y = C.ICON_Y + C.ICON_SIZE + 4; // Above icon row
const remPos = B.centeredIconRow(1, C.ICON_SIZE, C.ICON_GAP);

const remBattleShout = B.buildMissingBuffReminder(CLASS, {
    id: "TK - Reminder: Battle Shout", uid: "tk_war_arms_rem_bs",
    spellName: "Battle Shout", xOffset: remPos[0], yOffset: REMIND_Y,
});

// ============================================================================
// SATED TRACKER (TBC Anniversary 2026)
// ============================================================================
const satedTracker = B.buildSatedTracker(CLASS, {
    id: "TK - Sated Tracker", uid: "tk_war_arms_sated",
    xOffset: 210, yOffset: C.ICON_Y,
});

// ============================================================================
// BARS — Rage bar and Cast bar (NO 5SR or Tick timer — not a mana class)
// ============================================================================
const rageBar = B.buildResourceBar(CLASS, {
    id: "TK - Rage Bar", uid: "tk_war_arms_rage",
    powerType: C.POWER_TYPE.RAGE,
});
const castBar = B.buildCastBar(CLASS, {
    id: "TK - Cast Bar", uid: "tk_war_arms_cast",
});

// ============================================================================
// MASTER GROUP
// ============================================================================
const childAuras = [
    // Core row
    cdMS, cdSweep, cdOverpower, cdExecute, cdIntercept, cdPummel, cdTrink1, cdTrink2,
    // Secondary row
    cdDeathWish, cdRecklessness, cdBerserkerRage, cdSpellReflect, cdIntervene, cdDisarm, cdIntimShout,
    // Buff tracking
    buffHamstring,
    // Reminders
    remBattleShout,
    // Sated
    satedTracker,
    // Bars
    rageBar, castBar,
];
const childNames = childAuras.map(a => a.id);

const masterGroup = B.buildGroup(CLASS, {
    id: "Tidekeeper - Warrior Arms",
    uid: "tk_warrior_arms",
    childNames,
    groupIcon: 132292, // Arms icon
});

childAuras.forEach(c => { c.parent = masterGroup.id; });

// ============================================================================
// ENCODE & OUTPUT
// ============================================================================
const groupWrapper = B.wrapGroupAura(masterGroup, childAuras);
console.log(`Encoding ${masterGroup.id}...`);
const fullImport = encodeWeakAura(groupWrapper);
console.log(`  Full import: ${fullImport.length} characters`);

let output = `# Tidekeeper — Arms Warrior WeakAura Import Strings
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
    const checks = ['Mortal Strike', 'Sweeping Strikes', 'Overpower', 'Execute',
                     'Intercept', 'Pummel', 'Battle Shout', 'Sated', 'Rage Bar', 'Cast Bar'];
    const passed = checks.filter(c => str.includes(c));
    console.log(`  Verification: ${passed.length}/${checks.length} checks passed`);
    if (passed.length === checks.length) console.log("  VALID");
    else console.log("  MISSING: " + checks.filter(c => !str.includes(c)).join(', '));
} catch (e) { console.log("  ERROR: " + e.message); }
