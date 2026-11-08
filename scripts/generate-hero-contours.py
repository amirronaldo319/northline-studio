"""Draws the still contour map that sits behind the hero until (or instead of) the animated Topographic Flow.

Run: python3 scripts/generate-hero-contours.py
Writes src/assets/brand/hero-contours.svg. Needs numpy and matplotlib. The picture is a fixed, smooth landscape: a few
broad hills, contoured at even heights, in the site's cobalt at low opacity. It is committed, so the build never runs this.
"""
import math
from pathlib import Path

import numpy as np
from matplotlib import pyplot

W, H = 1440, 1600  # tall, so a full-height hero on a laptop still draws it at about 1:1
STROKE = '#0071e3'
LEVELS = 15

xs, ys = np.meshgrid(np.linspace(0, W, 241), np.linspace(0, H, 267))
hills = [  # centre x, centre y, width, height, amplitude (heights are fractions of H)
    (0.10, 0.11, 0.22, 0.17, 1.00),
    (0.88, 0.08, 0.20, 0.15, 0.85),
    (0.93, 0.42, 0.20, 0.17, 0.95),
    (0.05, 0.50, 0.20, 0.16, 0.80),
    (0.90, 0.80, 0.24, 0.17, 1.05),
    (0.09, 0.90, 0.22, 0.15, 0.90),
    (0.50, 0.99, 0.30, 0.10, 0.55),
    (0.50, 0.01, 0.26, 0.08, 0.45),
]
field = np.zeros_like(xs)
for cx, cy, sx, sy, amp in hills:
    field += amp * np.exp(-(((xs / W - cx) / sx) ** 2 + ((ys / H - cy) / sy) ** 2) / 2)
field += 0.07 * np.sin(xs / 210 + ys / 330) + 0.05 * np.sin(xs / 120 - ys / 190 + 1.3)


def simplify(points, tolerance):
    """Ramer-Douglas-Peucker."""
    if len(points) < 3:
        return points
    start, end = points[0], points[-1]
    dx, dy = end[0] - start[0], end[1] - start[1]
    norm = math.hypot(dx, dy) or 1.0
    index, worst = 0, 0.0
    for i in range(1, len(points) - 1):
        distance = abs(dy * points[i][0] - dx * points[i][1] + end[0] * start[1] - end[1] * start[0]) / norm
        if distance > worst:
            index, worst = i, distance
    if worst <= tolerance:
        return [start, end]
    return simplify(points[: index + 1], tolerance)[:-1] + simplify(points[index:], tolerance)


def smooth_path(points, closed):
    """Quadratic curves through segment midpoints: round, small, no corners."""
    n = len(points)
    mid = lambda a, b: ((a[0] + b[0]) / 2, (a[1] + b[1]) / 2)
    f = lambda p: f'{p[0]:.0f} {p[1]:.0f}'
    if n < 3:
        return 'M' + ' L'.join(f(p) for p in points)
    if closed:
        start = mid(points[-1], points[0])
        parts = [f'M{f(start)}']
        for i in range(n):
            parts.append(f'Q{f(points[i])} {f(mid(points[i], points[(i + 1) % n]))}')
        return ''.join(parts) + 'Z'
    parts = [f'M{f(points[0])}']
    for i in range(1, n - 1):
        parts.append(f'Q{f(points[i])} {f(mid(points[i], points[i + 1]))}')
    parts.append(f'L{f(points[-1])}')
    return ''.join(parts)


levels = np.linspace(field.min() + 0.08, field.max() - 0.08, LEVELS)
figure = pyplot.figure()
contours = pyplot.contour(xs, ys, field, levels=levels)
paths = []
for segments in contours.allsegs:
    for segment in segments:
        if len(segment) < 8:
            continue
        points = simplify([tuple(p) for p in segment], 2.2)
        closed = bool(np.allclose(segment[0], segment[-1]))
        paths.append(smooth_path(points[:-1] if closed else points, closed))
pyplot.close(figure)

svg = (
    f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" preserveAspectRatio="xMidYMid slice">'
    f'<path fill="none" stroke="{STROKE}" stroke-opacity=".5" stroke-width="1.4" stroke-linecap="round" '
    f'stroke-linejoin="round" d="{"".join(paths)}"/></svg>\n'
)
target = Path(__file__).resolve().parent.parent / 'src/assets/brand/hero-contours.svg'
target.write_text(svg)
print(f'{len(paths)} contours, {len(svg) / 1024:.1f} kB -> {target}')
