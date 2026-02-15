/**
 * Tidekeeper WA Suite — Builder Functions
 * ========================================
 * Reusable builder functions that create fully-formed WeakAura definition objects.
 * Modeled after Sheepi Priest UI architecture.
 *
 * Every builder returns a plain JS object ready for encoding.
 */

const C = require('./wa_constants');

// ============================================================================
// BASE AURA TEMPLATE
// ============================================================================

/**
 * Base aura with all default fields. Every aura merges overrides into this.
 * @param {string} className - WoW class token (e.g. "SHAMAN", "PRIEST")
 * @param {object} overrides - Fields to merge/override
 */
function baseAura(className, overrides = {}) {
    return {
        anchorFrameType: "SCREEN",
        anchorPoint: "CENTER",
        selfPoint: "CENTER",
        frameStrata: 3,
        version: 1,
        subVersion: 1,
        internalVersion: C.INTERNAL_VERSION,
        semver: "1.0.0",
        preferToUpdate: false,
        tocversion: C.TOC_VERSION,
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
            class: { single: className, multi: { [className]: true } },
            spec: { multi: {} },
            size: { multi: {} },
            use_class: true,
        },
        authorOptions: [],
        actions: { init: {}, start: {}, finish: {} },
        ...overrides,
    };
}

// ============================================================================
// ICON BUILDERS
// ============================================================================

/**
 * Build a cooldown tracking icon.
 * Shows always, desaturates when on CD, glows green when ready.
 * Hidden when spell is unknown (via Spell Known trigger).
 */
function buildCooldownIcon(className, { id, uid, spellName, xOffset, yOffset }) {
    return baseAura(className, {
        id,
        uid,
        regionType: "icon",
        width: C.ICON_SIZE,
        height: C.ICON_SIZE,
        xOffset,
        yOffset: yOffset || C.ICON_Y,
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
                    spellName,
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
                    spellName,
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
                text_color: C.COLORS.TEXT_WHITE,
                text_font: C.FONT,
                text_fontSize: C.FONT_SIZE.ICON_CD,
                text_fontType: "THICKOUTLINE",
                text_anchorPoint: "CENTER",
                text_selfPoint: "AUTO",
                text_visible: true,
                text_text_format_p_format: C.TEXT_FORMAT_TIMED.format,
                text_text_format_p_time_precision: C.TEXT_FORMAT_TIMED.time_precision,
                text_text_format_p_time_dynamic_threshold: C.TEXT_FORMAT_TIMED.time_dynamic_threshold,
            },
            3: {
                type: "subglow",
                glow: false,
                glowType: "Pixel",
                glowColor: C.COLORS.GLOW_READY,
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

/**
 * Build a buff/debuff tracking icon.
 * Shows when the buff is active, with remaining duration.
 */
function buildBuffIcon(className, { id, uid, spellName, xOffset, yOffset, unit, ownOnly, debuffType, showStacks }) {
    const aura = baseAura(className, {
        id,
        uid,
        regionType: "icon",
        width: C.ICON_SIZE,
        height: C.ICON_SIZE,
        xOffset,
        yOffset: yOffset || C.ICON_Y,
        cooldownSwipe: true,
        cooldownEdge: true,
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
                    auranames: { 1: spellName },
                    unit: unit || "player",
                    ownOnly: ownOnly !== false,
                    matchesShowOn: "showOnActive",
                    useStacks: !!showStacks,
                    debuffType: debuffType || "HELPFUL",
                },
                untrigger: {},
            },
            activeTriggerMode: -10,
        },
        subRegions: {
            1: { type: "subbackground" },
            2: {
                type: "subtext",
                text_text: showStacks ? "%s" : "%p",
                text_color: C.COLORS.TEXT_WHITE,
                text_font: C.FONT,
                text_fontSize: showStacks ? C.FONT_SIZE.ICON_STACKS : C.FONT_SIZE.ICON_CD,
                text_fontType: "THICKOUTLINE",
                text_anchorPoint: "CENTER",
                text_selfPoint: "AUTO",
                text_visible: true,
            },
        },
    });

    if (!showStacks) {
        aura.subRegions[2].text_text_format_p_format = C.TEXT_FORMAT_TIMED.format;
        aura.subRegions[2].text_text_format_p_time_precision = C.TEXT_FORMAT_TIMED.time_precision;
        aura.subRegions[2].text_text_format_p_time_dynamic_threshold = C.TEXT_FORMAT_TIMED.time_dynamic_threshold;
    }

    return aura;
}

