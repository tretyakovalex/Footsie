// Document Location: src -> api -> requests -> api-football
import { CountryNameAndFlags, CompetitionNameAndCountry, LeagueStandings } from './competitions';

// API-Football: Get data on [countries, competition, league standings]

const leagueInformation = {
    "leagueName": "Premier League",
    "country": "England",
    "leagueLogo": "https://media-3.api-sports.io/football/leagues/39.png",
    "countryFlag": "https://media-3.api-sports.io/flags/gb.svg"
}


// Doesn't require any parameters to run
describe("\nTESTING: API-Football\nInformation on countries and competititons", () => {
    // Testing whether [country, name, logos] from V3 - Countries are fetched properly 
    test('Fetching Country Names and Logos', async () => {
        const country = await CountryNameAndFlags();
        expect(country.npmTest).toEqual({
            "logo": 'https://media-2.api-sports.io/flags/al.svg', 
            "name": 'Albania', 
            "tag": 'AL'
        });
    });

    // Testing to see whether [cup, countries] from V3 - Leagues by type are fetched properly
    test('Fetching Competition Names and Countries', async () => {
        const cups = await CompetitionNameAndCountry();
        expect(cups.npmTest).toBe("Euro Championship World")
    })

    // Testing whether [Name, Country, logo, Flag] from V3 - Standings by league are fetched properly
    test('Feteching League Standings', async () => {
        const standingInformation = await LeagueStandings();
        expect(standingInformation.league).toEqual(leagueInformation);
    });
})