import { Alert, Box, Button, Container, Link, Stack, TextField, Typography } from '@mui/material';
import { contactRoutingEmail, pricingPolicyLabel, primaryCtaLabel } from '../../content/siteContent';

export function ContactSection() {
  return (
    <Box component="section" id="contact" sx={{ py: { xs: 8, md: 10 } }}>
      <Container maxWidth="lg">
        <Box className="glass-panel" sx={{ p: { xs: 2.5, md: 4 } }}>
          <Typography className="section-eyebrow">Contact</Typography>
          <Typography className="section-title" sx={{ mb: 1.4 }}>
            Let&apos;s scope your next digital product.
          </Typography>
          <Typography sx={{ color: 'var(--pi-muted)', mb: 3 }}>
            We just launched this site and are finalizing form + CRM automation. {pricingPolicyLabel}. For now, email{' '}
            <Link href={`mailto:${contactRoutingEmail}`} color="inherit" underline="always">
              {contactRoutingEmail}
            </Link>{' '}
            with your goals, timeline, and budget range.
          </Typography>

          <Box component="form" aria-disabled>
            <Stack component="fieldset" spacing={1.5} disabled sx={{ border: 0, p: 0, m: 0 }}>
              <TextField
                label="Name"
                placeholder="Jane Doe"
                disabled
              />
              <TextField
                label="Email"
                type="email"
                placeholder="jane@company.com"
                disabled
              />
              <TextField
                label="Company"
                placeholder="Company Name"
                disabled
              />
              <TextField
                label="Project Scope"
                multiline
                minRows={4}
                placeholder="Tell us what you're building and what outcomes you want."
                disabled
              />
              <Button
                type="button"
                variant="contained"
                size="large"
                disabled
                sx={{ alignSelf: 'flex-start', textTransform: 'none', opacity: 0.75 }}
              >
                {primaryCtaLabel} (Form Integration In Progress)
              </Button>
            </Stack>
          </Box>

          <Alert severity="info" sx={{ mt: 2 }}>
            Client intake form is temporarily disabled while we complete backend integration. Please use the direct
            email above for immediate response.
          </Alert>
        </Box>
      </Container>
    </Box>
  );
}
