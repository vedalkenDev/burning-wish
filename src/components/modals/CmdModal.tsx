import { useState } from 'react';
import { useGameStore } from '../../store/useGameStore';
import { useLongPress } from '../../hooks/useLongPress';
import { accentRgb } from '../../utils/accentRgb';
import type { Rotation } from '../../types';

interface Props {
  playerId: number;
  opponentId: number;
  rotation: Rotation;
  onClose: () => void;
}

const PANEL_WIDTH = 300;

function layoutFor(rotation: Rotation) {
  switch (rotation) {
    case 0:
      return {
        outerClass: 'items-end',
        panelClass: 'w-full animate-sheet-up',
        borderSide: 'borderTop',
        isVertical: false,
        contentRotation: 0,
      };
    case 180:
      return {
        outerClass: 'items-start',
        panelClass: 'w-full animate-sheet-down',
        borderSide: 'borderBottom',
        isVertical: false,
        contentRotation: 180,
      };
    case 90:
      return {
        outerClass: 'items-center justify-start',
        panelClass: 'animate-sheet-left',
        borderSide: 'borderRight',
        isVertical: true,
        contentRotation: 90,
      };
    case 270:
      return {
        outerClass: 'items-center justify-end',
        panelClass: 'animate-sheet-right',
        borderSide: 'borderLeft',
        isVertical: true,
        contentRotation: 270,
      };
  }
}

