/**
 * Tidekeeper — Retribution Paladin WeakAura Generator
 * =====================================================
 * TBC Anniversary 2026 | Retribution Paladin (DPS)
 */

const path = require('path');
const fs = require('fs');
const { encodeWeakAura, decodeWeakAura } = require('../../../lib/weakaura_encoder');
const C = require('../../_shared/wa_constants');
const B = require('../../_shared/wa_builder');

const CLASS = "PALADIN";
const SPEC = "Retribution";

// ============================================================================
// CORE COOLDOWNS — Primary DPS CDs
// ============================================================================
// 8 icons: Crusader Strike, Avenging Wrath, Hammer of Wrath, Judgement,
//          Consecration, Repentance, Trinket 1, Trinket 2
const corePos = B.centeredIconRow(8, C.ICON_SIZE, C.ICON_GAP);

const cdCrusaderStrike = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Crusader Strike", uid: "tk_pal_ret_cs",
    spellName: "Crusader Strike", xOffset: corePos[0],
});
const cdAvengingWrath = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Avenging Wrath", uid: "tk_pal_ret_aw",
    spellName: "Avenging Wrath", xOffset: corePos[1],
});
const cdHoW = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Hammer of Wrath", uid: "tk_pal_ret_how",
    spellName: "Hammer of Wrath", xOffset: corePos[2],
});
const cdJudgement = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Judgement", uid: "tk_pal_ret_judge",
    spellName: "Judgement", xOffset: corePos[3],
});
const cdConsecration = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Consecration", uid: "tk_pal_ret_consec",
    spellName: "Consecration", xOffset: corePos[4],
});
const cdRepentance = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Repentance", uid: "tk_pal_ret_rep",
    spellName: "Repentance", xOffset: corePos[5],
});
const cdTrink1 = B.buildTrinketIcon(CLASS, {
    id: "TK - CD: Trinket 1", uid: "tk_pal_ret_t1",
    slot: 13, xOffset: corePos[6],
});
const cdTrink2 = B.buildTrinketIcon(CLASS, {
    id: "TK - CD: Trinket 2", uid: "tk_pal_ret_t2",
    slot: 14, xOffset: corePos[7],
});

// ============================================================================
// SECONDARY ROW — Utility cooldowns (below core icons)
// ============================================================================
const SEC_Y = C.ICON_Y - C.ICON_SIZE - 2; // Below core row
const secPos = B.centeredIconRow(6, C.ICON_SIZE, C.ICON_GAP);

const cdHoJ = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Hammer of Justice", uid: "tk_pal_ret_hoj",
    spellName: "Hammer of Justice", xOffset: secPos[0], yOffset: SEC_Y,
});
const cdDivineShield = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Divine Shield", uid: "tk_pal_ret_ds",
    spellName: "Divine Shield", xOffset: secPos[1], yOffset: SEC_Y,
});
const cdBoP = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Blessing of Protection", uid: "tk_pal_ret_bop",
    spellName: "Blessing of Protection", xOffset: secPos[2], yOffset: SEC_Y,
});
const cdLoH = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Lay on Hands", uid: "tk_pal_ret_loh",
    spellName: "Lay on Hands", xOffset: secPos[3], yOffset: SEC_Y,
});
const cdExorcism = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Exorcism", uid: "tk_pal_ret_exo",
    spellName: "Exorcism", xOffset: secPos[4], yOffset: SEC_Y,
});
const cdSoC = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Seal of Command", uid: "tk_pal_ret_soc",
    spellName: "Seal of Command", xOffset: secPos[5], yOffset: SEC_Y,
});

// ============================================================================
// PROC TRACKING — Vengeance (TBC Ret talent: +damage on crit)
// ============================================================================
const buffVengeance = B.buildBuffIcon(CLASS, {
    id: "TK - Proc: Vengeance", uid: "tk_pal_ret_veng",
    spellName: "Vengeance", xOffset: 180, yOffset: C.ICON_Y,
    unit: "player", ownOnly: true, debuffType: "HELPFUL", showStacks: true,
});

