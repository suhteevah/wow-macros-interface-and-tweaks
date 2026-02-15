-- ============================================================================
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

-- ---- Tidekeeper HUD ----
["Tidekeeper HUD"] = {
    anchorFrameType = "SCREEN",
    anchorPoint = "CENTER",
    selfPoint = "CENTER",
    frameStrata = 3,
    version = 1,
    subVersion = 1,
    semver = "1.0.0",
    specVersion = 1,
    preferToUpdate = false,
    tocversion = 20505,
    id = "Tidekeeper HUD",
    source = "import",
    config = {},
    information = {
        forceEvents = true,
        ignoreOptionsEventErrors = true,
    },
    animation = {
        start = {
            type = "none",
            easeStrength = 3,
            easeType = "none",
            duration_type = "seconds",
        },
        main = {
            type = "none",
            easeStrength = 3,
            easeType = "none",
            duration_type = "seconds",
        },
        finish = {
            type = "none",
            easeStrength = 3,
            easeType = "none",
            duration_type = "seconds",
        },
    },
    conditions = {},
    load = {
        talent = {
            multi = {},
        },
        class = {
            single = "SHAMAN",
            multi = {
                SHAMAN = true,
            },
        },
        spec = {
            multi = {},
        },
        size = {
            multi = {},
        },
        use_class = true,
        use_combat = true,
    },
    authorOptions = {},
    regionType = "group",
    uid = "tidekeeper_hud_master",
    groupIcon = 136052,
    xOffset = 0,
    yOffset = -80,
    controlledChildren = {
        "TK - Cooldowns", -- [1]
        "TK - Mana Bar", -- [2]
        "TK - 5SR Timer", -- [3]
        "TK - Tick Timer", -- [4]
        "TK - Cast Bar", -- [5]
    },
    borderBackdrop = "Blizzard Tooltip",
    borderColor = {
        0, -- [1]
        0, -- [2]
        0, -- [3]
        1, -- [4]
    },
    borderEdge = "Square Full White",
    borderOffset = 0,
    borderSize = 2,
    scale = 1,
},

-- ---- TK - Cooldowns ----
["TK - Cooldowns"] = {
    anchorFrameType = "SCREEN",
    anchorPoint = "CENTER",
    selfPoint = "CENTER",
    frameStrata = 3,
    version = 1,
    subVersion = 1,
    semver = "1.0.0",
    specVersion = 1,
    preferToUpdate = false,
    tocversion = 20505,
    id = "TK - Cooldowns",
    source = "import",
    config = {},
    information = {
        forceEvents = true,
        ignoreOptionsEventErrors = true,
    },
    animation = {
        start = {
            type = "none",
            easeStrength = 3,
            easeType = "none",
            duration_type = "seconds",
        },
        main = {
            type = "none",
            easeStrength = 3,
            easeType = "none",
            duration_type = "seconds",
        },
        finish = {
            type = "none",
            easeStrength = 3,
            easeType = "none",
            duration_type = "seconds",
        },
    },
    conditions = {},
    load = {
        talent = {
            multi = {},
        },
        class = {
            single = "SHAMAN",
            multi = {
                SHAMAN = true,
            },
        },
        spec = {
            multi = {},
        },
        size = {
            multi = {},
        },
        use_class = true,
        use_combat = true,
    },
    authorOptions = {},
    regionType = "dynamicgroup",
    uid = "tidekeeper_cd_group",
    parent = "Tidekeeper HUD",
    width = 300,
    height = 34,
    xOffset = 0,
    yOffset = 20,
    grow = "HORIZONTAL",
    align = "CENTER",
    space = 4,
    stagger = 0,
    sort = "none",
    controlledChildren = {
        "TK - CD: Nature's Swiftness", -- [1]
        "TK - CD: Elemental Mastery", -- [2]
        "TK - CD: Mana Tide Totem", -- [3]
        "TK - CD: Heroism", -- [4]
        "TK - CD: Earth Shield", -- [5]
        "TK - CD: Trinket 1", -- [6]
        "TK - CD: Trinket 2", -- [7]
    },
    borderBackdrop = "None",
    borderColor = {
        0, -- [1]
        0, -- [2]
        0, -- [3]
        0, -- [4]
    },
    borderEdge = "None",
    borderOffset = 0,
    borderSize = 0,
},

