/**
 * Tidekeeper — Protection Paladin WeakAura Generator
 * ====================================================
 * TBC Anniversary 2026 | Protection Paladin (Tanking)
 */

const path = require('path');
const fs = require('fs');
const { encodeWeakAura, decodeWeakAura } = require('../../../lib/weakaura_encoder');
const C = require('../../_shared/wa_constants');
const B = require('../../_shared/wa_builder');

const CLASS = "PALADIN";
const SPEC = "Protection";

// ============================================================================
// CORE COOLDOWNS — Primary tanking CDs
// ============================================================================
// 8 icons: Avenger's Shield, Holy Shield, Consecration, Avenging Wrath,
//          Divine Shield, Lay on Hands, Trinket 1, Trinket 2
const corePos = B.centeredIconRow(8, C.ICON_SIZE, C.ICON_GAP);

const cdAvengersShield = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Avenger's Shield", uid: "tk_pal_prot_as",
    spellName: "Avenger's Shield", xOffset: corePos[0],
});
const cdHolyShield = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Holy Shield", uid: "tk_pal_prot_hshield",
    spellName: "Holy Shield", xOffset: corePos[1],
});
const cdConsecration = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Consecration", uid: "tk_pal_prot_consec",
    spellName: "Consecration", xOffset: corePos[2],
});
const cdAvengingWrath = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Avenging Wrath", uid: "tk_pal_prot_aw",
    spellName: "Avenging Wrath", xOffset: corePos[3],
});
const cdDivineShield = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Divine Shield", uid: "tk_pal_prot_ds",
    spellName: "Divine Shield", xOffset: corePos[4],
});
const cdLoH = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Lay on Hands", uid: "tk_pal_prot_loh",
    spellName: "Lay on Hands", xOffset: corePos[5],
});
const cdTrink1 = B.buildTrinketIcon(CLASS, {
    id: "TK - CD: Trinket 1", uid: "tk_pal_prot_t1",
    slot: 13, xOffset: corePos[6],
});
const cdTrink2 = B.buildTrinketIcon(CLASS, {
    id: "TK - CD: Trinket 2", uid: "tk_pal_prot_t2",
    slot: 14, xOffset: corePos[7],
});

// ============================================================================
// SECONDARY ROW — Utility cooldowns (below core icons)
// ============================================================================
const SEC_Y = C.ICON_Y - C.ICON_SIZE - 2; // Below core row
const secPos = B.centeredIconRow(6, C.ICON_SIZE, C.ICON_GAP);

const cdHoJ = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Hammer of Justice", uid: "tk_pal_prot_hoj",
    spellName: "Hammer of Justice", xOffset: secPos[0], yOffset: SEC_Y,
});
const cdBoP = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Blessing of Protection", uid: "tk_pal_prot_bop",
    spellName: "Blessing of Protection", xOffset: secPos[1], yOffset: SEC_Y,
});
const cdBoSac = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Blessing of Sacrifice", uid: "tk_pal_prot_bosac",
    spellName: "Blessing of Sacrifice", xOffset: secPos[2], yOffset: SEC_Y,
});
const cdJudgement = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Judgement", uid: "tk_pal_prot_judge",
    spellName: "Judgement", xOffset: secPos[3], yOffset: SEC_Y,
});
const cdExorcism = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Exorcism", uid: "tk_pal_prot_exo",
    spellName: "Exorcism", xOffset: secPos[4], yOffset: SEC_Y,
});
const cdHoW = B.buildCooldownIcon(CLASS, {
    id: "TK - CD: Hammer of Wrath", uid: "tk_pal_prot_how",
    spellName: "Hammer of Wrath", xOffset: secPos[5], yOffset: SEC_Y,
});

// ============================================================================
// BUFF TRACKING — Holy Shield active
// ============================================================================
const buffHolyShield = B.buildBuffIcon(CLASS, {
    id: "TK - Buff: Holy Shield", uid: "tk_pal_prot_hsbuff",
    spellName: "Holy Shield", xOffset: 180, yOffset: C.ICON_Y,
    unit: "player", ownOnly: true, debuffType: "HELPFUL",
});

