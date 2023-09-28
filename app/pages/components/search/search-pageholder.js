import { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';


// Pages
import PlayerPage from './design/players/player-page';

// Return button - Search Page
function ReturnButton({ setSearchStatus }) {

  const ReturnHome = () => {
    setSearchStatus(false);
  };

  const buttonStyle = StyleSheet.create({
    button: {
      backgroundColor: '#0A4005',
      height: 40,
      width: 40,
      borderWidth: 1,
      borderColor: 'black',
      justifyContent: 'center',
      alignItems: 'center', 
      position: 'absolute',
      top: -50,
      right: 20,
    },
  });

  return (
    <Pressable onPress={ReturnHome} style={buttonStyle.button}>
      <Text style={{color: "white", fontSize: 18, fontWeight: 'bold'}}>X</Text>
    </Pressable>
  );
}

export default function PageHolder({ setSearchStatus, searchOption }) {
  console.log(`Search Option: ${searchOption}`);
  return (
    <View style={{ flex: 1}}>
      <PlayerPage />

      <ReturnButton setSearchStatus={setSearchStatus} />
    </View>
  );
}
