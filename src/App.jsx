import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import IntroPage from './pages/IntroPage.jsx';
import ResearchPage from './pages/ResearchPage.jsx';
import StrategyPage from './pages/StrategyPage.jsx';
import SolutionPage from './pages/SolutionPage.jsx';
import ResultPage from './pages/ResultPage.jsx';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<IntroPage />} />
        <Route path="/research" element={<ResearchPage />} />
        <Route path="/strategy" element={<StrategyPage />} />
        <Route path="/solution" element={<SolutionPage />} />
        <Route path="/result" element={<ResultPage />} />
      </Route>
    </Routes>
  );
}
