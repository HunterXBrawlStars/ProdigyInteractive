import { Box, Button, Chip, Container, Stack, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { heroStats, primaryCtaLabel } from '../../content/siteContent';
import { triggerHaptic } from '../../lib/haptics';

export function HeroSection() {
  return (
    <Box component="section" id="home" sx={{ pt: { xs: 14, md: 17 }, pb: { xs: 8, md: 10 } }}>
      <Container maxWidth="xl">
        <Stack direction={{ xs: 'column', lg: 'row' }} spacing={6} alignItems={{ lg: 'center' }}>
          <Box
            component={motion.div}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            sx={{ flex: 1 }}
          >
            <Chip
              label="Dallas / Fort Worth + Remote"
              sx={{
                mb: 2,
                border: '1px solid var(--pi-border)',
                backgroundColor: 'rgba(37, 56, 112, 0.35)'
              }}
            />
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: '2.2rem', md: '3.8rem' },
                lineHeight: 1.03,
                mb: 2,
                maxWidth: '16ch'
              }}
            >
              Ultra-modern products for ambitious businesses.
            </Typography>
            <Typography sx={{ color: 'var(--pi-muted)', maxWidth: '60ch', mb: 3, fontSize: '1.05rem' }}>
              Prodigy Interactive designs and ships high-impact websites, mobile apps, and games with the speed
              of an elite product team.
            </Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
              <Button
                variant="contained"
                color="primary"
                component="a"
                href="#contact"
                onPointerDown={() => triggerHaptic('medium')}
                sx={{
                  py: 1.2,
                  px: 2.4,
                  fontWeight: 700,
                  boxShadow: 'var(--pi-glow)',
                  textTransform: 'none'
                }}
              >
                {primaryCtaLabel}
              </Button>
              <Button
                variant="outlined"
                component="a"
                href="#portfolio"
                onPointerDown={() => triggerHaptic('light')}
                sx={{ py: 1.2, px: 2.4, textTransform: 'none' }}
              >
                Explore Portfolio
              </Button>
            </Stack>
          </Box>

          <Box
            component={motion.div}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            sx={{ flex: 1 }}
          >
            <Box className="glass-panel" sx={{ p: { xs: 3, md: 4 }, position: 'relative', overflow: 'hidden' }}>
              <Box
                sx={{
                  position: 'absolute',
                  width: 220,
                  height: 220,
                  right: -70,
                  top: -90,
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(28,224,255,0.32) 0%, rgba(28,224,255,0) 72%)'
                }}
              />
              <Stack spacing={1.5}>
                <Typography variant="overline" sx={{ color: 'var(--pi-cyan)', fontWeight: 700 }}>
                  Prodigy Interactive
                </Typography>
                <img
                  src="/assets/ProdigyInteractiveLogo.png"
                  alt="Prodigy Interactive logo"
                  style={{ width: '100%', maxWidth: 420, marginTop: 8 }}
                />
                <Stack spacing={1.2} sx={{ mt: 1 }}>
                  {heroStats.map((stat) => (
                    <Box
                      key={stat.label}
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        gap: 2,
                        borderBottom: '1px solid rgba(144, 177, 255, 0.24)',
                        py: 1
                      }}
                    >
                      <Typography color="var(--pi-muted)" sx={{ fontSize: '.9rem' }}>
                        {stat.label}
                      </Typography>
                      <Typography sx={{ fontWeight: 700 }}>{stat.value}</Typography>
                    </Box>
                  ))}
                </Stack>
              </Stack>
            </Box>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
