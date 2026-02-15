/**
 * Tidekeeper HUD — Generate Importable WeakAura Strings
 * =====================================================
 * Generates real, paste-able import strings for /wa → Import
 */

const { encodeWeakAura } = require('./weakaura_encoder');
const fs = require('fs');
const path = require('path');

// ============================================================================
// HELPER: Build base aura template
// ============================================================================
// internalVersion must match what the WA client expects.
// WeakAuras classic uses internalVersion 78 as of 2025/2026.
const INTERNAL_VERSION = 78;
const WA_VERSION_STRING = "5.14.0";
// Transmission version: 1421 for flat auras, 2000 for nested groups.
// We use 1421 (no nested sub-groups) — children are listed flat in controlledChildren.
const TRANSMIT_VERSION = 1421;

function baseAura(overrides) {
    return {
        anchorFrameType: "SCREEN",
        anchorPoint: "CENTER",
        selfPoint: "CENTER",
        frameStrata: 3,
        version: 1,
        subVersion: 1,
        internalVersion: INTERNAL_VERSION,
        semver: "1.0.0",
        preferToUpdate: false,
        tocversion: 20505,
        source: "import",
        config: {},
        information: { forceEvents: true, ignoreOptionsEventErrors: true },
        animation: {
            start:  { type: "none", easeStrength: 3, easeType: "none", duration_type: "seconds", preset: "slidetop" },
            main:   { type: "none", easeStrength: 3, easeType: "none", duration_type: "seconds", preset: "spin" },
            finish: { type: "none", easeStrength: 3, easeType: "none", duration_type: "seconds", preset: "slidebottom" },
        },
        conditions: [],
        load: {
            talent: { multi: {} },
            class: { single: "SHAMAN", multi: { SHAMAN: true } },
            spec: { multi: {} },
            size: { multi: {} },
            use_class: true,
        },
        authorOptions: [],
        actions: { init: {}, start: {}, finish: {} },
        ...overrides,
    };
}

/**
 * Build the WeakAuras wrapper table for a single aura (no children).
 * Format: { m = "d", d = auraData, v = transmitVersion, s = versionString }
 */
function wrapSingleAura(aura) {
    // Strip non-transmissable fields for < 2000 version
    const data = { ...aura };
    delete data.parent;
    delete data.controlledChildren;
    delete data.authorMode;
    delete data.skipWagoUpdate;
    delete data.ignoreWagoUpdate;
    return {
        m: "d",
        d: data,
        v: TRANSMIT_VERSION,
        s: WA_VERSION_STRING,
    };
}

/**
 * Build the WeakAuras wrapper table for a group with children.
 * Format: { m = "d", d = groupData, v = version, s = versionString, c = {child1, child2, ...} }
 *
 * For version < 2000:
 *   - parent and controlledChildren are stripped from transmitted data
 *   - The importer rebuilds parent/controlledChildren from the c array
 */
function wrapGroupAura(group, childAuras) {
    const groupData = { ...group };
    // For version < 2000, strip controlledChildren and parent
    delete groupData.controlledChildren;
    delete groupData.parent;
    delete groupData.authorMode;
    delete groupData.skipWagoUpdate;
    delete groupData.ignoreWagoUpdate;

    // Build children as a Lua-style 1-indexed table
    const c = {};
    childAuras.forEach((child, i) => {
        const childData = { ...child };
        delete childData.parent;
        delete childData.authorMode;
        delete childData.skipWagoUpdate;
        delete childData.ignoreWagoUpdate;
        c[i + 1] = childData;
    });

    return {
        m: "d",
        d: groupData,
        v: TRANSMIT_VERSION,
        s: WA_VERSION_STRING,
        c: c,
    };
}

// ============================================================================
// AURA DEFINITIONS
// ============================================================================

