import { useState } from 'react';
import { useGameStore } from '../store/useGameStore';
import { CyberBtn } from './ui/CyberBtn';
import { MonoLabel } from './ui/MonoLabel';

export function SetupScreen() {
  const startGame = useGameStore((s) => s.startGame);
  const [count, setCount] = useState(4);

  return (
    <div className="flex flex-col items-center justify-center h-full gap-8 px-6 animate-fade-up">
      {/* coordinate grid bg */}
      <div
        className="pointer-events-none fixed inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,229,255,0.018) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,229,255,0.018) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
        aria-hidden
      />

      <div className="text-center relative z-10">
        <div className="font-mono text-[10px] tracking-[0.4em] text-cyanDim mb-2">MTG COMMANDER</div>
        <h1
          className="font-sans text-5xl font-bold tracking-tight text-cyan"
          style={{ textShadow: '0 0 30px rgba(0,229,255,0.5)' }}
        >
          BURNING WISH
        </h1>
        <div className="font-mono text-[10px] tracking-[0.3em] text-txtDim mt-1">LIFE TRACKER v1.0</div>
      </div>

      <div className="relative z-10 flex flex-col items-center gap-4">
        <MonoLabel>players</MonoLabel>
        <div className="flex gap-2">
          {[2, 3, 4, 5, 6, 7].map((n) => (
            <button
              key={n}
              className="w-10 h-10 font-mono text-sm border rounded transition-all active:scale-90"
              style={{
                borderColor: count === n ? '#00E5FF' : 'rgba(0,229,255,0.15)',
                color: count === n ? '#00E5FF' : 'rgba(216,244,255,0.45)',
                background: count === n ? 'rgba(0,229,255,0.1)' : 'transparent',
                boxShadow: count === n ? '0 0 12px rgba(0,229,255,0.3)' : 'none',
              }}
              onClick={() => setCount(n)}
            >
              {n}
            </button>
          ))}
        </div>
      </div>

      <CyberBtn
        className="relative z-10 px-8 py-3 text-base"
        onClick={() => startGame(count)}
      >
        CAST SPELL
      </CyberBtn>
    </div>
  );
}
