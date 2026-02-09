import { Box, Container, Typography } from '@mui/material';
import { teamStubs } from '../../content/siteContent';

export function TeamSection() {
  return (
    <Box component="section" id="team" sx={{ py: { xs: 8, md: 10 } }}>
      <Container maxWidth="xl">
        <Typography className="section-eyebrow">Team</Typography>
        <Typography className="section-title" sx={{ mb: 2 }}>
          Team profiles coming soon.
        </Typography>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(3, minmax(0, 1fr))' },
            gap: 2
          }}
        >
          {teamStubs.map((person, index) => (
            <Box key={`${person.displayName}-${index}`} className="glass-panel" sx={{ p: 2.4 }}>
              <Typography variant="h6">{person.displayName}</Typography>
              <Typography sx={{ color: 'var(--pi-cyan)', mt: 0.7 }}>{person.role}</Typography>
              <Typography sx={{ color: 'var(--pi-muted)', mt: 1 }}>{person.note}</Typography>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