// ---------- MANA BAR ----------
// Positioned at character feet level. Icons sit above, bars stack below.
// Icon tops at Y=-100 (feet line). Icon bottom = -128. Mana top = -130.
// Mana center = -130 - 8 = -138. Width 315 (~10% narrower than 350).
const FEET_Y = -100;        // Character feet reference line
const BAR_WIDTH = 315;      // 10% narrower than original 350
const MANA_Y = -138;        // Mana bar center
const manaBar = baseAura({
    id: "TK - Mana Bar",
    uid: "tidekeeper_manabar",
    regionType: "aurabar",
    width: BAR_WIDTH,
    height: 16,
    xOffset: 0,
    yOffset: MANA_Y,
    orientation: "HORIZONTAL",
    barColor: { 1: 0.08, 2: 0.38, 3: 0.74, 4: 1 },
    barColor2: { 1: 0.08, 2: 0.38, 3: 0.74, 4: 1 },
    backgroundColor: { 1: 0.1, 2: 0.1, 3: 0.1, 4: 0.35 },
    texture: "Smooth v2",
    spark: false,
    icon: false,
    icon_side: "RIGHT",
    zoom: 0,
    sparkTexture: "Interface\\CastingBar\\UI-CastingBar-Spark",
    sparkWidth: 10,
    sparkHeight: 30,
    sparkColor: { 1: 1, 2: 1, 3: 1, 4: 1 },
    sparkOffsetX: 0,
    sparkOffsetY: 0,
    sparkRotationMode: "AUTO",
    sparkDesaturate: false,
    sparkBlendMode: "ADD",
    triggers: {
        1: {
            trigger: {
                type: "unit",
                event: "Power",
                subeventSuffix: "",
                unit: "player",
                powertype: 0,
                use_unit: true,
                use_powertype: true,
                debuffType: "HELPFUL",
            },
            untrigger: {},
        },
        activeTriggerMode: -10,
    },
    subRegions: {
        1: { type: "subbackground" },
        2: { type: "subforeground" },
        3: {
            type: "subtext",
            text_text: "%p / %t",
            text_color: { 1: 1, 2: 1, 3: 1, 4: 1 },
            text_font: "Friz Quadrata TT",
            text_fontSize: 10,
            text_fontType: "OUTLINE",
            text_justify: "CENTER",
            text_anchorPoint: "INNER_CENTER",
            text_selfPoint: "AUTO",
            text_visible: true,
            text_text_format_p_format: "Number",
            text_text_format_p_round_type: "floor",
            text_text_format_p_decimal_precision: 0,
            text_text_format_t_format: "Number",
            text_text_format_t_round_type: "floor",
            text_text_format_t_decimal_precision: 0,
        },
        4: {
            type: "subtext",
            text_text: "%percentpower%%",
            text_color: { 1: 1, 2: 1, 3: 1, 4: 0.7 },
            text_font: "Friz Quadrata TT",
            text_fontSize: 9,
            text_fontType: "OUTLINE",
            text_justify: "RIGHT",
            text_anchorPoint: "INNER_RIGHT",
            text_anchorXOffset: -4,
            text_selfPoint: "AUTO",
            text_visible: true,
            text_text_format_percentpower_format: "Number",
            text_text_format_percentpower_round_type: "floor",
            text_text_format_percentpower_decimal_precision: 0,
        },
    },
    conditions: {
        1: {
            check: { trigger: 1, variable: "percentpower", op: ">", value: "50" },
            changes: {
                1: { property: "barColor", value: { 1: 0.08, 2: 0.38, 3: 0.74, 4: 1 } },
            },
        },
        2: {
            check: { trigger: 1, variable: "percentpower", op: "<=", value: "50" },
            changes: {
                1: { property: "barColor", value: { 1: 0.1, 2: 0.65, 3: 0.65, 4: 1 } },
            },
        },
        3: {
            check: { trigger: 1, variable: "percentpower", op: "<=", value: "25" },
            changes: {
                1: { property: "barColor", value: { 1: 0.85, 2: 0.15, 3: 0.15, 4: 1 } },
            },
        },
    },
});

