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

export const primaryCtaLabel = 'Book a Strategy Call';
export const pricingPolicyLabel = 'Custom quote only';
export const contactRoutingEmail = 'mhunter@prodigyinteractive.com';

export const services: ServiceItem[] = [
  {
    title: 'Web Design & Hosting',
    description:
      'Turn your website into a 24/7 sales channel with fast UX, clear conversion paths, and AI-ready customer journeys.',
    outcomes: ['Higher lead-to-call conversion', 'Managed hosting with fewer outages', 'Search + AI visibility foundation']
  },
  {
    title: 'Mobile App Development',
    description:
      'Ship iOS and Android apps that increase retention, automate customer touchpoints, and open new revenue opportunities.',
    outcomes: ['Faster release cycles', 'App store launch support', 'Analytics + AI-ready app architecture']
  },
  {
    title: 'Game Design & Development',
    description:
      'Build interactive products that increase engagement, session time, and monetization potential.',
    outcomes: ['Gameplay systems tied to retention goals', 'Live-ops architecture for faster updates', 'Player-centric balancing']
  },
  {
    title: 'AI Integration & Technical Consulting',
    description:
      'Implement practical AI across sales, support, and operations to reduce manual work, speed delivery, and lower recurring costs.',
    outcomes: ['Workflow automation roadmap', 'AI tooling + implementation plan', 'Measured time and cost savings']
  },
  {
    title: 'Digital Marketing',
    description:
      'Deploy conversion-focused campaigns that lower acquisition cost and turn traffic into qualified opportunities.',
    outcomes: ['Conversion funnel optimization', 'Paid + organic growth strategy', 'Attribution that reveals spend efficiency']
  },
  {
    title: 'SEO & AIEO',
    description:
      'Capture demand in traditional search and AI assistants so more qualified buyers discover and trust your brand.',
    outcomes: ['Higher-intent organic traffic', 'AI answer and citation readiness', 'Structured metadata + content authority']
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
      'Align on revenue targets, process bottlenecks, and the biggest cost-saving opportunities.'
  },
  {
    title: 'Design',
    description: 'Prototype high-converting interfaces and automation touchpoints before implementation.'
  },
  {
    title: 'Build',
    description: 'Ship production-ready web, mobile, game, and AI workflows with clean handoff.'
  },
  {
    title: 'Scale',
    description: 'Improve conversion, retention, and operational efficiency with analytics, SEO, and AIEO.'
  }
];

export const engagementModels: EngagementModel[] = [
  {
    title: 'Sprint Build',
    description:
      'A focused sprint to launch a revenue-driving website, app module, or AI-powered workflow fast.',
    timeline: '2-4 Weeks',
    bestFor: 'Teams that need measurable business outcomes in weeks, not months.',
    deliverables: ['Scoping + architecture', 'Production implementation', 'Launch-ready handoff + KPI baseline'],
    ctaLabel: primaryCtaLabel,
    ctaHref: '#contact'
  },
  {
    title: 'Product Launch',
    description:
      'End-to-end design and development for a major release with performance tracking and automation hooks.',
    timeline: '6-10 Weeks',
    bestFor: 'Businesses shipping a new product or rebuilding their digital foundation.',
    deliverables: ['Brand-aligned UI system', 'Web/mobile/game build', 'Analytics + SEO/AIEO + automation setup'],
    ctaLabel: primaryCtaLabel,
    ctaHref: '#contact'
  },
  {
    title: 'Growth Partner',
    description:
      'Ongoing collaboration to increase revenue while reducing operational drag through continuous optimization.',
    timeline: 'Monthly',
    bestFor: 'Teams that want a consistent product and growth execution partner.',
    deliverables: ['Prioritized backlog execution', 'Conversion + retention experiments', 'AI and automation iteration loops'],
    ctaLabel: primaryCtaLabel,
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
      'Web design and hosting, mobile app development (iOS/Android), game development, AI integration and technical consulting, digital marketing, SEO, and AIEO, all focused on growth and efficiency.'
  },
  {
    prompt: 'What makes this team different?',
    response:
      'Hands-on delivery that pairs modern product quality with AI-driven process improvements to increase speed and reduce costs.'
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
    question: 'Do you publish fixed pricing on the site?',
    answer:
      'No. Engagements are custom quote only, based on your goals, scope, and delivery timeline.'
  },
  {
    question: 'Is MattGPT live yet?',
    answer:
      'Not yet. The current site includes a stubbed MattGPT interface that will connect to ChatGPT later.'
  }
];

export const heroFocuses = ['Web Design', 'Mobile Apps', 'Game Development', 'AI Integration'] as const;

export const mattGptIntro =
  'MattGPT will support both services-and-portfolio guidance and project scoping Q&A. ChatGPT integration is coming soon.';
