// Global Imports
import axios from 'axios'; 

// Global Variables
export const API_KEY = '060abebd44msheb1fbe6d87b8111p1c9872jsnd77b5a96aa2e';
const HOST = 'api-football-v1.p.rapidapi.com';

// V3 - Fixtures
const URL = 'https://api-football-v1.p.rapidapi.com/v3/fixtures';

// Parameters for API depending on ActiveTab
const PARAMS = (ActiveTab) => { 
  switch (ActiveTab) {
    // V3 - Fixture by Team ID
    case 0:
      const currentYear = new Date().getFullYear();
      return {
        season: String(currentYear),
        team: '33'
      }
    // V3 - Fixture in progress
    case 1: {
      const currentYear = new Date().getFullYear();
      return {
        live: 'all',
        season: String(currentYear),
        timezone: 'Europe/London'
      }
    }
    // V3 - Fixtures to come
    case 2: {
      return {
        next: '50'
      }
    }
    // V3 - Fixture by date
    case 3: {
      const currentDate = new Date().toISOString().split('T')[0];
      return {
        date: currentDate,
      };
    }
  }
}

// - - - API - - -

const options = (Tab) => {
  return {
    method: 'GET',
    url: URL,
    params: {
      ...PARAMS(Tab)
    },
    headers: {
      'X-RapidAPI-Key': API_KEY,
      'X-RapidAPI-Host': HOST
    }
  };
}


// - - - Fetch Matches - - -

// Fetch Favourite Matches
async function FetchFavMatchResults(TabIndex) {
    let matches = [];

    try {
        const response = await axios(options(TabIndex));
        matches = response.data.response;
        return matches;
    } catch (error) {
        console.log("Error: Can't connect to API servers...\n");
        console.error(error);
        throw error;
    }
}

// Fetch Live Matches
async function FetchLiveResults(TabIndex) {
    let matches = [];

    try {
        const response = await axios(options(TabIndex));
        matches = response.data.response;
        return matches;
    } catch (error) {
        console.log("Error: Can't connect to API servers...\n");
        console.error(error);
        throw error;
    }
}

// Fetch Upcoming Matches
async function FetchUpcomingResults(TabIndex) {
  let matches = [];

    try {
        const response = await axios(options(TabIndex));
        matches = response.data.response;
        return matches;
    } catch (error) {
        console.log("Error: Can't connect to API servers...\n");
        console.error(error);
        throw error;
    }
}

// Global Variables
let cache = {}; // Cache object to store fetched results

// Fetch Results with Caching
async function FetchResults(TabIndex) {
  // Check if results are already cached
  if (cache[TabIndex]) {
    console.log('Results found in cache!');
    return cache[TabIndex];
  }

  // Results not found in cache, make API call and cache the results
  try {
    const response = await axios(options(TabIndex));
    const matches = response.data.response;
    cache[TabIndex] = matches; // Store the results in the cache
    return matches;
  } catch (error) {
    console.log("Error: Can't connect to API servers...\n");
    console.error(error);
    throw error;
  }
}

// Fetch the correct information
export default async function API_Matches(ActiveTab) {
  switch (ActiveTab) {
    case 0:
      return await FetchFavMatchResults(ActiveTab);
    case 1:
      return await FetchLiveResults(ActiveTab);
    case 2:
      return await FetchUpcomingResults(ActiveTab);
    case 3:
      return await FetchResults(ActiveTab);
    default:
      throw new Error(`Invalid ActiveTab value: ${ActiveTab}`);
  }
}