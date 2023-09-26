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
function matchPlayers(everyPlayerInLeague, teamIdentifiers) {
    // Hold every player of the respective team
    const teamHolder = [];

    for (const league of everyPlayerInLeague) {
        for (const player of league.players) {
            if (player.team == teamIdentifiers) {
                teamHolder.push(player);
            }
        }
    }

    // Return an array of objects
    return teamHolder;
}

// Make multiple API calls with different IDs for each call
async function multiApiCalls(teamIdentifiers, everyPlayerInLeague) {
    // Loop through each League Id
    for (const id of teamIdentifiers) {
        // Get every player for a specific team.
        const teamPlayers = matchPlayers(everyPlayerInLeague, id);
        // Get every player in a league - detailed
        const apiResponse = await getPlayerStatistics({
            id: id,
            season: currentYear,
            purpose: "team"
        });

        const detailedPlayerStatistics = apiResponse.playerStatistics;
        const squadLineup = apiResponse.lineup;

        // Assign players with kit numbers
        getPlayerKitNumber(teamPlayers, squadLineup)

        for (const a of teamPlayers) {
            console.log(a.kit_number);
        }

    }
}

// Get every single player within a league
async function playerInEveryLeague(leagueIdentifiers) {
    // Hold Every Player In Every League
    const everyLeagueAndPlayers = [];

    // Go through every league and get all players
    for (const currentLeague of leagueIdentifiers) {
        // Get every player in a league
        const allLeaguePlayers = await getPlayerStatistics({
            id: currentLeague,
            season: currentYear,
            purpose: "league"
        })

        // Collect the basic information of each player
        const basicPlayerDetails = gatherPlayerInformation(allLeaguePlayers);

        // Organise it into league and their players
        const organisePlayersInLeague = {
            league: currentLeague,
            players: basicPlayerDetails
        }

        // Add all players in a league to everyPlayer holder
        everyLeagueAndPlayers.push(organisePlayersInLeague);
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

    const allLeagueId = [144, 39]; 

    // Gather every player in a league
    const leagueAndPlayers = await playerInEveryLeague(allLeagueId);
    // Get Team Ids through player information
    const allTeamInLeague = getTeamID(leagueAndPlayers);

    // Get detailed information on players and kit numbers
    multiApiCalls(allTeamInLeague, leagueAndPlayers);


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