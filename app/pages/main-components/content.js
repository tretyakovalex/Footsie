import { ScrollView, View, RefreshControl } from 'react-native';
import { useState, useCallback, useEffect } from 'react';

// Style Imports
import { MainStructure } from '../../styles/global-styles/app-structure';

// Import Data
import { refreshTitles } from './content-storage';

// Import Components
import API_Matches from '../components/matches/matchAPI';         // API Request: All match information
import PageHolder from '../components/search/search-pageholder';     // Temporary Page
import { LoadingScreen, DisplayContent } from './content-components';

export default function Content({ liveTab, liveNav, userInput, setUserInput, setSearchStatus, searchStatus }) {
  const [refreshing, setRefreshing] = useState(false);
  const [displayMatches, setDisplayMatches] = useState([]);
  const [isLoading, setLoading] = useState(true);

  // Loading screen
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  // Fetch matches
  useEffect(() => {
    setLoading(true);
    fetchMatches(API_Matches(liveTab));
  }, [liveTab]);

  // Empty text - Returning from search page
  // TODO:
  //    Create an API
  //    When user searches something
  //    Catgeroies it then make sure that GetSearchPage gets the same information
  useEffect(() => {
    setUserInput('');
  }, [searchStatus]);

  // Make API request for information on matches
  const fetchMatches = async (apiRequest) => {
    try {
      const apiResponse = await apiRequest;
      setDisplayMatches(apiResponse);
      setLoading(false);
    } catch (error) {
      console.log('Error Fetching Matches...');
      console.log(error);
      setLoading(false);
    }
  };

  // Refresh the page
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
    fetchMatches(API_Matches(liveTab));
  }, [liveTab, liveNav]);

  return (
    <View style={[MainStructure.colours, MainStructure.size]}>
      {isLoading ? (<LoadingScreen />) : (
        <>
          {searchStatus ? (
            <PageHolder setSearchStatus={setSearchStatus} searchOption={userInput} />
          ) : (
              <ScrollView
                style={{ flex: 1 }}
                indicatorStyle={'white'}
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                    tintColor={'green'}
                    title={liveTab == 3 && liveNav == 4 ? "Refreshing Search" : refreshTitles[liveNav][liveTab]}
                    titleColor={'white'}
                    vertical={true}
                  />
                }
              >
                <DisplayContent
                  tab={liveTab}
                  page={liveNav}
                  matches={displayMatches}
                  userInput={userInput}
                  setUserInput={setUserInput}
                  setSearchStatus={setSearchStatus}
                />
              </ScrollView>
          )}
        </>
      )}
    </View>
  );
}
