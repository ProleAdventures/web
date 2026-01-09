import React from 'react';

interface HeadProps {
  title: string;
  description: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogUrl?: string;
  twitterCard?: string;
  canonicalUrl?: string;
}

export const Head: React.FC<HeadProps> = ({
  title,
  description,
  ogTitle,
  ogDescription,
  ogImage = 'https://proleadventures.com/images/og-default.jpg',
  ogUrl,
  twitterCard = 'summary_large_image',
  canonicalUrl,
}) => {
  const siteTitle = 'Prole Adventures';
  const fullTitle = ogTitle || title;
  const fullDescription = ogDescription || description;
  const url = ogUrl || canonicalUrl || 'https://proleadventures.com';
  const canonical = canonicalUrl || url;

  return (
    <>
      <title>{fullTitle} | {siteTitle}</title>
      <meta name="description" content={fullDescription} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonical} />
      
      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={fullDescription} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content={siteTitle} />
      
      {/* Twitter */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={fullDescription} />
      <meta name="twitter:image" content={ogImage} />
      
      {/* Robots */}
      <meta name="robots" content="index, follow" />
      
      {/* Favicon */}
      <link rel="icon" type="image/webp" href="/images/logo-prole.webp" />
    </>
  );
};
