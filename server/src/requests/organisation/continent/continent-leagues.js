// Public Imports

// Private Imports
import { getCompetitionNameandCountries } from "../../api-football/competitions";
import { printJSON } from "../../api-football/global-functions";


// Query countries database for country and continent ID
async function getCountryAndContinentID(dbConnection) {
    // Error handle the database call
    return new Promise((resolve, reject) => {
        // Data required from database
        const query = 'SELECT country_id, country_name, continent_id FROM countries';

        // Attempt to make the connection
        dbConnection.query(query, (err, result) => {
            // Failure to connect, we end request
            if (err) {
                console.error(`Error connecting to countries database. (continent-leagues.js)`);
                reject(err);
            } else {
            // Else perform the request
                const formatResult = result.map((row) => {
                    // Gather and return the country name, ID and continent ID
                    return {
                        countryID: row.country_id,
                        countryName: row.country_name,
                        continentID: row.continent_id,
                    }
                })

                // Return a bunch of objects
                // Containing: CountryID, CountryName and ContinentID
                resolve(formatResult);
            }
        })
    })
}

// Function to organize competition data for a country
function organizeCountryCompetitions(apiCountry, dbCountry) {
    const competitions = [];

    // Loop through each competition
    // Get their respective country and continent id and emblem
    for (const league of apiCountry.leagues) {
        competitions.push({
            country_id: dbCountry.countryID,
            competition_name: league.competition,
            continent_id: dbCountry.continentID,
            competition_emblem: league.emblem
        });
    }

    // Return a list of objects
    // Each object contains a country with their respective 
    // Country and Continent ID, and emblem
    return competitions;
}

// Function to fill a dictionary with competition data for a country
function fillCountryCompetitions(countryName, competitions, tempArray) {
    // Check if the country exists in the dictionary
    let countryEntry = tempArray.find((entry) => Object.keys(entry)[0] === countryName);

    if (!countryEntry) {
        // If the country doesn't exist, create a new entry
        countryEntry = {
            [countryName]: []
        };
        tempArray.push(countryEntry);
    }

    // Add the competitions to the country entry
    countryEntry[countryName].push(...competitions);
}


// Main function to check and organize competition data by country
function checkAndOrganizeCompetitions(apiResult, dbCountries) {
    const competitionResult = [];

    // Loop through each country in the API Result
    for (const apiCountry of apiResult) {
        // Try find a match between API and DB countries
        const dbCountry = dbCountries.find(
            (dbCountry) => apiCountry.country === dbCountry.countryName
        );

        // Match is found
        if (dbCountry) {
            const competitions = organizeCountryCompetitions(apiCountry, dbCountry);
            fillCountryCompetitions(apiCountry.country, competitions, competitionResult);
            // console.log(`${apiCountry.country} competitions have been added.\n\n`);
        } else {
        // Match isn't found
            // console.log(`${apiCountry.country} is not found in the database.\n Skipping.\n\n`);
        }
    }

    // Retur a dictionary full of countries with their competitions
    return competitionResult;
}


// Get country location for cups and leagues
export async function competitionLocation(dbConnection) {
    // Country Cup Competitions
    const cups = await getCompetitionNameandCountries();
    // Country League Competitions
    const leagues = await getCompetitionNameandCountries("league");

    // Make request to (MySQL) database
    const countryDB = await getCountryAndContinentID(dbConnection);

    // Final Transformation
    // Objects of countries with their
    const cupsFormatted = checkAndOrganizeCompetitions(cups.databaseCompetitions, countryDB);    // Cup Information
    const leaguesFormatted = checkAndOrganizeCompetitions(leagues.databaseCompetitions, countryDB); // League Information

    return {
        tournament: cupsFormatted,
        leagues: leaguesFormatted
    }
}