/**
 * Build a trinket cooldown icon (by equipment slot).
 */
function buildTrinketIcon(className, { id, uid, slot, xOffset, yOffset }) {
    return baseAura(className, {
        id,
        uid,
        regionType: "icon",
        width: C.ICON_SIZE,
        height: C.ICON_SIZE,
        xOffset,
        yOffset: yOffset || C.ICON_Y,
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
                text_color: C.COLORS.TEXT_WHITE,
                text_font: C.FONT,
                text_fontSize: C.FONT_SIZE.ICON_CD,
                text_fontType: "THICKOUTLINE",
                text_anchorPoint: "CENTER",
                text_selfPoint: "AUTO",
                text_visible: true,
                text_text_format_p_format: C.TEXT_FORMAT_TIMED.format,
                text_text_format_p_time_precision: C.TEXT_FORMAT_TIMED.time_precision,
                text_text_format_p_time_dynamic_threshold: C.TEXT_FORMAT_TIMED.time_dynamic_threshold,
            },
            3: {
                type: "subglow",
                glow: false,
                glowType: "Pixel",
                glowColor: C.COLORS.GLOW_READY,
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

/**
 * Build a "missing buff" reminder icon.
 * Shows when a specific buff is NOT present (on self, party, or raid).
 */
function buildMissingBuffReminder(className, { id, uid, spellName, xOffset, yOffset, unit }) {
    return baseAura(className, {
        id,
        uid,
        regionType: "icon",
        width: C.ICON_SIZE,
        height: C.ICON_SIZE,
        xOffset,
        yOffset: yOffset || C.ICON_Y,
        cooldownSwipe: false,
        cooldownEdge: false,
        cooldownTextDisabled: true,
        desaturate: true,
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
                    auranames: { 1: spellName },
                    unit: unit || "player",
                    ownOnly: false,
                    matchesShowOn: "showOnMissing",
                    debuffType: "HELPFUL",
                },
                untrigger: {},
            },
            activeTriggerMode: -10,
        },
        subRegions: {
            1: { type: "subbackground" },
            2: {
                type: "subglow",
                glow: true,
                glowType: "Pixel",
                glowColor: { 1: 1, 2: 0.2, 3: 0.2, 4: 1 },
                glowLines: 8,
                glowLength: 4,
                glowThickness: 2,
                glowFrequency: 0.5,
                glowXOffset: 0,
                glowYOffset: 0,
                glowScale: 1,
            },
        },
    });
}

/**
 * Build an "external buff received" tracker icon.
 * Shows when receiving a buff from another player (Innervate, BoP, PI, etc.)
 */
function buildExternalTracker(className, { id, uid, spellName, xOffset, yOffset }) {
    return buildBuffIcon(className, {
        id, uid, spellName, xOffset, yOffset,
        unit: "player",
        ownOnly: false,
        debuffType: "HELPFUL",
        showStacks: false,
    });
}

// ============================================================================
// BAR BUILDERS
// ============================================================================

/**
 * Build a resource bar (mana, rage, energy) with conditional coloring.
 * @param {number} powerType - 0=mana, 1=rage, 3=energy
 */
