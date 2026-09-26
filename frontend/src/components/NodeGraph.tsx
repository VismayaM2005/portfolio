'use client';

import { DOMAIN_META } from '@/lib/domains';
import styles from './NodeGraph.module.css';

const NODES = [
  { id: 'ai', angle: -90 },
  { id: 'iot', angle: 0 },
  { id: 'cv', angle: 90 },
  { id: 'backend', angle: 180 },
];

const SIZE = 480;
const CX = SIZE / 2;
const CY = SIZE / 2;
const R = 168;
const NODE_R = 48;
const CENTER_R = 58;

function pointFor(angle: number, radius: number) {
  const rad = (angle * Math.PI) / 180;
  return { x: CX + radius * Math.cos(rad), y: CY + radius * Math.sin(rad) };
}

interface Props {
  counts: Record<string, number>;
  selected: string | null;
  onSelect: (domain: string | null) => void;
}

export default function NodeGraph({ counts, selected, onSelect }: Props) {
  return (
    <div className={styles.wrap}>
      <svg
        className={styles.svg}
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        role="img"
        aria-label="Map of Vismaya's technical domains: AI/ML, IoT and Embedded, Computer Vision, and Backend and Systems. Select a node to filter projects."
      >
        {NODES.map((n) => {
          const p = pointFor(n.angle, R);
          return (
            <g key={`link-${n.id}`}>
              <line x1={CX} y1={CY} x2={p.x} y2={p.y} className={styles.link} />
              <line
                x1={CX}
                y1={CY}
                x2={p.x}
                y2={p.y}
                className={styles.pulse}
                style={{ ['--node-color' as string]: DOMAIN_META[n.id].color, animationDelay: `${n.angle}ms` }}
              />
            </g>
          );
        })}

        <g>
          <circle cx={CX} cy={CY} r={CENTER_R} className={styles.centerCircle} />
          <text x={CX} y={CY - 4} className={styles.centerLabel} style={{ fontSize: 17 }}>
            VISMAYA
          </text>
          <text x={CX} y={CY + 15} className={styles.centerLabel} style={{ fontSize: 10, opacity: 0.7, fontFamily: 'var(--mono)', fontWeight: 400 }}>
            AI · IOT · SDE
          </text>
        </g>

        {NODES.map((n, i) => {
          const p = pointFor(n.angle, R);
          const meta = DOMAIN_META[n.id];
          const isActive = selected === n.id;
          return (
            <g
              key={n.id}
              className={styles.nodeGroup}
              style={{ ['--node-color' as string]: meta.color, animationDelay: `${i * 700}ms` }}
              data-active={isActive}
              role="button"
              tabIndex={0}
              aria-pressed={isActive}
              onClick={() => onSelect(isActive ? null : n.id)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onSelect(isActive ? null : n.id);
                }
              }}
            >
              <circle cx={p.x} cy={p.y} r={NODE_R} className={styles.nodeCircle} />
              <text x={p.x} y={p.y - 6} className={styles.nodeLabel}>
                {meta.short}
              </text>
              <text x={p.x} y={p.y + 12} className={styles.nodeCount}>
                {counts[n.id] ?? 0} projects
              </text>
              <title>{meta.description}</title>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
