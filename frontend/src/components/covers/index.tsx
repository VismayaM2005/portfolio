/* Bespoke flat-illustration book covers for projects/internships with no
   real screenshot available. Each is a self-contained inline SVG, viewBox
   0 0 320 480 (2:3, matching a paperback cover ratio). No text is drawn
   here -- BookCover.tsx overlays the title on top of whichever of these
   renders. */
import type { ReactElement } from 'react';

const VB = '0 0 320 480';

export function FlashRescueCover() {
  return (
    <svg viewBox={VB} width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="fr-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7a1d0f" />
          <stop offset="60%" stopColor="#c1440e" />
          <stop offset="100%" stopColor="#fe5009" />
        </linearGradient>
        <radialGradient id="fr-pulse" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffd8a8" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#ffd8a8" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="320" height="480" fill="url(#fr-sky)" />
      {[220, 170, 120, 70].map((r, i) => (
        <circle key={r} cx="230" cy="150" r={r} fill="none" stroke="#ffe3c2" strokeOpacity={0.35 - i * 0.06} strokeWidth="2" />
      ))}
      <circle cx="230" cy="150" r="46" fill="url(#fr-pulse)" />
      <circle cx="230" cy="150" r="10" fill="#fff3e0" />
      {/* city skyline */}
      <g fill="#3a1206">
        <rect x="0" y="330" width="46" height="150" />
        <rect x="50" y="290" width="38" height="190" />
        <rect x="92" y="350" width="30" height="130" />
        <rect x="126" y="310" width="42" height="170" />
        <rect x="172" y="360" width="34" height="120" />
        <rect x="210" y="300" width="30" height="180" />
        <rect x="244" y="340" width="36" height="140" />
        <rect x="284" y="315" width="36" height="165" />
      </g>
      <g fill="#ffd8a8" opacity="0.8">
        <rect x="10" y="345" width="6" height="8" />
        <rect x="24" y="360" width="6" height="8" />
        <rect x="60" y="310" width="6" height="8" />
        <rect x="132" y="330" width="6" height="8" />
        <rect x="218" y="325" width="6" height="8" />
        <rect x="252" y="365" width="6" height="8" />
      </g>
    </svg>
  );
}

export function AuraCover() {
  const dots: Array<[number, number, number, boolean]> = [
    [60, 120, 7, false], [90, 150, 6, false], [120, 110, 8, true], [150, 160, 6, false],
    [180, 130, 7, false], [210, 170, 6, false], [240, 120, 7, false], [70, 200, 6, false],
    [110, 210, 8, true], [160, 220, 6, false], [200, 230, 7, false], [240, 210, 6, false],
    [90, 270, 7, false], [130, 290, 6, false], [170, 280, 8, true], [210, 300, 6, false],
    [250, 270, 7, false], [130, 350, 6, false], [170, 360, 6, false], [200, 380, 7, false],
  ];
  return (
    <svg viewBox={VB} width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="aura-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#123028" />
          <stop offset="100%" stopColor="#2f6f6a" />
        </linearGradient>
      </defs>
      <rect width="320" height="480" fill="url(#aura-bg)" />
      <circle cx="160" cy="220" r="120" fill="none" stroke="#eab676" strokeOpacity="0.25" strokeWidth="2" strokeDasharray="4 6" />
      {dots.map(([cx, cy, r, hot], i) => (
        <circle key={i} cx={cx} cy={cy} r={r} fill={hot ? '#ff6a3d' : '#d9e8e4'} opacity={hot ? 0.95 : 0.55} />
      ))}
    </svg>
  );
}

