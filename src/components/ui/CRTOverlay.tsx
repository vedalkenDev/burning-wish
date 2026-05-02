export function CRTOverlay() {
  return (
    <>
      {/* scanline grid */}
      <div
        className="pointer-events-none fixed inset-0"
        style={{
          zIndex: 9999,
          backgroundImage: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.08) 0px, rgba(0,0,0,0.08) 1px, transparent 1px, transparent 3px)',
        }}
        aria-hidden
      />
      {/* vignette */}
      <div
        className="pointer-events-none fixed inset-0"
        style={{
          zIndex: 9998,
          background: 'radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.65) 100%)',
        }}
        aria-hidden
      />
    </>
  );
}