-- ---- TK - Mana Bar ----
["TK - Mana Bar"] = {
    anchorFrameType = "SCREEN",
    anchorPoint = "CENTER",
    selfPoint = "CENTER",
    frameStrata = 3,
    version = 1,
    subVersion = 1,
    semver = "1.0.0",
    specVersion = 1,
    preferToUpdate = false,
    tocversion = 20505,
    id = "TK - Mana Bar",
    source = "import",
    config = {},
    information = {
        forceEvents = true,
        ignoreOptionsEventErrors = true,
    },
    animation = {
        start = {
            type = "none",
            easeStrength = 3,
            easeType = "none",
            duration_type = "seconds",
        },
        main = {
            type = "none",
            easeStrength = 3,
            easeType = "none",
            duration_type = "seconds",
        },
        finish = {
            type = "none",
            easeStrength = 3,
            easeType = "none",
            duration_type = "seconds",
        },
    },
    conditions = {
        {
            check = {
                trigger = 1,
                variable = "percentpower",
                op = ">",
                value = "50",
            },
            changes = {
                {
                    property = "barColor",
                    value = {
                        0.08, -- [1]
                        0.38, -- [2]
                        0.74, -- [3]
                        1, -- [4]
                    },
                }, -- [1]
            },
        }, -- [1]
        {
            check = {
                trigger = 1,
                variable = "percentpower",
                op = "<=",
                value = "50",
            },
            changes = {
                {
                    property = "barColor",
                    value = {
                        0.1, -- [1]
                        0.65, -- [2]
                        0.65, -- [3]
                        1, -- [4]
                    },
                }, -- [1]
            },
        }, -- [2]
        {
            check = {
                trigger = 1,
                variable = "percentpower",
                op = "<=",
                value = "25",
            },
            changes = {
                {
                    property = "barColor",
                    value = {
                        0.85, -- [1]
                        0.15, -- [2]
                        0.15, -- [3]
                        1, -- [4]
                    },
                }, -- [1]
            },
        }, -- [3]
    },
    load = {
        talent = {
            multi = {},
        },
        class = {
            single = "SHAMAN",
            multi = {
                SHAMAN = true,
            },
        },
        spec = {
            multi = {},
        },
        size = {
            multi = {},
        },
        use_class = true,
        use_combat = true,
    },
    authorOptions = {},
    regionType = "aurabar",
    uid = "tidekeeper_mana_bar",
    parent = "Tidekeeper HUD",
    width = 350,
    height = 22,
    xOffset = 0,
    yOffset = 0,
    orientation = "HORIZONTAL",
    barColor = {
        0.08, -- [1]
        0.38, -- [2]
        0.74, -- [3]
        1, -- [4]
    },
    backgroundColor = {
        0.1, -- [1]
        0.1, -- [2]
        0.1, -- [3]
        0.7, -- [4]
    },
    texture = "Smooth v2",
    spark = false,
    sparkTexture = "Interface\\CastingBar\\UI-CastingBar-Spark",
    sparkWidth = 10,
    sparkHeight = 30,
    sparkColor = {
        1, -- [1]
        1, -- [2]
        1, -- [3]
        1, -- [4]
    },
    sparkOffsetX = 0,
    sparkOffsetY = 0,
    sparkRotationMode = "AUTO",
    sparkDesaturate = false,
    sparkBlendMode = "ADD",
    icon = false,
    icon_side = "RIGHT",
    zoom = 0,
    triggers = {
        [1] = {
            trigger = {
                type = "unit",
                event = "Power",
                subeventSuffix = "",
                unit = "player",
                powertype = 0,
                use_percentpower = false,
                use_unit = true,
                debuffType = "HELPFUL",
            },
            untrigger = {},
        },
        activeTriggerMode = -10,
    },
    subRegions = {
        {
            type = "subbackground",
        }, -- [1]
        {
            type = "subforeground",
        }, -- [2]
        {
            type = "subtext",
            text_text = "%p / %t",
            text_color = {
                1, -- [1]
                1, -- [2]
                1, -- [3]
                1, -- [4]
            },
            text_font = "Friz Quadrata TT",
            text_fontSize = 11,
            text_fontType = "OUTLINE",
            text_justify = "CENTER",
            text_anchorPoint = "INNER_CENTER",
            text_anchorXOffset = 0,
            text_anchorYOffset = 0,
            text_shadowColor = {
                0, -- [1]
                0, -- [2]
                0, -- [3]
                1, -- [4]
            },
            text_shadowXOffset = 1,
            text_shadowYOffset = -1,
            text_visible = true,
            text_selfPoint = "AUTO",
            text_text_format_p_format = "BigNumber",
            text_text_format_t_format = "BigNumber",
        }, -- [3]
        {
            type = "subtext",
            text_text = "%percentpower%%",
            text_color = {
                1, -- [1]
                1, -- [2]
                1, -- [3]
                0.7, -- [4]
            },
            text_font = "Friz Quadrata TT",
            text_fontSize = 10,
            text_fontType = "OUTLINE",
            text_justify = "RIGHT",
            text_anchorPoint = "INNER_RIGHT",
            text_anchorXOffset = -4,
            text_anchorYOffset = 0,
            text_visible = true,
            text_selfPoint = "AUTO",
        }, -- [4]
    },
},

-- ---- TK - 5SR Timer ----
["TK - 5SR Timer"] = {
    anchorFrameType = "SCREEN",
    anchorPoint = "CENTER",
    selfPoint = "CENTER",
    frameStrata = 3,
    version = 1,
    subVersion = 1,
    semver = "1.0.0",
    specVersion = 1,
    preferToUpdate = false,
    tocversion = 20505,
    id = "TK - 5SR Timer",
    source = "import",
    config = {},
    information = {
        forceEvents = true,
        ignoreOptionsEventErrors = true,
    },
    animation = {
        start = {
            type = "none",
            easeStrength = 3,
            easeType = "none",
            duration_type = "seconds",
        },
        main = {
            type = "none",
            easeStrength = 3,
            easeType = "none",
            duration_type = "seconds",
        },
        finish = {
            type = "none",
            easeStrength = 3,
            easeType = "none",
            duration_type = "seconds",
        },
    },
    conditions = {
        {
            check = {
                trigger = 1,
                variable = "show",
                value = 1,
            },
            changes = {},
        }, -- [1]
    },
    load = {
        talent = {
            multi = {},
        },
        class = {
            single = "SHAMAN",
            multi = {
                SHAMAN = true,
            },
        },
        spec = {
            multi = {},
        },
        size = {
            multi = {},
        },
        use_class = true,
        use_combat = true,
    },
    authorOptions = {},
    regionType = "aurabar",
    uid = "tidekeeper_5sr_timer",
    parent = "Tidekeeper HUD",
    width = 350,
    height = 5,
    xOffset = 0,
    yOffset = -14,
    orientation = "HORIZONTAL",
    barColor = {
        1, -- [1]
        0.55, -- [2]
        0, -- [3]
        1, -- [4]
    },
    backgroundColor = {
        0.1, -- [1]
        0.1, -- [2]
        0.1, -- [3]
        0.5, -- [4]
    },
    texture = "Smooth v2",
    spark = false,
    icon = false,
    triggers = {
        [1] = {
            trigger = {
                type = "custom",
                custom_type = "stateupdate",
                check = "update",
                custom = [=[function(allstates, event, ...)
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
end]=],
                customVariables = "{}",
                events = "UNIT_SPELLCAST_SUCCEEDED",
                check_events = "UNIT_SPELLCAST_SUCCEEDED",
            },
            untrigger = {},
        },
        activeTriggerMode = -10,
    },
    actions = {
        init = {
            do_custom = true,
            custom = "aura_env.lastManaSpend = 0",
        },
    },
    subRegions = {
        {
            type = "subbackground",
        }, -- [1]
        {
            type = "subforeground",
        }, -- [2]
        {
            type = "subtext",
            text_text = "5SR",
            text_color = {
                1, -- [1]
                0.8, -- [2]
                0.4, -- [3]
                0.6, -- [4]
            },
            text_font = "Friz Quadrata TT",
            text_fontSize = 8,
            text_fontType = "OUTLINE",
            text_anchorPoint = "INNER_LEFT",
            text_anchorXOffset = 2,
            text_anchorYOffset = 0,
            text_visible = true,
            text_selfPoint = "AUTO",
        }, -- [3]
    },
},

