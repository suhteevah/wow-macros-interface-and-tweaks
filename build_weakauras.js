/**
 * Tidekeeper HUD — WeakAura Builder
 * Generates importable WeakAura strings for Resto Shaman TBC Anniversary
 *
 * WeakAura import format: AceSerializer → LibDeflate → Base64
 * The WA client expects a specific table structure serialized in Lua-style format.
 *
 * Since we can't run actual AceSerializer outside WoW, we build the raw Lua
 * table definitions that can be pasted into the WeakAuras saved variables file,
 * AND we provide instructions for in-game construction.
 */

const fs = require('fs');
const path = require('path');

// ============================================================================
// WEAKAURA TABLE DEFINITIONS
// Each aura is defined as a JS object matching the WA internal schema
// ============================================================================

// ---------- HELPER: Shared defaults ----------
const baseDefaults = {
    anchorFrameType: "SCREEN",
    anchorPoint: "CENTER",
    selfPoint: "CENTER",
    frameStrata: 3,
    version: 1,
    subVersion: 1,
    semver: "1.0.0",
    specVersion: 1,
    preferToUpdate: false,
    tocversion: 20505, // TBC Anniversary TOC
    id: "",
    source: "import",
    config: {},
    information: { forceEvents: true, ignoreOptionsEventErrors: true },
    animation: {
        start: { type: "none", easeStrength: 3, easeType: "none", duration_type: "seconds" },
        main:  { type: "none", easeStrength: 3, easeType: "none", duration_type: "seconds" },
        finish: { type: "none", easeStrength: 3, easeType: "none", duration_type: "seconds" },
    },
    conditions: [],
    load: {
        talent: { multi: {} },
        class: { single: "SHAMAN", multi: { SHAMAN: true } },
        spec: { multi: {} },
        size: { multi: {} },
        use_class: true,
        use_combat: true,
    },
    authorOptions: [],
};

// ---------- 1. MASTER GROUP: Tidekeeper HUD ----------
const masterGroup = {
    ...baseDefaults,
    regionType: "group",
    id: "Tidekeeper HUD",
    uid: "tidekeeper_hud_master",
    groupIcon: 136052, // Shaman icon
    xOffset: 0,
    yOffset: -80,
    controlledChildren: [
        "TK - Cooldowns",
        "TK - Mana Bar",
        "TK - 5SR Timer",
        "TK - Tick Timer",
        "TK - Cast Bar",
    ],
    borderBackdrop: "Blizzard Tooltip",
    borderColor: [0, 0, 0, 1],
    borderEdge: "Square Full White",
    borderOffset: 0,
    borderSize: 2,
    scale: 1,
};

// ---------- 2. MANA BAR ----------
const manaBar = {
    ...baseDefaults,
    regionType: "aurabar",
    id: "TK - Mana Bar",
    uid: "tidekeeper_mana_bar",
    parent: "Tidekeeper HUD",
    width: 350,
    height: 22,
    xOffset: 0,
    yOffset: 0,
    orientation: "HORIZONTAL",
    barColor: [0.08, 0.38, 0.74, 1],
    backgroundColor: [0.1, 0.1, 0.1, 0.7],
    texture: "Smooth v2",
    spark: false,
    sparkTexture: "Interface\\CastingBar\\UI-CastingBar-Spark",
    sparkWidth: 10,
    sparkHeight: 30,
    sparkColor: [1, 1, 1, 1],
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
                type: "unit",
                event: "Power",
                subeventSuffix: "",
                unit: "player",
                powertype: 0, // Mana
                use_percentpower: false,
                use_unit: true,
                debuffType: "HELPFUL",
            },
            untrigger: {},
        },
        activeTriggerMode: -10, // auto
    },
    // Custom text showing mana values
    subRegions: [
        {
            type: "subbackground",
        },
        {
            type: "subforeground",
        },
        {
            type: "subtext",
            text_text: "%p / %t",
            text_color: [1, 1, 1, 1],
            text_font: "Friz Quadrata TT",
            text_fontSize: 11,
            text_fontType: "OUTLINE",
            text_justify: "CENTER",
            text_anchorPoint: "INNER_CENTER",
            text_anchorXOffset: 0,
            text_anchorYOffset: 0,
            text_shadowColor: [0, 0, 0, 1],
            text_shadowXOffset: 1,
            text_shadowYOffset: -1,
            text_visible: true,
            text_selfPoint: "AUTO",
            text_text_format_p_format: "BigNumber",
            text_text_format_t_format: "BigNumber",
        },
        {
            type: "subtext",
            text_text: "%percentpower%%",
            text_color: [1, 1, 1, 0.7],
            text_font: "Friz Quadrata TT",
            text_fontSize: 10,
            text_fontType: "OUTLINE",
            text_justify: "RIGHT",
            text_anchorPoint: "INNER_RIGHT",
            text_anchorXOffset: -4,
            text_anchorYOffset: 0,
            text_visible: true,
            text_selfPoint: "AUTO",
        },
    ],
    // Dynamic color conditions
    conditions: [
        {
            check: { trigger: 1, variable: "percentpower", op: ">", value: "50" },
            changes: [
                { property: "barColor", value: [0.08, 0.38, 0.74, 1] }, // Blue
            ],
        },
        {
            check: { trigger: 1, variable: "percentpower", op: "<=", value: "50" },
            changes: [
                { property: "barColor", value: [0.1, 0.65, 0.65, 1] }, // Teal
            ],
        },
        {
            check: { trigger: 1, variable: "percentpower", op: "<=", value: "25" },
            changes: [
                { property: "barColor", value: [0.85, 0.15, 0.15, 1] }, // Red
            ],
        },
    ],
};

