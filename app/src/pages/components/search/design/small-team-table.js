import { Text, View, Image } from 'react-native';

import { SmallTableDesign } from '../../../../../styles/main-styles/search/small-team-design';

// Allocate correct colours to results
function TeamRecentPerformance({ result }) {
  return (
    <View
      style={{
        height: 8,
        width: 8,
        backgroundColor:
          result === 'w' ? 'green' : result === 'd' ? 'grey' : 'red',
        margin: 0.25,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 100,
      }}
    ></View>
  );
}

// Display team performance: WWDLLW
function TeamPerformanceDisplay({ teamData }) {
  const performanceArray = teamData.performance.split(',');

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {performanceArray.map((result, index) => (
        <TeamRecentPerformance key={index} result={result} />
      ))}
    </View>
  );
}

const StatFlexSizes = {
  rank: 1,
  team: 2,
  results: 3,
  goals: 4,
  form: 1.5,
  points: 1,
};

function DisplayTeamInfo({ Team }) {
  return (
    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
      {/* Rank: Position */}
      <View style={[SmallTableDesign.statDesign, { flex: StatFlexSizes.rank }]}>
        <View style={SmallTableDesign.separationTopBottom}>
          <Text style={SmallTableDesign.teamStatText}>Pos</Text>
        </View>

        <View style={SmallTableDesign.separationTopBottom}>
          <Text style={SmallTableDesign.teamBasicText}>{Team.rank}</Text>
        </View>
      </View>

      {/* Team: Logo and Name */}
      <View style={[SmallTableDesign.statDesign, { flex: StatFlexSizes.team }]}>
        <View style={SmallTableDesign.separationTopBottom}>
          <Text style={SmallTableDesign.teamStatText}>Team</Text>
        </View>

        <View
          style={[
            SmallTableDesign.separationTopBottom,
            { flexDirection: 'row', justifyContent: 'space-evenly' },
          ]}
        >
          <Image
            source={{ uri: Team.image }}
            style={{ width: 15, height: 'auto' }}
          />
          <Text
            style={[
              SmallTableDesign.teamBasicText,
              { maxWidth: 100, marginLeft: 5, marginRight: 5 },
            ]}
          >
            {Team.name}
          </Text>
        </View>
      </View>

      {/* Results: W, D, L */}
      <View
        style={[SmallTableDesign.statDesign, { flex: StatFlexSizes.results }]}
      >
        <View
          style={[
            SmallTableDesign.separationTopBottom,
            { flexDirection: 'row', justifyContent: 'space-around' },
          ]}
        >
          <Text style={SmallTableDesign.teamStatText}>W</Text>
          <Text style={SmallTableDesign.teamStatText}>D</Text>
          <Text style={SmallTableDesign.teamStatText}>L</Text>
          <Text style={SmallTableDesign.teamStatText}>GF</Text>
          <Text style={SmallTableDesign.teamStatText}>GA</Text>
          <Text style={SmallTableDesign.teamStatText}>GD</Text>
        </View>

        <View
          style={[
            SmallTableDesign.separationTopBottom,
            { flexDirection: 'row', justifyContent: 'space-around' },
          ]}
        >
          <Text style={SmallTableDesign.teamBasicText}>{Team.wins}</Text>
          <Text style={SmallTableDesign.teamBasicText}>{Team.draws}</Text>
          <Text style={SmallTableDesign.teamBasicText}>{Team.losses}</Text>
          <Text style={SmallTableDesign.teamBasicText}>{Team.gf}</Text>
          <Text style={SmallTableDesign.teamBasicText}>{Team.ga}</Text>
          <Text style={SmallTableDesign.teamBasicText}>{Team.gd}</Text>
        </View>
      </View>

      {/* Form */}
      <View style={[SmallTableDesign.statDesign, { flex: StatFlexSizes.form }]}>
        <View style={SmallTableDesign.separationTopBottom}>
          <Text style={SmallTableDesign.teamStatText}>Form</Text>
        </View>

        <View style={SmallTableDesign.separationTopBottom}>
          <TeamPerformanceDisplay teamData={Team} />
        </View>
      </View>

      {/* Points */}
      <View
        style={[SmallTableDesign.statDesign, { flex: StatFlexSizes.points }]}
      >
        <View style={SmallTableDesign.separationTopBottom}>
          <Text style={SmallTableDesign.teamStatText}>Pts</Text>
        </View>

        <View style={SmallTableDesign.separationTopBottom}>
          <Text style={SmallTableDesign.teamBasicText}>{Team.points}</Text>
        </View>
      </View>
    </View>
  );
}

export function SmallTeamTable({ Team }) {
  return (
    <View style={{ flex: 1.7, margin: 5, paddingBottom: 10 }}>
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <Text style={{ fontSize: 18, color: 'white', marginLeft: 20 }}>
          {Team.league}
        </Text>
      </View>

      <DisplayTeamInfo Team={Team} />
    </View>
  );
}
