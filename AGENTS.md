# AGENTS.md — `exelearning-style-hacker`

Context and operating notes for future coding agents (Claude Code, Codex, etc.) that pick up work on this repository.

## 1. What this repository is

Two things coexist in the same repo, by design:

1. **The Hacker style** for eXeLearning, living in `theme/`. This is what gets zipped on every release and uploaded as `exelearning-style-hacker-<version>.zip`, which the user can import from the eXeLearning app (*Utilidades → Importar estilo*).
2. **An example unit** about *el ciclo del agua*, in the form of an **ELPX extracted at the repository root** (`index.html`, `content.xml`, `html/`, `idevices/`, `libs/`, `content/`, `search_index.js`). Serving this root with any static HTTP server is enough to preview the style in action.
   - The repo root **is** the ELPX. To open it live in eXeLearning the link
     `https://static.exelearning.dev/?url=https://github-proxy.exelearning.dev/?repo=ateeducacion/exelearning-style-hacker&branch=main`
     goes through `github-proxy.exelearning.dev`, which zips the repo on the fly and hands it to `static.exelearning.dev`. There is **no pre-built `.elpx` committed** — the canonical source is always the unzipped repo, so any edit to `theme/`, `content.xml`, `html/`, etc. is picked up by the next click on the link.

## 2. Repository layout

```
/
├── theme/                       ← canonical source of truth for the style
│   ├── config.xml
│   ├── style.css                ← main stylesheet (see §5)
│   ├── style.js                 ← tweaks panel, matrix rain, boot, typewriter
│   ├── screenshot.png
│   ├── fonts/                   ← JetBrains Mono + VT323 (self-hosted)
│   ├── icons/                   ← iDevice icons (SVG)
│   └── img/                     ← licenses.gif, home.png, icons.png sprite
├── imagenes-generadas/          ← source PNG illustrations (1–11)
├── content/, html/, idevices/,
│   libs/, content.xml, ...      ← unzipped ELPX for static browser preview
├── reference/                   ← design handoff notes (not shipped)
├── scripts/                     ← build_water_cycle.py + social preview
├── .github/workflows/release.yml
├── LICENSE                      ← CC0 for original repo content
├── README.md                    ← user-facing README (short)
└── AGENTS.md                    ← this file
```

`theme/*` is the only thing that ends up in the distributable zip. Everything else exists to support preview and example.

## 3. How the theme is wired to eXeLearning

eXeLearning reads themes from `public/files/perm/themes/base/<name>/`. During local development:

```
eXe repo   public/files/perm/themes/base/hacker
              ⇣ symlink
style repo theme/
```

Because `theme/` here is the canonical source, editing `style.css`, `style.js` or any icon in the style repo is reflected in the eXe app immediately (`make up-local`) and in the previewable ELPX at the repo root (via browser reload).

**Creating the symlink after cloning (developer setup):**

```bash
ln -s "$PWD/theme" \
  /path/to/exelearning/public/files/perm/themes/base/hacker
```

The real files stay in this style repo; eXeLearning just follows the symlink. **Never commit a symlink into eXeLearning's repo**; that decouples the style version from the style repo.

## 4. How eXeLearning looks for a theme

Minimum contract (enforced by `src/shared/parsers/theme-parser.ts` in the eXe repo):

| File / folder           | Required | Purpose                                                       |
| ----------------------- | -------- | ------------------------------------------------------------- |
| `theme/config.xml`      | yes      | Name (`hacker`), title (`Hacker`), version, author, license, description, `<downloadable>1</downloadable>`. |
| `theme/style.css`       | yes      | Stylesheet. Must target eXeLearning's DOM classes (`.exe-content`, `.box`, `.box-head`, `.box-content`, `.exe-web-site`, `#siteNav`, `#siteBreadcrumbs`, `.nav-buttons`, `.page-counter`, …). |
| `theme/style.js`        | optional | jQuery script that runs on the exported page. Hosts the tweaks panel, matrix-rain canvas, boot overlay, Tron border draw-in, typewriter and PipBoy rail widgets. |
| `theme/screenshot.png`  | yes      | Preview shown in the theme picker. ~800×500 px works. |
| `theme/icons/*.svg`     | optional | iDevice block icons. File name without extension is what goes in `<iconName>`. |
| `theme/img/icons.png`   | optional | Sprite used for toggler/nav buttons (menu, search, dark-mode, box-toggle, accordion arrow). The hacker theme largely replaces this with inline SVG data URIs; keep the PNG as a fallback. |
| `theme/img/home.png`    | optional | Icon for the breadcrumb root link. |
| `theme/img/licenses.gif`| optional | Sprite with the CC license badges. |
| `theme/fonts/*`         | optional | Self-hosted font files (`.woff2` preferred). |

