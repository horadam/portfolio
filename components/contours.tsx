// Faint topographic lines behind the page. Purely decorative.
const ridges = [
  "M-60 90 C120 40 220 140 360 100 S600 30 760 80",
  "M-60 120 C130 70 230 170 370 130 S610 60 760 110",
  "M-60 150 C140 100 240 200 380 160 S620 90 760 140",
  "M-60 400 C100 360 200 460 340 420 S580 350 760 400",
  "M-60 430 C110 390 210 490 350 450 S590 380 760 430",
  "M-60 460 C120 420 220 520 360 480 S600 410 760 460",
];

export function Contours() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 700 520"
      preserveAspectRatio="xMidYMid slice"
      className="pointer-events-none fixed -inset-12 z-0 h-[calc(100%+6rem)] w-[calc(100%+6rem)] opacity-60"
    >
      <g
        className="drift"
        fill="none"
        stroke="var(--color-contour)"
        strokeWidth="1"
        vectorEffect="non-scaling-stroke"
      >
        {ridges.map((d) => (
          <path key={d} d={d} vectorEffect="non-scaling-stroke" />
        ))}
        {[70, 110, 150, 190].map((r) => (
          <ellipse
            key={r}
            cx="560"
            cy="270"
            rx={r}
            ry={r * 0.6}
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </g>
    </svg>
  );
}
