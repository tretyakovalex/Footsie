import { getAllTeamInformation } from './teams';

// Match API and DB Countries.
// Return League Name, Team Name and Ranking
function gatherTeamAndRanking(leagues) {
    // Hold all the leauges, team and rankings
    const teamAndRanking = {}

    // Go through each league from the API Response
    for (const eachLeague of leagues) {
        // Direct access each league name
        const leagueName = eachLeague.league;
        teamAndRanking[leagueName] = [];
        // Go through each team in each league
        for (const teams of eachLeague.teams) {
            // Get team name and team ranking
            teamAndRanking[leagueName].push({
                team_name: teams.team_name,
                ranking: teams.ranking
            })
        }
    };

    // Returns an object of objects
    // Leagues with each team and their rankings
    return teamAndRanking;
}

// Fetch information about the team rankings
export async function getTeamRankings() {
    // Get all leagues, with their teams.
    // Placeholder_results -> DBandAPI.js for template results
    const apiResponse = await getAllTeamInformation();

    // Organise response to gather the team name and ranking
    const teamNameAndRankings = gatherTeamAndRanking(apiResponse);

    return teamNameAndRankings;
}


// Access the database to get [continent_id, country_id, league_id, team_id]
export async function getTeamLocationDetails(teamsConnection, leagueConnection) {
    return new Promise((resolve, reject) => {
        const teamsQuery = 'SELECT continent_id, country_id, team_id, team_name from teams';
        const leagueQuery = 'SELECT league_id, league_name from league';

        // Try connect to the league database (Teams Table)
        teamsConnection.query(teamsQuery, (teamsError, teamsResult) => {
            if (teamsError) {
                // Fail to connect
                console.error(`Error connecting to the league database. (league_rankings.js)`)
                reject(teamsError);
            } else {
                console.log(`Successfully connected to [League - Teams Table]. (league_rankings.js)`)
                // Try connect to the continents database (League Table)
                leagueConnection.query(leagueQuery, (leagueError, leagueResult) => {
                    if (leagueError) {
                        // Fail to connect
                        console.error(`Error connecting to the continents database. (league_rankings.js)`);
                        reject(leagueError);
                    } else {
                        console.log(`Successfully connected to [Continents - League Table]. (league_rankings.js)`)
                        // Organise League - Teams Table response
                        const formatTeamsResponse = teamsResult.map((row) => {
                            return {
                                continent_id: row.continent_id,
                                country_id: row.country_id,
                                team_id: row.team_id,
                                team_name: row.team_name,
                            }
                        });

                        // Organise Continents - League Table response
                        const formatLeagueResponse = leagueResult.map((row) => {
                            return {
                                league_id: row.league_id,
                                league_name: row.league_name,
                            }
                        });

                        // Return an array of objects
                        resolve({
                            teamsResponse: formatTeamsResponse,
                            leagueResponse: formatLeagueResponse
                        })
                    }
                })
            }
        })
    })
}