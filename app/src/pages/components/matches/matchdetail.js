import { View, Text, Pressable, Modal, ScrollView, Image } from 'react-native';
import { useState, useEffect } from 'react';
import axios from 'axios';

import { API_KEY } from './matchAPI';
import { MatchPopUp } from '../../../styles/main-styles/matches/foundation';
import { TeamSection } from '../../../styles/main-styles/matches/detailed-styles';


// Match Pop Up
// Displays Team Logos, Time, Score
function TopSection({ match }) {
  return (
    <View style={[TeamSection.topPositioning.structure, {marginTop: 20}]}>
        <View style={TeamSection.topPositioning.teamContainer}>
          <Image source={{ uri: match.teams.home.logo }} style={TeamSection.global.logo} />
          <Text style={TeamSection.global.teamName}>{match.teams.home.name}</Text>
          <Text style={TeamSection.global.text}>{match.goals.home}</Text>
        </View>

        <View style={TeamSection.topPositioning.middleContainer}>
          <Text style={TeamSection.global.text}>{match.fixture.status.long}</Text>
          <Text style={TeamSection.global.text}>{match.fixture.status.elapsed}</Text>
          <Text style={TeamSection.global.text}>VS</Text>
        </View>

        <View style={TeamSection.topPositioning.teamContainer}>
          <Image source={{ uri: match.teams.away.logo }} style={TeamSection.global.logo} />
          <Text style={TeamSection.global.teamName}>{match.teams.away.name}</Text>
          <Text style={TeamSection.global.text}>{match.goals.away}</Text>
        </View>
    </View>
  );
}

async function FetchMatchData(matchID) {
  const options = {
    method: 'GET',
    url: 'https://api-football-v1.p.rapidapi.com/v3/fixtures/statistics',
    params: {fixture: matchID},
    headers: {
      'X-RapidAPI-Key': API_KEY,
      'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
    }
  }

  try {
    const response = await axios(options);
    console.log(JSON.stringify(response.data, null, 2));
    return response.data.response;
  } catch (error) {
    console.error(error);
  }
}
  
// Match Pop Up
// Displays the match statistics
function BottomSection({ match }) {
  const [matchStats, setMatchStats] = useState([]);

  useEffect(() => {
    const fetchMatchData = async () => {
      try {
        const matchData = await FetchMatchData(match.fixture.id);

        // Check if Statistics are available
        if (matchData.length > 0) {
          console.log("Match Statistics Available");
          setMatchStats(matchData);
        } else {
          console.log("No Match Statistics Available");
          console.log(JSON.stringify(matchData, null, 2));
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchMatchData();
  }, [match]);

  return (
    <View style={{ flex: 5 }}>
      {matchStats.length > 0 ? (
        <ScrollView style={{marginTop: 20, backgroundColor: "#1E5C11"}}>
          {/* Display the match statistics for each team */}
          <View style={TeamSection.bottomPositioning.structure}>

            {/* Loop through the statistics and display them */}
            {matchStats[0].statistics.map((stat) => (
              <View key={stat.type} style={[{ marginTop: 10 }, {width: "100%"}]}>

                <View style={[{width: "100%", marginTop: 10}]}>
                  <Text style={[TeamSection.global.text, {textAlign: "center", fontSize: 16}]}>{stat.type}</Text>
                </View>

                <View style={TeamSection.bottomPositioning.valueContainer}>
                  <Text style={TeamSection.global.text}>{stat.value}</Text>
                  <Text style={TeamSection.global.text}>
                    {matchStats[1].statistics.find((s) => s.type === stat.type).value}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      ) : (
        <Text
          style={{
            fontSize: 24,
            marginTop: "auto",
            marginBottom: "auto",
            textAlign: "center",
            color: "grey",
          }}
        >
          No Match Statistics Found
        </Text>
      )}
    </View>
  );
}


  
// Display the content of the match
// Top and Bottom Sections
function DetailDisplay({match}) {
    return (
        <View style={[{width: "100%"}, {height: "100%"}]}>
            <TopSection match={match}/>
            <BottomSection match={match} />
        </View>
    )
}


// Match Pop Up
export default function MatchDetail({match, visibility, closeTab}) {
    if (!match || !match.teams || !match.teams.home || !match.teams.away) {
        // Handle the case where match or its properties are undefined
        return null;
      }

    return (
        <Modal visible={visibility} animationType="slide" transparent>
          <View style={MatchPopUp.modalContainer}>
            <View style={MatchPopUp.modalContent}>
              <Pressable style={MatchPopUp.closeButton} onPress={closeTab}>
                <Text style={MatchPopUp.closeButtonText}>X</Text>
              </Pressable>

            <DetailDisplay match={match} />
            </View>
          </View>
        </Modal>
      );
}