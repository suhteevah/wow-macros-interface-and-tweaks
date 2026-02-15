/**
 * Tidekeeper — Demonology Warlock WeakAura Generator
 * =====================================================
 * TBC Anniversary 2026 | Demonology Warlock (Pet-focused DPS)
 */

const path = require('path');
const fs = require('fs');
const { encodeWeakAura, decodeWeakAura } = require('../../../lib/weakaura_encoder');
const C = require('../../_shared/wa_constants');
const B = require('../../_shared/wa_builder');

const CLASS = "WARLOCK";
const SPEC = "Demonology";

// ============================================================================
// CORE COOLDOWNS — Primary DPS cooldowns
// ============================================================================
const corePos = B.centeredIconRow(8, C.ICON_SIZE, C.ICON_GAP);

const cdDeathCoil = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Death Coil", uid: "tk_wlk_demo_dc",
    spellName: "Death Coil", xOffset: corePos[0],
});
const cdHowl = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Howl of Terror", uid: "tk_wlk_demo_howl",
    spellName: "Howl of Terror", xOffset: corePos[1],
});
const cdDemonicSac = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Demonic Sacrifice", uid: "tk_wlk_demo_demsac",
    spellName: "Demonic Sacrifice", xOffset: corePos[2],
});
const cdFelDom = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Fel Domination", uid: "tk_wlk_demo_feldom",
    spellName: "Fel Domination", xOffset: corePos[3],
});
const cdSoulLink = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Soul Link", uid: "tk_wlk_demo_soullink",
    spellName: "Soul Link", xOffset: corePos[4],
});
const cdDarkPact = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Dark Pact", uid: "tk_wlk_demo_darkpact",
    spellName: "Dark Pact", xOffset: corePos[5],
});
const cdTrink1 = B.buildTrinketIcon(CLASS, {
    id: "TK - CD: Trinket 1", uid: "tk_wlk_demo_t1",
    slot: 13, xOffset: corePos[6],
});
const cdTrink2 = B.buildTrinketIcon(CLASS, {
    id: "TK - CD: Trinket 2", uid: "tk_wlk_demo_t2",
    slot: 14, xOffset: corePos[7],
});

// ============================================================================
// DOT TRACKING — On target (offensive debuffs)
// ============================================================================
const DOT_Y = C.ICON_Y;
const dotCorruption = B.buildBuffIcon(CLASS, {
    id: "TK - DoT: Corruption", uid: "tk_wlk_demo_dot_corr",
    spellName: "Corruption", xOffset: 170, yOffset: DOT_Y,
    unit: "target", ownOnly: true, debuffType: "HARMFUL",
});
const dotCoA = B.buildBuffIcon(CLASS, {
    id: "TK - DoT: Curse of Agony", uid: "tk_wlk_demo_dot_coa",
    spellName: "Curse of Agony", xOffset: 198, yOffset: DOT_Y,
    unit: "target", ownOnly: true, debuffType: "HARMFUL",
});
const dotCoE = B.buildBuffIcon(CLASS, {
    id: "TK - DoT: Curse of Elements", uid: "tk_wlk_demo_dot_coe",
    spellName: "Curse of the Elements", xOffset: 226, yOffset: DOT_Y,
    unit: "target", ownOnly: true, debuffType: "HARMFUL",
});
const dotCoD = B.buildBuffIcon(CLASS, {
    id: "TK - DoT: Curse of Doom", uid: "tk_wlk_demo_dot_cod",
    spellName: "Curse of Doom", xOffset: 254, yOffset: DOT_Y,
    unit: "target", ownOnly: true, debuffType: "HARMFUL",
});
const dotImmolate = B.buildBuffIcon(CLASS, {
    id: "TK - DoT: Immolate", uid: "tk_wlk_demo_dot_immo",
    spellName: "Immolate", xOffset: 282, yOffset: DOT_Y,
    unit: "target", ownOnly: true, debuffType: "HARMFUL",
});

