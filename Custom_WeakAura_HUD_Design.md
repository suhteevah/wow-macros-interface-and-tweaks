# Custom Resto Shaman WeakAura HUD — Full Design Document
## "Tidekeeper" — Mana Bar + MP5 Tick Tracker + Cast Bar + Cooldown Cluster

---

## VISUAL CONCEPT

```
                              ← 350px →
                     ┌──────────────────────────┐
                     │   COOLDOWN ICON CLUSTER   │
                     │  [NS] [EM] [MT] [BL] [ES]│
                     │   ○    ○    ○    ○    ○   │
                     └──────────────────────────-┘
                                  │
                     ┌────────────────────────────┐
                     │▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░░░░│ ← MANA BAR (wide, thin)
                     │ 8420 / 10250  (82%)       │
                     │· · · · ·│· · · · · · · · ·│ ← MP5 TICK MARKERS
                     ├────────────────────────────┤
                     │ ▏5SR: 2.3s▕  ▏Tick: 0.8s▕ │ ← 5SR + TICK TIMERS
                     └────────────────────────────┘
                                  │
                     ┌────────────────────────────┐
                     │▓▓▓▓▓▓▓▓▓▓▓▓░░░░░░░░░░░░░░│ ← CAST BAR (compact)
                     │  Chain Heal — 1.8s  [Tank] │
                     └────────────────────────────┘
```

**Everything stacks vertically below your character, centered on screen.**
- Top layer: Cooldown icons (only visible when relevant)
- Middle layer: Mana bar with integrated mp5 tick tracker
- Bottom layer: Compact cast bar

---

## COMPONENT BREAKDOWN

---

### COMPONENT 1: MANA BAR WITH MP5 TICK TRACKER

This is the centerpiece. A wide, thin progress bar showing your current mana
with two integrated sub-systems: the Five Second Rule timer and the 2-second
mana regen tick timer.

#### WeakAura Configuration

```
Display Type:  Progress Bar
Name:          Tidekeeper_ManaBar
Width:         350
Height:        22
Orientation:   Horizontal
Anchor:        CENTER, UIParent, CENTER, 0, -80
```

#### Trigger Setup
```
Trigger 1 (Main):
  Type:        Status
  Status:      Power
  Unit:        player
  Power Type:  Mana (0)

Conditions:
  - Mana % < 100 → Show (hide at full mana to reduce clutter)
  OR
  - In Combat → Always show
```

#### Custom Text (On Bar)
```lua
-- Custom Text Function (placed in "Custom Text" field)
function()
    local cur = UnitPower("player", 0)
    local max = UnitPowerMax("player", 0)
    local pct = math.floor((cur / max) * 100)
    return string.format("%d / %d  (%d%%)", cur, max, pct)
end
```

#### Bar Color (Dynamic — changes by mana %)
```lua
-- Custom Color function
function(progress, r, g, b, a)
    local pct = progress  -- 0 to 1
    if pct > 0.5 then
        -- Blue (healthy)
        return 0.08, 0.38, 0.74, 1
    elseif pct > 0.25 then
        -- Teal/Warning
        return 0.1, 0.65, 0.65, 1
    else
        -- Red (danger)
        return 0.85, 0.15, 0.15, 1
    end
end
```

#### Bar Texture
```
Texture:       Smooth v2  (or "Minimalist" — clean look)
Background:    Dark gray (#1a1a1a) at 0.7 alpha
Border:        Thin 1px white border (or "None" for minimal look)
```

---

### COMPONENT 2: MP5 TICK TRACKER (Overlaid on Mana Bar)

This is the tricky one. In TBC, mana regenerates in **2-second tick intervals**.
The Five Second Rule (5SR) means spirit-based regen only kicks in 5 seconds after
your last mana-spending cast. MP5 from gear ticks regardless.

We need TWO sub-auras:

#### Sub-Aura 2A: Five Second Rule Countdown Bar

