// Public Imports
import { View, Pressable, Text, StyleSheet } from 'react-native';
import { useEffect, useState } from 'react';

// Private Imports
import { TabStructure } from '../../styles/tab-styles/tabs';
import { Colours } from '../../styles/global-styles/global';

// Individual Tabs - Each tab that gets displayed
function TabDisplay({ sectionName, sectionIndex, setCurrentTab, activeTab }) {
  return (
    <View style={TabStructure.container}>
      <Pressable
        style={[
          TabStructure.button,
          { borderBottomWidth: activeTab === sectionIndex ? 1 : 0 },
          {
            borderBottomColor:
              activeTab == sectionIndex ? Colours.inactiveText : null,
          },
        ]}
        onPress={() => setCurrentTab(sectionIndex)}
      >
        <Text
          style={[
            {
              color:
                activeTab === sectionIndex
                  ? Colours.mainText
                  : Colours.inactiveText,
            },
            { textAlign: 'center' },
            { fontSize: 14 },
          ]}
        >
          {sectionName}
        </Text>
      </Pressable>
    </View>
  );
}

// Tabs holder - Holds all the current tabs on a page
export default function Header({ tabNames, activeTab, setCurrentTab, activePage }) {
  // Keep track of active tab
  useEffect(() => {
    setCurrentTab(activeTab);
  }, [activeTab]);

  return (
    <View
      style={[
        {
          backgroundColor:
            activePage == 4 ? Colours.bgColour : Colours.mainGreen,
          flex: activePage == 4 ? 0 : 1.5,
          paddingTop: activePage == 4 ? 100 : 0,
        },
        TabStructure.mainContainer,
      ]}
    >
      {tabNames.map((tabName, index) => (
        <TabDisplay
          key={tabName.name}
          sectionName={tabName.name}
          sectionIndex={index}
          setCurrentTab={setCurrentTab}
          activeTab={activeTab}
        ></TabDisplay>
      ))}
    </View>
  );
}
