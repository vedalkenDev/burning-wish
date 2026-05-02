import { useState } from 'react';
import type { DieType } from '../../types';
import { CyberBtn } from '../ui/CyberBtn';
import { MonoLabel } from '../ui/MonoLabel';

const DICE: DieType[] = [4, 6, 8, 10, 12, 20];

interface Props {
  onClose: () => void;
}

export function DiceModal({ onClose }: Props) {
  const [result, setResult] = useState<number | null>(null);
  const [lastDie, setLastDie] = useState<DieType>(20);
  const [rolling, setRolling] = useState(false);

  const roll = (d: DieType) => {
    setLastDie(d);
    setRolling(true);
    setResult(null);
    setTimeout(() => {
      setResult(Math.floor(Math.random() * d) + 1);
      setRolling(false);
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end" onClick={onClose}>
      <div
        className="w-full border-t p-6 animate-sheet-up"
        style={{ background: '#030F1A', borderColor: 'rgba(0,229,255,0.2)' }}
        onClick={(e) => e.stopPropagation()}
      >
        <MonoLabel className="mb-4 block">dice roller</MonoLabel>

        <div className="flex gap-2 flex-wrap mb-6">
          {DICE.map((d) => (
            <CyberBtn
              key={d}
              className={`flex-1 min-w-[2.5rem] py-2 ${d === lastDie ? 'opacity-100' : 'opacity-60'}`}
              onClick={() => roll(d)}
            >
              d{d}
            </CyberBtn>
          ))}
        </div>

        <div className="text-center">
          {rolling && (
            <div className="font-mono text-6xl text-cyan animate-roll-spin">?</div>
          )}
          {result !== null && !rolling && (
            <div
              className="font-mono text-7xl font-bold text-cyan animate-fade-up"
              style={{ textShadow: '0 0 30px rgba(0,229,255,0.7)' }}
            >
              {result}
            </div>
          )}
          {result !== null && !rolling && (
            <div className="font-mono text-[10px] text-txtDim mt-1 tracking-widest">
              d{lastDie} — {result === lastDie ? 'NAT MAX' : result === 1 ? 'NAT 1' : ''}
            </div>
          )}
        </div>

        <button className="mt-6 font-mono text-[10px] text-txtDim tracking-widest w-full text-center" onClick={onClose}>CLOSE</button>
      </div>
    </div>
  );
}
