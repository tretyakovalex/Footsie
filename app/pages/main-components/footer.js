import { Pressable, View, Text } from 'react-native';
import { useEffect, useMemo } from 'react';

// Styles
import { footerStyle } from '../styles/main-components/footer-style';
import { Colours } from '../styles/global-style';

// Displays the bottom section of the page (Navigation)
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
      style={[ footerStyle.colours, footerStyle.size, footerStyle.borders, footerStyle.navContainer ]}>
      {NAVIGATION.map((page, index) => (
        <PageOptions
          key={page.name}
          pageIndex={index}
          pageName={page.name}
          currentPage={currentPage}
          setActivePage={setCurrentPage}
        >
          {page.name}
        </PageOptions>
      ))}
    </View>
  );
}

// Each option that goes into the navigation
// NAVIGATION
function PageOptions({ pageIndex, pageName, currentPage, setActivePage }) {
  return (
    <Pressable style={footerStyle.buttonContainer}
      onPress={() => setActivePage(pageIndex)}
    >
      <Text
        style={[ footerStyle.pageText,
          {color: currentPage === pageIndex ? Colours.mainText : Colours.inactiveText }
        ]}
      >
        {pageName}
      </Text>
    </Pressable>
  );
}
