/**
 * Tidekeeper — Protection Warrior WeakAura Generator
 * =====================================================
 * TBC Anniversary 2026 | Protection Warrior (Tanking)
 *
 * TBC Prot does NOT have Sword and Board (that was added in WotLK).
 * Core rotation: Shield Slam, Shield Block, Revenge, Devastate
 * Major CDs: Last Stand, Shield Wall
 * Utility: Taunt, Spell Reflection, Disarm, Intimidating Shout, Intervene
 */

const path = require('path');
const fs = require('fs');
const { encodeWeakAura, decodeWeakAura } = require('../../../lib/weakaura_encoder');
const C = require('../../_shared/wa_constants');
const B = require('../../_shared/wa_builder');

const CLASS = "WARRIOR";
const SPEC = "Protection";

// ============================================================================
// CORE COOLDOWNS — Primary tanking abilities
// ============================================================================
// 8 icons: Shield Slam, Shield Block, Revenge, Devastate,
//          Last Stand, Shield Wall, Trinket 1, Trinket 2
const corePos = B.centeredIconRow(8, C.ICON_SIZE, C.ICON_GAP);

const cdShieldSlam = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Shield Slam", uid: "tk_war_prot_ss",
    spellName: "Shield Slam", xOffset: corePos[0],
});
const cdShieldBlock = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Shield Block", uid: "tk_war_prot_sb",
    spellName: "Shield Block", xOffset: corePos[1],
});
const cdRevenge = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Revenge", uid: "tk_war_prot_rev",
    spellName: "Revenge", xOffset: corePos[2],
});
const cdDevastate = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Devastate", uid: "tk_war_prot_dev",
    spellName: "Devastate", xOffset: corePos[3],
});
const cdLastStand = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Last Stand", uid: "tk_war_prot_ls",
    spellName: "Last Stand", xOffset: corePos[4],
});
const cdShieldWall = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Shield Wall", uid: "tk_war_prot_sw",
    spellName: "Shield Wall", xOffset: corePos[5],
});
const cdTrink1 = B.buildTrinketIcon(CLASS, {
    id: "TK - CD: Trinket 1", uid: "tk_war_prot_t1",
    slot: 13, xOffset: corePos[6],
});
const cdTrink2 = B.buildTrinketIcon(CLASS, {
    id: "TK - CD: Trinket 2", uid: "tk_war_prot_t2",
    slot: 14, xOffset: corePos[7],
});

// ============================================================================
// SECONDARY ROW — Utility cooldowns (below core icons)
// ============================================================================
const SEC_Y = C.ICON_Y - C.ICON_SIZE - 2; // Below core row
const secPos = B.centeredIconRow(6, C.ICON_SIZE, C.ICON_GAP);

const cdTaunt = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Taunt", uid: "tk_war_prot_taunt",
    spellName: "Taunt", xOffset: secPos[0], yOffset: SEC_Y,
});
const cdSpellReflect = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Spell Reflection", uid: "tk_war_prot_sr",
    spellName: "Spell Reflection", xOffset: secPos[1], yOffset: SEC_Y,
});
const cdDisarm = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Disarm", uid: "tk_war_prot_disarm",
    spellName: "Disarm", xOffset: secPos[2], yOffset: SEC_Y,
});
const cdIntimShout = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Intimidating Shout", uid: "tk_war_prot_intim",
    spellName: "Intimidating Shout", xOffset: secPos[3], yOffset: SEC_Y,
});
const cdIntervene = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Intervene", uid: "tk_war_prot_intervene",
    spellName: "Intervene", xOffset: secPos[4], yOffset: SEC_Y,
});
const cdBerserkerRage = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Berserker Rage", uid: "tk_war_prot_brage",
    spellName: "Berserker Rage", xOffset: secPos[5], yOffset: SEC_Y,
});

