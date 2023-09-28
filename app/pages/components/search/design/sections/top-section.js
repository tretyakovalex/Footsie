import { View, Text, Image, ScrollView, Pressable, StyleSheet } from 'react-native';

// Styling for the image of the player or team icon
// Will separate it later
const entityImageStyle = StyleSheet.create({
    container: {
        height: '70%',
        width: '35%',
        marginTop: 'auto',
        marginBottom: 'auto',
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        backgroundColor: 'grey',
        borderRadius: 50,
        height: '80%',
        width: '80%'
    }
})

// Player or Team Image
function DisplayImage() {
    return (
        <View style={entityImageStyle.container}>
            <Image source={{uri: 'www.here.com'}} style={entityImageStyle.image} />
        </View>
    )
}
  
// Temporary Information
const tempEntity = {
  team: {
    name: 'Manchester United',
    country: 'England',
    league: 'Premier League',
    stadium: 'Old Trafford',
  },
  player: {
    name: 'Bukayo Saka',
    country: 'England',
    team: 'Arsenal',
    league: 'Premier League',
    number: '14',
  },
};

const entityInfoStyle = StyleSheet.create({
    container: {
        flex: 1,
    },
    nameText: {
      fontSize: 18,
      color: 'white',
      fontWeight: 'bold',
    },
    normalText: {
      fontSize: 14,
      color: 'grey',
    },
  });
  
// Player or Team Information
function DisplayEntity({ choice }) {
  const entityData = choice === 'team' ? tempEntity.team : tempEntity.player;

  return (
    <View style={entityInfoStyle.container}>
      {Object.keys(entityData).map((key) => (
        <View key={key}>
          {key === 'name' ? (
            <Text style={entityInfoStyle.nameText}>
              {entityData[key]}
            </Text>
          ) : (
            <Text style={entityInfoStyle.normalText}>
              {entityData[key]}
            </Text>
          )}
        </View>
      ))}
    </View>
  );
}

// Temporary Club Stats
const tempStats = {
  POS: 1,
  CLUB: 'Manchester United',
  P: 14,
  W: 8,
  D: 10,
  L: 3,
  PTS: 43,
  FORM: 'WWDWL',
};
  
  
// Styling for the small table
const currentSeasonStyle = StyleSheet.create({
    container: {
        backgroundColor: '#0A4005', 
        width: '95%', 
        height: 80, 
        borderRadius: 10
    },    
    innerContainer: {
        flex: 1, 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        paddingHorizontal: 5,
        flexWrap: 'wrap'
    },

    statText: {
        fontSize: 16,
        color: 'white'
    },
    valueText: {
        fontSize: 12,
        textAlign: 'center',
        color: 'white'
    },
    textContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        maxWidth: '30%',
    },
})

// Recent Results
function DisplayCurrentSeasonRecord() {
    return (
      <View style={currentSeasonStyle.container}>
        <View style={currentSeasonStyle.innerContainer}>
          {Object.keys(tempStats).map((key) => (
            <View key={key} style={currentSeasonStyle.textContainer}>
              <Text style={currentSeasonStyle.statText}>{key}</Text>
              <Text style={currentSeasonStyle.valueText}>{tempStats[key]}</Text>
            </View>
          ))}
        </View>
      </View>
    );
  }


// Header Styling
const headerStyle = StyleSheet.create({
    container: {
        height: 200, 
        flexDirection: 'row', 
    },
    entityInformation: {
        flex: 1, 
        marginLeft: 5,
        alignItems: 'space-evenly', 
        paddingTop: 10, 
        paddingBottom: 10
    }
})


export default function HeaderSection() {
    return (
        <View style={headerStyle.container}>
            <DisplayImage />

            <View style={headerStyle.entityInformation}>
                <DisplayEntity choice={'team'} />

                <DisplayCurrentSeasonRecord />
            </View>
        </View>
    )
}