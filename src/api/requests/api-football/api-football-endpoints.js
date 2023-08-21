// Global API 
import axios from 'axios';

// Learn how to put this into Environment Variables
const HEADER = {
    key: '060abebd44msheb1fbe6d87b8111p1c9872jsnd77b5a96aa2e',
    host: 'api-football-v1.p.rapidapi.com'
}

// Options Template - Update URL and PARAMS based on API Requests
export const Options = (URL, PARAMS) => ({
    method: 'GET', 
    url: URL,
    params: PARAMS !== NULL ? PARAMS : undefined,
    headers: {
        'X-RapidAPI-Key': HEADER.key,
        'X-RapidAPI-Host': HEADER.host
    },
})

// Make API Call and return the response
export async function ReturnResponse(API_CALL, ERROR_MSG) {
    try {
        const apiResponse = await axios(API_CALL);
        return apiResponse.data.response;
    } catch (error) {
        console.error(error);
        console.log(ERROR_MSG);
        return undefined;
    }
}

// Failed to get API Request
export function ErrorMessage(Problem, FileLocation) {
    return "Unable to GET: " + Problem + " (" + FileLocation + ")\n";
}