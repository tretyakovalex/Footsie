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