-- ---- TK - Tick Timer ----
["TK - Tick Timer"] = {
    anchorFrameType = "SCREEN",
    anchorPoint = "CENTER",
    selfPoint = "CENTER",
    frameStrata = 3,
    version = 1,
    subVersion = 1,
    semver = "1.0.0",
    specVersion = 1,
    preferToUpdate = false,
    tocversion = 20505,
    id = "TK - Tick Timer",
    source = "import",
    config = {},
    information = {
        forceEvents = true,
        ignoreOptionsEventErrors = true,
    },
    animation = {
        start = {
            type = "none",
            easeStrength = 3,
            easeType = "none",
            duration_type = "seconds",
        },
        main = {
            type = "none",
            easeStrength = 3,
            easeType = "none",
            duration_type = "seconds",
        },
        finish = {
            type = "none",
            easeStrength = 3,
            easeType = "none",
            duration_type = "seconds",
        },
    },
    conditions = {},
    load = {
        talent = {
            multi = {},
        },
        class = {
            single = "SHAMAN",
            multi = {
                SHAMAN = true,
            },
        },
        spec = {
            multi = {},
        },
        size = {
            multi = {},
        },
        use_class = true,
        use_combat = true,
    },
    authorOptions = {},
    regionType = "aurabar",
    uid = "tidekeeper_tick_timer",
    parent = "Tidekeeper HUD",
    width = 350,
    height = 5,
    xOffset = 0,
    yOffset = -20,
    orientation = "HORIZONTAL",
    barColor = {
        0, -- [1]
        0.9, -- [2]
        1, -- [3]
        1, -- [4]
    },
    backgroundColor = {
        0.1, -- [1]
        0.1, -- [2]
        0.1, -- [3]
        0.5, -- [4]
    },
    texture = "Smooth v2",
    spark = true,
    sparkTexture = "Interface\\CastingBar\\UI-CastingBar-Spark",
    sparkWidth = 8,
    sparkHeight = 20,
    sparkColor = {
        1, -- [1]
        1, -- [2]
        1, -- [3]
        0.8, -- [4]
    },
    sparkOffsetX = 0,
    sparkOffsetY = 0,
    sparkRotationMode = "AUTO",
    sparkDesaturate = false,
    sparkBlendMode = "ADD",
    icon = false,
    triggers = {
        [1] = {
            trigger = {
                type = "custom",
                custom_type = "stateupdate",
                check = "update",
                custom = [=[function(allstates, event, ...)
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
end]=],
                customVariables = "{}",
                events = "UNIT_POWER_UPDATE",
                check_events = "UNIT_POWER_UPDATE",
            },
            untrigger = {},
        },
        activeTriggerMode = -10,
    },
    actions = {
        init = {
            do_custom = true,
            custom = [=[aura_env.lastMana = UnitPower("player", 0)
aura_env.lastTickTime = GetTime()
aura_env.lastTickAmount = 0]=],
        },
    },
    subRegions = {
        {
            type = "subbackground",
        }, -- [1]
        {
            type = "subforeground",
        }, -- [2]
        {
            type = "subtext",
            text_text = "%c",
            text_color = {
                0.6, -- [1]
                1, -- [2]
                1, -- [3]
                0.7, -- [4]
            },
            text_font = "Friz Quadrata TT",
            text_fontSize = 8,
            text_fontType = "OUTLINE",
            text_anchorPoint = "INNER_RIGHT",
            text_anchorXOffset = -2,
            text_anchorYOffset = 0,
            text_visible = true,
            text_selfPoint = "AUTO",
        }, -- [3]
    },
    customText = [=[function()
    if aura_env.lastTickAmount and aura_env.lastTickAmount > 0 then
        return "+" .. aura_env.lastTickAmount
    end
    return ""
end]=],
},