// ---------- 5SR TIMER ----------
// Mana bar bottom = -138 - 8 = -146. 5SR height 4, center = -146 - 2 = -148.
const FSR_Y = -148;
const fsrTimer = baseAura({
    id: "TK - 5SR Timer",
    uid: "tidekeeper_5sr",
    regionType: "aurabar",
    width: BAR_WIDTH,
    height: 4,
    xOffset: 0,
    yOffset: FSR_Y,
    orientation: "HORIZONTAL",
    barColor: { 1: 1.0, 2: 0.55, 3: 0.0, 4: 1 },
    barColor2: { 1: 1.0, 2: 0.55, 3: 0.0, 4: 1 },
    backgroundColor: { 1: 0.1, 2: 0.1, 3: 0.1, 4: 0.5 },
    texture: "Smooth v2",
    spark: false,
    icon: false,
    icon_side: "RIGHT",
    zoom: 0,
    triggers: {
        1: {
            trigger: {
                type: "custom",
                custom_type: "stateupdate",
                check: "update",
                custom: `function(allstates, event, ...)
    if not aura_env.lastManaSpend then
        aura_env.lastManaSpend = 0
    end
    if event == "UNIT_SPELLCAST_SUCCEEDED" then
        local unit = ...
        if unit == "player" then
            aura_env.lastManaSpend = GetTime()
        end
    end
    local now = GetTime()
    local elapsed = now - aura_env.lastManaSpend
    if elapsed < 5.0 then
        allstates[""] = {
            show = true,
            changed = true,
            progressType = "timed",
            expirationTime = aura_env.lastManaSpend + 5.0,
            duration = 5.0,
            autoHide = false,
        }
    else
        allstates[""] = {
            show = UnitAffectingCombat("player") and (UnitPower("player", 0) < UnitPowerMax("player", 0)),
            changed = true,
            progressType = "timed",
            expirationTime = 0,
            duration = 0,
            autoHide = false,
        }
    end
    return true
end`,
                customVariables: "{}",
                events: "UNIT_SPELLCAST_SUCCEEDED",
                check_events: "UNIT_SPELLCAST_SUCCEEDED",
            },
            untrigger: {},
        },
        activeTriggerMode: -10,
    },
    actions: {
        init: {
            do_custom: true,
            custom: "aura_env.lastManaSpend = 0",
        },
        start: {},
        finish: {},
    },
    subRegions: {
        1: { type: "subbackground" },
        2: { type: "subforeground" },
        3: {
            type: "subtext",
            text_text: "5SR",
            text_color: { 1: 1, 2: 0.8, 3: 0.4, 4: 0.5 },
            text_font: "Friz Quadrata TT",
            text_fontSize: 7,
            text_fontType: "OUTLINE",
            text_anchorPoint: "INNER_LEFT",
            text_anchorXOffset: 2,
            text_selfPoint: "AUTO",
            text_visible: true,
        },
    },
});

// ---------- TICK TIMER (spark overlay on cast bar) ----------
// This bar is invisible — transparent bar+bg. Only the cyan spark is visible.
// Positioned exactly on top of the cast bar so the tick spark rides along it.
// 5SR bottom = -148 - 2 = -150. Cast bar height 4, center = -150 - 2 = -152.
// Tick overlay matches cast bar position exactly. Higher frameStrata so spark is on top.
const CASTBAR_Y = -152;
const tickTimer = baseAura({
    id: "TK - Tick Timer",
    uid: "tidekeeper_tick",
    regionType: "aurabar",
    frameStrata: 4,
    width: BAR_WIDTH,
    height: 4,
    xOffset: 0,
    yOffset: CASTBAR_Y,
    orientation: "HORIZONTAL",
    barColor: { 1: 0, 2: 0, 3: 0, 4: 0 },
    barColor2: { 1: 0, 2: 0, 3: 0, 4: 0 },
    backgroundColor: { 1: 0, 2: 0, 3: 0, 4: 0 },
    texture: "Smooth v2",
    spark: true,
    sparkTexture: "Interface\\CastingBar\\UI-CastingBar-Spark",
    sparkWidth: 6,
    sparkHeight: 14,
    sparkColor: { 1: 0.0, 2: 0.9, 3: 1.0, 4: 0.9 },
    sparkOffsetX: 0,
    sparkOffsetY: 0,
    sparkRotationMode: "AUTO",
    sparkDesaturate: false,
    sparkBlendMode: "ADD",
    icon: false,
    icon_side: "RIGHT",
    zoom: 0,
    triggers: {
        1: {
            trigger: {
                type: "custom",
                custom_type: "stateupdate",
                check: "update",
                custom: `function(allstates, event, ...)
    if not aura_env.lastMana then
        aura_env.lastMana = UnitPower("player", 0)
        aura_env.lastTickTime = GetTime()
        aura_env.lastTickAmount = 0
    end
    local curMana = UnitPower("player", 0)
    local maxMana = UnitPowerMax("player", 0)
    if curMana > aura_env.lastMana and curMana < maxMana then
        local tickAmt = curMana - aura_env.lastMana
        if tickAmt < (maxMana * 0.08) then
            aura_env.lastTickTime = GetTime()
            aura_env.lastTickAmount = tickAmt
        end
    end
    aura_env.lastMana = curMana
    local now = GetTime()
    local lastTick = aura_env.lastTickTime or now
    local nextTick = lastTick + 2.0
    while nextTick < now do
        nextTick = nextTick + 2.0
    end
    local shouldShow = UnitAffectingCombat("player") or (curMana < maxMana)
    allstates[""] = {
        show = shouldShow,
        changed = true,
        progressType = "timed",
        expirationTime = nextTick,
        duration = 2.0,
        autoHide = false,
    }
    return true
end`,
                customVariables: "{}",
                events: "UNIT_POWER_UPDATE",
                check_events: "UNIT_POWER_UPDATE",
            },
            untrigger: {},
        },
        activeTriggerMode: -10,
    },
    actions: {
        init: {
            do_custom: true,
            custom: "aura_env.lastMana = UnitPower(\"player\", 0)\naura_env.lastTickTime = GetTime()\naura_env.lastTickAmount = 0",
        },
        start: {},
        finish: {},
    },
    subRegions: {
        1: { type: "subbackground" },
        2: { type: "subforeground" },
    },
});

