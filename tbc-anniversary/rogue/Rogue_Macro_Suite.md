# Tidekeeper — TBC Anniversary 2026 Rogue Macro Suite
## Complete Macro Collection for Assassination, Combat & Subtlety

> **Client:** 2.5.5 | **Interface:** 20505 | **Max Macro Length:** 255 characters

---

## Table of Contents
1. [Universal Macros (All Specs)](#universal-macros)
2. [Assassination Macros](#assassination-macros)
3. [Combat Macros](#combat-macros)
4. [Subtlety Macros](#subtlety-macros)
5. [PvP Macros](#pvp-macros)
6. [Utility & Quality of Life](#utility-macros)

---

## Universal Macros (All Specs) <a name="universal-macros"></a>

### Kick — Stopcasting Interrupt
Cancels any in-progress autoattack animation lag and fires Kick immediately. Reliable against fast casts.
```
#showtooltip Kick
/stopcasting
/cast Kick
```

### Blind
Breaks combat temporarily. Will not break on DoT damage — clear your poisons/bleeds first if needed.
```
#showtooltip Blind
/stopcasting
/cast Blind
```

### Sap — Stealth Only
Only fires while stealthed. Prevents accidentally breaking stealth by pressing it out of stealth.
```
#showtooltip Sap
/cast [stealth] Sap
```

### Vanish
```
#showtooltip Vanish
/stopcasting
/cast Vanish
```

### Evasion
```
#showtooltip Evasion
/cast Evasion
```

### Sprint
```
#showtooltip Sprint
/cast Sprint
```

### Cloak of Shadows
Removes all magic debuffs and provides magic immunity for 5 seconds.
```
#showtooltip Cloak of Shadows
/cast Cloak of Shadows
```

### Gouge — Stopcasting
Stops current actions to land Gouge immediately. Must be facing the target.
```
#showtooltip Gouge
/stopcasting
/cast Gouge
```

### Kidney Shot
```
#showtooltip Kidney Shot
/cast Kidney Shot
```

### Slice and Dice
```
#showtooltip Slice and Dice
/cast Slice and Dice
```

### Rupture
```
#showtooltip Rupture
/cast Rupture
```

### Expose Armor
Use when no Sunder Armor warrior is available. Replaces Rupture in the finisher rotation.
```
#showtooltip Expose Armor
/cast Expose Armor
```

### Pick Pocket + Opener
Pick Pocket then Cheap Shot in one press. The /cast will not fire until Pick Pocket completes or fails (out of range for pickpocket means it skips to Cheap Shot). Requires stealth.
```
#showtooltip Cheap Shot
/cast [stealth] Pick Pocket
/cast [stealth] Cheap Shot
```

### Stealth Toggle
Enters stealth if not stealthed. Shift-click cancels stealth. Prevents accidental unstealth.
```
#showtooltip Stealth
/cast [nostealth] Stealth
/cancelaura [modifier:shift] Stealth
```

### Cheap Shot — Stealth Only
```
#showtooltip Cheap Shot
/cast [stealth] Cheap Shot
```

### Garrote — Stealth Only
```
#showtooltip Garrote
/cast [stealth] Garrote
```

### Eviscerate
```
#showtooltip Eviscerate
/cast Eviscerate
```

### Feint
Reduces threat. Use during trash packs or when you pull aggro on bosses.
```
#showtooltip Feint
/cast Feint
```

---

## Assassination Macros <a name="assassination-macros"></a>

### Mutilate
Requires daggers in both hands. Generates 2 combo points (3 on crit with Seal Fate).
```
#showtooltip Mutilate
/cast Mutilate
```

### Cold Blood + Eviscerate
Pops Cold Blood for a guaranteed critical Eviscerate. Cold Blood is off-GCD so both fire in one press.
```
#showtooltip Eviscerate
/cast Cold Blood
/cast Eviscerate
```

### Envenom
Assassination finisher that consumes Deadly Poison charges. Does not consume combo points in TBC if the target dies.
```
#showtooltip Envenom
/cast Envenom
```

### Cold Blood + Envenom
Guaranteed crit Envenom for maximum burst. Use at 5 combo points with full Deadly Poison stacks.
```
#showtooltip Envenom
/cast Cold Blood
/cast Envenom
```

### Deadly Throw
Ranged finisher for fleeing targets. Requires a thrown weapon equipped.
```
#showtooltip Deadly Throw
/cast Deadly Throw
```

### Trinket + Cold Blood Burst
Pops trinket slot 1 (top) and Cold Blood together. Follow immediately with Envenom or Eviscerate.
```
#showtooltip Cold Blood
/use 13
/cast Cold Blood
```

### Mutilate — Pick Pocket Opener
Pick Pocket then Mutilate from stealth. Useful for farming.
```
#showtooltip Mutilate
/cast [stealth] Pick Pocket
/cast Mutilate
```

### Assassination Rotation Helper
Press repeatedly: keeps Slice and Dice up then Rupture. Reset on combat drop.
```
#showtooltip
/castsequence reset=combat Slice and Dice, Rupture, Envenom
```

---

## Combat Macros <a name="combat-macros"></a>

### Sinister Strike
Bread-and-butter combo point builder for Combat.
```
#showtooltip Sinister Strike
/cast Sinister Strike
```

### Blade Flurry
Hits a second nearby target for 15 seconds. 2-minute cooldown.
```
#showtooltip Blade Flurry
/cast Blade Flurry
```

### Adrenaline Rush
Doubles energy regeneration for 15 seconds. 5-minute cooldown.
```
#showtooltip Adrenaline Rush
/cast Adrenaline Rush
```

### Blade Flurry + Adrenaline Rush
Full Combat cooldown burst. Both are off-GCD and stack. Save for boss burn phases or large AoE packs.
```
#showtooltip Blade Flurry
/cast Blade Flurry
/cast Adrenaline Rush
```

### Trinket + Blade Flurry + Adrenaline Rush
Full send. Trinket slot 1 + both Combat cooldowns in one press.
```
#showtooltip Blade Flurry
/use 13
/cast Blade Flurry
/cast Adrenaline Rush
```

### Riposte
Parry-procced ability. Only usable after parrying an attack. Dirt cheap and should never be wasted.
```
#showtooltip Riposte
/cast Riposte
```

### Combat Rotation Helper
Basic cycle: build to 5 combo points, keep Slice and Dice, then Rupture/Eviscerate.
```
#showtooltip
/castsequence reset=combat Sinister Strike, Slice and Dice, Rupture
```

### Backstab (Combat Off-Spec / Positional)
For Combat daggers or when behind the target.
```
#showtooltip Backstab
/cast Backstab
```

> **Note:** Killing Spree does not exist in TBC. It was introduced in Wrath of the Lich King (3.0). Do not look for it in your spellbook.

---

## Subtlety Macros <a name="subtlety-macros"></a>

### Shadowstep
Teleports behind the target. Usable in stealth or out of stealth. 30-second cooldown.
```
#showtooltip Shadowstep
/cast Shadowstep
```

### Hemorrhage
Primary combo point builder for Subtlety. Applies a physical damage debuff.
```
#showtooltip Hemorrhage
/cast Hemorrhage
```

### Preparation
Resets the cooldown of Vanish, Sprint, Evasion, Cold Blood, Shadowstep, and Premeditation.
```
#showtooltip Preparation
/cast Preparation
```

### Premeditation + Cheap Shot
Adds 2 combo points from stealth then immediately Cheap Shots. Must be stealthed.
```
#showtooltip Cheap Shot
/cast [stealth] Premeditation
/cast [stealth] Cheap Shot
```

### Premeditation + Ambush
2 free combo points into an Ambush from stealth for massive opener damage.
```
#showtooltip Ambush
/cast [stealth] Premeditation
/cast [stealth] Ambush
```

### Ambush — Stealth Only
High-damage stealth opener. Requires a dagger in the main hand.
```
#showtooltip Ambush
/cast [stealth] Ambush
```

### Trinket + Shadowstep Burst
Pop trinket then Shadowstep behind the target. Follow with Ambush or Cheap Shot.
```
#showtooltip Shadowstep
/use 13
/cast Shadowstep
```

### Shadowstep + Kick Interrupt
Shadowstep to the target and immediately Kick. Useful for interrupting casters at range.
```
#showtooltip Kick
/cast Shadowstep
/stopcasting
/cast Kick
```

### Premeditation + Garrote (Silence Opener)
Silence opener for PvP. Garrote silences for 3 seconds — enough to land a full Kidney Shot.
```
#showtooltip Garrote
/cast [stealth] Premeditation
/cast [stealth] Garrote
```

### Hemorrhage + Ghostly Strike
Modifier macro: default Hemorrhage, Shift for Ghostly Strike (if talented).
```
#showtooltip [modifier:shift] Ghostly Strike; Hemorrhage
/cast [modifier:shift] Ghostly Strike; Hemorrhage
```

---

## PvP Macros <a name="pvp-macros"></a>

### Sap Arena Target 1
```
#showtooltip Sap
/cast [stealth,target=arena1] Sap
```

### Sap Arena Target 2
```
#showtooltip Sap
/cast [stealth,target=arena2] Sap
```

### Sap Arena Target 3
```
#showtooltip Sap
/cast [stealth,target=arena3] Sap
```

### Kick on Focus
Interrupt your focus target without switching targets. Essential for arena.
```
#showtooltip Kick
/stopcasting
/cast [target=focus,harm,nodead] Kick
```

### Blind on Focus
CC your focus target without losing your main target.
```
#showtooltip Blind
/cast [target=focus,harm,nodead] Blind
```

### Kidney Shot on Focus
Full stun on focus target. Use to lock down the healer while you kill the DPS.
```
#showtooltip Kidney Shot
/cast [target=focus,harm,nodead] Kidney Shot
```

### Cheap Shot on Focus — Stealth
Open on your focus target from stealth.
```
#showtooltip Cheap Shot
/cast [stealth,target=focus,harm,nodead] Cheap Shot
```

### Trinket + Vanish
Break CC with PvP trinket then immediately Vanish to reset. The classic Rogue escape.
```
#showtooltip Vanish
/use 13
/cast Vanish
```

### Cloak of Shadows + Vanish
Cloak first to clear DoTs that would break Vanish, then Vanish cleanly.
```
#showtooltip Vanish
/cast Cloak of Shadows
/cast Vanish
```

### Gouge on Focus
CC the off-target without swapping.
```
#showtooltip Gouge
/stopcasting
/cast [target=focus,harm,nodead] Gouge
```

### Deadly Throw on Focus
Ranged snare on fleeing focus target.
```
#showtooltip Deadly Throw
/cast [target=focus,harm,nodead] Deadly Throw
```

### Set Focus
Sets your current target as focus with one press.
```
/focus [harm,nodead]
```

### Clear Focus
```
/clearfocus
```

### Blind + Focus Swap
Blinds your current target and sets them as focus in one press.
```
#showtooltip Blind
/focus [harm,nodead]
/cast [target=focus,harm,nodead] Blind
```

---

## Utility & Quality of Life <a name="utility-macros"></a>

### Stealth + Sap Combo
Enters stealth and immediately starts Sap. Press once to stealth, press again (once stealthed) to Sap.
```
#showtooltip Sap
/cast [nostealth] Stealth; Sap
```

### Pick Lock
No macro needed — use directly from spellbook on lockboxes or doors. But for easy keybinding:
```
#showtooltip Pick Lock
/cast Pick Lock
```

### Disarm Trap
Usable only while stealthed. Disarms traps like Freezing Trap in arena.
```
#showtooltip Disarm Trap
/cast [stealth] Disarm Trap
```

### Distract
Conal ability that turns mobs to face a direction. Great for controlling patrol paths.
```
#showtooltip Distract
/cast [stealth] Distract
```

### Mount Macro
Mounts up if not stealthed. Shift cancels stealth first for mounting.
```
#showtooltip
/cancelaura [modifier:shift] Stealth
/cast [nostealth,flyable] Swift Purple Gryphon; [nostealth] Black War Raptor
```
*(Replace mount names with your actual mounts)*

### Apply Instant Poison (Main Hand)
```
#showtooltip Instant Poison VI
/use Instant Poison VI
/use 16
/click StaticPopup1Button1
```

### Apply Deadly Poison (Off Hand)
```
#showtooltip Deadly Poison VII
/use Deadly Poison VII
/use 17
/click StaticPopup1Button1
```

### Apply Wound Poison (Main Hand — PvP)
```
#showtooltip Wound Poison V
/use Wound Poison V
/use 16
/click StaticPopup1Button1
```

### Apply Crippling Poison (Off Hand — PvP)
```
#showtooltip Crippling Poison II
/use Crippling Poison II
/use 17
/click StaticPopup1Button1
```

### Bandage — Stop and Heal
Cancels attack to bandage. Uses Heavy Netherweave Bandage.
```
#showtooltip Heavy Netherweave Bandage
/stopcasting
/stopattack
/use Heavy Netherweave Bandage
```

### Bandage Mouseover
Bandage a teammate without switching targets.
```
#showtooltip Heavy Netherweave Bandage
/stopcasting
/stopattack
/use [target=mouseover,help,nodead] Heavy Netherweave Bandage; Heavy Netherweave Bandage
```

### Throw — Ranged Pull
Pull with your thrown weapon. Useful for pulling single mobs in dungeons.
```
#showtooltip Throw
/cast Throw
```

### Eat + Drink
Uses food and water in one click. Replace item names with your consumables.
```
#showtooltip
/use Blackened Basilisk
/use Filtered Draenic Water
```

### Thistle Tea (Energy Restore)
Instantly restores 100 energy. Critical for burst windows.
```
#showtooltip Thistle Tea
/use Thistle Tea
```

---

## Keybinding Recommendations

| Key | Assassination | Combat | Subtlety |
|-----|---------------|--------|----------|
| 1 | Mutilate | Sinister Strike | Hemorrhage |
| 2 | Envenom | Eviscerate | Eviscerate |
| 3 | Slice and Dice | Slice and Dice | Slice and Dice |
| 4 | Rupture | Rupture | Rupture |
| 5 | Expose Armor | Riposte | Ghostly Strike |
| Q | Kick (stopcasting) | Kick (stopcasting) | Kick (stopcasting) |
| E | Kidney Shot | Kidney Shot | Kidney Shot |
| R | Gouge | Gouge | Gouge |
| F | Cheap Shot (stealth) | Cheap Shot (stealth) | Premeditation + CS |
| G | Garrote (stealth) | Garrote (stealth) | Premeditation + Ambush |
| Z | Cold Blood + Envenom | Blade Flurry + AR | Shadowstep |
| X | Blind | Blind | Blind |
| C | Vanish | Vanish | Vanish |
| V | Evasion | Evasion | Evasion |
| T | Sprint | Sprint | Sprint |
| Shift+1 | Cold Blood + Evisc | Backstab | Ambush (stealth) |
| Shift+2 | Deadly Throw | Blade Flurry | Preparation |
| Shift+3 | Trinket + CB burst | Adrenaline Rush | Trinket + Shadowstep |
| Shift+Q | Kick on Focus | Kick on Focus | Kick on Focus |
| Shift+E | Kidney Shot on Focus | Kidney Shot on Focus | Kidney Shot on Focus |
| Shift+X | Blind on Focus | Blind on Focus | Blind on Focus |
| Shift+R | Gouge on Focus | Gouge on Focus | Gouge on Focus |
| ` (Tilde) | Stealth Toggle | Stealth Toggle | Stealth Toggle |
| Shift+` | Cloak of Shadows | Cloak of Shadows | Cloak of Shadows |
| Mouse5 | Trinket 1 (/use 13) | Trinket 1 (/use 13) | Trinket 1 (/use 13) |
| Mouse4 | Trinket 2 (/use 14) | Trinket 2 (/use 14) | Trinket 2 (/use 14) |
| Shift+F | Pick Pocket + opener | Pick Pocket + opener | Pick Pocket + opener |
| Shift+C | Cloak + Vanish | Cloak + Vanish | Cloak + Vanish |
| Shift+V | Trinket + Vanish | Trinket + Vanish | Trinket + Vanish |

---

## Notes

- **Combo Point Management**: Never let combo points go to waste. At 5 combo points, always spend on a finisher before building more. In TBC, combo points are stored on the target -- if the target dies, your combo points are lost. Subtlety's Premeditation helps compensate by granting 2 free combo points on your next opener.

- **Poison Selection by Spec**:
  - **Assassination (PvE)**: Instant Poison (MH) + Deadly Poison (OH). The Assassination talent tree amplifies poison damage significantly. Envenom consumes Deadly Poison stacks for burst.
  - **Combat (PvE)**: Instant Poison (MH) + Instant Poison (OH). Combat does not benefit from Deadly Poison talents, so double Instant maximizes procs with the fast attack speed from Blade Flurry and Adrenaline Rush.
  - **Subtlety (PvP)**: Wound Poison (MH) + Crippling Poison (OH). Wound Poison reduces healing by 50%, Crippling Poison provides a snare. For certain matchups, swap to Mind-Numbing Poison (OH) against casters.
  - **General PvP**: Always carry Wound, Crippling, Mind-Numbing, and Instant Poisons. Swap between pulls or between arena games.

- **Energy Pooling**: Do not spam your combo point builder the instant you have energy. Pool energy to 60-80 before spending, so you always have enough for an emergency Kick (25 energy) or Gouge (45 energy). This is especially important in PvP.

- **Opener Sequences**:
  - **Assassination PvE**: Stealth > Garrote (if no positional) or Cheap Shot (dungeons) > Mutilate to 5 CP > Slice and Dice > Mutilate to 5 CP > Rupture > Mutilate to 5 CP > Envenom. Maintain both Slice and Dice and Rupture.
  - **Combat PvE**: Stealth > Garrote or Cheap Shot > Sinister Strike to 5 CP > Slice and Dice > Sinister Strike to 5 CP > Rupture > SS to 5 CP > Eviscerate. Pop Blade Flurry + AR during Heroism.
  - **Subtlety PvP**: Stealth > Premeditation > Cheap Shot (2+2 CP) > Hemorrhage (5 CP) > Kidney Shot (full duration) > burst during stun.

- **TBC Anniversary 2026 — Raid-Wide Heroism**: Heroism/Bloodlust is now raid-wide in the 2026 Anniversary version. One Shaman covers the entire raid. Plan your cooldown usage around this. As a Rogue, stack Blade Flurry + Adrenaline Rush (Combat) or Cold Blood (Assassination/Subtlety) with the Heroism window for maximum damage. The Sated/Exhaustion debuff lasts 10 minutes, so you get one Heroism per boss attempt in most cases.

- **Cloak of Shadows**: This is your most powerful defensive cooldown. It removes all harmful magic effects and makes you immune to spells for 5 seconds. In PvP, use it proactively to prevent Polymorph, Fear, or other CC. In PvE, use it to cheese boss mechanics that apply magic debuffs.

- **Vanish Tips**: Vanish can be broken by DoTs ticking at the exact moment you press it. Always use Cloak of Shadows first when possible (see the Cloak + Vanish macro above) to clear DoTs before Vanishing. In TBC, Vanish has a brief 0.5-second immunity window that can be used to dodge abilities.

- **Feint**: Often overlooked, Feint reduces your threat significantly. In TBC raids without reliable threat management, Feint after your opener is critical. It costs only 20 energy and can save your life.

- **Thistle Tea**: Restores 100 energy instantly on a 5-minute cooldown. Crafted via Cooking. Use during burst windows when you need energy for one more finisher. Stack it with Adrenaline Rush for an absurd energy spike.

- **Macro Slot 16/17**: In equipment slot macros, slot 16 = main hand weapon and slot 17 = off hand weapon. The poison application macros use these to target the correct weapon.