-- ---- TK - Cast Bar ----
["TK - Cast Bar"] = {
    anchorFrameType = "SCREEN",
    anchorPoint = "CENTER",
    selfPoint = "CENTER",
    frameStrata = 3,
    version = 1,
    subVersion = 1,
    semver = "1.0.0",
    specVersion = 1,
    preferToUpdate = false,
    tocversion = 20505,
    id = "TK - Cast Bar",
    source = "import",
    config = {},
    information = {
        forceEvents = true,
        ignoreOptionsEventErrors = true,
    },
    animation = {
        start = {
            type = "none",
            easeStrength = 3,
            easeType = "none",
            duration_type = "seconds",
        },
        main = {
            type = "none",
            easeStrength = 3,
            easeType = "none",
            duration_type = "seconds",
        },
        finish = {
            type = "none",
            easeStrength = 3,
            easeType = "none",
            duration_type = "seconds",
        },
    },
    conditions = {},
    load = {
        talent = {
            multi = {},
        },
        class = {
            single = "SHAMAN",
            multi = {
                SHAMAN = true,
            },
        },
        spec = {
            multi = {},
        },
        size = {
            multi = {},
        },
        use_class = true,
        use_combat = true,
    },
    authorOptions = {},
    regionType = "aurabar",
    uid = "tidekeeper_cast_bar",
    parent = "Tidekeeper HUD",
    width = 350,
    height = 16,
    xOffset = 0,
    yOffset = -30,
    orientation = "HORIZONTAL",
    barColor = {
        0.18, -- [1]
        0.8, -- [2]
        0.44, -- [3]
        1, -- [4]
    },
    backgroundColor = {
        0.1, -- [1]
        0.1, -- [2]
        0.1, -- [3]
        0.7, -- [4]
    },
    texture = "Smooth v2",
    spark = true,
    sparkTexture = "Interface\\CastingBar\\UI-CastingBar-Spark",
    sparkWidth = 10,
    sparkHeight = 26,
    sparkColor = {
        1, -- [1]
        1, -- [2]
        1, -- [3]
        0.7, -- [4]
    },
    sparkOffsetX = 0,
    sparkOffsetY = 0,
    sparkRotationMode = "AUTO",
    sparkDesaturate = false,
    sparkBlendMode = "ADD",
    icon = true,
    icon_side = "LEFT",
    zoom = 0.1,
    triggers = {
        [1] = {
            trigger = {
                type = "unit",
                event = "Cast",
                subeventSuffix = "",
                unit = "player",
                use_unit = true,
                debuffType = "HELPFUL",
            },
            untrigger = {},
        },
        activeTriggerMode = -10,
    },
    subRegions = {
        {
            type = "subbackground",
        }, -- [1]
        {
            type = "subforeground",
        }, -- [2]
        {
            type = "subtext",
            text_text = "%n",
            text_color = {
                1, -- [1]
                1, -- [2]
                1, -- [3]
                1, -- [4]
            },
            text_font = "Friz Quadrata TT",
            text_fontSize = 10,
            text_fontType = "OUTLINE",
            text_justify = "LEFT",
            text_anchorPoint = "INNER_LEFT",
            text_anchorXOffset = 4,
            text_anchorYOffset = 0,
            text_visible = true,
            text_selfPoint = "AUTO",
        }, -- [3]
        {
            type = "subtext",
            text_text = "%p",
            text_color = {
                1, -- [1]
                1, -- [2]
                1, -- [3]
                0.9, -- [4]
            },
            text_font = "Friz Quadrata TT",
            text_fontSize = 10,
            text_fontType = "OUTLINE",
            text_justify = "RIGHT",
            text_anchorPoint = "INNER_RIGHT",
            text_anchorXOffset = -4,
            text_anchorYOffset = 0,
            text_visible = true,
            text_selfPoint = "AUTO",
            text_text_format_p_format = "timed",
            text_text_format_p_time_precision = 1,
            text_text_format_p_time_dynamic_threshold = 0,
        }, -- [4]
    },
    customText = [=[function()
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
end]=],
},

-- ---- TK - CD: Nature's Swiftness ----
["TK - CD: Nature's Swiftness"] = {
    anchorFrameType = "SCREEN",
    anchorPoint = "CENTER",
    selfPoint = "CENTER",
    frameStrata = 3,
    version = 1,
    subVersion = 1,
    semver = "1.0.0",
    specVersion = 1,
    preferToUpdate = false,
    tocversion = 20505,
    id = "TK - CD: Nature's Swiftness",
    source = "import",
    config = {},
    information = {
        forceEvents = true,
        ignoreOptionsEventErrors = true,
    },
    animation = {
        start = {
            type = "none",
            easeStrength = 3,
            easeType = "none",
            duration_type = "seconds",
        },
        main = {
            type = "none",
            easeStrength = 3,
            easeType = "none",
            duration_type = "seconds",
        },
        finish = {
            type = "none",
            easeStrength = 3,
            easeType = "none",
            duration_type = "seconds",
        },
    },
    conditions = {
        {
            check = {
                trigger = 1,
                variable = "onCooldown",
                value = 1,
            },
            changes = {
                {
                    property = "desaturate",
                    value = true,
                }, -- [1]
                {
                    property = "sub.3.glow",
                    value = false,
                }, -- [2]
            },
        }, -- [1]
        {
            check = {
                trigger = 1,
                variable = "onCooldown",
                value = 0,
            },
            changes = {
                {
                    property = "desaturate",
                    value = false,
                }, -- [1]
                {
                    property = "sub.3.glow",
                    value = true,
                }, -- [2]
            },
        }, -- [2]
    },
    load = {
        talent = {
            multi = {},
        },
        class = {
            single = "SHAMAN",
            multi = {
                SHAMAN = true,
            },
        },
        spec = {
            multi = {},
        },
        size = {
            multi = {},
        },
        use_class = true,
        use_combat = true,
    },
    authorOptions = {},
    regionType = "icon",
    uid = "tk_cd_ns",
    parent = "TK - Cooldowns",
    width = 34,
    height = 34,
    xOffset = 0,
    yOffset = 0,
    cooldownSwipe = true,
    cooldownEdge = true,
    cooldownTextDisabled = false,
    desaturate = false,
    icon = true,
    zoom = 0.1,
    keepAspectRatio = true,
    auto = true,
    triggers = {
        [1] = {
            trigger = {
                type = "spell",
                event = "Cooldown Progress (Spell)",
                spellName = "Nature's Swiftness",
                use_genericShowOn = true,
                genericShowOn = "showAlways",
                subeventSuffix = "",
                unit = "player",
                debuffType = "HELPFUL",
                realSpellName = "Nature's Swiftness",
            },
            untrigger = {},
        },
        activeTriggerMode = -10,
    },
    subRegions = {
        {
            type = "subbackground",
        }, -- [1]
        {
            type = "subtext",
            text_text = "%p",
            text_color = {
                1, -- [1]
                1, -- [2]
                1, -- [3]
                1, -- [4]
            },
            text_font = "Friz Quadrata TT",
            text_fontSize = 14,
            text_fontType = "THICKOUTLINE",
            text_anchorPoint = "CENTER",
            text_anchorXOffset = 0,
            text_anchorYOffset = 0,
            text_visible = true,
            text_selfPoint = "AUTO",
            text_text_format_p_format = "timed",
            text_text_format_p_time_precision = 0,
            text_text_format_p_time_dynamic_threshold = 3,
        }, -- [2]
        {
            type = "subglow",
            glow = false,
            glowType = "Pixel",
            glowColor = {
                0, -- [1]
                1, -- [2]
                0.53, -- [3]
                1, -- [4]
            },
            glowLines = 8,
            glowLength = 6,
            glowThickness = 2,
            glowFrequency = 0.25,
            glowXOffset = 0,
            glowYOffset = 0,
            glowScale = 1,
        }, -- [3]
    },
},

