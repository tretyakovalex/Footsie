// Grab data on countries and competitions

// Private Imports
import {
  returnApiResponse,
  COMP_EP,
  DEFAULTS,
} from './api-football-endpoints.js';

import { options, errorMessage } from '../general-api.js';
import { KeyExistence, StringCheck, printJSON } from './global-functions.js';

const API_HOST = process.env.AF_HOST;

function organiseCountries(response) {
  const countries = {};

  for (let i = 0; i < response.length; i++) {
    const {
      name: countryName,
      flag: countryLogo,
      code: countryTag,
    } = response[i];

    // Ensure no duplicate countries
    KeyExistence(false, countries, countryName, {
      countryFlag: countryLogo,
      countryTag: countryTag,
    });
  }

  return countries;
}

// V3 - Countries
// Get Country Names, Flags and Tag
export async function getCountryNameAndFlags() {
  try {
    // GET Country names, flag and tag
    const response = await returnApiResponse(
      options(COMP_EP.countries, API_HOST),
      errorMessage(
        "Country Name and Flags from 'API-Football V3 - Countries' Request",
        'Competition.js',
      ),
    );

    //  Create a database function to return information I am looking for
    const countries = organiseCountries(response);

    // EDITED THIS LINE
    // printJSON(countries);

    // Use this to test API Call for NPM Test - Euro Championship World
    const npmAlbania = response[0];
    const npmResult = {
      name: npmAlbania.name,
      logo: npmAlbania.flag,
      tag: npmAlbania.code,
    };

    // Fill database or pass NPM Test
    return {
      npmTest: npmResult,
      countries: countries,
    };
  } catch (error) {
    console.error(error);
  }
}

// Make a list of competitions based on country and name
function getCompetitions(response) {
  const competitions = {};

  // Push all competitions and countries to competitions array
  for (let i = 0; i < response.length; i++) {
    // Store current country and competititon name
    const {
      country: { name: countryName },
      league: { name: competitionName, logo: compEmblem }
    } = response[i];

    // If country doesn't exit create key or add to key
    KeyExistence(true, competitions, countryName, {
      competition: competitionName,
      emblem: compEmblem
    });
  }

  // List of countries and their competitions
  return competitions;
}

// Returns an organised array of objects
function OrganiseCompetitions(countryObj) {
  // Create a dictionary keeping track of competitions and countries their held in
  const competitionObj = getCompetitions(countryObj);
  const competitions = [];

  // Add each country and league into an array
  for (const country in competitionObj) {
    competitions.push({
      country: country,
      leagues: competitionObj[country],
    });
  }

  // Sort competitions array by country name (Alphabetically)
  competitions.sort((a, b) => a.country.localeCompare(b.country));

  // Return an order list of countries and leagues
  return competitions;
}

// V3 - Leagues by type (League or Cup)
// Get all the countries and the football competitions they hold
// League and Cup Names W/ Hosting Country
export async function getCompetitionNameandCountries(competition) {
  try {
    // Check if parameters been inputted, else add defaults
    const comp = competition != undefined ? competition : 'cup';

    // GET List of leagues / Cup and hosting country
    const response = await returnApiResponse(
      options(COMP_EP.leagues, API_HOST, { type: comp }),
      errorMessage(
        "List of leauges / cups from 'API-Football V3 - Leagues by type' Request",
      ),
    );

    // Return based on NPM Test or Database call
    return {
      npmTest: `${response[0].league.name} ${response[0].country.name}`,
      databaseCompetitions: OrganiseCompetitions(response),
    };
  } catch (error) {
    console.error(error);
  }
}

// League Standing Structure
function standingStructure(league) {
  // Basic information on leagues
  const leagueDetails = {
    leagueName: league.name,
    country: league.country,
    leagueLogo: league.logo,
    countryFlag: league.flag,
  };

  // Direct access to league standings
  const standings = league.standings[0];
  // Hold teams in correct position
  const leagueStandings = [];

  // Standings for each time
  for (let i = 0; i < standings.length; i++) {
    const team = standings[i];

    // Direct access to specific keys: Team & All
    const { team: teamInfo, all: stats } = team;

    // Information about each team
    const teamStanding = {
      position: team.rank,
      name: teamInfo.name,
      emblem: teamInfo.logo,
      points: team.points,
      played: stats.played,
      win: stats.win,
      draw: stats.draw,
      lose: stats.lose,
      gf: stats.goals.for,
      ga: stats.goals.ga,
      gd: team.goalsDiff,
      form: team.form,
    };

    // Add team to standings
    leagueStandings.push(teamStanding);
  }

  // Holding league data
  const leagueStructure = {
    league: leagueDetails,
    standings: leagueStandings,
  };

  // Return league standings
  return leagueStructure;
}

// V3 - Standings by League
// Find Full League Standings and Points
export async function getLeagueStandings(params) {
  try {
    // Check if parameters been inputted, else add defaults
    const season =
      params != undefined ? StringCheck(params.season) : DEFAULTS.season; // '2020'
    const leagueID =
      params != undefined ? StringCheck(params.leagueId) : DEFAULTS.leagueID; // '39'

    // Request Leagues based on response
    const apiResponse = await returnApiResponse(
      options(COMP_EP.standings, API_HOST, {
        season: season,
        league: leagueID,
      }),
      errorMessage(
        "unable to GET 'V3 - Standings by League' via ",
        'competitions.js',
      ),
    );

    // Direct Access To Object
    const response = apiResponse[0];

    const league = standingStructure(response.league);
    // printJSON(League, 200000);

    return league;
  } catch (error) {
    // console.error(error);
  }
}
