/**
 * Tidekeeper — Holy Paladin WeakAura Generator
 * ==============================================
 * TBC Anniversary 2026 | Holy Paladin (PvE Healing)
 */

const path = require('path');
const fs = require('fs');
const { encodeWeakAura, decodeWeakAura } = require('../../../lib/weakaura_encoder');
const C = require('../../_shared/wa_constants');
const B = require('../../_shared/wa_builder');

const CLASS = "PALADIN";
const SPEC = "Holy";

// ============================================================================
// CORE COOLDOWNS — Primary healing/utility CDs
// ============================================================================
// 8 icons: Holy Shock, Divine Illumination, Divine Favor, Blessing of Protection,
//          Avenging Wrath, Lay on Hands, Trinket 1, Trinket 2
const corePos = B.centeredIconRow(8, C.ICON_SIZE, C.ICON_GAP);

const cdHolyShock = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Holy Shock", uid: "tk_pal_holy_hs",
    spellName: "Holy Shock", xOffset: corePos[0],
});
const cdDivineIllum = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Divine Illumination", uid: "tk_pal_holy_di",
    spellName: "Divine Illumination", xOffset: corePos[1],
});
const cdDivineFavor = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Divine Favor", uid: "tk_pal_holy_df",
    spellName: "Divine Favor", xOffset: corePos[2],
});
const cdBoP = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Blessing of Protection", uid: "tk_pal_holy_bop",
    spellName: "Blessing of Protection", xOffset: corePos[3],
});
const cdAvengingWrath = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Avenging Wrath", uid: "tk_pal_holy_aw",
    spellName: "Avenging Wrath", xOffset: corePos[4],
});
const cdLoH = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Lay on Hands", uid: "tk_pal_holy_loh",
    spellName: "Lay on Hands", xOffset: corePos[5],
});
const cdTrink1 = B.buildTrinketIcon(CLASS, {
    id: "TK - CD: Trinket 1", uid: "tk_pal_holy_t1",
    slot: 13, xOffset: corePos[6],
});
const cdTrink2 = B.buildTrinketIcon(CLASS, {
    id: "TK - CD: Trinket 2", uid: "tk_pal_holy_t2",
    slot: 14, xOffset: corePos[7],
});

// ============================================================================
// SECONDARY ROW — Utility cooldowns (below core icons)
// ============================================================================
const SEC_Y = C.ICON_Y - C.ICON_SIZE - 2; // Below core row
const secPos = B.centeredIconRow(6, C.ICON_SIZE, C.ICON_GAP);

const cdHoJ = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Hammer of Justice", uid: "tk_pal_holy_hoj",
    spellName: "Hammer of Justice", xOffset: secPos[0], yOffset: SEC_Y,
});
const cdBoSac = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Blessing of Sacrifice", uid: "tk_pal_holy_bosac",
    spellName: "Blessing of Sacrifice", xOffset: secPos[1], yOffset: SEC_Y,
});
const cdDS = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Divine Shield", uid: "tk_pal_holy_ds",
    spellName: "Divine Shield", xOffset: secPos[2], yOffset: SEC_Y,
});
const cdCleanse = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Cleanse", uid: "tk_pal_holy_cleanse",
    spellName: "Cleanse", xOffset: secPos[3], yOffset: SEC_Y,
});
const cdConsecration = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Consecration", uid: "tk_pal_holy_consec",
    spellName: "Consecration", xOffset: secPos[4], yOffset: SEC_Y,
});
const cdHoW = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Hammer of Wrath", uid: "tk_pal_holy_how",
    spellName: "Hammer of Wrath", xOffset: secPos[5], yOffset: SEC_Y,
});

// ============================================================================
// SELF-BUFF REMINDERS — Blessing of Light (target), Seal (self), Righteous Fury
// ============================================================================
const REMIND_Y = C.ICON_Y + C.ICON_SIZE + 4; // Above icon row
const remPos = B.centeredIconRow(3, C.ICON_SIZE, C.ICON_GAP);

