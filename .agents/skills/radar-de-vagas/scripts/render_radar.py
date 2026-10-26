#!/usr/bin/env python3
"""Gera radar/teia comparativo em SVG para exportação em arquivo.

Preferir salvar em arquivo (-o radar.svg) em vez de colar SVG no chat — a maioria dos
ambientes de LLM não renderiza SVG inline e exibe XML ilegível.

Uso:
  python scripts/render_radar.py <<'EOF'
  {
    "labels": ["Remuneração", "Modalidade & flexibilidade", "Benefícios",
               "Aderência da exigência", "Desenvolvimento de carreira", "Cultura, inclusão & clareza"],
    "series": [
      {"label": "Itaú Unibanco", "data": [3, 4, 5, 4, 3, 5], "color": "#534AB7"},
      {"label": "Mediana do mercado", "data": [1, 4, 0, 4, 2, 4], "color": "#1D9E75", "dashed": true}
    ],
    "caption": "Notas 0–5 derivadas das vagas analisadas. Salário n/d na amostra."
  }
  EOF

Saída: SVG em stdout (redirecione para arquivo com -o ou > radar.svg).
"""

from __future__ import annotations

import argparse
import json
import math
import sys
from typing import Any

WIDTH = 520
HEIGHT = 480
CX = WIDTH / 2
CY = 220
R = 150
MAX_SCORE = 5


def polar(angle: float, radius: float) -> tuple[float, float]:
    rad = math.radians(angle - 90)
    return CX + radius * math.cos(rad), CY + radius * math.sin(rad)


def esc(text: str) -> str:
    return (
        str(text)
        .replace("&", "&amp;")
        .replace("<", "&lt;")
        .replace(">", "&gt;")
        .replace('"', "&quot;")
    )


def wrap_label(text: str, max_len: int = 18) -> list[str]:
    words = text.split()
    lines: list[str] = []
    current: list[str] = []
    for word in words:
        candidate = " ".join(current + [word])
        if len(candidate) <= max_len:
            current.append(word)
        else:
            if current:
                lines.append(" ".join(current))
            current = [word]
    if current:
        lines.append(" ".join(current))
    return lines or [text]


def polygon_points(values: list[float]) -> str:
    n = len(values)
    step = 360 / n
    pts = []
    for i, value in enumerate(values):
        v = max(0, min(MAX_SCORE, float(value)))
        x, y = polar(i * step, R * (v / MAX_SCORE))
        pts.append(f"{x:.1f},{y:.1f}")
    return " ".join(pts)


def render_svg(payload: dict[str, Any]) -> str:
    labels: list[str] = payload["labels"]
    series: list[dict[str, Any]] = payload["series"]
    caption: str = payload.get("caption", "")

    if len(labels) < 3:
        raise ValueError("labels precisa ter ao menos 3 eixos")
    for s in series:
        if len(s["data"]) != len(labels):
            raise ValueError(f"série '{s.get('label')}' com tamanho diferente de labels")

    n = len(labels)
    step = 360 / n
    parts: list[str] = [
        f'<svg xmlns="http://www.w3.org/2000/svg" width="{WIDTH}" height="{HEIGHT}" '
        f'viewBox="0 0 {WIDTH} {HEIGHT}" role="img" '
        f'aria-label="Radar comparativo de atratividade de vagas">',
        '<rect width="100%" height="100%" fill="#ffffff"/>',
    ]

    for level in range(1, MAX_SCORE + 1):
        grid_pts = []
        for i in range(n):
            x, y = polar(i * step, R * (level / MAX_SCORE))
            grid_pts.append(f"{x:.1f},{y:.1f}")
        parts.append(
            f'<polygon points="{" ".join(grid_pts)}" fill="none" '
            f'stroke="#e5e7eb" stroke-width="1"/>'
        )

    for i in range(n):
        x, y = polar(i * step, R)
        parts.append(f'<line x1="{CX:.1f}" y1="{CY:.1f}" x2="{x:.1f}" y2="{y:.1f}" stroke="#e5e7eb"/>')
        lx, ly = polar(i * step, R + 28)
        lines = wrap_label(labels[i])
        for j, line in enumerate(lines):
            dy = (j - (len(lines) - 1) / 2) * 13
            parts.append(
                f'<text x="{lx:.1f}" y="{ly + dy:.1f}" text-anchor="middle" '
                f'font-family="system-ui,sans-serif" font-size="11" fill="#374151">{esc(line)}</text>'
            )

    for tick in range(MAX_SCORE + 1):
        tx, ty = polar(0, R * (tick / MAX_SCORE))
        parts.append(
            f'<text x="{tx - 10:.1f}" y="{ty + 4:.1f}" text-anchor="end" '
            f'font-family="system-ui,sans-serif" font-size="10" fill="#9ca3af">{tick}</text>'
        )

    for s in series:
        color = s.get("color", "#534AB7")
        dashed = s.get("dashed", False)
        fill_opacity = "0.15" if not dashed else "0.08"
        dash = ' stroke-dasharray="6,4"' if dashed else ""
        parts.append(
            f'<polygon points="{polygon_points(s["data"])}" fill="{color}" '
            f'fill-opacity="{fill_opacity}" stroke="{color}" stroke-width="2"{dash}/>'
        )
        for i, value in enumerate(s["data"]):
            v = max(0, min(MAX_SCORE, float(value)))
            x, y = polar(i * step, R * (v / MAX_SCORE))
            parts.append(f'<circle cx="{x:.1f}" cy="{y:.1f}" r="4" fill="{color}"/>')

    legend_y = 390
    legend_x = 24
    for idx, s in enumerate(series):
        y = legend_y + idx * 22
        color = s.get("color", "#534AB7")
        dash = ' stroke-dasharray="6,4"' if s.get("dashed") else ""
        parts.append(
            f'<line x1="{legend_x}" y1="{y}" x2="{legend_x + 18}" y2="{y}" '
            f'stroke="{color}" stroke-width="3"{dash}/>'
        )
        parts.append(
            f'<text x="{legend_x + 26}" y="{y + 4}" font-family="system-ui,sans-serif" '
            f'font-size="12" fill="#111827">{esc(s.get("label", ""))}</text>'
        )

    if caption:
        parts.append(
            f'<text x="{legend_x}" y="{legend_y + len(series) * 22 + 16}" '
            f'font-family="system-ui,sans-serif" font-size="11" fill="#6b7280">{esc(caption)}</text>'
        )

    parts.append("</svg>")
    return "\n".join(parts)


def main() -> None:
    parser = argparse.ArgumentParser(description="Renderiza radar comparativo em SVG")
    parser.add_argument("json_file", nargs="?", help="Arquivo JSON (default: stdin)")
    parser.add_argument("-o", "--output", help="Salvar SVG em arquivo")
    args = parser.parse_args()

    raw = open(args.json_file, encoding="utf-8").read() if args.json_file else sys.stdin.read()
    payload = json.loads(raw)
    svg = render_svg(payload)

    if args.output:
        with open(args.output, "w", encoding="utf-8") as f:
            f.write(svg)

    sys.stdout.write(svg)


if __name__ == "__main__":
    main()