```
Display Type:  Progress Bar (overlaid on mana bar, slightly offset)
Name:          Tidekeeper_5SR_Timer
Width:         350
Height:        4
Orientation:   Horizontal (drains left to right over 5 seconds)
Anchor:        TOPLEFT, Tidekeeper_ManaBar, BOTTOMLEFT, 0, 0
               (sits directly underneath the mana bar)
Color:         Orange (#FF8C00) when counting down
               Green (#00CC44) when 5SR fulfilled (spirit regen active)
```

##### Custom Trigger (Lua)
```lua
-- Trigger: Custom
-- Events: UNIT_SPELLCAST_SUCCEEDED
-- Check On: Every Frame (0.05 throttle)

function(allstates, event, ...)
    if event == "UNIT_SPELLCAST_SUCCEEDED" then
        local unit = select(1, ...)
        if unit == "player" then
            -- A spell was cast — we need to check if it cost mana
            -- Reset the 5SR timer
            aura_env.lastManaSpend = GetTime()
        end
    end

    -- Update state
    local now = GetTime()
    local lastSpend = aura_env.lastManaSpend or 0
    local elapsed = now - lastSpend
    local remaining = math.max(0, 5.0 - elapsed)

    allstates[""] = {
        show = (remaining > 0 or UnitAffectingCombat("player")),
        changed = true,
        progressType = "timed",
        expirationTime = lastSpend + 5.0,
        duration = 5.0,
        autoHide = false,
    }
    return true
end
```

##### Init Code
```lua
-- Custom Init (On Init tab)
aura_env.lastManaSpend = 0
```

> **Visual Behavior:**
> - Orange bar drains over 5 seconds after you cast a mana-costing spell
> - When it reaches 0 (5SR fulfilled), bar turns green = spirit regen active
> - While green, you're getting full spirit-based mana regen between ticks

---

#### Sub-Aura 2B: 2-Second Mana Tick Timer

```
Display Type:  Progress Bar (sits below 5SR bar)
Name:          Tidekeeper_TickTimer
Width:         350
Height:        4
Orientation:   Horizontal (fills/drains every 2 seconds)
Anchor:        TOPLEFT, Tidekeeper_5SR_Timer, BOTTOMLEFT, 0, 0
Color:         Cyan (#00E5FF) — pulses bright on each tick
```

##### Custom Trigger (Lua)
```lua
-- Trigger: Custom
-- Events: UNIT_POWER_UPDATE
-- Check On: Every Frame (0.03 throttle)

function(allstates, event, ...)
    -- Detect mana tick by watching for mana increases
    local curMana = UnitPower("player", 0)

    if aura_env.lastMana and curMana > aura_env.lastMana then
        -- Mana went UP — this is a tick
        local tickAmount = curMana - aura_env.lastMana
        aura_env.lastTickTime = GetTime()
        aura_env.lastTickAmount = tickAmount
    end

    aura_env.lastMana = curMana

    -- Calculate next tick timing
    local now = GetTime()
    local lastTick = aura_env.lastTickTime or now
    local nextTick = lastTick + 2.0
    local remaining = nextTick - now

    -- If we've gone past the expected tick, re-sync
    if remaining < 0 then
        -- Adjust forward to next 2-second boundary
        local cycles = math.ceil(math.abs(remaining) / 2.0)
        nextTick = nextTick + (cycles * 2.0)
        remaining = nextTick - now
    end

    allstates[""] = {
        show = UnitAffectingCombat("player") or (UnitPower("player", 0) < UnitPowerMax("player", 0)),
        changed = true,
        progressType = "timed",
        expirationTime = nextTick,
        duration = 2.0,
        autoHide = false,
    }
    return true
end
```

##### Init Code
```lua
aura_env.lastMana = UnitPower("player", 0)
aura_env.lastTickTime = GetTime()
aura_env.lastTickAmount = 0
```

##### Additional Visual: Tick Amount Text
```lua
-- Custom text overlay on the tick bar
function()
    if aura_env.lastTickAmount and aura_env.lastTickAmount > 0 then
        return "+" .. aura_env.lastTickAmount .. " tick"
    end
    return ""
end
```

> **Visual Behavior:**
> - Cyan bar fills over 2 seconds, resets on each tick
> - When the bar completes, your mana ticks up
> - Shows the amount of the last tick (e.g., "+152 tick")
> - Helps you time your casts BETWEEN ticks for max efficiency

