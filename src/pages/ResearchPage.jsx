import DeskResearch from '../sections/DeskResearch.jsx';
import UserResearch from '../sections/UserResearch.jsx';
import NextTabCTA from '../components/NextTabCTA.jsx';

export default function ResearchPage() {
  return (
    <>
      <DeskResearch />
      <UserResearch />
      <NextTabCTA label="전략 보기" to="/strategy" />
    </>
  );
}
