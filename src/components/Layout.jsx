import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { color, font } from '../tokens/web.js';
import Nav from './Nav.jsx';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function Layout() {
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
      <ScrollToTop />
      <Nav />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
