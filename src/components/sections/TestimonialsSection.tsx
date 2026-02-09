import { Box, Container, Stack, Typography } from '@mui/material';
import { testimonialStubs } from '../../content/siteContent';

export function TestimonialsSection() {
  return (
    <Box component="section" sx={{ py: { xs: 8, md: 10 } }}>
      <Container maxWidth="xl">
        <Typography className="section-eyebrow">Proof</Typography>
        <Typography className="section-title" sx={{ mb: 3 }}>
          Case study metrics coming soon.
        </Typography>

        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
          {testimonialStubs.map((item, index) => (
            <Box key={`${item.byline}-${index}`} className="glass-panel" sx={{ p: 2.4, flex: 1 }}>
              <Typography variant="h6" sx={{ mb: 1.1 }}>
                “{item.quote}”
              </Typography>
              <Typography sx={{ color: 'var(--pi-muted)' }}>{item.byline}</Typography>
            </Box>
          ))}
        </Stack>
      </Container>
    </Box>
  );
}