---

### COMPONENT 3: COMPACT CAST BAR

A clean, thin cast bar that sits below the mana system.

```
Display Type:  Progress Bar
Name:          Tidekeeper_CastBar
Width:         350
Height:        16
Orientation:   Horizontal
Anchor:        TOPLEFT, Tidekeeper_TickTimer, BOTTOMLEFT, 0, -4
               (4px gap below tick timer)
```

#### Trigger Setup
```
Trigger 1:
  Type:        Status
  Status:      Casting
  Unit:        player
  Include:     Cast, Channel
```

#### Custom Text
```lua
function()
    local name, _, _, startTime, endTime, _, _, _, spellID = UnitCastingInfo("player")
    if not name then
        name, _, _, startTime, endTime = UnitChannelInfo("player")
    end
    if name and endTime and startTime then
        local remaining = (endTime - GetTime() * 1000) / 1000
        -- Also show the target if healing
        local target = UnitName("target") or ""
        if UnitIsFriend("player", "target") and target ~= "" then
            return string.format("%s — %.1fs  [%s]", name, remaining, target)
        else
            return string.format("%s — %.1fs", name, remaining)
        end
    end
    return ""
end
```

#### Bar Colors
```
Healing spells:    Green (#2ECC71)
Damage spells:     Red (#E74C3C)
Utility:           Yellow (#F39C12)
Channeled:         Purple (#9B59B6)
```

##### Color Logic (Custom Color Function)
```lua
function(progress, r, g, b, a)
    local name = UnitCastingInfo("player")
    if not name then name = UnitChannelInfo("player") end
    if not name then return 0.3, 0.3, 0.3, 1 end

    -- Healing spells
    local heals = {
        ["Healing Wave"] = true,
        ["Lesser Healing Wave"] = true,
        ["Chain Heal"] = true,
        ["Ancestral Spirit"] = true,
    }
    -- Damage spells
    local damage = {
        ["Lightning Bolt"] = true,
        ["Chain Lightning"] = true,
    }

    if heals[name] then
        return 0.18, 0.80, 0.44, 1  -- Green
    elseif damage[name] then
        return 0.91, 0.30, 0.24, 1  -- Red
    else
        return 0.95, 0.61, 0.07, 1  -- Yellow/utility
    end
end
```

#### Latency Overlay (Like Quartz)
```
-- Add a spark/tick mark at the end of the cast bar showing your latency window
-- This helps you start your next cast slightly early for cast-queuing

-- Create a sub-region "Tick" mark at the end of the bar
-- Position: Right edge minus (latency * bar_width)
-- Color: Red (#FF4444) at 0.5 alpha
-- Width: Calculated from your latency
```

##### Latency Custom Code (Actions → On Show)
```lua
-- On Show action
local _, _, lagHome, lagWorld = GetNetStats()
local lag = (lagHome + lagWorld) / 2
aura_env.latencyMs = lag
-- The cast bar sub-region uses this to size the red latency block
```

---

### COMPONENT 4: COOLDOWN ICON CLUSTER

A horizontal row of important cooldown icons that sit ABOVE the mana bar.
Icons are desaturated + dark when on cooldown, bright + glowing when ready.

```
Display Type:  Dynamic Group
Name:          Tidekeeper_Cooldowns
Growth:        Horizontal (LEFT to RIGHT)
Spacing:       4px
Anchor:        BOTTOM, Tidekeeper_ManaBar, TOP, 0, 6
               (sits 6px above the mana bar)
```

#### Tracked Cooldowns (Each is a separate aura in the group)

| # | Spell | Priority | Notes |
|---|-------|----------|-------|
| 1 | Nature's Swiftness | CRITICAL | Your panic button. Always visible. |
| 2 | Elemental Mastery | HIGH | Instant crit (Elemental talent, shared CD with NS) |
| 3 | Mana Tide Totem | HIGH | Group mana recovery |
| 4 | Heroism / Bloodlust | MEDIUM | Raid cooldown |
| 5 | Earth Shield | MEDIUM | Track if it needs refresh (buff-based) |
| 6 | Trinket 1 | VARIABLE | Only show if trinket has a use effect |
| 7 | Trinket 2 | VARIABLE | Only show if trinket has a use effect |

