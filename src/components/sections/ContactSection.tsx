import { Alert, Box, Button, Container, Stack, TextField, Typography } from '@mui/material';
import { type FormEvent, useState } from 'react';
import { contactStubSubmit } from '../../lib/contactStub';
import { triggerHaptic } from '../../lib/haptics';

interface FormState {
  name: string;
  email: string;
  company: string;
  projectScope: string;
}

const initialFormState: FormState = {
  name: '',
  email: '',
  company: '',
  projectScope: ''
};

export function ContactSection() {
  const [formState, setFormState] = useState<FormState>(initialFormState);
  const [message, setMessage] = useState('');

  const onChange = (field: keyof FormState, value: string) => {
    setFormState((current) => ({ ...current, [field]: value }));
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const response = contactStubSubmit(formState);
    triggerHaptic('success');
    setMessage(response);
  };

  return (
    <Box component="section" id="contact" sx={{ py: { xs: 8, md: 10 } }}>
      <Container maxWidth="lg">
        <Box className="glass-panel" sx={{ p: { xs: 2.5, md: 4 } }}>
          <Typography className="section-eyebrow">Contact</Typography>
          <Typography className="section-title" sx={{ mb: 1.4 }}>
            Start your next product with Prodigy Interactive.
          </Typography>
          <Typography sx={{ color: 'var(--pi-muted)', mb: 3 }}>
            Submit this stub form for now. Final email/CRM routing will be connected in the next step.
          </Typography>

          <Box component="form" onSubmit={onSubmit}>
            <Stack spacing={1.5}>
              <TextField
                label="Name"
                value={formState.name}
                onChange={(event) => onChange('name', event.target.value)}
                required
              />
              <TextField
                label="Email"
                type="email"
                value={formState.email}
                onChange={(event) => onChange('email', event.target.value)}
                required
              />
              <TextField
                label="Company"
                value={formState.company}
                onChange={(event) => onChange('company', event.target.value)}
              />
              <TextField
                label="Project Scope"
                multiline
                minRows={4}
                value={formState.projectScope}
                onChange={(event) => onChange('projectScope', event.target.value)}
              />
              <Button
                type="submit"
                variant="contained"
                size="large"
                onPointerDown={() => triggerHaptic('medium')}
                sx={{ alignSelf: 'flex-start', textTransform: 'none' }}
              >
                Send Inquiry
              </Button>
            </Stack>
          </Box>

          {message ? (
            <Alert severity="info" sx={{ mt: 2 }}>
              {message}
            </Alert>
          ) : null}
        </Box>
      </Container>
    </Box>
  );
}
