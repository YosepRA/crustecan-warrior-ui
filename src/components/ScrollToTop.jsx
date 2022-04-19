import { useEffect } from 'react';
import { useLocation, matchPath } from 'react-router-dom';

const ScrollToTop = function ScrollToTopComponent() {
  const location = useLocation();
  const excludedRoutes = ['/fixtures', 'ticket/fixtures'];

  useEffect(() => {
    if (!excludedRoutes.some((route) => matchPath(route, location.pathname))) {
      window.scrollTo(0, 0);
    }
  }, [location]);

  return null;
};

export default ScrollToTop;
