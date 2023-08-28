// Public Imports
import { View, Text, Image } from 'react-native';

// Private Imports
import SmallTeamTable from '../../small-team-table';

// TODO:
//  Team and Player have the same header template. Make this reusable

// Display Player Information
// Placeholder: Player information with minimum player information for SmallTeamTable
export default function PlayerHeader({ Placeholder }) {
  return (
    <View style={{ flex: 1, flexDirection: 'row' }}>
      <View style={{ flex: 1 }}>
        <Image
          source={Placeholder.icon}
          style={{ height: 30, width: 'auto', margin: 'auto' }}
        />
      </View>

      <View style={{ flex: 3, flexDirection: 'column' }}>
        <View style={{ flex: 1 }}>
          <Text>{Placeholder.PlayerName}</Text>
        </View>

        <SmallTeamTable Team={Placeholder.Team} />
      </View>
    </View>
  );
}
