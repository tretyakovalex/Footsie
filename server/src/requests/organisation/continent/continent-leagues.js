// Public Imports

// Private Imports
import { getCompetitionNameandCountries } from "../../api-football/competitions";
import { continent_countries } from "../../../fill-database/countries";
import { printJSON } from "../../api-football/global-functions";


// Get country location for cups and leagues
export async function competitionLocation() {
    const cups = await getCompetitionNameandCountries();
    const leagues = await getCompetitionNameandCountries("league");
}