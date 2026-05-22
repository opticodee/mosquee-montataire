import { ShieldCheck, RotateCcw, Mail, FileText, Lock } from "lucide-react";

export function DonationReassurance() {
  const items = [
    {
      icon: ShieldCheck,
      title: "Paiement sécurisé",
      description: "Mandat SEPA traité par GoCardless, certifié et reconnu.",
    },
    {
      icon: RotateCcw,
      title: "Modifiable à tout moment",
      description: "Vous pouvez modifier ou arrêter votre don quand vous le souhaitez.",
    },
    {
      icon: Mail,
      title: "Confirmation par email",
      description: "Vous recevez un email après chaque transaction effectuée.",
    },
    {
      icon: Lock,
      title: "Confidentialité",
      description: "Vos données bancaires ne sont jamais stockées par la mosquée.",
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <div
            key={item.title}
            className="rounded-2xl border border-primary-100 bg-white p-5 shadow-soft"
          >
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary-50 text-primary-500">
              <Icon className="h-5 w-5" aria-hidden="true" />
            </div>
            <h3 className="mt-3 font-display text-base font-bold text-primary-700">
              {item.title}
            </h3>
            <p className="mt-1 text-sm text-ink-muted leading-relaxed">
              {item.description}
            </p>
          </div>
        );
      })}
    </div>
  );
}
