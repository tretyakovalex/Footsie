// Public Imports
import { View } from 'react-native';

// Private Imports
import TeamHeader from './components/team-header';
import SquadLineup from './components/team-lineup';
import TeamStatistics from './components/team-statistics';

export default function TeamPage({ TeamPlaceholder }) {
  return (
    <View style={{ flex: 1 }}>
      <TeamHeader Placeholder={TeamPlaceholder} />

      <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
        <SquadLineup Placeholder={TeamPlaceholder} />
        <TeamStatistics statistics={TeamPlaceholder} />
      </View>
    </View>
  );
}
