// Global API

// Public Imports
import axios from 'axios';

// Print out JSON files
import { printJSON } from './global-functions';


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