#### Individual Cooldown Icon Template

Repeat this pattern for each spell, changing the spell name:

```
Display Type:  Icon
Name:          Tidekeeper_CD_NaturesSwiftness  (change per spell)
Width:         36
Height:        36
Icon:          Auto (from spell)
Desaturate:    When on cooldown = YES
Zoom:          10% (crop icon borders)
```

##### Trigger
```
Trigger 1:
  Type:        Status
  Status:      Cooldown Progress (Spell)
  Spell:       Nature's Swiftness
  Track:       Cooldown

Conditions:
  On Cooldown → Desaturate icon, dark overlay (0.35 alpha black)
  Off Cooldown → Full color, green glow border
  ≤ 5 seconds remaining → Start bright pulse animation
```

##### Glow Effect When Ready
```
Sub-Region:    Glow
Type:          Pixel Glow
Color:         Green (#00FF88)
Lines:         8
Length:         6
Thickness:      2
Frequency:      0.25

Condition: Show glow only when spell is OFF cooldown
```

##### Cooldown Text Overlay
```
Sub-Region:    Text
Font:          Friz Quadrata TT (or your UI font)
Size:          12
Outline:       Thick Outline
Position:      CENTER
Color:         White

Custom Text:
function()
    local start, duration, enabled = GetSpellCooldown("Nature's Swiftness")
    if enabled == 1 and duration > 0 then
        local remaining = (start + duration) - GetTime()
        if remaining > 60 then
            return string.format("%dm", math.ceil(remaining / 60))
        elseif remaining > 0 then
            return string.format("%d", math.ceil(remaining))
        end
    end
    return ""  -- Empty when ready (glow speaks for itself)
end
```

---

#### SPECIAL: Earth Shield Charge Tracker

Earth Shield is unique — it's a buff with charges, not a cooldown.

```
Display Type:  Icon
Name:          Tidekeeper_CD_EarthShield
Width:         36
Height:        36
```

##### Trigger
```
Trigger 1:
  Type:        Aura
  Unit:        Group (or specific unit if assigned)
  Aura Name:   Earth Shield
  Own Only:    Yes
  Show Stacks: Yes
```

##### Stack-Based Coloring
```lua
-- Custom color based on Earth Shield stacks
function(progress, r, g, b, a)
    local stacks = aura_env.state and aura_env.state.stacks or 0
    if stacks >= 5 then
        return 0.0, 0.9, 0.3, 1  -- Bright green: healthy
    elseif stacks >= 3 then
        return 1.0, 0.85, 0.0, 1 -- Yellow: getting low
    elseif stacks >= 1 then
        return 1.0, 0.2, 0.1, 1  -- Red: refresh soon!
    else
        return 0.5, 0.5, 0.5, 1  -- Gray: missing entirely
    end
end
```

##### Missing Warning
```
Trigger 2 (Inverse):
  Same as Trigger 1 but "Inverse" checked
  → Shows when Earth Shield is NOT on anyone
  → Display: Desaturated icon with red "X" overlay text
  → Animation: Gentle pulse
```

---

## COMPLETE GROUP HIERARCHY (WeakAura Structure)

When building in `/wa`, create this structure:

```
📁 Tidekeeper HUD (Group — anchor everything to this)
│
├── 📁 Tidekeeper_Cooldowns (Dynamic Group)
│   ├── 🔲 CD_NaturesSwiftness (Icon)
│   ├── 🔲 CD_ElementalMastery (Icon)
│   ├── 🔲 CD_ManaTide (Icon)
│   ├── 🔲 CD_Heroism (Icon)
│   ├── 🔲 CD_EarthShield (Icon — buff tracker)
│   ├── 🔲 CD_Trinket1 (Icon)
│   └── 🔲 CD_Trinket2 (Icon)
│
├── ▬▬ Tidekeeper_ManaBar (Progress Bar)
│
├── ▬▬ Tidekeeper_5SR_Timer (Progress Bar — 4px thin)
│
├── ▬▬ Tidekeeper_TickTimer (Progress Bar — 4px thin)
│
└── ▬▬ Tidekeeper_CastBar (Progress Bar — 16px)
```

