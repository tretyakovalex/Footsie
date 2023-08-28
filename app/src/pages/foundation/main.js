import {
  ScrollView,
  View,
  Text,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import { useState, useCallback, useEffect } from 'react';

import { MainStructure } from '../../styles/global-styles/app-structure';
import { MatchTemplate, LeagueTemplate } from '../components/matches/matches';
import API_Matches from '../components/matches/matchAPI';
import { MatchFoundation } from '../../styles/main-styles/matches/foundation';

// Display Search Page
import SearchPage from '../components/search/search-homepage';

// Display Player Stats
import PageHolder from '../components/search/temporary-page';

export default function Main({
  LiveTab,
  LiveNav,
  SearchInput,
  setSearchInput,
  setSearchStatus,
  searchStatus,
}) {
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
    FetchMatches(API_Matches(LiveTab));
  }, [LiveTab]);

  // Empty text - Returning from search page
  // TODO:
  //    Create an API
  //    When user searches something
  //    Catgeroies it then make sure that GetSearchPage gets the same information
  useEffect(() => {
    setSearchInput('');
  }, [searchStatus]);

  const FetchMatches = async (ActiveContent) => {
    try {
      const DisplayedContent = await ActiveContent;
      setDisplayMatches(DisplayedContent);
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
    FetchMatches(API_Matches(LiveTab));
  }, [LiveTab, LiveNav]);

  // Loading text
  const RefreshingTitles = [
    // News
    ['Updating News'],
    // Matches
    [
      'Fetching Favourite Matches',
      'Fetching Live Matches',
      'Fetching Upcoming Matches',
      'Fetching Results',
    ],
    // Favourites
    [
      'Fetching Matches',
      'Fetching Players',
      'Fetching News',
      'Fetching Tournaments',
    ],
    // Tournaments
    [
      'Fetching National Tournments',
      'Fetching International Tournaments',
      'Fetching International Tournaments',
    ],
    // Statistics
    ['Statistics Coming Soon'],
  ];

  return (
    <View style={[MainStructure.colours, MainStructure.size]}>
      {isLoading ? (
        // Show the loading page
        <View
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        >
          <ActivityIndicator size="large" color="green" />
          <Text
            style={[{ marginTop: 10 }, { color: 'white' }, { fontSize: 20 }]}
          >
            Loading...
          </Text>
        </View>
      ) : (
        // Show the actual content based on searchStatus
        <>
          {searchStatus ? (
            <PageHolder setSearchStatus={setSearchStatus} />
          ) : (
            <View style={{ flex: 1 }}>
              <ScrollView
                style={{ flex: 1 }}
                indicatorStyle={'white'}
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                    tintColor={'green'}
                    title={RefreshingTitles[LiveNav][LiveTab]}
                    titleColor={'white'}
                    vertical={true}
                  />
                }
              >
                <Content
                  Tab={LiveTab}
                  Page={LiveNav}
                  Matches={displayMatches}
                  UserInput={SearchInput}
                  setSearchInput={setSearchInput}
                  setSearchStatus={setSearchStatus}
                />
              </ScrollView>
            </View>
          )}
        </>
      )}
    </View>
  );
}

// What to be shown
function Content({
  Page,
  Tab,
  Matches,
  UserInput,
  setSearchInput,
  setSearchStatus,
}) {
  const pageConversion = [
    'news',
    'matches',
    'favourites',
    'tournaments',
    'statistics',
  ];
  const tabConversion = [
    ['major', 'everyday', 'favourite'],
    ['favourite', 'live', 'upcoming', 'results'],
    ['Matches', 'Players', 'News', 'Tournaments'],
    ['national', 'international', 'intercontinental'],
    ['default'],
  ];

  const contentMap = {
    // News section
    news: {
      major: (
        <Text style={[{ color: 'white' }, { fontSize: 20 }]}>Major News</Text>
      ),
      regular: <Text style={[{ color: 'white' }, { fontSize: 20 }]}>News</Text>,
      favourite: (
        <Text style={[{ color: 'white' }, { fontSize: 20 }]}>
          Favourite News
        </Text>
      ),
    },
    // Match section
    matches: {
      favourite: (
        <>
          {Matches.length > 0 ? (
            Matches.map((match, index) => (
              // TODO: Organise Favourites - More Readable
              <MatchTemplate key={index} match={match} />
            ))
          ) : (
            <Text style={MatchFoundation.noMatch}>No Favourites</Text>
          )}
        </>
      ),
      live: (
        <>
          {Matches.length > 0 ? (
            <LeagueTemplate Matches={Matches} />
          ) : (
            <Text style={MatchFoundation.noMatch}>
              Currently No Live Matches
            </Text>
          )}
        </>
      ),
      upcoming: (
        <>
          {Matches.length > 0 ? (
            <LeagueTemplate Matches={Matches} />
          ) : (
            <Text style={MatchFoundation.noMatch}>No Upcoming Matches</Text>
          )}
        </>
      ),
      results: (
        <>
          {Matches.length > 0 ? (
            <LeagueTemplate Matches={Matches} />
          ) : (
            <Text style={MatchFoundation.noMatch}>No Matches Today</Text>
          )}
        </>
      ),
    },
    // Favourite section
    favourites: {
      matches: (
        <Text style={[{ color: 'white' }, { fontSize: 20 }]}>
          Favourite Matches
        </Text>
      ),
      players: (
        <Text style={[{ color: 'white' }, { fontSize: 20 }]}>
          Favourite Players
        </Text>
      ),
      news: (
        <Text style={[{ color: 'white' }, { fontSize: 20 }]}>
          Favourite News
        </Text>
      ),
      tournaments: (
        <Text style={[{ color: 'white' }, { fontSize: 20 }]}>
          Favourite Tournaments
        </Text>
      ),
    },
    // tournament section
    tournaments: {
      national: (
        <Text style={[{ color: 'white' }, { fontSize: 20 }]}>
          National Tournaments
        </Text>
      ),
      intercontinental: (
        <Text style={[{ color: 'white' }, { fontSize: 20 }]}>
          Intercontinental Tournaments
        </Text>
      ),
      international: (
        <Text style={[{ color: 'white' }, { fontSize: 20 }]}>
          International Tournaments
        </Text>
      ),
    },
    // Statistic Section
    statistics: {
      default: (
        <>
          <SearchPage
            searchInput={UserInput}
            setSearch={setSearchInput}
            setSearchStatus={setSearchStatus}
          />
        </>
      ),
    },
  };

  return Page == 4
    ? contentMap[pageConversion[Page]]?.[tabConversion[Page][0]]
    : contentMap[pageConversion[Page]]?.[tabConversion[Page][Tab]] || (
        <Text
          style={{ fontSize: 24, color: 'grey', textAlign: 'center', top: 300 }}
        >
          Page Doesn't Exist
        </Text>
      );
}
