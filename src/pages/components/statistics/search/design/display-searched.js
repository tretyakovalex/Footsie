import { View, Image, Text } from 'react-native';
import { DisplayTeamInfo } from './small-table';
import { Colours } from '../../../../../styles/global-styles/global';
import { PageImage } from '../../../../../styles/main-styles/statistics/search-page-styles';


function PlayerInformation({player}) {
    return (
        <View style={{height: 20, marginTop: 5}}>
            <Text style={{fontSize: 18, color: 'white', marginLeft: 10}}>{player.name}</Text>
            <Text style={{fontSize: 11, color: 'white', marginLeft: 20}}>{player.nationality}</Text>
            <Text style={{fontSize: 14, color: 'white', marginLeft: 15}}>{player.position}</Text>
        </View>
    )
}


// Display information about the player
export function DisplayTopSection({searchedInfo}) {
    return (
        <View style={{flex: 1, flexDirection: 'row',}}>

            <View style={{ flex: 1, marginRight: 10, alignItems: 'center', justifyContent: 'center'}}>
                <View style={{ borderRadius: 100, height: 100, width: 100, overflow: 'hidden', backgroundColor: Colours.inactiveText, }}>

                    <Image source={{ uri: searchedInfo.DATA.tempPlayer.playerImage }} style={PageImage.imageSize} />
                </View>
            </View>

            <View style={{flex: 2.75, flexDirection: 'column', marginRight: 5}}>
                <View style={{flex: 1, marginBottom: 10, marginLeft: 20}}>
                    <PlayerInformation player={searchedInfo.DATA.tempPlayer} />
                </View>


                <DisplayTeamInfo Team={searchedInfo.DATA.tempTeam} />
            </View>
        </View>
    )
}