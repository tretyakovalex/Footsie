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