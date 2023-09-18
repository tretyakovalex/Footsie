// Public Imports
import { View, Text, Pressable, TextInput, Animated } from 'react-native';
import { useState, useRef } from 'react';

// Private Imports
import {
  SearchBarStyle,
  SearchOptionStyle,
  SearchPageStyle,
} from '../../../styles/main-styles/search/search-homepage-style';

// Initial Search Bar
// TODO: Create loading page
function SearchBar({ searchInput, setSearchInput, setSearchStatus}) {

  // - - - TEMPORARY FUNCTION - - -
  const hardSearch = () => {
    setSearchInput(searchInput);
    setSearchStatus(true);
  };

  // TO DO:
  // - ? -> On First Click Search

  return (
    <View style={SearchBarStyle.container}>
      <View style={SearchBarStyle.searchContainer}>
        <View style={SearchBarStyle.miniContainer}>
          <TextInput
            style={{ width: '100%', textAlign: 'center', color: 'grey' }}
            onChangeText={(text) => {
              setSearchInput(text);
            }}
            onSubmitEditing={() => hardSearch()}
            value={searchInput}
            placeholder={'Search your favourite Players, Teams and Leagues...'}
            placeholderTextColor={'#91AB88'}
          />
        </View>
      </View>
    </View>
  );
}

// Search Option Template
function IndividualOptions({ option, setSearchInput, setSearchStatus}) {
  const pressAnimation = useRef(new Animated.Value(0)).current;

  const handlePress = (name) => {
    Animated.timing(pressAnimation, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: false,
    }).start(() => {
      // Animation completed, reset the value to 0
      pressAnimation.setValue(0);
    });

    setSearchInput(name);
    setSearchStatus(true);
  };

  const pressAnimationStyle = {
    backgroundColor: pressAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: ['rgba(203, 209, 201, 0.3)', 'rgba(203, 209, 201, 0.7)'],
    }),
  };

  // TO DO:
  // - On Press show the player, team, league etc

  return (
    <Pressable onPress={() => handlePress(option.playerName)}>
      {({ pressed }) => (
        <Animated.View
          style={[
            SearchOptionStyle.textContainer,
            pressed && pressAnimationStyle,
          ]}
        >
          <Text
            style={[
              {
                color:
                  option.ranking == 1
                    ? 'red'
                    : option.ranking == 2
                    ? 'orange'
                    : 'white',
              },
              SearchOptionStyle.optionText,
            ]}
          >
            {option.playerName}
          </Text>
        </Animated.View>
      )}
    </Pressable>
  );
}

// Unpressable Explanier
function UnpressableDescriptor() {
  return (
    <View style={{height: 30, backgroundColor: 'grey', justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{color: 'black'}}>Most Popular Choices</Text>
    </View>
  )
}

// Search Options
function SearchOptions({ userOptions, setSearchInput, setSearchStatus }) {
  return (
    <View style={SearchOptionStyle.container}>
      <UnpressableDescriptor />
      {userOptions.map((option, index) => (
        <IndividualOptions
          key={index}
          option={option}
          setSearchInput={setSearchInput}
          setSearchStatus={setSearchStatus}
        />
      ))}
    </View>
  );
}

// TO DO:
// - Auto Suggestion: <SearchOptions userOptions={AutoSuggestion}
//        Base on popularity: User Popularity / General Popularity
// - Rename parameters

export default function SearchPage({ searchInput, setSearch, setSearchStatus }) {

  // TODO:
  //     Have the options shown be based on most popular searches
  // - - - TEMPORARY OPTIONS - - -
  const TEMPORARY_OPTIONS = [
    { playerName: 'Erling Halaand', ranking: 1 },
    { playerName: 'Kylian Mbappe', ranking: 1 },
    { playerName: 'Manchester United', ranking: 3 },
    { playerName: 'Manchester City', ranking: 2 },
    { playerName: 'Erling Halaand', ranking: 1 },
    { playerName: 'Kylian Mbappe', ranking: 1 },
  ];
  return (
    <View style={SearchPageStyle.container}>
      <SearchBar
        searchInput={searchInput}
        setSearchInput={setSearch}
        setSearchStatus={setSearchStatus}
      />

      <SearchOptions
        userOptions={TEMPORARY_OPTIONS}
        setSearchInput={setSearch}
        setSearchStatus={setSearchStatus}
      />
    </View>
  );
}
