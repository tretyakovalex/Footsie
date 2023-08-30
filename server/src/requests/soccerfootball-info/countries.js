// Collect results on list of countries

// Private Imports
import { options, errorMessage } from "../general-api";
import { getApiResponse, DEFAULT } from "./soccerfootball-global";

const API_HOST = process.env.SFI_HOST;


export const test = async () => {
    const a = await getApiResponse(
        options(DEFAULT, API_HOST , {Category: 'soccer'}),
        errorMessage("SoccerFootball League List", "countries.js")
        );
}