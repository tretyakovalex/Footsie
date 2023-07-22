import { Text, Image, View, ScrollView } from 'react-native';

// Display team
// TODO: Add logos to the team
function TeamTemplate({Team}) {
    return (
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', marginTop: 5}}>
            <Text style={{color: 'white', textAlign: 'center', marginLeft: 60, marginRight: 20}}>{Team.Joined} - {Team.Left}</Text>
            

            <View style={{flexDirection: 'row', flex: 1, justifyContent: 'flex-start', marginLeft: 70}}>
                <Image
                    source={{uri: Team.TeamLogo}} 
                    style={{height: 'auto', width: 20, marginLeft: 10}}
                />
                <Text style={{color: 'white', marginLeft: 10}}>{Team.TeamName}</Text>
            </View>
        </View>
    )
}

// Map through and display team
export function DisplayPlayerClubHistory({PlayerClubs}) {
    return (
        <View>
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around'}}>
                <Text style={{color: 'white'}}>Years</Text>
                <Text style={{color: 'white'}}>Team</Text>
            </View>

            <ScrollView>
                {Object.keys(PlayerClubs).map((teamName, index) => (
                    <TeamTemplate key={index} Team={PlayerClubs[teamName]} />
                ))}
            </ScrollView>
        </View>
    )
}