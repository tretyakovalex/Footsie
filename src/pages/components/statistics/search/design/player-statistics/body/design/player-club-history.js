import { Text, Image, View, ScrollView } from 'react-native';

// Display team
// TODO: Add logos to the team
function TeamTemplate({Team}) {
    return (
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around'}}>
            <Text>{Team.Joined} - {Team.Left}</Text>
            

            <View style={{flexDirection: 'row'}}>
                <Image
                    source={{uri: Team.TeamLogo}} 
                    style={{height: 'auto', width: 30}}
                />
                <Text>{Team.TeamName}</Text>
            </View>
        </View>
    )
}

// Map through and display team
export default function DisplayPlayerClubHistory({PlayerClubs}) {
    return (
        <View>
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around'}}>
                <Text>Years</Text>
                <Text>Team</Text>
            </View>

            <ScrollView>
                {(PlayerClubs.map((team, index) => (
                    <TeamTemplate
                        key={index}
                        Team={team}
                    />
                )))}
            </ScrollView>
        </View>
    )
}