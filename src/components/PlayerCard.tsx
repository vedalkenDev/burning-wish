import { useEffect, useRef, useState } from 'react';
import type { Player, Slot, Rotation } from '../types';
import { useGameStore } from '../store/useGameStore';
import { accentRgb } from '../utils/accentRgb';
import { LifeRow } from './LifeRow';
import { CmdMap } from './CmdMap';
import { MonoLabel } from './ui/MonoLabel';
import { useLongPress } from '../hooks/useLongPress';

interface Props {
  player: Player;
  slot: Slot;
  opponents: Player[];
  allSlots: Slot[];
  onCmdSelect: (opponentId: number, rotation: Rotation) => void;
}

export function PlayerCard({ player, slot, opponents, allSlots, onCmdSelect }: Props) {
  const changePoison = useGameStore((s) => s.changePoison);

  const outerRef = useRef<HTMLDivElement>(null);
  const [innerSize, setInnerSize] = useState<{ w: number; h: number } | null>(null);
  const rgb = accentRgb(player.accent);
  const needsRotate = slot.rotation === 90 || slot.rotation === 270;

  useEffect(() => {
    if (!needsRotate || !outerRef.current) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setInnerSize({ w: height, h: width });
    });
    ro.observe(outerRef.current);
    return () => ro.disconnect();
  }, [needsRotate]);

  const poisonInc = useLongPress(
    () => changePoison(player.id, 1),
    () => changePoison(player.id, 1)
  );
  const poisonDec = useLongPress(
    () => changePoison(player.id, -1),
    () => changePoison(player.id, -1)
  );

  const innerStyle = needsRotate && innerSize
    ? {
        position: 'absolute' as const,
        top: '50%',
        left: '50%',
        width: innerSize.w,
        height: innerSize.h,
        transform: `translate(-50%, -50%) rotate(${slot.rotation}deg)`,
      }
    : { width: '100%', height: '100%' };

  const content = (
    <div className="flex flex-col h-full py-2">
      {/* header */}
      <div className="flex items-center justify-between px-2">
        <MonoLabel className="truncate max-w-[70%]">{player.handle}</MonoLabel>
        <div
          className="w-2 h-2 rounded-full animate-pulse-dot"
          style={{ backgroundColor: player.dead ? '#FF3278' : player.accent, color: player.dead ? '#FF3278' : player.accent }}
        />
      </div>

      {/* life — vertically centered */}
      <div className="flex-1 flex items-center">
        <LifeRow playerId={player.id} life={player.life} accent={player.accent} dead={player.dead} />
      </div>

      {/* bottom bar — poison left, cmd map right */}
      <div className="flex items-end justify-between px-2 pb-1">
        <div className="flex items-center gap-1 shrink-0">
          <button className="font-mono text-[10px] text-poison/60 w-5 h-5 flex items-center justify-center" {...poisonDec}>−</button>
          <span className="font-mono text-[10px] text-poison/60 tracking-widest">PSN</span>
          <span
            className="font-mono text-sm"
            style={{ color: player.poison >= 10 ? '#FF3278' : '#39FF14', textShadow: player.poison > 0 ? '0 0 8px #39FF14' : 'none' }}
          >
            {player.poison}
          </span>
          <button className="font-mono text-[10px] text-poison/60 w-5 h-5 flex items-center justify-center" {...poisonInc}>+</button>
        </div>
        <CmdMap player={player} opponents={opponents} allSlots={allSlots} onSelect={(opponentId) => onCmdSelect(opponentId, slot.rotation)} />
      </div>

    </div>
  );

  return (
    <div
      ref={outerRef}
      className="relative overflow-hidden border"
      style={{
        gridColumn: slot.colSpan === 2 ? 'span 2' : undefined,
        borderColor: player.dead ? '#FF3278' : `rgba(${rgb},0.25)`,
        background: `rgba(${rgb},0.04)`,
        minHeight: needsRotate ? 160 : 140,
      }}
    >
      <div style={innerStyle}>
        {content}
      </div>
    </div>
  );
}