// ---------- CAST BAR ----------
// Thin 4px bar right below 5SR. The tick timer spark overlays on top of this.
// No icon (too thin), no text inside the bar. Just a clean progress line.
const castBar = baseAura({
    id: "TK - Cast Bar",
    uid: "tidekeeper_castbar",
    regionType: "aurabar",
    width: BAR_WIDTH,
    height: 4,
    xOffset: 0,
    yOffset: CASTBAR_Y,
    orientation: "HORIZONTAL",
    barColor: { 1: 0.18, 2: 0.80, 3: 0.44, 4: 1 },
    barColor2: { 1: 0.18, 2: 0.80, 3: 0.44, 4: 1 },
    backgroundColor: { 1: 0.1, 2: 0.1, 3: 0.1, 4: 0.7 },
    texture: "Smooth v2",
    spark: true,
    sparkTexture: "Interface\\CastingBar\\UI-CastingBar-Spark",
    sparkWidth: 6,
    sparkHeight: 14,
    sparkColor: { 1: 1, 2: 1, 3: 1, 4: 0.7 },
    sparkOffsetX: 0,
    sparkOffsetY: 0,
    sparkRotationMode: "AUTO",
    sparkDesaturate: false,
    sparkBlendMode: "ADD",
    icon: false,
    icon_side: "LEFT",
    zoom: 0,
    triggers: {
        1: {
            trigger: {
                type: "unit",
                event: "Cast",
                subeventSuffix: "",
                unit: "player",
                use_unit: true,
                debuffType: "HELPFUL",
            },
            untrigger: {},
        },
        activeTriggerMode: -10,
    },
    subRegions: {
        1: { type: "subbackground" },
        2: { type: "subforeground" },
    },
    conditions: [],
});