// ---------- 3. FIVE SECOND RULE TIMER ----------
const fsrTimer = {
    ...baseDefaults,
    regionType: "aurabar",
    id: "TK - 5SR Timer",
    uid: "tidekeeper_5sr_timer",
    parent: "Tidekeeper HUD",
    width: 350,
    height: 5,
    xOffset: 0,
    yOffset: -14, // Below mana bar (22/2 + 5/2 + 1 gap)
    orientation: "HORIZONTAL",
    barColor: [1.0, 0.55, 0.0, 1], // Orange
    backgroundColor: [0.1, 0.1, 0.1, 0.5],
    texture: "Smooth v2",
    spark: false,
    icon: false,
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
    conditions: [
        // When 5SR is fulfilled (bar empty), turn green
        {
            check: { trigger: 1, variable: "show", value: 1 },
            changes: [],
        },
    ],
    actions: {
        init: {
            do_custom: true,
            custom: `aura_env.lastManaSpend = 0`,
        },
    },
    subRegions: [
        { type: "subbackground" },
        { type: "subforeground" },
        {
            type: "subtext",
            text_text: "5SR",
            text_color: [1, 0.8, 0.4, 0.6],
            text_font: "Friz Quadrata TT",
            text_fontSize: 8,
            text_fontType: "OUTLINE",
            text_anchorPoint: "INNER_LEFT",
            text_anchorXOffset: 2,
            text_anchorYOffset: 0,
            text_visible: true,
            text_selfPoint: "AUTO",
        },
    ],
};

// ---------- 4. MANA TICK TIMER ----------
const tickTimer = {
    ...baseDefaults,
    regionType: "aurabar",
    id: "TK - Tick Timer",
    uid: "tidekeeper_tick_timer",
    parent: "Tidekeeper HUD",
    width: 350,
    height: 5,
    xOffset: 0,
    yOffset: -20, // Below 5SR timer
    orientation: "HORIZONTAL",
    barColor: [0.0, 0.9, 1.0, 1], // Cyan
    backgroundColor: [0.1, 0.1, 0.1, 0.5],
    texture: "Smooth v2",
    spark: true,
    sparkTexture: "Interface\\CastingBar\\UI-CastingBar-Spark",
    sparkWidth: 8,
    sparkHeight: 20,
    sparkColor: [1, 1, 1, 0.8],
    sparkOffsetX: 0,
    sparkOffsetY: 0,
    sparkRotationMode: "AUTO",
    sparkDesaturate: false,
    sparkBlendMode: "ADD",
    icon: false,
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

    -- Detect mana increase (a tick happened)
    if curMana > aura_env.lastMana and curMana < maxMana then
        local tickAmt = curMana - aura_env.lastMana
        -- Filter out large jumps (potions, innervate, mana tide)
        if tickAmt < (maxMana * 0.08) then
            aura_env.lastTickTime = GetTime()
            aura_env.lastTickAmount = tickAmt
        end
    end

    aura_env.lastMana = curMana

    -- Calculate next tick
    local now = GetTime()
    local lastTick = aura_env.lastTickTime or now
    local nextTick = lastTick + 2.0

    -- Re-sync if we drifted past expected tick
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
            custom: `aura_env.lastMana = UnitPower("player", 0)
aura_env.lastTickTime = GetTime()
aura_env.lastTickAmount = 0`,
        },
    },
    subRegions: [
        { type: "subbackground" },
        { type: "subforeground" },
        {
            type: "subtext",
            text_text: "%c",
            text_color: [0.6, 1, 1, 0.7],
            text_font: "Friz Quadrata TT",
            text_fontSize: 8,
            text_fontType: "OUTLINE",
            text_anchorPoint: "INNER_RIGHT",
            text_anchorXOffset: -2,
            text_anchorYOffset: 0,
            text_visible: true,
            text_selfPoint: "AUTO",
        },
    ],
    customText: `function()
    if aura_env.lastTickAmount and aura_env.lastTickAmount > 0 then
        return "+" .. aura_env.lastTickAmount
    end
    return ""
end`,
};

