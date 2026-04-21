from pathlib import Path


ICON_DIR = Path("/Users/ernesto/Downloads/git/exelearning-style-hacker/theme/icons")

BASE_FRAME = [
    '<path d="M3 2.5H5.5"/>',
    '<path d="M2.5 3V5.5"/>',
    '<path d="M10.5 2.5H13"/>',
    '<path d="M13.5 3V5.5"/>',
    '<path d="M13.5 10.5V13"/>',
    '<path d="M10.5 13.5H13"/>',
    '<path d="M3 13.5H5.5"/>',
    '<path d="M2.5 10.5V13"/>',
]

ICON_GLYPHS = {
    "activity": [
        '<path d="M3.5 9.5H5.2L6.4 6.3L7.7 10.2L9.2 5.6L10.5 8.3H12.5"/>',
    ],
    "agreement": [
        '<path d="M8 3.4L11.6 4.8V8.1C11.6 10.3 10.2 12.1 8 13.1C5.8 12.1 4.4 10.3 4.4 8.1V4.8L8 3.4Z"/>',
        '<path d="M6.2 8.2L7.4 9.4L9.9 6.9"/>',
    ],
    "alert": [
        '<path d="M8 3.2L12 11.7H4L8 3.2Z"/>',
        '<path d="M8 6.1V8.7"/>',
        '<circle cx="8" cy="10.3" r="0.55"/>',
    ],
    "arts": [
        '<path d="M5 10.8C5.7 8.3 7.2 5.9 10.3 4.2L11.8 5.7C10.1 8.8 7.7 10.3 5.2 11Z"/>',
        '<path d="M10.4 4.2L11.9 2.7L13.3 4.1L11.8 5.6"/>',
        '<path d="M4.6 11.3L3.7 12.3"/>',
    ],
    "ask": [
        '<path d="M5.2 5.6C5.5 4.5 6.6 3.7 8 3.7C9.7 3.7 10.9 4.7 10.9 6.1C10.9 7.2 10.2 7.8 9.3 8.4C8.5 8.9 8.1 9.4 8.1 10.1"/>',
        '<circle cx="8" cy="12" r="0.55"/>',
    ],
    "book": [
        '<path d="M4.2 4.1H8V11.8H4.8C4.1 11.8 3.6 11.2 3.6 10.5V4.9C3.6 4.4 3.9 4.1 4.2 4.1Z"/>',
        '<path d="M11.8 4.1H8V11.8H11.2C11.9 11.8 12.4 11.2 12.4 10.5V4.9C12.4 4.4 12.1 4.1 11.8 4.1Z"/>',
        '<path d="M5.1 6H7.1"/>',
        '<path d="M8.9 6H10.9"/>',
    ],
    "calculate": [
        '<rect x="4.1" y="3.8" width="7.8" height="8.4" rx="1"/>',
        '<path d="M5.5 5.5H10.5"/>',
        '<path d="M5.5 8H6.7M8 8H9.2M10.5 8H10.5"/>',
        '<path d="M5.5 10.2H6.7M8 10.2H9.2M10.5 10.2H10.5"/>',
    ],
    "case": [
        '<rect x="3.7" y="5.2" width="8.6" height="6.1" rx="1"/>',
        '<path d="M6 5.2V4.3C6 3.8 6.4 3.4 6.9 3.4H9.1C9.6 3.4 10 3.8 10 4.3V5.2"/>',
        '<path d="M3.7 8H12.3"/>',
    ],
    "chrono": [
        '<circle cx="8" cy="8.2" r="3.8"/>',
        '<path d="M8 8.2L8 6.1"/>',
        '<path d="M8 8.2L10 9.4"/>',
        '<path d="M6.6 3.6H9.4"/>',
    ],
    "collaborative": [
        '<circle cx="5" cy="5.2" r="1.1"/>',
        '<circle cx="11" cy="5.2" r="1.1"/>',
        '<circle cx="8" cy="10.8" r="1.1"/>',
        '<path d="M5.9 5.8L7.1 9.7"/>',
        '<path d="M10.1 5.8L8.9 9.7"/>',
        '<path d="M6.1 5.2H9.9"/>',
    ],
    "competencies": [
        '<path d="M8 3.8L9.2 6.1L11.8 6.5L9.9 8.3L10.4 10.9L8 9.6L5.6 10.9L6.1 8.3L4.2 6.5L6.8 6.1L8 3.8Z"/>',
    ],
    "diary": [
        '<rect x="4.1" y="3.6" width="7.8" height="8.8" rx="1"/>',
        '<path d="M6.1 3.6V12.4"/>',
        '<path d="M7.4 5.7H10.2"/>',
        '<path d="M7.4 8H10.2"/>',
    ],
    "diary_alt": [
        '<rect x="4.1" y="3.6" width="7.8" height="8.8" rx="1"/>',
        '<path d="M6.1 3.6V12.4"/>',
        '<path d="M9.6 3.6V7.1L8.4 6.3L7.2 7.1V3.6"/>',
    ],
    "discuss": [
        '<path d="M4 4.5H10.6C11.5 4.5 12.1 5.1 12.1 6V8.1C12.1 9 11.5 9.6 10.6 9.6H7.2L4.8 11.5V9.6H4C3.1 9.6 2.5 9 2.5 8.1V6C2.5 5.1 3.1 4.5 4 4.5Z"/>',
        '<path d="M5.3 6.8H9.3"/>',
        '<path d="M5.3 8H8.3"/>',
    ],
    "download": [
        '<path d="M8 3.8V9.2"/>',
        '<path d="M5.8 7.3L8 9.5L10.2 7.3"/>',
        '<path d="M4.2 11.2H11.8"/>',
    ],
    "draw": [
        '<path d="M4.2 10.9L4.8 8.5L9.8 3.5L12.5 6.2L7.5 11.2L5.1 11.8Z"/>',
        '<path d="M9 4.3L11.7 7"/>',
    ],
    "english": [
        '<path d="M3.6 4.6H10.4C11.3 4.6 11.9 5.2 11.9 6.1V8.1C11.9 9 11.3 9.6 10.4 9.6H7.3L4.8 11.4V9.6H3.6C2.7 9.6 2.1 9 2.1 8.1V6.1C2.1 5.2 2.7 4.6 3.6 4.6Z"/>',
        '<path d="M5 8.5L6.2 5.9L7.4 8.5"/>',
        '<path d="M5.4 7.7H7"/>',
    ],
    "experiment": [
        '<path d="M6.2 3.5H9.8"/>',
        '<path d="M7 3.5V6.1L4.5 10.6C4.1 11.4 4.7 12.3 5.6 12.3H10.4C11.3 12.3 11.9 11.4 11.5 10.6L9 6.1V3.5"/>',
        '<path d="M5.8 9.3H10.2"/>',
    ],
    "explore": [
        '<circle cx="8" cy="8" r="3.9"/>',
        '<path d="M6.5 9.5L7.4 6.4L10.5 5.5L9.6 8.6L6.5 9.5Z"/>',
    ],
    "file": [
        '<path d="M5 3.5H9.2L11.5 5.8V12.1H5Z"/>',
        '<path d="M9.2 3.5V5.8H11.5"/>',
        '<path d="M6.3 7.3H9.8"/>',
        '<path d="M6.3 9.1H9.8"/>',
    ],
    "gallery": [
        '<rect x="3.6" y="4.2" width="8.8" height="7.2" rx="1"/>',
        '<circle cx="6.1" cy="6.4" r="0.7"/>',
        '<path d="M4.8 10L7.2 7.7L8.8 9.1L10.4 7.3L11.2 8.2V10"/>',
    ],
    "geography": [
        '<circle cx="8" cy="8" r="4"/>',
        '<path d="M4.2 8H11.8"/>',
        '<path d="M8 4.1C9.2 5.2 9.8 6.6 9.8 8C9.8 9.4 9.2 10.8 8 11.9C6.8 10.8 6.2 9.4 6.2 8C6.2 6.6 6.8 5.2 8 4.1Z"/>',
    ],
    "guide": [
        '<path d="M5 3.2V12.8"/>',
        '<path d="M5 4.2H10.8L9.4 6.1L10.8 8H5"/>',
        '<path d="M5 8.8H9.8L8.5 10.5L9.8 12.1H5"/>',
    ],
    "history": [
        '<path d="M5.2 3.7H10.8"/>',
        '<path d="M5.2 12.3H10.8"/>',
        '<path d="M5.2 3.7V5.3C5.2 6.5 6.2 7.3 8 8C9.8 8.7 10.8 9.5 10.8 10.7V12.3"/>',
        '<path d="M10.8 3.7V5.3C10.8 6.5 9.8 7.3 8 8C6.2 8.7 5.2 9.5 5.2 10.7V12.3"/>',
    ],
    "info": [
        '<circle cx="8" cy="4.7" r="0.6"/>',
        '<path d="M8 6.6V11"/>',
        '<path d="M6.9 11H9.1"/>',
    ],
    "interactive": [
        '<path d="M5.1 3.8L10.7 8.2L8.4 8.8L9.6 12.2L8.1 12.7L6.9 9.3L5.1 10.9Z"/>',
    ],
    "letters": [
        '<rect x="3.3" y="4.4" width="9.4" height="7.2" rx="0.9"/>',
        '<path d="M3.8 5L8 8.1L12.2 5"/>',
    ],
    "listen": [
        '<path d="M4.8 8V7.4C4.8 5.6 6.2 4.2 8 4.2C9.8 4.2 11.2 5.6 11.2 7.4V8"/>',
        '<rect x="3.7" y="7.8" width="1.8" height="3.2" rx="0.7"/>',
        '<rect x="10.5" y="7.8" width="1.8" height="3.2" rx="0.7"/>',
    ],
    "math": [
        '<path d="M5 5.4H7.4"/>',
        '<path d="M6.2 4.2V6.6"/>',
        '<path d="M8.8 4.8H11"/>',
        '<path d="M8.8 6.2H11"/>',
        '<path d="M5.1 10.7H7.3"/>',
        '<path d="M8.9 9.5L11 11.6"/>',
        '<path d="M11 9.5L8.9 11.6"/>',
    ],
    "music": [
        '<path d="M9.5 4.1V9.3"/>',
        '<path d="M9.5 4.1L11.5 4.7V9.9"/>',
        '<circle cx="7" cy="10.8" r="1.1"/>',
        '<circle cx="11" cy="10.3" r="1.1"/>',
    ],
    "nature": [
        '<path d="M11.5 4.6C8.4 4.5 5.4 6.4 4.7 9.8C7.8 9.9 10.8 8 11.5 4.6Z"/>',
        '<path d="M5.7 9.1C7 8.1 8.5 7.3 10.4 6.6"/>',
    ],
    "objectives": [
        '<circle cx="8" cy="8" r="3.7"/>',
        '<circle cx="8" cy="8" r="1.8"/>',
        '<path d="M8 4.3V8L10.8 6.2"/>',
    ],
    "observe": [
        '<path d="M3.4 8C4.7 5.8 6.2 4.7 8 4.7C9.8 4.7 11.3 5.8 12.6 8C11.3 10.2 9.8 11.3 8 11.3C6.2 11.3 4.7 10.2 3.4 8Z"/>',
        '<circle cx="8" cy="8" r="1.5"/>',
    ],
    "passport": [
        '<rect x="4.1" y="3.6" width="7.8" height="8.8" rx="1"/>',
        '<path d="M6.1 3.6V12.4"/>',
        '<circle cx="8.8" cy="7.2" r="1.6"/>',
        '<path d="M7.2 7.2H10.4"/>',
        '<path d="M8.8 5.6C9.4 6 9.7 6.6 9.7 7.2C9.7 7.8 9.4 8.4 8.8 8.8C8.2 8.4 7.9 7.8 7.9 7.2C7.9 6.6 8.2 6 8.8 5.6Z"/>',
    ],
    "perform": [
        '<path d="M5 10.8L6.2 8.4L8.5 6.1L10.8 4.9L9.6 7.2L7.3 9.5L5 10.8Z"/>',
        '<path d="M8.7 5.9L10.7 3.9"/>',
        '<path d="M5.4 10.4L4.3 11.5"/>',
    ],
    "piece": [
        '<path d="M5.2 4.5H7C7.2 3.8 7.6 3.5 8 3.5C8.4 3.5 8.8 3.8 9 4.5H10.8V6.3C11.5 6.5 11.8 6.9 11.8 7.3C11.8 7.7 11.5 8.1 10.8 8.3V10.8H9C8.8 11.5 8.4 11.8 8 11.8C7.6 11.8 7.2 11.5 7 10.8H5.2Z"/>',
    ],
    "pieces": [
        '<path d="M4.1 4.1H7.1V7.1H4.1Z"/>',
        '<path d="M8.9 4.1H11.9V7.1H8.9Z"/>',
        '<path d="M4.1 8.9H7.1V11.9H4.1Z"/>',
        '<path d="M8.9 8.9H11.9V11.9H8.9Z"/>',
        '<path d="M7.1 5.6H8.9"/>',
        '<path d="M5.6 7.1V8.9"/>',
        '<path d="M10.4 7.1V8.9"/>',
        '<path d="M7.1 10.4H8.9"/>',
    ],
    "play": [
        '<path d="M6 4.7L10.8 8L6 11.3Z"/>',
    ],
    "present": [
        '<rect x="3.8" y="4" width="8.4" height="5.8" rx="0.8"/>',
        '<path d="M8 9.8V12.3"/>',
        '<path d="M5.9 12.3H10.1"/>',
        '<path d="M5.1 5.4H10.9"/>',
    ],
    "reflection": [
        '<path d="M8 4.1L9 7L11.9 8L9 9L8 11.9L7 9L4.1 8L7 7L8 4.1Z"/>',
    ],
    "roadmap": [
        '<circle cx="4.8" cy="10.7" r="0.9"/>',
        '<circle cx="8.1" cy="7.5" r="0.9"/>',
        '<circle cx="11.3" cy="5.2" r="0.9"/>',
        '<path d="M5.6 10.1C6.2 9.4 6.7 8.8 7.3 8.1"/>',
        '<path d="M8.9 6.9C9.5 6.4 10 5.9 10.6 5.5"/>',
        '<path d="M4.7 10.8C4.4 8.5 4.8 6.5 6.1 4.6"/>',
    ],
    "share": [
        '<circle cx="5" cy="8" r="1"/>',
        '<circle cx="10.9" cy="4.8" r="1"/>',
        '<circle cx="10.9" cy="11.2" r="1"/>',
        '<path d="M5.9 7.5L10 5.3"/>',
        '<path d="M5.9 8.5L10 10.7"/>',
    ],
    "sport": [
        '<circle cx="8" cy="8" r="4"/>',
        '<path d="M8 4V12"/>',
        '<path d="M4 8H12"/>',
        '<path d="M5.2 5.2L10.8 10.8"/>',
        '<path d="M10.8 5.2L5.2 10.8"/>',
    ],
    "start": [
        '<circle cx="8" cy="8" r="4"/>',
        '<path d="M7 5.8L10 8L7 10.2Z"/>',
    ],
    "stop": [
        '<rect x="5" y="5" width="6" height="6" rx="0.7"/>',
    ],
    "suitcase": [
        '<rect x="3.8" y="5.2" width="8.4" height="6.4" rx="1"/>',
        '<path d="M6.1 5.2V4.3C6.1 3.8 6.5 3.4 7 3.4H9C9.5 3.4 9.9 3.8 9.9 4.3V5.2"/>',
        '<path d="M3.8 8.2H12.2"/>',
    ],
    "technology": [
        '<rect x="4.8" y="4.8" width="6.4" height="6.4" rx="0.8"/>',
        '<path d="M6.4 2.9V4.2M8 2.9V4.2M9.6 2.9V4.2"/>',
        '<path d="M6.4 11.8V13.1M8 11.8V13.1M9.6 11.8V13.1"/>',
        '<path d="M2.9 6.4H4.2M2.9 8H4.2M2.9 9.6H4.2"/>',
        '<path d="M11.8 6.4H13.1M11.8 8H13.1M11.8 9.6H13.1"/>',
    ],
    "think": [
        '<path d="M6.1 9.8C5.2 9.3 4.7 8.3 4.7 7.3C4.7 5.5 6.2 4 8 4C9.8 4 11.3 5.5 11.3 7.3C11.3 8.3 10.8 9.3 9.9 9.8L9.4 11.1H6.6Z"/>',
        '<path d="M6.9 12.2H9.1"/>',
    ],
    "think_alt": [
        '<circle cx="6.2" cy="7.4" r="1.4"/>',
        '<circle cx="8.5" cy="6.5" r="1.6"/>',
        '<circle cx="10.2" cy="8" r="1.3"/>',
        '<path d="M6.1 9.7H9.8"/>',
        '<path d="M7 11.1H9.1"/>',
    ],
    "video": [
        '<rect x="3.5" y="5" width="6.7" height="5.6" rx="0.8"/>',
        '<path d="M10.2 6.4L12.5 5.3V10.3L10.2 9.2Z"/>',
    ],
}


def render_icon(name: str, glyphs: list[str]) -> str:
    lines = BASE_FRAME + glyphs
    glow = "\n    ".join(lines)
    core = "\n    ".join(lines)
    return f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none">
  <g stroke="#ff6a00" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" opacity="0.22">
    {glow}
  </g>
  <g stroke="#ffb347" stroke-width="1.15" stroke-linecap="round" stroke-linejoin="round">
    {core}
  </g>
</svg>
"""


def main() -> None:
    missing = []
    for path in sorted(ICON_DIR.glob("*.svg")):
        glyphs = ICON_GLYPHS.get(path.stem)
        if glyphs is None:
            missing.append(path.stem)
            continue
        path.write_text(render_icon(path.stem, glyphs), encoding="utf-8")

    if missing:
        raise SystemExit(f"Missing icon definitions: {', '.join(missing)}")


if __name__ == "__main__":
    main()
