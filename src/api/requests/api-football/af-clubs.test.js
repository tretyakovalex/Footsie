import { TeamNameAndID, TeamCoaches, TeamLeagueInfo, TeamSquad } from './clubs';

// API-Football: Get data on [Teams, Coaches, Specific Teams, Squad ]


// TeamNameAndID: Grab basic information on teams
const BasicTeamInfoCopy = {
    id: 33,
    name: 'Manchester United',
    tag: 'MUN',
    country: 'England',
    logo: 'https://media-2.api-sports.io/football/teams/33.png'
};

// Coach Info Results
const CoachInfoCopy = {
    career: {
            name: "Manchester United",
            logo: "https://media-3.api-sports.io/football/teams/33.png",
            "start date": "2018-12-01",
            "end date": "2021-11-01"
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
        const TeamResult = await TeamNameAndID();
        expect(TeamResult.npmTest).toEqual(BasicTeamInfoCopy)
    });

    // Test Coach Information Function
    test("Coach information: Name, Nationality, Photo, Career", async () => {
        const CoachInfo = await TeamCoaches(33);
        expect(CoachInfo.npmTest).toEqual(CoachInfoCopy.career);
    });

    // Test League Standings Function
    test("League Standings and Results", async () => {
        const Standings = await TeamLeagueInfo();
        expect(Standings).toEqual(LeagueResultsCopy);
    });

    // Test Squad Line Up Function
    test("Squad Line Up", async () => {
        const SquadLineup = await TeamSquad();
        expect(SquadLineup).toEqual(LineupCopy);
    });

})