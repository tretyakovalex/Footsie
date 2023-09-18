import { printJSON } from "../../requests/api-football/global-functions";
import { getAllTeamInformation, getCountryAndContinentID } from "../../requests/organisation/league/teams";

// Organise Data for the databasde
function organiseResultForDatabase(currentLeague, currentCountry, leagueArray) {
    // Organise information for the database
    for (const teams of currentLeague.teams) {
        leagueArray.push({
            "team_name": teams.team_name,
            "team_emblem": teams.team_emblem,
            "country_id": currentCountry.country_id,
            "continent_id": currentCountry.continent_id,
        })
    };
}

// Combine API and Database Response Via Country
function combineResponseWithCountry(dbResponse, leagues) {
    const organisedLeagueResults = [];

    // Find Valid Countries & Leagues
    for (const currentLeague of leagues) {
        for (const currentCountry of dbResponse) {
            if (currentLeague.country == currentCountry.countryName)
            {
                organiseResultForDatabase(currentLeague, currentCountry, organisedLeagueResults);
            }
        }
    }

    // Returning an array of objects
    // {team name, team emblem, country id, continent id}
    return organisedLeagueResults;
}

// Fill the teams database with the information about each team
export async function fillTeamsDatabase(leagueConnection, continentsConnection) {
    // Reponse from my database
    const dbResponse = await getCountryAndContinentID(continentsConnection);
    // Response from API Football
    const apiResponse = await getAllTeamInformation();

    // Organise DB and API Response, to fill the MySQL Database
    const organisedResults = combineResponseWithCountry(dbResponse, apiResponse);

    // Query
    const query = 'INSERT INTO teams (team_name, team_emblem, country_id, continent_id) VALUES (?, ?, ?, ?)';


    // Push results into the database
    for (const team of organisedResults) {
        const data = [
            team.team_name,
            team.team_emblem, 
            team.country_id, 
            team.continent_id,
        ]

        try {
            // Insert results into the database
            await leagueConnection.query(query, data);
        } catch (err) {
            console.error("Problem with inserting into the teams database. (fill-teams.js)");
            console.error(err);
        }
    }

    // Print Completion
    console.log("League Database: Teams Filled.");
}

