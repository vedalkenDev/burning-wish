export type DieType = 4 | 6 | 8 | 10 | 12 | 20;
export type Rotation = 0 | 90 | 180 | 270;

export interface Player {
  id: number;
  handle: string;
  accent: string;
  life: number;
  poison: number;
  cmdDmg: Record<number, number>;
  threat: boolean;
  dead: boolean;
}

export interface Slot {
  id: number;
  rotation: Rotation;
  colSpan: number;
}

export interface TableLayout {
  cols: number;
  slots: Slot[];
}
