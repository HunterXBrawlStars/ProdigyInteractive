import { contactRoutingEmail, pricingPolicyLabel } from '../content/siteContent';

export interface ContactPayload {
  name: string;
  email: string;
  company: string;
  projectScope: string;
}

export function contactStubSubmit(payload: ContactPayload): string {
  void payload;
  return `Contact workflow is not connected yet. ${pricingPolicyLabel}. For now, reach us directly at ${contactRoutingEmail}.`;
}
