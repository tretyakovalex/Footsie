// Public Imports

// Private Imports
import { getCompetitionNameandCountries } from "../../api-football/competitions";
import { printJSON } from "../../api-football/global-functions";


// Query countries database for country and continent ID
async function getCountryAndContinentID(dbConnection) {
    return new Promise((resolve, reject) => {
        const query = 'SELECT country_id, country_name, continent_id FROM countries';

        dbConnection.query(query, (err, result) => {
            if (err) {
                console.error(`Error connecting to countries database. (continent-leagues.js)`);
                reject(err);
            } else {
                const formatResult = result.map((row) => {
                    return {
                        countryID: row.country_id,
                        countryName: row.country_name,
                        continentID: row.continentID,
                    }
                })

                resolve(formatResult);
            }
        })
    })
}

// Each competition in a country
function countryCompetitions(apiCountry, dbCountry) {
    // c: tournament_id, tournament_name, continent_id, tournament_emblem
    const competitions = [];

    for (let i = 0; i < apiCountry.leauges.length; i++) {
        competitions.push({
            country_id: dbCountry.country_id,
            competition_name: apiCountry.leagues[i].competition,
            continent_id: dbCountry.continent_id,
            competition_emblem: apiCountry.leagues[i].emblem
        })
    }
}

// Fill the temporary dictionary with each competition
function fillPlaceholder(countryName, competitions, tempObj) {
    for (let i = 0; i < competitions.length; i++) {
        // If object doesn't exit create an object with an array of objects
        if (!tempObj[countryName]) {
            tempObj[countryName] = [competitions[i]];
        } else {
            // If object exists then fill the array with the other competitions
            tempObj[countryName].push(competitions[i])
        }
    }
}

// Country and Country ID exists
function checkCountryID(apiResult, dbCountries, competition) {
    const competitionResult = [];

    for (let i = 0; i < apiResult.length; i++) {
        const apiCountry = apiResult[i].country;
        const tempDict = {};

        // Find match between dbCountries and apiCountries
        for (const dbCountry of dbCountries) {
            if (apiCountry.country == dbCountry.countryName) {
                const competition = countryCompetitions(apiCountry, dbCountry);

                // Check it isn't null
                if (!competition) {
                    console.error(`Error with organising competition. (continent-leagues.js)\n${err}`);
                    break;
                };

                console.log(`${apiCountry.country} for the ${competition} database has been added`);

                fillPlaceholder(apiCountry.name, competition, tempDict);
                competitionResult.push(tempDict);

            } else {
                // Country won't have an ID
                // Don't include
            }
        }
    };

    return competitionResult;
}



// Get country location for cups and leagues
export async function competitionLocation(dbConnection) {
    // .databaseCompetitions
    const cups = await getCompetitionNameandCountries();
    const leagues = await getCompetitionNameandCountries("league");

    const countryDB = await getCountryAndContinentID(dbConnection);
}


/*

CHATGPT RECOMMENDATION

Go through this and see the difference and see if I want to add or change anything

*/

// Function to organize competition data for a country
function organizeCountryCompetitions(apiCountry, dbCountry) {
    const competitions = [];

    for (const league of apiCountry.leagues) {
        competitions.push({
            country_id: dbCountry.country_id,
            competition_name: league.competition,
            continent_id: dbCountry.continent_id,
            competition_emblem: league.emblem
        });
    }

    return competitions;
}

// Function to fill a dictionary with competition data for a country
function fillCountryCompetitions(countryName, competitions, tempObj) {
    if (!tempObj[countryName]) {
        tempObj[countryName] = competitions;
    } else {
        tempObj[countryName].push(...competitions);
    }
}

// Main function to check and organize competition data by country
function checkAndOrganizeCompetitions(apiResult, dbCountries) {
    const competitionResult = {};

    for (const apiCountry of apiResult) {
        const dbCountry = dbCountries.find(
            (dbCountry) => apiCountry.country === dbCountry.countryName
        );

        if (dbCountry) {
            const competitions = organizeCountryCompetitions(apiCountry, dbCountry);
            fillCountryCompetitions(apiCountry.name, competitions, competitionResult);
            console.log(`${apiCountry.country} competitions have been added.`);
        } else {
            console.log(`${apiCountry.country} is not found in the database. Skipping.`);
        }
    }

    return competitionResult;
}
