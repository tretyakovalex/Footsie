// Global Imports
import React, { useState } from 'react';
import { Text, Pressable, View, Animated } from 'react-native';

// Private Imports
import { DropdownStyle } from '../../../styles/main-styles/statistics/home-display';
import LeagueStatTemplate from './leagues/foundation';

// Animated Components Shortcut
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

function DropdownMenu({SearchInput}) {
  const [dropdownState, setDropdown] = useState(false);
  const [statIndex, setStatIndex] = useState(null);
  const [buttonPressed, setButtonPressed] = useState(
    Array.from({ length: 4 }, () => new Animated.Value(0))
  );

  // Track & Update: Current index and dropdownState
  
  // Activate the dropdown menu
  const activateDropdown = () => {
    setDropdown(true);
    console.log('Dropdown Activated!');
  };

  // Deactivate the dropdown menu
  const deactivateDropdown = () => {
    setDropdown(false);
    console.log('Dropdown Deactivated!');
  };

  // Dropdown Options Animation
  const buttonAnimation = (color, index, isDropdownButton) => {
    const borderRadius = 10; // Set the border radius value
    
    if (isDropdownButton) {
      if (dropdownState) {
        return {
          backgroundColor: color,
          borderRadius: borderRadius, // Apply the border radius
        };
      }
    } else {
      const currentValue = buttonPressed[index];
      if (currentValue) {
        return {
          backgroundColor: currentValue.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: ['rgba(41, 71, 31, 0.5)', color, 'rgba(41, 71, 31, 0.5)'],
            extrapolate: 'clamp',
          }),
          _animationId: `button_${index}`,
          borderRadius: borderRadius, // Apply the border radius
        };
      }
    }
    return (
      <>
        <DropdownButton />
        <Dropdown />
      </>
    );
  };
  

  // Press Animation: Dropdown Menu & Dropdown Options
  const animateButton = (index, isDropdownButton) => {
    const currentValue = isDropdownButton ? buttonPressed[buttonPressed.length - 1] : buttonPressed[index];

    // Check index existence
    if (currentValue) {
      currentValue.setValue(0);

      Animated.timing(currentValue, {
        toValue: 1,
        duration: 250,
        useNativeDriver: false,
      }).start();
    }
  };

  // Dropdown Original Button
  function DropdownButton() {
    return (
      <AnimatedPressable
        style={[
          DropdownStyle.originalContainer,
          buttonAnimation('#1B3613', -1, true), // Pass -1 as the index value
        ]}
        onPress={() => {
          if (!dropdownState) {
            activateDropdown();
            animateButton(-1); // Pass -1 as the index value
          } else {
            deactivateDropdown();
            animateButton(-1); // Pass -1 as the index value
          }
        }}
      >
        <Text style={{ color: 'white', textAlign: 'center', fontSize: 20 }}>
          Find Statistics
        </Text>
      </AnimatedPressable>
    );
  }

  // Dropdown Options
  function Dropdown() {
    const StatisticName = ['Leagues', 'Players', 'Tournaments'];

    function DropdownOptions({ optionName, index }) {
      // Update statistics based on what is pressed
      const updateStatistics = () => {
        setStatIndex(index);
        animateButton(index);
        deactivateDropdown();
      };

      // Display Dropdown Options
      return (
        <AnimatedPressable
          style={[
            DropdownStyle.options,
            buttonAnimation('orange', index, false), // Pass the index + 1 as the index value
          ]}
          onPress={updateStatistics}
        >
          <Text style={[DropdownStyle.options.text,{ textAlign: 'center' }]}>
            {optionName}
          </Text>
        </AnimatedPressable>
      );
    }

    // Display Options
    return (
      <View style={DropdownStyle.optionContainer}>
        {StatisticName.map((options, index) => (
          <DropdownOptions key={index} optionName={options} index={index} />
        ))}
      </View>
    );
  }

  // Display Different Pages
  function DisplayPages() {
    // 
    return <LeagueStatTemplate index={statIndex} setStatIndex={setStatIndex} SearchInput={SearchInput} />
  }

  // Display either Dropdown only or Dropdown and Options
  // Dependent on dropdownState
  return (
    <>
      {/* Display Dropdown Button */}
        {statIndex === null && <DropdownButton />}
      {/* Display Dropdown Menu */}
        {dropdownState && <Dropdown />}
      {/* Display Pages */}
        {statIndex === 0 && <DisplayPages />}
    </>
  );
}

// Display Dropdown Page
export default function DefaultStatistics({SearchInput}) {


  return (
    <View style={{ flex: 1 }}>
      <DropdownMenu SearchInput={SearchInput} />
    </View>
  );
}