import { useState } from 'react';
import { useGameStore } from '../../store/useGameStore';
import type { Player } from '../../types';
import { CyberBtn } from '../ui/CyberBtn';
import { MonoLabel } from '../ui/MonoLabel';

interface Props {
  player: Player;
  onClose: () => void;
}

export function PlayerModal({ player, onClose }: Props) {
  const changeHandle = useGameStore((s) => s.changeHandle);
  const [handle, setHandle] = useState(player.handle);

  const save = () => {
    if (handle.trim()) changeHandle(player.id, handle.trim());
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end" onClick={onClose}>
      <div
        className="w-full border-t p-6 animate-sheet-up"
        style={{ background: '#030F1A', borderColor: `rgba(${player.accent},0.3)` }}
        onClick={(e) => e.stopPropagation()}
      >
        <MonoLabel className="mb-4 block">edit player</MonoLabel>
        <div className="flex gap-2">
          <input
            className="flex-1 bg-bg2 border border-txtDim font-mono text-sm text-txt px-3 py-2 rounded outline-none focus:border-cyan"
            value={handle}
            onChange={(e) => setHandle(e.target.value)}
            maxLength={16}
            autoFocus
          />
          <CyberBtn accent={player.accent} onClick={save}>SAVE</CyberBtn>
        </div>
        <button className="mt-4 font-mono text-[10px] text-txtDim tracking-widest" onClick={onClose}>CANCEL</button>
      </div>
    </div>
  );
}
