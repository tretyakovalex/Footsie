// Global API 
import axios from 'axios';

// Learn how to put this into Environment Variables
const HEADER = {
    key: '060abebd44msheb1fbe6d87b8111p1c9872jsnd77b5a96aa2e',
    host: 'api-football-v1.p.rapidapi.com'
}

// API RELATED FUNCTIONS

// Options Template - Update URL and PARAMS based on API Requests
export const Options = (URL, PARAMS) => ({
    method: 'GET', 
    url: URL,
    params: PARAMS,
    headers: {
        'X-RapidAPI-Key': HEADER.key,
        'X-RapidAPI-Host': HEADER.host
    },
})

export const OptionsNoParams = (URL) => ({
    method: 'GET', 
    url: URL,
    headers: {
        'X-RapidAPI-Key': HEADER.key,
        'X-RapidAPI-Host': HEADER.host
    },
})


// Make API Call and return the response
export async function ReturnResponse(API_CALL, ERROR_MSG) {
    try {
        const apiResponse = await axios(API_CALL);

        if (!apiResponse || apiResponse.data.response.length == 0) {
            console.error("Can't find cups and leagues");
        }

        return apiResponse.data.response;
    } catch (error) {
        console.error(error);
        console.error(ERROR_MSG);
        return undefined;
    }
}

// Failed to get API Request
export function ErrorMessage(Problem, FileLocation) {
    return "Unable to GET: " + Problem + " (" + FileLocation + ")\n";
}


// API ENDPOINTS

// Endpoints for competitions.js
export const compEndpoints = {
    leagues: 'https://api-football-v1.p.rapidapi.com/v3/leagues',
    countries: 'https://api-football-v1.p.rapidapi.com/v3/countries'
}

export const competitionParams = {
    default: 'cup',
    league: 'league'
}


// Endpoints for clubs.js



// Endpoints for player.js