function buildResourceBar(className, { id, uid, powerType, xOffset, yOffset, width, height, colors }) {
    const defaultColors = powerType === C.POWER_TYPE.MANA
        ? { high: C.COLORS.MANA_HIGH, mid: C.COLORS.MANA_MID, low: C.COLORS.MANA_LOW }
        : powerType === C.POWER_TYPE.RAGE
            ? { high: C.COLORS.RAGE_HIGH, mid: C.COLORS.RAGE_MID, low: C.COLORS.RAGE }
            : { high: C.COLORS.ENERGY, mid: C.COLORS.ENERGY_MID, low: C.COLORS.ENERGY_LOW };

    const c = colors || defaultColors;

    const bar = baseAura(className, {
        id,
        uid,
        regionType: "aurabar",
        width: width || C.BAR_WIDTH,
        height: height || C.BAR_HEIGHT_MAIN,
        xOffset: xOffset || 0,
        yOffset: yOffset || C.MANA_Y,
        orientation: "HORIZONTAL",
        barColor: c.high,
        barColor2: c.high,
        backgroundColor: C.COLORS.BAR_BG,
        texture: C.TEXTURE.BAR,
        spark: false,
        icon: false,
        icon_side: "RIGHT",
        zoom: 0,
        sparkTexture: C.TEXTURE.SPARK,
        sparkWidth: 10,
        sparkHeight: 30,
        sparkColor: C.COLORS.TEXT_WHITE,
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
                    powertype: powerType,
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
                text_color: C.COLORS.TEXT_WHITE,
                text_font: C.FONT,
                text_fontSize: C.FONT_SIZE.BAR_MAIN,
                text_fontType: "OUTLINE",
                text_justify: "CENTER",
                text_anchorPoint: "INNER_CENTER",
                text_selfPoint: "AUTO",
                text_visible: true,
                text_text_format_p_format: C.TEXT_FORMAT_NUMBER.format,
                text_text_format_p_round_type: C.TEXT_FORMAT_NUMBER.round_type,
                text_text_format_p_decimal_precision: C.TEXT_FORMAT_NUMBER.decimal_precision,
                text_text_format_t_format: C.TEXT_FORMAT_NUMBER.format,
                text_text_format_t_round_type: C.TEXT_FORMAT_NUMBER.round_type,
                text_text_format_t_decimal_precision: C.TEXT_FORMAT_NUMBER.decimal_precision,
            },
            4: {
                type: "subtext",
                text_text: "%percentpower%%",
                text_color: C.COLORS.TEXT_DIM,
                text_font: C.FONT,
                text_fontSize: C.FONT_SIZE.BAR_PERCENT,
                text_fontType: "OUTLINE",
                text_justify: "RIGHT",
                text_anchorPoint: "INNER_RIGHT",
                text_anchorXOffset: -4,
                text_selfPoint: "AUTO",
                text_visible: true,
                text_text_format_percentpower_format: C.TEXT_FORMAT_NUMBER.format,
                text_text_format_percentpower_round_type: C.TEXT_FORMAT_NUMBER.round_type,
                text_text_format_percentpower_decimal_precision: C.TEXT_FORMAT_NUMBER.decimal_precision,
            },
        },
        conditions: {
            1: {
                check: { trigger: 1, variable: "percentpower", op: ">", value: "50" },
                changes: { 1: { property: "barColor", value: c.high } },
            },
            2: {
                check: { trigger: 1, variable: "percentpower", op: "<=", value: "50" },
                changes: { 1: { property: "barColor", value: c.mid } },
            },
            3: {
                check: { trigger: 1, variable: "percentpower", op: "<=", value: "25" },
                changes: { 1: { property: "barColor", value: c.low } },
            },
        },
    });

    return bar;
}

/**
 * Build a cast bar.
 */
