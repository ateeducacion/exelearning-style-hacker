import struct
import zlib
from pathlib import Path


ROOT = Path("/Users/ernesto/Downloads/git/exelearning-style-hacker/content/resources")
PNG_SIG = b"\x89PNG\r\n\x1a\n"


def paeth_predictor(a: int, b: int, c: int) -> int:
    p = a + b - c
    pa = abs(p - a)
    pb = abs(p - b)
    pc = abs(p - c)
    if pa <= pb and pa <= pc:
        return a
    if pb <= pc:
        return b
    return c


def chunk(chunk_type: bytes, data: bytes) -> bytes:
    crc = zlib.crc32(chunk_type)
    crc = zlib.crc32(data, crc) & 0xFFFFFFFF
    return struct.pack(">I", len(data)) + chunk_type + data + struct.pack(">I", crc)


def read_png(path: Path) -> tuple[int, int, list[list[tuple[int, int, int]]]]:
    data = path.read_bytes()
    if not data.startswith(PNG_SIG):
        raise ValueError(f"{path} is not a PNG")

    pos = len(PNG_SIG)
    width = height = None
    bit_depth = color_type = interlace = None
    idat = bytearray()

    while pos < len(data):
        length = struct.unpack(">I", data[pos:pos + 4])[0]
        pos += 4
        ctype = data[pos:pos + 4]
        pos += 4
        chunk_data = data[pos:pos + length]
        pos += length + 4

        if ctype == b"IHDR":
            width, height, bit_depth, color_type, _, _, interlace = struct.unpack(">IIBBBBB", chunk_data)
        elif ctype == b"IDAT":
            idat.extend(chunk_data)
        elif ctype == b"IEND":
            break

    if bit_depth != 8 or color_type != 2 or interlace != 0:
        raise ValueError(f"Unsupported PNG format in {path.name}: bit_depth={bit_depth}, color_type={color_type}, interlace={interlace}")

    raw = zlib.decompress(bytes(idat))
    bpp = 3
    stride = width * bpp
    pixels: list[list[tuple[int, int, int]]] = []
    prev = [0] * stride
    offset = 0

    for _ in range(height):
        filter_type = raw[offset]
        offset += 1
        row = list(raw[offset:offset + stride])
        offset += stride
        recon = [0] * stride

        for i, value in enumerate(row):
            left = recon[i - bpp] if i >= bpp else 0
            up = prev[i]
            up_left = prev[i - bpp] if i >= bpp else 0

            if filter_type == 0:
                recon[i] = value
            elif filter_type == 1:
                recon[i] = (value + left) & 0xFF
            elif filter_type == 2:
                recon[i] = (value + up) & 0xFF
            elif filter_type == 3:
                recon[i] = (value + ((left + up) // 2)) & 0xFF
            elif filter_type == 4:
                recon[i] = (value + paeth_predictor(left, up, up_left)) & 0xFF
            else:
                raise ValueError(f"Unsupported PNG filter {filter_type} in {path.name}")

        prev = recon
        row_pixels = [(recon[i], recon[i + 1], recon[i + 2]) for i in range(0, stride, 3)]
        pixels.append(row_pixels)

    return width, height, pixels


def write_png(path: Path, width: int, height: int, pixels: list[list[tuple[int, int, int]]]) -> None:
    raw = bytearray()
    for row in pixels:
        raw.append(0)
        for r, g, b in row:
            raw.extend((r, g, b))

    ihdr = struct.pack(">IIBBBBB", width, height, 8, 2, 0, 0, 0)
    png = bytearray(PNG_SIG)
    png.extend(chunk(b"IHDR", ihdr))
    png.extend(chunk(b"IDAT", zlib.compress(bytes(raw), level=9)))
    png.extend(chunk(b"IEND", b""))
    path.write_bytes(bytes(png))


def color_distance(a: tuple[int, int, int], b: tuple[int, int, int]) -> int:
    return abs(a[0] - b[0]) + abs(a[1] - b[1]) + abs(a[2] - b[2])


def luminance(rgb: tuple[int, int, int]) -> int:
    r, g, b = rgb
    return int(0.2126 * r + 0.7152 * g + 0.0722 * b)


def orange_tone(level: float) -> tuple[int, int, int]:
    level = max(0.0, min(1.0, level))
    r = int(10 + 190 * level)
    g = int(6 + 98 * level)
    b = int(4 + 26 * level)
    return r, g, b


def generate_wireframe(pixels: list[list[tuple[int, int, int]]]) -> list[list[tuple[int, int, int]]]:
    height = len(pixels)
    width = len(pixels[0])
    edge = [[0 for _ in range(width)] for _ in range(height)]
    mask = [[0 for _ in range(width)] for _ in range(height)]

    for y in range(height):
        for x in range(width):
            here = pixels[y][x]
            lum = luminance(here)
            max_diff = 0
            for dx, dy in ((1, 0), (-1, 0), (0, 1), (0, -1)):
                nx = x + dx
                ny = y + dy
                if 0 <= nx < width and 0 <= ny < height:
                    max_diff = max(max_diff, color_distance(here, pixels[ny][nx]))
            edge[y][x] = max_diff
            if max_diff > 26 or lum > 36:
                mask[y][x] = 1

    expanded = [[0 for _ in range(width)] for _ in range(height)]
    for y in range(height):
        for x in range(width):
            strongest = edge[y][x]
            for dy in (-1, 0, 1):
                for dx in (-1, 0, 1):
                    ny = y + dy
                    nx = x + dx
                    if 0 <= nx < width and 0 <= ny < height:
                        strongest = max(strongest, edge[ny][nx])
            expanded[y][x] = strongest

    out: list[list[tuple[int, int, int]]] = []
    for y in range(height):
        row: list[tuple[int, int, int]] = []
        for x in range(width):
            lum = luminance(pixels[y][x]) / 255.0
            strength = expanded[y][x]
            line = strength / 255.0
            grid = ((x % 32 == 0) or (y % 32 == 0) or ((x + y) % 40 == 0)) and mask[y][x]

            if line > 0.28:
                color = orange_tone(min(1.0, 0.65 + line * 0.6))
            elif grid:
                color = orange_tone(0.34 + lum * 0.18)
            elif mask[y][x]:
                color = orange_tone(0.06 + lum * 0.17)
            else:
                base = int(3 + lum * 10)
                color = (base, base // 2, base // 4)

            row.append(color)
        out.append(row)
    return out


def process_file(path: Path) -> None:
    width, height, pixels = read_png(path)
    wire = generate_wireframe(pixels)
    write_png(path, width, height, wire)


def main() -> None:
    files = sorted(ROOT.glob("SP*/*.png"))
    if not files:
        raise SystemExit("No PNG files found")
    for path in files:
        process_file(path)
        print(path.relative_to(ROOT))


if __name__ == "__main__":
    main()