export function ReviewMateCover() {
  return (
    <svg viewBox={VB} width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="rm-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fff3ea" />
          <stop offset="100%" stopColor="#feede6" />
        </linearGradient>
      </defs>
      <rect width="320" height="480" fill="url(#rm-bg)" />
      <rect x="40" y="90" width="240" height="300" rx="16" fill="#1a1a1a" />
      <rect x="40" y="90" width="240" height="36" rx="16" fill="#2c2c2c" />
      <circle cx="60" cy="108" r="5" fill="#fe5009" />
      <circle cx="76" cy="108" r="5" fill="#f2c14e" />
      <circle cx="92" cy="108" r="5" fill="#6fbf73" />
      <g fill="#fe5009" fontFamily="monospace" fontSize="13">
        <rect x="58" y="150" width="120" height="10" rx="3" fill="#fe5009" opacity="0.85" />
        <rect x="58" y="170" width="160" height="10" rx="3" fill="#7c7c7c" opacity="0.6" />
        <rect x="58" y="190" width="90" height="10" rx="3" fill="#7c7c7c" opacity="0.6" />
      </g>
      <circle cx="160" cy="290" r="54" fill="none" stroke="#fe5009" strokeWidth="8" strokeDasharray="280" strokeDashoffset="60" strokeLinecap="round" transform="rotate(-90 160 290)" />
      <text x="160" y="298" textAnchor="middle" fontFamily="monospace" fontWeight="700" fontSize="30" fill="#fff">86</text>
      <rect x="112" y="352" width="96" height="22" rx="11" fill="#fe5009" />
      <text x="160" y="367" textAnchor="middle" fontFamily="monospace" fontSize="11" fill="#fff">HIRE</text>
    </svg>
  );
}

export function MorseCover() {
  const pattern = ['.', '-', '-', '.', '.', '-', '.', '-', '-', '-', '.', '.', '-', '.', '-'];
  return (
    <svg viewBox={VB} width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="mc-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1b1f2a" />
          <stop offset="100%" stopColor="#3c4a6b" />
        </linearGradient>
      </defs>
      <rect width="320" height="480" fill="url(#mc-bg)" />
      {[0, 1, 2, 3, 4].map((row) => (
        <g key={row}>
          {pattern.map((sym, i) => {
            const x = 30 + i * 18;
            const y = 110 + row * 55;
            if ((row + i) % 4 === 0) return null;
            return sym === '.' ? (
              <circle key={i} cx={x} cy={y} r="4.5" fill="#fe9a63" opacity={0.5 + ((i + row) % 3) * 0.15} />
            ) : (
              <rect key={i} x={x - 8} y={y - 3} width="16" height="6" rx="3" fill="#fe9a63" opacity={0.5 + ((i + row) % 3) * 0.15} />
            );
          })}
        </g>
      ))}
      <circle cx="160" cy="390" r="30" fill="#fe5009" />
      <path d="M148 378 L172 390 L148 402 Z" fill="#1b1f2a" />
    </svg>
  );
}

export function TheatreCover() {
  return (
    <svg viewBox={VB} width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="th-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2a0f14" />
          <stop offset="100%" stopColor="#6b1620" />
        </linearGradient>
      </defs>
      <rect width="320" height="480" fill="url(#th-bg)" />
      <g opacity="0.9">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <path
            key={i}
            d={`M${20 + i * 48} 60 Q${44 + i * 48} 220 ${20 + i * 48} 400 L${52 + i * 48} 400 Q${76 + i * 48} 220 ${52 + i * 48} 60 Z`}
            fill={i % 2 === 0 ? '#8f1c22' : '#a5232a'}
          />
        ))}
      </g>
      <rect x="0" y="400" width="320" height="80" fill="#1a0a0c" />
      <circle cx="160" cy="440" r="26" fill="none" stroke="#f2c14e" strokeWidth="4" />
      <path d="M148 440 a12 12 0 0 1 24 0" fill="none" stroke="#f2c14e" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

export function VoyageraCover() {
  return (
    <svg viewBox={VB} width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="vg-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0f2a3a" />
          <stop offset="100%" stopColor="#2f7f8a" />
        </linearGradient>
      </defs>
      <rect width="320" height="480" fill="url(#vg-bg)" />
      <g fill="none" stroke="#eaf6f5" strokeOpacity="0.35" strokeWidth="1.5">
        <ellipse cx="160" cy="220" rx="130" ry="70" />
        <ellipse cx="160" cy="220" rx="130" ry="130" />
        <line x1="30" y1="220" x2="290" y2="220" />
      </g>
      <path
        d="M60 300 Q110 200 170 230 T280 150"
        fill="none"
        stroke="#f2c14e"
        strokeWidth="3"
        strokeDasharray="2 10"
        strokeLinecap="round"
      />
      <circle cx="60" cy="300" r="7" fill="#f2c14e" />
      <g transform="translate(266 136)">
        <path d="M0 -16 C9 -16 14 -8 14 0 C14 10 0 24 0 24 C0 24 -14 10 -14 0 C-14 -8 -9 -16 0 -16 Z" fill="#fe5009" />
        <circle cx="0" cy="-2" r="5" fill="#fff" />
      </g>
    </svg>
  );
}

