import { View, Text, Image, Pressable, Animated } from 'react-native';
import { useState, useEffect } from 'react';

import { MatchFoundation, LeagueFoundation } from '../../../styles/main-styles/matches/foundation';
import MatchDetail from './matchdetail';

// List Of Popular Leagues
export const Leagues = [
  { league: 'Premier League', country: 'England', apiName: 'Premier League', matches: [], logo: "" },
  { league: 'Championship', country: 'England', apiName: 'Championship', matches: [], logo: "" },
  { league: 'EFL League One', country: 'England', apiName: 'League One', matches: [], logo: "" },
  { league: 'EFL League Two', country: 'England', apiName: 'League Two', matches: [], logo: "" },
  { league: 'La Liga', country: 'Spain', apiName: 'La Liga', matches: [], logo: "" },
  { league: 'Bundesliga', country: 'Germany', apiName: 'Bundesliga', matches: [], logo: "" },
  { league: '2. Bundesliga', country: 'Germany', apiName: '2. Bundesliga', matches: [], logo: "" },
  { league: 'Serie A', country: 'Italy', apiName: 'Serie A', matches: [], logo: "" },
  { league: 'Série B', country: 'Italy', apiName: 'Serie B', matches: [], logo: "" },
  { league: 'Ligue 1', country: 'France', apiName: 'Ligue 1', matches: [], logo: "" },
  { league: 'Ligue 2', country: 'France', apiName: 'Ligue 2', matches: [], logo: "" },
  { league: 'Primeira Liga', country: 'Portugal', apiName: 'Primeira Liga', matches: [], logo: "" },
  { league: 'Liga NOS', country: 'Portugal', apiName: 'Liga NOS', matches: [], logo: "" },
  { league: 'Eredivisie', country: 'Netherlands', apiName: 'Eredivisie', matches: [], logo: "" },
  { league: 'Super Lig', country: 'Turkey', apiName: 'Super Lig', matches: [], logo: "" },
  { league: 'J1 League', country: 'Japan', apiName: 'J1 League', matches: [], logo: "" },
  { league: 'Russian Premier League', country: 'Russia', apiName: 'Premier League', matches: [], logo: "" },
  { league: 'Scottish Premiership', country: 'Scotland', apiName: 'Premiership', matches: [], logo: "" },
  { league: 'Scottish Championship', country: 'Scotland', apiName: 'Championship', matches: [], logo: "" },
  { league: 'Superliga Argentina', country: 'Argentina', apiName: 'Primera Division', matches: [], logo: "" },
  { league: 'Liga Profesional de Fútbol', country: 'Argentina', apiName: 'Primera Division', matches: [], logo: "" },
  { league: 'Chinese Super League', country: 'China', apiName: 'Super League', matches: [], logo: "" },
  { league: 'Liga MX', country: 'Mexico', apiName: 'Liga MX', matches: [], logo: "" },
  { league: 'Brasileirão', country: 'Brazil', apiName: 'Brasileirão', matches: [], logo: "" },
  { league: 'Campeonato Brasileiro Série B', country: 'Brazil', apiName: 'Campeonato Brasileiro Série B', matches: [], logo: "" },
  { league: 'MLS', country: 'United States', apiName: 'Major League Soccer', matches: [], logo: "" },
  { league: 'A-League', country: 'Australia', apiName: 'A-League', matches: [], logo: "" },
  { league: 'Belgian First Division A', country: 'Belgium', apiName: 'Jupiler Pro League', matches: [], logo: "" },
  { league: 'Superliga', country: 'Denmark', apiName: 'Superliga', matches: [], logo: "" },
  { league: 'Swiss Super League', country: 'Switzerland', apiName: 'Super League', matches: [], logo: "" },
  { league: 'Allsvenskan', country: 'Sweden', apiName: 'Allsvenskan', matches: [], logo: "" },
  { league: 'Norwegian Eliteserien', country: 'Norway', apiName: 'Eliteserien', matches: [], logo: "" },
  { league: 'Greek Super League', country: 'Greece', apiName: 'Super League Greece', matches: [], logo: "" },
  { league: 'K League 1', country: 'South Korea', apiName: 'K League 1', matches: [], logo: "" },
  { league: 'K League 2', country: 'South Korea', apiName: 'K League 2', matches: [], logo: "" },
  { league: 'Ukrainian Premier League', country: 'Ukraine', apiName: 'Premier League', matches: [], logo: "" },
  { league: 'Österreichische Bundesliga', country: 'Austria', apiName: 'Bundesliga', matches: [], logo: "" },
  { league: 'Czech First League', country: 'Czech Republic', apiName: 'First League', matches: [], logo: "" },
  { league: 'Ekstraklasa', country: 'Poland', apiName: 'Ekstraklasa', matches: [], logo: "" },
  { league: 'SSE Airtricity League', country: 'Ireland', apiName: 'Premier Division', matches: [], logo: "" },
  { league: 'Liga I', country: 'Romania', apiName: 'Liga I', matches: [], logo: "" },
  { league: 'Fortuna Liga', country: 'Slovakia', apiName: 'Fortuna Liga', matches: [], logo: "" },
  { league: 'Liga BetPlay', country: 'Colombia', apiName: 'Liga BetPlay', matches: [], logo: "" },
  { league: 'Saudi Professional League', country: 'Saudi-Arabia', apiName: 'Pro League', matches: [], logo: "" },
  {league: 'UEFA Europa League', country: 'World', apiName: 'UEFA Europa League', matches: [], logo: ''},
  {league: 'UEFA Europa League Conference', country: 'World', apiName: 'UEFA Europa League Conference', matches: [], logo: ''},
  {league: 'Qatar Stars League', country: 'Qatar', apiName: 'Stars League', matches: [], logo: ''},
  {league: 'Qatar Stars League', country: 'Jordan', apiName: 'League', matches: [], logo: ''},
  { league: 'Rest Of The World', apiName: '', matches: [], logo: "" }
];
  
