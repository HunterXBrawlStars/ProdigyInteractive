import { Box } from '@mui/material';
import { MattGPTWidget } from './components/chat/MattGPTWidget';
import { AmbientBackground } from './components/effects/AmbientBackground';
import { MobileQuickDock } from './components/layout/MobileQuickDock';
import { ScrollProgressIndicator } from './components/layout/ScrollProgressIndicator';
import { SiteFooter } from './components/layout/SiteFooter';
import { SiteHeader } from './components/layout/SiteHeader';
import { ContactSection } from './components/sections/ContactSection';
import { FaqSection } from './components/sections/FaqSection';
import { HeroSection } from './components/sections/HeroSection';
import { PortfolioSection } from './components/sections/PortfolioSection';
import { ProcessSection } from './components/sections/ProcessSection';
import { ServicesSection } from './components/sections/ServicesSection';
import { TeamSection } from './components/sections/TeamSection';
import { TestimonialsSection } from './components/sections/TestimonialsSection';

function App() {
  return (
    <Box>
      <AmbientBackground />
      <ScrollProgressIndicator />
      <SiteHeader />
      <HeroSection />
      <ServicesSection />
      <PortfolioSection />
      <ProcessSection />
      <TestimonialsSection />
      <TeamSection />
      <FaqSection />
      <ContactSection />
      <SiteFooter />
      <MobileQuickDock />
      <MattGPTWidget />
    </Box>
  );
}

export default App;
