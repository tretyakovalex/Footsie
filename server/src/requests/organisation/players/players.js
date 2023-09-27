// dbEntry
import { getSquadPlayers } from "../../api-football/clubs";
import { printJSON } from "../../api-football/global-functions";
import { gatherPlayerInformation, getPlayerKitNumber, getTeamID } from "../../api-football/organisePlayers";
// dbResult
import { getPlayerStatistics } from "../../api-football/players"; 
import { getLeagueIDs } from "../league_identifiers";

/* 
    id: apiLeague.league.id,
    competition: apiLeague.league.type
*/
// Combine all the information

// Current Season
const date = new Date();
const currentYear = date.getFullYear();


// Match every player and team
function matchPlayers(everyPlayerInLeague, teamId) {
    // Hold every player of the respective team
    const teamHolder = [];

    for (const player of everyPlayerInLeague.players) {
        if (player.team == teamId) {
            console.log(`Player: ${player.fullname} plays for ${player.team}`)
            teamHolder.push(player);
        }
    }

    // Return an array of objects
    console.log(`Returning players for ${teamId}`)
    return teamHolder;
}

// Make multiple API calls with different IDs for each call
async function multiApiCalls(allTeamsInLeague, everyPlayerInLeague) {

    // Go through every team in a league
    for (const teamId of allTeamsInLeague) {
        // Get every player for a specific team.

        // GO THROUGH EVERY PLAYER IN EACH ARRAY

        const teamPlayers = matchPlayers(everyPlayerInLeague[0], teamId);

        console.log(teamPlayers)
        /*
        
        // Get every player in a league - detailed
        const apiResponse = await getPlayerStatistics({
            id: id,
            season: currentYear,
            purpose: "team"
        });

        const detailedPlayerStatistics = apiResponse.playerStatistics;
        const squadLineup = apiResponse.lineup;


        // Assign players with kit numbers
        // getPlayerKitNumber(teamPlayers, squadLineup[0].players);
     */   
    }
    
}

// Get every single player within a league
async function playerInEveryLeague(leagueIdentifiers) {
    // Hold Every Player In Every League
    const everyLeagueAndPlayers = [];

    // Go through every league and get all players
    for (const currentLeague of leagueIdentifiers) {
        let pageNumber = 1;
        const tempPlayerHolder = [];

        while (true) {
            if (pageNumber > 5) {
                break;
            }
            // Get every player in a league
            const allLeaguePlayers = await getPlayerStatistics({
                id: currentLeague,
                season: currentYear,
                purpose: "league",
                page: pageNumber,
            });
            pageNumber++;

            // Check if there are players to add
            if (allLeaguePlayers.length === 0) {
                console.log(`Last Page For API Call : ${pageNumber}`);
                break; // Exit the loop if no more players
            }

            // Collect the basic information of each player
            const basicPlayerDetails = gatherPlayerInformation(allLeaguePlayers);
            tempPlayerHolder.push(basicPlayerDetails);
        }

        // Add players for the current league to the result
        everyLeagueAndPlayers.push({
            league: currentLeague,
            players: tempPlayerHolder,
        });

        console.log(`Returning players for league: ${currentLeague}`)
    }

    // Return an array of objects
    // Each object representing a league and their players
    return everyLeagueAndPlayers;
}

// Make API Request
export async function getPlayerDetails() {
    /*
    // Gather all league IDs
    const allLeagueId = async () => {
        const id = await getLeagueIDs();
        return id.league;
    };
    */

    const allLeagueId = [39]; 
    const allTeamsInLeague = [33];

    // Gather every player in a league
    const leagueAndPlayers = await playerInEveryLeague(allLeagueId);
    // Get Team Ids through player information
    // const allTeamsInLeague = getTeamID(leagueAndPlayers);

    printJSON(leagueAndPlayers, 1000000);

    // Go through each team individually to get more information
    // On players
    // multiApiCalls(allTeamsInLeague, leagueAndPlayers);


}

/* 
    * Get all the players within a league. 
       * From ^ we get all the team IDs + basicPlayer Information
     Loop through list of teams
        Give players kit numbers
        Detailed stats in all competition
    Return a list of all players
        All Competition Stats
        All Player Information
*/