// Organise matches into the right leagues and order
function SortMatches(API_Match) {
    // Check Match Validity
    if (!API_Match || !API_Match.league) {
      return;
    }

    let matchFound = false;

    for (let i = 0; i < Leagues.length; i++) {
      if (
        API_Match.league.country === Leagues[i].country &&
        API_Match.league.name === Leagues[i].apiName
      ) {
        Leagues[i].matches.push(API_Match);
        matchFound = true;
        break;
      }
    }

    // If match is in unpopular list
    // Add to Rest Of The World
    if (!matchFound) {
      Leagues.find((league) => league.league === "Rest Of The World").matches.push(API_Match);
    }
}

// Display Match Time
function ShowTime({ match }) {
    const [currentTime, setCurrentTime] = useState(new Date());
    const [fadeAnim] = useState(new Animated.Value(0));
    const [prevElapsedMinutes, setPrevElapsedMinutes] = useState(0);    
    // Display the time in a match
    useEffect(() => {
      const timer = setInterval(() => {
        setCurrentTime(new Date());
      }, 1000);   
      return () => {
        clearInterval(timer);
      };
    }, []);   
    // Change the display depending on Match->Fixture->Status->Long status
    if (
      match.fixture.status.long !== "Match Finished" &&
      match.fixture.status.long !== "Not Started" &&
      match.fixture.status.long !== "Match Postponed"
    ) {
      const elapsedMinutes = Math.floor(match.fixture.status.elapsed);    
      // Update fade animation whenever elapsed minutes change
      useEffect(() => {
        if (elapsedMinutes !== prevElapsedMinutes) {
          Animated.sequence([
            Animated.timing(fadeAnim, {
              toValue: 0,
              duration: 500,
              useNativeDriver: false,
            }),
            Animated.timing(fadeAnim, {
              toValue: 1,
              duration: 500,
              useNativeDriver: false,
            }),
          ]).start();
        }
        setPrevElapsedMinutes(elapsedMinutes);
      }, [elapsedMinutes, prevElapsedMinutes, fadeAnim]);   
      return (
        <Animated.Text style={[MatchFoundation.matchInformation.score, { opacity: fadeAnim }]}>
          {elapsedMinutes < 10 ? "0" + elapsedMinutes : elapsedMinutes}'
        </Animated.Text>
      );
    } else {
      return null;
    }
}


  
// Not Started Matches
// Display only the time of the match
function MatchStart({match}) {
    if (match.fixture.status.long === "Not Started") {

      const MatchTime = new Date(match.fixture.date);
      const formatTime = MatchTime.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit"
      });


      return <Text style={[MatchFoundation.matchInformation.startTime, {marginTop: 5}]}>{formatTime}</Text>
    } else {
      return null;
    }
}
  
