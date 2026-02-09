import { Box, Button, Stack } from '@mui/material';
import { MdMailOutline, MdRocketLaunch, MdWorkOutline } from 'react-icons/md';
import { triggerHaptic } from '../../lib/haptics';

export function MobileQuickDock() {
  return (
    <Box
      sx={{
        display: { xs: 'block', md: 'none' },
        position: 'fixed',
        bottom: 'max(12px, env(safe-area-inset-bottom))',
        left: 0,
        right: 0,
        zIndex: 1250,
        px: 1.5,
        pointerEvents: 'none'
      }}
    >
      <Stack
        direction="row"
        spacing={1}
        sx={{
          pointerEvents: 'auto',
          p: 0.8,
          borderRadius: 999,
          border: '1px solid rgba(125, 171, 255, 0.28)',
          background: 'rgba(8, 14, 32, 0.84)',
          backdropFilter: 'blur(12px)'
        }}
      >
        <Button
          fullWidth
          size="small"
          component="a"
          href="#services"
          startIcon={<MdRocketLaunch />}
          onPointerDown={() => triggerHaptic('light')}
          sx={{ textTransform: 'none', borderRadius: 999 }}
        >
          Services
        </Button>
        <Button
          fullWidth
          size="small"
          component="a"
          href="#portfolio"
          startIcon={<MdWorkOutline />}
          onPointerDown={() => triggerHaptic('light')}
          sx={{ textTransform: 'none', borderRadius: 999 }}
        >
          Work
        </Button>
        <Button
          fullWidth
          size="small"
          component="a"
          href="#contact"
          startIcon={<MdMailOutline />}
          onPointerDown={() => triggerHaptic('medium')}
          sx={{ textTransform: 'none', borderRadius: 999 }}
        >
          Contact
        </Button>
      </Stack>
    </Box>
  );
}
