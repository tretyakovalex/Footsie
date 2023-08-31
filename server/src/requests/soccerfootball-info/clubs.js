// Collect information on teams

// Private Imports
import { options, errorMessage } from "../general-api";
import { getApiResponse, DEFAULT } from "./soccerfootball-global";
import { printJSON } from "../api-football/global-functions";

const API_HOST = process.env.SFI_HOST;
const fileName = "clubs.js";

// Get each club country code - No duplicates
function languageCodes(countries) {
    const languageCodesSet = new Set();

    for (let i = 0; i < countries.length; i++) {
        const { code: countryCode } = countries[i];
        languageCodesSet.add(countryCode);
    }

    const languageCodes = Array.from(languageCodesSet);
    return languageCodes;
}

// Get club languages - Serpate API Call
async function getLanguageCode(){
    try {
        const response = await getApiResponse(options(DEFAULT.languageCodes, API_HOST), errorMessage("Unable to get languages via 'listLanguages' ", fileName));

        return languageCodes(response);
    } catch (error) {
        console.error(error);
        console.error(`Error getting languages. ${fileName}`)
    }
};

// TODO:
//    More than 1 page
// Make the parameters for each API Call
async function makeParams() {
    const languageCode = await getLanguageCode();
    const countryCode = "all";
    const page = 1;

    const holdParams = [];

    for (let i = 0; i < languageCode.length; i++) {
        holdParams.push({
            [i]: {
                l: 'en_US',
                c: countryCode,
                p: page,
            }
        })
    }

    return holdParams;
};

// Collect the specific information needed - no duplicate countries
function gatherTeamInformation(countries) {
    const countryTeams = {};

    for (let i = 0; i < countries.length; i++) {
        const { name: teamName, country: countryOrigin } = countries[i];

        if (countryOrigin in countryTeams) {
            countryTeams[countryOrigin].push(teamName);
        } else {
            countryTeams[countryOrigin] = [teamName];
        }
    }

    return countryTeams;
}


// Print out sample of results
function printSampleResults(teamCollection) {
    for (const country in teamCollection) {
        console.log(`\nCountry Code: ${country}`);
        console.log(`Teams: ${teamCollection[country]}`);
        console.log("-----------------------");
    }
}


// TODO: 
//    Need country code (tag), language, page number
export async function getAllClubs() {
    try {
        const params = await makeParams();

        const pageLimits = [];

        for (let i = 0; i < params.length; i++) {
            // Create a closure to capture the correct value of i
            (async (index) => {
                setTimeout(async () => {
                    try {
                        // Make API request with different parameters
                        const response = await getApiResponse(options(DEFAULT.clubList, API_HOST, params[index][`${index}`]), errorMessage("Problems getting all club information via listTeams", "clubs.js"));

                        pageLimits.push(response.length);

                        const teamCollection = gatherTeamInformation(response);

                        console.log(pageLimits);
                        printSampleResults(teamCollection);
                    } catch (error) {
                        console.error(`Error in loop iteration ${index}:`, error);
                    }
                }, index * 2000); // Delay of index * 2 seconds (2000 milliseconds)
            })(i); // Pass the current value of i to the closure
        }

        console.log(`\n${pageLimits}\n`);

        return 1;

    } catch (error) {
        console.error(`Problem with getAllClubs Function. (${fileName}) ${error}`);
    }
};