function buildCastBar(className, { id, uid, xOffset, yOffset, width }) {
    return baseAura(className, {
        id,
        uid,
        regionType: "aurabar",
        width: width || C.BAR_WIDTH,
        height: C.BAR_HEIGHT_THIN,
        xOffset: xOffset || 0,
        yOffset: yOffset || C.CASTBAR_Y,
        orientation: "HORIZONTAL",
        barColor: C.COLORS.CAST_GREEN,
        barColor2: C.COLORS.CAST_GREEN,
        backgroundColor: C.COLORS.BAR_BG_SOLID,
        texture: C.TEXTURE.BAR,
        spark: true,
        sparkTexture: C.TEXTURE.SPARK,
        sparkWidth: 6,
        sparkHeight: 14,
        sparkColor: C.COLORS.SPARK_WHITE,
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
}

/**
 * Build a 5-Second Rule timer bar (mana classes only).
 */
function buildFiveSecondRule(className, { id, uid, xOffset, yOffset, width }) {
    return baseAura(className, {
        id,
        uid,
        regionType: "aurabar",
        width: width || C.BAR_WIDTH,
        height: C.BAR_HEIGHT_THIN,
        xOffset: xOffset || 0,
        yOffset: yOffset || C.FSR_Y,
        orientation: "HORIZONTAL",
        barColor: C.COLORS.FSR_ORANGE,
        barColor2: C.COLORS.FSR_ORANGE,
        backgroundColor: { 1: 0.1, 2: 0.1, 3: 0.1, 4: 0.5 },
        texture: C.TEXTURE.BAR,
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
            init: { do_custom: true, custom: "aura_env.lastManaSpend = 0" },
            start: {},
            finish: {},
        },
        subRegions: {
            1: { type: "subbackground" },
            2: { type: "subforeground" },
            3: {
                type: "subtext",
                text_text: "5SR",
                text_color: C.COLORS.TEXT_FSR,
                text_font: C.FONT,
                text_fontSize: C.FONT_SIZE.BAR_LABEL,
                text_fontType: "OUTLINE",
                text_anchorPoint: "INNER_LEFT",
                text_anchorXOffset: 2,
                text_selfPoint: "AUTO",
                text_visible: true,
            },
        },
    });
}

/**
 * Build a mana tick timer (spark overlay on cast bar area).
 */
function buildTickTimer(className, { id, uid, xOffset, yOffset, width }) {
    return baseAura(className, {
        id,
        uid,
        regionType: "aurabar",
        frameStrata: 4,
        width: width || C.BAR_WIDTH,
        height: C.BAR_HEIGHT_THIN,
        xOffset: xOffset || 0,
        yOffset: yOffset || C.CASTBAR_Y,
        orientation: "HORIZONTAL",
        barColor: C.COLORS.SPARK_CLEAR,
        barColor2: C.COLORS.SPARK_CLEAR,
        backgroundColor: C.COLORS.SPARK_CLEAR,
        texture: C.TEXTURE.BAR,
        spark: true,
        sparkTexture: C.TEXTURE.SPARK,
        sparkWidth: 6,
        sparkHeight: 14,
        sparkColor: C.COLORS.TICK_CYAN,
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
                custom: 'aura_env.lastMana = UnitPower("player", 0)\naura_env.lastTickTime = GetTime()\naura_env.lastTickAmount = 0',
            },
            start: {},
            finish: {},
        },
        subRegions: {
            1: { type: "subbackground" },
            2: { type: "subforeground" },
        },
    });
}

/**
 * Build a Sated/Exhaustion debuff tracker (TBC Anniversary 2026).
 * Shows when the player has the Sated or Exhaustion debuff after Heroism/Bloodlust.
 */
function buildSatedTracker(className, { id, uid, xOffset, yOffset }) {
    return baseAura(className, {
        id,
        uid,
        regionType: "icon",
        width: C.ICON_SIZE,
        height: C.ICON_SIZE,
        xOffset,
        yOffset: yOffset || C.ICON_Y,
        cooldownSwipe: true,
        cooldownEdge: true,
        cooldownTextDisabled: false,
        desaturate: true,
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
                    auranames: { 1: "Sated", 2: "Exhaustion" },
                    unit: "player",
                    ownOnly: false,
                    matchesShowOn: "showOnActive",
                    debuffType: "HARMFUL",
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
                text_color: C.COLORS.TEXT_WHITE,
                text_font: C.FONT,
                text_fontSize: C.FONT_SIZE.ICON_CD,
                text_fontType: "THICKOUTLINE",
                text_anchorPoint: "CENTER",
                text_selfPoint: "AUTO",
                text_visible: true,
                text_text_format_p_format: C.TEXT_FORMAT_TIMED.format,
                text_text_format_p_time_precision: C.TEXT_FORMAT_TIMED.time_precision,
                text_text_format_p_time_dynamic_threshold: C.TEXT_FORMAT_TIMED.time_dynamic_threshold,
            },
            3: {
                type: "subglow",
                glow: true,
                glowType: "Pixel",
                glowColor: C.COLORS.SATED,
                glowLines: 8,
                glowLength: 4,
                glowThickness: 2,
                glowFrequency: 0.25,
                glowXOffset: 0,
                glowYOffset: 0,
                glowScale: 1,
            },
        },
    });
}