A theme is discovered automatically when the folder lives at `public/files/perm/themes/base/<name>/` and `config.xml` is parseable.

## 5. What the Hacker style does

Highlights that should be preserved by any refactor:

- **Black terminal background** with a swappable **neon accent** — green (default), amber/orange, or cyan — exposed as `--hk-accent` and toggled by body classes `body.hk-accent-green`, `body.hk-accent-amber`, `body.hk-accent-cyan`.
- **Matrix digital rain** on a full-screen `<canvas>` rendered behind content (`#hkMatrixRain`, `position: fixed; z-index: 0`). Driven by `requestAnimationFrame` and toggleable via `body[data-rain="on|off"]`.
- **Tron-style border draw-in** on every `.box`: four CSS-animated segments (top → right → bottom → left) that draw in sequence on page load / nav change, plus glowing corner notches.
- **AI typewriter effect** on text iDevice prose: characters appear one by one with a blinking block cursor. Must respect `prefers-reduced-motion`.
- **PipBoy-style left sidebar** around `#siteNav`: `EXE//` logo, fake stat bars (HP / XP / PRG), tabs (DATA / MAP / INV / STAT), active-page marker with a blinking bar, and a footer with clock + blinking `● REC` indicator.
- **CRT scanlines overlay** + optional **flicker** + optional **curved-frame vignette**.
- **Boot-up intro** once per session (ROBCO-style TERMLINK text), skippable with any key / click. Shown only if `sessionStorage['exe-hacker-booted']` is unset.
- **Tweaks panel** (`#hkTweaks`) built at runtime by `style.js`, gear button in the top bar, toggled with `T`, closed with `Esc`. State persisted in `localStorage.exeHackerTweaks` (JSON).
- **Keyboard shortcuts**: `←` / `→` for prev/next page, `T` for tweaks panel, `Esc` to close any overlay (tweaks or boot).

### Tweaks panel contract

The panel exposes seven controls, all persisted as a JSON blob in `localStorage.exeHackerTweaks`:

| Key           | Values                     | Body class applied                 | Notes |
| ------------- | -------------------------- | ---------------------------------- | ----- |
| `accent`      | `green` · `amber` · `cyan` | `hk-accent-<value>`                | Drives `--hk-accent`. Default `green`. |
| `rain`        | `on` · `off`               | `data-rain` attribute              | Pauses `requestAnimationFrame` when `off`. |
| `scanlines`   | `on` · `off`               | `hk-scanlines`                     | CRT horizontal lines. Default `on`. |
| `flicker`     | `on` · `off`               | `hk-flicker`                       | Subtle brightness jitter. Default `off`. |
| `curve`       | `off` · `on`               | `hk-curve`                         | Vignette + barrel-ish framing. Default `off`. |
| `pixelFont`   | `chrome` · `all` · `none`  | `hk-pixel-all` / `hk-pixel-none`   | VT323 scope. Default `chrome` (titles only). |
| `typewriter`  | `on` · `off`               | `hk-typewriter`                    | Suppressed automatically under `prefers-reduced-motion`. |

Plus a **"reproducir intro"** action button that clears `sessionStorage['exe-hacker-booted']` and replays the boot overlay immediately.

CSS variables (top of `style.css`):

```
--hk-bg         Terminal black.
--hk-accent     Active neon (green | amber | cyan), swapped by body class.
--hk-accent-dim Darker shade for grids, borders, inactive states.
--hk-ink        Foreground body text.
--hk-danger     Red-orange used for errors / REC indicator.
--font-mono     JetBrains Mono family stack.
--font-pixel    VT323 family stack.
```

