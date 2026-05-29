import Deliverables from '../sections/Deliverables.jsx';
import Validation from '../sections/Validation.jsx';
import Impact from '../sections/Impact.jsx';
import Collaboration from '../sections/Collaboration.jsx';
import VoiceOfOwner from '../sections/VoiceOfOwner.jsx';
import Outro from '../sections/Outro.jsx';
import NextTabCTA from '../components/NextTabCTA.jsx';

export default function ResultPage() {
  return (
    <>
      <Deliverables />
      <Validation />
      <Impact />
      <Collaboration />
      <VoiceOfOwner />
      <Outro />
      <NextTabCTA label="처음으로" to="/" />
    </>
  );
}
