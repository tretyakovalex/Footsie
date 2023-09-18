import { View, Text, Pressable, ScrollView } from 'react-native';
import { useState, useEffect } from 'react';

// Display all the options for the dropdown
// Placeholder: Dropdown options
function DropdownOptions({
  Placeholder,
  setStatStatus,
  setChosenStatistic,
  displayDropdownOptions,
}) {
  const handlePress = (chosenStat) => {
    setChosenStatistic(chosenStat);
    displayDropdownOptions(false);
    setStatStatus(true);
  };

  return Placeholder.map((options, index) => (
    <Pressable
      key={index}
      onPress={() => handlePress(options)}
      style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}
    >
      <Text style={{ fontSize: 18, color: 'white' }}>{options}</Text>
    </Pressable>
  ));
}

// Dropdown Button
// Placeholder: Dropdown options
export function DropdownButton({
  Placeholder,
  Title,
  setStatStatus,
  setChosenStatistic,
}) {
  const [dropdown, setDropdown] = useState(false);

  const handlePress = (dropdown) => {
    setDropdown(!dropdown);
  };

  return (
    <View>
      <Pressable
        onPress={() => handlePress(dropdown)}
        style={{ height: 50, width: 300, backgroundColor: 'red', justifyContent: 'center', alignItems: 'center'}}
      >
        <Text>{Title}</Text>
      </Pressable>

      <ScrollView style={{ height: 150, width: 'auto'}}>
        {dropdown ? (
          <DropdownOptions
            Placeholder={Placeholder}
            setStatStatus={setStatStatus}
            setChosenStatistic={setChosenStatistic}
            dislpayDropdownOptions={setDropdown}
          />
        ) : (
          <Text style={{marginLeft: 'auto', marginRight: 'auto', fontSize: 18, color: 'white' }}>
            No Dropdown Option
          </Text>
        )}
      </ScrollView>
    </View>
  );
}