// ---------- 5. CAST BAR ----------
const castBar = {
    ...baseDefaults,
    regionType: "aurabar",
    id: "TK - Cast Bar",
    uid: "tidekeeper_cast_bar",
    parent: "Tidekeeper HUD",
    width: 350,
    height: 16,
    xOffset: 0,
    yOffset: -30, // Below tick timer with small gap
    orientation: "HORIZONTAL",
    barColor: [0.18, 0.80, 0.44, 1], // Green default (healing)
    backgroundColor: [0.1, 0.1, 0.1, 0.7],
    texture: "Smooth v2",
    spark: true,
    sparkTexture: "Interface\\CastingBar\\UI-CastingBar-Spark",
    sparkWidth: 10,
    sparkHeight: 26,
    sparkColor: [1, 1, 1, 0.7],
    sparkOffsetX: 0,
    sparkOffsetY: 0,
    sparkRotationMode: "AUTO",
    sparkDesaturate: false,
    sparkBlendMode: "ADD",
    icon: true,
    icon_side: "LEFT",
    zoom: 0.1,
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
    subRegions: [
        { type: "subbackground" },
        { type: "subforeground" },
        {
            type: "subtext",
            text_text: "%n",
            text_color: [1, 1, 1, 1],
            text_font: "Friz Quadrata TT",
            text_fontSize: 10,
            text_fontType: "OUTLINE",
            text_justify: "LEFT",
            text_anchorPoint: "INNER_LEFT",
            text_anchorXOffset: 4,
            text_anchorYOffset: 0,
            text_visible: true,
            text_selfPoint: "AUTO",
        },
        {
            type: "subtext",
            text_text: "%p",
            text_color: [1, 1, 1, 0.9],
            text_font: "Friz Quadrata TT",
            text_fontSize: 10,
            text_fontType: "OUTLINE",
            text_justify: "RIGHT",
            text_anchorPoint: "INNER_RIGHT",
            text_anchorXOffset: -4,
            text_anchorYOffset: 0,
            text_visible: true,
            text_selfPoint: "AUTO",
            text_text_format_p_format: "timed",
            text_text_format_p_time_precision: 1,
            text_text_format_p_time_dynamic_threshold: 0,
        },
    ],
    // Color conditions based on spell school
    customText: `function()
    local name = UnitCastingInfo("player")
    if not name then name = UnitChannelInfo("player") end
    if not name then return "" end

    local heals = {
        ["Healing Wave"] = true,
        ["Lesser Healing Wave"] = true,
        ["Chain Heal"] = true,
    }
    local damage = {
        ["Lightning Bolt"] = true,
        ["Chain Lightning"] = true,
        ["Earth Shock"] = true,
        ["Flame Shock"] = true,
        ["Frost Shock"] = true,
    }

    if heals[name] then
        aura_env.barR, aura_env.barG, aura_env.barB = 0.18, 0.80, 0.44
    elseif damage[name] then
        aura_env.barR, aura_env.barG, aura_env.barB = 0.91, 0.30, 0.24
    else
        aura_env.barR, aura_env.barG, aura_env.barB = 0.95, 0.61, 0.07
    end
    return name
end`,
};

