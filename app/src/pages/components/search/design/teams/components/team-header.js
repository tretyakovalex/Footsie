// Public Imports
import { View, Text, Image } from 'react-native';

// Private Imports
import { SmallTeamTable } from '../../small-team-table';


// Placeholder: Data on the specific team being displayed
export default function TeamHeader({Placeholder}) {
    return (
        <View style={{flex: 1, flexDirection: 'row'}}>
            <View style={{flex: 1}}>
                <Image source={Placeholder.icon} style={{height: 30, width: 'auto', margin: 'auto'}} />
            </View>
            
            <View style={{flex: 3, flexDirection: 'column'}}>
                <View style={{flex: 1}}>
                    <Text>{Placeholder.TeamName}</Text>
                </View>

                <SmallTeamTable Team={Placeholder} />
            </View>
        </View>
    )
}