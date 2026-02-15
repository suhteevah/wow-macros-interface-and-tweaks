/**
 * Tidekeeper — Affliction Warlock WeakAura Generator
 * =====================================================
 * TBC Anniversary 2026 | Affliction Warlock (DoT DPS)
 */

const path = require('path');
const fs = require('fs');
const { encodeWeakAura, decodeWeakAura } = require('../../../lib/weakaura_encoder');
const C = require('../../_shared/wa_constants');
const B = require('../../_shared/wa_builder');

const CLASS = "WARLOCK";
const SPEC = "Affliction";

// ============================================================================
// CORE COOLDOWNS — Actual cooldowns with CD tracking
// ============================================================================
const corePos = B.centeredIconRow(7, C.ICON_SIZE, C.ICON_GAP);

const cdDeathCoil = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Death Coil", uid: "tk_wlk_aff_dc",
    spellName: "Death Coil", xOffset: corePos[0],
});
const cdHowl = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Howl of Terror", uid: "tk_wlk_aff_howl",
    spellName: "Howl of Terror", xOffset: corePos[1],
});
const cdSpellLock = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Spell Lock", uid: "tk_wlk_aff_spelllock",
    spellName: "Spell Lock", xOffset: corePos[2],
});
const cdAmpCurse = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Amplify Curse", uid: "tk_wlk_aff_ampcurse",
    spellName: "Amplify Curse", xOffset: corePos[3],
});
const cdDarkPact = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Dark Pact", uid: "tk_wlk_aff_darkpact",
    spellName: "Dark Pact", xOffset: corePos[4],
});
const cdTrink1 = B.buildTrinketIcon(CLASS, {
    id: "TK - CD: Trinket 1", uid: "tk_wlk_aff_t1",
    slot: 13, xOffset: corePos[5],
});
const cdTrink2 = B.buildTrinketIcon(CLASS, {
    id: "TK - CD: Trinket 2", uid: "tk_wlk_aff_t2",
    slot: 14, xOffset: corePos[6],
});

// ============================================================================
// DOT TRACKING — On target (offensive debuffs)
// ============================================================================
const DOT_Y = C.ICON_Y;
const dotCorruption = B.buildBuffIcon(CLASS, {
    id: "TK - DoT: Corruption", uid: "tk_wlk_aff_dot_corr",
    spellName: "Corruption", xOffset: 170, yOffset: DOT_Y,
    unit: "target", ownOnly: true, debuffType: "HARMFUL",
});
const dotCoA = B.buildBuffIcon(CLASS, {
    id: "TK - DoT: Curse of Agony", uid: "tk_wlk_aff_dot_coa",
    spellName: "Curse of Agony", xOffset: 198, yOffset: DOT_Y,
    unit: "target", ownOnly: true, debuffType: "HARMFUL",
});
const dotUA = B.buildBuffIcon(CLASS, {
    id: "TK - DoT: Unstable Affliction", uid: "tk_wlk_aff_dot_ua",
    spellName: "Unstable Affliction", xOffset: 226, yOffset: DOT_Y,
    unit: "target", ownOnly: true, debuffType: "HARMFUL",
});
const dotSiphon = B.buildBuffIcon(CLASS, {
    id: "TK - DoT: Siphon Life", uid: "tk_wlk_aff_dot_siphon",
    spellName: "Siphon Life", xOffset: 254, yOffset: DOT_Y,
    unit: "target", ownOnly: true, debuffType: "HARMFUL",
});
const dotSoC = B.buildBuffIcon(CLASS, {
    id: "TK - DoT: Seed of Corruption", uid: "tk_wlk_aff_dot_seed",
    spellName: "Seed of Corruption", xOffset: 282, yOffset: DOT_Y,
    unit: "target", ownOnly: true, debuffType: "HARMFUL",
});