---

## POSITIONING GUIDE

```
All anchored to CENTER of screen, offset downward:

Cooldown Icons:     CENTER, 0, -54    (above mana bar)
Mana Bar:           CENTER, 0, -80
5SR Timer:          Anchored to bottom of Mana Bar
Tick Timer:         Anchored to bottom of 5SR Timer
Cast Bar:           Anchored to bottom of Tick Timer, -4px gap

Total vertical footprint: ~80px
Total horizontal footprint: 350px
```

### Why This Position?
- Below your character model but above action bars
- Your eyes naturally drift here during healing
- Cooldown icons at the top catch your attention via glow
- Mana + tick info is passive/ambient — always visible but not distracting
- Cast bar at the bottom of the cluster for quick glance timing

---

## COLOR PALETTE REFERENCE

| Element | Color | Hex | Purpose |
|---------|-------|-----|---------|
| Mana (Healthy) | Deep Blue | #1461BD | > 50% mana |
| Mana (Warning) | Teal | #19A6A6 | 25-50% mana |
| Mana (Danger) | Red | #D92626 | < 25% mana |
| 5SR Counting | Orange | #FF8C00 | Spirit regen paused |
| 5SR Fulfilled | Green | #00CC44 | Spirit regen active |
| Tick Timer | Cyan | #00E5FF | 2-second tick cycle |
| Cast (Heal) | Green | #2ECC71 | Healing spell |
| Cast (Damage) | Red | #E74C3C | Damage spell |
| Cast (Utility) | Yellow | #F39C12 | Utility spell |
| CD Ready | Bright Green | #00FF88 | Glow on ready icons |
| CD Active | Desaturated | Gray overlay | On cooldown |
| ES Healthy | Green | #00E64D | 5+ charges |
| ES Warning | Yellow | #FFD900 | 3-4 charges |
| ES Critical | Red | #FF3319 | 1-2 charges |
| Background | Dark Gray | #1A1A1A | Bar backgrounds |
| Border | None or thin white | #FFFFFF @ 30% | Subtle framing |

---

## STEP-BY-STEP BUILD INSTRUCTIONS

### How to Build This In-Game

1. **Open WeakAuras:** Type `/wa` in chat

2. **Create the parent group:**
   - Click "New" → "Group"
   - Name it `Tidekeeper HUD`
   - Set anchor: CENTER, UIParent, CENTER, 0, -80

