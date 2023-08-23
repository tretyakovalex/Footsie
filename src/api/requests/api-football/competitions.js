// Grab data on countries and competitions


// Private Imports
import { Options, ReturnResponse, ErrorMessage,compEndpoints, Defaults } from './api-football-endpoints';

import { KeyExistence, StringCheck, printJSON } from './global-functions';

function OrganiseCountries(response) {
    const Countries = {};

    for (let i = 0; i < response.length; i++) {
        const {name: countryName, flag: countryLogo, tag: countryTag} = response[i];

        // Ensure no duplicate countries
        KeyExistence(
            false,
            Countries,
            countryName, {
            flag: countryLogo,
            tag: countryTag
        })
    }

    return Countries;
}

// V3 - Countries
// Get Country Names, Flags and Tag
export async function CountryNameAndFlags() {
    try {
        // GET Country names, flag and tag
        const response = await ReturnResponse(Options(compEndpoints.countries), ErrorMessage("Country Name and Flags from 'API-Football V3 - Countries' Request", "Competition.js"))

        //  Create a database function to return information I am looking for
        const countries = OrganiseCountries(response);

        // Use this to test API Call for NPM Test - Euro Championship World
        const npmAlbania = response[0];
        const npmResult = {name: npmAlbania.name, logo: npmAlbania.flag, tag: npmAlbania.code};

        // Fill database or pass NPM Test
        return {
            npmTest: npmResult,
            countries: countries
        };    
        
    } catch (error) {
        console.error(error)
    }
}

// Make a list of competitions based on country and name
function GetCompetitions(response) {
    const competitions = {}

    // Push all competitions and countries to competitions array
    for (let i = 0; i < response.length; i++) {

        // Store current country and competititon name
        const {country: {name: countryName}, league: {name: competitionName}} = response[i];

        // If country doesn't exit create key or add to key
        KeyExistence(
            true,
            competitions,
            countryName,
            competitionName)
    }

    // List of countries and their competitions
    return competitions;
}


// Returns an organised array of objects 
function OrganiseCompetitions(CountryObj) {
        const competitionObj = GetCompetitions(CountryObj);
        const competitions = [];

        // Create an array of objects for memory purposes
        for (const country in competitionObj) {
            competitions.push({
                country: country,
                leagues: competitionObj[country]
            });
        }

        // Sort competitions array by country name
        competitions.sort((a, b) => a.country.localeCompare(b.country));

        return competitions;
}


// V3 - Leagues by type (League or Cup)
// League and Cup Names W/ Hosting Country
export async function CompetitionNameAndCountry(competition) {
    try {

        const comp = competition != undefined ? competition : 'cup';

        // GET List of leagues / Cup and hosting country
        const response = await ReturnResponse(Options(compEndpoints.leagues, {type: comp }), ErrorMessage("List of leauges / cups from 'API-Football V3 - Leagues by type' Request"));

        // Return based on NPM Test or Database call
        return {
            npmTest: `${response[0].league.name} ${response[0].country.name}`,
            databaseCompetitions: OrganiseCompetitions(response)
        } 
    } catch (error) {
        console.error(error)
    }
}


// League Standing Structure
function StandingStructure(League) {

    // Basic information on leagues
    const leagueDetails = {
        leagueName: League.name,
        country: League.country,
        leagueLogo: League.logo,
        countryFlag: League.flag       
    }

    // Direct access to league standings
    const standings = League.standings[0];
    // Hold teams in correct position
    const leagueStandings = []

    // Standings for each time
    for (let i = 0; i < standings.length; i++) {
        const team = standings[i];

        // Direct access to specific keys: Team & All
        const {team: teamInfo, all: stats} = team;

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
            form: team.form
        };

        // Add team to standings
        leagueStandings.push(teamStanding);
    }

    // Holding league data
    const leagueStructure = {
        league: leagueDetails,
        standings: leagueStandings
    }

    // Return league standings
    return leagueStructure
}

// V3 - Standings by League
// Find Full League Standings and Points
// Use this function for all league standings
export async function LeagueStandings(PARAMS) {
    try {
        // Check if parameters been inputted, else add defaults
        const season = PARAMS != undefined ? StringCheck(PARAMS.season) : Defaults.season;  // '2020'
        const leagueID = PARAMS != undefined ? StringCheck(PARAMS.TeamID) : Defaults.leagueID   // '33'

        // Request Leagues based on response
        const apiResponse = await ReturnResponse(Options(compEndpoints.standings, {
            season: season,
            league: leagueID
        }), ErrorMessage("unable to GET 'V3 - Standings by League' via ","competitions.js"))

        // Direct Access To Object
        const response = apiResponse[0];

        const League = StandingStructure(response.league);
        // printJSON(League, 200000);

        return League;


    } catch (error) {
        console.error(error)
    }
}