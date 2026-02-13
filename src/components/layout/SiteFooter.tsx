import { Box, Container, Link, Stack, Typography } from '@mui/material';
import { type MouseEvent as ReactMouseEvent } from 'react';
import { scrollToHash } from '../../lib/scrollToHash';

export function SiteFooter() {
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

  return (
    <Box component="footer" sx={{ borderTop: '1px solid var(--pi-border)', py: 5, mt: 6 }}>
      <Container maxWidth="xl">
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          alignItems={{ xs: 'flex-start', md: 'center' }}
          justifyContent="space-between"
          spacing={2}
        >
          <Typography variant="body2" color="var(--pi-muted)">
            © {new Date().getFullYear()} Prodigy Interactive. Built for ultra-modern digital delivery.
          </Typography>
          <Stack direction="row" spacing={2}>
            <Link href="#portfolio" onClick={(event) => handleHashNavigation(event, '#portfolio')} underline="hover" color="inherit">
              Portfolio
            </Link>
            <Link href="#contact" onClick={(event) => handleHashNavigation(event, '#contact')} underline="hover" color="inherit">
              Contact
            </Link>
            <Link href="https://powerleagueprodigy.com/" target="_blank" rel="noreferrer" underline="hover" color="inherit">
              PLProdigy
            </Link>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
