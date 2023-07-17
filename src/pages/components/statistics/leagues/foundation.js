// Global Imports
import { View, Text, Pressable, Animated, TextInput } from 'react-native';
import React, { useState, useEffect, useRef, useCallback } from 'react';

// Private Imports
import { Colours } from '../../../../styles/global-styles/global';
import { LeagueStyles, SearchBar } from '../../../../styles/main-styles/statistics/foundation-styles';
import FetchLeagues from './league-api';
import TableTemplate from './table';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);


// TODO: Search Box
// Keyboard keeps closing after one letter is inputted
export function SearchLeagues({setSearchInput}) {
  const [searchStatus, setSearchStatus] = useState(false);
  const [inputText, setInputText] = useState('');

  const slideAnim = useRef(new Animated.Value(0)).current;

  // Search Bar - Open Animation 
  const openSearch = useCallback(() => {
    setSearchStatus(true);
    Animated.timing(slideAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [slideAnim]);

  // Search Bar - Close Animation 
  const closeSearch = useCallback(() => {
    setSearchStatus(false);
    setInputText('');
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [slideAnim]);

  // Search Bar - Animation Style
  const searchBarStyle = {
    width: slideAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [100, 200],
    }),
    height: slideAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [40, 40],
    }),
  };

  // User Input
  const handleInputChange = text => {
    setInputText(text)
    setSearchInput(text)
  }

  // Close User Input
  const resetSearch = () => {
    setInputText('');
    closeSearch();
  };

  return (
    <View style={SearchBar.container}>
      <AnimatedPressable
        style={[
          SearchBar.pressableContainer,
          searchBarStyle,
          {
            backgroundColor: searchStatus ? '#D7F1D0' : 'grey',
            paddingLeft: searchStatus ? 20 : 5,
          },
        ]}
        onPress={openSearch}
      >
        {searchStatus ? (
          <TextInput
            style={{ flex: 1 }}
            onChangeText={handleInputChange}
            placeholder="Enter Statistic Name"
            textAlignVertical="center"
            onBlur={resetSearch}
          />
        ) : (
          <Text style={SearchBar.temporaryText}>
            {inputText ? inputText : '?'}
          </Text>
        )}
        {searchStatus && (
          <Pressable style={SearchBar.closeButton} onPress={resetSearch}>
            <Text style={SearchBar.closeText}>X</Text>
          </Pressable>
        )}
      </AnimatedPressable>
    </View>
  );
}

// TODO: League and Stats Button
function LeagueOptions({setLeague}) {

    const [ activeTab, setActiveTab ] = useState(0);

    // TODO: Animate changing options

    // Updates Status & Triggers Animation
    const activateOption = activeIndex => {
        setActiveTab(activeIndex);
        setLeague(activeIndex);
    }

    // Buttons
    function LeagueButtons({optionName, optionIndex}) {

        return (
            <>
                <Pressable style={LeagueStyles.buttonContainer} onPress={() => activateOption(optionIndex)}>
                    <Text style={
                        [LeagueStyles.optionText,
                        LeagueStyles.leagueText,
                        {color: optionIndex == activeTab ? 'white' : Colours.inactiveText}
                        ]}>{optionName}</Text>
                </Pressable>
            </>
        );
    }

    // League Buttons
    const Options = ["Table", "Stats"];

    // Returning Table and Stats
    return (
        <View style={[LeagueStyles.container]}>
            {Options.map((option, index) => (
                <LeagueButtons key={index} optionName={option} optionIndex={index} />
            ))}
        </View>
    );
}

// TODO: Button to return page back to menu
function ReturnButton({ statIndex, setStatIndex }) {
    // Null shows Menu
    const returnToMenu = () => {
      setStatIndex(null); 
    };
  
    // Reset Button
    // TODO: Design Return Button
    function Button() {
      return (
        <Pressable
          style={{
            position: 'absolute',
            right: 20,
            top: 5,
            height: 30,
            width: 30,
            borderWidth: 1, 
            borderColor: 'green',
            borderRadius: '5'
          }}
          onPress={returnToMenu}
        >
          <Text style={
            {color: 'white', textAlign: 'center',
            marginTop: 'auto', marginBottom: 'auto'}
            }>X</Text>
        </Pressable>
      );
    }
  
    return <>{statIndex != null && <Button />}</>; 
  }
  
export default function LeagueStatTemplate({index, setStatIndex, SearchInput}) {
    const [leagueStatus, setLeagueStatus] = useState(0);
  
    return (
      <View style={{ flex: 1 }}>
        <ReturnButton statIndex={index} setStatIndex={setStatIndex} /> 
        <LeagueOptions setLeague={setLeagueStatus} />
        {leagueStatus == 0 && <TableTemplate UserInput={SearchInput} />}
      </View>
    );
}