// ---------- 6. COOLDOWN ICONS ----------
function makeCooldownIcon(id, uid, spellName, spellId, xOffset, yOffset, isBuffTracker) {
    const aura = {
        ...baseDefaults,
        regionType: "icon",
        id: id,
        uid: uid,
        parent: "TK - Cooldowns",
        width: 34,
        height: 34,
        xOffset: xOffset,
        yOffset: yOffset,
        cooldownSwipe: true,
        cooldownEdge: true,
        cooldownTextDisabled: false,
        desaturate: false,
        icon: true,
        zoom: 0.1,
        keepAspectRatio: true,
        auto: true,
        triggers: {},
        subRegions: [
            { type: "subbackground" },
            {
                type: "subtext",
                text_text: "%p",
                text_color: [1, 1, 1, 1],
                text_font: "Friz Quadrata TT",
                text_fontSize: 14,
                text_fontType: "THICKOUTLINE",
                text_anchorPoint: "CENTER",
                text_anchorXOffset: 0,
                text_anchorYOffset: 0,
                text_visible: true,
                text_selfPoint: "AUTO",
                text_text_format_p_format: "timed",
                text_text_format_p_time_precision: 0,
                text_text_format_p_time_dynamic_threshold: 3,
            },
            {
                type: "subglow",
                glow: false,
                glowType: "Pixel",
                glowColor: [0, 1, 0.53, 1], // Green glow
                glowLines: 8,
                glowLength: 6,
                glowThickness: 2,
                glowFrequency: 0.25,
                glowXOffset: 0,
                glowYOffset: 0,
                glowScale: 1,
            },
        ],
        conditions: [],
    };

    if (isBuffTracker) {
        // Earth Shield — track as buff with stacks
        aura.triggers = {
            1: {
                trigger: {
                    type: "aura2",
                    event: "Health",
                    subeventSuffix: "",
                    auranames: [spellName],
                    unit: "group",
                    ownOnly: true,
                    matchesShowOn: "showOnActive",
                    useStacks: true,
                    debuffType: "HELPFUL",
                },
                untrigger: {},
            },
            2: {
                trigger: {
                    type: "aura2",
                    event: "Health",
                    subeventSuffix: "",
                    auranames: [spellName],
                    unit: "group",
                    ownOnly: true,
                    matchesShowOn: "showOnMissing",
                    debuffType: "HELPFUL",
                },
                untrigger: {},
            },
            disjunctive: "any",
            activeTriggerMode: -10,
        };
        aura.conditions = [
            {
                check: { trigger: 1, variable: "stacks", op: ">=", value: "5" },
                changes: [
                    { property: "sub.3.glow", value: true },
                    { property: "sub.3.glowColor", value: [0, 0.9, 0.3, 1] },
                ],
            },
            {
                check: { trigger: 1, variable: "stacks", op: "<=", value: "2" },
                changes: [
                    { property: "sub.3.glow", value: true },
                    { property: "sub.3.glowColor", value: [1, 0.2, 0.1, 1] },
                ],
            },
            {
                check: { trigger: 2, variable: "show", value: 1 },
                changes: [
                    { property: "desaturate", value: true },
                    { property: "sub.3.glow", value: true },
                    { property: "sub.3.glowColor", value: [1, 0, 0, 1] },
                ],
            },
        ];
    } else {
        // Standard cooldown tracker
        aura.triggers = {
            1: {
                trigger: {
                    type: "spell",
                    event: "Cooldown Progress (Spell)",
                    spellName: spellName,
                    use_genericShowOn: true,
                    genericShowOn: "showAlways",
                    subeventSuffix: "",
                    unit: "player",
                    debuffType: "HELPFUL",
                    realSpellName: spellName,
                },
                untrigger: {},
            },
            activeTriggerMode: -10,
        };
        aura.conditions = [
            {
                check: { trigger: 1, variable: "onCooldown", value: 1 },
                changes: [
                    { property: "desaturate", value: true },
                    { property: "sub.3.glow", value: false },
                ],
            },
            {
                check: { trigger: 1, variable: "onCooldown", value: 0 },
                changes: [
                    { property: "desaturate", value: false },
                    { property: "sub.3.glow", value: true },
                ],
            },
        ];
    }

    return aura;
}

