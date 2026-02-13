import { Box, Container, Stack, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { services } from '../../content/siteContent';
import { triggerHaptic } from '../../lib/haptics';

export function ServicesSection() {
  return (
    <Box component="section" id="services" sx={{ pt: { xs: 0, md: 10 }, pb: { xs: 4, md: 10 } }}>
      <Container maxWidth="xl">
        <Typography className="section-eyebrow">Services</Typography>
        <Typography className="section-title"
          sx={{
            fontSize: { xs: '2rem', md: '3.2rem' },
            lineHeight: 1.03,
            mb: 2,
            maxWidth: { xs: '19ch', md: '40ch' }
          }}
        >
          End-to-end digital execution.
        </Typography>

        <Box
          sx={{
            display: { xs: 'flex', md: 'grid' },
            gridTemplateColumns: { md: 'repeat(2, minmax(0, 1fr))', xl: 'repeat(3, minmax(0, 1fr))' },
            overflowX: { xs: 'auto', md: 'visible' },
            overflowY: { xs: 'hidden', md: 'visible' },
            scrollSnapType: { xs: 'x mandatory', md: 'none' },
            pb: { xs: 0.5, md: 0 },
            gap: 2
          }}
        >
          {services.map((service, index) => (
            <Box
              key={service.title}
              component={motion.article}
              className="glass-panel"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileTap={{ scale: 0.985 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.42, delay: index * 0.04 }}
              onPointerDown={() => triggerHaptic('light')}
              tabIndex={0}
              sx={{
                p: { xs: 2.1, md: 2.6 },
                minWidth: { xs: '84vw', sm: '70vw', md: 'unset' },
                scrollSnapAlign: { xs: 'start', md: 'unset' }
              }}
            >
              <Typography variant="h6" sx={{ mb: 1.2 }}>
                {service.title}
              </Typography>
              <Typography sx={{ color: 'var(--pi-muted)', mb: 2 }}>{service.description}</Typography>
              <Stack spacing={1}>
                {service.outcomes.map((item) => (
                  <Typography key={item} variant="body2" sx={{ color: 'var(--pi-text)' }}>
                    • {item}
                  </Typography>
                ))}
              </Stack>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
