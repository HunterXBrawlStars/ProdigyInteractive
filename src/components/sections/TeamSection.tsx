import { Box, Container, Typography } from '@mui/material';
import { teamStubs } from '../../content/siteContent';

export function TeamSection() {
  return (
    <Box component="section" id="team" sx={{ py: { xs: 4, md: 10 } }}>
      <Container maxWidth="xl">
        <Typography className="section-eyebrow">The Team</Typography>
        <Typography className="section-title"
          sx={{
            fontSize: { xs: '2rem', md: '3.2rem' },
            lineHeight: 1.03,
            mb: 2,
            maxWidth: { xs: '19ch', md: '28ch' }
          }}
        >
          Know who you're working with.
        </Typography>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(2, minmax(0, 1fr))' },
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