-- ---- TK - CD: Elemental Mastery ----
["TK - CD: Elemental Mastery"] = {
    anchorFrameType = "SCREEN",
    anchorPoint = "CENTER",
    selfPoint = "CENTER",
    frameStrata = 3,
    version = 1,
    subVersion = 1,
    semver = "1.0.0",
    specVersion = 1,
    preferToUpdate = false,
    tocversion = 20505,
    id = "TK - CD: Elemental Mastery",
    source = "import",
    config = {},
    information = {
        forceEvents = true,
        ignoreOptionsEventErrors = true,
    },
    animation = {
        start = {
            type = "none",
            easeStrength = 3,
            easeType = "none",
            duration_type = "seconds",
        },
        main = {
            type = "none",
            easeStrength = 3,
            easeType = "none",
            duration_type = "seconds",
        },
        finish = {
            type = "none",
            easeStrength = 3,
            easeType = "none",
            duration_type = "seconds",
        },
    },
    conditions = {
        {
            check = {
                trigger = 1,
                variable = "onCooldown",
                value = 1,
            },
            changes = {
                {
                    property = "desaturate",
                    value = true,
                }, -- [1]
                {
                    property = "sub.3.glow",
                    value = false,
                }, -- [2]
            },
        }, -- [1]
        {
            check = {
                trigger = 1,
                variable = "onCooldown",
                value = 0,
            },
            changes = {
                {
                    property = "desaturate",
                    value = false,
                }, -- [1]
                {
                    property = "sub.3.glow",
                    value = true,
                }, -- [2]
            },
        }, -- [2]
    },
    load = {
        talent = {
            multi = {},
        },
        class = {
            single = "SHAMAN",
            multi = {
                SHAMAN = true,
            },
        },
        spec = {
            multi = {},
        },
        size = {
            multi = {},
        },
        use_class = true,
        use_combat = true,
    },
    authorOptions = {},
    regionType = "icon",
    uid = "tk_cd_em",
    parent = "TK - Cooldowns",
    width = 34,
    height = 34,
    xOffset = 0,
    yOffset = 0,
    cooldownSwipe = true,
    cooldownEdge = true,
    cooldownTextDisabled = false,
    desaturate = false,
    icon = true,
    zoom = 0.1,
    keepAspectRatio = true,
    auto = true,
    triggers = {
        [1] = {
            trigger = {
                type = "spell",
                event = "Cooldown Progress (Spell)",
                spellName = "Elemental Mastery",
                use_genericShowOn = true,
                genericShowOn = "showAlways",
                subeventSuffix = "",
                unit = "player",
                debuffType = "HELPFUL",
                realSpellName = "Elemental Mastery",
            },
            untrigger = {},
        },
        activeTriggerMode = -10,
    },
    subRegions = {
        {
            type = "subbackground",
        }, -- [1]
        {
            type = "subtext",
            text_text = "%p",
            text_color = {
                1, -- [1]
                1, -- [2]
                1, -- [3]
                1, -- [4]
            },
            text_font = "Friz Quadrata TT",
            text_fontSize = 14,
            text_fontType = "THICKOUTLINE",
            text_anchorPoint = "CENTER",
            text_anchorXOffset = 0,
            text_anchorYOffset = 0,
            text_visible = true,
            text_selfPoint = "AUTO",
            text_text_format_p_format = "timed",
            text_text_format_p_time_precision = 0,
            text_text_format_p_time_dynamic_threshold = 3,
        }, -- [2]
        {
            type = "subglow",
            glow = false,
            glowType = "Pixel",
            glowColor = {
                0, -- [1]
                1, -- [2]
                0.53, -- [3]
                1, -- [4]
            },
            glowLines = 8,
            glowLength = 6,
            glowThickness = 2,
            glowFrequency = 0.25,
            glowXOffset = 0,
            glowYOffset = 0,
            glowScale = 1,
        }, -- [3]
    },
},

-- ---- TK - CD: Mana Tide Totem ----
["TK - CD: Mana Tide Totem"] = {
    anchorFrameType = "SCREEN",
    anchorPoint = "CENTER",
    selfPoint = "CENTER",
    frameStrata = 3,
    version = 1,
    subVersion = 1,
    semver = "1.0.0",
    specVersion = 1,
    preferToUpdate = false,
    tocversion = 20505,
    id = "TK - CD: Mana Tide Totem",
    source = "import",
    config = {},
    information = {
        forceEvents = true,
        ignoreOptionsEventErrors = true,
    },
    animation = {
        start = {
            type = "none",
            easeStrength = 3,
            easeType = "none",
            duration_type = "seconds",
        },
        main = {
            type = "none",
            easeStrength = 3,
            easeType = "none",
            duration_type = "seconds",
        },
        finish = {
            type = "none",
            easeStrength = 3,
            easeType = "none",
            duration_type = "seconds",
        },
    },
    conditions = {
        {
            check = {
                trigger = 1,
                variable = "onCooldown",
                value = 1,
            },
            changes = {
                {
                    property = "desaturate",
                    value = true,
                }, -- [1]
                {
                    property = "sub.3.glow",
                    value = false,
                }, -- [2]
            },
        }, -- [1]
        {
            check = {
                trigger = 1,
                variable = "onCooldown",
                value = 0,
            },
            changes = {
                {
                    property = "desaturate",
                    value = false,
                }, -- [1]
                {
                    property = "sub.3.glow",
                    value = true,
                }, -- [2]
            },
        }, -- [2]
    },
    load = {
        talent = {
            multi = {},
        },
        class = {
            single = "SHAMAN",
            multi = {
                SHAMAN = true,
            },
        },
        spec = {
            multi = {},
        },
        size = {
            multi = {},
        },
        use_class = true,
        use_combat = true,
    },
    authorOptions = {},
    regionType = "icon",
    uid = "tk_cd_mt",
    parent = "TK - Cooldowns",
    width = 34,
    height = 34,
    xOffset = 0,
    yOffset = 0,
    cooldownSwipe = true,
    cooldownEdge = true,
    cooldownTextDisabled = false,
    desaturate = false,
    icon = true,
    zoom = 0.1,
    keepAspectRatio = true,
    auto = true,
    triggers = {
        [1] = {
            trigger = {
                type = "spell",
                event = "Cooldown Progress (Spell)",
                spellName = "Mana Tide Totem",
                use_genericShowOn = true,
                genericShowOn = "showAlways",
                subeventSuffix = "",
                unit = "player",
                debuffType = "HELPFUL",
                realSpellName = "Mana Tide Totem",
            },
            untrigger = {},
        },
        activeTriggerMode = -10,
    },
    subRegions = {
        {
            type = "subbackground",
        }, -- [1]
        {
            type = "subtext",
            text_text = "%p",
            text_color = {
                1, -- [1]
                1, -- [2]
                1, -- [3]
                1, -- [4]
            },
            text_font = "Friz Quadrata TT",
            text_fontSize = 14,
            text_fontType = "THICKOUTLINE",
            text_anchorPoint = "CENTER",
            text_anchorXOffset = 0,
            text_anchorYOffset = 0,
            text_visible = true,
            text_selfPoint = "AUTO",
            text_text_format_p_format = "timed",
            text_text_format_p_time_precision = 0,
            text_text_format_p_time_dynamic_threshold = 3,
        }, -- [2]
        {
            type = "subglow",
            glow = false,
            glowType = "Pixel",
            glowColor = {
                0, -- [1]
                1, -- [2]
                0.53, -- [3]
                1, -- [4]
            },
            glowLines = 8,
            glowLength = 6,
            glowThickness = 2,
            glowFrequency = 0.25,
            glowXOffset = 0,
            glowYOffset = 0,
            glowScale = 1,
        }, -- [3]
    },
},

