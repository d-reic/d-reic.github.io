// schema.org structured data (JSON-LD), so search engines know who the site is
// about. Built from site.config.ts; pages pass it to <Base jsonLd={...}>.
import { site, portraits } from "../site.config";

const origin = "https://danielreichenpfader.com";
const sameAs = [
  ...site.links.filter((l) => l.href.startsWith("http")).map((l) => l.href),
  site.teaching.profile,
];

export const person = {
  "@type": "Person",
  "@id": `${origin}/#person`,
  name: site.name,
  url: `${origin}/`,
  image: `${origin}${portraits[0].src}`,
  jobTitle: "Tenure-track Lecturer",
  worksFor: { "@type": "CollegeOrUniversity", name: "Bern University of Applied Sciences (BFH)", url: "https://www.bfh.ch" },
  alumniOf: [
    { "@type": "CollegeOrUniversity", name: "FH JOANNEUM University of Applied Sciences" },
    { "@type": "CollegeOrUniversity", name: "Jönköping University" },
  ],
  knowsAbout: ["Natural language processing", "Large language models", "Clinical information extraction", "Radiology reports", "Digital health", "Conversational agents"],
  email: site.links.find((l) => l.href.startsWith("mailto:"))?.href.replace("mailto:", ""),
  sameAs,
};

export const website = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "WebSite", "@id": `${origin}/#website`, url: `${origin}/`, name: site.name, description: site.description, publisher: { "@id": person["@id"] }, inLanguage: "en" },
    person,
  ],
};

export const profilePage = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  url: `${origin}/about/`,
  mainEntity: person,
};

export function publicationList(works: { title: string; year: number | null; doi: string | null; url: string | null; venue: string | null }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    url: `${origin}/research/`,
    name: `Publications · ${site.name}`,
    about: { "@id": person["@id"] },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: works.map((w, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "ScholarlyArticle",
          headline: w.title,
          ...(w.year && { datePublished: String(w.year) }),
          ...(w.url && { url: w.url }),
          ...(w.doi && { identifier: { "@type": "PropertyValue", propertyID: "DOI", value: w.doi } }),
          ...(w.venue && { isPartOf: { "@type": "Periodical", name: w.venue } }),
          author: { "@id": person["@id"] },
        },
      })),
    },
  };
}

export function blogPosting(p: { title: string; description: string; date: Date; updated?: Date; url: string; image: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: p.title,
    description: p.description,
    datePublished: p.date.toISOString(),
    ...(p.updated && { dateModified: p.updated.toISOString() }),
    url: p.url,
    image: p.image,
    author: person,
  };
}
