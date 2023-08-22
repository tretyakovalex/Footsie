// Grab data on countries and competitions

// Private Imports
import { Options, ReturnResponse, ErrorMessage,compEndpoints } from './api-football-endpoints';

import { KeyExistence } from './global-functions';

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
export async function CompetitionNameAndCountry() {
    try {
        // GET List of leagues / Cup and hosting country
        // TODO:
        //    Look at doing parameters automatically
        const response = await ReturnResponse(Options(compEndpoints.leagues, {type: 'cup'}), ErrorMessage("List of leauges / cups from 'API-Football V3 - Leagues by type' Request"));

        // Return based on NPM Test or Database call
        return {
            npmTest: `${response[0].league.name} ${response[0].country.name}`,
            databaseCompetitions: OrganiseCompetitions(response)
        } 
    } catch (error) {
        console.error(error)
    }
}
