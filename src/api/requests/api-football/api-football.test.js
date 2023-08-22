// Document Location: src -> api -> requests -> api-football
import { CountryNameAndFlags, CompetitionNameAndCountry } from './competitions';
import { TeamNameAndID, TeamCoaches, TeamLeagueInfo, TeamSquad } from './clubs';
import { PlayerStatistics } from './players';

// API-Football: Get data on countries and competition names
// Doesn't require any parameters to run
describe("\nTESTING: API-Football\nInformation on countries and competititons", () => {
    // TODO: Add Logos for testing
    // Testing whether country name and logos are fetched properly 
    test('Fetching Country Names and Logos', async () => {
        const country = await CountryNameAndFlags();
        expect(country.npmTest).toEqual({
            "logo": 'https://media-1.api-sports.io/flags/al.svg', 
            "name": 'Albania', 
            "tag": 'AL'
        });
    });

    // TODO: Add Country for testing
    // Testing to see whether cup and countries are fetched properly
    test('Fetching Competition Names and Countries', async () => {
        const cups = await CompetitionNameAndCountry();
        expect(cups.npmTest).toBe("Euro Championship World")
    })
})

// API-Football: Parameters for API calls
// TeamNameAndID: Grab basic information on teams
const BasicTeamInfoCopy = {
    id: 33,
    name: 'Manchester United',
    tag: 'MUN',
    country: 'England',
    logo: 'https://media-3.api-sports.io/football/teams/33.png'
};
// Coach Info Results
const CoachInfoCopy = {
    career: {
            name: "Manchester United",
            logo: "https://media-2.api-sports.io/football/teams/33.png",
            "start date": "2022-06-01",
            "end date": null
    }
}

// Team League Info Results
const LeagueResultsCopy = {
    "league name": "UEFA Champions League",
    "rank": 3,
    "points": 9,
    "form": "LLWLW",
    "win": 3,
    "draw": 0,
    "gf": 15,
    "ga": 10,
    "gd": 5
}

// Squad Line Up Result: T. Heation Result
const LineupCopy = {
    "Plays For": "Manchester United",
    "name": "T. Heaton",
    "age": 37,
    "number": 22,
    "position": "Goalkeeper",
    "photo": "https://media-1.api-sports.io/football/players/2931.png"
}


// Club API's: Grab data on teams. Basic team info, Coach, Squad Line Up and League Standing
describe("\nTESTING: API-Football\nInformation on clubs", () => {

    // Test Basic Team Information Function
    test('Basic information on team: ID, Name, Tag, Country, Logo', async () => {
        const TeamInfo = await TeamNameAndID({
            TeamID:  '33'
        });
        expect(TeamInfo.npmTest).toEqual(BasicTeamInfoCopy)
    });

    // Test Coach Information Function
    test("Coach information: Name, Nationality, Photo, Career", async () => {
        const CoachInfo = await TeamCoaches({
            URL: 'https://api-football-v1.p.rapidapi.com/v3/coachs',
            TeamID: '33'
        });
        expect(CoachInfo).toEqual(CoachInfoCopy.career);
    });

    // Test League Standings Function
    test("League Standings and Results", async () => {
        const Standings = await TeamLeagueInfo({
            URL: 'https://api-football-v1.p.rapidapi.com/v3/standings',
            Competition: 'cup' ,
            PARAMS: {'year': '2020', 'teamID': '33'}
        });
        expect(Standings).toEqual(LeagueResultsCopy);
    });

    // Test Squad Line Up Function
    test("Squad Line Up", async () => {
        const SquadLineup = await TeamSquad({
            URL: 'https://api-football-v1.p.rapidapi.com/v3/players/squads',
            TeamID: '33'
        });

        expect(SquadLineup).toEqual(LineupCopy);
    });

})

// API-Football
// Grab data on players: D. Van De Beek Result
const NPMCopyResult = {
    player: {
        name: "Alex Telles",
        "first name": "Alex",
        "second name": "Nicolao Telles",
        age: 31,
        nationality: "Brazil",
        injured: false,
        photo: "https://media-3.api-sports.io/football/players/378.png"
    }, 
    statistic: {
        team: "Manchester United",
        appearences: 9,
        goals: 0,
        season: 2020
    }
}


// API-Football 
// Test Player API's
describe("\nTESTING: API-Football\nInformation on players", () => {

    // Grab data on each player in a team
    test("020 Season - Get basic information player (Currently Alex Telles)", async () => {
        const SquadPlayers = await PlayerStatistics({
            teamID: '33',
            season: '2020'
        });
    
        expect(SquadPlayers.npmTest).toEqual(NPMCopyResult);
    });
})