// Cooldown Dynamic Group
const cooldownGroup = {
    ...baseDefaults,
    regionType: "dynamicgroup",
    id: "TK - Cooldowns",
    uid: "tidekeeper_cd_group",
    parent: "Tidekeeper HUD",
    width: 300,
    height: 34,
    xOffset: 0,
    yOffset: 20, // Above mana bar
    grow: "HORIZONTAL",
    align: "CENTER",
    space: 4,
    stagger: 0,
    sort: "none",
    controlledChildren: [
        "TK - CD: Nature's Swiftness",
        "TK - CD: Elemental Mastery",
        "TK - CD: Mana Tide Totem",
        "TK - CD: Heroism",
        "TK - CD: Earth Shield",
        "TK - CD: Trinket 1",
        "TK - CD: Trinket 2",
    ],
    borderBackdrop: "None",
    borderColor: [0, 0, 0, 0],
    borderEdge: "None",
    borderOffset: 0,
    borderSize: 0,
};

// Build individual cooldown icons
// Spacing handled by dynamic group, so xOffset/yOffset = 0 for all
const cdIcons = [
    makeCooldownIcon("TK - CD: Nature's Swiftness", "tk_cd_ns", "Nature's Swiftness", 16188, 0, 0, false),
    makeCooldownIcon("TK - CD: Elemental Mastery", "tk_cd_em", "Elemental Mastery", 16166, 0, 0, false),
    makeCooldownIcon("TK - CD: Mana Tide Totem", "tk_cd_mt", "Mana Tide Totem", 16190, 0, 0, false),
    makeCooldownIcon("TK - CD: Heroism", "tk_cd_hero", "Heroism", 32182, 0, 0, false),
    makeCooldownIcon("TK - CD: Earth Shield", "tk_cd_es", "Earth Shield", 974, 0, 0, true),
    makeCooldownIcon("TK - CD: Trinket 1", "tk_cd_trink1", "", 0, 0, 0, false),
    makeCooldownIcon("TK - CD: Trinket 2", "tk_cd_trink2", "", 0, 0, 0, false),
];

// Trinket icons need special triggers (inventory slot)
cdIcons[5].triggers = {
    1: {
        trigger: {
            type: "item",
            event: "Cooldown Progress (Slot)",
            itemSlot: 13, // Trinket 1
            use_genericShowOn: true,
            genericShowOn: "showAlways",
        },
        untrigger: {},
    },
    activeTriggerMode: -10,
};
cdIcons[5].conditions = [
    {
        check: { trigger: 1, variable: "onCooldown", value: 1 },
        changes: [
            { property: "desaturate", value: true },
            { property: "sub.3.glow", value: false },
        ],
    },
    {
        check: { trigger: 1, variable: "onCooldown", value: 0 },
        changes: [
            { property: "desaturate", value: false },
            { property: "sub.3.glow", value: true },
        ],
    },
];

cdIcons[6].triggers = {
    1: {
        trigger: {
            type: "item",
            event: "Cooldown Progress (Slot)",
            itemSlot: 14, // Trinket 2
            use_genericShowOn: true,
            genericShowOn: "showAlways",
        },
        untrigger: {},
    },
    activeTriggerMode: -10,
};
cdIcons[6].conditions = cdIcons[5].conditions;


// ============================================================================
// SERIALIZE TO LUA TABLE FORMAT
// WeakAuras SavedVariables use Lua table syntax
// ============================================================================

function luaSerialize(obj, indent = 0) {
    const pad = "    ".repeat(indent);
    const pad1 = "    ".repeat(indent + 1);

    if (obj === null || obj === undefined) {
        return "nil";
    }
    if (typeof obj === "boolean") {
        return obj ? "true" : "false";
    }
    if (typeof obj === "number") {
        return String(obj);
    }
    if (typeof obj === "string") {
        // Handle multi-line strings (Lua code blocks)
        if (obj.includes("\n")) {
            return `[=[${obj}]=]`;
        }
        // Escape special chars
        return `"${obj.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\n/g, "\\n")}"`;
    }
    if (Array.isArray(obj)) {
        if (obj.length === 0) return "{}";
        const items = obj.map((v, i) => `${pad1}${luaSerialize(v, indent + 1)}, -- [${i + 1}]`);
        return `{\n${items.join("\n")}\n${pad}}`;
    }
    if (typeof obj === "object") {
        const keys = Object.keys(obj);
        if (keys.length === 0) return "{}";
        const items = keys.map(key => {
            const val = luaSerialize(obj[key], indent + 1);
            // Numeric keys use [n] syntax
            if (/^\d+$/.test(key)) {
                return `${pad1}[${key}] = ${val},`;
            }
            // String keys that are valid Lua identifiers
            if (/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(key)) {
                return `${pad1}${key} = ${val},`;
            }
            // Other string keys
            return `${pad1}["${key}"] = ${val},`;
        });
        return `{\n${items.join("\n")}\n${pad}}`;
    }
    return "nil";
}


