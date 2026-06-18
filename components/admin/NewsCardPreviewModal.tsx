"use client";

import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export function NewsCardPreviewModal({ slot }: { slot: number }) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [values, setValues] = useState({
    enabled: false,
    title: "",
    html: "",
  });

  useEffect(() => setMounted(true), []);

  function captureFormValues() {
    const form = document.getElementById(
      `news-form-${slot}`,
    ) as HTMLFormElement | null;
    if (!form) return values;
    const fd = new FormData(form);
    const enabledEl = form.querySelector<HTMLInputElement>(
      'input[name="enabled"]',
    );
    return {
      enabled: enabledEl ? enabledEl.checked : false,
      title: String(fd.get("title") ?? ""),
      html: String(fd.get("html") ?? ""),
    };
  }

  function handleOpen() {
    setValues(captureFormValues());
    setOpen(true);
  }
  function handleClose() {
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={handleOpen}
        className="inline-flex items-center gap-2 rounded-xl border border-primary-300 bg-white px-4 py-2 text-sm font-semibold text-primary-700 shadow-soft transition-all hover:bg-primary-50"
      >
        👁️ Aperçu actualité {slot}
      </button>

      {mounted && open
        ? createPortal(
            <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
              <div
                onClick={handleClose}
                className="absolute inset-0 bg-primary-900/70 backdrop-blur-sm"
              />
              <div className="relative z-10 max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl bg-cream shadow-2xl">
                <div className="sticky top-0 z-10 flex items-center justify-between border-b border-primary-100 bg-cream px-6 py-4">
                  <p className="text-xs font-bold uppercase tracking-wider text-primary-500">
                    Aperçu — Actualité {slot}
                  </p>
                  <button
                    type="button"
                    onClick={handleClose}
                    className="rounded-xl p-2 text-ink-muted transition-colors hover:bg-primary-50 hover:text-primary-700"
                    aria-label="Fermer"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
                <div className="p-6">
                  {!values.enabled ? (
                    <div className="rounded-2xl border-2 border-dashed border-ink-muted/30 bg-cream/50 p-8 text-center">
                      <p className="text-base text-ink-muted">
                        🔇 Cette carte est désactivée. Elle ne s&apos;affichera
                        pas sur le site.
                      </p>
                    </div>
                  ) : !values.html.trim() ? (
                    <div className="rounded-2xl border-2 border-dashed border-ink-muted/30 bg-cream/50 p-8 text-center">
                      <p className="text-base text-ink-muted">
                        ✏️ Renseignez du contenu HTML pour voir l&apos;aperçu.
                      </p>
                    </div>
                  ) : (
                    <div>
                      <p className="mb-3 text-xs text-ink-muted">
                        Voici à quoi ressemblera la carte sur la page
                        d&apos;accueil :
                      </p>
                      {/* Reproduction fidèle d'une carte de components/home/NewsSection.tsx */}
                      <article className="rounded-2xl border border-primary-100 bg-white p-6 shadow-soft">
                        {values.title.trim() && (
                          <h3 className="font-display text-xl font-bold text-primary-700">
                            {values.title}
                          </h3>
                        )}
                        <div
                          className={`news-content text-ink-muted leading-relaxed${values.title.trim() ? " mt-3" : ""}`}
                          dangerouslySetInnerHTML={{ __html: values.html }}
                        />
                      </article>
                    </div>
                  )}
                </div>
                <div className="border-t border-primary-100 bg-white/50 px-6 py-3 text-center text-xs text-ink-muted">
                  Échap, croix, ou clic en dehors pour fermer
                </div>
              </div>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
