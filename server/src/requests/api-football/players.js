// Grab data on players

// Private Imports
import {
  returnApiResponse,
  DEFAULTS,
  TEAM_EP,
  PLAYER_EP,
} from './api-football-endpoints';

import { options, errorMessage } from '../general-api';

import { printJSON, StringCheck } from './global-functions';

// NPM TEST

// NPM TEST - Get information on D.V.D.B for NPM Test
function formatPlayerForNPM(player) {
  // Direct access to API Response JSON
  const playerDictionary = player.player;
  const statisticDictionary = player.statistics[0];

  // Object to hold donny information
  const data = {
    player: {
      name: playerDictionary.name,
      'first name': playerDictionary.firstname,
      'second name': playerDictionary.lastname,
      age: playerDictionary.age,
      nationality: playerDictionary.nationality,
      injured: playerDictionary.injured,
      photo: playerDictionary.photo,
    },
    statistic: {
      team: statisticDictionary.team.name,
      appearences: statisticDictionary.games.appearences,
      goals: statisticDictionary.goals.total,
      season: statisticDictionary.league.season,
    },
  };

  // Return basic info and stats
  return data;
}

// NPM TEST - Find Donny within the list of players
function findDonnyForNPM(squad) {
  for (let i = 0; i < squad.length; i++) {
    const eachPlayer = squad[i];

    if (eachPlayer.player.name == 'D. van de Beek') {
      return i;
    }
  }
}

// Calculate the accumualative stats of the player
function totalPlayerStatistics(stats) {
  // Required information
  const totalStats = {
    games: {
      appearences: 0,
      minutes: 0,
    },
    attacking: {
      'total shots': 0,
      'shots on target': 0,
      'total passes': 0,
      'key passes': 0,
      'pass accuracy': 0,
      'attempted dribbles': 0,
      'successful dribbles': 0,
      'penalties scored': 0,
      'penalties missed': 0,
    },
    defensive: {
      'total tackles': 0,
      'total blocks': 0,
      'total interceptions': 0,
      'total duels': 0,
      'duels won': 0,
      'fouls committed': 0,
      'yellow card': 0,
      'red card': 0,
    },
  };

  // Loop through each competition and add up values to get total
  for (const teamStats of stats) {
    // Total appearences & minutes
    totalStats.games.appearences += teamStats.stats.games.appearences;
    totalStats.games.minutes += teamStats.stats.games.minutes;

    // Total attacking stats
    for (const category in teamStats.stats.attacking) {
      totalStats.attacking[category] += teamStats.stats.attacking[category];
    }

    // Total defensive stats
    for (const category in teamStats.stats.defensive) {
      totalStats.defensive[category] += teamStats.stats.defensive[category];
    }
  }

  // Return total stats
  return totalStats;
}

// Collecting statistics of each player
function collectPlayerStats(statistics) {
  // Hold all information on a player
  const CollectiveStats = [];

  // Loop through each competition a player participates in
  for (let i = 0; i < statistics.length; i++) {
    // Direct access to each team in JSON
    const Team = statistics[i];

    // Direct Access To Keys
    const { team: club, league: league, games: games } = Team;
    const {
      shots: shots,
      passes: passes,
      dribbles: dribbles,
      penalty: penalty,
    } = Team;
    const { tackles: tackles, duels: duels, fouls: fouls, cards: cards } = Team;

    // Statistics Collected and Added to 'CollectiveStats'
    CollectiveStats.push({
      Competition: {
        teamname: club.name,
        competition: league.name,
        'competition logo': league.logo,
      },
      stats: {
        games: {
          appearences: games.appearences,
          minutes: games.minutes,
        },
        attacking: {
          'total shots': shots.total,
          'shots on target': Team.shots.on,
          'total passes': passes.total,
          'key passes': passes.key,
          'pass accuracy': passes.accuracy,
          'attempted dribbles': dribbles.attempts,
          'successful dribbles': dribbles.success,
          'penalties scored': penalty.scored,
          'penalties missed': penalty.missed,
        },
        defensive: {
          'total tackles': tackles.total,
          'total blocks': tackles.blocks,
          'total interceptions': tackles.interceptions,
          'total duels': duels.total,
          'duels won': duels.won,
          'fouls committed': fouls.comitted,
          'yellow card': cards.yellow,
          'red card': cards.red,
        },
      },
    });
  }

  // If player plays for more than one team
  if (statistics.length > 0) {
    // Calculate total of all statistics
    const totalStats = totalPlayerStatistics(CollectiveStats);
    // Add statistics object to Collective Stats
    CollectiveStats.push({ 'Total Stats': totalStats });
  }

  // Returnn all statistics on a player
  return CollectiveStats;
}

// DB Function: Basic info and Player statistics
function squadPlayerStatistics(players) {
  // Hold information on all players
  const clubPlayerDatabase = {};

  // Loop through each player
  for (let i = 0; i < players.length; i++) {
    // Direct access to each player
    const playerObjPlayer = players[i].player;
    const playerObjStats = players[i].statistics;

    // Gather information on each player
    clubPlayerDatabase[i] = {
      playerInfo: {
        name: playerObjPlayer.name,
        'first name': playerObjPlayer.firstname,
        'second name': playerObjPlayer.lastname,
        age: playerObjPlayer.age,
        nationality: playerObjPlayer.nationality,
        height: playerObjPlayer.height,
        injured: playerObjPlayer.injured,
        photo: playerObjPlayer.photo,
      },
      // Grabs statistics of each player
      statistics: collectPlayerStats(playerObjStats),
    };
  }

  // Return All Players and Statistics
  return clubPlayerDatabase;
}

const API_HOST = process.env.AF_HOST;

// V3 - Player Statistic by League
// Basic Player Information & Statistics
export async function getAllLeaguePlayerStatistics(params, purpose) {
  try {
    // Check if parameters have been added or use default
    const identifier =
      params != undefined ? StringCheck(params.identifier) : DEFAULTS.leagueID;
    const season =
      params != undefined ? StringCheck(params.season) : DEFAULTS.season;

    const errorLog = purpose == "league" ? 
    "Player statistics from 'V3 - Player Statistics by League ID' " : "Problem with API Request to 'V3 - Player Statistics by League ID'";

    // Make API Request
    const response = await returnApiResponse(
      options(PLAYER_EP.playersURL, API_HOST, {
        [purpose]: identifier,
        season: season,
        page: 20
      }),
      errorMessage( errorLog, 'players.js'),
    );
    
    // TODO:
    //// NOTE WHEN CALLING THIS FUNCTION GOT TO KEEP CHANGING THE PAGE NUMBER TO GET ALL PLAYERS

    // return squadPlayerStatistics(response);
  } catch (error) {
    const errorLog = purpose == "league" ? 
    `Problem with API Request to "V3 - Player Statistics by League ID" - (players.js)` : 'Problem with API Request to "V3 - Player Statistics by Team ID" - (players.js)';

    console.error(errorLog)
    console.error(error);
  }
}