import { useMemo, useState } from 'react';
import { Box, Button, Chip, Container, Link, Stack, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { portfolioItems } from '../../content/siteContent';
import { triggerHaptic } from '../../lib/haptics';
import { type PortfolioCategory } from '../../types/content';

type PortfolioFilter = 'all' | PortfolioCategory;

const portfolioFilters: Array<{ id: PortfolioFilter; label: string }> = [
  { id: 'all', label: 'All Work' },
  { id: 'products', label: 'Products' },
  { id: 'clients', label: 'Client Work' },
  { id: 'experiments', label: 'Experiments' }
];

export function PortfolioSection() {
  const [activeFilter, setActiveFilter] = useState<PortfolioFilter>('all');

  const visibleItems = useMemo(
    () => (activeFilter === 'all' ? portfolioItems : portfolioItems.filter((item) => item.category === activeFilter)),
    [activeFilter]
  );

  return (
    <Box component="section" id="portfolio" sx={{ py: { xs: 4, md: 10 } }}>
      <Container maxWidth="xl">
        <Typography className="section-title"
          sx={{
            fontSize: { xs: '2rem', md: '3.2rem' },
            lineHeight: 1.03,
            mb: 2,
            maxWidth: { xs: '19ch', md: '21ch' }
          }}>
          Products and client launches.
        </Typography>
        <Typography sx={{ color: 'var(--pi-muted)', mb: 4, maxWidth: '66ch' }}>
          Real projects spanning community products, analytics tools, and client websites.
        </Typography>

        <Box
          sx={{
            mb: 3,
            display: { xs: 'grid', sm: 'flex' },
            gridTemplateColumns: { xs: 'repeat(2, minmax(0, 1fr))', sm: 'none' },
            gap: 1,
            flexWrap: { sm: 'wrap' }
          }}
        >
          {portfolioFilters.map((filter) => (
            <Button
              key={filter.id}
              size="small"
              variant={activeFilter === filter.id ? 'contained' : 'outlined'}
              color="primary"
              onPointerDown={() => triggerHaptic('light')}
              onClick={() => setActiveFilter(filter.id)}
              sx={{
                textTransform: 'none',
                borderRadius: 999,
                width: { xs: '100%', sm: 'auto' },
                px: { xs: 1, sm: 1.8 },
                py: { xs: 0.55, sm: 0.625 },
                minHeight: { xs: 34, sm: 36 },
                fontSize: { xs: '0.78rem', sm: '0.8125rem' }
              }}
            >
              {filter.label}
            </Button>
          ))}
        </Box>

        <Box
          sx={{
            display: { xs: 'flex', md: 'grid' },
            gridTemplateColumns: { md: 'repeat(2, minmax(0, 1fr))' },
            overflowX: { xs: 'auto', md: 'visible' },
            overflowY: { xs: 'hidden', md: 'visible' },
            scrollSnapType: { xs: 'x mandatory', md: 'none' },
            pb: { xs: 0.5, md: 0 },
            gap: 2
          }}
        >
          {visibleItems.map((item, index) => (
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
                p: { xs: 2.1, md: 2.4 },
                minWidth: { xs: '85vw', sm: '72vw', md: 'unset' },
                scrollSnapAlign: { xs: 'start', md: 'unset' }
              }}
            >
              <Stack spacing={1.1}>
                <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={1.5}>
                  <Link
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    onPointerDown={() => triggerHaptic('medium')}
                    sx={{ fontWeight: 700, fontSize: '1.05rem', flex: 1, minWidth: 0 }}
                  >
                    {item.title}
                  </Link>
                  <Chip
                    label={item.category}
                    size="small"
                    sx={{ textTransform: 'capitalize', border: '1px solid var(--pi-border)', flexShrink: 0 }}
                  />
                </Stack>
                <Typography sx={{ color: 'var(--pi-muted)' }}>{item.description}</Typography>
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