// ============================================================================
// BUFF TRACKING — Demonic Sacrifice buff, Soul Link active
// ============================================================================
const buffDemSac = B.buildBuffIcon(CLASS, {
    id: "TK - Buff: Demonic Sacrifice", uid: "tk_wlk_demo_buf_demsac",
    spellName: "Demonic Sacrifice", xOffset: -170, yOffset: DOT_Y,
    unit: "player", ownOnly: true, debuffType: "HELPFUL",
});

// ============================================================================
// SELF-BUFF REMINDERS
// ============================================================================
const REMIND_Y = C.ICON_Y + C.ICON_SIZE + 4;
const remPos = B.centeredIconRow(2, C.ICON_SIZE, C.ICON_GAP);

const remFelArmor = B.buildMissingBuffReminder(CLASS, {
    id: "TK - Reminder: Fel Armor", uid: "tk_wlk_demo_rem_fa",
    spellName: "Fel Armor", xOffset: remPos[0], yOffset: REMIND_Y,
});
const remSoulLink = B.buildMissingBuffReminder(CLASS, {
    id: "TK - Reminder: Soul Link", uid: "tk_wlk_demo_rem_sl",
    spellName: "Soul Link", xOffset: remPos[1], yOffset: REMIND_Y,
});

// ============================================================================
// SATED TRACKER
// ============================================================================
const satedTracker = B.buildSatedTracker(CLASS, {
    id: "TK - Sated Tracker", uid: "tk_wlk_demo_sated",
    xOffset: 310, yOffset: C.ICON_Y,
});

// ============================================================================
// BARS — Mana, 5SR, Tick, Cast
// ============================================================================
const manaBar = B.buildResourceBar(CLASS, {
    id: "TK - Mana Bar", uid: "tk_wlk_demo_mana",
    powerType: C.POWER_TYPE.MANA,
});
const fsrTimer = B.buildFiveSecondRule(CLASS, {
    id: "TK - 5SR Timer", uid: "tk_wlk_demo_5sr",
});
const tickTimer = B.buildTickTimer(CLASS, {
    id: "TK - Tick Timer", uid: "tk_wlk_demo_tick",
});
const castBar = B.buildCastBar(CLASS, {
    id: "TK - Cast Bar", uid: "tk_wlk_demo_cast",
});

// ============================================================================
// MASTER GROUP
// ============================================================================
const childAuras = [
    cdDeathCoil, cdHowl, cdDemonicSac, cdFelDom, cdSoulLink, cdDarkPact, cdTrink1, cdTrink2,
    dotCorruption, dotCoA, dotCoE, dotCoD, dotImmolate,
    buffDemSac,
    remFelArmor, remSoulLink,
    satedTracker,
    manaBar, fsrTimer, tickTimer, castBar,
];
const childNames = childAuras.map(a => a.id);

const masterGroup = B.buildGroup(CLASS, {
    id: "Tidekeeper - Warlock Demonology",
    uid: "tk_warlock_demo",
    childNames,
    groupIcon: 136172,
});

childAuras.forEach(c => { c.parent = masterGroup.id; });

// ============================================================================
// ENCODE & OUTPUT
// ============================================================================
const groupWrapper = B.wrapGroupAura(masterGroup, childAuras);
console.log(`Encoding ${masterGroup.id}...`);
const fullImport = encodeWeakAura(groupWrapper);
console.log(`  Full import: ${fullImport.length} characters`);

let output = `# Tidekeeper — Demonology Warlock WeakAura Import Strings
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
    const checks = ['Death Coil', 'Howl of Terror', 'Demonic Sacrifice', 'Fel Domination',
                     'Soul Link', 'Corruption', 'Curse of Agony', 'Immolate',
                     'Fel Armor', 'Sated', 'Mana Bar'];
    const passed = checks.filter(c => str.includes(c));
    console.log(`  Verification: ${passed.length}/${checks.length} checks passed`);
    if (passed.length === checks.length) console.log("  VALID");
    else console.log("  Missing: " + checks.filter(c => !str.includes(c)).join(', '));
} catch (e) { console.log("  ERROR: " + e.message); }
