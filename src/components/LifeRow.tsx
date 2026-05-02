import { useRef, useState } from 'react';
import { useLongPress } from '../hooks/useLongPress';
import { useGameStore } from '../store/useGameStore';
import { accentRgb } from '../utils/accentRgb';

interface Props {
  playerId: number;
  life: number;
  accent: string;
  dead: boolean;
}

export function LifeRow({ playerId, life, accent, dead }: Props) {
  const changeLife = useGameStore((s) => s.changeLife);
  const rgb = accentRgb(accent);

  const [delta, setDelta] = useState(0);
  const [deltaVisible, setDeltaVisible] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function apply(amount: number) {
    changeLife(playerId, amount);
    setDelta((prev) => prev + amount);
    setDeltaVisible(true);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setDeltaVisible(false);
      setDelta(0);
    }, 7000);
  }

  const incPress = useLongPress(() => apply(1), () => apply(10));
  const decPress = useLongPress(() => apply(-1), () => apply(-10));

  return (
    <div className="w-full flex items-center justify-between px-2 select-none">
      <button
        className="w-16 h-16 flex items-center justify-center text-4xl font-mono rounded border transition-all active:scale-90"
        style={{ borderColor: `rgba(${rgb},0.3)`, color: `rgba(${rgb},0.7)` }}
        {...decPress}
        aria-label="decrease life"
      >
        −
      </button>

      <div className="flex flex-col items-center">
        <div
          className={`font-mono text-7xl font-bold tracking-tight animate-flicker transition-colors duration-500 ${dead ? 'opacity-30 line-through' : ''}`}
          style={{ color: dead ? '#FF3278' : accent, textShadow: `0 0 20px rgba(${rgb},0.5)` }}
        >
          {life}
        </div>
        <div
          className="font-mono text-sm tracking-widest transition-opacity duration-500"
          style={{
            opacity: deltaVisible ? 1 : 0,
            color: delta >= 0 ? `rgba(${rgb},0.7)` : '#FF3278',
          }}
        >
          {delta > 0 ? `+${delta}` : delta}
        </div>
      </div>

      <button
        className="w-16 h-16 flex items-center justify-center text-4xl font-mono rounded border transition-all active:scale-90"
        style={{ borderColor: `rgba(${rgb},0.3)`, color: `rgba(${rgb},0.7)` }}
        {...incPress}
        aria-label="increase life"
      >
        +
      </button>
    </div>
  );
}
