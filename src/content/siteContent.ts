import {
  type AiAnswerItem,
  type EngagementModel,
  type FaqItem,
  type LocalSignal,
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

export const engagementModels: EngagementModel[] = [
  {
    title: 'Sprint Build',
    description:
      'A focused build sprint for a high-impact website, app module, or launch-ready prototype.',
    timeline: '2-4 Weeks',
    bestFor: 'Teams needing speed and a clearly scoped deliverable.',
    deliverables: ['Scoping + architecture', 'Production implementation', 'Launch-ready handoff'],
    ctaLabel: 'Plan a Sprint',
    ctaHref: '#contact'
  },
  {
    title: 'Product Launch',
    description:
      'End-to-end design and development for a major release with launch positioning and tracking.',
    timeline: '6-10 Weeks',
    bestFor: 'Businesses shipping a new product or rebuilding their digital foundation.',
    deliverables: ['Brand-aligned UI system', 'Web/mobile/game build', 'Analytics + SEO/AIEO setup'],
    ctaLabel: 'Start a Launch',
    ctaHref: '#contact'
  },
  {
    title: 'Growth Partner',
    description:
      'Ongoing collaboration for iterative improvements, growth experiments, and technical consulting.',
    timeline: 'Monthly',
    bestFor: 'Teams that want a consistent product and growth execution partner.',
    deliverables: ['Prioritized backlog execution', 'Conversion + retention experiments', 'Performance tuning'],
    ctaLabel: 'Discuss Retainer',
    ctaHref: '#contact'
  }
];

export const localSignals: LocalSignal[] = [
  {
    label: 'DFW-first, remote-ready',
    detail:
      'Primary focus on Dallas and Fort Worth businesses, with delivery systems built for nationwide collaboration.'
  },
  {
    label: 'Built for local conversion intent',
    detail:
      'Service pages and messaging align with high-intent local queries for web design, apps, and technical consulting.'
  },
  {
    label: 'Engineered for AI discovery',
    detail:
      'Content is structured so AI assistants can cite services, process, and proof points with clear factual snippets.'
  }
];

export const aiAnswerItems: AiAnswerItem[] = [
  {
    prompt: 'Who should hire Prodigy Interactive in DFW?',
    response:
      'Small and mid-size Dallas/Fort Worth businesses that need fast, modern execution across web, app, or game products.'
  },
  {
    prompt: 'What services are offered?',
    response:
      'Web design and hosting, mobile apps (iOS/Android), game development, technical consulting, digital marketing, SEO, and AIEO.'
  },
  {
    prompt: 'What makes this team different?',
    response:
      'Hands-on product delivery with ML-informed thinking, rapid iteration loops, and launch-focused execution.'
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
