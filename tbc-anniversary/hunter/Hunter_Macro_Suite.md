# Tidekeeper — TBC Anniversary 2026 Hunter Macro Suite
## Complete Macro Collection for Beast Mastery, Marksmanship & Survival

> **Client:** 2.5.5 | **Interface:** 20505 | **Max Macro Length:** 255 characters

---

## Table of Contents
1. [Universal Macros (All Specs)](#universal-macros)
2. [Beast Mastery DPS Macros](#bm-macros)
3. [Marksmanship DPS Macros](#mm-macros)
4. [Survival DPS Macros](#sv-macros)
5. [PvP Macros](#pvp-macros)
6. [Utility & Quality of Life](#utility-macros)

---

## Universal Macros (All Specs) <a name="universal-macros"></a>

### Misdirection — Mouseover on Tank
Casts Misdirection on your mouseover (tank in raid frames), focus target, or pet as fallback.
```
#showtooltip Misdirection
/cast [target=mouseover,help,nodead] Misdirection; [target=focus,help,nodead] Misdirection; [target=pet,nodead] Misdirection
```

### Feign Death
Stops casting, cancels Auto Shot, and immediately Feigns. Essential for threat dumps.
```
#showtooltip Feign Death
/stopcasting
/stopattack
/cast Feign Death
```

### Disengage
Drops you from the threat table. Use after Feign resists or for early pull recovery.
```
#showtooltip Disengage
/cast Disengage
```

### Aspect of the Hawk / Viper Toggle
Left-click cycles Hawk/Viper. Shift = Aspect of the Pack. Ctrl = Aspect of the Cheetah.
```
#showtooltip
/cast [mod:shift] Aspect of the Pack; [mod:ctrl] Aspect of the Cheetah; [stance:1] Aspect of the Viper; Aspect of the Hawk
```
*Note: "stance" numbers depend on your learned order. Test in-game and adjust.*

### Aspect of the Hawk / Viper Simple Toggle
Simpler version without modifier aspects.
```
#showtooltip
/castsequence reset=6 Aspect of the Hawk, Aspect of the Viper
```

### Kill Command
Off the GCD. Fire it every time it lights up. Works alongside other shots.
```
#showtooltip Kill Command
/cast Kill Command
```

### Arcane Shot
```
#showtooltip Arcane Shot
/cast [harm,nodead] Arcane Shot
```

### Multi-Shot
```
#showtooltip Multi-Shot
/cast [harm,nodead] Multi-Shot
```

### Steady Shot
Stops current cast to avoid clipping Auto Shot, then fires Steady Shot and Kill Command together.
```
#showtooltip Steady Shot
/stopcasting
/cast [harm,nodead] Steady Shot
/cast Kill Command
```

### Auto Shot Toggle
Starts or stops Auto Shot. Useful as a dedicated ranged attack / pull button.
```
#showtooltip Auto Shot
/cast !Auto Shot
```

### Pet Attack
Sends your pet to attack your current target. Shift = sends pet to mouseover target.
```
#showtooltip
/petattack [mod:shift,target=mouseover,harm,nodead]; [harm,nodead]
```

### Pet Follow
```
/petfollow
```

### Pet Stay
```
/petstay
```

### Pet Passive
Sets pet to passive and calls it back. Emergency recall.
```
/petpassive
/petfollow
```

### Pet Defensive / Passive Toggle
```
/petdefensive [nomod]
/petpassive [mod:shift]
```

### Hunter's Mark
Marks your target. Mouseover priority for fast tab-marking.
```
#showtooltip Hunter's Mark
/cast [target=mouseover,harm,nodead] Hunter's Mark; [harm,nodead] Hunter's Mark
```

---

## Beast Mastery DPS Macros <a name="bm-macros"></a>

### Bestial Wrath + Kill Command
Pops Bestial Wrath (pet enrage) and fires Kill Command. The BM burst cooldown.
```
#showtooltip Bestial Wrath
/cast Bestial Wrath
/cast Kill Command
```

### Trinket + Bestial Wrath Burst
Uses trinket slot 13, then Bestial Wrath and Kill Command for maximum burst.
```
#showtooltip Bestial Wrath
/use 13
/cast Bestial Wrath
/cast Kill Command
```

### Trinket + Bestial Wrath + Rapid Fire (Full Burst)
All cooldowns at once for BM. Uses both trinket and Rapid Fire with BW.
```
#showtooltip Bestial Wrath
/use 13
/cast Bestial Wrath
/cast Rapid Fire
/cast Kill Command
```

### Intimidation
Pet stuns the target. Works as an interrupt and CC. Requires BM talent.
```
#showtooltip Intimidation
/cast Intimidation
```

### Intimidation on Focus
Stuns your focus target without switching targets.
```
#showtooltip Intimidation
/cast [target=focus,harm,nodead] Intimidation; [harm,nodead] Intimidation
```

### BM Steady Shot Rotation
Fires Steady Shot with Kill Command woven in. The bread-and-butter BM rotation key.
```
#showtooltip Steady Shot
/stopcasting
/cast [harm,nodead] Steady Shot
/cast Kill Command
/script UIErrorsFrame:Clear()
```

### Pet Growl Toggle
Right-click to toggle Growl on/off. Growl should be OFF in raids, ON while soloing.
```
#showtooltip Growl
/petautocasttoggle Growl
```

### Pet Claw
Manually fire Claw. Useful if you take Claw off autocast for focus management.
```
#showtooltip Claw
/cast Claw
```

### Pet Bite
```
#showtooltip Bite
/cast Bite
```

### Pet Gore (Boar)
```
#showtooltip Gore
/cast Gore
```

### Pet Dash / Dive
Sends pet in with a speed boost. Dash for land pets, Dive for wind serpents.
```
/cast Dash
/cast Dive
/petattack
```

---

## Marksmanship DPS Macros <a name="mm-macros"></a>

### Aimed Shot
Long cast, high damage. Weave between Auto Shots.
```
#showtooltip Aimed Shot
/stopcasting
/cast [harm,nodead] Aimed Shot
```

### Aimed Shot + Kill Command
Fires Aimed Shot and attempts Kill Command (off-GCD).
```
#showtooltip Aimed Shot
/stopcasting
/cast [harm,nodead] Aimed Shot
/cast Kill Command
```

### Silencing Shot
Interrupts and locks out a spell school. Essential in PvE and PvP.
```
#showtooltip Silencing Shot
/stopcasting
/cast [harm,nodead] Silencing Shot
```

### Silencing Shot — Focus Target
Interrupts your focus target without changing targets.
```
#showtooltip Silencing Shot
/stopcasting
/cast [target=focus,harm,nodead] Silencing Shot; [harm,nodead] Silencing Shot
```

### Rapid Fire
20% haste for 15 seconds. Major MM cooldown.
```
#showtooltip Rapid Fire
/cast Rapid Fire
```

### Trinket + Rapid Fire
Pops trinket then Rapid Fire for maximum haste stacking.
```
#showtooltip Rapid Fire
/use 13
/cast Rapid Fire
```

### Readiness (MM Talent)
Resets all Hunter cooldowns. Follow with Rapid Fire for a second haste window.
```
#showtooltip Readiness
/cast Readiness
```

### MM Steady Shot
Standard shot with Kill Command woven in.
```
#showtooltip Steady Shot
/stopcasting
/cast [harm,nodead] Steady Shot
/cast Kill Command
/script UIErrorsFrame:Clear()
```

### Multi-Shot (MM)
Cleave shot for AoE. Use on 3+ targets or to break CC intentionally.
```
#showtooltip Multi-Shot
/stopcasting
/cast [harm,nodead] Multi-Shot
/cast Kill Command
```

### Arcane Shot (MM)
Only use in MM when Aimed/Multi/Steady are all on CD, or for kiting.
```
#showtooltip Arcane Shot
/cast [harm,nodead] Arcane Shot
/cast Kill Command
```

### MM 1:1 Rotation Sequence
Alternates Steady Shot and Auto Shot rhythm. Press once per GCD.
```
#showtooltip Steady Shot
/castsequence reset=3 Steady Shot, Auto Shot
```
*Note: Timer-based rotation is preferred over /castsequence. Use a swing timer addon.*

---

## Survival DPS Macros <a name="sv-macros"></a>

### Wyvern Sting
Sleeps the target for 12 seconds. Any damage breaks it. SV 41-point talent.
```
#showtooltip Wyvern Sting
/stopcasting
/cast [harm,nodead] Wyvern Sting
```

### Wyvern Sting — Focus Target
Sleeps your focus target without changing targets.
```
#showtooltip Wyvern Sting
/stopcasting
/cast [target=focus,harm,nodead] Wyvern Sting; [harm,nodead] Wyvern Sting
```

### Raptor Strike (Melee)
Melee-range strike. Use when caught in the dead zone or during melee weaving.
```
#showtooltip Raptor Strike
/stopcasting
/cast Raptor Strike
```

### Raptor Strike + Mongoose Bite Combo
Fires both melee abilities. Mongoose Bite is a proc (requires dodge).
```
#showtooltip Raptor Strike
/stopcasting
/cast Raptor Strike
/cast Mongoose Bite
```

### Mongoose Bite
Only usable after dodging. Fires when available.
```
#showtooltip Mongoose Bite
/cast Mongoose Bite
```

### Counterattack (SV Talent)
Usable after parrying. Root the attacker and strike.
```
#showtooltip Counterattack
/cast Counterattack
```

### SV Steady Shot
Same as universal Steady Shot but listed here for completeness.
```
#showtooltip Steady Shot
/stopcasting
/cast [harm,nodead] Steady Shot
/cast Kill Command
/script UIErrorsFrame:Clear()
```

### SV Multi-Shot
Survival benefits from Expose Weakness procs on all Multi-Shot targets.
```
#showtooltip Multi-Shot
/stopcasting
/cast [harm,nodead] Multi-Shot
/cast Kill Command
```

### Black Arrow (SV — if talented)
*Note: Black Arrow is not available in TBC. Survival uses Wyvern Sting as its 41-point talent.*

### Expose Weakness Note
Expose Weakness is a passive talent (SV tier 7). It procs on crits and grants attack power equal to 25% of your Agility to the entire raid. There is no macro needed — just stack Agility and crit. This is why Survival Hunters are brought to raids.

### Trap: Immolation Trap (SV AoE)
Survival gets bonus trap damage from talents. Drop Immolation Trap for AoE.
```
#showtooltip Immolation Trap
/stopcasting
/cast Immolation Trap
```

### Trap: Explosive Trap (SV AoE)
```
#showtooltip Explosive Trap
/stopcasting
/cast Explosive Trap
```

### Trap Launcher — Feign + Trap
Feign Death then drop a Freezing Trap. The classic "trap dancing" combo.
```
#showtooltip Freezing Trap
/stopcasting
/stopattack
/cast Feign Death
/cast Freezing Trap
```
*Note: You must press this twice — once to Feign, once to Trap — or use a short delay. TBC macros do not support /castsequence with Feign.*

---

## PvP Macros <a name="pvp-macros"></a>

### Scatter Shot
Disorients the target for 4 seconds. Sets up Freezing Trap.
```
#showtooltip Scatter Shot
/stopcasting
/cast [harm,nodead] Scatter Shot
```

### Scatter Shot — Focus Target
```
#showtooltip Scatter Shot
/stopcasting
/cast [target=focus,harm,nodead] Scatter Shot; [harm,nodead] Scatter Shot
```

### Freezing Trap at Feet
Drop Freezing Trap directly at your feet for immediate CC.
```
#showtooltip Freezing Trap
/stopcasting
/cast Freezing Trap
```

### Feign Death + Freezing Trap
Drop combat, then drop Freezing Trap on the incoming enemy.
```
#showtooltip Freezing Trap
/stopcasting
/stopattack
/cast Feign Death
/cast Freezing Trap
```

### Frost Trap at Feet
Slows enemies in melee range. Kiting tool.
```
#showtooltip Frost Trap
/stopcasting
/cast Frost Trap
```

### Silencing Shot on Focus
Interrupt your focus target without swapping.
```
#showtooltip Silencing Shot
/stopcasting
/cast [target=focus,harm,nodead] Silencing Shot
```

### Viper Sting on Focus
Mana drain on the enemy healer (focus).
```
#showtooltip Viper Sting
/stopcasting
/cast [target=focus,harm,nodead] Viper Sting
```

### Viper Sting — Arena Targets
```
#showtooltip Viper Sting
/cast [target=arena1] Viper Sting
```
```
#showtooltip Viper Sting
/cast [target=arena2] Viper Sting
```
```
#showtooltip Viper Sting
/cast [target=arena3] Viper Sting
```

### Wing Clip
Snares melee attackers. Spam in melee range while kiting.
```
#showtooltip Wing Clip
/stopcasting
/cast Wing Clip
```

### Wing Clip + Disengage Combo
Snare the target and immediately Disengage for separation.
```
#showtooltip Wing Clip
/stopcasting
/cast Wing Clip
/cast Disengage
```

### Arena Target — Arcane Shot
```
#showtooltip Arcane Shot
/cast [target=arena1] Arcane Shot
```
```
#showtooltip Arcane Shot
/cast [target=arena2] Arcane Shot
```
```
#showtooltip Arcane Shot
/cast [target=arena3] Arcane Shot
```

### Trinket + Bestial Wrath (PvP)
PvP trinket (slot 14) breaks CC, then Bestial Wrath for pet immunity.
```
#showtooltip
/use 14
/cast Bestial Wrath
/cast Kill Command
```

### Trinket + Scatter Shot (PvP)
Break CC and immediately Scatter the attacker.
```
#showtooltip
/use 14
/stopcasting
/cast Scatter Shot
```

### Concussive Shot — Focus
Daze your focus target to slow them.
```
#showtooltip Concussive Shot
/cast [target=focus,harm,nodead] Concussive Shot; [harm,nodead] Concussive Shot
```

### Set Focus
Sets your current target as your focus.
```
/focus [harm,nodead]
```

### Clear Focus
```
/clearfocus
```

---

## Utility & Quality of Life <a name="utility-macros"></a>

### Freezing Trap
```
#showtooltip Freezing Trap
/stopcasting
/cast Freezing Trap
```

### Frost Trap
```
#showtooltip Frost Trap
/stopcasting
/cast Frost Trap
```

### Explosive Trap
```
#showtooltip Explosive Trap
/stopcasting
/cast Explosive Trap
```

### Immolation Trap
```
#showtooltip Immolation Trap
/stopcasting
/cast Immolation Trap
```

### Snake Trap
```
#showtooltip Snake Trap
/stopcasting
/cast Snake Trap
```

### Flare
Reveals stealth. Drop it on objectives or predicted stealth paths.
```
#showtooltip Flare
/cast Flare
```

### Track Beasts / Humanoids Toggle
Modifier switches tracking type. Default = Humanoids (PvP), Shift = Beasts.
```
#showtooltip
/cast [mod:shift] Track Beasts; Track Humanoids
```

### Track All (Cycle)
Cycle through common tracking types with modifiers.
```
#showtooltip
/cast [mod:shift] Track Undead; [mod:ctrl] Track Demons; [mod:alt] Track Elementals; Track Humanoids
```

### Track Hidden
For finding stealthed Rogues and Druids in PvP.
```
#showtooltip Track Hidden
/cast Track Hidden
```

### Mount Macro
Uses fastest available mount. Flying if in Outland, ground otherwise.
```
#showtooltip
/cast [flyable] Swift Purple Gryphon; Black War Tiger
```
*(Replace mount names with your actual mounts.)*

### Pet Dismiss / Call Pet Toggle
Dismiss your pet if it is out, call it if it is dismissed.
```
#showtooltip
/cast [pet] Dismiss Pet; Call Pet
```

### Revive Pet / Mend Pet
Revive if pet is dead, Mend Pet if alive.
```
#showtooltip
/cast [target=pet,dead] Revive Pet; Mend Pet
```

### Mend Pet — Spammable
Will not clip the existing Mend Pet HoT.
```
#showtooltip Mend Pet
/cast [target=pet,exists,nodead] Mend Pet
```

### Eyes of the Beast
Take control of your pet. Fun for scouting or pulling.
```
#showtooltip Eyes of the Beast
/cast Eyes of the Beast
```

### Aspect of the Pack Toggle
Toggle Pack on/off. Announce to the raid so people know.
```
#showtooltip Aspect of the Pack
/cast Aspect of the Pack
/s Aspect of the Pack toggled.
```

### Feed Pet
Opens your bags and feeds the pet. Replace "Roasted Clefthoof" with your food.
```
#showtooltip
/cast Feed Pet
/use Roasted Clefthoof
```
*(Replace food name with your pet's preferred food.)*

### Eagle Eye
Scout distant terrain without moving.
```
#showtooltip Eagle Eye
/cast Eagle Eye
```

### Scorpid Sting — Mouseover
Reduces enemy chance to hit. Useful on boss melee attacks.
```
#showtooltip Scorpid Sting
/cast [target=mouseover,harm,nodead] Scorpid Sting; [harm,nodead] Scorpid Sting
```

### Tranquilizing Shot
Removes enrage effects from bosses.
```
#showtooltip Tranquilizing Shot
/cast [harm,nodead] Tranquilizing Shot
```

### Bandage Self
Stop everything and bandage yourself.
```
#showtooltip Heavy Netherweave Bandage
/stopcasting
/stopattack
/cast [target=player] Heavy Netherweave Bandage
```
*(Replace with your highest bandage rank.)*

---

## Keybinding Recommendations

| Key | Beast Mastery | Marksmanship | Survival |
|-----|--------------|--------------|----------|
| 1 | Steady Shot | Steady Shot | Steady Shot |
| 2 | Arcane Shot | Aimed Shot | Arcane Shot |
| 3 | Multi-Shot | Multi-Shot | Multi-Shot |
| 4 | Kill Command | Silencing Shot | Wyvern Sting |
| 5 | Bestial Wrath | Rapid Fire | Raptor Strike |
| Q | Misdirection (mo) | Misdirection (mo) | Misdirection (mo) |
| E | Concussive Shot | Concussive Shot | Concussive Shot |
| R | Scatter Shot | Scatter Shot | Scatter Shot |
| F | Feign Death | Feign Death | Feign Death |
| G | Intimidation | Silencing Shot (focus) | Mongoose Bite |
| X | Wing Clip | Wing Clip | Wing Clip |
| Z | Aspect Toggle | Aspect Toggle | Aspect Toggle |
| T | Hunter's Mark | Hunter's Mark | Hunter's Mark |
| V | Freezing Trap | Freezing Trap | Freezing Trap |
| Shift+1 | Trinket + BW Burst | Trinket + Rapid Fire | Steady + KC |
| Shift+2 | Pet Attack | Arcane Shot | Counterattack |
| Shift+3 | Mend Pet | Readiness | Explosive Trap |
| Shift+4 | Intimidation (focus) | Multi-Shot | Immolation Trap |
| Shift+F | FD + Freeze Trap | FD + Freeze Trap | FD + Freeze Trap |
| Mouse5 | Trinket 1 (/use 13) | Trinket 1 (/use 13) | Trinket 1 (/use 13) |
| Mouse4 | Trinket 2 (/use 14) | Trinket 2 (/use 14) | Trinket 2 (/use 14) |
| ` (Tilde) | Pet Follow / Passive | Pet Follow / Passive | Pet Follow / Passive |

---

## Notes

- **Shot Rotation Weaving (1:1 and 3:2)**: TBC Hunter DPS revolves around weaving Steady Shot between Auto Shots without clipping. The 1:1 rotation (one Steady per Auto) is standard with fast weapons. The 3:2 rotation (3 Steadies per 2 Autos) applies with slower weapons. Use a swing timer addon (Quartz, SorrentoAutoShotTimer) to see when your next Auto fires. Never clip your Auto Shot.
- **Steady Shot Timer**: Steady Shot has a 1.5s cast time (affected by haste). Your goal is to press Steady Shot immediately after your Auto Shot fires and have it finish before the next Auto Shot. This is the core Hunter skill in TBC.
- **Kill Command Off-GCD**: Kill Command is off the global cooldown. Macro it into every shot macro so it fires automatically whenever your pet crits. There is no reason not to press it constantly.
- **Dead Zone**: TBC Hunters have a dead zone between 0-8 yards (melee) and 8+ yards (ranged). Between approximately 5-8 yards you cannot use melee OR ranged abilities. Use Wing Clip and movement to escape this zone. Practice jumping and spinning to Scatter Shot or Concussive Shot pursuers.
- **Pet Management**: Always dismiss your pet before jumping down ledges or taking shortcuts in dungeons — pets will path through extra packs. Use Eyes of the Beast to pull carefully. Set Growl to autocast OFF in groups/raids. Feed your pet to keep it happy (affects damage).
- **Trap Dancing**: In TBC, traps can only be placed out of combat. To re-trap a target mid-fight, you must Feign Death to drop combat, then place a new trap. The macro fires Feign Death first, then you press again for the trap. This requires practice and timing.
- **Misdirection**: Has a 30-second cooldown and gives your next 3 attacks' threat to the target. Always open with MD on the tank, especially in raids. MD + Multi-Shot + Arcane Shot is a strong threat dump onto the tank.
- **Aspect Management**: Aspect of the Hawk is your default DPS aspect. Switch to Aspect of the Viper when below 20-30% mana. Never leave Viper on longer than necessary — it reduces your damage. Aspect of the Pack gives group movement speed but dazes everyone if hit; toggle it off before combat.
- **TBC Anniversary 2026**: Heroism/Bloodlust is now raid-wide. A single Shaman covers the entire 25-man raid. Plan your Bestial Wrath and Rapid Fire cooldowns around the Heroism timing. The 10-minute Sated/Exhaustion debuff means one use per major phase — coordinate with your raid leader.
- **Expose Weakness (Survival)**: This passive procs on your crits and grants 25% of your Agility as attack power to your entire raid. This is the reason Survival Hunters are brought to raids in T4/T5 content. Stack Agility and crit rating.
- **Tranquilizing Shot**: Required for specific boss mechanics (e.g., Magtheridon, Gruul adds). Keep it keybound or easily accessible.
- **Feign Death Resist**: Feign Death can be resisted. If it resists, you are still in combat and cannot trap. Wait for the cooldown and try again, or have a backup plan.
- **Pet Abilities**: Different pet families have different abilities. Ravagers (Gore), Cats (Claw+Bite), Wind Serpents (Lightning Breath) are common raid pets. For BM, use a DPS pet. For Survival, pet choice matters less since your personal DPS and Expose Weakness are the priority.
