export type PortfolioCategory = 'products' | 'clients' | 'experiments';

export interface ServiceItem {
  title: string;
  description: string;
  outcomes: string[];
}

export interface PortfolioItem {
  title: string;
  description: string;
  href: string;
  category: PortfolioCategory;
  tags: string[];
}

export interface ProcessStep {
  title: string;
  description: string;
}

export interface TeamMemberStub {
  displayName: string;
  role: string;
  note: string;
}

export interface TestimonialStub {
  quote: string;
  byline: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}
