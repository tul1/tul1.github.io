import { profile } from "@/content/profile";

export function JsonLdPerson() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.fullName,
    alternateName: profile.name,
    jobTitle: profile.title,
    description: profile.summary,
    url: profile.social.website,
    image: `${profile.social.website}${profile.headshot}`,
    email: profile.social.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Brest",
      addressCountry: "FR",
    },
    sameAs: [profile.social.github, profile.social.linkedin],
    knowsAbout: [...profile.stack],
    worksFor: {
      "@type": "Organization",
      name: "OVHcloud",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
