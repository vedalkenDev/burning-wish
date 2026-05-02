import { useEffect, useState } from 'react';
import { useGameStore } from './store/useGameStore';
import { getTableLayout } from './utils/getTableLayout';
import { useWakeLock } from './hooks/useWakeLock';
import { SetupScreen } from './components/SetupScreen';
import { PlayerCard } from './components/PlayerCard';
import { DiceModal } from './components/modals/DiceModal';
import { ResetModal } from './components/modals/ResetModal';
import { CRTOverlay } from './components/ui/CRTOverlay';
import { MonoLabel } from './components/ui/MonoLabel';

type Modal = 'dice' | 'reset' | null;

export default function App() {
  const players = useGameStore((s) => s.players);
  const gameActive = useGameStore((s) => s.gameActive);
  const [modal, setModal] = useState<Modal>(null);

  useWakeLock(gameActive);

  useEffect(() => {
    if (navigator.storage?.persist) navigator.storage.persist();
  }, []);

  if (!gameActive) return (
    <div className="h-full bg-bg0 relative">
      <CRTOverlay />
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
      <SetupScreen />
    </div>
  );

  const layout = getTableLayout(players.length);

  return (
    <div className="h-full bg-bg0 flex flex-col relative overflow-hidden">
      <CRTOverlay />
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

      <div
        className="flex-1 grid"
        style={{
          gridTemplateColumns: `repeat(${layout.cols}, 1fr)`,
          gridAutoRows: '1fr',
        }}
      >
        {layout.slots.map((slot) => {
          const player = players[slot.id];
          if (!player) return null;
          const opponents = players.filter((p) => p.id !== player.id);
          return (
            <PlayerCard
              key={player.id}
              player={player}
              slot={slot}
              opponents={opponents}
              allSlots={layout.slots}
            />
          );
        })}
      </div>

      <div
        className="flex items-center justify-between px-4 py-2 border-t relative z-10"
        style={{ borderColor: 'rgba(0,229,255,0.1)', background: 'rgba(2,8,16,0.9)' }}
      >
        <MonoLabel>BURNING WISH</MonoLabel>
        <div className="flex gap-3">
          <button
            className="font-mono text-[10px] tracking-widest text-cyanDim px-2 py-1 border border-cyanDim/30 rounded active:scale-90 transition-all"
            onClick={() => setModal('dice')}
          >
            DICE
          </button>
          <button
            className="font-mono text-[10px] tracking-widest text-danger/60 px-2 py-1 border border-danger/30 rounded active:scale-90 transition-all"
            onClick={() => setModal('reset')}
          >
            RESET
          </button>
        </div>
      </div>

      {modal === 'dice' && <DiceModal onClose={() => setModal(null)} />}
      {modal === 'reset' && <ResetModal onClose={() => setModal(null)} />}
    </div>
  );
}
