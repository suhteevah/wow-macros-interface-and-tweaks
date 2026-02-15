/**
 * Tidekeeper WA Suite — Shared Constants
 * =======================================
 * All visual, layout, and versioning constants shared across every class/spec.
 * TBC Anniversary 2026 | Client 2.5.5 | Interface 20505
 */

// ============================================================================
// VERSIONING
// ============================================================================
const INTERNAL_VERSION = 78;           // WeakAuras classic internal version (2025/2026)
const WA_VERSION_STRING = "5.14.0";    // WeakAuras semver
const TRANSMIT_VERSION = 1421;         // Flat auras (no nested sub-groups)
const TOC_VERSION = 20505;             // TBC Anniversary client

// ============================================================================
// LAYOUT — Positioned at character feet level
// ============================================================================
const FEET_Y = -100;                   // Character feet reference line (screen center Y offset)
const ICON_SIZE = 28;                  // Standard cooldown icon size
const ICON_GAP = 0;                    // Gap between icons (tight row)
const ICON_Y = FEET_Y - (ICON_SIZE / 2); // = -114, icon centers
const BAR_WIDTH = 315;                 // Standard bar width (~10% narrower than 350)
const BAR_HEIGHT_MAIN = 16;            // Main resource bar height
const BAR_HEIGHT_THIN = 4;             // Thin bars (5SR, cast, tick)

// Vertical stacking below icons:
// Icon bottom = FEET_Y - ICON_SIZE = -128
// Mana bar top = -130 (2px gap), center = -130 - 8 = -138
const MANA_Y = -138;
// FSR top = mana bottom = -138 - 8 = -146, center = -146 - 2 = -148
const FSR_Y = -148;
// Cast bar top = FSR bottom = -148 - 2 = -150, center = -150 - 2 = -152
const CASTBAR_Y = -152;

// ============================================================================
// COLORS — Resource bars
// ============================================================================
const COLORS = {
    // Mana (blue, with conditional teal/red)
    MANA_HIGH:    { 1: 0.08, 2: 0.38, 3: 0.74, 4: 1 },   // >50% blue
    MANA_MID:     { 1: 0.1,  2: 0.65, 3: 0.65, 4: 1 },   // 25-50% teal
    MANA_LOW:     { 1: 0.85, 2: 0.15, 3: 0.15, 4: 1 },   // <25% red

    // Rage (warrior, bear druid)
    RAGE:         { 1: 0.85, 2: 0.15, 3: 0.15, 4: 1 },
    RAGE_MID:     { 1: 0.85, 2: 0.45, 3: 0.10, 4: 1 },
    RAGE_HIGH:    { 1: 1.0,  2: 0.2,  3: 0.2,  4: 1 },

    // Energy (rogue, cat druid)
    ENERGY:       { 1: 1.0,  2: 0.82, 3: 0.0,  4: 1 },
    ENERGY_MID:   { 1: 0.85, 2: 0.65, 3: 0.0,  4: 1 },
    ENERGY_LOW:   { 1: 0.75, 2: 0.45, 3: 0.0,  4: 1 },

    // Bars
    BAR_BG:       { 1: 0.1,  2: 0.1,  3: 0.1,  4: 0.35 }, // Background
    BAR_BG_SOLID: { 1: 0.1,  2: 0.1,  3: 0.1,  4: 0.7 },  // Background (solid)
    CAST_GREEN:   { 1: 0.18, 2: 0.80, 3: 0.44, 4: 1 },     // Cast bar fill
    FSR_ORANGE:   { 1: 1.0,  2: 0.55, 3: 0.0,  4: 1 },     // 5SR timer
    TICK_CYAN:    { 1: 0.0,  2: 0.9,  3: 1.0,  4: 0.9 },   // Mana tick spark

    // Glows
    GLOW_READY:   { 1: 0, 2: 1,   3: 0.53, 4: 1 },         // Green pixel glow (ready)
    GLOW_ES_OK:   { 1: 0, 2: 0.9, 3: 0.3,  4: 1 },         // Earth Shield healthy
    GLOW_ES_LOW:  { 1: 1, 2: 0.2, 3: 0.1,  4: 1 },         // Earth Shield low
    GLOW_ES_NONE: { 1: 1, 2: 0,   3: 0,    4: 1 },         // Earth Shield expired

    // Sated debuff
    SATED:        { 1: 0.6, 2: 0.2, 3: 0.8, 4: 1 },        // Purple for Sated/Exhaustion

    // Text
    TEXT_WHITE:   { 1: 1, 2: 1, 3: 1, 4: 1 },
    TEXT_DIM:     { 1: 1, 2: 1, 3: 1, 4: 0.7 },
    TEXT_FSR:     { 1: 1, 2: 0.8, 3: 0.4, 4: 0.5 },

    // Spark
    SPARK_WHITE:  { 1: 1, 2: 1, 3: 1, 4: 0.7 },
    SPARK_CLEAR:  { 1: 0, 2: 0, 3: 0, 4: 0 },
};

