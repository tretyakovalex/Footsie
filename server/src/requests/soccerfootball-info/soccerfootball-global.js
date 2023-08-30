// Public Imports
import axios from 'axios';

// Private Import
import { printJSON } from '../api-football/global-functions'; // Print JSONs

// API Call Default Function
export async function getApiResponse(options, errorMessage) {
    try {
        const response = await axios(options);

        printJSON(response, 100000);

        return response;
    } catch (error) {
        console.error(error);
        console.error(errorMessage)
        return undefined;
    }
}


export const DEFAULT = {
    leagueList: 'https://livescore6.p.rapidapi.com/leagues/v2/list', // League List
}