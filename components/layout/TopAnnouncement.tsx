import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getAnnouncement } from "@/lib/supabase";

export async function TopAnnouncement() {
  const announcement = await getAnnouncement();

  if (!announcement.enabled || !announcement.message) return null;

  const { emoji, message, cta_label, cta_url } = announcement;
  const hasCta = cta_label.length > 0 && cta_url.length > 0;
  const isExternal = /^https?:\/\//i.test(cta_url);

  return (
    <div className="bg-gold text-white">
      <div className="mx-auto flex max-w-7xl items-center justify-center gap-3 px-4 py-2.5 text-center text-sm">
        {emoji && (
          <span className="shrink-0 text-base leading-none" aria-hidden="true">
            {emoji}
          </span>
        )}
        <p className="font-medium">
          {message}{" "}
          {hasCta &&
            (isExternal ? (
              <a
                href={cta_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-bold underline-offset-2 hover:underline"
              >
                {cta_label}
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            ) : (
              <Link
                href={cta_url}
                className="inline-flex items-center gap-1 font-bold underline-offset-2 hover:underline"
              >
                {cta_label}
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
            ))}
        </p>
      </div>
    </div>
  );
}
