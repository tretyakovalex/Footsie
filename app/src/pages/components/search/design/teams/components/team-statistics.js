// Public Imports
import { View, Text, Image, ScrollView } from 'react-native';

function SpecificStat({ statistic, TeamOrPlayer }) {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {TeamOrPlayer === 'Team' ? (
        <View>
          <Image
            source={statistic.image}
            style={{ height: 30, width: 'auto' }}
          />
          <Text>{statistic.number}</Text>
        </View>
      ) : (
        <View>
          <Image
            source={statistic.image}
            style={{ height: 30, width: 'auto' }}
          />
          <Text>{statistic.number}</Text>
          <Text>{statistic.name}</Text>
        </View>
      )}
    </View>
  );
}

export default function TeamStatistics({ statistics }) {
  // Function to convert all statistics into pairs
  const chunkArray = (arr, size) => {
    const chunkedArr = [];
    for (let i = 0; i < arr.length; i += size) {
      chunkedArr.push(arr.slice(i, i + size));
    }
    return chunkedArr;
  };

  // Object / Array of the statistics in pairs
  const pairsOfStatistics = chunkArray(statistics, 2);

  return (
    <ScrollView style={{ flex: 2 }}>
      {/* Loop through the array of pairs */}
      {pairsOfStatistics.map((pair, index) => (
        <View key={index} style={{ flexDirection: 'row' }}>
          {/* Print out the pair statistics */}
          {pair.map((statistic, innerIndex) => (
            <SpecificStat
              key={innerIndex}
              statistic={statistic}
              TeamOrPlayer={statistic.group}
            />
          ))}
        </View>
      ))}
    </ScrollView>
  );
}

/*
[1,2,3,4,5,6]

turns to 
[1,2]
[3,4]
[5,6]

prints out:
1 2
2 3
4 5

*/
