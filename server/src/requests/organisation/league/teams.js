import { getLeagueStandings } from '../../api-football/competitions';
import { printJSON } from '../../api-football/global-functions';
import { getLeagueIDs } from '../league_identifiers';


// TODO:
//    ERROR HANDLE AND CLEAN UP CODE
//    ERROR WITH MAX CALL

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

// Organise league standing for the Teams Database
async function organiseLeague(id) {
    // Get the current season
    const date = new Date();
    const currentYear = date.getFullYear();

    try {
        // Make API Request for league standings
        const currentLeague = await getLeagueStandings({
            season: currentYear,
            leagueId: id
        });

        if (!currentLeague.league || !currentLeague.league.leagueName) {
            console.warn("Warning: leagueName is missing for the current league with ID:", id);
            return null;
        }

        // Return data the way the database will read it
        return organiseLeagueStandings(currentLeague);
    } catch (error) {
        console.error("Error while fetching league data for ID:", id);
        console.error(error);
        return null;
    }
}

// Track API Calls
// TODO:
//     Look to potentially globalise this function
//     Might be reused for other long API Calls
function updateProgress(maxCalls, startTime, callsCompleted) {
    const currentTime = Date.now(); // Track Timing
    const elapsedTime = currentTime - startTime; // How much time has gone by
    const percentageComplete = (callsCompleted / maxCalls) * 100;  // Progress
    const estimatedTimeRemaining = ((elapsedTime / callsCompleted) * (maxCalls - callsCompleted)) / (60 * 1000); // Estimated time remaining in minutes

    // Console Display Loading Bar

    console.clear(); // Clear the console to update progress
    console.log('API Call Progress:');
    console.log(`Progress: ${callsCompleted}/${maxCalls} (${percentageComplete.toFixed(2)}% complete)`);
    console.log(`Estimated Time Remaining: ${estimatedTimeRemaining.toFixed(2)} minutes`);

    // Bar to be displayed
    const bar = '='.repeat(Math.floor(percentageComplete / 2)) + ' '.repeat(Math.floor((100 - percentageComplete) / 2));

    // Print out the loading bar
    process.stdout.write(`[${bar}]\n`);

    // Check if all calls are completed
    if (callsCompleted === maxCalls) {
        console.log('All API calls completed.');
        console.log(`Completed in ${elapsedTime}ms`);
    }
}


// Gets every league standing, organise it into Name, Emblem and Ranking
export async function getAllTeamInformation() {
    // Return a array of leagues (Dictionaries)
    const leagues = [];

    // API Response + Organised into just league ID and Types
    const IDs = await getLeagueIDs();

    // Function to fetch league info and to organize response
    // To fit the database structure
    const fetchAndOrganizeLeague = async (leagueId) => {
        const currentLeague = await organiseLeague(leagueId);
    
        if (currentLeague != null) {
          leagues.push(currentLeague);
        
          // Log the added teams for the current league
          console.log(`Added teams for league: ${currentLeague.league}`);
          for (const team of currentLeague.teams) {
            console.log(`  - ${team.team_name}`);
          }
        }
      };

    // Define the rate limit parameters
    const rateLimit = 28;  // Maximum number of API calls per minute
    const delayBetweenCalls = 60 * 1000 / rateLimit; // Calculate the delay between calls

    const leagueIDs = IDs.league;         // Specifically for League and Cup
    const totalCalls = leagueIDs.length;  // Track API Call Times

    // Start Time - Loading Bar
    const startTime = Date.now();
    let callsCompleted = 1;

    // Get all league data
    for (const eachLeague of leagueIDs) {
        // Display the loading bar
        callsCompleted++ 

        // Error when just using totalCalls
        if (callsCompleted > totalCalls - 5) {
            // Don't need to make anymore league calls after this number
            break;
        }
        fetchAndOrganizeLeague(eachLeague.id);
        await new Promise(resolve => setTimeout(resolve, delayBetweenCalls)); 

        updateProgress(totalCalls, startTime, callsCompleted);
    }

    console.log(`After Insertion:\nLeague Count: ${leagues.length}`)

    // Return the collected data
    return leagues;
}

// Collect country_id and continent_id from continents.countries
// Right connection needs to be made for this to work
export async function getCountryAndContinentID(dbConnection) {
    return new Promise((resolve, reject) => {
        // The right connection needs to be set for this to work
        const query = 'SELECT country_id, continent_id, country_name from countries';

        // Attempt to make a connection to the database
        dbConnection.query(query, (err, result) => {
            if (err) {
                console.error("Error connecting to the countries database. (teams.js)");
                reject(err);
            } else {
                // Managed to connect to database
                const formatResponse = result.map((row) => {
                    return {
                        country_id: row.country_id,
                        continent_id: row.continent_id,
                        country_name: row.country_name,
                    }
                });

                // Return objects - Country ID and Continent ID
                resolve(formatResponse);
            }
        })
    })
}