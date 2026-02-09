import { Box } from '@mui/material';
import { useScrollProgress } from '../../hooks/useScrollProgress';

export function ScrollProgressIndicator() {
  const progress = useScrollProgress();
  const percent = Math.round(progress * 100);

  return (
    <Box
      role="progressbar"
      aria-label="Scroll progress"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={percent}
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: 3,
        zIndex: 1400,
        background: 'rgba(126, 155, 255, 0.18)'
      }}
    >
      <Box
        sx={{
          width: `${percent}%`,
          height: '100%',
          background: 'linear-gradient(90deg, #8f5bff 0%, #1ce0ff 70%, #9af4ff 100%)',
          boxShadow: '0 0 16px rgba(28,224,255,0.8)',
          transition: 'width 120ms linear'
        }}
      />
    </Box>
  );
}
