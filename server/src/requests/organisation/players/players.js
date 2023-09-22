// dbEntry
import { getSquadPlayers } from "../../api-football/clubs";
// dbResult
import { getClubPlayerStatistics } from "../../api-football/players"; 
import { getLeagueIDs } from "../league_identifiers";

/* 
    id: apiLeague.league.id,
    competition: apiLeague.league.type
*/
// Combine all the information

// Make multiple API calls with different IDs for each call
async function multiApiCalls(identifiers) {
    for (const id of identifiers) {

    }
}

// Make API Request
async function getPlayerDetails() {
    // Get all available league IDs
    const leaguesID = getLeagueIDs();

    // Club - getSquadPlayers
    multiApiCalls(leaguesID.league);


}