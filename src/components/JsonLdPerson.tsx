import { profile } from "@/content/profile";

export function JsonLdPerson() {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        name: profile.fullName,
        alternateName: profile.name,
        jobTitle: profile.title,
        description: profile.bio,
        url: profile.social.website,
        image: `${profile.social.website}${profile.headshot}`,
        email: profile.social.email,
        sameAs: [profile.social.github, profile.social.linkedin],
        knowsAbout: [...profile.stack],
        worksFor: {
          "@type": "Organization",
          name: profile.company,
        },
      },
      {
        "@type": "Blog",
        name: `${profile.name}`,
        description: profile.tagline,
        url: profile.social.website,
        inLanguage: "en",
        author: {
          "@type": "Person",
          name: profile.fullName,
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
