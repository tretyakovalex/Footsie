// Private Imports
import {
  returnApiResponse,
  DEFAULTS,
  PLAYER_EP,
} from './api-football-endpoints';

import { options, errorMessage } from '../general-api';
import { printJSON, StringCheck } from './global-functions';

const API_HOST = process.env.AF_HOST;

// Making the API Call
async function makeRequest(params, errorNote) {
  const response = await returnApiResponse(
    options(PLAYER_EP.playersURL, API_HOST, params),
    errorMessage(errorNote, "players.js")
  );

  return response;
}

// Create parameter based on callPurpose. (League requires page)
function createPurposeParameter(callPurpose, id, year, pageNumber) {
  // Create standard parameters for API Call
  const params = {
    [callPurpose]: id,
    season: year,
  };

  // League requires page number for the calls
  if (callPurpose === 'league') {
    params.page = pageNumber;
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

// Fetch player statistics
export async function getPlayerStatistics(params) {
  // Direct access to values in parameters
  const paramsId = params !== undefined ? StringCheck(params.id) : DEFAULTS.leagueID;
  const paramsYear = params !== undefined ? StringCheck(params.season) : DEFAULTS.season;
  const callPurpose = params !== undefined ? StringCheck(params.purpose) : false; // league or team

  // Check whether API call will actually be callable
  if (!callPurpose) {
    throw new Error(
      "Unable to make API Call due to lack of purpose.\nPlease call 'getPlayerStatistics' function with a 'purpose' parameter."
    );
  }

  // Keep track of page number
  let pageNumber = 1;
  const requestParams = createPurposeParameter(callPurpose, paramsId, paramsYear, pageNumber)

  // Player stats via League ID require multiple pages to get all players
  if (callPurpose === 'league') {
    const combinedResponse = [];

    while (true) {
      try {

        if (pageNumber > 3) {
          break;
        }

        // Make the API Request
        const response = await makeRequest(requestParams,
          getErrorNote(callPurpose)
        );
 
        // Add each player into combined response.
        for (const player of response) {
          combinedResponse.push(player);
        }
        // Increment for more pages.
        pageNumber++; 

      } catch (err) {
        // Failure to make API Call + Break Loop
        console.error(`Problem making the API Request 'getPlayerStatistics'. Most likely due to invalid pageNumber. Calling with the purpose of ${callPurpose}. player.js`);
        console.error(err);
        break;
      }
    }

    console.log(`Returning All Players In ${paramsId} League`);
    printJSON(combinedResponse, 3000);
    console.log(combinedResponse.length);
    // Array full of objects
    return combinedResponse;
  } else {
    // Player Stats via Team ID. Makes 1 request per team
    try {
      // Make API Request
      const response = await makeRequest(requestParams,getErrorNote(callPurpose));

      console.log(`Returning All Players In ${paramsId} Team`);
      // Return squad of players and their statistics. For every competition they are in
      return response;
    } catch (err) {
      // Error Messaging - Easier to track
      console.error(`Problem making the API Request 'getPlayerStatistics'. Calling with the purpose of ${callPurpose}. player.js`);
      console.error(err);
    }
  }
}