// ============================================================================
// OUTPUT: Generate the full Lua SavedVariables snippet
// ============================================================================

const allAuras = [
    masterGroup,
    cooldownGroup,
    manaBar,
    fsrTimer,
    tickTimer,
    castBar,
    ...cdIcons,
];

let output = `-- ============================================================================
-- TIDEKEEPER HUD — Resto Shaman WeakAura Suite
-- TBC Anniversary 2026 (Client Version 2.5.5, Interface 20505)
-- ============================================================================
--
-- INSTALLATION METHOD 1: SavedVariables Paste
-- =============================================
-- 1. CLOSE World of Warcraft completely
-- 2. Navigate to: WTF/Account/YOURNAME/SavedVariables/
-- 3. Open WeakAuras.lua in a text editor
-- 4. Find the line: ["displays"] = {
-- 5. Paste each aura block below INSIDE that table
-- 6. Save and launch WoW
-- 7. Type /wa to verify they loaded
--
-- INSTALLATION METHOD 2: In-Game Construction
-- =============================================
-- If SavedVariables editing feels risky, use the step-by-step guide
-- in Custom_WeakAura_HUD_Design.md to build each component in /wa
-- and paste ONLY the Lua code blocks into the custom trigger fields.
--
-- ============================================================================

`;

// Generate each aura as a Lua table
allAuras.forEach(aura => {
    output += `-- ---- ${aura.id} ----\n`;
    output += `["${aura.id}"] = ${luaSerialize(aura, 0)},\n\n`;
});

// Also output JUST the Lua code blocks separately for easy copy-paste into WA UI
output += `
-- ============================================================================
-- STANDALONE LUA CODE BLOCKS
-- Copy-paste these into WeakAura custom trigger / custom text fields
-- ============================================================================

-- ============================================================================
-- 5SR TIMER: Custom Trigger (paste into Trigger → Custom → "Custom Trigger")
-- Events: UNIT_SPELLCAST_SUCCEEDED
-- ============================================================================
--[[
function(allstates, event, ...)
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
end
]]--

-- 5SR TIMER: Init Code (paste into Actions → On Init → Custom)
--[[
aura_env.lastManaSpend = 0
]]--


-- ============================================================================
-- TICK TIMER: Custom Trigger (paste into Trigger → Custom → "Custom Trigger")
-- Events: UNIT_POWER_UPDATE
-- ============================================================================
--[[
function(allstates, event, ...)
    if not aura_env.lastMana then
        aura_env.lastMana = UnitPower("player", 0)
        aura_env.lastTickTime = GetTime()
        aura_env.lastTickAmount = 0
    end

    local curMana = UnitPower("player", 0)
    local maxMana = UnitPowerMax("player", 0)

    -- Detect mana increase = a regen tick happened
    if curMana > aura_env.lastMana and curMana < maxMana then
        local tickAmt = curMana - aura_env.lastMana
        -- Filter out large jumps (potions, innervate, mana tide)
        if tickAmt < (maxMana * 0.08) then
            aura_env.lastTickTime = GetTime()
            aura_env.lastTickAmount = tickAmt
        end
    end

    aura_env.lastMana = curMana

    -- Calculate next expected tick (2-second cycle)
    local now = GetTime()
    local lastTick = aura_env.lastTickTime or now
    local nextTick = lastTick + 2.0

    -- Re-sync if we drifted past expected tick
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
end
]]--

-- TICK TIMER: Init Code (paste into Actions → On Init → Custom)
--[[
aura_env.lastMana = UnitPower("player", 0)
aura_env.lastTickTime = GetTime()
aura_env.lastTickAmount = 0
]]--

-- TICK TIMER: Custom Text (paste into Display → Custom Text function)
--[[
function()
    if aura_env.lastTickAmount and aura_env.lastTickAmount > 0 then
        return "+" .. aura_env.lastTickAmount
    end
    return ""
end
]]--


-- ============================================================================
-- CAST BAR: Custom Color Logic
-- (paste into Display → Custom Text or use in conditions)
-- ============================================================================
--[[
function()
    local name = UnitCastingInfo("player")
    if not name then name = UnitChannelInfo("player") end
    if not name then return "" end

    local heals = {
        ["Healing Wave"] = true,
        ["Lesser Healing Wave"] = true,
        ["Chain Heal"] = true,
    }
    local damage = {
        ["Lightning Bolt"] = true,
        ["Chain Lightning"] = true,
        ["Earth Shock"] = true,
        ["Flame Shock"] = true,
        ["Frost Shock"] = true,
    }

    -- These values are used by the conditions system
    -- Green for heals, Red for damage, Yellow for utility
    if heals[name] then
        return "heal"
    elseif damage[name] then
        return "damage"
    else
        return "utility"
    end
end
]]--


-- ============================================================================
-- EARTH SHIELD: Stack Color Logic
-- (paste into Conditions or Custom Color function)
-- ============================================================================
--[[
function()
    local stacks = aura_env.state and aura_env.state.stacks or 0
    if stacks >= 5 then
        return 0.0, 0.9, 0.3, 1   -- Green: healthy
    elseif stacks >= 3 then
        return 1.0, 0.85, 0.0, 1  -- Yellow: getting low
    elseif stacks >= 1 then
        return 1.0, 0.2, 0.1, 1   -- Red: refresh NOW
    else
        return 0.5, 0.5, 0.5, 1   -- Gray: missing!
    end
end
]]--
`;