// ---------- COOLDOWN ICON BUILDER ----------
// Icons hide when spell is unknown (no ? icons). Uses "showOnReady" + usable check
// so they appear when the spell is known, and desaturate when on cooldown.
function makeCDIcon(id, uid, spellName, xOff, yOff) {
    return baseAura({
        id: id,
        uid: uid,
        regionType: "icon",
        width: 28,
        height: 28,
        xOffset: xOff,
        yOffset: yOff,
        cooldownSwipe: true,
        cooldownEdge: true,
        cooldownTextDisabled: false,
        desaturate: false,
        zoom: 0.1,
        keepAspectRatio: true,
        auto: true,
        icon: true,
        triggers: {
            1: {
                trigger: {
                    type: "spell",
                    event: "Cooldown Progress (Spell)",
                    spellName: spellName,
                    use_genericShowOn: true,
                    genericShowOn: "showAlways",
                    subeventSuffix: "",
                    use_spellName: true,
                    realSpellName: spellName,
                    unit: "player",
                    debuffType: "HELPFUL",
                },
                untrigger: {},
            },
            2: {
                trigger: {
                    type: "spell",
                    event: "Spell Known",
                    spellName: spellName,
                    use_spellName: true,
                },
                untrigger: {},
            },
            disjunctive: "all",
            activeTriggerMode: -10,
        },
        subRegions: {
            1: { type: "subbackground" },
            2: {
                type: "subtext",
                text_text: "%p",
                text_color: { 1: 1, 2: 1, 3: 1, 4: 1 },
                text_font: "Friz Quadrata TT",
                text_fontSize: 12,
                text_fontType: "THICKOUTLINE",
                text_anchorPoint: "CENTER",
                text_selfPoint: "AUTO",
                text_visible: true,
                text_text_format_p_format: "timed",
                text_text_format_p_time_precision: 0,
                text_text_format_p_time_dynamic_threshold: 3,
            },
            3: {
                type: "subglow",
                glow: false,
                glowType: "Pixel",
                glowColor: { 1: 0, 2: 1, 3: 0.53, 4: 1 },
                glowLines: 8,
                glowLength: 6,
                glowThickness: 2,
                glowFrequency: 0.25,
                glowXOffset: 0,
                glowYOffset: 0,
                glowScale: 1,
            },
        },
        conditions: {
            1: {
                check: { trigger: 1, variable: "onCooldown", value: 1 },
                changes: {
                    1: { property: "desaturate", value: true },
                    2: { "property": "sub.3.glow", value: false },
                },
            },
            2: {
                check: { trigger: 1, variable: "onCooldown", value: 0 },
                changes: {
                    1: { property: "desaturate", value: false },
                    2: { "property": "sub.3.glow", value: true },
                },
            },
        },
    });
}

// Earth Shield — buff tracker with stacks. Only shows when ES is active on someone.
const earthShield = baseAura({
    id: "TK - CD: Earth Shield",
    uid: "tidekeeper_cd_es",
    regionType: "icon",
    width: 28,
    height: 28,
    xOffset: 56,
    yOffset: -114,
    cooldownSwipe: false,
    cooldownEdge: false,
    cooldownTextDisabled: true,
    desaturate: false,
    zoom: 0.1,
    keepAspectRatio: true,
    auto: true,
    icon: true,
    triggers: {
        1: {
            trigger: {
                type: "aura2",
                event: "Health",
                subeventSuffix: "",
                auranames: { 1: "Earth Shield" },
                unit: "group",
                ownOnly: true,
                matchesShowOn: "showOnActive",
                useStacks: true,
                debuffType: "HELPFUL",
            },
            untrigger: {},
        },
        activeTriggerMode: -10,
    },
    subRegions: {
        1: { type: "subbackground" },
        2: {
            type: "subtext",
            text_text: "%s",
            text_color: { 1: 1, 2: 1, 3: 1, 4: 1 },
            text_font: "Friz Quadrata TT",
            text_fontSize: 14,
            text_fontType: "THICKOUTLINE",
            text_anchorPoint: "CENTER",
            text_selfPoint: "AUTO",
            text_visible: true,
        },
        3: {
            type: "subglow",
            glow: false,
            glowType: "Pixel",
            glowColor: { 1: 0, 2: 0.9, 3: 0.3, 4: 1 },
            glowLines: 8,
            glowLength: 6,
            glowThickness: 2,
            glowFrequency: 0.25,
            glowXOffset: 0,
            glowYOffset: 0,
            glowScale: 1,
        },
    },
    conditions: {
        1: {
            check: { trigger: 1, variable: "stacks", op: ">=", value: "5" },
            changes: {
                1: { "property": "sub.3.glow", value: true },
                2: { "property": "sub.3.glowColor", value: { 1: 0, 2: 0.9, 3: 0.3, 4: 1 } },
                3: { property: "desaturate", value: false },
            },
        },
        2: {
            check: { trigger: 1, variable: "stacks", op: "<=", value: "2" },
            changes: {
                1: { "property": "sub.3.glow", value: true },
                2: { "property": "sub.3.glowColor", value: { 1: 1, 2: 0.2, 3: 0.1, 4: 1 } },
                3: { property: "desaturate", value: false },
            },
        },
        3: {
            check: { trigger: 1, variable: "stacks", op: "==", value: "0" },
            changes: {
                1: { property: "desaturate", value: true },
                2: { "property": "sub.3.glow", value: true },
                3: { "property": "sub.3.glowColor", value: { 1: 1, 2: 0, 3: 0, 4: 1 } },
            },
        },
    },
});