export function CmdModal({ playerId, opponentId, rotation, onClose }: Props) {
  const players = useGameStore((s) => s.players);
  const changeCmdDmg = useGameStore((s) => s.changeCmdDmg);
  const [flash, setFlash] = useState<'inc' | 'dec' | null>(null);

  const player = players.find((p) => p.id === playerId);
  const opponent = players.find((p) => p.id === opponentId);
  if (!player || !opponent) return null;

  const dmg = player.cmdDmg[opponentId] ?? 0;
  const isKill = dmg >= 21;
  const rgb = accentRgb(opponent.accent);

  const fire = (dir: 'inc' | 'dec') => {
    setFlash(dir);
    changeCmdDmg(playerId, opponentId, dir === 'inc' ? 1 : -1);
    setTimeout(() => setFlash(null), 150);
  };

  const incPress = useLongPress(() => fire('inc'), () => fire('inc'));
  const decPress = useLongPress(() => fire('dec'), () => fire('dec'));

  const layout = layoutFor(rotation);

  const borderStyle = {
    [layout.borderSide]: `1px solid rgba(${rgb},0.2)`,
  };

  const panelContent = (
    <>
      {/* Drag handle */}
      <div className="flex justify-center pt-3 pb-2">
        <div className="w-9 h-1 rounded-full" style={{ background: 'rgba(216,244,255,0.15)' }} />
      </div>

      {/* Header */}
      <div className="flex items-center justify-between px-5 pb-2">
        <div className="flex flex-col gap-0.5">
          <span className="font-mono text-[10px] tracking-widest" style={{ color: 'rgba(216,244,255,0.3)' }}>
            CMD DAMAGE FROM
          </span>
          <div className="flex items-center gap-2">
            <div
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: opponent.accent, boxShadow: `0 0 8px ${opponent.accent}` }}
            />
            <span className="font-mono text-base tracking-wide" style={{ color: opponent.accent }}>
              {opponent.handle}
            </span>
          </div>
        </div>
        <button
          className="w-9 h-9 border rounded-lg flex items-center justify-center font-mono text-lg active:scale-90 transition-all"
          style={{ borderColor: 'rgba(216,244,255,0.15)', color: 'rgba(216,244,255,0.5)' }}
          onClick={onClose}
        >
          ×
        </button>
      </div>

      {/* Counter */}
      <div className="flex items-center justify-center gap-6 py-8">
        <button
          className="w-[72px] h-[72px] rounded-xl border flex items-center justify-center font-mono text-4xl transition-all duration-[75ms]"
          style={{
            borderColor: flash === 'dec' ? `rgba(${rgb},0.6)` : `rgba(${rgb},0.25)`,
            background: flash === 'dec' ? `rgba(${rgb},0.15)` : `rgba(${rgb},0.04)`,
            color: `rgba(${rgb},0.8)`,
            transform: flash === 'dec' ? 'scale(0.93)' : 'scale(1)',
          }}
          {...decPress}
        >
          −
        </button>

        <div className="flex flex-col items-center gap-1" style={{ minWidth: 120 }}>
          <span
            className="font-mono leading-none"
            style={{
              fontSize: 88,
              color: isKill ? '#FF3278' : opponent.accent,
              textShadow: isKill
                ? '0 0 32px rgba(255,50,120,0.6)'
                : `0 0 32px rgba(${rgb},0.5)`,
            }}
          >
            {dmg}
          </span>
          <span
            className="font-mono text-[9px] tracking-widest"
            style={{ color: isKill ? 'rgba(255,50,120,0.6)' : 'rgba(216,244,255,0.25)' }}
          >
            {isKill ? 'LETHAL' : 'DAMAGE DEALT'}
          </span>
        </div>

        <button
          className="w-[72px] h-[72px] rounded-xl border flex items-center justify-center font-mono text-4xl transition-all duration-[75ms]"
          style={{
            borderColor: flash === 'inc' ? `rgba(${rgb},0.6)` : `rgba(${rgb},0.25)`,
            background: flash === 'inc' ? `rgba(${rgb},0.15)` : `rgba(${rgb},0.04)`,
            color: `rgba(${rgb},0.8)`,
            transform: flash === 'inc' ? 'scale(0.93)' : 'scale(1)',
          }}
          {...incPress}
        >
          +
        </button>
      </div>

      {/* Stats row */}
      <div className="flex items-center justify-center gap-6 pb-8">
        <div className="flex flex-col items-center gap-1">
          <span className="font-mono text-[9px] tracking-widest" style={{ color: 'rgba(216,244,255,0.25)' }}>
            THEIR LIFE
          </span>
          <span className="font-mono text-3xl" style={{ color: 'rgba(216,244,255,0.7)' }}>
            {player.life}
          </span>
        </div>
        <div style={{ width: 1, height: 40, background: 'rgba(216,244,255,0.08)' }} />
        <div className="flex flex-col items-center gap-1">
          <span className="font-mono text-[9px] tracking-widest" style={{ color: 'rgba(216,244,255,0.25)' }}>
            KILL AT
          </span>
          <span className="font-mono text-3xl" style={{ color: 'rgba(255,50,120,0.6)' }}>
            21
          </span>
        </div>
        <div style={{ width: 1, height: 40, background: 'rgba(216,244,255,0.08)' }} />
        <div className="flex flex-col items-center gap-1">
          <span className="font-mono text-[9px] tracking-widest" style={{ color: 'rgba(216,244,255,0.25)' }}>
            REMAINING
          </span>
          <span className="font-mono text-3xl" style={{ color: `rgba(${rgb},0.5)` }}>
            {Math.max(0, 21 - dmg)}
          </span>
        </div>
      </div>
    </>
  );

  if (layout.isVertical) {
    return (
      <div className={`fixed inset-0 z-50 flex ${layout.outerClass}`} onClick={onClose}>
        <div
          className={layout.panelClass}
          style={{
            background: '#030F1A',
            ...borderStyle,
            width: PANEL_WIDTH,
            height: '100%',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* content rotated to face the side player; width = 100dvh fills the panel's visual height */}
          <div
            style={{
              transform: `rotate(${layout.contentRotation}deg)`,
              width: '100dvh',
              flexShrink: 0,
            }}
          >
            {panelContent}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`fixed inset-0 z-50 flex ${layout.outerClass}`} onClick={onClose}>
      <div
        className={layout.panelClass}
        style={{ background: '#030F1A', ...borderStyle }}
        onClick={(e) => e.stopPropagation()}
      >
        {layout.contentRotation === 0 ? (
          panelContent
        ) : (
          <div style={{ transform: `rotate(${layout.contentRotation}deg)` }}>
            {panelContent}
          </div>
        )}
      </div>
    </div>
  );
}
