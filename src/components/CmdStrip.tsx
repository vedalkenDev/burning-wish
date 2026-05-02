import { useState } from 'react';
import { useGameStore } from '../store/useGameStore';
import { accentRgb } from '../utils/accentRgb';
import type { Player } from '../types';

interface Props {
  player: Player;
  opponents: Player[];
}

export function CmdStrip({ player, opponents }: Props) {
  const changeCmdDmg = useGameStore((s) => s.changeCmdDmg);
  const [expanded, setExpanded] = useState<number | null>(null);

  if (opponents.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-1">
      {opponents.map((opp) => {
        const dmg = player.cmdDmg[opp.id] ?? 0;
        const isKill = dmg >= 21;
        const isOpen = expanded === opp.id;
        const rgb = accentRgb(opp.accent);

        return (
          <div key={opp.id} className="flex items-center gap-1">
            {!isOpen ? (
              <button
                className="flex items-center gap-1 px-1.5 py-0.5 rounded border text-[10px] font-mono transition-all active:scale-95"
                style={{
                  borderColor: isKill ? '#FF3278' : `rgba(${rgb},0.35)`,
                  color: isKill ? '#FF3278' : `rgba(${rgb},0.8)`,
                  boxShadow: isKill ? '0 0 6px rgba(255,50,120,0.4)' : 'none',
                }}
                onClick={() => setExpanded(opp.id)}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full animate-pulse-dot"
                  style={{ backgroundColor: opp.accent, color: opp.accent }}
                />
                {dmg > 0 && <span>{dmg}</span>}
                {isKill && <span className="text-[9px] tracking-widest">KLL</span>}
              </button>
            ) : (
              <div
                className="flex items-center gap-1 px-1.5 py-0.5 rounded border"
                style={{ borderColor: isKill ? '#FF3278' : `rgba(${rgb},0.5)` }}
              >
                <button
                  className="w-5 h-5 font-mono text-xs flex items-center justify-center"
                  style={{ color: `rgba(${rgb},0.7)` }}
                  onClick={() => changeCmdDmg(player.id, opp.id, -1)}
                >−</button>
                <span
                  className="font-mono text-xs min-w-[1.5rem] text-center"
                  style={{ color: isKill ? '#FF3278' : opp.accent }}
                >{dmg}</span>
                <button
                  className="w-5 h-5 font-mono text-xs flex items-center justify-center"
                  style={{ color: `rgba(${rgb},0.7)` }}
                  onClick={() => changeCmdDmg(player.id, opp.id, 1)}
                >+</button>
                <button
                  className="w-5 h-5 font-mono text-[10px] flex items-center justify-center text-txtMid"
                  onClick={() => setExpanded(null)}
                >×</button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
