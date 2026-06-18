"use client";

import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

type Props = {
  formId: string;
  buttonLabel?: string;
  children: (formValues: Record<string, string | boolean>) => React.ReactNode;
};

export function PreviewModal({
  formId,
  buttonLabel = "Aperçu",
  children,
}: Props) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [values, setValues] = useState<Record<string, string | boolean>>({});

  useEffect(() => setMounted(true), []);

  // Récupère les valeurs actuelles du formulaire au moment d'ouvrir la modal
  function captureFormValues() {
    const form = document.getElementById(formId) as HTMLFormElement | null;
    if (!form) return {};
    const data = new FormData(form);
    const result: Record<string, string | boolean> = {};
    // Inputs textuels
    data.forEach((v, k) => {
      result[k] = String(v);
    });
    // Checkboxes (FormData ne les inclut que si elles sont cochées)
    form
      .querySelectorAll<HTMLInputElement>('input[type="checkbox"][name]')
      .forEach((el) => {
        result[el.name] = el.checked;
      });
    return result;
  }

  function handleOpen() {
    setValues(captureFormValues());
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  // Fermeture avec Échap + blocage du scroll de fond
  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") handleClose();
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
        👁️ {buttonLabel}
      </button>

      {mounted && open
        ? createPortal(
            <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
              {/* Backdrop */}
              <div
                onClick={handleClose}
                className="absolute inset-0 bg-primary-900/70 backdrop-blur-sm"
              />

              {/* Modal */}
              <div className="relative z-10 max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl bg-cream shadow-2xl">
                {/* Header modal */}
                <div className="sticky top-0 z-10 flex items-center justify-between border-b border-primary-100 bg-cream px-6 py-4">
                  <p className="text-xs font-bold uppercase tracking-wider text-primary-500">
                    Aperçu — {buttonLabel}
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

                {/* Contenu */}
                <div className="p-6">{children(values)}</div>

                {/* Footer */}
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
