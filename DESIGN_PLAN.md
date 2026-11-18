# KAT Infra and Developers — Design Plan

## Color Palette
| Token | Hex | Role |
|-------|-----|------|
| base | #0A0A0A | Page background — near black, cinematic |
| surface | #141414 | Elevated panels, cards |
| surface-hover | #1C1C1C | Interactive hover states |
| accent | #C9A86A | Brass/gold — machinery, premium, infrastructure |
| accent-dim | #9D8456 | Muted brass for secondary actions |
| text-primary | #FFFFFF | Primary headings, key content |
| text-secondary | #A3A3A3 | Body copy, descriptions |
| text-muted | #717171 | Metadata, labels, disabled |
| border | #2A2A2A | Hairline dividers, container edges |
| success | #2E7D32 | Land/development, growth actions |

## Typography
- **Display**: `Syne` (geometric, architectural, industrial character) — headlines, numbers, hero
- **Body**: System stack (`-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Inter, sans-serif`) — Apple-native readability
- **Mono**: `JetBrains Mono` — coordinates, data, technical specs

Type scale (clamp-based, fluid):
- Display XL: `clamp(4rem, 8vw, 10rem)` / 1.05 leading / 600 weight / -0.03em tracking
- Display L: `clamp(3rem, 5vw, 5rem)` / 1.1 leading / 500 weight / -0.02em tracking
- Display M: `clamp(2rem, 3vw, 3.5rem)` / 1.15 leading / 500 weight / -0.01em tracking
- Heading: `clamp(1.5rem, 2vw, 2.25rem)` / 1.2 leading / 500 weight
- Body L: `clamp(1.125rem, 1.2vw, 1.25rem)` / 1.6 leading / 400 weight
- Body: `1rem` / 1.6 leading / 400 weight
- Small: `0.875rem` / 1.5 leading / 400 weight
- Micro: `0.75rem` / 1.4 leading / 500 weight / 0.05em tracking / uppercase

## Layout Concept
**Hero (21:9 cinematic)**: Full-viewport, layered parallax — machinery silhouette + location coordinates + founder name. Scroll begins the narrative.

**Services as chapters**: Not cards. Each service occupies a full viewport chapter revealed through scroll:
1. Consulting → strategic lines, blueprint aesthetic
2. Construction → raw material textures, progress indicators
3. Heavy Machinery → spec sheets, serial-number style data
4. Land Acquisition → map coordinates, parcel boundaries
5. Development → phased timeline, elevation

**About/Leadership**: Founder portrait with industrial portraiture style — asymmetric, text wrapping around image.

**Contact/Locations**: Chennai + Gummidipondi as geographic anchors. Map-inspired layout.

**Alignment**: Left-aligned primary, centered only for hero headline. Asymmetric margins create tension.

## Principles
1. **Industrial elegance** — machinery aesthetic meets premium minimalism. Brass accent on near-black feels like engraved equipment plates.
2. **Depth over decoration** — parallax layers, scale shifts, opacity ramps create spatial depth. No shadows, no gradients as decoration.
3. **One orchestrated scroll** — single narrative timeline. Each viewport = one beat. No scattered hover effects.
4. **Content as structure** — services revealed through scroll position, not grid cards. Technical data (specs, coordinates, tonnage) as visual rhythm.
5. **South Indian context, not ornament** — Chennai coordinates (13.0827° N, 80.2707° E), Gummidipondi (13.4067° N, 80.1089° E) as subtle datelines. Tamil typography nod in microcopy.
6. **Restrained motion** — `prefers-reduced-motion` respected. ScrollTrigger only. No auto-play loops.
7. **Apple-grade polish** — 60fps scroll, sub-pixel text rendering, native scroll behavior (no scrolljacking), fluid type, touch-friendly.