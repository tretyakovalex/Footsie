// Global API

// Public Imports
import axios from 'axios';

// Print out JSON files
import { printJSON } from './global-functions';

// Learn how to put this into Environment Variables
const HEADER = {
  key: process.env.API_FOOTBALL_KEY,
  host: 'api-football-v1.p.rapidapi.com',
};

// API RELATED FUNCTIONS

// Options Template - Update URL and PARAMS based on API Requests
export const options = (URL, PARAMS) => ({
  method: 'GET',
  url: URL,
  params: PARAMS,
  headers: {
    'X-RapidAPI-Key': HEADER.key,
    'X-RapidAPI-Host': HEADER.host,
  },
});

// Make API Call and return the response
export async function returnApiResponse(API_CALL, ERROR_MSG) {
  try {
    const apiResponse = await axios(API_CALL);

    // Test API Response
    // printJSON(apiResponse, 5000);
    if (!apiResponse || apiResponse.data.response.length == 0) {
      console.error('Not receiving response from API Requests');
    }

    // printJSON(apiResponse.data.response, 5000);

    return apiResponse.data.response;
  } catch (error) {
    console.error(error);
    console.error(ERROR_MSG);
    return undefined;
  }
}

// Failed to get API Request
export function errorMessage(Problem, FileLocation) {
  return 'Unable to GET: ' + Problem + ' (' + FileLocation + ')\n';
}

// API ENDPOINTS

// Endpoints for competitions.js
export const COMP_EP = {
  leagues: 'https://api-football-v1.p.rapidapi.com/v3/leagues', // V3  Leagues by type (League or Cup)
  countries: 'https://api-football-v1.p.rapidapi.com/v3/countries', //  V3 - Countries
  standings: 'https://api-football-v1.p.rapidapi.com/v3/standings', // V3 - Standings by Leagues
};

// Endpoints for clubs.js
export const TEAM_EP = {
  teamURL: 'https://api-football-v1.p.rapidapi.com/v3/teams', // V3 - Team Informations
  coachURL: 'https://api-football-v1.p.rapidapi.com/v3/coachs', // V3 - Coaches by Team ID
  leagueURL: 'https://api-football-v1.p.rapidapi.com/v3/standings', // V3 - Standings by Team ID
  playerURL: 'https://api-football-v1.p.rapidapi.com/v3/players/squads', // V3 - Player Squads
};

// Endpoints for player.js
export const PLAYER_EP = {
  playersURL: 'https://api-football-v1.p.rapidapi.com/v3/players', // V3 - Player Statistics by Team ID
};

export const DEFAULTS = {
  leagueID: '39',
  teamID: '33',
  season: '2020',
};