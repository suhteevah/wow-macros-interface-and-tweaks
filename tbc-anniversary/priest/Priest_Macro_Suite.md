# Tidekeeper — TBC Anniversary 2026 Priest Macro Suite
## Complete Macro Collection for Discipline, Holy & Shadow

> **Client:** 2.5.5 | **Interface:** 20505 | **Max Macro Length:** 255 characters

---

## Table of Contents
1. [Universal Macros (All Specs)](#universal-macros)
2. [Discipline / Holy Healing Macros](#healing-macros)
3. [Shadow DPS Macros](#shadow-macros)
4. [PvP Macros](#pvp-macros)
5. [Utility & Quality of Life](#utility-macros)

---

## Universal Macros (All Specs) <a name="universal-macros"></a>

### Mouseover Dispel Magic
Dispels mouseover target, or current target, or self.
```
#showtooltip Dispel Magic
/cast [target=mouseover,help,nodead] Dispel Magic; [help,nodead] Dispel Magic; [target=player] Dispel Magic
```

### Mouseover Abolish Disease
```
#showtooltip Abolish Disease
/cast [target=mouseover,help,nodead] Abolish Disease; [help,nodead] Abolish Disease; [target=player] Abolish Disease
```

### Mass Dispel at Cursor
Places the green targeting circle. Click to cast.
```
#showtooltip Mass Dispel
/cast Mass Dispel
```

### Power Word: Shield — Mouseover Priority
Shields mouseover > target > self.
```
#showtooltip Power Word: Shield
/cast [target=mouseover,help,nodead] Power Word: Shield; [help,nodead] Power Word: Shield; [target=player] Power Word: Shield
```

### Fear Ward — Mouseover Priority
```
#showtooltip Fear Ward
/cast [target=mouseover,help,nodead] Fear Ward; [help,nodead] Fear Ward; [target=player] Fear Ward
```

### Shadowfiend with Focus Attack
Summons Shadowfiend and sends it to attack your focus (or target).
```
#showtooltip Shadowfiend
/cast Shadowfiend
/petattack [target=focus,harm,nodead] focus; [harm,nodead]
```

### Fade
```
#showtooltip Fade
/cast Fade
```

### Psychic Scream — Stopcasting
Interrupts current cast to scream immediately.
```
#showtooltip Psychic Scream
/stopcasting
/cast Psychic Scream
```

### Inner Fire Reminder
Auto-reapply when clicked.
```
#showtooltip Inner Fire
/cast Inner Fire
```

### Fortitude — Modifier for Prayer
Shift = Prayer of Fortitude (group), default = Power Word: Fortitude (single).
```
#showtooltip [modifier:shift] Prayer of Fortitude; Power Word: Fortitude
/cast [modifier:shift,target=mouseover,help,nodead] Prayer of Fortitude; [modifier:shift,help,nodead] Prayer of Fortitude; [target=mouseover,help,nodead] Power Word: Fortitude; [help,nodead] Power Word: Fortitude; [target=player] Power Word: Fortitude
```

### Divine Spirit — Modifier for Prayer
```
#showtooltip [modifier:shift] Prayer of Spirit; Divine Spirit
/cast [modifier:shift,target=mouseover,help,nodead] Prayer of Spirit; [modifier:shift,help,nodead] Prayer of Spirit; [target=mouseover,help,nodead] Divine Spirit; [help,nodead] Divine Spirit; [target=player] Divine Spirit
```

### Shadow Protection — Modifier for Prayer
```
#showtooltip [modifier:shift] Prayer of Shadow Protection; Shadow Protection
/cast [modifier:shift,target=mouseover,help,nodead] Prayer of Shadow Protection; [modifier:shift,help,nodead] Prayer of Shadow Protection; [target=mouseover,help,nodead] Shadow Protection; [help,nodead] Shadow Protection; [target=player] Shadow Protection
```

---

## Discipline / Holy Healing Macros <a name="healing-macros"></a>

### Flash Heal — Mouseover
```
#showtooltip Flash Heal
/cast [target=mouseover,help,nodead] Flash Heal; [help,nodead] Flash Heal; [target=player] Flash Heal
```

### Greater Heal — Mouseover
```
#showtooltip Greater Heal
/cast [target=mouseover,help,nodead] Greater Heal; [help,nodead] Greater Heal; [target=player] Greater Heal
```

### Renew — Mouseover
```
#showtooltip Renew
/cast [target=mouseover,help,nodead] Renew; [help,nodead] Renew; [target=player] Renew
```

### Binding Heal — Mouseover
Heals both you and the target. Great for damage-sharing situations.
```
#showtooltip Binding Heal
/cast [target=mouseover,help,nodead] Binding Heal; [help,nodead] Binding Heal
```

### Prayer of Healing
```
#showtooltip Prayer of Healing
/cast Prayer of Healing
```

### Prayer of Mending — Mouseover
```
#showtooltip Prayer of Mending
/cast [target=mouseover,help,nodead] Prayer of Mending; [help,nodead] Prayer of Mending; [target=player] Prayer of Mending
```

### Circle of Healing — Mouseover (Holy)
Smart heal centered on the mouseover target's group.
```
#showtooltip Circle of Healing
/cast [target=mouseover,help,nodead] Circle of Healing; [help,nodead] Circle of Healing; [target=player] Circle of Healing
```

### Inner Focus + Greater Heal
Pops Inner Focus then starts a Greater Heal for guaranteed crit.
```
#showtooltip Greater Heal
/cast Inner Focus
/cast [target=mouseover,help,nodead] Greater Heal; [help,nodead] Greater Heal; [target=player] Greater Heal
```

### Pain Suppression — Mouseover (Discipline)
```
#showtooltip Pain Suppression
/cast [target=mouseover,help,nodead] Pain Suppression; [help,nodead] Pain Suppression; [target=player] Pain Suppression
```

### Power Infusion — Mouseover (Discipline)
```
#showtooltip Power Infusion
/cast [target=mouseover,help,nodead] Power Infusion; [help,nodead] Power Infusion; [target=player] Power Infusion
```

### Lightwell (Holy)
```
#showtooltip Lightwell
/cast Lightwell
```

### Emergency Heal — NS + GH Equivalent
Uses trinket + Inner Focus + Greater Heal for maximum emergency output.
```
#showtooltip Greater Heal
/use 13
/cast Inner Focus
/cast [target=mouseover,help,nodead] Greater Heal; [help,nodead] Greater Heal; [target=player] Greater Heal
```

### Heal Rank Downranking
TBC supports spell rank downranking for mana efficiency.
Shift = max rank, no modifier = rank 2 (downranked).
```
#showtooltip [modifier:shift] Greater Heal; Greater Heal(Rank 1)
/cast [modifier:shift,target=mouseover,help,nodead] Greater Heal; [modifier:shift,help,nodead] Greater Heal; [target=mouseover,help,nodead] Greater Heal(Rank 1); [help,nodead] Greater Heal(Rank 1); [target=player] Greater Heal(Rank 1)
```

---

## Shadow DPS Macros <a name="shadow-macros"></a>

### Shadow Word: Pain
```
#showtooltip Shadow Word: Pain
/cast [harm,nodead] Shadow Word: Pain
```

### Vampiric Touch
```
#showtooltip Vampiric Touch
/cast [harm,nodead] Vampiric Touch
```

### Mind Blast
```
#showtooltip Mind Blast
/cast [harm,nodead] Mind Blast
```

### Mind Flay
```
#showtooltip Mind Flay
/cast [harm,nodead] Mind Flay
```

### Shadow Word: Death — Mouseover
SW:D on mouseover for execute sniping, or current target.
```
#showtooltip Shadow Word: Death
/cast [target=mouseover,harm,nodead] Shadow Word: Death; [harm,nodead] Shadow Word: Death
```

### Vampiric Embrace
Self-buff, use before combat.
```
#showtooltip Vampiric Embrace
/cast Vampiric Embrace
```

### Shadowform Toggle
```
#showtooltip Shadowform
/cast Shadowform
```

### Shadow DPS Opener
Start fight with VT > SW:P > MB sequence. Press once per spell.
```
#showtooltip
/castsequence reset=combat Vampiric Touch, Shadow Word: Pain, Mind Blast
```

### Silence — Focus Target
Interrupt your focus target (usually the enemy healer in PvP).
```
#showtooltip Silence
/cast [target=focus,harm,nodead] Silence; [harm,nodead] Silence
```

### Devouring Plague (Undead racial)
```
#showtooltip Devouring Plague
/cast [harm,nodead] Devouring Plague
```

### Mana Burn — Focus
Burn mana on focus target.
```
#showtooltip Mana Burn
/cast [target=focus,harm,nodead] Mana Burn; [harm,nodead] Mana Burn
```

---

## PvP Macros <a name="pvp-macros"></a>

### Trinket + Power Word: Shield
Break CC and shield self instantly.
```
#showtooltip
/use 13
/cast [target=player] Power Word: Shield
```

### Focus Psychic Scream
Scream without changing target.
```
#showtooltip Psychic Scream
/stopcasting
/cast Psychic Scream
```

### Shackle Undead — Focus
For PvP vs Undead or CC in dungeons.
```
#showtooltip Shackle Undead
/cast [target=focus,harm,nodead] Shackle Undead; [harm,nodead] Shackle Undead
```

### Arena Target Macros (1/2/3)
```
#showtooltip Shadow Word: Pain
/cast [target=arena1] Shadow Word: Pain
```
```
#showtooltip Shadow Word: Pain
/cast [target=arena2] Shadow Word: Pain
```
```
#showtooltip Shadow Word: Pain
/cast [target=arena3] Shadow Word: Pain
```

### Dispel on Arena Targets
```
#showtooltip Dispel Magic
/cast [target=arena1] Dispel Magic
```
```
#showtooltip Dispel Magic
/cast [target=arena2] Dispel Magic
```

### Mind Control
```
#showtooltip Mind Control
/cast [harm,nodead] Mind Control
```

---

## Utility & Quality of Life <a name="utility-macros"></a>

### Resurrection — Mouseover
```
#showtooltip Resurrection
/cast [target=mouseover,help,dead] Resurrection; [help,dead] Resurrection
```

### Levitate — Self or Mouseover
```
#showtooltip Levitate
/cast [target=mouseover,help,nodead] Levitate; [target=player] Levitate
```

### Holy Nova (No target required)
```
#showtooltip Holy Nova
/cast Holy Nova
```

### Smite + Wand Toggle
Left-click = Smite, right-click = Shoot (wand).
```
#showtooltip [button:2] Shoot; Smite
/cast [button:2] Shoot; [harm,nodead] Smite
```

### Mount Macro
Uses your fastest available mount.
```
#showtooltip
/cast [flyable] Swift Purple Gryphon; Black War Tiger
```
*(Replace mount names with your actual mounts)*

### Cancel Shadowform for Healing
Quick cancel aura to drop Shadowform for emergency heals.
```
#showtooltip Flash Heal
/cancelaura Shadowform
/cast [target=mouseover,help,nodead] Flash Heal; [help,nodead] Flash Heal; [target=player] Flash Heal
```

---

## Keybinding Recommendations

| Key | Discipline/Holy | Shadow |
|-----|----------------|--------|
| 1 | Flash Heal (mouseover) | Mind Blast |
| 2 | Greater Heal (mouseover) | Mind Flay |
| 3 | Renew (mouseover) | SW:Pain |
| 4 | Prayer of Mending | Vampiric Touch |
| 5 | Circle of Healing / Pain Sup | SW:Death |
| Q | PW:Shield (mouseover) | PW:Shield (self) |
| E | Dispel Magic (mouseover) | Silence |
| R | Fear Ward (mouseover) | Devouring Plague |
| F | Fade | Fade |
| G | Psychic Scream | Psychic Scream |
| Shift+1 | Binding Heal | Shadow Word: Death (mouseover) |
| Shift+2 | Prayer of Healing | Mana Burn |
| Shift+3 | Inner Focus + GH | Shadowfiend |
| Shift+4 | Power Infusion / Lightwell | Vampiric Embrace |
| Mouse5 | Trinket 1 | Trinket 1 |
| Mouse4 | Trinket 2 | Trinket 2 |

---

## Notes

- **Downranking**: TBC supports spell rank selection for mana efficiency. Flash Heal Rank 7, Greater Heal Rank 1, etc. Use lower ranks during sustained healing phases.
- **Five-Second Rule**: Your mana regeneration is spirit-based. After 5 seconds without casting a mana-costing spell, you regen at full rate. Time your casts wisely.
- **TBC Anniversary 2026**: Heroism/Bloodlust is now raid-wide. One Shaman covers everyone. Plan around the 10-minute Sated/Exhaustion debuff.
- **Inner Focus**: Guarantees a crit on your next heal. Pair with Greater Heal or Prayer of Healing for maximum value.
- **Pain Suppression**: 40% damage reduction. Use on the tank during heavy damage phases.
- **Power Infusion**: 20% spell haste + 20% mana cost reduction. Give to yourself or a DPS caster during burn phases.
