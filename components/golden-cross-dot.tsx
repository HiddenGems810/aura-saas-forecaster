'use client';

/**
 * GoldenCrossLabel – rendered as the `label` prop of a Recharts ReferenceLine.
 * Shows a vertical dashed line with a "$1M" callout badge at the top.
 */
export function GoldenCrossLabel({
  viewBox,
}: {
  viewBox?: { x?: number; y?: number; width?: number; height?: number };
}) {
  const { x = 0, y = 0 } = viewBox ?? {};
  return (
    <g>
      {/* Box */}
      <rect
        x={x - 76}
        y={y - 26}
        width={152}
        height={20}
        rx={6}
        fill="#d4af37"
        fillOpacity={0.15}
        stroke="#d4af37"
        strokeOpacity={0.7}
        strokeWidth={1.5}
        filter="drop-shadow(0px 0px 8px rgba(212,175,55,0.4))"
      />
      {/* Icon (Star) */}
      <svg
        x={x - 70}
        y={y - 21}
        width={10}
        height={10}
        viewBox="0 0 24 24"
        fill="#d4af37"
        stroke="#d4af37"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
      {/* Text */}
      <text
        x={x + 6}
        y={y - 12}
        textAnchor="middle"
        fill="#d4af37"
        fontSize={10}
        fontFamily="var(--font-inter), sans-serif"
        fontWeight="bold"
        letterSpacing={1.1}
        filter="drop-shadow(0px 0px 4px rgba(212,175,55,0.8))"
      >
        7-Figure Milestone
      </text>
    </g>
  );
}
