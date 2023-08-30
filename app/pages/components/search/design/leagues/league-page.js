// Public Imports
import { View, ScrollView } from 'react-native';
import { useState, useEffect } from 'react';

// Private Importsg
import LeagueTable from './/components/league-table';
import DropdownButton from './/components/league_dropdown';
import LeagueStatistics from './/components/league-statistics';

// Display whole league page
export default function LeaguePage({ League }) {
  // Stats are going be shown dependent on if a dropdown option
  // has been pressed  DropdownButton -> LeagueStatus
  const [statisticStatus, setStatisticStatus] = useState(false);
  const [chosenStatistic, setChosenStatistic] = useState('');

  useEffect(() => {
    console.log('Chosen Statistic: ' + chosenStatistic + '\n');
  }, [chosenStatistic]);

  return (
    <View style={{ flex: 1 }}>
      <LeagueTable Placeholder={League} />

      <DropdownButton
        Placeholder={League.statistics}
        Title={'Select League Statistics'}
        setStatStatus={setStatisticStatus}
        setChosenStatistic={setChosenStatistic}
      />

      {statisticStatus ? (
        <LeagueStatistics
          Placeholder={League.statistic[chosenStatistic]}
          setStatStatus={setStatisticStatus}
        />
      ) : (
        <></>
      )}
    </View>
  );
}
