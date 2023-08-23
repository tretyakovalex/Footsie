// Grab data on players

// Private Imports 
import { Options, ReturnResponse, ErrorMessage , Defaults, playerEndpoints } from './api-football-endpoints';
import { printJSON } from './global-functions';

// Get information on D.V.D.B for NPM Test
function GetNPMData(Player) {
    // Direct access to API Response JSON
    const playerDictionary = Player.player;
    const statisticDictionary = Player.statistics[0];

    // Object to hold donny information
    const data = {
        player: {
            name: playerDictionary.name ,
            "first name": playerDictionary.firstname,
            "second name": playerDictionary.lastname,
            age: playerDictionary.age,
            nationality: playerDictionary.nationality,
            injured: playerDictionary.injured,
            photo: playerDictionary.photo 
        },
        statistic: {
            team: statisticDictionary.team.name,
            appearences: statisticDictionary.games.appearences ,
            goals: statisticDictionary.goals.total ,
            season: statisticDictionary.league.season 
        }
    }

    // Return basic info and stats
    return data;
}

// Collect the total stats on each player
function TotalStats(Stats) {
    // Empty object to store player stats
    const totalStats = {
        games: {
            appearences: 0,
            minutes: 0,
        },
        attacking: {
            "total shots": 0,
            "shots on target": 0,
            "total passes": 0,
            "key passes": 0,
            "pass accuracy": 0,
            "attempted dribbles": 0,
            "successful dribbles": 0,
            "penalties scored": 0,
            "penalties missed": 0,
        },
        defensive: {
            "total tackles": 0,
            "total blocks": 0,
            "total interceptions": 0,
            "total duels": 0,
            "duels won": 0,
            "fouls committed": 0,
            "yellow card": 0,
            "red card": 0,
        }
    };

    // Go through each compeititon and get a total results on stats
    for (const teamStats of Stats) {
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



// Summarise player statistics
function CollectPlayerStats(Statistics) {
    const CollectiveStats = [];

    // Each Competition
    for (let i = 0; i < Statistics.length; i++) {
        // Direct access to each team in JSON
        const Team = Statistics[i];

        // Simplify data and add to Collection of stats
        CollectiveStats.push({
            Competition: {
                teamname: Team.team.name,
                competition: Team.league.name,
                "competition logo": Team.league.logo
            },
            stats: {
                games: {
                    appearences: Team.games.appearences,
                    minutes: Team.games.minutes,
                },
                attacking: {
                    "total shots": Team.shots.total,
                    "shots on target": Team.shots.on,
                    "total passes": Team.passes.total,
                    "key passes": Team.passes.key,
                    "pass accuracy": Team.passes.accuracy,
                    "attempted dribbles": Team.dribbles.attempts,
                    "successful dribbles": Team.dribbles.success,
                    "penalties scored": Team.penalty.scored,
                    "penalties missed": Team.penalty.missed,
                },
                defensive: {
                    "total tackles": Team.tackles.total,
                    "total blocks": Team.tackles.blocks,
                    "total interceptions":Team.tackles.interceptions,
                    "total duels": Team.duels.total,
                    "duels won": Team.duels.won,
                    "fouls committed": Team.fouls.comitted,
                    "yellow card": Team.cards.yellow,
                    "red card": Team.cards.red
                }
                }   
            }
        )
    }

    // Player plays for more than one team, then create a total stats object
    if (Statistics.length > 0) {
        const totalStats = TotalStats(CollectiveStats);
        CollectiveStats.push({"Total Stats": totalStats})
    }

    return CollectiveStats;
}

// DB Function: Basic info and Player statistics
function DBPlayerInfo(Players) {
    const ClubPlayerDatabase = {};

    for (let i = 0; i < Players.length; i++) {
        // Direct access to each player
        const PlayerObjPlayer = Players[i].player;
        const PlayerObjStats = Players[i].statistics;

        // Template Object
        ClubPlayerDatabase[i] = {
            PlayerInfo: {
                name: PlayerObjPlayer.name,
                "first name": PlayerObjPlayer.firstname,
                "second name": PlayerObjPlayer.lastname,
                age: PlayerObjPlayer.age,
                nationality: PlayerObjPlayer.nationality,
                height: PlayerObjPlayer.height,
                injured: PlayerObjPlayer.injured ,
                photo: PlayerObjPlayer.photo
            },
            Statistics: CollectPlayerStats(PlayerObjStats)
        }
    };

    // Return Objects of each player
    return ClubPlayerDatabase;
}


// V3 - Player statistics by Team ID
// Basic Player Information & Statistics
export async function PlayerStatistics(PARAMS) {
    try {
        const teamID = PARAMS != undefined ? PARAMS.TeamID : Defaults.teamID;
        const season = PARAMS != undefined ? PARAMS.season : Defaults.season;

        const response = await ReturnResponse(
            Options(playerEndpoints.playersURL, {
            team: teamID,
            season: season
        }), ErrorMessage("Player statistics from 'V3 - Player Statistics' ", "players.js"));

        // NPM Test - Returning for Test
        const npmResult = GetNPMData(response[0]);

       return {
            npmTest: npmResult,
            dbResult: DBPlayerInfo(response)
       }

       // console.log(JSON.stringify(DBPlayerInfo(response), null, 2));
    } catch (error) {
        console.error(error)
    }
}


