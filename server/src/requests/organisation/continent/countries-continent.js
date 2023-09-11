import { continentData } from './country-by-continent';

// Queries database for base_countries and continents data
async function countriesConnection(dbConnection, queries, database) {
    return new Promise((resolve, reject) => {
        dbConnection.query(queries, (err, result) => {
            if (err) {
                console.error(`Problem getting data from '${database}'`);
                reject(err);
            } else {
                const formattedResult = result.map((row) => {
                    if (database == "base_countries") {
                        return {
                            "country_name": row.country_name,
                            "country_id": row.country_id,
                            "country_flag": row.country_flag
                        };
                    } else {
                        return {
                            "continent_name": row.continent_name,
                            "continent_id": row.continent_id
                        };
                    }
                });
                resolve(formattedResult);
            }
        });
    });
}

// Foundation to get the information from the SQL database
async function countriesAndContinents (dbConnection) {
    const countryQuery = 'SELECT country_name, country_id, country_flag FROM base_countries;';
    const continentQuery = 'SELECT continent_id, continent_name FROM continents;';

    // Get BaseCountry
    const countriesData = await countriesConnection(dbConnection, countryQuery, 'base_countries');
    // Get Continents
    const continentData = await countriesConnection(dbConnection, continentQuery, 'continents');

    // Separate the data into two arrays for names and IDs
    // Base Countries
    const countryNames = countriesData.map((row) => row.country_name);
    const countryIDs = countriesData.map((row) => row.country_id);
    const countryFlags = countriesData.map((row) => row.country_flag)
    // Continents
    const continentNames = continentData.map((row) => row.continent_name);
    const continentIDs = continentData.map((row) => row.continent_id);
    
    return {
        country: {
          name: countryNames,
          id: countryIDs,
          flag: countryFlags
        },
        continents: {
            name: continentNames,
            id: continentIDs
        }
    }
}

// Match database countries with the countries JSON
function matchCountries(jsonCountry, dbCountries) {

    for (let i = 0; i < dbCountries.length; i++) {
        if (jsonCountry == dbCountries[i]) {
            return {
                countryIndex: i,
                found: true
            };
        }
    }

    return false;
}


// Connects the correct countries with the correct continents
// Matches continents ID with countries
async function connectContinentAndCountries(dataSummary) {
    let countryForDatabase = [];

    //    Find a way to connect continents and countries
    for (let i = 0; i < continentData.length; i++) {
        const eachCountry = continentData[i];

        // Find match 
        let validCountry = matchCountries(eachCountry.country, dataSummary.country.name)

        if (validCountry.found) {
            // Find the continent ID
            const continentID = async () => {
                const continentInfo = dataSummary.continents;

                for (const cont of continentInfo.name) {
                    if (cont == eachCountry.continent) {
                        return continentInfo.id[continentInfo.name.indexOf(cont)]
                    } 
                }
                // If no match
                return null;
            }

            const id = await continentID();
            countryForDatabase.push({
                countryID: dataSummary.country.id[validCountry.countryIndex],
                countryName: eachCountry.country,
                continentName: eachCountry.continent,
                continentID: id,
                flag: dataSummary.country.flag[validCountry.countryIndex]
            })
        }

    }

    //    Return Country and respective ID
    return countryForDatabase;
}

// Exported function to server.js
// Handle processing
// Exported function to server.js
// Handle processing
export async function continentsAndCountriesDB(dbConnection) {
    try {
        // Gets data from MySql database
        // Continents and Countries
        const data = await countriesAndContinents(dbConnection);

        if (!data) {
            console.error("Error loading Continents and Countries from MySQL. (countries-continent.js)");
            throw new Error("Error loading data from MySQL");
        }

        // Connect the two databases/tables
        // Getting: Country & continent names and IDs together
        const databaseResult = await connectContinentAndCountries(data);

        
        if (!databaseResult) {
            console.error("Error getting data to put into the database. (countries-continent.js)");
            throw new Error("Error getting data for the database");
        }
        
        // Return country and continent name, id
        // Dictionary of ^
        return databaseResult; 

    } catch (error) {
        console.error("An error occurred:", error.message);
        throw error; // Re-throw the error for further handling, if needed
    }
}
