import { useGameStore } from '../../store/useGameStore';
import { CyberBtn } from '../ui/CyberBtn';
import { MonoLabel } from '../ui/MonoLabel';

interface Props {
  onClose: () => void;
}

export function ResetModal({ onClose }: Props) {
  const resetGame = useGameStore((s) => s.resetGame);

  const confirm = () => {
    resetGame();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end" onClick={onClose}>
      <div
        className="w-full border-t p-6 animate-sheet-up"
        style={{ background: '#030F1A', borderColor: 'rgba(255,50,120,0.3)' }}
        onClick={(e) => e.stopPropagation()}
      >
        <MonoLabel className="mb-2 block">reset game</MonoLabel>
        <p className="font-mono text-xs text-txtMid mb-6">All life totals and damage will be lost.</p>
        <div className="flex gap-3">
          <CyberBtn accent="#FF3278" className="flex-1" onClick={confirm}>
            EXILE GAME
          </CyberBtn>
          <CyberBtn className="flex-1" onClick={onClose}>
            CANCEL
          </CyberBtn>
        </div>
      </div>
    </div>
  );
}
