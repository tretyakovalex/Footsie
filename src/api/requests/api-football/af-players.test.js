import { PlayerStatistics } from './players';

// API-Football: Get data on [Players based on teams] names


// Grab data on players: D. Van De Beek Result
const NPMCopyResult = {
    player: {
        name: "D. van de Beek",
        "first name": "Donny",
        "second name": "van de Beek",
        age: 26,
        nationality: "Netherlands",
        injured: false,
        photo: "https://media-1.api-sports.io/football/players/547.png"
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
    test("2020 Season - Get basic information player (Currently Alex Telles)", async () => {
        const SquadPlayers = await PlayerStatistics();
        expect(SquadPlayers.npmTest).toEqual(NPMCopyResult);
    });
})
