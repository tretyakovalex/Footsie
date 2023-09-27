import { Text, ActivityIndicator, View } from 'react-native';

// Import Styles
import { loadingStyle, contentStyle } from '../styles/main-components/main-style';

// Import Data
import { pageByName, tabByName } from './content-storage';

// Import Components
import { SearchPage } from '../components/search/search-homepage'; // Activate the search page (Different to other pages)
import { MatchTemplate, LeagueTemplate } from '../components/matches/matches';


// Display the Loading Screen
export function LoadingScreen() {
    return (
        <View style={loadingStyle.container}>
          <ActivityIndicator size="large" color="green" />
          <Text style={loadingStyle.textStyle}>Loading...</Text>
        </View>
    )
}

// Display The Main Content
// TODO:
//    Clean up this code
//    Error loading search page
export function DisplayContent({ page, tab, matches, userInput, setSearchInput, setSearchStatus }) {

    const contentMap = {
      // News section
      news: {
        major: (
          <Text style={contentStyle.standardText}>Major News</Text>
        ),
        regular: <Text style={contentStyle.standardText}>News</Text>,
        favourite: (
          <Text style={contentStyle.standardText}>Favourite News</Text>
        ),
      },
      // Match section
      matches: {
        favourite: (
          <>
            {matches.length > 0 ? (
              matches.map((match, index) => (
                // TODO: Organise Favourites - More Readable
                <MatchTemplate key={index} match={match} />
              ))
            ) : (
              <Text style={contentStyle.noMatch}>No Favourites</Text>
            )}
          </>
        ),
        live: (
          <>
            {matches.length > 0 ? (
              <LeagueTemplate Matches={matches} />
            ) : (
              <Text style={contentStyle.noMatch}>
                Currently No Live Matches
              </Text>
            )}
          </>
        ),
        upcoming: (
          <>
            {matches.length > 0 ? (
              <LeagueTemplate Matches={matches} />
            ) : (
              <Text style={contentStyle.noMatch}>No Upcoming Matches</Text>
            )}
          </>
        ),
        results: (
          <>
            {matches.length > 0 ? (
              <LeagueTemplate Matches={matches} />
            ) : (
              <Text style={contentStyle.noMatch}>No Matches Today</Text>
            )}
          </>
        ),
      },
      // Favourite section
      favourites: {
        matches: (
          <Text style={contentStyle.standardText}>
            Favourite Matches
          </Text>
        ),
        players: (
          <Text style={contentStyle.standardText}>
            Favourite Players
          </Text>
        ),
        news: (
          <Text style={contentStyle.standardText}>
            Favourite News
          </Text>
        ),
        tournaments: (
          <Text style={contentStyle.standardText}>
            Favourite Tournaments
          </Text>
        ),
      },
      // tournament section
      tournaments: {
        national: (
          <Text style={contentStyle.standardText}>
            National Tournaments
          </Text>
        ),
        intercontinental: (
          <Text style={contentStyle.standardText}>
            Intercontinental Tournaments
          </Text>
        ),
        international: (
          <Text style={contentStyle.standardText}>
            International Tournaments
          </Text>
        ),
      },
      // Statistic Section
      search: {
        default: (
          <>
            <SearchPage
              searchInput={userInput}
              setSearch={setSearchInput}
              setSearchStatus={setSearchStatus}
            />
          </>
        ),
      },
    };
  
    return page == 4
      ? contentMap[pageByName[page]]?.[tabByName[page][0]]
      : contentMap[pageByName[page]]?.[tabByName[page][tab]] || (
          <Text
            style={{ fontSize: 24, color: 'grey', textAlign: 'center', top: 300 }}
          >
            Page Doesn't Exist
          </Text>
        );
  }