3. **Create the Mana Bar first** (it's the anchor for everything else):
   - Inside the group, click "New" → "Progress Bar"
   - Name: `Tidekeeper_ManaBar`
   - Trigger: Status → Power → Mana → Player
   - Size: 350 x 22
   - Paste the custom text and color functions from above

4. **Create the 5SR Timer bar:**
   - New → Progress Bar
   - Name: `Tidekeeper_5SR_Timer`
   - Trigger: Custom (paste the Lua trigger from Component 2A)
   - Size: 350 x 4
   - Anchor to BOTTOMLEFT of ManaBar

5. **Create the Tick Timer bar:**
   - New → Progress Bar
   - Name: `Tidekeeper_TickTimer`
   - Trigger: Custom (paste the Lua trigger from Component 2B)
   - Size: 350 x 4
   - Anchor to BOTTOMLEFT of 5SR Timer

6. **Create the Cast Bar:**
   - New → Progress Bar
   - Name: `Tidekeeper_CastBar`
   - Trigger: Status → Cast → Player
   - Size: 350 x 16
   - Anchor to BOTTOMLEFT of TickTimer, offset Y: -4
   - Paste custom text and color functions

7. **Create the Cooldown Dynamic Group:**
   - New → Dynamic Group (inside the parent group)
   - Name: `Tidekeeper_Cooldowns`
   - Growth: Horizontal, spacing 4
   - Anchor to TOP of ManaBar, offset Y: +6

8. **Create each Cooldown Icon:**
   - Inside the dynamic group, New → Icon for each spell
   - Follow the template in Component 4
   - Add glow sub-region, text overlay, conditions

9. **Lock it in:**
   - `/wa` → select `Tidekeeper HUD` → move to exact position
   - Test on target dummies
   - Adjust bar widths if your resolution needs it

---

## TIPS FOR FINE-TUNING

### Performance
- Set custom trigger throttle to 0.03-0.05 (not every frame)
- The tick timer checks every frame but uses simple math — very light
- Disable debug prints before raiding

### Resolution Scaling
- At **1920x1080**: 350px width is perfect
- At **2560x1440**: Consider 400px width
- At **3840x2160**: Consider 500px width, scale fonts up

### Integration with VuhDo/Grid2
- This HUD doesn't replace raid frames — it sits BETWEEN your character
  and your raid frames
- Keep VuhDo/Grid2 centered above this, or offset to the left
- The mouseover macros from the macro suite work with ANY frame addon

### If Something Breaks
- The most common issue is the tick timer desyncing after death/zone
- Add this to the tick timer's On Init: check if lastTickTime is stale
  and reset it
- The 5SR timer may false-trigger on abilities that don't cost mana —
  a more robust version checks `GetSpellPowerCost()` but this API
  may behave differently in the TBC Anniversary client. Test it.

---

## EXISTING WAGO.IO IMPORTS TO REFERENCE OR COMBINE

If you'd rather start from an existing base and customize:

| WeakAura | Link | What It Does |
|----------|------|--------------|
| 5SR & Mana Ticks v1.1.1 | https://wago.io/tKwhPGqCa | Best 5SR + tick tracker |
| Mana Bar + 5SR + Tick (Blizzlike) | https://wago.io/Jy8JBDS-P | Clean mana bar with ticks |
| Mp5 + 2 sec tick | https://wago.io/8T95ljvvf | Simple 2s tick timer |
| Mana Five Second Rule + Ticks Improved | https://wago.io/oSJsslBCz | Enhanced version |
| Overclock Mana Tick (TBC) | https://wago.io/o8XgfM9qy | TBC-specific |
| Luxthos Shaman Classic Pack | https://www.luxthos.com/shaman-weakauras-for-world-of-warcraft-classic-era-hardcore/ | Full shaman suite |

> **Strategy:** Import one of these, inspect their custom triggers in `/wa`,
> then adapt the Lua code into your Tidekeeper HUD for guaranteed working
> tick detection logic.

---

## QUICK REFERENCE CARD (Print This)

```
┌─────────────────────────────────────────────┐
│           TIDEKEEPER HUD LEGEND             │
├─────────────────────────────────────────────┤
│                                             │
│  COOLDOWN ICONS (top row):                  │
│    Bright + Glow  = READY TO USE            │
│    Dark + Timer   = On Cooldown             │
│    Pulsing        = Coming off CD soon      │
│                                             │
│  MANA BAR:                                  │
│    Blue  = Healthy (>50%)                   │
│    Teal  = Watch it (25-50%)                │
│    Red   = Danger (<25%)                    │
│                                             │
│  THIN ORANGE BAR (5SR):                     │
│    Draining = Spirit regen PAUSED           │
│    Green    = Spirit regen ACTIVE           │
│                                             │
│  THIN CYAN BAR (Tick Timer):                │
│    Fills every 2 seconds                    │
│    Each fill = one mana tick                │
│    "+152 tick" = amount recovered           │
│                                             │
│  CAST BAR:                                  │
│    Green = Healing spell                    │
│    Red   = Damage spell                     │
│    Shows spell name + time + target         │
│                                             │
│  EARTH SHIELD ICON:                         │
│    Green  = 5+ charges (healthy)            │
│    Yellow = 3-4 charges (plan refresh)      │
│    Red    = 1-2 charges (refresh NOW)       │
│    Gray/X = MISSING — reapply!              │
│                                             │
└─────────────────────────────────────────────┘
```

---

*Build guide for TBC Anniversary 2026 — Client Version 2.5.5 (Interface 20505).*
*Test all custom Lua triggers on target dummies before raiding.*
*The mp5 tick timer may need resync after death — /reload fixes it.*
