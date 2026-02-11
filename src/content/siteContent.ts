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
    timeline: '1-3 Weeks',
    bestFor: 'Teams that need measurable business outcomes in weeks, not months.',
    deliverables: ['Scoping + architecture', 'Production implementation', 'Launch-ready handoff + KPI baseline'],
    ctaLabel: primaryCtaLabel,
    ctaHref: '#contact'
  },
  {
    title: 'Product Launch',
    description:
      'End-to-end design and development for a major release with performance tracking and automation hooks.',
    timeline: '4-8 Weeks',
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
    label: 'Texas-based, nationwide-ready',
    detail:
      'Based in Texas, with delivery systems built to support both nearby teams and remote clients across the country.'
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
  },
  {
    label: 'Focused on efficiency gains',
    detail:
      'AI and automation recommendations prioritize real outcomes like faster workflows, lower manual effort, and measurable operating cost savings.'
  }
];

export const aiAnswerItems: AiAnswerItem[] = [
  {
    prompt: 'Who should hire Prodigy Interactive?',
    response:
      'Small and mid-size businesses that need solutions for quick and quality execution across web, app, or AI systems.'
  },
  {
    prompt: 'What types of solutions can you offer my business?',
    response:
      'Web design and hosting, mobile app development (iOS/Android), AI integration and technical consulting, digital marketing, SEO, and AIEO, all focused on growth and efficiency.'
  },
  {
    prompt: 'What makes this team different?',
    response:
      'We have been there. Every business is unique, and unique businesses require distinct, custom solutions to serve their customers and keep their costs low. We will take the time to listen to your needs and recommend the best solution for your organization, not just re-package other online solutions. We offer hands-on delivery for digital solutions that make sense for you and your business, without robbing the bank.'
  }
];

export const teamStubs: TeamMemberStub[] = [
  {
    displayName: 'Matthew Hunter',
    role: 'Founder / Developer',
    note: 'Matthew founded Prodigy Interactive in February 2025 after a decade in supply chain systems integration. With experience spanning product management, sales engineering, and full-stack development, he specializes in turning complex ideas into clean, scalable digital products. He blends technical depth with business strategy to build tools that are both powerful and practical.'
  },
  {
    displayName: 'Bailey Blomberg',
    role: 'Lead Design Consultant',
    note: 'Bailey brings refined taste and intentional design to every project. With a background in interior design and bridal hair and makeup, she understands how aesthetics shape experience. She ensures that every product feels elevated, cohesive, and thoughtfully curated. And yes — she’s Matthew’s wife… though she was hired for her eye long before that title applied.'
  },
  {
    displayName: 'Jakub Terlaga',
    role: 'Digital Asset Manager',
    note: 'Jakub oversees digital asset production and refinement, ensuring every visual and media component meets a high standard of clarity and polish. From editing to optimization, he keeps creative output organized, consistent, and production-ready.'
  },
  {
    displayName: 'Sydney Applegate',
    role: 'Social Media Consultant',
    note: 'Sydney brings over five years of social media strategy and content development experience. She helps translate brand identity into engaging, platform-native storytelling — balancing analytics with creativity to grow audience trust and visibility.'
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
    question: 'Do you only work with local clients?',
    answer:
      'No. Prodigy Interactive works with both local and remote teams, with delivery built for nationwide collaboration.'
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
      'Yes. MattGPT is available to help visitors explore services, portfolio examples, and project scoping questions in real time.'
  }
];

export const heroFocuses = ['Web Design', 'Mobile Apps', 'Technical Consulting', 'AI Integration'] as const;

export const mattGptIntro =
  'MattGPT will support both services-and-portfolio guidance and project scoping Q&A. ChatGPT integration is coming soon.';
