import type { TableLayout, Slot } from '../types';

export function getTableLayout(n: number): TableLayout {
  const slots: Slot[] = [];
  let id = 0;

  // n=2: 1 top full (180) + 1 bottom full (0)
  // n=3: 2 side + 1 bottom full
  // n=4: 2+2
  // n=5: 1 top full + 2+2
  // n=6: 2+2+2
  // n=7: 1 top full + 2+2+2

  if (n === 2) {
    slots.push({ id: id++, rotation: 180, colSpan: 2 });
    slots.push({ id: id++, rotation: 0, colSpan: 2 });
    return { cols: 2, slots };
  }

  const hasTopFull = n === 3 || n === 5 || n === 7;

  if (hasTopFull) {
    // For n=3: bottom player is index 0 (rotation 0, full width)
    // For n=5,7: top player gets rotation 180, full width
    const rotation = n === 3 ? 180 : 180;
    slots.push({ id: id++, rotation, colSpan: 2 });
  }

  const pairs = Math.floor(n / 2);
  for (let i = 0; i < pairs; i++) {
    slots.push({ id: id++, rotation: 90, colSpan: 1 });
    slots.push({ id: id++, rotation: 270, colSpan: 1 });
  }

  // n=3: rearrange so full-width is bottom
  if (n === 3) {
    const full = slots.shift()!;
    full.rotation = 0;
    slots.push(full);
  }

  return { cols: 2, slots };
}
