import Hero from '../sections/Hero.jsx';
import ProjectOverview from '../sections/ProjectOverview.jsx';
import Background from '../sections/Background.jsx';
import NextTabCTA from '../components/NextTabCTA.jsx';

export default function IntroPage() {
  return (
    <>
      <Hero />
      <ProjectOverview />
      <Background />
      <NextTabCTA label="리서치 보기" to="/research" />
    </>
  );
}
