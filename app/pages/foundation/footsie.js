// Public Imports
import { View } from 'react-native';
import { useState, useEffect } from 'react';

// Private Imports
import Header from './header';
import Main from './main';
import Footer from './footer';

import { TabNames } from './tab-information';


// Display tabs based on current page
function displayActiveTab(currentPage) {
  switch (currentPage) {
    case 0:
      return TabNames.news;
    case 1:
      return TabNames.matches;
    case 2:
      return TabNames.favourites;
    case 3:
      return TabNames.tournaments;
    default:
      return [];
  }
}

export default function Footsie() {
  // Track what's shown
  const [currentPage, setCurrentPage] = useState(1);    // Nav
  const [currentTab, setCurrentTab] = useState(1);      // Tab
  // Value that go into the search bar
  const [searchInput, setSearchInput] = useState('');
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
      setSearchInput('');
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
      <Main
        liveNav={currentPage}
        liveTab={currentTab}
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        searchStatus={searchStatus}
        setSearchStatus={setSearchStatus}
      />

      {/* Display the navigation (Pages) */}
      <Footer currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </View>
  );
}
