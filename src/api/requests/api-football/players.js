// The file is for information on players

// Public Imports
import axios from 'axios';

// Constants
const Header = {
    key: '060abebd44msheb1fbe6d87b8111p1c9872jsnd77b5a96aa2e',
    host: 'api-football-v1.p.rapidapi.com'
}

// Request Information
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

// Donny Van De Beek For Testing - npm test
function GetDonnyData(Player) {
    const playerDictionary = Player.player;
    const statisticDictionary = Player.statistics[0];

    const DonnyData = {
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

    return DonnyData;
}

// Collect the total stats on each player
function TotalStats(Stats) {
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

    for (const teamStats of Stats) {
        totalStats.games.appearences += teamStats.stats.games.appearences;
        totalStats.games.minutes += teamStats.stats.games.minutes;

        for (const category in teamStats.stats.attacking) {
            totalStats.attacking[category] += teamStats.stats.attacking[category];
        }

        for (const category in teamStats.stats.defensive) {
            totalStats.defensive[category] += teamStats.stats.defensive[category];
        }
    }

    return totalStats;
}



// Information for database - Loop through statistics
function CollectPlayerStats(Statistics) {
    const CollectiveStats = [];

    // Each Competition
    for (let i = 0; i < Statistics.length; i++) {
        const Team = Statistics[i];

        CollectiveStats.push({
            "Competition": {
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

    // LEFT OFF HERE
    if (Statistics.length > 0) {
        const totalStats = TotalStats(CollectiveStats);
        CollectiveStats.push({"Total Stats": totalStats})
    }

    return CollectiveStats;
}

// Information for database
function DBPlayerInfo(Players) {
    const ClubPlayerDatabase = {};

    for (let i = 0; i < Players.length; i++) {
        const PlayerObjPlayer = Players[i].player;
        const PlayerObjStats = Players[i].statistics;

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

    return ClubPlayerDatabase;
}


// V3 - Player statistics by Team ID
// Basic Player Information & Statistics
export async function PlayerStatistics({URL, PARAMS}) {

    try {
        const apiResponse = await axios(paramOptions(URL, {
            team: PARAMS.teamID,
            season: PARAMS.season
        }));
    
        const response = apiResponse.data.response;

        // Returning for Test
       return GetDonnyData(response[0])

       // console.log(JSON.stringify(DBPlayerInfo(response), null, 2));
    } catch (error) {
        console.error(error)
    }
}


