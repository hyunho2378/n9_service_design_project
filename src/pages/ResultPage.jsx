import Deliverables from '../sections/Deliverables.jsx';
import Validation from '../sections/Validation.jsx';
import Retention from '../sections/Retention.jsx';
import Impact from '../sections/Impact.jsx';
import Collaboration from '../sections/Collaboration.jsx';
import VoiceOfOwner from '../sections/VoiceOfOwner.jsx';
import Outro from '../sections/Outro.jsx';

export default function ResultPage() {
  return (
    <>
      <Deliverables />
      <Validation />
      <Retention />
      <Impact />
      <Collaboration />
      <VoiceOfOwner />
      <Outro />
    </>
  );
}
