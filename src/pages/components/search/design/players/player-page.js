// Public Imports
import { View } from 'react-native';

// Private Imports
import PlayerTeamStatistics from './components/player-statistics';
import PlayerHeader from './components/player-statistics';


export default function PlayerPage({PlayerPlaceholder}) {
    return (
        <View style={{flex: 1}}>
            <PlayerHeader Placeholder={PlayerPlaceholder} />

            <PlayerTeamStatistics PlayerHistoryPlaceholder={PlayerPlaceholder} />
        </View>
    )
}