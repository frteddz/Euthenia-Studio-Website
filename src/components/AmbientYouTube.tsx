export function AmbientYouTube() {
  return (
    <div
      id="ambient-youtube"
      style={{
        position: 'fixed',
        bottom: 0,
        right: 0,
        width: 1,
        height: 1,
        opacity: 0,
        pointerEvents: 'none',
        zIndex: -1,
      }}
    />
  );
}
