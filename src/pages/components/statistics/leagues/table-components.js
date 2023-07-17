import { View, Text, Image, StyleSheet } from 'react-native';

import { TeamStyle, HeaderStyle, TeamText } from '../../../../styles/main-styles/statistics/table-style';

function TeamForm({ form }) {

    const formArray = form.split('');

    return formArray.map((value, index) => {
      let color;
  
      if (value === 'W') {
        color = 'green';
      } else if (value === 'D') {
        color = 'yellow';
      } else {
        color = 'red';
      }
  
      return <View key={index} style={{ width: 10, height: 10, backgroundColor: color, marginRight: 2, marginBottom: 5}}>
        <Text style={{fontSize: 10, textAlign: 'center'}}>{value}</Text>
      </View>;
    });
  }

  export function TeamHeaders() {
    const HeaderNames = ['Pos', 'Team', ['P', 'W', 'D', 'L', 'GF', 'GA'], 'Form'];
  
    const HeaderFlexSizes = [0.5, 2, 4, 1];
  
    return (
      <View style={HeaderStyle.container}>
        {HeaderNames.map((header, index) => (
          <View key={index} style={[ HeaderStyle.eachHeaderElement, {flex: HeaderFlexSizes[index] }]}>
            {Array.isArray(header) ? (
              <View style={HeaderStyle.statsNumberSection}>
                {header.map((subHeader, subIndex) => (
                  <Text key={subIndex} style={[TeamText.importantText, TeamText.centerText, { flex: 1}]}>
                    {subHeader}
                  </Text>
                ))}
              </View>
            ) : (
              <Text style={[TeamText.importantText, TeamText.centerText, { flex: 1, fontSize: 14 }]}>{header}</Text>
            )}
          </View>
        ))}
      </View>
    );
  }

  // Displaying Stats
  function DisplayStatsNumber({stat}) {
    return (
        <View style={TeamStyle.displayStats}>
            <Text style={TeamText.statsText}>{stat}</Text>
        </View>
    )
  }


  export default function TeamTemplate({ team, index }) {

    const StatInformation = [team.all.played, team.all.win, team.all.draw, team.all.lose, team.all.goals.for, team.all.goals.against]

    // NextSeason Background
    const NextBackgroundColour = (i, evenOdd) => {
      // BEST TEAMS
        if (i <= 3) {
            if (i % 2 == 0) {
                return {backgroundColor: '#131614'}
            }
            return {backgroundColor: '#1E1F1E'}
        }
        // worst TEAMS 
        else if (i >= 17) {
            if (i % 2 == 0) {
                return {backgroundColor: '#A23737'}
            }
            return {backgroundColor: '#951616'}
        }
        // MIDDLE TEAMS
        return {backgroundColor: evenOdd}
    }

    // Decided Background Colour
    const BackgroundColour = i => {
        if (i % 2 == 0) {
            return NextBackgroundColour(i, '#232623');
        }
        return NextBackgroundColour(i, '#1D1D1D');
    }

    // Next Season Teams
    const NextSeason = i => {
        // Winners
        if (i == 0) {
            return {borderBottomWidth: 1, borderBottomColor: 'rgba(155, 101, 22, 0.7)'}
        } else if (i == 3) {
            return {borderBottomWidth: 1, borderBottomColor: 'rgba(155, 101, 22, 0.7)'}
        } else if (i == 5) {
            return {borderTopWidth: 1, borderTopColor: 'rgba(155, 101, 22, 0.7)',}
        } else if (i == 17) {
            return {borderTopWidth: 1, borderTopColor: 'rgba(169, 5, 5, 0.7)'}
        }
        return null
    }

    if (!team) {
        return null; // Add a check to handle the case when team is undefined or null
      }
  
    return (
      <View style={[TeamStyle.container, BackgroundColour(index), NextSeason(index)]}>
  
        {/* Team Row */}
        <View style={TeamStyle.eachElementContainer}>

          {/* Position */}
          <View style={TeamStyle.displayStats}>
            <Text style={TeamText.statsText}>{team.rank}</Text>
          </View>
  
          {/* Team */}
          <View style={TeamStyle.teamNameContainer}>
            <Image source={{ uri: team.team.logo }} style={TeamStyle.teamImage} />
            <Text style={[TeamText.importantText, {marginLeft: 3}]}>{team.team.name}</Text>
          </View>
  
          {/* Stats */}
          <View style={TeamStyle.statsContainer}>
            {StatInformation.map((stat, index) => (
                <DisplayStatsNumber key={index} stat={stat} />
            ))}
  
            {/* Form Section */}
            <View style={TeamStyle.form}>
              <TeamForm form={team.form} />
            </View>
          </View>
        </View>
      </View>
    );
  }
  