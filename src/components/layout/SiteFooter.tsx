import { Box, Container, Link, Stack, Typography } from '@mui/material';

export function SiteFooter() {
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
            <Link href="#portfolio" underline="hover" color="inherit">
              Portfolio
            </Link>
            <Link href="#contact" underline="hover" color="inherit">
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
