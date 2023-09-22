import { getTeamRankings, getTeamLocationDetails } from "../../requests/organisation/league/league_rankings";
import { printJSON } from "../../requests/api-football/global-functions";

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
                break;
            }
        }
    };

    // Return an array of objects
    // Returning each team: League ID, Team Name and Ranking
    return linkedResult;
}



function organiseResultForDatabase(dbResponse, teamWithLeagueID) {
    // Create a Map to associate team names with continent ID, country ID, and team ID
    const teamMap = new Map();
    
    // Populate the teamMap using data from the database response
    dbResponse.forEach((dbTeam) => {
      teamMap.set(dbTeam.team_name, {
        continent_id: dbTeam.continent_id,
        country_id: dbTeam.country_id,
        team_id: dbTeam.team_id,
      });
    });

    // Map teams from API response to include additional data
    const formattedResult = teamWithLeagueID.map((team) => ({
        continent_id: teamMap.get(team.team_name).continent_id,
        country_id: teamMap.get(team.team_name).country_id,
        league_id: team.league_id,
        ranking: team.ranking,
        team_id: teamMap.get(team.team_name).team_id
      }));
      
  
    // The result now includes league_id, team_id, ranking, continent_id, country_id
    return formattedResult;  
} 

// Fill league ranking table with all the league teams, with their rankings
export async function fillLeagueRankingsDatabase(leaguesConnection, continentsConnection) {
    // Get organised data from the database (MySQL)
    const dbResponse = await getTeamLocationDetails(leaguesConnection, continentsConnection);
    // Get formatted result from API Request
    const apiResponse = await getTeamRankings();


    // Match each time with their respective league
    const teamsWithLeagueID = linkTeamWithId(dbResponse.leagueResponse, apiResponse);

    // Organised the results, to insert into the database
    const organisedResult = organiseResultForDatabase(dbResponse.teamsResponse, teamsWithLeagueID)

    
    // Query - Put results into database
    const query = 'INSERT INTO league_rankings (continent_id, country_id, league_id, ranking, team_id) VALUES (?,?,?,?,?)';

    // Go through organisedResult and insert each team
    for (const eachTeam of organisedResult) {
        // Insert this data into the database.
        const teamData = [
            eachTeam.continent_id,
            eachTeam.country_id, 
            eachTeam.league_id, 
            eachTeam.ranking,
            eachTeam.team_id,
        ]
        try {
            await leaguesConnection.query(query, teamData);
        } catch (err) {
            console.error(`Problem inserting into the league ranking database. (fill-league-rankings.js)`);
            console.error(err);
        }
    };

    // Successfully Added To Database
    console.log("League Database: League Ranking Filled");
}