// Public Imports
import { View } from 'react-native';
import { useState, useEffect } from 'react';

// Private Imports
import Header from './header';
import Main from './main';
import Footer from './footer';

import { TabNames } from './tab-information';

import { CountryNameAndFlags, CompetitionNameAndCountry, LeagueStandings } from '../../api/requests/api-football/competitions';

import { TeamNameAndID, TeamSquad, TeamCoaches, TeamLeagueInfo } from '../../api/requests/api-football/clubs';

import { PlayerStatistics } from '../../api/requests/api-football/players';


// Display tabs based on current page
function DisplayActiveTab(currentPage) {
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
        return []
    }
}

async function TestAPICalls() {
    try { 
        // Competitions
        console.log("Country Name And Flags Function")
        const test1 = await CountryNameAndFlags();
        console.log("Country Name And Country Function")
        const test2 = await CompetitionNameAndCountry();
        console.log("League Standings Function")
        const test3 = await LeagueStandings();
        // Clubs
        console.log("Team Name and ID Function")
        const test4 = await TeamNameAndID();
        console.log("Team Squad Function")
        const test5 = await TeamSquad();
        console.log("Team Coaches Function")
        const test6 = await TeamCoaches();
        console.log("Team League Function")
        const test7 = await TeamLeagueInfo();
        // Players
        console.log("League Standings Function")
        const test8 = await PlayerStatistics();
    } catch (error) {
        console.error("DFSFSDFA")
    }
}


export default function Footsie() {

    // Track what's shown
    const [currentPage, setCurrentPage] = useState(1);
    const [currentTab, setCurrentTab] = useState(1);
    // User search holder
    const [searchInput, setSearchInput] = useState("");
    // Activate / Deactivate Search Bar
    // False = No active search (Nothing in the searchbar)
    const [searchStatus, setSearchStatus] = useState(false);

    // TestAPICalls();


    useEffect( () => {
      if (currentTab == 4) {
        setCurrentTab(0);
      }
    }, [currentTab]);

    useEffect( () => {
      if (currentPage != 4) {
        setSearchInput("");
        setSearchStatus(false);
      }
    }, [currentPage]);

    return (
      <View style={{flex: 1}}>
          <Header 
              TabNames={DisplayActiveTab(currentPage)}
              activeTab={currentTab}
              setCurrentTab={setCurrentTab}
              activePage={currentPage}
          />

          <Main 
            LiveNav={currentPage} 
            LiveTab={currentTab} 
            SearchInput={searchInput} 
            setSearchInput={setSearchInput}
            searchStatus={searchStatus}
            setSearchStatus={setSearchStatus}
          />

          <Footer currentPage={currentPage} setCurrentPage={setCurrentPage}/> 
      </View>
    );
} 