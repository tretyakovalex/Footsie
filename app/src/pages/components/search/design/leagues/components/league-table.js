// Public Imports
import { View, Text, Pressable, ScrollView, Image } from 'react-native';
import { useState, useEffect } from 'react';

// FUTURE IDEAS:
// - If sent to team page, keep track off last page
//   if client presess back, they will get sent back to league

// TODO:
//   IMPORTANT - Create database / tables
//   - Test & Create design
//   - Make adjustment where needed

const League_Sizes = [1, 1, 2.5, 1, 1, 1, 1, 1, 1, 2];

// Structure for how each team will be represented in the table
// EachTeam: JSON on specific team information
function DisplayTeams({ EachTeam }) {
  // TODO:
  //    - Animation
  //    - Design

  // This handle press will handle showing the team information
  const handlePress = () => {
    console.log('Team has been clicked');
  };

  // Pressable -
  // When clicked animation starts
  // Sends client to see the specific team information

  return (
    <Pressable onPress={handlePress}>
      {EachTeam.map((stat, index) => {
        if (index == 1) {
          // TODO:
          //     Adjust Image Size
          return (
            <View style={{ flex: League_Sizes[index] }}>
              <Image source={stat} style={{ height: 'auto', width: 20 }} />
            </View>
          );
        } else {
          // TODO:
          //     Adjust Text
          return (
            <View style={{ flex: League_Sizes[index] }}>
              <Text>{stat}</Text>
            </View>
          );
        }
      })}
    </Pressable>
  );
}

// Hold the titles of the statistics - Goals, Goals For, Goals Against...
function LeagueSchema() {
  // TODO:
  //    - Test sizing

  const league_titles = [
    'Pos',
    '',
    'Team',
    'W',
    'D',
    'L',
    'GF',
    'GA',
    'GD',
    'FORM',
  ];

  return (
    <View style={{ flex: 1 }}>
      (
      {league_titles.map((title, index) => (
        // TODO:
        //     Style the titles
        <View key={index} style={{ flex: League_Sizes[index] }}>
          <Text>{title}</Text>
        </View>
      ))}
      )
    </View>
  );
}

// Display what league we're displaying - League Logo and League Name
// Placeholder: Will hold the name and image of the league
function LeagueHeader({ Placeholder }) {
  // TODO:
  //    - Design

  return (
    <View style={{ flex: 1, flexDirection: 'row' }}>
      <Image source={Placeholder} style={{ height: 30, width: 30 }} />
      <Text>{Placeholder}</Text>
    </View>
  );
}

// Single component to display the entire league table
// Placeholder: All information on the league, which then get sent to individual functions
export default function LeagueTable({ Placeholder }) {
  return (
    <View style={{ flex: 1 }}>
      <LeagueHeader Placeholder={Placeholder} />

      <View style={{ flex: 6 }}>
        <LeagueSchema Placeholder={Placeholder} />

        <DisplayTeams EachTeam={Placeholder} />
      </View>
    </View>
  );
}
