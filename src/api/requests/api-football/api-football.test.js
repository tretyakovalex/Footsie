// Document Location: src -> api -> requests -> api-football
import { CountryNameAndFlags, CupNameAndCountry } from './competitions';
import { TeamNameAndID, TeamCoaches, TeamLeagueInfo, TeamSquad } from './clubs';
import { PlayerStatistics } from './players';

// API-Football: Get data on countries and competition names
// Doesn't require any parameters to run
describe("\nTESTING: API-Football\nInformation on countries and competititons", () => {
    // TODO: Add Logos for testing
    test('Country Names and Logos', async () => {
        const country = await CountryNameAndFlags();
        expect(country).toBe("Albania");
    });

    // TODO: Add Country for testing
    test('Cup Names and Countries', async () => {
        const cups = await CupNameAndCountry();
        expect(cups).toBe("Euro Championship World")
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
            URL:'https://api-football-v1.p.rapidapi.com/v3/teams' ,
            TeamID:  '33'
        });
        expect(TeamInfo).toEqual(BasicTeamInfoCopy)
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
const DonnyCopyResult = {
    player: {
        name: "D. van de Beek",
        "first name": "Donny",
        "second name": "van de Beek",
        age: 26,
        nationality: "Netherlands",
        injured: false,
        photo: "https://media-3.api-sports.io/football/players/547.png"
    }, 
    statistic: {
        team: "Manchester United",
        appearences: 19,
        goals: 1,
        season: 2020
    }
}


// API-Football 
// Test Player API's
describe("\nTESTING: API-Football\nInformation on players", () => {

    // Grab data on each player in a team
    test("Donny Van De Beek 2020 Season", async () => {
        const SquadPlayers = await PlayerStatistics({
            URL: 'https://api-football-v1.p.rapidapi.com/v3/players',
            PARAMS: {
                teamID: '33',
                season: '2020'
            }
        });
    
        expect(SquadPlayers).toEqual(DonnyCopyResult);
    });
})
