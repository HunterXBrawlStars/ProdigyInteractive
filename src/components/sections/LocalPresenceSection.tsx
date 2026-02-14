import { Box, Container, Stack, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { aiAnswerItems, localSignals } from '../../content/siteContent';

export function LocalPresenceSection() {
  return (
    <Box component="section" id="local-presence" sx={{ py: { xs: 4, md: 10 } }}>
      <Container maxWidth="xl">
        <Typography
          component="h2"
          variant="h2"
          className="section-title"
          aria-label="Local Partner, National Reach"
          sx={{
            fontSize: { xs: '2rem', md: '3.2rem' },
            lineHeight: 1.03,
            mb: 2,
            maxWidth: { xs: '19ch', md: '21ch' }
          }}
        >
          Local Partner,
          <Box component="span" sx={{ display: { xs: 'block', sm: 'inline' } }}>
            {' '}
            National Reach
          </Box>
        </Typography>
        <Typography sx={{ color: 'var(--pi-muted)', mb: 4, maxWidth: '70ch' }}>
          Prodigy Interactive helps growth-focused teams across DFW (and beyond) launch websites, apps,
          games, and AI workflows that increase revenue, discoverability, and improve operational efficiency.
        </Typography>

        <Box
          sx={{
            display: 'grid',
            gap: 2,
            gridTemplateColumns: { xs: '1fr', lg: '1.25fr 1fr' }
          }}
        >
          <Box className="glass-panel" sx={{ p: 2.6 }}>
            <Stack spacing={2}>
              {localSignals.map((signal) => (
                <Box key={signal.label}>
                  <Typography variant="h6" sx={{ fontSize: '1rem', mb: 0.75 }}>
                    {signal.label}
                  </Typography>
                  <Typography sx={{ color: 'var(--pi-muted)' }}>{signal.detail}</Typography>
                </Box>
              ))}
            </Stack>
          </Box>

          <Box
            component={motion.div}
            className="glass-panel"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.35 }}
            sx={{ p: 2.6 }}
          >
            <Typography variant="h6" sx={{ mb: 1.5 }}>
              Client Fit Q&A
            </Typography>
            <Stack spacing={1.2}>
              {aiAnswerItems.map((item) => (
                <Box key={item.prompt}>
                  <Typography sx={{ color: 'var(--pi-cyan)', fontWeight: 700, fontSize: '0.95rem' }}>
                    {item.prompt}
                  </Typography>
                  <Typography sx={{ color: 'var(--pi-muted)' }}>{item.response}</Typography>
                </Box>
              ))}
            </Stack>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