-- ---- TK - CD: Heroism ----
["TK - CD: Heroism"] = {
    anchorFrameType = "SCREEN",
    anchorPoint = "CENTER",
    selfPoint = "CENTER",
    frameStrata = 3,
    version = 1,
    subVersion = 1,
    semver = "1.0.0",
    specVersion = 1,
    preferToUpdate = false,
    tocversion = 20505,
    id = "TK - CD: Heroism",
    source = "import",
    config = {},
    information = {
        forceEvents = true,
        ignoreOptionsEventErrors = true,
    },
    animation = {
        start = {
            type = "none",
            easeStrength = 3,
            easeType = "none",
            duration_type = "seconds",
        },
        main = {
            type = "none",
            easeStrength = 3,
            easeType = "none",
            duration_type = "seconds",
        },
        finish = {
            type = "none",
            easeStrength = 3,
            easeType = "none",
            duration_type = "seconds",
        },
    },
    conditions = {
        {
            check = {
                trigger = 1,
                variable = "onCooldown",
                value = 1,
            },
            changes = {
                {
                    property = "desaturate",
                    value = true,
                }, -- [1]
                {
                    property = "sub.3.glow",
                    value = false,
                }, -- [2]
            },
        }, -- [1]
        {
            check = {
                trigger = 1,
                variable = "onCooldown",
                value = 0,
            },
            changes = {
                {
                    property = "desaturate",
                    value = false,
                }, -- [1]
                {
                    property = "sub.3.glow",
                    value = true,
                }, -- [2]
            },
        }, -- [2]
    },
    load = {
        talent = {
            multi = {},
        },
        class = {
            single = "SHAMAN",
            multi = {
                SHAMAN = true,
            },
        },
        spec = {
            multi = {},
        },
        size = {
            multi = {},
        },
        use_class = true,
        use_combat = true,
    },
    authorOptions = {},
    regionType = "icon",
    uid = "tk_cd_hero",
    parent = "TK - Cooldowns",
    width = 34,
    height = 34,
    xOffset = 0,
    yOffset = 0,
    cooldownSwipe = true,
    cooldownEdge = true,
    cooldownTextDisabled = false,
    desaturate = false,
    icon = true,
    zoom = 0.1,
    keepAspectRatio = true,
    auto = true,
    triggers = {
        [1] = {
            trigger = {
                type = "spell",
                event = "Cooldown Progress (Spell)",
                spellName = "Heroism",
                use_genericShowOn = true,
                genericShowOn = "showAlways",
                subeventSuffix = "",
                unit = "player",
                debuffType = "HELPFUL",
                realSpellName = "Heroism",
            },
            untrigger = {},
        },
        activeTriggerMode = -10,
    },
    subRegions = {
        {
            type = "subbackground",
        }, -- [1]
        {
            type = "subtext",
            text_text = "%p",
            text_color = {
                1, -- [1]
                1, -- [2]
                1, -- [3]
                1, -- [4]
            },
            text_font = "Friz Quadrata TT",
            text_fontSize = 14,
            text_fontType = "THICKOUTLINE",
            text_anchorPoint = "CENTER",
            text_anchorXOffset = 0,
            text_anchorYOffset = 0,
            text_visible = true,
            text_selfPoint = "AUTO",
            text_text_format_p_format = "timed",
            text_text_format_p_time_precision = 0,
            text_text_format_p_time_dynamic_threshold = 3,
        }, -- [2]
        {
            type = "subglow",
            glow = false,
            glowType = "Pixel",
            glowColor = {
                0, -- [1]
                1, -- [2]
                0.53, -- [3]
                1, -- [4]
            },
            glowLines = 8,
            glowLength = 6,
            glowThickness = 2,
            glowFrequency = 0.25,
            glowXOffset = 0,
            glowYOffset = 0,
            glowScale = 1,
        }, -- [3]
    },
},

