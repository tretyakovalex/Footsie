/* Call this function when getting statistics from Player Squads
Gets all competition information 
*/

import { printJSON } from "./global-functions";

// Organise the statistics of each player
export function organisePlayerStatistics(statistics) {
    if (!statistics || !Array.isArray(statistics)) {
        console.error("Invalid statistics data");
        return [];
    }

    // Hold player statistics
    const playerStatistics = [];

    // Go through statisitcs to get the information required
    for (const stats of statistics) {

        // Destructure the properties you need
        const { games, shots, goals, passes, tackles, duels, dribbles, fouls, cards, penalty
        } = stats;

        // Basic Stats
        const basicStats = {
            appearances: games.appearences ?? 0,
            "minutes played": games.minutes ?? 0,
            captain: games.captain ?? false,
            "total cards": (cards.yellow ?? 0) + (cards.red ?? 0),
            "yellow cards": cards.yellow ?? 0,
            "red cards": cards.red ?? 0,
        };

        // Attacking Stats
        const attackingStats = {
            "total shots": shots.total ?? 0,
            "shots on target": shots.on ?? 0,
            "total goals": goals.total ?? 0,
            "conceded": goals.conceded ?? 0,
            "assists": goals.assists ?? 0,
            "total dribbles": (dribbles.attempts ?? 0) + (dribbles.success ?? 0),
            "attempted dribbles": dribbles.attempts ?? 0,
            "successful dribbles": dribbles.success ?? 0,
            "total passes": passes.total ?? 0,
            "key passes": passes.key ?? 0,
            "pass accuracy": passes.accuracy ?? 0,
            "total penalties": (penalty.scored ?? 0) + (penalty.missed ?? 0),
            "penalties scored": penalty.scored ?? 0,
            "penalties missed": penalty.missed ?? 0
        };

        // Defensive Stats
        const defensiveStats = {
            "total tackles": tackles.total ?? 0,
            "total blocks": tackles.blocks ?? 0,
            "total interceptions": tackles.interceptions ?? 0,
            "total duels": duels.total ?? 0,
            "duels won": duels.won ?? 0,
            "fouls committed": fouls.committed ?? 0,
            "fouls drawn": fouls.drawn ?? 0,
            "saves": goals.saves ?? 0,
        };

        playerStatistics.push({
            [stats.league.name]: {
                basic: basicStats,
                attacking: attackingStats,
                defensive: defensiveStats
            }
        });
    }

    // Return Player Statistics
    return playerStatistics;
}

// Get and add the players kit number to the player
export function getPlayerKitNumber(teamPlayers, squadLineup) {

    /*
    const aa = [];
    const bb = [];

    for (const a of teamPlayers) {
        aa.push(a.fullname);
    }
    for (const b of squadLineup) {
        bb.push(b.name);
    }

    console.log(aa)
    console.log(bb)
    */

    /*
    // Loop through each player in squadLineup
    for (const detailedPlayerStats of teamPlayers) {
        a.push()
      // Find the matching player in squadLineup by name
      for (const basicPlayerStats of squadLineup) {
        console.log(`${basicPlayerStats.name} \n\n`)
        if (basicPlayerStats.name == detailedPlayerStats.fullname) {
            console.log(`Matched Names: ${detailedPlayerStats.fullname} and ${basicPlayerStats.name}`)
            detailedPlayerStats.kit_number = basicPlayerStats.number || "N/A";
        }
        
      }
    }*/
}

// Call this function while getting all players in the league
// Gather information on the players
export function gatherPlayerInformation(players) {
    // Hold each players basic information
    const playerData = [];

    // Testing for duplicates
    const original = [];
    const duplicates = [];
  
    // Go through each player
    for (const eachPlayer of players) {

        const name = eachPlayer.player.name;

        if (original.includes(name)) {
            duplicates.push(name);
        } else {
            original.push(name);
        }
  
      // Push the required information into playerData
      playerData.push({
        fullname: eachPlayer.player.name || "N/A",
        firstname: eachPlayer.player.firstname || "N/A", 
        lastname: eachPlayer.player.lastname || "N/A", 
        country_id: eachPlayer.player.nationality || "N/A", 
        age: eachPlayer.player.age || "N/A", 
        height: eachPlayer.player.height ? (parseFloat(eachPlayer.player.height) * 0.0328084) : "N/A", 
        role: eachPlayer.statistics[0].games.position || "N/A", 
        team: eachPlayer.statistics[0].team.id || "N/A", 
        kit_number: "", // Use a function to add kit number
        injured: eachPlayer.player.injured ? "Injured" : "Fit", 
        player_url: eachPlayer.player.photo || "N/A", 
      });
    }
      
    // Return an array full of objects
    // Each player basic information
    return playerData;
}
  
  
// Call this function after getting all players in a league
// Gather Team IDs - Go through all teams in league
export function getTeamID(leagueAndPlayers) {
    // Hold each team ID
    const teamIdentifiers = [];

    // Loop through each player to get their team ID
    for (const league of leagueAndPlayers) {
        for (const players of league.players) {
            // Direct access to ID
            const teamID = players.team;
            
            // Check if teamID is not already in teamIdentifiers
            if (!teamIdentifiers.includes(teamID)) {
                // If not then push to array
                teamIdentifiers.push(teamID);
            }
        }
    }

    // Return all Team IDs
    return teamIdentifiers;
}