// ============================================================================
// FONTS & TEXTURES
// ============================================================================
const FONT = "Friz Quadrata TT";       // Built-in WoW font (no addon needed)
const FONT_SIZE = {
    ICON_CD: 12,                        // Cooldown text on icons
    ICON_STACKS: 14,                    // Stack count on icons
    BAR_MAIN: 10,                       // Main bar text
    BAR_PERCENT: 9,                     // Percentage text
    BAR_LABEL: 7,                       // Small labels (5SR)
};

const TEXTURE = {
    BAR: "Smooth v2",                   // Bar fill texture
    SPARK: "Interface\\CastingBar\\UI-CastingBar-Spark",
};

// ============================================================================
// TEXT FORMAT — Number display (prevents FPU precision issues)
// ============================================================================
const TEXT_FORMAT_NUMBER = {
    format: "Number",
    round_type: "floor",
    decimal_precision: 0,
};

const TEXT_FORMAT_TIMED = {
    format: "timed",
    time_precision: 0,
    time_dynamic_threshold: 3,
};

// ============================================================================
// CLASS IDS — WoW TBC class identifiers
// ============================================================================
const CLASS_ID = {
    WARRIOR: 1,
    PALADIN: 2,
    HUNTER:  3,
    ROGUE:   4,
    PRIEST:  5,
    SHAMAN:  7,
    MAGE:    8,
    WARLOCK: 9,
    DRUID:   11,
};

const CLASS_NAME = {
    1:  "WARRIOR",
    2:  "PALADIN",
    3:  "HUNTER",
    4:  "ROGUE",
    5:  "PRIEST",
    7:  "SHAMAN",
    8:  "MAGE",
    9:  "WARLOCK",
    11: "DRUID",
};

// Power type constants (for resource bars)
const POWER_TYPE = {
    MANA:   0,
    RAGE:   1,
    ENERGY: 3,
};

// TBC talent tree indices (1-based, per class)
// Format: CLASS: { SPEC_NAME: treeIndex }
const TALENT_TREE = {
    WARRIOR: { ARMS: 1, FURY: 2, PROTECTION: 3 },
    PALADIN: { HOLY: 1, PROTECTION: 2, RETRIBUTION: 3 },
    HUNTER:  { BEAST_MASTERY: 1, MARKSMANSHIP: 2, SURVIVAL: 3 },
    ROGUE:   { ASSASSINATION: 1, COMBAT: 2, SUBTLETY: 3 },
    PRIEST:  { DISCIPLINE: 1, HOLY: 2, SHADOW: 3 },
    SHAMAN:  { ELEMENTAL: 1, ENHANCEMENT: 2, RESTORATION: 3 },
    MAGE:    { ARCANE: 1, FIRE: 2, FROST: 3 },
    WARLOCK: { AFFLICTION: 1, DEMONOLOGY: 2, DESTRUCTION: 3 },
    DRUID:   { BALANCE: 1, FERAL: 2, RESTORATION: 3 },
};

// ============================================================================
// SATED / EXHAUSTION — TBC Anniversary 2026 specific
// ============================================================================
const SATED_SPELL_ID = 57724;          // Sated (Alliance — from Heroism)
const EXHAUSTION_SPELL_ID = 57723;     // Exhaustion (Horde — from Bloodlust)
const SATED_DURATION = 600;            // 10 minutes (new in TBC Anniversary 2026)

// ============================================================================
// EXPORTS
// ============================================================================
module.exports = {
    // Versioning
    INTERNAL_VERSION, WA_VERSION_STRING, TRANSMIT_VERSION, TOC_VERSION,
    // Layout
    FEET_Y, ICON_SIZE, ICON_GAP, ICON_Y, BAR_WIDTH,
    BAR_HEIGHT_MAIN, BAR_HEIGHT_THIN, MANA_Y, FSR_Y, CASTBAR_Y,
    // Colors
    COLORS,
    // Fonts & Textures
    FONT, FONT_SIZE, TEXTURE,
    // Text format
    TEXT_FORMAT_NUMBER, TEXT_FORMAT_TIMED,
    // Class data
    CLASS_ID, CLASS_NAME, POWER_TYPE, TALENT_TREE,
    // Sated
    SATED_SPELL_ID, EXHAUSTION_SPELL_ID, SATED_DURATION,
};
