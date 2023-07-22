import { View, Text, ScrollView } from 'react-native';

import { DisplayPlayerClubHistory } from './design/player-club-history';
import { PlayerStatTemplate } from './design/player-stats';
import { PlayerCurrentTeam } from './design/player-current-season';

// Teams player has played for
// TODO: Design DisplayPlayerClubHistory
function PlayerTeamHistory({Player}) {
    return (
        <View style={{flex: 1, flexDirection: 'column', }}>
            <Text style={{fontSize: 16, color: 'white'}}>Player History</Text>

            <DisplayPlayerClubHistory PlayerClubs={Player.Teams} />
        </View>
    )
}


// Player attacking stats. Every team played for
function PlayerAttackingStats({Player}) {

    const AttackingStats = ["Goals", "Assists", "Shots on Target", "Key Passes", "Dribbles Completed", "Crosses"];


    return (
        <View style={{flex: 1, flexDirection: 'column', padding: 5}}>
            <View style={{flex: 1}}>
                <Text style={{fontSize: 16, color: 'white'}}>Attacking</Text>
            </View>

            <ScrollView horizontal={true} style={{flex: 3 }}>
                {/* TODO: Attacking stats goes here */}
                <PlayerStatTemplate PlayerStatistics={Player} PlayerStyle={true} Stats={AttackingStats}/>
            </ScrollView>
        </View>
    )

}

// Player defensive stats. Every team played for 
function PlayerDefensiveStats({Player}) {

    const DefensiveStats = ["Tackles", "Interceptions", "Clearances", "Aerial Duels Won", "Recoveries", "Fouls Committed"];

    return (
        <View style={{flex: 1, flexDirection: 'column', padding: 5}}>

            <View style={{flex: 1}}>
                <Text style={{fontSize: 16, color: 'white'}}>Defensive</Text>
            </View>

            <ScrollView horizontal={true} style={{flex: 3}}>
                {/* TODO: Defensive stats goes here */}
                <PlayerStatTemplate PlayerStatistics={Player} PlayerStyle={false} Stats={DefensiveStats} />
            </ScrollView>
        </View>
    )
}

// Player stats for the current season (If actively playing)
function PlayerCurrentSeasonStats({Player}) {

    const CurrentStats = ["Total Appearances", "Goals", "Assists", "Shots on Target", "Key Passes", "Dribbles Completed", "Crosses"]

    const currentSeasonStatus = Player?.status || {};

    return (
      <View style={{ flex: 1, flexDirection: 'column' }}>
        <Text style={{ fontSize: 16, color: 'white' }}>
          {currentSeasonStatus.playing
            ? "Current Season"
            : currentSeasonStatus["on loan"]
            ? "Current Season (On Loan)"
            : currentSeasonStatus["free agent"]
            ? "Last Season (Free Agent)"
            : "Last Season"}
        </Text>
        <ScrollView style={{ flex: 1}}>
          <PlayerCurrentTeam Player={Player} Stats={CurrentStats} />
        </ScrollView>
      </View>
    );
}


export function PlayerStatDisplay({PlayerStats}) {

    return (
        <View style={{flexDirection: 'column'}}>

            {/* Top Section: Player Team History */}
            <PlayerTeamHistory Player={PlayerStats} />
            

            {/* Middle Section: Attacking and Defensive Stats */}
            <View style={{flex: 3, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginTop: 20, marginBottom: 20}}>
                <PlayerAttackingStats Player={PlayerStats} />
                <PlayerDefensiveStats Player={PlayerStats} />
            </View>
            

            {/* Bottom Section */}
            <PlayerCurrentSeasonStats Player={PlayerStats} />
            

        </View>
    )
}