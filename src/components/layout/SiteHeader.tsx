import {
  AppBar,
  Box,
  Button,
  Container,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  Stack,
  Typography
} from '@mui/material';
import { motion } from 'framer-motion';
import { useState, type MouseEvent as ReactMouseEvent } from 'react';
import { MdMenu } from 'react-icons/md';
import { navLinks } from '../../content/siteContent';
import { triggerHaptic } from '../../lib/haptics';
import { scrollToHash } from '../../lib/scrollToHash';

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);

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

  const openMobileMenu = () => {
    triggerHaptic('medium');
    setMobileOpen(true);
  };

  const closeMobileMenu = () => {
    setMobileOpen(false);
  };

  const onMobileNavigate = () => {
    triggerHaptic('light');
    closeMobileMenu();
  };

  return (
    <>
      <AppBar
        position="fixed"
        color="transparent"
        elevation={0}
        data-pi-site-header="true"
        sx={{
          backdropFilter: 'blur(14px)',
          borderBottom: '1px solid var(--pi-border)',
          backgroundColor: 'rgba(6, 7, 19, 0.62)'
        }}
      >
        <Container maxWidth="xl" sx={{ py: 1.2 }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" gap={2}>
            <Box component={motion.div} initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}>
              <Typography
                variant="h6"
                sx={{
                  fontFamily: 'Sora, sans-serif',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  fontSize: { xs: '0.95rem', sm: '1.1rem' }
                }}
              >
                Prodigy Interactive
              </Typography>
            </Box>

            <Stack direction="row" gap={{ xs: 0, md: 1 }} sx={{ display: { xs: 'none', md: 'flex' } }}>
              {navLinks.map((link) => (
                <Button
                  key={link.href}
                  component="a"
                  href={link.href}
                  onClick={(event) => handleHashNavigation(event, link.href)}
                  onPointerDown={() => triggerHaptic('light')}
                  sx={{
                    color: 'var(--pi-text)',
                    textTransform: 'none',
                    fontWeight: 600,
                    '&:hover': { color: 'var(--pi-cyan)' }
                  }}
                >
                  {link.label}
                </Button>
              ))}
            </Stack>

            <IconButton
              aria-label="Open navigation menu"
              onClick={openMobileMenu}
              sx={{
                display: { xs: 'inline-flex', md: 'none' },
                border: '1px solid var(--pi-border)',
                color: 'var(--pi-text)',
                background: 'rgba(16, 22, 45, 0.68)',
                '&:active': { transform: 'scale(0.95)' }
              }}
            >
              <MdMenu />
            </IconButton>
          </Stack>
        </Container>
      </AppBar>

      <Drawer anchor="right" open={mobileOpen} onClose={closeMobileMenu}>
        <Box
          sx={{
            width: 280,
            height: '100%',
            p: 2,
            background: 'linear-gradient(190deg, #090b1a 0%, #101a39 100%)'
          }}
          role="presentation"
        >
          <Typography
            variant="overline"
            sx={{ color: 'var(--pi-cyan)', letterSpacing: '0.09em', fontWeight: 700 }}
          >
            Navigation
          </Typography>
          <List sx={{ mt: 1 }}>
            {navLinks.map((link) => (
              <ListItemButton
                key={link.href}
                component="a"
                href={link.href}
                onClick={(event) => {
                  handleHashNavigation(event, link.href);
                  onMobileNavigate();
                }}
                sx={{
                  borderRadius: 1.4,
                  mb: 0.7,
                  border: '1px solid rgba(117, 172, 255, 0.22)',
                  backgroundColor: 'rgba(17, 28, 58, 0.6)'
                }}
              >
                {link.label}
              </ListItemButton>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
}
