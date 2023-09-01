// Collect results on list of countries

// Private Imports
import { options, errorMessage } from "../general-api";
import { getApiResponse, DEFAULT } from "./soccerfootball-global";
import { printJSON } from "../api-football/global-functions";

const API_HOST = process.env.SFI_HOST;

// Collect only the essential information from the objects
function organiseCountries(countries) {
    const organisedCountries = [];

    for (let i = 0; i < countries.length; i++) {
        const {
            code: countryTag, 
            name: countryName,
        } = countries[i];

        organisedCountries.push(
            {[countryName]: countryTag}
        );
    };

    return organisedCountries;
};

// Gets result for the NPM test. Only takes the first response
function getResultForNPM(countries) {
    try {
        for (let i = 0; i < 1; i++) {
            const {code: [countryTag], name: [countryName]} = countries[i];
    
            return {
                [countryName]: countryTag
            }
        }

    } catch (error) {
        console.error("Problem getting result for NPM. (Countries.js)")
    }
}

// Print Results
function printCountries(countries) {
    for (let i = 0; i < countries.length; i++) {
        printJSON(countries[i], 100);
    }
}

// Get information on countries
// Purpose = database - npm - teams
export async function getCountryData(purpose) {
    const countryList = await getApiResponse(
        options(DEFAULT.countryList, API_HOST),
        errorMessage("SoccerFootball League List", "countries.js")
    );

    switch (purpose) {
        case "database":
            // Returns an array of objects - Country Name and Tag
            const countries = organiseCountries(countryList)

            printCountries(countries);            

            return countries;
        case "npm":
            return getResultForNPM(countryList);
        default:
            return "ERROR: Check the purpose parameter\n Make sure it's either: database - npm";
    }

    // printJSON(a, 10000);
}