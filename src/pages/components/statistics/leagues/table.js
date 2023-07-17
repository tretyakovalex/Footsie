// Global Imports
import { View, ScrollView, Text, Image } from 'react-native';
import { useState, useEffect } from 'react';

// Private Imports
import TeamTemplate from './table-components';
import { TeamHeaders } from './table-components';
import FetchLeagues from './league-api';
import FetchAllLeagues from './league-api';
import { BackgroundColours } from '../../../../styles/main-styles/statistics/table-style';


// League Name + API Football IDs
const Leagues = [
    { leagueName: 'Premier League', leagueId: 39 },
    { leagueName: 'Championship', leagueId: 40 },
    { leagueName: 'EFL League One', leagueId: 41 },
    { leagueName: 'EFL League Two', leagueId:  42 },
    { leagueName: 'La Liga', leagueId:  140 },
    { leagueName: 'Bundesliga', leagueId:  78 },
    { leagueName: '2. Bundesliga', leagueId: 79 },
    { leagueName: 'Serie A', leagueId: 134 },
    { leagueName: 'Série B', leagueId:  136 },
    { leagueName: 'Ligue 1', leagueId: 61 },
    { leagueName: 'Ligue 2', leagueId: 62 },
    { leagueName: 'Primeira Liga', leagueId: 94 },
    { leagueName: 'Eredivisie', leagueId: 88 },
    { leagueName: 'Super Lig', leagueId: 119 },
    { leagueName: 'J1 League', leagueId: 98 },
    { leagueName: 'Russian Premier League', leagueId: 235 },
    { leagueName: 'Scottish Premiership', leagueId: 179 },
    { leagueName: 'Scottish Championship', leagueId: 180 },
    { leagueName: 'Superliga Argentina', leagueId: 129 },
    { leagueName: 'Chinese Super League', leagueId: 169 },
    { leagueName: 'Liga MX', leagueId: 262 },
    { leagueName: 'Brasileirão', leagueId: 71 },
    { leagueName: 'Campeonato Brasileiro Série B', leagueId: 72 },
    { leagueName: 'MLS', leagueId: 866 },
    { leagueName: 'A-League', leagueId: 188 },
    { leagueName: 'Belgian First Division A', leagueId: 144 },
    { leagueName: 'Swiss Super League', leagueId: 207 },
    { leagueName: 'Allsvenskan', leagueId: 113 },
    { leagueName: 'Norwegian Eliteserien', leagueId: 103 },
    { leagueName: 'Greek Super League', leagueId: 197 },
    { leagueName: 'K League 1', leagueId: 292 },
    { leagueName: 'K League 2', leagueId: 293 },
    { leagueName: 'Ukrainian Premier League', leagueId: 333 },
    { leagueName: 'Österreichische Bundesliga', leagueId: 226  },
    { leagueName: 'Czech First League', leagueId: 345 },
    { leagueName: 'Ekstraklasa', leagueId: 106 },
    { leagueName: 'Saudi Professional League', leagueId: 307 },
  ];


function getLeagueIdByName(leagueName) {
  const league = Leagues.find(
    (league) => league.leagueName.toLowerCase() === leagueName.toLowerCase()
  );
  return league ? league.leagueId : null;
}


function LeagueLogo(leagueInput) {
  let leagueId;
  
  if (isNaN(leagueInput)) {
    // If the input is not a number, assume it's the league name
    leagueId = getLeagueIdByName(leagueInput);
  } else {
    // If the input is a number, assume it's the league ID
    leagueId = parseInt(leagueInput);
  }
  
  if (leagueId) {
    return `https://media.api-sports.io/football/leagues/${leagueId}.png`;
  }
  
  return null;
}
  
  

  // Get League Logo
  // https://media.api-sports.io/football/leagues/{league_id}.png

export default function TableTemplate({UserInput}) {

  const [fetchedLeague, setFetchedLeague] = useState([]);
  const [leagueStatus, setLeagueStatus] = useState(false);
  const [LeagueName, setLeagueName] = useState('');
  const Logo = LeagueLogo(UserInput);

  useEffect(() => {
    const leagueIdMatch = Leagues.find((league) => league.leagueId.toString() === UserInput);
    const leagueNameMatch = Leagues.find((league) => league.leagueName === UserInput);
  
    if (leagueIdMatch || leagueNameMatch) {
      setLeagueStatus(true);
      setLeagueName(leagueIdMatch ? leagueIdMatch.leagueName : leagueNameMatch ? leagueNameMatch.leagueName : 'Unknown League');
  
      const fetchLeague = async () => {
        try {
          console.log('Valid League');
          const data = await FetchLeagues({ LeagueId: leagueIdMatch ? leagueIdMatch.leagueId : leagueNameMatch.leagueId });
          setFetchedLeague(data);
        } catch (error) {
          console.error(error);
        }
      };
  
      fetchLeague();
    } else {
      setLeagueStatus(false);
    }


  }, [UserInput]);
  
  // #1B3613    

    return (
        <View style={[{flex: 1, marginTop: 20 }, BackgroundColours.colorA ]}>
            {/* TOP SECTION*/}
            <View style={[{flex: 1, flexDirection: 'row', marginTop: 10, marginBottom: 5, height:55}, BackgroundColours.colorA]}>
                <Image style={{height: 40, width: 40, marginLeft: 10 }} source={{ uri: Logo }} />

                <View style={{flex: 1, flexDirection: 'row', marginTop: 10, justifyContent: 'space-around'}}>
                    <Text style={{color: 'white', fontSize: 16}}>{LeagueName}</Text> 

                    <Text style={{color: 'white', fontSize: 14,  marginTop: 2}}>22/23 Season</Text>
                </View>

            </View>

            {/* BOTTOM SECTION */}
            <>
                <ScrollView style={{flex: 1}}>
                    <TeamHeaders />
                    
                    {leagueStatus ? (
                      fetchedLeague.map((team, index) => (
                        <TeamTemplate key={index} team={team} index={index} />
                      ))
                    ) : (
                      <View style={{flex: 1}}>
                        <Text style={{ flex: 1, color: 'white', fontSize: 24, textAlign: 'center' }}>Can't Find League</Text>
                      </View>
                    )}
                </ScrollView>
            </>
        </View>
    )
}
