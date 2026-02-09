import { Box, Container, Typography } from '@mui/material';
import { processSteps } from '../../content/siteContent';

export function ProcessSection() {
  return (
    <Box component="section" id="process" sx={{ py: { xs: 8, md: 10 } }}>
      <Container maxWidth="xl">
        <Typography className="section-eyebrow">Process</Typography>
        <Typography className="section-title" sx={{ mb: 4 }}>
          Fast loops, clear ownership, measurable outcomes.
        </Typography>

        <Box
          sx={{
            display: 'grid',
            gap: 1.5,
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, minmax(0, 1fr))', lg: 'repeat(4, minmax(0, 1fr))' }
          }}
        >
          {processSteps.map((step, index) => (
            <Box key={step.title} className="glass-panel" sx={{ p: 2.4 }}>
              <Typography sx={{ color: 'var(--pi-cyan)', fontWeight: 700, mb: 1 }}>
                {String(index + 1).padStart(2, '0')}
              </Typography>
              <Typography variant="h6" sx={{ mb: 1 }}>
                {step.title}
              </Typography>
              <Typography sx={{ color: 'var(--pi-muted)' }}>{step.description}</Typography>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
