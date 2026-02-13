import { Box, Skeleton, Stack } from '@mui/material';
import { lazy, Suspense, useState } from 'react';
import { AmbientBackground } from './components/effects/AmbientBackground';
import { ScrollProgressIndicator } from './components/layout/ScrollProgressIndicator';
import { SiteHeader } from './components/layout/SiteHeader';
import { MattGPTWidget } from './components/chat/MattGPTWidget';
import { HeroSection } from './components/sections/HeroSection';
import { LocalPresenceSection } from './components/sections/LocalPresenceSection';
import { ServicesSection } from './components/sections/ServicesSection';

const EngagementSection = lazy(() =>
  import('./components/sections/EngagementSection').then((module) => ({ default: module.EngagementSection }))
);
const PortfolioSection = lazy(() =>
  import('./components/sections/PortfolioSection').then((module) => ({ default: module.PortfolioSection }))
);
const ProcessSection = lazy(() =>
  import('./components/sections/ProcessSection').then((module) => ({ default: module.ProcessSection }))
);
const TeamSection = lazy(() =>
  import('./components/sections/TeamSection').then((module) => ({ default: module.TeamSection }))
);
const FaqSection = lazy(() =>
  import('./components/sections/FaqSection').then((module) => ({ default: module.FaqSection }))
);
const ContactSection = lazy(() =>
  import('./components/sections/ContactSection').then((module) => ({ default: module.ContactSection }))
);
const SiteFooter = lazy(() =>
  import('./components/layout/SiteFooter').then((module) => ({ default: module.SiteFooter }))
);
const MobileQuickDock = lazy(() =>
  import('./components/layout/MobileQuickDock').then((module) => ({ default: module.MobileQuickDock }))
);

function DeferredSectionFallback() {
  return (
    <Stack spacing={2} sx={{ px: { xs: 2, sm: 3 }, py: 4 }}>
      <Box className="glass-panel" sx={{ p: 2.2 }}>
        <Skeleton variant="text" width="48%" height={40} />
        <Skeleton variant="text" width="88%" />
        <Skeleton variant="text" width="82%" />
      </Box>
      <Box className="glass-panel" sx={{ p: 2.2 }}>
        <Skeleton variant="text" width="42%" height={34} />
        <Skeleton variant="rounded" width="100%" height={120} />
      </Box>
    </Stack>
  );
}

function App() {
  const [isMattGptOpen, setIsMattGptOpen] = useState(false);

  return (
    <Box>
      <AmbientBackground />
      <ScrollProgressIndicator />
      <SiteHeader />
      <HeroSection />
      <ServicesSection />
      <LocalPresenceSection />

      <Suspense fallback={<DeferredSectionFallback />}>
        <EngagementSection />
        <PortfolioSection />
        <ProcessSection />
        <TeamSection />
        <FaqSection />
        <ContactSection />
        <SiteFooter />
      </Suspense>

      <Suspense fallback={null}>
        {!isMattGptOpen ? <MobileQuickDock /> : null}
      </Suspense>
      <MattGPTWidget onOpenChange={setIsMattGptOpen} />
    </Box>
  );
}

export default App;