## 6. The example unit and the builder script

The example unit is generated from a Python script kept out of the repo on purpose (it references the eXe repo's CLI); a working copy lives at `scripts/build_water_cycle.py`. The output of the pipeline is the **unzipped workspace at the repo root** — there is no committed `.elpx`, since `github-proxy.exelearning.dev` zips the repo on demand.

Pipeline to regenerate it:

```bash
# 1. Build the .elp source
python3 scripts/build_water_cycle.py        # → /tmp/water-cycle.elp

# 2. Export to .elpx using eXeLearning's CLI and the hacker theme
make -C /path/to/exelearning export-elpx \
  FORMAT=elpx \
  INPUT=/tmp/water-cycle.elp \
  OUTPUT=/tmp/water-cycle.elpx \
  THEME=hacker                               # → /tmp/water-cycle.elpx

# 3. Refresh the workspace (keep theme/ and imagenes-generadas/)
cd /Users/ernesto/Downloads/git/exelearning-style-hacker
rm -rf content content.dtd content.xml html idevices index.html libs search_index.js
unzip -q -o /tmp/water-cycle.elpx -x "theme/*"
```

What the builder produces:

- 11 pages with descriptive titles (`Bienvenida`, `¿Qué es el ciclo del agua?`, `El Sol pone el agua en marcha`, …) and iDevice block icons.
- Each text iDevice embeds one of the 11 PNG illustrations from `imagenes-generadas/` via `content/resources/<n>-*.png`.
- Two interactive iDevices: `scrambled-list` for ordering the phases, `trueorfalse` for four statements.
- A `download-source-file` iDevice on the last page (download the .elp).
- Two action buttons on intro and credits: **Abrir en eXeLearning** (`static.exelearning.dev/?url=https://github-proxy.exelearning.dev/?repo=ateeducacion/exelearning-style-hacker&branch=main`) and **Descargar estilo** (GitHub latest release `hacker.zip`).
- `pp_addSearchBox=true`, `pp_addPagination=true`, `pp_theme=hacker`, `pp_exportElp=true`.

## 7. Critical gotchas

1. **Bash tool resets `cwd` between calls.** A previous session wiped `/Users/ernesto/Downloads/git/exelearning_4` because `find . -maxdepth 1 ... -exec rm -rf {} +` ran from the wrong directory. **Always use absolute paths** in `find`, `rm`, `unzip`, and friends. Never rely on `cd` persisting.
2. **Preserve the theme symlink.** When extracting a fresh ELPX into this repo, always pass `-x "theme/*"` to `unzip` so the canonical style files are not overwritten by the ELPX's copy. Confirm with `test -L theme || test -d theme` before and after.
3. **Icon file names go into `<iconName>` without extension.** The renderer resolves `<iconName>book` → `theme/icons/book.svg` (or `.png`). Renaming an icon file is a breaking change.
4. **`localStorage` / `sessionStorage` keys to know:**
   - `localStorage.exeDarkMode` — legacy dark-mode flag (`on`), still respected for compatibility.
   - `localStorage.exeHackerTweaks` — JSON blob with `accent`, `rain`, `scanlines`, `flicker`, `curve`, `pixelFont`, `typewriter`.
   - `sessionStorage['exe-hacker-booted']` — flag set after the boot overlay plays; clear it to force a replay.
   Tests/screenshots should clear these keys before asserting visual state.
5. **Biome lints `style.js` loudly** (`var`, `$`, etc.). Every eXeLearning theme script is in this legacy style; this is expected and is not a CI blocker.
6. **The extracted ELPX duplicates eXeLearning libs** (`libs/`, `idevices/`, `content/`). Regenerating the example refreshes those — they are intentionally committed so `git clone && python3 -m http.server` gives a live preview without a build step, and so `github-proxy.exelearning.dev` can zip the repo into a valid ELPX without any server-side assembly.
7. **Use one license for original content.** The repository's original content is CC0: the theme, README/project prose, example unit and generated illustrations. Third-party runtime files and bundled libraries keep their own declared licenses.
8. **Matrix-rain canvas z-index.** `#hkMatrixRain` MUST sit at `z-index: 0` behind `.exe-content`. Any element that wants to appear above the rain (tweaks panel, boot overlay, PipBoy rail, modals) must declare its own positive `z-index`. Do not introduce a positioned ancestor with `z-index: auto` that would trap content below the canvas.
9. **Pause rAF when rain is off.** When `body[data-rain="off"]`, `style.js` must `cancelAnimationFrame` (or bail early in the frame callback) — a paused canvas still burns CPU if the loop keeps ticking. Restart the loop when the tweak flips back to `on`.
10. **Apply tweaks pre-render to avoid FOUC.** The stored `exeHackerTweaks` must be parsed and the corresponding body classes / `data-*` attributes applied **synchronously before paint** (inline snippet in `<head>` or the first line of `style.js` if it runs head-early). Otherwise the default green/scanlines/rain flashes before the user's saved accent (e.g. amber) takes over.
11. **Boot overlay must outrank the tweaks panel.** Use `z-index: 9999` (or above) for `#hkBoot` and a lower one (e.g. `2000`) for `#hkTweaks` so pressing `T` during boot does not reveal a panel behind the intro.
12. **Typewriter respects `prefers-reduced-motion`.** When the media query matches, skip the character-by-character reveal and render the prose instantly with the cursor hidden. Same fallback applies if the `typewriter` tweak is `off`.
13. **Duplicated eXe libs vs. `libs/`.** Do not manually edit `libs/` or `idevices/`; they are re-extracted from each `.elpx` export. Your changes belong in `theme/`.

## 8. Open work items (as of the session that produced this file)

- **Responsive rail collapse.** On viewports < 900 px the PipBoy left rail should either collapse to a slim icon strip or dock to the top. Currently it can push main content off-screen. Needs a `@media (max-width: 899.98px)` pass.
- **Mobile tweaks layout.** The tweaks panel is a fixed-size floater on desktop; on small screens it should become a full-height drawer. Pending design + CSS.
- **Accessibility audit.** Check keyboard focus order (rail → top bar → content → tweaks), announce boot overlay with `role="dialog"` + `aria-label`, make the typewriter reveal non-disruptive for screen readers (use `aria-live="off"` on the animated node and expose full text via `aria-label`).
- **Per-page Tron re-draw on SPA navigation.** If/when eXeLearning ships an in-page router (currently each page is a full reload), the `.box` draw-in animations must be re-triggered on route change. Today it relies on CSS animations firing once per DOMContentLoaded; an `IntersectionObserver` or MutationObserver would make it robust.
- **Release pipeline.** `.github/workflows/release.yml` already zips `theme/` on tag push and uploads it as `exelearning-style-hacker-<version>.zip`. The `Descargar estilo` link in README and the intro page points at `/releases/latest/download/hacker.zip` (alias asset); keep both in sync.
- **eXelearning gitarchive filter.** Exclude `public/files/perm/themes/base/hacker/` from the upstream eXeLearning release archive, since this style lives in its own repo now. See `GITARCHIVE.md`.

## 9. How to land changes

1. Work only inside `/Users/ernesto/Downloads/git/exelearning-style-hacker/`, using absolute paths.
2. Style changes? Edit `theme/style.css` or `theme/style.js`. Reload the live preview; no rebuild needed.
3. Example-unit changes? Edit `scripts/build_water_cycle.py` and re-run the pipeline in §6. Commit the regenerated `content.xml`, `index.html`, `html/`, and `content/resources/`.
4. README or AGENTS.md changes? Keep them short. The `README.md` is the user-facing landing page on GitHub.
5. `git commit -m "…" && git push`. The remote is `git@github.com:ateeducacion/exelearning-style-hacker.git`.

## 10. Attribution

Author: Área de Tecnología Educativa · Consejería de Educación, Formación Profesional, Actividad Física y Deportes del Gobierno de Canarias.

Fonts: JetBrains Mono (JetBrains), VT323 (Peter Hull) — both SIL OFL 1.1.

eXeLearning: maintained by [CEDEC](https://cedec.intef.es/) and the State education administrations.
