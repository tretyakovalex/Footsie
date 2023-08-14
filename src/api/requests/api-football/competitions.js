// File will get all information on competitions, tournaments etc

// Public Imports
import axios from 'axios';

// Constants
const Header = {
    key: '060abebd44msheb1fbe6d87b8111p1c9872jsnd77b5a96aa2e',
    host: 'api-football-v1.p.rapidapi.com'
}

// API Request on Country Names, Flags and Tag
export async function CountryNameAndFlags() {
    // Request details
    const options = {
        method: 'GET', 
        url: 'https://api-football-v1.p.rapidapi.com/v3/countries',
        headers: {
            'X-RapidAPI-Key': Header.key,
            'X-RapidAPI-Host': Header.host
        },
    }

    try {
        const response = await axios(options); // Sends request and receives a response from server

        // Accesses the response from request
        const countries = response.data.response;
    } catch (error) {
        console.error(error)
    }

}
