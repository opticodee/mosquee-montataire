import { redirect } from "next/navigation";
import Link from "next/link";
import {
  BarChart3,
  CheckCircle2,
  ExternalLink,
  Info,
  Megaphone,
  Newspaper,
  Radio,
  Save,
} from "lucide-react";
import { AnnouncementPreview } from "@/components/admin/AnnouncementPreview";
import { AnnouncementPreviewContent } from "@/components/admin/AnnouncementPreviewContent";
import { NewsCardPreviewContent } from "@/components/admin/NewsCardPreviewContent";
import { PreviewModal } from "@/components/admin/PreviewModal";
import { isAuthenticated } from "@/lib/admin-auth";
import {
  getAnnouncement,
  getJumuaStream,
  getNews,
  type Announcement,
  type NewsItem,
} from "@/lib/supabase";
import {
  saveAnnouncementAction,
  saveJumuaAction,
  saveNewsAction,
} from "./actions";

export const dynamic = "force-dynamic";

type SearchParams = Promise<{ saved?: string }>;

function formatUpdatedAt(iso: string): string | null {
  if (!iso) return null;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return null;
  return new Intl.DateTimeFormat("fr-FR", {
    dateStyle: "long",
    timeStyle: "short",
  }).format(d);
}

export default async function AdminDashboardPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  if (!(await isAuthenticated())) redirect("/admin/login");

  const [stream, news, announcement] = await Promise.all([
    getJumuaStream(),
    getNews(),
    getAnnouncement(),
  ]);
  const { saved } = await searchParams;
  const updatedAt = formatUpdatedAt(stream.updated_at);
  const jumuaSaved = saved === "1";
  const announcementSaved = saved === "announcement";
  const savedNewsSlot = saved?.startsWith("news")
    ? Number(saved.slice(4))
    : null;

  return (
    <div className="mx-auto max-w-3xl px-6 py-10 sm:py-14">
      <Link
        href="/admin/analytics"
        className="mb-10 block rounded-3xl bg-primary-700 p-6 text-cream shadow-elevated transition-all hover:bg-primary-600"
      >
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold/20">
            <BarChart3 className="h-6 w-6 text-gold-light" aria-hidden="true" />
          </div>
          <div>
            <p className="text-xs uppercase tracking-wider text-gold-light">
              Statistiques en temps réel
            </p>
            <p className="font-display text-xl font-bold">Analytics du site</p>
            <p className="mt-1 text-sm text-cream/80">
              Visiteurs en ligne, top pages, périodes personnalisées…
            </p>
          </div>
        </div>
      </Link>

      <AnnouncementSection
        announcement={announcement}
        savedFlash={announcementSaved}
      />

      <div className="mt-14 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-primary-500">
            Traduction en direct
          </p>
          <h1 className="mt-1 font-display text-2xl font-bold text-primary-700 sm:text-3xl">
            Gestion de la traduction Jumu&apos;a
          </h1>
        </div>
        {stream.enabled ? (
          <span className="inline-flex items-center gap-2 self-start rounded-full bg-red-100 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-red-700">
            <span className="h-2 w-2 animate-pulse rounded-full bg-red-600" />
            En direct
          </span>
        ) : (
          <span className="inline-flex items-center gap-2 self-start rounded-full bg-gray-200 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-gray-600">
            <span className="h-2 w-2 rounded-full bg-gray-500" />
            Inactif
          </span>
        )}
      </div>

      {updatedAt && (
        <p className="mt-3 text-sm text-ink-muted">
          Dernière modification : <strong>{updatedAt}</strong>
        </p>
      )}

      {jumuaSaved && (
        <div className="mt-6 flex items-start gap-2 rounded-xl border border-green-200 bg-green-50 p-3 text-sm text-green-700">
          <CheckCircle2
            className="mt-0.5 h-4 w-4 shrink-0"
            aria-hidden="true"
          />
          <span>Modifications enregistrées ✓</span>
        </div>
      )}

      <form
        action={saveJumuaAction}
        className="mt-6 space-y-5 rounded-3xl border border-primary-100 bg-white p-6 shadow-soft sm:p-8"
      >
        <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-primary-100 bg-cream/60 p-4 transition-colors hover:bg-cream">
          <input
            type="checkbox"
            name="enabled"
            defaultChecked={stream.enabled}
            className="mt-1 h-5 w-5 shrink-0 cursor-pointer rounded border-primary-300 text-primary-700 focus:ring-primary-500"
          />
          <span>
            <span className="block font-semibold text-primary-700">
              Activer la diffusion
            </span>
            <span className="mt-0.5 block text-sm text-ink-muted">
              Lorsqu&apos;activée, la page publique affiche le lecteur en direct.
            </span>
          </span>
        </label>

        <div>
          <label
            htmlFor="token"
            className="mb-1.5 block text-sm font-semibold text-primary-700"
          >
            Token OneStream
          </label>
          <input
            id="token"
            name="token"
            type="text"
            defaultValue={stream.token}
            placeholder="MjM5NDIwNDY="
            className="w-full rounded-xl border border-primary-200 bg-white px-4 py-3 font-mono text-sm text-ink placeholder:text-ink-muted/60 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
          />
        </div>

        <div>
          <label
            htmlFor="date"
            className="mb-1.5 block text-sm font-semibold text-primary-700"
          >
            Date affichée
          </label>
          <input
            id="date"
            name="date"
            type="text"
            defaultValue={stream.date}
            placeholder="Vendredi 24 mai 2026"
            className="w-full rounded-xl border border-primary-200 bg-white px-4 py-3 text-base text-ink placeholder:text-ink-muted/60 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-xl bg-primary-700 px-5 py-3 text-base font-semibold text-white shadow-soft transition-colors hover:bg-primary-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
          >
            <Save className="h-5 w-5" aria-hidden="true" />
            Sauvegarder
          </button>

          <Link
            href="/traduction-en-direct/jumua"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-primary-200 bg-white px-5 py-3 text-base font-semibold text-primary-700 transition-colors hover:bg-primary-50"
          >
            <Radio className="h-5 w-5" aria-hidden="true" />
            Voir la page publique
            <ExternalLink className="h-4 w-4 opacity-70" aria-hidden="true" />
          </Link>
        </div>
      </form>

      <div className="mt-6 rounded-2xl border border-primary-100 bg-white p-5 shadow-soft sm:p-6">
        <div className="flex items-start gap-3">
          <Info
            className="mt-0.5 h-5 w-5 shrink-0 text-primary-500"
            aria-hidden="true"
          />
          <div className="text-sm leading-relaxed text-ink-muted">
            <p className="font-semibold text-primary-700">
              Comment obtenir le token OneStream ?
            </p>
            <p className="mt-2">
              Dans OneStream, copiez l&apos;URL du lecteur embed. Le token est
              la valeur du paramètre <code className="font-mono">token=</code> :
            </p>
            <pre className="mt-3 overflow-x-auto rounded-lg bg-primary-900 px-3 py-2 text-xs text-cream">
              https://player.onestream.live/embed?token=
              <span className="rounded bg-gold/40 px-1 py-0.5 font-bold text-gold-light">
                MjM5NDIwNDY=
              </span>
              &amp;type=event
            </pre>
            <p className="mt-3">
              Collez uniquement la partie surlignée (avant{" "}
              <code className="font-mono">&amp;type=event</code>) dans le
              champ ci-dessus.
            </p>
          </div>
        </div>
      </div>

      {/* Section Actualités */}
      <div className="mt-14 flex items-center gap-3">
        <div className="rounded-xl bg-primary-50 p-2.5 text-primary-500">
          <Newspaper className="h-6 w-6" aria-hidden="true" />
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-primary-500">
            Cartes affichées sur la page d&apos;accueil
          </p>
          <h2 className="font-display text-xl font-bold text-primary-700 sm:text-2xl">
            Actualités
          </h2>
        </div>
      </div>

      <div className="mt-4 rounded-2xl border border-primary-100 bg-cream/60 p-5 text-sm leading-relaxed text-ink-muted">
        <p>
          Vous pouvez activer <strong>0 à 3 cartes</strong> d&apos;actualités.
          Si aucune carte n&apos;est activée, la section ne s&apos;affiche pas
          sur la page d&apos;accueil.
        </p>
        <p className="mt-3 font-semibold text-primary-700">
          Exemple de HTML utilisable :
        </p>
        <pre className="mt-2 overflow-x-auto rounded-lg bg-primary-900 px-3 py-2 text-xs text-cream">
{`<p><strong>Titre fort</strong></p>
<p>Texte normal avec <em>italique</em> et <a href="#">lien</a>.</p>
<ul>
  <li>Point 1</li>
  <li>Point 2</li>
</ul>`}
        </pre>
      </div>

      <div className="mt-6 space-y-6">
        {news.map((item) => (
          <NewsForm
            key={item.slot}
            item={item}
            savedFlash={savedNewsSlot === item.slot}
          />
        ))}
      </div>
    </div>
  );
}

