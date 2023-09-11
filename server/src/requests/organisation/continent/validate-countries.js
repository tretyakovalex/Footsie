// Public Imports

// Private Imports
import { getCountryData } from '../../soccerfootball-info/countries';
import { getCountryNameAndFlags } from '../../api-football/competitions';
import { printJSON } from '../../api-football/global-functions';

/*
SoccerInfo Countries: 250
API Football Countries: 167
*/


// Lowercase comparison 
function lowerCompare(tagSI, tagAF) {
  return tagSI == tagAF;
}  

// Compare list of countries between SoccerInfo and API Football Response
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

// Only show valid countries - Both in SoccerInfo and API Football
export async function validateCountries() {
    const countryDataSF = await getCountryData("database"); // Soccer Info
    const countryDataAF = await getCountryNameAndFlags(); // API Football 

    return compareData(countryDataSF, countryDataAF.countries);

}
