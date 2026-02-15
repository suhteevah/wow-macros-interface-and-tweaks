# Tidekeeper — TBC Anniversary 2026 Warlock Macro Suite
## Complete Macro Collection for Affliction, Demonology & Destruction

> **Client:** 2.5.5 | **Interface:** 20505 | **Max Macro Length:** 255 characters

---

## Table of Contents
1. [Universal Macros (All Specs)](#universal-macros)
2. [Affliction DPS Macros](#affliction-macros)
3. [Demonology Macros](#demonology-macros)
4. [Destruction DPS Macros](#destruction-macros)
5. [PvP Macros](#pvp-macros)
6. [Utility & Quality of Life](#utility-macros)

---

## Universal Macros (All Specs) <a name="universal-macros"></a>

### Life Tap
Converts health to mana. Shift = max rank, default = rank 1 (small taps to proc Vampiric Embrace healing).
```
#showtooltip [modifier:shift] Life Tap; Life Tap(Rank 1)
/cast [modifier:shift] Life Tap; Life Tap(Rank 1)
```

### Dark Pact
Drains mana from your active pet. Preferred over Life Tap when a pet is available.
```
#showtooltip Dark Pact
/cast Dark Pact
```

### Drain Life
Channel on current target. Useful for self-healing between pulls.
```
#showtooltip Drain Life
/cast [harm,nodead] Drain Life
```

### Drain Mana
Drain mana from enemy target. Primarily useful in PvP against healers.
```
#showtooltip Drain Mana
/cast [harm,nodead] Drain Mana
```

### Fear — Stopcasting
Interrupts current cast to Fear immediately. Critical for emergency CC.
```
#showtooltip Fear
/stopcasting
/cast [harm,nodead] Fear
```

### Death Coil
Horror effect + heal. Does not share DR with Fear. Stops current cast.
```
#showtooltip Death Coil
/stopcasting
/cast [harm,nodead] Death Coil
```

### Howl of Terror — Stopcasting
AoE fear. Interrupts current cast for instant panic button.
```
#showtooltip Howl of Terror
/stopcasting
/cast Howl of Terror
```

### Create Healthstone — Modifier for Rank
Default = max rank, Shift = create for trading (same rank, just a reminder).
```
#showtooltip Create Healthstone
/cast Create Healthstone
```

### Use Healthstone
Uses Healthstone from your bags. Right-click = trinket slot 2.
```
#showtooltip Master Healthstone
/use [button:2] 14; Master Healthstone
```

### Create Soulstone
```
#showtooltip Create Soulstone
/cast Create Soulstone
```

### Use Soulstone — Mouseover Priority
Apply Soulstone on mouseover > target > self.
```
#showtooltip Master Soulstone
/use [target=mouseover,help,nodead] Master Soulstone; [help,nodead] Master Soulstone; [target=player] Master Soulstone
```

### Pet Attack — Current Target
Sends pet to attack your current target.
```
/petattack [harm,nodead]
```

### Pet Follow
Calls pet back to your side.
```
/petfollow
```

### Pet Stay
Orders pet to hold position.
```
/petstay
```

### Summon Imp
```
#showtooltip Summon Imp
/cast Summon Imp
```

### Summon Voidwalker
```
#showtooltip Summon Voidwalker
/cast Summon Voidwalker
```

### Summon Succubus
```
#showtooltip Summon Succubus
/cast Summon Succubus
```

### Summon Felhunter
```
#showtooltip Summon Felhunter
/cast Summon Felhunter
```

### Summon Felguard (Demonology Only)
```
#showtooltip Summon Felguard
/cast Summon Felguard
```

### Pet Attack Focus Target
Sends pet to attack your focus target. Falls back to current target.
```
/petattack [target=focus,harm,nodead] focus; [harm,nodead]
```

### Wand Shoot
```
#showtooltip Shoot
/cast Shoot
```

---

## Affliction DPS Macros <a name="affliction-macros"></a>

### Corruption
```
#showtooltip Corruption
/cast [harm,nodead] Corruption
```

### Curse of Agony
```
#showtooltip Curse of Agony
/cast [harm,nodead] Curse of Agony
```

### Curse of Agony / Curse of Doom — Modifier
Default = Curse of Agony, Shift = Curse of Doom (for bosses with long fights).
```
#showtooltip [modifier:shift] Curse of Doom; Curse of Agony
/cast [modifier:shift,harm,nodead] Curse of Doom; [harm,nodead] Curse of Agony
```

### Curse of the Elements
Raid debuff curse. Apply once per boss.
```
#showtooltip Curse of the Elements
/cast [harm,nodead] Curse of the Elements
```

### Unstable Affliction
```
#showtooltip Unstable Affliction
/cast [harm,nodead] Unstable Affliction
```

### Siphon Life
```
#showtooltip Siphon Life
/cast [harm,nodead] Siphon Life
```

### Shadow Bolt — Nightfall / Shadow Trance Proc
Shows Shadow Trance when proc is active. Standard Shadow Bolt filler otherwise.
```
#showtooltip Shadow Bolt
/cast [harm,nodead] Shadow Bolt
```
*Note: Shadow Trance makes Shadow Bolt instant. Watch for the proc and fire immediately.*

### Seed of Corruption — AoE
Apply Seed on mouseover or current target. Core AoE ability.
```
#showtooltip Seed of Corruption
/cast [target=mouseover,harm,nodead] Seed of Corruption; [harm,nodead] Seed of Corruption
```

### Drain Soul — Execute Phase
Channel on targets below 25% HP. Produces Soul Shards on kill.
```
#showtooltip Drain Soul
/cast [harm,nodead] Drain Soul
```

### Amplify Curse + Curse of Agony
Pops Amplify Curse then applies Curse of Agony for increased effect.
```
#showtooltip Curse of Agony
/cast Amplify Curse
/cast [harm,nodead] Curse of Agony
```

### Amplify Curse + Curse of Doom
For long boss fights. Amplified Curse of Doom hits extremely hard.
```
#showtooltip Curse of Doom
/cast Amplify Curse
/cast [harm,nodead] Curse of Doom
```

### Affliction Dot Sequence
Castsequence for applying dots. Press once per spell. Resets on new combat.
```
#showtooltip
/castsequence reset=combat Unstable Affliction, Corruption, Curse of Agony, Siphon Life
```

### Shadow Bolt — Mouseover
For multi-dotting scenarios where you need to Shadow Bolt a different target.
```
#showtooltip Shadow Bolt
/cast [target=mouseover,harm,nodead] Shadow Bolt; [harm,nodead] Shadow Bolt
```

---

## Demonology Macros <a name="demonology-macros"></a>

### Shadow Bolt
Standard filler for Demonology.
```
#showtooltip Shadow Bolt
/cast [harm,nodead] Shadow Bolt
```

### Demonic Sacrifice
Sacrifices your current pet for a buff. Changes based on pet type.
```
#showtooltip Demonic Sacrifice
/cast Demonic Sacrifice
```

### Soul Link
Toggle. Splits damage between you and your pet. Core Demonology talent.
```
#showtooltip Soul Link
/cast Soul Link
```

### Fel Domination + Summon Felguard
Instant summon combo. Fel Domination makes the next summon instant.
```
#showtooltip Summon Felguard
/cast Fel Domination
/cast Summon Felguard
```

### Fel Domination + Summon Felhunter
For PvP or encounters requiring Spell Lock.
```
#showtooltip Summon Felhunter
/cast Fel Domination
/cast Summon Felhunter
```

### Fel Domination + Summon Voidwalker
Emergency Sacrifice combo. Summon VW instantly then sacrifice for shield.
```
#showtooltip Summon Voidwalker
/cast Fel Domination
/cast Summon Voidwalker
```

### Spell Lock — Felhunter
Commands Felhunter to Spell Lock your current target.
```
#showtooltip Spell Lock
/cast [target=target,harm,nodead] Spell Lock
```

### Spell Lock — Focus Target (Felhunter)
Interrupt your focus target without changing target. Essential for PvP and raiding.
```
#showtooltip Spell Lock
/cast [target=focus,harm,nodead] Spell Lock; [harm,nodead] Spell Lock
```

### Intercept — Felguard
Commands Felguard to charge and stun the target.
```
#showtooltip Intercept
/cast [harm,nodead] Intercept
```

### Intercept — Focus Target (Felguard)
Felguard charges your focus target.
```
#showtooltip Intercept
/cast [target=focus,harm,nodead] Intercept; [harm,nodead] Intercept
```

### Felguard Attack + Intercept — Focus
Sends Felguard to focus target and Intercepts.
```
#showtooltip Intercept
/petattack [target=focus,harm,nodead] focus
/cast [target=focus,harm,nodead] Intercept
```

### Felguard Cleave Toggle
Puts Felguard Cleave on autocast or casts it manually.
```
#showtooltip Cleave
/petautocaston Cleave
```

### Health Funnel
Channel healing into your pet. Cancel with movement.
```
#showtooltip Health Funnel
/cast Health Funnel
```

### Demonic Knowledge Shadow Bolt
Same as standard Shadow Bolt. Demonic Knowledge passively buffs your spell damage.
```
#showtooltip Shadow Bolt
/cast [harm,nodead] Shadow Bolt
```

---

## Destruction DPS Macros <a name="destruction-macros"></a>

### Shadow Bolt — Destruction Filler
Standard filler. Shadow Bolt remains the filler until you have enough crit for Incinerate builds.
```
#showtooltip Shadow Bolt
/cast [harm,nodead] Shadow Bolt
```

### Incinerate
Fire-based nuke. Used in fire Destruction builds with Immolate.
```
#showtooltip Incinerate
/cast [harm,nodead] Incinerate
```

### Immolate
Fire DoT. Must be active for Incinerate bonus damage and Conflagrate.
```
#showtooltip Immolate
/cast [harm,nodead] Immolate
```

### Conflagrate
Consumes Immolate for burst damage. Use immediately after refreshing Immolate.
```
#showtooltip Conflagrate
/cast [harm,nodead] Conflagrate
```

### Shadowburn — Execute
Instant Shadow damage nuke. Use as an execute below 20% HP. Consumes a Soul Shard.
```
#showtooltip Shadowburn
/cast [harm,nodead] Shadowburn
```

### Shadowfury — AoE Stun
Places a targeting circle. Click to cast AoE stun at cursor location.
```
#showtooltip Shadowfury
/cast Shadowfury
```

### Soul Fire
Long cast, high damage. Use during Heroism / pre-pull.
```
#showtooltip Soul Fire
/cast [harm,nodead] Soul Fire
```

### Soul Fire + Trinket
Pop trinket then start Soul Fire for maximum pre-pull or burn damage.
```
#showtooltip Soul Fire
/use 13
/cast [harm,nodead] Soul Fire
```

### Immolate + Incinerate Sequence
Apply Immolate then spam Incinerate. Resets after 8 seconds or target change.
```
#showtooltip
/castsequence reset=8/target Immolate, Incinerate, Incinerate, Incinerate
```

### Curse of the Elements — Destruction
Fire Destro benefits from this heavily. Apply to boss.
```
#showtooltip Curse of the Elements
/cast [harm,nodead] Curse of the Elements
```

### Searing Pain
High threat, fast cast. Use only when threat is irrelevant or for threat-capping.
```
#showtooltip Searing Pain
/cast [harm,nodead] Searing Pain
```

### Rain of Fire
AoE channeled fire damage. No target required.
```
#showtooltip Rain of Fire
/cast Rain of Fire
```

---

## PvP Macros <a name="pvp-macros"></a>

### Fear — Focus Target
CC your focus without switching targets.
```
#showtooltip Fear
/stopcasting
/cast [target=focus,harm,nodead] Fear
```

### Death Coil — Focus Target
Instant horror on focus. Does not share DR with Fear.
```
#showtooltip Death Coil
/stopcasting
/cast [target=focus,harm,nodead] Death Coil
```

### Spell Lock — Focus (Felhunter)
Interrupt focus target's cast. The single most important PvP macro for Warlocks.
```
#showtooltip Spell Lock
/cast [target=focus,harm,nodead] Spell Lock; [harm,nodead] Spell Lock
```

### Devour Magic — Self (Felhunter)
Commands Felhunter to remove a magic debuff from you.
```
#showtooltip Devour Magic
/cast [target=player] Devour Magic
```

### Devour Magic — Mouseover (Felhunter)
Remove magic buffs from enemies or debuffs from allies.
```
#showtooltip Devour Magic
/cast [target=mouseover,help,nodead] Devour Magic; [target=mouseover,harm,nodead] Devour Magic; [target=player] Devour Magic
```

### Trinket + Death Coil
Break CC and immediately horror the attacker.
```
#showtooltip Death Coil
/use 13
/cast [harm,nodead] Death Coil
```

### Trinket + Howl of Terror
Break CC and AoE fear everything around you.
```
#showtooltip Howl of Terror
/use 13
/stopcasting
/cast Howl of Terror
```

### Howl of Terror — Stopcasting (PvP)
Emergency panic button. Stops any current cast instantly.
```
#showtooltip Howl of Terror
/stopcasting
/cast Howl of Terror
```

### Seduce — Focus Target (Succubus)
Commands Succubus to Seduce your focus. Great for SL/SL arena control.
```
#showtooltip Seduction
/cast [target=focus,harm,nodead] Seduction; [harm,nodead] Seduction
```

### Seduce — Stop + Recast Focus (Succubus)
Stops current Seduction and immediately recasts on focus. Prevents early breaks.
```
#showtooltip Seduction
/petfollow
/cast [target=focus,harm,nodead] Seduction
```

### Spell Lock — Arena1 (Felhunter)
```
#showtooltip Spell Lock
/cast [target=arena1] Spell Lock
```

### Spell Lock — Arena2 (Felhunter)
```
#showtooltip Spell Lock
/cast [target=arena2] Spell Lock
```

### Spell Lock — Arena3 (Felhunter)
```
#showtooltip Spell Lock
/cast [target=arena3] Spell Lock
```

### Fear — Arena Targets (1/2/3)
```
#showtooltip Fear
/cast [target=arena1] Fear
```
```
#showtooltip Fear
/cast [target=arena2] Fear
```
```
#showtooltip Fear
/cast [target=arena3] Fear
```

### Curse of Tongues — Focus
Slow enemy caster's cast speed. High value in PvP.
```
#showtooltip Curse of Tongues
/cast [target=focus,harm,nodead] Curse of Tongues; [harm,nodead] Curse of Tongues
```

### Curse of Exhaustion — Focus
Slow focus target's movement speed (Affliction talent).
```
#showtooltip Curse of Exhaustion
/cast [target=focus,harm,nodead] Curse of Exhaustion; [harm,nodead] Curse of Exhaustion
```

### Shadow Ward — Self
Absorb shadow damage. Use preemptively against Shadow Priests and other Warlocks.
```
#showtooltip Shadow Ward
/cast Shadow Ward
```

---

## Utility & Quality of Life <a name="utility-macros"></a>

### Soulstone — Mouseover (Target Priority)
Apply Soulstone to mouseover > target > self.
```
#showtooltip Master Soulstone
/use [target=mouseover,help,nodead] Master Soulstone; [help,nodead] Master Soulstone; [target=player] Master Soulstone
```

### Create Healthstone
```
#showtooltip Create Healthstone
/cast Create Healthstone
```

### Create Soulwell (Ritual of Souls)
Requires two party members to click. Produces Healthstones for the raid.
```
#showtooltip Ritual of Souls
/cast Ritual of Souls
```

### Ritual of Summoning
Requires two party members to click. Summons a player to your location.
```
#showtooltip Ritual of Summoning
/cast Ritual of Summoning
```

### Banish — Focus Target
CC a Demon or Elemental on your focus without changing targets.
```
#showtooltip Banish
/cast [target=focus,harm,nodead] Banish; [harm,nodead] Banish
```

### Banish — Cancel and Recast
Cancels existing Banish and recasts. Useful for refreshing on the same target.
```
#showtooltip Banish
/cancelaura Banish
/cast [harm,nodead] Banish
```

### Enslave Demon
```
#showtooltip Enslave Demon
/cast [harm,nodead] Enslave Demon
```

### Fel Armor / Demon Armor Toggle
Default = Fel Armor (spell damage + healing received). Shift = Demon Armor (armor + health regen).
```
#showtooltip [modifier:shift] Demon Armor; Fel Armor
/cast [modifier:shift] Demon Armor; Fel Armor
```

### Detect Invisibility — Self or Mouseover
```
#showtooltip Detect Invisibility
/cast [target=mouseover,help,nodead] Detect Invisibility; [target=player] Detect Invisibility
```

### Unending Breath — Self or Mouseover
```
#showtooltip Unending Breath
/cast [target=mouseover,help,nodead] Unending Breath; [target=player] Unending Breath
```

### Eye of Kilrogg
```
#showtooltip Eye of Kilrogg
/cast Eye of Kilrogg
```

### Soulshatter
Threat reduction. Use when you pull aggro.
```
#showtooltip Soulshatter
/cast Soulshatter
```

### Mount Macro
Uses your fastest available mount. Flying in Outland, ground elsewhere.
```
#showtooltip
/cast [flyable] Swift Purple Gryphon; Black War Steed
```
*(Replace mount names with your actual mounts)*

### Drain Soul — Farm Macro
Stops current cast, starts Drain Soul for Soul Shard farming.
```
#showtooltip Drain Soul
/stopcasting
/cast [harm,nodead] Drain Soul
```

### Soul Shard Delete
Right-click to delete a Soul Shard from your bags (requires manual bag slot).
```
#showtooltip Soul Shard
/script PickupContainerItem(0,1); DeleteCursorItem()
```
*Note: Adjust bag and slot numbers (0,1) to match your Soul Shard location.*

---

## Keybinding Recommendations

| Key | Affliction | Demonology | Destruction |
|-----|-----------|------------|-------------|
| 1 | Shadow Bolt | Shadow Bolt | Shadow Bolt / Incinerate |
| 2 | Unstable Affliction | Shadow Bolt | Immolate |
| 3 | Corruption | Corruption | Conflagrate |
| 4 | Curse of Agony | Curse of Elements | Curse of Elements |
| 5 | Siphon Life | Health Funnel | Shadowburn |
| Q | Fear (stopcasting) | Fear (stopcasting) | Fear (stopcasting) |
| E | Drain Life | Soul Link | Searing Pain |
| R | Seed of Corruption | Intercept (Felguard) | Shadowfury |
| F | Death Coil | Death Coil | Death Coil |
| G | Howl of Terror | Howl of Terror | Howl of Terror |
| T | Drain Soul | Spell Lock (focus) | Soul Fire |
| V | Life Tap | Life Tap / Dark Pact | Life Tap |
| Shift+1 | Amplify Curse + CoA | Fel Dom + Summon | Rain of Fire |
| Shift+2 | Curse of Doom | Demonic Sacrifice | Immolate + Inc Sequence |
| Shift+3 | Drain Mana | Health Funnel | Shadowburn |
| Shift+4 | Soulshatter | Soulshatter | Soulshatter |
| Shift+Q | Fear (focus) | Fear (focus) | Fear (focus) |
| Shift+F | Death Coil (focus) | Death Coil (focus) | Death Coil (focus) |
| Shift+E | Spell Lock (focus) | Spell Lock (focus) | Spell Lock (focus) |
| Mouse5 | Trinket 1 | Trinket 1 | Trinket 1 |
| Mouse4 | Trinket 2 | Trinket 2 | Trinket 2 |
| Shift+V | Fel Armor / Demon Armor | Fel Armor / Demon Armor | Fel Armor / Demon Armor |

---

## Notes

- **Shadow Bolt Filler**: In all three specs, Shadow Bolt (or Incinerate for fire Destruction) is your primary filler between DoT applications and cooldowns. Maximize uptime on your filler to push DPS.
- **Life Tap Management**: Never Life Tap to dangerously low HP. Tap in batches between pulls or during low-damage phases. In raids, healers expect you to Life Tap — coordinate so you are not tapping when heavy raid damage is incoming. Rank 1 Life Tap can proc Vampiric Embrace healing without costing much HP.
- **Dark Pact vs Life Tap**: Dark Pact drains your pet's mana instead of your health. If specced into Dark Pact (Affliction), prefer it over Life Tap to reduce healer strain. Your Imp has a large mana pool and regenerates quickly.
- **Pet Management**: Keep your pet on Passive in raids and PvP. Use /petattack macros to control engagement. In PvP, keep your Felhunter on Passive and use Spell Lock macros on focus targets. Never leave pets on Aggressive.
- **Soul Shard Management**: Drain Soul only produces shards if the mob gives experience or honor. Farm shards before raids. Keep 10-15 in your bags for summons, Healthstones, Soulstones, and Shadowburn.
- **TBC Anniversary 2026**: Heroism/Bloodlust is now raid-wide. One Shaman covers everyone. Plan around the 10-minute Sated/Exhaustion debuff. Time your trinket usage and Soul Fire pre-cast around Heroism windows for maximum burst.
- **Curse Assignment**: In raids, Warlocks are assigned specific curses. Curse of the Elements is highest priority (13% spell damage taken increase). Curse of Recklessness or Curse of Doom are secondary assignments. Do not override another Warlock's curse.
- **Demonic Sacrifice (Demonology)**: Sacrificing a Succubus gives 15% Shadow damage. Sacrificing an Imp gives 15% Fire damage. Choose based on your build. Note: Soul Link requires a living pet, so Demonic Sacrifice and Soul Link are mutually exclusive strategies.
- **Conflagrate Timing**: Conflagrate consumes your Immolate. Always refresh Immolate before Conflagrating to avoid losing DoT uptime.
- **Spell Lock (Felhunter)**: 6-second lockout on the interrupted school. In PvP, locking out a healer's Holy school for 6 seconds wins games. Always use the focus target macro so you do not need to swap targets.
- **SL/SL (Soul Link / Siphon Life)**: The premier PvP build in TBC. Extremely durable with Soul Link splitting damage to your Felhunter. Pair with Resilience gear for arena dominance.
- **Soulstone Priority**: In raids, Soulstone your assigned healer (usually a Paladin or Priest). In arena, Soulstone yourself before gates open.
- **Imp Phase Shift**: In Demonic Sacrifice builds where you sacrifice the Imp, summon the Imp, let it Phase Shift (becomes untargetable), then sacrifice it. This avoids the Imp dying before you can sacrifice.
