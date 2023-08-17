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

// Information for database
function DBPlayerInfo(Players) {
    
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
        // return GetDonnyData(response[0])

        // console.log(JSON.stringify(response[0], null, 2))


    } catch (error) {
        console.error(error)
    }
}


