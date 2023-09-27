import { View } from 'react-native';
import { useState, useEffect } from 'react';

// Component Imports
import Header from './header';
import Content from './content';
import Footer from './footer';
import { tabNames } from './content-storage';


// Display tabs based on current page
function displayActiveTab(currentPage) {
  switch (currentPage) {
    case 0:
      return tabNames.news;
    case 1:
      return tabNames.matches;
    case 2:
      return tabNames.favourites;
    case 3:
      return tabNames.tournaments;
    default:
      return [];
  }
}

export default function Footsie() {
  // Track what's shown
  const [currentPage, setCurrentPage] = useState(1);    // Nav
  const [currentTab, setCurrentTab] = useState(1);      // Tab
  // Value that go into the search bar
  const [userInput, setUserInput] = useState('');
  // Activate / Deactivate Search Bar
  // False = No active search (Nothing in the search bar)
  const [searchStatus, setSearchStatus] = useState(false);

  // Re-render the application when tab is changed.
  useEffect(() => {
    if (currentTab == 4) {
      setCurrentTab(0);
    }
  }, [currentTab]);

  // Re-render the application when page is changed.
  useEffect(() => {
    if (currentPage != 4) {
      setUserInput('');
      setSearchStatus(false);
    }
  }, [currentPage]);

  return (
    <View style={{ flex: 1 }}>
    {/* Display the tabs required for each page */}
      <Header
        tabNames={displayActiveTab(currentPage)}
        activeTab={currentTab}
        setCurrentTab={setCurrentTab}
        activePage={currentPage}
      />

      {/* Display the main content. Dependent on Tab and Page Values*/}
      <Content
        liveNav={currentPage}
        liveTab={currentTab}
        userInput={userInput}
        setUserInput={setUserInput}
        searchStatus={searchStatus}
        setSearchStatus={setSearchStatus}
      />

      {/* Display the navigation (Pages) */}
      <Footer currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </View>
  );
}
