import { competitionLocation } from "../../requests/organisation/continent/continent-leagues";
import { printJSON } from "../../requests/api-football/global-functions";

const cupQuery = 'INSERT INTO international_tournaments ( tournament_name, continent_id, tournament_emblem, country_id) VALUES (?,?,?,?)';
const leagueQuery = 'INSERT INTO league (league_name, continent_id, country_id, league_emblem) VALUES (?,?,?,?)';


function databaseRequest(comp, tempArray) {
    // Push each country into an array
    for (let i = 0; i < comp.length; i++) {
        tempArray.push({
            country: comp[i].country_id,
            competition: comp[i].competition_name,
            continent: comp[i].continent_id,
            emblem: comp[i].competition_emblem
        })
    }
}

// Fill the database
async function fillDatabase(competitions, compName, dbConnection) {
    for (let i = 0; i < competitions.length; i++) {
        let competitionOrder;
        if (compName == "cup") {
            competitionOrder = [
                competitions[i].competition,
                competitions[i].continent,
                competitions[i].emblem,
                competitions[i].country
            ];
        } else if (compName == "league") {

            competitionOrder = [
                competitions[i].competition,
                competitions[i].continent,
                competitions[i].country,
                competitions[i].emblem
            ];
        } else {
            console.error(`Error with the ordering of INSERTS. Check that you've placed them in the right order, according to your MySQL database. Via (fillCompetitions.js)`);
            break;
        }
        
        try {
            await dbConnection.query(compName == 'cup' ? cupQuery : leagueQuery, competitionOrder);
        } catch (err) {
            console.error(`Problem with adding ${competitions[i].competition} to the database\n${err}`);
        }
    }

    console.log(`Inserted ${compName}`);
}

function prepareCompetitiionForDatabase(countryList, tempArray) {
    for (let i = 0; i < countryList.length; i++) {
        const country = Object.keys(countryList[i]);

        databaseRequest(countryList[i][country], tempArray)
    }
}

// Fill the international tournaments and league database
export const competitionFill = async (dbConnection) => {
    try {
        // Get formatted league and cup information
        const compResult = await competitionLocation(dbConnection);
        // Place all results into an array
        const cupArray = [];
        const leagueArray = [];

        // Place each tournament into an array, easier INSERT
        prepareCompetitiionForDatabase(compResult.tournament, cupArray);
        prepareCompetitiionForDatabase(compResult.leagues, leagueArray);

        // Fill database
        await fillDatabase(cupArray, "cup", dbConnection);
        setTimeout(async () => {
            await fillDatabase(leagueArray, "league", dbConnection);
        }, 2000);
    } catch (err) {
        console.error(`Problem with API calls. Via (fillCompetitions.js)\n${err}`);
    }
}