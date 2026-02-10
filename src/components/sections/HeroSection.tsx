import { Box, Button, Chip, Container, Stack, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { heroFocuses, primaryCtaLabel } from '../../content/siteContent';
import { triggerHaptic } from '../../lib/haptics';

export function HeroSection() {
  return (
    <Box component="section" id="home" sx={{ pt: { xs: 14, md: 17 }, pb: { xs: 8, md: 10 } }}>
      <Container maxWidth="xl">
        <Stack direction={{ xs: 'column', lg: 'row' }} spacing={6} alignItems={{ lg: 'center' }}>
          <Box
            component={motion.div}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            sx={{
              flex: 1,
              minHeight: { xs: 280, md: 420 },
              borderRadius: { xs: 4, md: 5 },
              position: 'relative',
              overflow: 'hidden',
              background:
                'radial-gradient(circle at 58% 44%, rgba(21, 215, 255, 0.15), rgba(21, 215, 255, 0) 48%), radial-gradient(circle at 35% 35%, rgba(141, 93, 255, 0.16), rgba(141, 93, 255, 0) 52%)'
            }}
          >
            <Box
              data-testid="hero-logo-blend"
              sx={{
                position: 'absolute',
                inset: 0,
                backgroundImage: 'url(/assets/ProdigyInteractiveLogo.png)',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundSize: { xs: '110% auto', sm: '90% auto', lg: '78% auto' },
                opacity: 0.88,
                filter: 'saturate(1.16) drop-shadow(0 0 55px rgba(18, 208, 255, 0.36))',
                mixBlendMode: 'screen',
                maskImage:
                  'radial-gradient(ellipse at 50% 54%, rgba(0,0,0,0.96) 0%, rgba(0,0,0,0.88) 32%, rgba(0,0,0,0.48) 62%, rgba(0,0,0,0.08) 84%, rgba(0,0,0,0) 100%)',
                WebkitMaskImage:
                  'radial-gradient(ellipse at 50% 54%, rgba(0,0,0,0.96) 0%, rgba(0,0,0,0.88) 32%, rgba(0,0,0,0.48) 62%, rgba(0,0,0,0.08) 84%, rgba(0,0,0,0) 100%)'
              }}
            />

            <Stack
              direction="row"
              spacing={1}
              flexWrap="wrap"
              useFlexGap
              sx={{
                position: 'absolute',
                left: { xs: 16, md: 22 },
                right: { xs: 16, md: 22 },
                bottom: { xs: 14, md: 18 }
              }}
            >
              {heroFocuses.map((focus) => (
                <Chip
                  key={focus}
                  label={focus}
                  size="small"
                  sx={{
                    border: '1px solid rgba(126, 180, 255, 0.42)',
                    backgroundColor: 'rgba(7, 13, 31, 0.62)',
                    backdropFilter: 'blur(8px)'
                  }}
                />
              ))}
            </Stack>
          </Box>

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
        </Stack>
      </Container>
    </Box>
  );
}
