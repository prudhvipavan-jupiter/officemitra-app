import type { ContentRow } from "@/lib/cms/types";

export function FaqJsonLd({ items }: { items: ContentRow[] }) {
  if (items.length === 0) return null;

  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.slice(0, 50).map((item) => ({
      "@type": "Question",
      name: item.title,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.body ?? item.summary,
      },
    })),
  };

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}
