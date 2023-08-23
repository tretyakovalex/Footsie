import { playerStatistics } from './players';

// API-Football: Get data on [Players based on teams] names


// Grab data on players: D. Van De Beek Result
const NPM_COPY_RESULT = {
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

// Test Player API's
describe("\nTESTING: API-Football\nInformation on players", () => {

    // Grab data on each player in a team
    test("Test fetching for player, D. van de Beek in the 2020 football season", async () => {
        const squadPlayers = await playerStatistics();
        expect(squadPlayers.npmTest).toEqual(NPM_COPY_RESULT);
    });
})
