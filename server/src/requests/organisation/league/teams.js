import { getLeagueStandings } from '../../api-football/competitions';

// Organise Results
function organiseLeagueStandings(currentLeague) {
    // Hold results that will go into database
    // League Information
    const dataForDatabase = {
        league: currentLeague.league.leagueName,     // For League ID
        country: currentLeague.league.country,   // For Country and Continent ID
        teams: []    // Each team goes in here
    }

    // Go through each team and get needed information
    for (const team of currentLeague.standings) {
        dataForDatabase.teams.push({
            ranking: team.position,
            team_name: team.name,
            team_emblem: team.emblem
        })
    }

    // Return each league and each team within that league
    return dataForDatabase;
}

// Collect
// team_name, team_emblem and ranking
export async function getAllTeamInformation() {
    // Get Results
    const leagues = [];
    // Check for end of leagues
    let failedCallCounter = 0;
    // Temporary
    const validLeagues = [];
    const invalidLeagues = [];

    // Find each team in the API Database
    for (let i = 0; i < 1; i++) {
        // Get Season Parameter
        const date = new Date();
        const currentYear = date.getFullYear();

        // Make API Call
        try {
            const league = await getLeagueStandings({
                season: currentYear,
                leagueId: 39 
            });

            // Organise Results
            leagues.push(organiseLeagueStandings(league));

            // Tempoary Section
            // Valid League - Store league (i) so that I can cut down on API calls later
            validLeagues.push(39);
            // Reset counter - League was found
            failedCallCounter = 0;

            setTimeout(console.log(`39 Processed`), 2000);


        } catch (err) {
            // Temporary Section
            // Invalid League - Store league (i), so that I can cut down on API calls later
            invalidLeagues.push(i);
            // Increment Fail Counter;
            failedCallCounter += 1;
            if (failedCallCounter > 10) {
                console.log(`Potential end of league calls.\nStarts from ${i - 10}`);
                break;
            }
        }
    }

    // Get the information required
    console.log(validLeagues);
    console.log(invalidLeagues);

    // Return Results Suitable For Database
    return leagues;
}


// Collect country_id and continent_id from continents.countries
async function getCountryAndContinentID(dbConnection) {
    
}