import { useRef, useEffect, useCallback } from 'react';

export function useLongPress(
  onTap: () => void,
  onHold: () => void,
  holdDelay = 650
) {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const didHold = useRef(false);

  const clear = useCallback(() => {
    if (timerRef.current) { clearTimeout(timerRef.current); timerRef.current = null; }
    if (intervalRef.current) { clearInterval(intervalRef.current); intervalRef.current = null; }
  }, []);

  useEffect(() => () => clear(), [clear]);

  const onPointerDown = useCallback(() => {
    didHold.current = false;
    timerRef.current = setTimeout(() => {
      didHold.current = true;
      onHold();
      intervalRef.current = setInterval(onHold, 120);
    }, holdDelay);
  }, [onHold, holdDelay]);

  const onPointerUp = useCallback(() => {
    clear();
    if (!didHold.current) onTap();
  }, [clear, onTap]);

  const onPointerLeave = useCallback(() => { clear(); }, [clear]);

  const onContextMenu = useCallback((e: React.MouseEvent) => { e.preventDefault(); }, []);

  return { onPointerDown, onPointerUp, onPointerLeave, onContextMenu };
}