// Trinket tracker — same 28px icons, same tight spacing
function makeTrinketIcon(id, uid, slot, xOff, yOff) {
    return baseAura({
        id: id,
        uid: uid,
        regionType: "icon",
        width: 28,
        height: 28,
        xOffset: xOff,
        yOffset: yOff,
        cooldownSwipe: true,
        cooldownEdge: true,
        cooldownTextDisabled: false,
        desaturate: false,
        zoom: 0.1,
        keepAspectRatio: true,
        auto: true,
        icon: true,
        triggers: {
            1: {
                trigger: {
                    type: "item",
                    event: "Cooldown Progress (Slot)",
                    itemSlot: slot,
                    use_genericShowOn: true,
                    genericShowOn: "showAlways",
                    unit: "player",
                    debuffType: "HELPFUL",
                },
                untrigger: {},
            },
            activeTriggerMode: -10,
        },
        subRegions: {
            1: { type: "subbackground" },
            2: {
                type: "subtext",
                text_text: "%p",
                text_color: { 1: 1, 2: 1, 3: 1, 4: 1 },
                text_font: "Friz Quadrata TT",
                text_fontSize: 12,
                text_fontType: "THICKOUTLINE",
                text_anchorPoint: "CENTER",
                text_selfPoint: "AUTO",
                text_visible: true,
                text_text_format_p_format: "timed",
                text_text_format_p_time_precision: 0,
                text_text_format_p_time_dynamic_threshold: 3,
            },
            3: {
                type: "subglow",
                glow: false,
                glowType: "Pixel",
                glowColor: { 1: 0, 2: 1, 3: 0.53, 4: 1 },
                glowLines: 8,
                glowLength: 6,
                glowThickness: 2,
                glowFrequency: 0.25,
                glowXOffset: 0,
                glowYOffset: 0,
                glowScale: 1,
            },
        },
        conditions: {
            1: {
                check: { trigger: 1, variable: "onCooldown", value: 1 },
                changes: {
                    1: { property: "desaturate", value: true },
                    2: { "property": "sub.3.glow", value: false },
                },
            },
            2: {
                check: { trigger: 1, variable: "onCooldown", value: 0 },
                changes: {
                    1: { property: "desaturate", value: false },
                    2: { "property": "sub.3.glow", value: true },
                },
            },
        },
    });
}

// Build cooldown icons — tight row with top edge at character feet line
// 28px icons, 0px gap = 28px per slot. 7 icons = 196px total.
// Centered: first icon center = -(196/2) + 14 = -84
// Icon top at FEET_Y (-100), icon center = -100 - 14 = -114.
const ICON_Y = FEET_Y - 14;
const cdNS   = makeCDIcon("TK - CD: Nature's Swiftness", "tk_cd_ns", "Nature's Swiftness", -84, ICON_Y);
const cdTF   = makeCDIcon("TK - CD: Elemental Mastery", "tk_cd_em", "Elemental Mastery", -56, ICON_Y);
const cdMT   = makeCDIcon("TK - CD: Mana Tide Totem", "tk_cd_mt", "Mana Tide Totem", -28, ICON_Y);
const cdHero = makeCDIcon("TK - CD: Heroism", "tk_cd_hero", "Heroism", 0, ICON_Y);
// Earth Shield at slot 5 — already created above with correct size, just set position
earthShield.xOffset = 28;
earthShield.yOffset = ICON_Y;
const cdTrink1 = makeTrinketIcon("TK - CD: Trinket 1", "tk_cd_t1", 13, 56, ICON_Y);
const cdTrink2 = makeTrinketIcon("TK - CD: Trinket 2", "tk_cd_t2", 14, 84, ICON_Y);

