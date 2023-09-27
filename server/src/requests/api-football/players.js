// Private Imports
import {
  returnApiResponse,
  DEFAULTS,
  TEAM_EP,
  PLAYER_EP,
} from './api-football-endpoints';

import { options, errorMessage } from '../general-api';
import { printJSON, StringCheck } from './global-functions';

const API_HOST = process.env.AF_HOST;

// Making the API Call
async function makeRequest(url, params, errorNote) {
  const response = await returnApiResponse(
    options(url, API_HOST, params),
    errorMessage(errorNote, "players.js")
  );

  return response;
}

// Create parameter based on callPurpose. (League requires page)
function createPurposeParameter(callPurpose, id, year, paramsPageNumber) {
  // Create standard parameters for API Call
  const params = {
    [callPurpose]: id,
    season: year,
  };

  // League requires page number for the calls
  if (callPurpose === 'league') {
    params.page = paramsPageNumber;
  }

  // Return parameters for the API Call
  return params;
}

// Error Logging: Check which API call has failed
function getErrorNote(callPurpose) {
  // Erro message dependent on purpose of API Call
  return callPurpose === 'league'
    ? "Problem with getting a response from 'V3 - Player Statistics by League ID'. "
    : "Problem with getting a response from 'V3 - Player Statistics by Team ID' ";
}

// Get Player All Competition Statistics: V3 - Players by Team ID
async function fetchPlayerStatistics(requestParams, callPurpose) {
  try {
    // Make API Call
    const response = await makeRequest(PLAYER_EP.playersURL, requestParams, getErrorNote(callPurpose));

    // Return response
    return response;
  } catch (err) {
    // Problem with API Call
    console.error(`Problem making the API Request 'getPlayerStatistics'. Calling with the purpose of ${callPurpose}. player.js`);

    // Notify of the error
    throw new Error(err);
  }
}

// Get Squad Lineup, Basic Player: V3 - Player Squad
async function fetchSquadPlayers(paramsId) {
  try {
    // Create paramter to make request
    const squadParams = { team: paramsId };
    // Error message
    const uniqueErrorNote = "Problem with getting a response from 'V3 - Player Squad' ";

    // Make API Request
    const response = await makeRequest(TEAM_EP.playerURL, squadParams, uniqueErrorNote);

    // Return response
    return response;
  } catch (err) {
    // Problem with API Call
    console.error(`Problem making the API Request 'getPlayerStatistics'. Problem with getting the squad line up. player.js`);

    // Notify of the error
    throw new Error(err);
  }
}

// Fetch player statistics: {id: ..., season: ..., purpose: ...}
export async function getPlayerStatistics(params) {
  // Forgotten to put in parameters. A default is given
  const paramsId = params !== undefined ? StringCheck(params.id) : DEFAULTS.leagueID;
  const paramsYear = params !== undefined ? StringCheck(params.season) : DEFAULTS.season;

  // Ensure reason for calling this function
  const callPurpose = params !== undefined ? StringCheck(params.purpose) : false;
  // Throw error when no purpose given
  if (!callPurpose) {
    throw new Error("Unable to make API Call due to a lack of purpose.\nPlease call 'getPlayerStatistics' function with a 'purpose' (league / team) parameter.");
  }

  // Iterate through each page 
  const paramsPageNumber = params.page !== undefined ? StringCheck(params.page) : 1;


  // Create parameters based on purpose
  const requestParams = createPurposeParameter(callPurpose, paramsId, paramsYear, paramsPageNumber);

  console.log(params);

  // Use function to get: All the players within a league
  if (callPurpose === 'league') {
    // Hold all players in one array
    const combinedResponse = [];

    // Continue making API call, whilst pages is valid
    try {
      // Make API Call - V3: Player Statistics Via League ID
      const playerStatsResponse = await fetchPlayerStatistics(requestParams, callPurpose);

      if (playerStatsResponse.length == 0) {
        console.log(`No players on page: ${paramsPageNumber}`)
      }

      // Add each player per page, into combined response
      for (const player of playerStatsResponse) {
        combinedResponse.push(player);
      }

    } catch (err) {
      // Error with API Call - Most likely due to page not existing
      console.error(`Problem making the API Request 'getPlayerStatistics'. Most likely due to an invalid pageNumber. Calling with the purpose of ${callPurpose}. player.js`);
      console.error(err);
    }

    // Return an array of objects. 
    // Object represent each player in a league
    return combinedResponse;
  } else { 
    // Make API Request - V3: Player Statistics via Team ID
    const playerStatsResponse = await fetchPlayerStatistics(requestParams, callPurpose);
    // Make API Request - V3: Player Squads
    // Need this to get the players kit number.
    const squadLineup = await fetchSquadPlayers(paramsId);

    // Confirm when each player has been recorded.
    console.log(`Returning all players in ${paramsId} team`);

    // Return an array of objects
    return {
      playerStatistics: playerStatsResponse,  // Detailed Statistics All Comps
      lineup: squadLineup    // Basic Information Including Kit Number
    }
  }
}