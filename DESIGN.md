# DESIGN.md — NihonStep Design System

**Aesthetic Direction:** Botanical Japanese Study Workspace
**Inspirations:** Japanese stationery, soft botanical classrooms, contemporary language textbooks, calm editorial layouts.
**Philosophy:** Focused and reassuring, with visible color and soft depth. The interface should feel lively without competing with study content. Avoid decorative clichés and loud dashboard styling.

---

## 1. Design Tokens

### 1.1 Color Palette (Botanical Study)

| Token | CSS Variable / Value | Role / Usage |
| :--- | :--- | :--- |
| **Forest** | `#5D7B6F` (`--color-forest`) | Primary actions, active navigation, focus, progress |
| **Sage** | `#A4C3A2` (`--color-sage`) | Supporting sections, borders and study chips |
| **Mint** | `#B0D4B8` (`--color-mint`) | Success, progress fills and soft interactive surfaces |
| **Sand** | `#EAE7D6` (`--color-sand`) | Main page background |
| **Aqua** | `#D7F9FA` (`--color-aqua`) | Exam, question and reading highlights |
| **Surface** | `#F9FAF4` (`--surface-card`) | Warm light card surface; use instead of plain white |
| **Ink** | `#23342E` (`--text-primary`) | Primary readable text |
| **Pencil** | `#465D54` (`--text-secondary`) | Supporting copy and instructions |
| **Urgent** | `#A34E46` | Timer warning and “chưa thuộc”; reserved for state meaning |

### 1.2 Typography Hierarchy

* **UI & Roman Type**: `Inter`, `-apple-system`, `BlinkMacSystemFont`, `sans-serif`
* **Japanese Script Type**: `'Noto Sans JP'`, `'Hiragino Sans'`, `'Hiragino Kaku Gothic ProN'`, `'Meiryo'`, `sans-serif`
* **Japanese Reading Passage (Editorial)**: `'Noto Serif JP'`, `'Shippori Mincho'`, `serif`

| Scale Token | Font Size | Line Height | Tracking | Usage |
| :--- | :--- | :--- | :--- | :--- |
| `display-jp` | `3rem` (48px) | `1.25` | `0.02em` | Main Flashcard Kanji / Kana (Centerpiece) |
| `h1` | `2rem` (32px) | `1.3` | `-0.02em` | Screen titles |
| `h2` | `1.5rem` (24px) | `1.35` | `-0.01em` | Section headers, Teacher speaking question |
| `h3` | `1.125rem` (18px) | `1.4` | `0` | Sub-headers, reading titles |
| `body-jp` | `1.25rem` (20px) | `1.85` | `0.04em` | Part 1 Reading passage (generous line spacing for easy aloud reading) |
| `body` | `0.9375rem` (15px)| `1.6` | `0` | Standard UI body text |
| `subtext` | `0.8125rem` (13px)| `1.5` | `0.01em` | Metadata, counts, meanings |
| `caption` | `0.6875rem` (11px)| `1.4` | `0.04em` | Keyboard shortcuts, tags, badges |

### 1.3 Spacing Scale
Based on a 4px/8px modular rhythm:
* `2xs`: 4px (`space-1`)
* `xs`: 8px (`space-2`)
* `sm`: 12px (`space-3`)
* `md`: 16px (`space-4`)
* `lg`: 24px (`space-6`)
* `xl`: 32px (`space-8`)
* `2xl`: 48px (`space-12`)
* `3xl`: 64px (`space-16`)

### 1.4 Elevation & Border Radius
In keeping with Japanese stationery craft:
* Use a border for structure and a low, green-tinted shadow only for raised study surfaces.
* **Border Radii**:
  * Flashcards & Exam Panels: `16px` (`rounded-2xl`)
  * Buttons & Inputs: `10px` (`rounded-xl`)
  * Badges & Keycaps: `6px` (`rounded-md`)
  * No overly round "pill" buttons unless used for tiny tag labels.

### 1.5 Motion & Transitions
* **Controls**: 180–260ms for hover, press and state changes.
* **Page / step entrance**: 420–520ms with `cubic-bezier(0.16, 1, 0.3, 1)`.
* **Flashcard**: 560ms 3D flip on an isolated inner layer; card changes use a separate 420ms horizontal arrival. The back face uses warm washi `#F3EBDD` to reduce glare.
* **Decorative type**: 16–24s transform-only drift with varied negative delays.
* **Reduced Motion**: Spatial and looping animations are removed under `prefers-reduced-motion`.

### 1.6 Responsive Breakpoints
* **Mobile (`<640px`)**: Full-width comfortable card margins (16px), touch targets >= 44px, sticky action bar.
* **Tablet (`640px - 1024px`)**: Centered 600px study card, keyboard guide visible.
* **Laptop / Desktop (`>1024px`)**: Optimal 720px reading container, breathing room, max line-length 65ch.
