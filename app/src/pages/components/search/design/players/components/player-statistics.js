// Public Imports
import { View, Text, Image, ScrollView } from 'react-native';
import { useState } from 'react';

// IDEA
//  Make Teams Pressable
//  Different stats for outside players and inside players

// TODO:
//     Work on the design: Sizing of each so that the stats is underneath the name
function HistorySchema() {
  const StatList = ['Goals', 'Assist'];

  return (
    <View style={{ flexDirection: 'row' }}>
      {StatList.map((stat, index) => (
        <View key={index}>
          <Text>{stat}</Text>
        </View>
      ))}
    </View>
  );
}

// TODO:
//     Work on the design
//     Readjust once database is created
function PlayerHistory({ Competition }) {
  return (
    <View>
      {Competition.map((club) => (
        <View key={club} style={{ backgroundColor: 'orange' }}>
          {/* Display league name or cup name */}
          <Text>{club}</Text>

          <View style={{ flexDirection: 'column' }}>
            <HistorySchema />

            {Object.keys(Competition[club]).map((year, innerIndex) => (
              <View
                key={innerIndex}
                style={{
                  flexDirection: 'row',
                  backgroundColor: innerIndex % 2 == 0 ? 'red' : 'blue',
                }}
              >
                {/* Check if it's a cup competition and if clubIcons contains the club name */}
                {Competition === PlayerHistoryPlaceholder.cup &&
                  clubIcons[club] && (
                    <Image
                      source={clubIcons[club].icon}
                      style={{ height: 30, width: 30 }}
                    />
                  )}

                <Text>{Competition[club][year].season}</Text>
                <Text>{Competition[club][year].goals}</Text>
                <Text>{Competition[club][year].assist}</Text>
              </View>
            ))}
          </View>
        </View>
      ))}
    </View>
  );
}

// Show League Statistics or Cup Statistics Buttons
function LeagueOrCup({ DisplayCups, setCompetition }) {
  const [activeCompetition, setActiveCompetition] = useState(false);

  const competitionToggle = (Competition) => {
    setCompetition(Competition);
    setActiveCompetition(Competition);
  };

  return (
    <View style={{ borderWidth: 1, borderColor: 'blue' }}>
      {DisplayCups ? (
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <Pressable
            onPress={() => competitionToggle(false)}
            style={{
              flex: 1,
              backgroundColor: activeCompetition ? 'red' : 'orange',
            }}
          >
            <Text style={{ textAlign: 'center', fontSize: 18 }}>
              League History
            </Text>
          </Pressable>

          <Pressable
            onPress={() => competitionToggle(true)}
            style={{
              flex: 1,
              backgroundColor: activeCompetition ? 'orange' : 'red',
            }}
          >
            <Text style={{ textAlign: 'center', fontSize: 18 }}>
              Cup History
            </Text>
          </Pressable>
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          <Text style={{ textAlign: 'center', fontSize: 18 }}>
            Player History
          </Text>
        </View>
      )}
    </View>
  );
}

// TODO:
//    Update code so that compeition and active competition is the same
// PlayerHistoryPlaceholder: Dictionary holding the history of the player
export default function PlayerTeamStatistics({ PlayerHistoryPlaceholder }) {
  // Competition: League = False | Cup = True
  const [competition, setCompetition] = useState(false);
  // If player has played in cup before
  const PlayerCupExperience =
    PlayerHistoryPlaceholder['Cup Experience'] == 0 ? false : true;

  return (
    <ScrollView style={{ flex: 5 }}>
      <LeagueOrCup
        DisplayCups={PlayerCupExperience}
        setCompetition={setCompetition}
      />

      {competition ? (
        <PlayerHistory Competition={PlayerHistoryPlaceholder.cup} />
      ) : (
        <PlayerHistory Competition={PlayerHistoryPlaceholder.league} />
      )}
    </ScrollView>
  );
}
