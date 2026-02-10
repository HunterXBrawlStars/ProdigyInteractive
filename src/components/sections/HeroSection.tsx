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
              position: 'relative',
              display: 'grid',
              justifyItems: 'center'
            }}
          >
            <Box
              aria-hidden="true"
              sx={{
                position: 'absolute',
                inset: { xs: '16% 0 10% 0', md: '10% -8% 8% -8%' },
                borderRadius: '50%',
                background:
                  'radial-gradient(circle at 50% 48%, rgba(24, 224, 255, 0.26), rgba(24, 224, 255, 0) 60%), radial-gradient(circle at 34% 34%, rgba(141, 93, 255, 0.24), rgba(141, 93, 255, 0) 64%)',
                filter: 'blur(36px)',
                pointerEvents: 'none'
              }}
            />

            <Box
              data-testid="hero-logo-blend"
              component="img"
              src="/assets/ProdigyInteractiveLogo.png"
              alt="Prodigy Interactive logo"
              sx={{
                position: 'relative',
                zIndex: 1,
                width: { xs: 'min(92vw, 620px)', sm: 'min(86vw, 680px)', lg: 'min(52vw, 740px)' },
                height: 'auto',
                opacity: 1,
                filter: 'saturate(1.12) contrast(1.03)',
                maskImage:
                  'radial-gradient(ellipse 96% 90% at 50% 52%, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 70%, rgba(0,0,0,0.96) 79%, rgba(0,0,0,0.84) 86%, rgba(0,0,0,0.58) 92%, rgba(0,0,0,0.30) 96%, rgba(0,0,0,0.1) 98.8%, rgba(0,0,0,0) 100%)',
                WebkitMaskImage:
                  'radial-gradient(ellipse 96% 90% at 50% 52%, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 70%, rgba(0,0,0,0.96) 79%, rgba(0,0,0,0.84) 86%, rgba(0,0,0,0.58) 92%, rgba(0,0,0,0.30) 96%, rgba(0,0,0,0.1) 98.8%, rgba(0,0,0,0) 100%)',
                maskRepeat: 'no-repeat',
                maskSize: '100% 100%',
                maskPosition: 'center',
                WebkitMaskRepeat: 'no-repeat',
                WebkitMaskSize: '100% 100%',
                WebkitMaskPosition: 'center'
              }}
            />

            <Stack
              direction="row"
              spacing={1}
              flexWrap="wrap"
              useFlexGap
              sx={{
                position: 'relative',
                zIndex: 2,
                justifyContent: 'center',
                mt: { xs: -7, md: -9 }
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
                fontSize: { xs: '2.1rem', md: '3.6rem' },
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
