import { Text, ScrollView } from 'react-native';

// Teams player has played for
function PlayerTeamHistory({Player}) {
    return (
        <View style={{flex: 1, flexDirection: 'column', }}>
            <Text style={{fontSize: 16}}>Player History</Text>

            <ScrollView style={{flex: 1, backgroundColor: 'red'}}>
                {/* TODO: Player history goes here */}
            </ScrollView>
        </View>
    )
}

// Player attacking stats. Every team played for
function PlayerAttackingStats({Player}) {
    return (
        <View style={{flex: 1, flexDirection: 'column', padding: 5}}>
            <View style={{flex: 1}}>
                <Text style={{fontSize: 16}}>Attacking</Text>
            </View>

            <ScrollView style={{flex: 3, borderWidth: 1, borderColor: 'white'}}>
                {/* TODO: Attacking stats goes here */}
            </ScrollView>
        </View>
    )

}

// Player defensive stats. Every team played for 
function PlayerDefensiveStats({Player}) {
    return (
        <View style={{flex: 1, flexDirection: 'column', padding: 5}}>

            <View style={{flex: 1}}>
                <Text style={{fontSize: 16}}>Defensive</Text>
            </View>

            <ScrollView style={{flex: 3, borderWidth: 1, borderColor: 'white'}}>
                {/* TODO: Defensive stats goes here */}
            </ScrollView>
        </View>
    )
}

// Player stats for the current season (If actively playing)
function PlayerCurrentSeasonStats({Player}) {
    return (
        <View style={{flex: 1, flexDirection: 'column', }}>
            <Text style={{fontSize: 16}}>
                {Player.status.playing ? "Current Season" : Player.status['on loan'] ? "Current Season (On Loan)" : 
                Player.status['free agent'] ? "Last Season (Free Agent)" : "Last Season"}
            </Text>

            <ScrollView style={{flex: 1, backgroundColor: 'orange'}}>
                {/* TODO: Current Season Stats Goes Here */}
            </ScrollView>
        </View>
    )
}


export default function PlayerStatDisplay({Player}) {
    return (
        <View style={{flexDirection: 'column'}}>

            {/* Top Section: Player Team History */}
            <PlayerTeamHistory />

            {/* Middle Section: Attacking and Defensive Stats */}
            <View style={{flex: 3, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', backgroundColor: 'red'}}>
                <PlayerAttackingStats />
                <PlayerDefensiveStats />
            </View>

            {/* Bottom Section */}
            <PlayerCurrentSeasonStats />

        </View>
    )
}