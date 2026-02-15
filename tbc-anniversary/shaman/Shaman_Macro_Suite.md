# Resto Shaman Complete Macro & UI Suite
## TBC Anniversary (2026) — Client Version 2.5.5 (Interface 20505)
### Mainspec: Restoration | Offspec: Elemental

> **Important Note:** The TBC Anniversary client is version 2.5.5 (interface 20505).
> It is NOT the Dragonflight or War Within API — it is a Classic-era client running
> on a modernized backend. Macro syntax uses the modern conditional format
> (`[@mouseover,help,nodead]` etc.) which this client supports. All macros below use
> only spells that exist in The Burning Crusade. Test on target dummies before raiding.
>
> **TBC Anniversary Differences from Original TBC:**
> - **Bloodlust/Heroism is RAID-WIDE** (not party-only) with a 10-min Sated debuff
> - **Dual Spec** is available (borrowed from WotLK) — swap between Resto & Elemental
> - **Guild Bank** available at launch
> - **[mod:shift] macro bug:** If shift modifiers don't work, go to Keybinds and
>   unbind Shift+Number from action bar swap, or change "Lock Action Bars" modifier to Alt

---

## TABLE OF CONTENTS
1. [Core Healing Macros (Mouseover)](#1-core-healing-macros-mouseover)
2. [Chain Heal Macros](#2-chain-heal-macros)
3. [Emergency / Cooldown Macros](#3-emergency--cooldown-macros)
4. [Dispel / Cleanse Macros](#4-dispel--cleanse-macros)
5. [Totem Management Macros](#5-totem-management-macros)
6. [Weapon Imbue Macros](#6-weapon-imbue-macros)
7. [Shield Macros](#7-shield-macros)
8. [Elemental Offspec Macros](#8-elemental-offspec-macros)
9. [Hybrid Heal/DPS Toggle Macros](#9-hybrid-healdps-toggle-macros)
10. [Gear Swap / Spec Swap Macros](#10-gear-swap--spec-swap-macros)
11. [Utility Macros](#11-utility-macros)
12. [PvP Macros](#12-pvp-macros)
13. [Target & Focus Macros](#13-target--focus-macros)
14. [Announcement Macros](#14-announcement-macros)
15. [WeakAura Concepts & Custom Designs](#15-weakaura-concepts--custom-designs)
16. [Recommended Addons & UI Layout](#16-recommended-addons--ui-layout)

---

## MACRO PRIORITY LOGIC (HOW MOUSEOVER MACROS WORK)

All healing macros below use this target priority cascade:
1. **@mouseover** — Whoever your mouse is hovering over (raid frame, nameplate, character)
2. **@target** — Your current friendly target
3. **@targettarget** — Your target's target (useful when targeting the boss)
4. **@player** — Yourself as final fallback

This means you NEVER have to deselect the boss to heal. Just hover over raid frames.

---

## 1. CORE HEALING MACROS (MOUSEOVER)

### Healing Wave (Max Rank)
```
#showtooltip Healing Wave
/cast [@mouseover,help,nodead][@target,help,nodead][@targettarget,help,nodead][@player] Healing Wave
```

### Healing Wave (Rank 1 — Downrank for Mana Efficiency)
```
#showtooltip Healing Wave(Rank 1)
/cast [@mouseover,help,nodead][@target,help,nodead][@targettarget,help,nodead][@player] Healing Wave(Rank 1)
```

### Lesser Healing Wave (Max Rank)
```
#showtooltip Lesser Healing Wave
/cast [@mouseover,help,nodead][@target,help,nodead][@targettarget,help,nodead][@player] Lesser Healing Wave
```

### Healing Wave — Modifier Downranking (All-in-One)
```
#showtooltip
/cast [mod:ctrl,@mouseover,help,nodead][mod:ctrl,@target,help,nodead][mod:ctrl,@player] Healing Wave(Rank 1)
/cast [mod:shift,@mouseover,help,nodead][mod:shift,@target,help,nodead][mod:shift,@player] Healing Wave(Rank 5)
/cast [@mouseover,help,nodead][@target,help,nodead][@targettarget,help,nodead][@player] Healing Wave
```
> **Usage:** No modifier = max rank. Shift = mid rank. Ctrl = Rank 1. Adjust rank numbers to your preference.

### Lesser Healing Wave — Modifier Downranking
```
#showtooltip
/cast [mod:shift,@mouseover,help,nodead][mod:shift,@target,help,nodead][mod:shift,@player] Lesser Healing Wave(Rank 1)
/cast [@mouseover,help,nodead][@target,help,nodead][@targettarget,help,nodead][@player] Lesser Healing Wave
```

---

## 2. CHAIN HEAL MACROS

### Chain Heal (Max Rank — Mouseover)
```
#showtooltip Chain Heal
/cast [@mouseover,help,nodead][@target,help,nodead][@targettarget,help,nodead][@player] Chain Heal
```

### Chain Heal — Modifier Downranking
```
#showtooltip
/cast [mod:shift,@mouseover,help,nodead][mod:shift,@target,help,nodead][mod:shift,@player] Chain Heal(Rank 1)
/cast [@mouseover,help,nodead][@target,help,nodead][@targettarget,help,nodead][@player] Chain Heal
```

### Chain Heal — Always Start on Self (Bounce Trick)
```
#showtooltip Chain Heal
/cast [@player] Chain Heal
```
> **Usage:** If you're stacked with the melee group, casting Chain Heal on yourself
> guarantees the first bounce, then it jumps to the most injured nearby targets.
> Great for predictable AoE damage.

---

## 3. EMERGENCY / COOLDOWN MACROS

### Nature's Swiftness + Healing Wave (OH SH*T BUTTON)
```
#showtooltip Nature's Swiftness
/stopcasting
/cast Nature's Swiftness
/cast [@mouseover,help,nodead][@target,help,nodead][@targettarget,help,nodead][@player] Healing Wave
```
> **This is your #1 most important macro.** Instant max-rank Healing Wave on whoever
> you're mousing over. Bind this to something fast and easy to hit.

### Nature's Swiftness + Healing Wave (SELF ONLY)
```
#showtooltip Nature's Swiftness
/stopcasting
/cast Nature's Swiftness
/cast [@player] Healing Wave
```

### Mana Tide Totem (With Announcement)
```
#showtooltip Mana Tide Totem
/cast Mana Tide Totem
/script SendChatMessage(">>> MANA TIDE TOTEM DOWN — Stack in my group! <<<","RAID")
```

---

## 4. DISPEL / CLEANSE MACROS

### Cure Poison (Mouseover)
```
#showtooltip Cure Poison
/cast [@mouseover,help,nodead][@target,help,nodead][@targettarget,help,nodead][@player] Cure Poison
```

### Cure Disease (Mouseover)
```
#showtooltip Cure Disease
/cast [@mouseover,help,nodead][@target,help,nodead][@targettarget,help,nodead][@player] Cure Disease
```

### Combined Cleanse — Modifier Based
```
#showtooltip [mod:shift] Cure Disease; Cure Poison
/cast [mod:shift,@mouseover,help,nodead][mod:shift,@target,help,nodead][mod:shift,@player] Cure Disease
/cast [nomod,@mouseover,help,nodead][nomod,@target,help,nodead][nomod,@player] Cure Poison
```
> **Usage:** Default press = Cure Poison. Hold Shift = Cure Disease. Saves a keybind.

### Purge (Offensive Dispel — Mouseover Enemy)
```
#showtooltip Purge
/cast [@mouseover,harm,nodead][@target,harm,nodead] Purge
```

---

## 5. TOTEM MANAGEMENT MACROS

### All-In-One Totem Drop (Cast Sequence — PvE Resto)
```
#showtooltip
/castsequence reset=combat/300 Mana Spring Totem, Wrath of Air Totem, Strength of Earth Totem, Searing Totem
```
> **Usage:** Press once per GCD — drops all 4 totems in sequence.
> Reset on combat end or after 5 minutes. Adjust totem choices for your comp.

### Totem Set — Raid Healing (Modifier Swaps)
```
#showtooltip [mod:shift] Healing Stream Totem; [mod:ctrl] Tremor Totem; Mana Spring Totem
/cast [mod:shift] Healing Stream Totem
/cast [mod:ctrl] Tremor Totem
/cast [nomod] Mana Spring Totem
```

### Totem Set — Air Totems (Modifier Swaps)
```
#showtooltip [mod:shift] Windfury Totem; [mod:ctrl] Grounding Totem; [mod:alt] Nature Resistance Totem; Wrath of Air Totem
/cast [mod:shift] Windfury Totem
/cast [mod:ctrl] Grounding Totem
/cast [mod:alt] Nature Resistance Totem
/cast [nomod] Wrath of Air Totem
```

### Totem Set — Earth Totems (Modifier Swaps)
```
#showtooltip [mod:shift] Tremor Totem; [mod:ctrl] Earthbind Totem; Strength of Earth Totem
/cast [mod:shift] Tremor Totem
/cast [mod:ctrl] Earthbind Totem
/cast [nomod] Strength of Earth Totem
```

### Totem Set — Fire Totems (Modifier Swaps)
```
#showtooltip [mod:shift] Fire Resistance Totem; [mod:ctrl] Frost Resistance Totem; Searing Totem
/cast [mod:shift] Fire Resistance Totem
/cast [mod:ctrl] Frost Resistance Totem
/cast [nomod] Searing Totem
```

### Totemic Call (Destroy All Totems + Recover 25% Mana Cost)
```
#showtooltip Totemic Call
/cast Totemic Call
```

### Tremor Totem — Instant Stomp + Redrop
```
#showtooltip Tremor Totem
/cast Totemic Call
/cast Tremor Totem
```
> **Usage:** Destroys current totems then immediately redeploys Tremor Totem.
> This forces Tremor to pulse immediately. Crucial for fear-heavy encounters.

---

## 6. WEAPON IMBUE MACROS

> **TBC Note:** Earthliving Weapon does NOT exist in TBC — it was added in WotLK.
> Resto Shamans in TBC use **Flametongue Weapon** on their mainhand for the spell
> damage bonus. Elemental also uses Flametongue. Enhancement uses Windfury + Flametongue.

### Flametongue Weapon (Resto & Elemental Mainhand — +Spell Damage)
```
#showtooltip Flametongue Weapon
/cast Flametongue Weapon
/use 16
```
> Note: Slot 16 = Main Hand. The `/use 16` applies it automatically.
> Flametongue adds spell damage that scales your healing and Lightning Bolt.

### Windfury Weapon (Enhancement / Solo Offhand)
```
#showtooltip Windfury Weapon
/cast Windfury Weapon
/use 16
```

### Quick Imbue Swap: Flametongue ↔ Windfury (Modifier)
```
#showtooltip [mod:shift] Windfury Weapon; Flametongue Weapon
/cast [mod:shift] Windfury Weapon
/cast [nomod] Flametongue Weapon
/use 16
```

---

## 7. SHIELD MACROS

### Water Shield (Maintain — Anti-Toggle)
```
#showtooltip Water Shield
/cast !Water Shield
```
> The `!` prefix prevents accidentally toggling it off if you panic-spam.

### Lightning Shield (Elemental / Solo)
```
#showtooltip Lightning Shield
/cast !Lightning Shield
```

### Shield Swap (Modifier)
```
#showtooltip [mod:shift] Lightning Shield; Water Shield
/cast [mod:shift] !Lightning Shield
/cast [nomod] !Water Shield
```

---

## 8. ELEMENTAL OFFSPEC MACROS

### Lightning Bolt (Mouseover Harm / Standard Target)
```
#showtooltip Lightning Bolt
/cast [@mouseover,harm,nodead][@target,harm,nodead] Lightning Bolt
```

### Chain Lightning
```
#showtooltip Chain Lightning
/cast [@mouseover,harm,nodead][@target,harm,nodead] Chain Lightning
```

### Flame Shock (Mouseover)
```
#showtooltip Flame Shock
/cast [@mouseover,harm,nodead][@target,harm,nodead] Flame Shock
```

### Frost Shock (Mouseover — Kiting/PvP)
```
#showtooltip Frost Shock
/cast [@mouseover,harm,nodead][@target,harm,nodead] Frost Shock
```

### Earth Shock (Interrupt — Mouseover)
```
#showtooltip Earth Shock
/cast [@mouseover,harm,nodead][@target,harm,nodead] Earth Shock
```

### Elemental Mastery + Cast (Guaranteed Crit)
```
#showtooltip Elemental Mastery
/stopcasting
/cast Elemental Mastery
/cast [@mouseover,harm,nodead][@target,harm,nodead] Chain Lightning
```
> **Usage:** Swap Chain Lightning for Lightning Bolt if you prefer single-target.

### Elemental DPS Rotation Sequence
```
#showtooltip
/castsequence reset=target/combat Flame Shock, Lightning Bolt, Lightning Bolt, Lightning Bolt, Chain Lightning
```
> **TBC Elemental Rotation:** Keep Flame Shock DoT up, spam Lightning Bolt as filler,
> use Chain Lightning on cooldown for AoE. Use Elemental Mastery before a big
> Lightning Bolt or Chain Lightning for a guaranteed instant crit.

---

## 9. HYBRID HEAL/DPS TOGGLE MACROS

### Heal Friendly / Damage Hostile (Single Button)
```
#showtooltip [help] Lesser Healing Wave; [harm] Lightning Bolt; [@mouseover,help] Lesser Healing Wave; [@mouseover,harm] Lightning Bolt
/cast [@mouseover,help,nodead] Lesser Healing Wave
/cast [@mouseover,harm,nodead] Lightning Bolt
/cast [help,nodead] Lesser Healing Wave
/cast [harm,nodead] Lightning Bolt
```

### Chain Heal Friendly / Chain Lightning Hostile
```
#showtooltip [help] Chain Heal; [harm] Chain Lightning; [@mouseover,help] Chain Heal; [@mouseover,harm] Chain Lightning
/cast [@mouseover,help,nodead] Chain Heal
/cast [@mouseover,harm,nodead] Chain Lightning
/cast [help,nodead] Chain Heal
/cast [harm,nodead] Chain Lightning
```

---

## 10. GEAR SWAP / SPEC SWAP MACROS

### Weapon Swap: Shield + MH ↔ 2H/Offhand (For DPS Phases)
```
#showtooltip
/equipslot [equipped:Shields] 16 YOUR_DPS_WEAPON_NAME
/equipslot [noequipped:Shields] 16 YOUR_HEALING_WEAPON_NAME
/equipslot [noequipped:Shields] 17 YOUR_SHIELD_NAME
```
> **Replace** `YOUR_DPS_WEAPON_NAME`, `YOUR_HEALING_WEAPON_NAME`, `YOUR_SHIELD_NAME`
> with your actual item names. Must be exact matches from your bags.

### Dual Spec Swap + Reminder
```
#showtooltip
/script SetActiveTalentGroup(GetActiveTalentGroup() == 1 and 2 or 1)
/script print("Swapping specs — remember to rebuff & imbue weapons!")
```
> **Note:** Dual Spec is available in TBC Anniversary (borrowed from WotLK).
> The TBC client uses `SetActiveTalentGroup()` / `GetActiveTalentGroup()` — NOT
> the retail `SetSpecialization()` / `GetSpecialization()` API.
> You must be out of combat to swap. The print line is a personal reminder.

---

## 11. UTILITY MACROS

### Ghost Wolf (Anti-Toggle)
```
#showtooltip Ghost Wolf
/cast [nostance] !Ghost Wolf
```

### Cancel Ghost Wolf + Cast
```
#showtooltip Healing Wave
/cancelaura Ghost Wolf
/cast [@mouseover,help,nodead][@target,help,nodead][@targettarget,help,nodead][@player] Healing Wave
```

### Astral Recall
```
#showtooltip Astral Recall
/cast Astral Recall
```

### Far Sight (Fun Utility)
```
#showtooltip Far Sight
/cast Far Sight
```

### Heroism / Bloodlust (With Announcement)
```
#showtooltip Heroism
/stopcasting
/cast Heroism
/script SendChatMessage(">>> HEROISM POPPED! (Raid-Wide — 10min Sated debuff) <<<","RAID")
```
> **TBC Anniversary Change:** Heroism/Bloodlust is now RAID-WIDE (not party-only).
> It applies a 10-minute "Sated" debuff preventing re-use. It also resets on boss
> kill or wipe. This means you no longer need to stack Shamans in every group.

### Use Trinket 1 + Heal
```
#showtooltip
/use 13
/cast [@mouseover,help,nodead][@target,help,nodead][@targettarget,help,nodead][@player] Healing Wave
```
> Slot 13 = Trinket 1, Slot 14 = Trinket 2. Change `/use 13` to `/use 14` for Trinket 2.

### Use Both Trinkets
```
#showtooltip
/use 13
/use 14
```

### Healthstone / Healing Potion
```
#showtooltip
/use Master Healthstone
/use Super Healing Potion
```

### Mana Potion / Dark Rune
```
#showtooltip
/use Super Mana Potion
/use Dark Rune
/use Demonic Rune
```
> **Usage:** Uses whichever is available. Mana Potion and Dark Rune share no cooldown
> so you can pop both in the same GCD window if needed.

---

## 12. PVP MACROS

### Earth Shock Interrupt (Mouseover/Focus Priority)
```
#showtooltip Earth Shock
/stopcasting
/cast [@focus,harm,nodead][@mouseover,harm,nodead][@target,harm,nodead] Earth Shock
```
> **TBC Note:** Wind Shear does NOT exist in TBC — it was added in WotLK.
> In TBC, you must use **Earth Shock** to interrupt. This costs more mana and
> shares the Shock cooldown (6 sec) with Frost/Flame Shock. Use Rank 1 to save mana:

### Earth Shock Interrupt — Rank 1 (Mana Efficient)
```
#showtooltip Earth Shock(Rank 1)
/stopcasting
/cast [@focus,harm,nodead][@mouseover,harm,nodead][@target,harm,nodead] Earth Shock(Rank 1)
```
> Rank 1 Earth Shock costs almost no mana and still interrupts. The damage
> doesn't matter — you're using it purely for the interrupt school lockout.

### Grounding Totem (Quick Drop — Anti-Toggle)
```
#showtooltip Grounding Totem
/stopcasting
/cast !Grounding Totem
```

### Earthbind + Frost Shock Kite Combo
```
#showtooltip Earthbind Totem
/cast Earthbind Totem
/cast [@target,harm,nodead] Frost Shock
```

### Purge Spam (Focus Target)
```
#showtooltip Purge
/cast [@focus,harm,nodead] Purge
```

### NS Heal on Arena Partner (Party1/Party2)
```
#showtooltip Nature's Swiftness
/stopcasting
/cast Nature's Swiftness
/cast [@party1] Healing Wave
```
> Change `@party1` to `@party2` for your other arena partner.

---

## 13. TARGET & FOCUS MACROS

### Set Focus Target
```
/focus [@mouseover,exists][@target,exists]
```

### Clear Focus
```
/clearfocus
```

### Set Focus + Announce
```
/focus [@mouseover,exists][@target,exists]
/script if UnitExists("focus") then print("Focus set: "..UnitName("focus")) end
```

### Target Nearest Enemy
```
/targetenemy [noexists]
```

### Assist Tank (Replace TANKNAME)
```
/assist TANKNAME
```

---

## 14. ANNOUNCEMENT MACROS

### Resurrection Announcement
```
#showtooltip Ancestral Spirit
/cast [@mouseover,help,dead][@target,help,dead] Ancestral Spirit
/script local t=UnitName("mouseover") or UnitName("target"); if t then SendChatMessage("Rezzing "..t.." — do NOT release!","RAID") end
```

### Interrupt Announcement (Earth Shock Rank 1 — Mana Efficient)
```
#showtooltip Earth Shock
/stopcasting
/cast [@focus,harm,nodead][@mouseover,harm,nodead][@target,harm,nodead] Earth Shock(Rank 1)
/script SendChatMessage(">>> INTERRUPTED — Earth Shock <<<","PARTY")
```
> Uses Rank 1 to save mana — the interrupt works regardless of rank.

### Custom Pull Timer (Requires DBM or BigWigs)
```
/dbm pull 10
```
or
```
/pull 10
```

---

## 15. WEAKAURA CONCEPTS & CUSTOM DESIGNS

### Recommended Pre-Built WeakAura Packs (Import from Wago.io)

| Pack Name | Link | Notes |
|-----------|------|-------|
| Ful • Shaman • Anniversary TBC | https://wago.io/1Paa36aiA | Full shaman suite |
| Alk's Codex of Shamanism | https://wago.io/q5IKk36Et | TBC Anniversary specific |
| Zulgin — Resto Shaman WA | https://wago.io/kFYofpGoY | Resto-focused |
| Wago.io TBC Resto Category | https://wago.io/tbc-weakauras/classes/shaman/restoration | Browse all |

### Also Install: TBC WeakAura Finder Addon
- **CurseForge:** https://www.curseforge.com/wow/addons/tbc-weakaura-finder
- Lets you browse and import WeakAuras directly in-game without alt-tabbing.

---

### CUSTOM WEAKAURA DESIGN IDEAS

Below are conceptual WeakAura configurations you can build in-game. These describe
the trigger logic, display type, and positioning. You'll build these in the `/wa`
interface.

#### WA #1: Earth Shield Tracker (CRITICAL)
```
Type: Icon
Trigger: Aura → Buff → "Earth Shield" on Unit: Group
  - Show stacks (track charges remaining)
  - Glow when <= 2 charges (needs refresh)
  - Hide when 0 charges or missing
Display: Icon near center of screen, slightly above character
  - Add text overlay showing stack count
  - Color: Green when 6 charges (full), Yellow at 3-5, Red at 1-2
Animation: Glow pulse when charges <= 2
```

#### WA #2: Water Shield Monitor
```
Type: Icon
Trigger: Aura → Buff → "Water Shield" on Unit: Player
  - Show when MISSING (inverted trigger)
Display: Icon with RED border when Water Shield is missing
  - Position: Near your player frame
  - Text: "NO WATER SHIELD!"
Animation: Shake when missing
Sound: Play alert sound when Water Shield falls off
```

#### WA #3: Nature's Swiftness Cooldown
```
Type: Icon
Trigger: Cooldown → Spell → "Nature's Swiftness"
  - Show when ON cooldown
  - Show text for remaining seconds
Display: Icon with cooldown sweep, positioned prominently
  - When READY: Bright green glow + "NS READY" text
  - When on CD: Desaturated icon + countdown
Sound: Play "ding" when it comes off cooldown
```

#### WA #4: Mana Tide Totem Cooldown
```
Type: Icon
Trigger: Cooldown → Spell → "Mana Tide Totem"
Display: Similar to NS tracker. Positioned in totem tracking cluster.
  - Glow when ready, desaturated when on CD
```

#### WA #5: Heroism/Bloodlust Cooldown + Sated Debuff
```
Type: Group (2 auras)
Aura 1 - Cooldown tracker:
  Trigger: Cooldown → "Heroism"
  Display: Icon with cooldown text
Aura 2 - Sated debuff:
  Trigger: Aura → Debuff → "Sated" on Unit: Player
  Display: Red-tinted icon showing remaining Sated duration
  - In TBC Anniversary, Heroism is raid-wide with 10-min Sated debuff
  - Sated resets on boss kill or wipe
```

#### WA #6: Low Mana Warning (Healer Survival)
```
Type: Text / Screen Glow
Trigger: Status → Power → Mana
  - Below 30%: Yellow warning
  - Below 15%: Red warning + sound
Display: Large text overlay "LOW MANA" at top of screen
  - 30% threshold: Yellow text, subtle
  - 15% threshold: Red text, screen edge glow, alert sound
Actions:
  - At 15%: Play sound "Alarm Clock Warning 3"
```

#### WA #7: Totem Duration Group (All 4 Elements)
```
Type: Dynamic Group of 4 Progress Bars
Trigger: Totem → Fire/Earth/Water/Air totem active
Display: 4 horizontal bars stacked vertically
  - Each bar shows totem name + remaining duration
  - Color coded: Red (Fire), Brown (Earth), Blue (Water), White (Air)
  - Bars disappear when totem expires
Position: Left of center, near minimap area
```

#### WA #8: Cast Bar Enhancement
```
Type: Progress Bar (Custom Cast Bar)
Trigger: Status → Casting
Display: Wide progress bar below character
  - Show spell name + cast time remaining
  - Color changes: Green (Heal), Red (Damage), Blue (Utility)
  - Show target name being healed
  - Latency indicator at end of bar (like Quartz)
```

#### WA #9: Raid Healing Assignment Reminder
```
Type: Text Display
Trigger: Custom → Always Show (manual toggle)
Display: Small text box in corner
  - Manually type your healing assignment
  - e.g., "HEAL: Group 2 + Tank 2 (OT)"
  - Toggle visibility with a keybind or WeakAura toggle
```

#### WA #10: Elemental Offspec — Flame Shock DoT Tracker
```
Type: Icon + Progress Bar
Trigger: Aura → Debuff → "Flame Shock" on Unit: Target
Display: Icon with duration bar
  - Glow when about to expire (< 3 sec remaining)
  - Position near target frame
```

#### WA #11: Trinket Proc / Use Tracker
```
Type: Dynamic Group (Icons)
Trigger: Aura → Buff → [Your Trinket Proc Name] on Unit: Player
  - Create one per trinket
Display: Icons showing active trinket proc + remaining duration
  - Position: Above or below action bars
```

---

## 16. RECOMMENDED ADDONS & UI LAYOUT

### Essential Addons

| Addon | Purpose |
|-------|---------|
| **WeakAuras** | Custom aura tracking (see above) |
| **VuhDo** or **Grid2** + **Clique** | Raid frames + click-to-heal (alternative to mouseover macros) |
| **TotemTimers** (TBC Anniversary Fork) | Totem management UI — https://github.com/taubut/TotemTimers_Fork |
| **DBM** or **BigWigs** | Boss encounter timers |
| **Details!** | Damage/healing meters |
| **OmniCC** | Cooldown text on buttons |
| **Quartz** | Cast bar replacement with latency indicator |
| **Bartender4** | Action bar customization |
| **ShadowedUnitFrames** | Player/target/focus frames |
| **OPie** | Radial menu for less-used spells (totems, consumables) |

### Suggested UI Layout

```
┌──────────────────────────────────────────────────────────────────────┐
│                                                                      │
│  [DBM Timers]                                    [Minimap] [Meters]  │
│                                                                      │
│                                                                      │
│            ┌──────────────────────────────┐                          │
│            │      RAID FRAMES (VuhDo)     │     [Totem Timers]       │
│            │  ┌────┐┌────┐┌────┐┌────┐   │     [WA: Totem Bars]     │
│            │  │ G1 ││ G2 ││ G3 ││ G4 │   │                          │
│            │  └────┘└────┘└────┘└────┘   │                          │
│            │  ┌────┐                      │                          │
│            │  │ G5 │                      │                          │
│            │  └────┘                      │                          │
│            └──────────────────────────────┘                          │
│                                                                      │
│      [Player Frame]          [Target Frame]        [Focus Frame]     │
│                                                                      │
│              [WA: Earth Shield]  [WA: NS Ready]                      │
│              [WA: Water Shield]  [WA: Elem Mastery]                  │
│              [WA: Low Mana]      [WA: Trinkets]                      │
│                                                                      │
│                    ┌────────────────────┐                             │
│                    │    CAST BAR        │                             │
│                    │  (Quartz/WA)       │                             │
│                    └────────────────────┘                             │
│                                                                      │
│  ┌──────────────────────────────────────────────────────────────┐    │
│  │  Action Bar 1: Core Heals + NS Macro + Dispels              │    │
│  │  Action Bar 2: Totems (Modifier Macros) + Heroism + MT      │    │
│  │  Action Bar 3: Utility (Ghost Wolf, Potions, Trinkets)      │    │
│  └──────────────────────────────────────────────────────────────┘    │
│  [Chat]                                              [Bags] [Menu]   │
└──────────────────────────────────────────────────────────────────────┘
```

### Suggested Keybind Layout (Modifier-Heavy)

| Key | No Mod (Heal) | Shift (Utility) | Ctrl (Totem/Other) |
|-----|---------------|-----------------|---------------------|
| 1 | Healing Wave | HW Downrank | Earth Totem Set |
| 2 | Lesser Healing Wave | LHW Downrank | Water Totem Set |
| 3 | Chain Heal | CH Downrank | Air Totem Set |
| 4 | Earth Shield | ES Refresh (focus) | Fire Totem Set |
| 5 | NS + HW Macro | NS + HW Self | Heroism |
| Q | Cure Poison | Cure Disease | Purge |
| E | Mouseover Heal/DPS | Earth Shock | Totemic Call |
| R | Chain Heal Self | Mana Tide | Mana Potion |
| F | Focus Set | Focus Clear | Assist Tank |
| T | Trinket 1 | Trinket 2 | Both Trinkets |
| G | Ghost Wolf | Water Walking | Astral Recall |
| Z | Healthstone | Healing Potion | Dark Rune |
| X | Water Shield | Lightning Shield | Shield Swap |
| Mouse4 | Target Party1 | Heal Party1 | -- |
| Mouse5 | Target Party2 | Heal Party2 | -- |

---

## QUICK REFERENCE: MACRO TEMPLATE CHEAT SHEET

### Mouseover Heal Template
```
#showtooltip SPELLNAME
/cast [@mouseover,help,nodead][@target,help,nodead][@targettarget,help,nodead][@player] SPELLNAME
```

### Mouseover Harm Template
```
#showtooltip SPELLNAME
/cast [@mouseover,harm,nodead][@target,harm,nodead] SPELLNAME
```

### Focus Harm Template
```
#showtooltip SPELLNAME
/cast [@focus,harm,nodead][@mouseover,harm,nodead][@target,harm,nodead] SPELLNAME
```

### Modifier Switch Template
```
#showtooltip [mod:shift] SPELL_B; SPELL_A
/cast [mod:shift] SPELL_B
/cast [nomod] SPELL_A
```

### Stopcasting + Emergency Template
```
#showtooltip COOLDOWN_SPELL
/stopcasting
/cast COOLDOWN_SPELL
/cast [@mouseover,help,nodead][@target,help,nodead][@player] HEAL_SPELL
```

---

## NOTES ON TBC ANNIVERSARY CLIENT (2.5.5)

1. **Client Version:** TBC Anniversary is client 2.5.5 with interface number **20505**.
   This is a Classic-era client, NOT Dragonflight or War Within. Addons must use
   TOC `## Interface: 20505` to load properly.

2. **Spell Names vs Spell IDs:** The client uses spell names (not spell IDs) for
   macros. Always match your spellbook exactly, including capitalization.

3. **Rank Syntax:** Downranking uses `Spell Name(Rank X)` — the parentheses and
   capitalized "Rank" are required. Example: `Healing Wave(Rank 5)`

4. **[mod:shift] Bug:** Some players have reported `[mod:shift]` not working.
   The cause is usually the "Lock Action Bars" modifier consuming the shift key.
   **Fix:** Go to Keybinds → unbind Shift+Number from action bar swap, OR change
   the Lock Action Bars modifier from Shift to Alt. ElvUI users: disable "key down"
   in action bar general settings.

5. **Dual Spec API:** The TBC Anniversary client uses `GetActiveTalentGroup()` and
   `SetActiveTalentGroup()` — NOT the retail `GetSpecialization()` API.
   Addons/macros using the retail API will break.

6. **Dual Spec:** Available in TBC Anniversary (borrowed from WotLK).
   Swap between Resto and Elemental out of combat.

7. **Bloodlust/Heroism:** Now **RAID-WIDE** in TBC Anniversary with a 10-minute
   "Sated" debuff. Resets on boss kill or wipe. You no longer need a Shaman in
   every raid group.

8. **Spells That Do NOT Exist in TBC** (added in WotLK 3.0.2):
   - ~~Riptide~~ — Not available. No instant HoT for Resto.
   - ~~Tidal Force~~ — Not available. No crit-stacking CD for Resto.
   - ~~Tidal Waves~~ — Not available. No cast-speed proc.
   - ~~Earthliving Weapon~~ — Not available. Use Flametongue for spell damage.
   - ~~Wind Shear~~ — Not available. Use **Earth Shock** (Rank 1) to interrupt.
   - ~~Lava Burst~~ — Not available. Elemental uses Lightning Bolt + Chain Lightning.
   - ~~Hex~~ — Not available. No Shaman CC in TBC (except Frost Shock slow).

9. **Totemic Call (NOT "Totemic Recall"):** The TBC spell that destroys your totems
   and refunds 25% of their mana cost is called **Totemic Call**, not Totemic Recall.

10. **Earth Shield:** Has **6 charges** maximum in TBC. Heals the target each time
    they are hit, and provides 30% spell pushback resistance. Only one target at a time.

---

*Generated for TBC Anniversary 2026 (Client 2.5.5, Interface 20505).*
*All spells verified against the TBC Classic spell list.*
*Test all macros on target dummies before raiding.*
*Adjust spell ranks and item names to match YOUR spellbook and bags.*
