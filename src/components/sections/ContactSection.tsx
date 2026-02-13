import { Alert, Box, Button, Container, Link, Stack, TextField, Typography } from '@mui/material';
import { useMemo, useState, type FormEvent } from 'react';
import { contactRoutingEmail, pricingPolicyLabel } from '../../content/siteContent';
import { triggerHaptic } from '../../lib/haptics';
import { submitContact } from '../../lib/contactApi';

export function ContactSection() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [projectScope, setProjectScope] = useState('');
  const [website, setWebsite] = useState(''); // honeypot
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const canSubmit = useMemo(() => {
    return (
      Boolean(name.trim()) &&
      Boolean(email.trim()) &&
      Boolean(projectScope.trim()) &&
      !isSubmitting
    );
  }, [name, email, projectScope, isSubmitting]);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!canSubmit) {
      return;
    }

    setIsSubmitting(true);
    setStatus('idle');
    setErrorMessage('');
    triggerHaptic('medium');

    try {
      await submitContact({
        name: name.trim(),
        email: email.trim(),
        company: company.trim(),
        projectScope: projectScope.trim(),
        website: website.trim()
      });

      setStatus('success');
      triggerHaptic('success');
      setName('');
      setEmail('');
      setCompany('');
      setProjectScope('');
      setWebsite('');
    } catch (error) {
      const message = error instanceof Error && error.message ? error.message : 'Unable to send your message right now.';
      setStatus('error');
      setErrorMessage(message);
      triggerHaptic('light');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box component="section" id="contact" sx={{ py: { xs: 4, md: 10 } }}>
      <Container maxWidth="lg">
        <Box className="glass-panel" sx={{ p: { xs: 2.5, md: 4 } }}>
          <Typography className="section-eyebrow">Contact</Typography>
          <Typography className="section-title" sx={{ mb: 1.4 }}>
            Let&apos;s scope your next digital product.
          </Typography>
          <Typography sx={{ color: 'var(--pi-muted)', mb: 3 }}>
            {pricingPolicyLabel}. Use the form below or work with MattGPT to create a plan and it will send the details to our team.
          </Typography>

          <Box component="form" onSubmit={onSubmit}>
            <Stack component="fieldset" spacing={1.5} disabled={isSubmitting} sx={{ border: 0, p: 0, m: 0 }}>
              <TextField
                label="Name"
                placeholder="Jane Doe"
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
              />
              <TextField
                label="Email"
                type="email"
                placeholder="jane@company.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
              <TextField
                label="Company"
                placeholder="Company Name"
                value={company}
                onChange={(event) => setCompany(event.target.value)}
              />
              <TextField
                label="Project Scope"
                multiline
                minRows={4}
                placeholder="Tell us what you're building and what outcomes you want."
                value={projectScope}
                onChange={(event) => setProjectScope(event.target.value)}
                required
              />
              <Box sx={{ position: 'absolute', left: '-10000px', top: 'auto', width: 1, height: 1, overflow: 'hidden' }}>
                <label htmlFor="pi-website">Website</label>
                <input
                  id="pi-website"
                  name="website"
                  type="text"
                  value={website}
                  onChange={(event) => setWebsite(event.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </Box>
              <Button
                type="submit"
                variant="contained"
                size="large"
                disabled={!canSubmit}
                sx={{ alignSelf: 'flex-start', textTransform: 'none' }}
              >
                {isSubmitting ? 'Sending…' : 'Send'}
              </Button>
            </Stack>
          </Box>

          {status === 'success' ? (
            <Alert severity="success" sx={{ mt: 2 }}>
              Thanks, we got your message. We&apos;ll reply soon with next steps.
            </Alert>
          ) : null}

          {status === 'error' ? (
            <Alert severity="warning" sx={{ mt: 2 }}>
              {errorMessage} If you prefer, email{' '}
              <Link href={`mailto:${contactRoutingEmail}`} color="inherit" underline="always">
                {contactRoutingEmail}
              </Link>
              .
            </Alert>
          ) : null}
        </Box>
      </Container>
    </Box>
  );
}
