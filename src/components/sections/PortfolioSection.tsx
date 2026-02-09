import { Box, Chip, Container, Link, Stack, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { portfolioItems } from '../../content/siteContent';
import { triggerHaptic } from '../../lib/haptics';

export function PortfolioSection() {
  return (
    <Box component="section" id="portfolio" sx={{ py: { xs: 8, md: 10 } }}>
      <Container maxWidth="xl">
        <Typography className="section-eyebrow">Portfolio</Typography>
        <Typography className="section-title" sx={{ mb: 2 }}>
          Products and client launches.
        </Typography>
        <Typography sx={{ color: 'var(--pi-muted)', mb: 4, maxWidth: '66ch' }}>
          Real projects spanning community products, analytics tools, and client websites.
        </Typography>

        <Box
          sx={{
            display: { xs: 'flex', md: 'grid' },
            gridTemplateColumns: { md: 'repeat(2, minmax(0, 1fr))' },
            overflowX: { xs: 'auto', md: 'visible' },
            scrollSnapType: { xs: 'x mandatory', md: 'none' },
            pb: { xs: 1, md: 0 },
            gap: 2
          }}
        >
          {portfolioItems.map((item, index) => (
            <Box
              key={item.title}
              component={motion.article}
              className="glass-panel"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileTap={{ scale: 0.99 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.38, delay: index * 0.04 }}
              onPointerDown={() => triggerHaptic('light')}
              tabIndex={0}
              sx={{
                p: 2.4,
                minWidth: { xs: '85vw', sm: '72vw', md: 'unset' },
                scrollSnapAlign: { xs: 'start', md: 'unset' }
              }}
            >
              <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={2}>
                <Box>
                  <Link
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    onPointerDown={() => triggerHaptic('medium')}
                    sx={{ fontWeight: 700, fontSize: '1.05rem' }}
                  >
                    {item.title}
                  </Link>
                  <Typography sx={{ color: 'var(--pi-muted)', mt: 1 }}>{item.description}</Typography>
                </Box>
                <Chip
                  label={item.category}
                  size="small"
                  sx={{ textTransform: 'capitalize', border: '1px solid var(--pi-border)' }}
                />
              </Stack>

              <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ mt: 2 }}>
                {item.tags.map((tag) => (
                  <Chip key={`${item.title}-${tag}`} label={tag} size="small" variant="outlined" />
                ))}
              </Stack>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
