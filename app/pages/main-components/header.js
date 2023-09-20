// Public Imports
import { View, Pressable, Text } from 'react-native';
import { useEffect } from 'react';

// Private Imports
import { tabStyle } from '../main-components/styles/header-style';
import { Colours } from '../styles/global-style';

// Tabs on the top of the page.
// Depending on active page wil determine what content is going to be shown
// User clicks on a tab it changes the content
function TabDisplay({ sectionName, sectionIndex, setCurrentTab, activeTab }) {
  return (
    <View style={tabStyle.container}>
      <Pressable
        style={[ tabStyle.button,
          { borderBottomWidth: activeTab === sectionIndex ? 1 : 0,
            borderBottomColor: activeTab == sectionIndex ? Colours.inactiveText : null,
          }
        ]}
        onPress={() => setCurrentTab(sectionIndex)}
      >
        <Text style={[tabStyle.tabText, {color: activeTab === sectionIndex ? Colours.mainText : Colours.inactiveText }]}>
          {sectionName}
        </Text>
      </Pressable>
    </View>
  );
}

// Top of the app.
// Displays tabs for the current active page
export default function Header({ tabNames, activeTab, setCurrentTab, activePage }) {
  // Track active tabs
  useEffect(() => {
    setCurrentTab(activeTab);
  }, [activeTab]);

  return (
    <View
      style={[
        {
          backgroundColor: activePage == 4 ? Colours.bgColour : Colours.mainGreen,
          flex: activePage == 4 ? 0 : 1.5,
          paddingTop: activePage == 4 ? 100 : 0,
        },
        tabStyle.mainContainer,
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