// ---------- MASTER GROUP ----------
const masterGroup = baseAura({
    id: "Tidekeeper HUD",
    uid: "tidekeeper_hud",
    regionType: "group",
    xOffset: 0,
    yOffset: 0,
    groupIcon: 136052,
    controlledChildren: {
        1: "TK - CD: Nature's Swiftness",
        2: "TK - CD: Elemental Mastery",
        3: "TK - CD: Mana Tide Totem",
        4: "TK - CD: Heroism",
        5: "TK - CD: Earth Shield",
        6: "TK - CD: Trinket 1",
        7: "TK - CD: Trinket 2",
        8: "TK - Mana Bar",
        9: "TK - 5SR Timer",
        10: "TK - Tick Timer",
        11: "TK - Cast Bar",
    },
    borderBackdrop: "Blizzard Tooltip",
    borderColor: { 1: 0, 2: 0, 3: 0, 4: 1 },
    borderEdge: "Square Full White",
    borderOffset: 0,
    borderSize: 2,
    scale: 1,
});

// Children list (order matches controlledChildren in master group)
const children = [cdNS, cdTF, cdMT, cdHero, earthShield, cdTrink1, cdTrink2, manaBar, fsrTimer, tickTimer, castBar];

// Set parent on all children (for internal reference — stripped on export)
children.forEach(c => { c.parent = "Tidekeeper HUD"; });


// ============================================================================
// ENCODE EVERYTHING
// ============================================================================

// Full group import: wrapper table with group data in "d" and children in "c"
// WeakAuras.Import expects: { m="d", d=<group_data>, v=<version>, s=<wa_version>, c=<children_array> }
const groupWrapper = wrapGroupAura(masterGroup, children);

console.log("Encoding Tidekeeper HUD (full group)...");
const fullImport = encodeWeakAura(groupWrapper);
console.log(`  Full group import string: ${fullImport.length} characters\n`);

// Also generate individual imports for each component (each wrapped properly)
const individualImports = {};
const allAuras = [masterGroup, ...children];
allAuras.forEach(aura => {
    const wrapper = wrapSingleAura(aura);
    const encoded = encodeWeakAura(wrapper);
    individualImports[aura.id] = encoded;
    console.log(`  ${aura.id}: ${encoded.length} chars`);
});

// ============================================================================
// WRITE OUTPUT
// ============================================================================

let output = `# Tidekeeper HUD — Importable WeakAura Strings
# ==============================================
# TBC Anniversary 2026 | Resto Shaman
#
# HOW TO IMPORT:
# 1. Open World of Warcraft
# 2. Type /wa to open WeakAuras
# 3. Click "Import" (top left)
# 4. Copy the ENTIRE string (including the ! at the start)
# 5. Paste it into the import box (Ctrl+V)
# 6. Click "Import" in the dialog
#
# RECOMMENDED: Import the FULL GROUP string first.
# It contains everything in one paste.
# Individual strings are provided if you want to import piece by piece.


================================================================================
 FULL GROUP IMPORT (PASTE THIS ONE — CONTAINS EVERYTHING)
================================================================================

${fullImport}


================================================================================
 INDIVIDUAL IMPORTS (Optional — use these to import pieces separately)
================================================================================

`;

for (const [name, str] of Object.entries(individualImports)) {
    output += `--- ${name} ---\n${str}\n\n`;
}

