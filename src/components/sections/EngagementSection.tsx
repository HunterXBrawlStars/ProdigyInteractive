import { Box, Button, Container, Stack, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { engagementModels, pricingPolicyLabel } from '../../content/siteContent';
import { triggerHaptic } from '../../lib/haptics';

export function EngagementSection() {
  return (
    <Box component="section" id="engagement" sx={{ py: { xs: 4, md: 10 } }}>
      <Container maxWidth="xl">
        <Typography className="section-title"
          variant="h1"
          sx={{
            fontSize: { xs: '1.6rem', md: '3.2rem' },
            lineHeight: 1.03,
            mb: 2,
            maxWidth: { xs: '19ch', md: '21ch' }
          }}
        >
          Engagement Models
        </Typography>
        <Typography sx={{ color: 'var(--pi-muted)', mb: 1, maxWidth: '66ch' }}>
          Choose the collaboration model that best fits your scope, timeline, and growth goals.
        </Typography>
        <Typography sx={{ color: 'var(--pi-cyan)', mb: 3, fontWeight: 700 }}>
          Pricing: {pricingPolicyLabel}.
        </Typography>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(3, minmax(0, 1fr))' },
            gap: 2
          }}
        >
          {engagementModels.map((model, index) => (
            <Box
              key={model.title}
              component={motion.article}
              className="glass-panel"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileTap={{ scale: 0.99 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.38, delay: index * 0.04 }}
              sx={{ p: 2.5 }}
            >
              <Stack direction="row" justifyContent="space-between" spacing={1.5} alignItems="baseline" sx={{ mb: 1 }}>
                <Typography variant="h6">{model.title}</Typography>
                <Typography sx={{ color: 'var(--pi-cyan)', fontWeight: 700, fontSize: '0.9rem' }}>
                  {model.timeline}
                </Typography>
              </Stack>

              <Typography sx={{ color: 'var(--pi-muted)', mb: 1.5 }}>{model.description}</Typography>
              <Typography variant="body2" sx={{ color: 'var(--pi-text)', mb: 1.5 }}>
                <Box component="span" sx={{ color: 'var(--pi-cyan)', fontWeight: 700 }}>
                  Best for:
                </Box>{' '}
                {model.bestFor}
              </Typography>

              <Stack spacing={1} sx={{ mb: 2.5 }}>
                {model.deliverables.map((deliverable) => (
                  <Typography key={`${model.title}-${deliverable}`} variant="body2" sx={{ color: 'var(--pi-text)' }}>
                    • {deliverable}
                  </Typography>
                ))}
              </Stack>

              <Button
                variant="outlined"
                size="small"
                component="a"
                href={model.ctaHref}
                onPointerDown={() => triggerHaptic('light')}
                sx={{ textTransform: 'none', fontWeight: 600 }}
              >
                {model.ctaLabel}
              </Button>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