// ============================================================================
// PROC/BUFF TRACKING — Nightfall proc (Shadow Trance)
// ============================================================================
const buffNightfall = B.buildBuffIcon(CLASS, {
    id: "TK - Buff: Shadow Trance", uid: "tk_wlk_aff_nightfall",
    spellName: "Shadow Trance", xOffset: -170, yOffset: DOT_Y,
    unit: "player", ownOnly: true, debuffType: "HELPFUL",
});

// ============================================================================
// SELF-BUFF REMINDERS
// ============================================================================
const REMIND_Y = C.ICON_Y + C.ICON_SIZE + 4;
const remPos = B.centeredIconRow(2, C.ICON_SIZE, C.ICON_GAP);

const remFelArmor = B.buildMissingBuffReminder(CLASS, {
    id: "TK - Reminder: Fel Armor", uid: "tk_wlk_aff_rem_fa",
    spellName: "Fel Armor", xOffset: remPos[0], yOffset: REMIND_Y,
});
const remTouchOfShadow = B.buildMissingBuffReminder(CLASS, {
    id: "TK - Reminder: Touch of Shadow", uid: "tk_wlk_aff_rem_tos",
    spellName: "Touch of Shadow", xOffset: remPos[1], yOffset: REMIND_Y,
});

// ============================================================================
// SATED TRACKER
// ============================================================================
const satedTracker = B.buildSatedTracker(CLASS, {
    id: "TK - Sated Tracker", uid: "tk_wlk_aff_sated",
    xOffset: 310, yOffset: C.ICON_Y,
});

// ============================================================================
// BARS — Mana, 5SR, Tick, Cast
// ============================================================================
const manaBar = B.buildResourceBar(CLASS, {
    id: "TK - Mana Bar", uid: "tk_wlk_aff_mana",
    powerType: C.POWER_TYPE.MANA,
});
const fsrTimer = B.buildFiveSecondRule(CLASS, {
    id: "TK - 5SR Timer", uid: "tk_wlk_aff_5sr",
});
const tickTimer = B.buildTickTimer(CLASS, {
    id: "TK - Tick Timer", uid: "tk_wlk_aff_tick",
});
const castBar = B.buildCastBar(CLASS, {
    id: "TK - Cast Bar", uid: "tk_wlk_aff_cast",
});

// ============================================================================
// MASTER GROUP
// ============================================================================
const childAuras = [
    cdDeathCoil, cdHowl, cdSpellLock, cdAmpCurse, cdDarkPact, cdTrink1, cdTrink2,
    dotCorruption, dotCoA, dotUA, dotSiphon, dotSoC,
    buffNightfall,
    remFelArmor, remTouchOfShadow,
    satedTracker,
    manaBar, fsrTimer, tickTimer, castBar,
];
const childNames = childAuras.map(a => a.id);

const masterGroup = B.buildGroup(CLASS, {
    id: "Tidekeeper - Warlock Affliction",
    uid: "tk_warlock_aff",
    childNames,
    groupIcon: 136145,
});

childAuras.forEach(c => { c.parent = masterGroup.id; });

// ============================================================================
// ENCODE & OUTPUT
// ============================================================================
const groupWrapper = B.wrapGroupAura(masterGroup, childAuras);
console.log(`Encoding ${masterGroup.id}...`);
const fullImport = encodeWeakAura(groupWrapper);
console.log(`  Full import: ${fullImport.length} characters`);

let output = `# Tidekeeper — Affliction Warlock WeakAura Import Strings
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
    const checks = ['Death Coil', 'Howl of Terror', 'Spell Lock', 'Corruption',
                     'Curse of Agony', 'Unstable Affliction', 'Siphon Life',
                     'Shadow Trance', 'Fel Armor', 'Sated', 'Mana Bar'];
    const passed = checks.filter(c => str.includes(c));
    console.log(`  Verification: ${passed.length}/${checks.length} checks passed`);
    if (passed.length === checks.length) console.log("  VALID");
    else console.log("  Missing: " + checks.filter(c => !str.includes(c)).join(', '));
} catch (e) { console.log("  ERROR: " + e.message); }
