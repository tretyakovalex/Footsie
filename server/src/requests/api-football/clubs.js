// Grab data on teams

// Private Imports
import {
  options,
  returnApiResponse,
  errorMessage,
  TEAM_EP,
  DEFAULTS,
} from './api-football-endpoints';
import { printJSON, StringCheck } from './global-functions';

// V3 - Team Informations
// Team API Football ID - Team Name - Country - Image - Tag
export async function getBasicTeamDetails(params) {
  try {
    // Check if parameter has been declared else use defaults
    const teamID = params !== undefined ? StringCheck(params) : '33';

    // Send Request
    const apiResponse = await returnApiResponse(
      options(TEAM_EP.teamURL, {
        id: teamID,
      }),
      errorMessage(
        "Team name and ID from 'API-Football - V3 Team Information' ",
        'clubs.js',
      ),
    );

    // console.log(JSON.stringify(apiResponse[0], null, 2))
    const response = apiResponse[0];

    // Team Basic Information
    const teamInfo = {
      id: response.team.id,
      name: response.team.name,
      tag: response.team.code,
      country: response.team.country,
      logo: response.team.logo,
    };

    // NPM Test - Basic Man United Info
    return {
      npmTest: teamInfo,
      dbResponse: 'Empty', // TODO: Create database function
    };
    // console.log('TeamInfo:', JSON.stringify(TeamInfo, null, 2));
  } catch (error) {
    console.error(error);
  }
}

// Organise the coach career
function organiseCoachCareer(career) {
  // Initialize an empty object
  const careerHistory = {};

  // Go through coaches career
  for (let i = career.length - 1; i >= 0; i--) {
    const club = career[i];
    careerHistory[i] = {
      name: club.team.name,
      logo: club.team.logo,
      'start date': club.start,
      'end date': club.end,
    };
  }

  // Return Coach History
  return careerHistory;
}

// V3 - Coaches by Team ID
// Need TeamID for this to work
export async function getCoachHistory(id) {
  try {
    // Check if parameter has been declared else use defaults
    const apiResponse = await returnApiResponse(
      options(TEAM_EP.coachURL, {
        team: id != undefined ? StringCheck(id) : DEFAULTS.teamID,
      }),
      errorMessage("unable to find 'V3 - Coaches by Team ID'", 'clubs.js'),
    );

    // Direct Access to objects
    const response = apiResponse[0];

    // Put data into one object
    const coachInfo = {
      name: response.name,
      nationality: response.nationality,
      image: response.photo,
      career: organiseCoachCareer(response.career),
    };
    // NPM Test - Basic information on coach
    return {
      npmTest: coachInfo.career[0],
      dbResult: coachInfo,
    };
  } catch (error) {
    console.error(error);
  }
}

// V3 - Standings by Team ID
// League Information - PARAMS = {Year, TeamID}
// Use this function for specific teams
export async function getClubStanding(club) {
  try {
    // Check if parameter has been declared else use defaults
    const season =
      club != undefined ? StringCheck(club.season) : DEFAULTS.season;
    const teamID =
      club != undefined ? StringCheck(club.TeamID) : DEFAULTS.teamID;

    const apiResponse = await returnApiResponse(
      options(TEAM_EP.leagueURL, {
        season: season,
        team: teamID,
      }),
      errorMessage(
        "unable to get league information via 'V3 - Standings by Team ID' in ",
        'clubs.js',
      ),
    );
    // Specific responses
    const response = apiResponse;

    const cupStanding = response[1].league;
    const standingResponse = cupStanding.standings[0][0];

    // NPM Test
    // Get information about the team positions, form etc
    const teamLeagueInfo = {
      'league name': cupStanding.name,
      rank: standingResponse.rank,
      points: standingResponse.points,
      form: standingResponse.form,
      win: standingResponse.all.win,
      draw: standingResponse.all.draw,
      loss: standingResponse.all.loss,
      gf: standingResponse.all.goals.for,
      ga: standingResponse.all.goals.against,
      gd: standingResponse.all.goals.for - standingResponse.all.goals.against,
    };

    return teamLeagueInfo;
    // console.log(JSON.stringify(TeamLeagueInfo, null, 2))
  } catch (error) {
    console.error(error);
  }
}

// Collect Team Squad Basic Information
function basicPlayerDetails(teamSquad) {
  // Hold list of players
  const squad = {};

  // Direct access to team name and player information
  const teamName = teamSquad.team.name;
  const squadLineUp = teamSquad.players;

  for (let i = 0; i < squadLineUp.length; i++) {
    // Add players to 'empty' squad
    const players = squadLineUp[i];

    squad[i] = {
      'Plays For': teamName,
      name: players.name,
      age: players.age,
      number: players.number,
      position: players.position,
      photo: players.photo,
    };
  }

  // Return a squad full of  players
  return squad;
}

// Calculate how many players there are in each position
function playersInPositionCount(players) {
  // General stats on the amount of players in a position
  let attacker = 0;
  let defender = 0;
  let midfielder = 0;
  let goalkeeper = 0;
  let squadAmount = 0;

  // Assign each player to their position
  for (let i = 0; i < Object.keys(players).length; i++) {
    const footballer = players[String(i)].position;

    switch (footballer) {
      case 'Goalkeeper':
        goalkeeper++;
        squadAmount++;
        break;
      case 'Defender':
        defender++;
        squadAmount++;
        break;
      case 'Midfielder':
        midfielder++;
        squadAmount++;
        break;
      case 'Attacker':
        attacker++;
        squadAmount++;
        break;
    }
  }

  return `\nSquad Amount: ${squadAmount}\nAttacker: ${attacker}\nMidfielder: ${midfielder}\nDefender: ${defender}\nGoalkeeper: ${goalkeeper}\n`;
}

// V3 - Player Squad
// Team Squad
export async function getSquadPlayers(id) {
  try {
    // Check if ID has been given a value or use Defaults
    const teamID = id != undefined ? StringCheck(id) : DEFAULTS.teamID;

    // Receive a response from the API
    const apiResponse = await returnApiResponse(
      options(TEAM_EP.playerURL, {
        team: teamID,
      }),
      errorMessage("can't find squad players 'V3 - Player Squad' via "),
    );

    // Direct access to data
    const response = apiResponse[0];

    // printJSON(response, 5000);

    // List of squad players and basic infromation
    const squad = basicPlayerDetails(response);

    // printJSON(squad, 1000)

    // Amount of players in a position | Att, Mid, Def, GK
    // const squadPositions = playersInPositionCount(Squad);

    // NPM Test - Check squad players T. Heation as example
    // TODO: CHECK THIS RESPONSE
    const playerToTestNPM = squad['0'];

    return {
      npmTest: playerToTestNPM,
      dbEntry: squad,
    };
  } catch (error) {
    console.error(error);
  }
}
