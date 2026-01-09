import React from 'react';

interface OrganizationSchema {
  name: string;
  url: string;
  logo: string;
  description: string;
  sameAs?: string[];
}

interface ProductSchema {
  name: string;
  description: string;
  image: string;
  brand?: string;
  offers?: {
    price: string;
    priceCurrency: string;
    availability: string;
  };
}

interface ArticleSchema {
  headline: string;
  description: string;
  image: string;
  datePublished: string;
  dateModified?: string;
  author: {
    name: string;
  };
  publisher: {
    name: string;
    logo: string;
  };
}

type SchemaType = 
  | { type: 'organization'; data: OrganizationSchema }
  | { type: 'product'; data: ProductSchema }
  | { type: 'article'; data: ArticleSchema };

export const JsonLd: React.FC<SchemaType> = ({ type, data }) => {
  const getSchema = () => {
    switch (type) {
      case 'organization':
        return {
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: (data as OrganizationSchema).name,
          url: (data as OrganizationSchema).url,
          logo: (data as OrganizationSchema).logo,
          description: (data as OrganizationSchema).description,
          sameAs: (data as OrganizationSchema).sameAs || [],
        };
      case 'product':
        return {
          '@context': 'https://schema.org',
          '@type': 'Product',
          name: (data as ProductSchema).name,
          description: (data as ProductSchema).description,
          image: (data as ProductSchema).image,
          brand: (data as ProductSchema).brand ? {
            '@type': 'Brand',
            name: (data as ProductSchema).brand,
          } : undefined,
          offers: (data as ProductSchema).offers ? {
            '@type': 'Offer',
            price: (data as ProductSchema).offers?.price,
            priceCurrency: (data as ProductSchema).offers?.priceCurrency,
            availability: (data as ProductSchema).offers?.availability,
          } : undefined,
        };
      case 'article':
        return {
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: (data as ArticleSchema).headline,
          description: (data as ArticleSchema).description,
          image: (data as ArticleSchema).image,
          datePublished: (data as ArticleSchema).datePublished,
          dateModified: (data as ArticleSchema).dateModified || (data as ArticleSchema).datePublished,
          author: {
            '@type': 'Person',
            name: (data as ArticleSchema).author.name,
          },
          publisher: {
            '@type': 'Organization',
            name: (data as ArticleSchema).publisher.name,
            logo: {
              '@type': 'ImageObject',
              url: (data as ArticleSchema).publisher.logo,
            },
          },
        };
      default:
        return null;
    }
  };

  const schema = getSchema();
  if (!schema) return null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};
