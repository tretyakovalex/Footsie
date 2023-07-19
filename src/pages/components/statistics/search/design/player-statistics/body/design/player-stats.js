import React from 'react';
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
    const PlayStyle = PlayerStyle ? "Attacking" : "Defensive";

    return (
        <View style={{flex: 1, flexDirection: 'column'}}>

            {/* Display Header */}
            <View style={{flex: 1, flexDirection: 'row'}}>
                
                <View>
                    <Text>Team</Text>
                </View>

                {(Stats.map((statName, index) => (
                    <View key={index}>
                        <Text>{statName}</Text>
                    </View>
                )))}
            </View>


            <View>
            {PlayerTeamHistory.map((team, index) => (
                <React.Fragment key={index}>
                    {/* Display Team Name and Emblem */}
                    <Team PlayerTeamObject={PlayerStatistics.Teams[team]} TeamName={team} />
            
                    {/* Display Stats */}
                    {Stats.map((stat, statIndex) => (
                        <View key={statIndex}>
                            <Text>{PlayerStatistics[PlayStyle][team][stat]}</Text>
                        </View>
                    ))}
                </React.Fragment>
            ))}
        </View>

        </View>
    )
}