// Grab data on countries and competitions

// Private Imports
import { Options, ReturnResponse, ErrorMessage, competitionEndpoints, competitionParams } from './api-football-endpoints';

// V3 - Countries
// Country Names, Flags and Tag
export async function CountryNameAndFlags() {
    try {
        // GET Country names, flag and tag
        const response = await ReturnResponse(competitionEndpoints.countries, ErrorMessage("Country Name and Flags from 'API-Football V3 - Countries' Request", "Competition.js"))

        // TODO:
        //  Create a database function to return information I am looking for
        const countries = GetCountries(response);

        // Use this to test API Call for NPM Test - Euro Championship World
        // TODO:
        //   Add Logo to test result
        const npmResult = response[0].name;

        // Fill database or pass NPM Test
        return {
            npmTest: npmResult,
            countries: countries
        };    
        
    } catch (error) {
        console.error(error)
    }
}

// Organise API Response by country and leagues
function GetCompetitions(response) {
    const competitions = {}

    // Push all competitions and countries to competitions array
    for (let i = 0; i < response.length; i++) {

        const countryName = response[i].country.name;
        const competitionName = response[i].league.name

        if (!response[i].country.name) {
            competitions[countryName] = [competitionName]; 
        } else {
            competitions[countryName].push(competitionName)
        }
    }

    return competitions;
}


// Organise Country and Competition into array
function OrganiseCountries() {
        const competitionObj = GetCompetitions(response);
        const competitions = [];

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
        const response = await ReturnResponse(Options(competitionEndpoints.leagues, competitionParams.default), ErrorMessage("List of leauges / cups from 'API-Football V3 - Leagues by type' Request"))

        return {
            npmTest: response[i].league.name + " " + response[i].country.name,
            databaseCompetitions: OrganiseCountries(GetCompetitions())
        }
    } catch (error) {
        console.error(error)
    }
}
