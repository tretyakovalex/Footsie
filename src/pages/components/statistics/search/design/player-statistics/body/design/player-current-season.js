import { View, Text, Image } from 'react-native';


export default function PlayerCurrentTeam({Player, Stats}) {

    const CurrentSeasonStats = Player["Current Season"];
    const CurrentTeam = Player.Teams["Current Team"];

    return (
        <View style={{flex: 1, flexDirection: 'row'}}>
        
            <View style={{flex: 1, flexDirection: 'column'}}>
                <Text>Team</Text>
                <Image source={{uri: Player.Teams[CurrentTeam].TeamLogo}} />
            </View>

            <View style={{flex: 5, flexDirection: 'row', justifyContent: "space-around", alignItems: 'center'}}>
                {(Stats.map((statName, index) => (
                    <View key={index} style={{flex: 1, flexDirection: 'column'}}>
                        <Text>{statName}</Text>
                        <Text>{CurrentSeasonStats[statName]}</Text>
                    </View>
                )))}
            </View>
        </View>
    )
}