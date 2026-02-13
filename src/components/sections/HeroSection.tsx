import { Box, Button, Chip, Container, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import { type MouseEvent as ReactMouseEvent } from 'react';
import { heroFocusesDesktop, heroFocusesMobile, primaryCtaLabel } from '../../content/siteContent';
import { triggerHaptic } from '../../lib/haptics';
import { scrollToHash } from '../../lib/scrollToHash';

export function HeroSection() {
  const theme = useTheme();
  const isXlUp = useMediaQuery(theme.breakpoints.up('xl'));
  const heroFocuses = isXlUp ? heroFocusesDesktop : heroFocusesMobile;

  const handleHashNavigation = (event: ReactMouseEvent<HTMLElement>, href: string) => {
    if (!href.startsWith('#')) {
      return;
    }

    // Allow new-tab / new-window behaviors (middle click, Cmd/Ctrl click).
    if (event.button !== 0 || event.metaKey || event.altKey || event.ctrlKey || event.shiftKey) {
      return;
    }

    const id = decodeURIComponent(href.slice(1));
    if (!id || !document.getElementById(id)) {
      return;
    }

    event.preventDefault();
    scrollToHash(href);
  };

  const horizontalEdgeFade =
    'linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,0.24) 6%, rgba(0,0,0,0.68) 11%, rgba(0,0,0,0.92) 14%, rgba(0,0,0,1) 18%, rgba(0,0,0,1) 82%, rgba(0,0,0,0.92) 86%, rgba(0,0,0,0.68) 89%, rgba(0,0,0,0.24) 94%, rgba(0,0,0,0) 100%)';
  const verticalEdgeFade =
    'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.24) 6%, rgba(0,0,0,0.68) 11%, rgba(0,0,0,0.92) 14%, rgba(0,0,0,1) 18%, rgba(0,0,0,1) 82%, rgba(0,0,0,0.92) 86%, rgba(0,0,0,0.68) 89%, rgba(0,0,0,0.24) 94%, rgba(0,0,0,0) 100%)';
  const cornerSoftening =
    'radial-gradient(ellipse 64% 56% at 50% 52%, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 72%, rgba(0,0,0,0.9) 82%, rgba(0,0,0,0.66) 89%, rgba(0,0,0,0.36) 95%, rgba(0,0,0,0.1) 98.5%, rgba(0,0,0,0) 100%)';
  const blendedEdgeMask = `${horizontalEdgeFade}, ${verticalEdgeFade}, ${cornerSoftening}`;

  return (
    <Box component="section" id="home" sx={{ pt: { xs: 14, md: 20 }, pb: { xs: 8, md: 20 } }}>
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
                maskImage: blendedEdgeMask,
                WebkitMaskImage: blendedEdgeMask,
                maskComposite: 'intersect',
                WebkitMaskComposite: 'source-in, source-in',
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
                mt: { xs: -3, md: -9 }
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
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: '1.6rem', md: '3.2rem' },
                lineHeight: 1.03,
                mb: 2,
                maxWidth: { xs: '19ch', md: '21ch' }
              }}
            >
              Ultra-modern products for ambitious businesses.
            </Typography>
            <Typography sx={{ color: 'var(--pi-muted)', maxWidth: '60ch', mb: 5, fontSize: '1.05rem' }}>
              Launch websites, apps, games, and practical AI systems that win more customers, remove manual
              bottlenecks, and reduce operating costs.
            </Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
              <Button
                variant="contained"
                color="primary"
                component="a"
                href="#contact"
                onClick={(event) => handleHashNavigation(event, '#contact')}
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
                onClick={(event) => handleHashNavigation(event, '#portfolio')}
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
