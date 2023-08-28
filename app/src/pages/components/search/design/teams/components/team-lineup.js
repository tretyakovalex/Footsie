// Public Imports
import { View, Text, Pressable, Image } from 'react-native';
import { useState, useEffect } from 'react';


// setPlayerStatus: Open player page of a player as been pressed
function Lineup({SquadMembers, setChosenPlayer, setPlayerStatus}) {

    // When pressed, we see that a player has been chosen
    //               We active the player page
    const handlePress = chosenPlayer => {
        setPlayerStatus(true)
        setChosenPlayer(chosenPlayer)
    }

    return (
        SquadMembers.map((player, index) => (
            <Pressable key={index} onPress={() => handlePress(player.name)} style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{fontSize: 14, color: 'white'}}>{player.kitNumber}</Text>
                <Text style={{fontSize: 14, color: 'white'}}>{player.name}</Text>
                <Text style={{fontSize: 14, color: 'white'}}>{player.position}</Text>
                <Text style={{fontSize: 14, color: 'white'}}>{player.status}</Text>
            </Pressable>
        ))
    )
}


// Placeholder: List of every player in the squad and their name, number, position etc.
export default function SquadLineup({Placeholder}) {
    return (
        <View style={{flex: 1}}>
            <Text>Squad Lineup</Text>

            <Lineup SquadMembers={Placeholder} />
        </View>
    )
}