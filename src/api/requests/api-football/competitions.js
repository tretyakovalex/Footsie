// File will get all information on competitions, tournaments etc

// Public Imports
import axios from 'axios';

// Constants
const Header = {
    'X-RapidAPI-Key': '060abebd44msheb1fbe6d87b8111p1c9872jsnd77b5a96aa2e',
    'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
}

// V3 - Countries
// API Request on Country Names, Flags and Tag
export async function CountryNameAndFlags() {
    // Request details
    const options = {
        method: 'GET', 
        url: 'https://api-football-v1.p.rapidapi.com/v3/countries',
        headers: Header
    }

    try {
        const response = await axios(options); // Sends request and receives a response from server

        // Accesses the response from request
        const countries = response.data.response[0].name;

        return countries;

        
    } catch (error) {
        console.error(error)
    }
}

// V3 - Leagues by type (League or Cup)
// Cup Names - Enter League and Country for cup name and country it is in
export async function CupNameAndCountry() {
    const options = {
        method: 'GET',
        url: 'https://api-football-v1.p.rapidapi.com/v3/leagues',
        params: {type: 'cup'},
        headers: Header
    }

    try {
        const apiResponse = await axios(options);
        const response = apiResponse.data.response;

        // To Access Specific Elements
        for (let i = 0; i < response.length; i++) {
            return response[i].league.name + " " + response[i].country.name;
        }
    } catch (error) {
        console.error(error)
    }
}
