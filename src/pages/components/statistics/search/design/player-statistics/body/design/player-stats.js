import React from 'react';
import { View, Text, Image } from 'react-native';

function Team({PlayerTeamObject, TeamName}) {
    return (
        <View>
            <Image source={{uri: PlayerTeamObject.TeamLogo}} />
            <Text style={{color: 'grey'}}>{TeamName}</Text>
        </View>
    )
}

export function PlayerStatTemplate({PlayerStatistics, PlayerStyle, Stats}) {

    const PlayerTeamHistory = PlayerStatistics.Data["All Teams"];
    const PlayStyle = PlayerStyle ? "Attacking" : "Defensive";

    return (
        <View style={{flex: 1, flexDirection: 'column'}}>

            {/* Display Header */}
            <View style={{flex: 1, flexDirection: 'row'}}>
                
                <View style={{flex: 1}}>
                    <Text style={{color: 'yellow', textAlign: 'center'}}>Team</Text>
                </View>

                <View style={{flexDirection: 'row', flex: 4}}>
                    {(Stats.map((statName, index) => (
                        <View key={index} style={{marginLeft: 10}}>
                            <Text style={{color: 'yellow'}}>{statName}</Text>
                        </View>
                    )))}
                </View>
            </View>


            <View>
                {PlayerTeamHistory.map((team, index) => (
                  <View key={index} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                    {/* Display Team Name and Emblem */}
                    <Team PlayerTeamObject={PlayerStatistics.Teams[team]} TeamName={team} />
                
                    {/* Display Stats */}
                    {Stats.map((stat, statIndex) => (
                      <View key={statIndex} style={{ marginLeft: 10 }}>
                        <Text style={{ color: 'white' }}>{PlayerStatistics[PlayStyle][team][stat]}</Text>
                      </View>
                    ))}
                  </View>
                ))}
            </View>

        </View>
    )
}