const remBlessingOfLight = B.buildMissingBuffReminder(CLASS, {
    id: "TK - Reminder: Blessing of Light", uid: "tk_pal_holy_rem_bol",
    spellName: "Blessing of Light", xOffset: remPos[0], yOffset: REMIND_Y,
    unit: "target",
});
const remSeal = B.buildMissingBuffReminder(CLASS, {
    id: "TK - Reminder: Seal Missing", uid: "tk_pal_holy_rem_seal",
    spellName: "Seal of Light", xOffset: remPos[1], yOffset: REMIND_Y,
});
const remRighteousFury = B.buildMissingBuffReminder(CLASS, {
    id: "TK - Reminder: Righteous Fury", uid: "tk_pal_holy_rem_rf",
    spellName: "Righteous Fury", xOffset: remPos[2], yOffset: REMIND_Y,
});

// ============================================================================
// SATED TRACKER (TBC Anniversary 2026)
// ============================================================================
const satedTracker = B.buildSatedTracker(CLASS, {
    id: "TK - Sated Tracker", uid: "tk_pal_holy_sated",
    xOffset: 210, yOffset: C.ICON_Y,
});

// ============================================================================
// BARS — Mana, 5SR, Tick Timer, Cast Bar
// ============================================================================
const manaBar = B.buildResourceBar(CLASS, {
    id: "TK - Mana Bar", uid: "tk_pal_holy_mana",
    powerType: C.POWER_TYPE.MANA,
});
const fsrTimer = B.buildFiveSecondRule(CLASS, {
    id: "TK - 5SR Timer", uid: "tk_pal_holy_5sr",
});
const tickTimer = B.buildTickTimer(CLASS, {
    id: "TK - Tick Timer", uid: "tk_pal_holy_tick",
});
const castBar = B.buildCastBar(CLASS, {
    id: "TK - Cast Bar", uid: "tk_pal_holy_cast",
});

// ============================================================================
// MASTER GROUP
// ============================================================================
const childAuras = [
    // Core row
    cdHolyShock, cdDivineIllum, cdDivineFavor, cdBoP, cdAvengingWrath, cdLoH, cdTrink1, cdTrink2,
    // Secondary row
    cdHoJ, cdBoSac, cdDS, cdCleanse, cdConsecration, cdHoW,
    // Reminders
    remBlessingOfLight, remSeal, remRighteousFury,
    // Sated
    satedTracker,
    // Bars
    manaBar, fsrTimer, tickTimer, castBar,
];
const childNames = childAuras.map(a => a.id);

const masterGroup = B.buildGroup(CLASS, {
    id: "Tidekeeper - Paladin Holy",
    uid: "tk_paladin_holy",
    childNames,
    groupIcon: 135920, // Holy Paladin icon
});

childAuras.forEach(c => { c.parent = masterGroup.id; });

// ============================================================================
// ENCODE & OUTPUT
// ============================================================================
const groupWrapper = B.wrapGroupAura(masterGroup, childAuras);
console.log(`Encoding ${masterGroup.id}...`);
const fullImport = encodeWeakAura(groupWrapper);
console.log(`  Full import: ${fullImport.length} characters`);

let output = `# Tidekeeper — Holy Paladin WeakAura Import Strings
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
    const checks = ['Holy Shock', 'Divine Illumination', 'Divine Favor', 'Avenging Wrath',
                     'Lay on Hands', 'Blessing of Light', 'Righteous Fury', 'Sated', 'Mana Bar', 'Cast Bar'];
    const passed = checks.filter(c => str.includes(c));
    console.log(`  Verification: ${passed.length}/${checks.length} checks passed`);
    if (passed.length === checks.length) console.log("  VALID");
    else console.log("  Missing: " + checks.filter(c => !str.includes(c)).join(', '));
} catch (e) { console.log("  ERROR: " + e.message); }
