/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  async redirects() {
    return [
      // Redirections des QR codes existants (anciennes URLs Shopify)
      {
        source: "/pages/traduction-fr",
        destination: "/traduction-en-direct",
        permanent: true,
      },
      {
        source: "/pages/copie-de-traduction-fr-1",
        destination: "/traduction-en-direct/jumua",
        permanent: true,
      },
      {
        source: "/pages/traduction-discours-vendredi-soir-et-dimanche-soir",
        destination: "/traduction-en-direct/discours",
        permanent: true,
      },
      {
        source: "/pages/votre-mosquee-a-besoin-de-vous",
        destination: "/dons-mensuels",
        permanent: true,
      },
      // Mappings supplémentaires des autres anciennes pages Shopify
      {
        source: "/pages/jumua",
        destination: "/replay",
        permanent: true,
      },
      {
        source: "/pages/ecole-acm",
        destination: "/association",
        permanent: true,
      },
      {
        source: "/pages/horaires-de-priere",
        destination: "/horaires",
        permanent: true,
      },
      {
        source: "/pages/coran-audio",
        destination: "/coran-audio",
        permanent: true,
      },
      {
        source: "/pages/projet-lycee",
        destination: "/projet-lycee",
        permanent: true,
      },
      {
        source: "/pages/contact",
        destination: "/contact",
        permanent: true,
      },
      {
        source: "/pages/application",
        destination: "/application",
        permanent: true,
      },
      {
        source: "/pages/dons-mensuels",
        destination: "/dons-mensuels",
        permanent: true,
      },
      // Fallback : toute autre ancienne page Shopify (/pages/xxx) qui
      // n'a pas de correspondance précise → redirige vers la home
      {
        source: "/pages/:slug*",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