// Every Match Template
export function MatchTemplate({ match, onPress }) {
    const [backgroundColor, setBackgroundColor] = useState(new Animated.Value(0));
    const [highlighted, setHighlighted] = useState(false);


    const handlePress = () => {
      if (highlighted) {
        // Match is already highlighted, do nothing
        return;
      }

      // Highlight the match
      Animated.timing(backgroundColor, {
        toValue: 100,
        duration: 500,
        useNativeDriver: false,
      }).start(() => {
        setHighlighted(true);
        onPress(match);

        // Reset the match to normal after 100ms
        setTimeout(() => {
          Animated.timing(backgroundColor, {
            toValue: 0,
            duration: 100,
            useNativeDriver: false,
          }).start(() => {
            setHighlighted(false);
          });
        }, 1);
      });
    };

    // Colour when animation starts
    const animatedStyle = {
      backgroundColor: backgroundColor.interpolate({
        inputRange: [0, 100],
        outputRange: ['rgba(0, 0, 0, 0)', 'rgba(0, 255, 0, 0.5)'],
      }),
    };

    return (
      <Animated.View style={[MatchFoundation.container, animatedStyle]}>
        <Pressable style={MatchFoundation.secondContainer} onPress={handlePress}>
        {/* Home Team */}
          <View style={MatchFoundation.home}>
            <Image source={{ uri: match.teams.home.logo }} style={MatchFoundation.home.logo} />
            <Text
              style={[
                MatchFoundation.home.name,
                {
                  color:
                    match.goals.home > match.goals.away
                      ? 'green'
                      : match.goals.home < match.goals.away
                      ? 'red'
                      : match.goals.home >= 1
                      ? 'white'
                      : 'grey',
                },
              ]}
            >
              {match.teams.home.name}
            </Text>
            <Text style={MatchFoundation.home.score}>{match.goals.home}</Text>
          </View>

          {/* Middle Section */}
          <View style={MatchFoundation.matchInformation.container}>
            <Text style={MatchFoundation.matchInformation.time}>{match.fixture.status.long}</Text>
            <ShowTime match={match} />
            <MatchStart match={match} />
          </View>

          {/* Away Team */}
          <View style={MatchFoundation.away}>
            <Text style={MatchFoundation.away.score}>{match.goals.away}</Text>

            <Text
              style={[
                MatchFoundation.away.name,
                {
                  color:
                    match.goals.away > match.goals.home
                      ? 'green'
                      : match.goals.away < match.goals.home
                      ? 'red'
                      : match.goals.home >= 1
                      ? 'white'
                      : 'grey',
                },
              ]}
            >
              {match.teams.away.name}
            </Text>
            <Image source={{ uri: match.teams.away.logo }} style={MatchFoundation.away.logo} />
          </View>
        </Pressable>
        {match.selected && <MatchDetail match={match} />}
      </Animated.View>
    );
}


// Display matches in leagues
export function LeagueTemplate({ Matches }) {
    const [currentMatch, setCurrentMatch] = useState(null);
    const [detailVisibility, setDetailVisibility] = useState(false);
  
    // Match Pop Up
    const OpenDetail = (match) => {
      setCurrentMatch(match);
      setDetailVisibility(true);
    };
  
    // Close Match Pop Up
    const CloseDetail = () => {
      setDetailVisibility(false);
    };
  
    // Create array for each league to hold matches
    const sortedLeagues = [...Leagues];
    sortedLeagues.forEach((league) => {
      league.matches = [];
    });
  
    // Place each match into the correct league
    Matches.forEach((match) => {
      SortMatches(match);
    });
  
    
  
    return (
      <View>
        {sortedLeagues.map((league, index) => {
          if (league.matches.length > 0) {
            return (
              <View style={{ marginBottom: 20 }} key={index}>
                <View style={[LeagueFoundation.container, LeagueFoundation.leagueContainer]}>
                  <Text style={LeagueFoundation.league}>{league.league}</Text>
                </View>
                {league.matches.map((match, matchIndex) => (
                  <MatchTemplate key={matchIndex} match={match} onPress={OpenDetail} />
                ))}
              </View>
            );
          } else {
            return null;
          }
        })}
      
        {/* Match Pop Up */}
        <MatchDetail match={currentMatch} visibility={detailVisibility} closeTab={CloseDetail} />
      </View>
    );
}
  
  
  