# Tidekeeper — TBC Anniversary 2026 Druid Macro Suite
## Complete Macro Collection for Restoration, Balance, Feral Cat & Feral Bear

> **Client:** 2.5.5 | **Interface:** 20505 | **Max Macro Length:** 255 characters

---

## Table of Contents
1. [Universal Macros (All Specs)](#universal-macros)
2. [Restoration Healing Macros](#restoration-macros)
3. [Balance DPS Macros](#balance-macros)
4. [Feral Cat DPS Macros](#feral-cat-macros)
5. [Feral Bear Tanking Macros](#feral-bear-macros)
6. [PvP Macros](#pvp-macros)
7. [Utility & Quality of Life](#utility-macros)

---

## Universal Macros (All Specs) <a name="universal-macros"></a>

### Remove Curse — Mouseover
Decurses mouseover target, or current target, or self.
```
#showtooltip Remove Curse
/cast [target=mouseover,help,nodead] Remove Curse; [help,nodead] Remove Curse; [target=player] Remove Curse
```

### Abolish Poison — Mouseover
```
#showtooltip Abolish Poison
/cast [target=mouseover,help,nodead] Abolish Poison; [help,nodead] Abolish Poison; [target=player] Abolish Poison
```

### Mark of the Wild — Modifier for Gift
Shift = Gift of the Wild (group), default = Mark of the Wild (single). Targets mouseover > target > self.
```
#showtooltip [mod:shift] Gift of the Wild; Mark of the Wild
/cast [mod:shift,target=mouseover,help] Gift of the Wild; [mod:shift] Gift of the Wild; [target=mouseover,help] Mark of the Wild; [help] Mark of the Wild; [target=player] Mark of the Wild
```

### Thorns — Mouseover
```
#showtooltip Thorns
/cast [target=mouseover,help,nodead] Thorns; [help,nodead] Thorns; [target=player] Thorns
```

### Innervate — Mouseover
Innervate mouseover > target > self. Use on yourself or a healer during mana-intensive phases.
```
#showtooltip Innervate
/cast [target=mouseover,help,nodead] Innervate; [help,nodead] Innervate; [target=player] Innervate
```

### Rebirth — Battle Rez
Combat resurrection. Mouseover priority for fast rezzing mid-fight.
```
#showtooltip Rebirth
/cast [target=mouseover,help,dead] Rebirth; [help,dead] Rebirth
```

### Faerie Fire — All Forms
Caster form Faerie Fire on hostile target. In Bear/Cat, use Feral Faerie Fire instead (see spec sections).
```
#showtooltip Faerie Fire
/cast [harm,nodead] Faerie Fire
```

### Cyclone — Stopcasting
Interrupts current cast to Cyclone immediately.
```
#showtooltip Cyclone
/stopcasting
/cast [harm,nodead] Cyclone
```

---

## Restoration Healing Macros <a name="restoration-macros"></a>

### Lifebloom — Mouseover
Stack to 3 on the tank. Let the final bloom proc for the heal + mana return.
```
#showtooltip Lifebloom
/cast [target=mouseover,help,nodead] Lifebloom; [help,nodead] Lifebloom; [target=player] Lifebloom
```

### Rejuvenation — Mouseover
```
#showtooltip Rejuvenation
/cast [target=mouseover,help,nodead] Rejuvenation; [help,nodead] Rejuvenation; [target=player] Rejuvenation
```

### Regrowth — Mouseover
```
#showtooltip Regrowth
/cast [target=mouseover,help,nodead] Regrowth; [help,nodead] Regrowth; [target=player] Regrowth
```

### Swiftmend — Mouseover
Consumes a Rejuvenation or Regrowth HoT for an instant heal. Requires the HoT on the target.
```
#showtooltip Swiftmend
/cast [target=mouseover,help,nodead] Swiftmend; [help,nodead] Swiftmend; [target=player] Swiftmend
```

### Nature's Swiftness + Healing Touch
Pops NS then starts an instant Healing Touch. The emergency button.
```
#showtooltip Healing Touch
/cast Nature's Swiftness
/cast [target=mouseover,help,nodead] Healing Touch; [help,nodead] Healing Touch; [target=player] Healing Touch
```

### Healing Touch — Mouseover
Standard cast for large heals outside of NS.
```
#showtooltip Healing Touch
/cast [target=mouseover,help,nodead] Healing Touch; [help,nodead] Healing Touch; [target=player] Healing Touch
```

### Tranquility
Channel AoE heal. No target needed — heals your party.
```
#showtooltip Tranquility
/cast Tranquility
```

### Tree of Life Form Toggle
```
#showtooltip Tree of Life
/cast Tree of Life
```

### Emergency NS + Trinket + Healing Touch
Full panic button: trinket + Nature's Swiftness + instant Healing Touch.
```
#showtooltip Healing Touch
/use 13
/cast Nature's Swiftness
/cast [target=mouseover,help,nodead] Healing Touch; [help,nodead] Healing Touch; [target=player] Healing Touch
```

### Healing Touch Downranking
Shift = max rank, default = Rank 3 (efficient downrank for 5SR management).
```
#showtooltip
/cast [mod:shift,target=mouseover,help] Healing Touch; [mod:shift] Healing Touch; [target=mouseover,help] Healing Touch(Rank 3); [help] Healing Touch(Rank 3); [target=player] Healing Touch(Rank 3)
```

---

## Balance DPS Macros <a name="balance-macros"></a>

### Starfire
```
#showtooltip Starfire
/cast [harm,nodead] Starfire
```

### Wrath
```
#showtooltip Wrath
/cast [harm,nodead] Wrath
```

### Moonfire
```
#showtooltip Moonfire
/cast [harm,nodead] Moonfire
```

### Insect Swarm
```
#showtooltip Insect Swarm
/cast [harm,nodead] Insect Swarm
```

### Force of Nature (Treants)
Summons treants at cursor location.
```
#showtooltip Force of Nature
/cast Force of Nature
```

### Moonkin Form Toggle
```
#showtooltip Moonkin Form
/cast Moonkin Form
```

### Hurricane
AoE channel at cursor location.
```
#showtooltip Hurricane
/cast Hurricane
```

### Balance DPS Opener
Start fight with IS > MF > Starfire sequence. Press once per spell.
```
#showtooltip
/castsequence reset=combat Insect Swarm, Moonfire, Starfire
```

### Cancel Moonkin + Emergency Heal
Drops Moonkin Form and casts an instant NS + Healing Touch on mouseover.
```
#showtooltip Healing Touch
/cancelaura Moonkin Form
/cast Nature's Swiftness
/cast [target=mouseover,help,nodead] Healing Touch; [help,nodead] Healing Touch; [target=player] Healing Touch
```

### Cancel Moonkin + Rebirth
Drop form and battle rez in one button.
```
#showtooltip Rebirth
/cancelaura Moonkin Form
/cast [target=mouseover,help,dead] Rebirth; [help,dead] Rebirth
```

### Cancel Moonkin + Innervate
Drop form and Innervate a healer without losing time.
```
#showtooltip Innervate
/cancelaura Moonkin Form
/cast [target=mouseover,help,nodead] Innervate; [help,nodead] Innervate; [target=player] Innervate
```

---

## Feral Cat DPS Macros <a name="feral-cat-macros"></a>

### Powershifting Macro
Cancel Cat Form and re-enter for a fresh energy tick (Wolfshead Helm synergy). Requires Furor talent.
```
#showtooltip Cat Form
/cancelaura Cat Form
/cast Cat Form
```

### Mangle (Cat)
```
#showtooltip Mangle (Cat)()
/cast [harm,nodead] Mangle (Cat)()
```

### Shred
Must be behind the target.
```
#showtooltip Shred
/cast [harm,nodead] Shred
```

### Rip
Finishing move bleed. Use at 5 combo points.
```
#showtooltip Rip
/cast [harm,nodead] Rip
```

### Ferocious Bite
Finishing move direct damage. Use for execute range or when Rip is already up.
```
#showtooltip Ferocious Bite
/cast [harm,nodead] Ferocious Bite
```

### Tiger's Fury
Off-GCD energy boost. Use when below 40 energy.
```
#showtooltip Tiger's Fury
/cast Tiger's Fury
```

### Dash
Sprint in Cat Form.
```
#showtooltip Dash
/cast Dash
```

### Prowl — Stealth Toggle
```
#showtooltip Prowl
/cast [nostealth] Prowl
```

### Ravage (Stealth Opener)
High damage opener from Prowl. Must be behind the target.
```
#showtooltip Ravage
/cast [stealth,harm,nodead] Ravage
```

### Pounce (Stealth Stun)
Stun opener from Prowl. Use for interrupts or CC.
```
#showtooltip Pounce
/cast [stealth,harm,nodead] Pounce
```

### Maim
Finishing move incapacitate. PvP/interrupt utility.
```
#showtooltip Maim
/cast [harm,nodead] Maim
```

### Cat Form — Feral Faerie Fire
Armor debuff usable in feral forms. Maintains the debuff without leaving Cat.
```
#showtooltip Faerie Fire (Feral)()
/cast [harm,nodead] Faerie Fire (Feral)()
```

### Cat DPS Opener
Prowl opener sequence: Pounce > Mangle > Shred. Press once per ability.
```
#showtooltip
/castsequence reset=combat Pounce, Mangle (Cat)(), Shred
```

### Cower
Emergency threat dump in Cat Form.
```
#showtooltip Cower
/cast Cower
```

---

## Feral Bear Tanking Macros <a name="feral-bear-macros"></a>

### Dire Bear Form
```
#showtooltip Dire Bear Form
/cast Dire Bear Form
```

### Mangle (Bear)
Primary threat generator and debuff applier.
```
#showtooltip Mangle (Bear)()
/cast [harm,nodead] Mangle (Bear)()
```

### Lacerate
Stacking bleed debuff. Maintain at 5 stacks.
```
#showtooltip Lacerate
/cast [harm,nodead] Lacerate
```

### Maul — Next Swing Queue
Queues Maul on your next melee swing. Burns excess rage for threat.
```
#showtooltip Maul
/cast [harm,nodead] Maul
```

### Swipe
AoE threat. Spam on multi-target pulls.
```
#showtooltip Swipe
/cast [harm,nodead] Swipe
```

### Growl — Taunt
Forces the target to attack you. Use on targets attacking healers.
```
#showtooltip Growl
/cast [harm,nodead] Growl
```

### Feral Charge
Charge and interrupt a target. 8-25 yard range.
```
#showtooltip Feral Charge
/cast [harm,nodead] Feral Charge
```

### Bash — Interrupt
Stun the target. Primary interrupt in Bear Form.
```
#showtooltip Bash
/cast [harm,nodead] Bash
```

### Frenzied Regeneration
Converts rage to health over time. Use as a defensive cooldown.
```
#showtooltip Frenzied Regeneration
/cast Frenzied Regeneration
```

### Enrage
Generates rage at the cost of reduced armor. Use on pull or when rage-starved.
```
#showtooltip Enrage
/cast Enrage
```

### Demoralizing Roar
AoE attack power debuff. Maintain on boss fights.
```
#showtooltip Demoralizing Roar
/cast Demoralizing Roar
```

### Bear — Feral Faerie Fire
Armor debuff usable in Bear Form. Keep up on bosses for physical DPS benefit.
```
#showtooltip Faerie Fire (Feral)()
/cast [harm,nodead] Faerie Fire (Feral)()
```

### Mangle + Maul Queue
Casts Mangle and queues Maul on the same press. High threat combo for single target.
```
#showtooltip Mangle (Bear)()
/cast [harm,nodead] Mangle (Bear)()
/cast [harm,nodead] Maul
```

### Bear Panic Button — Barkskin + Frenzied Regen
Stack both defensive cooldowns at once.
```
#showtooltip Frenzied Regeneration
/cast Barkskin
/cast Frenzied Regeneration
```

### Challenging Roar
AoE taunt. Emergency button for loose adds.
```
#showtooltip Challenging Roar
/cast Challenging Roar
```

---

## PvP Macros <a name="pvp-macros"></a>

### Cyclone — Focus Target
CC your focus target without switching. Core arena macro.
```
#showtooltip Cyclone
/stopcasting
/cast [target=focus,harm,nodead] Cyclone
```

### Bash — Focus Target
Stun your focus target from Bear Form.
```
#showtooltip Bash
/cast [target=focus,harm,nodead] Bash; [harm,nodead] Bash
```

### Nature's Grasp
Self-buff root proc. Use before enemies reach you.
```
#showtooltip Nature's Grasp
/cast Nature's Grasp
```

### Entangling Roots — Focus
Root focus target or current target.
```
#showtooltip Entangling Roots
/stopcasting
/cast [target=focus,harm,nodead] Entangling Roots; [harm,nodead] Entangling Roots
```

### Trinket + Travel Form
Break CC and shift to Travel Form for escape.
```
#showtooltip
/use 13
/cast [outdoors] Travel Form
```

### Feral Charge — Focus
Charge and interrupt your focus target from Bear.
```
#showtooltip Feral Charge
/cast [target=focus,harm,nodead] Feral Charge; [harm,nodead] Feral Charge
```

### Arena Target — Cyclone (1/2/3)
```
#showtooltip Cyclone
/cast [target=arena1] Cyclone
```
```
#showtooltip Cyclone
/cast [target=arena2] Cyclone
```
```
#showtooltip Cyclone
/cast [target=arena3] Cyclone
```

### Arena Target — Moonfire (1/2/3)
Instant pressure and stealth prevention on arena targets.
```
#showtooltip Moonfire
/cast [target=arena1] Moonfire
```
```
#showtooltip Moonfire
/cast [target=arena2] Moonfire
```
```
#showtooltip Moonfire
/cast [target=arena3] Moonfire
```

### Abolish Poison — Arena Partner
Quick cleanse on arena partner (party1).
```
#showtooltip Abolish Poison
/cast [target=party1,help,nodead] Abolish Poison
```

### Hibernate — Focus
Crowd control on Druid or Beast focus target.
```
#showtooltip Hibernate
/stopcasting
/cast [target=focus,harm,nodead] Hibernate; [harm,nodead] Hibernate
```

---

## Utility & Quality of Life <a name="utility-macros"></a>

### Mount Macro — Flying or Ground
Uses flying mount in flyable zones, ground mount otherwise.
```
#showtooltip
/cast [flyable] Swift Flight Form; [outdoors] Dire Bear Form
```
*(Replace Dire Bear Form with your ground mount name, e.g. `Epic Riding Crop` or `Swift Stormsaber`)*

### Flight Form / Travel Form Combo
Flight Form in flyable zones, Travel Form outdoors, Cat Form indoors.
```
#showtooltip
/cast [flyable] Swift Flight Form; [outdoors] Travel Form; Cat Form
```

### Smart Mount — Flight Form or Ground Mount
```
#showtooltip
/cast [flyable] Swift Flight Form; [outdoors,nomounted] Black War Tiger
```
*(Replace `Black War Tiger` with your actual ground mount)*

### Cancel Form — Return to Caster
Drops any shapeshift form to return to caster for healing/buffing.
```
#showtooltip
/cancelaura Cat Form
/cancelaura Dire Bear Form
/cancelaura Moonkin Form
/cancelaura Tree of Life
/cancelaura Travel Form
```

### Cancel Form + Heal Self
Emergency self-heal from any form.
```
#showtooltip Healing Touch
/cancelaura Cat Form
/cancelaura Dire Bear Form
/cancelaura Moonkin Form
/cast Nature's Swiftness
/cast [target=player] Healing Touch
```

### Form-Aware Attack — Auto Attack
Start attacking without needing to be in the right form.
```
#showtooltip
/startattack [harm,nodead]
```

### Cat Form from Any Form
Shift directly to Cat Form from any other form.
```
#showtooltip Cat Form
/cancelaura Dire Bear Form
/cancelaura Travel Form
/cancelaura Moonkin Form
/cast Cat Form
```

### Bear Form from Any Form
Shift directly to Dire Bear Form from any other form.
```
#showtooltip Dire Bear Form
/cancelaura Cat Form
/cancelaura Travel Form
/cancelaura Moonkin Form
/cast Dire Bear Form
```

### Wand / Melee Attack Toggle
Right-click = Shoot (wand in caster), left-click = auto-attack.
```
#showtooltip [button:2] Shoot; Attack
/cast [button:2] Shoot
/startattack [button:1,harm,nodead]
```

### Barkskin — All Forms
Usable in all forms. 20% damage reduction for 12 seconds.
```
#showtooltip Barkskin
/cast Barkskin
```

---

## Keybinding Recommendations

| Key | Restoration | Balance | Feral Cat | Feral Bear |
|-----|-------------|---------|-----------|------------|
| 1 | Lifebloom (mo) | Starfire | Mangle (Cat) | Mangle (Bear) |
| 2 | Rejuvenation (mo) | Wrath | Shred | Lacerate |
| 3 | Regrowth (mo) | Moonfire | Rip | Swipe |
| 4 | Swiftmend (mo) | Insect Swarm | Ferocious Bite | Maul |
| 5 | Healing Touch (mo) | Force of Nature | Rake / Maim | Bash |
| Q | NS + HT (panic) | Hurricane | Powershifting | Feral Charge |
| E | Remove Curse (mo) | Cancel MF + Heal | Feral Faerie Fire | Feral Faerie Fire |
| R | Abolish Poison (mo) | Faerie Fire | Prowl | Growl |
| F | Cyclone | Cyclone | Dash | Demoralizing Roar |
| G | Barkskin | Barkskin | Barkskin | Barkskin |
| Z | Innervate (mo) | Innervate (mo) | Cower | Enrage |
| X | Tranquility | Cancel MF + Brez | Tiger's Fury | Frenzied Regen |
| Shift+1 | Tree of Life | Moonkin Form | Cat Form toggle | Dire Bear Form |
| Shift+2 | HT Downrank (mo) | Balance Opener | Cat Opener | Mangle + Maul |
| Shift+3 | Emergency NS+Trinket | Cancel MF + Innerv | Ravage (stealth) | Bear Panic |
| Shift+4 | Rebirth (mo) | Rebirth (mo) | Pounce (stealth) | Challenging Roar |
| Mouse5 | Trinket 1 | Trinket 1 | Trinket 1 | Trinket 1 |
| Mouse4 | Trinket 2 | Trinket 2 | Trinket 2 | Trinket 2 |
| Ctrl+F | Travel/Flight Form | Travel/Flight Form | Travel/Flight Form | Travel/Flight Form |

*(mo = mouseover, MF = Moonkin Form, HT = Healing Touch, NS = Nature's Swiftness)*

---

## Notes

- **Powershifting**: Cancelling Cat Form and re-entering gives you a fresh energy tick (40 energy base, 60 with Furor). Combined with Wolfshead Helm (+20 energy on shift), this yields 80 energy per powershift. This is a core Feral DPS technique in TBC and should be used whenever energy-starved.
- **Five-Second Rule (5SR)**: Your spirit-based mana regeneration begins 5 seconds after your last mana-costing spell. Resto Druids exploit this by front-loading HoTs (Lifebloom, Rejuvenation) then letting the 5SR tick before casting again. This is the foundation of efficient Resto Druid healing.
- **Lifebloom Stacking**: Stack Lifebloom to 3 on the tank, then let it bloom (expire) for the large heal and 50% mana refund. Rolling Lifebloom indefinitely (refreshing at 3 stacks) is mana-efficient for sustained tank healing but sacrifices the bloom heal. Know when to let it bloom vs. roll it.
- **TBC Anniversary 2026**: Heroism/Bloodlust is now raid-wide. One Shaman covers the entire raid. Plan your Innervate usage around the Heroism window to maximize throughput during burn phases. The 10-minute Sated/Exhaustion debuff means one use per major phase.
- **Tree of Life**: Reduces mana cost of HoTs by 20% and increases healing received by party members within range. You cannot cast non-HoT heals (no Healing Touch, Regrowth, or Swiftmend outside of talented procs). Plan your NS + HT before entering Tree Form or cancel Tree Form for emergency direct heals.
- **Moonkin Form**: Provides 5% spell crit aura to your party. You cannot cast healing spells in Moonkin Form. Use the Cancel Moonkin macros above for emergency heals, Rebirth, or Innervate.
- **Feral Faerie Fire**: Usable in Cat and Bear forms without breaking form. Provides the same armor reduction as caster Faerie Fire. Keep this debuff up on bosses at all times for the benefit of all physical DPS.
- **Mangle Debuff**: Increases bleed damage by 30%. In Cat, this benefits your Rip and Rake. In Bear, it benefits Lacerate and any Rogue/Warrior bleeds. Maintain this debuff at all times.
- **Barkskin**: Usable in all forms and while stunned. Always bind this accessibly as it is your only universal defensive cooldown.
- **Rebirth**: 20-minute cooldown combat resurrection. Coordinate with other Druids in the raid. In TBC Anniversary raids, having one Druid hold Rebirth for a healer death is standard practice.
- **Innervate**: 6-minute cooldown. In Resto, use on yourself during heavy healing phases. As Balance or Feral, coordinate with your healers to Innervate a healer when called for.
