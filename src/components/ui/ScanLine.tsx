export function ScanLine() {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden
    >
      <div className="animate-scan-line absolute left-0 right-0 h-px bg-cyan opacity-60" />
    </div>
  );
}
