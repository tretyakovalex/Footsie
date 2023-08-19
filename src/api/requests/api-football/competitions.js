// Grab data on countries and competitions

// Public Imports
import axios from 'axios';

// Constants & Header
const Header = {
    'X-RapidAPI-Key': '060abebd44msheb1fbe6d87b8111p1c9872jsnd77b5a96aa2e',
    'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
}

// V3 - Countries
// Country Names, Flags and Tag
export async function CountryNameAndFlags() {
    // API Request - Data
    const options = {
        method: 'GET', 
        url: 'https://api-football-v1.p.rapidapi.com/v3/countries',
        headers: Header
    }

    try {
        // Sends request and receives a response from server
        const response = await axios(options); 

        // Direct access to list of countries
        const countries = response.data.response[0].name;

        // Return a list of country names
        return countries;    
    } catch (error) {
        console.error(error)
    }
}

// V3 - Leagues by type (League or Cup)
// League and Cup Names W/ Hosting Country
export async function CupNameAndCountry() {
    // API Request - Data
    const options = {
        method: 'GET',
        url: 'https://api-football-v1.p.rapidapi.com/v3/leagues',
        params: {type: 'cup'},
        headers: Header
    }

    try {
        const apiResponse = await axios(options);
        // Direct access to list of cups and leagues
        const response = apiResponse.data.response;

        // To Access Specific Elements  
        for (let i = 0; i < response.length; i++) {
            // Return league name and country name
            // TODO:
            //     Create a DB entry function
            return response[i].league.name + " " + response[i].country.name;
        }
    } catch (error) {
        console.error(error)
    }
}
