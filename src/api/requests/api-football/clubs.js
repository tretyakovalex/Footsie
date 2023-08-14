// The file is for information on teams

// Public Imports
import axios from 'axios';

// Constants
const Header = {
    key: '060abebd44msheb1fbe6d87b8111p1c9872jsnd77b5a96aa2e',
    host: 'api-football-v1.p.rapidapi.com'
}

// Request Information
// No Parameters
const noParamOptions = (URL) => ({
    method: 'GET', 
    url: URL,
    headers: {
        'X-RapidAPI-Key': Header.key,
        'X-RapidAPI-Host': Header.host
    },
})
// With Parameters
const paramOptions = (URL, PARAMS) => ({
    method: 'GET', 
    url: URL,
    params: PARAMS,
    headers: {
        'X-RapidAPI-Key': Header.key,
        'X-RapidAPI-Host': Header.host
    },
})


function StringCheck(StringInQuestion) {
    if (typeof StringInQuestion !== 'string') {
        throw new Error('ERROR Parameters: Must be a string.');
    }
}

// V3 - Team Informations
// Team API Football ID - Team Name - Country - Image - Tag
async function TeamNameAndID(URL, TeamID) {
    try {
        // Checks TeamID is a string
        StringCheck(TeamID);

        // Send Request
        const apiResponse = await axios(paramOptions(URL, {id: TeamID}));
        const response = apiResponse.data.response.team

        // Team Basic Information
        const TeamInfo = {
            id: response.id,
            name: response.name,
            tag: response.code,
            country: response.country,
            logo: response.logo
        };

        return TeamInfo;

    } catch (error) {
        console.error(error)
    }
}

// V3 - Coaches by Team ID
// Team Coach - Need TeamID for this to work
async function TeamCoaches(URL, TeamID) {
    try {
        // Checks TeamID is a string
        StringCheck(TeamID);

        const apiResponse = await axios(paramOptions(URL, {team: TeamID}))
        const response = apiResponse.data.response;
        const CoachInfo = {
            name: response.name,
            nationality: response.nationality
        }

        return CoachInfo;

    } catch (error) {
        console.error(error);
    }
}

// V3 - Standings by Team ID
// League Information - PARAMS = {Year, TeamID}
async function TeamLeagueInfo(URL, PARAMS, Competition) {
    try {
        // League
        let numberRepresentation = 0;

        if (Competition == "cup") {
            // Competition
            numberRepresentation = 1;
        }

        // Params have to be a string
        StringCheck(PARAMS.year);
        StringCheck(PARAMS.teamID)

        const apiResponse = await axios(paramOptions(URL, {season: PARAMS.year, team: PARAMS.teamID}))
        // Specific responses
        const response = apiResponse.data.response[numberRepresentation].league;
        const standingResponse = response.standings[numberRepresentation];

        // Get information about the team positions, form etc
        const TeamLeagueInfo = {
            "league name": response.name,
            rank: standingResponse.rank,
            points: standingResponse.points,
            form: standingResponse.form,
            win: standingResponse.all.win,
            draw: standingResponse.all.draw,
            loss: standingResponse.all.loss,
            gf: standingResponse.all.goals.for,
            ga: standingResponse.all.goals.against,
            gd: standingResponse.all.goals.for -  standingResponse.all.goals.against
        }

        return TeamLeagueInfo;
    } catch (error) {
        console.error(error)
    }
}