-- ---- TK - CD: Earth Shield ----
["TK - CD: Earth Shield"] = {
    anchorFrameType = "SCREEN",
    anchorPoint = "CENTER",
    selfPoint = "CENTER",
    frameStrata = 3,
    version = 1,
    subVersion = 1,
    semver = "1.0.0",
    specVersion = 1,
    preferToUpdate = false,
    tocversion = 20505,
    id = "TK - CD: Earth Shield",
    source = "import",
    config = {},
    information = {
        forceEvents = true,
        ignoreOptionsEventErrors = true,
    },
    animation = {
        start = {
            type = "none",
            easeStrength = 3,
            easeType = "none",
            duration_type = "seconds",
        },
        main = {
            type = "none",
            easeStrength = 3,
            easeType = "none",
            duration_type = "seconds",
        },
        finish = {
            type = "none",
            easeStrength = 3,
            easeType = "none",
            duration_type = "seconds",
        },
    },
    conditions = {
        {
            check = {
                trigger = 1,
                variable = "stacks",
                op = ">=",
                value = "5",
            },
            changes = {
                {
                    property = "sub.3.glow",
                    value = true,
                }, -- [1]
                {
                    property = "sub.3.glowColor",
                    value = {
                        0, -- [1]
                        0.9, -- [2]
                        0.3, -- [3]
                        1, -- [4]
                    },
                }, -- [2]
            },
        }, -- [1]
        {
            check = {
                trigger = 1,
                variable = "stacks",
                op = "<=",
                value = "2",
            },
            changes = {
                {
                    property = "sub.3.glow",
                    value = true,
                }, -- [1]
                {
                    property = "sub.3.glowColor",
                    value = {
                        1, -- [1]
                        0.2, -- [2]
                        0.1, -- [3]
                        1, -- [4]
                    },
                }, -- [2]
            },
        }, -- [2]
        {
            check = {
                trigger = 2,
                variable = "show",
                value = 1,
            },
            changes = {
                {
                    property = "desaturate",
                    value = true,
                }, -- [1]
                {
                    property = "sub.3.glow",
                    value = true,
                }, -- [2]
                {
                    property = "sub.3.glowColor",
                    value = {
                        1, -- [1]
                        0, -- [2]
                        0, -- [3]
                        1, -- [4]
                    },
                }, -- [3]
            },
        }, -- [3]
    },
    load = {
        talent = {
            multi = {},
        },
        class = {
            single = "SHAMAN",
            multi = {
                SHAMAN = true,
            },
        },
        spec = {
            multi = {},
        },
        size = {
            multi = {},
        },
        use_class = true,
        use_combat = true,
    },
    authorOptions = {},
    regionType = "icon",
    uid = "tk_cd_es",
    parent = "TK - Cooldowns",
    width = 34,
    height = 34,
    xOffset = 0,
    yOffset = 0,
    cooldownSwipe = true,
    cooldownEdge = true,
    cooldownTextDisabled = false,
    desaturate = false,
    icon = true,
    zoom = 0.1,
    keepAspectRatio = true,
    auto = true,
    triggers = {
        [1] = {
            trigger = {
                type = "aura2",
                event = "Health",
                subeventSuffix = "",
                auranames = {
                    "Earth Shield", -- [1]
                },
                unit = "group",
                ownOnly = true,
                matchesShowOn = "showOnActive",
                useStacks = true,
                debuffType = "HELPFUL",
            },
            untrigger = {},
        },
        [2] = {
            trigger = {
                type = "aura2",
                event = "Health",
                subeventSuffix = "",
                auranames = {
                    "Earth Shield", -- [1]
                },
                unit = "group",
                ownOnly = true,
                matchesShowOn = "showOnMissing",
                debuffType = "HELPFUL",
            },
            untrigger = {},
        },
        disjunctive = "any",
        activeTriggerMode = -10,
    },
    subRegions = {
        {
            type = "subbackground",
        }, -- [1]
        {
            type = "subtext",
            text_text = "%p",
            text_color = {
                1, -- [1]
                1, -- [2]
                1, -- [3]
                1, -- [4]
            },
            text_font = "Friz Quadrata TT",
            text_fontSize = 14,
            text_fontType = "THICKOUTLINE",
            text_anchorPoint = "CENTER",
            text_anchorXOffset = 0,
            text_anchorYOffset = 0,
            text_visible = true,
            text_selfPoint = "AUTO",
            text_text_format_p_format = "timed",
            text_text_format_p_time_precision = 0,
            text_text_format_p_time_dynamic_threshold = 3,
        }, -- [2]
        {
            type = "subglow",
            glow = false,
            glowType = "Pixel",
            glowColor = {
                0, -- [1]
                1, -- [2]
                0.53, -- [3]
                1, -- [4]
            },
            glowLines = 8,
            glowLength = 6,
            glowThickness = 2,
            glowFrequency = 0.25,
            glowXOffset = 0,
            glowYOffset = 0,
            glowScale = 1,
        }, -- [3]
    },
},

