/**
 * Tidekeeper — Destruction Warlock WeakAura Generator
 * =====================================================
 * TBC Anniversary 2026 | Destruction Warlock (Direct damage DPS)
 */

const path = require('path');
const fs = require('fs');
const { encodeWeakAura, decodeWeakAura } = require('../../../lib/weakaura_encoder');
const C = require('../../_shared/wa_constants');
const B = require('../../_shared/wa_builder');

const CLASS = "WARLOCK";
const SPEC = "Destruction";

// ============================================================================
// CORE COOLDOWNS — Primary DPS cooldowns
// ============================================================================
const corePos = B.centeredIconRow(8, C.ICON_SIZE, C.ICON_GAP);

const cdShadowburn = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Shadowburn", uid: "tk_wlk_dest_sburn",
    spellName: "Shadowburn", xOffset: corePos[0],
});
const cdConflag = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Conflagrate", uid: "tk_wlk_dest_conflag",
    spellName: "Conflagrate", xOffset: corePos[1],
});
const cdDeathCoil = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Death Coil", uid: "tk_wlk_dest_dc",
    spellName: "Death Coil", xOffset: corePos[2],
});
const cdShadowfury = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Shadowfury", uid: "tk_wlk_dest_sfury",
    spellName: "Shadowfury", xOffset: corePos[3],
});
const cdHowl = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Howl of Terror", uid: "tk_wlk_dest_howl",
    spellName: "Howl of Terror", xOffset: corePos[4],
});
const cdSpellLock = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Spell Lock", uid: "tk_wlk_dest_spelllock",
    spellName: "Spell Lock", xOffset: corePos[5],
});
const cdTrink1 = B.buildTrinketIcon(CLASS, {
    id: "TK - CD: Trinket 1", uid: "tk_wlk_dest_t1",
    slot: 13, xOffset: corePos[6],
});
const cdTrink2 = B.buildTrinketIcon(CLASS, {
    id: "TK - CD: Trinket 2", uid: "tk_wlk_dest_t2",
    slot: 14, xOffset: corePos[7],
});

// ============================================================================
// DOT TRACKING — On target (offensive debuffs)
// ============================================================================
const DOT_Y = C.ICON_Y;
const dotImmolate = B.buildBuffIcon(CLASS, {
    id: "TK - DoT: Immolate", uid: "tk_wlk_dest_dot_immo",
    spellName: "Immolate", xOffset: 170, yOffset: DOT_Y,
    unit: "target", ownOnly: true, debuffType: "HARMFUL",
});
const dotCorruption = B.buildBuffIcon(CLASS, {
    id: "TK - DoT: Corruption", uid: "tk_wlk_dest_dot_corr",
    spellName: "Corruption", xOffset: 198, yOffset: DOT_Y,
    unit: "target", ownOnly: true, debuffType: "HARMFUL",
});
const dotCoE = B.buildBuffIcon(CLASS, {
    id: "TK - DoT: Curse of Elements", uid: "tk_wlk_dest_dot_coe",
    spellName: "Curse of the Elements", xOffset: 226, yOffset: DOT_Y,
    unit: "target", ownOnly: true, debuffType: "HARMFUL",
});
const dotCoD = B.buildBuffIcon(CLASS, {
    id: "TK - DoT: Curse of Doom", uid: "tk_wlk_dest_dot_cod",
    spellName: "Curse of Doom", xOffset: 254, yOffset: DOT_Y,
    unit: "target", ownOnly: true, debuffType: "HARMFUL",
});

// ============================================================================
// PROC TRACKING — Backlash (instant Shadow Bolt), Nightfall (Shadow Trance)
// ============================================================================
const procBacklash = B.buildBuffIcon(CLASS, {
    id: "TK - Proc: Backlash", uid: "tk_wlk_dest_backlash",
    spellName: "Backlash", xOffset: -170, yOffset: DOT_Y,
    unit: "player", ownOnly: true, debuffType: "HELPFUL",
});
const procNightfall = B.buildBuffIcon(CLASS, {
    id: "TK - Proc: Shadow Trance", uid: "tk_wlk_dest_nightfall",
    spellName: "Shadow Trance", xOffset: -198, yOffset: DOT_Y,
    unit: "player", ownOnly: true, debuffType: "HELPFUL",
});

// ============================================================================
// SELF-BUFF REMINDERS
// ============================================================================
const REMIND_Y = C.ICON_Y + C.ICON_SIZE + 4;
const remPos = B.centeredIconRow(1, C.ICON_SIZE, C.ICON_GAP);

const remFelArmor = B.buildMissingBuffReminder(CLASS, {
    id: "TK - Reminder: Fel Armor", uid: "tk_wlk_dest_rem_fa",
    spellName: "Fel Armor", xOffset: remPos[0], yOffset: REMIND_Y,
});

// ============================================================================
// SATED TRACKER
// ============================================================================
const satedTracker = B.buildSatedTracker(CLASS, {
    id: "TK - Sated Tracker", uid: "tk_wlk_dest_sated",
    xOffset: 282, yOffset: C.ICON_Y,
});

// ============================================================================
// BARS — Mana, 5SR, Tick, Cast
// ============================================================================
const manaBar = B.buildResourceBar(CLASS, {
    id: "TK - Mana Bar", uid: "tk_wlk_dest_mana",
    powerType: C.POWER_TYPE.MANA,
});
const fsrTimer = B.buildFiveSecondRule(CLASS, {
    id: "TK - 5SR Timer", uid: "tk_wlk_dest_5sr",
});
const tickTimer = B.buildTickTimer(CLASS, {
    id: "TK - Tick Timer", uid: "tk_wlk_dest_tick",
});
const castBar = B.buildCastBar(CLASS, {
    id: "TK - Cast Bar", uid: "tk_wlk_dest_cast",
});

// ============================================================================
// MASTER GROUP
// ============================================================================
const childAuras = [
    cdShadowburn, cdConflag, cdDeathCoil, cdShadowfury, cdHowl, cdSpellLock, cdTrink1, cdTrink2,
    dotImmolate, dotCorruption, dotCoE, dotCoD,
    procBacklash, procNightfall,
    remFelArmor,
    satedTracker,
    manaBar, fsrTimer, tickTimer, castBar,
];
const childNames = childAuras.map(a => a.id);

const masterGroup = B.buildGroup(CLASS, {
    id: "Tidekeeper - Warlock Destruction",
    uid: "tk_warlock_dest",
    childNames,
    groupIcon: 136186,
});

childAuras.forEach(c => { c.parent = masterGroup.id; });

// ============================================================================
// ENCODE & OUTPUT
// ============================================================================
const groupWrapper = B.wrapGroupAura(masterGroup, childAuras);
console.log(`Encoding ${masterGroup.id}...`);
const fullImport = encodeWeakAura(groupWrapper);
console.log(`  Full import: ${fullImport.length} characters`);

let output = `# Tidekeeper — Destruction Warlock WeakAura Import Strings
# TBC Anniversary 2026
#
# Import the FULL GROUP string below into /wa > Import

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
    const checks = ['Shadowburn', 'Conflagrate', 'Death Coil', 'Shadowfury',
                     'Howl of Terror', 'Immolate', 'Corruption', 'Backlash',
                     'Fel Armor', 'Sated', 'Mana Bar'];
    const passed = checks.filter(c => str.includes(c));
    console.log(`  Verification: ${passed.length}/${checks.length} checks passed`);
    if (passed.length === checks.length) console.log("  VALID");
    else console.log("  Missing: " + checks.filter(c => !str.includes(c)).join(', '));
} catch (e) { console.log("  ERROR: " + e.message); }
