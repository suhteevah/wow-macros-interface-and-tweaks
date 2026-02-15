# Tidekeeper — TBC Anniversary 2026 Warrior Macro Suite
## Complete Macro Collection for Arms, Fury & Protection

> **Client:** 2.5.5 | **Interface:** 20505 | **Max Macro Length:** 255 characters

---

## Table of Contents
1. [Universal Macros (All Specs)](#universal-macros)
2. [Arms DPS Macros](#arms-macros)
3. [Fury DPS Macros](#fury-macros)
4. [Protection Tanking Macros](#protection-macros)
5. [PvP Macros](#pvp-macros)
6. [Utility & Quality of Life](#utility-macros)

---

## Universal Macros (All Specs) <a name="universal-macros"></a>

### Charge / Intercept Stance Dance
Enters Battle Stance and Charges if out of combat. Enters Berserker Stance and Intercepts if in combat.
```
#showtooltip [nocombat] Charge; Intercept
/cast [nocombat,nostance:1] Battle Stance; [nocombat] Charge; [nostance:3] Berserker Stance; Intercept
```

### Pummel — Berserker Stance Dance
Swaps to Berserker Stance and Pummels. If already in Berserker Stance, just Pummels.
```
#showtooltip Pummel
/cast [nostance:3] Berserker Stance; Pummel
```

### Shield Bash — Defensive Stance Interrupt
Alternative interrupt from Defensive Stance with a shield equipped.
```
#showtooltip Shield Bash
/cast [nostance:2] Defensive Stance; Shield Bash
```

### Spell Reflection
Equips shield from slot, enters Defensive Stance, casts Spell Reflection.
```
#showtooltip Spell Reflection
/cast [nostance:2] Defensive Stance
/stopcasting
/cast Spell Reflection
```

### Berserker Rage
Stance dance to Berserker then Rage. Breaks and immunizes Fear, Sap, Incapacitate.
```
#showtooltip Berserker Rage
/cast [nostance:3] Berserker Stance; Berserker Rage
```

### Intimidating Shout — Stopcasting
Stops current cast or swing timer and immediately fears.
```
#showtooltip Intimidating Shout
/stopcasting
/cast Intimidating Shout
```

### Battle Shout / Commanding Shout — Modifier
Default = Battle Shout. Shift = Commanding Shout.
```
#showtooltip [modifier:shift] Commanding Shout; Battle Shout
/cast [modifier:shift] Commanding Shout; Battle Shout
```

### Demoralizing Shout
```
#showtooltip Demoralizing Shout
/cast Demoralizing Shout
```

### Thunder Clap — Battle Stance
Stance dances to Battle Stance for Thunder Clap if needed.
```
#showtooltip Thunder Clap
/cast [nostance:1] Battle Stance; Thunder Clap
```

### Hamstring
```
#showtooltip Hamstring
/cast Hamstring
```

---

## Arms DPS Macros <a name="arms-macros"></a>

### Mortal Strike
```
#showtooltip Mortal Strike
/cast Mortal Strike
```

### Overpower — Battle Stance Dance
Swaps to Battle Stance if needed and uses Overpower on the dodge proc.
```
#showtooltip Overpower
/cast [nostance:1] Battle Stance; Overpower
```

### Execute
```
#showtooltip Execute
/cast Execute
```

### Sweeping Strikes — Battle Stance
Requires Battle Stance. Stance dances if needed.
```
#showtooltip Sweeping Strikes
/cast [nostance:1] Battle Stance; Sweeping Strikes
```

### Recklessness — Berserker Stance
Swaps to Berserker Stance and pops Recklessness.
```
#showtooltip Recklessness
/cast [nostance:3] Berserker Stance; Recklessness
```

### Sweeping Strikes + Whirlwind Combo
Uses Sweeping Strikes in Battle Stance, then swap to Berserker for Whirlwind. Press twice.
```
#showtooltip [nostance:3] Sweeping Strikes; Whirlwind
/cast [nostance:3] Sweeping Strikes; Whirlwind
/cast [stance:1] Berserker Stance
```

### Whirlwind — Berserker Stance
```
#showtooltip Whirlwind
/cast [nostance:3] Berserker Stance; Whirlwind
```

### Slam — Stopcasting
Stops your current swing to begin Slam cast immediately.
```
#showtooltip Slam
/stopcasting
/cast Slam
```

### Heroic Strike — Next Swing Queue
Queues Heroic Strike on your next main-hand auto attack. Rage dump.
```
#showtooltip Heroic Strike
/cast Heroic Strike
```

### Cleave — Modifier
Hold shift to Cleave instead of Heroic Strike. For multi-target.
```
#showtooltip [modifier:shift] Cleave; Heroic Strike
/cast [modifier:shift] Cleave; Heroic Strike
```

### Retaliation — Battle Stance
```
#showtooltip Retaliation
/cast [nostance:1] Battle Stance; Retaliation
```

---

## Fury DPS Macros <a name="fury-macros"></a>

### Bloodthirst
```
#showtooltip Bloodthirst
/cast Bloodthirst
```

### Whirlwind (Fury)
```
#showtooltip Whirlwind
/cast Whirlwind
```

### Rampage
Maintain this buff after every crit. 30-second duration.
```
#showtooltip Rampage
/cast Rampage
```

### Execute (Fury)
```
#showtooltip Execute
/cast Execute
```

### Death Wish + Recklessness Burst
Pops Death Wish, stance dances to Berserker for Recklessness, then back to Berserker Stance for DPS. Use trinket slot 13 if on-use.
```
#showtooltip Death Wish
/cast Death Wish
/cast [nostance:3] Berserker Stance
/cast Recklessness
/use 13
```

### Death Wish Only
For when you want Death Wish without blowing Recklessness.
```
#showtooltip Death Wish
/cast Death Wish
/use 13
```

### Heroic Strike Queue (Fury)
Queue on next auto when rage is high. Spam between Bloodthirst and Whirlwind.
```
#showtooltip Heroic Strike
/cast Heroic Strike
```

### Cleave (Fury)
For AoE situations where multiple mobs are stacked.
```
#showtooltip Cleave
/cast Cleave
```

### Fury Opener Sequence
Pull sequence: Bloodthirst > Whirlwind > Rampage. Press once per GCD.
```
#showtooltip
/castsequence reset=combat Bloodthirst, Whirlwind, Rampage
```

### Intercept (Fury)
Gap closer from Berserker Stance.
```
#showtooltip Intercept
/cast [nostance:3] Berserker Stance; Intercept
```

---

## Protection Tanking Macros <a name="protection-macros"></a>

### Shield Slam
```
#showtooltip Shield Slam
/cast Shield Slam
```

### Revenge
```
#showtooltip Revenge
/cast Revenge
```

### Devastate
```
#showtooltip Devastate
/cast Devastate
```

### Shield Block
```
#showtooltip Shield Block
/cast Shield Block
```

### Taunt
```
#showtooltip Taunt
/cast Taunt
```

### Taunt — Mouseover
Taunts mouseover target without switching your current target.
```
#showtooltip Taunt
/cast [target=mouseover,harm,nodead] Taunt; Taunt
```

### Mocking Blow — Battle Stance Dance
Secondary taunt. Stance dances to Battle Stance if needed.
```
#showtooltip Mocking Blow
/cast [nostance:1] Battle Stance; Mocking Blow
```

### Last Stand
```
#showtooltip Last Stand
/cast Last Stand
```

### Shield Wall
```
#showtooltip Shield Wall
/cast [nostance:2] Defensive Stance; Shield Wall
```

### Last Stand + Shield Wall Panic
Emergency survival. Uses both cooldowns and equips shield.
```
#showtooltip Last Stand
/cast [nostance:2] Defensive Stance
/cast Last Stand
/cast Shield Wall
```

### Disarm — Defensive Stance
```
#showtooltip Disarm
/cast [nostance:2] Defensive Stance; Disarm
```

### Intervene — Mouseover on Ally
Intervene to a friendly mouseover target to intercept the next attack.
```
#showtooltip Intervene
/cast [nostance:2] Defensive Stance
/cast [target=mouseover,help,nodead] Intervene; [help,nodead] Intervene
```

### Heroic Strike Queue — Threat Dump
Prot Warriors use Heroic Strike constantly for bonus threat when rage is high.
```
#showtooltip Heroic Strike
/cast Heroic Strike
```

### Cleave — Threat (Multi-Target)
```
#showtooltip Cleave
/cast Cleave
```

### Heroic Strike / Cleave Toggle
Default = Heroic Strike for single target. Shift = Cleave for multi-target threat.
```
#showtooltip [modifier:shift] Cleave; Heroic Strike
/cast [modifier:shift] Cleave; Heroic Strike
```

### Shield Slam + Shield Block Combo
Shield Block to guarantee a block, then Shield Slam for max damage.
```
#showtooltip Shield Slam
/cast Shield Block
/cast Shield Slam
```

### Spell Reflection (Prot)
Quick Spell Reflect. Already in Defensive Stance as Prot.
```
#showtooltip Spell Reflection
/cast Spell Reflection
```

### Concussion Blow (Prot Talent)
```
#showtooltip Concussion Blow
/cast Concussion Blow
```

### Devastate Mouseover — Tab Target Threat
Devastate your mouseover without switching targets. Useful for multi-mob threat.
```
#showtooltip Devastate
/cast [target=mouseover,harm,nodead] Devastate; Devastate
```

---

## PvP Macros <a name="pvp-macros"></a>

### Charge Arena1 / Arena2 / Arena3
```
#showtooltip Charge
/cast [nostance:1] Battle Stance
/cast [target=arena1] Charge
```
```
#showtooltip Charge
/cast [nostance:1] Battle Stance
/cast [target=arena2] Charge
```
```
#showtooltip Charge
/cast [nostance:1] Battle Stance
/cast [target=arena3] Charge
```

### Intercept Arena1 / Arena2 / Arena3
```
#showtooltip Intercept
/cast [nostance:3] Berserker Stance
/cast [target=arena1] Intercept
```
```
#showtooltip Intercept
/cast [nostance:3] Berserker Stance
/cast [target=arena2] Intercept
```
```
#showtooltip Intercept
/cast [nostance:3] Berserker Stance
/cast [target=arena3] Intercept
```

### Hamstring — Focus Target
Keeps Hamstring on your focus (usually the kill target or kiter).
```
#showtooltip Hamstring
/cast [target=focus,harm,nodead] Hamstring; Hamstring
```

### Intervene Party1 / Party2
```
#showtooltip Intervene
/cast [nostance:2] Defensive Stance
/cast [target=party1] Intervene
```
```
#showtooltip Intervene
/cast [nostance:2] Defensive Stance
/cast [target=party2] Intervene
```

### Trinket + Berserker Stance + Intercept
PvP trinket break CC, stance dance, Intercept the kill target.
```
#showtooltip
/use 13
/cast [nostance:3] Berserker Stance
/cast Intercept
```

### Trinket + Berserker Rage
Break Fear with trinket and immunize further Fears with Berserker Rage.
```
#showtooltip
/use 13
/cast [nostance:3] Berserker Stance
/cast Berserker Rage
```

### Intimidating Shout — Stopcasting (PvP)
Cancel everything and instant AoE fear.
```
#showtooltip Intimidating Shout
/stopcasting
/cast Intimidating Shout
```

### Overpower on Arena Targets
React to dodge with instant Overpower on arena1.
```
#showtooltip Overpower
/cast [nostance:1] Battle Stance
/cast [target=arena1] Overpower
```

### Disarm — Focus
Disarm the enemy melee on your focus target.
```
#showtooltip Disarm
/cast [nostance:2] Defensive Stance
/cast [target=focus,harm,nodead] Disarm; Disarm
```

### Pummel — Focus Interrupt
Interrupt your focus target's cast without swapping targets.
```
#showtooltip Pummel
/cast [nostance:3] Berserker Stance
/cast [target=focus,harm,nodead] Pummel; Pummel
```

### Mortal Strike — Focus
Apply MS healing debuff to focus target.
```
#showtooltip Mortal Strike
/cast [target=focus,harm,nodead] Mortal Strike
```

---

## Utility & Quality of Life <a name="utility-macros"></a>

### Stance Dance Helper — Battle Stance
```
#showtooltip Battle Stance
/cast Battle Stance
```

### Stance Dance Helper — Defensive Stance
```
#showtooltip Defensive Stance
/cast Defensive Stance
```

### Stance Dance Helper — Berserker Stance
```
#showtooltip Berserker Stance
/cast Berserker Stance
```

### Cycle Stances
Press repeatedly to cycle: Battle > Defensive > Berserker > Battle.
```
#showtooltip
/cast [stance:1] Defensive Stance; [stance:2] Berserker Stance; [stance:3] Battle Stance
```

### Bloodrage
Free rage generation. Use before pulls or during lulls.
```
#showtooltip Bloodrage
/cast Bloodrage
```

### Victory Rush
Use after killing an enemy. Free instant attack, no rage cost.
```
#showtooltip Victory Rush
/cast Victory Rush
```

### Mount Macro
Uses flying mount in flyable zones, ground mount otherwise.
```
#showtooltip
/cast [flyable] Swift Purple Gryphon; Black War Ram
```
*(Replace mount names with your actual mounts)*

### Weapon Swap — Two-Hand / Sword and Board
Swap between 2H DPS weapon and 1H + Shield for tanking or Spell Reflect.
```
#showtooltip
/equipslot [equipped:Shields] 16 Your 2H Weapon
/equipslot [noequipped:Shields] 16 Your 1H Weapon
/equipslot [noequipped:Shields] 17 Your Shield
```
*(Replace weapon and shield names with your actual gear)*

### Weapon Swap — Dual Wield / Two-Hand
For Fury Warriors swapping between DW and 2H setups.
```
#showtooltip
/equipslot 16 Your Main Hand
/equipslot 17 Your Off Hand
```
*(Replace weapon names with your actual gear)*

### Shield Equip Quick-Swap
Fast shield equip for Spell Reflection or Shield Bash in DPS specs.
```
#showtooltip
/equipslot 16 Your 1H Weapon
/equipslot 17 Your Shield
```
*(Replace with your actual 1H weapon and shield names)*

### Shoot — Ranged Pull
Use your equipped ranged weapon (bow, gun, thrown) to pull.
```
#showtooltip Shoot
/cast Shoot
```

### Commanding Shout + Bloodrage
Pre-pull buff combo. Commanding Shout for HP, Bloodrage for initial rage.
```
#showtooltip Commanding Shout
/cast Commanding Shout
/cast Bloodrage
```

### Cancel Bladestorm (if talented, future-proof)
```
#showtooltip
/cancelaura Bladestorm
```
*(Note: Bladestorm does not exist in TBC. Included for reference only.)*

### Eat / Drink / Bandage
Right-click = bandage, left-click = eat. Replace item names.
```
#showtooltip [button:2] Heavy Netherweave Bandage; Blackened Basilisk
/use [button:2] Heavy Netherweave Bandage; Blackened Basilisk
```

---

## Keybinding Recommendations

### Arms DPS

| Key | Ability |
|-----|---------|
| 1 | Mortal Strike |
| 2 | Overpower (stance dance) |
| 3 | Whirlwind (stance dance) |
| 4 | Slam (stopcasting) |
| 5 | Execute |
| Q | Charge / Intercept |
| E | Hamstring |
| R | Sweeping Strikes |
| F | Pummel (stance dance) |
| G | Intimidating Shout |
| T | Thunder Clap |
| Z | Berserker Rage |
| Shift+1 | Heroic Strike / Cleave |
| Shift+2 | Recklessness |
| Shift+3 | Sweeping + WW combo |
| Shift+4 | Retaliation |
| Shift+Q | Spell Reflection |
| Shift+E | Disarm |
| Shift+R | Battle Shout / Commanding |
| Mouse5 | Trinket 1 |
| Mouse4 | Trinket 2 |
| Shift+F | Bloodrage |
| V | Victory Rush |

### Fury DPS

| Key | Ability |
|-----|---------|
| 1 | Bloodthirst |
| 2 | Whirlwind |
| 3 | Rampage |
| 4 | Heroic Strike queue |
| 5 | Execute |
| Q | Charge / Intercept |
| E | Hamstring |
| R | Death Wish + Recklessness |
| F | Pummel (stance dance) |
| G | Intimidating Shout |
| T | Cleave |
| Z | Berserker Rage |
| Shift+1 | Death Wish only |
| Shift+2 | Recklessness only |
| Shift+3 | Sweeping Strikes (stance) |
| Shift+Q | Spell Reflection |
| Shift+E | Disarm |
| Shift+R | Battle Shout / Commanding |
| Mouse5 | Trinket 1 |
| Mouse4 | Trinket 2 |
| Shift+F | Bloodrage |
| V | Victory Rush |

### Protection Tanking

| Key | Ability |
|-----|---------|
| 1 | Shield Slam |
| 2 | Revenge |
| 3 | Devastate |
| 4 | Heroic Strike / Cleave |
| 5 | Concussion Blow |
| Q | Charge / Intercept |
| E | Disarm |
| R | Shield Block |
| F | Taunt |
| G | Intimidating Shout |
| T | Thunder Clap |
| Z | Berserker Rage |
| Shift+1 | Devastate (mouseover) |
| Shift+2 | Spell Reflection |
| Shift+3 | Mocking Blow (stance) |
| Shift+Q | Intervene (mouseover) |
| Shift+E | Shield Bash |
| Shift+R | Battle Shout / Commanding |
| Shift+F | Last Stand |
| Shift+G | Shield Wall |
| Mouse5 | Taunt (mouseover) |
| Mouse4 | Trinket / Last Stand + SW |
| V | Demoralizing Shout |
| Shift+V | Bloodrage |

---

## Notes

- **Stance Dancing**: Warriors must swap stances to access abilities locked to specific stances. Charge (Battle), Intercept/Pummel/Recklessness/Whirlwind (Berserker), Shield Wall/Revenge/Taunt/Disarm/Shield Bash (Defensive). Stance swaps have a 1-second GCD and cost no rage but you lose rage above your retained amount (base 25, Tactical Mastery talent retains up to 25 additional).
- **Tactical Mastery**: This Arms talent is essentially mandatory for all Warrior specs and builds. It lets you retain up to 25 rage when switching stances. Without it, you lose almost all rage on every stance swap.
- **Rage Management**: Rage decays out of combat and is generated by auto attacks (dealt and received) and abilities. Never let rage cap at 100. Dump excess rage with Heroic Strike (single target) or Cleave (multi-target) between ability GCDs.
- **Heroic Strike as Rage Dump**: Heroic Strike and Cleave are "next swing" attacks, not on the GCD. They replace your next auto attack. Queue them between instant abilities when rage is above 50-60. Cancel them by pressing again if rage drops low.
- **Slam (Arms)**: Slam resets your swing timer. Use it only with a swing timer addon (Quartz, WeaponSwingTimer) and cast immediately after a white hit for maximum uptime. Do not use Slam in Fury.
- **Rampage (Fury)**: Rampage is a 30-second buff triggered by crits. Keep it active at all times. It is your highest priority after proccing.
- **Protection Threat Priority**: Shield Slam > Revenge (when proc is up) > Devastate. Weave Heroic Strike between every GCD when rage allows. Shield Block before Shield Slam for guaranteed block value bonus.
- **Prot AoE Threat**: Tab-Devastate between targets, keep Demoralizing Shout and Thunder Clap active (Thunder Clap requires Battle Stance swap), and use Cleave instead of Heroic Strike on 2+ targets.
- **TBC Anniversary 2026**: Heroism/Bloodlust is now raid-wide. One Shaman covers everyone. Plan your burst cooldowns (Death Wish, Recklessness) to align with the Heroism window. Account for the 10-minute Sated/Exhaustion debuff when planning subsequent Heroism uses on longer encounters.
- **Berserker Rage**: Breaks and provides immunity to Fear, Sap, and Incapacitate effects for 10 seconds. Use it preemptively before predictable Fear mechanics (Nightbane, Archimonde) or reactively in PvP. Also generates rage via Improved Berserker Rage talent.
- **Spell Reflection**: Reflects the next spell cast on you for 5 seconds. Requires a shield and Defensive Stance. DPS Warriors should macro a weapon swap into their Spell Reflect keybind or keep a 1H + Shield set ready.
- **Weapon Skill**: TBC uses weapon skill for hit and expertise calculations. Keep your weapon skill maxed for your chosen weapon type. Humans get +5 sword/mace, Orcs get +5 axe.
