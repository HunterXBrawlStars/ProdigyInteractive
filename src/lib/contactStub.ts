export interface ContactPayload {
  name: string;
  email: string;
  company: string;
  projectScope: string;
}

export function contactStubSubmit(payload: ContactPayload): string {
  void payload;
  return 'Contact workflow is not connected yet. We will wire this to your CRM/email backend next.';
}