-- ---- TK - CD: Trinket 1 ----
["TK - CD: Trinket 1"] = {
    anchorFrameType = "SCREEN",
    anchorPoint = "CENTER",
    selfPoint = "CENTER",
    frameStrata = 3,
    version = 1,
    subVersion = 1,
    semver = "1.0.0",
    specVersion = 1,
    preferToUpdate = false,
    tocversion = 20505,
    id = "TK - CD: Trinket 1",
    source = "import",
    config = {},
    information = {
        forceEvents = true,
        ignoreOptionsEventErrors = true,
    },
    animation = {
        start = {
            type = "none",
            easeStrength = 3,
            easeType = "none",
            duration_type = "seconds",
        },
        main = {
            type = "none",
            easeStrength = 3,
            easeType = "none",
            duration_type = "seconds",
        },
        finish = {
            type = "none",
            easeStrength = 3,
            easeType = "none",
            duration_type = "seconds",
        },
    },
    conditions = {
        {
            check = {
                trigger = 1,
                variable = "onCooldown",
                value = 1,
            },
            changes = {
                {
                    property = "desaturate",
                    value = true,
                }, -- [1]
                {
                    property = "sub.3.glow",
                    value = false,
                }, -- [2]
            },
        }, -- [1]
        {
            check = {
                trigger = 1,
                variable = "onCooldown",
                value = 0,
            },
            changes = {
                {
                    property = "desaturate",
                    value = false,
                }, -- [1]
                {
                    property = "sub.3.glow",
                    value = true,
                }, -- [2]
            },
        }, -- [2]
    },
    load = {
        talent = {
            multi = {},
        },
        class = {
            single = "SHAMAN",
            multi = {
                SHAMAN = true,
            },
        },
        spec = {
            multi = {},
        },
        size = {
            multi = {},
        },
        use_class = true,
        use_combat = true,
    },
    authorOptions = {},
    regionType = "icon",
    uid = "tk_cd_trink1",
    parent = "TK - Cooldowns",
    width = 34,
    height = 34,
    xOffset = 0,
    yOffset = 0,
    cooldownSwipe = true,
    cooldownEdge = true,
    cooldownTextDisabled = false,
    desaturate = false,
    icon = true,
    zoom = 0.1,
    keepAspectRatio = true,
    auto = true,
    triggers = {
        [1] = {
            trigger = {
                type = "item",
                event = "Cooldown Progress (Slot)",
                itemSlot = 13,
                use_genericShowOn = true,
                genericShowOn = "showAlways",
            },
            untrigger = {},
        },
        activeTriggerMode = -10,
    },
    subRegions = {
        {
            type = "subbackground",
        }, -- [1]
        {
            type = "subtext",
            text_text = "%p",
            text_color = {
                1, -- [1]
                1, -- [2]
                1, -- [3]
                1, -- [4]
            },
            text_font = "Friz Quadrata TT",
            text_fontSize = 14,
            text_fontType = "THICKOUTLINE",
            text_anchorPoint = "CENTER",
            text_anchorXOffset = 0,
            text_anchorYOffset = 0,
            text_visible = true,
            text_selfPoint = "AUTO",
            text_text_format_p_format = "timed",
            text_text_format_p_time_precision = 0,
            text_text_format_p_time_dynamic_threshold = 3,
        }, -- [2]
        {
            type = "subglow",
            glow = false,
            glowType = "Pixel",
            glowColor = {
                0, -- [1]
                1, -- [2]
                0.53, -- [3]
                1, -- [4]
            },
            glowLines = 8,
            glowLength = 6,
            glowThickness = 2,
            glowFrequency = 0.25,
            glowXOffset = 0,
            glowYOffset = 0,
            glowScale = 1,
        }, -- [3]
    },
},

-- ---- TK - CD: Trinket 2 ----
["TK - CD: Trinket 2"] = {
    anchorFrameType = "SCREEN",
    anchorPoint = "CENTER",
    selfPoint = "CENTER",
    frameStrata = 3,
    version = 1,
    subVersion = 1,
    semver = "1.0.0",
    specVersion = 1,
    preferToUpdate = false,
    tocversion = 20505,
    id = "TK - CD: Trinket 2",
    source = "import",
    config = {},
    information = {
        forceEvents = true,
        ignoreOptionsEventErrors = true,
    },
    animation = {
        start = {
            type = "none",
            easeStrength = 3,
            easeType = "none",
            duration_type = "seconds",
        },
        main = {
            type = "none",
            easeStrength = 3,
            easeType = "none",
            duration_type = "seconds",
        },
        finish = {
            type = "none",
            easeStrength = 3,
            easeType = "none",
            duration_type = "seconds",
        },
    },
    conditions = {
        {
            check = {
                trigger = 1,
                variable = "onCooldown",
                value = 1,
            },
            changes = {
                {
                    property = "desaturate",
                    value = true,
                }, -- [1]
                {
                    property = "sub.3.glow",
                    value = false,
                }, -- [2]
            },
        }, -- [1]
        {
            check = {
                trigger = 1,
                variable = "onCooldown",
                value = 0,
            },
            changes = {
                {
                    property = "desaturate",
                    value = false,
                }, -- [1]
                {
                    property = "sub.3.glow",
                    value = true,
                }, -- [2]
            },
        }, -- [2]
    },
    load = {
        talent = {
            multi = {},
        },
        class = {
            single = "SHAMAN",
            multi = {
                SHAMAN = true,
            },
        },
        spec = {
            multi = {},
        },
        size = {
            multi = {},
        },
        use_class = true,
        use_combat = true,
    },
    authorOptions = {},
    regionType = "icon",
    uid = "tk_cd_trink2",
    parent = "TK - Cooldowns",
    width = 34,
    height = 34,
    xOffset = 0,
    yOffset = 0,
    cooldownSwipe = true,
    cooldownEdge = true,
    cooldownTextDisabled = false,
    desaturate = false,
    icon = true,
    zoom = 0.1,
    keepAspectRatio = true,
    auto = true,
    triggers = {
        [1] = {
            trigger = {
                type = "item",
                event = "Cooldown Progress (Slot)",
                itemSlot = 14,
                use_genericShowOn = true,
                genericShowOn = "showAlways",
            },
            untrigger = {},
        },
        activeTriggerMode = -10,
    },
    subRegions = {
        {
            type = "subbackground",
        }, -- [1]
        {
            type = "subtext",
            text_text = "%p",
            text_color = {
                1, -- [1]
                1, -- [2]
                1, -- [3]
                1, -- [4]
            },
            text_font = "Friz Quadrata TT",
            text_fontSize = 14,
            text_fontType = "THICKOUTLINE",
            text_anchorPoint = "CENTER",
            text_anchorXOffset = 0,
            text_anchorYOffset = 0,
            text_visible = true,
            text_selfPoint = "AUTO",
            text_text_format_p_format = "timed",
            text_text_format_p_time_precision = 0,
            text_text_format_p_time_dynamic_threshold = 3,
        }, -- [2]
        {
            type = "subglow",
            glow = false,
            glowType = "Pixel",
            glowColor = {
                0, -- [1]
                1, -- [2]
                0.53, -- [3]
                1, -- [4]
            },
            glowLines = 8,
            glowLength = 6,
            glowThickness = 2,
            glowFrequency = 0.25,
            glowXOffset = 0,
            glowYOffset = 0,
            glowScale = 1,
        }, -- [3]
    },
},


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