// Write the Lua output
const outPath = path.join(__dirname, 'Tidekeeper_WeakAuras.lua');
fs.writeFileSync(outPath, output, 'utf8');
console.log(`✅ Written to: ${outPath}`);
console.log(`   Total auras: ${allAuras.length}`);
console.log(`   File size: ${(Buffer.byteLength(output, 'utf8') / 1024).toFixed(1)} KB`);

// ============================================================================
// Also generate a QUICK REFERENCE install guide
// ============================================================================

const guideOutput = `# Tidekeeper HUD — Quick Install Guide

## What's In The Package
| Aura | Type | Purpose |
|------|------|---------|
| Tidekeeper HUD | Group | Master container |
| TK - Cooldowns | Dynamic Group | Holds all CD icons |
| TK - Mana Bar | Progress Bar | Mana with dynamic color |
| TK - 5SR Timer | Progress Bar | Five Second Rule countdown |
| TK - Tick Timer | Progress Bar | 2-second mana regen tick |
| TK - Cast Bar | Progress Bar | Color-coded by spell type |
| TK - CD: Nature's Swiftness | Icon | Panic button CD tracker |
| TK - CD: Elemental Mastery | Icon | Instant crit CD (Elemental talent) |
| TK - CD: Mana Tide Totem | Icon | Group mana CD tracker |
| TK - CD: Heroism | Icon | Raid CD tracker |
| TK - CD: Earth Shield | Icon | Buff charge tracker |
| TK - CD: Trinket 1 | Icon | Trinket slot 13 CD |
| TK - CD: Trinket 2 | Icon | Trinket slot 14 CD |

**Total: 13 auras in 1 group**

---

## Installation: SavedVariables Method

1. **Close WoW completely** (not just logout — full exit)
2. Navigate to your WoW install folder:
   \`\`\`
   World of Warcraft\\_classic_\\WTF\\Account\\YOURACCOUNT\\SavedVariables\\
   \`\`\`
3. **BACKUP** \`WeakAuras.lua\` (copy it somewhere safe)
4. Open \`WeakAuras.lua\` in a text editor (Notepad++, VS Code, etc.)
5. Find the section that looks like:
   \`\`\`lua
   ["displays"] = {
   \`\`\`
6. Open \`Tidekeeper_WeakAuras.lua\` from this folder
7. Copy ALL the aura blocks (everything between the header comments)
8. Paste them inside the \`["displays"] = {\` table
9. Save the file
10. Launch WoW and type \`/wa\` — you should see "Tidekeeper HUD" in the list

---

## Installation: Manual Build Method

If you'd rather build in-game (safer but slower):

### Step 1: Create the Group
- \`/wa\` → New → Group → Name: \`Tidekeeper HUD\`
- Anchor: CENTER, 0, -80

### Step 2: Create Mana Bar
- Inside group → New → Progress Bar → Name: \`TK - Mana Bar\`
- Trigger: Status → Power → Mana → Player
- Size: 350 × 22
- Bar color: Blue (0.08, 0.38, 0.74)
- Add conditions for color change at 50% and 25%
- Add sub-text: \`%p / %t\` centered, \`%percentpower%%\` right-aligned

### Step 3: Create 5SR Timer
- Inside group → New → Progress Bar → Name: \`TK - 5SR Timer\`
- Trigger: Custom → State Updated
- Paste the 5SR trigger code from \`Tidekeeper_WeakAuras.lua\`
- Events field: \`UNIT_SPELLCAST_SUCCEEDED\`
- Actions → On Init: paste init code
- Size: 350 × 5, Orange color
- Anchor below mana bar

### Step 4: Create Tick Timer
- Inside group → New → Progress Bar → Name: \`TK - Tick Timer\`
- Trigger: Custom → State Updated
- Paste the Tick trigger code from \`Tidekeeper_WeakAuras.lua\`
- Events field: \`UNIT_POWER_UPDATE\`
- Actions → On Init: paste init code
- Custom Text: paste tick amount function
- Size: 350 × 5, Cyan color, spark enabled
- Anchor below 5SR timer

### Step 5: Create Cast Bar
- Inside group → New → Progress Bar → Name: \`TK - Cast Bar\`
- Trigger: Status → Cast → Player
- Size: 350 × 16
- Icon: Show (left side)
- Sub-text: \`%n\` left-aligned, \`%p\` right-aligned (timed format, 1 decimal)
- Bar color: Green default
- Add conditions or custom text for heal/damage/utility color swap

### Step 6: Create Cooldown Group
- Inside main group → New → Dynamic Group → Name: \`TK - Cooldowns\`
- Growth: Horizontal, Align: Center, Space: 4
- Anchor above mana bar

### Step 7: Create Each Cooldown Icon
For each spell (NS, EM, MT, Heroism):
- Inside CD group → New → Icon
- Trigger: Cooldown Progress (Spell) → [spell name] → Show Always
- Size: 34 × 34, Zoom: 0.1
- Sub-text: \`%p\` (timed, 0 decimal)
- Add Glow sub-region: Pixel, Green, 8 lines
- Conditions: On CD → desaturate + hide glow. Off CD → glow on

For Earth Shield:
- Trigger: Aura → Group → Earth Shield → Own Only → Show Stacks
- Add second trigger: Same but "Show On Missing" (inverted)
- Conditions: ≥5 stacks = green glow, ≤2 = red glow, missing = desaturated

For Trinkets:
- Trigger: Cooldown Progress (Slot) → Slot 13 / Slot 14

---

## Fine-Tuning Checklist

- [ ] Position the group so it's below your character but above action bars
- [ ] Test 5SR timer by casting a heal on a target dummy — orange bar should drain
- [ ] Verify tick timer syncs to your actual mana ticks (watch mana numbers)
- [ ] Check that cast bar turns green for heals, red for damage spells
- [ ] Confirm Earth Shield icon shows stack count and changes color
- [ ] Verify Heroism CD tracks correctly after use
- [ ] Adjust bar width if your resolution needs it (400 for 1440p, 500 for 4K)
- [ ] Run \`/wa\` → select group → test "Show" checkbox to preview all states
- [ ] If tick timer desyncs after death: \`/reload\` to reset

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| 5SR bar never shows | Check Events field = \`UNIT_SPELLCAST_SUCCEEDED\` exactly |
| Tick timer erratic | \`/reload\` to resync. Check \`UNIT_POWER_UPDATE\` event |
| Cast bar wrong color | Verify spell names match your spellbook EXACTLY |
| Cooldown icons missing | Spell name must match (check capitalization) |
| Earth Shield not tracking | Set unit to "group" not "player" |
| Trinkets show blank | They only show if the trinket has an on-use effect |
| Everything invisible | Check Load conditions → Class: Shaman, Combat: In Combat |
| Bars overlap | Adjust yOffset values in the group positioning |
`;

const guidePath = path.join(__dirname, 'Tidekeeper_Install_Guide.md');
fs.writeFileSync(guidePath, guideOutput, 'utf8');
console.log(`✅ Written to: ${guidePath}`);

console.log('\n📦 Build complete! Files generated:');
console.log('   1. Tidekeeper_WeakAuras.lua    — Full aura definitions + standalone Lua code');
console.log('   2. Tidekeeper_Install_Guide.md  — Step-by-step install instructions');
