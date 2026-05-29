import OfflineTouchpoints from '../sections/OfflineTouchpoints.jsx';
import NaverEcosystem from '../sections/NaverEcosystem.jsx';
import AutoResponse from '../sections/AutoResponse.jsx';
import AiIntegration from '../sections/AiIntegration.jsx';
import LiveDemo from '../sections/LiveDemo.jsx';
import KeyScreens from '../sections/KeyScreens.jsx';
import Dashboard from '../sections/Dashboard.jsx';
import NextTabCTA from '../components/NextTabCTA.jsx';

export default function SolutionPage() {
  return (
    <>
      <OfflineTouchpoints />
      <NaverEcosystem />
      <AutoResponse />
      <AiIntegration />
      <LiveDemo />
      <KeyScreens />
      <Dashboard />
      <NextTabCTA label="성과 보기" to="/result" />
    </>
  );
}
