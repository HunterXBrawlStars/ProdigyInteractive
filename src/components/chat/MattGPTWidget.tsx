import { Box, Button, Drawer, IconButton, Stack, TextField, Typography } from '@mui/material';
import { useMemo, useState } from 'react';
import { MdClose, MdSmartToy } from 'react-icons/md';
import { mattGptIntro } from '../../content/siteContent';
import { triggerHaptic } from '../../lib/haptics';
import { mattGptStubResponse } from '../../lib/mattGptStub';

export function MattGPTWidget() {
  const [open, setOpen] = useState(false);
  const stubReply = useMemo(() => mattGptStubResponse(), []);

  const openMattGpt = () => {
    triggerHaptic('medium');
    setOpen(true);
  };

  const closeMattGpt = () => {
    triggerHaptic('light');
    setOpen(false);
  };

  return (
    <>
      <Button
        variant="contained"
        onClick={openMattGpt}
        aria-label="Open MattGPT"
        startIcon={<MdSmartToy />}
        sx={{
          position: 'fixed',
          right: { xs: 12, md: 22 },
          bottom: { xs: 74, md: 22 },
          borderRadius: '999px',
          zIndex: 1300,
          textTransform: 'none',
          boxShadow: 'var(--pi-glow)',
          '&:active': { transform: 'scale(0.96)' }
        }}
      >
        Open MattGPT
      </Button>

      <Drawer anchor="right" open={open} onClose={closeMattGpt}>
        <Box
          sx={{
            width: { xs: 320, sm: 390 },
            maxWidth: '100vw',
            height: '100%',
            p: 2,
            background: 'linear-gradient(160deg, #080b1b, #0f1632)'
          }}
        >
          <Stack spacing={2} sx={{ height: '100%' }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography variant="h5" component="h2" sx={{ fontFamily: 'Sora, sans-serif' }}>
                MattGPT
              </Typography>
              <IconButton aria-label="Close MattGPT" onClick={closeMattGpt}>
                <MdClose />
              </IconButton>
            </Stack>

            <Box className="glass-panel" sx={{ p: 1.5 }}>
              <Typography sx={{ fontSize: '.95rem' }}>{mattGptIntro}</Typography>
            </Box>

            <Box className="glass-panel" sx={{ p: 1.5 }}>
              <Typography sx={{ color: 'var(--pi-muted)', mb: 1 }}>Stub response preview:</Typography>
              <Typography>{stubReply}</Typography>
            </Box>

            <TextField label="Ask MattGPT" placeholder="What can you build for my business?" disabled />

            <Typography sx={{ fontSize: '.88rem', color: 'var(--pi-muted)' }}>
              ChatGPT integration coming soon.
            </Typography>
          </Stack>
        </Box>
      </Drawer>
    </>
  );
}
