// Document Location: src -> api -> requests -> api-football
import {
  getCountryNameAndFlags,
  getCompetitionNameAndCountries,
  getLeagueStandings,
} from './competitions';

// API-Football: Get data on [countries, competition, league standings]

// Information of the league in the API Request
const LEAGUE_INFORMATION = {
  leagueName: 'Premier League',
  country: 'England',
  leagueLogo: 'https://media-3.api-sports.io/football/leagues/39.png',
  countryFlag: 'https://media-3.api-sports.io/flags/gb.svg',
};

// Doesn't require any parameters to run
describe('\nTESTING: API-Football\nInformation on countries and competititons', () => {
  // Testing whether [country, name, logos] from V3 - Countries are fetched properly
  test('Fetching basic information on countries and the their flags', async () => {
    const country = await getCountryNameAndFlags();
    expect(country.npmTest).toEqual({
      logo: 'https://media-2.api-sports.io/flags/al.svg',
      name: 'Albania',
      tag: 'AL',
    });
  });

  // Testing to see whether [cup, countries] from V3 - Leagues by type are fetched properly
  test('Fetching countries and all the competitions they hold', async () => {
    const cups = await getCompetitionNameAndCountries();
    expect(cups.npmTest).toBe('Euro Championship World');
  });

  // Testing whether [Name, Country, logo, Flag] from V3 - Standings by league are fetched properly
  test('Feteching league standings for the (2020) season with the (39)Premier League  ', async () => {
    const standingInformation = await getLeagueStandings();
    expect(standingInformation.league).toEqual(LEAGUE_INFORMATION);
  });
});
