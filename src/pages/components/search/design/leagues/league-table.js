// Public Imports
import { View, Text, Pressable, ScrollView } from 'react-native';
import { useState, useEffect } from 'react';

// Teams
function DisplayTeams() {
    return (
        <></>
    )
}

// Schema
function LeagueSchema() {
    return (
        <></>
    )
}

// Header
function LeagueHeader() {
    return (
        <View style={{flex: 1}}>

        </View>
    )
}


// Display League Table
export default function LeagueTable({Placeholder}) {
    return (
        <View style={{flex: 1}}>
            <LeagueHeader Placeholder={Placeholder} />

            <View style={{flex: 6}}>
                <LeagueSchema Placeholder={Placeholder} />

                <DisplayTeams Placeholder={Placeholder} />
            </View>
        </View>
    )
}