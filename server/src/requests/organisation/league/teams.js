// API Request
import {
    returnApiResponse,
    COMP_EP,
    DEFAULTS,
} from '../../api-football/api-football-endpoints';
import { options, errorMessage } from '../../general-api';


import { getLeagueStandings } from '../../api-football/competitions';


// TODO:
//    Look to potentially globalise this function

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
async function getLeagueIDs() {
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
            leagueCompetition.push(league);
        } else {
            cupCompetition.push(league);
        }
    }

    // Print out the amount of API calls that will be made
    console.log(`API CALLS: ${leagueCompetition.length + cupCompetition.length}\nLeague Calls: ${leagueCompetition.length}\nCup Calls: ${cupCompetition.length}\n\n`);

    // Return based on usage
    // Filling league database vs cup database
    return {
        league: leagueCompetition,
        cup: cupCompetition
    }
}

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

    // Make API Request
    const currentLeague = await getLeagueStandings({
        season: currentYear,
        leagueId: id
    });

    // Return data the way the database will read it
    return organiseLeagueStandings(currentLeague);
}

// Collect
// team_name, team_emblem and ranking

// Gets every league standing, organise it into Name, Emblem and Ranking
export async function getAllTeamInformation() {
    // Return a array of leagues (Dictionaries)
    const leagues = [];

    // API Response + Organised into just league ID and Types
    const IDs = await getLeagueIDs();
    
    // Specifically for League and Cup
    const leagueIDs = IDs.league;

    // Function to fetch league info and to organise response
    // To fit database structure
    const fetchAndOrganizeLeague = async (leagueId) => {
      const currentLeague = await organiseLeague(leagueId);
      leagues.push(currentLeague);
    };

    // Define the rate limit parameters
    // Maximum number of API calls per minute
    const rateLimit = 30;
    // Calculate the delay between calls
    const delayBetweenCalls = 60 * 1000 / rateLimit; 

    // Get all league data
    for (const eachLeague of leagueIDs) {
        fetchAndOrganizeLeague(eachLeague.id);
        await new Promise(resolve => setTimeout(resolve, delayBetweenCalls));
    }

    console.log(`After Insertion:\nLeague Count: ${leagues.length}`)

    // Return the collected data
    return leagues;
  }
  


// Collect country_id and continent_id from continents.countries
export async function getCountryAndContinentID(dbConnection) {
    return new Promise((resolve, reject) => {
        // The right connection needs to be set for this to work
        const query = 'SELECT country_id, continent_id from countries';

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
                    }
                });

                // Return objects - Country ID and Continent ID
                resolve(formatResponse);
            }
        })
    })
}