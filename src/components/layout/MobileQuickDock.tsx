import { Box, Button, Stack } from '@mui/material';
import { type MouseEvent as ReactMouseEvent } from 'react';
import { MdMailOutline, MdRocketLaunch, MdWorkOutline } from 'react-icons/md';
import { triggerHaptic } from '../../lib/haptics';
import { scrollToHash } from '../../lib/scrollToHash';

export function MobileQuickDock() {
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
          onClick={(event) => handleHashNavigation(event, '#services')}
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
          onClick={(event) => handleHashNavigation(event, '#portfolio')}
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
          onClick={(event) => handleHashNavigation(event, '#contact')}
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
