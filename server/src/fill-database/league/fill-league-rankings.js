import { getTeamRankings, getTeamLocationDetails } from "../../requests/organisation/league/league_rankings";

// Find out what league each team is apart of
function linkTeamWithId(dbResponseLeagues, apiResponseLeagues) {
    const linkedResult = []

    // Get the league names from the API response as an array
    const apiLeagueNames = Object.keys(apiResponseLeagues);

    // Go through each league in API response
    for (const leagueName of apiLeagueNames) {
        // Go through each league in the database
        for (const eachLeagueDB of dbResponseLeagues) {
            // Compare league names
            if (leagueName === eachLeagueDB.league_name) {
                // Access the teams within the league
                const teamsInLeague = apiResponseLeagues[leagueName];
                // Go through each team in the league
                for (const team of teamsInLeague) {
                    linkedResult.push({
                        league_id: eachLeagueDB.league_id,
                        team_name: team.team_name,
                        ranking: team.ranking
                    });
                }
            }
        }
    };

    return linkedResult;
}



// Connect API and DB Response
function organiseResultForDatabase(dbResponse, teamWithLeagueID) {
    const teamMap = new Map();
    dbResponse.forEach((dbTeam) => {
      teamMap.set(dbTeam.team_name, {
        continent_id: dbTeam.continent_id,
        country_id: dbTeam.country_id,
        team_id: dbTeam.team_id,
      });
    });
  
    const formattedResult = teamWithLeagueID.map((team) => ({
      ...team,
      ...teamMap.get(team.team_name),
    }));
  
    return formattedResult;
  }
  


export async function fiilLeagueRankingsDatabase(teamsConnection, leagueConnection) {
    // Get organised data from the database (MySQL)
    const dbResponse = await getTeamLocationDetails(teamsConnection, leagueConnection);
    // Get formatted result from API Request
    const apiResponse = await getTeamRankings();

    // Match each time with their respective league
    const teamsWithLeagueID = linkTeamWithId(dbResponse, apiResponse.leagueResponse);

    const organisedResult = organiseResultForDatabase(dbResponse.teamsResponse, teamsWithLeagueID)
}