// ============================================================================
// BUFF TRACKING — Shield Block active
// ============================================================================
const buffShieldBlock = B.buildBuffIcon(CLASS, {
    id: "TK - Buff: Shield Block", uid: "tk_war_prot_buff_sb",
    spellName: "Shield Block", xOffset: 180, yOffset: C.ICON_Y,
    unit: "player", ownOnly: true, debuffType: "HELPFUL",
});

// ============================================================================
// SELF-BUFF REMINDERS — Defensive Stance, Battle Shout / Commanding Shout
// ============================================================================
const REMIND_Y = C.ICON_Y + C.ICON_SIZE + 4; // Above icon row
const remPos = B.centeredIconRow(2, C.ICON_SIZE, C.ICON_GAP);

const remBattleShout = B.buildMissingBuffReminder(CLASS, {
    id: "TK - Reminder: Battle Shout", uid: "tk_war_prot_rem_bs",
    spellName: "Battle Shout", xOffset: remPos[0], yOffset: REMIND_Y,
});
const remCommandingShout = B.buildMissingBuffReminder(CLASS, {
    id: "TK - Reminder: Commanding Shout", uid: "tk_war_prot_rem_cs",
    spellName: "Commanding Shout", xOffset: remPos[1], yOffset: REMIND_Y,
});

// ============================================================================
// SATED TRACKER (TBC Anniversary 2026)
// ============================================================================
const satedTracker = B.buildSatedTracker(CLASS, {
    id: "TK - Sated Tracker", uid: "tk_war_prot_sated",
    xOffset: 210, yOffset: C.ICON_Y,
});

// ============================================================================
// BARS — Rage bar and Cast bar (NO 5SR or Tick timer — not a mana class)
// ============================================================================
const rageBar = B.buildResourceBar(CLASS, {
    id: "TK - Rage Bar", uid: "tk_war_prot_rage",
    powerType: C.POWER_TYPE.RAGE,
});
const castBar = B.buildCastBar(CLASS, {
    id: "TK - Cast Bar", uid: "tk_war_prot_cast",
});

// ============================================================================
// MASTER GROUP
// ============================================================================
const childAuras = [
    // Core row
    cdShieldSlam, cdShieldBlock, cdRevenge, cdDevastate, cdLastStand, cdShieldWall, cdTrink1, cdTrink2,
    // Secondary row
    cdTaunt, cdSpellReflect, cdDisarm, cdIntimShout, cdIntervene, cdBerserkerRage,
    // Buff tracking
    buffShieldBlock,
    // Reminders
    remBattleShout, remCommandingShout,
    // Sated
    satedTracker,
    // Bars
    rageBar, castBar,
];
const childNames = childAuras.map(a => a.id);

const masterGroup = B.buildGroup(CLASS, {
    id: "Tidekeeper - Warrior Protection",
    uid: "tk_warrior_prot",
    childNames,
    groupIcon: 134952, // Protection icon
});

childAuras.forEach(c => { c.parent = masterGroup.id; });

// ============================================================================
// ENCODE & OUTPUT
// ============================================================================
const groupWrapper = B.wrapGroupAura(masterGroup, childAuras);
console.log(`Encoding ${masterGroup.id}...`);
const fullImport = encodeWeakAura(groupWrapper);
console.log(`  Full import: ${fullImport.length} characters`);

let output = `# Tidekeeper — Protection Warrior WeakAura Import Strings
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
    const checks = ['Shield Slam', 'Shield Block', 'Revenge', 'Devastate',
                     'Last Stand', 'Shield Wall', 'Taunt', 'Commanding Shout',
                     'Sated', 'Rage Bar', 'Cast Bar'];
    const passed = checks.filter(c => str.includes(c));
    console.log(`  Verification: ${passed.length}/${checks.length} checks passed`);
    if (passed.length === checks.length) console.log("  VALID");
    else console.log("  MISSING: " + checks.filter(c => !str.includes(c)).join(', '));
} catch (e) { console.log("  ERROR: " + e.message); }
