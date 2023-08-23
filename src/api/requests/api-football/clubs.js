// Grab data on teams

// Private Imports
import { Options, ReturnResponse , ErrorMessage , teamEndpoints, Defaults } from './api-football-endpoints';
import { printJSON, StringCheck } from './global-functions';

// V3 - Team Informations
// Team API Football ID - Team Name - Country - Image - Tag
export async function TeamNameAndID(PARAMS) {
    try {
        const teamID = PARAMS !== undefined ? StringCheck(PARAMS) : '33';


        // Send Request
        const apiResponse = await ReturnResponse(
            Options(teamEndpoints.teamURL, {
                id: teamID
            }), ErrorMessage("Team name and ID from 'API-Football - V3 Team Information' ", "clubs.js"));

        // Error Handling - Check teams exist
        if (!apiResponse || apiResponse.length == 0) {
            throw new Error("Teams: No team information found");
        }

        // console.log(JSON.stringify(apiResponse[0], null, 2))
        const response = apiResponse[0];


        // Team Basic Information
        const TeamInfo = {
            id: response.team.id,
            name: response.team.name,
            tag: response.team.code,
            country: response.team.country,
            logo: response.team.logo
        };

        // NPM Test - Basic Man United Info
        return {
            npmTest: TeamInfo,
            dbResponse: "Empty" // TODO: Create database function 
        };
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
export async function TeamCoaches(ID) {
    try {
        const apiResponse = await ReturnResponse(Options(teamEndpoints.coachURL, {
            team: ID != undefined ? StringCheck(ID) : Defaults.teamID
        }), ErrorMessage("unable to find 'V3 - Coaches by Team ID'", "clubs.js"))

        // Direct Access to objects
        const response = apiResponse[0];

        // Put data into one object
        const CoachInfo = {
            name: response.name,
            nationality: response.nationality,
            image: response.photo,
            career: OrganiseCoachCareer(response.career)
        }
        // NPM Test - Basic information on coach
        return {
            npmTest: CoachInfo.career[0],
            dbResult: CoachInfo
        }

    } catch (error) {
        console.error(error);
    }
}

// V3 - Standings by Team ID
// League Information - PARAMS = {Year, TeamID}
// Use this function for specific teams
export async function TeamLeagueInfo(Club) {
    try {

        const season = Club != undefined ? StringCheck(Club.season) : Defaults.season;
        const TeamID = Club != undefined ? StringCheck(Club.TeamID) : Defaults.teamID;

        const apiResponse = await ReturnResponse(Options(teamEndpoints.leagueURL,{
            season: season,
            team: TeamID
        }), ErrorMessage("unable to get league information via 'V3 - Standings by Team ID' in ", "clubs.js"))
        // Specific responses
        const response = apiResponse;

        const cupStanding = response[1].league;
        const standingResponse = cupStanding.standings[0][0];

        // NPM Test
        // Get information about the team positions, form etc
        const TeamLeagueInfo = {
            "league name": cupStanding.name,
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

    const TeamName = TeamSquad.team.name
    const SquadLineUp = TeamSquad.players

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
    let squadAmount = 0;

    // Assign each player to their position
    for (let i = 0; i < Object.keys(Players).length; i++) {
        const Footballer = Players[String(i)].position;
        
        switch (Footballer) {
            case "Goalkeeper":
                goalkeeper++;
                squadAmount++;
                break
            case "Defender":
                defender++;
                squadAmount++;
                break
            case "Midfielder":
                midfielder++;
                squadAmount++;
                break
            case "Attacker":
                attacker++;
                squadAmount++;
                break
        }
    }

    return `\nSquad Amount: ${squadAmount}\nAttacker: ${attacker}\nMidfielder: ${midfielder}\nDefender: ${defender}\nGoalkeeper: ${goalkeeper}\n`
}

// V3 - Player Squad
// Team Squad
export async function TeamSquad(ID) {
    try {

        const TeamID = ID != undefined ? StringCheck(ID) : Defaults.teamID;

        // Receive a response from the API 
        const apiResponse = await ReturnResponse(Options(teamEndpoints.playerURL,{
            team: TeamID
        }), ErrorMessage("can't find squad players 'V3 - Player Squad' via ",));

        // Direct access to data
        const response = apiResponse[0];

        const Squad = TeamSquadBasicInfo(response);
        // printJSON(Squad, 1000)

        // Amount of players in a position | Att, Mid, Def, GK
        // const squadPositions = PlayersInPosition(Squad);

        // NPM Test - Check squad players T. Heation as example
        const TestSquad = Squad["0"];
        return TestSquad;

    } catch (error) {
        console.error(error);
    }
}
