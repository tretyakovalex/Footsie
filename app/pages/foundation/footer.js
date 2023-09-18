// Public Imports
import { Pressable, View, Text } from 'react-native';
import { useEffect, useMemo } from 'react';

// Private Imports
import { FooterStructure } from '../../styles/global-styles/app-structure';
import { Colours } from '../../styles/global-styles/global';
import { NavigationStructure } from '../../styles/navigation-styles/navigation';

export default function Footer({ currentPage, setCurrentPage }) {
  // Each Page Name
  const NAVIGATION = useMemo(
    () => [
      { name: 'News' },
      { name: 'Matches' },
      { name: 'Favourites' },
      { name: 'Tournaments' },
      { name: 'Search' },
    ],
    [],
  );

  // Set Current Page
  useEffect(() => {
    setCurrentPage(currentPage);
  }, [currentPage]);

  return (
    <View
      style={[
        FooterStructure.colours,
        FooterStructure.size,
        FooterStructure.borders,
        NavigationStructure.mainContainer,
      ]}
    >
      {NAVIGATION.map((page, index) => (
        <NavigationBar
          key={page.name}
          pageIndex={index}
          pageName={page.name}
          currentPage={currentPage}
          setActivePage={setCurrentPage}
        >
          {page.name}
        </NavigationBar>
      ))}
    </View>
  );
}

// Structure for each button in the navigation
function NavigationBar({ pageIndex, pageName, currentPage, setActivePage }) {
  return (
    <View style={NavigationStructure.container}>
      <Pressable
        style={NavigationStructure.button}
        onPress={() => setActivePage(pageIndex)}
      >
        <Text
          style={[
            {
              color:
                currentPage === pageIndex
                  ? Colours.mainText
                  : Colours.inactiveText,
            },
            { fontSize: 14 },
            { textAlign: 'center' },
            { marginTop: 'auto' },
            { marginBottom: 25 },
          ]}
        >
          {pageName}
        </Text>
      </Pressable>
    </View>
  );
}