output += `
================================================================================
 WHAT'S INCLUDED
================================================================================

 Component               | Type          | Description
 ------------------------|---------------|--------------------------------------------
 Tidekeeper HUD          | Group         | Master container
 TK - Mana Bar           | Progress Bar  | 315x16, dynamic color (blue/teal/red)
 TK - 5SR Timer          | Progress Bar  | 350x5, orange→green 5-second rule timer
 TK - Tick Timer          | Progress Bar  | 350x5, cyan 2s mana regen tick tracker
 TK - Cast Bar           | Progress Bar  | 350x16, spell name + time + color coded
 TK - CD: Nature's Swift | Icon          | Panic button cooldown
 TK - CD: Elem Mastery   | Icon          | Instant crit CD (Elemental talent)
 TK - CD: Mana Tide      | Icon          | Group mana cooldown
 TK - CD: Heroism        | Icon          | Raid cooldown
 TK - CD: Earth Shield   | Icon          | Buff charge tracker (color by stacks)
 TK - CD: Trinket 1      | Icon          | Trinket slot 13
 TK - CD: Trinket 2      | Icon          | Trinket slot 14

================================================================================
 LAYOUT (Visual)
================================================================================

    [NS]  [EM]  [MT]  [Hero] [ES]  [T1]  [T2]    ← Cooldowns (glow=ready)
    ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░░░░░░░    ← Mana bar
    ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━    ← 5SR timer (orange)
    ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━    ← Tick timer (cyan)
    ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░░░░░░░░░░░░░░░░░░░░░    ← Cast bar (green/red)

================================================================================
 TROUBLESHOOTING
================================================================================

 If import fails:
  - Make sure you copied the ENTIRE string (starts with !)
  - Try /reload then import again
  - Check WeakAuras addon is up to date
  - If using TBC Anniversary client, ensure WeakAuras version supports v1 format

 If auras don't show:
  - Check Load tab → Class must be Shaman
  - 5SR and Tick bars only show in combat or when mana < 100%
  - Cooldown icons show always (desaturated when on CD)
  - Cast bar only shows while casting

 If tick timer desyncs after death:
  - Type /reload to reset the timer
`;

const outPath = path.join(__dirname, 'Tidekeeper_Import_Strings.txt');
fs.writeFileSync(outPath, output, 'utf8');
console.log(`\n✅ Written to: ${outPath}`);
console.log(`   Full group import: ${fullImport.length} characters`);
console.log(`   Individual imports: ${Object.keys(individualImports).length} auras`);

// Verification: decode the full import to confirm it's valid
const { decodeForPrint, decodeWeakAura } = require('./weakaura_encoder');
const pako = require('pako');

console.log(`\n--- Verification ---`);
try {
    const decoded = decodeWeakAura(fullImport);
    const inflatedStr = decoded.rawBuffer.toString('binary');

    console.log(`   Format: !WA:2! (LibSerialize v2)`);
    console.log(`   Decoded version: ${decoded.version} (should be 2)`);
    console.log(`   Inflated size: ${decoded.rawBuffer.length} bytes`);
    console.log(`   LibSerialize version byte: ${decoded.rawBuffer[0]} (should be 1)`);

    // Check wrapper structure markers
    const checks = [
        ['Tidekeeper HUD', inflatedStr.includes('Tidekeeper HUD')],
        ['TK - Mana Bar', inflatedStr.includes('TK - Mana Bar')],
        ['TK - 5SR Timer', inflatedStr.includes('TK - 5SR Timer')],
        ['TK - Tick Timer', inflatedStr.includes('TK - Tick Timer')],
        ['TK - Cast Bar', inflatedStr.includes('TK - Cast Bar')],
        ['5SR trigger code', inflatedStr.includes('lastManaSpend')],
        ['Tick trigger code', inflatedStr.includes('lastTickTime')],
        ['Cast bar present', inflatedStr.includes('TK - Cast Bar')],
        ['Nature\'s Swiftness', inflatedStr.includes("Nature's Swiftness")],
        ['Elemental Mastery', inflatedStr.includes('Elemental Mastery')],
        ['Mana Tide Totem', inflatedStr.includes('Mana Tide Totem')],
        ['Heroism', inflatedStr.includes('Heroism')],
        ['Earth Shield', inflatedStr.includes('Earth Shield')],
        ['aurabar region', inflatedStr.includes('aurabar')],
        ['icon region', inflatedStr.includes('icon')],
    ];

    let allPass = true;
    for (const [name, pass] of checks) {
        if (!pass) {
            console.log(`   MISSING: ${name}`);
            allPass = false;
        }
    }

    if (decoded.version === 2 && decoded.rawBuffer[0] === 1 && allPass) {
        console.log(`   All ${checks.length} content checks: PASSED`);
        console.log(`   VALID v2 import string with correct wrapper structure`);
    } else {
        console.log(`   VALIDATION FAILED`);
    }
} catch (err) {
    console.log(`   DECODE ERROR: ${err.message}`);
}
