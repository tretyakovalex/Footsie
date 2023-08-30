require('dotenv').config();

// API Key
const api_key = process.env.API_KEY

// Options Template - Update URL and PARAMS based on API Requests
export const options = (URL, HOST, PARAMS = {}) => ({
    method: 'GET',
    url: URL,
    params: PARAMS,
    headers: {
      'X-RapidAPI-Key': api_key,
      'X-RapidAPI-Host': HOST,
    },
  });
  

  // Failed to get API Request
export function errorMessage(Problem, FileLocation) {
    return 'Unable to GET: ' + Problem + ' (' + FileLocation + ')\n';
  }