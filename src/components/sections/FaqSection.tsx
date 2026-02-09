import { Accordion, AccordionDetails, AccordionSummary, Box, Container, Typography } from '@mui/material';
import { MdExpandMore } from 'react-icons/md';
import { faqItems } from '../../content/siteContent';

export function FaqSection() {
  return (
    <Box component="section" sx={{ py: { xs: 7, md: 9 } }}>
      <Container maxWidth="lg">
        <Typography className="section-eyebrow">FAQ</Typography>
        <Typography className="section-title" sx={{ mb: 3 }}>
          Quick answers before we talk.
        </Typography>

        {faqItems.map((item) => (
          <Accordion key={item.question} sx={{ mb: 1.2, background: 'rgba(9,13,30,0.75)' }}>
            <AccordionSummary expandIcon={<MdExpandMore />}>
              <Typography sx={{ fontWeight: 700 }}>{item.question}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography sx={{ color: 'var(--pi-muted)' }}>{item.answer}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Container>
    </Box>
  );
}
