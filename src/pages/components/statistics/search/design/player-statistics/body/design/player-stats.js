import { useState } from 'react';
import { View, Text, Image, ScrollView } from 'react-native';

function Team({PlayerTeamObject, TeamName}) {
    return (
        <View>
            <Image source={{uri: PlayerTeamObject.TeamLogo}} />
            <Text>{TeamName}</Text>
        </View>
    )
}

export default function PlayerStatTemplate({PlayerStatistics, PlayerStyle, Stats}) {

    const PlayerTeamHistory = PlayerStatistics.Teams["All Teams"];

    return (
        <View style={{flex: 1, flexDirection: 'column'}}>

            {/* Display Header */}
            <View style={{flex: 1, flexDirection: 'row'}}>
                {(Stats.map((statName, index) => (
                    <View key={index}>
                        <Text>{statName}</Text>
                    </View>
                )))}
            </View>


            <View>
                {(PlayerTeamHistory.map((team, index) => (
                    // Display Team Name and Emblem

                    // Display Stats
                )))}
            </View>
        </View>
    )
}