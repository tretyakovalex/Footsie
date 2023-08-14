// File will get all information on competitions, tournaments etc

// Public Imports
import axios from 'axios';

// Constants
const Header = {
    key: 'c49abebf20msh556635e82e3a0a0p19e6a6jsnbdb55df872dd',
    host: 'api-football-v1.p.rapidapi.com'
}

// API Request on Country Names, Flags and Tag
async function CountryNameAndFlags() {
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
        console.log(JSON.stringify(response))
    } catch (error) {
        console.error(error)
    }

}

CountryNameAndFlags();

