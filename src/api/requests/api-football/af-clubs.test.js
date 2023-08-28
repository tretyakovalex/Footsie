import { getBasicTeamDetails, getCoachHistory, getClubStanding, getSquadPlayers } from './clubs';

// API-Football: Get data on [Teams, Coaches, Specific Teams, Squad ]

// TeamNameAndID: Grab basic information on teams
const BASIC_TEAM_DETAILS = {
    id: 33,
    name: 'Manchester United',
    tag: 'MUN',
    country: 'England',
    logo: 'https://media-2.api-sports.io/football/teams/33.png'
};

// Coach Info Results
const COACH_HISTORY = {
    career: {
            name: "Manchester United",
            logo: "https://media-3.api-sports.io/football/teams/33.png",
            "start date": "2018-12-01",
            "end date": "2021-11-01"
    }
}

// Team League Info Results
const CLUB_LEAGUE_STANDING = {
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
const SQUAD_LINEUP = {
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
    test('Fetch basic information on team (33) during the (2020) season: ID, Name, Tag, Country, Logo', async () => {
        const teamResult = await getBasicTeamDetails();
        expect(teamResult.npmTest).toEqual(BASIC_TEAM_DETAILS)
    });

    // Test Coach Information Function
    test("Fetch the coach history of a specific team (33) in the (2020) season, looking at 'Ole History': Name, Nationality, Photo, Career", async () => {
        const coachInfo = await getCoachHistory(33);
        expect(coachInfo.npmTest).toEqual(COACH_HISTORY.career);
    });

    // Test League Standings Function
    test("Fetch specific club (33) league standing in the (2020) season, looking at 'Man united standing'", async () => {
        const standings = await getClubStanding();
        expect(standings).toEqual(CLUB_LEAGUE_STANDING);
    });

    // Test Squad Line Up Function
    test("Fetch squad (33) line up in the season", async () => {
        const squadLineup = await getSquadPlayers();
        expect(squadLineup.npmTest).toEqual(SQUAD_LINEUP);
    });

})