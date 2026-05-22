export function MixlrPlayer() {
  return (
    <div className="relative z-0 w-full">
      <iframe
        src="https://acmdm.mixlr.com/embed"
        title="Lecteur Mixlr ACMDM — Discours en direct"
        className="w-full rounded-lg border-0"
        style={{ height: 200 }}
        scrolling="no"
        allow="autoplay"
      />
    </div>
  );
}