// ============================================================================
// SELF-BUFF REMINDERS — Seal of Command/Blood (missing), Blessing of Might
// ============================================================================
const REMIND_Y = C.ICON_Y + C.ICON_SIZE + 4; // Above icon row
const remPos = B.centeredIconRow(2, C.ICON_SIZE, C.ICON_GAP);

const remSeal = B.buildMissingBuffReminder(CLASS, {
    id: "TK - Reminder: Seal Missing", uid: "tk_pal_ret_rem_seal",
    spellName: "Seal of Command", xOffset: remPos[0], yOffset: REMIND_Y,
});
const remBlessing = B.buildMissingBuffReminder(CLASS, {
    id: "TK - Reminder: Blessing of Might", uid: "tk_pal_ret_rem_bom",
    spellName: "Blessing of Might", xOffset: remPos[1], yOffset: REMIND_Y,
});

// ============================================================================
// SATED TRACKER (TBC Anniversary 2026)
// ============================================================================
const satedTracker = B.buildSatedTracker(CLASS, {
    id: "TK - Sated Tracker", uid: "tk_pal_ret_sated",
    xOffset: 210, yOffset: C.ICON_Y,
});

// ============================================================================
// BARS — Mana, 5SR, Tick Timer, Cast Bar
// ============================================================================
const manaBar = B.buildResourceBar(CLASS, {
    id: "TK - Mana Bar", uid: "tk_pal_ret_mana",
    powerType: C.POWER_TYPE.MANA,
});
const fsrTimer = B.buildFiveSecondRule(CLASS, {
    id: "TK - 5SR Timer", uid: "tk_pal_ret_5sr",
});
const tickTimer = B.buildTickTimer(CLASS, {
    id: "TK - Tick Timer", uid: "tk_pal_ret_tick",
});
const castBar = B.buildCastBar(CLASS, {
    id: "TK - Cast Bar", uid: "tk_pal_ret_cast",
});

// ============================================================================
// MASTER GROUP
// ============================================================================
const childAuras = [
    // Core row
    cdCrusaderStrike, cdAvengingWrath, cdHoW, cdJudgement, cdConsecration, cdRepentance, cdTrink1, cdTrink2,
    // Secondary row
    cdHoJ, cdDivineShield, cdBoP, cdLoH, cdExorcism, cdSoC,
    // Proc tracking
    buffVengeance,
    // Reminders
    remSeal, remBlessing,
    // Sated
    satedTracker,
    // Bars
    manaBar, fsrTimer, tickTimer, castBar,
];
const childNames = childAuras.map(a => a.id);

const masterGroup = B.buildGroup(CLASS, {
    id: "Tidekeeper - Paladin Retribution",
    uid: "tk_paladin_ret",
    childNames,
    groupIcon: 135873, // Retribution Paladin icon
});

childAuras.forEach(c => { c.parent = masterGroup.id; });

// ============================================================================
// ENCODE & OUTPUT
// ============================================================================
const groupWrapper = B.wrapGroupAura(masterGroup, childAuras);
console.log(`Encoding ${masterGroup.id}...`);
const fullImport = encodeWeakAura(groupWrapper);
console.log(`  Full import: ${fullImport.length} characters`);

let output = `# Tidekeeper — Retribution Paladin WeakAura Import Strings
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
    const checks = ['Crusader Strike', 'Avenging Wrath', 'Hammer of Wrath', 'Judgement',
                     'Seal of Command', 'Blessing of Might', 'Vengeance', 'Sated', 'Mana Bar', 'Cast Bar'];
    const passed = checks.filter(c => str.includes(c));
    console.log(`  Verification: ${passed.length}/${checks.length} checks passed`);
    if (passed.length === checks.length) console.log("  VALID");
    else console.log("  Missing: " + checks.filter(c => !str.includes(c)).join(', '));
} catch (e) { console.log("  ERROR: " + e.message); }
