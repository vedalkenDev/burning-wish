import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Player } from '../types';

const ACCENTS = ['#00E5FF','#7B61FF','#FF2D55','#FF61DC','#00FF7F','#AEFF61','#FFB561'];
const HANDLES = ['ghost.radha','urza.shell','kaalia.net','teferi.void','prossh.exe','zur.ghost','meren.null'];

function makePlayer(id: number): Player {
  return {
    id,
    handle: HANDLES[id],
    accent: ACCENTS[id],
    life: 40,
    poison: 0,
    cmdDmg: {},
    threat: false,
    dead: false,
  };
}

interface GameState {
  players: Player[];
  stormCount: number;
  gameActive: boolean;
  startGame: (n: number) => void;
  resetGame: () => void;
  changeLife: (id: number, delta: number) => void;
  changePoison: (id: number, delta: number) => void;
  changeCmdDmg: (playerId: number, fromId: number, delta: number) => void;
  toggleThreat: (id: number) => void;
  changeHandle: (id: number, handle: string) => void;
}

export const useGameStore = create<GameState>()(
  persist(
    (set) => ({
      players: [],
      stormCount: 0,
      gameActive: false,

      startGame: (n) => {
        if (navigator.storage?.persist) navigator.storage.persist();
        set({
          players: Array.from({ length: n }, (_, i) => makePlayer(i)),
          stormCount: 0,
          gameActive: true,
        });
      },

      resetGame: () => set({ players: [], stormCount: 0, gameActive: false }),

      changeLife: (id, delta) =>
        set((s) => ({
          players: s.players.map((p) =>
            p.id === id
              ? { ...p, life: p.life + delta, dead: p.life + delta <= 0 }
              : p
          ),
        })),

      changePoison: (id, delta) =>
        set((s) => ({
          players: s.players.map((p) =>
            p.id === id
              ? { ...p, poison: Math.max(0, p.poison + delta), dead: p.poison + delta >= 10 }
              : p
          ),
        })),

      changeCmdDmg: (playerId, fromId, delta) =>
        set((s) => ({
          players: s.players.map((p) => {
            if (p.id !== playerId) return p;
            const prev = p.cmdDmg[fromId] ?? 0;
            const next = Math.max(0, prev + delta);
            const actualDelta = next - prev; // clamped at 0, so undo past 0 does nothing
            const newLife = p.life - actualDelta;
            return {
              ...p,
              life: newLife,
              dead: newLife <= 0,
              cmdDmg: { ...p.cmdDmg, [fromId]: next },
            };
          }),
        })),

      toggleThreat: (id) =>
        set((s) => ({
          players: s.players.map((p) =>
            p.id === id ? { ...p, threat: !p.threat } : p
          ),
        })),

      changeHandle: (id, handle) =>
        set((s) => ({
          players: s.players.map((p) =>
            p.id === id ? { ...p, handle } : p
          ),
        })),
    }),
    { name: 'burning-wish-state' }
  )
);
