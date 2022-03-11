import { useLocation, matchPath } from 'react-router-dom';

function useRouteMatch(patterns) {
  const { pathname } = useLocation();

  for (let index = 0; index < patterns.length; index += 1) {
    const pattern = patterns[index];

    const possibleMatch = matchPath(pattern, pathname);

    if (possibleMatch !== null) return possibleMatch;
  }

  return null;
}

export default useRouteMatch;
