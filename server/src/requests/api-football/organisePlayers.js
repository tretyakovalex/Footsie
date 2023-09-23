// Organise the statistics of each player
function organisePlayerStatistics(statistics) {

}


// Gather information on the players
function gatherPlayerInformation(players, squadLineup) {
    const playerData = [];
  
    for (const eachPlayer of players) {
      const playerName = `${eachPlayer.player.firstname} ${eachPlayer.player.lastname}`;
  
      // Find the player in squadLineup by matching the name
      const matchingPlayer = squadLineup.find(player => player.players.some(p => p.name === playerName));
  
      playerData.push({
        firstname: eachPlayer.player.firstname || "N/A", 
        lastname: eachPlayer.player.lastname || "N/A", 
        country_id: eachPlayer.player.nationality || "N/A", 
        age: eachPlayer.player.age || "N/A", 
        height: eachPlayer.player.height ? (parseFloat(eachPlayer.player.height) * 0.0328084) : "N/A", 
        role: eachPlayer.statistics.games.position || "N/A", 
        team: eachPlayer.statistics.team.id || "N/A", 
        kit_number: matchingPlayer ? matchingPlayer.players.find(p => p.name === playerName).number || "N/A" : "N/A", // Add kit number if found, otherwise "N/A"
        injured: eachPlayer.player.injured || "N/A", 
        player_url: eachPlayer.player.photo || "N/A", 
      });
    }
  
    return playerData;
}
  
  

// Gather Team IDs - Go through all teams in league
function getTeamID(apiResponse) {
    const teamIdentifiers = [];

    for (const player of apiResponse) {
        const teamID = player.statistics.team.id;
        
        // Check if teamID is not already in teamIdentifiers
        if (!teamIdentifiers.includes(teamID)) {
            teamIdentifiers.push(teamID);
        }
    }

    return teamIdentifiers;
}