// ============================================================================
// SELF-BUFF REMINDERS — Righteous Fury, Blessing, Holy Shield uptime
// ============================================================================
const REMIND_Y = C.ICON_Y + C.ICON_SIZE + 4; // Above icon row
const remPos = B.centeredIconRow(3, C.ICON_SIZE, C.ICON_GAP);

const remRighteousFury = B.buildMissingBuffReminder(CLASS, {
    id: "TK - Reminder: Righteous Fury", uid: "tk_pal_prot_rem_rf",
    spellName: "Righteous Fury", xOffset: remPos[0], yOffset: REMIND_Y,
});
const remBlessing = B.buildMissingBuffReminder(CLASS, {
    id: "TK - Reminder: Blessing Missing", uid: "tk_pal_prot_rem_bless",
    spellName: "Blessing of Kings", xOffset: remPos[1], yOffset: REMIND_Y,
});
const remHolyShield = B.buildMissingBuffReminder(CLASS, {
    id: "TK - Reminder: Holy Shield", uid: "tk_pal_prot_rem_hs",
    spellName: "Holy Shield", xOffset: remPos[2], yOffset: REMIND_Y,
});

// ============================================================================
// SATED TRACKER (TBC Anniversary 2026)
// ============================================================================
const satedTracker = B.buildSatedTracker(CLASS, {
    id: "TK - Sated Tracker", uid: "tk_pal_prot_sated",
    xOffset: 210, yOffset: C.ICON_Y,
});

// ============================================================================
// BARS — Mana, 5SR, Tick Timer, Cast Bar
// ============================================================================
const manaBar = B.buildResourceBar(CLASS, {
    id: "TK - Mana Bar", uid: "tk_pal_prot_mana",
    powerType: C.POWER_TYPE.MANA,
});
const fsrTimer = B.buildFiveSecondRule(CLASS, {
    id: "TK - 5SR Timer", uid: "tk_pal_prot_5sr",
});
const tickTimer = B.buildTickTimer(CLASS, {
    id: "TK - Tick Timer", uid: "tk_pal_prot_tick",
});
const castBar = B.buildCastBar(CLASS, {
    id: "TK - Cast Bar", uid: "tk_pal_prot_cast",
});

// ============================================================================
// MASTER GROUP
// ============================================================================
const childAuras = [
    // Core row
    cdAvengersShield, cdHolyShield, cdConsecration, cdAvengingWrath, cdDivineShield, cdLoH, cdTrink1, cdTrink2,
    // Secondary row
    cdHoJ, cdBoP, cdBoSac, cdJudgement, cdExorcism, cdHoW,
    // Buff tracking
    buffHolyShield,
    // Reminders
    remRighteousFury, remBlessing, remHolyShield,
    // Sated
    satedTracker,
    // Bars
    manaBar, fsrTimer, tickTimer, castBar,
];
const childNames = childAuras.map(a => a.id);

const masterGroup = B.buildGroup(CLASS, {
    id: "Tidekeeper - Paladin Protection",
    uid: "tk_paladin_prot",
    childNames,
    groupIcon: 135880, // Protection Paladin icon
});

childAuras.forEach(c => { c.parent = masterGroup.id; });

// ============================================================================
// ENCODE & OUTPUT
// ============================================================================
const groupWrapper = B.wrapGroupAura(masterGroup, childAuras);
console.log(`Encoding ${masterGroup.id}...`);
const fullImport = encodeWeakAura(groupWrapper);
console.log(`  Full import: ${fullImport.length} characters`);

let output = `# Tidekeeper — Protection Paladin WeakAura Import Strings
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
    const checks = ["Avenger's Shield", 'Holy Shield', 'Consecration', 'Avenging Wrath',
                     'Lay on Hands', 'Righteous Fury', 'Blessing of Kings', 'Sated', 'Mana Bar', 'Cast Bar'];
    const passed = checks.filter(c => str.includes(c));
    console.log(`  Verification: ${passed.length}/${checks.length} checks passed`);
    if (passed.length === checks.length) console.log("  VALID");
    else console.log("  Missing: " + checks.filter(c => !str.includes(c)).join(', '));
} catch (e) { console.log("  ERROR: " + e.message); }
