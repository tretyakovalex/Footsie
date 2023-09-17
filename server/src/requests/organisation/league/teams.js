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

// TODO:
//    Need to test this, but got to be cautious of the API call limit
export async function getAllTeamInformation() {
    // Return a array of leagues (Dictionaries)
    const leagues = [];

    // API Response + Organised into just league ID and Types
    const IDs = await getLeagueIDs();
    
    // Specifically for League and Cup
    const leagueIDs = IDs.league;

    // Get all league data
    for (const eachLeague of leagueIDs) {
        const currentLeague = await organiseLeague(eachLeague.id);
        leagues.push(currentLeague);
    }

    // Return the collected data
    return leagues;
  }
  


// Collect country_id and continent_id from continents.countries
async function getCountryAndContinentID(dbConnection) {
    
}