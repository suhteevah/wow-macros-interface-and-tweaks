# Tidekeeper — TBC Anniversary 2026 Mage Macro Suite
## Complete Macro Collection for Arcane, Fire & Frost

> **Client:** 2.5.5 | **Interface:** 20505 | **Max Macro Length:** 255 characters

---

## Table of Contents
1. [Universal Macros (All Specs)](#universal-macros)
2. [Arcane DPS Macros](#arcane-macros)
3. [Fire DPS Macros](#fire-macros)
4. [Frost DPS Macros](#frost-macros)
5. [PvP Macros](#pvp-macros)
6. [Utility & Quality of Life](#utility-macros)

---

## Universal Macros (All Specs) <a name="universal-macros"></a>

### Counterspell — Stopcasting
Interrupts your current cast to Counterspell immediately. Essential for reliable kicks.
```
#showtooltip Counterspell
/stopcasting
/cast Counterspell
```

### Polymorph — Focus Target
Sheeps your focus target without switching off your current target.
```
#showtooltip Polymorph
/stopcasting
/cast [target=focus,harm,nodead] Polymorph; [harm,nodead] Polymorph
```

### Remove Curse — Mouseover Priority
Decurses mouseover > target > self.
```
#showtooltip Remove Curse
/cast [target=mouseover,help,nodead] Remove Curse; [help,nodead] Remove Curse; [target=player] Remove Curse
```

### Evocation
Channel Evocation to restore mana. Stopcasts first to avoid clipping.
```
#showtooltip Evocation
/stopcasting
/cast Evocation
```

### Ice Block
Emergency immunity. Stopcasts first for instant activation.
```
#showtooltip Ice Block
/stopcasting
/cast Ice Block
```

### Blink
Teleport forward. Stopcasts to blink without delay.
```
#showtooltip Blink
/stopcasting
/cast Blink
```

### Mana Shield
```
#showtooltip Mana Shield
/cast Mana Shield
```

### Arcane Intellect — Modifier for Brilliance
Shift = Arcane Brilliance (group buff), default = Arcane Intellect (single).
```
#showtooltip [modifier:shift] Arcane Brilliance; Arcane Intellect
/cast [modifier:shift] Arcane Brilliance; [target=mouseover,help,nodead] Arcane Intellect; [help,nodead] Arcane Intellect; [target=player] Arcane Intellect
```

### Conjure Food — Modifier for Rank
Default = max rank food. Shift = Mana Emerald. Alt = max rank water.
```
#showtooltip [modifier:shift] Conjure Mana Emerald; [modifier:alt] Conjure Water; Conjure Food
/cast [modifier:shift] Conjure Mana Emerald; [modifier:alt] Conjure Water; Conjure Food
```

### Mana Gem — Use or Conjure
Uses your Mana Emerald if you have one; otherwise conjures a new one.
```
#showtooltip Mana Emerald
/use Mana Emerald
/cast Conjure Mana Emerald
```

### Shoot (Wand)
```
#showtooltip Shoot
/cast !Shoot
```

---

## Arcane DPS Macros <a name="arcane-macros"></a>

### Arcane Blast
Core rotational filler. Stacks the Arcane Blast debuff up to 3 times.
```
#showtooltip Arcane Blast
/cast [harm,nodead] Arcane Blast
```

### Arcane Missiles
Use at 3 stacks of Arcane Blast debuff to dump damage before resetting.
```
#showtooltip Arcane Missiles
/cast [harm,nodead] Arcane Missiles
```

### Arcane Power
Major Arcane cooldown. +35% damage, +35% mana cost. Use with trinkets.
```
#showtooltip Arcane Power
/cast Arcane Power
```

### Arcane Power + Trinket Burst
Pops trinket slot 13 and Arcane Power together for burn phase.
```
#showtooltip Arcane Power
/use 13
/cast Arcane Power
```

### Presence of Mind + Pyroblast
Instant Pyroblast. PoM makes the next spell instant-cast.
```
#showtooltip Presence of Mind
/cast Presence of Mind
/cast [harm,nodead] Pyroblast
```

### Presence of Mind + Arcane Blast
Alternative PoM combo. Instant Arcane Blast at 3 stacks for massive damage.
```
#showtooltip Presence of Mind
/cast Presence of Mind
/cast [harm,nodead] Arcane Blast
```

### Icy Veins (Arcane w/ Ice Talents)
30% spell haste for 20 seconds. Often taken by Arcane mages via deep Frost dip.
```
#showtooltip Icy Veins
/cast Icy Veins
```

### Arcane Power + Icy Veins Burst
Double cooldown for maximum burn phase. Stack with Heroism.
```
#showtooltip Arcane Power
/use 13
/cast Arcane Power
/cast Icy Veins
```

### Arcane Explosion — AoE
Instant-cast PBAoE. No target required. Spam for AoE packs.
```
#showtooltip Arcane Explosion
/cast Arcane Explosion
```

---

## Fire DPS Macros <a name="fire-macros"></a>

### Fireball
Primary Fire nuke. Core of the rotation.
```
#showtooltip Fireball
/cast [harm,nodead] Fireball
```

### Scorch — Fire Vulnerability
Maintains the Improved Scorch debuff (5 stacks of fire vulnerability).
```
#showtooltip Scorch
/cast [harm,nodead] Scorch
```

### Fire Blast
Instant-cast fire nuke. Use on the move or for finishing blows.
```
#showtooltip Fire Blast
/cast [harm,nodead] Fire Blast
```

### Pyroblast — Hardcast Opener
Long cast-time nuke. Use as a pre-pull opener before the tank engages.
```
#showtooltip Pyroblast
/cast [harm,nodead] Pyroblast
```

### Dragon's Breath — Stopcasting
Instant cone of fire that disorients. Stopcasts for emergency use.
```
#showtooltip Dragon's Breath
/stopcasting
/cast Dragon's Breath
```

### Blast Wave — Stopcasting
Instant PBAoE fire knockback. Stopcasts for immediate activation.
```
#showtooltip Blast Wave
/stopcasting
/cast Blast Wave
```

### Combustion
Fire crit stacking cooldown. Use before a burst sequence of Fireballs.
```
#showtooltip Combustion
/cast Combustion
```

### Combustion + Trinket Burst
Full Fire burn window. Pop trinket and Combustion together.
```
#showtooltip Combustion
/use 13
/cast Combustion
```

### Flamestrike — AoE
Ground-targeted AoE with DoT. Click to place on cursor.
```
#showtooltip Flamestrike
/cast Flamestrike
```

### Flamestrike + Dragon's Breath AoE Combo
Cast sequence for AoE packs: Flamestrike, then Dragon's Breath on top.
```
#showtooltip
/castsequence reset=10 Flamestrike, Dragon's Breath
```

---

## Frost DPS Macros <a name="frost-macros"></a>

### Frostbolt
Primary Frost nuke. Core of the rotation.
```
#showtooltip Frostbolt
/cast [harm,nodead] Frostbolt
```

### Ice Lance
Instant-cast Frost spell. Triple damage vs frozen targets. Use after procs.
```
#showtooltip Ice Lance
/cast [harm,nodead] Ice Lance
```

### Cold Snap
Resets all Frost cooldowns (Ice Block, Ice Barrier, Water Elemental, Icy Veins).
```
#showtooltip Cold Snap
/cast Cold Snap
```

### Summon Water Elemental
Summons your Water Elemental pet. 45-second duration.
```
#showtooltip Summon Water Elemental
/cast Summon Water Elemental
```

### Water Elemental — Freeze at Cursor
Commands your Water Elemental to use Freeze (AoE root) at your cursor.
```
#showtooltip Freeze
/cast [pet] Freeze
```

### Water Elemental — Attack Target
Sends your Water Elemental to attack your current target.
```
/petattack [harm,nodead]
```

### Ice Barrier
Frost-only absorb shield. Use on cooldown for survivability.
```
#showtooltip Ice Barrier
/cast Ice Barrier
```

### Frost Nova — Stopcasting
Roots all nearby enemies. Stopcasts for emergency use.
```
#showtooltip Frost Nova
/stopcasting
/cast Frost Nova
```

### Frost Nova + Ice Lance Shatter
Nova nearby targets, then follow up with Ice Lance for shatter damage.
```
#showtooltip Frost Nova
/stopcasting
/cast Frost Nova
/cast [harm,nodead] Ice Lance
```

### Cone of Cold — Stopcasting
Frontal cone AoE slow/damage. Stopcasts for instant use.
```
#showtooltip Cone of Cold
/stopcasting
/cast Cone of Cold
```

### Blizzard — AoE
Channeled ground-targeted AoE. Click to place on cursor.
```
#showtooltip Blizzard
/cast Blizzard
```

### Icy Veins (Frost)
30% spell haste for 20 seconds. Major Frost cooldown.
```
#showtooltip Icy Veins
/use 13
/cast Icy Veins
```

### Frost Full Burst — Icy Veins + Elemental
Summon Water Elemental and pop Icy Veins together for burst phase.
```
#showtooltip Icy Veins
/use 13
/cast Icy Veins
/cast Summon Water Elemental
```

---

## PvP Macros <a name="pvp-macros"></a>

### Polymorph — Focus Target (PvP)
Stopcasts and sheeps focus without dropping your current target.
```
#showtooltip Polymorph
/stopcasting
/cast [target=focus,harm,nodead] Polymorph
```

### Counterspell — Focus Target
Interrupt your focus target (enemy healer) without switching targets.
```
#showtooltip Counterspell
/stopcasting
/cast [target=focus,harm,nodead] Counterspell
```

### Frost Nova + Blink Escape
Stopcasts, roots enemies in place, then Blinks away. Panic button.
```
#showtooltip Frost Nova
/stopcasting
/cast Frost Nova
/cast Blink
```

### Trinket + Ice Block
Break CC and immediately Ice Block for safety.
```
#showtooltip
/use 13
/cast Ice Block
```

### Trinket + Blink
Break CC and Blink to reposition.
```
#showtooltip
/use 13
/stopcasting
/cast Blink
```

### Arena Target Polymorph (1/2/3)
```
#showtooltip Polymorph
/stopcasting
/cast [target=arena1] Polymorph
```
```
#showtooltip Polymorph
/stopcasting
/cast [target=arena2] Polymorph
```
```
#showtooltip Polymorph
/stopcasting
/cast [target=arena3] Polymorph
```

### Arena Target Counterspell (1/2/3)
```
#showtooltip Counterspell
/stopcasting
/cast [target=arena1] Counterspell
```
```
#showtooltip Counterspell
/stopcasting
/cast [target=arena2] Counterspell
```
```
#showtooltip Counterspell
/stopcasting
/cast [target=arena3] Counterspell
```

### Spellsteal — Focus Target
Steal a buff from your focus target without switching off your current target.
```
#showtooltip Spellsteal
/cast [target=focus,harm,nodead] Spellsteal; [harm,nodead] Spellsteal
```

### Cancel Ice Block
Right-click or use this to cancel your own Ice Block when ready.
```
/cancelaura Ice Block
```

### Cancel Hypothermia Check
Shows whether you have the Hypothermia debuff (Ice Block cooldown lockout).
```
#showtooltip Ice Block
/stopcasting
/cast Ice Block
```

---

## Utility & Quality of Life <a name="utility-macros"></a>

### Spellsteal
Steal a beneficial buff from enemy target. Mouseover priority for multi-target fights.
```
#showtooltip Spellsteal
/cast [target=mouseover,harm,nodead] Spellsteal; [harm,nodead] Spellsteal
```

### Amplify Magic — Mouseover
Increases healing taken and magic damage taken. Use on tanks during physical-only fights.
```
#showtooltip Amplify Magic
/cast [target=mouseover,help,nodead] Amplify Magic; [help,nodead] Amplify Magic; [target=player] Amplify Magic
```

### Dampen Magic — Mouseover
Reduces magic damage taken and healing taken. Use for magic-heavy encounters.
```
#showtooltip Dampen Magic
/cast [target=mouseover,help,nodead] Dampen Magic; [help,nodead] Dampen Magic; [target=player] Dampen Magic
```

### Slow Fall — Mouseover or Self
```
#showtooltip Slow Fall
/cast [target=mouseover,help,nodead] Slow Fall; [target=player] Slow Fall
```

### Ritual of Refreshment (Mana Table)
Creates a refreshment table for the raid. Requires 2 other party members to assist.
```
#showtooltip Ritual of Refreshment
/cast Ritual of Refreshment
```

### Mount Macro
Uses your fastest available mount. Flying in Outland, ground elsewhere.
```
#showtooltip
/cast [flyable] Swift Purple Gryphon; Black War Tiger
```
*(Replace mount names with your actual mounts)*

### Modifier Mount — Ground or Flying
Shift = flying mount, default = ground mount.
```
#showtooltip
/cast [modifier:shift] Swift Purple Gryphon; Black War Tiger
```
*(Replace mount names with your actual mounts)*

### Focus Set/Clear
Left-click = set current target as focus. Shift-click = clear focus.
```
/focus [modifier:shift,target=focus] ; [harm,nodead]
```

### Sheep Moon (Raid Marking + Poly)
Sets moon raid icon on target then polymorphs it. Useful for dungeon CC.
```
#showtooltip Polymorph
/script SetRaidTarget("target",5)
/cast [harm,nodead] Polymorph
```

---

## Keybinding Recommendations

| Key | Arcane | Fire | Frost |
|-----|--------|------|-------|
| 1 | Arcane Blast | Fireball | Frostbolt |
| 2 | Arcane Missiles | Scorch | Ice Lance |
| 3 | Arcane Explosion | Fire Blast | Frost Nova |
| 4 | PoM + Pyro/AB | Dragon's Breath | Cone of Cold |
| 5 | Arcane Power + IV | Combustion | Icy Veins |
| Q | Counterspell (stopcasting) | Counterspell (stopcasting) | Counterspell (stopcasting) |
| E | Polymorph (focus) | Polymorph (focus) | Polymorph (focus) |
| R | Spellsteal | Spellsteal | Spellsteal |
| F | Blink | Blink | Blink |
| G | Frost Nova | Blast Wave | Summon Water Elemental |
| X | Ice Block | Ice Block | Ice Block |
| Z | Evocation | Evocation | Evocation |
| V | Remove Curse (mouseover) | Remove Curse (mouseover) | Remove Curse (mouseover) |
| Shift+1 | Fireball (filler) | Flamestrike | Blizzard |
| Shift+2 | PoM + Arcane Blast | Pyroblast (opener) | Cold Snap |
| Shift+3 | Mana Shield | Blast Wave | Ice Barrier |
| Shift+4 | Mana Gem | Mana Gem | Water Elem Freeze |
| Shift+Q | CS on focus | CS on focus | CS on focus |
| Shift+E | Sheep arena1 | Sheep arena1 | Sheep arena1 |
| Mouse5 | Trinket 1 | Trinket 1 | Trinket 1 |
| Mouse4 | Trinket 2 / Cold Snap | Trinket 2 | Trinket 2 |

---

## Notes

- **Arcane Blast Stacking**: Arcane Blast applies a self-debuff that stacks up to 3 times. Each stack increases the damage AND mana cost of your next Arcane Blast by 75%. At 3 stacks, cast Arcane Missiles to dump damage, then let the debuff expire before restarting the cycle. During burn phases (Arcane Power + Icy Veins), spam Arcane Blast continuously and rely on Evocation afterward.
- **Scorch Debuff Maintenance**: The Improved Scorch talent applies Fire Vulnerability (up to 5 stacks, +15% fire crit). One Fire mage in the raid should maintain this debuff. Refresh at 2-3 seconds remaining. If multiple Fire mages are present, only one needs the Improved Scorch talent.
- **Icy Veins + Arcane Power Combo**: These two cooldowns stack multiplicatively. Icy Veins gives 30% haste and Arcane Power gives 35% damage. Using both simultaneously during Heroism/Bloodlust creates the Arcane burn phase. Plan Evocation for immediately after the burn window.
- **TBC Anniversary 2026**: Heroism/Bloodlust is now raid-wide. One Shaman covers everyone. Plan your Arcane Power and Icy Veins cooldowns around the 10-minute Sated/Exhaustion debuff. Your first burn phase should align with the pull Heroism; your second burn comes when cooldowns are ready again even without Heroism.
- **Spellsteal**: This spell is extremely powerful in TBC. Many boss encounters have stealable buffs that massively increase your damage. Learn which bosses have stealable buffs (e.g., Curator's Astral Armor, Solarian's Wrath of the Astromancer). Spellsteal costs a lot of mana, so only steal high-value buffs.
- **Water Elemental Freeze**: Your Water Elemental's Freeze ability is a ground-targeted AoE root. Use it to set up shatter combos (Freeze + Frostbolt/Ice Lance). In raids, use it for add control. The pet bar ability can be keybound directly.
- **Mana Gems**: Always have a Mana Emerald conjured before a fight. Use it during your burn phase or when you dip below 40% mana. The cooldown is separate from mana potions, so you can use both in a single encounter.
- **Cold Snap**: Resets ALL Frost spell cooldowns including Ice Block, Ice Barrier, Water Elemental, and Icy Veins. In PvE, this effectively gives you two Icy Veins per fight. In PvP, it gives you a second Ice Block.
- **Polymorph and Diminishing Returns**: In PvP, Polymorph shares diminishing returns with other Polymorph-effect CCs. Each successive sheep on the same target within 15 seconds lasts half as long. After the third application the target is immune. Track DR timers carefully in arena.
