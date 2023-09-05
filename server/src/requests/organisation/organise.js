// Public Imports
import readline from 'readline';

// Private Imports
import { getCountryData } from '../soccerfootball-info/countries';
import { getCountryNameAndFlags } from '../api-football/competitions';
import { printJSON } from '../api-football/global-functions';


// getCountryData
/*
 - - - Soccer Info - - - 
[
    {"Andorra": "AD"},
    {"United Arab Emirates": "AE"}
]
*/
// getCountryNameAndFlags
/*
 - - - API FOOTBALL - - - 
{
  "Albania": {
    "countryFlag": "https://media-2.api-sports.io/flags/al.svg",
    "countryTag": "AL"
  },
  "Algeria": {
    "countryFlag": "https://media-3.api-sports.io/flags/dz.svg",
    "countryTag": "DZ"
  },
}


SoccerInfo Countries: 250
API Football Countries: 167
*/


// Lowercase comparison 
function lowerCompare(tagSI, tagAF) {
  return tagSI == tagAF;
}  

// TODO:
//    Can this be simplified
//    Remove double-checks (Match found, don't check that again)
// Compare SoccerInfo data vs apiFootball Data
function compareData(soccerInfo, apiFootball) {
  const validData = [];
  const questionableData = [];

  for (let i = 0; i < soccerInfo.length; i++) {
    const countrySI = Object.values(soccerInfo[i])[0]; // Get country name from SoccerInfo

    let matchFound = false;      // Duplication
    let matchingCountry = null;  // Country placeholder

    for (const tag in apiFootball) {
      const countryAF = apiFootball[tag].countryTag;  // Get country tag from API Football

      // Compare SoccerInfo and API Football Tags
      if (lowerCompare(countrySI, countryAF)) {
        // Duplicate Found
        matchFound = true;
        // Fill country placeholder
        matchingCountry = {
          [tag]: {
            countryFlag: apiFootball[tag].countryFlag,
            countryTag: apiFootball[tag].countryTag
          }
        };
        // Break the loop when a match is found
        break; 
      }
    }

    if (matchFound) {
      validData.push(matchingCountry);  // Dupliaction was found - Valid Country
    } else {
      questionableData.push(countrySI); // No duplications - Invalid / Questionable country
    }
  }

  return {
    validData,
    questionableData
  };
}



export async function validateCountries() {
    const countryDataSF = await getCountryData("database"); // Soccer Info
    const countryDataAF = await getCountryNameAndFlags(); // API Football 

    return compareData(countryDataSF, countryDataAF.countries);

}

