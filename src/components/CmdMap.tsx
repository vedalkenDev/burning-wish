import { accentRgb } from '../utils/accentRgb';
import type { Player, Slot } from '../types';

interface Props {
  player: Player;
  opponents: Player[];
  allSlots: Slot[];
  onSelect: (opponentId: number) => void;
}

function computeCenters(slots: Slot[]) {
  const centers: Record<number, { cx: number; cy: number }> = {};
  let col = 0, row = 0;
  for (const slot of slots) {
    centers[slot.id] = { cx: col + slot.colSpan / 2, cy: row };
    col += slot.colSpan;
    if (col >= 2) { col = 0; row++; }
  }
  return { centers, totalRows: row };
}

const CELL = 24;

export function CmdMap({ player, opponents, allSlots, onSelect }: Props) {

  const { centers, totalRows } = computeCenters(allSlots);
  const myCenter = centers[player.id];

  if (!myCenter || opponents.length === 0) return null;

  const W = 2 * CELL;
  const H = totalRows * CELL;
  const myDotX = myCenter.cx * CELL;
  const myDotY = myCenter.cy * CELL + CELL / 2;

  return (
    <div className="flex flex-col items-center gap-0.5">
      <span className="font-mono text-[7px] tracking-widest opacity-30" style={{ color: player.accent }}>CMD</span>
      <div className="relative overflow-visible" style={{ width: W, height: H }}>

        {/* current player cell */}
        <div
          className="absolute rounded-sm opacity-20 border"
          style={{
            width: CELL - 8,
            height: CELL - 8,
            left: myDotX - (CELL - 8) / 2,
            top: myDotY - (CELL - 8) / 2,
            borderColor: player.accent,
          }}
        />

        {opponents.map((opp) => {
          const center = centers[opp.id];
          if (!center) return null;

          const dmg = player.cmdDmg[opp.id] ?? 0;
          const isKill = dmg >= 21;
          const rgb = accentRgb(opp.accent);
          const dotX = center.cx * CELL;
          const dotY = center.cy * CELL + CELL / 2;

          return (
            <button
              key={opp.id}
              className="absolute flex items-center justify-center transition-transform active:scale-75"
              style={{ width: CELL, height: CELL, left: dotX - CELL / 2, top: dotY - CELL / 2 }}
              onClick={() => onSelect(opp.id)}
            >
              <div
                className="flex items-center justify-center rounded-full"
                style={{
                  width: 16,
                  height: 16,
                  backgroundColor: `rgba(${rgb},${dmg > 0 ? 0.2 : 0.07})`,
                  border: `1px solid ${isKill ? '#FF3278' : `rgba(${rgb},${dmg > 0 ? 0.8 : 0.3})`}`,
                  boxShadow: isKill
                    ? '0 0 6px rgba(255,50,120,0.5)'
                    : dmg > 0
                    ? `0 0 4px rgba(${rgb},0.4)`
                    : 'none',
                  color: isKill ? '#FF3278' : opp.accent,
                }}
              >
                {dmg > 0 && (
                  <span className="font-mono leading-none select-none" style={{ fontSize: 8 }}>
                    {isKill ? '☠' : dmg}
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