export function WgTechCover() {
  return (
    <svg viewBox={VB} width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="wg-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#101827" />
          <stop offset="100%" stopColor="#243554" />
        </linearGradient>
      </defs>
      <rect width="320" height="480" fill="url(#wg-bg)" />
      <rect x="70" y="150" width="180" height="120" rx="6" fill="none" stroke="#7ee787" strokeWidth="2" strokeDasharray="6 5" />
      <text x="160" y="142" textAnchor="middle" fontFamily="monospace" fontSize="11" fill="#7ee787">ZONE_01</text>
      <circle cx="160" cy="230" r="26" fill="#eab676" />
      <circle cx="150" cy="220" r="4" fill="#243554" />
      <circle cx="170" cy="220" r="4" fill="#243554" />
      <path d="M140 245 Q160 260 180 245" fill="none" stroke="#243554" strokeWidth="3" strokeLinecap="round" />
      <g transform="translate(160 340)">
        <rect x="-34" y="0" width="68" height="46" rx="8" fill="#0d1420" stroke="#3c4a6b" strokeWidth="2" />
        <circle cx="0" cy="23" r="12" fill="#fe5009" />
        <circle cx="0" cy="23" r="5" fill="#0d1420" />
        <rect x="-42" y="-14" width="84" height="14" rx="4" fill="#3c4a6b" />
      </g>
    </svg>
  );
}

export function KazunovCover() {
  return (
    <svg viewBox={VB} width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="kz-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#241318" />
          <stop offset="100%" stopColor="#4a2530" />
        </linearGradient>
      </defs>
      <rect width="320" height="480" fill="url(#kz-bg)" />
      <rect x="90" y="90" width="140" height="190" rx="6" fill="#f4ece0" />
      <g stroke="#c9bda8" strokeWidth="4">
        <line x1="108" y1="120" x2="212" y2="120" />
        <line x1="108" y1="140" x2="212" y2="140" />
        <line x1="108" y1="160" x2="180" y2="160" />
      </g>
      <rect x="108" y="190" width="60" height="60" fill="none" stroke="#c9bda8" strokeWidth="3" strokeDasharray="5 4" />
      <path d="M112 240 L136 210 L150 226 L166 196" fill="none" stroke="#fe5009" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <g transform="translate(228 300) rotate(35)">
        <circle cx="0" cy="0" r="34" fill="none" stroke="#f2c14e" strokeWidth="8" />
        <line x1="24" y1="24" x2="58" y2="58" stroke="#f2c14e" strokeWidth="10" strokeLinecap="round" />
      </g>
    </svg>
  );
}

export function SsraCover() {
  return (
    <svg viewBox={VB} width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="ss-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fff8f2" />
          <stop offset="100%" stopColor="#feede6" />
        </linearGradient>
      </defs>
      <rect width="320" height="480" fill="url(#ss-bg)" />
      <rect x="50" y="110" width="220" height="160" rx="12" fill="#ffffff" stroke="#e7ddd2" strokeWidth="2" />
      <rect x="50" y="110" width="220" height="30" rx="12" fill="#fe5009" />
      <circle cx="68" cy="125" r="4" fill="#fff" />
      <circle cx="82" cy="125" r="4" fill="#fff" />
      <circle cx="96" cy="125" r="4" fill="#fff" />
      <circle cx="160" cy="205" r="34" fill="none" stroke="#2f6f6a" strokeWidth="4" />
      <path d="M126 205 H194 M160 171 Q182 205 160 239 Q138 205 160 171" fill="none" stroke="#2f6f6a" strokeWidth="3" />
      <rect x="80" y="300" width="160" height="14" rx="7" fill="#e7ddd2" />
      <rect x="80" y="326" width="110" height="14" rx="7" fill="#e7ddd2" />
      <rect x="80" y="360" width="70" height="24" rx="8" fill="#fe5009" />
    </svg>
  );
}

export const COVER_COMPONENTS: Record<string, () => ReactElement> = {
  flashrescue: FlashRescueCover,
  aura: AuraCover,
  reviewmate: ReviewMateCover,
  morse: MorseCover,
  theatre: TheatreCover,
  voyagera: VoyageraCover,
  'wg-tech': WgTechCover,
  kazunov: KazunovCover,
  ssra: SsraCover,
};
