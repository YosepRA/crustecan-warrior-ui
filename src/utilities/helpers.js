import { format } from 'date-fns';

async function promiseResolver(promise) {
  try {
    const data = await promise;
    return [data, null];
  } catch (err) {
    return [null, err];
  }
}

function sortFixturesByMonth(fixtures) {
  if (!fixtures) return undefined;

  return fixtures.data
    .map((fixture) => ({ ...fixture, date: new Date(fixture.date) }))
    .reduce((acc, cur) => {
      const monthYearString = format(cur.date, 'MMMM yyyy');

      if (!acc[monthYearString]) {
        acc[monthYearString] = [cur];
      } else {
        acc[monthYearString] = acc[monthYearString].concat(cur);
      }

      return acc;
    }, {});
}

export { promiseResolver, sortFixturesByMonth };
