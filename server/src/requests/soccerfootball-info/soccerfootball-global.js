// Public Imports
import axios from 'axios';

// Private Import
import { printJSON } from '../api-football/global-functions'; // Print JSONs

// API Call Default Function
export async function getApiResponse(options, errorMessage) {
    try {
        const response = await axios(options);

        // Check results came through
        if (!response || response.data.result <=0) {
            console.error("Error Loading API\n");
            return undefined;
        }

        return response.data.result;
    } catch (error) {
        console.error(error);
        console.error(errorMessage)
        return undefined;
    }
}


export const DEFAULT = {
    countryList: 'https://soccer-football-info.p.rapidapi.com/countries/list/', // List of countries
    languageCodes: 'https://soccer-football-info.p.rapidapi.com/languages/list/',// List of languages
    clubList: 'https://soccer-football-info.p.rapidapi.com/teams/list/', // List of clubs
}