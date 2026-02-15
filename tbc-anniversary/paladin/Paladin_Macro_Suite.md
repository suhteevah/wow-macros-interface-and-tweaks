# Tidekeeper — TBC Anniversary 2026 Paladin Macro Suite
## Complete Macro Collection for Holy, Protection & Retribution

> **Client:** 2.5.5 | **Interface:** 20505 | **Max Macro Length:** 255 characters

---

## Table of Contents
1. [Universal Macros (All Specs)](#universal-macros)
2. [Holy Healing Macros](#holy-macros)
3. [Protection Tanking Macros](#protection-macros)
4. [Retribution DPS Macros](#retribution-macros)
5. [PvP Macros](#pvp-macros)
6. [Utility & Quality of Life](#utility-macros)

---

## Universal Macros (All Specs) <a name="universal-macros"></a>

### Cleanse — Mouseover Priority
Removes one Poison, Disease, or Magic (with Sacred Cleansing) effect. Mouseover > target > self.
```
#showtooltip Cleanse
/cast [target=mouseover,help,nodead] Cleanse; [help,nodead] Cleanse; [target=player] Cleanse
```

### Blessing of Freedom — Mouseover
Removes and immunizes movement-impairing effects. Critical for tanks and flag carriers.
```
#showtooltip Blessing of Freedom
/cast [target=mouseover,help,nodead] Blessing of Freedom; [help,nodead] Blessing of Freedom; [target=player] Blessing of Freedom
```

### Lay on Hands
Full health heal on a long cooldown. Mouseover > target > self.
```
#showtooltip Lay on Hands
/cast [target=mouseover,help,nodead] Lay on Hands; [help,nodead] Lay on Hands; [target=player] Lay on Hands
```

### Divine Shield
Immunity bubble on self. Also cancels with right-click via cancel macro (see Utility section).
```
#showtooltip Divine Shield
/cast Divine Shield
```

### Divine Protection
Smaller shield. Useful when Divine Shield is on cooldown.
```
#showtooltip Divine Protection
/cast Divine Protection
```

### Hammer of Justice — Stopcasting
Interrupts current cast to stun immediately. 6-second stun baseline.
```
#showtooltip Hammer of Justice
/stopcasting
/cast Hammer of Justice
```

### Blessing of Kings — Modifier for Greater
Shift = Greater Blessing of Kings (group-wide, requires reagent), default = single target.
```
#showtooltip [modifier:shift] Greater Blessing of Kings; Blessing of Kings
/cast [modifier:shift] Greater Blessing of Kings; [target=mouseover,help,nodead] Blessing of Kings; [help,nodead] Blessing of Kings; [target=player] Blessing of Kings
```

### Blessing of Might — Modifier for Greater
```
#showtooltip [modifier:shift] Greater Blessing of Might; Blessing of Might
/cast [modifier:shift] Greater Blessing of Might; [target=mouseover,help,nodead] Blessing of Might; [help,nodead] Blessing of Might; [target=player] Blessing of Might
```

### Blessing of Wisdom — Modifier for Greater
```
#showtooltip [modifier:shift] Greater Blessing of Wisdom; Blessing of Wisdom
/cast [modifier:shift] Greater Blessing of Wisdom; [target=mouseover,help,nodead] Blessing of Wisdom; [help,nodead] Blessing of Wisdom; [target=player] Blessing of Wisdom
```

### Blessing of Salvation — Modifier for Greater
```
#showtooltip [modifier:shift] Greater Blessing of Salvation; Blessing of Salvation
/cast [modifier:shift] Greater Blessing of Salvation; [target=mouseover,help,nodead] Blessing of Salvation; [help,nodead] Blessing of Salvation
```

### Seal of Righteousness
```
#showtooltip Seal of Righteousness
/cast Seal of Righteousness
```

### Seal of Vengeance / Blood (Faction-Specific)
Alliance = Seal of Vengeance, Horde = Seal of Blood. Replace with your faction's seal.
```
#showtooltip Seal of Vengeance
/cast Seal of Vengeance
```

### Seal of Command
```
#showtooltip Seal of Command
/cast Seal of Command
```

### Seal of Wisdom
```
#showtooltip Seal of Wisdom
/cast Seal of Wisdom
```

### Judgement
Releases your active seal's judgement effect on the target.
```
#showtooltip Judgement
/cast [harm,nodead] Judgement
```

### Aura Swap — Modifier Based
Default = Devotion Aura, Shift = Concentration Aura, Alt = Shadow Resistance Aura, Ctrl = Fire Resistance Aura.
```
#showtooltip
/cast [modifier:shift] Concentration Aura; [modifier:alt] Shadow Resistance Aura; [modifier:ctrl] Fire Resistance Aura; Devotion Aura
```

---

## Holy Healing Macros <a name="holy-macros"></a>

### Flash of Light — Mouseover
Primary efficient heal. Mouseover > target > self.
```
#showtooltip Flash of Light
/cast [target=mouseover,help,nodead] Flash of Light; [help,nodead] Flash of Light; [target=player] Flash of Light
```

### Holy Light — Mouseover
Big heal. Use when Flash of Light is not enough throughput.
```
#showtooltip Holy Light
/cast [target=mouseover,help,nodead] Holy Light; [help,nodead] Holy Light; [target=player] Holy Light
```

### Holy Shock — Mouseover (Holy Talent)
Instant heal on friendly or damage on enemy. Smart target macro.
```
#showtooltip Holy Shock
/cast [target=mouseover,help,nodead] Holy Shock; [help,nodead] Holy Shock; [target=mouseover,harm,nodead] Holy Shock; [harm,nodead] Holy Shock
```

### Divine Favor + Holy Light
Guarantees a critical Holy Light. Divine Favor is off-GCD so both fire on one press.
```
#showtooltip Holy Light
/cast Divine Favor
/cast [target=mouseover,help,nodead] Holy Light; [help,nodead] Holy Light; [target=player] Holy Light
```

### Divine Favor + Flash of Light
Same combo but with Flash of Light for a fast guaranteed crit.
```
#showtooltip Flash of Light
/cast Divine Favor
/cast [target=mouseover,help,nodead] Flash of Light; [help,nodead] Flash of Light; [target=player] Flash of Light
```

### Divine Illumination
Reduces mana cost of all spells by 50% for 15 seconds. Use during heavy healing phases.
```
#showtooltip Divine Illumination
/cast Divine Illumination
```

### Trinket + Holy Light — Emergency Heal
Pops trinket slot 1 (on-use SP/haste trinket) and casts Holy Light.
```
#showtooltip Holy Light
/use 13
/cast [target=mouseover,help,nodead] Holy Light; [help,nodead] Holy Light; [target=player] Holy Light
```

### Holy Light Downranking
Shift = max rank, default = rank 4 (downranked for mana efficiency). Mouseover > target > self.
```
#showtooltip Holy Light
/cast [modifier:shift,target=mouseover,help,nodead] Holy Light; [modifier:shift] Holy Light; [target=mouseover,help,nodead] Holy Light(Rank 4); [help,nodead] Holy Light(Rank 4); [target=player] Holy Light(Rank 4)
```

### Blessing of Light — Mouseover
Increases healing from Holy Light and Flash of Light on the target.
```
#showtooltip Blessing of Light
/cast [target=mouseover,help,nodead] Blessing of Light; [help,nodead] Blessing of Light; [target=player] Blessing of Light
```

---

## Protection Tanking Macros <a name="protection-macros"></a>

### Righteous Defense — Mouseover Taunt
Taunts up to 3 enemies off the mouseover ally. This is the Paladin "taunt" and targets a friendly player.
```
#showtooltip Righteous Defense
/cast [target=mouseover,help,nodead] Righteous Defense; [help,nodead] Righteous Defense
```

### Avenger's Shield (Protection Talent)
Ranged pull/interrupt. Hits up to 3 targets.
```
#showtooltip Avenger's Shield
/cast Avenger's Shield
```

### Holy Shield
Increases block chance and deals Holy damage on block. Keep this up at all times while tanking.
```
#showtooltip Holy Shield
/cast Holy Shield
```

### Consecration
AoE threat. Use on cooldown for sustained AoE tanking.
```
#showtooltip Consecration
/cast Consecration
```

### Consecration Downranked
Shift = max rank, default = rank 4 (mana efficient for sustained AoE threat).
```
#showtooltip [modifier:shift] Consecration; Consecration(Rank 4)
/cast [modifier:shift] Consecration; Consecration(Rank 4)
```

### Exorcism (vs Undead/Demons)
```
#showtooltip Exorcism
/cast [harm,nodead] Exorcism
```

### Holy Wrath (vs Undead/Demons)
AoE stun + damage against Undead and Demons.
```
#showtooltip Holy Wrath
/cast Holy Wrath
```

### Shield of Righteousness Sequence — Prot Rotation
Cycles through core prot rotation abilities. Press once per GCD.
```
#showtooltip
/castsequence reset=combat Holy Shield, Judgement, Consecration
```

### Seal + Judgement One-Button
Casts Seal of Righteousness, then on next press Judges it. Reset after 15 seconds.
```
#showtooltip
/castsequence reset=15 Seal of Righteousness, Judgement
```

### Trinket + Holy Shield — Spike Damage Cooldown
Pops on-use trinket (slot 1) with Holy Shield for extra mitigation during damage spikes.
```
#showtooltip Holy Shield
/use 13
/cast Holy Shield
```

### Trinket + Avenging Wrath — Threat Burst
On-use trinket + Avenging Wrath for maximum threat generation.
```
#showtooltip Avenging Wrath
/use 13
/cast Avenging Wrath
```

### Seal Twist — Vengeance to Righteousness
For Prot seal twisting: Cast Seal of Vengeance, then twist to Righteousness for extra threat on Judgement. Press first for Vengeance, press again to twist.
```
#showtooltip
/castsequence reset=15 Seal of Vengeance, Seal of Righteousness, Judgement
```

### Righteous Fury
Threat generation buff. Should always be active while tanking. See Utility section for reminder macro.
```
#showtooltip Righteous Fury
/cast Righteous Fury
```

---

## Retribution DPS Macros <a name="retribution-macros"></a>

### Crusader Strike (Retribution Talent)
Core rotational ability. 6-second cooldown.
```
#showtooltip Crusader Strike
/cast Crusader Strike
```

### Seal of Command + Judgement Twist
Applies Seal of Command, then Judges on next press. Resets after 15 seconds.
```
#showtooltip
/castsequence reset=15 Seal of Command, Judgement
```

### Seal Twist — Command to Blood (Horde)
The core Ret seal twist. Cast Seal of Blood, wait for auto-attack, then twist into Seal of Command before the swing lands. Manual timing required; this macro handles the seal swap.
```
#showtooltip
/castsequence reset=15 Seal of Blood, Seal of Command
```

### Seal Twist — Command to Vengeance (Alliance)
Alliance version. Seal of Vengeance stacks, then twist Command for burst Judgement damage.
```
#showtooltip
/castsequence reset=15 Seal of Vengeance, Seal of Command
```

### Judgement
```
#showtooltip Judgement
/cast [harm,nodead] Judgement
```

### Hammer of Wrath — Execute Phase
Usable only on targets below 20% HP. Use on mouseover for target swapping in raids.
```
#showtooltip Hammer of Wrath
/cast [target=mouseover,harm,nodead] Hammer of Wrath; [harm,nodead] Hammer of Wrath
```

### Avenging Wrath
20% damage increase for 20 seconds. Does not stack with Divine Shield (Forbearance).
```
#showtooltip Avenging Wrath
/cast Avenging Wrath
```

### Trinket + Avenging Wrath — Burst DPS
Pops on-use trinket and Avenging Wrath together for maximum burst.
```
#showtooltip Avenging Wrath
/use 13
/cast Avenging Wrath
```

### Ret DPS Opener Sequence
Opens with Seal of Command > Judgement > Crusader Strike. Press once per GCD.
```
#showtooltip
/castsequence reset=combat Seal of Command, Judgement, Crusader Strike
```

### Retribution Aura
Should be active in Ret spec unless fight requires a resistance aura.
```
#showtooltip Retribution Aura
/cast Retribution Aura
```

---

## PvP Macros <a name="pvp-macros"></a>

### Hammer of Justice — Focus Target
Stuns your focus target without changing your current target.
```
#showtooltip Hammer of Justice
/stopcasting
/cast [target=focus,harm,nodead] Hammer of Justice
```

### Hammer of Justice — Arena 1/2/3
```
#showtooltip Hammer of Justice
/cast [target=arena1] Hammer of Justice
```
```
#showtooltip Hammer of Justice
/cast [target=arena2] Hammer of Justice
```
```
#showtooltip Hammer of Justice
/cast [target=arena3] Hammer of Justice
```

### Repentance — Focus (Retribution Talent)
6-second incapacitate CC on focus target. Any damage breaks it.
```
#showtooltip Repentance
/stopcasting
/cast [target=focus,harm,nodead] Repentance; [harm,nodead] Repentance
```

### Repentance — Arena 1/2/3
```
#showtooltip Repentance
/cast [target=arena1] Repentance
```
```
#showtooltip Repentance
/cast [target=arena2] Repentance
```
```
#showtooltip Repentance
/cast [target=arena3] Repentance
```

### Blessing of Freedom — Arena Targets
```
#showtooltip Blessing of Freedom
/cast [target=arena1,help,nodead] Blessing of Freedom
```
```
#showtooltip Blessing of Freedom
/cast [target=arena2,help,nodead] Blessing of Freedom
```
```
#showtooltip Blessing of Freedom
/cast [target=arena3,help,nodead] Blessing of Freedom
```

### Blessing of Freedom — Party Targets
```
#showtooltip Blessing of Freedom
/cast [target=party1] Blessing of Freedom
```
```
#showtooltip Blessing of Freedom
/cast [target=party2] Blessing of Freedom
```

### Trinket + Divine Shield — Panic Button
Breaks CC with PvP trinket, then bubbles for full immunity.
```
#showtooltip Divine Shield
/use 13
/cast Divine Shield
```

### Trinket + Blessing of Freedom — Break Snare
Breaks CC with trinket and immediately frees movement.
```
#showtooltip Blessing of Freedom
/use 13
/cast [target=player] Blessing of Freedom
```

### Cleanse — Arena Partners
Cleanse your arena party members directly.
```
#showtooltip Cleanse
/cast [target=party1] Cleanse
```
```
#showtooltip Cleanse
/cast [target=party2] Cleanse
```

### Turn Evil — Focus
Fear Undead/Demon focus target.
```
#showtooltip Turn Evil
/cast [target=focus,harm,nodead] Turn Evil; [harm,nodead] Turn Evil
```

---

## Utility & Quality of Life <a name="utility-macros"></a>

### Resurrection — Mouseover
```
#showtooltip Redemption
/cast [target=mouseover,help,dead] Redemption; [help,dead] Redemption
```

### Mount Macro
Uses flying mount in flyable zones, ground mount otherwise. Replace names with your mounts.
```
#showtooltip
/cast [flyable] Swift Purple Gryphon; Black War Tiger
```
*(Replace mount names with your actual mounts)*

### Cancel Aura — Divine Shield (Bubble Cancel)
Removes your bubble. Useful when you need to attack or taunt immediately after surviving a burst.
```
#showtooltip
/cancelaura Divine Shield
/cancelaura Divine Protection
```

### Attack + Cancel Bubble
Cancels bubble and starts attacking in one press. For Ret/Prot after a defensive bubble.
```
#showtooltip
/cancelaura Divine Shield
/startattack
```

### Righteous Fury Reminder
Prints a reminder in chat and casts Righteous Fury. Bind this to a visible bar for Prot.
```
#showtooltip Righteous Fury
/cast Righteous Fury
/script if not GetShapeshiftFormInfo(1) then print("RF is OFF!") end
```

### Crusader Aura — Mount Speed
Swap to Crusader Aura for 20% mounted speed bonus before mounting.
```
#showtooltip
/cast Crusader Aura
/cast [flyable] Swift Purple Gryphon; Black War Tiger
```
*(Replace mount names with your actual mounts)*

### Sense Undead Toggle
```
#showtooltip Sense Undead
/cast Sense Undead
```

### Auto-Attack Start/Stop
For pulling without using mana. Right-click = stop attack.
```
#showtooltip
/startattack [button:1]
/stopattack [button:2]
```

### Hearthstone
```
#showtooltip Hearthstone
/use Hearthstone
```

---

## Keybinding Recommendations

| Key | Holy | Protection | Retribution |
|-----|------|------------|-------------|
| 1 | Flash of Light (mouseover) | Holy Shield | Crusader Strike |
| 2 | Holy Light (mouseover) | Consecration | Judgement |
| 3 | Holy Shock (mouseover) | Judgement | Seal of Command |
| 4 | Cleanse (mouseover) | Avenger's Shield | Hammer of Wrath |
| 5 | Divine Illumination | Seal of Vengeance | Seal of Blood/Vengeance |
| Q | Judgement | Righteous Defense (mo) | Consecration |
| E | Holy Shock (damage) | Hammer of Justice | Hammer of Justice |
| R | Blessing of Freedom (mo) | Blessing of Freedom | Blessing of Freedom |
| F | Hammer of Justice | Consecration (downrank) | Cleanse (mouseover) |
| G | Lay on Hands | Avenging Wrath | Avenging Wrath |
| Shift+1 | Divine Favor + HL | Trinket + Holy Shield | Trinket + Avenging Wrath |
| Shift+2 | Divine Favor + FoL | Trinket + AW (threat) | Repentance |
| Shift+3 | Trinket + Holy Light | Holy Wrath | Exorcism |
| Shift+4 | Blessing of Light | Exorcism | Retribution Aura |
| Shift+Q | Cleanse (mouseover) | Cleanse (mouseover) | Holy Light (mouseover) |
| Shift+E | Lay on Hands | Lay on Hands | Lay on Hands |
| Mouse5 | Divine Shield | Divine Protection | Divine Shield |
| Mouse4 | Trinket (slot 2) | Trinket (slot 2) | Trinket (slot 2) |

---

## Notes

- **Seal Twisting**: The core mechanic for Retribution DPS in TBC. Cast Seal of Blood (Horde) or Seal of the Martyr (if available), then twist into Seal of Command just before your auto-attack lands. Both seals proc on the same swing, massively increasing damage. This requires precise timing relative to your weapon speed. A swing timer addon (such as WeaponSwingTimer) is essential.
- **Alliance vs Horde Seals**: Alliance Paladins use Seal of Vengeance (stacking DoT, best for sustained single-target and tanking). Horde Paladins use Seal of Blood (flat % weapon damage, best for Ret burst). Replace seal names in macros as appropriate for your faction.
- **Five-Second Rule (5SR)**: After casting a mana-costing spell, your spirit-based mana regeneration is suppressed for 5 seconds. Holy Paladins should batch heals and let mp5 gear carry regen between heal windows. Illumination (Holy talent) refunds 60% base mana cost on critical heals, making crit rating extremely valuable.
- **Illumination and Crit**: With Illumination, every critical Flash of Light or Holy Light refunds a significant portion of its mana cost. Stack crit rating alongside healing power. Divine Favor guarantees a crit every 2 minutes for a free big heal.
- **Divine Illumination**: 50% mana cost reduction for 15 seconds on a 3-minute cooldown. Use during sustained healing phases (Brutallus, Mu'ru) or when mana is critical.
- **Righteous Defense**: This is your taunt. Unlike warrior Taunt, it targets a friendly player and pulls up to 3 mobs attacking them. Always mouseover the player being attacked, not the mob itself.
- **Forbearance Debuff**: Divine Shield, Divine Protection, Lay on Hands, and Blessing of Protection all cause a 1-minute Forbearance debuff preventing use of any of the others. Plan cooldown usage carefully.
- **Righteous Fury**: Prot Paladins must keep Righteous Fury active at all times for the 90% threat bonus to Holy spells. It persists through death but not through respec. Check it after every respec.
- **TBC Anniversary 2026**: Heroism/Bloodlust is now raid-wide. One Shaman covers the entire raid. Plan your Avenging Wrath usage around the 10-minute Sated/Exhaustion debuff window for maximum burst alignment.
- **Consecration Mana Cost**: Consecration is one of the most mana-hungry abilities for Prot Paladins. Use downranked Consecration (Rank 4) during sustained AoE pulls to conserve mana. Save max rank for burst threat on pull.
- **Aura Mastery (Holy Talent)**: Increases the range of all auras to 40 yards. This is a passive talent, not an active ability. Ensure you are specced into it as Holy for raid healing.
- **Judgement of Wisdom / Light**: Coordinate with other Paladins. Only one Judgement type can be active per target. Judgement of Wisdom is generally preferred for mana-intensive fights; Judgement of Light for melee-heavy groups.
