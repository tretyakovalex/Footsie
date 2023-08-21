// Grab data on teams

// Public Imports
import axios from 'axios';

// Private Imports
import { Options } from './api-football-endpoints';

// TODO:
//     Add error handling & No result cases

// Check parameter is a string 
function StringCheck(StringInQuestion) {
    if (typeof StringInQuestion !== 'string') {
        throw new Error('ERROR Parameters: Must be a string.');
    }
}

// V3 - Team Informations
// Team API Football ID - Team Name - Country - Image - Tag
export async function TeamNameAndID({URL, TeamID}) {
    try {
        // Checks TeamID is a string
        StringCheck(TeamID);

        // Send Request
        const apiResponse = await axios(Options(URL, {id: TeamID}));

        // Error Handling - Check teams exist
        if (!apiResponse || apiResponse.data.response.length == 0) {
            throw new Error("ERROR Teams: No team information found");
        }
        // Direct access to objecvt 
        const response = apiResponse.data.response[0].team;

        // Team Basic Information
        const TeamInfo = {
            id: response.id,
            name: response.name,
            tag: response.code,
            country: response.country,
            logo: response.logo
        };

        // NPM Test - Basic Man United Info
        return TeamInfo;
        // console.log('TeamInfo:', JSON.stringify(TeamInfo, null, 2));

    } catch (error) {
        console.error(error)
    }
}

// Organise the coach career
function OrganiseCoachCareer(Career) {
    // Initialize an empty object
    const CareerHistory = {}; 

    // Go through coaches career
    for (let i = Career.length - 1;  i >= 0; i--) {
        const club = Career[i];
        CareerHistory[i] = {
            'name': club.team.name,
            'logo': club.team.logo,
            "start date": club.start,
            "end date": club.end
        };
    }

    // Return Coach History
    return CareerHistory;
}


// V3 - Coaches by Team ID
// Need TeamID for this to work
export async function TeamCoaches({URL, TeamID}) {
    try {
        // Checks TeamID is a string
        StringCheck(TeamID);

        const apiResponse = await axios(Options(URL, {team: TeamID}))
        // Direct access to coach information
        const response = apiResponse.data.response[1];

        // Put data into one object
        const CoachInfo = {
            name: response.name,
            nationality: response.nationality,
            image: response.photo,
            career: OrganiseCoachCareer(response.career)
        }

        // NPM Test - Basic information on coach
        return CoachInfo.career[0]
        // console.log(JSON.stringify(CoachInfo.career[0], null, 2))

    } catch (error) {
        console.error(error);
    }
}

// V3 - Standings by Team ID
// League Information - PARAMS = {Year, TeamID}
export async function TeamLeagueInfo(ObjParameter) {

    try {
        // League
        let numberRepresentation = 0;

        if (ObjParameter.Competition == "cup") {
            // Competition
            numberRepresentation = 1;
        }

        // Params have to be a string
        StringCheck(ObjParameter.PARAMS.year);
        StringCheck(ObjParameter.PARAMS.teamID)

        const apiResponse = await axios(Options(ObjParameter.URL, {season: ObjParameter.PARAMS.year, team: ObjParameter.PARAMS.teamID}))
        // Specific responses
        const response = apiResponse.data.response[numberRepresentation].league;


        const standingResponse = response.standings[0][0];

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

        return TeamLeagueInfo
        // console.log(JSON.stringify(TeamLeagueInfo, null, 2))
    } catch (error) {
        console.error(error)
    }
}


// Collect Team Squad Basic Information
function TeamSquadBasicInfo(TeamSquad) {
    // Empty Object to hold squad players and basic information
    const Squad = {};

    const TeamName = TeamSquad[0].team.name
    const SquadLineUp = TeamSquad[0].players

    for (let i = 0; i < SquadLineUp.length; i++) {
        // Add players to 'empty' squad
        const Players = SquadLineUp[i];
        Squad[i] = {
                "Plays For":  TeamName,
                name: Players.name,
                age: Players.age,
                number: Players.number,
                position: Players.position,
                photo: Players.photo 
            }
    }

    // Return a squad full of  players
    return Squad
}

function PlayersInPosition(Players) {
    // General stats on the amount of players in a position
    let attacker = 0;
    let defender = 0;
    let midfielder = 0;
    let goalkeeper = 0;

    // Assign each player to their position
    for (let i = 0; i < Object.keys(Players).length; i++) {
        const Footballer = Players[String(i)].position;
        
        switch (Footballer) {
            case "Goalkeeper":
                goalkeeper++;
                break
            case "Defender":
                defender++;
                break
            case "Midfielder":
                midfielder++;
                break
            case "Defender":
                attacker++;
                break
        }
    }
}

// V3 - Player Squad
// Team Squad
export async function TeamSquad({URL, TeamID}) {
    try {
        // Check TeamID is a string
        StringCheck(TeamID);

        // Receive a response from the API 
        const apiResponse = await axios(Options(URL, {
            team: TeamID,
        }));
        // Direct access to data
        const response = apiResponse.data.response;

        const Squad = TeamSquadBasicInfo(response);

        // Amount of players in a position | Att, Mid, Def, GK
        const squadPositions = PlayersInPosition(Squad);

        // NPM Test - Check squad players T. Heation as example
        const TestSquad = Squad["0"];
        return TestSquad;

    } catch (error) {
        console.error(error);
    }
}
