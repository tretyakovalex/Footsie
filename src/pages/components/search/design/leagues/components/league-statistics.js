// Public Imports
import { View, Text, Pressable, Image } from 'react-native';
import { useState, useEffect } from 'react';

// Display the statistics of the league
// Interchangeable for player stats: Top Scorers, Assisters etc
//                     club stats:  Most possession, Attacks etc etc
export function LeagueStatistics({Placeholder, setStatStatus}) {

    // PlayerClicked: Players in the statistics information will be shown
    const [ playerClicked, setPlayerClicked ] = useState(null);

    const handlePress = index => {
        console.log("Player" + index +  "has been clicked. Come back to later")
        setPlayerClicked(index);
    }

    const closeStatistics = () => {
        setStatStatus(false);
    }

    const ListOfPlayers = Placeholder.players;

    return (
        <View style={{flex: 1}}>
            <View style={{flex: 1}}>
                <Text>{Placeholder["Statistic Name"]}</Text>
            </View>

            <Pressable onPress={() => closeStatistics()} 
            style={{height: 30, width: 30, backgroundColor: 'green', position: 'absolute', right: 10, top: 10}}>
                {/* TODO: Add some design for the go back buttton*/}
            </Pressable>

            {/* Player Rank -> Image -> Name -> Stat Number */}
            <View style={{flex: 5}}>

                {ListOfPlayers.map( (player, index) => (
                    <Pressable key={index} onPress={() => handlePress(index)} style={{flex: 1, flexDirection: 'row'}}>
                        <Text>{player.rank}</Text>

                        <View>
                            <Image source={player.face} style={{height: 'auto', width: 20}}/>
                        </View>

                        <Text>{player.name}</Text>
                        <Text>{player.statistic}</Text>
                    </Pressable>
                ))}
                
            </View>
        </View>
    )
}
