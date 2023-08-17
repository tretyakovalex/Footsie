import { CountryNameAndFlags, CupNameAndCountry } from './competitions';
import { TeamNameAndID, TeamCoaches, TeamLeagueInfo, TeamSquad } from './clubs';
import { PlayerStatistics } from './players';

// Test Competition API's
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


// TeamNameAndID Result
const TeamInfo = {
    id: 33,
    name: 'Manchester United',
    tag: 'MUN',
    country: 'England',
    logo: 'https://media-3.api-sports.io/football/teams/33.png'
};
// Coach Info Results
const coachInfoResults = {
    career: {
            name: "Manchester United",
            logo: "https://media-2.api-sports.io/football/teams/33.png",
            "start date": "2022-06-01",
            "end date": null
    }
}

// Team League Info Results
const LeagueResults = {
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

// Squad Line up
const LineupHeaton = {
    "Plays For": "Manchester United",
    "name": "T. Heaton",
    "age": 37,
    "number": 22,
    "position": "Goalkeeper",
    "photo": "https://media-1.api-sports.io/football/players/2931.png"
}


// Test Clubs API's
describe("\nTESTING: API-Football\nInformation on clubs", () => {

    // Basic Team Information
    test('Basic information on team: ID, Name, Tag, Country, Logo', async () => {
        const teamName = await TeamNameAndID({
            URL:'https://api-football-v1.p.rapidapi.com/v3/teams' ,
            TeamID:  '33'
        });
        expect(teamName).toEqual(TeamInfo)
    });

    // Team Coach Information
    test("Coach information: Name, Nationality, Photo, Career", async () => {
        const coachInfo = await TeamCoaches({
            URL: 'https://api-football-v1.p.rapidapi.com/v3/coachs',
            TeamID: '33'
        });
        expect(coachInfo).toEqual(coachInfoResults.career);
    });

    test("League Standings and Results", async () => {
        const standingHolding = await TeamLeagueInfo({
            URL: 'https://api-football-v1.p.rapidapi.com/v3/standings',
            Competition: 'cup' ,
            PARAMS: {'year': '2020', 'teamID': '33'}
        });
        expect(standingHolding).toEqual(LeagueResults);
    });

    test("Squad Line Up", async () => {
        const lineupInfo = await TeamSquad({
            URL: 'https://api-football-v1.p.rapidapi.com/v3/players/squads',
            TeamID: '33'
        });

        expect(lineupInfo).toEqual(LineupHeaton);
    });

})

// Squad Player Example
const DonnyPlayer = {
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



// Test Player API's
describe("\nTESTING: API-Football\nInformation on players", () => {

    test("Donny Van De Beek 2020 Season", async () => {
        const squadPlayers = await PlayerStatistics({
            URL: 'https://api-football-v1.p.rapidapi.com/v3/players',
            PARAMS: {
                teamID: '33',
                season: '2020'
            }
        });
    
        expect(squadPlayers).toEqual(DonnyPlayer);
    })
})

/*
test("Squad Players - Donny Van De Beek Example", async () => {
    const teamSquadPlayer = await TeamSquad({
        URL: 'https://api-football-v1.p.rapidapi.com/v3/players', 
        TeamID: "33"
    });
    expect(teamSquadPlayer).toEqual(DonnyPlayer);
})
*/