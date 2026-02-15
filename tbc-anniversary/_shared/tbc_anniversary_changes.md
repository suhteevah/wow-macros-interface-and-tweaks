# TBC Anniversary 2026 — Gameplay Changes

## Heroism / Bloodlust Overhaul

### What Changed
- **Heroism/Bloodlust is now RAID-WIDE** (was party-only in original TBC)
- Applies **Sated** (from Heroism) / **Exhaustion** (from Bloodlust) debuff for **10 minutes**
- Cooldowns **reset on boss kill or wipe**

### Impact on Raid Composition
- Shaman no longer needs to be in every party for Heroism/BL coverage
- Reduces "stack Shamans" pressure — one Shaman covers the entire raid
- Changes melee/ranged group optimization (no longer need a Shaman in each)
- Makes Restoration Shaman even more valuable as a solo bring

### WeakAura Implications
- **All classes** should track Sated/Exhaustion debuff (shared component)
- Shaman WA should show:
  - Heroism/BL cooldown (raid-wide effect indicator)
  - Sated/Exhaustion debuff remaining time
  - Visual distinction: "available" vs "on CD" vs "Sated active"
- Non-Shaman classes should track:
  - Whether they have Sated/Exhaustion (can't benefit from another Hero/BL)
  - Timer showing when Sated expires

### Spell IDs
- Heroism: 32182
- Bloodlust: 2825
- Sated: 57724
- Exhaustion: 57723

## Client Version
- Client: 2.5.5
- Interface (TOC): 20505
- WeakAuras internal version: 78

## Other Notes
- Verify any class-specific balance changes as TBC Anniversary patch notes become available
- Dungeon/raid tuning may differ from original TBC
- Some quality-of-life improvements from later Classic patches may be present
