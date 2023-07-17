// Public Imports
import axios from 'axios';

// Private Imports
import { API_KEY } from '../../matches/matchAPI';


// Fetch Specific League
export default async function FetchLeagues({LeagueId}) {

    // Send Information to API
    const options = {
      method: 'GET',
      url: 'https://api-football-v1.p.rapidapi.com/v3/standings',
      params: {
        league: LeagueId,
        season: '2022'
      },
      headers: {
        'X-RapidAPI-Key': API_KEY,
        'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
      }
    }
  
    try {
      const response = await axios.request(options);
      const standings = response.data.response[0].league.standings[0]
      return standings
    } catch (error) {
      console.error(error);
      throw new Error('Failed to fetch league data');
    }
  }


  // Fetch All League and IDs
export async function FetchAllLeagues() {

  const options = {
    method: 'GET',
    url: 'https://api-football-v1.p.rapidapi.com/v3/leagues',
    headers: {
      'X-RapidAPI-Key': '060abebd44msheb1fbe6d87b8111p1c9872jsnd77b5a96aa2e',
      'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
    }
  };
  
  try {
    const response = await axios.request(options);
    console.log(response)
  } catch (error) {
    console.error(error);
  }
}
  