// ============================================================================
// GROUP BUILDERS
// ============================================================================

/**
 * Build a master group container for a class WA.
 */
function buildGroup(className, { id, uid, childNames, groupIcon }) {
    const controlledChildren = {};
    childNames.forEach((name, i) => {
        controlledChildren[i + 1] = name;
    });

    return baseAura(className, {
        id,
        uid,
        regionType: "group",
        xOffset: 0,
        yOffset: 0,
        groupIcon: groupIcon || 136052,
        controlledChildren,
        borderBackdrop: "Blizzard Tooltip",
        borderColor: { 1: 0, 2: 0, 3: 0, 4: 1 },
        borderEdge: "Square Full White",
        borderOffset: 0,
        borderSize: 2,
        scale: 1,
    });
}

/**
 * Build a dynamic group that auto-arranges children and optionally filters by spec.
 * Spec filtering uses talent tree point checks (31+ points = main spec).
 */
function buildDynamicGroup(className, { id, uid, childNames, xOffset, yOffset, grow, spacing, talentTree, talentThreshold }) {
    const controlledChildren = {};
    childNames.forEach((name, i) => {
        controlledChildren[i + 1] = name;
    });

    const group = baseAura(className, {
        id,
        uid,
        regionType: "dynamicgroup",
        xOffset: xOffset || 0,
        yOffset: yOffset || 0,
        controlledChildren,
        grow: grow || "HORIZONTAL",
        space: spacing || 0,
        align: "CENTER",
        stagger: 0,
        sort: "none",
        borderBackdrop: "Blizzard Tooltip",
        borderColor: { 1: 0, 2: 0, 3: 0, 4: 1 },
        borderEdge: "Square Full White",
        borderOffset: 0,
        borderSize: 2,
        scale: 1,
    });

    // If spec filtering is requested, add talent tree load condition
    if (talentTree) {
        group.load.use_talent = true;
        group.load.talent = {
            single: talentTree,
            multi: { [talentTree]: true },
        };
    }

    return group;
}

// ============================================================================
// WRAPPER / ENCODING HELPERS
// ============================================================================

/**
 * Wrap a single aura for export (strips non-transmissible fields).
 */
function wrapSingleAura(aura) {
    const data = { ...aura };
    delete data.parent;
    delete data.controlledChildren;
    delete data.authorMode;
    delete data.skipWagoUpdate;
    delete data.ignoreWagoUpdate;
    return {
        m: "d",
        d: data,
        v: C.TRANSMIT_VERSION,
        s: C.WA_VERSION_STRING,
    };
}

/**
 * Wrap a group with children for export.
 */
function wrapGroupAura(group, childAuras) {
    const groupData = { ...group };
    delete groupData.controlledChildren;
    delete groupData.parent;
    delete groupData.authorMode;
    delete groupData.skipWagoUpdate;
    delete groupData.ignoreWagoUpdate;

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
        v: C.TRANSMIT_VERSION,
        s: C.WA_VERSION_STRING,
        c,
    };
}

/**
 * Helper: compute X offsets for a centered row of N icons.
 * Returns array of xOffset values.
 */
function centeredIconRow(count, iconSize, gap) {
    const sz = iconSize || C.ICON_SIZE;
    const g = gap || C.ICON_GAP;
    const totalWidth = count * sz + (count - 1) * g;
    const offsets = [];
    for (let i = 0; i < count; i++) {
        offsets.push(-totalWidth / 2 + sz / 2 + i * (sz + g));
    }
    return offsets;
}

// ============================================================================
// EXPORTS
// ============================================================================
module.exports = {
    // Core
    baseAura,
    // Icon builders
    buildCooldownIcon,
    buildBuffIcon,
    buildTrinketIcon,
    buildMissingBuffReminder,
    buildExternalTracker,
    buildSatedTracker,
    // Bar builders
    buildResourceBar,
    buildCastBar,
    buildFiveSecondRule,
    buildTickTimer,
    // Group builders
    buildGroup,
    buildDynamicGroup,
    // Wrappers
    wrapSingleAura,
    wrapGroupAura,
    // Utilities
    centeredIconRow,
};
