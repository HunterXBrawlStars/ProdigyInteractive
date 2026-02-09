import {
  type FaqItem,
  type PortfolioItem,
  type ProcessStep,
  type ServiceItem,
  type TeamMemberStub,
  type TestimonialStub
} from '../types/content';

export const navLinks = [
  { label: 'Services', href: '#services' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Process', href: '#process' },
  { label: 'Team', href: '#team' },
  { label: 'Contact', href: '#contact' }
] as const;

export const services: ServiceItem[] = [
  {
    title: 'Web Design & Hosting',
    description:
      'Premium websites engineered for speed, conversion, and easy handoff to your team.',
    outcomes: ['High-converting UX', 'Managed hosting', 'Performance-first SEO baseline']
  },
  {
    title: 'Mobile App Development',
    description:
      'Cross-platform iOS and Android products with polished UX and practical release pipelines.',
    outcomes: ['iOS + Android delivery', 'App store launch support', 'Analytics-ready builds']
  },
  {
    title: 'Game Design & Development',
    description:
      'Interactive game concepts, prototypes, and production builds tailored to your audience.',
    outcomes: ['Gameplay systems', 'Live-ops friendly architecture', 'Player-centric balancing']
  },
  {
    title: 'Technical Consulting',
    description:
      'Architecture and product strategy support for teams that need focused execution clarity.',
    outcomes: ['Roadmap clarity', 'Stack recommendations', 'Delivery risk reduction']
  },
  {
    title: 'Digital Marketing',
    description:
      'Campaign landing experiences and funnel strategy aligned to measurable business outcomes.',
    outcomes: ['Conversion funnels', 'Paid + organic strategy', 'Attribution-aware content']
  },
  {
    title: 'SEO & AIEO',
    description:
      'Search Engine + AI Engine Optimization for visibility in both classic search and AI discovery.',
    outcomes: ['Search rankings', 'AI citation readiness', 'Structured metadata strategy']
  }
];

export const portfolioItems: PortfolioItem[] = [
  {
    title: 'Brawl Connections',
    description: 'Daily category puzzle game for Brawl Stars players.',
    href: 'https://powerleagueprodigy.com/brawlconnections',
    category: 'products',
    tags: ['Game', 'Community', 'Engagement']
  },
  {
    title: 'Brawl Stars-dle',
    description: 'Guess-the-brawler mini game with progressive clue mechanics.',
    href: 'https://powerleagueprodigy.com/brawlstars-dle',
    category: 'products',
    tags: ['Game', 'Retention', 'Browser']
  },
  {
    title: 'Power League Prodigy Draft Simulator',
    description: 'AI-backed ranked draft tooling for competitive decision support.',
    href: 'https://powerleagueprodigy.com/plprodigy',
    category: 'products',
    tags: ['AI/ML', 'Analytics', 'Simulation']
  },
  {
    title: 'PL Prodigy Platform',
    description: 'Flagship analytics and guide ecosystem for Brawl Stars players.',
    href: 'https://powerleagueprodigy.com/',
    category: 'products',
    tags: ['Platform', 'Analytics', 'Content']
  },
  {
    title: 'November Roses',
    description: 'Client website design and deployment.',
    href: 'https://novemberroses.com/',
    category: 'clients',
    tags: ['Client', 'Web Design']
  },
  {
    title: 'The Podcast Trailer',
    description: 'Client site for podcast trailer production and services.',
    href: 'https://thepodcasttrailer.com/',
    category: 'clients',
    tags: ['Client', 'Brand Site']
  },
  {
    title: 'More PLProdigy Tools (Stub)',
    description:
      'Additional tools and game links will be expanded here as the portfolio is finalized.',
    href: 'https://powerleagueprodigy.com/',
    category: 'experiments',
    tags: ['Stub', 'Future Additions']
  }
];

export const processSteps: ProcessStep[] = [
  {
    title: 'Discover',
    description:
      'Align on business goals, ideal customer profile, and measurable launch outcomes.'
  },
  {
    title: 'Design',
    description: 'Prototype modern interfaces and interaction systems before implementation.'
  },
  {
    title: 'Build',
    description: 'Develop production-ready web, mobile, or game experiences with clean handoff.'
  },
  {
    title: 'Scale',
    description: 'Iterate with analytics, SEO/AIEO improvements, and growth-focused updates.'
  }
];

export const teamStubs: TeamMemberStub[] = [
  {
    displayName: 'Team Member Name (Stub)',
    role: 'Role / Specialty',
    note: 'Profile details pending.'
  },
  {
    displayName: 'Team Member Name (Stub)',
    role: 'Role / Specialty',
    note: 'Profile details pending.'
  },
  {
    displayName: 'Team Member Name (Stub)',
    role: 'Role / Specialty',
    note: 'Profile details pending.'
  }
];

export const testimonialStubs: TestimonialStub[] = [
  {
    quote: 'Case study metrics coming soon.',
    byline: 'Client proof module (stub)'
  },
  {
    quote: 'Additional testimonial content coming soon.',
    byline: 'Review module (stub)'
  }
];

export const faqItems: FaqItem[] = [
  {
    question: 'Do you only work with Dallas / Fort Worth clients?',
    answer:
      'DFW is a focus region, but Prodigy Interactive supports remote projects from anywhere.'
  },
  {
    question: 'Can you handle both design and development?',
    answer:
      'Yes. Projects can include strategy, UX/UI, implementation, launch support, and iteration.'
  },
  {
    question: 'Is MattGPT live yet?',
    answer:
      'Not yet. The current site includes a stubbed MattGPT interface that will connect to ChatGPT later.'
  }
];

export const heroStats = [
  { label: 'Flagship Product', value: 'PLProdigy' },
  { label: 'Core Focus', value: 'Web • Mobile • Games' },
  { label: 'Service Area', value: 'Dallas/Fort Worth + Remote' }
] as const;

export const mattGptIntro =
  'MattGPT is currently in stub mode. ChatGPT integration coming soon.';
