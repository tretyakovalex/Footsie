import { View, Text, StyleSheet, Pressable } from 'react-native';
import { DropdownButton } from './design/leagues/components/league_dropdown';

// Return button - Search Page
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

// TEMPORARY STATISTIC HOLDER
const Temp_Stats = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];

export default function PageHolder({ setSearchStatus }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <View style={{ position: 'absolute', top: -40, right: 40 }}>
        <ReturnButton setSearchStatus={setSearchStatus} />
      </View>

      <Text style={{ fontSize: 24, color: 'white', textAlign: 'center' }}>
        Under Construction
      </Text>

      <DropdownButton
        Placeholder={Temp_Stats}
        Title={'Statistic Placeholder'}
      />
    </View>
  );
}
