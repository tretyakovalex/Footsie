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
      style={{ flex: 1 }}
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
        style={{ height: 50, width: 100, backgroundColor: 'red' }}
      >
        <Text>{Title}</Text>
      </Pressable>

      <View style={{ height: 150, width: 80 }}>
        {dropdown ? (
          <DropdownOptions
            Placeholder={Placeholder}
            setStatStatus={setStatStatus}
            setChosenStatistic={setChosenStatistic}
            dislpayDropdownOptions={setDropdown}
          />
        ) : (
          <Text style={{ fontSize: 18, color: 'white' }}>
            No Dropdown Option
          </Text>
        )}
      </View>
    </View>
  );
}
