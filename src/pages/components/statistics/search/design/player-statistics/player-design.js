import { View, ScrollView, Text } from 'react-native';

import { DisplayTopSection } from '../display-searched';
import { TEMP_SAKA_STATS } from './body/temporary_stats';
import { PlayerStatDisplay } from './body/player-stat-display';

// - - - TEMPORARY DATA - - -
const TEMPORARY_DATA = {
    DATA: {
        tempTeam: {
            league: "Premier League",
            rank: 3,
            image: "https://logos-world.net/wp-content/uploads/2020/05/Arsenal-Logo-700x394.png",
            name: "Arsenal",
            wins: 5, 
            draws: 2, 
            losses: 3, 
            gf: 13,
            ga: 7, 
            gd: 6, 
            points: 15,
            performance: "w,d,w,w,l" 
        },
        tempPlayer: {
            playerImage: "https://www.arsenal.com/sites/default/files/styles/large_16x9/public/images/Saka_Profile_1100x693_0.jpg?auto=webp&itok=bLhiPbi_",
            name: "Buyako Saka",
            nationality: "English", 
            position: "Midfielder"
        }
    }
}


export default function PlayerDisplay() {
    return (
        <View style={{flex: 1}}>

            {/* Top Section: Player Image, Name, Team */} 
            <View style={{flex: 1}}>
                <DisplayTopSection searchedInfo={TEMPORARY_DATA} />
            </View>

            {/* Bottom Section: Goals, Assist etc */} 
            <View style={{flex: 4}}>
                <ScrollView style={{flex: 1, borderWidth: 1, borderColor: 'red', padding: 5}}>
                    <PlayerStatDisplay Player={TEMP_SAKA_STATS}/>
                </ScrollView>
            </View>

        </View>
    )
}