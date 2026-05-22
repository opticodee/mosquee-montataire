import { buildOneStreamUrl } from "@/lib/supabase";

export function OneStreamPlayer({
  token,
  title,
}: {
  token: string;
  title: string;
}) {
  return (
    <div
      className="relative z-0 w-full overflow-hidden rounded-2xl bg-black shadow-elevated"
      style={{ paddingBottom: "56.25%" }}
    >
      <iframe
        src={buildOneStreamUrl(token)}
        title={title}
        className="absolute inset-0 w-full h-full"
        allow="autoplay; encrypted-media; picture-in-picture"
        allowFullScreen
        frameBorder={0}
        scrolling="no"
      />
    </div>
  );
}
