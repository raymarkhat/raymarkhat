import { site, money } from '../site.config.mjs';
import { abs } from './render.mjs';
import { tiersFor } from './render.mjs';

const BRAND_ID = abs('/#org');

export const orgSchema = {
  '@context': 'https://schema.org',
  '@type': ['Organization', 'Manufacturer'],
  '@id': BRAND_ID,
  name: site.legalName,
  alternateName: site.brand,
  url: site.url,
  description: site.description,
  foundingDate: site.founded,
  email: site.email,
  telephone: '+86-159-5435-8307',
  logo: { '@type': 'ImageObject', url: abs('/assets/img/icon-512.png'), width: 512, height: 512 },
  image: abs('/assets/img/og-default.png'),
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Building 4, Yangguang Industrial Park, Zhonghua West Road, Nancheng Subdistrict, Mudan District',
    addressLocality: 'Heze',
    addressRegion: 'Shandong',
    postalCode: '274000',
    addressCountry: 'CN',
  },
  contactPoint: [
    {
      '@type': 'ContactPoint',
      contactType: 'sales',
      telephone: '+86-159-5435-8307',
      email: site.email,
      availableLanguage: ['en', 'zh'],
      areaServed: 'US',
    },
  ],
  knowsAbout: [
    'custom baseball caps',
    '6-panel caps',
    'trucker caps',
    '3D puff embroidery',
    'leather patch headwear',
    'low MOQ headwear manufacturing',
  ],
  slogan: 'Custom and pro-colorway baseball caps, factory-direct.',
  sameAs: [abs('/contact/')],
};

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': abs('/#website'),
  url: site.url,
  name: site.name,
  inLanguage: 'en-US',
  publisher: { '@id': BRAND_ID },
};

export const breadcrumbSchema = (items) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((it, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: it.label,
    item: abs(it.href),
  })),
});

export const faqSchema = (faqs) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
});

export function productSchema(p, categoryName = 'Baseball caps') {
  const tiers = tiersFor(p);
  const low = Math.min(...tiers.map((t) => Number(t.price)));
  const high = Math.max(...tiers.map((t) => Number(t.price)));
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': abs(`/caps/${p.slug}/#product`),
    name: p.name,
    description: p.intro[0],
    sku: `RM-${p.slug.toUpperCase().replace(/[^A-Z0-9]+/g, '-').slice(0, 18)}`,
    brand: { '@type': 'Brand', name: site.brand },
    manufacturer: { '@id': BRAND_ID },
    category: categoryName,
    image: [
      abs(`/assets/img/caps/${p.slug}-front.svg`),
      abs(`/assets/img/caps/${p.slug}-side.svg`),
      abs(`/assets/img/caps/${p.slug}-top.svg`),
    ],
    material: p.specs.find((s) => s[0] === 'Fabric')?.[1] || 'Cotton twill',
    color: p.colors.map((c) => c.name).join(', '),
    audience: { '@type': 'BusinessAudience', audienceType: 'U.S. brands, distributors and team dealers' },
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'USD',
      lowPrice: low.toFixed(2),
      highPrice: high.toFixed(2),
      offerCount: tiers.length,
      availability: 'https://schema.org/InStock',
      url: abs(`/caps/${p.slug}/`),
      seller: { '@id': BRAND_ID },
      eligibleQuantity: {
        '@type': 'QuantitativeValue',
        minValue: p.moq,
        unitCode: 'C62',
      },
      priceValidUntil: `${new Date().getFullYear() + 1}-12-31`,
    },
    isRelatedTo: p.related.map((slug) => ({
      '@type': 'Product',
      name: slug.replace(/-/g, ' '),
      url: abs(`/caps/${slug}/`),
    })),
  };
}

export function articleSchema(a, url) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': abs(url) + '#article',
    headline: a.h1,
    description: a.description,
    datePublished: '2026-11-01',
    dateModified: a.updated,
    wordCount: a.wordCount || undefined,
    articleSection: a.category,
    inLanguage: 'en-US',
    image: [abs('/assets/img/og-default.png')],
    author: { '@type': 'Organization', name: `${site.brand} Editorial`, url: abs('/pedia/') },
    publisher: { '@id': BRAND_ID },
    isPartOf: { '@id': abs('/pedia/#collection') },
    mainEntityOfPage: { '@type': 'WebPage', '@id': abs(url) },
    about: { '@type': 'Thing', name: a.category },
  };
}

export const collectionSchema = (name, items, url) => ({
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name,
  url: abs(url),
  isPartOf: { '@id': abs('/#website') },
  mainEntity: {
    '@type': 'ItemList',
    numberOfItems: items.length,
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      url: abs(it.url),
    })),
  },
});

export const howToSchema = (name, steps) => ({
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name,
  step: steps.map((s, i) => ({
    '@type': 'HowToStep',
    position: i + 1,
    name: s.title,
    text: s.text,
  })),
});

export const itemListPrice = (p) => Number(tiersFor(p)[0].price).toFixed(2);
export { money };
