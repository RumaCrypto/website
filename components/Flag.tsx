import { ReactNode, useId } from "react";
import { RailCode } from "@/lib/rails";

/*
 * Circular country flags, drawn at small size in each flag's official
 * colours. Fine detail that would blur below ~24px is simplified: Peru is
 * its civil flag (no coat of arms), Argentina's Sun of May is a plain sun,
 * Brazil keeps its rhombus, globe and band without the motto and stars.
 * Decorative: the country name is always written next to it.
 */

const Star = ({ x, y, r }: { x: number; y: number; r: number }) => {
  const points = Array.from({ length: 10 }, (_, i) => {
    const angle = (Math.PI / 5) * i - Math.PI / 2;
    const radius = i % 2 === 0 ? r : r * 0.42;
    return `${(x + radius * Math.cos(angle)).toFixed(2)},${(y + radius * Math.sin(angle)).toFixed(2)}`;
  });
  return <polygon points={points.join(" ")} fill="#ffffff" />;
};

// Typed by rail code: a country added to RAILS without a flag is a type error.
const flags: Record<RailCode, ReactNode> = {
  pe: (
    <>
      <rect width="10" height="30" fill="#D91023" />
      <rect x="10" width="10" height="30" fill="#ffffff" />
      <rect x="20" width="10" height="30" fill="#D91023" />
    </>
  ),
  co: (
    <>
      <rect width="30" height="15" fill="#FCD116" />
      <rect y="15" width="30" height="7.5" fill="#003893" />
      <rect y="22.5" width="30" height="7.5" fill="#CE1126" />
    </>
  ),
  ar: (
    <>
      <rect width="30" height="10" fill="#74ACDF" />
      <rect y="10" width="30" height="10" fill="#ffffff" />
      <rect y="20" width="30" height="10" fill="#74ACDF" />
      <g stroke="#F6B40E" strokeWidth="0.7" strokeLinecap="round">
        {Array.from({ length: 8 }, (_, i) => {
          const a = (Math.PI / 4) * i;
          return (
            <line
              key={i}
              x1={15 + 3.3 * Math.cos(a)}
              y1={15 + 3.3 * Math.sin(a)}
              x2={15 + 4.6 * Math.cos(a)}
              y2={15 + 4.6 * Math.sin(a)}
            />
          );
        })}
      </g>
      <circle cx="15" cy="15" r="2.6" fill="#F6B40E" />
    </>
  ),
  ve: (
    <>
      <rect width="30" height="10" fill="#FFCC00" />
      <rect y="10" width="30" height="10" fill="#00247D" />
      <rect y="20" width="30" height="10" fill="#CF142B" />
      {/* Eight stars in an arc across the blue band */}
      {Array.from({ length: 8 }, (_, i) => {
        const a = Math.PI + (Math.PI / 9) * (i + 1);
        return <Star key={i} x={15 + 7.4 * Math.cos(a)} y={20.4 + 7.4 * Math.sin(a)} r={1.05} />;
      })}
    </>
  ),
  br: (
    <>
      <rect width="30" height="30" fill="#009C3B" />
      <polygon points="15,4.5 27.5,15 15,25.5 2.5,15" fill="#FFDF00" />
      <circle cx="15" cy="15" r="6.2" fill="#002776" />
      <path d="M8.9 14.1c3.9-1.3 8.4-1 12.1 1.1l-.25.95c-3.5-2-7.8-2.3-11.5-1.05z" fill="#ffffff" />
    </>
  ),
};

export default function Flag({ code, className = "" }: { code: RailCode; className?: string }) {
  const clip = useId();

  return (
    <svg aria-hidden="true" viewBox="0 0 30 30" className={`flag ${className}`}>
      <defs>
        <clipPath id={clip}>
          <circle cx="15" cy="15" r="15" />
        </clipPath>
      </defs>
      <g clipPath={`url(#${clip})`}>{flags[code]}</g>
      <circle cx="15" cy="15" r="14.5" fill="none" stroke="rgba(11, 18, 32, 0.12)" />
    </svg>
  );
}
