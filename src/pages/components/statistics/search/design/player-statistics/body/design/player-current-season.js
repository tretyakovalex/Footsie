import { View, Text, Image } from 'react-native';


export function PlayerCurrentTeam({ Player, Stats }) {

    // Check player has played for teams
    const currentTeamName = Player.Data["Current Team"];
    const currentTeam = Player.Teams[currentTeamName];

    const currentSeasonStats = Player["Current Season"];
  
    return (
      <View style={{ flex: 1, flexDirection: 'row' }}>

        <View style={{ flex: 1, flexDirection: 'column', }}>
          <Text style={{color: 'white', textAlign: 'center'}}>Team</Text>
          <Image
            source={{ uri: currentTeam?.TeamLogo }}
            style={{ width: 'auto', height: 60 }}
          />
        </View>
  
        <View
          style={{
            flex: 5,
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
          }}
        >
          {Stats.map((statName, index) => (
            <View key={index} style={{ flex: 1, flexDirection: 'column' }}>

              <View style={{flex: 1, height: 20, alignItems: 'center', justifyContent: 'center', marginTop: 5}}>
                <Text style={{color: 'white', flex: 1, fontSize: 12}}>{statName}</Text>
              </View>

              <View style={{flex: 1}}>
                <Text style={{color: 'white', flex: 1, alignItems: 'center', }}>{currentSeasonStats[statName]}</Text>
              </View>     

            </View>
          ))}
        </View>
      </View>
    );
  }