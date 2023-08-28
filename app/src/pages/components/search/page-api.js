// Public Imports
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useEffect, useState } from 'react';

// Private Imports
import LeaguePage from './design/leagues/league-page';
import PlayerPage from './design/players/player-page';
import TeamPage from './design/teams/team-page';

// Return button: Searched Page -> Home Search Page (All Options)
function ReturnButton({ setSearchStatus }) {
  const ReturnHome = () => {
    setSearchStatus(false);
  };

  const buttonStyle = StyleSheet.create({
    button: {
      backgroundColor: 'red',
      height: 40,
      width: 40,
      borderWidth: 1,
      borderColor: 'white',
    },
  });

  return (
    <Pressable onPress={ReturnHome} style={buttonStyle.button}></Pressable>
  );
}

// TODO:
//     Invalid Search
//     Timed show no results found
//     Send user back to searchHomepage
function InvalidSearchPage({ setSearchStatus }) {
  return <View></View>;
}

// TODO:
//     Look to add cup page
//     Include it with league page

// PageName: League, Team or Player
// SearchObject: Value will be equal to a predefined object
//               Such as an object about the premier league or Saka
// setSearchStatus: Return home or continue
export default function GetSearchPage({
  PageName,
  SearchObject,
  setSearchStatus,
}) {
  const [displayedPage, setDisplayedPage] = useState('');

  useEffect(() => {
    setDisplayedPage(PageName.lowercase());
  }, [PageName]);

  return (
    <View style={{ flex: 1 }}>
      // Reset Searchbar and send user back to SearchHomepage
      <View style={{ position: absolute, right: 10, top: 10 }}>
        <ReturnButton setSearchStatus={setSearchStatus} />
      </View>
      <View style={{ flex: 1 }}>
        {displayedPage == 'team' ? (
          <View>
            <TeamPage TeamPlaceholder={SearchObject} />
          </View>
        ) : displayedPage == 'league' ? (
          <View>
            <LeaguePage League={SearchObject} />
          </View>
        ) : displayedPage == 'player' ? (
          <View>
            <PlayerPage PlayerPlaceholder={SearchObject} />
          </View>
        ) : (
          <View>
            <InvalidSearchPage setSearchStatus={setSearchStatus} />
          </View>
        )}
      </View>
    </View>
  );
}
