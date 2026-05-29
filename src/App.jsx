import { color, font } from './tokens/web.js';
import Nav from './components/Nav.jsx';
import Hero from './sections/Hero.jsx';
import ProjectOverview from './sections/ProjectOverview.jsx';
import Background from './sections/Background.jsx';
import DeskResearch from './sections/DeskResearch.jsx';
import UserResearch from './sections/UserResearch.jsx';
import Persona from './sections/Persona.jsx';
import SolutionDirection from './sections/SolutionDirection.jsx';
import Architecture from './sections/Architecture.jsx';
import OfflineTouchpoints from './sections/OfflineTouchpoints.jsx';
import NaverEcosystem from './sections/NaverEcosystem.jsx';
import AutoResponse from './sections/AutoResponse.jsx';
import AiIntegration from './sections/AiIntegration.jsx';
import LiveDemo from './sections/LiveDemo.jsx';
import KeyScreens from './sections/KeyScreens.jsx';
import Dashboard from './sections/Dashboard.jsx';
import Deliverables from './sections/Deliverables.jsx';
import Validation from './sections/Validation.jsx';
import Impact from './sections/Impact.jsx';
import Collaboration from './sections/Collaboration.jsx';
import VoiceOfOwner from './sections/VoiceOfOwner.jsx';
import Outro from './sections/Outro.jsx';

export default function App() {
  return (
    <div
      style={{
        background: color.bg,
        fontFamily: font.family,
        minHeight: '100vh',
        WebkitFontSmoothing: 'antialiased',
        MozOsxFontSmoothing: 'grayscale',
        wordBreak: 'keep-all',
        overflowWrap: 'break-word',
      }}
    >
      <Nav />
      <main>
        <Hero />
        <ProjectOverview />
        <Background />
        <DeskResearch />
        <UserResearch />
        <Persona />
        <SolutionDirection />
        <Architecture />
        <OfflineTouchpoints />
        <NaverEcosystem />
        <AutoResponse />
        <AiIntegration />
        <LiveDemo />
        <KeyScreens />
        <Dashboard />
        <Deliverables />
        <Validation />
        <Impact />
        <Collaboration />
        <VoiceOfOwner />
        <Outro />
      </main>
    </div>
  );
}
