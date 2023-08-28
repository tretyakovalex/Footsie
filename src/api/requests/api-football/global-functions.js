/*
SoccerFootballInfo: https://rapidapi.com/soccerfootball-info-soccerfootball-info-default/api/soccer-football-info/
LiveScore: https://rapidapi.com/apidojo/api/livescore6/
FootAPI: https://rapidapi.com/fluis.lacasse/api/footapi7/
FootballPro: https://rapidapi.com/sportmonks-data/api/football-pro/

*/

// Check if key exist, else create key
export function KeyExistence(isArray, Obj, Key, Value) {
    // Object Key Doesn't Exist
    if (!Obj[Key]) {
        Obj[Key] = isArray ? [Value] : Value;
    } else if (isArray) {
        // Doesn't exist but is an object
        Obj[Key].push(Value);
    }
}



// Print out a JSON File in a readable way
export function printJSON(variable, maxCharacters) {
    try {
        const jsonString = JSON.stringify(variable, null, 2);
        
        if (jsonString.length <= maxCharacters) {
            console.log(jsonString);
        } else {
            const truncatedJsonString = jsonString.substring(0, maxCharacters) + ' ...';
            console.log(truncatedJsonString);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

// Check parameter is a string 
export function StringCheck(StringInQuestion) {
    return typeof(StringInQuestion) === 'string' ? StringInQuestion : JSON.stringify(StringInQuestion);
}