function AnnouncementSection({
  announcement,
  savedFlash,
}: {
  announcement: Announcement;
  savedFlash: boolean;
}) {
  const updatedAt = formatUpdatedAt(announcement.updated_at);
  return (
    <section className="mt-14">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-gold/15 p-2.5 text-gold">
            <Megaphone className="h-6 w-6" aria-hidden="true" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-primary-500">
              S&apos;affiche en haut de toutes les pages du site
            </p>
            <h2 className="font-display text-xl font-bold text-primary-700 sm:text-2xl">
              Bandeau d&apos;annonce
            </h2>
          </div>
        </div>
        {announcement.enabled ? (
          <span className="inline-flex items-center gap-2 self-start rounded-full bg-green-100 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-green-700">
            <span className="h-2 w-2 rounded-full bg-green-600" />
            Actif
          </span>
        ) : (
          <span className="inline-flex items-center gap-2 self-start rounded-full bg-gray-200 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-gray-600">
            <span className="h-2 w-2 rounded-full bg-gray-500" />
            Inactif
          </span>
        )}
      </div>

      {updatedAt && (
        <p className="mt-3 text-sm text-ink-muted">
          Dernière modification : <strong>{updatedAt}</strong>
        </p>
      )}

      {savedFlash && (
        <div className="mt-6 flex items-start gap-2 rounded-xl border border-green-200 bg-green-50 p-3 text-sm text-green-700">
          <CheckCircle2
            className="mt-0.5 h-4 w-4 shrink-0"
            aria-hidden="true"
          />
          <span>Bandeau d&apos;annonce enregistré ✓</span>
        </div>
      )}

      <form
        id="announcement-form"
        action={saveAnnouncementAction}
        className="mt-6 space-y-5 rounded-3xl border border-primary-100 bg-white p-6 shadow-soft sm:p-8"
      >
        <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-primary-100 bg-cream/60 p-4 transition-colors hover:bg-cream">
          <input
            type="checkbox"
            name="enabled"
            defaultChecked={announcement.enabled}
            className="mt-1 h-5 w-5 shrink-0 cursor-pointer rounded border-primary-300 text-primary-700 focus:ring-primary-500"
          />
          <span>
            <span className="block font-semibold text-primary-700">
              Activer le bandeau
            </span>
            <span className="mt-0.5 block text-sm text-ink-muted">
              Désactivé, le bandeau ne s&apos;affiche pas du tout sur le site.
            </span>
          </span>
        </label>

        <div>
          <label
            htmlFor="emoji"
            className="mb-1.5 block text-sm font-semibold text-primary-700"
          >
            Emoji / icône (optionnel)
          </label>
          <input
            id="emoji"
            name="emoji"
            type="text"
            defaultValue={announcement.emoji}
            placeholder="📣"
            className="w-24 rounded-xl border border-primary-200 bg-white px-4 py-3 text-base text-ink placeholder:text-ink-muted/60 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
          />
        </div>

        <div>
          <label
            htmlFor="message"
            className="mb-1.5 block text-sm font-semibold text-primary-700"
          >
            Message
          </label>
          <input
            id="message"
            name="message"
            type="text"
            defaultValue={announcement.message}
            placeholder="Projet éducatif : participons ensemble à l'ouverture du lycée."
            className="w-full rounded-xl border border-primary-200 bg-white px-4 py-3 text-base text-ink placeholder:text-ink-muted/60 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
          />
        </div>

        <div>
          <label
            htmlFor="cta_label"
            className="mb-1.5 block text-sm font-semibold text-primary-700"
          >
            Texte du lien (CTA)
          </label>
          <input
            id="cta_label"
            name="cta_label"
            type="text"
            defaultValue={announcement.cta_label}
            placeholder="Découvrir le projet"
            className="w-full rounded-xl border border-primary-200 bg-white px-4 py-3 text-base text-ink placeholder:text-ink-muted/60 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
          />
        </div>

        <div>
          <label
            htmlFor="cta_url"
            className="mb-1.5 block text-sm font-semibold text-primary-700"
          >
            URL du lien
          </label>
          <input
            id="cta_url"
            name="cta_url"
            type="text"
            defaultValue={announcement.cta_url}
            placeholder="/projet-lycee"
            className="w-full rounded-xl border border-primary-200 bg-white px-4 py-3 font-mono text-sm text-ink placeholder:text-ink-muted/60 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
          />
          <p className="mt-1.5 text-xs text-ink-muted">
            Interne (ex : <code className="font-mono">/projet-lycee</code>) ou
            externe (ex : <code className="font-mono">https://…</code>).
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-xl bg-primary-700 px-5 py-3 text-base font-semibold text-white shadow-soft transition-colors hover:bg-primary-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
          >
            <Save className="h-5 w-5" aria-hidden="true" />
            Sauvegarder le bandeau
          </button>

          <PreviewModal
            formId="announcement-form"
            buttonLabel="Aperçu du bandeau"
          >
            {(values) => <AnnouncementPreviewContent values={values} />}
          </PreviewModal>
        </div>
      </form>

      <AnnouncementPreview
        initial={{
          enabled: announcement.enabled,
          emoji: announcement.emoji,
          message: announcement.message,
          cta_label: announcement.cta_label,
          cta_url: announcement.cta_url,
        }}
      />
    </section>
  );
}

function NewsForm({
  item,
  savedFlash,
}: {
  item: NewsItem;
  savedFlash: boolean;
}) {
  const updatedAt = formatUpdatedAt(item.updated_at);
  return (
    <form
      id={`news-form-${item.slot}`}
      action={saveNewsAction}
      className="space-y-4 rounded-3xl border border-primary-100 bg-white p-6 shadow-soft sm:p-7"
    >
      <input type="hidden" name="slot" value={item.slot} />
      <div className="flex items-center justify-between gap-3">
        <h3 className="font-display text-lg font-bold text-primary-700">
          Actualité {item.slot}
        </h3>
        {item.enabled ? (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-green-100 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-green-700">
            <span className="h-1.5 w-1.5 rounded-full bg-green-600" />
            Activée
          </span>
        ) : (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-gray-200 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-gray-600">
            <span className="h-1.5 w-1.5 rounded-full bg-gray-500" />
            Inactive
          </span>
        )}
      </div>

      {savedFlash && (
        <div className="flex items-start gap-2 rounded-xl border border-green-200 bg-green-50 p-3 text-sm text-green-700">
          <CheckCircle2
            className="mt-0.5 h-4 w-4 shrink-0"
            aria-hidden="true"
          />
          <span>Actualité {item.slot} enregistrée ✓</span>
        </div>
      )}

      <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-primary-100 bg-cream/60 p-3 transition-colors hover:bg-cream">
        <input
          type="checkbox"
          name="enabled"
          defaultChecked={item.enabled}
          className="mt-1 h-5 w-5 shrink-0 cursor-pointer rounded border-primary-300 text-primary-700 focus:ring-primary-500"
        />
        <span className="text-sm">
          <span className="block font-semibold text-primary-700">
            Activer cette carte
          </span>
          <span className="mt-0.5 block text-ink-muted">
            Affichée publiquement uniquement si activée et si le HTML est
            renseigné.
          </span>
        </span>
      </label>

      <div>
        <label
          htmlFor={`title-${item.slot}`}
          className="mb-1.5 block text-sm font-semibold text-primary-700"
        >
          Titre (optionnel)
        </label>
        <input
          id={`title-${item.slot}`}
          name="title"
          type="text"
          defaultValue={item.title}
          placeholder="Ex : Ramadan 2026 — Programme"
          className="w-full rounded-xl border border-primary-200 bg-white px-4 py-2.5 text-base text-ink placeholder:text-ink-muted/60 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
        />
      </div>

      <div>
        <label
          htmlFor={`html-${item.slot}`}
          className="mb-1.5 block text-sm font-semibold text-primary-700"
        >
          Contenu HTML
        </label>
        <textarea
          id={`html-${item.slot}`}
          name="html"
          rows={10}
          defaultValue={item.html}
          placeholder="<p>Votre contenu HTML…</p>"
          className="w-full rounded-xl border border-primary-200 bg-white px-4 py-3 font-mono text-sm text-ink placeholder:text-ink-muted/60 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
        />
      </div>

      {updatedAt && (
        <p className="text-xs text-ink-muted">
          Dernière modification : <strong>{updatedAt}</strong>
        </p>
      )}

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="submit"
          className="inline-flex items-center gap-2 rounded-xl bg-primary-700 px-5 py-2.5 text-sm font-semibold text-white shadow-soft transition-colors hover:bg-primary-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
        >
          <Save className="h-4 w-4" aria-hidden="true" />
          Sauvegarder cette actualité
        </button>

        <PreviewModal
          formId={`news-form-${item.slot}`}
          buttonLabel={`Aperçu actualité ${item.slot}`}
        >
          {(values) => <NewsCardPreviewContent values={values} />}
        </PreviewModal>
      </div>
    </form>
  );
}
