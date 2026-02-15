# Tidekeeper HUD — Quick Install Guide

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
   ```
   World of Warcraft\_classic_\WTF\Account\YOURACCOUNT\SavedVariables\
   ```
3. **BACKUP** `WeakAuras.lua` (copy it somewhere safe)
4. Open `WeakAuras.lua` in a text editor (Notepad++, VS Code, etc.)
5. Find the section that looks like:
   ```lua
   ["displays"] = {
   ```
6. Open `Tidekeeper_WeakAuras.lua` from this folder
7. Copy ALL the aura blocks (everything between the header comments)
8. Paste them inside the `["displays"] = {` table
9. Save the file
10. Launch WoW and type `/wa` — you should see "Tidekeeper HUD" in the list

---

## Installation: Manual Build Method

If you'd rather build in-game (safer but slower):

### Step 1: Create the Group
- `/wa` → New → Group → Name: `Tidekeeper HUD`
- Anchor: CENTER, 0, -80

### Step 2: Create Mana Bar
- Inside group → New → Progress Bar → Name: `TK - Mana Bar`
- Trigger: Status → Power → Mana → Player
- Size: 350 × 22
- Bar color: Blue (0.08, 0.38, 0.74)
- Add conditions for color change at 50% and 25%
- Add sub-text: `%p / %t` centered, `%percentpower%%` right-aligned

### Step 3: Create 5SR Timer
- Inside group → New → Progress Bar → Name: `TK - 5SR Timer`
- Trigger: Custom → State Updated
- Paste the 5SR trigger code from `Tidekeeper_WeakAuras.lua`
- Events field: `UNIT_SPELLCAST_SUCCEEDED`
- Actions → On Init: paste init code
- Size: 350 × 5, Orange color
- Anchor below mana bar

### Step 4: Create Tick Timer
- Inside group → New → Progress Bar → Name: `TK - Tick Timer`
- Trigger: Custom → State Updated
- Paste the Tick trigger code from `Tidekeeper_WeakAuras.lua`
- Events field: `UNIT_POWER_UPDATE`
- Actions → On Init: paste init code
- Custom Text: paste tick amount function
- Size: 350 × 5, Cyan color, spark enabled
- Anchor below 5SR timer

### Step 5: Create Cast Bar
- Inside group → New → Progress Bar → Name: `TK - Cast Bar`
- Trigger: Status → Cast → Player
- Size: 350 × 16
- Icon: Show (left side)
- Sub-text: `%n` left-aligned, `%p` right-aligned (timed format, 1 decimal)
- Bar color: Green default
- Add conditions or custom text for heal/damage/utility color swap

### Step 6: Create Cooldown Group
- Inside main group → New → Dynamic Group → Name: `TK - Cooldowns`
- Growth: Horizontal, Align: Center, Space: 4
- Anchor above mana bar

### Step 7: Create Each Cooldown Icon
For each spell (NS, EM, MT, Heroism):
- Inside CD group → New → Icon
- Trigger: Cooldown Progress (Spell) → [spell name] → Show Always
- Size: 34 × 34, Zoom: 0.1
- Sub-text: `%p` (timed, 0 decimal)
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
- [ ] Run `/wa` → select group → test "Show" checkbox to preview all states
- [ ] If tick timer desyncs after death: `/reload` to reset

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| 5SR bar never shows | Check Events field = `UNIT_SPELLCAST_SUCCEEDED` exactly |
| Tick timer erratic | `/reload` to resync. Check `UNIT_POWER_UPDATE` event |
| Cast bar wrong color | Verify spell names match your spellbook EXACTLY |
| Cooldown icons missing | Spell name must match (check capitalization) |
| Earth Shield not tracking | Set unit to "group" not "player" |
| Trinkets show blank | They only show if the trinket has an on-use effect |
| Everything invisible | Check Load conditions → Class: Shaman, Combat: In Combat |
| Bars overlap | Adjust yOffset values in the group positioning |
