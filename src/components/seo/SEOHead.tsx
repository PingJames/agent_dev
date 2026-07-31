import type { SEOMeta } from "@/lib/types";

export function generateSEOMeta(meta: SEOMeta) {
  const {
    title,
    description,
    ogImage,
    canonical,
    type = "website",
    publishedTime,
    modifiedTime,
    tags,
  } = meta;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type,
      ...(ogImage && { images: [{ url: ogImage, width: 1200, height: 630 }] }),
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
      ...(tags && { tags }),
    },
    twitter: {
      card: "summary_large_image" as const,
      title,
      description,
      ...(ogImage && { images: [ogImage] }),
    },
    ...(canonical && {
      alternates: { canonical },
    }),
  };
}

export function generateArticleStructuredData({
  title,
  description,
  date,
  modifiedDate,
  author,
  url,
  image,
}: {
  title: string;
  description: string;
  date: string;
  modifiedDate?: string;
  author: string;
  url: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    datePublished: date,
    ...(modifiedDate && { dateModified: modifiedDate }),
    author: {
      "@type": "Person",
      name: author,
    },
    ...(image && { image }),
    url,
  };
}

export function generateBreadcrumbStructuredData(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
