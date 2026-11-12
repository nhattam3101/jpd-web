# DESIGN.md — NihonStep Design System

**Aesthetic Direction:** Japanese Editorial + Minimal Study Workspace  
**Inspirations:** Japanese stationery (Midori MD, Kokuyo Campus, MUJI minimalism), contemporary Japanese textbooks, editorial study desk.  
**Philosophy:** Calm, distraction-free, focused on legibility and long-duration study. Zero decorative cliché (no sakura, no anime, no torii, no purple-cyan AI gradients).

---

## 1. Design Tokens

### 1.1 Color Palette (Japanese Paper & Ink)

| Token | CSS Variable / Value | Role / Usage |
| :--- | :--- | :--- |
| **Background (Paper)** | `#FBFBFA` (`--bg-paper`) | Warm off-white paper ground, soft on the eyes during long study sessions |
| **Surface (Card / Desk)** | `#FFFFFF` (`--surface-card`) | Crisp paper card surface |
| **Surface Subtle** | `#F4F3EE` (`--surface-subtle`) | Secondary panels, keycaps, subtle counters |
| **Border (Rule)** | `#E7E5E0` (`--border-rule`) | Delicate 1px notebook rule line |
| **Border Active / Strong** | `#D4D1C8` (`--border-strong`) | Focused or hovered border |
| **Text Primary (Sumi Ink)** | `#191817` (`--text-primary`) | Deep sumi-e charcoal black (Contrast > 14:1) |
| **Text Secondary (Pencil)** | `#605E59` (`--text-secondary`) | Neutral pencil tone for subtext and hints (Contrast > 5.5:1) |
| **Text Tertiary (Muted)** | `#8A8780` (`--text-tertiary`) | Subtle metadata, timestamps, shortcut keys |
| **Primary (Aizome Indigo)** | `#1E2B37` (`--color-primary`) | Restrained deep Japanese indigo for primary buttons and active indicators |
| **Primary Hover** | `#141E27` (`--color-primary-hover`) | Deepened indigo on hover |
| **Accent / Urgent (Hanko Red)** | `#B93829` (`--color-hanko-red`) | Subdued vermilion stamp red for "Chưa thuộc" and critical exam timer |
| **Success (Matcha Green)** | `#2B6E48` (`--color-matcha-green`) | Subdued tea green for "Đã thuộc" and completed states |
| **Highlight (Washi Ochre)** | `#8A6421` (`--color-ochre`) | Refined golden ochre for Vietnamese meanings and key vocabulary |

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
* **No heavy drop shadows**: Use crisp 1px borders (`border-rule`) with optional subtle offset shadow: `0 1px 3px rgba(0,0,0,0.04), 0 10px 24px -4px rgba(0,0,0,0.04)`.
* **Border Radii**:
  * Flashcards & Exam Panels: `16px` (`rounded-2xl`)
  * Buttons & Inputs: `10px` (`rounded-xl`)
  * Badges & Keycaps: `6px` (`rounded-md`)
  * No overly round "pill" buttons unless used for tiny tag labels.

### 1.5 Motion & Transitions
* **Duration**: Fast, crisp transitions (150ms to 200ms).
* **Easing**: `cubic-bezier(0.16, 1, 0.3, 1)` (smooth, decisive deceleration).
* **Flashcard Flip**: Quick 250ms card flip with 3D preserve, subtle elevation lift.
* **Prefers Reduced Motion**: Transitions collapse to instant opacity swap when reduced motion is requested.

### 1.6 Responsive Breakpoints
* **Mobile (`<640px`)**: Full-width comfortable card margins (16px), touch targets >= 44px, sticky action bar.
* **Tablet (`640px - 1024px`)**: Centered 600px study card, keyboard guide visible.
* **Laptop / Desktop (`>1024px`)**: Optimal 720px reading container, breathing room, max line-length 65ch.
