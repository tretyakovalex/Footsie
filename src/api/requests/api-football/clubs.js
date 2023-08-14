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

// Check if the parameter is a string else show an error
function StringCheck(StringInQuestion) {
    if (typeof StringInQuestion !== 'string') {
        throw new Error('ERROR Parameters: Must be a string.');
    }
}

// V3 - Team Informations
// Team API Football ID - Team Name - Country - Image - Tag
async function TeamNameAndID({URL, TeamID}) {
    try {
        // Checks TeamID is a string
        StringCheck(TeamID);

        // Send Request
        const apiResponse = await axios(paramOptions(URL, {id: TeamID}));

        if (!apiResponse || apiResponse.data.response.length == 0) {
            throw new Error("ERROR Teams: No team information found");
        }
        const response = apiResponse.data.response[0].team;

        // Team Basic Information
        const TeamInfo = {
            id: response.id,
            name: response.name,
            tag: response.code,
            country: response.country,
            logo: response.logo
        };

        // return TeamInfo;
        console.log('TeamInfo:', JSON.stringify(TeamInfo, null, 2));

    } catch (error) {
        console.error(error)
    }
}

// Organise the coach career
// TODO: Test this
function OrganiseCoachCareer({Career}) {

    const CareerHistory = {};

    if (Career.length >= 0) {
        for (let i = 0, clubs = Career.length - 1; i < Career.length; i++) {
            // Get club: Name, Logo, Start Date and End Date
            CareerHistory[clubs] = {
                name: Career[clubs].name,
                logo: Career[clubs].logo,
                "start date": Career[clubs].start,
                "end date": Career[clubs].end
            }

            clubs--;
        }
    }

    return CareerHistory;
}

// V3 - Coaches by Team ID
// Team Coach - Need TeamID for this to work
// TODO: ADD COACH CAREER
async function TeamCoaches({URL, TeamID}) {
    try {
        // Checks TeamID is a string
        StringCheck(TeamID);

        const apiResponse = await axios(paramOptions(URL, {team: TeamID}))
        const response = apiResponse.data.response[1];
        // Put data into one object
        const CoachInfo = {
            name: response.name,
            nationality: response.nationality,
            image: response.photo,
            career: OrganiseCoachCareer(response.career)
        }

        console.log(JSON.stringify(CoachInfo, null, 2))

    } catch (error) {
        console.error(error);
    }
}

// V3 - Standings by Team ID
// League Information - PARAMS = {Year, TeamID}
// TODO: Reorganised the manual parameters and organise access to information
export async function TeamLeagueInfo(ManuallyEnteredParameters) {

    try {
        // League
        let numberRepresentation = 0;

        if (ManuallyEnteredParameters.Competition == "cup") {
            // Competition
            numberRepresentation = 1;
        }

        // Params have to be a string
        StringCheck(ManuallyEnteredParameters.PARAMS.year);
        StringCheck(ManuallyEnteredParameters.PARAMS.teamID)

        const apiResponse = await axios(paramOptions(ManuallyEnteredParameters.URL, {season: ManuallyEnteredParameters.PARAMS.year, team: ManuallyEnteredParameters.PARAMS.teamID}))
        // Specific responses
        const response = apiResponse.data.response[numberRepresentation].league;


        const standingResponse = response.standings[0][0];

        console.log(JSON.stringify(standingResponse, null, 2))

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

        console.log(JSON.stringify(TeamLeagueInfo, null, 2))
    } catch (error) {
        console.error(error)
    }
}
