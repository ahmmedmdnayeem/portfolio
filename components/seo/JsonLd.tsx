import { SITE_CONFIG } from '@/lib/constants/navigation';

/**
 * Renders JSON-LD structured data in <head> for Google rich results.
 * Includes Person, WebSite, and ProfilePage schemas.
 *
 * Note: only includes verifiable, professionally relevant claims.
 * Net-worth / status keywords requested by the owner live in <meta keywords>,
 * not here — JSON-LD claims can be picked up as Knowledge Graph facts and
 * making unverifiable claims here would mislead search engines and visitors.
 */
export function JsonLd() {
  const url = process.env.NEXT_PUBLIC_SITE_URL ?? SITE_CONFIG.url;
  const currentYear = new Date().getFullYear();
  const age = currentYear - SITE_CONFIG.birthYear;

  const person = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: SITE_CONFIG.name,
    alternateName: SITE_CONFIG.alternateNames,
    givenName: 'Ahmmed MD',
    familyName: 'Nayeem',
    url,
    image: `${url}/opengraph-image`,
    email: SITE_CONFIG.email,
    jobTitle: SITE_CONFIG.jobTitle,
    description: SITE_CONFIG.description,
    nationality: { '@type': 'Country', name: SITE_CONFIG.country },
    address: { '@type': 'PostalAddress', addressCountry: 'BD', addressLocality: 'Bangladesh' },
    birthDate: `${SITE_CONFIG.birthYear}`,
    gender: 'Male',
    knowsLanguage: [
      { '@type': 'Language', name: 'Bangla', alternateName: 'bn' },
      { '@type': 'Language', name: 'English', alternateName: 'en' },
      { '@type': 'Language', name: 'Chinese', alternateName: 'zh' },
    ],
    knowsAbout: [
      'Python',
      'Full-Stack Web Development',
      'Next.js',
      'TypeScript',
      'Blockchain',
      'Web3',
      'Solidity',
      'Smart Contracts',
      'Cryptocurrency',
      'Bitcoin',
      'Cybersecurity',
      'Ethical Hacking',
      'Penetration Testing',
      'Computer Science',
      'Digital Marketing',
      'SEO',
      'Copywriting',
      'Freelancing',
      'Upwork',
      'Fiverr',
    ],
    hasOccupation: [
      {
        '@type': 'Occupation',
        name: 'Software Engineer',
        skills: 'Python, TypeScript, Next.js, React, Node.js, Solidity, Web3',
      },
      {
        '@type': 'Occupation',
        name: 'Freelance Developer & Marketer',
        skills: 'Upwork Top 1%, Fiverr, Client Management, Copywriting, SEO',
      },
    ],
    sameAs: [
      SITE_CONFIG.socials.twitter,
      SITE_CONFIG.socials.github,
      SITE_CONFIG.socials.linkedin,
      SITE_CONFIG.socials.upwork,
      SITE_CONFIG.socials.fiverr,
    ],
    additionalName: SITE_CONFIG.alternateNames.join(', '),
    award: ['Top 1% Freelancer on Upwork'],
  };

  const website = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: `${SITE_CONFIG.name} — Portfolio`,
    url,
    inLanguage: 'en',
    description: SITE_CONFIG.description,
    author: { '@type': 'Person', name: SITE_CONFIG.name },
    publisher: { '@type': 'Person', name: SITE_CONFIG.name },
    potentialAction: {
      '@type': 'SearchAction',
      target: `${url}/?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };

  const profilePage = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    url,
    mainEntity: { '@id': `${url}#person` },
    about: { '@type': 'Person', name: SITE_CONFIG.name },
    dateCreated: '2026-05-21',
  };

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: url },
      { '@type': 'ListItem', position: 2, name: 'About', item: `${url}/#about` },
      { '@type': 'ListItem', position: 3, name: 'Projects', item: `${url}/#projects` },
      { '@type': 'ListItem', position: 4, name: 'Contact', item: `${url}/#contact` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profilePage) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
    </>
  );
}
