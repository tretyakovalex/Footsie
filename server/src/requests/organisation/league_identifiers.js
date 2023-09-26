// API Request
import { returnApiResponse } from '../api-football/api-football-endpoints';
import { options, errorMessage } from '../general-api';
// API Request for each standing

// League Endpoints
const LEAGUE_EP = 'https://api-football-v1.p.rapidapi.com/v3/leagues';
// League API Host
const API_HOST = process.env.AF_HOST;

// Direct Access To League IDs
function selectLeagueIDs(leagues) {
    // Hold all league ID and Type
    const leagueIDs = [];

    // Go through each league to get ID and Type
    for (const apiLeague of leagues) {
        leagueIDs.push({
            id: apiLeague.league.id,
            competition: apiLeague.league.type
        })
    }

    // Return IDs and Type from all leagues
    return leagueIDs;
}

// Get all league ID for the API Calls
export async function getLeagueIDs() {
    const response = await returnApiResponse(
        options(LEAGUE_EP, API_HOST), 
        errorMessage("Unable to get 'V3 - Leagues' via", "teams.js"));

    

    // Get all league IDs and Type
    const organisedLeague = selectLeagueIDs(response);

    const leagueCompetition = [];
    const cupCompetition = [];

    // Seperate leagues based on type
    for (const league of organisedLeague) {
        if (league.competition == 'League') {
            leagueCompetition.push(league.id);
        } else {
            cupCompetition.push(league.id);
        }
    }
    // Return based on usage
    // Filling league database vs cup database
    return {
        league: leagueCompetition,
        cup: cupCompetition
    }
}